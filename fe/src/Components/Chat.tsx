
// import { useState, useEffect } from "react";
// import { useChat } from '../context/ChatContext'

// // Define types for props
// interface ChatProps {
//   receiverId: string;
// }

// // Define the type of each message
// interface Message {
//   senderId: string;
//   message: string;
// }

// const Chat = ({ receiverId }: ChatProps) => {
//   const { socket, messages, fetchMessages, sendMessage, loading } = useChat();
//   const [newMessage, setNewMessage] = useState<string>("");
//   const [currentUserId, setCurrentUserId] = useState<string | null>(null); // currentUserId can be string or null

//   useEffect(() => {
//     // Get user ID from localStorage
//     const storedUserId = localStorage.getItem("userId");
//     if (storedUserId) {
//       setCurrentUserId(storedUserId);
//       fetchMessages(storedUserId, receiverId);
//     }

//     if (socket && storedUserId) {
//       socket.emit("joinRoom", { senderId: storedUserId, receiverId });

//       socket.on("receiveMessage", () => {
//         fetchMessages(storedUserId, receiverId); // Refresh messages when new message arrives
//       });
//     }

//     return () => {
//       if (socket) {
//         socket.off("receiveMessage"); // Cleanup the event listener when the component is unmounted
//       }
//     };
//   }, [socket, receiverId, fetchMessages]);

//   const handleSendMessage = () => {
//     if (!currentUserId || !newMessage.trim()) return; // Ensure currentUserId and message are valid
//     sendMessage(currentUserId, receiverId, newMessage);
//     setNewMessage("");
//   };

//   return (
//     <div className="p-4 border rounded-lg w-80 bg-white">
//       <div className="h-60 overflow-y-auto border-b mb-2">
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`p-2 ${msg.senderId === currentUserId ? "text-right" : "text-left"}`}
//             >
//               <span className="bg-gray-200 p-1 rounded">{msg.message}</span>
//             </div>
//           ))
//         )}
//       </div>
//       <div className="flex">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           className="border p-2 w-full"
//         />
//         <button onClick={handleSendMessage} className="bg-blue-500 text-white px-4">
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chat;




import { useState, useEffect } from "react";
import { useChat } from '../context/ChatContext';

// Define types for props
interface ChatProps {
  receiverId: string;
}

// Define the type of each message
interface Message {
  senderId: string;
  message: string;
}

const Chat = ({ receiverId }: ChatProps) => {
  const { socket, messages, fetchMessages, sendMessage, loading } = useChat();
  const [newMessage, setNewMessage] = useState<string>("");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setCurrentUserId(storedUserId);
      fetchMessages(storedUserId, receiverId);
    }

    if (socket && storedUserId) {
      socket.emit("joinRoom", { senderId: storedUserId, receiverId });

      socket.on("receiveMessage", () => {
        fetchMessages(storedUserId, receiverId);
      });
    }

    return () => {
      if (socket) {
        socket.off("receiveMessage");
      }
    };
  }, [socket, receiverId, fetchMessages]);

  const handleSendMessage = () => {
    if (!currentUserId || !newMessage.trim()) return;
    sendMessage(currentUserId, receiverId, newMessage);
    setNewMessage("");
  };

  return (
    <div className="p-4 border rounded-lg w-80 bg-white">
      <div className="h-60 overflow-y-auto border-b mb-2">
        {loading ? (
          <p>Loading...</p>
        ) : (
          messages.map((msg, index) => {
            const isSender = String(msg.senderId) === String(currentUserId); // ✅ FIXED TYPE ISSUE
            return (
              <div key={index} className={`p-2 flex ${isSender ? "justify-end" : "justify-start"}`}>
                <span
                  className={`p-2 rounded-lg text-sm ${
                    isSender ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                  }`}
                >
                  {msg.message}
                </span>
              </div>
            );
          })
        )}
      </div>
      <div className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="border p-2 w-full rounded-lg"
        />
        <button onClick={handleSendMessage} className="bg-blue-500 text-white px-4 rounded-lg ml-2">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
