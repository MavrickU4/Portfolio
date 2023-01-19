/*
File: 
*/
import { Router } from "express";
import { Add, Delete, Edit, Get, GetList } from "../../controllers/api/ad-api.controller.server.js";

const router = Router();

router.get('/list', GetList);
router.get('/:id', Get);
router.post('/add', Add);
router.put('/edit/:id', Edit);
router.delete('/delete/:id', Delete);

export default router;