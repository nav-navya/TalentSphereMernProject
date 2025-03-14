import express from 'express';
import mongoose from 'mongoose';
import { verifyToken } from '../middleware/authMiddleware.js';
import { getBid, placeBid } from '../controllers/Bid.js';

const router = express.Router();

router.post('/placeBid',verifyToken,placeBid);
router.get('/getBid/:projectId',verifyToken,getBid)


export default router;