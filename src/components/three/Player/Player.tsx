"use client";
import * as THREE from "three";
import * as RAPIER from "@dimforge/rapier3d-compat";
import {
  ForwardRefExoticComponent,
  MemoExoticComponent,
  RefAttributes,
  useEffect,
  useRef,
} from "react";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import {
  CapsuleCollider,
  RigidBody,
  RigidBodyProps,
  useRapier,
} from "@react-three/rapier";
import Axe from "@/components/three/Axe/Axe";

const SPEED = 5;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
const rotation = new THREE.Vector3();

export function Player({ lerp = THREE.MathUtils.lerp }) {
  const axe = useRef<any>();
  const playerRef = useRef<any>(null);
  const rapier = useRapier();
  const [, get] = useKeyboardControls();

  useFrame((state, delta) => {
    const { forward, backward, left, right, jump } = get(); // 상위값에서 입력되는 키값 가져옴
    const curPosition = playerRef.current?.translation(); // 대상의 현재 위치
    const velocity = playerRef.current?.linvel(); // 대상의 속도
    // update camera
    state.camera.position.set(curPosition.x, curPosition.y, curPosition.z);
    // update axe
    // axe.current.children[0].rotation.x = lerp(axe.current.children[0].rotation.x, Math.sin((velocity.length() > 1) * state.clock.elapsedTime * 10) / 6, 0.1)
    // axe.current.rotation.copy(state.camera.rotation)
    // axe.current.position.copy(state.camera.position).add(state.camera.getWorldDirection(rotation).multiplyScalar(1))
    // movement
    frontVector.set(0, 0, +(+backward - +forward));
    sideVector.set(+left - +right, 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(state.camera.rotation);
    playerRef.current?.setLinvel({
      x: direction.x,
      y: velocity.y,
      z: direction.z,
    });
    //playerRef.current.applyImpulse({ x: direction.x, y: velocity.y, z: direction.z }, true)
    // jumping

    const world = rapier.world;
    const ray = new RAPIER.Ray(curPosition, { x: 0, y: 6.5, z: 0 });
    const hit = world.castRay(ray, 1.75, true);
    //const grounded = hit && hit.toi <= 1.75;
    if (jump) {
      playerRef.current.setLinvel({ x: 0, y: 7, z: 0 });
      console.log({ x1: curPosition.x, y1: curPosition.y, z1: curPosition.z });
      //console.log({ x: direction.x, y: velocity.y, z: direction.z });
    }
    // if (grounded) {
    //   console.log("grounded");
    // } //
  });
  return (
    <>
      <RigidBody
        ref={playerRef}
        colliders={"cuboid"}
        mass={1}
        type="dynamic"
        position={[0, 2, 0]}
        lockRotations
      >
        <CapsuleCollider args={[0.5, 1]} />
      </RigidBody>
    </>
  );
}
