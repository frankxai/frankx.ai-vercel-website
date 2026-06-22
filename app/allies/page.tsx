import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Compass,
  Globe,
  Handshake,
  Network,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Allies",
  description:
    "FrankX allies portal for sovereign builders, founder collaborators, agent systems, and public collaboration nodes.",
  path: "/allies",
});

const principles = [
  {
    icon: Shield,
    label: "Public Safe",
    copy: "Pages disclose only approved positioning, business intent, and collaboration surfaces.",
  },
  {
    icon: Code2,
    label: "Systems First",
    copy: "Every ally page should clarify offers, delivery loops, follow-up, and the operating system behind the work.",
  },
  {
    icon: Network,
    label: "Composable",
    copy: "The FrankX layer can add research, workflow design, content systems, and AI support without taking over the brand.",
  },
];

const activeNodes = [
  {
    title: "TheEpicWays",
    status: "Active first node",
    href: "/allies/epic-ways",
    friendHref: "/friends/estefania",
    description:
      "Estefania Badra's leadership, communication, training, consulting, and event-experience company, ready for cleaner offer architecture and a stronger delivery system.",
    tags: ["Leadership", "Communication", "Workshops", "Events"],
  },
];

const operatingLayers = [
  "Research her public language",
  "Clarify the offer architecture",
  "Map workshop and event loops",
  "Package follow-up systems",
  "Measure client outcomes",
  "Keep the human voice intact",
];

export default function AlliesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_20%_10%,rgba(20,184,166,0.22),transparent_34%),linear-gradient(135deg,#050505_0%,#0b1116_48%,#10100b_100%)] px-6 pb-16 pt-28 md:px-10 md:pb-20 md:pt-32">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.78fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-100">
              <Handshake className="h-4 w-4" />
              Allies
            </div>
            <h1 className="max-w-4xl text-balance text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              Sovereign builders in the FrankX network.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 md:text-xl">
              Allies are serious collaboration nodes: founders, companies, and
              creative systems that can be shaped into public assets, clearer
              offers, delivery systems, and durable client value.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/allies/epic-ways"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-emerald-100"
              >
                Open TheEpicWays
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/friends"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:border-white/45 hover:bg-white/10"
              >
                View friends portal
              </Link>
            </div>
          </div>

          <div className="border border-white/12 bg-white/[0.04] p-5 shadow-2xl shadow-emerald-950/30 backdrop-blur">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
                  Active Map
                </p>
                <p className="mt-1 text-lg font-bold text-white">Collaboration Stack</p>
              </div>
              <Globe className="h-6 w-6 text-emerald-200" />
            </div>
            <div className="mt-5 grid gap-3">
              {operatingLayers.map((layer, index) => (
                <div
                  key={layer}
                  className="flex items-center justify-between border border-white/10 bg-black/35 px-4 py-3"
                >
                  <span className="text-sm text-white/74">{layer}</span>
                  <span className="font-mono text-xs text-emerald-200">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-14 md:px-10 md:py-18">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-200">
                Active Nodes
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
                The first ally portal starts here.
              </h2>
            </div>
            <Link
              href="/friends"
              className="inline-flex w-fit items-center gap-2 text-sm font-bold text-emerald-100 transition hover:text-white"
            >
              Human network
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {activeNodes.map((node) => (
              <article
                key={node.title}
                className="border border-white/12 bg-white/[0.04] p-6 transition hover:border-emerald-200/35 hover:bg-white/[0.06]"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/25 bg-emerald-200/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-emerald-100">
                    <Sparkles className="h-3.5 w-3.5" />
                    {node.status}
                  </span>
                </div>
                <h3 className="mt-5 text-3xl font-black tracking-tight">{node.title}</h3>
                <p className="mt-4 max-w-2xl text-base leading-7 text-white/68">
                  {node.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {node.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-white/10 bg-black/35 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href={node.href}
                    className="inline-flex items-center gap-2 bg-white px-4 py-2.5 text-sm font-bold text-black transition hover:bg-emerald-100"
                  >
                    Open ally page
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={node.friendHref}
                    className="inline-flex items-center gap-2 border border-white/15 px-4 py-2.5 text-sm font-bold text-white transition hover:border-white/40 hover:bg-white/10"
                  >
                    Friend page
                  </Link>
                </div>
              </article>
            ))}

            <article className="border border-white/12 bg-gradient-to-br from-white/[0.055] to-amber-200/[0.04] p-6">
              <div className="flex h-full flex-col justify-between gap-8">
                <div>
                  <div className="inline-flex h-11 w-11 items-center justify-center border border-amber-200/25 bg-amber-200/10 text-amber-100">
                    <Compass className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-3xl font-black tracking-tight">
                    Allies become operating systems.
                  </h3>
                  <p className="mt-4 text-base leading-7 text-white/68">
                    The page is not just a badge. Each serious ally should have
                    a practical build path across brand, code, skills, offers,
                    distribution, and governance.
                  </p>
                </div>
                <Link
                  href="mailto:frank@frankx.ai?subject=FrankX%20Alliance"
                  className="inline-flex w-fit items-center gap-2 border border-amber-200/25 px-4 py-2.5 text-sm font-bold text-amber-50 transition hover:bg-amber-200/10"
                >
                  Start an alliance conversation
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-6 py-14 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {principles.map((principle) => {
            const Icon = principle.icon;
            return (
              <div key={principle.label} className="border border-white/10 bg-black/25 p-5">
                <Icon className="h-6 w-6 text-emerald-200" />
                <h3 className="mt-4 text-lg font-black">{principle.label}</h3>
                <p className="mt-2 text-sm leading-6 text-white/62">{principle.copy}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 border border-white/12 bg-[linear-gradient(135deg,rgba(16,185,129,0.12),rgba(255,255,255,0.035),rgba(245,158,11,0.08))] p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-white/45">
              <Users className="h-4 w-4" />
              Friends and Allies
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-tight">
              Formal pages for serious work. Human pages for trust.
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-white/66">
              The ally layer carries public collaboration. The friends layer
              carries the warmer personal map. TheEpicWays gets both.
            </p>
          </div>
          <Link
            href="/friends/estefania"
            className="inline-flex shrink-0 items-center gap-2 bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-emerald-100"
          >
            Open Estefania
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
