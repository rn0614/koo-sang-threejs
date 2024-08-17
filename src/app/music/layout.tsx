import getSongsByUserId from "@/actions/getSongsByUserId";
import { Header } from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Player } from "@/components/Player/Player";
import styles from "./styles.module.scss";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userSongs = await getSongsByUserId();
  return (
    <div className={styles.mainLayout}>
      <Sidebar songs={userSongs} />
      <main className={styles.mainWrapper}>
        <Header />
        <div className={styles.mainContent}>{children}</div>
      </main>
      {/* <Player /> */}
    </div>
  );
}
