const { User } = require('../models');

module.exports = {
  create: (body) => new User(body).save(),
  findAll: () => User.find(),
  findOne: (id) => User.findById(id),
  updateOne: async (id, body) => {
    const user = await User.findById(id);
    Object.assign(user, body);
    return user.save();
  },
  deleteOne: (id) => User.findByIdAndDelete(id),
};
