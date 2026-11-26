import { FounderPortrait } from "./FounderPortrait";
import styles from "./about.module.css";

export default function AboutLoading() {
  return (
    <main className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.masthead}>
          <p className={styles.eyebrow}>The founder atelier</p>
        </div>
        <div className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Amsterdam, Netherlands</p>
            <h1>Frank Riemer<span>.</span></h1>
            <p className={styles.intro} role="status">Loading Frank’s profile…</p>
          </div>
          <FounderPortrait />
        </div>
      </div>
    </main>
  );
}
