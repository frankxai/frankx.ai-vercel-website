import type { Metadata } from "next";
import { GlassLab, OrbitalField, SignalTile } from "@/components/glass";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Glass lab · Starlight materials",
  description:
    "Two glass materials, one device gate. Composition reference for the shared Starlight material system.",
  robots: { index: false, follow: false },
};

const ratios: Array<{ domain: string; value: number; quiet?: boolean }> = [
  { domain: "agenticpassiveincome.com", value: 453 },
  { domain: "starlight.technology", value: 207 },
  { domain: "agenticincome.ai", value: 180 },
  { domain: "realityarchitect.ai", value: 74 },
  { domain: "gencreator.ai", value: 54 },
  { domain: "starlightintelligence.org", value: 25, quiet: true },
  { domain: "frankx.ai", value: 14, quiet: true },
  { domain: "arcanea.ai", value: 10, quiet: true },
];

const max = Math.max(...ratios.map((row) => row.value));

export default function GlassLabPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <section className={styles.hero} aria-labelledby="glass-title">
          <div>
            <p className={styles.eyebrow}>Starlight design intelligence</p>
            <h1 id="glass-title" className={styles.title}>
              Glass that carries <em>the argument</em>.
            </h1>
            <p className={styles.lede}>
              Two materials, one gate. Depth where it explains a system, clarity where it reports
              state.
            </p>
            <dl className={styles.meta}>
              <div>
                <dt>Surfaces</dt>
                <dd>
                  25<span>live</span>
                </dd>
              </div>
              <div>
                <dt>Brands</dt>
                <dd>
                  11<span>packs</span>
                </dd>
              </div>
              <div>
                <dt>Frame budget</dt>
                <dd>
                  8<span>ms</span>
                </dd>
              </div>
            </dl>
          </div>
          <OrbitalField value="25" label="live surfaces" rings={["delivery", "runtime", "memory"]} />
        </section>

        <section className={styles.section} aria-labelledby="state-title">
          <div className={styles.head}>
            <h2 id="state-title" className={styles.h2}>
              The material, in state
            </h2>
            <p className={styles.note}>
              The pulse shown is the estate&apos;s last measured pulse, 74 days old. Freshness is a
              visual property, so the pane frosts.
            </p>
          </div>
          <GlassLab />
        </section>

        <section className={styles.section} aria-labelledby="signals-title">
          <div className={styles.head}>
            <h2 id="signals-title" className={styles.h2}>
              What the estate looks like today
            </h2>
            <p className={styles.note}>Measured 2026-11-28 from the live homepages.</p>
          </div>
          <dl className={styles.signals}>
            <SignalTile term="Best ratio" value="10" note="words per visual, arcanea.ai" tone="good" />
            <SignalTile
              term="Worst ratio"
              value="453"
              note="words per visual, agenticpassiveincome.com"
              tone="warn"
            />
            <SignalTile term="No imagery" value="9" note="of 25 homepages contain no image" tone="warn" />
            <SignalTile term="Cloudflare in front" value="0" note="of 18 domains probed" />
          </dl>
        </section>

        <section className={styles.section} aria-labelledby="ratio-title">
          <div className={styles.head}>
            <h2 id="ratio-title" className={styles.h2}>
              The text budget
            </h2>
            <p className={styles.note}>Rule: 25 words per visual or fewer on a public surface.</p>
          </div>
          <div className={styles.ratio}>
            {ratios.map((row) => (
              <div key={row.domain} className={styles.row}>
                <span className={styles.domain}>{row.domain}</span>
                <span className={styles.bar}>
                  <i
                    className={row.quiet ? styles.quiet : undefined}
                    style={{ width: `${Math.max((row.value / max) * 100, 3)}%` }}
                  />
                </span>
                <span className={styles.count}>{row.value}</span>
              </div>
            ))}
          </div>
          <p className={styles.rule}>
            Above the line the page is a document. Below it, the page is an interface.
          </p>
        </section>

        <footer className={styles.foot}>
          <code className={styles.code}>npx shadcn@latest add @starlight/glass-surface</code>
          <span className={styles.provenance}>
            Glass lab · OpenCode · 2026-11-28 · tokens from packages/materials/src/tokens/tokens.css
          </span>
        </footer>
      </div>
    </main>
  );
}
