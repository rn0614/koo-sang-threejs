import React from "react";
import getSongById from "@/actions/getSongsById";
import ClientImage from "@/components/Image/Image";
import styles from "./styles.module.scss";
import RoutingBackButton from "@/components/RoutingButton/RoutingButton";

type PageProps = {
  params: {
    musicId: string;
  };
};

export default async function MusicDetailPage({ params }: PageProps) {
  const song = (await getSongById(params.musicId)) as any;

  if (song == null) {
    return <div>해당 노래가 없습니다.</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageContent}>
        <div className={styles.imageWrapper}>
          <ClientImage alt="alt" song={song} />
        </div>
        <div className={styles.contentBox}>
          <p className={styles.detailHeader}>title: {song.title}</p>
          <p className={styles.detailText}>author: {song.author}</p>
          <p className={styles.detailText}>musicId: {params.musicId}</p>
        </div>
        <div className={styles.controller}>
          <div>
            <RoutingBackButton>back</RoutingBackButton>
          </div>
        </div>
      </div>
    </div>
  );
}
