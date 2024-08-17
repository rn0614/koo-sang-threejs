import React from "react";
import styles from "./styles.module.scss";

const Layout = React.memo(function Layout({
  children,
  testing,
  parallel,
  additional,
}: {
  children: React.ReactNode;
  testing: React.ReactNode;
  parallel: React.ReactNode;
  additional: React.ReactNode;
}) {
  return (
    <div className={styles.dashboard}>
      <div className={styles.children}>{children}</div>
      <div className={styles.parallel}>{parallel}</div>
      <div className={styles.testing}>{testing}</div>
      <div className={styles.additional}>{additional}</div>
    </div>
  );
});

export default Layout;