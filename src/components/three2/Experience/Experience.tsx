"use client";
import { Environment, OrbitControls } from "@react-three/drei";
import React, { useEffect, useState } from "react";
import { Map } from "../Map/Map";
import { CharacterController } from "../CharacterController/CharacterController";
import { Bullet } from "../Bullet/Bullet";

export const Experience = () => {
  const [player, setPlayer] = useState([]);
  const [bullets, setBullets] = useState<any[]>([]);


  const [hits, setHits] = useState<any[]>([]);

  const onFire = (bullet:any) =>{
    setBullets((bullets)=> [...bullets, bullet]);
  }

  const onHit = (bulletId:any, position:any)=>{
    setBullets((bullets)=>bullets.filter((b)=>b.id !== bulletId));
    setHits((hits) => [...hits, {id:bulletId, position}])
  }


  useEffect(()=>{
    //시작 이후에 실행될 코드들
    // onPlayerJoin((state)=>{
    //   const joystick = new Joystick(state, {
    //     type:"angular",
    //     buttons:[{id:"fire", label:"Fire"}]
    //   })
    //   const newPlayer = {state, joystick};
    //   state.setState("health",100);
    //   state.setState("deaths",0);
    //   state.setState("kills",0);
    //   setPlayers((players)=>[...players, newPlayer]);
    //   state.onQuit(()=>{
    //     setPlayers((player)=> players.filter((p)=>p.state.id! == state.id))
    //   });
    // });
  },[])


  return (
    <>
      <directionalLight position={[25, 18, -25]} intensity={0.3} castShadow />
      <OrbitControls />
      <Map />
      <CharacterController
        state={{id:1}}
        joystic={null}
        userPlayer={null}
        onFire = {onFire}
        onHit = {onHit}
      />
      {bullets.map((bullet)=>(
        <Bullet key={bullet.id} {...bullet} onHit={(bullet.id)}/>
      ))}
      <Environment preset="sunset" />
    </>
  );
};
