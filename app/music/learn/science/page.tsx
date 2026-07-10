import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  AudioWaveform,
  Brain,
  CheckCircle2,
  ExternalLink,
  Gauge,
  Music2,
  ShieldAlert,
  Waves,
} from "lucide-react";

const SUPPORTED_LENSES = [
  {
    title: "Reward and anticipation",
    description:
      "Music can engage reward systems, and anticipation is part of the experience. That supports careful study of listening—not a promise that one track produces the same response in everyone.",
    icon: Brain,
  },
  {
    title: "Rhythm and movement",
    description:
      "People often synchronize movement to a pulse. Musicians use that observable relationship when they practice timing, ensemble playing, and coordination.",
    icon: AudioWaveform,
  },
  {
    title: "Practice and adaptation",
    description:
      "Focused, repeated practice can improve a specific skill. Progress still depends on the task, feedback, recovery, prior experience, and the learner—not a universal hour count.",
    icon: Gauge,
  },
];

const CLAIM_BOUNDARIES = [
  "A tuning reference such as A=432 Hz or A=440 Hz describes pitch; it does not by itself establish a health effect.",
  "Solfeggio labels such as “healing,” “fear release,” or “pineal activation” are cultural or marketing claims, not established clinical outcomes.",
  "Binaural-beat studies do not justify guaranteed sleep, focus, recovery, or treatment claims for a listener.",
  "Music therapy is a credentialed health profession. A playlist, composition, or learning page is not music therapy or medical care.",
];

const SOURCES = [
  {
    name: "NIH / NCCIH · Music and Health",
    href: "https://www.nccih.nih.gov/health/music-and-health-what-you-need-to-know",
    note: "Research overview, uncertainty, safety, and the distinction between music listening and music therapy.",
  },
  {
    name: "WHO · Safe listening",
    href: "https://www.who.int/news-room/questions-and-answers/item/deafness-and-hearing-loss-safe-listening",
    note: "Practical hearing-safety guidance for personal listening.",
  },
  {
    name: "ISO 16 · Standard musical pitch",
    href: "https://www.iso.org/standard/3601.html",
    note: "The current ISO reference for A=440 Hz as standard musical pitch.",
  },
  {
    name: "Salimpoor et al. · Music and dopamine",
    href: "https://pubmed.ncbi.nlm.nih.gov/21217764/",
    note: "A primary study on anticipation, peak emotion, and dopamine release while listening to music.",
  },
];

export default function MusicSciencePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <section className="relative isolate overflow-hidden border-b border-white/10 px-5 pb-20 pt-24 sm:px-8 sm:pb-28 sm:pt-32">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_15%,rgba(6,182,212,0.13),transparent_35%),radial-gradient(circle_at_20%_30%,rgba(99,102,241,0.12),transparent_32%)]" />
        <div className="mx-auto max-w-6xl">
          <Link
            href="/music/learn"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Music learning map
          </Link>
          <div className="mt-14 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-300">
                Sound · research · evidence
              </p>
              <h1 className="mt-5 max-w-4xl text-balance text-5xl font-semibold tracking-[-0.045em] sm:text-7xl">
                Hear the effect. Test the claim.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-300">
                Music changes what we notice, feel, and do. This page separates
                observable listening and practice effects from health claims
                that need stronger evidence.
              </p>
            </div>
            <aside className="rounded-[2rem] border border-cyan-400/20 bg-cyan-400/[0.06] p-6 sm:p-8">
              <ShieldAlert
                className="h-6 w-6 text-cyan-300"
                aria-hidden="true"
              />
              <h2 className="mt-5 text-lg font-semibold">Evidence boundary</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-300">
                This is an educational listening guide. It does not diagnose,
                treat, prevent, or cure a health condition, and it does not
                replace a qualified clinician or credentialed music therapist.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-300">
            A stronger starting point
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">
            Study relationships you can observe.
          </h2>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {SUPPORTED_LENSES.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="rounded-[1.6rem] border border-white/10 bg-zinc-950 p-6 sm:p-8"
              >
                <Icon className="h-5 w-5 text-emerald-300" aria-hidden="true" />
                <h3 className="mt-6 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-zinc-950 px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-300">
              Claims to hold lightly
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              A frequency is not a treatment.
            </h2>
            <p className="mt-5 text-sm leading-6 text-zinc-400">
              A listener may prefer a tuning, tempo, texture, or ritual. That
              preference is real as an experience. It does not prove a
              biological mechanism or a clinical result.
            </p>
          </div>
          <ul className="space-y-4">
            {CLAIM_BOUNDARIES.map((claim) => (
              <li
                key={claim}
                className="flex gap-4 rounded-2xl border border-white/10 bg-[#0a0a0b] p-5 text-sm leading-6 text-zinc-300"
              >
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-amber-300"
                  aria-hidden="true"
                />
                {claim}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 p-7 sm:p-9">
            <Waves className="h-6 w-6 text-indigo-300" aria-hidden="true" />
            <h2 className="mt-6 text-2xl font-semibold">
              Run a small listening test
            </h2>
            <ol className="mt-6 space-y-5 text-sm leading-6 text-zinc-400">
              <li>
                <span className="mr-3 font-mono text-indigo-300">01</span>Choose
                one question: timing, tension, focus, preference, or recall.
              </li>
              <li>
                <span className="mr-3 font-mono text-indigo-300">02</span>
                Compare two excerpts at a similar loudness and duration.
              </li>
              <li>
                <span className="mr-3 font-mono text-indigo-300">03</span>Write
                what you heard before reading a label or claim.
              </li>
              <li>
                <span className="mr-3 font-mono text-indigo-300">04</span>Repeat
                on another day. Treat a personal pattern as a clue, not a
                universal result.
              </li>
            </ol>
          </div>
          <div className="rounded-[2rem] border border-white/10 p-7 sm:p-9">
            <Music2 className="h-6 w-6 text-rose-300" aria-hidden="true" />
            <h2 className="mt-6 text-2xl font-semibold">
              Protect the instrument you cannot replace
            </h2>
            <p className="mt-5 text-sm leading-6 text-zinc-400">
              Hearing risk rises with loudness and exposure time. Keep personal
              listening comfortable, take breaks, use hearing protection around
              loud sound, and follow current public-health guidance when in
              doubt.
            </p>
            <a
              href="https://www.who.int/news-room/questions-and-answers/item/deafness-and-hearing-loss-safe-listening"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              Read WHO safe-listening guidance
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">
            Sources and further reading
          </p>
          <h2 className="mt-4 text-3xl font-semibold">
            Check the source, then check its limits.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {SOURCES.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-[1.4rem] border border-white/10 bg-zinc-950 p-6 transition hover:border-cyan-300/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-semibold text-white">{source.name}</h3>
                  <ExternalLink
                    className="h-4 w-4 shrink-0 text-zinc-500 group-hover:text-cyan-300"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {source.note}
                </p>
              </a>
            ))}
          </div>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/music/learn/theory"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              Continue with music theory
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/music/learn"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-zinc-200 transition hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              Return to the learning map
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
