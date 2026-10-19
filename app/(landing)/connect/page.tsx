import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, CalendarDays, Mail, QrCode } from "lucide-react";

import { MEET_AND_GROW_URL } from "@/lib/cta-links";
import { createMetadata, siteConfig } from "@/lib/seo";
import { CONTACT_INFO } from "@/lib/social-links";

import { ConnectLandedTracker } from "@/components/connect/ConnectLandedTracker";
import { ConnectNewsletterForm } from "@/components/connect/ConnectNewsletterForm";
import { ConnectSocialsRow } from "@/components/connect/ConnectSocialsRow";
import { FeaturedWorkGrid } from "@/components/connect/FeaturedWorkGrid";
import { RolePathCards } from "@/components/connect/RolePathCards";
import { SaveContactButton } from "@/components/connect/SaveContactButton";
import { TrackedBookingLink } from "@/components/connect/TrackedBookingLink";
import { TrackedEmailLink } from "@/components/connect/TrackedEmailLink";

const SITE_URL = siteConfig.url;
const CONNECT_URL = `${SITE_URL}/connect`;

function ConnectJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Connect",
            item: CONNECT_URL,
          },
        ],
      },
      {
        '@type': 'WebPage',
        name: "Connect with Frank Riemer",
        description:
          "Meet Frank Riemer, AI Architect. Explore his work in AI architecture, agent systems, partnerships, university workshops, and applied creative practice.",
        url: CONNECT_URL,
        mainEntity: {
          "@type": "Person",
          name: "Frank Riemer",
          jobTitle: "AI Architect",
          url: SITE_URL,
        },
        isPartOf: { "@type": "WebSite", name: "FrankX", url: SITE_URL },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const metadata: Metadata = createMetadata({
  title: "Connect with Frank Riemer — AI Architect",
  description:
    "Meet Frank Riemer, AI Architect. Explore his work in AI architecture, agent systems, partnerships, university workshops, and applied creative practice.",
  path: "/connect",
  keywords: [
    "frank riemer",
    "ai architect",
    "frankx",
    "enterprise ai architecture",
    "agent systems",
    "ai partnerships",
    "university ai workshops",
    "ai workshop speaker",
  ],
});

export default function ConnectPage() {
  const emailHref = `mailto:${CONTACT_INFO.email.primary}?subject=${encodeURIComponent(
    "A serious AI question for Frank",
  )}`;

  return (
    <main className="min-h-screen overflow-hidden bg-[#f3efe6] text-[#171915] selection:bg-[#2157d5] selection:text-white">
      <ConnectJsonLd />
      <Suspense fallback={null}>
        <ConnectLandedTracker />
      </Suspense>

      <section className="relative border-b border-[#171915]/15 px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32 lg:px-12 lg:pb-24 lg:pt-36">
        <div
          aria-hidden
          className="absolute right-0 top-0 h-40 w-1/3 border-l border-[#171915]/10 bg-[#ebe3d4]"
        />

        <div className="relative mx-auto max-w-[1380px]">
          <div className="mb-10 flex items-center justify-between border-b border-[#171915]/20 pb-4 text-sm sm:mb-14">
            <Link
              href="/"
              className="font-semibold tracking-[-0.02em] text-[#171915] underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2157d5]"
            >
              FrankX
            </Link>
            <p className="text-right text-[#4e5149]">
              Frank Riemer · AI Architect
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(440px,1.08fr)] lg:items-start lg:gap-16 xl:gap-24">
            <div>
              <div className="mb-7 flex items-center gap-3 text-sm font-medium text-[#39423b]">
                <span className="h-3 w-3 bg-[#2157d5]" aria-hidden />
                One operator. Systems built to be understood.
              </div>

              <h1 className="max-w-[760px] text-[clamp(3.2rem,5vw,5.8rem)] font-medium leading-[0.94] tracking-[-0.055em] text-[#11130f]">
                I turn complex AI decisions into systems people can operate.
              </h1>

              <ConnectAuthorityFigure className="mt-8 lg:hidden" />

              <p className="mt-8 max-w-2xl text-lg leading-8 text-[#44483f] sm:text-xl sm:leading-9">
                I work with senior operators, technical teams, university
                programs, and platform partners on the decisions that make AI
                useful: architecture, workflows, governance, and adoption. My
                agents accelerate the work. I own the judgment and the result.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <TrackedEmailLink
                  href={emailHref}
                  source="connect_hero"
                  className="group inline-flex min-h-12 items-center justify-center gap-3 bg-[#171915] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#2157d5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2157d5] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f3efe6]"
                >
                  Bring me a real question
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                    aria-hidden
                  />
                </TrackedEmailLink>
                <SaveContactButton variant="paper" />
              </div>

              <p className="mt-5 text-sm leading-6 text-[#60645b]">
                Based in Europe. Working across enterprise AI, creator systems,
                and partner enablement.
              </p>
            </div>

            <ConnectAuthorityFigure className="hidden lg:block" />
          </div>
        </div>
      </section>

      <section className="bg-[#171915] px-5 py-8 text-[#f3efe6] sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1380px] gap-7 sm:grid-cols-3 sm:gap-8">
          <Link
            href="/agents?from=connect"
            className="group border-l border-white/25 pl-4"
          >
            <p className="text-3xl font-medium tracking-[-0.04em]">85</p>
            <p className="mt-1 text-sm leading-6 text-white/65 group-hover:text-white">
              specialist agent roles shipped and documented in public
            </p>
          </Link>
          <Link
            href="/ai-architecture"
            className="group border-l border-white/25 pl-4"
          >
            <p className="text-3xl font-medium tracking-[-0.04em]">
              1 field guide
            </p>
            <p className="mt-1 text-sm leading-6 text-white/65 group-hover:text-white">
              architecture decisions, constraints, and evidence
            </p>
          </Link>
          <Link href="/music" className="group border-l border-white/25 pl-4">
            <p className="text-3xl font-medium tracking-[-0.04em]">12,000+</p>
            <p className="mt-1 text-sm leading-6 text-white/65 group-hover:text-white">
              music experiments in a long-running creative practice
            </p>
          </Link>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1380px] gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <p className="text-sm font-semibold text-[#2157d5]">
              Start with your situation
            </p>
            <h2 className="mt-4 max-w-md text-4xl font-medium leading-[1.02] tracking-[-0.045em] text-[#171915] sm:text-5xl">
              Four useful ways into the work.
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-[#555950]">
              Choose the question closest to yours and inspect the work before
              you decide whether to start a conversation.
            </p>
          </div>
          <RolePathCards />
        </div>
      </section>

      <section
        id="university-workshops"
        className="scroll-mt-24 border-y border-[#171915]/15 bg-[#171915] px-5 py-20 text-[#f3efe6] sm:px-8 sm:py-24 lg:px-12 lg:py-28"
      >
        <div className="mx-auto grid max-w-[1380px] gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-20">
          <figure>
            <div className="relative aspect-[4/3] overflow-hidden bg-[#292b26]">
              <Image
                src="/images/oracle-events/oracle-workshop-P1081706.jpg"
                alt="Frank Riemer facilitating an applied workshop in front of a flip chart"
                fill
                sizes="(max-width: 1023px) 100vw, 55vw"
                className="object-cover object-center saturate-[0.78] contrast-[1.04]"
              />
              <span className="absolute bottom-0 right-0 bg-[#2157d5] px-4 py-2 text-xs font-semibold text-white">
                Room note 01
              </span>
            </div>
            <figcaption className="mt-3 flex flex-col gap-1 text-xs leading-5 text-white/[0.55] sm:flex-row sm:justify-between">
              <span>Facilitating an applied workshop, 2025.</span>
              <span className="sm:text-right">
                Former Oracle role · no current endorsement implied
              </span>
            </figcaption>
          </figure>

          <div>
            <p className="text-sm font-semibold text-[#8fb0ff]">
              Universities and learning communities
            </p>
            <h2 className="mt-4 max-w-2xl text-4xl font-medium leading-[1.02] tracking-[-0.045em] sm:text-5xl">
              Bring Frank into a room that wants to build, not just listen.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/[0.68] sm:text-lg sm:leading-8">
              For faculty, program directors, innovation labs, incubators, and
              student communities. Start with one useful result participants
              should carry home; the format follows from the room, not a stock
              slide deck.
            </p>

            <div className="mt-8 grid gap-3 border-y border-white/[0.18] py-5 text-sm text-white/[0.68] sm:grid-cols-3">
              <span>In person</span>
              <span>Virtual</span>
              <span>Hybrid</span>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <TrackedBookingLink
                href={MEET_AND_GROW_URL}
                className="group inline-flex min-h-12 items-center justify-center gap-3 bg-[#f3efe6] px-6 py-3.5 text-sm font-semibold text-[#171915] transition-colors hover:bg-[#8fb0ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8fb0ff] focus-visible:ring-offset-4 focus-visible:ring-offset-[#171915]"
              >
                <CalendarDays className="h-4 w-4" aria-hidden />
                Book a workshop fit call
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                  aria-hidden
                />
              </TrackedBookingLink>
              <Link
                href="/workshops"
                className="inline-flex min-h-12 items-center justify-center px-4 text-sm font-semibold text-white underline decoration-white/30 underline-offset-4 transition-colors hover:text-[#8fb0ff] hover:decoration-[#8fb0ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8fb0ff]"
              >
                Inspect workshop formats
              </Link>
            </div>

            <p className="mt-5 text-xs leading-5 text-white/[0.48]">
              A fit call covers audience, desired outcome, timing, format, and
              logistics. No generic proposal before the room is understood.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-[#171915]/15 bg-[#ebe3d4] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1380px]">
          <div className="grid gap-8 border-b border-[#171915]/20 pb-10 lg:grid-cols-[1fr_1fr] lg:items-end">
            <h2 className="max-w-xl text-4xl font-medium leading-[1.02] tracking-[-0.045em] text-[#171915] sm:text-5xl">
              Proof should be inspectable.
            </h2>
            <p className="max-w-xl text-base leading-7 text-[#555950] lg:justify-self-end">
              I publish systems, source-led architecture notes, and creative
              work so you can judge the thinking—not just the biography.
            </p>
          </div>
          <FeaturedWorkGrid />
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1380px] gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-start lg:gap-20">
          <div>
            <p className="text-sm font-semibold text-[#2157d5]">
              Stay close to the work
            </p>
            <h2 className="mt-4 max-w-2xl text-4xl font-medium leading-[1.02] tracking-[-0.045em] text-[#171915] sm:text-5xl">
              Field notes for people building with AI.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#555950]">
              Occasional notes on architecture, agent workflows, and what
              survives contact with real constraints.
            </p>
            <div className="mt-9">
              <ConnectSocialsRow />
            </div>
          </div>
          <ConnectNewsletterForm />
        </div>
      </section>

      <section className="border-t border-[#171915]/15 px-5 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1380px] flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-2xl font-medium tracking-[-0.035em] text-[#171915]">
              If we met in person, say where.
            </p>
            <TrackedEmailLink
              href={emailHref}
              source="connect_footer"
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#2157d5] underline decoration-[#2157d5]/35 underline-offset-4 hover:decoration-[#2157d5]"
            >
              <Mail className="h-4 w-4" aria-hidden />
              {CONTACT_INFO.email.primary}
            </TrackedEmailLink>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#555950]">
            <Link
              href="/media-kit"
              className="hover:text-[#171915] hover:underline"
            >
              Media kit
            </Link>
            <Link
              href="/connect/qr"
              className="inline-flex items-center gap-1.5 hover:text-[#171915] hover:underline"
            >
              <QrCode className="h-4 w-4" aria-hidden />
              QR contact card
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function ConnectAuthorityFigure({ className }: { className: string }) {
  return (
    <figure className={`relative ${className}`}>
      <div className="absolute -left-4 top-8 z-10 hidden w-28 border-t-2 border-[#2157d5] pt-3 text-xs leading-5 text-[#373b34] xl:block">
        From model demos to decisions people can operate.
      </div>
      <div className="relative aspect-[4/3] overflow-hidden bg-[#d7d0c3]">
        <Image
          src="/images/portraits/frank-presenting-oracle-2025.jpg"
          alt="Frank Riemer presenting an enterprise AI architecture progression from static models to AI-driven actions"
          fill
          priority
          sizes="(max-width: 1023px) 100vw, 54vw"
          className="object-cover object-center saturate-[0.82] contrast-[1.03]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/25 to-transparent"
        />
        <span className="absolute bottom-0 right-0 bg-[#2157d5] px-4 py-2 text-xs font-semibold text-white">
          Field note 01
        </span>
      </div>
      <figcaption className="mt-3 flex flex-col gap-1 text-xs leading-5 text-[#62665d] sm:flex-row sm:justify-between">
        <span>
          Presenting the shift from static models to AI-driven actions, 2025.
        </span>
        <span className="sm:text-right">
          Former Oracle role · no current endorsement implied
        </span>
      </figcaption>
    </figure>
  );
}
