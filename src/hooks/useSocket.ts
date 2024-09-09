// hooks/useSocket.js
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

export function useSocket(chatId:string) {
  const [socket, setSocket] = useState<Socket|null>(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_CHATSOCKET_URL!, {
      path: "/socket",
    });

    socket.emit("joinRoom", { chatId });

    socket.on("setOwner", (isOwner) => {
      setIsOwner(isOwner);
    });

    socket.on("roomClosed", () => {
      alert("The room was closed by the owner.");
      // 추가적으로 리디렉션 로직도 여기에 포함 가능
    });

    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, [chatId]);

  return { socket, isOwner };
}
