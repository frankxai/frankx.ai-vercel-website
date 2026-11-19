import styles from './solar.module.css'

const modules = [
  { name: 'DMEGC', model: 'DM460G12RT-B48HBT', watts: 460, length: 1762, width: 1134, source: 'https://cdn.enfsolar.com/z/z/2026/3/4o2x0oio4zm6981aik/69609d1a60551.pdf' },
  { name: 'Trina Vertex S+', model: 'TSM-NEG18RC.27', watts: 495, length: 1961, width: 1134, source: 'https://www-cdn.trinasolar.com/wwwstorage/sites/7/eu-260227-datasheet-vertex-s-neg18rc.27-en-2025-b-web-260227-datasheet-vertex-s-neg18rc.27-en-2025-b-web.pdf' },
  { name: 'AE Solar Horizon', model: 'CMD-144BDS', watts: 590, length: 2278, width: 1133, source: 'https://api.ae-solar.com/uploads/AE_CMD_144_BDS_Horizon_570_W_590_W_Ver26_1_1_96b06a7ae7.pdf' },
]

export default function ModuleAtlas() {
  return (
    <figure className={styles.atlas}>
      <div className={styles.atlasGrid}>
        {modules.map(({ name, model, watts, length, width, source }) => {
          const area = length * width / 1_000_000
          return (
            <div key={model} className={styles.specimen}>
              <div className={styles.silhouetteScale} aria-hidden="true">
                <span style={{ height: `${length / 2278 * 100}%`, aspectRatio: `${width} / ${length}` }} />
              </div>
              <h3>{name}</h3>
              <p>{model}</p>
              <dl>
                <div><dt>Rated power</dt><dd>{watts} W</dd></div>
                <div><dt>Face area</dt><dd>{area.toFixed(2)} m²</dd></div>
                <div><dt>Power per module area</dt><dd>{Math.round(watts / area)} W/m²</dd></div>
              </dl>
              <a className={styles.textLink} href={source}>Datasheet</a>
            </div>
          )
        })}
      </div>
      <figcaption>Outer dimensions are shown to scale. The schematic cell pattern is illustrative. W/m² uses front-side nameplate power and the module’s full face area. It does not include installation gaps, rear irradiance, or annual energy yield.</figcaption>
    </figure>
  )
}
