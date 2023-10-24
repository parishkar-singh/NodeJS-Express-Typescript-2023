import {Request, Response} from 'express';
import {CreatePromptInput, DeletePromptInput, GetPromptInput, UpdatePromptInput} from "../schema/prompt.schema";
import {createPrompt, deletePrompt, getPrompt, updatePrompt} from "../service/prompt.service";
import logger from "../utils/logger";

export async function createPromptHandler(req: Request<{}, {}, CreatePromptInput['body']>, res: Response) {
    try {
        const userId = res.locals.user._id;
        const body = req.body;
        const prompt = await createPrompt({...body, user: userId});
        res.send(prompt);
    } catch (e) {
        logger.error(e);
    }
}

export async function getPromptHandler(req: Request<GetPromptInput['params']>, res: Response) {
    try {
        const promptId = req.params.promptId;
        const prompt = await getPrompt({promptId});
        if (!prompt) {
            return res.sendStatus(404);
        }
        return res.send(prompt);
    } catch (e) {
        logger.error(e);
    }
}

export async function updatePromptHandler(req: Request<UpdatePromptInput['params']>, res: Response) {
    try {
        const userId = res.locals.user._id;
        const promptId = req.params.promptId;
        console.log(promptId)
        const update = req.body;
        const prompt = await getPrompt({promptId});
        if (!prompt) {
            return res.sendStatus(404);
        }
        if (String(prompt.user) !== userId) {
            return res.sendStatus(403);
        }
        // const updatedPrompt=await updatePrompt({promptId}, update, {new: true});
        const updatedPrompt = await updatePrompt({promptId}, update, {new: true});
        return res.send(updatedPrompt);
    } catch (e) {
        logger.error(e);
    }
}

export async function deletePromptHandler(req: Request<DeletePromptInput["params"]>, res: Response) {
    try {
        const userId = res.locals.user._id;
        const promptId = req.params.promptId;
        const prompt = await getPrompt({promptId});
        if (!prompt) {
            return res.sendStatus(404);
        }
        if (String(prompt.user) !== userId) {
            return res.sendStatus(403);
        }
        await deletePrompt({promptId});
        return res.sendStatus(200);
    } catch (e) {
        logger.error(e);
    }

}
