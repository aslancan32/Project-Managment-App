import Joi from "joi";

const SectionValiation = Joi.object({
    name: Joi.string().min(5).max(40).required(),
    project_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
})

const SectionUpdateValiation = Joi.object({
    name: Joi.string().min(5).max(40),
    project_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
})
export {SectionValiation, SectionUpdateValiation}