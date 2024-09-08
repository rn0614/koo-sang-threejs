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

type HeaderProps = {
  className?: string;
};

export const StackHeader: React.FC<HeaderProps> = ({ className }) => {
  const scrollDirection = useScrollDirection();
  const [sidbarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname, searchParams]);
  return (
    <header
      className={`${styles.headerWrapper} ${
        scrollDirection === "down" && styles.headerHidden
      }`}
    >
      {window?.ReactNativeWebView ? (
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
      ) : <div></div>}
      <HeaderButton />
      <Sidebar
        pathname={pathname}
        isOpen={sidbarOpen}
        scrollDirection={scrollDirection}
      />
    </header>
  );
};
