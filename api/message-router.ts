import { z } from "zod";
import { createRouter, authedQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { messages } from "@db/schema";
import { eq, desc } from "drizzle-orm";

export const messageRouter = createRouter({
  list: authedQuery
    .input(z.object({ projectId: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      return db.select().from(messages)
        .where(eq(messages.projectId, input.projectId))
        .orderBy(desc(messages.createdAt));
    }),

  create: authedQuery
    .input(z.object({
      projectId: z.number(),
      content: z.string().min(1),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const result = await db.insert(messages).values({
        ...input,
        userId: ctx.user.id,
      });
      return { id: Number(result[0].insertId) };
    }),
});
