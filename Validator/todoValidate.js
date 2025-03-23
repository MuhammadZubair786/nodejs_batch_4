const Joi = require("joi")

const titleValidate = Joi.object({
    title: Joi.string().required().messages({
        'string.base': `Enter title`,
        'string.empty': `Enter title`,
        'any.required': `title is required`,
    }),
   

})

module.exports= titleValidate
