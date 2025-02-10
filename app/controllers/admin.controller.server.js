import Users from '../models/user.js';
import { UserDisplayName, UserID, mobileCheck } from '../utils/index.js';
import MyProjects from '../models/projects.js';
import MyServices from '../models/services.js';
import MySkills from '../models/skills.js';

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

export async function displayAdminDatabaseMyServicesPage(req, res, next) {
    try {
        const myServices = await MyServices.find(); 

        res.render('content/admin/dashboard/index', { 
            title: 'Admin My Services', 
            page: 'my-services', 
            admin: true,
            myServices: myServices,
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

export async function displayAdminDatabaseMySkillsPage(req, res, next) {
    try {
        const mySkills = await MySkills.find(); 

        res.render('content/admin/dashboard/index', { 
            title: 'Admin My Skills', 
            page: 'my-skills', 
            admin: true,
            mySkills,
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
    const { id, title, description, skills, classType, priority, features, status, url, imgUrl, edit, remove } = req.body;
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
        classType,
        features,
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
        project.classType = classType;
        project.features = features;
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

export function processActionMyService(req, res, next) {
    const { id, title, description, skills, classType, priority, features, status, url, imgUrl, edit, remove } = req.body;
if (remove) {
    // Delete the service
    MyServices.findByIdAndDelete(id, (err, service) => {
        if (err) {
            console.error('Error deleting service:', err);
            return res.status(500).json({ success: false, message: 'Error deleting service', error: err });
        }

        console.log('Service Deleted:', service);
        return res.status(200).json({ success: true, message: 'Service deleted successfully', service });
    });
    return;
}
console.log('Edit:', edit);
if (!edit) {
    // Create a new service instance
    const newService = new MyServices({
        title,
        description,
        skills,
        status,
        priority,
        classType,
        features,
        url,
        imgUrl
    });

    // Save to the database
    newService.save((err, service) => {
        if (err) {
            console.error('Error inserting new service:', err);
            return res.status(500).json({ success: false, message: 'Error adding service', error: err });
        }

        console.log('New Project Added:', service);
        return res.status(201).json({ success: true, message: 'Project added successfully', service });
    });
} else {
    // Find the service by ID
    MyServices.findById(id, (err, service) => {
        if (err) {
            console.error('Error finding service:', err);
            return res.status(500).json({ success: false, message: 'Error finding service', error: err });
        }

        // Update the service details
        service.title = title;
        service.description = description;
        service.skills = skills;
        service.status = status;
        service.priority = priority;
        service.url = url;
        service.classType = classType;
        service.features = features;
        service.imgUrl = imgUrl;

        // Save the updated service 
        service.save((err, updatedService) => {
            if (err) {
                console.error('Error updating service:', err);
                return res.status(500).json({ success: false, message: 'Error updating service', error: err });
            }

            console.log('Service Updated:', updatedService);
            return res.status(200).json({ edit, success: true, message: 'Service updated successfully', service: updatedService });
        });
    });
}
}

export function processActionMySkill(req, res, next) {
    const { id, title, description, skills, classType, priority, features, status, url, imgUrl, edit, remove } = req.body;
if (remove) {
    // Delete the skill
    MySkills.findByIdAndDelete(id, (err, skill) => {
        if (err) {
            console.error('Error deleting skill:', err);
            return res.status(500).json({ success: false, message: 'Error deleting skill', error: err });
        }

        console.log('Skill Deleted:', skill);
        return res.status(200).json({ success: true, message: 'Skill deleted successfully', skill });
    });
    return;
}
console.log('Edit:', edit);
if (!edit) {
    // Create a new skill instance
    const newSkill = new MySkills({
        title,
        description,
        skills,
        status,
        priority,
        classType,
        features,
        url,
        imgUrl
    });

    // Save to the database
    newSkill.save((err, skill) => {
        if (err) {
            console.error('Error inserting new skill:', err);
            return res.status(500).json({ success: false, message: 'Error adding skill', error: err });
        }

        console.log('New Project Added:', skill);
        return res.status(201).json({ success: true, message: 'Project added successfully', skill });
    });
} else {
    // Find the skill by ID
    MySkills.findById(id, (err, skill) => {
        if (err) {
            console.error('Error finding skill:', err);
            return res.status(500).json({ success: false, message: 'Error finding skill', error: err });
        }

        // Update the skill details
        skill.title = title;
        skill.description = description;
        skill.skills = skills;
        skill.status = status;
        skill.priority = priority;
        skill.url = url;
        skill.classType = classType;
        skill.features = features;
        skill.imgUrl = imgUrl;

        // Save the updated skill 
        skill.save((err, updatedSkill) => {
            if (err) {
                console.error('Error updating skill:', err);
                return res.status(500).json({ success: false, message: 'Error updating skill', error: err });
            }

            console.log('Skill Updated:', updatedSkill);
            return res.status(200).json({ edit, success: true, message: 'Skill updated successfully', skill: updatedSkill });
        });
    });
}
}
