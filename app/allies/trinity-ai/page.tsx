import Link from "next/link";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  Download,
  ExternalLink,
  Film,
  Library,
  Mic2,
  Network,
  Rocket,
  Shield,
  Sparkles,
  Store,
} from "lucide-react";
import { createMetadata } from "@/lib/seo";
import TrinityFounderEngineMap from "./TrinityFounderEngineMap";

export const metadata = createMetadata({
  title: "Trinity AI Founder System | FrankX Allies",
  description:
    "A practical founder-creator system for Ahmad Hashem and Trinity AI: local AI lab, OpenClaw, ACOS, agent swarms, media loops, startup offers, and creator distribution.",
  path: "/allies/trinity-ai",
  noindex: true,
});

const publicBaseline = [
  {
    icon: Rocket,
    title: "Trinity AI",
    copy: "Public profiles connect Ahmad with Trinity AI. FrankX treats this page as a practical startup architecture, not a declaration that every proposed system already exists.",
  },
  {
    icon: Store,
    title: "Hashems 1959",
    copy: "Public city and chamber material connect Ahmad with Hashems 1959, a family-rooted food, retail, and hospitality story with community weight.",
  },
  {
    icon: Sparkles,
    title: "Creator presence",
    copy: "Instagram and LinkedIn point toward a founder voice around culture, food as medicine, technology, and personal development.",
  },
  {
    icon: Shield,
    title: "Public-safe first",
    copy: "Deeper biography, private screenshots, testimonials, client claims, and operating details wait for Ahmad's review.",
  },
];

const systemLayers = [
  {
    icon: BrainCircuit,
    title: "Founder operating system",
    copy: "Mission, audience, offer, roadmap, repo map, proof loop, decisions, and weekly cadence.",
  },
  {
    icon: Code2,
    title: "Local Jarvis lab",
    copy: "Mac mini or Mac Studio setup with OpenClaw, voice routines, Hermes-style operator briefs, ACOS, and private repo workflows.",
  },
  {
    icon: Bot,
    title: "Agent swarm",
    copy: "Small markdown agents for chief of staff, repo acceleration, content, media, academy, growth, and brand guardrails.",
  },
  {
    icon: Film,
    title: "Media engine",
    copy: "One idea becomes scripts, images, video, carousel, podcast outline, LinkedIn post, and follow-up prompts.",
  },
  {
    icon: Library,
    title: "Template library",
    copy: "FrankX and SIS templates become practical startup blueprints, not abstract repo tourism.",
  },
  {
    icon: Mic2,
    title: "Academy and podcast",
    copy: "A 2026 creator path: short lessons, founder episodes, guest conversations, and lightweight digital products.",
  },
];

const offerLanes = [
  "Trinity AI founder lab: clarify the first AI-supported product, audience, demo, and delivery system.",
  "OpenClaw local setup: help founders build a private AI workstation around voice, code, memory, and media.",
  "Food as medicine storytelling: turn Hashems 1959 culture and education into careful public content, only where approved.",
  "Creator academy: package the learning journey into courses, workshops, podcasts, and public templates.",
];

const toolStack = [
  "Agentic Creator OS",
  "SIS / SIP",
  "OpenClaw",
  "ArcaneaClaw",
  "Starlight Voice",
  "Codex",
  "Claude",
  "Hermes-style routines",
  "GitHub templates",
  "Vercel preview loop",
];

export default function TrinityAIAllyPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#070807] text-[#fff8ea]">
      <section className="relative overflow-hidden px-5 pb-16 pt-28 md:px-10 md:pb-24 md:pt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(212,176,110,0.20),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(18,94,76,0.24),transparent_32%),radial-gradient(circle_at_56%_84%,rgba(80,120,220,0.10),transparent_38%),linear-gradient(135deg,#070807_0%,#11100c_48%,#06120f_100%)]" />
        <div className="absolute right-[10%] top-24 -z-10 h-56 w-56 rounded-full bg-[#125e4c]/[0.07] blur-3xl" />
        <div className="absolute bottom-10 left-[8%] -z-10 h-72 w-72 rounded-full bg-[#d4b06e]/[0.055] blur-3xl" />

        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.84fr] lg:items-start">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d4b06e]/28 bg-[#d4b06e]/10 px-4 py-2 text-xs font-bold text-[#f7e7c0] shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-2xl">
              <Sparkles className="h-4 w-4" />
              Ally system - noindex first
            </div>
            <h1 className="max-w-5xl text-balance text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              Trinity AI Founder Creator System
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#fff8ea]/76 md:text-xl">
              A practical build path for Ahmad: clarify Trinity AI, set up a
              local AI lab, package the agent swarm, create a creator media
              loop, and turn public attention into proof, offers, and learning.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#fff8ea]/52">
              ACOS and OpenClaw are power tools, not the product. The product is
              Ahmad's founder rhythm: decide, build, publish, learn, improve.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/downloads/ahmad-founder-creator-kit"
                className="inline-flex items-center gap-2 rounded-full bg-[#f7e7c0] px-5 py-3 text-sm font-black text-[#0d0d0b] shadow-[0_20px_70px_rgba(212,176,110,0.18)] transition hover:bg-[#d4b06e]"
              >
                <Download className="h-4 w-4" />
                Download the kit
              </Link>
              <Link
                href="/friends/ahmad"
                className="inline-flex items-center gap-2 rounded-full border border-[#f7e7c0]/20 bg-[#f7e7c0]/[0.055] px-5 py-3 text-sm font-bold text-[#fff8ea] backdrop-blur-xl transition hover:border-[#f7e7c0]/45 hover:bg-[#f7e7c0]/10"
              >
                Friend page
              </Link>
              <Link
                href="/downloads/preview/agentic-creator-os"
                className="inline-flex items-center gap-2 rounded-full border border-[#d4b06e]/25 bg-[#d4b06e]/10 px-5 py-3 text-sm font-bold text-[#f7e7c0] backdrop-blur-xl transition hover:border-[#d4b06e]/45 hover:bg-[#d4b06e]/15"
              >
                Optional ACOS packs
              </Link>
            </div>
          </div>

          <aside className="rounded-[2.7rem] border border-[#f7e7c0]/12 bg-[#f7e7c0]/[0.06] p-5 shadow-[0_34px_130px_rgba(0,0,0,0.46)] backdrop-blur-2xl">
            <div className="rounded-[2.25rem] border border-[#f7e7c0]/10 bg-black/25 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-bold text-[#d4b06e]">
                    V1 source
                  </p>
                  <h2 className="mt-2 text-2xl font-black">FrankX download first</h2>
                </div>
                <div className="grid h-14 w-14 place-items-center rounded-3xl border border-[#d4b06e]/25 bg-[#d4b06e]/12">
                  <Shield className="h-7 w-7 text-[#d4b06e]" />
                </div>
              </div>
              <p className="mt-5 text-sm leading-6 text-[#fff8ea]/64">
                Recommended future GitHub source: `frankxai/ahmad-founder-creator-kit`.
                Until that exists, FrankX hosts the ZIP, checksum, manifest,
                pages, and public download guidance.
              </p>
              <dl className="mt-6 grid gap-3 text-sm">
                {[
                  ["Status", "v0.1.0 starter kit"],
                  ["Public mode", "Shareable, noindex"],
                  ["Plugin", "Not in v1"],
                  ["ACOS", "Optional power layer"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4"
                  >
                    <dt className="text-white/42">{label}</dt>
                    <dd className="mt-1 font-mono text-[#f7e7c0]">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </section>

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 max-w-3xl">
            <p className="text-sm font-bold text-[#d4b06e]">
              Public baseline
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
              Build from what can be checked.
            </h2>
            <p className="mt-4 text-base leading-7 text-[#fff8ea]/64">
              The page deliberately separates public signals from FrankX's
              proposed architecture. That gives Ahmad something useful without
              pretending the whole private system already exists.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {publicBaseline.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-[2.25rem] border border-[#f7e7c0]/10 bg-[#f7e7c0]/[0.045] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.30)] backdrop-blur-2xl"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[#d4b06e]/25 bg-[#d4b06e]/10">
                    <Icon className="h-6 w-6 text-[#d4b06e]" />
                  </div>
                  <h3 className="mt-5 text-xl font-black tracking-tight">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#fff8ea]/62">{item.copy}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 max-w-3xl">
            <p className="text-sm font-bold text-[#d4b06e]">
              System map
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
              Public story becomes private tools, media loops, offers, and proof.
            </h2>
          </div>
          <TrinityFounderEngineMap />
        </div>
      </section>

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.88fr_1.12fr]">
          <article className="rounded-[2.6rem] border border-[#d4b06e]/18 bg-[linear-gradient(145deg,rgba(212,176,110,0.12),rgba(255,255,255,0.04),rgba(18,94,76,0.08))] p-6 shadow-[0_30px_110px_rgba(0,0,0,0.36)] backdrop-blur-2xl md:p-8">
            <div className="flex items-center gap-3 text-sm font-bold text-[#d4b06e]">
              <Network className="h-5 w-5" />
              Architecture
            </div>
            <h2 className="mt-5 text-3xl font-black tracking-tight md:text-4xl">
              The intelligence system should make the founder easier to run.
            </h2>
            <p className="mt-4 text-base leading-7 text-[#fff8ea]/66">
              The first version is document-based on purpose. It gives Ahmad a
              readable starter system before introducing repos, automation,
              dashboards, or plugins.
            </p>
          </article>

          <div className="grid gap-3">
            {systemLayers.map((layer, index) => {
              const Icon = layer.icon;
              return (
                <div
                  key={layer.title}
                  className="grid gap-3 rounded-[1.65rem] border border-[#f7e7c0]/10 bg-black/25 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:grid-cols-[auto_auto_1fr] sm:items-start"
                >
                  <span className="font-mono text-xs text-[#d4b06e]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Icon className="h-5 w-5 text-[#d4b06e]" />
                  <div>
                    <h3 className="text-sm font-black text-[#f7e7c0]">{layer.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-[#fff8ea]/66">{layer.copy}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          <article className="rounded-[2.6rem] border border-[#f7e7c0]/12 bg-[#f7e7c0]/[0.045] p-6 shadow-[0_30px_110px_rgba(0,0,0,0.34)] backdrop-blur-2xl md:p-8">
            <div className="flex items-center gap-3 text-sm font-bold text-[#d4b06e]">
              <BriefcaseBusiness className="h-5 w-5" />
              Offer lanes
            </div>
            <h2 className="mt-5 text-3xl font-black tracking-tight">
              Four ways this can become business.
            </h2>
            <div className="mt-7 grid gap-3">
              {offerLanes.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-[1.45rem] border border-[#f7e7c0]/10 bg-black/25 p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#d4b06e]" />
                  <span className="text-sm leading-6 text-[#fff8ea]/68">{item}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2.6rem] border border-[#f7e7c0]/12 bg-[#08120f]/74 p-6 shadow-[0_30px_110px_rgba(0,0,0,0.34)] backdrop-blur-2xl md:p-8">
            <div className="flex items-center gap-3 text-sm font-bold text-[#d4b06e]">
              <Code2 className="h-5 w-5" />
              Stack he can install
            </div>
            <h2 className="mt-5 text-3xl font-black tracking-tight">
              Powerful, but introduced in the right order.
            </h2>
            <div className="mt-7 flex flex-wrap gap-2">
              {toolStack.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-[#f7e7c0]/10 bg-black/25 px-3 py-1.5 text-xs font-bold text-[#fff8ea]/66"
                >
                  {tool}
                </span>
              ))}
            </div>
            <p className="mt-6 text-sm leading-6 text-[#fff8ea]/62">
              The recommendation is simple: start with the Ahmad kit, then add
              ACOS and OpenClaw once the first offer and content loop are clear.
            </p>
          </article>
        </div>
      </section>

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto rounded-[2.6rem] border border-[#f7e7c0]/12 bg-[#f7e7c0]/[0.045] p-6 shadow-[0_30px_110px_rgba(0,0,0,0.34)] backdrop-blur-2xl md:p-8 lg:max-w-7xl">
          <div className="flex items-center gap-3 text-sm font-bold text-[#d4b06e]">
            <ExternalLink className="h-5 w-5" />
            Source trail
          </div>
          <h2 className="mt-5 text-3xl font-black tracking-tight">
            Public references stay visible.
          </h2>
          <div className="mt-7 grid gap-3 md:grid-cols-2">
            {[
              ["LinkedIn public profile", "https://www.linkedin.com/in/ahmad-hashem-a81812232"],
              ["Instagram public profile", "https://www.instagram.com/ahmadh443/"],
              ["Sterling Heights story", "https://www.sterlingheights.gov/CivicAlerts.aspx?AID=1999"],
              ["Troy Chamber listing", "https://www.troychamber.com/list/member/hashems-1959-18550"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-4 rounded-[1.55rem] border border-[#f7e7c0]/10 bg-black/25 p-4 text-sm font-bold text-[#fff8ea]/74 transition hover:border-[#d4b06e]/35 hover:text-[#f7e7c0]"
              >
                {label}
                <ExternalLink className="h-4 w-4 shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 pt-8 md:px-10 md:pb-24">
        <div className="mx-auto rounded-[2.7rem] border border-[#f7e7c0]/12 bg-[linear-gradient(135deg,rgba(212,176,110,0.12),rgba(255,255,255,0.035),rgba(18,94,76,0.10))] p-6 shadow-[0_34px_126px_rgba(0,0,0,0.44)] backdrop-blur-2xl md:p-9 lg:max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-center">
            <div>
              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[#d4b06e]/25 bg-[#d4b06e]/10">
                <Download className="h-6 w-6 text-[#d4b06e]" />
              </div>
              <h2 className="mt-5 text-3xl font-black tracking-tight md:text-4xl">
                Start with the Ahmad kit. Add the power stack after the rhythm
                is real.
              </h2>
              <p className="mt-4 text-base leading-7 text-[#fff8ea]/66">
                The ZIP gives him agent briefs, offer maps, content workflows,
                install guidance, and the first startup roadmap.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link
                href="/downloads/ahmad-founder-creator-kit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f7e7c0] px-5 py-3 text-sm font-black text-[#0d0d0b] transition hover:bg-[#d4b06e]"
              >
                Download Ahmad kit
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/downloads/preview/agentic-creator-os"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#f7e7c0]/18 bg-[#f7e7c0]/[0.055] px-5 py-3 text-sm font-bold text-[#fff8ea] backdrop-blur-xl transition hover:border-[#f7e7c0]/35 hover:bg-[#f7e7c0]/10"
              >
                Optional ACOS packs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
