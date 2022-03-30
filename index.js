/* eslint-disable no-console */
require('dotenv').config();
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const http = require('http');
const { api, PORT } = require('./api');

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
    // eslint-disable-next-line no-undef
    console.log(err);
    process.exit(1);
    return;
  }
  // eslint-disable-next-line no-undef
  console.log(`
    ################################################
        🛡️  Server listening on port: ${PORT} 🛡️ 
    ################################################
  `);
});

// const io = require('./socket').init(server);

io.on('connection', (socket) => {
  console.log('Connection success', socket.id);
  socket.on('disconnect', () => {
    console.log('Connection disconnected', socket.id);
  });
});

module.exports.io = io;
