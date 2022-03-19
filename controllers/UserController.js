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
  findAll: async (req, res) => {
    try {
      const users = await UserService.findAll();
      res.status(200).json(users);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  findOne: async (req, res) => {
    try {
      const user = await UserService.findOne(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  updateOne: async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
      const updatedUser = await UserService.updateOne(id, body);
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  deleteOne: async (req, res) => {
    const { id } = req.params;
    try {
      await UserService.deleteOne(id);
      res.status(204).json({ message: `User with id: ${id} deleted from DB.` });
    } catch (err) {
      res.status(400).json(err);
    }
  },
};
