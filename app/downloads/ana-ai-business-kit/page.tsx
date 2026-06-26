import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Brain,
  BriefcaseBusiness,
  Download,
  ExternalLink,
  FolderOpen,
  Library,
  Lock,
  MessagesSquare,
  Plane,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Ana AI Business Kit | FrankX.AI",
  description:
    "Download the Ana AI Business Kit: offer map, clarity session, reflection circle, workshop playbook, content library, freedom roadmap, aftercare, and agent briefs.",
  robots: { index: false, follow: true, nocache: true },
};

const version = "0.1.0";
const releaseDate = "2026-06-24";
const assetName = "ana-ai-business-kit-v0.1.0.zip";
const zipUrl = `/downloads/${assetName}`;
const checksumUrl = "/downloads/ana-ai-business-kit-v0.1.0.sha256";
const checksumSha256 =
  "1a32030bb99f90f5b2a7c2d5dd82822ab7b686a59c105524dfcee5e52d0f979d";

const included = [
  {
    title: "Offer Map",
    copy: "Clear packages for clarity sessions, reflection circles, workshops, and a proposed team path.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Clarity Session",
    copy: "A usable structure for intake, session flow, reflective questions, boundaries, and follow-up.",
    icon: MessagesSquare,
  },
  {
    title: "Reflection Circle",
    copy: "A small-group container that can run online or in person without overcomplicating the format.",
    icon: Users,
  },
  {
    title: "Workshop Playbook",
    copy: "A self-knowledge workshop frame with outcomes, exercises, materials, and facilitation notes.",
    icon: Brain,
  },
  {
    title: "Content Library",
    copy: "A way to turn approved research and session patterns into posts, guides, and digital products.",
    icon: Library,
  },
  {
    title: "Agent Briefs",
    copy: "Eight markdown agents Ana can use with Claude, Codex, or a private workspace.",
    icon: BookOpen,
  },
];

const startSteps = [
  "Download the ZIP and copy the folder into a private workspace.",
  "Read README.md and 01-offer-map.md first.",
  "Use 02, 03, or 04 depending on the offer she wants to run next.",
  "Use the agents folder only after the basic offer is clear.",
  "Install ACOS later if she wants Codex or Claude to help run the workflows.",
];

const agents = [
  "Mirror Agent",
  "Research Curator",
  "Library Cartographer",
  "Blog Publisher",
  "Workshop Architect",
  "Brand Guardian",
  "Offer Builder",
  "Freedom Engine Steward",
];

export default function AnaAIBusinessKitDownloadPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#080706] text-[#fff8ea]">
      <section className="relative px-5 pb-14 pt-28 md:px-10 md:pb-20 md:pt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(212,165,116,0.20),transparent_32%),radial-gradient(circle_at_82%_18%,rgba(31,95,74,0.23),transparent_34%),radial-gradient(circle_at_54%_82%,rgba(232,169,81,0.12),transparent_38%),linear-gradient(135deg,#080706_0%,#13100b_48%,#06110e_100%)]" />
        <div className="absolute right-[8%] top-24 -z-10 h-56 w-56 rounded-full border border-[#1f5f4a]/10 bg-[#1f5f4a]/[0.07] blur-3xl" />
        <div className="absolute bottom-10 left-[8%] -z-10 h-64 w-64 rounded-full border border-[#d4a574]/10 bg-[#d4a574]/[0.055] blur-3xl" />

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
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d4a574]/28 bg-[#d4a574]/10 px-4 py-2 text-xs font-bold text-[#f5edd8]">
                <ShieldCheck className="h-4 w-4" />
                Actual starter system - v{version}
              </div>

              <h1 className="mt-5 max-w-4xl text-balance text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
                Ana AI Business Kit
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#fff8ea]/74 md:text-xl">
                A real download Ana can use now: offer map, session structure,
                reflection circle, workshop playbook, content library, freedom
                roadmap, aftercare letter, and eight agent briefs.
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-[#fff8ea]/52">
                Start with the Ana kit. Install ACOS later only if she wants
                Codex or Claude to help run the workflows.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={zipUrl}
                  className="inline-flex items-center gap-2 rounded-full bg-[#f5edd8] px-5 py-3 text-sm font-black text-[#0e0e0f] shadow-[0_18px_60px_rgba(212,165,116,0.16)] transition hover:bg-[#d4a574]"
                >
                  <Download className="h-4 w-4" />
                  Download ZIP
                </a>
                <Link
                  href="/allies/ana-cancino"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.045] px-5 py-3 text-sm font-bold text-white backdrop-blur-xl transition hover:border-white/45 hover:bg-white/10"
                >
                  Open system page
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/downloads/preview/agentic-creator-os"
                  className="inline-flex items-center gap-2 rounded-full border border-[#d4a574]/25 bg-[#d4a574]/10 px-5 py-3 text-sm font-bold text-[#f5edd8] backdrop-blur-xl transition hover:border-[#d4a574]/45 hover:bg-[#d4a574]/15"
                >
                  Optional ACOS packs
                </Link>
              </div>
            </div>

            <aside className="relative overflow-hidden rounded-[2.7rem] border border-white/12 bg-white/[0.06] p-5 shadow-[0_30px_120px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
              <div className="rounded-[2.2rem] border border-white/10 bg-black/25 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-xs font-bold text-white/48">
                      Public Asset
                    </p>
                    <h2 className="mt-2 text-2xl font-black">Download package</h2>
                  </div>
                  <div className="grid h-14 w-14 place-items-center rounded-3xl border border-[#d4a574]/25 bg-[#d4a574]/12">
                    <FolderOpen className="h-7 w-7 text-[#d4a574]" />
                  </div>
                </div>

                <dl className="mt-6 grid gap-3 text-sm">
                  <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4">
                    <dt className="text-white/42">Version</dt>
                    <dd className="mt-1 font-mono text-[#f5edd8]">v{version}</dd>
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
                    <dd className="mt-1 break-all font-mono text-xs leading-5 text-[#d4a574]">
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
            <p className="text-sm font-bold text-[#d4a574]">
              What she gets
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
              A working kit, not a concept note.
            </h2>
            <p className="mt-4 text-base leading-7 text-[#fff8ea]/66 md:text-lg md:leading-8">
              The ZIP contains reusable files she can copy into a private
              workspace and adapt for real clients.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {included.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-[2.2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.065),rgba(255,255,255,0.025))] p-6 shadow-[0_22px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition hover:-translate-y-1 hover:border-[#d4a574]/35"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/12 bg-black/25">
                    <Icon className="h-6 w-6 text-[#d4a574]" />
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
          <article className="rounded-[2.6rem] border border-[#d4a574]/20 bg-[linear-gradient(145deg,rgba(212,165,116,0.12),rgba(255,255,255,0.04),rgba(31,95,74,0.08))] p-6 shadow-[0_28px_100px_rgba(0,0,0,0.36)] backdrop-blur-2xl md:p-8">
            <div className="flex items-center gap-3 text-sm font-bold text-[#d4a574]">
              <Sparkles className="h-5 w-5" />
              Start here
            </div>
            <h2 className="mt-5 text-3xl font-black tracking-tight md:text-4xl">
              The first hour is deliberately simple.
            </h2>
            <div className="mt-7 grid gap-3">
              {startSteps.map((step, index) => (
                <div
                  key={step}
                  className="grid gap-3 rounded-[1.6rem] border border-white/10 bg-black/25 p-4 backdrop-blur-xl sm:grid-cols-[auto_1fr]"
                >
                  <span className="font-mono text-xs text-[#d4a574]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-6 text-white/72">{step}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2.6rem] border border-white/12 bg-[#08120f]/72 p-6 shadow-[0_28px_100px_rgba(0,0,0,0.36)] backdrop-blur-2xl md:p-8">
            <div className="flex items-center gap-3 text-sm font-bold text-[#d4a574]">
              <Lock className="h-5 w-5" />
              Honest boundary
            </div>
            <h2 className="mt-5 text-3xl font-black tracking-tight md:text-4xl">
              It is real now. It is not the full portal yet.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/66">
              This release is a document-based starter system. The next layer is
              a private client workspace, GitHub repo, automation, and possibly
              a Codex plugin after Ana validates the workflow.
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
        <div className="mx-auto max-w-7xl rounded-[2.7rem] border border-white/12 bg-white/[0.045] p-6 shadow-[0_36px_120px_rgba(0,0,0,0.42)] backdrop-blur-2xl md:p-9">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <div>
              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[#d4a574]/20 bg-[#d4a574]/10">
                <Plane className="h-6 w-6 text-[#d4a574]" />
              </div>
              <h2 className="mt-5 text-3xl font-black tracking-tight md:text-4xl">
                Give her this link.
              </h2>
              <p className="mt-4 text-base leading-7 text-white/66">
                The page explains what she can download, how it helps, and what
                still needs to be built when she wants the full private client
                portal.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <a
                href={zipUrl}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f5edd8] px-5 py-3 text-sm font-black text-[#0e0e0f] transition hover:bg-[#d4a574]"
              >
                <Download className="h-4 w-4" />
                Download starter kit
              </a>
              <Link
                href="/friends/ana"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.045] px-5 py-3 text-sm font-bold text-white backdrop-blur-xl transition hover:border-white/35 hover:bg-white/10"
              >
                Ana profile
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
