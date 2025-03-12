import Project from '../models/projects.js'

export const createProject = async (req, res) => {
  try {


    const { title, description, budget, category } = req.body;
    const images = req?.file?.path || req?.file?.secure_url
    console.log("image", images);
    
    // .path
    if (!images) {
      return res.status(400).json({ message: "image is required" })
    }


    const clientId = req.user.userId;

    if (!title || !description || !budget || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProject = new Project({ title, description, budget, category, clientId, images, });
    console.log("response", newProject)
    await newProject.save();
    res.status(201).json({ message: "Project created successfully", project: newProject });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProject = await Project.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProject) return res.status(404).json({ message: "Project not found" });
    res.status(200).json({ message: "Project updated successfully", project: updatedProject });
  } catch (error) {
    res.status(500).json({ message: "Error occurred while updating the project" });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) return res.status(404).json({ message: "Project not found" });
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error occurred while deleting the project" });
  }
};



export const getProject = async (req, res) => {
  try {
    const { clientId } = req.params;

    const project = await Project.find({ clientId })
    if (project.length === 0) {
      return res.status(404).send({ message: "no project found" })
    }
    res.status(200).json(project)
  }
  catch (error) {
    res.status(500).json({ message: "error occured", error })
  }

}



////////////////////////////////////////////////////////////




//freelancer
export const getProjectCategory = async (req, res) => {
  try {
    const categories = [
      "Web development",
      "Graphic design",
      "Content writing",
      "Logo design",
      "AI services",
      "Digital marketing",
      "Music",
      "Art",
      "others"
    ]

    res.json(categories)

  }
  catch (error) {
    res.status(500).json({ message: "error occured.." })
  }
}


export const freelancergetProject = async (req, res) => {
try {
    const project = await Project.find({})
    res.json(project)
  }
  catch (error) {
    res.status(500).json({ message: "error occured", error })
  }

}



export const likeProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user.userId;

    const project = await Project.findOne({ _id: projectId });
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    if (project.likes.includes(userId)) {
      project.likes = project.likes.filter(id => id.toString() !== userId.toString());
      await project.save();
      return res.status(200).json({ message: "Project unliked successfully." });
    } else {
      project.likes.push(userId);
      await project.save();
      return res.status(200).json({ message: "Project liked successfully." });
    }
  } catch (error) {
    console.error("Error liking the project:", error);
    res.status(500).json({ message: "An error occurred while processing your request." });
  }
};

export const addBid = async (req, res) => {
  try {
    const { text, bidAmount, duration } = req.body;
    const { projectId } = req.params;
    const { userId } = req.user;  // Make sure userId exists in req.user, not req.user.userId

    if (!text || !bidAmount || !duration) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Find the project by ID
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    // Create the new bid object
    const newBid = {
      userId,
      projectId,
      text,
      bidAmount,
      duration,
      status: 'pending',  // Default status
    };

    // Add the new bid to the project’s comments array
    project.comments.push(newBid);

    // Save the updated project
    await project.save();

    // Respond with success
    res.status(200).json({ message: "Bid submitted successfully." });
  } catch (error) {
    res.status(400).json({ message: "Failed to add bid.", error: error.message });
  }
};


export const getBid = async (req, res) => {

  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId)

    if (!project) {
      return res.status(400).json({ message: "project cannot be found" })
    }

    res.status(200).json(project.comments);
  }
  catch (error) {
    res.status(500).json({ message: "error occured", error })

  }

}