"use client"
import * as THREE from "three"
import { useTexture } from "@react-three/drei"
import { CuboidCollider, RigidBody } from "@react-three/rapier"

export function Ground() {
  // const texture = useTexture("/static/asset/grass.jpg")
  // texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  return (
    <RigidBody colliders="cuboid" type="fixed" >
      <mesh position={[-100, -100, -100]}>
        <planeGeometry attach={'geometry'} args={[100,100]} />
        <meshStandardMaterial attach={'material'}/>
      </mesh>
      <CuboidCollider args={[50,1,50]} position={[0, -2, 0]} />
    </RigidBody>
  )
}
