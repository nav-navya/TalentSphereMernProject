import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import axios from "axios";
import { Send, FileText, User, DollarSign } from "lucide-react";

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

  const handlePayment = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      alert("Enter a valid amount");
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:5003/api/orders/create-order", {
        amount: Number(amount),
        currency: "INR",
        userId: currentUserId,
      });

      if (!data.success) {
        alert("Failed to create order. Try again.");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID as string,
        amount: data.order.amount,
        currency: "INR",
        name: "TalentSphere",
        description: `Payment to ${selectedUser?.name}`,
        order_id: data.order.id,
        handler: async function (response: any) {
          alert("Payment Successful!");
          console.log("Payment Success:", response);

          await axios.post("http://localhost:5003/api/payment/verify", {
            amount: data.order.amount,
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
    <div className="flex h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Sidebar with user list */}
      <div className="w-1/4 bg-white shadow-xl rounded-r-2xl p-6 overflow-y-auto">
        <div className="flex items-center mb-6">
          <User className="mr-3 text-blue-600" size={24} />
          <h2 className="text-2xl font-semibold text-gray-800">Contacts</h2>
        </div>
        <div className="space-y-2">
          {users.map((user) => (
            <div
              key={user._id}
              className={`
                transition duration-300 ease-in-out transform 
                px-4 py-3 rounded-lg cursor-pointer 
                flex items-center
                ${selectedUser?._id === user._id 
                  ? "bg-blue-500 text-white shadow-lg" 
                  : "hover:bg-blue-50 hover:scale-105"}
              `}
              onClick={() => setSelectedUser(user)}
            >
              <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center mr-3">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="font-medium">
                {user.name} {user._id === currentUserId ? "(You)" : ""}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Box */}
      <div className="w-3/4 flex flex-col">
        {selectedUser ? (
          <div className="flex flex-col h-full">
            {/* Chat Header */}
            <div className="bg-white shadow-md p-4 flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center mr-4">
                  {selectedUser.name.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-xl font-semibold text-gray-800">{selectedUser.name}</h2>
              </div>
              <div className="flex space-x-3">
                <button className="text-gray-500 hover:text-blue-600 transition">
                  <FileText size={24} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.sender === currentUserId ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`
                      max-w-md p-3 rounded-xl 
                      ${msg.sender === currentUserId 
                        ? "bg-blue-500 text-white" 
                        : "bg-white text-gray-800 shadow-md"}
                    `}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef}></div>
            </div>

            {/* Message Input */}
            <div className="bg-white p-4 border-t">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type a message..."
                />
                <button 
                  onClick={sendMessage} 
                  className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition flex items-center"
                >
                  <Send size={20} className="mr-2" /> Send
                </button>
              </div>
            </div>

            {/* Payment Input */}
            <div className="bg-gray-100 p-4 border-t">
              <div className="flex space-x-3">
                <div className="relative flex-1">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter payment amount"
                  />
                  <DollarSign 
                    size={20} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" 
                  />
                </div>
                <button 
                  onClick={handlePayment} 
                  className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition flex items-center"
                >
                  <DollarSign size={20} className="mr-2" /> Pay
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <p className="text-xl text-gray-500">Select a user to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;