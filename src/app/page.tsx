import { Header } from "@/components/Header/Header";
import styles from "./styles.module.scss";
import HomeContent from "@/components/HomeContent/page";
import HeaderButton from "@/components/HeaderButton/HeaderButton";
import { Box } from "@radix-ui/themes";

export const metadata = {
  title: "Koosang Project",
  description: "koo Sangmo의 놀이터입니다.",
};

export default async function Home() {
  return (
    <Box className={styles.mainLayout}>
      <Header>
        <HeaderButton />
      </Header>
      <main className={styles.mainWrapper}>
        <Box className={styles.sidebarGuide}></Box>
        <Box className={styles.mainContent}>
          <HomeContent />
        </Box>
      </main>
    </Box>
  );
}
