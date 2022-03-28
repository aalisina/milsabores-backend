const express = require('express');
const { MenuValidator } = require('../validators');
const { MenuController } = require('../controllers');

const router = express.Router();

router.post('/menu', MenuValidator.create, MenuController.create);

module.exports = router;
