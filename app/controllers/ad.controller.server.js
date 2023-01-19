/*
File:
*/

import adModel from '../models/ad.js';

import { UserDisplayName, UserID } from '../utils/index.js';
import logsModel from '../models/logs.js';

    let currentDate = new Date();
    let day = currentDate.getDate().toString();
    let month = (currentDate.getMonth() + 1).toString();
    let year = currentDate.getFullYear().toString();
    let time = currentDate.toTimeString().split(' ')[0];
    let newTicketNumber = day + month + year + "-00000";

//gets all ad's in database
export function DisplayAdList(req, res, next){
    adModel.find(function(err, adCollection) {
        if(err){
            console.error(err);
            res.end(err);
        }

        res.render('index', {title: 'Ad List', page: 'ad/list', ad: adCollection, userID: UserID(req), user: req.user, displayName: UserDisplayName(req)});
    })
}

//displays page to add new item to database
export function DisplayAdAddPage(req, res, next){
    res.render('index', { title: 'Add Ad', page: 'ad/edit', ad: {}, userID: UserID(req), displayName: UserDisplayName(req) });
}


//process information to the database
export function ProcessAdAddPage(req, res, next){
    let newAd = adModel({
        adTitle: req.body.adTitle,
        adStatus: "Active",
        description: req.body.description,
        priority: req.body.priority,
        emailAddress: req.body.emailAddress,
        phoneNumber: req.body.phoneNumber,
        adImg: req.file
    });

    let newLog = logsModel({
        log_id: req.body.id,
        date: day + "-" + month + "-" + year + " " + time,
        username: req.user.username,
        userType: req.user.userType,
        action: "Create a new ad #" + newTicketNumber
    })
    //adding to logs this action
    logsModel.create(newLog, (err, Ad) => {
        if(err){
            console.error(err);
            res.end(err);
        };
    } )
    adModel.create(newAd, (err, Ad) => {
        if(err){
            console.error(err);
            res.end(err);
        };

        res.redirect('/ad-list')
    } )
}

//edit current item in database with the id 
export function DisplayAdEditPage(req, res, next){
    let id = req.params.id;

    adModel.findById(id, (err, ad) => {
        if(err){
            console.error(err);
            res.end(err);
        }

        res.render('index', { title: 'Edit Ad', page: 'ad/edit', ad: ad, userID: UserID(req), displayName: UserDisplayName(req) });
    });
}

//processes the information from the edit page
export function ProcessAdEditPage(req, res, next){
    let id = req.params.id; 
    let newAd = adModel({
        _id: req.body.id,
        adTitle: req.body.adTitle,
        adStatus: req.body.adStatus,
        description: req.body.description,
        priority: req.body.priority,
        emailAddress: req.body.emailAddress,
        phoneNumber: req.body.phoneNumber
    });

    adModel.updateOne({_id: id }, newAd, (err, Ad) => {
        if(err){
            console.error(err);
            res.end(err);
        };

        res.redirect('/ad-list')
    } )
}


//edit current item in database with the id 
export function DisplayAdViewPage(req, res, next){
    let id = req.params.id;

    adModel.findById(id, (err, ad) => {
        if(err){
            console.error(err);
            res.end(err);
        }

        res.render('index', { title: 'View Ad', page: 'ad/view', ad: ad, userID: UserID(req), displayName: UserDisplayName(req) });
    });    
}

//processes deletion of item in database
export function ProcessAdDelete(req, res, next){
    let id = req.params.id;

    let newLog = logsModel({
        date: day + "-" + month + "-" + year + " " + time,
        username: req.user.username,
        userType: req.user.userType,
        action: "Delete ad #" + newTicketNumber
    })

    logsModel.create(newLog, (err, Ad) => {
        if(err){
            console.error(err);
            res.end(err);
        };
    } )

    adModel.remove({_id: id}, (err) => {
        if (err){
            console.error(err);
            res.end(err);
        }

        res.redirect('/ad-list');
    })
}

//edit current item in database with the id 
export function DisplayLogPage(req, res, next){
    let id = req.params.id;

    logsModel.findById(id, (err, ad) => {
        if(err){
            console.error(err);
            res.end(err);
        }

        res.render('index', { title: 'View Log', page: 'ad/view', log: log, userID: UserID(req), displayName: UserDisplayName(req) });
    });
}