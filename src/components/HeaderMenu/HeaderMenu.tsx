"use client";
import { Box } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { BsJustify } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./styles.module.scss";

export default function HeaderMenu() {
  const [sidebarOpen, setSidebarOpen]= useState(false);
  const pathname = usePathname();
  const isDetailScreen = (pathname.match(/\//g) || []).length > 1;
  const isMobileRef = useRef(typeof window !== "undefined" && !!window.ReactNativeWebView);

  // 클라이언트 렌더링 시점에서만 실행되도록 수정
  if (typeof window === "undefined") {
    return <div></div>;
  }

  return (
    <>
      {isMobileRef.current && isDetailScreen ? (
        <div></div> // 모바일이면서 상세화면일 때
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
          <Sidebar isOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </>
      )}
    </>
  );
}
