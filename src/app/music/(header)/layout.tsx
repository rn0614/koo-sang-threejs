import { Header } from "@/components/Header/Header";
import styles from "./styles.module.scss";
import { isApp } from "@/utils/stackRouter";
import { Box, Container } from "@radix-ui/themes";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container className={styles.mainLayout}>
      {isApp()? null: <Header/>}
      <main className={styles.mainWrapper}>
        <Box className={styles.sidebarGuide}></Box>
        <Box className={styles.mainContent}>{children}</Box>
      </main>
    </Container>
  );
}
