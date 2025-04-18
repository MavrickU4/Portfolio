import dotenv from 'dotenv';dotenv.config();
import axios from 'axios';
import {Router} from 'express';
import { displayLoginPage, 
    DisplayRegisterPage, 
    processLoginPage,
    ProcessLogoutPage,
    processRegisterPage} from '../controllers/auth.controller.server.js';

const router = Router();

// Display Login Page
router.get('/login', displayLoginPage);
// Process Login Page
router.post('/login', processLoginPage);


// Display Registration Page
router.get('/register', DisplayRegisterPage);
// Process Registration page
router.post('/register', processRegisterPage);

// Process Logout Page
router.get('/logout', ProcessLogoutPage);

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI; 
;

// Redirect route for initiating OAuth2 flow
router.get('/auth/google', (req, res) => {
    const clientId = CLIENT_ID;
    const redirectUri = REDIRECT_URI;
    const scope = 'https://mail.google.com/';
    const accessType = 'offline';
  
    // const authUrl = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&access_type=${accessType}`;
    const authUrl = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scope}&access_type=offline&prompt=consent`;
    console.log('authURL:', authUrl);
    // Redirect the user to Google's OAuth consent screen
    res.redirect(authUrl);
  });

 // Route handler for OAuth2 callback
router.get('/oauth2callback', async (req, res) => {
    const { code } = req.query;
  
    try {
      // Exchange authorization code for tokens
      const tokens = await exchangeCodeForTokens(code);
  
      // Now you have access_token and refresh_token, you can store them securely and use them in your application
  
      // Example: Redirect to a success page or handle further processing
      res.send('Tokens obtained successfully!');
    } catch (error) {
      console.error('Error exchanging code for tokens:', error.message);
      res.status(500).send('Error exchanging code for tokens');
    }
  });
  
  // Function to exchange authorization code for tokens
  async function exchangeCodeForTokens(code) {
    try {
      const response = await axios.post('https://oauth2.googleapis.com/token', {
        code: code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code'
      });
  
      console.log('Full Token Response:', response.data); // Debugging step
  
      const { access_token, refresh_token } = response.data;
      console.log('Refresh Token:', refresh_token); // Should not be undefined
  
      return { access_token, refresh_token };
    } catch (error) {
      console.error('Error exchanging code for tokens:', error.response?.data || error.message);
      throw error;
    }
  }
  

export default router;