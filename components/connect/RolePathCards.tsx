"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { trackEvent } from "@/lib/analytics";

const paths = [
  {
    id: "architecture",
    number: "01",
    title: "You need an AI system that survives contact with the organisation.",
    description:
      "Start with the architecture field guide: decisions, constraints, evaluation, and operating boundaries.",
    action: "Inspect the architecture",
    href: "/ai-architecture",
  },
  {
    id: "partner",
    number: "02",
    title: "You see a serious partner opportunity.",
    description:
      "Review documented proposals, platform alignment, and the exact relationship status behind each claim.",
    action: "See how I partner",
    href: "/partnerships",
  },
  {
    id: "research",
    number: "03",
    title: "You want to understand the thinking before we talk.",
    description:
      "Read source-led essays and build notes on agents, AI architecture, and applied creative systems.",
    action: "Read the field notes",
    href: "/blog",
  },
] as const;

export function RolePathCards() {
  return (
    <div className="border-t border-[#171915]">
      {paths.map((path) => (
        <Link
          key={path.id}
          href={path.href}
          onClick={() =>
            trackEvent("connect_path_clicked", {
              path: path.id,
              destination: path.href,
            })
          }
          className="group grid gap-5 border-b border-[#171915]/30 py-7 outline-none transition-colors hover:bg-[#ebe3d4] focus-visible:bg-[#ebe3d4] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2157d5] sm:grid-cols-[52px_minmax(0,1fr)_180px] sm:items-start sm:gap-6 sm:px-4 sm:py-8"
        >
          <span className="font-mono text-xs text-[#2157d5]">
            {path.number}
          </span>
          <span>
            <span className="block max-w-2xl text-xl font-medium leading-7 tracking-[-0.025em] text-[#171915] sm:text-2xl sm:leading-8">
              {path.title}
            </span>
            <span className="mt-3 block max-w-2xl text-sm leading-6 text-[#5a5e55] sm:text-base sm:leading-7">
              {path.description}
            </span>
          </span>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#171915] sm:justify-self-end">
            {path.action}
            <ArrowUpRight
              className="h-4 w-4 text-[#2157d5] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
              aria-hidden
            />
          </span>
        </Link>
      ))}
    </div>
  );
}
