const express = require('express');
const { OrderValidator } = require('../validators');

const router = express.Router();

router.post('/orders', OrderValidator.create, (req, res) => {
  const { body } = req;
  try {
    res.status(201).json(body);
  } catch (err) {
    res.status(400).json(err);
  }
});
module.exports = router;
