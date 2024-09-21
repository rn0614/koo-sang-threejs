import { Header } from "@/components/Header/Header";
import styles from "./styles.module.scss";
import HomeContent from "@/components/HomeContent/page";
import HeaderButton from "@/components/HeaderButton/HeaderButton";

export const metadata = {
  title: "Koosang Project",
  description: "koo Sangmo의 놀이터입니다.",
};

export default async function Home() {
  return (
    <main className={styles.flexColumn}>
      <Header>
        <HeaderButton />
      </Header>
      <HomeContent />
    </main>
  );
}
