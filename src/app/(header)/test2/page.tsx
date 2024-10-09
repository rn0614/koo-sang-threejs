"use client";
import LoginTest from "@/components/LoginTest/LoginTest";
import UserList from "@/components/UserList/UserList";
import React, { useEffect, useState } from "react";

export default function Test2Page() {
  const [data, setData] = useState<any>({id:"1"});

  useEffect(() => {
    fetch("/api/apitest")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  return (
    <div>
      <div>
        <div>msw test</div>
        <div>{data?`데이터 있음 ${data.id}`:"데이터 없음"}</div>
        <p>{data?.id}</p>
        <p>{data?.firstname}</p>
        <p>{data?.lastName}</p>
      </div>
      <UserList users={["Tom", "Jane", "Mike"]} />
      <LoginTest />
    </div>
  );
}
