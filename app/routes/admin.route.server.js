import dotenv from 'dotenv';dotenv.config();
import axios from 'axios';
import {Router} from 'express';
import { AdminAuthGuard } from "../utils/index.js";
import { displayAdminDashboardPage, displayAdminDatabaseMyProjectsPage,

    processAddMyProject
    
 } from '../controllers/admin.controller.server.js';

const router = Router();

// Display Login Page
router.get('/admin/dashboard', AdminAuthGuard, displayAdminDashboardPage);
router.get('/admin/database/my-projects', AdminAuthGuard, displayAdminDatabaseMyProjectsPage);

router.post('/admin/my-projects/add', AdminAuthGuard, processAddMyProject);

export default router;