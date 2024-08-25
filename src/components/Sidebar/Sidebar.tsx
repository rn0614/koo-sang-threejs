"use client";
import Box from "@/components/Box/Box";
import SidebarItem from "@/components/SidebarItem/SidebarItem";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { Library } from "../Library/Library";
import styles from "./styles.module.scss";
import { Song } from "@/types/types";
type SidebarProps = {
  isOpen: boolean;
};

export default function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname == "/music/",
        href: "/music",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathname == "/music/search",
        href: "/music/search",
      },
      {
        icon: BiSearch,
        label: "Three",
        active: pathname == "/three",
        href: "/three",
      },
      {
        icon: BiSearch,
        label: "photoFeed",
        active: pathname == "/photo-feed",
        href: "/photo-feed",
      },
      {
        icon: BiSearch,
        label: "apiTest",
        active: pathname == "/apitest",
        href: "/apitest",
      },
    ],
    [pathname]
  );

  return (
    <aside
      className={`${styles.sidebarWrapper} ${
        isOpen ? styles.sidebarOpen : null
      }`}
    >
      <Box className={styles.Route}>
        {routes.map((item, idx) => (
          <SidebarItem key={item.label} {...item}/>
        ))}
      </Box>
    </aside>
  );
}
