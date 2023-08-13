import Joi from "joi";
import { emailRegexp } from "../constants/regexp.js";

const subscriptionTypes = ["starter", "pro", "business"];

const userSingupSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "missing required email field",
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": "missing required password field",
  }),
});

const userSinginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionTypes)
    .required(),
});


export default { userSingupSchema, userSinginSchema, subscriptionSchema };
