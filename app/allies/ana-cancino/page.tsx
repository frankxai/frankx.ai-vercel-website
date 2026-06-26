import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  Download,
  ExternalLink,
  HeartHandshake,
  Library,
  MessagesSquare,
  Plane,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import { createMetadata } from "@/lib/seo";
import AnaFreedomEngineMap from "./AnaFreedomEngineMap";

export const metadata = createMetadata({
  title: "Ana AI Business Kit | FrankX Allies",
  description:
    "A practical AI-supported business system for Ana Cecilia Cancino: HR, psychology, self-knowledge, offers, client follow-up, content, and travel-friendly revenue.",
  path: "/allies/ana-cancino",
  noindex: true,
});

const existingOffers = [
  {
    icon: HeartHandshake,
    title: "Personal Clarity Session",
    copy: "A focused 1:1 doorway for people who want clearer language around what is happening inside and what to do next.",
  },
  {
    icon: Users,
    title: "Guided Reflection Circle",
    copy: "A small-group container for shared reflection, questions, and meaning-making without turning it into a performance.",
  },
  {
    icon: BookOpen,
    title: "Self-Knowledge Workshop",
    copy: "A structured workshop format that can become her repeatable teaching and facilitation product.",
  },
  {
    icon: BriefcaseBusiness,
    title: "HR and Soul Work for teams",
    copy: "Proposed expansion only: use her people background to help teams with trust, hiring, role clarity, and humane communication.",
  },
];

const deliveryLoop = [
  ["Listen", "Intake questions, public context, client story, and what the person or team is asking for."],
  ["Clarify", "Name the real tension, the desired outcome, and the safest container for the work."],
  ["Design", "Choose the session, circle, workshop, or team format. Prepare prompts and boundaries."],
  ["Host", "Run the live work with Ana's voice in front and AI only backstage."],
  ["Send", "Deliver a letter, summary, next steps, and optional follow-up prompts."],
  ["Reuse", "Turn approved patterns into posts, guides, templates, and better offers."],
];

const agentPack = [
  "Mirror Agent",
  "Research Curator",
  "Library Cartographer",
  "Blog Publisher",
  "Workshop Architect",
  "Brand Guardian",
  "Offer Builder",
  "Freedom Engine Steward",
];

const businessModel = [
  "Entry: paid clarity sessions with a clear intake and aftercare letter.",
  "Core: guided reflection circles and self-knowledge workshops.",
  "Professional: proposed HR and team clarity sessions for founders and small teams.",
  "Async: reflection cards, mini-guides, reading paths, and workshop templates.",
  "Compounding: every approved client pattern improves the next session, post, product, or workshop.",
];

export default function AnaAllyPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#080706] text-[#fff8ea]">
      <section className="relative overflow-hidden px-5 pb-16 pt-28 md:px-10 md:pb-24 md:pt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(212,165,116,0.20),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(31,95,74,0.22),transparent_32%),radial-gradient(circle_at_56%_84%,rgba(232,169,81,0.13),transparent_38%),linear-gradient(135deg,#080706_0%,#13100b_48%,#06110e_100%)]" />
        <div className="absolute right-[10%] top-24 -z-10 h-56 w-56 rounded-full bg-[#1f5f4a]/[0.07] blur-3xl" />
        <div className="absolute bottom-10 left-[8%] -z-10 h-72 w-72 rounded-full bg-[#d4a574]/[0.055] blur-3xl" />

        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.84fr] lg:items-start">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d4a574]/28 bg-[#d4a574]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#f5edd8] shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-2xl">
              <Sparkles className="h-4 w-4" />
              Ally system - noindex first
            </div>
            <h1 className="max-w-5xl text-balance text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              Ana AI Business Kit
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#fff8ea]/76 md:text-xl">
              A practical system for Ana to turn HR, psychology, faith,
              embodiment, research, and self-knowledge work into clearer offers,
              better client follow-up, useful content, and travel-friendly
              income.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#fff8ea]/52">
              The site stays human. The agents stay backstage. The business gets
              easier to run.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/downloads/ana-ai-business-kit"
                className="inline-flex items-center gap-2 rounded-full bg-[#f5edd8] px-5 py-3 text-sm font-black text-[#0e0e0f] shadow-[0_20px_70px_rgba(212,165,116,0.18)] transition hover:bg-[#d4a574]"
              >
                <Download className="h-4 w-4" />
                Download the kit
              </Link>
              <Link
                href="/friends/ana"
                className="inline-flex items-center gap-2 rounded-full border border-[#f5edd8]/20 bg-[#f5edd8]/[0.055] px-5 py-3 text-sm font-bold text-[#fff8ea] backdrop-blur-xl transition hover:border-[#f5edd8]/45 hover:bg-[#f5edd8]/10"
              >
                Friend page
              </Link>
              <a
                href="https://www.anaceciliacancino.com/work-with-me"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#d4a574]/25 bg-[#d4a574]/10 px-5 py-3 text-sm font-bold text-[#f5edd8] backdrop-blur-xl transition hover:border-[#d4a574]/45 hover:bg-[#d4a574]/15"
              >
                Ana's offers
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          <aside className="rounded-[2.7rem] border border-[#f5edd8]/12 bg-[#f5edd8]/[0.06] p-5 shadow-[0_34px_130px_rgba(0,0,0,0.46)] backdrop-blur-2xl">
            <div className="rounded-[2.25rem] border border-[#f5edd8]/10 bg-black/25 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d4a574]">
                    V1 source
                  </p>
                  <h2 className="mt-2 text-2xl font-black">FrankX download first</h2>
                </div>
                <div className="grid h-14 w-14 place-items-center rounded-3xl border border-[#d4a574]/25 bg-[#d4a574]/12">
                  <Shield className="h-7 w-7 text-[#d4a574]" />
                </div>
              </div>
              <p className="mt-5 text-sm leading-6 text-[#fff8ea]/64">
                The GitHub repo should be `frankxai/ana-ai-business-kit` once it
                exists. Until then, FrankX hosts the ZIP, checksum, and
                machine-readable manifest.
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
                    <dd className="mt-1 font-mono text-[#f5edd8]">{value}</dd>
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
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#d4a574]">
              Offer ladder
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
              Use what she already has.
            </h2>
            <p className="mt-4 text-base leading-7 text-[#fff8ea]/64">
              The business does not need a giant platform first. It needs clean
              offers, a private operating system, and a way for approved insight
              to become reusable assets.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {existingOffers.map((offer) => {
              const Icon = offer.icon;
              return (
                <article
                  key={offer.title}
                  className="rounded-[2.25rem] border border-[#f5edd8]/10 bg-[#f5edd8]/[0.045] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.30)] backdrop-blur-2xl"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[#d4a574]/25 bg-[#d4a574]/10">
                    <Icon className="h-6 w-6 text-[#d4a574]" />
                  </div>
                  <h3 className="mt-5 text-xl font-black tracking-tight">{offer.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#fff8ea]/62">{offer.copy}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#d4a574]">
              System map
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
              Voice and research become offers, delivery, products, and freedom.
            </h2>
          </div>
          <AnaFreedomEngineMap />
        </div>
      </section>

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.88fr_1.12fr]">
          <article className="rounded-[2.6rem] border border-[#d4a574]/18 bg-[linear-gradient(145deg,rgba(212,165,116,0.12),rgba(255,255,255,0.04),rgba(31,95,74,0.08))] p-6 shadow-[0_30px_110px_rgba(0,0,0,0.36)] backdrop-blur-2xl md:p-8">
            <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-[#d4a574]">
              <MessagesSquare className="h-5 w-5" />
              Client delivery loop
            </div>
            <h2 className="mt-5 text-3xl font-black tracking-tight md:text-4xl">
              Simple enough to use. Strong enough to repeat.
            </h2>
            <p className="mt-4 text-base leading-7 text-[#fff8ea]/66">
              Every client interaction should leave behind a private artifact:
              the question, the pattern, the next step, and the aftercare. That
              is how the work compounds without becoming cold.
            </p>
          </article>

          <div className="grid gap-3">
            {deliveryLoop.map(([label, copy], index) => (
              <div
                key={label}
                className="grid gap-3 rounded-[1.65rem] border border-[#f5edd8]/10 bg-black/25 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:grid-cols-[auto_0.24fr_1fr] sm:items-center"
              >
                <span className="font-mono text-xs text-[#d4a574]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-black text-[#f5edd8]">{label}</span>
                <span className="text-sm leading-6 text-[#fff8ea]/66">{copy}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          <article className="rounded-[2.6rem] border border-[#f5edd8]/12 bg-[#f5edd8]/[0.045] p-6 shadow-[0_30px_110px_rgba(0,0,0,0.34)] backdrop-blur-2xl md:p-8">
            <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-[#d4a574]">
              <Library className="h-5 w-5" />
              Agent pack
            </div>
            <h2 className="mt-5 text-3xl font-black tracking-tight">
              Eight small helpers, written as markdown.
            </h2>
            <div className="mt-7 flex flex-wrap gap-2">
              {agentPack.map((agent) => (
                <span
                  key={agent}
                  className="rounded-full border border-[#f5edd8]/10 bg-black/25 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#fff8ea]/66"
                >
                  {agent}
                </span>
              ))}
            </div>
            <p className="mt-6 text-sm leading-6 text-[#fff8ea]/62">
              These are not a Codex plugin yet. They are practical agent briefs
              Ana can paste into Claude, Codex, or a private workspace.
            </p>
          </article>

          <article className="rounded-[2.6rem] border border-[#f5edd8]/12 bg-[#08120f]/74 p-6 shadow-[0_30px_110px_rgba(0,0,0,0.34)] backdrop-blur-2xl md:p-8">
            <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-[#d4a574]">
              <Plane className="h-5 w-5" />
              Business model
            </div>
            <h2 className="mt-5 text-3xl font-black tracking-tight">
              Money while travelling, without pretending it is passive magic.
            </h2>
            <div className="mt-7 grid gap-3">
              {businessModel.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-[1.45rem] border border-[#f5edd8]/10 bg-black/25 p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#d4a574]" />
                  <span className="text-sm leading-6 text-[#fff8ea]/68">{item}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="px-5 pb-16 pt-8 md:px-10 md:pb-24">
        <div className="mx-auto rounded-[2.7rem] border border-[#f5edd8]/12 bg-[linear-gradient(135deg,rgba(212,165,116,0.12),rgba(255,255,255,0.035),rgba(31,95,74,0.10))] p-6 shadow-[0_34px_126px_rgba(0,0,0,0.44)] backdrop-blur-2xl md:p-9 lg:max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-center">
            <div>
              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[#d4a574]/25 bg-[#d4a574]/10">
                <Download className="h-6 w-6 text-[#d4a574]" />
              </div>
              <h2 className="mt-5 text-3xl font-black tracking-tight md:text-4xl">
                Start with the Ana kit. Add ACOS only when useful.
              </h2>
              <p className="mt-4 text-base leading-7 text-[#fff8ea]/66">
                ACOS can help Codex or Claude run the workflows, but Ana's
                system should be readable even with no tooling installed.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link
                href="/downloads/ana-ai-business-kit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f5edd8] px-5 py-3 text-sm font-black text-[#0e0e0f] transition hover:bg-[#d4a574]"
              >
                Download Ana kit
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/downloads/preview/agentic-creator-os"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#f5edd8]/18 bg-[#f5edd8]/[0.055] px-5 py-3 text-sm font-bold text-[#fff8ea] backdrop-blur-xl transition hover:border-[#f5edd8]/35 hover:bg-[#f5edd8]/10"
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
