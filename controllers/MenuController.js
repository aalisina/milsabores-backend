const { MenuService } = require('../services');

module.exports = {
  create: async (req, res) => {
    const { body } = req;
    try {
      const menu = await MenuService.create(body);
      res.status(201).json(menu);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  getMenu: async (req, res) => {
    try {
      const menu = await MenuService.getMenu();
      res.status(200).json(menu);
    } catch (err) {
      res.status(400).json(err);
    }
  },
};
