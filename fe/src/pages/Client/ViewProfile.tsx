import { useEffect, useState } from "react";
import axios from "axios";
import { LogOut } from 'lucide-react';
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  email: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();  // ✅ Move `useNavigate` here

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); 

        if (!token) {
          setError("No token found. Please login.");
          return;
        }

        const response = await axios.get("http://localhost:5003/api/userProfile/profile", {
          headers: { Authorization: `Bearer ${token}` }, 
        });

        setUser(response.data); 

      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load profile.");
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token
    navigate('/'); // Redirect to login
  };

  return (
    <div className="container mx-auto mt-10 p-6 bg-[#181b41] shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4 text-white">User Profile</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {user ? (
        <div className="space-y-3">
          <p className="text-white"><strong>Name:</strong> {user.name}</p>
          <p className="text-white"><strong>Email:</strong> {user.email}</p>
          <div className="flex justify-between">
            <button className="w-[200px] bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Add more details?
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 bg-red-500 text-white p-2 rounded hover:bg-red-600">
              <LogOut /> Log Out
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
};

export default Profile;
