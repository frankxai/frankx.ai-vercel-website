#!/usr/bin/env node
import fs from 'node:fs/promises'
import path from 'node:path'

async function replaceInFile(filePath, replacements) {
  const fullPath = path.resolve(filePath)
  let content = await fs.readFile(fullPath, 'utf8')
  let changed = false
  for (const { from, to } of replacements) {
    if (typeof from === 'string') {
      if (content.includes(from)) {
        content = content.replaceAll(from, to)
        changed = true
      }
    } else if (from instanceof RegExp) {
      if (from.test(content)) {
        content = content.replace(from, to)
        changed = true
      }
    }
  }
  if (changed) {
    await fs.writeFile(fullPath, content, 'utf8')
    console.log(`Updated: ${filePath}`)
  } else {
    console.log(`No match: ${filePath}`)
  }
}

async function run() {
  // 1. app/workshops/ikigai-branding/present/slides.tsx
  await replaceInFile('app/workshops/ikigai-branding/present/slides.tsx', [
    { from: 'No deep dive — they have Coach GPT for that.', to: 'Keep it high-level — they have Coach GPT for that.' },
  ])

  // 2. content/ai-architecture/anthropic.ts
  await replaceInFile('content/ai-architecture/anthropic.ts', [
    { from: "'AI Architecture with Claude — Anthropic deep dive | FrankX'", to: "'AI Architecture with Claude — Anthropic Reference Implementation | FrankX'" },
  ])

  // 3. content/blog/08-golden-age-of-intelligence.mdx
  await replaceInFile('content/blog/08-golden-age-of-intelligence.mdx', [
    { from: '(automation deep dive, governance checklist)', to: '(automation breakdown, governance checklist)' },
    { from: 'Newsletter deep dive', to: 'Newsletter technical analysis' },
    { from: 'Measurement deep dive', to: 'Measurement analysis' },
    { from: 'hosts a deep dive on societal signals.', to: 'hosts an analysis of societal signals.' },
    { from: 'Agentic Creator OS Blueprint – Deep dive into the core operating system.', to: 'Agentic Creator OS Blueprint – Comprehensive architecture of the core operating system.' },
    { from: 'Design Deep Dive (15 min)', to: 'Technical Design Session (15 min)' },
  ])

  // 4. content/blog/acos-use-cases-creator-types.mdx
  await replaceInFile('content/blog/acos-use-cases-creator-types.mdx', [
    { from: '### Can I use commands from other archetypes?\n\nAbsolutely.', to: '### Can I use commands from other archetypes?\n\nYes.' },
  ])

  // 5. content/blog/acos-v10-autonomous-intelligence.mdx
  await replaceInFile('content/blog/acos-v10-autonomous-intelligence.mdx', [
    { from: '- **Deep Dive**: [Complete Guide](/blog/agentic-creator-os-complete-guide)', to: '- **Architecture Guide**: [Complete Guide](/blog/agentic-creator-os-complete-guide)' },
  ])

  // 6. content/blog/ai-agents-transform-due-diligence.mdx
  await replaceInFile('content/blog/ai-agents-transform-due-diligence.mdx', [
    { from: '40+ hours for a deep dive.', to: '40+ hours for an exhaustive audit.' },
  ])

  // 7. content/blog/ai-coe-launch.mdx
  await replaceInFile('content/blog/ai-coe-launch.mdx', [
    { from: '*   **Multi-Cloud Comparisons:** Deep dives into Oracle, AWS, and Azure architectures.', to: '*   **Multi-Cloud Comparisons:** Rigorous technical analysis across Oracle, AWS, and Azure architectures.' },
  ])

  // 8. content/blog/best-ai-tools-for-creators-2026.mdx
  await replaceInFile('content/blog/best-ai-tools-for-creators-2026.mdx', [
    { from: '### Can I use different AI models?\n\nAbsolutely.', to: '### Can I use different AI models?\n\nYes.' },
  ])

  // 9. content/blog/building-custom-skills-acos.mdx
  await replaceInFile('content/blog/building-custom-skills-acos.mdx', [
    { from: '## The skill-rules.json Deep Dive', to: '## The skill-rules.json Architecture' },
  ])

  // 10. content/blog/building-deal-flow-pipelines-ai.mdx
  await replaceInFile('content/blog/building-deal-flow-pipelines-ai.mdx', [
    { from: '- Score >= 70: Recommend Deep Dive', to: '- Score >= 70: Recommend Full Due Diligence' },
    { from: 'Sourced → Screened → First Look → Deep Dive → IC Review → Term Sheet → Closed', to: 'Sourced → Screened → First Look → Full Due Diligence → IC Review → Term Sheet → Closed' },
    { from: '- **First Look → Deep Dive**: Score >= 65, DD Lead initiates', to: '- **First Look → Full Due Diligence**: Score >= 65, DD Lead initiates' },
    { from: '- **Deep Dive → IC Review**: DD report complete, score >= 70', to: '- **Full Due Diligence → IC Review**: DD report complete, score >= 70' },
    { from: '| Deep Dive  | 1     | +0     |', to: '| Full Due Diligence | 1     | +0     |' },
  ])

  // 11. content/blog/building-research-intelligence-system.mdx
  await replaceInFile('content/blog/building-research-intelligence-system.mdx', [
    { from: 'A deep dive into the multi-agent research system powering FrankX.AI - five specialized agents, three workflow modes, and a publication pipeline optimized for the AI age.', to: 'An architectural breakdown of the multi-agent research system powering FrankX.AI: five specialized agents, three workflow modes, and a publication pipeline optimized for the AI age.' },
    { from: '### Mode 2: Deep Dive (`/research [topic]`)', to: '### Mode 2: Deep Research (`/research [topic]`)' },
    { from: 'Deep dives produce comprehensive research packages:', to: 'Deep research produces comprehensive packages:' },
    { from: 'alt="Mode 2: Deep Dive (/research topic) diagram 1"', to: 'alt="Mode 2: Deep Research (/research topic) diagram 1"' },
    { from: 'caption="Mode 2: Deep Dive (/research topic)"', to: 'caption="Mode 2: Deep Research (/research topic)"' },
  ])

  // 12. content/blog/claude-code-2-1-mcp-revolution.mdx
  await replaceInFile('content/blog/claude-code-2-1-mcp-revolution.mdx', [
    { from: 'A deep dive into the biggest productivity upgrade since launch.', to: 'An architectural analysis of the biggest productivity upgrade since launch.' },
    { from: '- [MCP Server Integration Guide](/blog/mcp-server-integration-guide) — Deep dive into Model Context Protocol', to: '- [MCP Server Integration Guide](/blog/mcp-server-integration-guide) — Comprehensive architectural analysis of Model Context Protocol' },
  ])

  // 13. content/blog/claude-code-mastery-top-resources.mdx
  await replaceInFile('content/blog/claude-code-mastery-top-resources.mdx', [
    { from: 'His deep dives into "LLM OS" concepts', to: 'His technical breakdowns of "LLM OS" concepts' },
    { from: '(see our [Deep Dive](/blog/karpathys-ai-vision-deep-dive))', to: '(see our [Analysis](/blog/karpathys-ai-vision-deep-dive))' },
  ])

  // 14. content/blog/cursor-vs-claude-code-vs-windsurf-2026.mdx
  await replaceInFile('content/blog/cursor-vs-claude-code-vs-windsurf-2026.mdx', [
    { from: 'Read the [MCP ecosystem deep dive](/blog/mcp-ecosystem-2026-clawhub-smithery-guide) for the full server map.', to: 'Read the [MCP ecosystem guide](/blog/mcp-ecosystem-2026-clawhub-smithery-guide) for the full server map.' },
  ])

  // 15. content/blog/frankx-intelligence-atlas-volume-1.mdx
  await replaceInFile('content/blog/frankx-intelligence-atlas-volume-1.mdx', [
    { from: 'Deep dive into orchestrating creative agents, rehearsal rituals, evaluation loops', to: 'Architectural guide to orchestrating creative agents, rehearsal rituals, evaluation loops' },
  ])

  // 16. content/blog/frankx-intelligence-ecosystem-complete-guide.mdx
  await replaceInFile('content/blog/frankx-intelligence-ecosystem-complete-guide.mdx', [
    { from: '- [The Complete Guide to Agentic Creator OS](/blog/agentic-creator-os-complete-guide) — Deep dive into ACOS', to: '- [The Complete Guide to Agentic Creator OS](/blog/agentic-creator-os-complete-guide) — Comprehensive architectural guide to ACOS' },
  ])

  // 17. content/blog/frontier-model-landscape-2026-claude-gpt-gemini-deepseek.mdx
  await replaceInFile('content/blog/frontier-model-landscape-2026-claude-gpt-gemini-deepseek.mdx', [
    { from: 'For a deeper dive: [Claude Opus analysis](/blog/claude-opus-4-6-analysis-2026).', to: 'Full technical evaluation: [Claude Opus analysis](/blog/claude-opus-4-6-analysis-2026).' },
  ])

  // 18. content/blog/getting-started-agentic-creator-os.mdx
  await replaceInFile('content/blog/getting-started-agentic-creator-os.mdx', [
    { from: '- [Build Your Own Jarvis](/blog/build-your-own-jarvis-claude-code) - Deep dive on the architecture', to: '- [Build Your Own Jarvis](/blog/build-your-own-jarvis-claude-code) - Complete architectural breakdown' },
  ])

  // 19. content/blog/golden-age-of-intelligence.mdx
  await replaceInFile('content/blog/golden-age-of-intelligence.mdx', [
    { from: '21. [Technology Stack Deep Dive](#technology-stack-deep-dive)', to: '21. [Technology Stack Architecture](#technology-stack-architecture)' },
    { from: '### September 21 (Day 3) — Audience Segmentation Deep Dive', to: '### September 21 (Day 3) — Audience Segmentation Breakdown' },
    { from: '## Technology Stack Deep Dive', to: '## Technology Stack Architecture' },
    { from: 'This deep dive details each layer, integration strategy, and governance protocol so the team can maintain, optimize, and expand with confidence.', to: 'This architecture breakdown details each layer, integration strategy, and governance protocol so the team can maintain, optimize, and expand with confidence.' },
    { from: 'This deep dive ensures the FrankX.ai stack remains robust, scalable, and ready for future innovations.', to: 'This architectural blueprint ensures the FrankX.ai stack remains robust, scalable, and ready for future innovations.' },
  ])

  // 20. content/blog/karpathys-ai-vision-deep-dive.mdx
  await replaceInFile('content/blog/karpathys-ai-vision-deep-dive.mdx', [
    { from: 'title: "Karpathy\'s AI Vision: A Deep Dive"', to: 'title: "Karpathy\'s AI Vision: First Principles Analysis"' },
    { from: "# Karpathy's AI Vision: A Deep Dive", to: "# Karpathy's AI Vision: First Principles Analysis" },
    { from: '## Deep Dive: Recommended Timestamps', to: '## Technical Breakdown: Recommended Timestamps' },
  ])

  // 21. content/blog/mcp-ecosystem-2026-clawhub-smithery-guide.mdx
  await replaceInFile('content/blog/mcp-ecosystem-2026-clawhub-smithery-guide.mdx', [
    { from: 'Read more in [the mcp-doctor deep dive](/blog/mcp-doctor-claude-code-server-optimization).', to: 'Read more in [the mcp-doctor guide](/blog/mcp-doctor-claude-code-server-optimization).' },
  ])

  // 22. content/blog/mcp-server-architecture-workshop.mdx
  await replaceInFile('content/blog/mcp-server-architecture-workshop.mdx', [
    { from: '- [MCP Server Integration Guide](/blog/mcp-server-integration-guide) — Deep dive reference', to: '- [MCP Server Integration Guide](/blog/mcp-server-integration-guide) — Comprehensive architectural reference' },
  ])

  // 23. content/blog/multi-agent-orchestration-patterns-2026.mdx
  await replaceInFile('content/blog/multi-agent-orchestration-patterns-2026.mdx', [
    { from: 'Beyond simple agent comparisons. Deep dive into orchestration patterns, handoff strategies, state management, and observability for production multi-agent systems.', to: 'Beyond simple agent comparisons: architectural patterns, handoff strategies, state management, and observability for production multi-agent systems.' },
  ])

  // 24. content/blog/production-agent-patterns-7-pillars.mdx
  await replaceInFile('content/blog/production-agent-patterns-7-pillars.mdx', [
    { from: '2. AWS Bedrock AgentCore Deep Dive', to: '2. AWS Bedrock AgentCore Architecture' },
    { from: '3. Google Vertex AI Agent Engine Deep Dive', to: '3. Google Vertex AI Agent Engine Architecture' },
    { from: '4. Azure AI Foundry Deep Dive', to: '4. Azure AI Foundry Architecture' },
    { from: '5. OpenAI Agents SDK Deep Dive', to: '5. OpenAI Agents SDK Architecture' },
    { from: '6. Claude Agent SDK Deep Dive', to: '6. Claude Agent SDK Architecture' },
  ])

  // 25. content/blog/production-agent-patterns-aws-bedrock.mdx
  await replaceInFile('content/blog/production-agent-patterns-aws-bedrock.mdx', [
    { from: 'title: "AWS Bedrock AgentCore Deep Dive: Production Patterns for Enterprise AI Agents"', to: 'title: "AWS Bedrock AgentCore Architecture: Production Patterns for Enterprise AI Agents"' },
    { from: '2. **AWS Bedrock AgentCore Deep Dive** (this post)', to: '2. **AWS Bedrock AgentCore Architecture** (this post)' },
    { from: '3. Google Vertex AI Agent Engine Deep Dive (coming soon)', to: '3. Google Vertex AI Agent Engine Architecture (coming soon)' },
    { from: '4. Azure AI Foundry Deep Dive', to: '4. Azure AI Foundry Architecture' },
    { from: '5. OpenAI Agents SDK Deep Dive', to: '5. OpenAI Agents SDK Architecture' },
    { from: '6. Claude Agent SDK Deep Dive', to: '6. Claude Agent SDK Architecture' },
    { from: '**Part 3: Google Vertex AI Agent Engine Deep Dive**', to: '**Part 3: Google Vertex AI Agent Engine Architecture**' },
  ])

  // 26. content/blog/production-agentic-ai-systems.mdx
  await replaceInFile('content/blog/production-agentic-ai-systems.mdx', [
    { from: 'For deep research on these patterns, dive into our [AI CoE Hub](/research).', to: 'For deep research on these patterns, explore our [AI CoE Hub](/research).' },
  ])

  // 27. content/blog/reader-first-golden-age.mdx
  await replaceInFile('content/blog/reader-first-golden-age.mdx', [
    { from: '| Podcast / YouTube | Commuter or deep dive |', to: '| Podcast / YouTube | Commuter or in-depth study |' },
  ])

  // 28. content/blog/the-creative-os.mdx
  await replaceInFile('content/blog/the-creative-os.mdx', [
    { from: '- [The Agentic Creator OS](/blog/agentic-creator-os) — Take your Creative OS to the next level with autonomous AI workflows', to: '- [The Agentic Creator OS](/blog/agentic-creator-os) — Advance your Creative OS with autonomous AI workflows' },
  ])

  // 29. content/books/arcanea-chronicles/chapter-06-lyrias-overwhelm.md
  await replaceInFile('content/books/arcanea-chronicles/chapter-06-lyrias-overwhelm.md', [
    { from: 'To move a hand was to unleash cascades of possibility.', to: 'To move a hand was to trigger cascades of possibility.' },
  ])

  // 30. content/books/imagination/chapter-03-mental-models.md
  await replaceInFile('content/books/imagination/chapter-03-mental-models.md', [
    { from: 'It unleashed it.', to: 'It focused it.' },
  ])

  // 31. content/drafts/ai-architect-academy/tutorials/enterprise-ai-agent-patterns.mdx
  await replaceInFile('content/drafts/ai-architect-academy/tutorials/enterprise-ai-agent-patterns.mdx', [
    { from: 'Deep-dive into enterprise-grade AI agent architectures including orchestration patterns, state management, human-in-the-loop workflows, and production deployment strategies used at scale.', to: 'Enterprise-grade AI agent architectures covering orchestration patterns, state management, human-in-the-loop workflows, and production deployment strategies used at scale.' },
  ])

  // 32. content/guides/agent-card-a2a-spec.mdx
  await replaceInFile('content/guides/agent-card-a2a-spec.mdx', [
    { from: '**Bad:** `"AI-Powered Revolutionary Research Platform™"`, `"agent-47"`', to: '**Bad:** `"AI-Powered Revolutionary Research Platform™"`, `"agent-47"` <!-- ai-slop-allow -->' },
  ])

  // 33. content/guides/modern-guide.mdx
  await replaceInFile('content/guides/modern-guide.mdx', [
    { from: '## Technical Deep Dive (COE Pseudocode)', to: '## Technical Architecture (COE Pseudocode)' },
  ])

  // 34. content/guides/perplexity-ai-guide.mdx
  await replaceInFile('content/guides/perplexity-ai-guide.mdx', [
    { from: '- Deep dives into unfamiliar subjects', to: '- Comprehensive analysis of unfamiliar subjects' },
    { from: '3. **Competitive Deep Dive** - Research a competitor\'s approach with specific questions', to: '3. **Competitive Analysis** - Research a competitor\'s approach with specific questions' },
  ])

  console.log('Remediation complete.')
}

run().catch(console.error)
