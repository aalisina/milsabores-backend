const express = require('express');
const { User } = require('../models');

const api = express();
const PORT = process.env.PORT || 3000;

api.use(express.urlencoded({ extended: true }));
api.use(express.json({ extended: true }));

api.get('/', (req, res) => {
  res.send('Backend running.');
});

api.post('/api/users', async (req, res) => {
  try {
    const user = await new User(req.body).save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = { api, PORT };
