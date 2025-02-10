import dotenv from 'dotenv';dotenv.config();
import axios from 'axios';
import {Router} from 'express';
import { AdminAuthGuard } from "../utils/index.js";
import { displayAdminDashboardPage, displayAdminDatabaseMyProjectsPage,

    processActionMyProject, displayAdminDatabaseMyServicesPage,
    
 } from '../controllers/admin.controller.server.js';

const router = Router();

// Display Login Page
router.get('/admin/dashboard', AdminAuthGuard, displayAdminDashboardPage);
router.get('/admin/database/my-projects', AdminAuthGuard, displayAdminDatabaseMyProjectsPage);
router.get('/admin/database/my-services', AdminAuthGuard, displayAdminDatabaseMyServicesPage);


router.post('/admin/my-projects/action', AdminAuthGuard, processActionMyProject);

export default router;