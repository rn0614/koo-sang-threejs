import HeaderButton from "@/components/HeaderButton/HeaderButton";
import styles from "./styles.module.scss";
import { StackHeader } from "@/components/StackHeader/Header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.mainLayout}>
      <StackHeader>
        <HeaderButton />
      </StackHeader>
      <main className={styles.mainWrapper}>
        <div className={styles.sidebarGuide}></div>
        <div className={styles.mainContent}>{children}</div>
      </main>
    </div>
  );
}
