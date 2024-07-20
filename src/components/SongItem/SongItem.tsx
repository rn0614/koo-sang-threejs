"use client";
import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types/types";
import Image from "next/image";
import { relative } from "path";
import React from "react";
import { FloatButton } from "../FloatButton/FloatButton";
import styles from './styles.module.scss';
import { Box, Card, Inset, Text } from "@radix-ui/themes";

type SongItemProps = {
  data: Song;
  onClick: (id: string) => void;
};

export const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
  const imagePath = useLoadImage(data);

  return (
    <Card className={styles.cardWrapper} onClick={() => onClick(data.id)}>
      <Inset
        clip="padding-box"
        side="top"
        pb="current"
        className={styles.imageWrapper}
        style={{ position: "relative", width: "200px", height: "200px" }}
      >
        <Image src={imagePath || "/images/linked.png"} fill alt="Image" />
        <div className={styles.floatingWrapper}>
          <FloatButton />
        </div>
      </Inset>
      <Box className={styles.cardTextWrapper}>
        <Text className={styles.cardText}>{data.title}</Text>
        <Text className={styles.cardText}>By {data.author}</Text>
      </Box>
    </Card>
  );
};


