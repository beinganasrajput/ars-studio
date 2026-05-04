import { authRouter } from "./auth-router";
import { projectRouter } from "./project-router";
import { portfolioRouter } from "./portfolio-router";
import { paymentRouter } from "./payment-router";
import { reviewRouter } from "./review-router";
import { messageRouter } from "./message-router";
import { staffRouter } from "./staff-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  project: projectRouter,
  portfolio: portfolioRouter,
  payment: paymentRouter,
  review: reviewRouter,
  message: messageRouter,
  staff: staffRouter,
});

export type AppRouter = typeof appRouter;
