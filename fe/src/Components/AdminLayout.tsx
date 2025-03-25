// import { useState } from "react";
// import { Link, BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { Home, Users, Briefcase, CreditCard, AlertCircle, BarChart2, Settings } from "lucide-react";


// const AdminDashboard = () => {
//   const [selectedMenu, setSelectedMenu] = useState("Dashboard");

//   const menuItems = [
//     { name: "Dashboard", icon: <Home />, path: "/admin" },
//     { name: "Users", icon: <Users />, path: "/admin/users" },
//     { name: "Projects & Bids", icon: <Briefcase />, path: "/admin/projects" },
//     { name: "Transactions", icon: <CreditCard />, path: "/admin/transactions" },
//     { name: "Settings", icon: <Settings />, path: "/admin/settings" },
//   ];

//   return (
   
//       <div className="flex h-screen bg-gray-100">
//         {/* Sidebar */}
//         <div className="w-64 bg-white shadow-lg p-5">
//           <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
//           <ul>
//             {menuItems.map((item) => (
//               <li key={item.name}>
//                 <Link
//                   to={item.path}
//                   className={`flex items-center gap-3 p-3 cursor-pointer rounded-md hover:bg-gray-200 ${
//                     selectedMenu === item.name ? "bg-blue-500 text-white" : ""
//                   }`}
//                   onClick={() => setSelectedMenu(item.name)}
//                 >
//                   {item.icon} {item.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>

        
//       </div>
  
//   );
// };

// export default AdminDashboard;




import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Home, Users, Briefcase, CreditCard, Settings } from "lucide-react";

const AdminLayout = () => {
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: <Home />, path: "/admin" },
    { name: "Users", icon: <Users />, path: "/admin/users" },
    { name: "Projects ", icon: <Briefcase />, path: "/admin/projects" },
    { name: "Transactions", icon: <CreditCard />, path: "/admin/transactions" },
    { name: "Settings", icon: <Settings />, path: "/admin/settings" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-5">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <ul>
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 p-3 cursor-pointer rounded-md hover:bg-gray-200 ${
                  selectedMenu === item.name ? "bg-blue-500 text-white" : ""
                }`}
                onClick={() => setSelectedMenu(item.name)}
              >
                {item.icon} {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet /> {/* This will render the child page (Dashboard, Users, etc.) */}
      </div>
    </div>
  );
};

export default AdminLayout;









