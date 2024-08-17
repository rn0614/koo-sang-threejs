import { wait } from "@/util/lib";
import Link from "next/link";
import React from "react";

export default async function ArchivePage() {
  await wait(3000);
  return (
    <div>
      <h3>additional archieve</h3>
      <div>새롭게 렌더링되는 페이지 입니다.</div>
      <Link href={"/apitest"}>default</Link>
    </div>
  );
}
