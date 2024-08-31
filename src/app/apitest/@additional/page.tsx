import { wait } from "@/utils/lib";
import Link from "next/link";
import React from "react";

export default async function AdditionalPage() {
  return (
    <div>
      <h3>additional</h3>
      <Link href={"/apitest/archieve"}>Archive</Link>
    </div>
  );
}
