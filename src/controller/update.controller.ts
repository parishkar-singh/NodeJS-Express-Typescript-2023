import {Request, Response} from 'express';
import logger from "../utils/logger";
import {createUpdate, findAllVersions, findLatestVersion} from "../service/update.service";

export const getUpdateHandler = async (req: Request, res: Response) => {
    try {
        const updates = await findAllVersions();
        return res.send(updates).status(200);
    } catch (e) {
        logger.error(e);
    }
}
export const getLatestUpdateHandler = async (req: Request, res: Response) => {
    try {
        const update = await findLatestVersion();
        return res.send(update).status(200);
    } catch (e) {
        logger.error(e);
    }
}
export const createUpdateHandler = async (req: Request, res: Response) => {
    try {
        const update = await createUpdate(req.body);
        return res.send(update).status(200);
    } catch (e) {
        logger.error(e);
    }
}

