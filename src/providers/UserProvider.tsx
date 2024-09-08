import { MyUserContextProvider } from "@/hooks/useUser";
import { ReactNode } from "react";

type UserProviderProps = {
  children: ReactNode;
};

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default UserProvider;
