import Joi from "joi";

const userValidation = Joi.object({
    full_name: Joi.string().min(3).max(45).required(),
    password: Joi.string().min(6).max(45).required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
})

const loginValidation = Joi.object({
    password: Joi.string().min(6).max(45).required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
})

const resetPasswordValidation = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
})

const updateUserInfoValidation = Joi.object({
    full_name: Joi.string().min(3).max(45),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})

export { userValidation, loginValidation, resetPasswordValidation, updateUserInfoValidation}