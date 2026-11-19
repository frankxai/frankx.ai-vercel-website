'use client'

import { useState } from 'react'
import styles from './solar.module.css'

const hours = Array.from({ length: 24 }, (_, hour) => hour)
const surplusWh = [0, 0, 0, 0, 0, 0, 0, 200, 700, 1500, 2400, 3100, 3600, 3400, 2800, 2000, 1200, 500, 100, 0, 0, 0, 0, 0]
const targetWh = 12000
const hourlyLimitWh = 3600
const parking = {
  home: { label: 'Home driveway', hours: [7, 8, 18, 19, 20, 21, 22], description: 'Parked 07:00–09:00 and 18:00–23:00.' },
  work: { label: 'Workplace parking', hours: [9, 10, 11, 12, 13, 14, 15, 16], description: 'Parked 09:00–17:00.' },
} as const

function chargingPlan(available: readonly number[]) {
  let remaining = targetWh
  const direct = surplusWh.map((value, hour) => {
    const used = available.includes(hour) ? Math.min(value, hourlyLimitWh, remaining) : 0
    remaining -= used
    return used
  })
  const grid = direct.map((value, hour) => {
    const used = available.includes(hour) ? Math.min(hourlyLimitWh - value, remaining) : 0
    remaining -= used
    return used
  })

  return {
    direct,
    grid,
    directTotal: direct.reduce((sum, value) => sum + value, 0),
    gridTotal: grid.reduce((sum, value) => sum + value, 0),
  }
}

export function SolarDispatch() {
  const [site, setSite] = useState<keyof typeof parking>('home')
  const scenario = parking[site]
  const result = chargingPlan(scenario.hours)

  return (
    <figure className={styles.lab}>
      <fieldset className={styles.switches}>
        <legend>When is the EV parked?</legend>
        <label><input type="radio" name="solar-parking" checked={site === 'home'} onChange={() => setSite('home')} /> Home driveway</label>
        <label><input type="radio" name="solar-parking" checked={site === 'work'} onChange={() => setSite('work')} /> Workplace parking</label>
      </fieldset>
      <div className={styles.dispatchSummary} aria-live="polite">
        <p>{scenario.description}</p>
        <div><strong>{(result.directTotal / 1000).toFixed(1)} kWh</strong><span>direct solar</span></div>
        <div><strong>{(result.gridTotal / 1000).toFixed(1)} kWh</strong><span>grid top-up</span></div>
      </div>
      <div className={styles.chartLegend} aria-hidden="true"><span>Available surplus</span><span>Direct solar</span><span>Grid top-up</span></div>
      <div className={styles.chart} aria-hidden="true">
        {hours.map((hour) => (
          <div className={styles.hour} key={hour} title={`${String(hour).padStart(2, '0')}:00 · ${(surplusWh[hour] / 1000).toFixed(1)} kWh surplus · ${(result.direct[hour] / 1000).toFixed(1)} kWh direct · ${(result.grid[hour] / 1000).toFixed(1)} kWh grid`}>
            <i className={styles.surplus} style={{ height: `${surplusWh[hour] / hourlyLimitWh * 100}%` }} />
            <i className={styles.direct} style={{ height: `${result.direct[hour] / hourlyLimitWh * 100}%` }} />
            <i className={styles.gridPower} style={{ height: `${result.grid[hour] / hourlyLimitWh * 100}%`, bottom: `${result.direct[hour] / hourlyLimitWh * 100}%` }} />
          </div>
        ))}
      </div>
      <div className={styles.chartTicks} aria-hidden="true"><span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span></div>
      <figcaption>Illustration with 24 hourly bins, a 12 kWh target and a 3.6 kW charging limit. Both sites get the same synthetic surplus after local loads. The model allocates solar first using the full day’s known profile, then fills the remainder from the grid while parked. It assumes no battery and omits charging losses. Real sites need measured load and a seasonal yield model.</figcaption>
    </figure>
  )
}

const video = 'https://www.youtube.com/watch?v=wrI9Jx_JhJo'

export function CarportWalkthrough() {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className={styles.film} lang="de">
      {loaded ? (
        <iframe className={styles.player} src="https://www.youtube.com/embed/wrI9Jx_JhJo" title="PV Lager: Solarcarport mit bifazialen Modulen" allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
      ) : (
        <div className={styles.filmPlaceholder}>
          <p className={styles.eyebrow}>Video von PV Lager</p>
          <h3>Ein gebauter Carport, von unten gesehen.</h3>
          <p>Das ältere Beispiel zeigt die Konstruktion und den Blick auf die Modulrückseite. Für die Ausstattung heutiger Angebote gelten die jeweiligen Angebotsunterlagen.</p>
          <button type="button" className={styles.button} onClick={() => setLoaded(true)}>YouTube-Video laden</button>
          <p className={styles.note}>Beim Laden wird eine Verbindung zu YouTube aufgebaut.</p>
        </div>
      )}
      <a className={styles.textLink} href={video}>Video direkt auf YouTube öffnen</a>
    </div>
  )
}
