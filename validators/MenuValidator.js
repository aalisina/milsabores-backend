const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      protein: Joi.array().required(),
      drink: Joi.array().required(),
      soup_fruit: Joi.array().required(),
      sides: Joi.array().required(),
    }),
  }),
};
