import config from "config";
import 'dotenv/config'
import ReleaseModel from "../models/release.model";
interface updaterParams {
    target: string,
    arch: string,
    current_version: string
}
export async function getRelease({target, arch, current_version}:{target: string, arch: string, current_version: string}) {
    const release = await ReleaseModel.findOne({target, arch, current_version});
    if (!release) {
        return false;
    }
    return release;
}
