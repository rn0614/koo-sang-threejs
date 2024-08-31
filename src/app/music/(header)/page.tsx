'use client';

import { useEffect, useState } from 'react';
import { Song } from '@/types/types';
import { AddFloatButton } from '@/components/AddFloatButton/AddFloatButton';
import PageContent from '@/components/PageContent/PageContent';
import { wait } from '@/utils/lib';

export default function Home() {
  console.log('MusicPate Start')
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        console.log('fetching data')
        const response = await fetch('/api/songs');
        if (!response.ok) {
          throw new Error('Failed to fetch songs');
        }
        const data: Song[] = await response.json();
        console.log(data);
        setSongs(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSongs();
  }, []);

  return (
    <>
      <PageContent songs={songs} />
      <AddFloatButton />
    </>
  );
}
