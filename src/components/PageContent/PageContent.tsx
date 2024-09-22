"use client";
import { useEffect } from "react";
import { Box, Grid, Container } from "@radix-ui/themes";
import { SongItem } from "../SongItem/SongItem";
import { useInfiniteSongList } from "@/hooks/useSongList";
import useOnPlay from "@/hooks/useOnPlay";
import InfiniteScroll from "react-infinite-scroller";
import styles from "./styles.module.scss";
import { Player } from "../Player/Player";

const PageContent = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteSongList({ limit: 5 });
  const songs = data?.pages.flat() || [];
  const onPlay = useOnPlay(songs);

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage(); // 페이지 번호를 넘기지 않고 호출
    }
  };

  return (
    <>
      <InfiniteScroll
        loadMore={loadMore}
        hasMore={hasNextPage}
        className={styles.infiniteScrollWrapper}
      >
        <Container minHeight={"80svh"} maxWidth={"100%"}>
          <Grid
            columns={{ xs: "1", sm: "2", md: "3", lg: "4", xl: "6" }}
            gap="3"
            width="auto"
          >
            {songs.map((song) => (
              <SongItem
                key={song.id}
                data={song}
                onClick={() => onPlay(song.id)}
              />
            ))}
          </Grid>
          {isFetchingNextPage && <p>Loading more...</p>}
        </Container>
      </InfiniteScroll>
      <Player />
    </>
  );
};

export default PageContent;
