# Tools & Resources for Gamified AI Learning

## Open Source Projects

### 1. Tutor-GPT by Plastic Labs
**What:** LLM-powered learning companion with Theory of Mind
**License:** GPL-3.0
**Stack:** Next.js, app router, Honcho for user representations
**Key Feature:** Dynamically updates its own prompts based on learner state
**GitHub:** https://github.com/plastic-labs/tutor-gpt

### 2. OnlineMate (Stanford SCALE)
**What:** Multi-agent companion system for cognitive support
**Key Feature:** Simulates peer-like agent roles, adapts to cognitive states
**Paper:** Available via Stanford SCALE Initiative

### 3. Llama Tutor
**What:** AI personal tutor with adaptive personality
**Focus:** Language learning companion
**URL:** https://www.rundown.ai/tools/llama-tutor-ai-personal-tutor

---

## Commercial Platforms (For Inspiration)

| Platform | Notable Feature |
|----------|-----------------|
| **Disco** | Three AI agents (Design, Operations, Coach) |
| **CYPHER Learning Copilot** | Gamification + multimedia course creation |
| **Docebo** | Adaptive learning + analytics |
| **Mirror** | AI roleplay + dynamic scenario adaptation |
| **Khan Academy Khanmigo** | AI tutor with personalized feedback |
| **Carnegie Learning LiveHint** | Math tutor on 25 years of student data |
| **Duolingo** | Gold standard for gamified language learning |

---

## Technical Building Blocks

### Vector Databases (for RAG)
- **ChromaDB** - You already have this via claude-mem!
- **Weaviate** - Open source, good for education use cases
- **Pinecone** - Managed, scales well
- **Qdrant** - Rust-based, performant

### Progress Tracking Options
- Simple JSON files (MVP approach)
- SQLite (local, persistent)
- Supabase/Firebase (if web interface needed)
- Claude-mem's existing database

### Gamification Libraries
- **Gamification.js** - Simple point/badge systems
- **Custom JSON schema** - Track XP, achievements, streaks
- **Notion/Obsidian templates** - Visual progress tracking

---

## Research & Papers

1. **"An LLM based learning framework for adaptive feedback mechanisms in gamified XR"** (ScienceDirect, Sept 2025)
   - 22% increase in student motivation
   - 40% fewer task retries vs traditional methods

2. **"Research AI: integrating AI and gamification in higher education"** (Frontiers, Sept 2025)
   - Effectiveness on engagement and skill acquisition
   - Priority skills: creativity, collaboration, communication, critical thinking

3. **"Gamifying Learning with AI: A Pathway to 21st-Century Skills"** (Taylor & Francis, 2024)
   - Framework for AI-gamification integration

4. **"A Comprehensive Review of AI-based Intelligent Tutoring Systems"** (arXiv, 2025)
   - ITS can improve student performance by 20%

5. **"Generative AI and Its Impact on Personalized Intelligent Tutoring Systems"** (arXiv, Oct 2024)
   - GenAI as pedagogical agents for metacognitive strategies

---

## Claude Code Specific

### Official Documentation
- [Agent Skills Overview](https://code.claude.com/docs/en/skills)
- [Skills API Reference](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)
- [GitHub: anthropics/skills](https://github.com/anthropics/skills)

### Community Resources
- [awesome-claude-skills (VoltAgent)](https://github.com/VoltAgent/awesome-claude-skills)
- [awesome-claude-skills (travisvn)](https://github.com/travisvn/awesome-claude-skills)
- [Claude Skills Deep Dive](https://leehanchung.github.io/blogs/2025/10/26/claude-skills-deep-dive/)
- [Claude Code Customization Guide](https://alexop.dev/posts/claude-code-customization-guide-claudemd-skills-subagents/)

### Key Blog Posts
- [Introducing Agent Skills (Anthropic Blog)](https://claude.com/blog/skills)
- [Equipping agents for the real world (Anthropic Engineering)](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)

---

## Your Existing Infrastructure

These tools in your FrankX ecosystem could support a learning system:

| Tool | Application |
|------|-------------|
| **Claude-mem** | Store learner state, retrieve learning content |
| **ChromaDB** | Vector search for educational content |
| **.claude-skills/** | Already has 52 skills that could become lessons |
| **Soulbook framework** | 7 pillars = 7 learning domains |
| **content-universe/** | Book content could become learning modules |
