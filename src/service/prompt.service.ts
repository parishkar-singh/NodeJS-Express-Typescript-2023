import {FilterQuery, QueryOptions, UpdateQuery} from "mongoose";
import PromptModel, {PromptDocument, PromptInput} from "../models/prompt.model";
import logger from "../utils/logger";

export async function createPrompt(input: PromptInput) {
    try {
        return PromptModel.create(input)
    } catch (e) {
        logger.error(e);
    }
}

export async function getPrompt(query: FilterQuery<PromptDocument>, options: QueryOptions = {lean: true}) {
    try {
        return PromptModel.findOne(query, {}, options)
    } catch (e) {
        logger.error(e);
    }
}

export async function updatePrompt(query: FilterQuery<PromptDocument>, update: UpdateQuery<PromptDocument>, options: QueryOptions = {lean: true}) {
    try {
        return PromptModel.findOneAndUpdate(query, update, options)
    } catch (e) {
        logger.error(e);
    }
}

export async function deletePrompt(query: FilterQuery<PromptDocument>) {
    try {
        return PromptModel.deleteOne(query)
    }
    catch (e) {
        logger.error(e);
    }
}
