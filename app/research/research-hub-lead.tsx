import Image from "next/image";
import {
  ArrowUpRight,
  Network,
  Brain,
  Palette,
  Building2,
  Cpu,
  Heart,
  Compass,
} from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { researchHubs, domainsForHub } from "@/lib/research/hubs";

const icons = { Network, Brain, Palette, Building2, Cpu, Heart, Compass };

export default function ResearchHubLead() {
  return (
    <section
      id="hubs"
      aria-labelledby="hubs-title"
      className="scroll-mt-24 border-b border-white/10 pb-16 md:pb-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.25em] text-emerald-300">
              Choose your field
            </p>
            <h2
              id="hubs-title"
              className="font-display text-2xl font-semibold tracking-tight md:text-3xl"
            >
              Seven research hubs.
            </h2>
          </div>
          <a
            href="#domains"
            className="rounded-full px-3 py-2 text-sm text-white/70 hover:text-white focus-visible:ring-2 focus-visible:ring-emerald-300"
          >
            Search every brief <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {researchHubs.map((hub, i) => {
            const Icon = icons[hub.icon as keyof typeof icons];
            return (
              <TrackedLink
                key={hub.slug}
                href={`/research/hubs/${hub.slug}`}
                eventName="research_hub_open"
                eventProperties={{ hub: hub.slug, placement: "research_index" }}
                className={`group relative overflow-hidden rounded-3xl border p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 sm:p-8 ${i < 2 ? "border-emerald-300/20 bg-emerald-300/[0.035] md:min-h-[280px]" : "border-white/10 bg-white/[0.015]"} ${i === 6 ? "md:col-span-2" : ""} transition-colors hover:border-emerald-300/50 hover:bg-emerald-300/[0.06]`}
              >
                <div className="mb-7 flex items-center justify-between">
                  <span className="flex items-center gap-3 text-xs text-white/60">
                    <Icon
                      aria-hidden="true"
                      className="h-5 w-5 text-emerald-300"
                    />
                    <span className="font-mono">0{i + 1}</span>
                    <span>
                      {domainsForHub(hub.category).length} research briefs
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-5 w-5 text-white/50 group-hover:text-emerald-300"
                  />
                </div>
                <p className="mb-2 text-xs text-emerald-200/80">
                  {hub.question}
                </p>
                <h3
                  className={`font-display font-semibold tracking-tight ${i < 2 ? "text-2xl md:text-3xl" : "text-xl"}`}
                >
                  {hub.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-6 text-white/65">
                  {hub.description}
                </p>
                {hub.slug === "frontier-ai" ? (
                  <div
                    className="mt-6 flex flex-wrap items-center gap-6"
                    aria-label="Research covering OpenAI, Anthropic and Google"
                  >
                    {["openai", "anthropic", "google"].map((brand) => (
                      <Image
                        key={brand}
                        src={`/images/brands/${brand}.svg`}
                        alt={
                          brand === "openai"
                            ? "OpenAI"
                            : brand === "anthropic"
                              ? "Anthropic"
                              : "Google"
                        }
                        width={90}
                        height={24}
                        className="h-5 w-auto max-w-[90px] object-contain opacity-80"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-white/55">
                    {hub.topics.map((topic) => (
                      <span key={topic}>{topic}</span>
                    ))}
                  </div>
                )}
              </TrackedLink>
            );
          })}
        </div>
      </div>
    </section>
  );
}
