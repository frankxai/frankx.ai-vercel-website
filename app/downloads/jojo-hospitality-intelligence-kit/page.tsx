import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  BookOpen,
  CalendarCheck,
  ChefHat,
  Download,
  ExternalLink,
  FolderOpen,
  Hotel,
  Lock,
  MessagesSquare,
  ShieldCheck,
  Sparkles,
  Star,
  UsersRound,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Jojo Hospitality Intelligence Kit | FrankX.AI",
  description:
    "Download the Jojo Hospitality Intelligence Kit: booking, service, hotel, review, team, menu, privacy, and agent briefs for an approval-based hospitality AI pilot.",
  robots: { index: false, follow: true, nocache: true },
};

const version = "0.1.0";
const releaseDate = "2026-06-25";
const assetName = "jojo-hospitality-intelligence-kit-v0.1.0.zip";
const zipUrl = `/downloads/${assetName}`;
const checksumUrl =
  "/downloads/jojo-hospitality-intelligence-kit-v0.1.0.sha256";
const checksumSha256 =
  "901c4600d01fd74bda5b781cbb79d6c803d3669c70069e6d41349cf0a13dff8a";

const included = [
  {
    title: "Owner Map",
    copy: "A practical operating map for Jojo, Harzfenster, Hotel Görtler, and the first hospitality pilot.",
    icon: Hotel,
  },
  {
    title: "Booking Intelligence",
    copy: "Reservation notes, waitlist handling, guest questions, allergies, arrangements, and pre-arrival preparation.",
    icon: CalendarCheck,
  },
  {
    title: "Restaurant Service Loop",
    copy: "Service briefing, menu story, table context, local producer memory, and post-service debrief.",
    icon: ChefHat,
  },
  {
    title: "Hotel Stay Loop",
    copy: "Room, restaurant, local suggestions, second dining path, events, and follow-up as one connected house.",
    icon: BedDouble,
  },
  {
    title: "Team Enablement",
    copy: "Simple staff routines, review learning, onboarding notes, and weekly owner priorities.",
    icon: UsersRound,
  },
  {
    title: "Agent Briefs",
    copy: "Eight markdown agents plus one installable skill brief for Codex, Claude, or ACOS later.",
    icon: BookOpen,
  },
];

const startSteps = [
  "Download the ZIP and keep it in a private workspace.",
  "Read README.md and 01-owner-operating-map.md first.",
  "Choose one pilot workflow: booking, service briefing, review learning, or hotel handoff.",
  "Use the agents as drafting partners only. Staff approval stays mandatory.",
  "Install ACOS later if the workflow deserves automation with Codex or Claude.",
];

const agents = [
  "booking-concierge-agent",
  "guest-memory-agent",
  "service-briefing-agent",
  "review-reputation-agent",
  "menu-story-agent",
  "event-arrangement-agent",
  "team-training-agent",
  "hotel-ops-steward",
];

export default function JojoHospitalityKitDownloadPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#070807] text-white">
      <section className="relative px-5 pb-14 pt-28 md:px-10 md:pb-20 md:pt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(215,178,122,0.22),transparent_32%),radial-gradient(circle_at_82%_18%,rgba(68,143,103,0.20),transparent_34%),radial-gradient(circle_at_54%_82%,rgba(6,182,212,0.11),transparent_38%),linear-gradient(135deg,#070807_0%,#11100b_48%,#06110e_100%)]" />
        <div className="absolute right-[8%] top-24 -z-10 h-56 w-56 rounded-full border border-emerald-200/10 bg-emerald-200/[0.055] blur-3xl" />
        <div className="absolute bottom-10 left-[8%] -z-10 h-64 w-64 rounded-full border border-[#d7b27a]/10 bg-[#d7b27a]/[0.055] blur-3xl" />

        <div className="mx-auto max-w-7xl">
          <Link
            href="/downloads"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.055] px-4 py-2 text-xs font-bold text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl transition hover:border-white/35 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Downloads
          </Link>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.82fr] lg:items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d7b27a]/28 bg-[#d7b27a]/10 px-4 py-2 text-xs font-bold text-[#f4dfb5]">
                <ShieldCheck className="h-4 w-4" />
                Actual starter system - v{version}
              </div>

              <h1 className="mt-5 max-w-4xl text-balance text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
                Jojo Hospitality Intelligence Kit
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/74 md:text-xl">
                A working starter kit for Harzfenster and Hotel Görtler:
                booking intelligence, service briefings, hotel handoffs, team
                routines, menu memory, reputation aftercare, privacy
                boundaries, and agent briefs.
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/52">
                Start with the documents. Install ACOS later only if Jojo wants
                Codex or Claude to help run the workflows inside a private
                workspace.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={zipUrl}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-black shadow-[0_18px_60px_rgba(215,178,122,0.16)] transition hover:bg-[#f4dfb5]"
                >
                  <Download className="h-4 w-4" />
                  Download ZIP
                </a>
                <Link
                  href="/allies/harzfenster"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.045] px-5 py-3 text-sm font-bold text-white backdrop-blur-xl transition hover:border-white/45 hover:bg-white/10"
                >
                  Open pilot page
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/downloads/preview/agentic-creator-os"
                  className="inline-flex items-center gap-2 rounded-full border border-[#d7b27a]/25 bg-[#d7b27a]/10 px-5 py-3 text-sm font-bold text-[#f4dfb5] backdrop-blur-xl transition hover:border-[#d7b27a]/45 hover:bg-[#d7b27a]/15"
                >
                  Optional ACOS packs
                </Link>
              </div>
            </div>

            <aside className="relative overflow-hidden rounded-[2.8rem] border border-white/12 bg-white/[0.06] p-5 shadow-[0_30px_120px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
              <div className="rounded-[2.25rem] border border-white/10 bg-black/25 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-xs font-bold text-white/48">
                      Public Asset
                    </p>
                    <h2 className="mt-2 text-2xl font-black">
                      Download package
                    </h2>
                  </div>
                  <div className="grid h-14 w-14 place-items-center rounded-3xl border border-[#d7b27a]/25 bg-[#d7b27a]/12">
                    <FolderOpen className="h-7 w-7 text-[#f4dfb5]" />
                  </div>
                </div>

                <dl className="mt-6 grid gap-3 text-sm">
                  <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4">
                    <dt className="text-white/42">Version</dt>
                    <dd className="mt-1 font-mono text-[#f4dfb5]">
                      v{version}
                    </dd>
                  </div>
                  <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4">
                    <dt className="text-white/42">Released</dt>
                    <dd className="mt-1 font-mono text-white/78">
                      {releaseDate}
                    </dd>
                  </div>
                  <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4">
                    <dt className="text-white/42">Asset</dt>
                    <dd className="mt-1 break-all font-mono text-white/78">
                      {assetName}
                    </dd>
                  </div>
                  <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4">
                    <dt className="text-white/42">SHA-256</dt>
                    <dd className="mt-1 break-all font-mono text-xs leading-5 text-[#d7b27a]">
                      {checksumSha256}
                    </dd>
                  </div>
                </dl>

                <a
                  href={checksumUrl}
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.045] px-4 py-2 text-sm font-bold text-white/80 transition hover:border-white/35 hover:bg-white/10"
                >
                  Checksum file
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 max-w-3xl">
            <p className="text-sm font-bold text-[#f4dfb5]">
              What is inside
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
              A real kit, not a pitch deck.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/66 md:text-lg md:leading-8">
              The ZIP contains reusable files he can copy into a private
              workspace and adapt with the team.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {included.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-[2.2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.065),rgba(255,255,255,0.025))] p-6 shadow-[0_22px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition hover:-translate-y-1 hover:border-[#d7b27a]/35"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/12 bg-black/25">
                    <Icon className="h-6 w-6 text-[#f4dfb5]" />
                  </div>
                  <h3 className="mt-5 text-xl font-black tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-white/64">
                    {item.copy}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[2.7rem] border border-[#d7b27a]/20 bg-[linear-gradient(145deg,rgba(215,178,122,0.12),rgba(255,255,255,0.04),rgba(68,143,103,0.08))] p-6 shadow-[0_28px_100px_rgba(0,0,0,0.36)] backdrop-blur-2xl md:p-8">
            <div className="flex items-center gap-3 text-sm font-bold text-[#f4dfb5]">
              <Sparkles className="h-5 w-5" />
              Start here
            </div>
            <h2 className="mt-5 text-3xl font-black tracking-tight md:text-4xl">
              The first hour should feel clear.
            </h2>
            <div className="mt-7 grid gap-3">
              {startSteps.map((step, index) => (
                <div
                  key={step}
                  className="grid gap-3 rounded-[1.6rem] border border-white/10 bg-black/25 p-4 backdrop-blur-xl sm:grid-cols-[auto_1fr]"
                >
                  <span className="font-mono text-xs text-[#f4dfb5]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-6 text-white/72">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2.7rem] border border-white/12 bg-[#08120f]/72 p-6 shadow-[0_28px_100px_rgba(0,0,0,0.36)] backdrop-blur-2xl md:p-8">
            <div className="flex items-center gap-3 text-sm font-bold text-[#f4dfb5]">
              <Lock className="h-5 w-5" />
              Honest boundary
            </div>
            <h2 className="mt-5 text-3xl font-black tracking-tight md:text-4xl">
              This is useful now. It is not the full private OS yet.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/66">
              This release is a document-based starter system. The next layer
              is a private GitHub source of truth, optional ACOS workflows, and
              a validated pilot with the actual house team.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {agents.map((agent) => (
                <span
                  key={agent}
                  className="rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-xs font-bold text-white/64"
                >
                  {agent}
                </span>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="px-5 pb-16 pt-8 md:px-10 md:pb-24">
        <div className="mx-auto max-w-7xl rounded-[2.8rem] border border-white/12 bg-white/[0.045] p-6 shadow-[0_36px_120px_rgba(0,0,0,0.42)] backdrop-blur-2xl md:p-9">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <div>
              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[#d7b27a]/20 bg-[#d7b27a]/10">
                <Star className="h-6 w-6 text-[#f4dfb5]" />
              </div>
              <h2 className="mt-5 text-3xl font-black tracking-tight md:text-4xl">
                Give him this link first.
              </h2>
              <p className="mt-4 text-base leading-7 text-white/66">
                The page explains what he can download, why it helps, and where
                FrankX can go next once the house validates one useful workflow.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <a
                href={zipUrl}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-black transition hover:bg-[#f4dfb5]"
              >
                <Download className="h-4 w-4" />
                Download starter kit
              </a>
              <Link
                href="/friends/jojo"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.045] px-5 py-3 text-sm font-bold text-white backdrop-blur-xl transition hover:border-white/35 hover:bg-white/10"
              >
                Jojo profile
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
