"use client";
import { usePathname, useSearchParams } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import styles from "./styles.module.scss";

import { useScrollDirection } from "@/hooks/useScrollDirection";
import { Box } from "@radix-ui/themes";
import Link from "next/link";
import { BsJustify } from "react-icons/bs";
import Sidebar from "../Sidebar/Sidebar";
import HeaderButton from "../HeaderButton/HeaderButton";


export const Header: React.FC = () => {
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
      <Box className={styles.buttonWrapper}>
        <Box className={styles.sidebarButton}>
          <BsJustify
            size={32}
            color="black"
            onClick={() => setSidebarOpen((pre) => !pre)}
          />
        </Box>
        <Link href={"/"}>
          <FaHome size={32} color="black" />
        </Link>
      </Box>
      <HeaderButton />
      <Sidebar
        pathname={pathname}
        isOpen={sidbarOpen}
        setSidebarOpen={setSidebarOpen}
        scrollDirection={scrollDirection}
      />
    </header>
  );
};
