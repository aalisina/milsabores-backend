const express = require('express');
const { MenuValidator } = require('../validators');
const { MenuController } = require('../controllers');

const router = express.Router();

router.post('/menu', MenuValidator.create, MenuController.create);
router.get('/menu', MenuController.getMenu);

module.exports = router;
