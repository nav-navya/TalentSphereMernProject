
import express from 'express';
import { createProject, updateProject, deleteProject,getProject } from '../controllers/projectController.js';
import { verifyToken } from '../middleware/authMiddleware.js'
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/create', verifyToken,upload.single("image"), createProject);
router.put('/update/:id',verifyToken, updateProject); 
router.delete('/delete/:id',verifyToken, deleteProject); 
router.get('/client/:clientId',getProject)

export default router;
