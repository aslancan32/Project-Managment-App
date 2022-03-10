import Joi from "joi";

const taskValiation = Joi.object({
    title: Joi.string().min(3).max(80).required(),
    section_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    project_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),

    description: Joi.string().min(3).max(80),
    assigned_to: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    due_date: Joi.date(),
    statuses: Joi.array(),
    order: Joi.number(),
    is_complated: Joi.boolean(),
    comments: Joi.array(),
    media:Joi.array(),
    sub_tasks: Joi.array()
})

const taskUpdateValiation = Joi.object({
    title: Joi.string().min(3).max(80),
    section_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    project_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),

    description: Joi.string().min(3).max(80),
    assigned_to: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    due_date: Joi.date(),
    statuses: Joi.array(),
    order: Joi.number(),
    is_complated: Joi.boolean(),
    comments: Joi.array(),
    media:Joi.array(),
    sub_tasks: Joi.array()
})

const taskCommentValiation = Joi.object({
    comment: Joi.string().required(),
})
export {taskValiation, taskUpdateValiation, taskCommentValiation}