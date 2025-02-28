
import axios from "axios";
import { useState } from "react";

interface FormData {
  title: string;
  description: string;
  budget: number | string;
  skills: string;
  category: string;
}

const CreateProject = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    budget: "",
    skills: "",
    category: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "budget" ? parseFloat(value) || "" : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token")
    console.log(token)

    if (!token) {
      console.error("No token found in localStorage!");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5003/api/project/create', formData,
        {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log("full response",response)
      alert("Project created successfully");
      console.log(response.data);
    } catch (error) {
      console.error("Error creating Project", error);
      setError("Failed to create project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold">Create a new Project</h2>
      {error && <div className="text-red-500">{error}</div>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
          className="w-1/2 p-2 border rounded"
          required
        /><br/>
        <textarea
          name="description"
          placeholder="Project Description"
          value={formData.description}
          onChange={handleChange}
          className="w-1/2 p-2 border rounded min-h-[100px]"
          required
        ></textarea>
        <br/>
        <input
          type="number"
          name="budget"
          placeholder="Budget (USD)"
          value={formData.budget}
          onChange={handleChange}
          className="w-1/2 p-2 border rounded"
          required
        /><br/>
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-1/2 p-2 border rounded"
          required
        /><br/>
        <input
          type="text"
          name="skills"
          placeholder="Skills"
          value={formData.skills}
          onChange={handleChange}
          className="w-1/2 p-2 border rounded"
          required
        /><br/>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-16 hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Creating..." : "Add Project"}
        </button>
      </form>
    </div>
  );
};

export default CreateProject;