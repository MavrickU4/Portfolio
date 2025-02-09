
import { UserID, UserDisplayName, mobileCheck, transporter, sendEmail, companyEmail, personalEmail} from "../utils/index.js";
import { sendEmailIn } from "../utils/emailService.js";
import Projects from "../models/projects.js";

export function displayHomePage(req, res, next) {
    res.render('index', { title: 'Home', page: 'home', userID: UserID(req), displayName: UserDisplayName(req), 
        successMessage: req.flash('successMessage'), errorMessage: req.flash('errorMessage'),
        mobile: mobileCheck(req),  } );
};

export function displayAboutPage(req, res, next) {
    res.render('index', { title: 'About', page: 'about', userID: UserID(req), displayName: UserDisplayName(req), 
        mobile: mobileCheck(req), successMessage: req.flash('successMessage'), errorMessage: req.flash('errorMessage')} );
};

export function displayProjectsPage(req, res, next) {
    res.render('index', { title: 'Projects', page: 'projects', projects: Projects.find(), 
        displayName: UserDisplayName(req), userID: UserID(req),
        mobile: mobileCheck(req), successMessage: req.flash('successMessage'), errorMessage: req.flash('errorMessage') } );
};

export function displayServicesPage(req, res, next) {
    res.render('index', { title: 'Services', page: 'services', 
        displayName: UserDisplayName(req), userID: UserID(req),
        mobile: mobileCheck(req), successMessage: req.flash('successMessage'), errorMessage: req.flash('errorMessage') } );
};

export function displayEducationPage(req, res, next) {
    res.render('index', { title: 'Education', page: 'education', 
        displayName: UserDisplayName(req), userID: UserID(req),
        mobile: mobileCheck(req), successMessage: req.flash('successMessage'), errorMessage: req.flash('errorMessage')} );
};

export function displayContactPage(req, res, next) {
    res.render('index', { title: 'Contact', page: 'contact', 
        displayName: UserDisplayName(req), userID: UserID(req),
        mobile: mobileCheck(req), successMessage: req.flash('successMessage'), errorMessage: req.flash('errorMessage'),
    });
};

export function processSendMessage(req, res) {
    const { firstName, lastName, email, phone, message } = req.body;
    const emailContent = `Name: ${firstName} ${lastName}\n
Email: ${email}\n
Phone: ${phone}\n
Subject: New Portfolio Message\n
Message: ${message}`;

sendEmailIn(`New Contact Message`, emailContent);

    req.flash('successMessage', "Your message has been succesfully recieved! I am quick to reply, but if it's late, expect a contact first thing tomorrow morning. Thank you!");
    res.redirect('/contact');
  }