import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Compass,
  ExternalLink,
  Heart,
  Lock,
  MessagesSquare,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Ana Cecilia Cancino | Friend of FrankX",
  description:
    "A public-safe friend page for Ana Cecilia Cancino, connecting her HR, psychology, self-knowledge, and AI companion work to a practical business system.",
  path: "/friends/ana",
  noindex: true,
});

const publicSignals = [
  {
    icon: BriefcaseBusiness,
    title: "People and hiring work",
    copy: "Ana's public profiles point to talent acquisition, recruiting, HR, and people work across tech teams and remote companies.",
  },
  {
    icon: Heart,
    title: "Psychology and self-knowledge",
    copy: "Her own site frames the work around soul, body, psychology, faith, and clearer inner dialogue.",
  },
  {
    icon: MessagesSquare,
    title: "Quiet AI companions",
    copy: "Her site already presents AI companions as reflective guides, not as noisy automation mascots.",
  },
];

const howFrankxHelps = [
  "Turn the existing offers into repeatable scripts, intake questions, letters, and follow-up flows.",
  "Package her research and reading into a content library that can become posts, guides, sessions, and small products.",
  "Give her agent briefs she can use with Codex, Claude, or ACOS without needing to become technical first.",
  "Keep public language careful until Ana approves biography, quotes, testimonials, and deeper personal details.",
];

const nextYear = [
  ["Now", "Clarify the three core offers and install a simple intake + follow-up system."],
  ["90 days", "Run the first guided circle, collect feedback, and turn repeated questions into a paid guide."],
  ["6 months", "Create a light digital shop: reflection cards, session templates, reading paths, and workshop prompts."],
  ["12 months", "Run remote-friendly sessions, circles, team workshops, and digital products around her travel rhythm."],
];

export default function AnaFriendPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#080706] text-[#fff8ea]">
      <section className="relative overflow-hidden px-5 pb-16 pt-28 md:px-10 md:pb-24 md:pt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_16%,rgba(212,165,116,0.22),transparent_34%),radial-gradient(circle_at_82%_20%,rgba(31,95,74,0.24),transparent_32%),radial-gradient(circle_at_60%_84%,rgba(107,58,31,0.18),transparent_38%),linear-gradient(135deg,#080706_0%,#13100b_48%,#07120f_100%)]" />
        <div className="absolute left-[9%] top-32 -z-10 h-56 w-56 rounded-full border border-[#d4a574]/10 bg-[#d4a574]/[0.045] blur-3xl" />
        <div className="absolute bottom-10 right-[8%] -z-10 h-72 w-72 rounded-full border border-[#1f5f4a]/10 bg-[#1f5f4a]/[0.08] blur-3xl" />

        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.82fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d4a574]/30 bg-[#d4a574]/10 px-4 py-2 text-xs font-bold text-[#f5edd8] shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-2xl">
              <Sparkles className="h-4 w-4" />
              Friend profile - public-safe draft
            </div>
            <h1 className="max-w-5xl text-balance text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              Ana Cecilia Cancino
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#fff8ea]/76 md:text-xl">
              Ana's own site stays the center of her voice. FrankX adds the
              bridge: a way to turn HR, psychology, faith, embodiment, and
              self-knowledge work into offers, follow-up, content, and a
              travel-friendly AI-assisted business.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#fff8ea]/52">
              Para Ana: sencillo, util, sin hype. No fake quotes. Just a clear
              path from what she already does to offers she can repeat, improve,
              and carry with her.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/allies/ana-cancino"
                className="inline-flex items-center gap-2 rounded-full bg-[#f5edd8] px-5 py-3 text-sm font-black text-[#0e0e0f] shadow-[0_20px_70px_rgba(212,165,116,0.18)] transition hover:bg-[#d4a574]"
              >
                See her business system
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/downloads/ana-ai-business-kit"
                className="inline-flex items-center gap-2 rounded-full border border-[#f5edd8]/20 bg-[#f5edd8]/[0.055] px-5 py-3 text-sm font-bold text-[#fff8ea] backdrop-blur-xl transition hover:border-[#f5edd8]/45 hover:bg-[#f5edd8]/10"
              >
                Download starter kit
              </Link>
              <a
                href="https://www.anaceciliacancino.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#d4a574]/25 bg-[#d4a574]/10 px-5 py-3 text-sm font-bold text-[#f5edd8] backdrop-blur-xl transition hover:border-[#d4a574]/45 hover:bg-[#d4a574]/15"
              >
                Ana's site
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          <aside className="relative rounded-[2.7rem] border border-[#f5edd8]/12 bg-[#f5edd8]/[0.065] p-5 shadow-[0_34px_130px_rgba(0,0,0,0.46)] backdrop-blur-2xl">
            <div className="rounded-[2.25rem] border border-[#f5edd8]/10 bg-black/25 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]">
              <div className="grid h-24 w-24 place-items-center rounded-[2.2rem] border border-[#d4a574]/28 bg-[linear-gradient(145deg,rgba(212,165,116,0.24),rgba(31,95,74,0.18),rgba(255,255,255,0.05))] text-3xl font-black text-[#f5edd8]">
                Ana
              </div>
              <div className="mt-7">
                <p className="text-xs font-bold text-[#d4a574]">
                  Existing center
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight">
                  Soul, people, clarity, and work that can travel.
                </h2>
                <p className="mt-4 text-sm leading-6 text-[#fff8ea]/64">
                  Her site already has a quiet world: offers, companions,
                  research, and a personal language. This page respects that and
                  gives it a business operating layer.
                </p>
              </div>
              <div className="mt-7 grid gap-3">
                {["No fabricated quotes", "No invented credentials", "Approval before indexing"].map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-full border border-[#f5edd8]/10 bg-black/22 px-4 py-3 text-sm text-[#fff8ea]/72"
                    >
                      <Shield className="h-4 w-4 text-[#d4a574]" />
                      {item}
                    </div>
                  ),
                )}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 max-w-3xl">
            <p className="text-sm font-bold text-[#d4a574]">
              What is already real
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
              Start from her current language.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {publicSignals.map((signal) => {
              const Icon = signal.icon;
              return (
                <article
                  key={signal.title}
                  className="rounded-[2.25rem] border border-[#f5edd8]/10 bg-[#f5edd8]/[0.045] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.30)] backdrop-blur-2xl"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[#d4a574]/25 bg-[#d4a574]/10">
                    <Icon className="h-6 w-6 text-[#d4a574]" />
                  </div>
                  <h3 className="mt-5 text-xl font-black tracking-tight">{signal.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#fff8ea]/62">{signal.copy}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[2.6rem] border border-[#d4a574]/18 bg-[linear-gradient(145deg,rgba(212,165,116,0.13),rgba(255,255,255,0.04),rgba(31,95,74,0.10))] p-6 shadow-[0_30px_110px_rgba(0,0,0,0.36)] backdrop-blur-2xl md:p-8">
            <div className="flex items-center gap-3 text-sm font-bold text-[#d4a574]">
              <Compass className="h-5 w-5" />
              FrankX role
            </div>
            <h2 className="mt-5 text-3xl font-black tracking-tight md:text-4xl">
              Make the work easier to repeat without flattening the work.
            </h2>
            <p className="mt-4 text-base leading-7 text-[#fff8ea]/66">
              The goal is not to turn Ana into a software company. The goal is
              to give her a simple system: better intake, better sessions,
              better follow-up, better content reuse, and products that can
              earn while she travels.
            </p>
          </article>

          <div className="grid gap-3">
            {howFrankxHelps.map((item, index) => (
              <div
                key={item}
                className="grid gap-3 rounded-[1.8rem] border border-[#f5edd8]/10 bg-black/25 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:grid-cols-[auto_1fr]"
              >
                <span className="font-mono text-xs text-[#d4a574]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm leading-6 text-[#fff8ea]/70">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold text-[#d4a574]">
                Next year
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
                A freedom engine, in normal words.
              </h2>
            </div>
            <Link
              href="/downloads/ana-ai-business-kit"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-[#f5edd8]/18 bg-[#f5edd8]/[0.055] px-5 py-3 text-sm font-bold text-[#fff8ea] transition hover:border-[#f5edd8]/40 hover:bg-[#f5edd8]/10"
            >
              Open the kit
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {nextYear.map(([time, copy]) => (
              <article
                key={time}
                className="rounded-[2rem] border border-[#f5edd8]/10 bg-[#f5edd8]/[0.045] p-5 backdrop-blur-2xl"
              >
                <p className="font-mono text-xs font-bold text-[#d4a574]">
                  {time}
                </p>
                <p className="mt-4 text-sm leading-6 text-[#fff8ea]/70">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 pt-6 md:px-10 md:pb-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[2.6rem] border border-[#f5edd8]/12 bg-[#08120f]/74 p-6 shadow-[0_34px_120px_rgba(0,0,0,0.42)] backdrop-blur-2xl md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-[#fff8ea]/45">
              <Lock className="h-4 w-4" />
              Approval boundary
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-tight">
              Shareable now. Search-hidden until Ana approves.
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-[#fff8ea]/66">
              The page only uses public-safe framing. Direct words from Ana,
              deeper personal story, client examples, and indexing wait for her
              review.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-full border border-[#d4a574]/20 bg-[#d4a574]/10 px-5 py-3 text-sm font-bold text-[#f5edd8]">
            <CheckCircle2 className="h-4 w-4" />
            Noindex first
          </div>
        </div>
      </section>
    </main>
  );
}
