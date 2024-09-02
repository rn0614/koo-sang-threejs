import { Header } from "@/components/Header/Header";
import { isApp } from "@/utils/stackRouter";
import { Box } from "@radix-ui/themes";
import styles from "./styles.module.scss";

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
