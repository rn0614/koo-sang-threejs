"use client";
import SidebarItem from "@/components/SidebarItem/SidebarItem";
import { stackRouterPush } from "@/utils/stackRouter";
import { Flex } from "@radix-ui/themes";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { BsChatSquare } from "react-icons/bs";
import { FaMusic } from "react-icons/fa";
import { GrTest } from "react-icons/gr";
import { Md3dRotation } from "react-icons/md";
import styles from "./styles.module.scss";
import { useDrawer } from "@/providers/DrawerProvider";

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
    label: "AI",
    active: pathname == "/ai",
    href: "/ai",
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
  {
    icon: Md3dRotation,
    label: "ChangeText",
    active: pathname == "/change-text",
    href: "/change-text",
  },
];

const Sidebar = () => {
  const { closeDrawer } = useDrawer();
  const pathname = usePathname();
  const router = useRouter();
  const routes = menuRoutes(pathname) || [];
  const webviewClickhandler = (href: any) => {
    stackRouterPush(router, href);
    closeDrawer();
  };

  return (
    <aside
      className={`${styles.sidebarWrapper} ${styles.sidebarOpen}`}
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
