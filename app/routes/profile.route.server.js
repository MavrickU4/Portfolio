/*
File: 
*/
import {Router} from 'express';

import {displayProfilePage,
    processProfileDelete,
    processProfilePage} from '../controllers/profile.controller.server.js';
import { AuthGuard } from "../utils/index.js";

const router = Router();

router.get('/profile/:id', AuthGuard, displayProfilePage);
router.post('/profile/:id', AuthGuard, processProfilePage);
router.get('/profile-delete/:id', AuthGuard, processProfileDelete);

export default router;