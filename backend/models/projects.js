
import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true, // Fixed from "required": "true" to true
  },
  category: {
    type: String,
    required: true,
    enum:["Web development","Graphic design","Content writing","Logo design","AI services","Digital marketing","Music","Art","others"]
  },
  skills:{
    type:String,
    
  },
  image:{
    type:String,
    
  },
  clientId: {  // Fixed the typo here (cliendId -> clientId)
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bids: [
    {
      freelancerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      bidAmount: Number,
      proposal: String,
      status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
    },
  ],
},
{ timestamps: true });

const Project = mongoose.model("Project", projectSchema);
export default Project;
