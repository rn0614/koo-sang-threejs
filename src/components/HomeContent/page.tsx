'use client'
import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Link from "next/link";

export default function HomeContent() {
  async function testApi() {
    try {
      const res = await fetch(`/api/apitest`, {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      const data= await res.json();
      console.log(data);
    } catch (err) {
      console.log("Error loading: ", err);
    }
  }
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Link href={"/music"}>music</Link>
      <Link href={"/login"}>login</Link>
      <Link href={"/register"}>register</Link>
      <Link href={"/apitest"}>apitest</Link>
      <Link href={"/music/liked"}>liked</Link>
      <Link href={"/photo-feed"}>photo-feed</Link>
      <Link href={"/music/search"}>search</Link>
      <Link href={"/test"}>test</Link>
      <Link href={"/three"}>three</Link>
      <Link href={"/three2"}>htree2</Link>
      <Link href={"/user/rn0614@naver.com"}>user</Link>
      <button onClick={testApi}>dataFetching</button>
    </div>
  );
}
