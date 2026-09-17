import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getProviders } from "@/lib/llm-hub/registry";

const labs = [
  {
    name: "OpenAI",
    logo: "/images/brands/openai.svg",
    org: "openai",
    source: "https://openai.com/index/gpt-6-astra/",
    note: "Reasoning, software and computer use.",
  },
  {
    name: "Anthropic",
    logo: "/images/brands/anthropic.svg",
    org: "anthropic",
    source: "https://platform.claude.com/docs/en/models/overview",
    note: "Long-horizon agents, coding and reasoning.",
  },
  {
    name: "Google",
    logo: "/images/brands/google.svg",
    org: "google",
    source: "https://ai.google.dev/gemini-api/docs/models",
    note: "Multimodal systems and agentic workflows.",
  },
  {
    name: "xAI",
    logo: "",
    org: "xai",
    source: "https://docs.x.ai/developers/grok-4-6",
    note: "Configurable reasoning and tool use.",
  },
];
export default function ResearchModelWatch() {
  const providers = getProviders();
  return (
    <section
      id="models"
      className="scroll-mt-24 border-y border-white/10 py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.25em] text-emerald-300">
              Inside Models & intelligence
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight">
              The labs. The current models.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/65">
              Selected model families, checked against provider documentation on
              13 September 2026. Specifications are provider-reported; local
              experiments remain separately dated.
            </p>
          </div>
          <Link
            href="/llm-hub"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-emerald-300"
          >
            Full model catalog{" "}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-0 divide-y divide-white/10 rounded-3xl border border-white/10 md:grid-cols-2 md:divide-y-0">
          {labs.map((lab) => (
            <article key={lab.name} className="p-6 sm:p-8">
              <div className="mb-6 flex h-10 items-center gap-4">
                {lab.logo ? (
                  <Image
                    src={lab.logo}
                    alt={`${lab.name} logo`}
                    width={120}
                    height={32}
                    className="max-h-8 w-auto max-w-[120px] object-contain"
                  />
                ) : (
                  <span className="text-2xl font-semibold tracking-tight">
                    {lab.name}
                  </span>
                )}
                <span className="sr-only">{lab.name}</span>
              </div>
              <p className="mb-5 text-sm text-white/60">{lab.note}</p>
              <ul className="space-y-3">
                {(() => {
                  const provider = providers.find(
                    (p) => p.org.slug === lab.org,
                  );
                  const selected =
                    lab.org === "anthropic"
                      ? (provider?.models
                          .filter((m) => m.status === "ga" && m.last_verified)
                          .sort((a, b) =>
                            (b.released ?? "").localeCompare(a.released ?? ""),
                          )
                          .slice(0, 3) ?? [])
                      : provider?.flagship
                        ? [provider.flagship]
                        : [];
                  return selected.map((model) =>
                    model ? (
                      <li key={model.id}>
                        <Link
                          href={`/llm-hub/${model.id}`}
                          className="inline-flex items-center gap-3 rounded-sm text-lg font-semibold hover:text-emerald-300 focus-visible:ring-2 focus-visible:ring-emerald-300"
                        >
                          {model.name}
                          <ArrowUpRight
                            aria-hidden="true"
                            className="h-4 w-4 text-emerald-300"
                          />
                        </Link>
                      </li>
                    ) : null,
                  );
                })()}
              </ul>
              <a
                href={lab.source}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-sm text-xs text-white/60 hover:text-white focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                Official source{" "}
                <ArrowUpRight aria-hidden="true" className="h-3 w-3" />
              </a>
            </article>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/65">
          <Link
            href="/research/model-arena"
            className="rounded-sm hover:text-emerald-300 focus-visible:ring-2 focus-visible:ring-emerald-300"
          >
            Explore first-party experiments ↗
          </Link>
          <Link
            href="/research/hubs/frontier-ai"
            className="rounded-sm hover:text-emerald-300 focus-visible:ring-2 focus-visible:ring-emerald-300"
          >
            Reasoning, architectures & open models ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
