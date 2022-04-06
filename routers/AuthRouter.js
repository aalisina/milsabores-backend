const express = require('express');

const router = express.Router();

const { UserValidator } = require('../validators');
const { UserController } = require('../controllers');

router.post('/signup', UserValidator.create, UserController.signup);
router.post('/login', UserValidator.login, UserController.login);
router.get('/verify/:id', UserValidator.verifyEmail, UserController.verifyEmail);
router.post('/forgot', UserValidator.forgotPassword, UserController.forgotPassword);
router.get('/forgot/:userId/:key', UserValidator.changePassword, UserController.changePassword);
router.post('/forgot/:userId/:key', (req, res) => res.send('Working.'),
// UserValidator.updatePassword, UserController.updatePassword
);

module.exports = router;
