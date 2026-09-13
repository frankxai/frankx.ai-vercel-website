import ResearchHubLead from "./research-hub-lead";
import ResearchHubClient from "./research-hub-client";
import { researchHubFaqs as hubFaqs } from "@/lib/research/hubs";
import ResearchModelWatch from "./research-model-watch";

// JSON-LD is built from the static hub FAQ registry — not request input.
const faqLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: hubFaqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
});

export default function ResearchPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqLd }}
      />
      <ResearchHubClient
        models={
          <>
            <ResearchModelWatch />
            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
              <h2 className="mb-8 text-2xl font-semibold">
                About the research
              </h2>
              <dl className="grid gap-8 md:grid-cols-3">
                {hubFaqs.map((item) => (
                  <div key={item.q}>
                    <dt className="font-semibold">{item.q}</dt>
                    <dd className="mt-3 text-sm leading-6 text-white/65">
                      {item.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </>
        }
      >
        <ResearchHubLead />
      </ResearchHubClient>
    </>
  );
}
