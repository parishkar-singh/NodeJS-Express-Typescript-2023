import { Express, Router } from "express";
import healthRoutes from "./routes/health.route";
import userRoutes from "./routes/user.route";
import sessionRoutes from "./routes/session.route";
import promptRoutes from "./routes/prompt.route";
import releaseRoutes from "./routes/releases.route";
import updateRoutes from "./routes/update.route";
function routes(app: Express) {
    const apiRouter = Router();

    // Combine all the routes
    apiRouter.use('/health', healthRoutes);
    apiRouter.use('/users', userRoutes);
    apiRouter.use('/sessions', sessionRoutes);
    apiRouter.use('/prompts', promptRoutes);
    apiRouter.use('/releases',releaseRoutes)
    apiRouter.use('/updates',updateRoutes)

    // Every route in apiRouter will be prefixed with /api
    app.use('/api', apiRouter);
}

export default routes;
