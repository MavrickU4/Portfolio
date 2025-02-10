import Users from '../models/user.js';
import { UserDisplayName, UserID, mobileCheck } from '../utils/index.js';
import Projects from '../models/projects.js';

//displays page to add new item to database
export function displayAdminDashboardPage(req, res, next){
    res.render('content/admin/dashboard/index', { title: 'Admin', page: 'dashboard', 
        admin: true,
        ad: {}, userID: UserID(req), displayName: UserDisplayName(req),
mobile: mobileCheck(req), successMessage: req.flash('successMessage'), errorMessage: req.flash('errorMessage'),
orders: [], ordersUnfulfilled: [],

});
}

export function displayAdminDatabaseMyProjectsPage(req, res, next){
    res.render('content/admin/dashboard/index',  { 
title: 'Admin My Projects', 
page: 'my-projects', 
admin: true,
ad: {}, 
userID: UserID(req), 
displayName: UserDisplayName(req),
mobile: mobileCheck(req), 
successMessage: req.flash('successMessage'), 
errorMessage: req.flash('errorMessage'),
orders: [], 
ordersUnfulfilled: [],
});
}


export function processAddMyProject(req, res, next){
    const newProject = new Users({
        "username": req.body.username,
        "password": req.body.password,
        "email": req.body.email,
        "displayName": req.body.displayName,
        "created": Date.now(),
        "updated": Date.now()
    });

    Projects.register(newProject, req.body.password, (err) => {
        if(err){
            console.log('Error inserting new project');
            if(err.name == "UserExistsError"){
                req.flash('errorMessage', 'Registration Error: User Already Exists!');
                console.log('Error: User Already Exists');
            }
            return res.redirect('/admin/database/my-projects');
        }
        console.log('New Project Added');
        req.flash('successMessage', 'New Project Added');
        return res.redirect('/admin/database/my-projects');
    });
}