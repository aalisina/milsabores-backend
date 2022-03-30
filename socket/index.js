/* eslint-disable consistent-return */
/* eslint-disable global-require */
const { Server } = require('socket.io');

let io;

module.exports = {
  init: (server) => {
    try {
      io = new Server(server);
      return io;
    } catch (err) {
      console.log(err);
    }
  },
  get: () => {
    if (!io) {
      throw new Error('socket is not initialized');
    }
    return io;
  },
};
