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


export function useGetRoomList() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_CHATSOCKET_URL!, {
      path: "/socket",
    });
    // 방 목록 요청
    socket.emit("getRoomList");

    // 서버에서 받은 방 목록 처리
    socket.on("roomList", (roomList) => {
      setRooms(roomList);
    });

    // 컴포넌트 언마운트 시 소켓 이벤트 정리
    return () => {
      socket.off("roomList");
    };
  }, []);

  return {rooms}
}