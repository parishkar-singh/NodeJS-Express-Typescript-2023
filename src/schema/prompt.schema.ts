import {object, string, TypeOf} from 'zod';


const payload = {
    body: object({
        prompt: string({
            required_error: 'Prompt is required'
        }),
    })
}
const params = {
    params: object({
        promptId: string({
            required_error: 'PromptId is required'
        })
    })
}

export const createPromptSchema = object({
    ...payload
})
export const updatePromptSchema = object({
    ...payload,...params
})

export const deletePromptSchema = object({
    ...params
})
export const getPromptSchema = object({
    ...params
})

export type CreatePromptInput= TypeOf<typeof createPromptSchema>;
export type UpdatePromptInput= TypeOf<typeof updatePromptSchema>;
export type DeletePromptInput= TypeOf<typeof deletePromptSchema>;
export type GetPromptInput= TypeOf<typeof getPromptSchema>;
