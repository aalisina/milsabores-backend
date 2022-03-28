const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      protein: Joi.array().items(Joi.string()).required(),
      drink: Joi.array().items(Joi.string()).required(),
      soup_fruit: Joi.array().items(Joi.string()).required(),
      sides: Joi.array().items(Joi.string()).required(),
    }),
  }),
};
