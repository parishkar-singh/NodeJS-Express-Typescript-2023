import UserModel, {UserDocument, UserInput} from "../models/user.model";
import {omit} from "lodash";
import config from "config";
import qs from 'querystring'
import {FilterQuery, QueryOptions, UpdateQuery} from "mongoose";
import axios from "axios";
import logger from "../utils/logger";

interface GoogleTokenResult {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    id_token: string;
    token_type: string;
}
interface GoogleUser{
    id:string;
    email:string;
    verified_email:boolean;
    name:string;
    given_name:string;
    family_name:string;
    picture:string;
    locale:string;
}
export async function createUser(input: UserInput) {
    try {
        const user = await UserModel.create(input);
        return omit(user.toJSON(), "password");
    } catch (e: any) {
        throw new Error(e);
    }
}

// delete all user and thier associated sessions
export async function deleteAllUsers() {
    try {
        await UserModel.deleteMany({});
        return true;
    } catch (e: any) {
        throw new Error(e);
    }
}

export async function validatePassword({email, password}: { email: string, password: string }) {
    const user = await UserModel.findOne({email});
    if (!user) return false;
    const isValid = await user.comparePassword(password);
    if (!isValid) return false;
    return omit(user.toJSON(), "password");
}
export async function findUser(query: FilterQuery<UserDocument>) {
    return UserModel.findOne(query).lean();
}
export async function findAndUpdateUser(query: FilterQuery<UserDocument>, update: UpdateQuery<UserDocument>,options:QueryOptions) {
    return UserModel.findOneAndUpdate(query,update,options).lean();
}
export async function getGoogleOauthTokens({code}: { code: string }): Promise<GoogleTokenResult> {
    const url = 'https://oauth2.googleapis.com/token';
    const values = {
        code,
        client_id: config.get<string>('googleClientId'),
        client_secret: config.get<string>('googleClientSecret'),
        redirect_uri: config.get<string>('googleAuthRedirect'),
        grant_type: 'authorization_code',
    }
    try {
        const res = await axios.post<GoogleTokenResult>(url, qs.stringify(values), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return res.data;
    } catch (e: any) {
        logger.error(e);
        throw new Error('Google token exchange failed');
    }
}
export async function getGoogleUser({id_token,access_token}:{id_token:string,access_token : string}):Promise<GoogleUser>{
    try{
        const res=await axios.get<GoogleUser>(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,{
            headers:{
                Authorization:`Bearer ${id_token}`
            }
        })
        return res.data;
    }catch (e:any){
        logger.error(e);
        throw new Error('Failed to fetch google user (USER SERVICE ERROR)');
    }
}
