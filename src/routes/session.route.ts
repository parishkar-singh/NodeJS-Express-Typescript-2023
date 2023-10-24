import Express from "express";
import validateResource from "../middleware/validateResource";
import {createSessionSchema} from "../schema/session.schema";
import {
    createUserSessionHandler,
    deleteSessionHandler,
    getUserSessionsHandler,
    googleOAuthHandler
} from "../controller/session.controller";
import requireUser from "../middleware/requireUser";

// Routes
const router = Express.Router();
router.post('/',validateResource(createSessionSchema),createUserSessionHandler);
router.get('/',requireUser,getUserSessionsHandler);
router.delete('/',requireUser,deleteSessionHandler);
router.get('/oauth/google',googleOAuthHandler);

export default router;
