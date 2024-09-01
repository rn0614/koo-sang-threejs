import { Header } from "@/components/Header/Header";
import styles from "./styles.module.scss";
import { isApp } from "@/utils/stackRouter";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.mainLayout}>
      <Header/>
      <main className={styles.mainWrapper}>
        <div className={styles.sidebarGuide}></div>
        <div className={styles.mainContent}>{children}</div>
      </main>
    </div>
  );
}
