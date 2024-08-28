import getSongsByUserId from "@/actions/getSongsByUserId";
import { Header } from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Player } from "@/components/Player/Player";
import styles from "./styles.module.scss";
import { Box } from "@radix-ui/themes";

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
