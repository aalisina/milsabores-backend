const { createGmailTransport } = require('../config/mailconfig');
const { confirmationEmail, emailVerification, emailPasswordReset } = require('./mail-templates');

module.exports = {
  // responseObject parameter should always have the email of the recipient passed through
  sendConfirmationMail: async (responseObject) => {
    try {
      // Create a new transport
      const transport = await createGmailTransport();
      // Create mailOptions for this type of email
      const mailOptions = confirmationEmail(responseObject);
      // Send the email
      const resultEmail = transport.sendMail(mailOptions);
      return resultEmail;
    } catch (err) {
      return err;
    }
  },
  sendEmailVerification: async (responseObject) => {
    try {
      // Create a new transport
      const transport = await createGmailTransport();
      // Create mailOptions for this type of email
      const mailOptions = emailVerification(responseObject);
      // Send the email
      const resultEmail = transport.sendMail(mailOptions);
      return resultEmail;
    } catch (err) {
      return err;
    }
  },
  sendPasswordReset: async (updatedUser) => {
    try {
      // Create a new transport
      const transport = await createGmailTransport();
      // Create mailOptions for this type of email
      const mailOptions = emailPasswordReset(updatedUser);
      // Send the email
      const resultEmail = transport.sendMail(mailOptions);
      return resultEmail;
    } catch (err) {
      return err;
    }
  },

};
