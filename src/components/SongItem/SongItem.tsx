"use client";
import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types/types";
import Image from "next/image";
import React from "react";
import { FloatButton } from "../FloatButton/FloatButton";
import styles from "./styles.module.scss";
import {
  Box,
  Container,
  Flex,
  Heading,
  Inset,
  Text,
  Button,
} from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { stackRouterPush } from "@/utils/stackRouter";

type SongItemProps = {
  data: Song;
  onClick: () => void; // 부모 컴포넌트에서 전달된 onClick 핸들러
};

export const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
  const { data: imagePath } = useLoadImage(data);
  const router = useRouter();

  const moreInfomationbuttonHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    stackRouterPush(router, "/music/detail/" + data.id);
  };
  return (
    <Flex
      direction={{ xs: "row", sm: "row", md: "column" }}
      className={styles.cardWrapper}
      onClick={onClick}
    >
      <Inset
        clip="padding-box"
        side="top"
        pb="current"
        className={styles.imageWrapper}
      >
        <Image
          src={imagePath || "/images/linked.png"}
          fill
          loading="lazy"
          alt={imagePath || "에러 이미지"}
          sizes="210px"
          priority={false}
        />
        <Container className={styles.floatingWrapper}>
          <FloatButton />
        </Container>
      </Inset>
      <Container className={styles.cardTextWrapper}>
        <Heading as="h2" weight="bold" size="5" className={styles.cardTitle}>
          {data.title}
        </Heading>
        <Text as="p" weight="light" size="2" className={styles.cardText}>
          By {data.author}
        </Text>
      </Container>
      <Box py="1">
        <Button onClick={moreInfomationbuttonHandler}>more infomation</Button>
      </Box>
    </Flex>
  );
};
