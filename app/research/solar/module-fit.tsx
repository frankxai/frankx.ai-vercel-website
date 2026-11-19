'use client'

import { useState } from 'react'
import styles from './solar.module.css'

const roofWidth = 3500
const gap = 20
const modules = [
  { name: 'DMEGC', power: 460, length: 1762 },
  { name: 'Trina', power: 495, length: 1961 },
]

export default function ModuleFit() {
  const [depth, setDepth] = useState(5500)
  const width = 1134
  const columns = Math.floor((roofWidth + gap) / (width + gap))

  return (
    <figure className={styles.fit}>
      <div className={styles.fitHead}>
        <div>
          <p className={styles.eyebrow}>Fixed width · 3.50 m</p>
          <label htmlFor="roof-depth">Roof depth <strong>{(depth / 1000).toFixed(2)} m</strong></label>
        </div>
        <input id="roof-depth" type="range" min="4000" max="6500" step="10" value={depth}
          onChange={(event) => setDepth(Number(event.currentTarget.value))}
          aria-valuetext={`${(depth / 1000).toFixed(2)} metres`} />
      </div>
      <div className={styles.fitGrid}>
        {modules.map(({ name, power, length }) => {
          const rows = Math.floor((depth + gap) / (length + gap))
          const count = rows * columns
          return (
            <div className={styles.fitModule} key={name}>
              <div className={styles.fitLabel}><h3>{name} · {power} W</h3><strong>{(count * power / 1000).toFixed(2)} kWp</strong></div>
              <p>{count} modules · {length.toLocaleString('en-US')} × 1,134 mm</p>
              <div className={styles.roof} style={{ aspectRatio: `${roofWidth} / ${depth}` }} aria-hidden="true">
                {Array.from({ length: count }, (_, index) => (
                  <span key={index} style={{
                    left: `${(index % columns) * (width + gap) / roofWidth * 100}%`,
                    top: `${Math.floor(index / columns) * (length + gap) / depth * 100}%`,
                    width: `${width / roofWidth * 100}%`,
                    height: `${length / depth * 100}%`,
                  }} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
      <figcaption>One portrait layout, 20 mm gaps and zero edge clearance. This illustration compares geometric fit and DC nameplate capacity. Project drawings also need usable dimensions, setbacks, mounting zones and a site-specific assessment.</figcaption>
    </figure>
  )
}
