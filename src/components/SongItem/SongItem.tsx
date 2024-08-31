"use client";
import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types/types";
import Image from "next/image";
import React from "react";
import { FloatButton } from "../FloatButton/FloatButton";
import styles from "./styles.module.scss";
import { Inset } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { stackRouterPush } from "@/utils/stackRouter";
import Button from "../Button/Button";

type SongItemProps = {
  data: Song;
  onClick: () => void; // 부모 컴포넌트에서 전달된 onClick 핸들러
};

export const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
  const imagePath = useLoadImage(data);
  const router = useRouter();

  const moreInfomationbuttonHandler = (e:React.MouseEvent) => {
    e.stopPropagation();
    stackRouterPush(router, "/music/detail/" + data.id);
  };
  return (
    <div className={styles.cardWrapper} onClick={onClick}>
      <Inset
        clip="padding-box"
        side="top"
        pb="current"
        className={styles.imageWrapper}
      >
        <Image src={imagePath || "/images/linked.png"} fill loading="lazy" alt={imagePath||'에러 이미지'} sizes="210px" />
        <div className={styles.floatingWrapper}>
          <FloatButton />
        </div>
      </Inset>
      <div className={styles.cardTextWrapper}>
        <p className={styles.cardTitle}>{data.title}</p>
        <p className={styles.cardText}>By {data.author}</p>
      </div>
        <Button  onClick={moreInfomationbuttonHandler}>more infomation</Button>

    </div>
  );
};
