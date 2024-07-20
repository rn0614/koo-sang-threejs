"use client"
import * as THREE from "three"
import { useTexture } from "@react-three/drei"
import { CuboidCollider, RigidBody } from "@react-three/rapier"

export function Ground() {
  // const texture = useTexture("/static/asset/grass.jpg")
  // texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  return (
    <RigidBody type="fixed" colliders={false}>
      <mesh receiveShadow position={[0, 0, 1]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial />
      </mesh>
      <CuboidCollider args={[1000, 2, 1000]} position={[0, -2, 0]} />
    </RigidBody>
  )
}
