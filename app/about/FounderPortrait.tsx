import Image from "next/image";
import styles from "./about.module.css";

export function FounderPortrait() {
  return (
    <figure className={styles.heroArt}>
      <div className={styles.heroFrame}>
        <Image
          src="/images/portraits/frank-presenting-oracle-2025.jpg"
          alt="Frank Riemer on stage presenting how AI workflows evolve from prompts into agents"
          width={1920}
          height={1440}
          fetchPriority="high"
          loading="eager"
          sizes="(max-width: 680px) 92vw, (max-width: 1320px) 47vw, 640px"
        />
      </div>
      <figcaption>
        <span>Presenting agent workflows at Oracle</span>
        <span>2025</span>
      </figcaption>
    </figure>
  );
}
