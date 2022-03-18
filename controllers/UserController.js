const { User } = require('../models');

module.exports = {
  create: async (req, res) => {
    try {
      const user = await new User(req.body).save();
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },
};
