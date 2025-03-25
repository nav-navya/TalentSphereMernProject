// import { useEffect, useState, useRef } from "react";
// import { io, Socket } from "socket.io-client";
// import axios from "axios";

// // Define types
// interface User {
//   _id: string;
//   name: string;
// }

// interface Message {
//   sender: string;
//   receiver: string;
//   message: string;
// }

// // Initialize socket connection
// const socket: Socket = io("http://localhost:5003", { transports: ["websocket"] });

// const Chat = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState<string>("");

//   const currentUserId = localStorage.getItem("userId") || "";
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // Fetch users
//   useEffect(() => {
//     axios.get<User[]>("http://localhost:5003/api/chat/users").then((res) => {
//       setUsers(res.data);
//     });

//     socket.on("connect", () => {
//       console.log("Connected to WebSocket:", socket.id);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   // Fetch chat history when selecting a user
//   useEffect(() => {
//     if (selectedUser) {
//       axios
//         .get<Message[]>(`http://localhost:5003/api/chat/${currentUserId}/${selectedUser._id}`)
//         .then((res) => setMessages(res.data));
//     }
//   }, [selectedUser, currentUserId]);

//   // Listen for incoming messages and update UI in real-time
//   useEffect(() => {
//     const handleReceiveMessage = (data: Message) => {
//       if (data.receiver === currentUserId || data.sender === currentUserId) {
//         setMessages((prev) => [...prev, data]);
//       }
//     };

//     socket.on("receiveMessage", handleReceiveMessage);

//     return () => {
//       socket.off("receiveMessage", handleReceiveMessage);
//     };
//   }, [currentUserId]);

//   // Auto-scroll to the latest message
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // Handle message send
//   const sendMessage = async () => {
//     if (newMessage.trim() && selectedUser) {
//       const messageData: Message = {
//         sender: currentUserId,
//         receiver: selectedUser._id,
//         message: newMessage,
//       };

//       setMessages((prev) => [...prev, messageData]);
//       setNewMessage("");

//       // Emit message via WebSocket
//       socket.emit("sendMessage", messageData);

//       // Store message in DB
//       await axios.post("http://localhost:5003/api/chat/sendMessage", messageData);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar with user list */}
//       <div className="w-1/4 bg-gray-200 p-4 border-r">
//         <h2 className="text-lg font-bold mb-4">Users</h2>
//         {users.map((user) => (
//           <div
//             key={user._id}
//             className={`p-2 rounded-md cursor-pointer ${
//               selectedUser?._id === user._id ? "bg-blue-500 text-white" : "bg-white"
//             }`}
//             onClick={() => setSelectedUser(user)}
//           >
//             {user.name} {user._id === currentUserId ? "(You)" : ""}
//           </div>
//         ))}
//       </div>

//       {/* Chat Box */}
//       <div className="w-3/4 bg-white p-4 flex flex-col">
//         {selectedUser ? (
//           <>
//             <h2 className="text-xl font-bold p-2 bg-gray-300 rounded-md">{selectedUser.name}</h2>
//             <div className="flex-1 overflow-y-auto border p-2">
//               {messages.map((msg, index) => (
//                 <div key={index} className={`flex ${msg.sender === currentUserId ? "justify-end" : "justify-start"}`}>
//                   <span
//                     className={`p-2 my-1 rounded-lg ${
//                       msg.sender === currentUserId ? "bg-blue-500 text-white" : "bg-gray-300"
//                     }`}
//                   >
//                     {msg.message}
//                   </span>
//                 </div>
//               ))}
//               <div ref={messagesEndRef}></div>
//             </div>
//             <div className="mt-4 flex">
//               <input
//                 type="text"
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 className="border p-2 w-full rounded-md"
//                 placeholder="Type a message..."
//               />
//               <button onClick={sendMessage} className="bg-blue-500 text-white px-4 ml-2 rounded-md">
//                 Send
//               </button>
//               <button className="bg-green-500 text-white px-4 ml-2 rounded-md">Pay</button>
//             </div>
//           </>
//         ) : (
//           <p className="text-center text-gray-500">Select a user to chat</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Chat;





import { useEffect, useState, useRef } from "react";
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

const socket: Socket = io("http://localhost:5003", { transports: ["websocket"] });

const Chat = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const currentUserId: string = localStorage.getItem("userId") || "";
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    axios.get<User[]>("http://localhost:5003/api/chat/users").then((res) => setUsers(res.data));

    socket.on("connect", () => {
      console.log("Connected to WebSocket:", socket.id);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (selectedUser) {
      axios
        .get<Message[]>(`http://localhost:5003/api/chat/${currentUserId}/${selectedUser._id}`)
        .then((res) => setMessages(res.data));
    }
  }, [selectedUser, currentUserId]);

  useEffect(() => {
    const handleReceiveMessage = (data: Message) => {
      if (data.receiver === currentUserId || data.sender === currentUserId) {
        setMessages((prev) => [...prev, data]);
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [currentUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (newMessage.trim() && selectedUser) {
      const messageData: Message = {
        sender: currentUserId,
        receiver: selectedUser._id,
        message: newMessage,
      };

      setMessages((prev) => [...prev, messageData]);
      setNewMessage("");

      socket.emit("sendMessage", messageData);
      await axios.post("http://localhost:5003/api/chat/sendMessage", messageData);
    }
  };

  // Handle payment
  const handlePayment = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      alert("Enter a valid amount");
      return;
    }

    try {
      // Step 1: Create Razorpay order
      const { data } = await axios.post("http://localhost:5003/api/orders/create-order", {
        amount: Number(amount) * 100, // Convert to paise
        currency: "INR",
        userId: currentUserId,
      });

      if (!data.success) {
        alert("Failed to create order. Try again.");
        return;
      }

      // Step 2: Open Razorpay payment modal
      const options = {
        key: import.meta.env.RAZORPAY_KEY_ID as string, // Ensure env variable is defined
        amount: data.order.amount,
        currency: "INR",
        name: "TalentSphere",
        description: `Payment to ${selectedUser?.name}`,
        order_id: data.order.id,
        handler: async function (response: any) {
          alert("Payment Successful!");
          console.log("Payment Success:", response);

          // Store transaction in DB
          await axios.post("http://localhost:5003/api/payment/verify", {
            orderId: data.order.id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          });
        },
        prefill: {
          name: "Navya",
          email: "navya@example.com",
          contact: "9999999999",
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Try again.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar with user list */}
      <div className="w-1/4 bg-gray-200 p-4 border-r">
        <h2 className="text-lg font-bold mb-4">Users</h2>
        {users.map((user) => (
          <div
            key={user._id}
            className={`p-2 rounded-md cursor-pointer ${
              selectedUser?._id === user._id ? "bg-blue-500 text-white" : "bg-white"
            }`}
            onClick={() => setSelectedUser(user)}
          >
            {user.name} {user._id === currentUserId ? "(You)" : ""}
          </div>
        ))}
      </div>

      {/* Chat Box */}
      <div className="w-3/4 bg-white p-4 flex flex-col">
        {selectedUser ? (
          <>
            <h2 className="text-xl font-bold p-2 bg-gray-300 rounded-md">{selectedUser.name}</h2>
            <div className="flex-1 overflow-y-auto border p-2">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === currentUserId ? "justify-end" : "justify-start"}`}>
                  <span
                    className={`p-2 my-1 rounded-lg ${
                      msg.sender === currentUserId ? "bg-blue-500 text-white" : "bg-gray-300"
                    }`}
                  >
                    {msg.message}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef}></div>
            </div>
            <div className="mt-4 flex">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="border p-2 w-full rounded-md"
                placeholder="Type a message..."
              />
              <button onClick={sendMessage} className="bg-blue-500 text-white px-4 ml-2 rounded-md">
                Send
              </button>
            </div>

            {/* Payment Input & Button */}
            <div className="mt-4 flex">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border p-2 w-full rounded-md"
                placeholder="Enter amount"
              />
              <button onClick={handlePayment} className="bg-green-500 text-white px-4 ml-2 rounded-md">
                Pay
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">Select a user to chat</p>
        )}
      </div>
    </div>
  );
};

export default Chat;
