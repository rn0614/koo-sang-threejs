import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types/types";
import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import { Box, Container, Heading, Section, Text } from "@radix-ui/themes";

type MediaItemProps = {
  onClick?: (id: string) => void;
  data: Song;
};

export const MediaItem: React.FC<MediaItemProps> = ({ onClick, data }) => {
  const imageUrl = useLoadImage(data);

  const hadleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }

    return;
  };

  return (
    <Box className={styles.mediaItemWrapper}>
      <Box onClick={hadleClick} className={styles.mediaItemContent}>
        <Box className={styles.imageWrapper}>
          <Image
            fill
            src={imageUrl || "/images/linked.png"}
            alt="Media Item"
            className={styles.image}
          />
        </Box>
        <Box className={styles.mediaItemTextWrapper}>
          <Heading as="h2" weight="bold" size="5" className={styles.cardTitle}>
            {data.title}
          </Heading>
          <Text as="p" weight="light" size="2" className={styles.cardText}>
            By {data.author}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
