import styles from "./lab.module.css";

export interface SignalTileProps {
  term: string;
  value: string;
  note: string;
  tone?: "neutral" | "warn" | "good";
}

/**
 * A measured number with its source line. If the number has no source, it is not
 * a signal, it is decoration; do not render it.
 */
export function SignalTile({ term, value, note, tone = "neutral" }: SignalTileProps) {
  return (
    <div className={styles.tile} data-tone={tone}>
      <dt className={styles.tileTerm}>{term}</dt>
      <dd className={styles.tileValue}>{value}</dd>
      <small className={styles.tileNote}>{note}</small>
    </div>
  );
}
