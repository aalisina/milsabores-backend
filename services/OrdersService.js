const { Order } = require('../models');

module.exports = {
  create: (body) => new Order(body).save(),
  findAll: () => Order.find(),
  findOrdersUser: (id) => Order.find({ user: id }),
};
