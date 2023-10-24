import Express from "express";
import validateResource from "../middleware/validateResource";
import {createUserSchema, verifyUserSchema} from "../schema/user.schema";
import {createUserHandler, deleteUserHandler, getCurrentUser, verifyUserHandler} from "../controller/user.controller";
import requireUser from "../middleware/requireUser";

const router = Express.Router();

// GET Request
router.get('/me', requireUser,getCurrentUser);
router.post('/',validateResource(createUserSchema),createUserHandler);
// POST Request
router.post('/verify/:id/:verificationCode',validateResource(verifyUserSchema),verifyUserHandler);
// DELETE Request
router.delete('/',deleteUserHandler);
export default router;
