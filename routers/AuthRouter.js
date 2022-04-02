const express = require('express');

const router = express.Router();

const { UserValidator } = require('../validators');
const { UserController } = require('../controllers');

router.post('/signup', UserValidator.create, UserController.signup);
router.post('/login', UserValidator.login, UserController.login);
router.patch('/verify/:id', UserValidator.verifyEmail, UserController.verifyEmail);

module.exports = router;
