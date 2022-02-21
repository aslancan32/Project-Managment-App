import Joi from "joi";

const prejectCreteValiation = Joi.object({
    name: Joi.string().min(5).max(40).required()
})

export {prejectCreteValiation}