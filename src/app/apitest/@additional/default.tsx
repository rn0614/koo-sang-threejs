import Link from "next/link";
import React from "react";

export default async function DefaultAdditionalPage() {
  return (
    <div>
      <h3>DefaultadditionalPage</h3>
      <Link href={"/apitest/archieve"} replace>Archive</Link>
    </div>
  );
}
