"use client";
import useUser from "@/hooks/useUser2";
import { ReactNode } from "react";

type UserProviderProps = {
  children: ReactNode;
};

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  return <>{children}</>;
};

export default UserProvider;
