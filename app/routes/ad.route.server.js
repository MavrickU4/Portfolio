/*
File:
*/
import { Router } from "express";

import { DisplayAdList, 
    DisplayAdAddPage, 
    ProcessAdAddPage, 
    ProcessAdEditPage, 
    DisplayAdEditPage,
    DisplayAdViewPage,
    ProcessAdDelete} from "../controllers/ad.controller.server.js";

import { AuthGuard } from "../utils/index.js";

const router = Router();

//list all ad's
router.get('/ad-list', AuthGuard, DisplayAdList);

//add and processes the new database item 
router.get('/post-ad', AuthGuard,  DisplayAdAddPage);
router.post('/post-ad', AuthGuard, ProcessAdAddPage);

//edit database item and processes them
router.post('/ad-edit/:id', AuthGuard, ProcessAdEditPage);
router.get('/ad-edit/:id', AuthGuard, DisplayAdEditPage);

//Display Ad Details page
router.get('/ad-view/:id', AuthGuard, DisplayAdViewPage);

//deletes item from database
router.get('/ad-delete/:id', AuthGuard, ProcessAdDelete);

export default router;