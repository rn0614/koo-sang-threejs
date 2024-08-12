"use client";
import React, { Suspense } from "react";
import { Sky, PointerLockControls, KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Player } from "../Player/Player";
import { Ground } from "../Ground/Ground";
import { Cube, Cubes } from "../Cube/Cube";

const keyArray =[
  { name: "forward", keys: ["ArrowUp", "w", "W"] },
  { name: "backward", keys: ["ArrowDown", "s", "S"] },
  { name: "left", keys: ["ArrowLeft", "a", "A"] },
  { name: "right", keys: ["ArrowRight", "d", "D"] },
  { name: "jump", keys: ["Space"] },
]

export const ThreeContent = () => {
  return (
    <KeyboardControls
      map={keyArray}
    >
      <Canvas shadows camera={{ fov: 45 }}>
        {/* <Sky sunPosition={[100, 20, 100]} /> */}
        <ambientLight intensity={0.3} />
        <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
        <Suspense>
          <Physics gravity={[0, -30, 0]}>
            <Ground />
            <Player />
            <Cube position={[0, 0.5, -10]} />
            <Cubes />
          </Physics>
        </Suspense>
        <PointerLockControls />
      </Canvas>
    </KeyboardControls>
  );
};
