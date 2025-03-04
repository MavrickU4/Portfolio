import express from 'express';
import passport from 'passport';
import User from '../models/user.js';
import { mobileCheck, UserDisplayName } from '../utils/index.js';

// Display Functions
export function displayLoginPage(req, res, next){
    const admin = req.query.admin;
    if(!req.user){
        return res.render('index', {title: 'Login', page: admin === 'true' ? '/admin/admin-login' : 'login', 
            admin: false,
            successMessage: req.flash('successMessage'),  errorMessage: req.flash('errorMessage'), 
            displayName: UserDisplayName(req), mobile: mobileCheck(req) });
    }

    if (admin === 'true') {
        return res.redirect('/admin/dashboard');
    }
    return res.redirect('/ad-list');
}

export function DisplayRegisterPage(req, res, next){
    if(!req.user){
        return res.render('index', {title: 'Register', page: 'register', 
            admin: false,
            successMessage: req.flash('successMessage'),  errorMessage: req.flash('errorMessage'), 
            messages: req.flash('registerMessage'), displayName: UserDisplayName(req),
            mobile: mobileCheck(req),
        });
    }

    return res.redirect('/ad-list');
}

// Processing Functions
export function processLoginPage(req, res, next) {
    const { username, password } = req.body; // Extract username & password
    const admin = req.query.admin;
    console.log(`Login attempt: ${username}, Admin: ${password}`);
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    console.log(`Login attempt: ${username}, Admin: ${admin}`);

    passport.authenticate('local', function (err, user, info) {
        if (err) {
            console.error('Authentication error:', err);
            return res.status(500).json({ message: `Server error: ${err.message}` });
        }

        if (!user) {
            return res.status(401).json({ message: info?.message || 'Authentication failed' });
        }

        req.logIn(user, function (err) {
            if (err) {
                console.error('Login error:', err);
                return res.status(500).json({ message: `Login error: ${err.message}` });
            }

            return res.status(200).json({ 
                message: 'Success', 
                admin: admin === 'true' 
            });
        });

    })(req, res, next);
}




export function processRegisterPage(req, res, next){
    let newUser = new User({
        username: req.body.username,
        emailAddress: req.body.username,
        displayName: req.body.firstName + " " + req.body.lastName,
        userType: req.body.userType,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });

    User.register(newUser, req.body.password, function(err){
        if(err){
            if(err.name == "UserExistsError"){
                console.error('ERROR: User Already Exists!');
                req.flash('registerMessage', 'Registration Error')
            } else {
                console.error(err.name);
                req.flash('registerMessage', 'Server Error')
            }
            if (req.query.admin === 'true') {
                return res.redirect('/admin/admin-register');
            } else {
                return res.redirect('/register');
            }
            
        }

        return passport.authenticate('local')(req, res, function()
        {
            if (req.query.admin === 'true') {
                return res.redirect('/admin/dashboard/index.html');
            } else {
                return res.redirect('/');
            }
        });
    });
}

export function ProcessLogoutPage(req, res, next){
    req.logOut(function(err){
        if(err){
            console.error(err);
            res.end(err);
        }

        console.log("user logged out successfully");
    });

    res.redirect('/login');
}
