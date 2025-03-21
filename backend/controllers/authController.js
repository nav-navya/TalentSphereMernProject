// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'
// import User from '../models/User.model.js'

//  const register = async (req,res)=>{
//   try{
//     const {name , email, password} = req.body;
//     const existingUser = await User.findOne({email});
//     if(existingUser){
//       return res.status(400).json({message:"user with this email is allready exists"})
//     }

//     //Hash Password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password,salt);

//     //creating new instsnce in the model
//     const newUser = new User({
//       name:req.body.name,
//       email:req.body.email,
//       password:hashedPassword,
//       profilePic: req.body.profilePic || "https://i.ibb.co/4pDNDk1/default-avatar.png",
//       rating: 0, // Default rating
//       createdAt: Date.now(),
//     });

//     //saving user to database
//     await newUser.save();

   

//     res.status(201).json({
//       message: "User registered successfully",
//       user: {
//         id: newUser._id,
//         name: newUser.name,
//         email: newUser.email,
//         profilePic: newUser.profilePic,
//         rating: newUser.rating,
//         createdAt: newUser.createdAt, // Timestamp
//       },
//     });

//   }catch(error){
//     res.status(500).json({message:"error occured..",error})
//   }

// }

// //login
// const login = async (req,res)=>{
//   try{
//     const { email,password} = req.body;
//     const user = await User.findOne({email})

//     if(!user){
//       return res.status(401).json({message:"wrong credentials"})
//     }
//     const ismatch = await bcrypt.compare(password,user.password)
//     if(!ismatch){
//       return res.status(401).json({message:"password doesn't match"})
//     }

//     //generating jwt token
//     const token =  jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"7d",})

//     res.json({token,user:{
//       id: user._id,
//         name: user.name,
//         email: user.email,
//         profilePic: user.profilePic,
//         rating: user.rating,
//         createdAt: user.createdAt,
//     }})
//   }catch(error){
//     res.status(500).json({message:"bc server error"})

//   }
// }
// export default {register,login};





import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

// Define Admin Email
const ADMIN_EMAIL = "admin@example.com"; // Change this to your actual admin email

// Register Function
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Determine role based on email
    const role = email === ADMIN_EMAIL ? "admin" : "user";

    // Create new user instance
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      profilePic: req.body.profilePic || "https://i.ibb.co/4pDNDk1/default-avatar.png",
      rating: 0, // Default rating
      createdAt: Date.now(),
      role, // Assign role
    });

    // Save user to database
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role, // Include role in response
        profilePic: newUser.profilePic,
        rating: newUser.rating,
        createdAt: newUser.createdAt, // Timestamp
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error occurred", error });
  }
};

// Login Function
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Wrong credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password doesn't match" });
    }

    // Generate JWT token with role
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, // Send role to frontend
        profilePic: user.profilePic,
        rating: user.rating,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export default { register, login };
