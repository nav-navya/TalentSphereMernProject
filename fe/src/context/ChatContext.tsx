// import { createContext, useContext, useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import axios from "axios";

// interface Message {
//   senderId: string;
//   receiverId: string;
//   message: string;
//   createdAt?: string;
// }

// const ChatContext = createContext<any>(null);

// export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const socket = io("http://localhost:5003");

//   useEffect(() => {
//     socket.on("receiveMessage", (message: Message) => {
//       setMessages((prev: Message[]) => [...prev, message]);
//     });
//   }, []);

//   const sendMessage = async (senderId: string, receiverId: string, message: string) => {
//     try {
//       await axios.post("http://localhost:5003/api/chat/send", { senderId, receiverId, message });
//       socket.emit("sendMessage", { senderId, receiverId, message });
//     } catch (error) {
//       console.error("Error sending message", error);
//     }
//   };

//   return (
//     <ChatContext.Provider value={{ messages, sendMessage }}>
//       {children}
//     </ChatContext.Provider>
//   );
// };

// export const useChat = () => useContext(ChatContext);


import { createContext, useContext, useEffect, useState, ReactNode ,useCallback} from "react";
import { io, Socket } from "socket.io-client";
import axios from "axios";

// Define types for the message and context
interface Message {
  senderId: string;
  receiverId: string;
  message: string;
}

interface ChatContextType {
  socket: Socket | null;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  fetchMessages: (senderId: string, receiverId: string) => void;
  sendMessage: (senderId: string, receiverId: string, message: string) => void;
  loading: boolean;
}

// Create the context with an initial value of null (will be typed later)
const ChatContext = createContext<ChatContextType | null>(null);

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const newSocket = io("http://localhost:5003"); // Backend URL
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  // const fetchMessages = async (senderId: string, receiverId: string) => {
  //   setLoading(true);
  //   try {
  //     const { data } = await axios.get(`http://localhost:5003/api/chat/${senderId}/${receiverId}`);
  //     setMessages(data);
  //   } catch (error) {
  //     console.error("Error fetching messages", error);
  //   }
  //   setLoading(false);
  // };


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

  const sendMessage = async (senderId: string, receiverId: string, message: string) => {
    if (!message.trim()) return;

    try {
      const { data } = await axios.post(`http://localhost:5003/api/chat/send`, {
        senderId,
        receiverId,
        message,
      });

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
