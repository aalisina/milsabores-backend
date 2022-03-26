const { OrdersService } = require('../services');

module.exports = {
  create: async (req, res) => {
    const { body } = req;
    try {
      const order = await OrdersService.create(body);
      res.status(201).json(order);
    } catch (err) {
      res.status(400).json(err);
    }
  },

};
