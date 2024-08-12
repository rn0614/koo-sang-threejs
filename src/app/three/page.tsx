import { ThreeContent } from '@/components/three/ThreeContent/ThreeContent'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "KooSang-project-threejs",
  description: "three js Metadata",
};

export default function page() {
  return (
    <div>
      <ThreeContent/>
    </div>
  )
}
