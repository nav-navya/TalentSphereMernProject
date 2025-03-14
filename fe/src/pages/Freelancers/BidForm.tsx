import { useState } from "react";
import axios from "axios";

interface BidFormProps {
  projectId: string;
  onBidSuccess?: () => void; // Optional callback to refresh bid list
}

const BidForm: React.FC<BidFormProps> = ({ projectId, onBidSuccess }) => {
  const [bidAmount, setBidAmount] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      console.log(token)
  
      console.log("Sending bid:", { projectId, bidAmount, duration });
  
      const response = await axios.post(
        `http://localhost:5003/api/bids/placeBid`,
        { projectId, bidAmount, duration },
        { headers: { Authorization: `Bearer ${token}` } }
      );
     
  
      console.log("Bid placed successfully:", response.data);
  
      alert("Bid placed successfully!");
      if (onBidSuccess) onBidSuccess();
  
      setBidAmount("");
      setDuration("");
    } catch (error: any) {
      console.error("Error placing bid:", error.response?.data || error.message);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-md">
      <input
        type="number"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
        placeholder="Bid Amount"
        required
        className="p-2 border rounded mb-2 w-full"
      />
      <input
        type="text"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        placeholder="Duration (e.g., 5 days)"
        required
        className="p-2 border rounded mb-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Place Bid
      </button>
    </form>
  );
};

export default BidForm;
