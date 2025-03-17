import { useParams } from "react-router-dom";
import Chat from "./Chat"; // Import your Chat component

// Define the type of the route params
interface Params extends Record<string, string | undefined> {
  receiverId?: string;
}

const ChatWrapper = () => {
  const { receiverId } = useParams<Params>(); // Get receiverId from URL and specify its type

  return <Chat receiverId={receiverId!} />; // Pass receiverId to the Chat component
};

export default ChatWrapper;
