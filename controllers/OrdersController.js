/* eslint-disable consistent-return */
const { OrdersService, UserService } = require('../services');
const webSocket = require('../index');
const { newOrderMaker } = require('../utils');

module.exports = {
  create: async (req, res) => {
    const { body } = req;
    const { user } = body;
    try {
      const userFromDB = await UserService.findOne(user);
      if (!userFromDB) return res.status(400).json({ message: 'User does not exist.' });
      const order = await OrdersService.create(body);

      // Get the name and address of the user and sent it in a new format
      const respObj = newOrderMaker(userFromDB, order);

      webSocket.io.emit('new-order', respObj);
      res.status(201).json(respObj);
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
  // Implement functionality to send all the orders of today to the admin
  findOrdersToday: async (req, res) => {
    try {
      const ordersToday = await OrdersService.findOrdersToday();
      if (!ordersToday) return res.status(400).json({ message: 'No orders for today.' });

      // implement a function to sort the orders and populate users with their data
      // const sortedOrders = sortOrdersToday(ordersToday)

      res.status(400).json(ordersToday);
    } catch (err) {
      res.status(400).json(err);
    }
  },

};
