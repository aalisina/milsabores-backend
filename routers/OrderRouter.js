const express = require('express');
const { OrderValidator } = require('../validators');
const { OrdersController } = require('../controllers');

const router = express.Router();

router.post('/orders', OrderValidator.create, OrdersController.create);
module.exports = router;
