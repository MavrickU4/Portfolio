// Third-Party Modules
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
dotenv.config();

// Import and run the update script
//    import Project from './models/projects.js';

// ES Modules fix for __dirname
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

// Auth Step 1 - import modules
import passport from 'passport';
import passportLocal from 'passport-local';
import flash from 'connect-flash';

// modules for JWT support
import passportJWT from 'passport-jwt';

// import adminRouter from './routes/admin.route.server.js';
// import paymentRoutes from './routes/stripe.route.server.js';

let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;

// Auth Step 2 - define our auth strategy
let localStrategy = passportLocal.Strategy;

// Auth Step 3 - import the user model
import Users from './models/user.js';
// import Customers from './models/customers.js';
// import TeamMembers from './models/team-members.js';

// Import Mongoose Module
import mongoose from 'mongoose';

// Configuration Module
import { MongoURI, Secret } from '../config/config.js';

// Import Routes
import indexRouter from './routes/index.route.server.js';
import adRouter from './routes/ad.route.server.js';
import adminRouter from './routes/admin.route.server.js';
import authRouter from './routes/auth.route.server.js';
import logsRouter from './routes/logs.route.server.js';
import profileRouter from './routes/profile.route.server.js';

// Import API Routes
import authApiRouter from './routes/api/auth-api.router.server.js';
import adsApiRouter from './routes/api/ad-api.router.server.js';

// Initiate Stripe
// import stripeRoutes from './routes/index.route.server.js';

// OAuth2 configuration
let jwtOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: Secret
};

// Setup JWT Strategy
let strategy = new JWTStrategy(jwtOptions, (jwt_payload, done) => {
    Users.findById(jwt_payload.id)
        .then(user => {
            return done(null, user);
        })
        .catch(err => {
            return done(err, false);
        });
});

passport.use(strategy);

// Instantiate Express Application
const app = express();

// Set the strictQuery option before connecting to MongoDB
mongoose.set('strictQuery', true);

// // Complete the DB Configuration
mongoose.connect(MongoURI).then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

app.use(session({
    secret: Secret,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: MongoURI,
        collectionName: 'sessions'
    })
}));

// Set Up Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/public', express.static('public'));
app.use(cors()); // adds CORS (cross-origin resource sharing) - To be removed on PRODUCTION


// Auth Step 4 - Setup Express Session
app.use(session({
    secret: Secret,
    saveUninitialized: false,
    resave: false
}));

// Auth Step 5 - Setup Flash
app.use(flash());

// Auth Step 6 - Initialize Passport and Session
app.use(passport.initialize());
app.use(passport.session());

// Auth Step 7 - Implementing the Auth Strategy
// passport.use(Users.createStrategy());

// passport.use(TeamMembers.createStrategy());
passport.use('local', Users.createStrategy());

// Local Strategy for TeamMember
// passport.use(new JWTStrategy(jwtOptions, async (jwt_payload, done) => {
//     // console.log('JWT strategy called with payload:', jwt_payload);  // Logging the JWT payload

//     try {
//         let customer = await Customers.findById(jwt_payload.id);
//         if (customer) {
//             // console.log('Customer found:', customer);  // Logging user found
//             return done(null, customer);
//         }

//         const teamMember = await TeamMembers.findById(jwt_payload.id);
//         if (teamMember) {
//             // console.log('Team Member found:', teamMember);  // Logging team member found
//             return done(null, teamMember);
//         }

//         console.log('No customer or team member found for payload:', jwt_payload);  // Logging when no user or team member is found
//         return done(null, false);
//     } catch (err) {
//         console.error('Error in JWT strategy:', err);  // Logging errors
//         return done(err, false);
//     }
// }));


// Auth Step 8 - Setup serialization and deserialization
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

passport.serializeUser((user, done) => {
    const userPrototype = Object.getPrototypeOf(user);

    if (userPrototype === Users.prototype) {
        // console.log('Serializing as Customer:', user.id);  // Logging
        done(null, { id: user.id, type: 'User' });
    } else if (userPrototype === TeamMembers.prototype) {
        // console.log('Serializing as TeamMember:', user.id);  // Logging
        done(null, { id: user.id, type: 'TeamMember' });
    } else {
        console.error('Unknown user type during serialization');
        done(new Error('Unknown customer type'), null);
    }
});

passport.deserializeUser(async (obj, done) => {
    try {
        // console.log('Deserializing:', obj);  // Logging to see the object being deserialized

        if (obj.type === 'User') {
            const customer = await Users.findById(obj.id);
            if (!customer) {
                console.error('Customer not found during deserialization');
                return done(new Error('Customer not found'), null);
            }
            done(null, customer);
        } else if (obj.type === 'TeamMember') {
            const teamMember = await TeamMembers.findById(obj.id);
            if (!teamMember) {
                console.error('TeamMember not found during deserialization');
                return done(new Error('TeamMember not found'), null);
            }
            done(null, teamMember);
        } else {
            console.error('Unknown customer type during deserialization');
            done(new Error('Unknown customer type'), null);
        }
    } catch (err) {
        console.error('Error in deserialization:', err);
        done(err, null);
    }
});

// Setup ViewEngine EJS
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Use Routes
app.use('/', indexRouter);
app.use('/', adRouter);
app.use('/', adminRouter);
app.use('/', authRouter);
app.use('/', logsRouter);
app.use('/', profileRouter);
// app.use('/', adminRouter);
app.use('/api/auth', authApiRouter);
app.use('/api/ads', passport.authenticate('jwt', { session: false }), adsApiRouter);

// Use the Stripe routes
// app.use('/stripe', stripeRoutes);
// Serve static files from the 'uploads' directory
app.use(express.static(path.join(__dirname, '../uploads')));
app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


mongoose.connection.on('error', () => console.log("Mongo Connection Error"));
console.log('Server Running...');
export default app;