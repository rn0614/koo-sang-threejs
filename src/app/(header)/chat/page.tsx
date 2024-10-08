"use client";
import { useGetRoomList } from "@/hooks/useSocket";
import {
  Button,
  Flex,
  Heading,
  Section,
  Separator,
  Text,
} from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid"; // UUID를 사용해 랜덤 chatId 생성
import styles from "./styles.module.scss";
import { useThrottle } from "@/hooks/useThrottle";
import { MdOutlineRefresh } from "react-icons/md";
import { stackRouterPush } from "@/utils/stackRouter";

export default function ChatPage() {
  const router = useRouter();
  const { rooms, refresh } = useGetRoomList();

  const refreshHandler = useThrottle(refresh, 1000);

  const createRoom = () => {
    const chatId = uuidv4(); // 랜덤 chatId 생성
    stackRouterPush(router, `/chat-detail/${chatId}`);
  };

  const joinRoom = (chatId: string) => {
    stackRouterPush(router, `/chat-detail/${chatId}`);
  };

  return (
    <div>
      <Section className={styles.chatCreateWrapper}>
        <Heading as="h2">chat방 생성</Heading>
        <Text>chat방을 만들고 사용자에게 url을 공유하세요</Text>
        <Button onClick={createRoom}>Create Room</Button>
        <Separator orientation="horizontal" size="4" />
      </Section>

      <Section className={styles.chatListWrapper}>
        <Flex direction={"row"} justify={"between"}>
          <Heading as="h2">room List</Heading>
          <MdOutlineRefresh
            size={26}
            onClick={refreshHandler}
            className={styles.refreshIcon}
          />
        </Flex>
        <Flex direction={"column"} gap="1">
          {rooms.map((item) => (
            <Button
              key={item}
              className={styles.chatRoom}
              onClick={() => joinRoom(item)}
            >
              {item}
            </Button>
          ))}
        </Flex>
        <Separator orientation="horizontal" size="4" />
      </Section>
    </div>
  );
}
