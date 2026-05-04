import {
  pgTable,
  pgEnum,
  serial,
  varchar,
  text,
  timestamp,
  bigint,
  integer,
  json,
  boolean,
} from "drizzle-orm/pg-core";

// Postgres requires Enums to be defined separately
export const roleEnum = pgEnum("role", ["client", "staff", "master"]);
export const packageEnum = pgEnum("package", ["standard", "premium", "agency", "monthly", "custom"]);
export const projectTypeEnum = pgEnum("projectType", ["single", "bulk", "monthly"]);
export const categoryEnum = pgEnum("category", ["showreel", "reels", "brand_films", "ads", "documentary", "color_grading", "motion_graphics"]);
export const statusEnum = pgEnum("status", ["pending", "active", "in_review", "revision", "delivered", "completed", "cancelled"]);

// Core user table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("unionId", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  role: roleEnum("role").default("client").notNull(),
  phone: varchar("phone", { length: 50 }),
  whatsapp: varchar("whatsapp", { length: 50 }),
  locale: varchar("locale", { length: 10 }).default("en"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
});

// Client projects
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  userId: bigint("userId", { mode: "number" }).notNull(),
  title: varchar("title", { length: 255 }),
  package: packageEnum("package").default("standard"),
  projectType: projectTypeEnum("projectType").default("single"),
  category: categoryEnum("category"),
  status: statusEnum("status").default("pending"),
  budget: integer("budget"),
  depositPaid: integer("depositPaid").default(0),
  finalPaid: integer("finalPaid").default(0),
  revisionsUsed: integer("revisionsUsed").default(0),
  revisionsAllowed: integer("revisionsAllowed").default(3),
  deliveryDays: integer("deliveryDays"),
  notes: text("notes"),
  referenceLink: varchar("referenceLink", { length: 500 }),
  mood: varchar("mood", { length: 100 }),
  assignedEditor: bigint("assignedEditor", { mode: "number" }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});