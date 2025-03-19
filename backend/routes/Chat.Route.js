import express from 'express'
import { chatHistory, getAllUsers, sendMessage } from '../controllers/Chat.Controller.js';

const router = express.Router();

router.get('/users',getAllUsers)
router.post('/sendMessage',sendMessage)
router.get('/:userId/:receiverId',chatHistory)

export default router;