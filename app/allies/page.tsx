import Link from "next/link";
import {
  ArrowRight,
  Blocks,
  Code2,
  Compass,
  FileDown,
  Globe,
  Handshake,
  Network,
  Shield,
  Sparkles,
  Users,
  Wrench,
} from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { GlowCard, type GlowColor } from "@/components/ui/glow-card";

export const metadata = createMetadata({
  title: "Allies",
  description:
    "FrankX allies portal for collaborators with offer systems, delivery loops, starter kits, and public build paths.",
  path: "/allies",
});

const principles = [
  {
    icon: Shield,
    label: "Approval-aware",
    copy: "Pages separate verified public material, proposed architecture, and anything that needs review before publishing.",
  },
  {
    icon: Code2,
    label: "Outcome-led",
    copy: "Every ally page must clarify the offer, delivery loop, client outcome, downloadable kit, or next build step.",
  },
  {
    icon: Network,
    label: "Operator stays visible",
    copy: "FrankX adds research, workflow design, content systems, and AI support without turning the ally into a software mascot.",
  },
];

const activeNodes = [
  {
    title: "TheEpicWays",
    status: "Active first node",
    color: "emerald" as GlowColor,
    href: "/allies/epic-ways",
    friendHref: "/friends/estefania",
    downloadHref: "/downloads/epicways-intelligence",
    portalHref: "/portal/estefania",
    description:
      "Estefania Badra's leadership, communication, training, consulting, and event-experience company, now framed as a client-intelligence system for better service before, during, and after the room.",
    visitorUse:
      "See how leadership workshops become a client-service loop with preparation, live room design, aftercare, and reusable insight.",
    tags: ["Leadership", "Communication", "Workshops", "Events"],
  },
  {
    title: "Trinity AI Founder System",
    status: "Founder kit",
    color: "amber" as GlowColor,
    href: "/allies/trinity-ai",
    friendHref: "/friends/ahmad",
    downloadHref: "/downloads/ahmad-founder-creator-kit",
    portalHref: "/portal/ahmad",
    description:
      "Ahmad Hashem's Trinity AI and creator-founder context framed as a practical startup system with local AI lab guidance, ACOS/OpenClaw install paths, media loops, and agent roles.",
    visitorUse:
      "Download a founder creator kit and see how public story, private AI tools, content, offers, and feedback can become a working startup rhythm.",
    tags: ["Trinity AI", "OpenClaw", "Creator OS", "Agent swarms"],
  },
  {
    title: "Ana AI Business Kit",
    status: "Noindex draft",
    color: "amber" as GlowColor,
    href: "/allies/ana-cancino",
    friendHref: "/friends/ana",
    downloadHref: "/downloads/ana-ai-business-kit",
    portalHref: "/portal/ana",
    description:
      "Ana Cecilia Cancino's HR, psychology, self-knowledge, research, and AI companion work organized into an offer system, client loop, and travel-friendly business engine.",
    visitorUse:
      "Download a starter kit and see how her existing offers become repeatable sessions, circles, workshops, and aftercare.",
    tags: ["HR", "Psychology", "Self-knowledge", "Offers"],
  },
  {
    title: "Harzfenster Hospitality Intelligence",
    status: "Hospitality pilot",
    color: "teal" as GlowColor,
    href: "/allies/harzfenster",
    friendHref: "/friends/jojo",
    downloadHref: "/downloads/jojo-hospitality-intelligence-kit",
    portalHref: "/portal/jojo",
    description:
      "Jojo Steingrüber's Harzfenster and Hotel Görtler context organized as an approval-based hospitality intelligence pilot for bookings, service briefings, hotel handoffs, review learning, and team enablement.",
    visitorUse:
      "See how a real owner-led restaurant and hotel moment can become an installable operating kit and a reusable FrankX hospitality vertical.",
    tags: ["Hospitality", "Restaurant", "Hotel", "Service"],
  },
];

const operatingLayers = [
  "Understand the person",
  "Name the current offer",
  "Build the public page",
  "Package a starter kit",
  "Add optional AI workflows",
  "Review with consent",
];

const allianceContract = [
  {
    icon: Users,
    title: "For the visitor",
    copy: "Understand the person, their work, and the clearest next action in under a minute.",
  },
  {
    icon: FileDown,
    title: "For the ally",
    copy: "Leave with a page, kit, repo, workflow, or launch path that helps their actual business.",
  },
  {
    icon: Blocks,
    title: "For the ecosystem",
    copy: "Create reusable patterns for friend pages, service systems, downloads, and agent-supported offers.",
  },
  {
    icon: Wrench,
    title: "For FrankX",
    copy: "Show the work through real collaborations instead of abstract claims about what AI systems can do.",
  },
];

export default function AlliesPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#070808] text-white">
      <section className="relative overflow-hidden px-5 pb-16 pt-28 md:px-10 md:pb-24 md:pt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(16,185,129,0.22),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(245,158,11,0.16),transparent_32%),radial-gradient(circle_at_56%_82%,rgba(6,182,212,0.13),transparent_36%),linear-gradient(135deg,#070808_0%,#0b1116_48%,#10100b_100%)]" />
        <div className="absolute right-[10%] top-24 -z-10 h-56 w-56 rounded-full bg-emerald-200/[0.045] blur-3xl" />
        <div className="absolute bottom-12 left-[8%] -z-10 h-64 w-64 rounded-full bg-amber-200/[0.045] blur-3xl" />

        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.78fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-4 py-2 text-xs font-semibold text-emerald-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl">
              <Handshake className="h-4 w-4" />
              Allies
            </div>
            <h1 className="max-w-4xl text-balance text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              Collaboration pages with a job to do.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 md:text-xl">
              Allies is where a relationship becomes a build plan: clearer
              offers, delivery loops, downloadable kits, visible proof, and AI
              support introduced only where it helps the operator deliver.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/allies/epic-ways"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-black shadow-[0_18px_60px_rgba(255,255,255,0.16)] transition hover:bg-emerald-100"
              >
                Open TheEpicWays
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/allies/trinity-ai"
                className="inline-flex items-center gap-2 rounded-full border border-amber-200/30 bg-amber-200/10 px-5 py-3 text-sm font-bold text-amber-50 backdrop-blur-xl transition hover:border-amber-100/55 hover:bg-amber-200/15"
              >
                Open Trinity AI
              </Link>
              <Link
                href="/allies/harzfenster"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-200/30 bg-emerald-200/10 px-5 py-3 text-sm font-bold text-emerald-50 backdrop-blur-xl transition hover:border-emerald-100/55 hover:bg-emerald-200/15"
              >
                Open Harzfenster
              </Link>
              <Link
                href="/friends"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.045] px-5 py-3 text-sm font-bold text-white backdrop-blur-xl transition hover:border-white/45 hover:bg-white/10"
              >
                View friends portal
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 rounded-[2.5rem] bg-[linear-gradient(115deg,rgba(16,185,129,0.24),rgba(245,158,11,0.20),rgba(6,182,212,0.16))] blur-xl" />
            <aside className="relative rounded-[2.35rem] border border-white/12 bg-white/[0.055] p-5 shadow-[0_30px_120px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs font-semibold text-white/45">
                    Build map
                  </p>
                  <p className="mt-1 text-lg font-bold text-white">Build contract</p>
                </div>
                <div className="grid h-12 w-12 place-items-center rounded-2xl border border-emerald-200/20 bg-emerald-200/10">
                  <Globe className="h-6 w-6 text-emerald-200" />
                </div>
              </div>
              <div className="mt-5 grid gap-3">
                {operatingLayers.map((layer, index) => (
                  <div
                    key={layer}
                    className="flex items-center justify-between rounded-full border border-white/10 bg-black/25 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                  >
                    <span className="text-sm text-white/74">{layer}</span>
                    <span className="font-mono text-xs text-emerald-200">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-200">
                Active systems
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
                Start with the pages that install something.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/64">
                Each system should show what exists, what FrankX is proposing,
                what can be downloaded, and which next action is worth taking.
              </p>
            </div>
            <Link
              href="/friends"
              className="inline-flex w-fit items-center gap-2 text-sm font-bold text-emerald-100 transition hover:text-white"
            >
              People index
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {activeNodes.map((node) => (
              <GlowCard
                key={node.title}
                color={node.color}
                className="rounded-[2.2rem] p-6 transition hover:-translate-y-1"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/25 bg-emerald-200/10 px-3 py-1 text-xs font-bold text-emerald-100">
                    <Sparkles className="h-3.5 w-3.5" />
                    {node.status}
                  </span>
                </div>
                <h3 className="mt-5 text-3xl font-black tracking-tight">{node.title}</h3>
                <p className="mt-4 max-w-2xl text-base leading-7 text-white/68">
                  {node.description}
                </p>
                <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-black/25 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  <p className="text-xs font-bold text-white/42">
                    Visitor use
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/68">
                    {node.visitorUse}
                  </p>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {node.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs font-semibold text-white/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href={node.href}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-black transition hover:bg-emerald-100"
                  >
                    Open ally page
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={node.friendHref}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.045] px-4 py-2.5 text-sm font-bold text-white transition hover:border-white/40 hover:bg-white/10"
                  >
                    Friend page
                  </Link>
                  <Link
                    href={node.downloadHref}
                    className="inline-flex items-center gap-2 rounded-full border border-emerald-200/20 bg-emerald-200/10 px-4 py-2.5 text-sm font-bold text-emerald-50 transition hover:border-emerald-100/40 hover:bg-emerald-200/15"
                  >
                    Download kit
                  </Link>
                  <Link
                    href={node.portalHref}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.045] px-4 py-2.5 text-sm font-bold text-white transition hover:border-white/40 hover:bg-white/10"
                  >
                    Partner portal
                  </Link>
                </div>
              </GlowCard>
            ))}

            <GlowCard color="amber" className="rounded-[2.2rem] p-6">
              <div className="flex h-full flex-col justify-between gap-8">
                <div>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-200/25 bg-amber-200/10 text-amber-100">
                    <Compass className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-3xl font-black tracking-tight">
                    Allies become operating systems when the page ships assets.
                  </h3>
                  <p className="mt-4 text-base leading-7 text-white/68">
                    The page is not a badge. Each serious ally needs a build
                    path across brand, code, offers, downloads, distribution,
                    governance, and client delivery.
                  </p>
                </div>
                <Link
                  href="mailto:frank@frankx.ai?subject=FrankX%20Alliance"
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-200/25 bg-amber-200/10 px-4 py-2.5 text-sm font-bold text-amber-50 transition hover:bg-amber-200/15"
                >
                  Start an alliance conversation
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </GlowCard>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto mb-8 max-w-7xl">
          <p className="text-sm font-semibold text-emerald-200">
            Why this hub exists
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight md:text-4xl">
            It turns public trust into a visible execution path.
          </h2>
        </div>
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
          {allianceContract.map((item) => {
            const Icon = item.icon;
            return (
              <GlowCard
                key={item.title}
                color="emerald"
                className="rounded-[2rem] p-6"
              >
                <Icon className="h-6 w-6 text-emerald-200" />
                <h3 className="mt-4 text-lg font-black">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/62">{item.copy}</p>
              </GlowCard>
            );
          })}
        </div>
      </section>

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {principles.map((principle) => {
            const Icon = principle.icon;
            return (
              <GlowCard
                key={principle.label}
                color="teal"
                className="rounded-[2rem] p-6"
              >
                <Icon className="h-6 w-6 text-emerald-200" />
                <h3 className="mt-4 text-lg font-black">{principle.label}</h3>
                <p className="mt-2 text-sm leading-6 text-white/62">{principle.copy}</p>
              </GlowCard>
            );
          })}
        </div>
      </section>

      <section className="px-5 pb-16 pt-6 md:px-10 md:pb-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[2.5rem] border border-white/12 bg-[linear-gradient(135deg,rgba(16,185,129,0.12),rgba(255,255,255,0.035),rgba(245,158,11,0.08))] p-6 shadow-[0_30px_110px_rgba(0,0,0,0.34)] backdrop-blur-2xl md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-white/45">
              <Users className="h-4 w-4" />
              Friends and Allies
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-tight">
              System pages for the work. Profiles for context.
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-white/66">
              The ally layer carries collaboration, offers, and downloadable
              systems. The friends layer explains why each person is here and
              what is public before deeper material is approved.
            </p>
          </div>
          <Link
            href="/hospitality-intelligence"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-emerald-100"
          >
            Open hospitality vertical
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
