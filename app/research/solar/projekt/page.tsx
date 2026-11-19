import type { Metadata } from 'next'
import Link from 'next/link'
import { TrackedLink } from '@/components/analytics/TrackedLink'
import styles from '../solar.module.css'

const path = '/research/solar/projekt'
const title = 'Solarcarport planen | Projektleitfaden für Seesen'
const description = 'Fläche erfassen, Bausatz und Montage vergleichen und die passenden Anlaufstellen für Solarcarports und Solarterrassen in Seesen finden.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path, locale: 'de_DE', type: 'website' },
  twitter: { card: 'summary', title, description },
}

const destinations = [
  { id: 'configurator', name: 'Digitaler Solarcarport-Konfigurator', action: 'Eine erste Variante durchspielen', role: 'Für eine digitale Skizze vor der Anfrage. Die verfügbaren Abmessungen und den ausgewiesenen Umfang vor Ort bestätigen lassen.', url: 'https://solarcarport-tech.vercel.app/#configurator' },
  { id: 'canopy', name: 'Solarcarport.tech', action: 'Bausätze und Größen ansehen', role: 'Für Carport, Terrasse und individuelle Überdachung. Zeichnung und Leistungsumfang direkt beim Anbieter anfragen.', url: 'https://www.solarcarport.tech/solarcarport' },
  { id: 'installation', name: 'VR Gebäudetechnik', action: 'Montage und Anschluss besprechen', role: 'Für Planung und Installation im regionalen Einsatzgebiet. Die Zuständigkeiten für Bau und Elektrik im Angebot festhalten.', url: 'https://www.vr-gebaeudetechnik.de/' },
  { id: 'stock', name: 'PV Lager auf Kleinanzeigen', action: 'Module und aktuelle Anzeigen ansehen', role: 'Für einzelne Module und veröffentlichte Pakete. Variante, Abnahmemenge und Verfügbarkeit direkt bestätigen lassen.', url: 'https://www.kleinanzeigen.de/pro/pvlager' },
] as const

export default function SolarProjectPage() {
  return (
    <article className={styles.edition} lang="de">
      <header className={styles.section}>
        <Link className={styles.breadcrumb} href="/research/solar">FrankX Solar-Research</Link>
        <h1 className={styles.projectTitle}>Dein Solarcarport beginnt mit der Fläche.</h1>
        <p className={styles.intro}>Für ein vergleichbares Angebot braucht der Anbieter deinen nutzbaren Platz, die geplante Nutzung und eine klare Antwort darauf, wer Fundament, Aufbau und Anschluss übernimmt.</p>
        <div className={styles.nav}>
          <TrackedLink className={styles.button} href="/research/solar/templates/projektsteckbrief.md" download eventName="solar_template_download" eventProperties={{ template: 'projektsteckbrief.md', placement: 'project_de' }}>Projektsteckbrief herunterladen</TrackedLink>
          <a className={styles.textLink} href="#anbieter">Passende Anlaufstelle finden</a>
        </div>
      </header>

      <section className={styles.section} aria-labelledby="umfang">
        <p className={styles.eyebrow}>Vergleichbare Angebote</p>
        <h2 id="umfang">Was soll der Anbieter übernehmen?</h2>
        <dl className={styles.siteGrid}>
          <div><dt>Bausatz</dt><dd>Modulvariante, Raster, Entwässerung, Zubehör und Lieferung festhalten. Klären, wer Fundament, Montage und Elektroanschluss organisiert.</dd></div>
          <div><dt>Mit Laden und Speicher</dt><dd>Standzeiten des Autos und vorhandene Technik nennen. Komponenten und zusätzliche Arbeiten einzeln ausweisen lassen.</dd></div>
          <div><dt>Mit Planung und Montage</dt><dd>Schriftlich vereinbaren, wer die Fläche prüft, das Dach plant, montiert und in Betrieb nimmt. Ausnahmen in die Angebotsübersicht übernehmen.</dd></div>
        </dl>
        <TrackedLink className={styles.textLink} href="/research/solar/templates/angebotsvergleich.csv" download eventName="solar_template_download" eventProperties={{ template: 'angebotsvergleich.csv', placement: 'project_de' }}>Angebotsvergleich als CSV herunterladen</TrackedLink>
      </section>

      <section id="anbieter" className={styles.field}>
        <div className={styles.section}>
          <p className={styles.eyebrow}>Weiter zum Anbieter</p>
          <h2>Wohin mit deiner Anfrage?</h2>
          <div className={styles.researchRows}>
            {destinations.map(({ id, name, action, role, url }) => (
              <div key={id}>
                <p className={styles.rowLabel}>{name}</p>
                <div><h3>{action}</h3><p>{role}</p><TrackedLink className={styles.textLink} href={url} eventName="solar_partner_open" eventProperties={{ offer: id, placement: 'project_de' }}>{name} öffnen</TrackedLink></div>
              </div>
            ))}
          </div>
          <p className={styles.note}>Mein Bruder Alexander arbeitet im Solargeschäft in Seesen. Angebote, Verfügbarkeit und Ausführung liegen beim jeweiligen Anbieter. Der Steckbrief kann auch an andere Anbieter gehen.</p>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Erst rechnen, dann entscheiden.</h2>
        <p className={styles.intro}>Vergleiche die Modulabmessungen im Dachraster und probiere aus, wie die Standzeit des Autos die direkte Solarladung verändert.</p>
        <div className={styles.nav}><Link className={styles.textLink} href="/research/solar#module-fit">Modulraster vergleichen</Link><Link className={styles.textLink} href="/research/solar#site-energy">Ladezeiten durchspielen</Link><Link className={styles.textLink} href="/research/solar#field-kit">Alle Vorlagen ansehen</Link></div>
      </section>
    </article>
  )
}
