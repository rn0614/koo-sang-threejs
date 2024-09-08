"use client";
import SidebarItem from "@/components/SidebarItem/SidebarItem";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { Flex } from "@radix-ui/themes";
import { Library } from "../Library/Library";
import styles from "./styles.module.scss";
import { Song } from "@/types/types";
type SidebarProps = {
  pathname:string;
  scrollDirection:string;
  isOpen: boolean;
};

export default function Sidebar({ pathname, scrollDirection,isOpen }: SidebarProps) {
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
        label: "Test",
        active: pathname == "/test",
        href: "/test",
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
        isOpen&&scrollDirection!="down" ? styles.sidebarOpen : null
      }`}
    >
      <Flex className={styles.route}>
        {routes.map((item, idx) => (
          <SidebarItem key={item.label} {...item}/>
        ))}
      </Flex>
    </aside>
  );
}
