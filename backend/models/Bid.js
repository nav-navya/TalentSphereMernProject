import mongoose from 'mongoose'

const BidSchema = new mongoose.Schema({
  projectId:{type:mongoose.Schema.Types.ObjectId,ref:"Project",required:true},
  freelancerId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
  bidAmount:{type:Number,required:true},
  duration:{type: String,required:true},
  status:{type:String,enum:['pending','accepted','rejected'],default:'pending'}
},{timestamps:true});

const Bid = mongoose.model("Bid",BidSchema)
export default Bid;