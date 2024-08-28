import React from "react";
import getSongById from "@/actions/getSongsById";
import ClientImage from "@/components/Image/Image";
import styles from './styles.module.scss'

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
  console.log(song);

  return (
    <div className={styles.detailPageWrapper}>
      <ClientImage alt="alt" song={song} />
      <p className={styles.detailText}>title: {song.title}</p>
      <p className={styles.detailText}>author: {song.author}</p>
      <p className={styles.detailText}>musicId: {params.musicId}</p>
    </div>
  );
}
