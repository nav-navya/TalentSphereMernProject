// import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
// import { io, Socket } from "socket.io-client";
// import axios from "axios";

// // Define types for the message and context
// interface Message {
//   senderId: string;
//   receiverId: string;
//   message: string;
//   createdAt?: string;
// }

// interface ChatContextType {
//   socket: Socket | null;
//   messages: Message[];
//   setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
//   fetchMessages: (senderId: string, receiverId: string) => void;
//   sendMessage: (projectId: string, senderId: string, receiverId: string, message: string) => void;
//   loading: boolean;
// }

// // Create the context
// const ChatContext = createContext<ChatContextType | null>(null);

// interface ChatProviderProps {
//   children: ReactNode;
// }

// export const ChatProvider = ({ children }: ChatProviderProps) => {
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);

//   useEffect(() => {
//     const newSocket = io("http://localhost:5003"); // Connect to backend
//     setSocket(newSocket);

//     // Listen for real-time messages
//     newSocket.on("receiveMessage", (message: Message) => {
//       setMessages((prev) => [...prev, message]);
//     });

//     return () => {
//       newSocket.close();
//     };
//   }, []);

//   // Fetch messages for a conversation
//   const fetchMessages = useCallback(async (senderId: string, receiverId: string) => {
//     setLoading(true);
//     try {
//       const { data } = await axios.get(`http://localhost:5003/api/chat/${senderId}/${receiverId}`);
//       setMessages(data);
//     } catch (error) {
//       console.error("Error fetching messages", error);
//     }
//     setLoading(false);
//   }, []);

//   // Send message function
// const sendMessage = async (projectId: string, senderId: string, receiverId: string, message?: string) => {
//   if (!message || typeof message !== "string" || !message.trim()) {
//     console.error("Invalid message:", message);
//     return;
//   }

//   try {
//     const { data } = await axios.post(
//       `http://localhost:5003/api/chat/${projectId}/send`,
//       { senderId, receiverId, message }
//     );

//     if (socket) {
//       socket.emit("sendMessage", data); // Emit message to socket
//     }

//     setMessages((prev) => [...prev, data]); // Update local state
//   } catch (error) {
//     console.error("Error sending message", error);
//   }
// };


//   return (
//     <ChatContext.Provider value={{ socket, messages, setMessages, fetchMessages, sendMessage, loading }}>
//       {children}
//     </ChatContext.Provider>
//   );
// };

// export const useChat = (): ChatContextType => {
//   const context = useContext(ChatContext);
//   if (!context) {
//     throw new Error("useChat must be used within a ChatProvider");
//   }
//   return context;
// };



import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import axios from "axios";

// Define types for the message and context
interface Message {
  senderId: string;
  receiverId: string;
  message: string;
  createdAt?: string;
}

interface ChatContextType {
  socket: Socket | null;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  fetchMessages: (senderId: string, receiverId: string) => void;
  sendMessage: (projectId: string, senderId: string, receiverId: string, message: string) => void;
  loading: boolean;
}

// Create the context
const ChatContext = createContext<ChatContextType | null>(null);

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const newSocket = io("http://localhost:5003");
    setSocket(newSocket);

    newSocket.on("receiveMessage", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  // Fetch messages for a conversation
  const fetchMessages = useCallback(async (senderId: string, receiverId: string) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`http://localhost:5003/api/chat/${senderId}/${receiverId}`);
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages", error);
    }
    setLoading(false);
  }, []);

  // Send message function
  const sendMessage = async (projectId: string, freelancerId: string, clientId: string, message: string) => {
    if (!message || !message.trim()) return;
    console.log("id", projectId)
    try {
      const { data } = await axios.post(
        `http://localhost:5003/api/chat/${projectId}/send`,
        { freelancerId, clientId, message }
      );

      if (socket) {
        socket.emit("sendMessage", data);
      }

      setMessages((prev) => [...prev, data]);
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  return (
    <ChatContext.Provider value={{ socket, messages, setMessages, fetchMessages, sendMessage, loading }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
