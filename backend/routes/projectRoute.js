
import express from 'express';
import { createProject, updateProject, deleteProject } from '../controllers/projectController.js';
import { verifyToken } from '../middleware/authMiddleware.js'

const router = express.Router();
// verifyToken
router.post('/create', verifyToken, createProject);
router.put('/update/:id',verifyToken, updateProject); // Added updateProject handler
router.delete('/delete/:id',verifyToken, deleteProject); // Added deleteProject handler

export default router;
