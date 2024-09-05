"use client"
import { useSocket } from "@/hooks/useSocket";
import dynamic from "next/dynamic";
import ChatBox from "@/components/ChatBox/ChatBox";
import generateRandomName from "@/utils/generateRandomName"; // 유저 이름 생성 유틸

// 동적 import로 클라이언트에서만 ExcalidrawCanvas를 로드
const ExcalidrawCanvas = dynamic(() => import("@/components/Excalidraw/Excalidraw"), { ssr: false });


type PropsChatPage ={
  params:{
    chatId:string;
  }
}

export default function ChatAndDrawPage({ params }:PropsChatPage) {
  const userId = generateRandomName();
  const chatId = params.chatId;
  const { socket, isOwner } = useSocket(chatId);

  return (
    <div style={{ display: "flex", flexDirection: "row", flexGrow: 1, height: "100vh", width: "100%" }}>
      <div style={{ flex: 1, borderRight: "1px solid #ccc" }}>
        <ExcalidrawCanvas isOwner={isOwner} socket={socket} chatId={chatId} />
      </div>

      <ChatBox socket={socket} chatId={chatId} userId={userId} />
    </div>
  );
}