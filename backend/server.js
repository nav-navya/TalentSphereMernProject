import mongoose from "mongoose";
import dotenv from "dotenv";
import {connectDB}  from "./config/db.js";
import app from "./app.js"; 


dotenv.config();


const PORT = process.env.PORT || 5003;


connectDB();


app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});

