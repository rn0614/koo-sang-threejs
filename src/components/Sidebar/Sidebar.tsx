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
import { stackRouterPush } from "@/utils/stackRouter";
import { useRouter } from "next/navigation";
import { FaMusic } from "react-icons/fa";

type SidebarProps = {
  pathname: string;
  scrollDirection: string;
  isOpen: boolean;
  setSidebarOpen: any;
};

export default function Sidebar({
  pathname,
  scrollDirection,
  isOpen,
  setSidebarOpen,
}: SidebarProps) {
  const router = useRouter();
  const routes = useMemo(
    () => [
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
        icon: BsChatSquare,
        label: "Test",
        active: pathname == "/test",
        href: "/test",
      },
      {
        icon: GrTest,
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
  const webviewClickhandler = (href: any) => {
    setSidebarOpen(false);
    stackRouterPush(router, href);
  };

  return (
    <aside
      className={`${styles.sidebarWrapper} ${
        isOpen && scrollDirection != "down" ? styles.sidebarOpen : null
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
}
