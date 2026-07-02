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
  Orbit,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Estefania Badra | Friends",
  description:
    "A public friend profile for Estefania Badra, founder of TheEpicWays: leadership, communication, training, events, and client intelligence.",
  path: "/friends/estefania",
});

const profileSignals = [
  {
    icon: MessageCircle,
    title: "Communication That Lands",
    copy: "Her work lives where leaders often need help most: clearer words, cleaner priorities, and stronger conversations.",
  },
  {
    icon: Users,
    title: "Rooms With Energy",
    copy: "TheEpicWays is strongest when people are in motion: workshops, events, interviews, and community conversations.",
  },
  {
    icon: Brain,
    title: "Leadership By Practice",
    copy: "The public pattern is not theory for theory's sake. It is learn, train, refine, repeat, then lead better.",
  },
];

const positioningNotes = [
  "Use her existing language: potential, leadership, communication, energy, clarity, courage, and community.",
  "Keep the page based on public context without inventing private biography.",
  "Let TheEpicWays carry the business architecture, offers, and delivery system.",
  "Use AI backstage for preparation, memory, follow-up, measurement, and content reuse.",
  "Make every public asset feel smooth, modern, confident, and easy for her to approve.",
];

const publicFacts = [
  "Founder of TheEpicWays",
  "Leadership and communication training",
  "Workshops, events, consulting, and experiences",
  "Dubai-based, global-facing professional services",
  "EpicVoices and community-led leadership conversations",
];

const serviceLayers = [
  {
    icon: Brain,
    title: "Client Signal",
    copy: "Research, discovery notes, team context, and hidden tension become a sharper pre-room brief.",
  },
  {
    icon: CalendarDays,
    title: "Room Design",
    copy: "Agendas, exercises, slides, prompts, and energy checks are prepared without flattening her voice.",
  },
  {
    icon: BookOpen,
    title: "Memory + Follow-Up",
    copy: "The work continues through summaries, owner trackers, manager scripts, and next-step packs.",
  },
  {
    icon: Sparkles,
    title: "Growth Loop",
    copy: "Approved insights become cleaner offers, posts, talks, case studies, and future workshop improvements.",
  },
];

export default function EstefaniaFriendPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#070808] text-white">
      <section className="relative overflow-hidden px-5 pb-14 pt-28 md:px-10 md:pb-20 md:pt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(245,158,11,0.20),transparent_33%),radial-gradient(circle_at_82%_18%,rgba(16,185,129,0.16),transparent_34%),radial-gradient(circle_at_58%_82%,rgba(6,182,212,0.13),transparent_36%),linear-gradient(135deg,#070808_0%,#14110b_48%,#061315_100%)]" />
        <div className="absolute right-[10%] top-24 -z-10 h-56 w-56 rounded-full border border-white/10 bg-white/[0.035] blur-3xl" />
        <div className="absolute bottom-12 left-[8%] -z-10 h-64 w-64 rounded-full bg-amber-200/[0.055] blur-3xl" />

        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.82fr] lg:items-center">
          <div>
            <div className="mb-5 flex flex-wrap gap-3">
              <Link
                href="/friends"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.055] px-4 py-2 text-xs font-bold text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl transition hover:border-white/35 hover:text-white"
              >
                <ArrowRight className="h-3.5 w-3.5 rotate-180" />
                Friends
              </Link>
              <Link
                href="/allies/epic-ways"
                className="inline-flex items-center gap-2 rounded-full border border-amber-200/25 bg-amber-200/10 px-4 py-2 text-xs font-bold text-amber-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl transition hover:border-amber-100/45"
              >
                TheEpicWays
              </Link>
            </div>

            <p className="text-sm font-semibold text-amber-100">
              Friend Of FrankX
            </p>
            <h1 className="mt-4 max-w-4xl text-balance text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              Estefanía Badra
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/74 md:text-xl">
              Founder of TheEpicWays. Her work helps people speak clearly,
              make better decisions, and carry stronger leadership energy into
              the room after the session ends.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/allies/epic-ways"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-black shadow-[0_18px_60px_rgba(255,255,255,0.16)] transition hover:bg-amber-100"
              >
                Open intelligence system
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://theepicways.com/"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.045] px-5 py-3 text-sm font-bold text-white backdrop-blur-xl transition hover:border-white/45 hover:bg-white/10"
              >
                Official site
              </a>
              <Link
                href="/downloads/epicways-intelligence"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-100/25 bg-emerald-100/10 px-5 py-3 text-sm font-bold text-emerald-50 backdrop-blur-xl transition hover:border-emerald-100/45 hover:bg-emerald-100/15"
              >
                Download starter kit
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 rounded-[2.8rem] bg-[linear-gradient(115deg,rgba(245,158,11,0.28),rgba(16,185,129,0.22),rgba(6,182,212,0.18))] blur-xl" />
            <aside className="relative overflow-hidden rounded-[2.6rem] border border-white/12 bg-white/[0.06] p-5 shadow-[0_30px_120px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
              <div className="rounded-[2.1rem] border border-white/10 bg-black/25 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold text-white/48">
                      Public Profile
                    </p>
                    <h2 className="mt-2 text-2xl font-black">Clarity. Energy. Action.</h2>
                  </div>
                  <div className="grid h-14 w-14 place-items-center rounded-3xl border border-amber-200/25 bg-amber-200/12">
                    <Heart className="h-7 w-7 text-amber-100" />
                  </div>
                </div>

                <div className="mt-6 grid gap-3">
                  {publicFacts.map((fact) => (
                    <div
                      key={fact}
                      className="flex gap-3 rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-200" />
                      <span className="text-sm leading-6 text-white/68">{fact}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-3">
            {profileSignals.map((signal) => {
              const Icon = signal.icon;
              return (
                <article
                  key={signal.title}
                  className="rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.065),rgba(255,255,255,0.025))] p-6 shadow-[0_22px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition hover:-translate-y-1 hover:border-amber-100/35"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/12 bg-black/25">
                    <Icon className="h-6 w-6 text-amber-100" />
                  </div>
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

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="rounded-[2.2rem] border border-white/12 bg-white/[0.045] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.32)] backdrop-blur-2xl md:p-8">
            <div className="flex items-center gap-2 text-sm font-bold text-white/48">
              <BookOpen className="h-4 w-4" />
              Profile role
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
              The architecture should strengthen her delivery.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/66">
              This route should explain what visitors can do next: understand
              Estefania, open the TheEpicWays system, or download the starter
              kit. The technology stays behind the work and supports delivery.
            </p>
          </div>
          <div className="grid gap-3">
            {positioningNotes.map((note, index) => (
              <div
                key={note}
                className="flex items-start gap-4 rounded-[1.5rem] border border-white/10 bg-black/30 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-xl"
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

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold text-emerald-100">
              How FrankX Helps
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
              Better client service, not louder technology.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {serviceLayers.map((layer) => {
              const Icon = layer.icon;
              return (
                <article
                  key={layer.title}
                  className="rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(16,185,129,0.09),rgba(255,255,255,0.035),rgba(6,182,212,0.055))] p-6 shadow-[0_22px_80px_rgba(0,0,0,0.25)] backdrop-blur-2xl transition hover:-translate-y-1 hover:border-emerald-100/35"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-emerald-100/20 bg-emerald-100/10">
                    <Icon className="h-6 w-6 text-emerald-100" />
                  </div>
                  <h3 className="mt-5 text-xl font-black tracking-tight">
                    {layer.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-white/64">{layer.copy}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 pt-8 md:px-10 md:pb-24">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-white/12 bg-[#081111]/72 p-6 shadow-[0_36px_120px_rgba(0,0,0,0.42)] backdrop-blur-2xl md:p-9">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.92fr] lg:items-start">
            <article>
              <div className="flex items-center gap-2 text-sm font-bold text-amber-100">
                <Sparkles className="h-4 w-4" />
                Company system
              </div>
              <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
                TheEpicWays
              </h2>
              <p className="mt-4 text-base leading-7 text-white/68">
                The business page is where the deeper structure belongs:
                offers, workshops, leadership programs, event formats, client
                outcomes, AI-supported delivery, and a clean path for companies
                to book the right experience.
              </p>
              <Link
                href="/allies/epic-ways"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-emerald-100"
              >
                Open business page
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/downloads/epicways-intelligence"
                className="ml-0 mt-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.045] px-5 py-3 text-sm font-bold text-white transition hover:border-white/40 hover:bg-white/10 md:ml-3"
              >
                Download kit
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>

            <aside className="rounded-[2.1rem] border border-amber-100/20 bg-[linear-gradient(145deg,rgba(245,158,11,0.12),rgba(255,255,255,0.04),rgba(16,185,129,0.08))] p-6 md:p-8">
              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-amber-100/20 bg-amber-100/10">
                <Shield className="h-7 w-7 text-amber-100" />
              </div>
              <h2 className="mt-5 text-3xl font-black tracking-tight">
                Approval-aware by design.
              </h2>
              <p className="mt-4 text-base leading-7 text-white/68">
                This profile stays public-safe: it uses her existing work,
                language, and offerings without publishing private biography,
                private client details, or strategy she has not approved.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/friends"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.045] px-4 py-2.5 text-sm font-bold text-white transition hover:border-white/40 hover:bg-white/10"
                >
                  Friends portal
                </Link>
                <a
                  href="https://www.linkedin.com/company/theepicways"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.045] px-4 py-2.5 text-sm font-bold text-white transition hover:border-white/40 hover:bg-white/10"
                >
                  TheEpicWays LinkedIn
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="px-5 pb-14 md:px-10 md:pb-20">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          <div className="rounded-[2rem] border border-white/10 bg-black/30 p-6 backdrop-blur-xl">
            <Mic className="h-6 w-6 text-amber-100" />
            <h3 className="mt-4 text-lg font-black">Voice</h3>
            <p className="mt-2 text-sm leading-6 text-white/62">
              Conversational, alive, and precise. Business-sharp without
              becoming corporate.
            </p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-black/30 p-6 backdrop-blur-xl">
            <Briefcase className="h-6 w-6 text-emerald-200" />
            <h3 className="mt-4 text-lg font-black">Offer</h3>
            <p className="mt-2 text-sm leading-6 text-white/62">
              Workshops, programs, consulting, events, and client-intelligence
              retainers that are easy to understand.
            </p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-black/30 p-6 backdrop-blur-xl">
            <Orbit className="h-6 w-6 text-cyan-100" />
            <h3 className="mt-4 text-lg font-black">Loop</h3>
            <p className="mt-2 text-sm leading-6 text-white/62">
              The room matters, then follow-up turns the room into measurable
              momentum for her clients.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
