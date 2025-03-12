
import { useParams } from "react-router-dom";

const ProjectDetails = () => {
  const userId = localStorage.getItem("userId"); // Get stored ID
  const { projectId } = useParams(); // Get project ID from the URL

  if (!userId) {
    return <p>Please log in to like projects.</p>;
  }

  if (!projectId) {
    return <p>Project ID is missing. Please check the URL.</p>;
  }

  return (
    <div>
      <h2>Project Details</h2>
      {/* <ProjectLike projectId={projectId} userId={userId} /> */}
    </div>
  );
};

export default ProjectDetails;
