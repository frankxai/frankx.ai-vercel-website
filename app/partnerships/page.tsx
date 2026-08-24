import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import {
  listActivePartners,
  listOpenOpportunities,
  listStrategicAlignment,
} from "@/content/partnerships";
import type { Partner } from "@/content/partnerships/types";
import { MEET_AND_GROW_URL } from "@/lib/cta-links";
import { createMetadata, siteConfig } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Partnerships and Applied Work",
  description:
    "See how Frank Riemer approaches bounded AI architecture, research, workshops, and partnership systems—and how each relationship is represented.",
  path: "/partnerships",
});

const SITE_URL = siteConfig.url;

const tierLabel: Record<Partner["tier"], string> = {
  distribution: "Distribution",
  cloud: "Cloud",
  "model-provider": "Model and infrastructure",
  silicon: "Silicon",
  tooling: "Tooling",
  services: "Services",
};

const operatingEvidence = [
  {
    number: "01",
    title: "Public build practice",
    description:
      "Claude Code and Cursor for coding workflows; GitHub for public review; Vercel for the current frankx.ai deployment. Tool choice varies by task.",
  },
  {
    number: "02",
    title: "Model-learning surface",
    description:
      "Claude, Gemini, Codex, ADK, A2A, and MCP appear in public workshops, guides, or research. Inclusion does not imply endorsement or production use.",
  },
  {
    number: "03",
    title: "Cloud context",
    description:
      "Vercel is inspectable in the current deployment. Oracle Cloud reflects disclosed prior experience. No current OCI, GCP, or AWS workload count is claimed.",
  },
  {
    number: "04",
    title: "Accelerated-computing research",
    description:
      "NVIDIA NIM and accelerator patterns appear as public research topics. No NVIDIA relationship, event work, or hands-on delivery is claimed.",
  },
] as const;

export default function PartnershipsHubPage() {
  const active = listActivePartners();
  const strategicAlignment = listStrategicAlignment();
  const opportunities = listOpenOpportunities();
  const all = [...active, ...strategicAlignment, ...opportunities];

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Partnerships",
        item: `${SITE_URL}/partnerships`,
      },
    ],
  };

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "FrankX partnership proposals and platform briefs",
    description:
      "Independently authored FrankX proposals, documented platform use, and exploratory alignment briefs with endorsement status kept explicit.",
    url: `${SITE_URL}/partnerships`,
    hasPart: all.map((partner: Partner) => ({
      "@type": "WebPage",
      name: partner.name,
      url: `${SITE_URL}/partnerships/${partner.slug}`,
    })),
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#f3efe6] text-[#171915] selection:bg-[#2157d5] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />

      <section className="relative border-b border-[#171915]/15 px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32 lg:px-12 lg:pb-24 lg:pt-36">
        <div className="mx-auto max-w-[1380px]">
          <div className="mb-10 flex items-center justify-between border-b border-[#171915]/20 pb-4 text-sm sm:mb-14">
            <Link
              href="/connect"
              className="font-semibold text-[#171915] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2157d5]"
            >
              Frank Riemer · AI Architect
            </Link>
            <p className="text-[#555950]">Partnerships and applied work</p>
          </div>

          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(440px,1.1fr)] lg:items-start lg:gap-16 xl:gap-24">
            <div>
              <div className="mb-7 flex items-center gap-3 text-sm font-medium text-[#39423b]">
                <span className="h-3 w-3 bg-[#2157d5]" aria-hidden />
                Relationship before machinery
              </div>
              <h1 className="max-w-[780px] text-[clamp(3.1rem,4.8vw,5.6rem)] font-medium leading-[0.95] tracking-[-0.052em] text-[#11130f]">
                Start with a real question, not a logo wall.
              </h1>
              <PartnershipHeroFigure className="mt-8 lg:hidden" />
              <p className="mt-8 max-w-2xl text-lg leading-8 text-[#44483f] sm:text-xl sm:leading-9">
                I build bounded research, architecture, workshop, and product
                systems around questions that matter to both sides. Specialist
                agents accelerate the work. I own the relationship, the
                judgment, and the result.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#documented-work"
                  className="group inline-flex min-h-12 items-center justify-center gap-3 bg-[#171915] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#2157d5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2157d5] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f3efe6]"
                >
                  Inspect the documented work
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                    aria-hidden
                  />
                </Link>
                <Link
                  href={MEET_AND_GROW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#171915]/30 px-6 py-3.5 text-sm font-semibold text-[#171915] hover:border-[#171915] hover:bg-[#ebe3d4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2157d5]"
                >
                  Open a conversation
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>

            <PartnershipHeroFigure className="hidden lg:block" />
          </div>
        </div>
      </section>

      <section className="bg-[#171915] px-5 py-9 text-[#f3efe6] sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1380px] gap-7 sm:grid-cols-3 sm:gap-8">
          <div className="border-l border-white/25 pl-4">
            <p className="text-lg font-medium">One consequential question</p>
            <p className="mt-2 text-sm leading-6 text-white/65">
              Scope the decision before the deliverable.
            </p>
          </div>
          <div className="border-l border-white/25 pl-4">
            <p className="text-lg font-medium">One bounded system</p>
            <p className="mt-2 text-sm leading-6 text-white/65">
              Make ownership, evidence, and limits explicit.
            </p>
          </div>
          <div className="border-l border-white/25 pl-4">
            <p className="text-lg font-medium">One inspectable result</p>
            <p className="mt-2 text-sm leading-6 text-white/65">
              Leave the team with something it can operate.
            </p>
          </div>
        </div>
      </section>

      <section
        id="documented-work"
        className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
      >
        <div className="mx-auto max-w-[1380px]">
          <div className="grid gap-8 border-b border-[#171915] pb-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold text-[#2157d5]">
                Relationship ledger
              </p>
              <h2 className="mt-4 max-w-xl text-4xl font-medium leading-[1.02] tracking-[-0.045em] sm:text-5xl">
                Every status is stated next to the claim.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-[#555950] lg:justify-self-end">
              Public proposals, independent platform briefs, and exploratory
              notes are different things. This page keeps them separate so the
              evidence can be judged without borrowed authority.
            </p>
          </div>

          {active.length > 0 && (
            <RelationshipSection
              label="Active FrankX proposal"
              title="Public proposals currently in development"
              description="Active describes the state of FrankX work—not a partner endorsement or formal relationship. Each detail page separates evidence from the proposed next step."
            >
              {active.map((partner) => (
                <PartnerRow
                  key={partner.slug}
                  partner={partner}
                  mode="active"
                />
              ))}
            </RelationshipSection>
          )}

          {strategicAlignment.length > 0 && (
            <RelationshipSection
              label="Independent platform alignment"
              title="Briefs about platforms visible in the work"
              description="These pages document public artifacts and, where a linked artifact supports it, Frank's own use or prior work. A proposed next step is not evidence of partnership, conversation, or endorsement."
            >
              {strategicAlignment.map((partner) => (
                <PartnerRow
                  key={partner.slug}
                  partner={partner}
                  mode="alignment"
                />
              ))}
            </RelationshipSection>
          )}

          {opportunities.length > 0 && (
            <RelationshipSection
              label="Open notes"
              title="Opportunities with relationship status attached"
              description="Independent opportunity notes remain distinct from exploratory conversations and formal relationships. Each detail page states which one it is."
            >
              {opportunities.map((partner) => (
                <PartnerRow
                  key={partner.slug}
                  partner={partner}
                  mode="opportunity"
                />
              ))}
            </RelationshipSection>
          )}
        </div>
      </section>

      <section className="border-y border-[#171915]/15 bg-[#ebe3d4] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1380px] gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <p className="text-sm font-semibold text-[#2157d5]">
              What can be inspected now
            </p>
            <h2 className="mt-4 max-w-md text-4xl font-medium leading-[1.02] tracking-[-0.045em] sm:text-5xl">
              Current tools and public evidence.
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-[#555950]">
              Declared use, public artifacts, and relevant prior experience—not
              a claim that every company listed here has worked with FrankX.
            </p>
          </div>
          <div className="border-t border-[#171915]">
            {operatingEvidence.map((item) => (
              <div
                key={item.number}
                className="grid gap-3 border-b border-[#171915]/25 py-6 sm:grid-cols-[52px_190px_minmax(0,1fr)] sm:gap-6 sm:py-7"
              >
                <span className="font-mono text-xs text-[#2157d5]">
                  {item.number}
                </span>
                <h3 className="text-base font-semibold text-[#171915]">
                  {item.title}
                </h3>
                <p className="text-sm leading-6 text-[#555950]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1380px] gap-8 bg-[#171915] px-6 py-10 text-[#f3efe6] sm:px-10 sm:py-12 lg:grid-cols-[1fr_auto] lg:items-center lg:px-14 lg:py-14">
          <div>
            <p className="text-sm font-semibold text-[#8aa9ff]">
              A useful first conversation
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-medium leading-[1.08] tracking-[-0.04em] sm:text-4xl">
              Bring the decision your team cannot afford to get wrong.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65">
              In 30 minutes, we map the destination, the bottleneck, and whether
              a bounded partnership makes sense. No deck and no follow-up
              sequence unless we both want one.
            </p>
          </div>
          <Link
            href={MEET_AND_GROW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-12 items-center justify-center gap-2 bg-[#f3efe6] px-6 py-3.5 text-sm font-semibold text-[#171915] transition-colors hover:bg-[#8aa9ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8aa9ff] focus-visible:ring-offset-4 focus-visible:ring-offset-[#171915]"
          >
            Book Meet &amp; Grow
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
              aria-hidden
            />
          </Link>
        </div>

        <div className="mx-auto mt-8 flex max-w-[1380px] flex-col gap-2 text-sm text-[#555950] sm:flex-row sm:items-center sm:justify-between">
          <span>Looking for recommended tools and disclosure rules?</span>
          <Link
            href="/partners"
            className="inline-flex items-center gap-1.5 font-semibold text-[#2157d5] underline decoration-[#2157d5]/35 underline-offset-4 hover:decoration-[#2157d5]"
          >
            Read the tools and affiliate policy
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>
    </main>
  );
}

function PartnershipHeroFigure({ className }: { className: string }) {
  return (
    <figure className={className}>
      <div className="relative aspect-[4/3] overflow-hidden bg-[#d7d0c3]">
        <Image
          src="/images/oracle-events/oracle-workshop-P1081706.jpg"
          alt="Frank Riemer facilitating a workshop discussion with an enterprise team"
          fill
          priority
          sizes="(max-width: 1023px) 100vw, 55vw"
          className="object-cover object-center saturate-[0.78] contrast-[1.04]"
        />
        <span className="absolute bottom-0 right-0 bg-[#2157d5] px-4 py-2 text-xs font-semibold text-white">
          Workshop practice
        </span>
      </div>
      <figcaption className="mt-3 flex flex-col gap-1 text-xs leading-5 text-[#62665d] sm:flex-row sm:justify-between">
        <span>Facilitating an enterprise workshop, 2024.</span>
        <span className="sm:text-right">
          Former Oracle role · no current endorsement implied
        </span>
      </figcaption>
    </figure>
  );
}

function RelationshipSection({
  label,
  title,
  description,
  children,
}: {
  label: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="grid gap-8 border-b border-[#171915]/20 py-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20 lg:py-16">
      <div>
        <p className="text-sm font-semibold text-[#2157d5]">{label}</p>
        <h3 className="mt-3 text-2xl font-medium leading-8 tracking-[-0.03em] text-[#171915] sm:text-3xl">
          {title}
        </h3>
        <p className="mt-4 max-w-md text-sm leading-6 text-[#555950]">
          {description}
        </p>
      </div>
      <div className="border-t border-[#171915]">{children}</div>
    </section>
  );
}

function PartnerRow({
  partner,
  mode,
}: {
  partner: Partner;
  mode: "active" | "alignment" | "opportunity";
}) {
  const status =
    mode === "active"
      ? "Independent FrankX proposal · no endorsement implied"
      : mode === "alignment"
        ? "Independent alignment brief · no partnership implied"
        : partner.status === "in-conversation"
          ? "Exploratory conversation · no formal relationship"
          : "Independent opportunity note · no conversation claimed";

  return (
    <Link
      href={`/partnerships/${partner.slug}`}
      className="group grid gap-4 border-b border-[#171915]/25 py-6 outline-none transition-colors hover:bg-[#ebe3d4] focus-visible:bg-[#ebe3d4] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2157d5] sm:grid-cols-[150px_minmax(0,1fr)_auto] sm:gap-6 sm:px-4 sm:py-7"
    >
      <span className="text-xs font-semibold text-[#2157d5]">
        {tierLabel[partner.tier]}
      </span>
      <span>
        <span className="block text-xl font-medium tracking-[-0.025em] text-[#171915]">
          {partner.name}
        </span>
        <span className="mt-2 block text-sm leading-6 text-[#555950]">
          {partner.tagline}
        </span>
        {partner.programStatus ? (
          <span className="mt-2 block text-xs leading-5 text-[#6a6e65]">
            {partner.programStatus}
          </span>
        ) : null}
        <span className="mt-3 block text-xs font-medium leading-5 text-[#373b34]">
          {status}
        </span>
      </span>
      <ArrowUpRight
        className="h-5 w-5 text-[#2157d5] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
        aria-hidden
      />
    </Link>
  );
}
