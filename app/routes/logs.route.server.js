/*
File: 
*/
import { Router } from "express";
import { LogsAdList } from "../controllers/logs.controller.server.js";
import { AuthGuard } from "../utils/index.js";

const router = Router();

//Routes to home and about page
router.get('/logs', AuthGuard, LogsAdList);

export default router;
