"use client";
import { Environment, OrbitControls } from "@react-three/drei";
import { useEffect, useState } from "react";
import { Bullet } from "../Bullet/Bullet";
import { CharacterController } from "../CharacterController/CharacterController";
import { Map } from "../Map/Map";
import { insertCoin, Joystick, myPlayer, onPlayerJoin } from "playroomkit";

export const Experience = () => {
  const [players, setPlayers] = useState<any[]>([]);
  const [bullets, setBullets] = useState<any[]>([]);
  const [hits, setHits] = useState<any[]>([]);

  const start = async () => {
    await insertCoin();
  };

  const onFire = (bullet: any) => {
    setBullets((bullets) => [...bullets, bullet]);
  };

  const onHit = (bulletId: any, position: any) => {
    setBullets((bullets) => bullets.filter((b) => b.id !== bulletId));
    setHits((hits) => [...hits, { id: bulletId, position }]);
  };

  useEffect(() => {
    //시작 이후에 실행될 코드들
    start();
    onPlayerJoin((state) => {
      const joystick = new Joystick(state, {
        type: "angular",
        buttons: [{ id: "fire", label: "Fire" }],
      });
      const newPlayer = { state, joystick };
      state.setState("health", 100);
      state.setState("deaths", 0);
      state.setState("kills", 0);
      setPlayers((players) => [...players, newPlayer]);
      state.onQuit(() => {
        setPlayers((players) => players.filter((p) => p.state.id! == state.id));
      });
    });
  }, []);

  return (
    <>
      <directionalLight position={[25, 18, -25]} intensity={0.3} castShadow />
      <OrbitControls />
      <Map />
      {players.map(({ state, joystick }, idx) => (
        <CharacterController
          key={state.id}
          position-x={idx *2}
          state={state}
          joystick={joystick}
          userPlayer={state.id === myPlayer()?.id}
        />
      ))}
      {bullets.map((bullet) => (
        <Bullet key={bullet.id} {...bullet} onHit={bullet.id} />
      ))}
      <Environment preset="sunset" />
    </>
  );
};
