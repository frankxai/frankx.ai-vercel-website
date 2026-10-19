import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, BookOpen } from "lucide-react";
import { researchHubs, domainsForHub } from "@/lib/research/hubs";
import { domainSources } from "@/lib/research/sources";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import ResearchModelWatch from "../../research-model-watch";

type Props = { params: Promise<{ hub: string }> };
export function generateStaticParams() {
  return researchHubs.map((h) => ({ hub: h.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { hub } = await params;
  const entry = researchHubs.find((h) => h.slug === hub);
  if (!entry) return { title: "Research hub not found" };
  return {
    title: `${entry.title} Research`,
    description: entry.description,
    alternates: {
      canonical: `https://www.frankx.ai/research/hubs/${entry.slug}`,
    },
    openGraph: {
      title: `${entry.title} Research | FrankX`,
      description: entry.description,
      url: `https://www.frankx.ai/research/hubs/${entry.slug}`,
    },
  };
}
export default async function ResearchTopicHub({ params }: Props) {
  const { hub } = await params;
  const entry = researchHubs.find((h) => h.slug === hub);
  if (!entry) notFound();
  const domains = domainsForHub(entry.category);
  const sources = new Set(
    domains.flatMap((d) => (domainSources[d.slug] ?? []).map((s) => s.url)),
  ).size;
  return (
    <main className="min-h-screen bg-[#0a0a0b] pb-20 pt-28 text-white md:pt-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/research#hubs"
          className="mb-12 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm text-white/65 hover:text-white focus-visible:ring-2 focus-visible:ring-emerald-300"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All research hubs
        </Link>
        <p className="mb-4 text-[11px] uppercase tracking-[0.25em] text-emerald-300">
          {entry.question}
        </p>
        <h1 className="max-w-4xl font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
          {entry.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
          {entry.description}
        </p>
        <p className="mt-8 border-b border-white/10 pb-10 font-mono text-xs text-white/60">
          {domains.length} research briefs <span aria-hidden="true"> / </span>{" "}
          {sources} distinct sources
        </p>
        {hub === "frontier-ai" && (
          <nav
            aria-label="Model research tools"
            className="my-8 flex flex-wrap gap-3"
          >
            {[
              ["/llm-hub", "Model catalog"],
              ["/research/model-arena", "Model Arena"],
              ["/research/methodology", "Evaluation methodology"],
            ].map(([href, title]) => (
              <Link
                key={href}
                href={href}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-emerald-300/25 px-5 text-sm text-emerald-200 hover:bg-emerald-300/10 focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                {title}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            ))}
          </nav>
        )}
        <section aria-labelledby="briefs-title" className="py-10">
          <h2 id="briefs-title" className="mb-8 text-2xl font-semibold">
            Research briefs
          </h2>
          <div className="divide-y divide-white/10">
            {domains.map((d, i) => (
              <TrackedLink
                key={d.slug}
                href={`/research/${d.slug}`}
                eventName="research_brief_open"
                eventProperties={{ hub, brief: d.slug }}
                className="group grid gap-4 rounded-sm py-7 focus-visible:ring-2 focus-visible:ring-emerald-300 md:grid-cols-[3rem_1fr_10rem]"
              >
                <span className="font-mono text-xs text-emerald-300/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl font-semibold group-hover:text-emerald-300">
                    {d.title}
                  </h3>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-white/60">
                    {d.subtitle}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs text-white/60 md:flex-col md:items-end">
                  <span>{domainSources[d.slug]?.length ?? 0} sources</span>
                  <span>Updated {d.lastUpdated}</span>
                  <ArrowUpRight
                    className="h-4 w-4 text-emerald-300"
                    aria-hidden="true"
                  />
                </div>
              </TrackedLink>
            ))}
          </div>
        </section>
      </div>
      {hub === "frontier-ai" && <ResearchModelWatch />}
      <nav
        aria-label="Related research hubs"
        className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <h2 className="mb-6 flex items-center gap-3 text-xl font-semibold">
          <BookOpen aria-hidden="true" className="h-5 w-5 text-emerald-300" />
          Continue your research
        </h2>
        <div className="flex flex-wrap gap-3">
          {researchHubs
            .filter((h) => h.slug !== hub)
            .map((h) => (
              <Link
                key={h.slug}
                href={`/research/hubs/${h.slug}`}
                className="rounded-full border border-white/15 px-5 py-3 text-sm text-white/70 hover:border-emerald-300/40 hover:text-white focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                {h.title}
              </Link>
            ))}
        </div>
      </nav>
    </main>
  );
}
