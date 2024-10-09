"use client";
import React, { useState } from "react";

export default function LoginTest() {
  const [isLogin, setIsLogin] = useState(false);

  const loginButtonHandler = () => {
    setIsLogin((pre) => !pre);
  };
  return (
    <button onClick={loginButtonHandler}>{isLogin ? "Logout" : "Login"}</button>
  );
}
