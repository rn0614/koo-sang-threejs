"use client"
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const clickHandler = () => {
    router.replace("/");
  };

  return (
    <div>
      <Link href={"/login"}>Link replace</Link>
      <div onClick={clickHandler}>{"Home -> Items 로그인 실행시"}</div>
      <div>{"Home -> Login -> Item 으로 변경"}</div>
    </div>
  );
}
