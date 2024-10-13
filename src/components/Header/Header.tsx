import React from "react";
import HeaderButton from "../HeaderButton/HeaderButton";
import styles from "./styles.module.scss";
import HeaderMenu from "../HeaderMenu/HeaderMenu";

const Header: React.FC = () => {
  return (
    <header className={`${styles.headerWrapper}`}>
      <HeaderMenu />
      <HeaderButton />
    </header>
  );
};

export default Header;
