import Project from '../models/projects.js'

export const createProject = async (req, res) => {
  try {
     

    const { title, description, budget, category } = req.body;
    const image = req?.file
    // .path
    if(!image){
      return res.status(400).json({message:"image is required"})
    }
    
    
    const clientId = req.user.userId;  

    if (!title || !description || !budget || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProject = new Project({ title, description, budget, category, clientId,image:image.path });
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



export const getProject = async (req,res) =>{
  try{
    const {clientId} = req.params;

    const project = await Project.find({clientId})
    if(project.length ===0){
      return res.status(404).send({message:"no project found"})
    }
    res.status(200).json(project)
  }
  catch(error){
    res.status(500).json({message:"error occured",error})
  }

}
