import Link from "next/link";
import {
  ArrowRight,
  Award,
  BedDouble,
  CalendarCheck,
  ChefHat,
  Download,
  ExternalLink,
  Hotel,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Star,
  UsersRound,
} from "lucide-react";
import { createMetadata } from "@/lib/seo";
import HarzfensterHospitalityMap from "./HarzfensterHospitalityMap";

export const metadata = createMetadata({
  title: "Harzfenster Hospitality Intelligence | FrankX Allies",
  description:
    "A practical hospitality intelligence pilot for Jojo, Harzfenster by Johannes Steingrüber, and Hotel Görtler in Seesen.",
  path: "/allies/harzfenster",
  noindex: true,
});

const pilotOffers = [
  {
    icon: CalendarCheck,
    title: "Booking Calm",
    copy: "A human-approved system for reservation notes, waitlist replies, allergies, arrangements, and guest expectations.",
  },
  {
    icon: ChefHat,
    title: "Service Briefings",
    copy: "Daily prep for the restaurant team: table context, menu stories, local producer notes, risks, and owner priorities.",
  },
  {
    icon: BedDouble,
    title: "Hotel Connection",
    copy: "A cleaner bridge between Harzfenster, Hotel Görtler, arrangements, local suggestions, and the second dining path.",
  },
  {
    icon: MessageSquareText,
    title: "Aftercare And Reviews",
    copy: "Drafts for thank-you notes, review responses, recurring feedback themes, and approved public story ideas.",
  },
];

const trustRules = [
  "AI can draft messages, summarize notes, and prepare staff context. A person approves anything a guest will see.",
  "Private guest preferences, health notes, payment details, and internal team records stay out of public tools.",
  "The system supports the house. It does not turn the restaurant into an automated funnel.",
  "Public pages stay search-hidden until Jojo approves deeper story, photos, offers, and operating details.",
];

const phases = [
  ["Week 1", "Map current tools, booking flow, guest messages, service briefings, hotel handoffs, and review workflow."],
  ["Week 2", "Build a private house memory, response draft library, service briefing template, and weekly owner dashboard."],
  ["Week 3", "Pilot with one or two workflows: reservation preparation, service briefing, or review response support."],
  ["Week 4", "Review what actually helped, remove what felt noisy, and package the pattern for other owner-led houses."],
];

const sources = [
  {
    label: "Harzfenster",
    href: "https://restaurant-harzfenster.de/",
  },
  {
    label: "MICHELIN Guide profile",
    href: "https://guide.michelin.com/en/niedersachsen/seesen_1340885/restaurant/harzfenster-by-johannes-steingruber",
  },
  {
    label: "Hotel Görtler",
    href: "https://hotel-goertler.de/",
  },
];

export default function HarzfensterAllyPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#060807] text-white">
      <section className="relative overflow-hidden px-5 pb-16 pt-28 md:px-10 md:pb-24 md:pt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_10%,rgba(215,178,122,0.22),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(68,143,103,0.18),transparent_32%),radial-gradient(circle_at_56%_84%,rgba(6,182,212,0.11),transparent_36%),linear-gradient(135deg,#060807_0%,#11100b_49%,#07110f_100%)]" />
        <div className="absolute left-[9%] top-28 -z-10 h-56 w-56 rounded-full bg-[#d7b27a]/[0.055] blur-3xl" />
        <div className="absolute bottom-10 right-[8%] -z-10 h-72 w-72 rounded-full bg-emerald-200/[0.045] blur-3xl" />

        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.04fr_0.82fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d7b27a]/28 bg-[#d7b27a]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#f4dfb5] shadow-[inset_0_1px_0_rgba(255,255,255,0.13)] backdrop-blur-2xl">
              <Hotel className="h-4 w-4" />
              FrankX ally pilot
            </div>
            <h1 className="max-w-5xl text-balance text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              Harzfenster Hospitality Intelligence.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/76 md:text-xl">
              A practical system for Jojo, Harzfenster, and Hotel Görtler:
              protect the craft, carry the new attention, prepare the team,
              and make guest care easier without making the house feel
              automated.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/54">
              This is the ally layer. The friend page is warmer and simpler.
              This page is the operating idea: how FrankX can help the house
              turn momentum into calm execution.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/downloads/jojo-hospitality-intelligence-kit"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-black shadow-[0_20px_70px_rgba(255,255,255,0.14)] transition hover:bg-[#f4dfb5]"
              >
                <Download className="h-4 w-4" />
                Download starter kit
              </Link>
              <Link
                href="/friends/jojo"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.055] px-5 py-3 text-sm font-bold text-white backdrop-blur-xl transition hover:border-white/45 hover:bg-white/10"
              >
                Friend page
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/hospitality-intelligence"
                className="inline-flex items-center gap-2 rounded-full border border-[#d7b27a]/25 bg-[#d7b27a]/10 px-5 py-3 text-sm font-bold text-[#f4dfb5] backdrop-blur-xl transition hover:border-[#d7b27a]/45 hover:bg-[#d7b27a]/15"
              >
                Hospitality vertical
              </Link>
            </div>
          </div>

          <aside className="rounded-[2.8rem] border border-white/12 bg-white/[0.06] p-5 shadow-[0_34px_130px_rgba(0,0,0,0.46)] backdrop-blur-2xl">
            <div className="rounded-[2.25rem] border border-white/10 bg-black/25 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]">
              <div className="grid h-24 w-24 place-items-center rounded-[2.2rem] border border-[#d7b27a]/28 bg-[linear-gradient(145deg,rgba(215,178,122,0.24),rgba(68,143,103,0.15),rgba(255,255,255,0.05))] text-3xl font-black text-[#f4dfb5]">
                JS
              </div>
              <p className="mt-7 text-xs font-bold uppercase tracking-[0.22em] text-[#f4dfb5]">
                Public baseline
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight">
                Starred restaurant, family hotel, owner-led standard.
              </h2>
              <p className="mt-4 text-sm leading-6 text-white/64">
                Public sources place Harzfenster by Johannes Steingrüber in
                Seesen among the new one-star restaurants in the 2026 MICHELIN
                Guide Germany selection. The system starts from that fact and
                stays careful with everything else.
              </p>
              <div className="mt-7 grid gap-3">
                {sources.map((source) => (
                  <a
                    key={source.href}
                    href={source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-full border border-white/10 bg-black/22 px-4 py-3 text-sm text-white/72 transition hover:border-white/25 hover:bg-white/[0.06]"
                  >
                    <ExternalLink className="h-4 w-4 text-[#f4dfb5]" />
                    {source.label}
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#f4dfb5]">
              The operating map
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
              From new attention to calmer hospitality.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/66 md:text-lg md:leading-8">
              This is not a chatbot-first plan. It is a house system: what
              needs to be known before service, what should be remembered
              privately, what can be shared publicly, and where a human must
              approve.
            </p>
          </div>
          <HarzfensterHospitalityMap />
        </div>
      </section>

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-4">
          {pilotOffers.map((offer) => {
            const Icon = offer.icon;
            return (
              <article
                key={offer.title}
                className="rounded-[2.2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.065),rgba(255,255,255,0.025))] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.30)] backdrop-blur-2xl transition hover:-translate-y-1 hover:border-[#d7b27a]/35"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[#d7b27a]/24 bg-[#d7b27a]/10">
                  <Icon className="h-6 w-6 text-[#f4dfb5]" />
                </div>
                <h3 className="mt-5 text-xl font-black tracking-tight">
                  {offer.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/64">
                  {offer.copy}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.92fr_1.08fr]">
          <article className="rounded-[2.7rem] border border-[#d7b27a]/20 bg-[linear-gradient(145deg,rgba(215,178,122,0.12),rgba(255,255,255,0.04),rgba(68,143,103,0.08))] p-6 shadow-[0_30px_110px_rgba(0,0,0,0.36)] backdrop-blur-2xl md:p-8">
            <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-[#f4dfb5]">
              <Sparkles className="h-5 w-5" />
              Four week pilot
            </div>
            <h2 className="mt-5 text-3xl font-black tracking-tight md:text-4xl">
              Small enough to test. Serious enough to matter.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/66">
              The first version should avoid giant software promises. It should
              solve one or two real operational frictions, then prove whether
              the system deserves to expand.
            </p>
          </article>

          <div className="grid gap-3">
            {phases.map(([label, copy], index) => (
              <div
                key={label}
                className="grid gap-3 rounded-[1.8rem] border border-white/10 bg-black/25 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:grid-cols-[auto_1fr]"
              >
                <span className="font-mono text-xs text-[#f4dfb5]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-[0.16em] text-white/82">
                    {label}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/66">{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 pt-6 md:px-10 md:pb-24">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[2.7rem] border border-white/12 bg-[#08110f]/74 p-6 shadow-[0_34px_120px_rgba(0,0,0,0.42)] backdrop-blur-2xl md:p-8">
            <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-emerald-100">
              <ShieldCheck className="h-5 w-5" />
              Guest trust
            </div>
            <h2 className="mt-5 text-3xl font-black tracking-tight md:text-4xl">
              The promise is human care with better preparation.
            </h2>
            <div className="mt-7 grid gap-3">
              {trustRules.map((rule) => (
                <div
                  key={rule}
                  className="rounded-[1.55rem] border border-white/10 bg-black/25 p-4 text-sm leading-6 text-white/68"
                >
                  {rule}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2.7rem] border border-[#d7b27a]/20 bg-[#120f08]/74 p-6 shadow-[0_34px_120px_rgba(0,0,0,0.42)] backdrop-blur-2xl md:p-8">
            <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-[#f4dfb5]">
              <Award className="h-5 w-5" />
              Why FrankX should have this
            </div>
            <h2 className="mt-5 text-3xl font-black tracking-tight md:text-4xl">
              Real friends make the system believable.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/66">
              The Friends and Allies hubs work when they show real care and
              real usefulness. Jojo gives FrankX a hospitality pattern: a
              respected owner-led house, a clear public moment, and a practical
              AI support system that can later become a premium workshop for
              other restaurants and hotels.
            </p>
            <Link
              href="/hospitality-intelligence"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-black transition hover:bg-[#f4dfb5]"
            >
              See the business line
              <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        </div>
      </section>
    </main>
  );
}
