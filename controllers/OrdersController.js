const { OrdersService } = require('../services');
const webSocket = require('../index');

module.exports = {
  create: async (req, res) => {
    const { body } = req;
    try {
      const order = await OrdersService.create(body);

      webSocket.io.emit('new-order', order);
      console.log('Emitted');
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
