const Joi = require("joi")

const userValidate = Joi.object({
    email: Joi.string().required().email().messages({
        'string.base': `Enter email`,
        'string.empty': `Enter email`,
        'string.email': `Email must be a valid email address`,
        'any.required': `Email is required`,
    }),
    password: Joi.string().required().min(2).max(10).pattern(new RegExp('^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$')).messages({
        'string.base': `Enter password`,
        'string.empty': `Enter password`,
        'string.min': `Password must be greater then {#limit}`,
        'string.max': `Password must be lesss then {#limit}`,
        'string.pattern':"special",
        'any.required': `Password is required`,
    }),

})

module.exports= userValidate
