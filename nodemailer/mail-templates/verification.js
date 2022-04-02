/* eslint-disable no-underscore-dangle */
const { htmlMaker } = require('./verificationHtml');

module.exports = {
  emailVerification: (responseObject) => {
    // Function createConfirmationHTML(responseObject)
    // that will return the html for the recipient
    const html = htmlMaker(responseObject);

    // In case html is now shown, this text will be shown
    const text = `${responseObject.first_name}, muchas gracias por registrarse
    
    Es un placer para nosotros que comience. Primero, necesita confirmar su correo. 
    Simplemente copia y pega el siguiente enlace en su navegador: 
 
    ${process.env.BACK_END_BASE_URL}/api/v1/verify/${responseObject._id}
    `;

    const mailOptions = {
      from: `Mil Sabores <${process.env.EMAIL_ADDRESS}>`,
      to: responseObject.email,
      subject: `${responseObject.first_name}, ¡muchas gracias por registrarse!`,
      text,
      html,

    };
    return mailOptions;
  },
};
