import React, { useRef, useState } from "react";
import { Character } from "./Character";
import { CapsuleCollider, RigidBody, vec3 } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { CameraControls, useKeyboardControls } from "@react-three/drei";

const MOVEMENT_SPEED = 50;
const FIRE_RATE = 380;

export const WEAPON_OFFSET = {
  x: -0.2,
  y: 1.4,
  z: 0.8,
};

export const CharacterController = ({
  state,
  joystick,
  userPlayer,
  onFire,
  ...props
}:any) => {
  const group = useRef(null);
  const character = useRef(null);
  const rigidbody = useRef<any>(null);
  const controls = useRef<CameraControls>(null);
  const lastShot = useRef(0);
  const [animation, setAnimation] = useState("Idle");
  const [, get] = useKeyboardControls();
  useFrame((_, delta) => {
    const angle = joystick.angle();
    if(joystick.isJoystickPressed() && angle){
      setAnimation("Run");
      character.current.rotation.y = angle;

      const impulse ={
        x:Math.sin(angle) * MOVEMENT_SPEED * delta,
        y:0,
        z:Math.cos(angle) * MOVEMENT_SPEED * delta,
      }

      rigidbody.current.applyImpulse(impulse, true);
    }else{
      setAnimation("Idle");
    }

    // if (controls.current) {
    //   const cameraDistanceY = window.innerWidth < 1024 ? 16 : 20;
    //   const cameraDistanceZ = window.innerWidth < 1024 ? 16 : 20;
    //   const playerWorldPos = vec3(rigidbody.current?.translation());
    //   controls.current.setLookAt(
    //     playerWorldPos.x,
    //     playerWorldPos.y + cameraDistanceY,
    //     playerWorldPos.z + cameraDistanceZ,
    //     playerWorldPos.x,
    //     playerWorldPos.y + 1.5,
    //     playerWorldPos.z
    //   );
    // }

    // const { forward, backward, left, right, jump } = get();
    // const angle = 10;
    // if (
    //   (forward || backward || left || right || jump) &&
    //   angle &&
    //   character.current
    // ) {
    //   // 키확인
    //   setAnimation("Run");
    //   console.log("key press");
    //   //character.current.rotation.y = angle;

    //   const impulse = {
    //     x: (+right - +left) * MOVEMENT_SPEED * delta,
    //     y: 0,
    //     z: (+backward - +forward) * MOVEMENT_SPEED * delta,
    //   };
    //   console.log(impulse, true);
    //   rigidbody.current?.applyImpulse(impulse, true);

    //   if (jump) {
    //     setAnimation("Shoot");
    //     if (Date.now() - lastShot.current > FIRE_RATE) {
    //       lastShot.current = Date.now();
    //       const newBullet = {
    //         id: state.id + "-" + +new Date(),
    //         position: vec3(rigidbody.current.translation()),
    //         angle,
    //         player: state.id,
    //       };
    //       onFire(newBullet);
    //     }
    //   }
    // } else {
    //   setAnimation("Idle");
    // }

    //state.setState("pos",rigidbody.current.translation())
  });

  return (
    <group ref={group} {...props}>
      <CameraControls ref={controls} />
      <RigidBody
        ref={rigidbody}
        mass={1}
        colliders={false}
        linearDamping={12}
        lockRotations
        type={"dynamic"}
      >
        <group ref={character}>
          <Crosshair/>
          <Character />
        </group>
        <CapsuleCollider args={[0.5, 0.7]} position={[0, 1, 0]} />
      </RigidBody>
    </group>
  );
};

const Crosshair = (props:any) => {
  return (
    <group {...props}>
      <mesh position-z={1}>
        <boxGeometry args={[0.05, 0.05, 0.05]} />
        <meshBasicMaterial color="black" transparent opacity={0.9} />
      </mesh>
      <mesh position-z={2}>
        <boxGeometry args={[0.05, 0.05, 0.05]} />
        <meshBasicMaterial color="black" transparent opacity={0.85} />
      </mesh>
      <mesh position-z={3}>
        <boxGeometry args={[0.05, 0.05, 0.05]} />
        <meshBasicMaterial color="black" transparent opacity={0.8} />
      </mesh>
      <mesh position-z={4.5}>
        <boxGeometry args={[0.05, 0.05, 0.05]} />
        <meshBasicMaterial color="black" transparent opacity={0.7} />
      </mesh>
      <mesh position-z={6.5}>
        <boxGeometry args={[0.05, 0.05, 0.05]} />
        <meshBasicMaterial color="black" transparent opacity={0.6} />
      </mesh>
      <mesh position-z={9}>
        <boxGeometry args={[0.05, 0.05, 0.05]} />
        <meshBasicMaterial color="black" transparent opacity={0.2} />
      </mesh>
    </group>
  );
};
