import mongoose from "mongoose";
import crypto from 'crypto';

import {UserDocument} from "./user.model";

function generateRandomString(length: number): string {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

export interface PromptInput  {
    user: UserDocument['_id'];
    prompt: string;
}
export interface PromptDocument extends PromptInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

// Schema
const promptSchema: mongoose.Schema = new mongoose.Schema({
    promptId: {type: String,required:true, unique:true, default: () => `prompt_${generateRandomString(10)}`},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    prompt: {type: String, required: true},
}, {timestamps: true});

const PromptModel = mongoose.model<PromptDocument>('Prompt', promptSchema);
export default PromptModel
