# Multi-Cloud AI Architecture

> "Give me six hours to chop down a tree and I will spend the first four sharpening the axe."
> — Abraham Lincoln

---

My Oracle laptop runs a VPN tunnel to OCI. My personal machine has Vercel, Railway, and Cloudflare credentials stored in separate environment files. On any given Tuesday, I touch five cloud providers before lunch — not because I enjoy complexity, but because each one does something the others cannot, or does it at a price point the others refuse to match.

This is the reality of serious AI architecture in 2026. There is no single cloud that wins. There is only the right tool for the right workload at the right cost. Enterprise architects have known this for a decade. The question is whether individual builders — the solo developers, the creators, the one-person studios — will figure it out before they either overpay by consolidating everything on one premium platform, or underbuild by refusing to use anything beyond free tiers.

My actual monthly cloud spend for frankx.ai — a site with 250+ pages, 12,000+ songs indexed, active users, email automation, and agentic workflows running in the background — is under forty dollars. The compute that would cost an enterprise fifty thousand dollars a month runs for me at a price comparable to a dinner out. The difference is architecture: knowing which cloud to use for what, and designing the system so you can swap any piece without burning the rest down.

---

## I. The Provider Map

Eight providers appear in my daily work. Each has a distinct center of gravity.

**AWS** is the enterprise default and the safe choice. Bedrock gives you model access — Anthropic's Claude, Meta's Llama, Amazon's own Titan — through a unified API. Lambda handles serverless functions with the scale guarantee that justifies enterprise adoption. S3 remains the world's storage layer, the substrate on which half the internet persists. If you are building for a Fortune 500 client, your architecture starts here by default. The sales cycles, the procurement processes, the security review templates — they all assume AWS. Fighting this assumption costs more than it saves.

**Google Cloud** is where serious ML lives. Vertex AI is Google's managed model platform, tightly integrated with the TPU infrastructure that trained many of the models you use daily. BigQuery ML lets you run inference directly against your data warehouse, collapsing the distance between analytics and prediction. If your workload is dominated by structured data — training custom models, running batch inference, mining patterns across petabytes — GCP is the serious answer. At Oracle, when clients ask about fine-tuning on proprietary data at scale, the GCP conversation happens early.

**Azure** is the Microsoft ecosystem, which means it is also the GPT-5 ecosystem. Microsoft's exclusive partnership with OpenAI gives Azure OpenAI Service access to models through a managed API with enterprise SLAs and data residency guarantees that the consumer API cannot provide. If your organization runs Microsoft 365, Azure Active Directory, and the associated compliance infrastructure, Azure AI integration is not a technology choice — it is a governance choice.

**Oracle Cloud Infrastructure** is where I spend my professional hours. OCI's AI Services layer includes document understanding, speech-to-text, vision analysis, and language processing — all productized and governed for enterprise use. The GPU clusters are competitive at scale. Autonomous Database, Oracle's self-tuning managed database, handles the data persistence layer for every enterprise client I have worked with in EMEA. The cloud that runs Oracle's own software is the cloud that many large organizations trust for their most sensitive workloads. I see this from the inside.

**Vercel** is the creator's platform and the frontend's natural home. Edge functions run at 300+ locations globally. Build caching makes deployments fast. The DX — developer experience — is genuinely better than any major cloud for Next.js applications. Vercel Blob handles file storage at a price that makes sense for content-heavy sites. The frankx.ai website lives on Vercel because Vercel is the best answer to the question: "How do I deploy a Next.js app and not think about infrastructure?"

**Railway** is the indie hacker's infrastructure. Managed PostgreSQL, Redis, background services — deployed in four clicks. My n8n automation empire, nine active workflows handling content atomization, morning briefs, and music catalog sync, runs on Railway at a cost that would embarrass any hyperscaler's minimum. The developer-friendly pricing model and the zero-overhead deployment process make Railway the right answer for services that need to run continuously but do not need enterprise SLAs.

**Cloudflare** is the performance layer that sits in front of everything else. Workers AI brings inference to the edge — running lightweight models at the network level, before your origin server receives the request. R2 provides S3-compatible object storage with zero egress fees, which is the sentence that makes every AWS architect pause. If your architecture includes large file storage with high read volume — audio files, images, PDFs — the egress math alone justifies R2.

**NVIDIA** is the compute foundation. DGX Cloud provides GPU clusters on-demand. NIM — NVIDIA Inference Microservices — packages popular models as optimized containers that deploy consistently across any infrastructure. When a client needs to run a 70B parameter model with sub-100ms latency, the conversation starts with NVIDIA and works backward to the cloud provider.

---

## II. The Decision Framework

Before choosing a cloud for any workload, three questions determine the answer.

**What is the primary constraint?** Every architecture choice is dominated by one constraint. Sometimes it is latency — the inference must happen within 200ms, which points toward edge inference on Cloudflare Workers AI or cached results on Vercel's CDN. Sometimes it is cost — the budget is thirty dollars a month, which points toward Railway and Vercel's free tiers plus Cloudflare R2. Sometimes it is compliance — the data cannot leave the EU, which narrows the field to OCI Frankfurt, Azure West Europe, or AWS eu-west-1 with specific data residency configurations. Name the primary constraint first. Everything else is secondary.

**What does the existing ecosystem require?** Cloud choices compound. A PostgreSQL database on Railway connects naturally to a Node.js API on Railway. A Next.js frontend on Vercel integrates naturally with Vercel Blob for storage. An Oracle client with Fusion applications integrates naturally with OCI AI Services. The switching cost of going against ecosystem gravity is real — not just in integration work, but in the accumulated expertise of the team that has to operate the system. Respect the ecosystem. Go against it only when the primary constraint demands it.

**What is the migration cost if this turns out to be wrong?** This question gets omitted from most architecture decisions and causes most regrettable ones. A decision that saves money today but requires six months of rearchitecting in two years is not cheap. The right architecture is the one you can migrate away from when circumstances change — and circumstances always change.

---

## III. The $30 Stack vs. The $30,000 Stack

Here is what the same capability costs at different scales:

**The $30/month stack** — what I run for frankx.ai:

- Vercel Pro: $20/month. Frontend hosting, edge functions, Vercel Blob storage for PDFs and assets.
- Railway: $5/month. PostgreSQL, Redis, n8n background service. Nine workflows running continuously.
- Cloudflare free tier: $0. R2 storage for 61 self-hosted MP3 files, CDN, DNS.
- Supabase free tier: $0. Auth and additional database capacity.
- Resend: $0–3/month. Transactional email, welcome sequences, PDF delivery.

Total compute for a production website with active users, background automation, and audio streaming: under forty dollars.

**The $30,000/month enterprise stack** — what a Fortune 500 client runs for equivalent capability:

- AWS or Azure: Multiple regions, $15,000–20,000/month in compute and egress.
- Managed Kubernetes: $3,000–5,000/month for the orchestration layer.
- Enterprise support contracts: $2,000–4,000/month.
- Compliance tooling, monitoring, security scanning: $3,000–5,000/month.
- Development team overhead for managing the infrastructure: not counted, but real.

The enterprise stack is justified by requirements the personal stack cannot meet: multi-region failover, SLA guarantees, audit trails, data residency compliance, vendor support contracts with legal teeth. If you need those things, you pay for them. If you do not need them, paying for them is waste.

The mistake most individual builders make is operating at the $30 level while feeling guilty about not having the $30,000 stack. The correct posture is to understand exactly which enterprise capabilities you need and pay for precisely those — nothing more.

---

## IV. Frank's Actual Daily Stack

The system I have built for frankx.ai has been running continuously since late 2025. Here is the honest account of what runs where and why.

**Vercel** handles everything user-facing. The Next.js application, the edge middleware, the image optimization, the Blob storage for downloadable products. Vercel's CDN means a user in Tokyo loads frankx.ai from a Tokyo edge node, not from wherever the origin server lives. The developer experience — push to main, Vercel builds and deploys — means I can ship a new blog post, fix a bug, and deploy a new page in the same session without touching any infrastructure.

**Supabase** provides the database and authentication. The free tier is sufficient for the current user volume. The Postgres instance is managed, backed up, and monitored without any action on my part. When the site grows past Supabase's free tier limits, upgrading is a one-click process.

**Railway** runs the background services. n8n on Railway processes nine automation workflows — morning intelligence briefs, content atomization from blog posts to social threads, music catalog sync with the Suno platform, newsletter publishing via Resend. These workflows run on schedules and webhooks, consuming compute only when active. Railway charges for what you use, which means nine workflows that run for minutes per day cost almost nothing.

**Cloudflare** sits in front of the music system. Sixty-one MP3 files live in Cloudflare R2. When a user plays a track on frankx.ai, they stream from Cloudflare's edge network — not from Vercel, which would accumulate egress costs, and not from the Suno CDN, which I do not control. R2's zero-egress pricing is the detail that makes self-hosting audio at scale financially rational.

**OCI** does not appear in my personal stack. It appears in my professional one. When I build AI architectures for Oracle clients in EMEA, the workloads run on OCI because that is the platform we support, the governance frameworks we have built, and the infrastructure our client relationships are built around. The knowledge transfers both directions — what I see in enterprise deployments informs how I architect for scale, even when the scale I am currently operating at is measured in dollars, not thousands of dollars.

---

## V. The Portability Principle

Every architectural decision that locks you to a single vendor is a liability. Not because the vendor is bad, but because circumstances change. Pricing changes. Products get discontinued. Acquisitions happen. Your requirements evolve.

The portability principle: design for migration, not for lock-in.

In practice this means four things.

**Abstract your model calls.** Never call a model API directly from your application code. Call a wrapper that translates to the model API. When you switch from Claude to GPT-5 to Gemini — or when model versions change within the same provider — you change one file, not forty. The Vercel AI SDK does this for model providers. My own `lib/ai-client.ts` does it at the application level.

**Own your data layer.** Whatever cloud you use for compute, keep your data in a system you can export. SQL databases that expose standard PostgreSQL interfaces, S3-compatible object storage, JSON files in git repositories — these are portable. Proprietary data formats, vendor-specific vector stores, closed APIs without export functions — these are traps.

**Separate the workloads.** Monolithic architecture feels efficient until you need to change one piece. When your authentication, your database, your AI inference, and your frontend are all coupled to one vendor, changing any one piece requires changing all of them. My stack has four separate providers precisely because each piece can be swapped independently. If Railway's pricing changes, I migrate the background services without touching Vercel or Supabase. If Vercel raises prices beyond what makes sense, I deploy the Next.js application to another platform without touching the database or the automation layer.

**Document the contract between systems.** The interface between each service in your architecture — the API contract, the data schema, the authentication mechanism — should be documented in a format that survives personnel changes. Not because you expect to hand this system to someone else, but because you will forget the details in three months, and future-you is effectively a different person from present-you. My `docs/plans/railway-architecture.md` describes every service, every port, every environment variable, and why each decision was made. This document has saved me hours when I returned to services I had not touched in weeks.

---

## VI. How Enterprise Architects Think

At Oracle, the multi-cloud conversation with clients is never about which single cloud is best. It is about which workloads belong where.

The model that enterprise architects use is workload placement: for each workload in the system, identify the non-negotiable requirements — latency, compliance, scale, integration — and place the workload on the provider that best satisfies those requirements. Not the provider you prefer. Not the provider with the best conference swag. The provider whose capabilities match the requirements.

The enterprise adds two layers that individual builders often skip: governance and observability. Governance is the process of deciding which workloads can run on which clouds, who has authority to add new providers, and how compliance requirements are tracked across a heterogeneous environment. Observability is the unified monitoring layer — usually something like Datadog or Grafana — that gives visibility across providers so that a latency spike in an Azure function shows up in the same dashboard as an error rate increase in an OCI service.

Individual builders do not need enterprise governance. But they benefit from enterprise thinking: be intentional about workload placement, maintain a clear mental model of why each piece lives where it lives, and build the system so that the decisions can be questioned and changed as circumstances evolve.

The cloud is not a destination. It is a distribution of your workloads across the available infrastructure. The architects who understand this ship systems that survive change. The architects who treat "cloud" as a singular noun spend their careers migrating regrettable decisions.

---

## The Standard

**Every cloud you use should earn its place.** The decision to add a provider is not a technical decision first — it is a requirements decision. What does this workload need that no current provider delivers? If the answer is clear and the need is real, add the provider. If the answer requires squinting, stay with what you have.

The $30 stack is not a compromise. It is a architecture that precisely matches the requirements of a production system at the current scale. When the requirements change — when the user volume grows, when the compliance demands arrive, when the SLA commitments require enterprise infrastructure — the architecture grows to match. Not before.

This is what multi-cloud mastery actually looks like: not the complexity of many clouds, but the clarity to place each workload where it belongs, the discipline to keep the boundaries clean, and the judgment to know when the current stack is the right stack.

The architects who manage this well are not the ones who use the most providers. They are the ones who can explain, in one sentence, why every piece of their system lives exactly where it does.

— *Frank Riemer*
