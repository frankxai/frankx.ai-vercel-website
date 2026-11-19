import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { TrackedLink } from '@/components/analytics/TrackedLink'
import ModuleFit from './module-fit'
import styles from './solar.module.css'

const title = 'Solar after the panel'
const description = 'Frank Riemer’s field guide to solar modules, tandem research and the engineering of solar carports, with a German project guide from Seesen.'
const hero = '/images/research/solar-carport-concept.webp'
const carports = 'https://www.solarcarport.tech/solarcarport'
const inquiries = 'https://www.solarcarport.tech/landing-page'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/research/solar' },
  openGraph: { title, description, url: '/research/solar', type: 'article', images: [hero] },
  twitter: { card: 'summary_large_image', title, description, images: [hero] },
}

const sources = {
  trends: ['IEA PVPS · Trends in Photovoltaic Applications, September 2026', 'https://iea-pvps.org/trends_reports/trends-2026/'],
  envelope: ['Fraunhofer ISE · Building-integrated photovoltaics', 'https://www.ise.fraunhofer.de/en/business-areas/solar-power-plants-and-integrated-photovoltaics/integrated-photovoltaics/building-integrated-photovoltaics-bipv.html'],
  factory: ['Nature · Thermally evaporated perovskite/silicon tandems, 2026', 'https://www.nature.com/articles/s41586-026-10970-1'],
  market: ['Fraunhofer ISE · Photovoltaics Report, July 2026', 'https://www.ise.fraunhofer.de/en/publications/studies/photovoltaics-report.html'],
  cells: ['National Laboratory of the Rockies · Research cell efficiency', 'https://www.nlr.gov/pv/cell-efficiency'],
  modules: ['National Laboratory of the Rockies · Champion module efficiency', 'https://www.nlr.gov/pv/module-efficiency'],
  tandem: ['Fraunhofer ISE and Oxford PV · Shingled tandem module, June 2026', 'https://www.ise.fraunhofer.de/en/press-media/press-releases/2026/perovskite-silicon-solar-cells-meet-matrix-shingled-interconnection.html'],
  review: ['Nature Reviews Clean Technology · From promise to product, 2026', 'https://www.nature.com/articles/s44359-026-00173-2'],
  field: ['TNO and Fraunhofer ISE · One year of outdoor triple-junction testing, 2026', 'https://onlinelibrary.wiley.com/doi/10.1002/solr.70390'],
  bifacial: ['IEA PVPS Task 13 · Bifacial photovoltaic modules and systems', 'https://iea-pvps.org/key-topics/bifacial-photovoltaic-modules-and-systems/'],
  climate: ['IEA PVPS Task 13 · Climatic rating of PV modules', 'https://iea-pvps.org/key-topics/climatic-rating-of-photovoltaic-modules/'],
  yield: ['European Commission JRC · PVGIS', 'https://joint-research-centre.ec.europa.eu/photovoltaic-geographical-information-system-pvgis_en'],
  trina: ['Trina Solar · Vertex S+ NEG18RC.27 datasheet', 'https://www-cdn.trinasolar.com/wwwstorage/sites/7/eu-260227-datasheet-vertex-s-neg18rc.27-en-2025-b-web-260227-datasheet-vertex-s-neg18rc.27-en-2025-b-web.pdf'],
  dmegc: ['DMEGC Solar · DM460G12RT-B48HBT specifications', 'https://cdn.enfsolar.com/z/z/2026/3/4o2x0oio4zm6981aik/69609d1a60551.pdf'],
} satisfies Record<string, [string, string]>

const listings = [
  { name: 'DMEGC DM460G12RT-B48HBT', watts: '460 W', date: '11. September', detail: 'Kompaktes Format für den Rastervergleich.', url: 'https://www.kleinanzeigen.de/s-anzeige/-premium-solarmodul-460-watt-ultra-topcon-n-type-bifacial-glas-glas-pv-panel-modul-solar-photovoltaikmodul-full-black-schwarzer-rahmen-dmegc-dm460g12rt-b48hbt-hochleistungsmodule/3509437070-84-2795' },
  { name: 'Trina Vertex S+ TSM-NEG18RC.27', watts: '495 W', date: '17. November', detail: 'Längeres Format mit 1.961 mm. Das jüngste einzelne Modulangebot in meiner Stichprobe.', url: 'https://www.kleinanzeigen.de/s-anzeige/-premium-solarmodul-trina-vertex-s-495w-bifacial-pv-modul-full-black-solar-modul-photovoltaik-sofort-erhaeltlich-transparent-zwischen-den-zellen-topcon-n-type-tsm-neg18rc-27-2m-lang-1961mm-/3439830914-84-2795' },
  { name: 'AE Solar Horizon CMD-144BDS', watts: '590 W', date: '9. November', detail: 'Großformat mit 2.278 mm Länge. Bei Überkopfprojekten die Unterlagen für die konkrete Ausführung prüfen lassen.', url: 'https://www.kleinanzeigen.de/s-anzeige/-premium-solarmodul-ae-solar-horizon-590w-bifacial-pv-modul-full-black-solar-modul-photovoltaik-ueberkopfzulassung-transparent-zwischen-den-zellen-topcon-n-type-cmd-144bds-590w-2278mm-dibt/3508759602-84-2795' },
]

function Source({ id, children }: { id: keyof typeof sources; children?: React.ReactNode }) {
  const [label, url] = sources[id]
  return <a className={styles.textLink} href={url}>{children ?? label}</a>
}

export default function SolarResearchPage() {
  return (
    <article className={styles.edition} aria-labelledby="solar-title">
      <header className={styles.hero}>
        <Image className={styles.heroImage} src={hero} alt="" fill preload sizes="100vw" />
        <div className={styles.heroShade} />
        <div className={styles.heroInner}>
          <Link className={styles.breadcrumb} href="/research">FrankX research</Link>
          <h1 id="solar-title">Solar after<br />the panel<span>.</span></h1>
          <p>What changes when the roof also has to keep a car dry, let light through and produce power when you can use it?</p>
          <div className={styles.byline}>Frank Riemer <span aria-hidden="true">·</span> <time dateTime="2026-11-19">19 November 2026</time></div>
          <nav aria-label="In this field guide" className={styles.nav}>
            <a className={styles.button} href="#module-fit">Compare module fit</a>
            <a className={styles.textLink} href="#frontier">Research frontier</a>
            <a lang="de" className={styles.textLink} href="#seesen">Praxis in Seesen</a>
          </nav>
        </div>
        <p className={styles.imageNote}>Concept illustration</p>
      </header>

      <section id="module-fit" className={styles.section}>
        <p className={styles.eyebrow}>Module geometry</p>
        <h2>A 460 W panel can fit more power on a roof.</h2>
        <p className={styles.intro}>I compared two modules listed in Seesen. Both are 1,134 mm wide. The 460 W DMEGC is 199 mm shorter than the 495 W Trina. On a 5.50 m × 3.50 m rectangle, that difference buys a third row: 4.14 kWp against 2.97 kWp. Try another roof depth and watch the result change.</p>
        <ModuleFit />
        <p className={styles.note}><Source id="dmegc">DMEGC specification</Source><span aria-hidden="true"> · </span><Source id="trina">Trina datasheet</Source></p>
      </section>

      <section className={styles.section} id="frontier">
        <p className={styles.eyebrow}>Research frontier</p>
        <h2>Where the next watts come from.</h2>
        <aside className={styles.stat} aria-label="Global solar deployment">
          <strong>2.96 TW</strong>
          <div><p>Global installed PV capacity at the end of 2025. Germany added 18 GW that year. As deployment grows, the schedule of supply and demand matters more to the system around each array.</p><Source id="trends" /></div>
        </aside>
        <div className={styles.researchRows}>
          <div>
            <p className={styles.rowLabel}>In market</p>
            <div><h3>Silicon has several routes to higher efficiency.</h3><p>Fraunhofer’s July 2026 report describes n-type TOPCon as dominant. Heterojunction uses thin amorphous silicon layers at the contacts. Back-contact designs move the front electrodes to the rear, freeing more of the front for light. Compare the exact module’s area, temperature response and installation requirements.</p><Source id="market" /></div>
          </div>
          <div>
            <p className={styles.rowLabel}>Demonstrator</p>
            <div><h3>Stack absorbers. Then build a module.</h3><p>A perovskite top cell can absorb higher-energy light while the silicon below converts more of the remaining spectrum. In June 2026, Fraunhofer ISE and Oxford PV showed a 491 W rooftop demonstrator using matrix-shingled interconnection. It gives us a concrete module design to follow as field data and manufacturing evidence accumulate.</p><Source id="tandem" /> <span aria-hidden="true">·</span> <Source id="factory">Peer-reviewed work on vapor deposition</Source></div>
          </div>
          <div>
            <p className={styles.rowLabel}>Evidence to watch</p>
            <div><h3>Count outdoor seasons alongside efficiency records.</h3><p>NLR tracks independent cell and module measurements separately. For a buying decision, I also want the module area, outdoor exposure, degradation data and warranty terms. A 2026 TNO and Fraunhofer study followed encapsulated triple-junction cells outdoors for a year, an example of the evidence that record charts cannot supply.</p><Source id="cells">Cell records</Source> <span aria-hidden="true">·</span> <Source id="modules">Module records</Source> <span aria-hidden="true">·</span> <Source id="field">Outdoor study</Source> <span aria-hidden="true">·</span> <Source id="review">Manufacturing and reliability review</Source></div>
          </div>
        </div>
      </section>

      <section className={styles.section} id="site-energy">
        <p className={styles.eyebrow}>Site design</p>
        <h2>A carport has a second job.</h2>
        <p className={styles.intro}>The module is part of the roof. Draw the water path and the shade beneath it first. Then model the energy with the car, pavement and nearby buildings in the picture.</p>
        <dl className={styles.siteGrid}>
          <div><dt>Light</dt><dd>A bifacial cell can use rear irradiance. Daylight through the canopy depends on the gaps and clear area in the actual module. Ask for both properties separately.</dd><Source id="bifacial">IEA PVPS bifacial report</Source></div>
          <div><dt>Water</dt><dd>Follow runoff from the module joints into the profile and down to the drain. Solarcarport.tech documents channels integrated into its aluminum support profiles.</dd><a className={styles.textLink} href={carports}>See the seller’s profile detail</a></div>
          <div><dt>Load</dt><dd>Use a site yield estimate and compare the hourly curve with when the car is parked and when the house draws power. Use that overlap to decide what to ask of a wallbox or battery.</dd><Source id="yield">Run a baseline in PVGIS</Source></div>
        </dl>
        <p className={styles.note}><Source id="climate">Why nameplate power and annual yield behave differently</Source> <span aria-hidden="true">·</span> <Source id="envelope">Architectural PV beyond the carport</Source></p>
      </section>

      <section id="seesen" className={styles.field} lang="de">
        <div className={styles.section}>
          <p className={styles.eyebrow}>Praxis in Seesen</p>
          <h2>Welche Überdachung passt zu deiner Fläche?</h2>
          <p className={styles.intro}>Mein Bruder Alexander arbeitet im Solargeschäft in Seesen. Seine Praxis ist für mich der Grund, diese Technik genauer anzuschauen. Bei Solarcarport.tech kannst du dir ansehen, wie die Konstruktion, das Modulraster und die Regenführung zusammenkommen.</p>
          <div className={styles.offer}>
            <div>
              <p className={styles.rowLabel}>Öffentliches Angebot · Abruf 19.11.2026</p>
              <h3>Doppelcarport als Bausatz</h3>
              <p>15 Module, etwa 5,4 × 5,7 m. Lass dir für deinen Standort bestätigen, welche Leistungen das Angebot umfasst und was für Fundament, Anschluss und Montage separat anfällt.</p>
              <TrackedLink className={styles.button} href={inquiries} eventName="solar_partner_open" eventProperties={{ offer: "double_carport", placement: "seesen" }}>Doppelcarport ansehen</TrackedLink>
            </div>
            <div className={styles.price}><strong>6.970 €</strong><span>Veröffentlichter Bausatzpreis</span></div>
          </div>
          <div className={styles.package}>
            <div><h3>Doppelcarport mit Speicher und Wallbox</h3><p>Das inserierte Paket kombiniert 8,28 kWp mit einem 6 kW Hybridwechselrichter, 9,6 kWh Speicher und einer 11 kW Wallbox. Kläre mit dem Anbieter, welche Montage- und Anschlussleistungen das Paket umfasst.</p><TrackedLink className={styles.textLink} href="https://www.kleinanzeigen.de/s-anzeige/-premium-solar-doppel-carport-komplett-pv-anlage-solaranlage-sungrow-hybrid-wechselrichter-sh6-0rt-batteriespeicher-sbr096-wallbox-ac011e-01-elektrofahrzeug-erneuerbare-energie-solarstrom/2983641292-84-2795" eventName="solar_partner_open" eventProperties={{ offer: "storage_and_charging", placement: "seesen" }}>Paketangebot ansehen</TrackedLink></div>
            <strong>11.670 €</strong>
          </div>
          <h3 className={styles.listTitle}>Drei Modulangebote aus Seesen</h3>
          <ul className={styles.listings}>
            {listings.map((item) => (
              <li key={item.name}><strong>{item.watts}</strong><div><h4>{item.name}</h4><p>{item.detail}</p><span>Anzeige vom {item.date} 2026</span></div><a className={styles.textLink} href={item.url} aria-label={`Anzeige für ${item.name} ansehen`}>Anzeige ansehen</a></li>
            ))}
          </ul>
          <p className={styles.note}>Preise und Verfügbarkeit beim Anbieter prüfen. Für die Anfrage helfen Postleitzahl, Breite, Tiefe, ein Foto und die Angabe, ob du einen Bausatz oder Montage suchst.</p>
          <a className={styles.textLink} href={carports}>Weitere Carports und individuelle Ausführungen ansehen</a> <span aria-hidden="true">·</span> <a className={styles.textLink} href="https://www.solarcarport.tech/solarterrassen%C3%BCberdachung">Solarterrassen ansehen</a>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="next-field-test">
        <p className={styles.eyebrow}>Field research proposal</p>
        <h2 id="next-field-test">What I would measure in Seesen.</h2>
        <p className={styles.intro}>Log front and rear irradiance, module temperature and inverter output for a year. Record surface material, shading and when the bays are occupied. Compare measured yield with a PVGIS baseline, and use a matched reference when estimating the rear-side contribution. Publish the setup and missing data alongside the results.</p>
        <p className={styles.note}>Proposed study. The sources above are published work from the named institutions. The seller listings describe the local offers.</p>
        <Link className={styles.textLink} href="/research">Back to FrankX research</Link>
      </section>
    </article>
  )
}
