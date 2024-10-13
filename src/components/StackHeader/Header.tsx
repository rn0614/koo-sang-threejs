"use client";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import styles from "./styles.module.scss";

import { useScrollDirection } from "@/hooks/useScrollDirection";
import { Box } from "@radix-ui/themes";
import Link from "next/link";
import { BsJustify } from "react-icons/bs";
import HeaderButton from "../HeaderButton/HeaderButton";
import Sidebar from "../Sidebar/Sidebar";

const StackHeader: React.FC = () => {
  const scrollDirection = useScrollDirection();
  const [sidbarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(!!window?.ReactNativeWebView);
    }
  }, []);
  return (
    <header
      className={`${styles.headerWrapper} ${
        scrollDirection === "down" && styles.headerHidden
      }`}
    >
      {isMobile ? (
        <div></div>
      ) : (
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
      )}
      <HeaderButton />
      <Sidebar
        isOpen={sidbarOpen}
        pathname={pathname}
      />
    </header>
  );
};


export default StackHeader;