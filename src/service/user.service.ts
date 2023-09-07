import UserModel, {UserInput} from "../models/user.model";
import {omit} from "lodash";

export async function createUser(input: UserInput) {
    try {
        const user = await UserModel.create(input);
        return omit(user.toJSON(), "password");
    } catch (e: any) {
        throw new Error(e);
    }
}
