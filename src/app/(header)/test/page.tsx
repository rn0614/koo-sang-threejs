"use client";
import React, { useEffect, useMemo, useState } from "react";

export default function TestPage() {
  const [number, setNumber] = useState<any>(0);
  const [isKorea, setIsKorea] = useState(true);

  const location = useMemo(() => {
    return {
      contry: isKorea ? "한국" : "외국",
    };
  }, [isKorea]);

  useEffect(() => {
    console.log("useEffect 호출");
  }, [location]);

  return (
    <div>
      <h2>하루 몇끼?</h2>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <hr />
      <h2>어느 나라에 있어요?</h2>
      <p>나라 : {location.contry}</p>
      <button onClick={() => setIsKorea(!isKorea)}>비행기 타자</button>
    </div>
  );
}
