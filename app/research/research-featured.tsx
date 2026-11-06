import { ArrowUpRight } from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { featuredInvestigations } from "@/lib/research/featured-investigations";
import { agenticLifeMarketRegistry } from "@/lib/research/agentic-life-market";

// What a reader can open on the lead investigation's own page.
const leadInspectables = [
  "Harness receipts as raw JSON",
  "Third-party figures with source and licence",
  "Methodology in the open repository",
];

const metaFor = (href: string, fallback: string) =>
  href === "/research/agentic-life-observatory"
    ? `${agenticLifeMarketRegistry.systems.length} systems mapped`
    : fallback;

const cardFocus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]";

export default function ResearchFeatured() {
  const [lead, ...rest] = featuredInvestigations;

  return (
    <section
      id="investigations"
      aria-labelledby="investigations-title"
      className="scroll-mt-24 border-b border-white/10 pb-16 md:pb-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <p className="mb-3 text-[11px] uppercase tracking-[0.25em] text-emerald-300">
            Start here
          </p>
          <h2
            id="investigations-title"
            className="font-display text-2xl font-semibold tracking-tight text-balance md:text-3xl"
          >
            Investigations with their evidence attached
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/65">
            Each piece publishes what it rests on: receipts, a dataset, graded
            claims or inspectable sources. The topic maps further down return
            one by one as their sources pass review.
          </p>
        </div>

        <ol className="grid gap-4 md:grid-cols-3" role="list">
          <li className="md:col-span-2 md:row-span-2">
            <TrackedLink
              href={lead.href}
              eventName="research_investigation_open"
              eventProperties={{ href: lead.href, placement: "research_lead" }}
              className={`group flex h-full flex-col justify-between rounded-3xl border border-emerald-300/25 bg-emerald-300/[0.04] p-6 transition-colors hover:border-emerald-300/50 hover:bg-emerald-300/[0.07] sm:p-10 ${cardFocus}`}
            >
              <div>
                <div className="mb-8 flex items-center justify-between gap-4">
                  <span className="text-xs text-emerald-200/90">
                    {lead.kind}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-5 w-5 text-white/50 transition-colors group-hover:text-emerald-300"
                  />
                </div>
                <h3 className="font-display text-3xl font-semibold tracking-tight text-balance text-white md:text-4xl">
                  {lead.title}
                </h3>
                <p className="mt-4 max-w-xl text-base leading-7 text-white/70">
                  {lead.blurb}
                </p>
                <pre
                  translate="no"
                  aria-label="Shape of the public receipts manifest"
                  className="mt-8 hidden overflow-x-auto rounded-2xl border border-white/10 bg-[#0a0a0b]/80 p-5 font-mono text-[12px] leading-6 text-white/60 md:block"
                >
                  <span className="text-white/40">GET</span>{" "}
                  <span className="text-emerald-200">/research/model-arena/receipts.json</span>
                  {"\n{\n  "}
                  <span className="text-cyan-200">&quot;schema&quot;</span>
                  {": "}
                  <span className="text-emerald-200">&quot;frankx/arena-receipts-manifest@1&quot;</span>
                  {",\n  "}
                  <span className="text-cyan-200">&quot;lastMeasured&quot;</span>
                  {": …,\n  "}
                  <span className="text-cyan-200">&quot;receipts&quot;</span>
                  {": [{ "}
                  <span className="text-cyan-200">&quot;roundId&quot;</span>
                  {", "}
                  <span className="text-cyan-200">&quot;date&quot;</span>
                  {", "}
                  <span className="text-cyan-200">&quot;contestants&quot;</span>
                  {", … }]\n}"}
                </pre>
              </div>
              <div className="mt-10 border-t border-white/10 pt-6">
                <p className="mb-3 text-xs text-white/55">
                  What you can open
                </p>
                <ul className="grid gap-2 text-sm text-white/80 sm:grid-cols-3">
                  {leadInspectables.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-emerald-300"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </TrackedLink>
          </li>

          {rest.map((item) => (
            <li key={item.href}>
              <TrackedLink
                href={item.href}
                eventName="research_investigation_open"
                eventProperties={{ href: item.href, placement: "research_featured" }}
                className={`group flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-emerald-300/40 hover:bg-emerald-300/[0.04] ${cardFocus}`}
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <span className="text-xs text-emerald-200/80">
                    {item.kind}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 text-white/45 transition-colors group-hover:text-emerald-300"
                  />
                </div>
                <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-balance text-white">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-white/65">
                  {item.blurb}
                </p>
                <p className="mt-5 text-xs text-white/50">
                  {metaFor(item.href, item.meta)}
                </p>
              </TrackedLink>
            </li>
          ))}

          <li>
            <a
              href="#methodology"
              className={`flex h-full flex-col rounded-3xl border border-dashed border-white/15 p-6 transition-colors hover:border-white/30 ${cardFocus}`}
            >
              <span className="mb-5 text-xs text-white/55">Method</span>
              <span className="font-display text-lg font-semibold leading-snug tracking-tight text-white">
                How evidence is graded
              </span>
              <span className="mt-2 text-sm leading-6 text-white/65">
                What counts as a source, how a claim earns its grade, and why
                unreviewed briefs stay on hold.
              </span>
            </a>
          </li>
        </ol>
      </div>
    </section>
  );
}
