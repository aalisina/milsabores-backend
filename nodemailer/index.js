const { createGmailTransport } = require('./mailconfig');
const { confirmationEmail } = require('./mail-templates');

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
};
