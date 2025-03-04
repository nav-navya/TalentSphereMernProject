// import React from 'react'
// import { Bell, Heart, MessageCircleMore, UserPen ,NotebookPen} from 'lucide-react'
// import { Link } from 'react-router-dom'




// const Navbar = () => {

//   return (
//    <header>
//     <div>
//       <nav className='h-16 
//       // bg-[#181b41]
//       bg-white
//        w-full '>
//         <div className='flex  flex-row w-full place-content-between '>
//           <p className='  m-[20px] font-bold'>TalentSphere</p>

//           <div className='flex items-center'>
            
//               <Link to='projects'>
//               <p  title='view your projects' className=''><NotebookPen/></p>
//               </Link>
             
              
//           </div>

//            <div className=' cursor-pointer flex flex-row space-x-10 m-4  '>
//            <p title='notifications'><Bell /></p>
//            <p title='wishlist'>
//            <Heart/></p>
//            <p title='message'><MessageCircleMore/></p>
//            <p title='view profile'>
//            <Link to='/profile'>
//            <UserPen/>
//            </Link>
//            </p>
          
//            </div> 
//         </div>
//       </nav>
//     </div>
//    </header>
//   )
// }

// export default Navbar




import { useEffect, useState } from "react";
import axios from "axios";
import { Bell, Heart, MessageCircleMore, UserPen, NotebookPen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [clientId, setClientId] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientId = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get("http://localhost:5003/api/userProfile/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setClientId(response.data._id);  // Assuming `_id` is the client ID
      } catch (error) {
        console.error("Error fetching client ID:", error);
      }
    };

    fetchClientId();
  }, []);

  return (
    <header>
      <nav className="h-16 bg-white w-full">
        <div className="flex flex-row w-full place-content-between">
          <p className="m-[20px] font-bold">TalentSphere</p>

          <div className="flex items-center">
            {clientId ? (
              <Link to={`/client/${clientId}`}>
                <p title="view your projects"><NotebookPen /></p>
              </Link>
            ) : (
              <p className="text-gray-500">Loading...</p>
            )}
          </div>

          <div className="cursor-pointer flex flex-row space-x-10 m-4">
            <p title="notifications"><Bell /></p>
            <p title="wishlist"><Heart /></p>
            <p title="message"><MessageCircleMore /></p>
            <p title="view profile">
              <Link to="/profile"><UserPen /></Link>
            </p>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
