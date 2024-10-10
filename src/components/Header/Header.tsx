"use client";
import { Box } from "@radix-ui/themes";
import Link from "next/link";
import React, { useState } from "react";
import { BsJustify } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import HeaderButton from "../HeaderButton/HeaderButton";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./styles.module.scss";

const Header: React.FC = () => {
  const [sidbarOpen, setSidebarOpen] = useState(false);

  return (
    <header className={`${styles.headerWrapper}`}>
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
      <Sidebar isOpen={sidbarOpen} setSidebarOpen={setSidebarOpen} />
    </header>
  );
};

export default React.memo(Header);
