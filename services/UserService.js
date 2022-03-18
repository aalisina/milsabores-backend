const { User } = require('../models');

module.exports = {
  create: (body) => new User(body).save(),
};
