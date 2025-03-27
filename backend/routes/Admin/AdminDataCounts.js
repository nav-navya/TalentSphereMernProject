import express from 'express';
 
import User from '../../models/User.model.js'
import Project from '../../models/projects.js';
import Payment from '../../models/paymentModel.js';


const router = express.Router();


// Get Dashboard Statistics
router.get("/dashboard", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProjects = await Project.countDocuments();
    const totalTransactions = await Payment.countDocuments();
    const totalEarnings = await Payment.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    res.json({
      totalUsers,
      totalProjects,
      totalTransactions,
      totalEarnings: totalEarnings[0]?.total || 0,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/userLists",async (req,res) => {
  try
  {
    const users = await User.find({},"name email role createdAt" )
  res.json(users)
}catch(error){
  res.status(500).json({msg:"error occured while listing users",error})
}
})


////delete user/////
router.delete("/deleteUser/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    // Find and delete the user
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ msg: "User not found to delete." });
    }

    // Delete all projects associated with the user
    await Project.deleteMany({ userId });

    res.status(200).json({ msg: "User and their projects deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ msg: "Error occurred while deleting user and projects.", error });
  }
});

///delete projects///
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Project.findByIdAndDelete(id);
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting project" });
  }
});

export default router;
