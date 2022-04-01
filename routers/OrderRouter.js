const express = require('express');
const { OrderValidator } = require('../validators');
const { OrdersController } = require('../controllers');
const { verifyTokenAdmin } = require('../middlewares');

const router = express.Router();

router.post('/orders', OrderValidator.create, OrdersController.create);
router.get('/orders', OrdersController.findAll);
router.get('/orders/:userId', OrdersController.findOrdersUser);
router.get('/orders/today', verifyTokenAdmin, OrdersController.findOrdersToday);

module.exports = router;
