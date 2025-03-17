




// import React, { useState, useEffect } from "react";
// import axios from "axios";

// // Define the structure of a bid
// interface Freelancer {
//   _id: string;
//   name: string;
//   email: string;
// }

// interface Bid {
//   _id: string;
//   freelancerId: Freelancer;
//   bidAmount: number;
//   duration: string;
// }

// interface BidListProps {
//   projectId: string;
// }

// const BidList: React.FC<BidListProps> = ({ projectId }) => {
//   const [bids, setBids] = useState<Bid[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [role, setRole] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchBids = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const userRole = localStorage.getItem("role"); // Get role from local storage
//         setRole(userRole);

//         const response = await axios.get(`http://localhost:5003/api/bids/getBid/${projectId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setBids(response.data.bids || []);
//       } catch (err: any) {
//         setError(err.response?.data?.message || "Failed to fetch bids");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBids();
//   }, [projectId]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//       <div className="bg-gradient-to-r from-violet-500 to-gray-600 px-6 py-4">
//         <h2 className="text-xl font-bold text-white">Project Bids</h2>
//         <p className="text-blue-100 text-sm">{bids.length} {bids.length === 1 ? 'proposal' : 'proposals'} received</p>
//       </div>

//       {bids.length === 0 ? (
//         <div className="p-8 text-center">
//           <p className="mt-4 text-gray-500">No bids have been placed yet.</p>
//         </div>
//       ) : (
//         <div className="divide-y divide-gray-100">
//           {bids.map((bid) => (
//             <div key={bid._id} className="p-5 hover:bg-gray-50 transition-colors duration-150">
//               <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
//                 <div className="flex-grow">
//                   <div className="flex items-center mb-2">
//                     <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 mr-3">
//                       {bid.freelancerId.name.charAt(0).toUpperCase()}
//                     </div>
//                     <div>
//                       <h3 className="font-medium text-gray-900">{bid.freelancerId.name}</h3>
//                       <p className="text-sm text-gray-500">{bid.freelancerId.email}</p>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4 mt-4">
//                     <div className="bg-blue-50 p-3 rounded-lg">
//                       <p className="text-xs text-violet-500 font-medium">BID AMOUNT</p>
//                       <p className="text-lg font-bold text-gray-800">${bid.bidAmount}</p>
//                     </div>
//                     <div className="bg-green-50 p-3 rounded-lg">
//                       <p className="text-xs text-green-500 font-medium">DURATION</p>
//                       <p className="text-lg font-bold text-gray-800">{bid.duration}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Conditionally render buttons only if the user is a client */}
//                 {role === "client" && (
//                   <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
//                     <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-150 flex items-center justify-center">
//                       <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                       </svg>
//                       Accept
//                     </button>
//                     <button className="border border-red-500 text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg font-medium transition-colors duration-150 flex items-center justify-center">
//                       <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
//                       </svg>
//                       Decline
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BidList;





import React, { useState, useEffect } from "react";
import axios from "axios";

interface Freelancer {
  _id: string;
  name: string;
  email: string;
}

interface Bid {
  _id: string;
  freelancerId: Freelancer;
  bidAmount: number;
  duration: string;
}

interface BidListProps {
  projectId: string;
}

const BidList: React.FC<BidListProps> = ({ projectId }) => {
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const token = localStorage.getItem("token");
        const userRole = localStorage.getItem("role");
        setRole(userRole);

        const response = await axios.get(`http://localhost:5003/api/bids/getBid/${projectId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBids(response.data.bids || []);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch bids");
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, [projectId]);

  const handleAcceptBid = async (bidId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`http://localhost:5003/api/bids/accept/${bidId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove all other bids and keep only the accepted one
      setBids(bids.filter((bid) => bid._id === bidId));
      alert("Bid accepted successfully!");
    } catch (error) {
      console.error("Failed to accept bid:", error);
      alert("Failed to accept the bid");
    }
  };

  const handleDeclineBid = async (bidId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5003/api/bids/delete/${bidId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove the declined bid from the state
      setBids(bids.filter((bid) => bid._id !== bidId));
      alert("Bid declined successfully!");
    } catch (error) {
      console.error("Failed to decline bid:", error);
      alert("Failed to decline the bid");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-violet-500 to-gray-600 px-6 py-4">
        <h2 className="text-xl font-bold text-white">Project Bids</h2>
        <p className="text-blue-100 text-sm">{bids.length} {bids.length === 1 ? 'proposal' : 'proposals'} received</p>
      </div>

      {bids.length === 0 ? (
        <div className="p-8 text-center">
          <p className="mt-4 text-gray-500">No bids have been placed yet.</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {bids.map((bid) => (
            <div key={bid._id} className="p-5 hover:bg-gray-50 transition-colors duration-150">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div className="flex-grow">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 mr-3">
                      {bid.freelancerId.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{bid.freelancerId.name}</h3>
                      <p className="text-sm text-gray-500">{bid.freelancerId.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-xs text-violet-500 font-medium">BID AMOUNT</p>
                      <p className="text-lg font-bold text-gray-800">${bid.bidAmount}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-xs text-green-500 font-medium">DURATION</p>
                      <p className="text-lg font-bold text-gray-800">{bid.duration}</p>
                    </div>
                  </div>
                </div>

                {role === "client" && (
                  <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-150 flex items-center justify-center"
                      onClick={() => handleAcceptBid(bid._id)}
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Accept
                    </button>
                    <button
                      className="border border-red-500 text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg font-medium transition-colors duration-150 flex items-center justify-center"
                      onClick={() => handleDeclineBid(bid._id)}
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Decline
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BidList;
