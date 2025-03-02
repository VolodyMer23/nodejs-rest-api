import Joi from "joi";
import { emailRegexp } from "../constants/regexp.js";

const contactSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    "any.required": "missing required name field",
  }),
  email: Joi.string().trim().email().pattern(emailRegexp).required().messages({
    "any.required": "missing required email field",
  }),
  phone: Joi.string().required().messages({
    "any.required": "missing required phone field",
  }),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "missing field favorite",
  }),
});

export default { contactSchema, updateFavoriteSchema };
