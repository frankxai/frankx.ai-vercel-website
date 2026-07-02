import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  FileText,
  Fingerprint,
  Handshake,
  LayoutTemplate,
  MessageCircle,
  Network,
  Orbit,
  PanelsTopLeft,
  PenTool,
  Sparkles,
  Users,
  Wand2,
} from "lucide-react";
import { createMetadata } from "@/lib/seo";
import EpicWaysIntelligenceMap from "./EpicWaysIntelligenceMap";
import EpicWaysMotionLayer from "./EpicWaysMotionLayer";

export const metadata = createMetadata({
  title: "TheEpicWays Intelligence System | Allies",
  description:
    "A FrankX ally architecture for Estefania Badra and TheEpicWays: leadership workshops, events, client intelligence, agents, follow-up, and delivery systems.",
  path: "/allies/epic-ways",
});

const foundations = [
  {
    icon: Users,
    title: "Room first",
    copy: "The live room stays hers: voice, courage, facilitation, decisions, and the trust people feel when she leads.",
  },
  {
    icon: Brain,
    title: "Intelligence Backstage",
    copy: "Codex, Claude, templates, research, and memory support the work without making the brand feel automated.",
  },
  {
    icon: BarChart3,
    title: "Proof After The Room",
    copy: "Every workshop should leave a sharper action plan, clearer owners, and better evidence of behavior change.",
  },
];

const loops = [
  {
    phase: "Signal",
    icon: MessageCircle,
    copy: "Read the client context, team tension, audience, culture, urgency, and constraints before the offer is written.",
  },
  {
    phase: "Shape",
    icon: LayoutTemplate,
    copy: "Turn raw context into a clean product path: workshop, leadership lab, event, 1:1, or retainer.",
  },
  {
    phase: "Room",
    icon: CalendarDays,
    copy: "Prepare agenda, exercises, slides, prompts, energy checks, and facilitation notes that keep the room alive.",
  },
  {
    phase: "Memory",
    icon: FileText,
    copy: "Capture decisions, commitments, scripts, follow-up messages, owner trackers, and next-step packs.",
  },
  {
    phase: "Growth",
    icon: Sparkles,
    copy: "Reuse approved insights for proposals, talks, posts, case studies, event clips, and improved offers.",
  },
];

const agentPack = [
  {
    title: "Client Signal Agent",
    icon: MessageCircle,
    output: "Discovery brief, tension map, and pre-room questions.",
  },
  {
    title: "Offer Architect",
    icon: Briefcase,
    output: "Proposal, product tier, deliverables, and outcome language.",
  },
  {
    title: "Workshop Designer",
    icon: PenTool,
    output: "Agenda, exercises, prompts, slides, and facilitation plan.",
  },
  {
    title: "Room Memory Agent",
    icon: BookOpen,
    output: "Summary, decisions, action tracker, and manager scripts.",
  },
  {
    title: "Impact Analyst",
    icon: BarChart3,
    output: "Clarity, ownership, decision speed, retention risk, and energy signals.",
  },
  {
    title: "Content Repurposer",
    icon: Wand2,
    output: "Approved posts, scripts, newsletters, talks, and event assets.",
  },
];

const offerLadder = [
  "Leadership diagnostic session",
  "Communication intensive workshop",
  "Leadership Lab program",
  "EpicVoices event experience",
  "Client intelligence retainer",
];

const buildStack = [
  "Codex and Claude skill pack",
  "Installable EpicWays Intelligence plugin",
  "Notion or Drive client workspace",
  "Sheets or lightweight CRM dashboard",
  "Mermaid and XYFlow diagrams",
  "GSAP motion for explainable loops",
];

const clientValue = [
  "Clients arrive understood before the room starts.",
  "Workshops feel bespoke without rebuilding from scratch every time.",
  "Follow-up becomes a product, not an afterthought.",
  "TheEpicWays can prove progress without reducing the work to generic metrics.",
  "Approved insights compound into content and future offers.",
];

export default function EpicWaysAllyPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#070808] text-white">
      <EpicWaysMotionLayer />

      <section className="relative overflow-hidden px-5 pb-16 pt-28 md:px-10 md:pb-24 md:pt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_12%,rgba(245,158,11,0.20),transparent_30%),radial-gradient(circle_at_72%_16%,rgba(16,185,129,0.18),transparent_34%),radial-gradient(circle_at_58%_78%,rgba(6,182,212,0.12),transparent_36%),linear-gradient(135deg,#070808_0%,#10100c_44%,#061315_100%)]" />
        <div
          data-epic-pulse
          className="absolute right-[8%] top-24 -z-10 h-56 w-56 rounded-full border border-emerald-200/10 bg-emerald-200/[0.035] blur-3xl"
        />
        <div
          data-epic-pulse
          className="absolute bottom-12 left-[10%] -z-10 h-64 w-64 rounded-full border border-amber-200/10 bg-amber-200/[0.035] blur-3xl"
        />

        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div>
            <div className="mb-5 flex flex-wrap gap-3">
              <Link
                href="/allies"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.055] px-4 py-2 text-xs font-bold text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl transition hover:border-white/35 hover:text-white"
              >
                <ArrowRight className="h-3.5 w-3.5 rotate-180" />
                Allies
              </Link>
              <Link
                href="/friends/estefania"
                className="inline-flex items-center gap-2 rounded-full border border-amber-200/25 bg-amber-200/10 px-4 py-2 text-xs font-bold text-amber-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl transition hover:border-amber-100/45"
              >
                Estefania
              </Link>
            </div>

            <p className="text-sm font-semibold text-emerald-100">
              TheEpicWays Intelligence System
            </p>
            <h1 className="mt-4 max-w-4xl text-balance text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              Better rooms. Stronger follow-through.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/74 md:text-xl">
              Estefania Badra already owns the leadership, communication,
              workshops, events, and room energy. FrankX should give her the
              backstage system that makes every client experience sharper
              before, during, and after the room.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://theepicways.com/"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-black shadow-[0_18px_60px_rgba(255,255,255,0.16)] transition hover:bg-amber-100"
              >
                Visit TheEpicWays
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="mailto:frank@frankx.ai?subject=TheEpicWays%20Client%20Intelligence%20System"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.045] px-5 py-3 text-sm font-bold text-white backdrop-blur-xl transition hover:border-white/45 hover:bg-white/10"
              >
                Build the system
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/downloads/epicways-intelligence"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-100/25 bg-emerald-100/10 px-5 py-3 text-sm font-bold text-emerald-50 backdrop-blur-xl transition hover:border-emerald-100/45 hover:bg-emerald-100/15"
              >
                Download starter kit
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {["Approval-aware", "Agent-ready", "Client-ready"].map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-center text-xs font-bold text-white/62 backdrop-blur-xl"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div data-epic-float className="relative">
            <div className="absolute -inset-1 rounded-[2.4rem] bg-[linear-gradient(115deg,rgba(245,158,11,0.24),rgba(16,185,129,0.22),rgba(6,182,212,0.18))] blur-xl" />
            <EpicWaysIntelligenceMap />
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-amber-100">
              Corrected Foundation
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
              The tech should improve delivery, not become the story.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/66 md:text-lg md:leading-8">
              The system is not a crypto story, not a cold dashboard, and not a
              generic AI agency wrapper. It is a client-service intelligence
              layer for a leadership company: listen better, design better,
              follow up better, and remember what worked.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {foundations.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  data-epic-gleam
                  className="rounded-[2rem] border border-white/10 bg-[linear-gradient(120deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025),rgba(255,255,255,0.08))] bg-[length:220%_100%] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition hover:-translate-y-1 hover:border-emerald-100/35"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/12 bg-black/20">
                    <Icon className="h-6 w-6 text-amber-100" />
                  </div>
                  <h3 className="mt-5 text-2xl font-black tracking-tight">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/64">{item.copy}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="sticky top-28 rounded-[2.2rem] border border-white/12 bg-white/[0.045] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.32)] backdrop-blur-2xl md:p-8">
            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-emerald-200/20 bg-emerald-200/10">
              <Orbit className="h-6 w-6 text-emerald-100" />
            </div>
            <p className="mt-6 text-sm font-bold text-emerald-100">
              Service Loop
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
              Before, during, after, and compounding.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/66">
              The page should show how clients benefit from the system, not just
              that a system exists. This is the practical loop behind better
              workshops, stronger leaders, and cleaner business outcomes.
            </p>
          </div>

          <div className="grid gap-4">
            {loops.map((loop, index) => {
              const Icon = loop.icon;
              return (
                <article
                  key={loop.phase}
                  className="group grid gap-5 rounded-[2rem] border border-white/10 bg-black/25 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition hover:border-emerald-100/30 hover:bg-white/[0.045] md:grid-cols-[auto_1fr]"
                >
                  <div className="flex items-center gap-4 md:block">
                    <div className="grid h-14 w-14 place-items-center rounded-3xl border border-white/12 bg-white/[0.055] transition group-hover:border-emerald-100/35">
                      <Icon className="h-6 w-6 text-emerald-100" />
                    </div>
                    <span className="font-mono text-xs text-amber-100 md:mt-4 md:block">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight">{loop.phase}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/65 md:text-base md:leading-7">
                      {loop.copy}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-5 py-14 md:px-10 md:py-20">
        <div className="absolute inset-x-0 top-1/2 -z-10 h-px bg-gradient-to-r from-transparent via-emerald-200/20 to-transparent" />
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-cyan-100">
                Agent Pack
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
                Installable skills, not vague AI magic.
              </h2>
            </div>
            <div className="rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-xs font-bold text-white/58 backdrop-blur-xl">
              Codex + Claude Ready
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {agentPack.map((agent) => {
              const Icon = agent.icon;
              return (
                <article
                  key={agent.title}
                  className="rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-6 shadow-[0_22px_70px_rgba(0,0,0,0.24)] backdrop-blur-2xl transition hover:-translate-y-1 hover:border-cyan-100/30"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl border border-cyan-100/20 bg-cyan-100/10">
                      <Icon className="h-6 w-6 text-cyan-100" />
                    </div>
                    <Network className="h-4 w-4 text-white/28" />
                  </div>
                  <h3 className="mt-5 text-xl font-black tracking-tight">{agent.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/64">{agent.output}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.92fr_1.08fr]">
          <article className="rounded-[2.2rem] border border-amber-100/20 bg-[linear-gradient(145deg,rgba(245,158,11,0.13),rgba(255,255,255,0.045),rgba(16,185,129,0.08))] p-6 shadow-[0_28px_100px_rgba(0,0,0,0.36)] backdrop-blur-2xl md:p-8">
            <div className="flex items-center gap-3 text-sm font-bold text-amber-100">
              <PanelsTopLeft className="h-5 w-5" />
              Offer Ladder
            </div>
            <h2 className="mt-5 text-3xl font-black tracking-tight md:text-4xl">
              How she can provide this.
            </h2>
            <div className="mt-7 grid gap-3">
              {offerLadder.map((offer, index) => (
                <div
                  key={offer}
                  className="flex items-center justify-between gap-4 rounded-full border border-white/10 bg-black/25 px-4 py-3 backdrop-blur-xl"
                >
                  <span className="text-sm font-bold text-white/76">{offer}</span>
                  <span className="font-mono text-xs text-amber-100">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2.2rem] border border-emerald-100/20 bg-white/[0.045] p-6 shadow-[0_28px_100px_rgba(0,0,0,0.32)] backdrop-blur-2xl md:p-8">
            <div className="flex items-center gap-3 text-sm font-bold text-emerald-100">
              <Fingerprint className="h-5 w-5" />
              FrankX Build Stack
            </div>
            <h2 className="mt-5 text-3xl font-black tracking-tight md:text-4xl">
              The technology becomes a service advantage.
            </h2>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {buildStack.map((item) => (
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
        <div className="mx-auto max-w-7xl rounded-[2.4rem] border border-white/12 bg-[#081111]/72 p-6 shadow-[0_36px_120px_rgba(0,0,0,0.42)] backdrop-blur-2xl md:p-9">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/12 bg-white/[0.055]">
                <Handshake className="h-6 w-6 text-emerald-100" />
              </div>
              <p className="mt-6 text-sm font-semibold text-white/45">
              Client value
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
                Better service, not louder tech.
              </h2>
              <p className="mt-4 text-base leading-7 text-white/66">
                The public promise should stay clear: TheEpicWays helps people
                lead better. The deeper architecture makes that promise easier
                to deliver repeatedly.
              </p>
            </div>

            <div className="grid gap-3">
              {clientValue.map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.035] px-5 py-3 text-sm leading-6 text-white/70 backdrop-blur-xl"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row">
            <Link
              href="/friends/estefania"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.045] px-5 py-3 text-sm font-bold text-white backdrop-blur-xl transition hover:border-white/35 hover:bg-white/10"
            >
              Open friend profile
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/allies"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.045] px-5 py-3 text-sm font-bold text-white backdrop-blur-xl transition hover:border-white/35 hover:bg-white/10"
            >
              Back to allies
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/downloads/epicways-intelligence"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-emerald-100"
            >
              Download starter kit
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
