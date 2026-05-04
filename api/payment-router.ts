import { z } from "zod";
import { createRouter, authedQuery, staffQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { payments } from "@db/schema";
import { eq } from "drizzle-orm";

export const paymentRouter = createRouter({
  list: authedQuery
    .input(z.object({ projectId: z.number().optional() }).optional())
    .query(async ({ ctx, input }) => {
      const db = getDb();
      const isStaff = ctx.user.role === "staff" || ctx.user.role === "master";

      if (input?.projectId) {
        return db.select().from(payments).where(eq(payments.projectId, input.projectId));
      }

      if (isStaff) {
        return db.select().from(payments);
      }

      return db.select().from(payments).where(eq(payments.userId, ctx.user.id));
    }),

  create: staffQuery
    .input(z.object({
      projectId: z.number(),
      userId: z.number(),
      type: z.enum(["deposit", "final", "milestone"]),
      amount: z.number(),
      method: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(payments).values(input);
      return { id: Number(result[0].insertId) };
    }),

  markPaid: staffQuery
    .input(z.object({
      id: z.number(),
      transactionId: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.update(payments).set({
        status: "paid" as const,
        transactionId: input.transactionId,
        paidAt: new Date(),
      }).where(eq(payments.id, input.id));
      return { success: true };
    }),

  getSummary: staffQuery
    .query(async () => {
      const db = getDb();
      const allPayments = await db.select().from(payments);

      const totalRevenue = allPayments
        .filter(p => p.status === "paid")
        .reduce((sum, p) => sum + p.amount, 0);

      const pendingAmount = allPayments
        .filter(p => p.status === "pending")
        .reduce((sum, p) => sum + p.amount, 0);

      return { totalRevenue, pendingAmount, totalTransactions: allPayments.length };
    }),
});
