import React from "react";
import { FaPlay } from "react-icons/fa";
import styles from './styles.module.scss';

export const FloatButton = () => {
  return (
    <div className={`${styles.floating} floatingBtn`}>
      <FaPlay />
    </div>
  );
};
