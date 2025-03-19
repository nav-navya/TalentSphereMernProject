// import express from "express";
// import Message from "../models/Message.js";

// const router = express.Router();

// // ✅ Save a new message
// router.post("/send", async (req, res) => {
//   const { senderId, receiverId, message } = req.body;

//   if (!senderId || !receiverId || !message) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   try {
//     const newMessage = new Message({ senderId, receiverId, message });
//     await newMessage.save();
//     res.status(201).json(newMessage);
//   } catch (error) {
//     res.status(500).json({ error: "Error sending message" });
//   }
// });

// // ✅ Fetch chat history between two users
// router.get("/:senderId/:receiverId", async (req, res) => {
//   const { senderId, receiverId } = req.params;

//   try {
//     const messages = await Message.find({
//       $or: [
//         { senderId, receiverId },
//         { senderId: receiverId, receiverId: senderId },
//       ],
//     }).sort({ timestamp: 1 });

//     res.status(200).json(messages);
//   } catch (error) {
//     res.status(500).json({ error: "Error retrieving messages" });
//   }
// });

// export default router;

// ///////////////////////////////////////////////////////////////


// import express from "express";
// import http from "http";
// import { Server } from "socket.io";
// import cors from "cors";
// import Message from "../models/Message.js";

// const app = express();
// const server = http.createServer(app); // Create HTTP server
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5175", // Change to frontend URL
//     methods: ["GET", "POST"],
//   },
// });

// app.use(cors());
// app.use(express.json());

// // ✅ MongoDB Connection
// mongoose.connect("mongodb://127.0.0.1:27017/chatDB")
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // ✅ Handle WebSocket Connections
// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);

//   // Join Room
//   socket.on("joinRoom", ({ senderId, receiverId }) => {
//     const room = [senderId, receiverId].sort().join("_");
//     socket.join(room);
//     console.log(`User joined room: ${room}`);
//   });

//   // ✅ Handle message sending
//   socket.on("sendMessage", async ({ senderId, receiverId, message }) => {
//     const room = [senderId, receiverId].sort().join("_");

//     const newMessage = new Message({ senderId, receiverId, message });
//     await newMessage.save();

//     io.to(room).emit("receiveMessage", newMessage);
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });


import express from "express";
import Message from "../models/Message.js";
import User from "../models/User.model.js";







import { sendMessage } from "../controllers/chatController.js";

const router = express.Router();

router.post("/:projectId/send", sendMessage);




//////////////////////////////////////////////////////////////////////////////////////////////////////
router.get("/:senderId/:receiverId", async (req, res) => {
  console.log("Request Params:", req.params); 

  const { senderId, receiverId } = req.params;
  console.log("Extracted senderId:", senderId, "receiverId:", receiverId); 

  try {
    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    })
      .populate("senderId", "name profilePicture role") 
      .populate("receiverId", "name profilePicture role") 
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving messages" });
  }
});


export default router;
