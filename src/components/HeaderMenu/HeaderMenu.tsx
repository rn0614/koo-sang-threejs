"use client";
import { Box } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BsJustify } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./styles.module.scss";
import { useDrawer } from "@/providers/DrawerProvider";

export default function HeaderMenu() {
  const { openDrawer } = useDrawer();
  const [isDetailScreen, setIsDetailScreen] = useState(true); // 초기 false 설정
  const pathname = usePathname();
  const handleOpenDrawer = () => {
    console.log('open')
    openDrawer(<Sidebar/>); //Later we will create a separate template.
  }

  useEffect(() => {
    if (typeof window !== "undefined" && !!window.ReactNativeWebView) {
      setIsDetailScreen((pathname.match(/\//g) || []).length > 1);
    } else {
      setIsDetailScreen(false);
    }
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
                onClick={handleOpenDrawer}
              />
            </Box>
            <Link href={"/music"}>
              <FaHome size={32} color="black" />
            </Link>
          </Box>
        </>
      )}
    </>
  );
}
