import { z } from "zod";
import { createRouter, publicQuery, authedQuery, staffQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { projects, projectSteps } from "@db/schema";
import { eq, and, desc } from "drizzle-orm";

export const projectRouter = createRouter({
  list: authedQuery
    .input(z.object({ status: z.string().optional() }).optional())
    .query(async ({ ctx, input }) => {
      const db = getDb();
      const isStaff = ctx.user.role === "staff" || ctx.user.role === "master";

      const conditions = isStaff ? undefined : eq(projects.userId, ctx.user.id);
      const statusFilter = input?.status ? eq(projects.status, input.status as any) : undefined;

      const where = conditions && statusFilter
        ? and(conditions, statusFilter)
        : conditions || statusFilter;

      return db.select().from(projects).where(where).orderBy(desc(projects.createdAt));
    }),

  getById: authedQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const db = getDb();
      const isStaff = ctx.user.role === "staff" || ctx.user.role === "master";

      const project = await db.select().from(projects).where(eq(projects.id, input.id)).then(rows => rows[0]);

      if (!project) throw new Error("Project not found");
      if (!isStaff && project.userId !== ctx.user.id) throw new Error("Unauthorized");

      const steps = await db.select().from(projectSteps).where(eq(projectSteps.projectId, input.id)).orderBy(projectSteps.order);

      return { ...project, steps };
    }),

  create: publicQuery
    .input(z.object({
      title: z.string().min(1),
      package: z.enum(["standard", "premium", "agency", "monthly", "custom"]),
      projectType: z.enum(["single", "bulk", "monthly"]),
      category: z.enum(["showreel", "reels", "brand_films", "ads", "documentary", "color_grading", "motion_graphics"]),
      budget: z.number().optional(),
      deliveryDays: z.number().optional(),
      notes: z.string().optional(),
      referenceLink: z.string().optional(),
      mood: z.string().optional(),
      userId: z.number().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(projects).values({
        ...input,
        userId: input.userId || 0,
        status: "pending",
      });

      const projectId = Number(result[0].insertId);

      const defaultSteps = [
        { step: "Project Review", order: 0 },
        { step: "Script/Structure", order: 1 },
        { step: "First Cut", order: 2 },
        { step: "Client Review", order: 3 },
        { step: "Revisions", order: 4 },
        { step: "Final Delivery", order: 5 },
      ];

      await db.insert(projectSteps).values(
        defaultSteps.map(s => ({ ...s, projectId }))
      );

      return { id: projectId, message: "Project created successfully" };
    }),

  updateStatus: staffQuery
    .input(z.object({ id: z.number(), status: z.enum(["pending", "active", "in_review", "revision", "delivered", "completed", "cancelled"]) }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.update(projects).set({ status: input.status }).where(eq(projects.id, input.id));
      return { success: true };
    }),

  update: authedQuery
    .input(z.object({
      id: z.number(),
      title: z.string().optional(),
      notes: z.string().optional(),
      referenceLink: z.string().optional(),
      mood: z.string().optional(),
      assignedEditor: z.number().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      await db.update(projects).set(data).where(eq(projects.id, id));
      return { success: true };
    }),

  assignEditor: staffQuery
    .input(z.object({ id: z.number(), editorId: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.update(projects).set({ assignedEditor: input.editorId }).where(eq(projects.id, input.id));
      return { success: true };
    }),
});
