
import { UserID, UserDisplayName, mobileCheck, transporter, sendEmail, companyEmail, personalEmail} from "../utils/index.js";
import { sendEmailIn } from "../utils/emailService.js";
import MyProjects from "../models/projects.js";

export function displayHomePage(req, res, next) {
    res.render('index', { title: 'Home', page: 'home', 
        admin: false,
        userID: UserID(req), displayName: UserDisplayName(req), 
        successMessage: req.flash('successMessage'), errorMessage: req.flash('errorMessage'),
        mobile: mobileCheck(req),  } );
};

export function displayAboutPage(req, res, next) {
    res.render('index', { title: 'About', page: 'about', userID: UserID(req), 
        admin: false,
        displayName: UserDisplayName(req), 
        mobile: mobileCheck(req), successMessage: req.flash('successMessage'), errorMessage: req.flash('errorMessage')} );
};

export async function displayProjectsPage(req, res, next) {
     const myProjects = await MyProjects.find(); 
    res.render('index', { title: 'Projects', page: 'projects', myProjects: myProjects, 
        admin: false,
        displayName: UserDisplayName(req), userID: UserID(req),
        mobile: mobileCheck(req), successMessage: req.flash('successMessage'), errorMessage: req.flash('errorMessage') } );
};

export function displayServicesPage(req, res, next) {
    res.render('index', { title: 'Services', page: 'services', 
        admin: false,
        displayName: UserDisplayName(req), userID: UserID(req),
        mobile: mobileCheck(req), successMessage: req.flash('successMessage'), errorMessage: req.flash('errorMessage') } );
};

export function displayEducationPage(req, res, next) {
    res.render('index', { title: 'Education', page: 'education', 
        admin: false,
        displayName: UserDisplayName(req), userID: UserID(req),
        mobile: mobileCheck(req), successMessage: req.flash('successMessage'), errorMessage: req.flash('errorMessage')} );
};

export function displayContactPage(req, res, next) {
    res.render('index', { title: 'Contact', page: 'contact', 
        admin: false,
        displayName: UserDisplayName(req), userID: UserID(req),
        mobile: mobileCheck(req), successMessage: req.flash('successMessage'), errorMessage: req.flash('errorMessage'),
    });
};

export async function displayProjectPage(req, res, next) {
    try {
        const myProjects = await MyProjects.find(); 
        const { _id } = req.params;
        const project = await MyProjects.findById(_id);
        if (!project) {
            return res.redirect('/404');
        }
        res.render('index', { title: 'Projects', page: 'project-view', project, 
            admin: false,
            displayName: UserDisplayName(req), userID: UserID(req),
            myProjects: myProjects,
            mobile: mobileCheck(req), successMessage: req.flash('successMessage'), errorMessage: req.flash('errorMessage') });
    } catch (error) {
        console.error(error);
        res.redirect('/404');
    }
};

export async function display404Page(req, res, next) {
        res.render('index', { title: 'Projects', 
            page: '404',
            admin: false,
            displayName: UserDisplayName(req), userID: UserID(req),
            mobile: mobileCheck(req), 
            successMessage: req.flash('successMessage'), 
            errorMessage: req.flash('errorMessage') });
};

export async function processSendMessage(req, res) {
    const { firstName, lastName, email, phone, message } = req.body;
    const emailContent = `
<div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
<h2 style="color: #007bff;">New Portfolio Message</h2>
<p><strong>Name:</strong> ${firstName} ${lastName}</p>
<p><strong>Email:</strong> <a href="mailto:${email}" style="color: #007bff;">${email}</a></p>
<p><strong>Phone:</strong> ${phone}</p>
<hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0;">
<p style="font-size: 16px;"><strong>Message:</strong></p>
<p style="background: #f9f9f9; padding: 15px; border-radius: 5px;">${message}</p>
</div>
  `;
  

const emailSent = await sendEmailIn(`New Contact Message`, emailContent);

const now = new Date();
const todaytime = now.getHours() * 100 + now.getMinutes(); // Converts time to 24-hour format (e.g., 1830 for 6:30 PM)

if (emailSent.success) {
    if (todaytime > 1800) {
        req.flash(
            'successMessage',
            "Message received! However, it's a bit late, please expect a response first thing tomorrow morning. Thank you!"
        );
    } else {
        req.flash(
            'successMessage',
            "Message received! Since it's still early, I should be able to reply soon. Thank you!"
        );
    }
} else {
    req.flash('errorMessage', "Oops! Something went wrong, and your message couldn't be sent. Please try again later.");
}

res.redirect('/contact');

}