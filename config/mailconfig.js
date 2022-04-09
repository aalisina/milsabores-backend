/* eslint-disable no-console */
const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');
const { google } = require('googleapis');

// Gmail credentials for OAuth2
const CLIENT_ID = process.env.GMAIL_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_OAUTH_CLIENT_SECRET;
const REDIRECT_URI = process.env.GMAIL_REDIRECT_URI;
const REFRESH_ROKEN = process.env.GMAIL_REFRESH_TOKEN;
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_ROKEN });

module.exports = {
  createGmailTransport: async () => {
    try {
      const accessToken = await oAuth2Client.getAccessToken();
      const newTransport = nodemailer.createTransport({
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
      return newTransport;
    } catch (err) {
      return err;
    }
  },
  createSendgridTransport: () => {
    try {
      const transport = nodemailerSendgrid({
        apiKey: process.env.SENDGRID_API_KEY,
      });

      return transport;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
