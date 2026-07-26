import Link from "next/link";
import {
  ArrowRight,
  AudioLines,
  BookOpenText,
  Brain,
  Check,
  CircleHelp,
  FileMusic,
  Guitar,
  Headphones,
  KeyboardMusic,
  Library,
  LockKeyhole,
  Music2,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type LearningRoute = {
  href: string;
  title: string;
  description: string;
  language: string;
  outcome: string;
  icon: LucideIcon;
};

const ROUTE_GROUPS: Array<{
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  routes: LearningRoute[];
}> = [
  {
    id: "fundamentals",
    eyebrow: "01 · Understand",
    title: "Build the musical map",
    description:
      "Learn the notation and relationships that make every instrument easier to understand.",
    routes: [
      {
        href: "/music/learn/theory",
        title: "Music theory",
        description:
          "Notes, intervals, scales, chords, keys, rhythm, and practical progressions.",
        language: "English",
        outcome: "Explain and build a chord progression",
        icon: AudioLines,
      },
      {
        href: "/music/learn/reading",
        title: "Read notation",
        description:
          "Staffs, clefs, note values, rests, time signatures, dynamics, and symbols.",
        language: "English",
        outcome: "Read a short score without guessing",
        icon: FileMusic,
      },
    ],
  },
  {
    id: "practice",
    eyebrow: "02 · Practice",
    title: "Put the map under your hands",
    description:
      "Choose one instrument and use the route as a practice companion—not a certification course.",
    routes: [
      {
        href: "/music/learn/piano",
        title: "Piano / Klavier",
        description:
          "A German-first starter with an interactive keyboard, first songs, and practice prompts.",
        language: "Deutsch · family-friendly",
        outcome: "Play and name a first pattern",
        icon: KeyboardMusic,
      },
      {
        href: "/music/learn/violin",
        title: "Violin / Geige",
        description:
          "A German-first orientation to posture, strings, first pieces, and deliberate practice.",
        language: "Deutsch · family-friendly",
        outcome: "Set up a safe first practice block",
        icon: Music2,
      },
      {
        href: "/music/learn/guitar",
        title: "Guitar",
        description:
          "Open chords, strumming, song selection, practice structure, and external resources.",
        language: "English",
        outcome: "Move between a first chord set",
        icon: Guitar,
      },
    ],
  },
  {
    id: "studio",
    eyebrow: "03 · Make",
    title: "Turn musical decisions into an artifact",
    description:
      "Follow the chain from arrangement to production while keeping evidence and rights in view.",
    routes: [
      {
        href: "/music/learn/production",
        title: "Music production",
        description:
          "DAW orientation, recording, arrangement, mixing, mastering, and a realistic first setup.",
        language: "English",
        outcome: "Finish a small, clearly labeled demo",
        icon: SlidersHorizontal,
      },
      {
        href: "/music/learn/orchestration",
        title: "Orchestration",
        description:
          "Instrument families, voicing, texture, balance, score study, and arrangement choices.",
        language: "English",
        outcome: "Sketch an eight-bar arrangement",
        icon: Library,
      },
      {
        href: "/music/learn/science",
        title: "Music, sound, and evidence",
        description:
          "What research supports, what remains uncertain, and how to test listening claims carefully.",
        language: "English",
        outcome: "Separate an observation from a health claim",
        icon: Brain,
      },
    ],
  },
];

const PROOF_POINTS = [
  "Eight live learning routes",
  "No account, email, or upload required",
  "English core with two German-first instrument starters",
];

export default function LearnMusicPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <section className="relative isolate overflow-hidden border-b border-white/10 px-5 pb-20 pt-24 sm:px-8 sm:pb-28 sm:pt-32">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.14),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(6,182,212,0.1),transparent_28%)]" />
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-emerald-300">
              FrankX Music · Open learning
            </p>
            <h1 className="mt-6 max-w-4xl text-balance text-5xl font-semibold tracking-[-0.045em] text-white sm:text-7xl">
              Learn the craft. Build your own practice.
            </h1>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-zinc-300 sm:text-xl">
              A free, self-paced map for musicians and curious makers:
              understand the system, practice one instrument, then finish a
              small piece of work. This is an editorial learning library—not a
              school, certification, or paid program.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/music/learn/theory"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
              >
                Start with music theory
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href="#paths"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-zinc-200 transition hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                Choose another path
              </a>
            </div>
          </div>

          <aside
            className="rounded-[2rem] border border-white/10 bg-zinc-950/80 p-6 sm:p-8"
            aria-label="Learning library proof"
          >
            <div className="flex items-center gap-3 text-emerald-300">
              <BookOpenText className="h-5 w-5" aria-hidden="true" />
              <p className="font-mono text-xs uppercase tracking-[0.2em]">
                What is live now
              </p>
            </div>
            <ul className="mt-6 space-y-4">
              {PROOF_POINTS.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 text-sm leading-6 text-zinc-300"
                >
                  <Check
                    className="mt-1 h-4 w-4 shrink-0 text-emerald-400"
                    aria-hidden="true"
                  />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-7 border-t border-white/10 pt-6">
              <p className="text-sm font-medium text-white">
                A useful first session
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Pick one route. Spend 20 focused minutes. Save one note or
                recording on your own device. Decide the next smallest practice
                step.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section id="paths" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-300">
              The learning sequence
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Three moves. One artifact at a time.
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-400">
              You do not need to complete every route. Enter where the current
              work is unclear, then leave with one observable result.
            </p>
          </div>

          <div className="mt-14 space-y-16">
            {ROUTE_GROUPS.map((group) => (
              <section key={group.id} aria-labelledby={`${group.id}-title`}>
                <div className="grid gap-7 border-t border-white/10 pt-8 lg:grid-cols-[0.65fr_1.35fr]">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-emerald-300">
                      {group.eyebrow}
                    </p>
                    <h3
                      id={`${group.id}-title`}
                      className="mt-3 text-2xl font-semibold text-white"
                    >
                      {group.title}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-6 text-zinc-400">
                      {group.description}
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {group.routes.map((route) => {
                      const Icon = route.icon;
                      return (
                        <Link
                          key={route.href}
                          href={route.href}
                          className="group flex min-h-64 flex-col rounded-[1.6rem] border border-white/10 bg-zinc-900/60 p-6 transition hover:-translate-y-[0.5px] hover:border-emerald-400/40 hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <span className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-emerald-300">
                              <Icon className="h-5 w-5" aria-hidden="true" />
                            </span>
                            <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-medium text-zinc-400">
                              {route.language}
                            </span>
                          </div>
                          <h4 className="mt-6 text-xl font-semibold text-white">
                            {route.title}
                          </h4>
                          <p className="mt-3 text-sm leading-6 text-zinc-400">
                            {route.description}
                          </p>
                          <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                            <p className="text-xs leading-5 text-zinc-500">
                              Outcome: {route.outcome}
                            </p>
                            <ArrowRight
                              className="h-4 w-4 shrink-0 text-zinc-500 transition group-hover:translate-x-1 group-hover:text-emerald-300"
                              aria-hidden="true"
                            />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-zinc-950 px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
          <BoundaryCard
            icon={LockKeyhole}
            title="Private by default"
            text="The FrankX learning hub does not ask for a name, email, account, recording, or upload. External tools and videos have their own privacy terms."
          />
          <BoundaryCard
            icon={CircleHelp}
            title="Adult-led for minors"
            text="Independent adults are the primary audience. Younger learners should use these pages with a parent, guardian, or teacher and should not share personal information with external services."
          />
          <BoundaryCard
            icon={Headphones}
            title="Rights stay with the maker"
            text="Use public-domain or properly licensed scores, samples, and recordings. Check the license before uploading, distributing, or using work commercially. Tool mentions are editorial, not endorsements."
          />
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 rounded-[2rem] border border-emerald-400/20 bg-emerald-400/[0.06] p-8 sm:p-10 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-emerald-300">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              <p className="font-mono text-xs uppercase tracking-[0.18em]">
                Next decision
              </p>
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
              Start where you can produce evidence today.
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              A named chord, a clean transition, an eight-bar sketch, or a
              written listening observation is enough. Progress becomes credible
              when you can hear, play, or show it.
            </p>
          </div>
          <Link
            href="/music"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
          >
            Explore FrankX Music
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}

function BoundaryCard({
  icon: Icon,
  title,
  text,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-[1.6rem] border border-white/10 bg-[#0a0a0b] p-6">
      <Icon className="h-5 w-5 text-cyan-300" aria-hidden="true" />
      <h2 className="mt-5 text-lg font-semibold text-white">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-zinc-400">{text}</p>
    </article>
  );
}
