"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import classNames from "classnames";
import styles from "./styles.module.scss";
import useUser from "@/hooks/useUser2";
import { useRecoilState } from "recoil";
import { userState } from "@/store/useUserStore";

const menuList = [
  { href: "/music", label: "Music" },
  { href: "/login", label: "Login" },
  { href: "/apitest", label: "API Test" },
  { href: "/music/liked", label: "Liked" },
  { href: "/music/search", label: "Search" },
  { href: "/three", label: "Three" },
  { href: "/three2", label: "Three2" },
  { href: "/user/rn0614@naver.com", label: "User" },
];

export default function HomeContent() {
  const { user } = useUser();
  const [user1, setUser] = useRecoilState(userState);
  const [active, setActive] = useState(false);
  const [rippleActive, setRippleActive] = useState<number | null>(null);

  const handleClick = () => {
    setActive(!active);
  };

  const handleMouseEnter = (index: number) => {
    setRippleActive(index);
    setTimeout(() => {
      setRippleActive(null);
    }, 600); // 물방울 애니메이션 지속 시간
  };
  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return (
    <div className={classNames(styles.container, { [styles.active]: active })}>
      <div className={styles.center} onClick={handleClick}>
        Select
      </div>
      {menuList.map((link, index) => (
        <div
          key={index}
          className={classNames(styles.circle, {
            [styles.ripple]: rippleActive === index,
          })}
          onMouseEnter={() => handleMouseEnter(index)}
        >
          <Link href={link.href}>{link.label}</Link>
        </div>
      ))}
    </div>
  );
}
