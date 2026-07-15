import Link from "next/link";
import {
  ArrowRight,
  Award,
  BedDouble,
  BriefcaseBusiness,
  CalendarCheck,
  CheckCircle2,
  ChefHat,
  Download,
  Hotel,
  MessagesSquare,
  ShieldCheck,
  Sparkles,
  Star,
  UsersRound,
} from "lucide-react";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Hospitality Intelligence System",
  description:
    "FrankX Hospitality Intelligence helps owner-led restaurants, hotels, and premium hospitality teams use AI for calmer bookings, service preparation, guest follow-up, and team learning.",
  path: "/hospitality-intelligence",
});

const useCases = [
  {
    icon: CalendarCheck,
    title: "Booking And Waitlist",
    copy: "Turn reservation messages, waitlist demand, celebration notes, allergies, and arrangement requests into cleaner human-approved workflows.",
  },
  {
    icon: ChefHat,
    title: "Service Preparation",
    copy: "Prepare teams with table context, menu language, producer notes, known risks, and a daily briefing that does not waste the pre-service window.",
  },
  {
    icon: BedDouble,
    title: "Hotel And Restaurant Link",
    copy: "Connect rooms, dining, local recommendations, breakfast, events, and packages so guests experience one house instead of disconnected touchpoints.",
  },
  {
    icon: MessagesSquare,
    title: "Aftercare And Reputation",
    copy: "Draft review responses, thank-you notes, feedback summaries, and approved public story ideas while keeping guest data private.",
  },
];

const offerStack = [
  {
    title: "Hospitality Intelligence Diagnostic",
    price: "Workshop",
    copy: "A focused scan of booking, service, hotel, review, team, and content workflows. Leaves with a prioritized operating map.",
  },
  {
    title: "Owner-Led Pilot System",
    price: "4 weeks",
    copy: "Build one to three high-leverage routines: service briefings, guest reply drafts, private memory, or review learning.",
  },
  {
    title: "Premium House OS",
    price: "Retainer",
    copy: "A private operating layer for growing houses that need ongoing team enablement, content systems, governance, and workflow refinement.",
  },
];

const principles = [
  "The guest should feel more cared for, not more processed.",
  "AI drafts, searches, organizes, and prepares. Humans host, decide, promise, and publish.",
  "The system starts with one painful workflow, not a giant platform migration.",
  "Private guest data stays private. Public storytelling uses approved patterns only.",
];

const audience = [
  "Restaurants with new demand after awards, press, or reputation growth.",
  "Hotels where dining, rooms, events, and local experience need a stronger handoff.",
  "Owner-led hospitality teams that need better preparation without corporate heaviness.",
  "Consultants, trainers, and operators who want a practical AI workshop format for serious hospitality clients.",
];

export default function HospitalityIntelligencePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#060807] text-white">
      <section className="relative overflow-hidden px-5 pb-16 pt-28 md:px-10 md:pb-24 md:pt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(215,178,122,0.23),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(16,185,129,0.16),transparent_32%),radial-gradient(circle_at_54%_84%,rgba(6,182,212,0.11),transparent_36%),linear-gradient(135deg,#060807_0%,#10100c_48%,#061111_100%)]" />
        <div className="absolute left-[8%] top-28 -z-10 h-60 w-60 rounded-full bg-[#d7b27a]/[0.055] blur-3xl" />
        <div className="absolute bottom-10 right-[9%] -z-10 h-72 w-72 rounded-full bg-emerald-200/[0.045] blur-3xl" />

        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.82fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d7b27a]/28 bg-[#d7b27a]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#f4dfb5] shadow-[inset_0_1px_0_rgba(255,255,255,0.13)] backdrop-blur-2xl">
              <Sparkles className="h-4 w-4" />
              FrankX vertical
            </div>
            <h1 className="max-w-5xl text-balance text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              Hospitality intelligence for serious houses.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/76 md:text-xl">
              AI support for restaurants, hotels, chefs, and owner-led teams
              that want calmer bookings, sharper service preparation, better
              follow-up, and stronger team learning without losing the human
              warmth of hospitality.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/54">
              The Jojo and Harzfenster pilot is the friend-to-ally proof path:
              start with a real house, make something useful, then teach the
              pattern as a premium workshop and operating system.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/downloads/jojo-hospitality-intelligence-kit"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-black shadow-[0_20px_70px_rgba(255,255,255,0.14)] transition hover:bg-[#f4dfb5]"
              >
                <Download className="h-4 w-4" />
                Download starter kit
              </Link>
              <Link
                href="/allies/harzfenster"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.055] px-5 py-3 text-sm font-bold text-white backdrop-blur-xl transition hover:border-white/45 hover:bg-white/10"
              >
                See Harzfenster pilot
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="mailto:frank@frankx.ai?subject=Hospitality%20Intelligence"
                className="inline-flex items-center gap-2 rounded-full border border-[#d7b27a]/25 bg-[#d7b27a]/10 px-5 py-3 text-sm font-bold text-[#f4dfb5] backdrop-blur-xl transition hover:border-[#d7b27a]/45 hover:bg-[#d7b27a]/15"
              >
                Book diagnostic
              </a>
            </div>
          </div>

          <aside className="rounded-[2.8rem] border border-white/12 bg-white/[0.06] p-5 shadow-[0_34px_130px_rgba(0,0,0,0.46)] backdrop-blur-2xl">
            <div className="rounded-[2.25rem] border border-white/10 bg-black/25 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]">
              <div className="grid h-20 w-20 place-items-center rounded-[2rem] border border-[#d7b27a]/28 bg-[linear-gradient(145deg,rgba(215,178,122,0.24),rgba(68,143,103,0.15),rgba(255,255,255,0.05))]">
                <Hotel className="h-9 w-9 text-[#f4dfb5]" />
              </div>
              <p className="mt-7 text-xs font-bold uppercase tracking-[0.22em] text-[#f4dfb5]">
                Business thesis
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight">
                Award pressure creates operational pressure.
              </h2>
              <p className="mt-4 text-sm leading-6 text-white/64">
                Reputation is wonderful, and it also creates more messages,
                more expectations, more repeat-guest memory, more staff
                coordination, and more chances to disappoint. Hospitality
                Intelligence helps the house carry that without flattening the
                experience.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#f4dfb5]">
              What it improves
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
              Four workflows where AI can help without becoming the host.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {useCases.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-[2.2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.065),rgba(255,255,255,0.025))] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.30)] backdrop-blur-2xl transition hover:-translate-y-1 hover:border-[#d7b27a]/35"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[#d7b27a]/24 bg-[#d7b27a]/10">
                    <Icon className="h-6 w-6 text-[#f4dfb5]" />
                  </div>
                  <h3 className="mt-5 text-xl font-black tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-white/64">
                    {item.copy}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <article className="rounded-[2.7rem] border border-[#d7b27a]/20 bg-[linear-gradient(145deg,rgba(215,178,122,0.12),rgba(255,255,255,0.04),rgba(68,143,103,0.08))] p-6 shadow-[0_30px_110px_rgba(0,0,0,0.36)] backdrop-blur-2xl md:p-8">
            <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-[#f4dfb5]">
              <BriefcaseBusiness className="h-5 w-5" />
              Offer ladder
            </div>
            <h2 className="mt-5 text-3xl font-black tracking-tight md:text-4xl">
              Make it sellable without making it generic.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/66">
              The first sale should be a diagnostic or pilot, not a vague AI
              transformation package. Let the house see value in one concrete
              loop before expanding.
            </p>
          </article>

          <div className="grid gap-4 md:grid-cols-3">
            {offerStack.map((offer) => (
              <article
                key={offer.title}
                className="rounded-[2.1rem] border border-white/10 bg-black/25 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl"
              >
                <span className="rounded-full border border-[#d7b27a]/24 bg-[#d7b27a]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#f4dfb5]">
                  {offer.price}
                </span>
                <h3 className="mt-5 text-xl font-black tracking-tight">
                  {offer.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/64">
                  {offer.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          <article className="rounded-[2.7rem] border border-white/12 bg-[#08110f]/74 p-6 shadow-[0_34px_120px_rgba(0,0,0,0.42)] backdrop-blur-2xl md:p-8">
            <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-emerald-100">
              <UsersRound className="h-5 w-5" />
              Best-fit clients
            </div>
            <div className="mt-7 grid gap-3">
              {audience.map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-[1.55rem] border border-white/10 bg-black/25 p-4 text-sm leading-6 text-white/68"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-100" />
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2.7rem] border border-white/12 bg-[#100f08]/74 p-6 shadow-[0_34px_120px_rgba(0,0,0,0.42)] backdrop-blur-2xl md:p-8">
            <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-[#f4dfb5]">
              <ShieldCheck className="h-5 w-5" />
              Non-negotiables
            </div>
            <div className="mt-7 grid gap-3">
              {principles.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.55rem] border border-white/10 bg-black/25 p-4 text-sm leading-6 text-white/68"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="px-5 pb-16 pt-6 md:px-10 md:pb-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[2.7rem] border border-[#d7b27a]/18 bg-[linear-gradient(135deg,rgba(215,178,122,0.12),rgba(255,255,255,0.035),rgba(16,185,129,0.08))] p-6 shadow-[0_34px_120px_rgba(0,0,0,0.42)] backdrop-blur-2xl md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-white/45">
              <Award className="h-4 w-4" />
              Friend to market
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-tight">
              This is how the Friends and Allies hub becomes useful.
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-white/66">
              A real relationship creates a real system. The system becomes a
              download, a private repo, a workshop, and eventually a business
              line that other excellent houses can understand.
            </p>
          </div>
          <Link
            href="/allies/harzfenster"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-black transition hover:bg-[#f4dfb5]"
          >
            Open pilot
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
