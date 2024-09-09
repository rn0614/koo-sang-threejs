"use client";
import SidebarItem from "@/components/SidebarItem/SidebarItem";
import { Flex } from "@radix-ui/themes";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import styles from "./styles.module.scss";
import { BsChatSquare } from "react-icons/bs";
import { Md3dRotation } from "react-icons/md";
import { GrTest } from "react-icons/gr";

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
        icon: GrTest,
        label: "Test",
        active: pathname == "/test",
        href: "/test",
      },
      {
        icon: BsChatSquare,
        label: "Chat",
        active: pathname == "/chat",
        href: "/chat",
      },
      {
        icon: Md3dRotation,
        label: "Three",
        active: pathname == "/three",
        href: "/three",
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
