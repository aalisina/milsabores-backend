/* eslint-disable no-underscore-dangle */
const { htmlMaker } = require('./passwordResetHtml');

module.exports = {
  emailPasswordReset: (responseObject) => {
    // Function createConfirmationHTML(responseObject)
    // that will return the html for the recipient
    const html = htmlMaker(responseObject);

    // In case html is now shown, this text will be shown
    const text = `Hola ${responseObject.first_name}, recibimos una solicitud para cambiar su contraseña.
    
    Si usted solicitó el cambio, simplemente copie y pegue el siguiente enlace en su navegador. 
    De lo contrario, ignore este mensaje.  
 
    ${process.env.BACK_END_BASE_URL}/api/v1/forgot/${responseObject.forgot_password_key}
    `;

    const mailOptions = {
      from: `Mil Sabores <${process.env.EMAIL_ADDRESS}>`,
      to: responseObject.email,
      subject: `Hola ${responseObject.first_name}, recibimos una solicitud para cambiar su contraseña`,
      text,
      html,

    };
    return mailOptions;
  },
};
