import express from "express";
import mongoose from "mongoose";
import Conversation from "../models/conversation.model.js";

const router = express.Router();

// ✅ Create or get an existing conversation
router.post("/conversation", async (req, res) => {
  let { senderId, receiverId } = req.body;

  try {
    // ✅ Convert string IDs to ObjectId
    senderId = new mongoose.Types.ObjectId(senderId);
    receiverId = new mongoose.Types.ObjectId(receiverId);

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = new Conversation({ participants: [senderId, receiverId] });
      await conversation.save();
    }

    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// ✅ Get all conversations of a user
router.get("/:userId", async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.params.userId); // Convert userId

    const conversations = await Conversation.find({
      participants: userId,
    }).populate("participants", "name email"); // Populate user details

    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

export default router;
