/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  comparePasswords: (userPassword, reqPassword) => bcrypt.compareSync(reqPassword, userPassword),
  createToken: (user) => {
    const payload = {
      _id: user._id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
      email_verified: user.email_verified,
      address: user.address,
      // exp: '10000d',
    };
    try {
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      return token;
    } catch (err) {
      return undefined;
    }
  },
  newOrderMaker: (user, order) => {
    const respObj = {
      first_name: user.first_name,
      last_name: user.last_name,
      address: user.address,
      email: user.email,
      userId: user._id,
      orderId: order._id,
      order,
    };
    return respObj;
  },
  makeResetKey: () => {
    const key = uuidv4();
    return key;
  },
};
