import StyledCheckbox from "@/components/Checkbox/Checkbox";
import styles from "./page.module.scss";
import getSongs from "@/actions/getSongs";
import { SongItem } from "@/components/SongItem/SongItem";
import PageContent from "@/components/PageContent/PageContent";
import Head from "next/head";

export default async function Home() {
  const songs = await getSongs();
  return (
    <main className={styles.flexColumn}>
      <Head>
        <title>KooSang Project</title>
        <meta name="home page for koosang-project v2" content="koosang-project의 3번째"></meta>
      </Head>
      <StyledCheckbox />
      <label className={styles.Label} htmlFor="c1">
        Accept terms and conditions.
      </label>
      <PageContent songs={songs}/>
    </main>
  );
}
