import React, { useCallback, useRef, useState } from "react";
import { useTexture } from "@react-three/drei";
import { RigidBody, RigidBodyProps } from "@react-three/rapier";
import * as THREE from "three";
import { ThreeEvent } from "@react-three/fiber";
import { atom, useRecoilState } from "recoil";

// 타입 정의
interface CubeStore {
  cubes: CubePosition[];
  addCube: (x: number, y: number, z: number) => void;
}


// 타입 정의
type CubePosition = [number, number, number];

// Recoil atom for cube positions
const cubesState = atom<CubePosition[]>({
  key: "cubesState",
  default: [],
});

export const Cubes: React.FC = () => {
  const [cubes] = useRecoilState(cubesState);
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
  const [cubes, setCubes] = useRecoilState(cubesState);
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
