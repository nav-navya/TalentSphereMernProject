
// import { useEffect, useState } from "react";
// import { io, Socket } from "socket.io-client";
// import axios from "axios";

// interface User {
//   _id: string;
//   name: string;
// }

// interface Message {
//   sender: string;
//   receiver: string;
//   message: string;
// }

// const socket: Socket = io("http://localhost:5003", { transports: ["websocket"] });

// const Chat: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState<string>("");

//   const currentUserId: string = localStorage.getItem("userId") || "";

//   // Fetch users
//   useEffect(() => {
//     axios.get("http://localhost:5003/api/chat/users").then((res) => {
//       setUsers(res.data);
//     });

//     socket.on("connect", () => {
//       console.log("Connected to WebSocket:", socket.id);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   // Fetch chat history
//   useEffect(() => {
//     if (selectedUser) {
//       axios
//         .get<Message[]>(`http://localhost:5003/api/chat/${currentUserId}/${selectedUser._id}`)
//         .then((res) => setMessages(res.data));
//     }
//   }, [selectedUser, currentUserId]);

//   // Listen for incoming messages
//   useEffect(() => {
//     socket.on("receiveMessage", (data: Message) => {
//       if (data.receiver === currentUserId || data.sender === currentUserId) {
//         setMessages((prev) => [...prev, data]); // Update chat in real time
//       }
//     });

//     return () => {
//       socket.off("receiveMessage");
//     };
//   }, [currentUserId]);

//   // Handle message send
//   const sendMessage = async () => {
//     if (newMessage.trim() && selectedUser) {
//       const messageData: Message = {
//         sender: currentUserId,
//         receiver: selectedUser._id,
//         message: newMessage,
//       };

//       setMessages((prev) => [...prev, messageData]); // Update UI instantly
//       setNewMessage("");

//       // Send message via Socket.io
//       socket.emit("sendMessage", messageData);

//       // Store message in DB
//       await axios.post("http://localhost:5003/api/chat/sendMessage", messageData);
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar with user list */}
//       <div className="w-1/4 bg-gray-200 p-4">
//         <h2 className="text-lg font-bold mb-4">Users</h2>
//         {users.map((user) => (
//           <div
//             key={user._id}
//             className="p-2 bg-white shadow mb-2 cursor-pointer"
//             onClick={() => setSelectedUser(user)}
//           >
//             {user.name}
//           </div>
//         ))}
//       </div>

//       {/* Chat Box */}
//       <div className="w-3/4 bg-white p-4">
//         {selectedUser ? (
//           <>
//             <h2 className="text-xl font-bold">{selectedUser.name}</h2>
//             <div className="h-96 overflow-y-auto border p-2">
//               {messages.map((msg, index) => (
//                 <div key={index} className={`p-2 ${msg.sender === currentUserId ? "text-right" : ""}`}>
//                   <span className="bg-blue-300 p-2 rounded">{msg.message}</span>
//                 </div>
//               ))}
//             </div>
//             <div className="mt-4 flex">
//               <input
//                 type="text"
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 className="border p-2 w-full"
//               />
//               <button onClick={sendMessage} className="bg-blue-500 text-white px-4">
//                 Send
//               </button>
//             </div>
//           </>
//         ) : (
//           <p>Select a user to chat</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Chat;






import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import axios from "axios";

// Define types
interface User {
  _id: string;
  name: string;
}

interface Message {
  sender: string;
  receiver: string;
  message: string;
}

// Initialize socket connection
const socket: Socket = io("http://localhost:5003", { transports: ["websocket"] });

const Chat = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  const currentUserId = localStorage.getItem("userId") || "";

  // Fetch users
  useEffect(() => {
    axios.get<User[]>("http://localhost:5003/api/chat/users").then((res) => {
      setUsers(res.data);
    });

    socket.on("connect", () => {
      console.log("Connected to WebSocket:", socket.id);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Fetch chat history when selecting a user
  useEffect(() => {
    if (selectedUser) {
      axios
        .get<Message[]>(`http://localhost:5003/api/chat/${currentUserId}/${selectedUser._id}`)
        .then((res) => setMessages(res.data));
    }
  }, [selectedUser]);

  // Listen for incoming messages and update UI in real-time
  useEffect(() => {
    const handleReceiveMessage = (data: Message) => {
      if (data.receiver === currentUserId || data.sender === currentUserId) {
        setMessages((prev) => [...prev, data]); // Update chat instantly
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [currentUserId]);

  // Handle message send
  const sendMessage = async () => {
    if (newMessage.trim() && selectedUser) {
      const messageData: Message = {
        sender: currentUserId,
        receiver: selectedUser._id,
        message: newMessage,
      };

      // Update UI instantly for the sender
      setMessages((prev) => [...prev, messageData]);
      setNewMessage("");

      // Emit message via WebSocket to update receiver instantly
      socket.emit("sendMessage", messageData);

      // Store message in DB
      await axios.post("http://localhost:5003/api/chat/sendMessage", messageData);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar with user list */}
      <div className="w-1/4 bg-gray-200 p-4">
        <h2 className="text-lg font-bold mb-4">Users</h2>
        {users.map((user) => (
          <div
            key={user._id}
            className="p-2 bg-white shadow mb-2 cursor-pointer"
            onClick={() => setSelectedUser(user)}
          >
            {user.name}
          </div>
        ))}
      </div>

      {/* Chat Box */}
      <div className="w-3/4 bg-white p-4">
        {selectedUser ? (
          <>
            <h2 className="text-xl font-bold">{selectedUser.name}</h2>
            <div className="h-96 overflow-y-auto border p-2">
              {messages.map((msg, index) => (
                <div key={index} className={`p-2 ${msg.sender === currentUserId ? "text-right" : ""}`}>
                  <span className="bg-blue-300 p-2 rounded">{msg.message}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="border p-2 w-full"
              />
              <button onClick={sendMessage} className="bg-blue-500 text-white px-4">
                Send
              </button>
            </div>
          </>
        ) : (
          <p>Select a user to chat</p>
        )}
      </div>
    </div>
  );
};

export default Chat;
