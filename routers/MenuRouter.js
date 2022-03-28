const express = require('express');
// const { MenuValidator } = require('../validators');
const { MenuController } = require('../controllers');

const router = express.Router();

router.post('/menu', MenuController.create,

  // MenuValidator.create

);

module.exports = router;
