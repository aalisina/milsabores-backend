const { htmlMaker } = require('./confirmationHtml');

module.exports = {
  confirmationEmail: (responseObject) => {
    // Function createConfirmationHTML(responseObject)
    // that will return the html for the recipient
    const html = htmlMaker(responseObject);

    // In case html is now shown, this text will be shown
    const text = `${responseObject.first_name}, su pedido ha sido creado exitosamente
    
    Es un placer para nosotros poder entregarle los mejores almuerzos, gracias por elegirnos. 
    Cada día trabajamos para brindarles un mejor servicio, agradecemos su confianza.
    `;

    const mailOptions = {
      from: `Mil Sabores <${process.env.EMAIL_ADDRESS}>`,
      to: responseObject.email,
      bcc: process.env.EMAIL_ADDRESS,
      subject: `${responseObject.first_name}, ¡muchas gracias por su pedido!`,
      text,
      html,
      attachments: [{
        filename: 'image-5.png',
        path: `${__dirname}/../../public/assets/images/image-5.png`,
        cid: 'image-5', // same cid value as in the html img src
      }],

    };
    return mailOptions;
  },
};
