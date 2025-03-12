
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// Define the Bid interface
interface Bid {
  _id: string;
  userId: string;
  bidAmount: number;
  duration: string;
  text: string;
}

const BidsList = () => {
  const { projectId } = useParams<{ projectId: string }>(); // Get project ID from URL
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!projectId) {
      setError("Project ID is missing.");
      setLoading(false);
      return;
    }

    if (!token) {
      setError("User is not authenticated.");
      setLoading(false);
      return;
    }

    const fetchBids = async () => {
      try {
        const response = await axios.get<{ comments?: Bid[] }>(
          `http://localhost:5003/api/project/comments/${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("API Response:", response.data);
        setBids(response.data.comments ?? []); // Ensure response key matches your backend
      } catch (err) {
        console.error("Error fetching bids:", err);
        setError("Failed to fetch bids. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, [projectId, token]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Bids for Project {projectId}</h2>

      {loading && <p>Loading bids...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {bids.length > 0 ? (
        bids.map((bid) => (
          <div key={bid._id} className="border p-4 my-2 rounded shadow">
            <p><strong>Freelancer ID:</strong> {bid.userId}</p>
            <p><strong>Bid Amount:</strong> ${bid.bidAmount}</p>
            <p><strong>Duration:</strong> {bid.duration}</p>
            <p><strong>Message:</strong> {bid.text}</p>
          </div>
        ))
      ) : (
        !loading && <p>No bids available for this project.</p>
      )}
    </div>
  );
};



export default BidsList;
