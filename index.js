/* eslint-disable no-console */
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const { api, PORT } = require('./api');
const { verifySocketAdmin } = require('./middlewares');

api.use(express.static('public'));
const server = http.createServer(api);

const { MONGO_URI } = require('./config');

const io = new Server(server);

mongoose.connect(
  MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
)
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log('Error occured while trying to connect to DB', err));

server.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`
    ################################################
        🛡️  Server listening on port: ${PORT} 🛡️ 
    ################################################
  `);
});

io.on('connection', (socket) => {
  console.log('Connection success', socket.id);
  socket.on('disconnect', () => {
    console.log('Connection disconnected', socket.id);
  });
});

// io.use(verifySocketAdmin);

module.exports.io = io;
