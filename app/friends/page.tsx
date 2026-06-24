import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Handshake,
  MessageCircle,
  Network,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Friends",
  description:
    "Friends of FrankX, a warmer public portal for people, builders, and allies around the FrankX network.",
  path: "/friends",
});

const portalRoles = [
  {
    icon: Heart,
    title: "Human Map",
    copy: "Friends pages can be warmer, lighter, and closer to the person than a formal project page.",
  },
  {
    icon: Handshake,
    title: "Ally Bridge",
    copy: "When a friendship becomes serious work, the companion ally page carries the business structure.",
  },
  {
    icon: Shield,
    title: "Approved Public Signal",
    copy: "Profiles stay intentionally careful until the person approves deeper biography and public claims.",
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
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-200/25 bg-amber-200/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-amber-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl">
              <Users className="h-4 w-4" />
              Friends
            </div>
            <h1 className="max-w-4xl text-balance text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              The warmer map around FrankX.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 md:text-xl">
              Friends is a public portal for the people and founder
              relationships behind the work. Allies carries the formal company,
              business, and intelligence-system layer.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/friends/ana"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-black shadow-[0_18px_60px_rgba(255,255,255,0.16)] transition hover:bg-amber-100"
              >
                Open Ana
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/friends/estefania"
                className="inline-flex items-center gap-2 rounded-full border border-amber-200/25 bg-amber-200/10 px-5 py-3 text-sm font-bold text-amber-50 backdrop-blur-xl transition hover:border-amber-100/55 hover:bg-amber-200/15"
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
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
                  Portal Logic
                </p>
                <p className="mt-1 text-lg font-bold text-white">Friends to Allies</p>
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-amber-100/20 bg-amber-100/10">
                <Network className="h-6 w-6 text-amber-100" />
              </div>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-3">
              {[
                ["Friend profile", "Human, warm, careful, and approval-aware."],
                ["Ally page", "Offers, delivery loops, business architecture, and public strategy."],
                ["Operating system", "Skills, repos, prompts, routines, launches, and durable assets."],
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
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-100">
              Friend Nodes
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
              Start warm. Make it useful.
            </h2>
          </div>

          <article className="grid overflow-hidden rounded-[2.5rem] border border-white/12 bg-white/[0.055] shadow-[0_30px_110px_rgba(0,0,0,0.36)] backdrop-blur-2xl lg:grid-cols-[0.92fr_1.08fr]">
            <div className="bg-[linear-gradient(145deg,rgba(245,158,11,0.22),rgba(16,185,129,0.13),rgba(255,255,255,0.04))] p-7 md:p-9">
              <div className="flex h-full min-h-[320px] flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white/72 backdrop-blur-xl">
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
          </article>

          <article className="mt-5 grid overflow-hidden rounded-[2.5rem] border border-white/12 bg-white/[0.055] shadow-[0_30px_110px_rgba(0,0,0,0.36)] backdrop-blur-2xl lg:grid-cols-[0.92fr_1.08fr]">
            <div className="bg-[linear-gradient(145deg,rgba(212,165,116,0.20),rgba(22,101,52,0.18),rgba(255,255,255,0.04))] p-7 md:p-9">
              <div className="flex h-full min-h-[320px] flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white/72 backdrop-blur-xl">
                    <Sparkles className="h-3.5 w-3.5 text-amber-100" />
                    People Systems
                  </div>
                  <h3 className="mt-6 text-4xl font-black tracking-tight md:text-5xl">
                    Ana Cecilia Cancino
                  </h3>
                  <p className="mt-4 text-lg leading-8 text-white/76">
                    A public-safe bridge from Ana's HR, psychology,
                    self-knowledge, faith, embodiment, and AI companion work
                    into a practical business kit she can test, refine, and
                    travel with.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/friends/ana"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-black transition hover:bg-amber-100"
                  >
                    Open profile
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/allies/ana-cancino"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.045] px-4 py-2.5 text-sm font-bold text-white transition hover:border-white/45 hover:bg-white/10"
                  >
                    Business kit
                  </Link>
                </div>
              </div>
            </div>
            <div className="p-7 md:p-9">
              <div className="grid gap-4">
                {[
                  ["Public-safe", "Use verified public material first; keep deeper biography, quotes, and testimonials private until approved."],
                  ["Offer-led", "Anchor the system in clarity sessions, reflection circles, workshops, and a proposed team path."],
                  ["Installable", "Give her a ZIP with agent briefs, offer maps, aftercare, content loops, and ACOS guidance."],
                ].map(([title, copy]) => (
                  <div
                    key={title}
                    className="flex gap-4 rounded-[1.5rem] border border-white/10 bg-black/25 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                  >
                    <Shield className="mt-1 h-5 w-5 shrink-0 text-emerald-100" />
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
          </article>
        </div>
      </section>

      <section className="px-5 pb-16 pt-6 md:px-10 md:pb-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[2.5rem] border border-white/12 bg-[#081111]/72 p-6 shadow-[0_30px_110px_rgba(0,0,0,0.34)] backdrop-blur-2xl md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-white/45">
              <MessageCircle className="h-4 w-4" />
              Portal Choice
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-tight">
              Two public layers.
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-white/66">
              Friends carries the human relationship. Allies carries the
              serious work, company system, and public business architecture.
            </p>
          </div>
          <Link
            href="/allies/ana-cancino"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-emerald-100"
          >
            Open Ana ally page
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
