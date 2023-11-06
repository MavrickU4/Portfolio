
import { UserID, UserDisplayName, mobileCheck, transporter, sendEmail, companyEmail, personalEmail} from "../utils/index.js";

export function displayHomePage(req, res, next) {
    res.render('index', { title: 'Home', page: 'home', userID: UserID(req), displayName: UserDisplayName(req) } );
};

export function displayAboutPage(req, res, next) {
    res.render('index', { title: 'About', page: 'about', userID: UserID(req), displayName: UserDisplayName(req)} );
};

export function displayProjectsPage(req, res, next) {
    res.render('index', { title: 'Projects', page: 'projects'} );
};

export function displayServicesPage(req, res, next) {
    res.render('index', { title: 'Services', page: 'services'} );
};

export function displayEducationPage(req, res, next) {
    res.render('index', { title: 'Education', page: 'education'} );
};

export function displayContactPage(req, res, next) {
    res.render('index', { title: 'Contact', page: 'contact',
    successMessage: req.flash('successMessage'),
});
};

export function processSendMessage(req, res) {
    const { firstName, lastName, email, phone, message } = req.body;
    const emailContent = `Name: ${firstName} ${lastName}\n
             Email: ${email}\n
             Subject: New Portfolio Message\n
             Message: ${message}`;

    sendEmail(`New Contact Message`, emailContent, companyEmail, personalEmail);

    req.flash('successMessage', "Your message has been succesfully recieved! I am quick to reply, but if it's late, expect a contact first thing tomorrow morning. Thank you!");
    res.redirect('/contact');
  }