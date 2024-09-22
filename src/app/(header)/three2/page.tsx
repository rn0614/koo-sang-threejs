"use client";
import { Experience } from "@/components/three2/Experience/Experience";
import { KeyboardControls, Sky, SoftShadows } from "@react-three/drei";
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
    <div style={{ width: "100%", height: "100%", minHeight: "100vh" }}>
      <KeyboardControls map={keyArray}>
          shadows
        <Canvas
          camera={{ position: [0, 30, 0], fov: 30 }}
          style={{ height: "100vh" }}
        >
          <Sky />
          <SoftShadows size={42} />
          <Physics debug>
            <Experience />
          </Physics>
        </Canvas>
      </KeyboardControls>
    </div>
  );
}
