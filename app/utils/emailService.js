import nodemailer from 'nodemailer';
import { google } from 'googleapis';

// Load client secrets from a local file
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configure OAuth2 client
const oauth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URI);

// Set the refresh token
oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

// Function to get access token
const getAccessToken = async () => {
  try {
    // console.log('oauth2Client:', oauth2Client); // Debugging step
    const { token } = await oauth2Client.getAccessToken();
    if (!token) throw new Error("Failed to get access token");
    return token;
  } catch (error) {
    console.error('Error retrieving access token:', error.response?.data || error.message);
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
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
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
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken,
      },
    });

    const mailOptions = {
      from: '"tim.upton4@gmail.com" <tim.upton4@gmail.com>',
      to: process.env.GOOGLE_EMAIL_ADDRESS,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);

    if (!info || !info.messageId) {
      throw new Error("Failed to send email");
    }

    console.log('✅ Message sent: %s', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return { success: false, error: error.message || "Unknown error" };
  }
};


export default sendEmailOut;

