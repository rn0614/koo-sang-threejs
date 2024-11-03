import React from "react";
import ClientImage from "@/components/Image/Image";
import styles from "./styles.module.scss";
import RoutingBackButton from "@/components/RoutingButton/RoutingButton";
import { fetchSongById } from "@/hooks/useSongList";

type PageProps = {
  params: {
    musicId: string;
  };
};

export async function generateMetadata({params}:PageProps){
  try{
    const song = await fetchSongById(params.musicId);
    return {
      openGraph:{
        title: song.title,
        description: song.description,
        images:[song?.image?.[0]]
      }
    }
  }catch(e){
    return {
      title: "Not Found",
      description:"The page is not exist"
    }
  }
}

export default async function MusicDetailPage({ params }: PageProps) {
  //이부분을 serverAction이 아닌 fetch함수를 쓸 예정
  const song = await fetchSongById(params.musicId);

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
