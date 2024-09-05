"use client"
import { useState, useEffect } from "react";
import { Socket } from "socket.io-client";

type ChatBoxProps = {
  socket: Socket|null;
  chatId: string;
  userId: string;
};

export default function ChatBox({ socket, chatId, userId }:ChatBoxProps) {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<string[]>([]);

  useEffect(() => {
    if (socket) {
      socket.on("chatMessage", (msg: string) => {
        setChatMessages((prev) => [...prev, msg]);
      });
    }

    return () => {
      if (socket) {
        socket.off("chatMessage");
      }
    };
  }, [socket]);

  const sendMessage = () => {
    if (message.trim() && socket) {
      socket.emit("chatMessage", { chatId, message: `${userId}: ${message}` });
      setMessage("");
    }
  };

  return (
    <div
      style={{
        flex: 0,
        width: "500px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flexGrow: 1,
          border: "1px solid black",
          overflowY: "auto",
          marginBottom: "10px",
          padding: "10px",
        }}
      >
        {chatMessages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage} style={{ marginTop: "10px" }}>
        Send
      </button>
    </div>
  );
}
