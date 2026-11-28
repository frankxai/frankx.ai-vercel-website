"use client";

import { useCallback, useRef, type CSSProperties, type PointerEvent } from "react";
import { materials, stateSpec, type Material, type SignalState } from "@/lib/glass/materials";
import styles from "./glass-pane.module.css";

export interface GlassPaneAction {
  label: string;
  onClick?: () => void;
}

export interface GlassPaneProps {
  material: Material;
  state: SignalState;
  title: string;
  value: string;
  unit?: string;
  meta?: string;
  actions?: GlassPaneAction[];
  className?: string;
}

/**
 * One pane, two materials, one state contract.
 *
 * The pointer sheen is attached only where a fine pointer exists and motion is not
 * reduced; on touch the pane is a still. Stale signals frost rather than animate a
 * number, so the glass never misrepresents freshness (design.md §10).
 */
export function GlassPane({
  material,
  state,
  title,
  value,
  unit,
  meta,
  actions,
  className,
}: GlassPaneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const spec = materials[material];
  const chip = stateSpec[state].chip;

  const onPointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--mx", `${((event.clientX - rect.left) / rect.width) * 100}%`);
    node.style.setProperty("--my", `${((event.clientY - rect.top) / rect.height) * 100}%`);
  }, []);

  return (
    <div
      ref={ref}
      className={[styles.pane, className].filter(Boolean).join(" ")}
      data-material={material}
      data-state={state}
      style={
        {
          "--pane-blur": `${spec.blur}px`,
          "--pane-saturate": spec.saturate,
          borderRadius: spec.radius,
        } as CSSProperties
      }
      onPointerMove={onPointerMove}
      role="group"
      aria-label={`${title} signal, ${state}`}
    >
      {material === "liquid" ? <div className={styles.liquidBody} aria-hidden="true" /> : null}
      <div className={styles.sheen} aria-hidden="true" />
      <div className={styles.head}>
        <span className={styles.title}>{title}</span>
        <span className={styles.chip}>{chip}</span>
      </div>
      <div className={styles.value}>
        <strong>{value}</strong>
        {unit ? <span>{unit}</span> : null}
      </div>
      {meta ? <p className={styles.meta}>{meta}</p> : null}
      {actions?.length ? (
        <div className={styles.actions}>
          {actions.map((action) => (
            <button key={action.label} type="button" className={styles.press} onClick={action.onClick}>
              {action.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
