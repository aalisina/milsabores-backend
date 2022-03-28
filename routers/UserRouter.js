const express = require('express');

const router = express.Router();
const { UserValidator } = require('../validators');
const { UserController } = require('../controllers');
const { verifyTokenUser, verifyTokenAdmin } = require('../middlewares');

router.post('/users', verifyTokenUser, UserValidator.create, UserController.create);
router.get('/users', verifyTokenAdmin, UserController.findAll);
router.get('/users/:id', UserValidator.findOne, UserController.findOne);
router.patch('/users/:id', UserValidator.updateOne, UserController.updateOne);
router.delete('/users/:id', UserValidator.deleteOne, UserController.deleteOne);

module.exports = router;
