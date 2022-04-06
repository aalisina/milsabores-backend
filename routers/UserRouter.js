const express = require('express');

const router = express.Router();
const { UserValidator } = require('../validators');
const { UserController } = require('../controllers');
const { verifyTokenUser, verifyTokenAdmin } = require('../middlewares');

router.post('/users', verifyTokenAdmin, UserValidator.create, UserController.create);
router.get('/users', verifyTokenAdmin, UserController.findAll);
router.get('/users/:id', verifyTokenUser, UserValidator.findOne, UserController.findOne);
router.patch('/users/:id', verifyTokenAdmin, UserValidator.updateOne, UserController.updateOne);
router.delete('/users/:id', verifyTokenAdmin, UserValidator.deleteOne, UserController.deleteOne);

module.exports = router;
