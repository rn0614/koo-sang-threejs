import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types/types";
import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";

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
    <div  className={styles.mediaItemWrapper}>
      <div onClick={hadleClick} className={styles.mediaItemContent}>
        <div className={styles.imageWrapper}>
          <Image
            fill
            src={imageUrl || "/images/linked.png"}
            alt="Media Item"
            className={styles.image}
          />
        </div>
        <div className={styles.mediaItemTextWrapper}>
          <p className={styles.mediaItemText}>{data.title}</p>
          <p className={styles.mediaItemText}>{data.author}</p>
        </div>
      </div>
    </div>
  );
};
