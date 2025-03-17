// import dotenv from "dotenv";
// import { connectDB } from "./config/db.js";
// import app from "./app.js";
// import http from "http";
// import { Server } from "socket.io";
// import mongoose from "mongoose";
// import Message from "./models/Message.js";

// dotenv.config();
// const PORT = process.env.PORT || 5003;

// // Connect to MongoDB
// connectDB();

// // Create HTTP server
// const server = http.createServer(app);

// // Initialize Socket.io
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5175", // Update with your frontend URL
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);

//   socket.on("joinRoom", ({ senderId, receiverId }) => {
//     if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(receiverId)) {
//       console.error("Invalid senderId or receiverId");
//       return;
//     }

//     const roomId = [senderId, receiverId].sort().join("_");
//     socket.join(roomId);
//   });

//   socket.on("sendMessage", async (data) => {
//     try {
//       let { senderId, receiverId, message } = data;

//       if (!senderId || !receiverId || !message) {
//         console.error("Missing required fields");
//         return;
//       }

//       if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(receiverId)) {
//         console.error("Invalid senderId or receiverId");
//         return;
//       }

//       senderId = new mongoose.Types.ObjectId(senderId);
//       receiverId = new mongoose.Types.ObjectId(receiverId);

//       const newMessage = new Message({ senderId, receiverId, message });
//       await newMessage.save();

//       const roomId = [senderId, receiverId].sort().join("_");
//       io.to(roomId).emit("receiveMessage", newMessage);
//     } catch (error) {
//       console.error("Error saving message:", error);
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });

// server.listen(PORT, () => {
//   console.log(`Server running on PORT ${PORT}`);
// });


import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import app from "./app.js";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import Message from "./models/Message.js";
import User from "./models/User.model.js";

dotenv.config();
const PORT = process.env.PORT || 5003;

// Connect to MongoDB
connectDB();

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5175", // Update with frontend URL
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("joinRoom", async ({ senderId, receiverId }) => {
    if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(receiverId)) {
      console.error("Invalid senderId or receiverId");
      return;
    }

    // ✅ Check if users exist
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);
    if (!sender || !receiver) {
      console.error("One or both users do not exist");
      return;
    }

    const roomId = [senderId, receiverId].sort().join("_");
    socket.join(roomId);
  });

  socket.on("sendMessage", async ({ senderId, receiverId, message }) => {
    try {
      if (!senderId || !receiverId || !message) return;
  
      console.log("Received message:", message); // Debugging log
  
      // Insert the message into DB **only once**
      // const newMessage = await Message.create({
      //   senderId,
      //   receiverId,
      //   message,
      //   timestamp: new Date(),
      // });
  
      // Emit to the receiver **only once**
      io.to(receiverId).emit("receiveMessage", newMessage);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });
  

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
