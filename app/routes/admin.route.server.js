import dotenv from 'dotenv';dotenv.config();
import axios from 'axios';
import {Router} from 'express';
import { AdminAuthGuard } from "../utils/index.js";
import { displayAdminDashboardPage } from '../controllers/admin.controller.server.js';

const router = Router();

// Display Login Page
router.get('/admin/dashboard', AdminAuthGuard, displayAdminDashboardPage);

export default router;