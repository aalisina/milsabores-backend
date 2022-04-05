/* eslint-disable no-console */
/* eslint-disable consistent-return */
const { UserService } = require('../services');
const { comparePasswords, createToken, makeResetKey } = require('../utils');
const { sendEmailVerification, sendPasswordReset } = require('../nodemailer');

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
      if (userExists) return res.status(400).json({ message: 'Email taken.' });
      const user = await UserService.create(req.body);
      user.password = undefined;

      // Send verification email
      sendEmailVerification(user).then(() => console.log('Email sent to verify'))
        .catch((err) => console.log('Error while sending confirmation email.', err));
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
  verifyEmail: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await UserService.findOne(id);
      if (!user) return res.status(400).json({ message: 'User not exist.' });
      const userEmailVerified = await UserService.verifyEmail(user);

      // Prevent sending user's hashed password back to client
      userEmailVerified.password = undefined;

      // Implement function to show a success message that the email has been verified
      res.render('email-verification/index', {
        frontEndUrl: process.env.FRONT_END_BASE_URL,
        user: userEmailVerified,
      });
      // Redirect to the homepage of the frontend
    } catch (err) {
      res.status(400).json(err);
    }
  },
  forgotPassword: async (req, res) => {
    const { email } = req.body;

    try {
      const user = await UserService.findOneByEmail(email);

      // Not sending an error message for privacy reasons
      if (!user) return res.status(400).json({ message: 'If user exists you will get an email to reset your password' });
      // Implement function to make a reset key for the user
      // using uuid makeResetKey()
      const key = makeResetKey();
      const fieldToUpdate = {
        forgot_password_key: key,
      };
      // save resetkey in user
      const updatedUser = await UserService.updateOne(user, fieldToUpdate);

      // Email user reset link
      sendPasswordReset(updatedUser);

      res.status(200).json({ message: 'If user exists you will get an email to reset your password' });
    } catch (err) {
      res.status(400).json(err);
    }
  },
};
