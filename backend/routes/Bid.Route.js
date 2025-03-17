import express from 'express';
import mongoose from 'mongoose';
import { verifyToken } from '../middleware/authMiddleware.js';
import { getBid, placeBid,acceptBid , deleteBid} from '../controllers/Bid.js';

const router = express.Router();

router.post('/placeBid',verifyToken,placeBid);
router.get('/getBid/:projectId',verifyToken,getBid)
router.patch("/accept/:bidId", acceptBid);
router.delete("/delete/:bidId", deleteBid);



export default router;