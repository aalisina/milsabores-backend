const express = require('express');

const router = express.Router();
const { UserController } = require('../controllers');

router.post('/api/users', UserController.create);

module.exports = router;
