/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
const { OrdersService, UserService } = require('../services');
const webSocket = require('../index');
const { newOrderMaker } = require('../utils');
const { sendConfirmationMail } = require('../nodemailer');

module.exports = {
  create: async (req, res) => {
    const { body } = req;
    const { user, user_address } = body;
    try {
      const userFromDB = await UserService.findOne(user);
      if (!userFromDB) return res.status(400).json({ message: 'User does not exist.' });
      if (!userFromDB.address) return res.status(400).json({ message: 'User must give an address.' });
      if (!userFromDB.email_verified) return res.status(400).json({ message: 'Email of user must be verified.' });
      // update address if the body address does not match the one from the DB
      if (userFromDB.address !== user_address) {
        // update the user with the new address
        UserService.updateOne(userFromDB, { address: user_address });
      }

      const order = await OrdersService.create(body);

      // Get the name and address of the user and sent it in a new format
      const respObj = newOrderMaker(userFromDB, order);

      // Implement a functionality to e-mail the users his/her new order
      // Use nodemailer to do it
      try {
        sendConfirmationMail(respObj);
        webSocket.io.emit('new-order', { message: 'New order came in.' });
        res.status(201).json(respObj);
      } catch (error) {
        console.log(error);
        // delete order from DB
        await OrdersService.deleteOne(order._id);
        res.status(400).json(error);
      }
    } catch (err) {
      res.status(400).json(err);
    }
  },
  findAll: async (req, res) => {
    try {
      const orders = await OrdersService.findAll();
      res.status(200).json(orders);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  findOrdersUser: async (req, res) => {
    const { userId } = req.params;
    try {
      const ordersUser = await OrdersService.findOrdersUser(userId);
      if (!ordersUser.length) return res.status(400).json({ message: 'User has no orders' });
      res.status(200).json(ordersUser);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  // Implement functionality to send all the orders of today to the admin
  findOrdersToday: async (req, res) => {
    try {
      const ordersToday = await OrdersService.findOrdersToday();
      if (!ordersToday) return res.status(400).json({ message: 'No orders for today.' });

      // implement a function to sort the orders and populate users with their data
      // const sortedOrders = sortOrdersToday(ordersToday)
      // eslint-disable-next-line max-len
      // const ordersWithoutUserPassword = ordersToday.map((ord, i) => {
      //   // eslint-disable-next-line no-param-reassign
      //   ord[i].user.password = undefined;
      // });
      res.status(200).json(ordersToday);
    } catch (err) {
      res.status(400).json(err);
    }
  },

};
