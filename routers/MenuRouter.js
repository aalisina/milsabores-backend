const express = require('express');
const { Menu } = require('../models');
// const { MenuValidator } = require('../validators');
// const { MenuController } = require('../controllers');

const router = express.Router();

router.post(
  '/menu',

  // MenuValidator.create, MenuController.create
  async (req, res) => {
    const { body } = req;
    try {
      const menu = await new Menu(body).save();
      res.status(201).json(menu);
    } catch (err) {
      res.status(400).json(err);
    }
  },
);

module.exports = router;
