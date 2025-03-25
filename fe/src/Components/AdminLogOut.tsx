import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove admin token from localStorage
    localStorage.removeItem("token");

    // Redirect to admin login page after 1.5 seconds
    setTimeout(() => {
      navigate("/");
    }, 1500);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-violet-400">Logging Out...</h2>
        <p className="text-gray-300 mt-3">Redirecting to login page.</p>
        <div className="animate-spin h-10 w-10 border-t-4 border-violet-500 rounded-full mt-4"></div>
      </div>
    </div>
  );
};

export default AdminLogout;
