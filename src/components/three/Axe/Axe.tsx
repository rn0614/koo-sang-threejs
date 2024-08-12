"use client"

import { useGLTF } from "@react-three/drei"
import { Mesh } from "three"
import * as THREE from 'three'
export default function Axe(props:any) {
  const { nodes, materials } = useGLTF("/model/axe.glb") as unknown as {
    nodes: {
      Mesh_1001_1: Mesh,
      Mesh_1001_2: Mesh
    },
    materials: {
      material_2: THREE.Material,
      material_3: THREE.Material
    }
  }

  return (
    <group dispose={null} {...props}>
      <group rotation={[0, Math.PI / 1.8, -0.3]} scale={0.5}>
        <mesh geometry={nodes.Mesh_1001_1.geometry} material={materials.material_2} />
        <mesh geometry={nodes.Mesh_1001_2.geometry} material={materials.material_3} />
      </group>
    </group>
  )
}

useGLTF.preload("/model/axe.glb")
