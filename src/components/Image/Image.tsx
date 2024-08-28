"use client"
import React from 'react'
import Image from 'next/image'
import useLoadImage from '@/hooks/useLoadImage';
import { Song } from '@/types/types';

type ImageProps ={
  alt:string;
  song:Song;
}

export default function ClientImage({alt, song}:ImageProps) {
  const imageUrl = useLoadImage(song) as string;
  return (
    <Image alt={alt} src={imageUrl} width="300" height={"300"}/>
  )
}
