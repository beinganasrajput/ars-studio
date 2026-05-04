import { z } from "zod";
import { createRouter, staffQuery, masterQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { users, staffRoles, projects, payments } from "@db/schema";
import { eq, count } from "drizzle-orm";

export const staffRouter = createRouter({
  list: staffQuery
    .query(async () => {
      const db = getDb();
      const staffUsers = await db.select().from(users).where(eq(users.role, "staff"));
      return staffUsers;
    }),

  getStats: staffQuery
    .query(async () => {
      const db = getDb();

      const totalProjects = await db.select({ count: count() }).from(projects);
      const activeProjects = await db.select({ count: count() }).from(projects).where(eq(projects.status, "active"));
      const pendingProjects = await db.select({ count: count() }).from(projects).where(eq(projects.status, "pending"));
      const completedProjects = await db.select({ count: count() }).from(projects).where(eq(projects.status, "completed"));

      const allPayments = await db.select().from(payments);
      const totalRevenue = allPayments
        .filter(p => p.status === "paid")
        .reduce((sum, p) => sum + p.amount, 0);

      return {
        projects: {
          total: totalProjects[0]?.count || 0,
          active: activeProjects[0]?.count || 0,
          pending: pendingProjects[0]?.count || 0,
          completed: completedProjects[0]?.count || 0,
        },
        revenue: totalRevenue,
      };
    }),

  create: masterQuery
    .input(z.object({
      userId: z.number(),
      department: z.enum(["sales", "web", "editor", "accounts", "hr", "master"]),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.update(users).set({ role: "staff" }).where(eq(users.id, input.userId));
      const result = await db.insert(staffRoles).values(input);
      return { id: Number(result[0].insertId) };
    }),
});
