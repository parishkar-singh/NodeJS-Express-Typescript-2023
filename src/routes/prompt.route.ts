import Express from "express";
import validateResource from "../middleware/validateResource";
import requireUser from "../middleware/requireUser";
import {
    createPromptHandler,
    deletePromptHandler,
    getPromptHandler,
    updatePromptHandler
} from "../controller/prompt.controller";
import {createPromptSchema, deletePromptSchema, getPromptSchema, updatePromptSchema} from "../schema/prompt.schema";

const router = Express.Router();

router.get('/:promptId',[requireUser,validateResource(getPromptSchema)],getPromptHandler);
router.post('/',[requireUser,validateResource(createPromptSchema)],createPromptHandler);
router.put('/:promptId',[requireUser,validateResource(updatePromptSchema)],updatePromptHandler);
router.put('/:promptId',[requireUser,validateResource(deletePromptSchema)],deletePromptHandler);

export default router;
