/*
File: 
*/
// Third-Party Modules
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session';

// ES Modules fix for __dirname
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

// Auth Step 1 - import modules
import passport from 'passport';
import passportLocal from 'passport-local';
import flash from 'connect-flash';

//modules for JWT support
import cors from 'cors';
import passportJWT from 'passport-jwt';

let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;

// Auth Step 2 - defien our auth strategy
let localStrategy = passportLocal.Strategy;

// Auth Step 3 - import the user model
import User from './models/user.js';

// Import Mongoose Module
import mongoose from 'mongoose';

// Configuration Module
import { MongoURI, Secret } from '../config/config.js';

// Import Routes
import indexRouter from './routes/index.route.server.js'
import adRouter from './routes/ad.route.server.js';
import authRouter from './routes/auth.route.server.js';
import logsRouter from './routes/logs.route.server.js';
import profileRouter from './routes/profile.route.server.js';


// Import API Routes
import authApiRouter from './routes/api/auth-api.router.server.js';
import adsApiRouter from './routes/api/ad-api.router.server.js';

// Instantiate Express Application
const app = express();

// Complete the DB Configuration
// mongoose.connect(MongoURI);
// const db = mongoose.connection;

//Listen for connection success or error
// db.on('open', () => console.log("Connected to MongoDB"));
// db.on('error', () => console.log("Mongo Connection Error"));

// Set Up Middlewares

// Setup ViewEngine EJS
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname,'/client')));
app.use(express.static(path.join(__dirname,'../public')));
app.use('/public', express.static('public'));


app.use(cors()); // adds CORS (cross-origin resource sharing) - To be removed on PRODUCTION

// Auth Step 4 - Setup Express Session
app.use(session({
    secret: Secret,
    saveUninitialized: false, 
    resave: false
}));

// Auth Step 5 -  Setup Flash
app.use(flash());

// Auth Step 6 - Initialize Passport and Session
app.use(passport.initialize());
app.use(passport.session());

// Auth Step 7 - Implementing the Auth Strategy
passport.use(User.createStrategy());

// Auth Step 8 - Setup serialization and deserialization
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

let jwtOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: Secret
}

// Setup JWT Strategy
let strategy = new JWTStrategy(jwtOptions, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
        .then(user => {
            return done(null, user)
        })
        .catch(err => {
            return done(err, false)
        });
});

passport.use(strategy);


// Use Routes
app.use('/', indexRouter);
app.use('/', adRouter);
app.use('/', authRouter);
app.use('/', logsRouter);
app.use('/', profileRouter);
app.use('/api/auth', authApiRouter);
app.use('/api/ads', passport.authenticate('jwt', {session: false}), adsApiRouter);


export default app;

console.log('Server running at http://localhost:3000/');