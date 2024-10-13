"use client";
import { Box } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BsJustify } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./styles.module.scss";

export default function HeaderMenu() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDetailScreen, setIsDetailScreen] = useState(true); // 초기 false 설정
  const pathname = usePathname();

  const closSidebar = useCallback(() => {
    setSidebarOpen((pre) => !pre);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && !!window.ReactNativeWebView) {
      setIsDetailScreen((pathname.match(/\//g) || []).length > 1);
    } else {
      setIsDetailScreen(false);
    }
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <>
      {isDetailScreen ? (
        <div></div>
      ) : (
        <>
          <Box className={styles.buttonWrapper}>
            <Box className={styles.sidebarButton}>
              <BsJustify
                size={32}
                color="black"
                onClick={() => setSidebarOpen((pre) => !pre)}
              />
            </Box>
            <Link href={"/music"}>
              <FaHome size={32} color="black" />
            </Link>
          </Box>
          <Sidebar
            isOpen={sidebarOpen}
            closSidebar={closSidebar}
            pathname={pathname}
          />
        </>
      )}
    </>
  );
}
