const express = require('express');
const { errors } = require('celebrate');

const router = express.Router();

router.use(require('./UserRouter'));
router.use(require('./AuthRouter'));
router.use(require('./OrderRouter'));
router.use(require('./MenuRouter'));

router.use(errors({ statusCode: 400, message: 'Validation failed.' }));

module.exports = router;
