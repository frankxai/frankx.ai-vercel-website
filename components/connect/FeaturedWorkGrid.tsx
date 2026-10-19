"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { trackEvent } from "@/lib/analytics";

const work = [
  {
    id: "architecture-field-guide",
    index: "A",
    title: "The AI architecture field guide",
    description:
      "A source-led map of patterns, decisions, tradeoffs, and production constraints.",
    proof: "Systems judgment",
    href: "/ai-architecture",
  },
  {
    id: "agent-catalog",
    index: "B",
    title: "The 99-agent operating catalog",
    description:
      "Roles, packs, and ship status from the specialist system running behind the work.",
    proof: "Operating leverage",
    href: "/agents?from=connect",
  },
  {
    id: "music-practice",
    index: "C",
    title: "The 12,000-experiment music practice",
    description:
      "A long-running record of iteration, selection, and creative direction with generative tools.",
    proof: "Creative endurance",
    href: "/music",
  },
  {
    id: "essays",
    index: "D",
    title: "Research and build notes",
    description:
      "Essays that expose the sources, mechanisms, and consequences behind the conclusions.",
    proof: "Public reasoning",
    href: "/blog",
  },
] as const;

export function FeaturedWorkGrid() {
  return (
    <div className="divide-y divide-[#171915]/20">
      {work.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          onClick={() =>
            trackEvent("connect_featured_clicked", {
              target: item.id,
              destination: item.href,
            })
          }
          className="group grid gap-4 py-7 outline-none transition-colors hover:bg-[#f3efe6]/70 focus-visible:bg-[#f3efe6] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2157d5] sm:grid-cols-[52px_minmax(0,1.25fr)_minmax(220px,0.75fr)_auto] sm:items-center sm:px-4 sm:py-8"
        >
          <span className="font-mono text-xs text-[#2157d5]">{item.index}</span>
          <span className="text-xl font-medium tracking-[-0.025em] text-[#171915] sm:text-2xl">
            {item.title}
          </span>
          <span className="max-w-lg text-sm leading-6 text-[#5a5e55]">
            {item.description}
            <span className="mt-2 block text-xs font-semibold text-[#373b34]">
              Evidence of: {item.proof}
            </span>
          </span>
          <ArrowUpRight
            className="h-5 w-5 text-[#2157d5] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
            aria-hidden
          />
        </Link>
      ))}
    </div>
  );
}
