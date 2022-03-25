const express = require('express');

const router = express.Router();

router.post('/orders', (req, res) => {
  const { body } = req;
  try {
    res.status(201).json(body);
  } catch (err) {
    res.status(400).json(err);
  }
});
module.exports = router;
