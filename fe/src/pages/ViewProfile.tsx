import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  name: string;
  email: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");

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

  return (
    <div className="container mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">User Profile</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {user ? (
        <div className="space-y-3">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <div className="flex justify-center">
         <button className="w-[200px] bg-blue-500 text-white p-2 rounded w-16 hover:bg-blue-600 ">Add more details?</button></div>
        </div>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
};

export default Profile;
