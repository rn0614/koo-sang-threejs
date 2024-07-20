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
  children: React.ReactNode;
  songs : Song[];
};

export default function Sidebar({ children, songs }: SidebarProps) {
  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname == "/",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathname == "/search",
        href: "/search",
      },
      {
        icon: BiSearch,
        label: "Three",
        active: pathname == "/three",
        href: "/three",
      },
    ],
    [pathname]
  );

  return (
    <div className={styles.MainLayout}>
      <aside className={styles.SidebarWrapper}>
        <Box className={styles.Route}>
          {routes.map((item, idx) => (
            <SidebarItem key={item.label} {...item} />
          ))}
        </Box>
        <Library songs={songs}/>
      </aside>
      {children}
    </div>
  );
}
