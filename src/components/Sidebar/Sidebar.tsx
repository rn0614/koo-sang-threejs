"use client";
import SidebarItem from "@/components/SidebarItem/SidebarItem";
import { Flex } from "@radix-ui/themes";
import React, { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import styles from "./styles.module.scss";
import { BsChatSquare } from "react-icons/bs";
import { Md3dRotation } from "react-icons/md";
import { GrTest } from "react-icons/gr";
import { stackRouterPush } from "@/utils/stackRouter";
import { usePathname, useRouter } from "next/navigation";
import { FaMusic } from "react-icons/fa";

type SidebarProps = {
  isOpen: boolean;
  setSidebarOpen: any;
};

const menuRoutes = (pathname: string) => [
  {
    icon: FaMusic,
    label: "Music",
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
    active: pathname == "/test2",
    href: "/test2",
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
];

const Sidebar = ({ isOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const routes = menuRoutes(pathname)||[];
  const webviewClickhandler = (href: any) => {
    setSidebarOpen(false);
    stackRouterPush(router, href);
  };

  return (
    <aside
      className={`${styles.sidebarWrapper} ${
        isOpen ? styles.sidebarOpen : null
      }`}
    >
      <Flex className={styles.route}>
        {routes.map((item, idx) => (
          <SidebarItem
            key={item.label}
            webviewClickhandler={webviewClickhandler}
            {...item}
          />
        ))}
      </Flex>
    </aside>
  );
};

export default React.memo(Sidebar);
