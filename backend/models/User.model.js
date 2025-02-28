import mongoose from "mongoose"



const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true,
  },
  profilePic:{
    type:String,
    default: "https://i.ibb.co/4pDNDk1/default-avatar.png"

  },
  rating:{
    type:Number,
    default:0
  },
},
{ timestamps: true })

const User = mongoose.model("User",userSchema)

export default User