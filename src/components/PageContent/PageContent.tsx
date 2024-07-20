"use client";

import { Song } from "@/types/types";
import { SongItem } from "../SongItem/SongItem";
import styles from './styles.module.scss';

type PageContentProps = {
  songs: Song[];
};

const PageContent: React.FC<PageContentProps> = ({ songs }) => {
  if (songs.length === 0) {
    return <div>No songs available.</div>;
  }
  return (
    <div className={styles.imageContainer}>
      {songs.map((song) => (
        <SongItem key={song.id} data={song} onClick={() => {}} />
      ))}
    </div>
  );
};

export default PageContent;
