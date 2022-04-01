const { Order } = require('../models');

module.exports = {
  create: (body) => new Order(body).save(),
  findAll: () => Order.find(),
  findOrdersUser: (id) => Order.find({ user: id }),
  findOrdersToday: () => {
    const today = new Date();
    const startDate = today.setDate(today.getDate() - 1);
    const endDate = today.setDate(today.getDate() + 1);
    const ordersToday = Order.find({
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    });
    return ordersToday;
  },
};
