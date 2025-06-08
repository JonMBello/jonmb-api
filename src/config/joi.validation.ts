import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  MONGO_URL: Joi.string().required(),
  APP_PORT: Joi.number().default(3000),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES: Joi.string().required(),
  JWT_AUD: Joi.string().required(),
  JWT_ISS: Joi.string().required(),
  MOBILE_JWT_EXPIRES: Joi.string().required(),
  CLIENT_API_KEY: Joi.string().required(),
  ADMIN_API_KEY: Joi.string().required(),
});
