
import { Router } from "express";
import { displayAboutPage,
    displayHomePage,
    displayProjectsPage, 
    displayServicesPage, 
    displayEducationPage,
    displayContactPage,display404Page,
    displayProjectPage,
    processSendMessage } from "../controllers/index.controller.server.js";

const router = Router();

//Routes to home and about page
router.get('/', displayHomePage);
router.get('/home', displayHomePage);
router.get('/about', displayAboutPage);
router.get('/projects', displayProjectsPage);
router.get('/services', displayServicesPage);
router.get('/education', displayEducationPage);
router.get('/contact', displayContactPage);
router.get('/404', display404Page);

router.get('/project/view/:_id', displayProjectPage);

router.post('/send-message', processSendMessage);


export default router;
