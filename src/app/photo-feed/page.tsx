"use client"
import Link from "next/link";
import React from "react";

const mockingData = [
  { id: 1, data: 11 },
  { id: 2, data: 21 },
  { id: 3, data: 31 },
];

export default function page() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>page</div>
      {mockingData.map((item) => (
        <Link key={item.id} href={`/photo-feed/${item.id}`}>
          {item.data}
        </Link>
      ))}
    </div>
  );
}
