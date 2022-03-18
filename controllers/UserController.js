const { UserService } = require('../services');

module.exports = {
  create: async (req, res) => {
    try {
      const user = await UserService.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },
};
