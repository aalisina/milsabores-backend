const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      address: Joi.string().required(),
      phone: Joi.string().required(),
    }),
  }),
  findOne: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  updateOne: celebrate({
    [Segments.BODY]: Joi.object().keys({
      first_name: Joi.string(),
      last_name: Joi.string(),
      email: Joi.string(),
      password: Joi.string(),
      address: Joi.string(),
      phone: Joi.string(),
      email_verified: Joi.boolean(),
      forgot_password_key: Joi.string(),

    }),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  deleteOne: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  login: celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  verifyEmail: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  forgotPassword: celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
    }),
  }),
  changePassword: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      userId: Joi.string().required(),
      key: Joi.string().required(),
    }),
  }),
  updatePassword: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      userId: Joi.string().required(),
      key: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      password: Joi.string().required(),
    }),
  }),
};
