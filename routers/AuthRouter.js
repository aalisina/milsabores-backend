const express = require('express');

const router = express.Router();

const { UserValidator } = require('../validators');
const { UserController } = require('../controllers');

router.post('/signup', UserValidator.create, UserController.signup);
router.post('/login', UserValidator.login, UserController.login);

module.exports = router;
