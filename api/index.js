const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const cors = require('cors');
const flash = require('connect-flash');
const path = require('path');

const api = express();

// Setting up view engine
api.set('views', path.join(__dirname, 'views'));
api.set('view engine', 'ejs');
const PORT = process.env.PORT || 3000;

api.use(session({
  secret: process.env.EXPRESS_SESSION_SECRET,
  saveUninitialized: true,
  resave: true,
}));
api.use(flash());
api.use(cors());
api.use(morgan('common'));
api.use(express.urlencoded({ extended: true }));
api.use(express.json({ extended: true }));
api.use('/api/v1', require('../routers'));

api.get('/', (req, res) => {
  res.send('Backend running.');
});

module.exports = { api, PORT };
