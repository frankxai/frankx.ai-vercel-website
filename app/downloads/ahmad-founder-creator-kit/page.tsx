import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  Download,
  ExternalLink,
  Film,
  FolderOpen,
  Library,
  Lock,
  Megaphone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Ahmad Founder Creator Kit | FrankX.AI",
  description:
    "Download the Ahmad Founder Creator Kit: Trinity AI offer map, OpenClaw local lab guide, agent swarm roles, media loops, academy and podcast system, startup roadmap, and privacy boundaries.",
  robots: { index: false, follow: true, nocache: true },
};

const version = "0.1.0";
const releaseDate = "2026-06-26";
const assetName = "ahmad-founder-creator-kit-v0.1.0.zip";
const zipUrl = `/downloads/${assetName}`;
const checksumUrl = "/downloads/ahmad-founder-creator-kit-v0.1.0.sha256";
const checksumSha256 =
  "a6ecf681c0009f570c52840dbc7086d4ec2d93d2cb394f6b1ad421ab0c5bd745";

const included = [
  {
    title: "Founder Map",
    copy: "Mission, audience, offer, proof, weekly cadence, and what Ahmad should build first.",
    icon: BrainCircuit,
  },
  {
    title: "Trinity AI Offer Ladder",
    copy: "A practical ladder from consulting and local lab setup into academy, templates, and media.",
    icon: BriefcaseBusiness,
  },
  {
    title: "OpenClaw Jarvis Lab",
    copy: "Mac mini or Mac Studio setup guidance for local AI routines, voice, repos, and private memory.",
    icon: Code2,
  },
  {
    title: "Agent Swarm Roles",
    copy: "Twelve markdown agents for founder operations, media, academy, growth, and brand guardrails.",
    icon: Bot,
  },
  {
    title: "Media Workflows",
    copy: "Image, video, carousel, Instagram, LinkedIn, and reflection loops built from one source idea.",
    icon: Film,
  },
  {
    title: "Academy System",
    copy: "Podcast, short lessons, creator products, and 2026 distribution patterns that can compound.",
    icon: Megaphone,
  },
];

const startSteps = [
  "Download the ZIP and copy the folder into a private workspace.",
  "Read README.md and 01-founder-operating-map.md first.",
  "Use 02-trinity-ai-offer-ladder.md to choose the first public offer.",
  "Use 03-openclaw-jarvis-local-lab.md only after the first offer is clear.",
  "Install ACOS later if Ahmad wants Codex or Claude to help run the workflows.",
];

const agents = [
  "Founder Chief of Staff",
  "Repo Accelerator",
  "OpenClaw Jarvis Operator",
  "Swarm Operator",
  "Content Strategist",
  "Image Director",
  "Video Producer",
  "Carousel Publisher",
  "Podcast Producer",
  "Academy Architect",
  "Growth Analyst",
  "Brand Guardian",
];

export default function AhmadFounderCreatorKitDownloadPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#070807] text-[#fff8ea]">
      <section className="relative px-5 pb-14 pt-28 md:px-10 md:pb-20 md:pt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(212,176,110,0.20),transparent_32%),radial-gradient(circle_at_82%_18%,rgba(18,94,76,0.23),transparent_34%),radial-gradient(circle_at_54%_82%,rgba(80,120,220,0.11),transparent_38%),linear-gradient(135deg,#070807_0%,#11100c_48%,#06120f_100%)]" />
        <div className="absolute right-[8%] top-24 -z-10 h-56 w-56 rounded-full border border-[#125e4c]/10 bg-[#125e4c]/[0.07] blur-3xl" />
        <div className="absolute bottom-10 left-[8%] -z-10 h-64 w-64 rounded-full border border-[#d4b06e]/10 bg-[#d4b06e]/[0.055] blur-3xl" />

        <div className="mx-auto max-w-7xl">
          <Link
            href="/downloads"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.055] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl transition hover:border-white/35 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Downloads
          </Link>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.82fr] lg:items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d4b06e]/28 bg-[#d4b06e]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#f7e7c0]">
                <ShieldCheck className="h-4 w-4" />
                Actual starter system - v{version}
              </div>

              <h1 className="mt-5 max-w-4xl text-balance text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
                Ahmad Founder Creator Kit
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#fff8ea]/74 md:text-xl">
                A real download Ahmad can use now: Trinity AI offer map, local
                Jarvis/OpenClaw lab guide, agent swarm roles, media workflows,
                creator academy system, startup roadmap, and privacy
                boundaries.
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-[#fff8ea]/52">
                Start with the kit. Add ACOS, Codex, Claude, OpenClaw, voice,
                and Hermes-style routines only after the first offer and content
                loop are clear.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={zipUrl}
                  className="inline-flex items-center gap-2 rounded-full bg-[#f7e7c0] px-5 py-3 text-sm font-black text-[#0d0d0b] shadow-[0_18px_60px_rgba(212,176,110,0.16)] transition hover:bg-[#d4b06e]"
                >
                  <Download className="h-4 w-4" />
                  Download ZIP
                </a>
                <Link
                  href="/allies/trinity-ai"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.045] px-5 py-3 text-sm font-bold text-white backdrop-blur-xl transition hover:border-white/45 hover:bg-white/10"
                >
                  Open system page
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/downloads/preview/agentic-creator-os"
                  className="inline-flex items-center gap-2 rounded-full border border-[#d4b06e]/25 bg-[#d4b06e]/10 px-5 py-3 text-sm font-bold text-[#f7e7c0] backdrop-blur-xl transition hover:border-[#d4b06e]/45 hover:bg-[#d4b06e]/15"
                >
                  Optional ACOS packs
                </Link>
              </div>
            </div>

            <aside className="relative overflow-hidden rounded-[2.7rem] border border-white/12 bg-white/[0.06] p-5 shadow-[0_30px_120px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
              <div className="rounded-[2.2rem] border border-white/10 bg-black/25 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/48">
                      Public Asset
                    </p>
                    <h2 className="mt-2 text-2xl font-black">Download package</h2>
                  </div>
                  <div className="grid h-14 w-14 place-items-center rounded-3xl border border-[#d4b06e]/25 bg-[#d4b06e]/12">
                    <FolderOpen className="h-7 w-7 text-[#d4b06e]" />
                  </div>
                </div>

                <dl className="mt-6 grid gap-3 text-sm">
                  <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4">
                    <dt className="text-white/42">Version</dt>
                    <dd className="mt-1 font-mono text-[#f7e7c0]">v{version}</dd>
                  </div>
                  <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4">
                    <dt className="text-white/42">Released</dt>
                    <dd className="mt-1 font-mono text-white/78">{releaseDate}</dd>
                  </div>
                  <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4">
                    <dt className="text-white/42">Asset</dt>
                    <dd className="mt-1 break-all font-mono text-white/78">{assetName}</dd>
                  </div>
                  <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4">
                    <dt className="text-white/42">SHA-256</dt>
                    <dd className="mt-1 break-all font-mono text-xs leading-5 text-[#d4b06e]">
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
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#d4b06e]">
              What he gets
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
              A working kit, not a concept note.
            </h2>
            <p className="mt-4 text-base leading-7 text-[#fff8ea]/66 md:text-lg md:leading-8">
              The ZIP contains reusable files Ahmad can copy into a private
              workspace and adapt as the startup becomes clearer.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {included.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-[2.2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.065),rgba(255,255,255,0.025))] p-6 shadow-[0_22px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition hover:-translate-y-1 hover:border-[#d4b06e]/35"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/12 bg-black/25">
                    <Icon className="h-6 w-6 text-[#d4b06e]" />
                  </div>
                  <h3 className="mt-5 text-xl font-black tracking-tight">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/64">{item.copy}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[2.6rem] border border-[#d4b06e]/20 bg-[linear-gradient(145deg,rgba(212,176,110,0.12),rgba(255,255,255,0.04),rgba(18,94,76,0.08))] p-6 shadow-[0_28px_100px_rgba(0,0,0,0.36)] backdrop-blur-2xl md:p-8">
            <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-[#d4b06e]">
              <Sparkles className="h-5 w-5" />
              Start here
            </div>
            <h2 className="mt-5 text-3xl font-black tracking-tight md:text-4xl">
              The first hour should create momentum.
            </h2>
            <div className="mt-7 grid gap-3">
              {startSteps.map((step, index) => (
                <div
                  key={step}
                  className="grid gap-3 rounded-[1.6rem] border border-white/10 bg-black/25 p-4 backdrop-blur-xl sm:grid-cols-[auto_1fr]"
                >
                  <span className="font-mono text-xs text-[#d4b06e]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-6 text-white/72">{step}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2.6rem] border border-white/12 bg-[#08120f]/72 p-6 shadow-[0_28px_100px_rgba(0,0,0,0.36)] backdrop-blur-2xl md:p-8">
            <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-[#d4b06e]">
              <Lock className="h-5 w-5" />
              Honest boundary
            </div>
            <h2 className="mt-5 text-3xl font-black tracking-tight md:text-4xl">
              It is real now. It is not the full startup platform yet.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/66">
              This release is a document-based starter system. The next layer is
              a GitHub repo, local lab scripts, content automation, dashboard,
              and maybe a Codex plugin after Ahmad validates the workflow.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {agents.map((agent) => (
                <span
                  key={agent}
                  className="rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white/64"
                >
                  {agent}
                </span>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="px-5 pb-16 pt-8 md:px-10 md:pb-24">
        <div className="mx-auto max-w-7xl rounded-[2.7rem] border border-white/12 bg-white/[0.045] p-6 shadow-[0_36px_120px_rgba(0,0,0,0.42)] backdrop-blur-2xl md:p-9">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <div>
              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[#d4b06e]/20 bg-[#d4b06e]/10">
                <Library className="h-6 w-6 text-[#d4b06e]" />
              </div>
              <h2 className="mt-5 text-3xl font-black tracking-tight md:text-4xl">
                Give him this link first.
              </h2>
              <p className="mt-4 text-base leading-7 text-white/66">
                The page explains what to download, how it helps, and how ACOS
                or OpenClaw fit once he wants the full private builder lab.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <a
                href={zipUrl}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f7e7c0] px-5 py-3 text-sm font-black text-[#0d0d0b] transition hover:bg-[#d4b06e]"
              >
                <Download className="h-4 w-4" />
                Download starter kit
              </a>
              <Link
                href="/friends/ahmad"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.045] px-5 py-3 text-sm font-bold text-white backdrop-blur-xl transition hover:border-white/35 hover:bg-white/10"
              >
                Ahmad profile
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
