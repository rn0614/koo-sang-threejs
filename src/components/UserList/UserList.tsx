import React, { useEffect, useState } from "react";

export default function UserList({ users }:any) {
  const [showTitle, setShowTitle] = useState(false);
  useEffect(()=>{
    setTimeout(()=>{setShowTitle(true)},500)
  }, [])
  return (
    <>
      {showTitle && <h1>사용자 목록</h1>}
      <ul>
        {users.map((user:any) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </>
  );
}
