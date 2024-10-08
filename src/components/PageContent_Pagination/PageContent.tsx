"use client";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types/types";
import { Box, Container, Flex, Grid } from "@radix-ui/themes";
import React, { useState } from "react";
import { SongItem } from "../SongItem/SongItem";
import { useSongList } from "@/hooks/useSongList";
import Pagination from "../Pagenation/Pagenation";

const PageContent = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const { data: songs = [] } = useSongList({ page, limit });
  const onPlay = useOnPlay(songs);
  return (
    <>
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
      </Container>

      <Pagination
        curPage={page}
        limit={limit}
        totalPage={true ? Math.ceil(100 / limit) : 1}
        setPage={setPage}
        setLimit={setLimit}
        onLimitChange={() => {}}
      />
    </>
  );
};

export default PageContent;
