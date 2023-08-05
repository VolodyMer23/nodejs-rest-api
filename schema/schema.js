import Joi from "joi";

const contactSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    "any.required": "missing required name field",
  }),
  email: Joi.string().trim().email().required().messages({
    "any.required": "missing required email field",
  }),
  phone: Joi.string().required().messages({
    "any.required": "missing required phone field",
  }),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

export default { contactSchema, updateFavoriteSchema };
