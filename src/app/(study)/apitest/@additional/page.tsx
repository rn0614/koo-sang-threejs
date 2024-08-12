import Link from "next/link";
import React from "react";

export default function AdditionalPage() {
  return (
    <div>
      <h3>additionalPage</h3>
      <Link href={"/apitest/archieve"} replace>Archive</Link>
    </div>
  );
}
