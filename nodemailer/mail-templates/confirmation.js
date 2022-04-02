module.exports = {
  confirmationEmail: (responseObject) => {
    const mailOptions = {
      from: `Mil Sabores <${process.env.EMAIL_ADDRESS}>`,
      to: responseObject.email,
      subject: 'Hello from Gmail. First mail using nodemailer from gmail',
      text: 'Hello from Gmail. First mail using nodemailer from gmail',
      html: `<h3>Hello from Gmail. First mail using nodemailer from gmail<h3><br>
                    <p>${responseObject.first_name}</p>`,

    };
    return mailOptions;
  },
};
