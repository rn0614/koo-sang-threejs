"use client";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useEffect } from "react";

export const Map = () => {
  const map = useGLTF("model/axe.glb");

  useEffect(() => {
    map.scene.traverse((child) => {
      if (child.type === "Mesh") {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  });

  return (
    <RigidBody colliders="trimesh" type="fixed">
      <mesh position={[0, -1, 0]}>
        <boxGeometry args={[100, 0.1, 100]} />
        <meshStandardMaterial color={"black"} />
      </mesh>
    </RigidBody>
  );
  // <primitive object={map.scene}></primitive>
};

//useGLTF.preload("models/map.glb")
