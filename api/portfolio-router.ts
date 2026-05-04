import { z } from "zod";
import { createRouter, publicQuery, staffQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { portfolio } from "@db/schema";
import { eq, desc, and } from "drizzle-orm";

export const portfolioRouter = createRouter({
  list: publicQuery
    .input(z.object({
      category: z.string().optional(),
      featured: z.boolean().optional(),
    }).optional())
    .query(async ({ input }) => {
      const db = getDb();
      const conditions = [];

      if (input?.category) {
        conditions.push(eq(portfolio.category, input.category as any));
      }
      if (input?.featured) {
        conditions.push(eq(portfolio.isFeatured, true));
      }

      if (conditions.length > 1) {
        return db.select().from(portfolio).where(and(...conditions)).orderBy(portfolio.order, desc(portfolio.createdAt));
      } else if (conditions.length === 1) {
        return db.select().from(portfolio).where(conditions[0]).orderBy(portfolio.order, desc(portfolio.createdAt));
      }
      return db.select().from(portfolio).orderBy(portfolio.order, desc(portfolio.createdAt));
    }),

  getById: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      return db.select().from(portfolio).where(eq(portfolio.id, input.id)).then(rows => rows[0] || null);
    }),

  create: staffQuery
    .input(z.object({
      title: z.string().min(1),
      category: z.enum(["showreel", "reels", "brand_films", "ads", "documentary", "color_grading", "motion_graphics"]),
      thumbnailUrl: z.string().optional(),
      videoUrl: z.string().optional(),
      clientName: z.string().optional(),
      style: z.string().optional(),
      budgetRange: z.string().optional(),
      tags: z.array(z.string()).optional(),
      isFeatured: z.boolean().optional(),
      order: z.number().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(portfolio).values(input);
      return { id: Number(result[0].insertId) };
    }),
});
