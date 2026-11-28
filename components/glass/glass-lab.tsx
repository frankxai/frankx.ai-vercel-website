"use client";

import { useState } from "react";
import { materials, type Material, type SignalState } from "@/lib/glass/materials";
import { GlassPane } from "./glass-pane";
import styles from "./glass-lab.module.css";

/**
 * The interactive part of the lab: material and signal age. Everything else on the
 * page is server-rendered. The caption is the only prose, and it says what the
 * material encodes, not what it looks like.
 */
export function GlassLab() {
  const [material, setMaterial] = useState<Material>("orbital");
  const [state, setState] = useState<SignalState>("stale");

  return (
    <div className={styles.lab}>
      <div className={styles.stage}>
        <GlassPane
          material={material}
          state={state}
          title="System pulse"
          value="24"
          unit="/ 24 up"
          meta="Last pulse 2026-09-15 02:33 UTC"
          actions={[{ label: "Open log" }, { label: "Re-probe" }]}
        />
      </div>

      <div className={styles.controls}>
        <div className={styles.group}>
          <span className={styles.label}>Material</span>
          <div className={styles.segmented} role="group" aria-label="Material">
            {(Object.keys(materials) as Material[]).map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={material === key}
                onClick={() => setMaterial(key)}
              >
                {materials[key].label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.group}>
          <span className={styles.label}>State</span>
          <div className={styles.segmented} role="group" aria-label="Signal state">
            <button type="button" aria-pressed={state === "fresh"} onClick={() => setState("fresh")}>
              Fresh
            </button>
            <button type="button" aria-pressed={state === "stale"} onClick={() => setState("stale")}>
              Stale
            </button>
          </div>
        </div>

        <p className={styles.caption} aria-live="polite">
          {materials[material].caption}
        </p>

        <p className={styles.note}>
          <span>
            <b>Gate</b> keeps phones on CSS and capable desktops on WebGL. Budget: 8 ms median.
          </span>
          <span className={styles.rail}>
            <span>CSS</span>
            <i />
            <span>WEBGL</span>
          </span>
        </p>
      </div>
    </div>
  );
}
