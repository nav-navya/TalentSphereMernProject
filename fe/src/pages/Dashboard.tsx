import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProjects: 0,
    totalTransactions: 0,
    totalEarnings: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("http://localhost:5003/api/admin/dashboard"); // Adjust backend URL
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-end">
        <Link to='logout'>
        <button>Log Out</button>
        </Link>
      
      </div>
     
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-blue-500 text-white rounded-lg">
          <h3 className="text-lg">Total Users</h3>
          <p className="text-2xl">{stats.totalUsers}</p>
        </div>
        <div className="p-4 bg-green-500 text-white rounded-lg">
          <h3 className="text-lg">Total Projects</h3>
          <p className="text-2xl">{stats.totalProjects}</p>
        </div>
        <div className="p-4 bg-yellow-500 text-white rounded-lg">
          <h3 className="text-lg">Total Transactions</h3>
          <p className="text-2xl">{stats.totalTransactions}</p>
        </div>
        <div className="p-4 bg-red-500 text-white rounded-lg">
          <h3 className="text-lg">Total Earnings</h3>
          <p className="text-2xl">${stats.totalEarnings}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
