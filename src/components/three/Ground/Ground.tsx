"use client"
import * as THREE from "three"
import { useTexture } from "@react-three/drei"
import { CuboidCollider, RigidBody } from "@react-three/rapier"

export function Ground() {
  // const texture = useTexture("/static/asset/grass.jpg")
  // texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  return (
    <RigidBody colliders="trimesh" type="fixed" >
      <mesh position={[-100, -100, -100]}>
        <boxGeometry args={[1000,0.1, 1000]} />
        <meshStandardMaterial />
      </mesh>
      <CuboidCollider args={[1000, 2, 1000]} position={[0, -2, 0]} />
    </RigidBody>
  )
}
