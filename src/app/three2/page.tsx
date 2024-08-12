"use client";
import { Experience } from "@/components/three2/Experience/Experience";
import { KeyboardControls, SoftShadows } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import React, { Suspense } from "react";

const keyArray = [
  { name: "forward", keys: ["ArrowUp", "w", "W"] },
  { name: "backward", keys: ["ArrowDown", "s", "S"] },
  { name: "left", keys: ["ArrowLeft", "a", "A"] },
  { name: "right", keys: ["ArrowRight", "d", "D"] },
  { name: "jump", keys: ["Space"] },
];

export default function ThreejsPage2() {
  return (
    <KeyboardControls map={keyArray}>
      <Canvas shadows camera={{ position: [0, 30, 0], fov: 30 }}>
        <color attach="background" args={["#ececec"]} />
        <SoftShadows size={42} />
        <Suspense>
          <Physics debug>
            <Experience />
          </Physics>
        </Suspense>
      </Canvas>
    </KeyboardControls>
  );
}
