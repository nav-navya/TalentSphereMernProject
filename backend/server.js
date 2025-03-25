
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import app from "./app.js";
import http from "http";
import express from 'express'
import { Server } from "socket.io";
import razorpay from "./config/razorPay.js";


dotenv.config();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods:["GET","POST"],
  },
})

io.on("connection", (socket) => {
  console.log(`User connected:,${socket.id}`);

    socket.on("sendMessage", (data) =>{
      io.emit("receiveMessage",data);
    });

    socket.on("disconnect", () => {
      console.log(`User Disconnected: ${socket.id}`);
    });
})
const PORT = process.env.PORT || 5003;


connectDB();

console.log("Razorpay instance initialized:", razorpay);

server.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});


