import config from "config";
import updateModel from "../models/update.model";
import { versionDTO, platform} from "../models/update.model";
import UpdateModel from "../models/update.model";

export const findAllVersions = async (): Promise<versionDTO[]> => {
    const updates = await UpdateModel.find();
    return updates.map(update => update.toObject() as versionDTO);

};
export const findLatestVersion = async (): Promise<versionDTO> => {
    const updates = await UpdateModel.find();
    const latest = updates[updates.length-1]
    return latest as versionDTO;
}
export const createUpdate = async (updateData: versionDTO): Promise<versionDTO> => {
    const update = new UpdateModel(updateData);
    return update.save();
};
