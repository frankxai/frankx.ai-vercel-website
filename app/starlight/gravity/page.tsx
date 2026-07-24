import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Gift,
  Layers3,
  Lock,
  Radio,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const REPO = "https://github.com/frankxai/starlight-gravity-engine";

export const metadata: Metadata = {
  title: "Starlight Gravity Engine — Engineer Your Gravity | FrankX",
  description:
    "A local-first, human-and-agentic operating system that turns meaningful encounters into shared intelligence, useful artifacts, trusted relationships, and rooms people want to return to. Built on SIP.",
  alternates: { canonical: "/starlight/gravity" },
  openGraph: {
    title: "Starlight Gravity Engine — Engineer Your Gravity",
    description:
      "Human engineering creates gravity. Agentic engineering makes it compound. Gravity = Direction × Signal × Contribution × Convening × Reliability.",
    url: "/starlight/gravity",
    type: "website",
  },
};

const FORCES = [
  {
    name: "Direction",
    icon: Compass,
    q: "Are you moving somewhere worth joining?",
    detail: "People can join a vector, never a fog.",
  },
  {
    name: "Signal",
    icon: Radio,
    q: "Are you capturing what you notice?",
    detail: "Attention that evaporates compounds nothing.",
  },
  {
    name: "Contribution",
    icon: Gift,
    q: "Do you give before you ask?",
    detail: "Generosity is the only durable form of reach.",
  },
  {
    name: "Convening",
    icon: Users,
    q: "Do you bring people together?",
    detail: "A host creates a field a mere attendee never will.",
  },
  {
    name: "Reliability",
    icon: ShieldCheck,
    q: "Do your promises come true?",
    detail: "Trust is the interest rate on every relationship.",
  },
] as const;

const DIVISION = [
  {
    heading: "Agents increase",
    tone: "text-tech-light",
    items: ["Memory", "Consistency", "Preparation", "Transformation", "Cycle frequency"],
  },
  {
    heading: "Agents never manufacture",
    tone: "text-white",
    items: ["Judgment", "Presence", "Generosity", "Trust", "Relationship intent", "Human identity"],
  },
] as const;

const LOOPS = [
  {
    n: "01",
    name: "Signal → Artifact",
    detail: "encounter → capture → extract → build → publish → response",
  },
  {
    n: "02",
    name: "Room → Network",
    detail: "thesis → curate → host → synthesize → continue",
  },
  {
    n: "03",
    name: "Relationship → Contribution",
    detail: "remember → appreciate → introduce → contribute → fulfil → recalibrate",
  },
  {
    n: "04",
    name: "Learning → Evolution",
    detail: "observe → evaluate → refine → strengthen the field",
  },
] as const;

const SOVEREIGNTY = [
  {
    icon: Lock,
    title: "Private by default",
    detail:
      "Every captured record is private until you decide otherwise. Publication is a separate, explicit human act.",
  },
  {
    icon: ShieldCheck,
    title: "No impersonation, no rankings",
    detail:
      "Agents never write or send as you without approval. The person record has no score field — it is structurally impossible to add one.",
  },
  {
    icon: Layers3,
    title: "Yours to keep or leave",
    detail:
      "Local-first storage, zero cloud account, export and delete first-class. The bytes are yours.",
  },
] as const;

export default function StarlightGravityPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-void text-white">
      {/* Hero */}
      <section className="relative border-b border-white/10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-tech-light/70 to-transparent"
        />
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28 lg:px-8 lg:py-36">
          <div className="max-w-4xl">
            <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-space px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-white/60">
              <Sparkles className="h-3.5 w-3.5 text-tech-light" aria-hidden="true" />
              Starlight · Gravity Engine
            </p>
            <p className="mb-5 text-sm font-medium text-tech-light">
              Human engineering creates gravity. Agentic engineering makes it compound.
            </p>
            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.04] tracking-[-0.035em] text-white sm:text-6xl lg:text-7xl">
              Engineer your gravity.
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/70 sm:text-xl">
              A local-first, human-and-agentic operating system that turns meaningful encounters into
              shared intelligence, useful artifacts, trusted relationships, and rooms people want to
              return to.
            </p>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/55">
              The next personal operating system will not merely manage tasks. It will compound the
              ideas, relationships, rooms and opportunities surrounding a human.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href={REPO}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-tech-light px-6 py-3 text-sm font-semibold text-void transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
              >
                Get the engine on GitHub
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/journal/starlight-gravity-engine"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/80 transition hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech-light"
              >
                Read the founder essay
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Five forces */}
      <section className="border-b border-white/10 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-tech-light/80">
              The mechanism
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Five forces of human gravity
            </h2>
            <p className="mt-5 font-mono text-sm text-white/60 sm:text-base">
              Gravity = Direction × Signal × Contribution × Convening × Reliability
            </p>
            <p className="mt-4 text-base leading-relaxed text-white/60">
              It is a product, not a sum. A zero in any force collapses the whole. You raise gravity
              by raising your weakest force — not by maxing your strongest.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FORCES.map((force) => (
              <div
                key={force.name}
                className="rounded-2xl border border-white/10 bg-space p-6 transition hover:border-white/20"
              >
                <force.icon className="h-5 w-5 text-tech-light" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-semibold text-white">{force.name}</h3>
                <p className="mt-2 text-sm text-white/70">{force.q}</p>
                <p className="mt-2 text-sm leading-6 text-white/45">{force.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Human / agent division */}
      <section className="border-b border-white/10 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-tech-light/80">
              The division of responsibility
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              The agent removes friction. It never fakes the act.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {DIVISION.map((col) => (
              <div key={col.heading} className="rounded-2xl border border-white/10 bg-space p-8">
                <h3 className={`text-sm font-semibold uppercase tracking-[0.18em] ${col.tone}`}>
                  {col.heading}
                </h3>
                <ul className="mt-5 space-y-3">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-white/75">
                      <span className="h-1.5 w-1.5 rounded-full bg-tech-light/70" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-6 text-white/45">
            The line is enforced in code, not just promised in prose: speculation is refused at
            capture, publication is gated behind explicit approval, and consent is structural.
          </p>
        </div>
      </section>

      {/* Four loops */}
      <section className="border-b border-white/10 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-tech-light/80">
              How it compounds
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Four compounding loops
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {LOOPS.map((loop) => (
              <div key={loop.n} className="rounded-2xl border border-white/10 bg-space p-6">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-sm text-tech-light/80">{loop.n}</span>
                  <h3 className="text-lg font-semibold text-white">{loop.name}</h3>
                </div>
                <p className="mt-3 font-mono text-xs leading-6 text-white/50">{loop.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sovereignty */}
      <section className="border-b border-white/10 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-tech-light/80">
              Privacy &amp; non-impersonation
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Sovereignty is the default, not a setting.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {SOVEREIGNTY.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-space p-6">
                <item.icon className="h-5 w-5 text-tech-light" aria-hidden="true" />
                <h3 className="mt-4 text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/60">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compose with the stack */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-space p-8 sm:p-12">
            <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              A standalone vertical, built on SIP.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/65">
              The Gravity Engine composes with — but never requires — the rest of the Starlight
              stack. Every published artifact carries a “Built on SIP” attestation.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Link
                href="/starlight-intelligence-system"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/80 transition hover:border-white/30 hover:text-white"
              >
                Starlight Intelligence System
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/mvu"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/80 transition hover:border-white/30 hover:text-white"
              >
                Most Valuable Unlock
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/journal/starlight-gravity-engine"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/80 transition hover:border-white/30 hover:text-white"
              >
                The founder essay
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
