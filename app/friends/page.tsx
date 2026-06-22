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
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_18%_12%,rgba(245,158,11,0.18),transparent_34%),radial-gradient(circle_at_82%_20%,rgba(20,184,166,0.16),transparent_31%),linear-gradient(135deg,#050505_0%,#10100c_50%,#071113_100%)] px-6 pb-16 pt-28 md:px-10 md:pb-20 md:pt-32">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.78fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-200/25 bg-amber-200/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-amber-100">
              <Users className="h-4 w-4" />
              Friends
            </div>
            <h1 className="max-w-4xl text-balance text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              The warmer map around FrankX.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 md:text-xl">
              Friends is a public portal for the people and founder
              relationships behind the work. Allies carries the formal company
              and business layer.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/friends/estefania"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-amber-100"
              >
                Open Estefania
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/allies"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:border-white/45 hover:bg-white/10"
              >
                Allies portal
              </Link>
            </div>
          </div>

          <div className="border border-white/12 bg-white/[0.04] p-5 shadow-2xl shadow-amber-950/20 backdrop-blur">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
                  Portal Logic
                </p>
                <p className="mt-1 text-lg font-bold text-white">Friends to Allies</p>
              </div>
              <Network className="h-6 w-6 text-amber-100" />
            </div>
            <div className="mt-5 grid grid-cols-1 gap-3">
              <div className="border border-amber-200/18 bg-amber-200/10 p-4">
                <p className="text-sm font-black text-amber-50">Friend profile</p>
                <p className="mt-2 text-sm leading-6 text-white/62">
                  Human, warm, careful, and approval-aware.
                </p>
              </div>
              <div className="border border-white/10 bg-black/30 p-4">
                <p className="text-sm font-black text-white">Ally page</p>
                <p className="mt-2 text-sm leading-6 text-white/62">
                  Offers, delivery loops, business architecture, and public strategy.
                </p>
              </div>
              <div className="border border-emerald-200/18 bg-emerald-200/10 p-4">
                <p className="text-sm font-black text-emerald-50">Operating system</p>
                <p className="mt-2 text-sm leading-6 text-white/62">
                  Skills, repos, prompts, routines, launches, and durable assets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-14 md:px-10 md:py-18">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-100">
              First Friend
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
              Start small. Make it real.
            </h2>
          </div>

          <article className="grid gap-0 overflow-hidden border border-white/12 bg-white/[0.04] lg:grid-cols-[0.92fr_1.08fr]">
            <div className="bg-[linear-gradient(145deg,rgba(245,158,11,0.22),rgba(20,184,166,0.13),rgba(255,255,255,0.04))] p-7 md:p-9">
              <div className="flex h-full min-h-[320px] flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white/72">
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
                    className="inline-flex items-center gap-2 bg-white px-4 py-2.5 text-sm font-bold text-black transition hover:bg-amber-100"
                  >
                    Open profile
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/allies/epic-ways"
                    className="inline-flex items-center gap-2 border border-white/20 px-4 py-2.5 text-sm font-bold text-white transition hover:border-white/45 hover:bg-white/10"
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
                      className="flex gap-4 border border-white/10 bg-black/25 p-4"
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
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-6 py-14 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
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
            href="/allies/epic-ways"
            className="inline-flex shrink-0 items-center gap-2 bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-emerald-100"
          >
            Open TheEpicWays ally page
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
