const express = require('express');
const { OrderValidator } = require('../validators');
const { OrdersController } = require('../controllers');
const { verifyTokenAdmin, verifyTokenUser } = require('../middlewares');

const router = express.Router();

router.post('/orders', OrderValidator.create, OrdersController.create);
router.get('/orders', verifyTokenAdmin, OrdersController.findAll);
router.get('/orders/today', verifyTokenAdmin, OrdersController.findOrdersToday);
router.get('/orders/users/:userId', verifyTokenUser, OrdersController.findOrdersUser);

module.exports = router;
