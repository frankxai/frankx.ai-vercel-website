import styles from "./about.module.css";

export default function AboutLoading() {
  return (
    <div className={`${styles.page} ${styles.loading}`} role="status">
      <div className={styles.wrap}>
        <p className={styles.eyebrow}>Loading the founder atelier…</p>
      </div>
    </div>
  );
}
