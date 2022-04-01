/* eslint-disable no-console */
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const CLIENT_ID = process.env.GMAIL_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_OAUTH_CLIENT_SECRET;
const REDIRECT_URI = process.env.GMAIL_REDIRECT_URI;
const REFRESH_ROKEN = process.env.GMAIL_REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_ROKEN });

module.exports = {
  sendMail: async (order) => {
    try {
      const accessToken = await oAuth2Client.getAccessToken();

      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAUTH2',
          user: process.env.EMAIL_ADDRESS,
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_ROKEN,
          accessToken,
        },
      });

      const mailOptions = {
        from: `Mil Sabores <${process.env.EMAIL_ADDRESS}>`,
        to: order.email,
        subject: 'Hello from Gmail. First mail using nodemailer from gmail',
        text: 'Hello from Gmail. First mail using nodemailer from gmail',
        html: `<h3>Hello from Gmail. First mail using nodemailer from gmail<h3><br>
                <p>${order}</p>`,

      };

      const resultSentEmail = await transport.sendMail(mailOptions);
      return resultSentEmail;
    } catch (err) {
      return err;
    }
  },
};
