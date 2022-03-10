import Joi from "joi";

const projectCreteValiation = Joi.object({
    name: Joi.string().min(5).max(40).required()
})

export {projectCreteValiation}