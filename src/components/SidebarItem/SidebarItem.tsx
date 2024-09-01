import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";
import styles from "./styles.module.scss";
import { Text } from "@radix-ui/themes";

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
  return (
    <Link
      href={href}
      className={`${styles.sidebarLink} ${active && styles.active}`}
    >
      <Icon size={26} />
      <Text as="p" className={styles.paragraph}>{label}</Text>
    </Link>
  );
};

export default SidebarItem;
