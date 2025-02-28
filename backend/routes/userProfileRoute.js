import express from 'express'
import userProfile from '../controllers/UserProfile.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile',verifyToken,userProfile)

export default router;