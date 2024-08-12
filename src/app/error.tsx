"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(()=>{
    console.log(`${error}`)
  },[error])
  return (
    <div>
      <div>오류 default</div>
      <div>error Message :{error.message}</div>
      <div>
        <button onClick={reset}>Try Again</button>
      </div>
    </div>
  );
}
