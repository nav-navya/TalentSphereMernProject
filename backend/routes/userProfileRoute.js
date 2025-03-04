import express from 'express'
import {userDetails,userProfile} from '../controllers/UserProfile.js'
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile',verifyToken,userProfile)
router.patch('/updateProfile',verifyToken,userDetails)

export default router;