import { useNavigate } from "react-router-dom";

// Define the type for the props
interface ProfileProps {
  freelancerId: string; // Assuming freelancerId is a string (you can adjust it if it's a number or another type)
}

const Profile = ({ freelancerId }: ProfileProps) => {
  const navigate = useNavigate();

  const handleChat = () => {
    navigate(`/chat/${freelancerId}`);
  };

  return (
    <button onClick={handleChat} className="bg-blue-500 text-white p-2 rounded">
      Message
    </button>
  );
};

export default Profile;
