const { celebrate, Joi, Segments } = require('celebrate');

const lunch = Joi.object().keys({
  protein: Joi.string().required(),
  drink: Joi.string().required(),
  quantity: Joi.number().required(),
});

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      lunches: Joi.array().items(lunch),
      user: Joi.string().required(),
    }),
  }),
};
