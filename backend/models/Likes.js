import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
  projectId : {type:mongoose.Schema.Types.ObjectId,ref:"Project"},
  UserId :{type:mongoose.Schema.Types.ObjectId,ref:"User"}
},{timestamps:true})

const Like = mongoose.model("Like",LikeSchema)
export default Like;