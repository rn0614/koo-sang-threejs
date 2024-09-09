"use client";
import { useState, useEffect, useRef } from "react";
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
  const chatEndRef = useRef<HTMLDivElement | null>(null); // 새로운 메시지 추가시 스크롤 위치 조정용

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (message.trim() && socket) {
      socket.emit("chatMessage", { chatId, message: `${userId}: ${message}` });
      setMessage("");
    }
  };

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

  useEffect(() => {
    // 새로운 메시지가 생길 때마다 채팅창 아래로 스크롤
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  return (
    <div className={styles.chatWrapper}>
      <div className={styles.chatHistory}>
        {chatMessages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
        <div ref={chatEndRef} />
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
      />
      <div className={styles.buttonWrapper}>
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
}
