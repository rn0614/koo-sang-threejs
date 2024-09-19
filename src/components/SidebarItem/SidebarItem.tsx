"use client"
import { stackRouterPush } from "@/utils/stackRouter";
import { Button, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";
import { IconType } from "react-icons";
import styles from "./styles.module.scss";

type SidebarItemProps = {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
};

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  active,
  href,
}) => {
  const router = useRouter();

  const moreInfomationbuttonHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    stackRouterPush(router, href);
  };

  return (
    <div
      className={`${styles.sidebarLink} ${active && styles.active}`}
      onClick={moreInfomationbuttonHandler}
    >
      <Icon size={26} />
      <Text as="p" className={styles.paragraph}>{label}</Text>
    </div>
  );
};

export default SidebarItem;
