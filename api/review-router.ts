import { z } from "zod";
import { createRouter, publicQuery, authedQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { reviews } from "@db/schema";
import { eq, desc } from "drizzle-orm";

export const reviewRouter = createRouter({
  list: publicQuery
    .input(z.object({ projectId: z.number().optional() }).optional())
    .query(async ({ input }) => {
      const db = getDb();
      if (input?.projectId) {
        return db.select().from(reviews).where(eq(reviews.projectId, input.projectId)).orderBy(desc(reviews.createdAt));
      }
      return db.select().from(reviews).orderBy(desc(reviews.createdAt));
    }),

  create: authedQuery
    .input(z.object({
      projectId: z.number(),
      rating: z.number().min(1).max(5),
      comment: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const result = await db.insert(reviews).values({
        ...input,
        userId: ctx.user.id,
      });
      return { id: Number(result[0].insertId) };
    }),

  getStats: publicQuery
    .query(async () => {
      const db = getDb();
      const allReviews = await db.select().from(reviews);
      const avgRating = allReviews.length > 0
        ? allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
        : 0;
      return {
        average: Math.round(avgRating * 10) / 10,
        total: allReviews.length,
      };
    }),
});
