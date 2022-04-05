const { confirmationEmail } = require('./confirmation');
const { emailVerification } = require('./verification');
const { emailPasswordReset } = require('./passwordReset');

module.exports = {
  confirmationEmail,
  emailVerification,
  emailPasswordReset,
};
