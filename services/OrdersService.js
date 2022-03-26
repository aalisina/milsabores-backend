const { Order } = require('../models');

module.exports = {
  create: (body) => new Order(body).save(),
};
