import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  Download,
  ExternalLink,
  FileText,
  FolderOpen,
  Lock,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "EpicWays Intelligence Starter Kit | FrankX.AI",
  description:
    "Download the EpicWays Intelligence Starter Kit for TheEpicWays client signal, offer design, workshop preparation, follow-up, impact tracking, and agent briefs.",
};

const version = "0.1.0";
const releaseDate = "2026-06-23";
const assetName = "epicways-intelligence-starter-kit-v0.1.0.zip";
const zipUrl = `/downloads/${assetName}`;
const checksumUrl = "/downloads/epicways-intelligence-starter-kit-v0.1.0.sha256";
const checksumSha256 =
  "12af97a15ecf6af2c18b01345231a8d0288bf4ec31454a1c4b7183b3b2f6009c";

const included = [
  {
    title: "Client Signal Brief",
    copy: "Discovery questions, leadership tension map, room angle, and sensitivity notes.",
    icon: MessageCircle,
  },
  {
    title: "Offer Architect",
    copy: "A simple ladder for diagnostic sessions, workshops, labs, events, and retainers.",
    icon: Briefcase,
  },
  {
    title: "Workshop Designer",
    copy: "Agenda builder, exercise design, prompts, materials checklist, and energy checks.",
    icon: CalendarDays,
  },
  {
    title: "Room Memory Pack",
    copy: "Executive summary, decision log, owner tracker, manager scripts, and follow-up email.",
    icon: FileText,
  },
  {
    title: "Impact Dashboard",
    copy: "A CSV tracker for clarity, ownership, decision speed, energy, commitments, and next steps.",
    icon: BarChart3,
  },
  {
    title: "Agent Briefs",
    copy: "Seven practical briefs for Claude, Codex, or a future private client portal.",
    icon: Users,
  },
];

const loops = [
  "Signal - understand the client before designing the room.",
  "Shape - choose the right offer and outcome language.",
  "Room - prepare facilitation, exercises, prompts, and energy.",
  "Memory - turn the session into decisions, owners, and follow-up.",
  "Growth - reuse approved insights for offers, talks, posts, and events.",
];

const nextLayer = [
  "Private Notion, Drive, or portal workspace per client.",
  "Automated intake and follow-up drafts.",
  "Live dashboard for sponsor updates and next actions.",
  "Codex or Claude plugin publishing beyond Frank's local install.",
];

export default function EpicWaysIntelligenceDownloadPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#070808] text-white">
      <section className="relative px-5 pb-14 pt-28 md:px-10 md:pb-20 md:pt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(245,158,11,0.18),transparent_32%),radial-gradient(circle_at_82%_18%,rgba(16,185,129,0.17),transparent_34%),radial-gradient(circle_at_54%_82%,rgba(6,182,212,0.11),transparent_38%),linear-gradient(135deg,#070808_0%,#12110c_48%,#061315_100%)]" />
        <div className="absolute right-[8%] top-24 -z-10 h-56 w-56 rounded-full border border-emerald-100/10 bg-emerald-100/[0.04] blur-3xl" />
        <div className="absolute bottom-10 left-[8%] -z-10 h-64 w-64 rounded-full border border-amber-100/10 bg-amber-100/[0.045] blur-3xl" />

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
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100/20 bg-emerald-100/10 px-4 py-2 text-xs font-bold text-emerald-100">
                <ShieldCheck className="h-4 w-4" />
                Actual starter system - v{version}
              </div>

              <h1 className="mt-5 max-w-4xl text-balance text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
                EpicWays Intelligence Starter Kit
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/74 md:text-xl">
                Yes: this is the real download she can use now. It is a document-based
                client intelligence system for TheEpicWays: prepare the client, shape the
                offer, design the room, capture memory, and follow up with more precision.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={zipUrl}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-black shadow-[0_18px_60px_rgba(255,255,255,0.16)] transition hover:bg-emerald-100"
                >
                  <Download className="h-4 w-4" />
                  Download ZIP
                </a>
                <Link
                  href="/allies/epic-ways"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.045] px-5 py-3 text-sm font-bold text-white backdrop-blur-xl transition hover:border-white/45 hover:bg-white/10"
                >
                  Open system page
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="https://theepicways.com/"
                  className="inline-flex items-center gap-2 rounded-full border border-amber-100/25 bg-amber-100/10 px-5 py-3 text-sm font-bold text-amber-50 backdrop-blur-xl transition hover:border-amber-100/45 hover:bg-amber-100/15"
                >
                  TheEpicWays
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>

            <aside className="relative overflow-hidden rounded-[2.6rem] border border-white/12 bg-white/[0.06] p-5 shadow-[0_30px_120px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
              <div className="rounded-[2.1rem] border border-white/10 bg-black/25 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-xs font-bold text-white/48">
                      Public Asset
                    </p>
                    <h2 className="mt-2 text-2xl font-black">Download package</h2>
                  </div>
                  <div className="grid h-14 w-14 place-items-center rounded-3xl border border-emerald-100/25 bg-emerald-100/12">
                    <FolderOpen className="h-7 w-7 text-emerald-100" />
                  </div>
                </div>

                <dl className="mt-6 grid gap-3 text-sm">
                  <div className="rounded-[1.3rem] border border-white/10 bg-white/[0.04] p-4">
                    <dt className="text-white/42">Version</dt>
                    <dd className="mt-1 font-mono text-emerald-100">v{version}</dd>
                  </div>
                  <div className="rounded-[1.3rem] border border-white/10 bg-white/[0.04] p-4">
                    <dt className="text-white/42">Released</dt>
                    <dd className="mt-1 font-mono text-white/78">{releaseDate}</dd>
                  </div>
                  <div className="rounded-[1.3rem] border border-white/10 bg-white/[0.04] p-4">
                    <dt className="text-white/42">Asset</dt>
                    <dd className="mt-1 break-all font-mono text-white/78">{assetName}</dd>
                  </div>
                  <div className="rounded-[1.3rem] border border-white/10 bg-white/[0.04] p-4">
                    <dt className="text-white/42">SHA-256</dt>
                    <dd className="mt-1 break-all font-mono text-xs leading-5 text-amber-100">
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
            <p className="text-sm font-semibold text-emerald-100">
              What She Gets
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
              A working kit, not a concept note.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/66 md:text-lg md:leading-8">
              The ZIP contains reusable files she can put straight into a private
              workspace and adapt for real clients.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {included.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.065),rgba(255,255,255,0.025))] p-6 shadow-[0_22px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition hover:-translate-y-1 hover:border-emerald-100/35"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/12 bg-black/25">
                    <Icon className="h-6 w-6 text-emerald-100" />
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
          <article className="rounded-[2.4rem] border border-amber-100/20 bg-[linear-gradient(145deg,rgba(245,158,11,0.12),rgba(255,255,255,0.04),rgba(16,185,129,0.08))] p-6 shadow-[0_28px_100px_rgba(0,0,0,0.36)] backdrop-blur-2xl md:p-8">
            <div className="flex items-center gap-3 text-sm font-bold text-amber-100">
              <Sparkles className="h-5 w-5" />
              The Operating Loop
            </div>
            <h2 className="mt-5 text-3xl font-black tracking-tight md:text-4xl">
              How it helps her clients.
            </h2>
            <div className="mt-7 grid gap-3">
              {loops.map((loop, index) => (
                <div
                  key={loop}
                  className="grid gap-3 rounded-[1.6rem] border border-white/10 bg-black/25 p-4 backdrop-blur-xl sm:grid-cols-[auto_1fr]"
                >
                  <span className="font-mono text-xs text-amber-100">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-6 text-white/72">{loop}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2.4rem] border border-white/12 bg-[#081111]/72 p-6 shadow-[0_28px_100px_rgba(0,0,0,0.36)] backdrop-blur-2xl md:p-8">
            <div className="flex items-center gap-3 text-sm font-bold text-emerald-100">
              <Lock className="h-5 w-5" />
              Honest Boundary
            </div>
            <h2 className="mt-5 text-3xl font-black tracking-tight md:text-4xl">
              It is real now. It is not the full portal yet.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/66">
              This release is the usable starter system: templates, prompts, agent briefs,
              a dashboard CSV, and privacy rules. The next layer is the live private client
              workspace with automation and reporting.
            </p>
            <div className="mt-7 grid gap-3">
              {nextLayer.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-[1.4rem] border border-white/10 bg-black/25 p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-100" />
                  <span className="text-sm leading-6 text-white/68">{item}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="px-5 pb-16 pt-8 md:px-10 md:pb-24">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-white/12 bg-white/[0.045] p-6 shadow-[0_36px_120px_rgba(0,0,0,0.42)] backdrop-blur-2xl md:p-9">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <div>
              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-emerald-100/20 bg-emerald-100/10">
                <Download className="h-6 w-6 text-emerald-100" />
              </div>
              <h2 className="mt-5 text-3xl font-black tracking-tight md:text-4xl">
                Give her this link.
              </h2>
              <p className="mt-4 text-base leading-7 text-white/66">
                The page explains what she can download, what it does, and what still needs
                to be built if she wants a full private client portal.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <a
                href={zipUrl}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-emerald-100"
              >
                <Download className="h-4 w-4" />
                Download starter kit
              </a>
              <Link
                href="/friends/estefania"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.045] px-5 py-3 text-sm font-bold text-white backdrop-blur-xl transition hover:border-white/35 hover:bg-white/10"
              >
                Estefania profile
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
