import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";

const EYEBROW = "text-[11px] uppercase tracking-[0.25em] text-white/60";

const PROOF_STACK = [
  {
    name: "Creator Intelligence System",
    description:
      "A six-layer, open-source substrate for research, strategy, production, distribution, and learning. The creator keeps the audience model, voice, history, and performance data.",
    href: "https://github.com/frankxai/creator-intelligence-system",
  },
  {
    name: "Agentic Creator OS",
    description:
      "The reusable execution layer: skills, workflows, specialist agents, and safety hooks for Claude Code, Codex, Cursor, Gemini, and other coding agents.",
    href: "https://github.com/frankxai/agentic-creator-os",
  },
  {
    name: "Starlight Intelligence System",
    description:
      "One sovereign memory and governance substrate across the agent fleet, so decisions, source material, and learned patterns survive individual tools and sessions.",
    href: "https://github.com/frankxai/Starlight-Intelligence-System",
  },
  {
    name: "Starlight Agent Skills",
    description:
      "Portable capability packs with manifests, examples, tests, and adapters. A useful method becomes something an author and their agents can repeatedly run.",
    href: "https://github.com/frankxai/starlight-agent-skills",
  },
] as const;

const OVERLAP = [
  {
    title: "You find what makes the founder irreplaceable.",
    body: "Human story, judgment, audience language, emotional cues, offer framing, webinar psychology, and the sequence that builds trust.",
  },
  {
    title: "My systems preserve it across the agent fleet.",
    body: "Sovereign memory, authority graphs, portable skills, governed workflows, and the engineering required to keep the human signal intact.",
  },
  {
    title: "The result is leverage without identity drift.",
    body: "Every conversation strengthens the message. Every campaign strengthens the model. The founder keeps ownership of the resulting intelligence.",
  },
] as const;

const PAGE_URL = "https://www.frankx.ai/mvu/sabrina";
const PAGE_TITLE = "For Sabrina — Impossibly Human, Compounding";
const PAGE_DESCRIPTION =
  "An unlisted working concept connecting Impossibly Human founder authority with the FrankX creator intelligence stack.";
const PAGE_IMAGE = "https://www.frankx.ai/hero-homepage.png";

// This recipient-specific brief has no runtime data or client state.
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: "FrankX",
    type: "website",
    images: [
      {
        url: PAGE_IMAGE,
        width: 1200,
        height: 630,
        alt: "FrankX creator intelligence systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [PAGE_IMAGE],
  },
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    googleBot: {
      index: false,
      follow: false,
      noarchive: true,
      nosnippet: true,
    },
  },
};

export default function SabrinaMvuPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-void text-white">
      <section className="relative border-b border-white/10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-tech-light/70 to-transparent"
        />

        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="max-w-4xl">
            <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-space px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-white/60">
              <Sparkles
                className="h-3.5 w-3.5 text-tech-light"
                aria-hidden="true"
              />
              Mindvalley University · Tallinn 2026
            </p>

            <p className="mb-5 text-sm font-medium text-tech-light">Sabrina,</p>
            <h1 className="max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl">
              The moat is human. The system should make that humanity compound.
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/70">
              Your Impossibly Human thesis and the live build solve the hardest
              side: finding a founder&apos;s real signal and turning it into
              trusted authority. I have been building the sovereign memory,
              skills, and governance layer that preserves that signal across
              campaigns and agents without flattening it into generic AI output.
            </p>

            <p className="mt-6 max-w-3xl text-[15px] leading-7 text-white/50">
              I read your public framing after the session:{" "}
              <a
                href="https://sabrinastocker.com/"
                target="_blank"
                rel="noreferrer"
                className="text-white/75 underline decoration-white/20 underline-offset-4 transition hover:text-tech-light"
              >
                the founder is the brand
              </a>
              . This is infrastructure beneath that boundary, not a replacement
              for it.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/founder-signal"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-tech-light px-6 py-3.5 text-sm font-semibold text-void transition hover:bg-white active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
              >
                See what I shipped for the challenge
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="#proof"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium text-white/80 transition hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
              >
                Inspect the open stack
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          <p className={`${EYEBROW} mb-5`}>The entry</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            You set a seven day launch challenge. This is mine.
          </h2>
          <p className="mt-7 text-lg leading-8 text-white/65">
            Rather than write about the idea, I built and shipped it. Founder
            Signal OS is a creator-owned intelligence layer for exactly the
            problem your thesis names, and it opens with a free diagnostic anyone
            can run in about two minutes without handing over an email address.
          </p>
          <p className="mt-5 text-lg leading-8 text-white/65">
            The scan scores four dimensions of founder signal and names the one
            an AI stack will erase first. The scoring model is published in the
            open, so you can disagree with it precisely.
          </p>
          <Link
            href="/founder-signal#scan"
            className="mt-8 inline-flex items-center gap-2 text-base font-medium text-tech-light transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
          >
            Run the Founder Signal Scan
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="border-b border-white/10 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <p className={`${EYEBROW} mb-5`}>The overlap</p>
          <h2 className="max-w-2xl font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            From founder authority to founder-owned intelligence.
          </h2>

          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 lg:grid-cols-3">
            {OVERLAP.map((item) => (
              <article key={item.title} className="bg-void p-8 sm:p-10">
                <h3 className="font-display text-xl font-semibold leading-snug tracking-tight text-white">
                  {item.title}
                </h3>
                <p className="mt-4 text-[15px] leading-7 text-white/60">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="proof"
        className="scroll-mt-24 border-b border-white/10 py-24 lg:py-32"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <p className={`${EYEBROW} mb-5`}>Open proof stack</p>
          <h2 className="max-w-2xl font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            The infrastructure already exists.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/60">
            These are public repositories, not presentationware. Each can be
            inspected, forked, or run without a conversation with me.
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {PROOF_STACK.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col rounded-3xl border border-white/10 bg-space p-7 transition hover:-translate-y-0.5 hover:border-tech-light/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light sm:p-8"
              >
                <div className="flex items-start justify-between gap-5">
                  <h3 className="font-display text-xl font-semibold tracking-tight text-white">
                    {item.name}
                  </h3>
                  <ArrowUpRight
                    className="mt-1 h-5 w-5 shrink-0 text-white/30 transition group-hover:text-tech-light"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-4 text-[15px] leading-7 text-white/60">
                  {item.description}
                </p>
              </a>
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-[15px] leading-7 text-white/50">
            The architecture is governed by the public{" "}
            <a
              href="https://github.com/frankxai/agentic-operating-system-standard"
              target="_blank"
              rel="noreferrer"
              className="text-white/75 underline decoration-white/20 underline-offset-4 transition hover:text-tech-light"
            >
              Agentic Operating System Standard
            </a>
            : portable modules, explicit approval gates, evidence, and
            creator-owned state.
          </p>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            See whether this architecture earns a place beneath Impossibly
            Human.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/60">
            Thirty minutes is enough to inspect the overlap, choose one real
            founder for a pilot, or close the idea cleanly after Tallinn.
          </p>
          <Link
            href="/connect?ref=mvu-sabrina"
            className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-tech-light px-7 py-3.5 text-sm font-semibold text-void transition hover:bg-white active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
          >
            Continue the architecture
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          <p className="mt-14 text-xs leading-5 text-white/35">
            An independent FrankX working concept after a Mindvalley University
            session. Not organized, sponsored, or endorsed by Mindvalley.
            Unlisted and excluded from search indexing.
          </p>
        </div>
      </section>
    </main>
  );
}
