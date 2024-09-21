import React, { useCallback, useRef, useState } from "react";
import { useTexture } from "@react-three/drei";
import { RigidBody, RigidBodyProps } from "@react-three/rapier";
import { create } from "zustand";
import * as THREE from "three";
import { ThreeEvent } from "@react-three/fiber";

// 타입 정의
type CubePosition = [number, number, number];

interface CubeStore {
  cubes: CubePosition[];
  addCube: (x: number, y: number, z: number) => void;
}

const useCubeStore = create<CubeStore>((set) => ({
  cubes: [],
  addCube: (x, y, z) =>
    set((state) => ({ cubes: [...state.cubes, [x, y, z]] })),
}));

export const Cubes: React.FC = () => {
  const cubes = useCubeStore((state) => state.cubes);
  return (
    <>
      {cubes.map((coords, index) => (
        <Cube key={index} position={coords} />
      ))}
    </>
  );
};

interface CubeProps extends RigidBodyProps {
  position: CubePosition;
}

export const Cube: React.FC<CubeProps> = (props) => {
  const ref = useRef<any>(null);
  const [hover, setHover] = useState<number | null>(null);
  const addCube = useCubeStore((state) => state.addCube);
  const texture = useTexture("/static/asset/dirt.jpg");

  const onMove = useCallback((e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (e.faceIndex !== undefined) {
      setHover(Math.floor(e.faceIndex / 2));
    }
  }, []);

  const onOut = useCallback(() => setHover(null), []);

  // const onClick = useCallback((e: ThreeEvent<MouseEvent>) => {
  //   e.stopPropagation();
  //   if (ref.current) {
  //     const { x, y, z } = ref.current.position;
  //     const dir: CubePosition[] = [
  //       [x + 1, y, z],
  //       [x - 1, y, z],
  //       [x, y + 1, z],
  //       [x, y - 1, z],
  //       [x, y, z + 1],
  //       [x, y, z - 1],
  //     ];
  //     if (e.faceIndex !== undefined) {
  //       addCube(...dir[Math.floor(e.faceIndex / 2)]);
  //     }
  //   }
  // }, [addCube]);

  return (
    <RigidBody {...props} type="fixed" colliders="cuboid" ref={ref}>
      <mesh
        receiveShadow
        castShadow
        onPointerMove={onMove}
        onPointerOut={onOut}
        //onClick={onClick}
      >
        {[...Array(6)].map((_, index) => (
          <meshStandardMaterial
            attach={`material-${index}`}
            key={index}
            map={texture}
            color={hover === index ? "hotpink" : "white"}
          />
        ))}
        <boxGeometry />
      </mesh>
    </RigidBody>
  );
};
