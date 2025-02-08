
import { Router } from "express";
import { displayAboutPage,
    displayHomePage,
    displayProjectsPage, 
    displayServicesPage, 
    displayEducationPage,
    displayContactPage,
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

router.post('/send-message', processSendMessage);


export default router;
