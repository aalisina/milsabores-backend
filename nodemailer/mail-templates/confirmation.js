const { htmlMaker } = require('./confirmationHtml');

module.exports = {
  confirmationEmail: (responseObject) => {
    // Create a function createConfirmationText(responseObject)
    // that will return the text for the recipient
    const html = htmlMaker(responseObject);
    const text = 'Html will be generated';
    // Create a function createConfirmationHTML(responseObject)
    // that will return the html for the recipient

    const mailOptions = {
      from: `Mil Sabores <${process.env.EMAIL_ADDRESS}>`,
      to: responseObject.email,
      subject: `${responseObject.first_name}, ¡muchas gracias por su pedido!`,
      text,
      html,

    };
    return mailOptions;
  },
};
