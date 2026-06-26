import Link from "next/link";
import {
  ArrowRight,
  Award,
  Building2,
  CalendarDays,
  ExternalLink,
  Handshake,
  MapPin,
  Shield,
  Sparkles,
  Star,
  Utensils,
} from "lucide-react";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Jojo | Friend of FrankX",
  description:
    "A public-safe friend page for Jojo, Johannes Steingrüber of Harzfenster and Hotel Görtler in Seesen, with a practical hospitality intelligence kit.",
  path: "/friends/jojo",
  noindex: true,
});

const publicFacts = [
  {
    icon: Star,
    title: "Michelin 2026",
    copy: "The MICHELIN Guide Germany 2026 lists Harzfenster by Johannes Steingrüber in Seesen among the new one-star restaurants.",
  },
  {
    icon: Utensils,
    title: "Harzfenster",
    copy: "A modern regional fine-dining restaurant inside Hotel Görtler, built around local quality, clear flavour lines, and global accents.",
  },
  {
    icon: Building2,
    title: "Hotel Görtler",
    copy: "A family hospitality house in Seesen at the gateway to the Harz, now carrying restaurant, hotel, events, and a second dining path.",
  },
];

const help = [
  "Turn the Michelin moment into calmer demand handling: waitlist, reservations, pre-arrival notes, and guest aftercare.",
  "Give the team simple AI routines for service briefings, review response drafts, event preparation, and local producer memory.",
  "Keep guest trust strict: private guest data stays private, and AI does not make final service promises without a human.",
  "Create a small operator system Jojo can use first, then evolve into a hospitality intelligence product FrankX can teach elsewhere.",
];

const boundaries = [
  "Public-safe draft until Jojo approves deeper biography, photos, quotes, testimonials, and internal operating details.",
  "No guest data in public tools.",
  "No fake Michelin claims beyond sourced public listings.",
];

export default function JojoFriendPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#070807] text-white">
      <section className="relative overflow-hidden px-5 pb-16 pt-28 md:px-10 md:pb-24 md:pt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(245,158,11,0.22),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(16,185,129,0.16),transparent_32%),radial-gradient(circle_at_52%_86%,rgba(6,182,212,0.10),transparent_38%),linear-gradient(135deg,#070807_0%,#11100b_48%,#071211_100%)]" />
        <div className="absolute left-[8%] top-32 -z-10 h-56 w-56 rounded-full border border-amber-200/10 bg-amber-200/[0.055] blur-3xl" />
        <div className="absolute bottom-10 right-[8%] -z-10 h-72 w-72 rounded-full border border-emerald-200/10 bg-emerald-200/[0.045] blur-3xl" />

        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.8fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-200/25 bg-amber-200/10 px-4 py-2 text-xs font-bold text-amber-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.13)] backdrop-blur-2xl">
              <Sparkles className="h-4 w-4" />
              Friend profile - public-safe draft
            </div>
            <h1 className="max-w-5xl text-balance text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              Jojo. Harzfenster. Hotel Görtler.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/76 md:text-xl">
              Jojo is Frank's friend. Publicly, the work is Johannes
              Steingrüber, Harzfenster in Seesen, and the family hospitality
              house Hotel Görtler. This page explains the public context; the
              system page turns the Michelin momentum into useful operating
              support.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/52">
              The page should be careful and useful: clear public facts,
              official links, and a starter kit without turning a chef's life
              into a pitch.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/allies/harzfenster"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-black shadow-[0_20px_70px_rgba(255,255,255,0.14)] transition hover:bg-amber-100"
              >
                See the pilot system
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/downloads/jojo-hospitality-intelligence-kit"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.055] px-5 py-3 text-sm font-bold text-white backdrop-blur-xl transition hover:border-white/45 hover:bg-white/10"
              >
                Download starter kit
              </Link>
              <a
                href="https://restaurant-harzfenster.de/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-amber-200/25 bg-amber-200/10 px-5 py-3 text-sm font-bold text-amber-50 backdrop-blur-xl transition hover:border-amber-100/45 hover:bg-amber-200/15"
              >
                Harzfenster
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          <aside className="rounded-[2.7rem] border border-white/12 bg-white/[0.06] p-5 shadow-[0_34px_130px_rgba(0,0,0,0.46)] backdrop-blur-2xl">
            <div className="rounded-[2.25rem] border border-white/10 bg-black/25 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]">
              <div className="grid h-24 w-24 place-items-center rounded-[2.2rem] border border-amber-200/28 bg-[linear-gradient(145deg,rgba(245,158,11,0.22),rgba(16,185,129,0.14),rgba(255,255,255,0.05))] text-3xl font-black text-amber-50">
                JS
              </div>
              <p className="mt-7 text-xs font-bold text-amber-100">
                Public baseline
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight">
                A small house with a serious standard.
              </h2>
              <p className="mt-4 text-sm leading-6 text-white/64">
                The opportunity is not to add noise. It is to protect the craft
                while making bookings, service, follow-up, and team learning
                easier after the star.
              </p>
              <div className="mt-7 grid gap-3">
                <a
                  href="https://guide.michelin.com/en/niedersachsen/seesen_1340885/restaurant/harzfenster-by-johannes-steingruber"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-full border border-white/10 bg-black/22 px-4 py-3 text-sm text-white/72 transition hover:border-white/25 hover:bg-white/[0.06]"
                >
                  <Award className="h-4 w-4 text-amber-100" />
                  MICHELIN Guide profile
                </a>
                <a
                  href="https://hotel-goertler.de/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-full border border-white/10 bg-black/22 px-4 py-3 text-sm text-white/72 transition hover:border-white/25 hover:bg-white/[0.06]"
                >
                  <Building2 className="h-4 w-4 text-emerald-100" />
                  Hotel Görtler
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 max-w-3xl">
            <p className="text-sm font-bold text-amber-100">
              What is already real
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
              Start with public facts and real hospitality.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {publicFacts.map((fact) => {
              const Icon = fact.icon;
              return (
                <article
                  key={fact.title}
                  className="rounded-[2.25rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.30)] backdrop-blur-2xl"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-amber-200/25 bg-amber-200/10">
                    <Icon className="h-6 w-6 text-amber-100" />
                  </div>
                  <h3 className="mt-5 text-xl font-black tracking-tight">{fact.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/62">{fact.copy}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[2.6rem] border border-amber-200/18 bg-[linear-gradient(145deg,rgba(245,158,11,0.12),rgba(255,255,255,0.04),rgba(16,185,129,0.08))] p-6 shadow-[0_30px_110px_rgba(0,0,0,0.36)] backdrop-blur-2xl md:p-8">
            <div className="flex items-center gap-3 text-sm font-bold text-amber-100">
              <Handshake className="h-5 w-5" />
              FrankX role
            </div>
            <h2 className="mt-5 text-3xl font-black tracking-tight md:text-4xl">
              Help the house carry the new attention without diluting the craft.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/66">
              The right AI layer is quiet: better notes, better preparation,
              better follow-up, better team training, better owner decisions.
              The guest still experiences people, food, place, and care.
            </p>
          </article>

          <div className="grid gap-3">
            {help.map((item, index) => (
              <div
                key={item}
                className="grid gap-3 rounded-[1.8rem] border border-white/10 bg-black/25 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:grid-cols-[auto_1fr]"
              >
                <span className="font-mono text-xs text-amber-100">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm leading-6 text-white/70">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 pt-6 md:px-10 md:pb-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[2.6rem] border border-white/12 bg-[#081211]/74 p-6 shadow-[0_34px_120px_rgba(0,0,0,0.42)] backdrop-blur-2xl md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-white/45">
              <Shield className="h-4 w-4" />
              Approval boundary
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-tight">
              Shareable now. Search-hidden until Jojo approves.
            </h2>
            <div className="mt-4 grid gap-2 text-sm leading-6 text-white/66">
              {boundaries.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-full border border-amber-200/20 bg-amber-200/10 px-5 py-3 text-sm font-bold text-amber-50">
            <MapPin className="h-4 w-4" />
            Seesen, Harz
          </div>
        </div>
      </section>
    </main>
  );
}
