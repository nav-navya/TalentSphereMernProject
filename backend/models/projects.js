import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
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
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Web development",
        "Graphic design",
        "Content writing",
        "Logo design",
        "AI services",
        "Digital marketing",
        "Music",
        "Art",
        "others",
      ],
    },
    skills: {
      type: [String], // Changed from String to an array
    },
    images: {
      type: String, // Changed to an array for multiple images
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "in progress", "completed"],
      default: "open",
    },
    acceptedBidId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bid",
      default: null, // Store the accepted bid
    },
    // comments: [
    //   {
    //     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    //     text: { type: String, required: true }, // Added required
    //     bidAmount: { type: Number, required: true },
    //     duration: { type: String, required: true }, // Added duration
    //     status: {
    //       type: String,
    //       enum: ["pending", "accepted", "rejected"],
    //       default: "pending",
    //     },
    //   },
    // ],
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
