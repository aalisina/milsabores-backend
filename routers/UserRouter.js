const express = require('express');

const router = express.Router();
const { UserValidator } = require('../validators');
const { UserController } = require('../controllers');

router.post('/users', UserValidator.create, UserController.create);

module.exports = router;
