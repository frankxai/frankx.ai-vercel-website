import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  Heart,
  MessageCircle,
  Mic,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Estefania Badra | Friends",
  description:
    "A public friend profile for Estefania Badra, founder of TheEpicWays and leadership, communication, training, and event experiences.",
  path: "/friends/estefania",
});

const profileSignals = [
  {
    icon: MessageCircle,
    title: "Communication That Lands",
    copy: "She works in the exact place founders and managers often avoid: saying the hard thing clearly, calmly, and at the right time.",
  },
  {
    icon: Users,
    title: "Rooms With Energy",
    copy: "TheEpicWays is built around the live room: workshops, events, interviews, and spaces where people feel seen and moved to act.",
  },
  {
    icon: Brain,
    title: "Modern Leadership",
    copy: "Her range touches mindset, performance, emotional intelligence, technology, and practical people development.",
  },
];

const friendNotes = [
  "Use her existing language: human potential, leadership, communication, energy, courage, and community.",
  "Keep the page warm and personal without inventing private biography.",
  "Let TheEpicWays carry the business architecture, offers, and delivery system.",
  "Use AI as a backstage advantage: preparation, memory, follow-up, measurement, and content reuse.",
  "Make every public asset feel smooth, modern, confident, and easy for her to approve.",
];

const publicFacts = [
  "Founder of TheEpicWays",
  "Leadership and communication training",
  "Workshops, events, consulting, and experiences",
  "Dubai-based, global-facing professional services",
  "EpicVoices and community-led leadership conversations",
];

export default function EstefaniaFriendPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_18%_12%,rgba(245,158,11,0.18),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(16,185,129,0.14),transparent_31%),linear-gradient(135deg,#0a0a0b_0%,#14110b_48%,#071113_100%)] px-6 pb-16 pt-28 md:px-10 md:pb-20 md:pt-32">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.82fr] lg:items-end">
          <div>
            <div className="mb-5 flex flex-wrap gap-3">
              <Link
                href="/friends"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white/70 transition hover:border-white/35 hover:text-white"
              >
                <ArrowRight className="h-3.5 w-3.5 rotate-180" />
                Friends
              </Link>
              <Link
                href="/allies/epic-ways"
                className="inline-flex items-center gap-2 rounded-full border border-amber-200/20 bg-amber-200/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-100 transition hover:border-amber-100/45"
              >
                TheEpicWays
              </Link>
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-amber-100">
              Friend Of FrankX
            </p>
            <h1 className="mt-4 max-w-4xl text-balance text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              Estefanía Badra
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 md:text-xl">
              Founder of TheEpicWays. Warm, fast, expressive, and serious about
              helping people lead with clarity, confidence, energy, and courage.
              The public frame should feel like her: human first, business
              sharp, never overcomplicated.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/allies/epic-ways"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-amber-100"
              >
                Open TheEpicWays
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://theepicways.com/"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:border-white/45 hover:bg-white/10"
              >
                Official site
              </a>
            </div>
          </div>

          <div className="border border-white/12 bg-white/[0.04] p-5 shadow-2xl shadow-amber-950/20 backdrop-blur">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/42">
                  Public Profile
                </p>
                <h2 className="mt-2 text-2xl font-black">Clarity. Energy. Action.</h2>
              </div>
              <Heart className="h-7 w-7 text-amber-100" />
            </div>
            <div className="mt-5 grid gap-3">
              {publicFacts.map((fact) => (
                <div
                  key={fact}
                  className="flex gap-3 border border-white/10 bg-black/30 p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-200" />
                  <span className="text-sm leading-6 text-white/68">{fact}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-14 md:px-10 md:py-18">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-3">
            {profileSignals.map((signal) => {
              const Icon = signal.icon;
              return (
                <article
                  key={signal.title}
                  className="border border-white/10 bg-white/[0.04] p-5 transition hover:border-amber-100/35 hover:bg-white/[0.06]"
                >
                  <Icon className="h-6 w-6 text-amber-100" />
                  <h2 className="mt-5 text-xl font-black tracking-tight">
                    {signal.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-white/64">{signal.copy}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-6 py-14 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-white/45">
              <BookOpen className="h-4 w-4" />
              Friend Lens
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-tight">
              More human. Less architecture in the first sentence.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/66">
              The best public page starts with the person people meet in a room:
              high-energy, generous, clear, and direct. The systems can support
              her, but they should not replace her voice.
            </p>
          </div>
          <div className="grid gap-3">
            {friendNotes.map((note, index) => (
              <div
                key={note}
                className="flex items-start gap-4 border border-white/10 bg-black/35 p-4"
              >
                <span className="font-mono text-xs text-amber-100">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm leading-6 text-white/70">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-14 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1.08fr_0.92fr]">
          <article className="border border-white/12 bg-white/[0.04] p-6 md:p-8">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-emerald-200">
              <Sparkles className="h-4 w-4" />
              Company Lens
            </div>
            <h2 className="mt-4 text-3xl font-black tracking-tight">TheEpicWays</h2>
            <p className="mt-4 text-base leading-7 text-white/68">
              The business page is where the deeper structure belongs: offers,
              workshops, leadership programs, event formats, client outcomes,
              AI-supported delivery, and a clean path for companies to book the
              right experience.
            </p>
            <Link
              href="/allies/epic-ways"
              className="mt-7 inline-flex items-center gap-2 bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-emerald-100"
            >
              Open business page
              <ArrowRight className="h-4 w-4" />
            </Link>
          </article>

          <aside className="border border-white/12 bg-[linear-gradient(145deg,rgba(245,158,11,0.11),rgba(255,255,255,0.035),rgba(16,185,129,0.08))] p-6 md:p-8">
            <Shield className="h-7 w-7 text-amber-100" />
            <h2 className="mt-5 text-3xl font-black tracking-tight">
              Approval-aware by design.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/68">
              This profile stays public-safe: it uses her existing work,
              language, and offerings without publishing private biography,
              personal claims, client details, or strategy that she has not
              approved.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/friends"
                className="inline-flex items-center gap-2 border border-white/15 px-4 py-2.5 text-sm font-bold text-white transition hover:border-white/40 hover:bg-white/10"
              >
                Friends portal
              </Link>
              <a
                href="https://www.linkedin.com/company/theepicways"
                className="inline-flex items-center gap-2 border border-white/15 px-4 py-2.5 text-sm font-bold text-white transition hover:border-white/40 hover:bg-white/10"
              >
                TheEpicWays LinkedIn
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-6 py-14 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          <div className="border border-white/10 bg-black/35 p-5">
            <Mic className="h-6 w-6 text-amber-100" />
            <h3 className="mt-4 text-lg font-black">Voice</h3>
            <p className="mt-2 text-sm leading-6 text-white/62">
              Keep the words conversational, alive, and precise. Not corporate.
              Not overbuilt.
            </p>
          </div>
          <div className="border border-white/10 bg-black/35 p-5">
            <Briefcase className="h-6 w-6 text-emerald-200" />
            <h3 className="mt-4 text-lg font-black">Offer</h3>
            <p className="mt-2 text-sm leading-6 text-white/62">
              Make the business easy to understand: workshops, programs, 1:1
              sessions, consulting, and events.
            </p>
          </div>
          <div className="border border-white/10 bg-black/35 p-5">
            <CalendarDays className="h-6 w-6 text-cyan-100" />
            <h3 className="mt-4 text-lg font-black">Experience</h3>
            <p className="mt-2 text-sm leading-6 text-white/62">
              The room matters. Every system should protect the live energy that
              makes TheEpicWays different.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-14 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 border border-white/12 bg-black/35 p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-white/45">
              <MessageCircle className="h-4 w-4" />
              Public Pairing
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-tight">
              Friend page plus business page.
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-white/66">
              This route carries the human relationship. TheEpicWays carries the
              offer architecture, workflows, and business model.
            </p>
          </div>
          <Link
            href="/allies/epic-ways"
            className="inline-flex shrink-0 items-center gap-2 bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-amber-100"
          >
            Go to TheEpicWays
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
