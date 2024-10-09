"use client";
import { RigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";
import { MeshBasicMaterial } from "three";

const BULLET_SPEED = 100;

const bulletMaterial = new MeshBasicMaterial({
  color: "hotpink",
  toneMapped: false,
});

bulletMaterial.color.multiplyScalar(42);

export const Bullet = ({ player, angle, position, onHit }: any) => {
  const rigidbody = useRef<any>(null);
  useEffect(() => {
    const velocity = {
      x: Math.sin(angle) * BULLET_SPEED,
      y: 0,
      z: Math.cos(angle) * BULLET_SPEED,
    };

    rigidbody.current.setLinvel(velocity, true);
  },[]);
  return (
    <group position={[position.x, position.y, position.z]} rotation-y={angle}>
      <RigidBody
        ref={rigidbody}
        gravityScale={0}
        sensor
        onIntersectionEnter={(e: any) => {
          if (e.other.rigidBody?.userData.type !== "bullet") {
            rigidbody.current.setEnabled(false);
            //onHit(vector3(rigidbody.current.translation()));
          }
        }}
        userData={{
          type: "bullet",
          player,
          damage: 10,
        }}
      >
        <mesh position-z={0.25} material={bulletMaterial} castShadow>
          <boxGeometry args={[0.05, 0.05, 0.5]} />
        </mesh>
      </RigidBody>
    </group>
  );
};
