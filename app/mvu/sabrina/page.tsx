import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Database,
  GitBranch,
  Layers3,
  Sparkles,
} from "lucide-react";

const PROOF_STACK = [
  {
    name: "Creator Intelligence System",
    eyebrow: "Own the intelligence",
    description:
      "A six-layer, open-source substrate for research, strategy, production, distribution, and learning. The creator keeps the audience model, voice, history, and performance data.",
    href: "https://github.com/frankxai/creator-intelligence-system",
    icon: Database,
  },
  {
    name: "Agentic Creator OS",
    eyebrow: "Execute the work",
    description:
      "The reusable execution layer: skills, workflows, specialist agents, and safety hooks for Claude Code, Codex, Cursor, Gemini, and other coding agents.",
    href: "https://github.com/frankxai/agentic-creator-os",
    icon: Layers3,
  },
  {
    name: "Starlight Intelligence System",
    eyebrow: "Keep the memory",
    description:
      "One sovereign memory and governance substrate across the agent fleet, so decisions, source material, and learned patterns survive individual tools and sessions.",
    href: "https://github.com/frankxai/Starlight-Intelligence-System",
    icon: BrainCircuit,
  },
  {
    name: "Starlight Agent Skills",
    eyebrow: "Package the capability",
    description:
      "Portable SKILL.md capability packs with manifests, examples, tests, and adapters. A useful method becomes something an author and their agents can repeatedly run.",
    href: "https://github.com/frankxai/starlight-agent-skills",
    icon: GitBranch,
  },
] as const;

const PILOT = [
  {
    label: "01 · Listen",
    title: "Capture the irreplaceable human signal.",
    detail:
      "Founder stories, judgment, language, beliefs, offers, and audience responses become a source-grounded signal set — not a synthetic persona.",
  },
  {
    label: "02 · Model",
    title: "Model it without averaging it.",
    detail:
      "Map the founder’s voice, proof, mechanisms, boundaries, audience tensions, and contradictions into a creator-owned authority graph.",
  },
  {
    label: "03 · Activate",
    title: "Activate it with explicit boundaries.",
    detail:
      "Build the webinar thesis, email sequence, content constellation, and distribution brief from one governed source — with human approval before publication.",
  },
  {
    label: "04 · Compound",
    title: "Learn without identity drift.",
    detail:
      "Questions, replies, conversions, and objections improve the system while the founder’s core signal remains stable and attributable.",
  },
] as const;

const OVERLAP = [
  {
    number: "01",
    title: "You find what makes the founder irreplaceable.",
    body: "Human story, judgment, audience language, emotional cues, offer framing, webinar psychology, and the sequence that builds trust.",
  },
  {
    number: "02",
    title: "My systems preserve it across the agent fleet.",
    body: "Sovereign memory, authority graphs, portable skills, governed workflows, and the engineering required to keep the human signal intact.",
  },
  {
    number: "03",
    title: "The result is leverage without identity drift.",
    body: "Every conversation strengthens the message. Every campaign strengthens the model. The founder keeps ownership of the resulting intelligence.",
  },
] as const;

// This recipient-specific brief has no runtime data or client state.
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "For Sabrina — Impossibly Human, Compounding | FrankX",
  description:
    "An unlisted working concept connecting Impossibly Human founder authority with the FrankX creator intelligence stack.",
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

        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28 lg:px-8 lg:py-36">
          <div className="max-w-4xl">
            <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-space px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-white/60">
              <Sparkles
                className="h-3.5 w-3.5 text-tech-light"
                aria-hidden="true"
              />
              Mindvalley University · Tallinn 2026
            </p>

            <p className="mb-5 text-sm font-medium text-tech-light">
              Sabrina —
            </p>
            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.04] tracking-[-0.035em] text-white sm:text-6xl lg:text-7xl">
              The moat is human. The system should make that humanity compound.
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/70 sm:text-xl">
              Your Impossibly Human thesis and the live build solve the hardest
              side: finding a founder&apos;s real signal and turning it into
              trusted authority. I&apos;ve been building the sovereign memory,
              skills, and governance layer that can preserve that signal across
              campaigns and agents without flattening it into generic AI output.
            </p>

            <p className="mt-6 max-w-3xl text-sm leading-6 text-white/45">
              I read your public framing after the session:{" "}
              <a
                href="https://sabrinastocker.com/"
                target="_blank"
                rel="noreferrer"
                className="text-white/70 underline decoration-white/20 underline-offset-4 transition hover:text-tech-light"
              >
                the founder is the brand
              </a>
              . This is infrastructure beneath that boundary, not a replacement
              for it.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="#pilot"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-tech-light px-6 py-3 text-sm font-semibold text-void transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
              >
                See the pilot
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="#proof"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/80 transition hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
              >
                Inspect the open stack
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-tech-light/80">
              The overlap
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              From founder authority to founder-owned intelligence.
            </h2>
          </div>

          <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 lg:grid-cols-3">
            {OVERLAP.map((item) => (
              <article key={item.number} className="bg-void p-8 sm:p-10">
                <p className="font-mono text-xs text-tech-light/70">
                  {item.number}
                </p>
                <h3 className="mt-8 text-xl font-semibold tracking-tight text-white">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/60">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="pilot"
        className="scroll-mt-24 border-b border-white/10 py-20 lg:py-28"
      >
        <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-tech-light/80">
              A precise test
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              One founder. One live offer. One system that stays human.
            </h2>
            <p className="mt-6 text-base leading-7 text-white/60">
              Select one Impossibly Human founder whose body of work is
              substantial but fragmented. Build a private, creator-owned
              intelligence substrate underneath one real authority campaign,
              with consent and human approval at every publishing boundary.
            </p>
            <div className="mt-8 rounded-2xl border border-tech-light/20 bg-tech-light/5 p-6">
              <p className="text-sm font-medium text-white">
                The deliverable is not more AI content.
              </p>
              <p className="mt-2 text-sm leading-6 text-white/60">
                It is a controlled source of truth for voice, story, audience,
                proof, offer, and performance — including what can be delegated
                and what must remain human.
              </p>
            </div>
          </div>

          <ol className="divide-y divide-white/10 border-y border-white/10">
            {PILOT.map((step) => (
              <li
                key={step.label}
                className="grid gap-4 py-7 sm:grid-cols-[8rem_1fr] sm:py-8"
              >
                <p className="font-mono text-xs uppercase tracking-wider text-tech-light/70">
                  {step.label}
                </p>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/60">
                    {step.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="proof"
        className="scroll-mt-24 border-b border-white/10 py-20 lg:py-28"
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-tech-light/80">
              Open proof stack
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              The infrastructure already exists.
            </h2>
            <p className="mt-5 text-base leading-7 text-white/60">
              These are public repositories, not presentationware. Each can be
              inspected, forked, or run without a conversation with me.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {PROOF_STACK.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-3xl border border-white/10 bg-space p-7 transition hover:-translate-y-0.5 hover:border-tech-light/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light sm:p-8"
                >
                  <div className="flex items-start justify-between gap-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-void text-tech-light">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <ArrowUpRight
                      className="h-5 w-5 text-white/30 transition group-hover:text-tech-light"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-8 text-[11px] font-medium uppercase tracking-[0.2em] text-tech-light/70">
                    {item.eyebrow}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">
                    {item.name}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-white/60">
                    {item.description}
                  </p>
                </a>
              );
            })}
          </div>

          <p className="mt-8 text-sm leading-6 text-white/45">
            The architecture is governed by the public{" "}
            <a
              href="https://github.com/frankxai/agentic-operating-system-standard"
              target="_blank"
              rel="noreferrer"
              className="text-white/70 underline decoration-white/20 underline-offset-4 transition hover:text-tech-light"
            >
              Agentic Operating System Standard
            </a>
            : portable modules, explicit approval gates, evidence, and
            creator-owned state.
          </p>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-tech-light/80">
            The next move
          </p>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            See whether this architecture earns a place beneath Impossibly
            Human.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/60">
            Thirty minutes is enough to inspect the overlap, choose one real
            founder for a pilot, or close the idea cleanly.
          </p>
          <Link
            href="/connect?ref=mvu-sabrina"
            className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-tech-light px-7 py-3.5 text-sm font-semibold text-void transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
          >
            Continue this in Tallinn
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
