"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";

interface DeviceContextType {
  isMobile: boolean;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export const useDevice = (): DeviceContextType => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error("useDevice must be used within a DeviceProvider");
  }
  return context;
};

export const DeviceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = typeof window !== "undefined" ? navigator.userAgent : "";
    const isMobileDevice = /Mobi|Android/i.test(userAgent);
    setIsMobile(isMobileDevice);
  }, []);

  return (
    <DeviceContext.Provider value={{ isMobile }}>
      {children}
    </DeviceContext.Provider>
  );
};
