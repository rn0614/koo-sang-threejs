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

  return (
    <>
      {isMobileRef.current && isDetailScreen ? (
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
          <Sidebar isOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </>
      )}
    </>
  );
}
