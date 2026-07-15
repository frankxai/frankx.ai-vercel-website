import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Compass,
  ExternalLink,
  Factory,
  Lock,
  MessageCircle,
  Shield,
  Sparkles,
  Store,
  Users,
} from "lucide-react";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Ahmad Hashem | Friend of FrankX",
  description:
    "A public-safe friend page for Ahmad Hashem, connecting Trinity AI, Hashems 1959, creator media, and startup systems to a practical FrankX build path.",
  path: "/friends/ahmad",
  noindex: true,
});

const publicSignals = [
  {
    icon: BriefcaseBusiness,
    title: "Trinity AI",
    copy: "Public profiles connect Ahmad with Trinity AI and the language of conscious technology systems. FrankX treats this as the startup container to clarify, not as a finished claim.",
  },
  {
    icon: Store,
    title: "Hashems 1959",
    copy: "Sterling Heights and chamber material connect Ahmad with Hashems 1959, a family-rooted food, retail, hospitality, and community story.",
  },
  {
    icon: MessageCircle,
    title: "Founder creator signal",
    copy: "His Instagram and LinkedIn presence point toward founder storytelling, food as medicine, culture, systems, and a personal public voice.",
  },
];

const frankxRole = [
  "Turn the startup idea into a clear operating map: mission, offers, audience, proof, tools, and launch rhythm.",
  "Package a local Jarvis/OpenClaw lab around Mac mini or Mac Studio, with Hermes-style agent routines staying private first.",
  "Use ACOS, SIS/SIP, ArcaneaClaw, Codex, Claude, and reusable FrankX templates as optional tools, not as the public story.",
  "Build the creator engine: Instagram and LinkedIn carousels, short videos, long-form notes, podcast pilots, academy modules, and review loops.",
  "Keep public language careful until Ahmad approves deeper biography, screenshots, private systems, testimonials, and stronger claims.",
];

const launchPath = [
  ["Week 1", "Clarify Trinity AI, the first audience, and the one offer that can be explained in normal words."],
  ["Week 2", "Install the starter kit, agent briefs, repo checklist, and private content library."],
  ["Week 3", "Ship the first carousel, founder note, and short-form video from one source idea."],
  ["Week 4", "Review feedback, tighten the offer, and decide whether to add ACOS, OpenClaw, or a private repo."],
];

const sourceLinks = [
  {
    label: "LinkedIn public profile",
    href: "https://www.linkedin.com/in/ahmad-hashem-a81812232",
  },
  {
    label: "Instagram public profile",
    href: "https://www.instagram.com/ahmadh443/",
  },
  {
    label: "Hashems 1959 article",
    href: "https://www.sterlingheights.gov/CivicAlerts.aspx?AID=1999",
  },
  {
    label: "Troy Chamber listing",
    href: "https://www.troychamber.com/list/member/hashems-1959-18550",
  },
];

export default function AhmadFriendPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#070807] text-[#fff8ea]">
      <section className="relative overflow-hidden px-5 pb-16 pt-28 md:px-10 md:pb-24 md:pt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_16%_14%,rgba(212,176,110,0.20),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(18,94,76,0.24),transparent_32%),radial-gradient(circle_at_60%_84%,rgba(105,65,37,0.18),transparent_38%),linear-gradient(135deg,#070807_0%,#11100c_48%,#06120f_100%)]" />
        <div className="absolute left-[9%] top-32 -z-10 h-56 w-56 rounded-full border border-[#d4b06e]/10 bg-[#d4b06e]/[0.045] blur-3xl" />
        <div className="absolute bottom-10 right-[8%] -z-10 h-72 w-72 rounded-full border border-[#125e4c]/10 bg-[#125e4c]/[0.08] blur-3xl" />

        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.82fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d4b06e]/30 bg-[#d4b06e]/10 px-4 py-2 text-xs font-bold text-[#f7e7c0] shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-2xl">
              <Sparkles className="h-4 w-4" />
              Friend profile - public-safe draft
            </div>
            <h1 className="max-w-5xl text-balance text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              Ahmad Hashem
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#fff8ea]/76 md:text-xl">
              This page explains Ahmad as founder, operator, creator, and
              family-business builder. FrankX adds a bridge from Trinity AI and
              Hashems 1959 into a startup system he can install, use, and
              improve.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#fff8ea]/52">
              The page stays careful on purpose. Public facts are public facts.
              The local Jarvis, OpenClaw, Hermes, ACOS, and agent swarm design
              is a proposed FrankX build path until Ahmad approves deeper
              details.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/allies/trinity-ai"
                className="inline-flex items-center gap-2 rounded-full bg-[#f7e7c0] px-5 py-3 text-sm font-black text-[#0d0d0b] shadow-[0_20px_70px_rgba(212,176,110,0.18)] transition hover:bg-[#d4b06e]"
              >
                See the founder system
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/downloads/ahmad-founder-creator-kit"
                className="inline-flex items-center gap-2 rounded-full border border-[#f7e7c0]/20 bg-[#f7e7c0]/[0.055] px-5 py-3 text-sm font-bold text-[#fff8ea] backdrop-blur-xl transition hover:border-[#f7e7c0]/45 hover:bg-[#f7e7c0]/10"
              >
                Download starter kit
              </Link>
              <a
                href="https://www.instagram.com/ahmadh443/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#d4b06e]/25 bg-[#d4b06e]/10 px-5 py-3 text-sm font-bold text-[#f7e7c0] backdrop-blur-xl transition hover:border-[#d4b06e]/45 hover:bg-[#d4b06e]/15"
              >
                Instagram
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          <aside className="relative rounded-[2.7rem] border border-[#f7e7c0]/12 bg-[#f7e7c0]/[0.065] p-5 shadow-[0_34px_130px_rgba(0,0,0,0.46)] backdrop-blur-2xl">
            <div className="rounded-[2.25rem] border border-[#f7e7c0]/10 bg-black/25 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]">
              <div className="grid h-24 w-24 place-items-center rounded-[2.2rem] border border-[#d4b06e]/28 bg-[linear-gradient(145deg,rgba(212,176,110,0.24),rgba(18,94,76,0.18),rgba(255,255,255,0.05))] text-3xl font-black text-[#f7e7c0]">
                AH
              </div>
              <div className="mt-7">
                <p className="text-xs font-bold text-[#d4b06e]">
                  Center of gravity
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight">
                  Culture, food, tech, family, and founder discipline.
                </h2>
                <p className="mt-4 text-sm leading-6 text-[#fff8ea]/64">
                  The useful move is not to make Ahmad sound more abstract. It
                  is to connect the parts that already show up publicly into a
                  clear builder system.
                </p>
              </div>
              <div className="mt-7 grid gap-3">
                {["No fabricated claims", "No private system screenshots", "Approval before indexing"].map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-full border border-[#f7e7c0]/10 bg-black/22 px-4 py-3 text-sm text-[#fff8ea]/72"
                    >
                      <Shield className="h-4 w-4 text-[#d4b06e]" />
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
            <p className="text-sm font-bold text-[#d4b06e]">
              What is already visible
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
              Start from the real signals.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {publicSignals.map((signal) => {
              const Icon = signal.icon;
              return (
                <article
                  key={signal.title}
                  className="rounded-[2.25rem] border border-[#f7e7c0]/10 bg-[#f7e7c0]/[0.045] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.30)] backdrop-blur-2xl"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[#d4b06e]/25 bg-[#d4b06e]/10">
                    <Icon className="h-6 w-6 text-[#d4b06e]" />
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
          <article className="rounded-[2.6rem] border border-[#d4b06e]/18 bg-[linear-gradient(145deg,rgba(212,176,110,0.13),rgba(255,255,255,0.04),rgba(18,94,76,0.10))] p-6 shadow-[0_30px_110px_rgba(0,0,0,0.36)] backdrop-blur-2xl md:p-8">
            <div className="flex items-center gap-3 text-sm font-bold text-[#d4b06e]">
              <Compass className="h-5 w-5" />
              FrankX role
            </div>
            <h2 className="mt-5 text-3xl font-black tracking-tight md:text-4xl">
              Help him build the system around the startup, not just a page
              about it.
            </h2>
            <p className="mt-4 text-base leading-7 text-[#fff8ea]/66">
              The first implementation should give Ahmad a builder rhythm: a
              private lab, clear repos, agent roles, media workflows, proof
              loops, and one offer that can ship.
            </p>
          </article>

          <div className="grid gap-3">
            {frankxRole.map((item, index) => (
              <div
                key={item}
                className="grid gap-3 rounded-[1.8rem] border border-[#f7e7c0]/10 bg-black/25 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:grid-cols-[auto_1fr]"
              >
                <span className="font-mono text-xs text-[#d4b06e]">
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
              <p className="text-sm font-bold text-[#d4b06e]">
                First month
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
                A startup rhythm in normal words.
              </h2>
            </div>
            <Link
              href="/downloads/ahmad-founder-creator-kit"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-[#f7e7c0]/18 bg-[#f7e7c0]/[0.055] px-5 py-3 text-sm font-bold text-[#fff8ea] transition hover:border-[#f7e7c0]/40 hover:bg-[#f7e7c0]/10"
            >
              Open the kit
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {launchPath.map(([time, copy]) => (
              <article
                key={time}
                className="rounded-[2rem] border border-[#f7e7c0]/10 bg-[#f7e7c0]/[0.045] p-5 backdrop-blur-2xl"
              >
                <p className="font-mono text-xs font-bold text-[#d4b06e]">
                  {time}
                </p>
                <p className="mt-4 text-sm leading-6 text-[#fff8ea]/70">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl rounded-[2.6rem] border border-[#f7e7c0]/12 bg-[#f7e7c0]/[0.045] p-6 shadow-[0_30px_110px_rgba(0,0,0,0.34)] backdrop-blur-2xl md:p-8">
          <div className="flex items-center gap-3 text-sm font-bold text-[#d4b06e]">
            <Factory className="h-5 w-5" />
            Public sources
          </div>
          <h2 className="mt-5 text-3xl font-black tracking-tight">
            Use links, not invented lore.
          </h2>
          <div className="mt-7 grid gap-3 md:grid-cols-2">
            {sourceLinks.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-4 rounded-[1.55rem] border border-[#f7e7c0]/10 bg-black/25 p-4 text-sm font-bold text-[#fff8ea]/74 transition hover:border-[#d4b06e]/35 hover:text-[#f7e7c0]"
              >
                {source.label}
                <ExternalLink className="h-4 w-4 shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 pt-6 md:px-10 md:pb-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[2.6rem] border border-[#f7e7c0]/12 bg-[#08120f]/74 p-6 shadow-[0_34px_120px_rgba(0,0,0,0.42)] backdrop-blur-2xl md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-[#fff8ea]/45">
              <Lock className="h-4 w-4" />
              Approval boundary
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-tight">
              Shareable now. Search-hidden until Ahmad approves.
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-[#fff8ea]/66">
              Direct words from Ahmad, client examples, private systems, and
              stronger positioning wait for review. This page is the first
              useful bridge.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-full border border-[#d4b06e]/20 bg-[#d4b06e]/10 px-5 py-3 text-sm font-bold text-[#f7e7c0]">
            <CheckCircle2 className="h-4 w-4" />
            Noindex first
          </div>
        </div>
      </section>
    </main>
  );
}
