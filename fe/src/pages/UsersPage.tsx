// import { useEffect, useState } from "react";
// import axios from "axios";

// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   role: string;
//   createdAt: string;
// }

// const UsersPage = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Fetch all users from API
//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get<User[]>("http://localhost:5003/api/admin/userLists");
//       // Filter out users with role "admin"
//       setUsers(response.data.filter(user => user.role !== "admin"));
//       setError(null);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       setError("Failed to fetch users.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete user function
//   const deleteUser = async (userId: string) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;

//     try {
//       await axios.delete(`http://localhost:5003/api/admin/deleteUser/${userId}`);
//       setUsers(users.filter(user => user._id !== userId)); // Update state to remove user
//     } catch (error) {
//       console.error("Error deleting user:", error);
//       alert("Failed to delete user.");
//     }
//   };

//   if (loading) return <p className="text-center mt-5">Loading users...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className="p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold mb-4">Users List</h2>
//       <table className="w-full border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border border-gray-300 p-2">Name</th>
//             <th className="border border-gray-300 p-2">Email</th>
//             <th className="border border-gray-300 p-2">Role</th>
//             <th className="border border-gray-300 p-2">Joined On</th>
//             <th className="border border-gray-300 p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.length > 0 ? (
//             users.map((user) => (
//               <tr key={user._id} className="text-center">
//                 <td className="border border-gray-300 p-2">{user.name}</td>
//                 <td className="border border-gray-300 p-2">{user.email}</td>
//                 <td className="border border-gray-300 p-2">{user.role}</td>
//                 <td className="border border-gray-300 p-2">
//                   {new Date(user.createdAt).toLocaleDateString()}
//                 </td>
//                 <td className="border border-gray-300 p-2">
//                   <button 
//                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
//                     onClick={() => deleteUser(user._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={5} className="text-center p-4">No users found.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UsersPage;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Edit, UserPlus } from "lucide-react";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get<User[]>("http://localhost:5003/api/admin/userLists");
      setUsers(response.data.filter(user => user.role !== "admin"));
      setError(null);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:5003/api/admin/deleteUser/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      {error}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="flex justify-between items-center bg-gray-50 px-6 py-4 border-b">
          <h2 className="text-3xl font-bold text-gray-800">User Management</h2>
          <div className="flex items-center space-x-4">
            <input 
              type="text" 
              placeholder="Search users..." 
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
           
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                {['Name', 'Email', 'Role', 'Joined On', 'Actions'].map((header) => (
                  <th 
                    key={header} 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${user.role === 'user' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        
                        <button 
                          className="text-red-500 hover:text-red-700 transition"
                          onClick={() => deleteUser(user._id)}
                          title="Delete User"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    No users found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredUsers.length > 0 && (
          <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t">
            <span className="text-sm text-gray-700">
              Showing {filteredUsers.length} of {users.length} users
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;