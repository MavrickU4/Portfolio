import Users from '../models/user.js';
import { UserDisplayName, UserID, mobileCheck } from '../utils/index.js';
import MyProjects from '../models/projects.js';

//displays page to add new item to database
export function displayAdminDashboardPage(req, res, next){
    res.render('content/admin/dashboard/index', { title: 'Admin', page: 'dashboard', 
        admin: true,
        ad: {}, userID: UserID(req), displayName: UserDisplayName(req),
mobile: mobileCheck(req), successMessage: req.flash('successMessage'), errorMessage: req.flash('errorMessage'),
orders: [], ordersUnfulfilled: [],

});
}

export async function displayAdminDatabaseMyProjectsPage(req, res, next) {
    try {
        const myProjects = await MyProjects.find(); 

        res.render('content/admin/dashboard/index', { 
            title: 'Admin My Projects', 
            page: 'my-projects', 
            admin: true,
            myProjects,
            ad: {}, 
            userID: UserID(req), 
            displayName: UserDisplayName(req),
            mobile: mobileCheck(req), 
            successMessage: req.flash('successMessage'), 
            errorMessage: req.flash('errorMessage'),
            orders: [], 
            ordersUnfulfilled: [],
        });
    } catch (error) {
        console.error('Error retrieving projects:', error);
        req.flash('errorMessage', 'Error loading projects.');
        res.redirect('/admin');
    }
}


export function processAddMyProject(req, res, next) {
    const { title, description, skills, priority, url, imgUrl } = req.body;

    // Create a new project instance
    const newProject = new Projects({
        title,
        description,
        skills,
        priority,
        url,
        imgUrl
    });

    // Save to the database
    newProject.save((err, project) => {
        if (err) {
            console.error('Error inserting new project:', err);
            return res.status(500).json({ success: false, message: 'Error adding project', error: err });
        }

        console.log('New Project Added:', project);
        return res.status(201).json({ success: true, message: 'Project added successfully', project });
    });
}
