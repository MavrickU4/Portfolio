import nodemailer from 'nodemailer';
import { google } from 'googleapis';

// Load client secrets from a local file
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CREDENTIALS_PATH = path.join(__dirname, '../utils/gmail-credentials.json');

try {
  // Read file synchronously and parse JSON
  const credentialsData = fs.readFileSync(CREDENTIALS_PATH, 'utf-8');
  // console.log('Credentials data:', credentialsData); // Debug output

  const credentials = JSON.parse(credentialsData);
  // console.log('Credentials:', credentials);
} catch (error) {
  console.error('Error reading or parsing credentials file:', error);
}

const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf-8'));

// Load refresh token from tokens file
// const tokens = JSON.parse(fs.readFileSync(TOKENS_PATH, 'utf-8'));

// Configure OAuth2 client
const { client_secret, client_id, redirect_uris } = credentials.installed || credentials.web;
const oauth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

// Set the refresh token
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN; 
oauth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
});

// console.log('REFRESH_TOKEN', REFRESH_TOKEN);

// Function to get access token
const getAccessToken = async () => {
  try {
    // Check if the current access token is valid
    const currentToken = oauth2Client.credentials;
    if (!currentToken || currentToken.expiry_date <= Date.now()) {
      // Token expired or about to expire, refresh it
      const { token } = await oauth2Client.getAccessToken();
      return token;
    } else {
      // Token still valid, use it
      return currentToken.access_token;
    }
  } catch (error) {
    console.error('Error retrieving access token:', error);
    throw error;
  }
};

// Send email using Nodemailer
export const sendEmailOut = async (to, subject, html, text) => {
  try {
    const accessToken = await getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'tim.upton4@gmail.com',
        clientId: client_id,
        clientSecret: client_secret,
        refreshToken: REFRESH_TOKEN,
        accessToken,
      },
    });

    const mailOptions = {
      from: '"tim.upton4@gmail.com" <tim.upton4@gmail.com>',
      to, 
      subject,  
      html: html,  
  };

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export const sendEmailIn = async (subject, html) => {
  try {
    const accessToken = await getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'tim.upton4@gmail.com',
        clientId: client_id,
        clientSecret: client_secret,
        refreshToken: REFRESH_TOKEN,
        accessToken,
      },
    });

    const mailOptions = {
      from: '"tim.upton4@gmail.com" <tim.upton4@gmail.com>',
      to: process.env.GOOGLE_EMAIL_ADDRESS, 
      subject,  
      html: html,  
  };

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export default sendEmailOut;

