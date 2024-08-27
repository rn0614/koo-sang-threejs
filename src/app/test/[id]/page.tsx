'use client'
import { stackRouterBack } from "@/util/stackRouter";
import { useRouter } from "next/navigation";
import React from "react";

export default function TextDetailPage({ params }:any) {
  const router = useRouter();
  return (
    <div>
      <button onClick={()=>stackRouterBack(router)}>back</button>
      <div>{params.id}</div>
    </div>
  );
}
