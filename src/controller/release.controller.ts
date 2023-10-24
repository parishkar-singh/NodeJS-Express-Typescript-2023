import {Request, Response} from 'express';
import logger from "../utils/logger";
import {getRelease} from "../service/release.service";

interface updaterParams {
    target: string,
    arch: string,
    current_version: string
}
export async function updateHandler(req: Request<updaterParams>, res: Response) {
    try {
        const {target,arch,current_version} = req.params;
        // const arch = req.params.arch;
        // const current_version = req.params.current_version;
        const release = await getRelease({target, arch, current_version});
        if (!release) {
            return res.sendStatus(404);
        }
        return res.send(release);
    } catch (e) {
        logger.error(e);
    }
}
