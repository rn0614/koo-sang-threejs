"use client";
import React from "react";
import Image from "next/image";
import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types/types";

type ImageProps = {
  alt: string;
  song: Song;
};

export default function ClientImage({ alt, song }: ImageProps) {
  const { data: imageUrl, error } = useLoadImage(song);
  if (!imageUrl) {
    return <div></div>;
  }
  return <Image alt={alt} src={imageUrl || ""} fill sizes={"300"} />;
}
