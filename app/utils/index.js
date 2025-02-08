
import jwt from 'jsonwebtoken';
import { Secret } from '../../config/config.js';
import nodemailer from 'nodemailer';

export const companyEmail = 'tim.upton4@gmail.com';
export const personalEmail = 'tim.upton4@gmail.com';

export const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'tim.upton4@gmail.com',
      pass: 'gmvozmrcvbsbgarp'
    }
});


export function UserDisplayName(req){
    if(req.user){
        return req.user.displayName;
    }
    return '';
}

export function UserID(req){
    if(req.user){
        return req.user._id;
    }
    return '';
}

export function AuthGuard(req, res, next){
    if(!req.isAuthenticated()){
        return res.redirect('/login')
    }
    next();
}

export function GenerateToken(user){
    const payload = {
        id: user._id,
        displayName: user.displayName,
        username: user.username,
        emailAddress: user.EmailAddress
    }

    const jwtOptions = {
        expiresIn: 604800 // 1 week
    }

    return jwt.sign(payload, Secret, jwtOptions);

}

export function mobileCheck(req, res, next) {
    const userAgent = req.headers['user-agent'];
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
      return true;
    } else {
      return false;
    }
}

export async function sendEmail(subject, body, toEmail, fromEmail) {
  
    // Define the email options
    let mailOptions = {
      from: fromEmail,
      to: toEmail,
      subject: subject,
      text: body,
    };
  
    try {
      // Send the email
      let info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
    } catch (error) {
      console.error('Error sending email:', error);
    }
}

