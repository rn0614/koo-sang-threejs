import { Box } from "@radix-ui/themes";
import styles from "./styles.module.scss";
import Header from "@/components/Header/Header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
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
