import Joi from "joi";

const contactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().trim().email().required(),
  phone: Joi.number().integer().required(),
});

export default contactSchema;
