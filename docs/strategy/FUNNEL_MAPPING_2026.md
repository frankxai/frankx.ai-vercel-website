# Funnel Strategy & Persona Mapping 2026
*Date: February 19, 2026*

## 🎯 Target Audience Personas

### 1. The Elite Creator (The Director)
- **Profile:** High-output content creators or agency owners.
- **Pain Point:** Fragmented workflows, manual editing burnout, lack of systemic growth.
- **Desired Outcome:** A "Studio-in-a-Box" system that handles the grunt work while they focus on vision.
- **Content Fit:** [Short-Form Nexus](/opus-pro), [Agentic Creator OS](/blog/agentic-creator-os).

### 2. The AI Architect (The Builder)
- **Profile:** Software engineers, technical consultants, CTOs.
- **Pain Point:** Keeping up with the "frontier" model pace, building reliable agentic systems.
- **Desired Outcome:** Enterprise-grade blueprints and first-principles understanding.
- **Content Fit:** [Video Intelligence](/youtube), [Karpathy Deep Dive](/blog/karpathys-ai-vision-deep-dive), [Claude Code Mastery](/blog/claude-code-mastery-top-resources).

### 3. The Knowledge Seeker (The Student)
- **Profile:** Lifelong learners, transitioners, productivity nerds.
- **Pain Point:** High noise-to-signal ratio in AI education.
- **Desired Outcome:** A curated roadmap from Zero to Pro.
- **Content Fit:** [Visionaries Hub](/research/visionaries), [Self-Development Books](/books/self-development).

---

## 🗺️ Funnel Mapping

| Stage | Goal | Content Asset | Conversion Event |
| :--- | :--- | :--- | :--- |
| **Awareness** | Discovery | Viral Short-form Clips (Opus Pro) | Click to Blog/YouTube |
| **Education** | Trust | [Video Intelligence](/youtube) Hero Videos | Newsletter Signup |
| **Evaluation** | Proof | [Strategy Playbooks](/opus-pro) & Frameworks | Lead Magnet Download |
| **Conversion** | Sale | [Agentic Creator OS](/products/agentic-creator-os) | Purchase / Checkout |
| **Retention** | Advocacy | [Inner Circle](/inner-circle) / Soulbook | Recurring Subscription |

---

## 📺 YouTube Indexing Strategy (Automated)

We use `scripts/generate-youtube-index.mjs` to maintain a global registry of every video node in our network.

### Current High-Value YouTube Nodes:
1.  **Andrej Karpathy** (The Professor) - Fundamental Theory.
2.  **Simon Willison** (The Architect) - AI Engineering & Data.
3.  **Fireship** (The Speedrunner) - Tool Overviews.
4.  **David Ondrej** (The Builder) - Practical Implementation.
5.  **All About AI** (The Explorer) - Model Comparisons.

### Automation Protocol:
- **Scan:** Every 24h via `npm run content:index`.
- **Enrich:** Markdown metadata includes `youtubeId`.
- **Embed:** `UniversalEmbed` handles facade loading for performance.
- **Multiply:** [Opus Pro](/opus-pro) extracts shorts for stage 1 (Awareness).

---

## 🚀 Execution Roadmap (Autonomous)

1.  **[x] Automated Sitemap:** `app/sitemap.ts` updated to index Strategy Frameworks.
2.  **[x] Link Indexing:** Global `data/youtube-index.ts` active.
3.  **[x] Sophisticated Naming:** "Video Intelligence" & "Short-Form Nexus" live.
4.  **[ ] Coursera Integration:** Add deep-links to [Claude Code Mastery](/blog/claude-code-mastery-top-resources).
5.  **[ ] Search Upgrade:** Implement real-time search in the Blog menu.
