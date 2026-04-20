# Different Users, Different Architectures

> "If you only have a hammer, everything looks like a nail."
> — Abraham Maslow

---

Not everyone who reads this book is a developer. And that is the point.

The intelligence layer does not discriminate by profession. It is available to everyone — developers, professors, researchers, doctors, musicians, founders, students, and professionals who have never written a line of code. But each of these users needs a different architecture. The developer's stack is not the professor's stack. The doctor's workflow is not the musician's workflow. The student's entry point is not the founder's entry point.

This chapter maps the architecture for each type of user. Not as a simplification — as an honest assessment of what each person needs, what they can build, and where the intelligence layer creates the most value for their specific context.

---

## I. The Developer

**What they already have:** Programming skills, terminal comfort, version control, deployment experience.

**What the intelligence layer adds:** Force multiplication. A developer with a coding agent produces three to ten times more output than a developer without one. This is not speculation — it is the consistent finding across every developer survey since 2024.

**The Developer's Architecture:**

```
Primary Agent:    Claude Code (agentic, terminal-based, MCP-enabled)
Secondary Agent:  Cursor or Copilot (IDE-native for quick iteration)
Protocol:         MCP (21+ servers for databases, APIs, deployment)
Skills:           Domain-specific (framework, language, deployment platform)
Infrastructure:   Vercel/Railway + Supabase + GitHub Actions
Automation:       n8n or Temporal for background workflows
Monitoring:       Langfuse for LLM observability, Vercel Analytics for frontend
```

**The key insight for developers:** The skill stack matters more than the model choice. A developer using Claude Code with seventy-five domain-specific skills will outperform a developer using a better model with zero skills. The skill system is the developer's competitive advantage — it encodes their accumulated expertise into reusable context that compounds over time.

---

## II. The Professor

**What they already have:** Deep domain expertise, teaching methodology, student relationships, institutional context.

**What the intelligence layer adds:** Scale. A professor can now create, grade, and iterate on teaching materials at a speed that was previously impossible. The intelligence layer handles the mechanical work — formatting, distributing, tracking — while the professor provides the irreplaceable elements: judgment, mentorship, and the nuance that comes from years in the field.

**The Professor's Architecture:**

```
Primary Tool:     Claude (Projects for persistent course context)
Research:         Perplexity Deep Research (cited sources, academic focus)
Grading:          ChatGPT Advanced Data Analysis (spreadsheet-based rubrics)
Content:          Gemini NotebookLM (turn lecture notes into interactive resources)
Student Tools:    frankx.ai/students (assessment, ikigai, prompts, ecosystem map)
Workshop:         frankx.ai/professors (pre-built templates, syllabi)
```

**No coding required.** The professor's architecture does not include a terminal, a deployment platform, or a git repository. It uses cloud-based tools through web interfaces and pre-built platforms. The intelligence layer serves the professor through tools designed for non-technical users — and this is exactly how it should be.

**The key insight for professors:** Your domain expertise IS the skill stack. When you use Claude Projects to create a persistent course context — uploading your syllabus, lecture notes, grading rubrics, and course policies — you are building a skill that makes the AI a domain specialist in your course. No other professor has this context. It is your competitive advantage, encoded in the intelligence layer.

---

## III. The Researcher

**What they already have:** Research methodology, domain knowledge, access to academic databases, institutional resources.

**What the intelligence layer adds:** Speed. A literature review that took weeks now takes hours. A data analysis that required a statistics team now requires one person with the right prompts. A research paper that went through six revision cycles can be structurally improved in a single session.

**The Researcher's Architecture:**

```
Literature:       Perplexity Deep Research (50+ papers with citations in hours)
Synthesis:        Claude Projects (persistent context for research themes)
Data Analysis:    ChatGPT Advanced Data Analysis or R/Python + Copilot
Document Review:  Gemini 2.5 Pro (1M+ token context for long documents)
Knowledge Base:   NotebookLM (turn papers into searchable, interactive knowledge)
Writing:          Claude (system prompts for academic voice, citation formats)
Collaboration:    Shared Claude Projects (when available) or structured prompts
```

**The key insight for researchers:** The Model Council pattern is essential for research. Use Perplexity for discovery (it cites sources). Use Claude for synthesis (it reasons about contradictions). Use Gemini for long-document analysis (it holds 1M+ tokens). Use ChatGPT for data visualization (it generates charts from datasets). No single model covers the full research workflow. The council does.

---

## IV. The Doctor

**What they already have:** Clinical expertise, patient relationships, regulatory context, institutional protocols.

**What the intelligence layer adds:** Time. Administrative work consumes 40-60% of a physician's day. Documentation, referral letters, literature reviews, patient education materials — all of this is mechanical work that the intelligence layer can accelerate without compromising clinical judgment.

**The Doctor's Architecture:**

```
Documentation:    Claude (voice-to-structured-note, discharge summaries)
Literature:       Perplexity (PubMed-grounded search with citations)
Patient Comms:    ChatGPT (plain-language explanations at appropriate reading level)
Data Analysis:    ChatGPT Advanced Data Analysis (outcome tracking, quality metrics)
Knowledge:        Gemini NotebookLM (clinical guidelines as interactive reference)
Safety:           NEVER share PHI with cloud AI without proper BAA
```

**The critical constraint:** Patient data. No cloud AI service should receive Protected Health Information without a Business Associate Agreement. The doctor's architecture must be designed with this constraint as a first principle — use AI for templates, patterns, and de-identified analysis, but never for individual patient data without proper authorization.

**The key insight for doctors:** Start with documentation. It is the highest-friction, lowest-joy part of clinical practice. If the intelligence layer saves you thirty minutes per day on documentation, that is thirty minutes returned to patient care — the work you entered medicine to do.

---

## V. The Creator

**What they already have:** Creative skills, audience, content production experience, platform knowledge.

**What the intelligence layer adds:** Range. A writer can now produce music. A musician can now build websites. A designer can now write code. The intelligence layer does not replace creative skills — it extends them into adjacent domains that were previously inaccessible without years of specialized training.

**The Creator's Architecture:**

```
Writing:          Claude (long-form, voice-consistent, SEO-aware)
Music:            Suno AI (prompt engineering across genres)
Visuals:          Midjourney or Gemini 3 Pro Image (brand-consistent imagery)
Code:             Claude Code or Cursor (build your own tools and platforms)
Distribution:     n8n (automated content pipeline across platforms)
Analytics:        Vercel Analytics + Plausible (privacy-first metrics)
Products:         Gumroad or Lemon Squeezy (digital product sales)
Community:        Newsletter (Resend) + Discord or Slack
```

**The key insight for creators:** The intelligence layer makes you a full-stack creator. You no longer need a developer to build your website, a producer to create your music, or a designer to create your visuals. You need the intelligence layer, the right prompts, and the discipline to ship consistently. The creator who masters this stack in 2026 will build what previously required a team of ten.

---

## VI. The Founder

**What they already have:** Vision, market understanding, urgency, willingness to take risk.

**What the intelligence layer adds:** Execution speed. A founder with coding agents can build a prototype in a weekend that would have taken a development team two months. A founder with AI-assisted research can validate a market in days instead of weeks. A founder with automated content pipelines can establish thought leadership while building the product.

**The Founder's Architecture:**

```
Prototyping:      Claude Code + Next.js + Vercel (idea to deployed app in hours)
Research:         Perplexity + Claude (market validation with data)
Content:          Claude + ACOS content pipeline (blog, newsletter, social)
Legal:            Claude (first drafts of terms, privacy policies, contracts)
Design:           Cursor + Tailwind + shadcn/ui (production UI without a designer)
Analytics:        Vercel Analytics + PostHog (product analytics)
Payments:         Stripe (revenue from day one)
```

**The key insight for founders:** Ship before you hire. The intelligence layer enables a single founder to build, launch, and validate a product without any employees. Hire only after you have proven demand — and even then, hire people who amplify the intelligence layer rather than replace it.

---

## VII. The Common Thread

Every architecture in this chapter shares three elements:

1. **The intelligence layer is a multiplier, not a replacement.** It amplifies what you already know. The professor's domain expertise. The doctor's clinical judgment. The developer's architectural thinking. The creator's artistic vision. Without these human inputs, the intelligence layer produces generic output. With them, it produces extraordinary output.

2. **The right tool for the right user.** A developer does not need NotebookLM. A doctor does not need Claude Code. A professor does not need n8n. Matching tools to users is the architect's most important design decision — and the one most commonly made wrong by people who assume everyone should use the same stack.

3. **Start with one tool, add complexity gradually.** Every architecture in this chapter can be started with a single tool — Claude, ChatGPT, or Perplexity. The full stack emerges over months of use as the user discovers what they need. Trying to implement the entire architecture on day one is a recipe for overwhelm.

The intelligence layer is available to everyone. The architecture is different for everyone. The value is proportional to the expertise you bring to it.

Bring your best. The layer will amplify it.
