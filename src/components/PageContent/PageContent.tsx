"use client";

import { Song } from "@/types/types";
import { SongItem } from "../SongItem/SongItem";
import styles from './styles.module.scss';
import useOnPlay from "@/hooks/useOnPlay";
import { Box } from "@radix-ui/themes";

type PageContentProps = {
  songs: Song[];
};

const PageContent: React.FC<PageContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);
  if (songs.length === 0) {
    return <Box>No songs available.</Box>;
  }
  return (
    <Box className={styles.pageContainer}>
      {songs.map((song) => (
        <SongItem key={song.id} data={song} onClick={(id:string) => onPlay(id)} />
      ))}
    </Box>
  );
};

export default PageContent;
