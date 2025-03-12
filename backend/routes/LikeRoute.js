import express from 'express'
import { toggleLike,getTotalLikes } from '../controllers/Like';

const router = express.Router();

router.get('/like/:projectId',toggleLike);
router.get('/likes/:projectId',getTotalLikes);

export default router;