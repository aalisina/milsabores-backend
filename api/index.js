const express = require('express');
const morgan = require('morgan');

const api = express();
const PORT = process.env.PORT || 3000;

api.use(morgan('common'));
api.use(express.urlencoded({ extended: true }));
api.use(express.json({ extended: true }));
api.use('/api/v1', require('../routers'));

api.get('/', (req, res) => {
  res.send('Backend running.');
});

module.exports = { api, PORT };
