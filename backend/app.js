import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import projectRoute from './routes/projectRoute.js'
import userProfileRoute from './routes/userProfileRoute.js'
import ChatRoute from './routes/Chat.Route.js'

import BidRoute from './routes/Bid.Route.js'
import AdminRoute from './routes/Admin/AdminDataCounts.js'
import OrderRoute from './routes/orderRoutes.js'
import paymentRoute from './routes/Admin/paymentRoute.js'




dotenv.config();

 const app = express();
 

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5003;

app.get("/",(req,res)=>{
  res.send("Freelance Marketplace Backend Running..")
});
//routes
app.use(`/api/auth`,authRoutes)
app.use('/api/project',projectRoute)
app.use('/api/userProfile',userProfileRoute)
app.use('/api/profileUpdate',userProfileRoute)
app.use('/api/chat',ChatRoute)

app.use('/api/bids',BidRoute);
app.use('/api/admin',AdminRoute)
app.use('/api/orders',OrderRoute)
app.use('/api/payment',paymentRoute);




export default app;