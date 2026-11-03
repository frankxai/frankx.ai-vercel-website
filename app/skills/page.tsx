import Link from 'next/link'
import { ArrowRight, CheckCircle2, ClipboardList, Code2, ExternalLink, Layers, Sparkles, Terminal, Wand2 } from 'lucide-react'
import JsonLd, { buildFAQPageData } from '@/components/seo/JsonLd'

const triggerPhrases = [
  'Activate Technical Translator',
  'Run Release Notes Writer',
  'Engage Creation Engine',
  'Consult System Architect',
]

const workflowSteps = [
  {
    title: 'Design your skill',
    description:
      'Use the Skill Builder to define YAML frontmatter (`name`, `description`), trigger phrases, and output contracts.',
  },
  {
    title: 'Install in your harness',
    description:
      'Place the folder at `.claude/skills/<name>/SKILL.md` for one repo or `~/.claude/skills/<name>/SKILL.md` across projects.',
  },
  {
    title: 'Verify with evals',
    description:
      'Test routing accuracy and output constraints with promptfoo test cases before sharing the skill with your team.',
  },
]

const primitiveRows = [
  {
    primitive: 'Skill (`SKILL.md`)',
    mechanism: 'Markdown folder with YAML frontmatter; name + description preload for routing, body loads on trigger.',
    scope: 'Domain standards, repeatable checklists, brand voice, framework rules.',
    contextCost: 'Minimal idle cost (~40–80 tokens per skill description until triggered).',
  },
  {
    primitive: 'Plugin (`/plugin`)',
    mechanism: 'Installable bundle packaging skills, slash commands, subagents, hooks, and MCP configs from a marketplace repo.',
    scope: 'Versioned distribution across teams, IDEs (VS Code, JetBrains), and repositories.',
    contextCost: 'Depends on bundled components; skills inside plugins stay lazy-loaded.',
  },
  {
    primitive: 'Slash command (`.claude/commands/`)',
    mechanism: 'Explicit prompt template invoked directly via `/command-name` in the terminal or IDE.',
    scope: 'Deterministic operator workflows such as `/ship`, `/handover`, or `/review`.',
    contextCost: 'Zero tokens until the user invokes the command.',
  },
  {
    primitive: 'Subagent (`.claude/agents/`)',
    mechanism: 'Isolated context window with its own system prompt, tool allowlist, and model assignment.',
    scope: 'Parallel research, independent code review, and bounded multi-file tasks.',
    contextCost: 'Separate token budget; returns a compact summary to the parent session.',
  },
  {
    primitive: 'MCP server (`.mcp.json`)',
    mechanism: 'JSON-RPC process or HTTP endpoint exposing live tools, schemas, and external API actions.',
    scope: 'Database queries, browser inspection, issue trackers, design systems, and cloud APIs.',
    contextCost: 'Tool schemas load into context unless lazy-loaded by the harness.',
  },
]

const guideCards = [
  {
    title: 'Claude Code templates & starter kit',
    description: 'Copy-paste CLAUDE.md, .claude/settings.json, SKILL.md, and hook templates for new repositories.',
    href: '/guides/claude-code-templates-starter-kit',
  },
  {
    title: 'Claude Code plugins vs skills',
    description: 'When to author a standalone SKILL.md folder versus shipping a marketplace plugin across VS Code, JetBrains, and Codex.',
    href: '/guides/claude-code-plugins-vs-skills',
  },
  {
    title: 'Best MCP servers for Claude Code & business workflows',
    description: 'Production MCP stack for engineering, analytics, CRM, and publishing with authentication and token-budget checks.',
    href: '/guides/mcp-servers-claude-code-business',
  },
  {
    title: 'AI-agent-ready website checklist',
    description: 'Verify llms.txt, AI search crawlers, JSON-LD entity graphs, and WebMCP discovery on your own domain.',
    href: '/guides/ai-agent-ready-website-checklist',
  },
  {
    title: '10 Claude Code skills worth installing first',
    description: 'Field notes from six months of daily Next.js, TypeScript, SEO, and accessibility shipping.',
    href: '/blog/claude-code-skills-2026-the-10-you-need',
  },
  {
    title: 'LLM gateway architecture guide',
    description: 'Routing, fallback chains, spend caps, and OpenTelemetry traces across Claude, Gemini, and OpenAI.',
    href: '/blog/llm-gateway-architecture-guide',
  },
]

const skillsFaqs = [
  {
    question: 'What is a Claude Code skill (`SKILL.md`)?',
    answer:
      'A Claude Code skill is a directory containing a SKILL.md file with YAML frontmatter (`name` and `description`) plus optional scripts, templates, and reference files. Claude preloads the short frontmatter to match user intent and reads the full instructions when the task matches.',
  },
  {
    question: 'Where do Claude Code skills live on disk?',
    answer:
      'Project-scoped skills live in `.claude/skills/<skill-name>/SKILL.md` inside your repository so every contributor shares them through Git. Personal skills shared across repositories live in `~/.claude/skills/<skill-name>/SKILL.md`.',
  },
  {
    question: 'How do Claude Code skills differ from plugins and MCP servers?',
    answer:
      'A skill teaches the model how to perform a workflow using markdown instructions and local scripts. An MCP server connects the model to external tools or live data sources over JSON-RPC or HTTP. A plugin packages skills, commands, hooks, subagents, and MCP configurations into a single installable unit.',
  },
  {
    question: 'Do SKILL.md files work in Codex, Gemini CLI, and Cursor?',
    answer:
      'Yes. The open Agent Skills directory layout (`SKILL.md` with YAML frontmatter and optional `scripts/` and `references/` folders) works across Claude Code, OpenAI Codex CLI, Gemini CLI, OpenCode, Antigravity, and Cursor adapters.',
  },
]

const skillAnatomySnippet = `---
name: release-contract-check
description: Verify Next.js build, internal links, JSON-LD schema, and WCAG contrast before opening a pull request. Use when shipping routes or MDX guides.
---

# Release contract check

## Steps
1. Run \`pnpm run type-check\` and \`pnpm run content:check\`.
2. Inspect canonical URLs and JSON-LD blocks on every changed route.
3. Verify keyboard focus states and heading hierarchy (\`h1\` -> \`h2\` -> \`h3\`).
4. Summarize test output in the pull request body.`

export default function SkillsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <JsonLd
        type="CollectionPage"
        id="skills-collection-jsonld"
        data={{
          '@id': 'https://www.frankx.ai/skills#collection',
          name: 'Claude Code Skills & Agent Skill Library',
          description:
            'Open SKILL.md templates, interactive builder, architectural comparisons, and evaluation workflows for Claude Code, Codex, and Gemini CLI.',
          url: 'https://www.frankx.ai/skills',
          isPartOf: { '@id': 'https://www.frankx.ai/#website' },
          author: { '@id': 'https://www.frankx.ai/#frank-riemer' },
        }}
      />
      <JsonLd type="FAQPage" id="skills-faq-jsonld" data={buildFAQPageData(skillsFaqs)} />

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-violet-500/10" />
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs tracking-[0.2em] text-emerald-200/80">
            <Sparkles className="h-4 w-4" />
            <span>Agent skills hub</span>
          </div>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Claude Code skills and portable SKILL.md workflows for your agent stack.
              </h1>
              <p className="mt-4 text-lg text-white/70 leading-relaxed">
                For engineers and technical creators shipping with coding agents: package your domain rules, verification scripts, and architecture standards into modular <code className="text-emerald-200">SKILL.md</code> folders that load on demand across Claude Code, Codex, Gemini CLI, and Cursor.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/skills/builder"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white hover:opacity-95 transition-opacity"
                >
                  Open skill builder
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/resources/skills"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition-colors"
                >
                  Browse domain overview
                </Link>
                <a
                  href="https://github.com/frankxai/claude-skills-library"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-6 py-3 text-sm font-semibold text-emerald-200 hover:bg-emerald-500/15 transition-colors"
                >
                  GitHub library (MIT)
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-3">
                <Terminal className="h-5 w-5 text-emerald-300" />
                <div>
                  <p className="text-sm font-semibold">Quick install (Claude Code plugin)</p>
                  <p className="text-xs text-white/55">Install from the open-source MIT repository</p>
                </div>
              </div>
              <pre className="mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-[#050a12] p-4 text-xs leading-relaxed text-emerald-200">
                <code>{`/plugin marketplace add frankxai/claude-skills-library\n/plugin install claude-skills-library@claude-skills-library`}</code>
              </pre>
              <div className="mt-5 flex items-center gap-2 text-xs text-white/60">
                <ClipboardList className="h-4 w-4 text-emerald-300 shrink-0" />
                <span>Example trigger phrases inside a session:</span>
              </div>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {triggerPhrases.map((phrase) => (
                  <div
                    key={phrase}
                    className="rounded-xl border border-white/10 bg-[#050a12] px-3 py-2 text-xs text-white/75"
                  >
                    {phrase}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 border-b border-white/10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] items-start">
          <div>
            <div className="inline-flex items-center gap-2 text-xs tracking-[0.2em] text-emerald-200/70">
              <Code2 className="h-4 w-4" />
              <span>File contract</span>
            </div>
            <h2 className="mt-3 text-3xl font-semibold">What goes inside a SKILL.md folder?</h2>
            <p className="mt-4 text-sm text-white/70 leading-relaxed">
              Every skill uses progressive disclosure so your context window stays lean. At session start, the harness reads only the YAML <code className="text-white/90">name</code> and <code className="text-white/90">description</code>. When your prompt matches that description, the agent loads the markdown body and any referenced helper scripts.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-white/75">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-1 shrink-0" />
                <span><strong className="text-white">SKILL.md</strong> — YAML routing description plus step-by-step operational rules.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-1 shrink-0" />
                <span><strong className="text-white">scripts/</strong> — Deterministic Python, Bash, or Node validators that run without burning model tokens.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-1 shrink-0" />
                <span><strong className="text-white">references/</strong> — Deep schema tables or brand rules read on demand.</span>
              </li>
            </ul>
          </div>
          <div className="rounded-3xl border border-white/10 bg-[#050a12] p-6">
            <div className="flex items-center justify-between text-xs text-white/50 pb-3 border-b border-white/10">
              <span>.claude/skills/release-contract-check/SKILL.md</span>
              <span>Agent Skills format</span>
            </div>
            <pre className="mt-4 overflow-x-auto text-xs leading-relaxed text-white/85">
              <code>{skillAnatomySnippet}</code>
            </pre>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 border-b border-white/10">
        <div className="inline-flex items-center gap-2 text-xs tracking-[0.2em] text-emerald-200/70">
          <Layers className="h-4 w-4" />
          <span>Architecture comparison</span>
        </div>
        <h2 className="mt-3 text-3xl font-semibold">
          Skills vs plugins vs slash commands vs subagents vs MCP servers
        </h2>
        <p className="mt-3 max-w-3xl text-sm text-white/70 leading-relaxed">
          Choose the lightest primitive that solves the failure mode. Keep static standards in skills, external API connections in MCP servers, and isolated parallel execution in subagents.
        </p>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.04] text-white/90">
                <th className="py-3.5 px-4 font-semibold">Primitive</th>
                <th className="py-3.5 px-4 font-semibold">How it works</th>
                <th className="py-3.5 px-4 font-semibold">Best job</th>
                <th className="py-3.5 px-4 font-semibold">Context window impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-white/75">
              {primitiveRows.map((row) => (
                <tr key={row.primitive} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-medium text-white whitespace-nowrap">{row.primitive}</td>
                  <td className="py-3.5 px-4">{row.mechanism}</td>
                  <td className="py-3.5 px-4">{row.scope}</td>
                  <td className="py-3.5 px-4">{row.contextCost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-5 flex flex-wrap gap-4 text-sm">
          <Link href="/ask/claude-skills-vs-agents" className="text-emerald-300 hover:text-emerald-200 transition-colors">
            Read Q&amp;A: Claude skills vs subagents →
          </Link>
          <Link href="/ask/claude-code-plugins-vs-skills" className="text-emerald-300 hover:text-emerald-200 transition-colors">
            Read Q&amp;A: Claude Code plugins vs skills →
          </Link>
          <Link href="/ai-architecture" className="text-emerald-300 hover:text-emerald-200 transition-colors">
            Explore AI architecture blueprints →
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 border-b border-white/10">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <p className="text-xs tracking-[0.2em] text-emerald-200/70">Skill workflow</p>
            <h2 className="mt-3 text-3xl font-semibold">How to author and verify a skill</h2>
          </div>
          <Link
            href="/vault"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-200 hover:text-emerald-100 transition-colors"
          >
            Go to vault
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {workflowSteps.map((step) => (
            <div key={step.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <Wand2 className="h-6 w-6 text-emerald-300" />
              <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm text-white/65 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 border-b border-white/10">
        <p className="text-xs tracking-[0.2em] text-emerald-200/70">Implementation guides</p>
        <h2 className="mt-3 text-3xl font-semibold">Deep-dive playbooks and starter kits</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {guideCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-emerald-400/40 hover:bg-white/[0.05] transition-colors flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-emerald-200 transition-colors">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-white/65 leading-relaxed">{card.description}</p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300">
                Read guide
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold">Frequently asked questions</h2>
        <div className="mt-8 space-y-4">
          {skillsFaqs.map((faq) => (
            <div key={faq.question} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#05060c]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/10 via-transparent to-violet-500/10 p-10 text-center">
            <h2 className="text-3xl font-semibold">Generate a ready-to-install SKILL.md</h2>
            <p className="mt-4 max-w-2xl mx-auto text-white/65">
              Use the interactive Skill Builder to draft frontmatter, trigger phrases, and verification steps for your repository.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/skills/builder"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white hover:opacity-95 transition-opacity"
              >
                Build a skill
              </Link>
              <Link
                href="/inner-circle"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition-colors"
              >
                Join Inner Circle
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
