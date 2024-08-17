import styles from "./page.module.scss";
import getSongs from "@/actions/getSongs";
import Head from "next/head";
import HomeContent from "@/components/HomeContent/page";

export default async function Home() {
  const songs = await getSongs();
  return (
    <main className={styles.flexColumn}>
      <Head>
        <title>KooSang Project</title>
        <meta name="home page for koosang-project v2" content="koosang-project의 3번째"></meta>
      </Head>
      <HomeContent/>
    </main>
  );
}
