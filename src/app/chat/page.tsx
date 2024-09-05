'use client';

import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid'; // UUID를 사용해 랜덤 chatId 생성

export default function ChatPage() {
  const router = useRouter();

  const createRoom = () => {
    const chatId = uuidv4(); // 랜덤 chatId 생성
    router.push(`/chat/${chatId}`); // 방 생성 후 해당 방으로 이동
  };

  return (
    <div>
      <h1>Create a Chat Room</h1>
      <button onClick={createRoom}>Create Room</button>
    </div>
  );
}
