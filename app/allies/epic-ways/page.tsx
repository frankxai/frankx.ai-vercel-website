import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  CircleDot,
  Compass,
  ExternalLink,
  Gauge,
  Handshake,
  HeartPulse,
  Layers3,
  MessageCircle,
  Mic,
  Network,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "TheEpicWays | Allies",
  description:
    "TheEpicWays ally page for Estefania Badra's leadership, communication, training, events, and business architecture with FrankX.",
  path: "/allies/epic-ways",
});

const pillars = [
  {
    icon: MessageCircle,
    title: "Leadership & Communication",
    copy: "Clarity, confidence, storytelling, feedback, boundaries, and the language leaders need when teams are growing.",
  },
  {
    icon: HeartPulse,
    title: "Wellness & Inner Balance",
    copy: "Rooms that help people reconnect, recharge, and sustain performance without turning leadership into theater.",
  },
  {
    icon: Brain,
    title: "Technology & Innovation",
    copy: "Future-of-work tools and AI adoption translated into human-centered change leaders can actually use.",
  },
];

const offerStack = [
  {
    icon: Briefcase,
    title: "Intensive Workshops",
    copy: "Focused sessions for urgent communication, alignment, ownership, and people-management gaps.",
  },
  {
    icon: Layers3,
    title: "Executive Programs",
    copy: "Structured journeys for founders and managers who need better decisions, stronger ownership, and less friction.",
  },
  {
    icon: Target,
    title: "1:1 Sessions",
    copy: "Direct leadership work around mindset, confidence, difficult conversations, visibility, and personal operating rhythm.",
  },
  {
    icon: CalendarDays,
    title: "Events & EpicVoices",
    copy: "Curated rooms, interviews, and experiences where leaders, experts, and communities are seen and heard.",
  },
];

const loopSteps = [
  {
    label: "Listen",
    detail: "Read the room, audience, team tension, and business moment.",
  },
  {
    label: "Map",
    detail: "Turn the need into a workshop, program, event, or 1:1 path.",
  },
  {
    label: "Design",
    detail: "Build the agenda, prompts, exercises, and leadership language.",
  },
  {
    label: "Deliver",
    detail: "Run the room with energy, clarity, and practical direction.",
  },
  {
    label: "Integrate",
    detail: "Send follow-up actions, scripts, manager tools, and next steps.",
  },
  {
    label: "Measure",
    detail: "Track alignment, ownership, decision speed, retention, and energy.",
  },
];

const audience = [
  "Team leaders building higher-performing teams",
  "Business owners in expansion who need their people to grow with the company",
  "Entrepreneurs who need clearer communication, energy, and leverage",
  "Organizations that want better culture, retention, and ownership",
];

const nextProducts = [
  {
    title: "The Leadership Lab",
    copy: "A flagship program for founders and leadership teams to make faster decisions, strengthen ownership, and lead without becoming the bottleneck.",
  },
  {
    title: "4 Layers Of Communication",
    copy: "A sharp workshop format for founders who need their message, team conversations, pitch, and feedback loops to land clearly.",
  },
  {
    title: "Culture & Ownership Sprint",
    copy: "A focused engagement for teams with too much rework, unclear decisions, low accountability, or cross-functional drag.",
  },
  {
    title: "EpicVoices",
    copy: "A content and event format that brings experts to the stage through interviews, conversations, and creative activations.",
  },
  {
    title: "AI For Human Teams",
    copy: "A practical training line for leaders who want AI support without losing the human trust that makes adoption work.",
  },
  {
    title: "Founder Presence 1:1",
    copy: "A premium advisory path for founders working on clarity, confidence, visibility, communication, and personal momentum.",
  },
];

const supportLayer = [
  "Offer architecture and premium packaging",
  "Workshop templates, decks, and facilitator kits",
  "Codex and Claude workflows for research, prep, follow-up, and content reuse",
  "A lightweight CRM and impact dashboard for clients, events, and outcomes",
  "Reusable diagrams for sales calls, proposals, and post-workshop reports",
  "A public asset system that keeps the tone warm, modern, and unmistakably hers",
];

function ExperienceLoop() {
  return (
    <div className="relative border border-white/12 bg-black/35 p-5 md:p-6">
      <div className="mb-6 flex items-start justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/42">
            Delivery Loop
          </p>
          <h2 className="mt-2 text-2xl font-black">From Room To Result</h2>
        </div>
        <Network className="h-7 w-7 text-amber-100" />
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {loopSteps.map((step, index) => (
          <div
            key={step.label}
            className="relative min-h-[150px] border border-white/10 bg-white/[0.035] p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-xs text-amber-100">
                {String(index + 1).padStart(2, "0")}
              </span>
              <CircleDot className="h-4 w-4 text-emerald-200" />
            </div>
            <h3 className="mt-5 text-lg font-black">{step.label}</h3>
            <p className="mt-2 text-sm leading-6 text-white/62">{step.detail}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-3 border border-emerald-200/18 bg-emerald-200/10 p-4 md:grid-cols-[0.8fr_1.2fr] md:items-center">
        <div className="flex items-center gap-3 text-sm font-black text-emerald-50">
          <Gauge className="h-5 w-5" />
          AI stays backstage.
        </div>
        <p className="text-sm leading-6 text-white/64">
          The support layer prepares, remembers, follows up, and measures. The
          room still feels human, alive, and led by Estefania.
        </p>
      </div>
    </div>
  );
}

export default function EpicWaysAllyPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_70%_18%,rgba(245,158,11,0.15),transparent_32%),radial-gradient(circle_at_14%_12%,rgba(16,185,129,0.14),transparent_32%),linear-gradient(135deg,#0a0a0b_0%,#11100b_46%,#071113_100%)] px-6 pb-14 pt-28 md:px-10 md:pb-20 md:pt-32">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div>
            <div className="mb-5 flex flex-wrap gap-3">
              <Link
                href="/allies"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white/70 transition hover:border-white/35 hover:text-white"
              >
                <ArrowRight className="h-3.5 w-3.5 rotate-180" />
                Allies
              </Link>
              <Link
                href="/friends/estefania"
                className="inline-flex items-center gap-2 rounded-full border border-amber-200/20 bg-amber-200/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-100 transition hover:border-amber-100/45"
              >
                Estefania
              </Link>
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-amber-100">
              TheEpicWays Ally
            </p>
            <h1 className="mt-4 max-w-4xl text-balance text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              Foster human potential. Lead the future.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 md:text-xl">
              Estefania Badra's TheEpicWays designs trainings, workshops, and
              event experiences for leaders, teams, and communities. FrankX can
              help sharpen the system behind it: clearer offers, smoother
              delivery loops, stronger follow-up, and AI support that stays
              invisible to the room.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://theepicways.com/"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-amber-100"
              >
                Visit TheEpicWays
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="mailto:frank@frankx.ai?subject=TheEpicWays%20Architecture"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:border-white/45 hover:bg-white/10"
              >
                Discuss the architecture
              </a>
            </div>
          </div>

          <div className="border border-white/12 bg-white/[0.04] p-5 shadow-2xl shadow-amber-950/20 backdrop-blur">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/42">
                  Business System
                </p>
                <h2 className="mt-2 text-2xl font-black">People, Rooms, Results</h2>
              </div>
              <Compass className="h-7 w-7 text-emerald-200" />
            </div>
            <div className="mt-5 grid gap-3">
              {["Leadership clarity", "Room energy", "Follow-up discipline", "Measured behavior change"].map(
                (item, index) => (
                  <div
                    key={item}
                    className="flex items-center justify-between border border-white/10 bg-black/30 px-4 py-3"
                  >
                    <span className="text-sm font-semibold text-white/76">{item}</span>
                    <span className="font-mono text-xs text-amber-100">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                ),
              )}
            </div>
            <div className="mt-5 border border-white/10 bg-black/25 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-200">
                Baseline
              </p>
              <p className="mt-2 text-sm leading-6 text-white/64">
                Trainings, workshops, events, consulting, and community-led
                experiences for stronger leaders and better workplaces.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-14 md:px-10 md:py-18">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-100">
              Source-Aligned Baseline
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
              Keep her center of gravity clear.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/66">
              TheEpicWays is already about human potential, leadership,
              communication, wellness, technology, and event experiences. The
              stronger evolution is not to replace that with a tech narrative.
              It is to give the existing work cleaner packaging, sharper
              delivery systems, and better proof of impact.
            </p>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <article
                  key={pillar.title}
                  className="border border-white/10 bg-white/[0.04] p-5 transition hover:border-amber-100/35 hover:bg-white/[0.06]"
                >
                  <Icon className="h-6 w-6 text-amber-100" />
                  <h3 className="mt-5 text-xl font-black tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-white/64">{pillar.copy}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-6 py-14 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.84fr_1.16fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-200">
              Offer Architecture
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">
              What she can provide, packaged cleanly.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/66">
              Her offer surface should feel premium and easy to buy: workshops
              for immediate gaps, programs for deeper change, 1:1 work for
              founders, and event experiences that turn community into business
              momentum.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {offerStack.map((offer) => {
              const Icon = offer.icon;
              return (
                <article key={offer.title} className="border border-white/10 bg-black/35 p-5">
                  <Icon className="h-5 w-5 text-emerald-200" />
                  <h3 className="mt-4 text-lg font-black">{offer.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/62">{offer.copy}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-14 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.72fr_1.28fr]">
          <aside className="border border-white/12 bg-[linear-gradient(145deg,rgba(245,158,11,0.11),rgba(255,255,255,0.035),rgba(16,185,129,0.08))] p-6 md:p-8">
            <Users className="h-7 w-7 text-amber-100" />
            <h2 className="mt-5 text-3xl font-black tracking-tight">
              Who it serves.
            </h2>
            <div className="mt-6 grid gap-3">
              {audience.map((item) => (
                <div key={item} className="flex gap-3 border border-white/10 bg-black/25 p-4">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-200" />
                  <span className="text-sm leading-6 text-white/70">{item}</span>
                </div>
              ))}
            </div>
          </aside>

          <ExperienceLoop />
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-6 py-14 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-100">
              Productized Path
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
              From beautiful energy to repeatable business.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/66">
              The cool version is not more hype. It is a clean menu of experiences
              that preserves her warmth while making it obvious what a company,
              founder, or community can book.
            </p>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {nextProducts.map((product) => (
              <article
                key={product.title}
                className="border border-white/10 bg-black/35 p-5 transition hover:border-amber-100/35 hover:bg-white/[0.045]"
              >
                <Sparkles className="h-5 w-5 text-amber-100" />
                <h3 className="mt-4 text-xl font-black tracking-tight">
                  {product.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/64">{product.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-14 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1fr_0.86fr]">
          <article className="border border-white/12 bg-white/[0.04] p-6 md:p-8">
            <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-white/45">
              <BookOpen className="h-4 w-4" />
              FrankX Support Layer
            </div>
            <h2 className="mt-4 text-3xl font-black tracking-tight">
              AI as preparation, memory, and momentum.
            </h2>
            <div className="mt-6 grid gap-3">
              {supportLayer.map((asset, index) => (
                <div
                  key={asset}
                  className="flex items-start gap-4 border border-white/10 bg-black/25 p-4"
                >
                  <span className="font-mono text-xs text-emerald-200">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-6 text-white/70">{asset}</span>
                </div>
              ))}
            </div>
          </article>

          <aside className="border border-white/12 bg-black/35 p-6 md:p-8">
            <Handshake className="h-7 w-7 text-emerald-200" />
            <h2 className="mt-5 text-3xl font-black tracking-tight">
              Public boundary.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/68">
              The public page should speak from her actual work: leadership,
              communication, workshops, consulting, wellness, tech, and events.
              Future technical systems belong backstage unless they make her
              client experience simpler, smoother, and more measurable.
            </p>
            <div className="mt-7 grid gap-3">
              <Link
                href="/friends/estefania"
                className="inline-flex items-center justify-between border border-white/15 bg-black/25 px-4 py-3 text-sm font-bold text-white transition hover:border-white/35 hover:bg-black/40"
              >
                Estefania friend profile
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/allies"
                className="inline-flex items-center justify-between border border-white/15 bg-black/25 px-4 py-3 text-sm font-bold text-white transition hover:border-white/35 hover:bg-black/40"
              >
                Back to allies
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="px-6 pb-16 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          <div className="border border-white/10 bg-white/[0.035] p-5">
            <Mic className="h-6 w-6 text-amber-100" />
            <h3 className="mt-4 text-lg font-black">Her Role</h3>
            <p className="mt-2 text-sm leading-6 text-white/62">
              Voice, room energy, leadership insight, community trust, and the
              human connection clients remember.
            </p>
          </div>
          <div className="border border-white/10 bg-white/[0.035] p-5">
            <Briefcase className="h-6 w-6 text-emerald-200" />
            <h3 className="mt-4 text-lg font-black">Company Role</h3>
            <p className="mt-2 text-sm leading-6 text-white/62">
              Package trainings, workshops, events, programs, and consulting
              into clean offers with clear outcomes.
            </p>
          </div>
          <div className="border border-white/10 bg-white/[0.035] p-5">
            <Gauge className="h-6 w-6 text-cyan-100" />
            <h3 className="mt-4 text-lg font-black">System Role</h3>
            <p className="mt-2 text-sm leading-6 text-white/62">
              Make preparation, follow-up, measurement, and content reuse easier
              without making the brand feel automated.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
