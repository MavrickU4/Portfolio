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


export function processActionMyProject(req, res, next) {
    const { id, title, description, skills, priority, status, url, imgUrl, edit, remove } = req.body;
if (remove) {
    // Delete the project
    MyProjects.findByIdAndDelete(id, (err, project) => {
        if (err) {
            console.error('Error deleting project:', err);
            return res.status(500).json({ success: false, message: 'Error deleting project', error: err });
        }

        console.log('Project Deleted:', project);
        return res.status(200).json({ success: true, message: 'Project deleted successfully', project });
    });
    return;
}
console.log('Edit:', edit);
if (!edit) {
    // Create a new project instance
    const newProject = new MyProjects({
        title,
        description,
        skills,
        status,
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
} else {
    // Find the project by ID
    MyProjects.findById(id, (err, project) => {
        if (err) {
            console.error('Error finding project:', err);
            return res.status(500).json({ success: false, message: 'Error finding project', error: err });
        }

        // Update the project details
        project.title = title;
        project.description = description;
        project.skills = skills;
        project.status = status;
        project.priority = priority;
        project.url = url;
        project.imgUrl = imgUrl;

        // Save the updated project
        project.save((err, updatedProject) => {
            if (err) {
                console.error('Error updating project:', err);
                return res.status(500).json({ success: false, message: 'Error updating project', error: err });
            }

            console.log('Project Updated:', updatedProject);
            return res.status(200).json({ edit, success: true, message: 'Project updated successfully', project: updatedProject });
        });
    });
}
}
