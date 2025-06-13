import React, { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  useEffect(() => {
    // Connect to your backend server (adjust URL as needed)
    socketRef.current = io(import.meta.env.VITE_BASE_URL, {
      transports: ["websocket"],
    });
    socketRef.current.on("connect", () => {
      console.log("Connected to socket server:", socketRef.current.id);
    });

    socketRef.current.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // Send a message to a specific event
  const sendMessage = (eventName, data) => {
    if (socketRef.current) {
      socketRef.current.emit(eventName, data);
    }
  };

  // Listen for messages from a specific event
  const recieveMessage = (eventName, callback) => {
    if (socketRef.current) {
      socketRef.current.on(eventName, callback);
    }
    return () => {
      if (socketRef.current) {
        socketRef.current.off(eventName, callback);
      }
    };
  };

  return (
    <SocketContext.Provider
      value={{ sendMessage, recieveMessage, socket: socketRef.current }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
