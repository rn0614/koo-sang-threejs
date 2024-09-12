"use client";
import { useGetRoomList } from "@/hooks/useSocket";
import { Button, Heading, Separator, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid"; // UUID를 사용해 랜덤 chatId 생성

export default function ChatPage() {
  const router = useRouter();
  const { rooms } = useGetRoomList();

  const createRoom = () => {
    const chatId = uuidv4(); // 랜덤 chatId 생성
    router.push(`/chat/${chatId}`); // 방 생성 후 해당 방으로 이동
  };

  return (
    <div>
      <Heading as="h1">chat방 생성</Heading>
      <Text>chat방을 만들고 사용자에게 url을 공유하세요</Text>
      <Separator orientation="horizontal" size="4" />
      <Button onClick={createRoom}>Create Room</Button>

      <div>test</div>
      {rooms.map((item) => (
        <div>{item}</div>
      ))}
    </div>
  );
}
