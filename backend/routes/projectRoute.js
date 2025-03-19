
import express from 'express';
import { createProject, updateProject, deleteProject,getProject,getProjectCategory, freelancergetProject, likeProject,  } from '../controllers/projectController.js';
import { verifyToken } from '../middleware/authMiddleware.js'
import upload from '../middleware/uploadMiddleware.js';
import Project from '../models/projects.js';

const router = express.Router();

//client
router.post('/create', verifyToken, upload.single("images"),createProject);
router.put('/update/:id',verifyToken, updateProject); 
router.delete('/delete/:id',verifyToken, deleteProject); 
router.get('/client/:clientId',getProject)
//freelancer
router.get('/category',getProjectCategory)
router.get('/getprojects',freelancergetProject)
router.patch("/like/:projectId",verifyToken,likeProject)
// router.post('/addBid/:projectId',verifyToken,addBid)
// router.get('/comments/:projectId',getBid)


router.get("/jobs", async (req, res) => {
  try {
    const { category } = req.query;
    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    const projects = await Project.find({ category });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});



export default router;
