//export const fetchCache = "default-cache"; // 개발환경에서도 default cache 작업
import {cookies} from "next/headers";
import React from "react";

export default async function page() {

  // debugging mode 에서는 cacha 설정 안됨
  const detailsResponse = await fetch("http://localhost:3001/products/1")
  const details = await detailsResponse.json();

  const cookieStroe =cookies();
  cookieStroe.get("theme")

  const response = await fetch("http://localhost:3000/product",{
    cache:"no-store", // cache 끄기.
  });
  const products = await response.json();
  return (
    <div>
      {products.map((item:any) => (
        <div key={item.id}>{item.id}</div>
      ))}
    </div>
  );
}
