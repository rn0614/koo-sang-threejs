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
    <Box className={styles.mainLayout}>
      <Header/>
      <main className={styles.mainWrapper}>
        <Box className={styles.sidebarGuide}></Box>
        <Box className={styles.mainContent}>{children}</Box>
      </main>
    </Box>
  );
}
