/* eslint-disable consistent-return */
const { OrdersService } = require('../services');
const webSocket = require('../index');

module.exports = {
  create: async (req, res) => {
    const { body } = req;
    try {
      const order = await OrdersService.create(body);

      // Get all the existing orders from the day and add it to the last order
      // Or make another endpoint to get the orders of the day

      // Get the names and addresses of the users and sent it in a new format

      webSocket.io.emit('new-order', order);
      res.status(201).json(order);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  findAll: async (req, res) => {
    try {
      const orders = await OrdersService.findAll();
      res.status(200).json(orders);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  findOrdersUser: async (req, res) => {
    const { userId } = req.params;
    try {
      const ordersUser = await OrdersService.findOrdersUser(userId);
      if (!ordersUser.length) return res.status(400).json({ message: 'User has no orders' });
      res.status(200).json(ordersUser);
    } catch (err) {
      res.status(400).json(err);
    }
  },

};
