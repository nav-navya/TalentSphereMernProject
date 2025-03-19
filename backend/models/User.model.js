// import mongoose from "mongoose"



// const userSchema = new mongoose.Schema({
//   name:{
//     type:String,
//     required:true
//   },
//   email:{
//     type:String,
//     required:true,
//     unique:true,
//   },
//   password:{
//     type:String,
//     required:true,
//   },
//   mobile:{
//     type:Number
//   },bio:{
//     type:Number
//   },
//   role:{
//     type:String,

//   },
//   industry:{
//     type:String
//   },
//   location:{
//     type:String
//   },
//   skills:{
//     type:String
//   },
//   about:{
//     type:String
//   },
//   profilePic:{
//     type:String,
//     default: "https://i.ibb.co/4pDNDk1/default-avatar.png"

//   },
//   rating:{
//     type:Number,
//     default:0
//   },
// },
// { timestamps: true })

// const User = mongoose.model("User",userSchema)

// export default User





import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String, default: "https://i.ibb.co/4pDNDk1/default-avatar.png" },
  rating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  role: { type: String, enum: ["admin", "user"], default: "user" }, // Role field
});

export default mongoose.model("User", UserSchema);
