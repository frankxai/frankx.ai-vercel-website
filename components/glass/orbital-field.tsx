import styles from "./lab.module.css";

export interface OrbitalFieldProps {
  /** The datum the eye lands on first. One number, one noun. */
  value: string;
  label: string;
  /** Ring labels, outermost first. Each is 3 to 6 words or fewer. */
  rings: [string, string, string];
}

/**
 * Orbital glass: the page's subject as layers rather than as a paragraph.
 * Server-rendered SVG, no script, no WebGL. Motion is a slow rotation that the
 * reduced-motion preference stops entirely.
 */
export function OrbitalField({ value, label, rings }: OrbitalFieldProps) {
  return (
    <div className={styles.orbit} aria-hidden="true">
      <svg className={styles.svg} viewBox="0 0 400 400" fill="none">
        <defs>
          <radialGradient id="orbital-glow" cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="#c9a15c" stopOpacity="0" />
            <stop offset="100%" stopColor="#c9a15c" stopOpacity=".10" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="188" fill="url(#orbital-glow)" />
        <g className={styles.ringA} stroke="rgba(251,246,235,.16)">
          <circle cx="200" cy="200" r="176" strokeDasharray="1 7" />
        </g>
        <g className={styles.ringB} stroke="rgba(251,246,235,.20)">
          <circle cx="200" cy="200" r="140" strokeDasharray="2 10" />
        </g>
        <g className={styles.ringC} stroke="rgba(240,200,126,.28)">
          <circle cx="200" cy="200" r="104" strokeDasharray="1 4" />
          <circle cx="200" cy="96" r="3" fill="#f0c87e" />
        </g>
        <circle cx="200" cy="200" r="188" stroke="rgba(251,246,235,.07)" />
        <circle cx="200" cy="200" r="140" stroke="rgba(251,246,235,.07)" />
        <circle cx="200" cy="200" r="104" stroke="rgba(251,246,235,.07)" />
      </svg>
      <span className={styles.ringLabel} style={{ top: "6%", right: "12%" }}>{rings[0]}</span>
      <span className={styles.ringLabel} style={{ bottom: "20%", right: "-2%" }}>{rings[1]}</span>
      <span className={styles.ringLabel} style={{ bottom: "2%", left: "18%" }}>{rings[2]}</span>
      <div className={styles.datum}>
        <div>
          <div className={styles.num}>{value}</div>
          <div className={styles.label}>{label}</div>
        </div>
      </div>
    </div>
  );
}
