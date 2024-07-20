import Link from "next/link";
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
  return (
    <Link
      href={href}
      className={`${styles.SidebarLink} ${active && styles.active}`}
    >
      <Icon size={26} />
      <p className={styles.Paragraph}>{label}</p>
    </Link>
  );
};

export default SidebarItem;
