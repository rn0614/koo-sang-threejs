"use client";
import { useState, useEffect } from "react";
import { Socket } from "socket.io-client";
import styles from "./styles.module.scss";
import { Button } from "@radix-ui/themes";

type ChatBoxProps = {
  socket: Socket | null;
  chatId: string;
  userId: string;
};

export default function ChatBox({ socket, chatId, userId }: ChatBoxProps) {
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
    <div className={styles.chatWrapper}>
      <div className={styles.chatHistory}>
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
      <Button onClick={sendMessage} style={{ marginTop: "10px" }}>
        Send
      </Button>
    </div>
  );
}
