/* eslint-disable consistent-return */
const { UserService } = require('../services');
const { comparePasswords, createToken } = require('../utils');

module.exports = {
  create: async (req, res) => {
    const { email } = req.body;
    try {
      const userExists = await UserService.findOneByEmail(email);
      if (userExists) return res.status(400).json({ message: 'Email taken.' });
      const user = await UserService.create(req.body);
      user.password = undefined;
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
      const user = await UserService.findOne(id);
      if (!user) return res.status(404).json({ message: 'User not found.' });
      const updatedUser = await UserService.updateOne(user, body);
      return res.status(200).json(updatedUser);
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
  signup: async (req, res) => {
    const { email } = req.body;
    try {
      const userExists = await UserService.findOneByEmail(email);
      if (userExists) res.status(400).json({ message: 'Email taken.' });
      const user = await UserService.create(req.body);
      user.password = undefined;
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await UserService.findOneByEmail(email);
      if (!user) return res.status(400).json({ Message: 'Error on credentials.' });
      const isValid = comparePasswords(user.password, password);
      if (!isValid) return res.status(400).json({ message: 'Error on credentials.' });
      // Generate a token
      const token = createToken(user);
      if (!token) return res.status(500).json({ message: 'Error on token creation' });
      res.status(200).json({ message: 'Login succesfull', token });
    } catch (err) {
      res.status(400).json(err);
    }
  },
};
