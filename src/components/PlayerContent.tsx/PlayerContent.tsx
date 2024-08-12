"use client";
import { Song } from "@/types/types";
import React, { useEffect, useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerXMark, HiSpeakerWave } from "react-icons/hi2";
import { MediaItem } from "../MediaItem/MediaItem";
import styles from "./styles.module.scss";
import usePlayer from "@/hooks/usePlayer";
import Slider from "../Slider/Slider";
import useSound from "use-sound";

type PlayerContentProps = {
  song: Song;
  songUrl: string;
};

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previosSong = player.ids[currentIndex - 1];

    if (!previosSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previosSong);
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const toggleMuete = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  return (
    <div className={styles.playerContentWrapper}>
      <div>
        <MediaItem data={song} />
        <div />
      </div>
      <div>
        <AiFillStepBackward onClick={onPlayPrevious} size={30} />
        <div onClick={handlePlay}>
          <Icon size={30} />
        </div>
        <AiFillStepForward onClick={onPlayNext} size={30} />
      </div>
      <VolumeIcon onClick={toggleMuete} size={34} />
      <Slider 
        value={volume}
        onChange={(value)=>setVolume(value)}
      />
    </div>
  );
};

export default PlayerContent;
