import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Gift,
  Heart,
  Handshake,
  MessageCircle,
  Network,
  Shield,
  Sparkles,
  Users,
  UserCheck,
} from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { GlowCard } from "@/components/ui/glow-card";

export const metadata = createMetadata({
  title: "Friends",
  description:
    "Friends of FrankX, a public index of people Frank is actively helping with pages, starter kits, and system bridges.",
  path: "/friends",
});

const portalRoles = [
  {
    icon: Heart,
    title: "Context before system",
    copy: "A friend page explains why this person is here, what is verified, and which parts are still approval-only.",
  },
  {
    icon: Gift,
    title: "A working asset",
    copy: "Every page points to something real: an offer, a kit, an ally system, an official site, or a clear next step.",
  },
  {
    icon: Shield,
    title: "Approval boundary",
    copy: "Public pages stay careful until the person approves deeper biography, testimonials, screenshots, and personal details.",
  },
];

const visitorQuestions = [
  {
    icon: UserCheck,
    title: "Who is this person?",
    copy: "A concise read based on public context and the relationship to the system being built.",
  },
  {
    icon: BookOpen,
    title: "What are they building?",
    copy: "The current offer, practice, company, or body of work, explained in language a real visitor can understand.",
  },
  {
    icon: Handshake,
    title: "What can I do next?",
    copy: "Open their site, read the ally page, download a kit, make an introduction, or start a thoughtful conversation.",
  },
];

export default function FriendsPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#070808] text-white">
      <section className="relative overflow-hidden px-5 pb-16 pt-28 md:px-10 md:pb-24 md:pt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(245,158,11,0.19),transparent_34%),radial-gradient(circle_at_82%_20%,rgba(16,185,129,0.16),transparent_31%),radial-gradient(circle_at_58%_82%,rgba(6,182,212,0.12),transparent_36%),linear-gradient(135deg,#070808_0%,#10100c_50%,#071113_100%)]" />
        <div className="absolute right-[10%] top-24 -z-10 h-56 w-56 rounded-full bg-amber-200/[0.05] blur-3xl" />
        <div className="absolute bottom-12 left-[8%] -z-10 h-64 w-64 rounded-full bg-emerald-200/[0.045] blur-3xl" />

        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.78fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-200/25 bg-amber-200/10 px-4 py-2 text-xs font-semibold text-amber-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl">
              <Users className="h-4 w-4" />
              Friends
            </div>
            <h1 className="max-w-4xl text-balance text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              Friend pages that explain the work.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 md:text-xl">
              This hub shows who FrankX is actively helping, what each person
              can use today, and where a public profile connects to a business
              system, download, or next build.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/friends/ahmad"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-200/30 bg-emerald-200/10 px-5 py-3 text-sm font-bold text-emerald-50 backdrop-blur-xl transition hover:border-emerald-100/55 hover:bg-emerald-200/15"
              >
                Open Ahmad
              </Link>
              <Link
                href="/friends/jojo"
                className="inline-flex items-center gap-2 rounded-full border border-amber-200/25 bg-amber-200/10 px-5 py-3 text-sm font-bold text-amber-50 backdrop-blur-xl transition hover:border-amber-100/55 hover:bg-amber-200/15"
              >
                Open Jojo
              </Link>
              <Link
                href="/friends/estefania"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.045] px-5 py-3 text-sm font-bold text-white backdrop-blur-xl transition hover:border-white/45 hover:bg-white/10"
              >
                Open Estefania
              </Link>
              <Link
                href="/allies"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.045] px-5 py-3 text-sm font-bold text-white backdrop-blur-xl transition hover:border-white/45 hover:bg-white/10"
              >
                Allies portal
              </Link>
            </div>
          </div>

          <aside className="relative rounded-[2.35rem] border border-white/12 bg-white/[0.055] p-5 shadow-[0_30px_120px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-xs font-semibold text-white/45">
                  Route logic
                </p>
                <p className="mt-1 text-lg font-bold text-white">Profile to system</p>
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-amber-100/20 bg-amber-100/10">
                <Network className="h-6 w-6 text-amber-100" />
              </div>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-3">
              {[
                ["Profile", "Public context, verified links, and the reason this person is included."],
                ["System page", "Offers, delivery loops, downloads, and business architecture."],
                ["Kit", "Prompts, agent briefs, routines, repos, launch steps, and durable assets."],
              ].map(([title, copy], index) => (
                <div
                  key={title}
                  className="rounded-[1.45rem] border border-white/10 bg-black/25 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-black text-white">{title}</p>
                    <span className="font-mono text-xs text-amber-100">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-white/62">{copy}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold text-amber-100">
              Current people
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
              Each profile should answer the visitor’s next question.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/64">
              The point is not to collect names. It is to make each relationship
              legible: what exists, what FrankX can help build, what can be
              downloaded, and what still needs approval.
            </p>
          </div>

          <GlowCard color="amber" className="grid overflow-hidden rounded-[2.5rem] p-0 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="bg-[linear-gradient(145deg,rgba(245,158,11,0.22),rgba(16,185,129,0.13),rgba(255,255,255,0.04))] p-7 md:p-9">
              <div className="flex h-full min-h-[320px] flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-xs font-bold text-white/72 backdrop-blur-xl">
                    <Sparkles className="h-3.5 w-3.5 text-amber-100" />
                    Founder Friend
                  </div>
                  <h3 className="mt-6 text-4xl font-black tracking-tight md:text-5xl">
                    Estefania Badra
                  </h3>
                  <p className="mt-4 text-lg leading-8 text-white/76">
                    Founder of TheEpicWays, building leadership, communication,
                    training, consulting, and event experiences for people who
                    want to lead with clarity and energy.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/friends/estefania"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-black transition hover:bg-amber-100"
                  >
                    Open profile
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/allies/epic-ways"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.045] px-4 py-2.5 text-sm font-bold text-white transition hover:border-white/45 hover:bg-white/10"
                  >
                    TheEpicWays
                  </Link>
                  <Link
                    href="/downloads/epicways-intelligence"
                    className="inline-flex items-center gap-2 rounded-full border border-amber-200/25 bg-amber-200/10 px-4 py-2.5 text-sm font-bold text-amber-50 transition hover:border-amber-100/45 hover:bg-amber-200/15"
                  >
                    Download kit
                  </Link>
                </div>
              </div>
            </div>
            <div className="p-7 md:p-9">
              <div className="grid gap-4">
                {portalRoles.map((role) => {
                  const Icon = role.icon;
                  return (
                    <div
                      key={role.title}
                      className="flex gap-4 rounded-[1.5rem] border border-white/10 bg-black/25 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                    >
                      <Icon className="mt-1 h-5 w-5 shrink-0 text-amber-100" />
                      <div>
                        <h4 className="font-black text-white">{role.title}</h4>
                        <p className="mt-1 text-sm leading-6 text-white/62">
                          {role.copy}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </GlowCard>

          <GlowCard color="amber" className="mt-5 grid overflow-hidden rounded-[2.5rem] p-0 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="bg-[linear-gradient(145deg,rgba(212,176,110,0.22),rgba(18,94,76,0.16),rgba(255,255,255,0.04))] p-7 md:p-9">
              <div className="flex h-full min-h-[320px] flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-xs font-bold text-white/72 backdrop-blur-xl">
                    <Sparkles className="h-3.5 w-3.5 text-amber-100" />
                    Founder Friend
                  </div>
                  <h3 className="mt-6 text-4xl font-black tracking-tight md:text-5xl">
                    Ahmad Hashem
                  </h3>
                  <p className="mt-4 text-lg leading-8 text-white/76">
                    A public-safe bridge for Ahmad's Trinity AI founder work,
                    Hashems 1959 context, creator media, and the practical
                    startup system FrankX can help him install and run.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/friends/ahmad"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-black transition hover:bg-amber-100"
                  >
                    Open profile
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/allies/trinity-ai"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.045] px-4 py-2.5 text-sm font-bold text-white transition hover:border-white/45 hover:bg-white/10"
                  >
                    Founder system
                  </Link>
                  <Link
                    href="/downloads/ahmad-founder-creator-kit"
                    className="inline-flex items-center gap-2 rounded-full border border-amber-200/25 bg-amber-200/10 px-4 py-2.5 text-sm font-bold text-amber-50 transition hover:border-amber-100/45 hover:bg-amber-200/15"
                  >
                    Download kit
                  </Link>
                </div>
              </div>
            </div>
            <div className="p-7 md:p-9">
              <div className="grid gap-4">
                {[
                  ["Public facts first", "Use public profiles plus Hashems 1959 city and chamber material as grounding, with no private startup claims until approved."],
                  ["Builder gift", "Give Ahmad a kit for Trinity AI, local AI lab setup, agent roles, content loops, and startup execution."],
                  ["Creator engine", "Help one source idea become Instagram, LinkedIn, podcast, academy, and feedback assets without losing his voice."],
                ].map(([title, copy]) => (
                  <div
                    key={title}
                    className="flex gap-4 rounded-[1.5rem] border border-white/10 bg-black/25 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                  >
                    <Shield className="mt-1 h-5 w-5 shrink-0 text-amber-100" />
                    <div>
                      <h4 className="font-black text-white">{title}</h4>
                      <p className="mt-1 text-sm leading-6 text-white/62">
                        {copy}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlowCard>

          <GlowCard color="teal" className="mt-5 grid overflow-hidden rounded-[2.5rem] p-0 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="bg-[linear-gradient(145deg,rgba(215,178,122,0.22),rgba(22,101,52,0.16),rgba(255,255,255,0.04))] p-7 md:p-9">
              <div className="flex h-full min-h-[320px] flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-xs font-bold text-white/72 backdrop-blur-xl">
                    <Sparkles className="h-3.5 w-3.5 text-amber-100" />
                    Hospitality Friend
                  </div>
                  <h3 className="mt-6 text-4xl font-black tracking-tight md:text-5xl">
                    Jojo Steingrüber
                  </h3>
                  <p className="mt-4 text-lg leading-8 text-white/76">
                    Frank's friend, publicly Johannes Steingrüber of
                    Harzfenster and Hotel Görtler in Seesen. The friend page is
                    a careful doorway into a hospitality intelligence pilot
                    built around service, trust, and owner-led craft.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/friends/jojo"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-black transition hover:bg-amber-100"
                  >
                    Open profile
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/allies/harzfenster"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.045] px-4 py-2.5 text-sm font-bold text-white transition hover:border-white/45 hover:bg-white/10"
                  >
                    Hospitality system
                  </Link>
                  <Link
                    href="/downloads/jojo-hospitality-intelligence-kit"
                    className="inline-flex items-center gap-2 rounded-full border border-amber-200/25 bg-amber-200/10 px-4 py-2.5 text-sm font-bold text-amber-50 transition hover:border-amber-100/45 hover:bg-amber-200/15"
                  >
                    Download kit
                  </Link>
                </div>
              </div>
            </div>
            <div className="p-7 md:p-9">
              <div className="grid gap-4">
                {[
                  ["Public facts first", "Use sourced material around Harzfenster, Hotel Görtler, and Michelin, with no private details until approved."],
                  ["Operational gift", "Give the house useful workflows for bookings, service briefings, guest follow-up, and team learning."],
                  ["Reusable vertical", "Turn what works into a serious Hospitality Intelligence offer for other restaurants and hotels."],
                ].map(([title, copy]) => (
                  <div
                    key={title}
                    className="flex gap-4 rounded-[1.5rem] border border-white/10 bg-black/25 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                  >
                    <Shield className="mt-1 h-5 w-5 shrink-0 text-amber-100" />
                    <div>
                      <h4 className="font-black text-white">{title}</h4>
                      <p className="mt-1 text-sm leading-6 text-white/62">
                        {copy}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlowCard>

        </div>
      </section>

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 lg:grid-cols-[0.86fr_1.14fr] lg:items-stretch">
            <GlowCard color="amber" className="rounded-[2.5rem] p-7 md:p-9">
              <p className="text-sm font-semibold text-amber-100">
                Why this hub exists
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
                A friend page is useful when it routes attention correctly.
              </h2>
              <p className="mt-5 text-base leading-7 text-white/68">
                A good public profile should protect what is not approved,
                avoid overclaiming, and make one useful path obvious: read the
                person, open the system, or download the starter kit.
              </p>
            </GlowCard>

            <div className="grid gap-4 md:grid-cols-3">
              {visitorQuestions.map((item) => {
                const Icon = item.icon;
                return (
                  <GlowCard
                    key={item.title}
                    color="amber"
                    className="rounded-[2rem] p-6"
                  >
                    <div className="grid h-12 w-12 place-items-center rounded-2xl border border-amber-200/20 bg-amber-200/10 text-amber-100">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-lg font-black text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-white/62">
                      {item.copy}
                    </p>
                  </GlowCard>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 pt-6 md:px-10 md:pb-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[2.5rem] border border-white/12 bg-[#081111]/72 p-6 shadow-[0_30px_110px_rgba(0,0,0,0.34)] backdrop-blur-2xl md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-white/45">
              <MessageCircle className="h-4 w-4" />
              Routing model
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-tight">
              Two public layers.
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-white/66">
              Friends carries the public relationship context. Allies carries
              the operating system, business architecture, and installable
              tools.
            </p>
          </div>
          <Link
            href="/allies/trinity-ai"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-emerald-100"
          >
            Open Ahmad ally page
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
