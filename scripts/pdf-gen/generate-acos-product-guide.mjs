#!/usr/bin/env node
/**
 * ACOS Product Guide — Premium Edition
 * GitHub Brand Guidelines-inspired design with real infographic imagery
 * 22 pages: Cover → Architecture → Deep Dives → Use Cases → Getting Started
 *
 * Usage: node scripts/pdf-gen/generate-acos-product-guide.mjs
 */

import { chromium } from 'playwright'
import { writeFileSync, copyFileSync, mkdirSync, readFileSync } from 'fs'
import { join } from 'path'

const ROOT = '/mnt/c/Users/Frank/FrankX'
const OUTPUT_DIR = join(ROOT, 'public/products')
const TMP_DIR = '/tmp'
mkdirSync(OUTPUT_DIR, { recursive: true })

// ─── Image Paths (absolute file:// for local Chromium rendering) ───
const IMG = {
  hero:       `file://${ROOT}/public/images/acos-hero.png`,
  pillars:    `file://${ROOT}/agentic-creator-os/docs/infographics/v7-01-seven-pillars-architecture.png`,
  disclosure: `file://${ROOT}/agentic-creator-os/docs/infographics/02-progressive-disclosure.png`,
  swarm:      `file://${ROOT}/agentic-creator-os/docs/infographics/03-swarm-topologies.png`,
  agents:     `file://${ROOT}/agentic-creator-os/docs/infographics/v7-04-agent-library.png`,
  workflows:  `file://${ROOT}/agentic-creator-os/docs/infographics/05-workflow-patterns.png`,
  routing:    `file://${ROOT}/agentic-creator-os/docs/infographics/06-model-routing.png`,
  creatorHub: `file://${ROOT}/agentic-creator-os/docs/infographics/07-creator-hub-generator.png`,
  antiDrift:  `file://${ROOT}/agentic-creator-os/docs/infographics/08-anti-drift-context.png`,
  fullSystem: `file://${ROOT}/agentic-creator-os/docs/infographics/v7-09-full-system-architecture.png`,
  comparison: `file://${ROOT}/agentic-creator-os/docs/infographics/10-acos-vs-traditional.png`,
  cmdRouting: `file://${ROOT}/agentic-creator-os/docs/infographics/v7-05-command-routing.png`,
  ecosystem:  `file://${ROOT}/public/images/ecosystem/01-frankx-ecosystem-overview.png`,
  acosArch:   `file://${ROOT}/public/images/ecosystem/02-acos-6-layer-architecture.png`,
  valueLadder:`file://${ROOT}/public/images/ecosystem/05-value-ladder-progression.png`,
  agentGrid:  `file://${ROOT}/public/images/ecosystem/09-agent-specialist-grid.png`,
  acosDetail: `file://${ROOT}/public/images/ecosystem/15-acos-claude-code.png`,
}

// ─── Brand Design Tokens ───
const C = {
  oled: '#030712', navy: '#0F172A', navyMid: '#0C1525',
  card: '#1E293B', elevated: '#334155',
  border: 'rgba(255,255,255,0.06)', borderHover: 'rgba(255,255,255,0.12)',
  glass: 'rgba(255,255,255,0.03)',
  white: '#FFFFFF', offWhite: '#F8FAFC', warmGray: '#F1F5F9',
  textPrimary: '#E2E8F0', textSecondary: '#94A3B8',
  textMuted: '#64748B', textDark: '#1E293B', textDarkSub: '#475569',
  purple: '#AB47C7', purpleLight: '#C084FC',
  blue: '#43BFE3', blueLight: '#67E8F9',
  gold: '#F59E0B', goldLight: '#FCD34D',
  emerald: '#10B981', emeraldLight: '#34D399',
  rose: '#F43F5E',
}

const ACCENT = C.blue
const ACCENT_LIGHT = C.blueLight
const TOTAL_PAGES = 23

function footer(page) {
  return `<div class="page-footer">
    <span class="page-footer-brand">FRANKX — AGENTIC CREATOR OS</span>
    <span class="page-footer-num">${page} / ${TOTAL_PAGES}</span>
  </div>`
}

// ─── Full-bleed image page helper ───
function imagePage(tag, title, imageSrc, caption, pageNum, theme = 'dark') {
  const bg = theme === 'dark' ? `background:linear-gradient(180deg,${C.navy} 0%,${C.oled} 100%);color:${C.textPrimary};`
    : `background:${C.offWhite};color:${C.textDark};`
  const h2Color = theme === 'dark' ? C.white : C.textDark
  const captionColor = theme === 'dark' ? C.textMuted : C.textDarkSub
  return `<div class="page" style="${bg}display:flex;flex-direction:column;align-items:center;justify-content:center;padding:48px 56px;">
    <div style="text-align:center;width:100%;position:relative;z-index:1;">
      <div class="section-tag" style="margin-bottom:10px;">${tag}</div>
      <h2 style="margin-bottom:20px;color:${h2Color};font-size:24px;">${title}</h2>
      <img src="${imageSrc}" style="max-width:100%;max-height:64vh;border-radius:12px;box-shadow:0 8px 40px rgba(0,0,0,${theme === 'dark' ? '0.5' : '0.15'});" loading="eager"/>
      <p style="margin-top:14px;font-size:12px;color:${captionColor};font-style:italic;">${caption}</p>
    </div>
    ${footer(pageNum)}
  </div>`
}

function buildHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --accent: ${ACCENT};
  --accent-light: ${ACCENT_LIGHT};
  --accent-glow: ${ACCENT}22;
  --accent-border: ${ACCENT}4D;
  --accent-bg: ${ACCENT}0D;
}

* { margin:0; padding:0; box-sizing:border-box; }

body {
  font-family: 'Inter', -apple-system, sans-serif;
  background: ${C.navy};
  color: ${C.textPrimary};
  -webkit-font-smoothing: antialiased;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

/* ── Page System ── */
.page {
  width: 100%;
  min-height: 100vh;
  page-break-after: always;
  position: relative;
  overflow: hidden;
}
.page:last-child { page-break-after: auto; }

.page-dark {
  background: linear-gradient(180deg, ${C.navy} 0%, ${C.oled} 100%);
  color: ${C.textPrimary};
  padding: 64px 72px 56px;
}
.page-light {
  background: ${C.offWhite};
  color: ${C.textDark};
  padding: 64px 72px 56px;
}
.page-accent {
  background: linear-gradient(135deg, ${ACCENT}0F 0%, ${C.navy} 40%, ${C.oled} 100%);
  color: ${C.textPrimary};
  padding: 64px 72px 56px;
}

/* ── Cover ── */
.page-cover {
  background: ${C.oled};
  display: flex; flex-direction: column; justify-content: center; align-items: center;
  text-align: center; padding: 80px; position: relative;
}
.cover-glow {
  position: absolute; width: 700px; height: 700px; border-radius: 50%;
  background: radial-gradient(circle, ${ACCENT}18 0%, ${C.purple}0A 40%, transparent 70%);
  top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 0;
}
.cover-content { position: relative; z-index: 1; }
.cover-badge {
  display: inline-block; font-family: 'JetBrains Mono', monospace;
  font-size: 10px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase;
  color: ${ACCENT}; border: 1px solid ${ACCENT}4D; padding: 6px 18px; border-radius: 100px;
  margin-bottom: 28px;
}
.cover-title {
  font-family: 'Poppins', sans-serif; font-size: 62px; font-weight: 900;
  line-height: 1.02; letter-spacing: -0.04em; color: ${C.white}; margin-bottom: 12px;
}
.cover-subtitle {
  font-size: 17px; font-weight: 300; color: ${C.textSecondary};
  line-height: 1.7; max-width: 480px; margin: 0 auto;
}
.cover-divider {
  width: 56px; height: 3px; border-radius: 2px; margin: 24px auto;
  background: linear-gradient(90deg, ${ACCENT}, ${C.purple});
}
.cover-meta {
  font-family: 'JetBrains Mono', monospace; font-size: 10px;
  color: ${C.textMuted}; letter-spacing: 0.08em;
}
.cover-image {
  margin: 32px 0 24px; max-width: 560px; width: 100%;
}
.cover-image img {
  width: 100%; border-radius: 12px;
  box-shadow: 0 12px 48px rgba(0,0,0,0.5);
}

/* ── Typography ── */
h1 {
  font-family: 'Poppins', sans-serif; font-size: 44px; font-weight: 800;
  line-height: 1.08; letter-spacing: -0.03em; color: ${C.white};
}
.page-light h1 { color: ${C.textDark}; }
h2 {
  font-family: 'Poppins', sans-serif; font-size: 28px; font-weight: 700;
  line-height: 1.2; letter-spacing: -0.02em; color: ${C.white}; margin-bottom: 12px;
}
.page-light h2 { color: ${C.textDark}; }
h3 {
  font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 600;
  color: ${C.white}; margin-bottom: 6px;
}
.page-light h3 { color: ${C.textDark}; }
p { font-size: 14.5px; line-height: 1.75; color: ${C.textSecondary}; margin-bottom: 12px; }
.page-light p { color: ${C.textDarkSub}; }
strong { color: ${C.white}; font-weight: 600; }
.page-light strong { color: ${C.textDark}; }
code {
  font-family: 'JetBrains Mono', monospace; font-size: 0.88em;
  background: rgba(255,255,255,0.06); padding: 2px 6px; border-radius: 4px;
  color: var(--accent-light);
}
.page-light code { background: ${C.navy}0D; color: ${ACCENT}; }

/* ── Section Header ── */
.section-head { display: flex; align-items: flex-start; gap: 20px; margin-bottom: 36px; }
.section-num {
  font-family: 'Poppins', sans-serif; font-size: 72px; font-weight: 900;
  line-height: 1; color: ${ACCENT}; opacity: 0.12; flex-shrink: 0; letter-spacing: -0.04em;
}
.section-head-text { padding-top: 14px; }
.section-tag {
  font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 500;
  letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent); margin-bottom: 8px;
}

/* ── Stats ── */
.stats-row { display: flex; gap: 20px; margin: 28px 0; }
.stat-card {
  flex: 1; text-align: center; padding: 24px 14px;
  background: ${C.glass}; border: 1px solid ${C.border}; border-radius: 12px;
}
.page-light .stat-card { background: ${C.white}; border-color: #E2E8F0; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
.stat-value {
  font-family: 'Poppins', sans-serif; font-size: 40px; font-weight: 800;
  color: var(--accent); line-height: 1; margin-bottom: 6px; letter-spacing: -0.03em;
}
.stat-label {
  font-size: 11px; font-weight: 500; color: ${C.textMuted};
  text-transform: uppercase; letter-spacing: 0.1em;
}

/* ── Feature Grid ── */
.feature-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin: 20px 0; }
.feature-card {
  padding: 22px; background: ${C.glass}; border: 1px solid ${C.border}; border-radius: 12px;
}
.page-light .feature-card { background: ${C.white}; border-color: #E2E8F0; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
.feature-card h3 { font-size: 14px; margin-bottom: 4px; }
.feature-card p { font-size: 12.5px; margin: 0; line-height: 1.55; }
.feature-icon {
  width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center;
  justify-content: center; margin-bottom: 10px; font-size: 18px;
  background: ${ACCENT}15; border: 1px solid ${ACCENT}33;
}

/* ── Terminal ── */
.terminal {
  background: ${C.oled}; border: 1px solid ${C.border}; border-radius: 10px;
  margin: 18px 0; overflow: hidden;
}
.terminal-bar {
  display: flex; align-items: center; gap: 6px; padding: 10px 16px;
  background: rgba(255,255,255,0.03); border-bottom: 1px solid ${C.border};
}
.terminal-dot { width: 10px; height: 10px; border-radius: 50%; }
.dot-red { background: #EF4444; } .dot-yellow { background: #F59E0B; } .dot-green { background: #10B981; }
.terminal-title { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: ${C.textMuted}; margin-left: 8px; }
.terminal-body {
  padding: 18px 22px; font-family: 'JetBrains Mono', monospace; font-size: 12.5px; line-height: 1.9;
}
.t-prompt { color: ${C.emerald}; } .t-cmd { color: ${C.textSecondary}; }
.t-out { color: var(--accent-light); } .t-dim { color: ${C.textMuted}; } .t-accent { color: var(--accent); }

/* ── Pull Quote ── */
.pull-quote {
  border-left: 3px solid var(--accent); padding: 18px 24px; margin: 24px 0;
  background: var(--accent-bg); border-radius: 0 8px 8px 0;
}
.pull-quote p { font-size: 16px; font-weight: 400; line-height: 1.7; font-style: italic; color: ${C.textPrimary}; margin: 0; }
.page-light .pull-quote p { color: ${C.textDark}; }

/* ── Cards ── */
.card {
  background: ${C.glass}; border: 1px solid ${C.border}; border-radius: 12px;
  padding: 22px 24px; margin-bottom: 14px;
}
.page-light .card { background: ${C.white}; border-color: #E2E8F0; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }

/* ── Command Grid ── */
.cmd-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 14px 0; }
.cmd-item {
  display: flex; align-items: center; gap: 10px; padding: 10px 14px;
  background: ${C.glass}; border: 1px solid ${C.border}; border-radius: 8px;
}
.page-light .cmd-item { background: ${C.white}; border-color: #E2E8F0; }
.cmd-name { font-family: 'JetBrains Mono', monospace; font-size: 11.5px; font-weight: 500; color: var(--accent); white-space: nowrap; }
.cmd-desc { font-size: 11.5px; color: ${C.textMuted}; }

/* ── Tables ── */
table { width: 100%; border-collapse: collapse; margin: 14px 0; }
th {
  text-align: left; padding: 9px 14px; font-size: 10px; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.1em; color: var(--accent);
  border-bottom: 2px solid var(--accent-border);
}
td { padding: 9px 14px; font-size: 12.5px; color: ${C.textSecondary}; border-bottom: 1px solid ${C.border}; }
.page-light td { color: ${C.textDarkSub}; border-bottom-color: #E2E8F0; }
td:first-child { color: ${C.white}; font-weight: 500; }
.page-light td:first-child { color: ${C.textDark}; }

/* ── Flow Steps ── */
.flow-steps { display: flex; gap: 10px; margin: 20px 0; }
.flow-step {
  flex: 1; text-align: center; padding: 18px 10px;
  background: ${C.glass}; border: 1px solid ${C.border}; border-radius: 10px;
}
.flow-step-num { font-family: 'Poppins', sans-serif; font-size: 22px; font-weight: 800; color: var(--accent); opacity: 0.5; margin-bottom: 6px; }
.flow-step h3 { font-size: 13px; text-align: center; margin-bottom: 3px; }
.flow-step p { font-size: 10.5px; text-align: center; margin: 0; }

/* ── Footer ── */
.page-footer {
  position: absolute; bottom: 28px; left: 72px; right: 72px;
  display: flex; justify-content: space-between; align-items: center;
}
.page-footer-brand { font-family: 'JetBrains Mono', monospace; font-size: 8px; letter-spacing: 0.22em; text-transform: uppercase; color: ${C.textMuted}; }
.page-footer-num { font-family: 'JetBrains Mono', monospace; font-size: 8px; color: ${C.textMuted}; }

/* ── Utility ── */
.mt-sm { margin-top: 10px; } .mt-md { margin-top: 20px; } .mt-lg { margin-top: 36px; }
.mb-sm { margin-bottom: 10px; } .mb-md { margin-bottom: 20px; }
.accent { color: var(--accent); }
.muted { color: ${C.textMuted}; font-size: 11px; }
.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.three-col { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }

/* ── Image Display ── */
.img-showcase {
  width: 100%; border-radius: 12px; box-shadow: 0 8px 40px rgba(0,0,0,0.4);
}
.img-showcase-light {
  width: 100%; border-radius: 12px; box-shadow: 0 4px 24px rgba(0,0,0,0.12);
}

/* ── Big Number ── */
.big-num {
  font-family: 'Poppins', sans-serif; font-size: 96px; font-weight: 900;
  letter-spacing: -0.05em; line-height: 1;
  background: linear-gradient(135deg, ${ACCENT}, ${C.purple});
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── Accent Line Divider ── */
.accent-line {
  width: 100%; height: 2px; margin: 32px 0;
  background: linear-gradient(90deg, ${ACCENT}00, ${ACCENT}60, ${ACCENT}00);
}

/* ── Creator Type Card ── */
.creator-card {
  padding: 18px 20px; background: ${C.glass}; border: 1px solid ${C.border};
  border-radius: 12px; margin-bottom: 10px;
}
.creator-card h3 { font-size: 14px; margin-bottom: 3px; }
.creator-card p { font-size: 11.5px; margin: 0; line-height: 1.5; }
.creator-card .label { font-family: 'JetBrains Mono', monospace; font-size: 9px; color: var(--accent); text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 4px; }

</style>
</head>
<body>

<!-- ═══ PAGE 1: COVER ═══ -->
<div class="page page-cover">
  <div class="cover-glow"></div>
  <div class="cover-content">
    <div class="cover-badge">Product Guide &mdash; v7.0</div>
    <div class="cover-image">
      <img src="${IMG.hero}" alt="ACOS Hero"/>
    </div>
    <h1 class="cover-title">Agentic<br/>Creator OS</h1>
    <div class="cover-divider"></div>
    <p class="cover-subtitle">The production-grade AI operating system for creators who ship. 630+ skills. 40+ agents. One command.</p>
    <p class="cover-meta" style="margin-top:32px;">FRANKX &nbsp;&bull;&nbsp; February 2026 &nbsp;&bull;&nbsp; frankx.ai</p>
    <p class="cover-meta" style="margin-top:8px; color:${C.textSecondary};">Build what matters.</p>
  </div>
</div>

<!-- ═══ PAGE 2: THE PROBLEM ═══ -->
<div class="page page-dark">
  <div class="content" style="position:relative;z-index:1;">
    <div class="section-head">
      <div class="section-num">01</div>
      <div class="section-head-text">
        <div class="section-tag">The Problem</div>
        <h2>Every Creator Hits the Same Ceiling</h2>
      </div>
    </div>

    <p style="font-size:16px;line-height:1.8;max-width:560px;">You have the ideas. You have access to the most powerful AI models ever built. But translating creative vision into production output still feels like managing a factory floor by hand.</p>

    <div class="accent-line"></div>

    <div class="three-col mt-md">
      <div class="card" style="text-align:center;">
        <div class="big-num" style="font-size:48px;margin-bottom:8px;">87%</div>
        <p style="margin:0;font-size:12px;">of creators use 3+ AI tools daily but struggle with context fragmentation</p>
      </div>
      <div class="card" style="text-align:center;">
        <div class="big-num" style="font-size:48px;margin-bottom:8px;">4.2h</div>
        <p style="margin:0;font-size:12px;">average daily time lost to prompt re-engineering and tool switching</p>
      </div>
      <div class="card" style="text-align:center;">
        <div class="big-num" style="font-size:48px;margin-bottom:8px;">12%</div>
        <p style="margin:0;font-size:12px;">of AI-generated content reaches production quality without manual rework</p>
      </div>
    </div>

    <div class="pull-quote mt-md">
      <p>"The gap isn't access to AI. It's the orchestration layer between your intent and production-ready output."</p>
    </div>

    <div class="feature-grid mt-md">
      <div class="feature-card">
        <div class="feature-icon">&#9888;</div>
        <h3>Context Fragmentation</h3>
        <p>Each new prompt starts from zero. Your brand voice, project context, and quality standards vanish between sessions.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">&#8634;</div>
        <h3>Manual Orchestration</h3>
        <p>You become the router, deciding which tool, which prompt, which approach. That's overhead, not creation.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">&#9881;</div>
        <h3>Quality Inconsistency</h3>
        <p>Output quality varies wildly. What works at 2pm breaks at 10pm. No systematic quality gates.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">&#128736;</div>
        <h3>Tool Sprawl</h3>
        <p>ChatGPT for text, Midjourney for images, Suno for music, Claude for code. No unified workflow.</p>
      </div>
    </div>
  </div>
  ${footer(2)}
</div>

<!-- ═══ PAGE 3: THE VISION (Full System Architecture Image) ═══ -->
${imagePage('The Vision', 'One System. Every Creative Task. Production Output.', IMG.fullSystem, 'ACOS v7.0 — Complete system architecture: from user intent to production-ready output across all creative domains', 3)}

<!-- ═══ PAGE 4: WHAT IS ACOS ═══ -->
<div class="page page-light">
  <div class="content">
    <div class="section-head">
      <div class="section-num">02</div>
      <div class="section-head-text">
        <div class="section-tag">The Solution</div>
        <h2>What is Agentic Creator OS?</h2>
      </div>
    </div>

    <p style="font-size:15px;line-height:1.8;max-width:560px;">ACOS is a <strong>production-grade AI operating system</strong> built on Claude Code. It combines specialized agents, a massive skill library, intelligent routing, and lifecycle automation to turn any creative or technical task into a streamlined workflow.</p>

    <p>Instead of managing prompts manually, you issue one command &mdash; <code>/acos</code> &mdash; and the system analyzes your intent, selects the right agent, activates relevant skills, and delivers production-ready output.</p>

    <div class="stats-row mt-md">
      <div class="stat-card"><div class="stat-value">630+</div><div class="stat-label">Skills</div></div>
      <div class="stat-card"><div class="stat-value">40+</div><div class="stat-label">Agents</div></div>
      <div class="stat-card"><div class="stat-value">130+</div><div class="stat-label">Commands</div></div>
      <div class="stat-card"><div class="stat-value">8+</div><div class="stat-label">MCP Servers</div></div>
    </div>

    <div class="accent-line" style="background:linear-gradient(90deg,${ACCENT}00,${ACCENT}30,${ACCENT}00);"></div>

    <div class="two-col">
      <div>
        <h3 style="color:${C.textDark};">How It Works</h3>
        <p>ACOS sits on top of Claude Code CLI. Every interaction flows through a four-stage pipeline: <strong>intent classification</strong>, <strong>agent routing</strong>, <strong>skill activation</strong>, and <strong>quality-gated execution</strong>.</p>
        <p>The system learns from every interaction through <strong>Agentic Jujutsu</strong> &mdash; a trajectory-based learning engine that extracts patterns from successful operations and improves over time.</p>
      </div>
      <div>
        <h3 style="color:${C.textDark};">Who It's For</h3>
        <p><strong>Writers</strong> who want automated publishing pipelines. <strong>Developers</strong> who want spec-driven development. <strong>Musicians</strong> who want AI-powered production. <strong>Entrepreneurs</strong> who want strategic AI counsel.</p>
        <p>Anyone who wants to stop being the router between AI tools and start being the creator.</p>
      </div>
    </div>
  </div>
  ${footer(4)}
</div>

<!-- ═══ PAGE 5: THE 7 PILLARS (Image) ═══ -->
${imagePage('Architecture', 'The Seven Pillars of ACOS', IMG.pillars, 'Every capability in ACOS is organized around seven foundational pillars that work in concert', 5)}

<!-- ═══ PAGE 6: SKILLS SYSTEM ═══ -->
<div class="page page-dark">
  <div class="content">
    <div class="section-head">
      <div class="section-num">03</div>
      <div class="section-head-text">
        <div class="section-tag">Pillar 1</div>
        <h2>Skills &mdash; 630+ Domain Modules</h2>
      </div>
    </div>

    <p>Skills are the knowledge layer. Each skill is a focused domain module &mdash; from <code>vercel-react-best-practices</code> to <code>suno-ai-mastery</code> &mdash; that loads into the agent context only when needed.</p>

    <div class="two-col mt-md">
      <div>
        <img src="${IMG.disclosure}" class="img-showcase" alt="Progressive Disclosure"/>
      </div>
      <div>
        <h3 class="mt-sm">Progressive Disclosure</h3>
        <p>Skills use a token-efficient loading strategy. Only ~100 tokens of metadata load initially. Full skill content (~5k tokens) activates only when the task requires it.</p>
        <p>This means ACOS can maintain awareness of 630+ capabilities without drowning the context window.</p>

        <h3 class="mt-md">Auto-Activation</h3>
        <p><strong>22 trigger rules</strong> in <code>skill-rules.json</code> detect intent and activate the right skills automatically. Say "write a blog post" and SEO, content writing, and schema markup skills activate without manual intervention.</p>

        <div class="card mt-sm" style="padding:14px 18px;">
          <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:${C.textMuted};">Activation rate</div>
          <div style="font-family:'Poppins',sans-serif;font-size:28px;font-weight:800;color:${ACCENT};">70%</div>
          <div style="font-size:11px;color:${C.textMuted};">of tasks auto-activate the right skill profile</div>
        </div>
      </div>
    </div>
  </div>
  ${footer(6)}
</div>

<!-- ═══ PAGE 7: AGENT LIBRARY (Image) ═══ -->
${imagePage('Pillar 2', 'Agent Library &mdash; 40+ Specialized AI Personas', IMG.agents, '40+ agents organized across 7 departments: Content, Music, Products, Brand, Growth, Research, and Orchestration', 7)}

<!-- ═══ PAGE 8: AGENTS DEEP DIVE ═══ -->
<div class="page page-light">
  <div class="content">
    <div class="section-head">
      <div class="section-num">04</div>
      <div class="section-head-text">
        <div class="section-tag">Agent Architecture</div>
        <h2>Specialist Agents, Not Generic AI</h2>
      </div>
    </div>

    <p>Each ACOS agent has a defined role, skill set, and behavioral profile. The system doesn't just pick a random agent &mdash; it matches your task to the specialist with the deepest relevant expertise.</p>

    <table>
      <tr><th>Agent</th><th>Role</th><th>Key Skills</th></tr>
      <tr><td>Starlight Orchestrator</td><td>Meta-intelligence coordination</td><td>Multi-agent routing, quality gates</td></tr>
      <tr><td>Visionary</td><td>Strategic intelligence</td><td>Business analysis, future visioning</td></tr>
      <tr><td>Creation Engine</td><td>Content &amp; products</td><td>SEO writing, product launches</td></tr>
      <tr><td>Code Architect</td><td>Technical systems</td><td>Full-stack dev, architecture</td></tr>
      <tr><td>Sonic Engineer</td><td>Music production</td><td>Suno mastery, audio engineering</td></tr>
      <tr><td>Frontend Designer</td><td>UI/UX development</td><td>React, Tailwind, accessibility</td></tr>
      <tr><td>SEO Intelligence</td><td>Search optimization</td><td>Keywords, schema, citations</td></tr>
      <tr><td>Research Librarian</td><td>Deep research</td><td>Source verification, analysis</td></tr>
    </table>

    <div class="pull-quote mt-md">
      <p>"The best agent is the one you never had to choose. ACOS selects automatically based on what you're actually trying to accomplish."</p>
    </div>

    <div class="two-col mt-sm">
      <div class="card" style="border-color:${ACCENT}33;">
        <h3 style="color:${ACCENT};">Department Structure</h3>
        <p style="font-size:12px;">Agents are organized into departments: Content, Development, Music, Strategy, Growth, Research, and Orchestration. Each department has a lead agent that coordinates specialist work.</p>
      </div>
      <div class="card" style="border-color:${C.purple}33;">
        <h3 style="color:${C.purple};">Swarm Coordination</h3>
        <p style="font-size:12px;">Complex tasks trigger multi-agent swarms. The Starlight Orchestrator coordinates parallel execution, context sharing, and output synthesis across agent teams.</p>
      </div>
    </div>
  </div>
  ${footer(8)}
</div>

<!-- ═══ PAGE 9: COMMAND ROUTING (Image) ═══ -->
${imagePage('Pillar 3', 'Intelligent Command Routing', IMG.cmdRouting, 'The /acos smart router classifies intent, selects agents, and activates skills — all from a single command', 9)}

<!-- ═══ PAGE 10: COMMANDS DETAIL ═══ -->
<div class="page page-accent">
  <div class="content">
    <div class="section-head">
      <div class="section-num">05</div>
      <div class="section-head-text">
        <div class="section-tag">Command Surface</div>
        <h2>130+ Commands, One Entry Point</h2>
      </div>
    </div>

    <p>The <code>/acos</code> command is the universal entry point. It analyzes your natural language intent and routes to the optimal specialized command. You never need to remember which of the 130+ commands handles your specific task.</p>

    <h3 class="mt-md mb-sm" style="color:var(--accent);">Creation Commands</h3>
    <div class="cmd-grid">
      <div class="cmd-item"><span class="cmd-name">/article-creator</span><span class="cmd-desc">Blog &amp; content pipeline</span></div>
      <div class="cmd-item"><span class="cmd-name">/create-music</span><span class="cmd-desc">AI music production</span></div>
      <div class="cmd-item"><span class="cmd-name">/infogenius</span><span class="cmd-desc">Infographic generation</span></div>
      <div class="cmd-item"><span class="cmd-name">/factory</span><span class="cmd-desc">Multi-modal content factory</span></div>
      <div class="cmd-item"><span class="cmd-name">/generate-social</span><span class="cmd-desc">Social media content</span></div>
      <div class="cmd-item"><span class="cmd-name">/products-creation</span><span class="cmd-desc">Digital product builder</span></div>
    </div>

    <h3 class="mt-md mb-sm" style="color:var(--accent);">Strategy &amp; Intelligence</h3>
    <div class="cmd-grid">
      <div class="cmd-item"><span class="cmd-name">/starlight-architect</span><span class="cmd-desc">System design &amp; strategy</span></div>
      <div class="cmd-item"><span class="cmd-name">/council</span><span class="cmd-desc">Multi-agent strategic council</span></div>
      <div class="cmd-item"><span class="cmd-name">/research</span><span class="cmd-desc">Deep research pipeline</span></div>
      <div class="cmd-item"><span class="cmd-name">/plan-week</span><span class="cmd-desc">Weekly planning &amp; ops</span></div>
    </div>

    <h3 class="mt-md mb-sm" style="color:var(--accent);">Development &amp; Deployment</h3>
    <div class="cmd-grid">
      <div class="cmd-item"><span class="cmd-name">/frankx-ai-build</span><span class="cmd-desc">Full build session</span></div>
      <div class="cmd-item"><span class="cmd-name">/frankx-ai-deploy</span><span class="cmd-desc">Production deployment</span></div>
      <div class="cmd-item"><span class="cmd-name">/spec</span><span class="cmd-desc">Spec-driven development</span></div>
      <div class="cmd-item"><span class="cmd-name">/ux-design</span><span class="cmd-desc">UI/UX design system</span></div>
    </div>

    <h3 class="mt-md mb-sm" style="color:var(--accent);">Agentic Systems</h3>
    <div class="cmd-grid">
      <div class="cmd-item"><span class="cmd-name">/ultraworld</span><span class="cmd-desc">Creative swarm world-building</span></div>
      <div class="cmd-item"><span class="cmd-name">/acos-swarm</span><span class="cmd-desc">Multi-agent swarm operations</span></div>
      <div class="cmd-item"><span class="cmd-name">/agentic-jujutsu</span><span class="cmd-desc">Trajectory-based learning</span></div>
      <div class="cmd-item"><span class="cmd-name">/acos-memory</span><span class="cmd-desc">Persistent memory system</span></div>
    </div>
  </div>
  ${footer(10)}
</div>

<!-- ═══ PAGE 11: WORKFLOWS (Image) ═══ -->
${imagePage('Pillar 4', 'Workflow Orchestration Patterns', IMG.workflows, 'Eight production workflows: Pipeline, Parallel, and Weighted Synthesis patterns for every creative domain', 11)}

<!-- ═══ PAGE 12: MODEL ROUTING (Image) ═══ -->
${imagePage('Intelligence Layer', 'Intelligent Model Routing', IMG.routing, 'Automatic tier selection: Haiku for speed, Sonnet for balance, Opus for maximum capability — optimized per task', 12, 'light')}

<!-- ═══ PAGE 13: SWARM + ANTI-DRIFT ═══ -->
<div class="page page-dark">
  <div class="content">
    <div class="section-head">
      <div class="section-num">06</div>
      <div class="section-head-text">
        <div class="section-tag">Advanced Patterns</div>
        <h2>Swarm Coordination &amp; Context Engineering</h2>
      </div>
    </div>

    <div class="two-col">
      <div>
        <img src="${IMG.swarm}" class="img-showcase" alt="Swarm Topologies" style="margin-bottom:14px;"/>
        <h3>Multi-Agent Swarms</h3>
        <p>Complex tasks trigger coordinated agent teams. Three topology patterns: <strong>Hierarchical</strong> (lead agent delegates), <strong>Mesh</strong> (peer collaboration), and <strong>Specialized</strong> (domain expert routing).</p>
        <p>The <code>/ultraworld</code> command demonstrates swarm power: 7 creative agents collaborate to build entire fictional universes in a single session.</p>
      </div>
      <div>
        <img src="${IMG.antiDrift}" class="img-showcase" alt="Anti-Drift Context" style="margin-bottom:14px;"/>
        <h3>Anti-Drift Context Engineering</h3>
        <p>Long sessions degrade context quality. ACOS fights this with <strong>automatic context compression</strong>, <strong>memory persistence</strong> via MCP, and <strong>checkpoint systems</strong> that preserve critical state.</p>
        <p>The result: session #50 is as coherent as session #1. Your brand voice, project context, and quality standards persist indefinitely.</p>
      </div>
    </div>
  </div>
  ${footer(13)}
</div>

<!-- ═══ PAGE 14: TERMINAL EXPERIENCE ═══ -->
<div class="page page-light">
  <div class="content">
    <div class="section-head">
      <div class="section-num">07</div>
      <div class="section-head-text">
        <div class="section-tag">In Action</div>
        <h2>The ACOS Experience</h2>
      </div>
    </div>

    <p>Here's what it looks like to use ACOS. One command. The system handles everything else.</p>

    <div class="terminal mt-md">
      <div class="terminal-bar">
        <div class="terminal-dot dot-red"></div>
        <div class="terminal-dot dot-yellow"></div>
        <div class="terminal-dot dot-green"></div>
        <span class="terminal-title">Terminal &mdash; Blog Publishing Pipeline</span>
      </div>
      <div class="terminal-body">
        <span class="t-prompt">$</span> <span class="t-cmd">/acos "Write a deep-dive article about multi-agent orchestration"</span><br/><br/>
        <span class="t-dim"># ACOS auto-routing...</span><br/>
        <span class="t-out">&rarr; Agent: Creation Engine</span><br/>
        <span class="t-out">&rarr; Skills: seo-content-writer, schema-markup, frankx-brand</span><br/>
        <span class="t-out">&rarr; Workflow: Research &rarr; Draft &rarr; SEO &rarr; Publish</span><br/><br/>
        <span class="t-dim"># Research phase (auto)</span><br/>
        <span class="t-out">&rarr; 12 sources analyzed, 3 cited</span><br/>
        <span class="t-out">&rarr; SEO: primary keyword "multi-agent orchestration" (KD: 23)</span><br/><br/>
        <span class="t-dim"># Draft phase (auto)</span><br/>
        <span class="t-out">&rarr; 2,800 words generated, brand voice verified</span><br/>
        <span class="t-out">&rarr; Schema: Article + FAQPage markup applied</span><br/><br/>
        <span class="t-dim"># Publish phase</span><br/>
        <span class="t-out">&rarr; MDX file created at content/blog/multi-agent-orchestration.mdx</span><br/>
        <span class="t-out">&rarr; OG image generated via /infogenius</span><br/>
        <span class="t-accent">&check; Published to frankx.ai in 18 minutes</span>
      </div>
    </div>

    <div class="terminal mt-md">
      <div class="terminal-bar">
        <div class="terminal-dot dot-red"></div>
        <div class="terminal-dot dot-yellow"></div>
        <div class="terminal-dot dot-green"></div>
        <span class="terminal-title">Terminal &mdash; Music Production</span>
      </div>
      <div class="terminal-body">
        <span class="t-prompt">$</span> <span class="t-cmd">/acos "Produce an ambient electronic track for deep focus"</span><br/><br/>
        <span class="t-out">&rarr; Agent: Sonic Engineer</span><br/>
        <span class="t-out">&rarr; Skills: suno-ai-mastery, suno-prompt-architect</span><br/>
        <span class="t-out">&rarr; Genre: Ambient Electronic | BPM: 72 | Key: Cm</span><br/>
        <span class="t-out">&rarr; Prompt crafted with frequency analysis and structure tags</span><br/>
        <span class="t-accent">&check; Track generated, metadata applied, ready for distribution</span>
      </div>
    </div>
  </div>
  ${footer(14)}
</div>

<!-- ═══ PAGE 15: CREATOR TYPES ═══ -->
<div class="page page-dark">
  <div class="content">
    <div class="section-head">
      <div class="section-num">08</div>
      <div class="section-head-text">
        <div class="section-tag">Use Cases</div>
        <h2>Find Your Creator Type</h2>
      </div>
    </div>

    <p>ACOS adapts to how you work. Six creator archetypes, each with optimized workflows and skill profiles.</p>

    <div class="two-col mt-md">
      <div class="creator-card">
        <div class="label">Writer &amp; Content Creator</div>
        <h3>The Publishing Machine</h3>
        <p>Automated research &rarr; draft &rarr; SEO &rarr; publish pipeline. One command produces a fully optimized article with schema markup, internal links, and OG images.</p>
        <p style="margin-top:6px;"><code>/article-creator</code> <code>/frankx-ai-blog</code> <code>/frankx-ai-seo</code></p>
      </div>
      <div class="creator-card">
        <div class="label">Developer &amp; Architect</div>
        <h3>The Systems Builder</h3>
        <p>Spec-driven development with full-stack agent support. Architecture reviews, code generation, testing, and deployment in one flow.</p>
        <p style="margin-top:6px;"><code>/spec</code> <code>/frankx-ai-build</code> <code>/frankx-ai-deploy</code></p>
      </div>
      <div class="creator-card">
        <div class="label">Musician &amp; Producer</div>
        <h3>The Sonic Architect</h3>
        <p>AI-powered music production with Suno integration. Genre expertise, frequency analysis, prompt crafting, and distribution-ready output.</p>
        <p style="margin-top:6px;"><code>/create-music</code> <code>/suno-prompt-architect</code></p>
      </div>
      <div class="creator-card">
        <div class="label">Entrepreneur &amp; Strategist</div>
        <h3>The Strategic Mind</h3>
        <p>Multi-agent strategic council for business decisions. Market analysis, competitive intelligence, and execution planning.</p>
        <p style="margin-top:6px;"><code>/council</code> <code>/starlight-architect</code> <code>/plan-week</code></p>
      </div>
      <div class="creator-card">
        <div class="label">Course Creator &amp; Educator</div>
        <h3>The Knowledge Engineer</h3>
        <p>Transform expertise into structured learning experiences. Curriculum design, content generation, and product packaging.</p>
        <p style="margin-top:6px;"><code>/products-creation</code> <code>/factory</code></p>
      </div>
      <div class="creator-card">
        <div class="label">Agency Owner &amp; Team Lead</div>
        <h3>The Operations Commander</h3>
        <p>Department automation for scaled creative operations. Delegate to agent teams, maintain quality across output streams.</p>
        <p style="margin-top:6px;"><code>/acos-swarm</code> <code>/harvest</code> <code>/inventory-status</code></p>
      </div>
    </div>
  </div>
  ${footer(15)}
</div>

<!-- ═══ PAGE 16: REAL RESULTS ═══ -->
<div class="page page-light">
  <div class="content">
    <div class="section-head">
      <div class="section-num">09</div>
      <div class="section-head-text">
        <div class="section-tag">Proof Points</div>
        <h2>Real Results, Not Theory</h2>
      </div>
    </div>

    <p style="font-size:15px;max-width:520px;">ACOS isn't a concept. It's the system behind a production creator platform, 500+ AI songs, and enterprise AI architecture projects. Here's what two years of production use looks like.</p>

    <div class="stats-row mt-md">
      <div class="stat-card"><div class="stat-value" style="font-size:36px;">12,000+</div><div class="stat-label">AI Songs</div></div>
      <div class="stat-card"><div class="stat-value" style="font-size:36px;">70+</div><div class="stat-label">Articles</div></div>
      <div class="stat-card"><div class="stat-value" style="font-size:36px;">10-16h</div><div class="stat-label">Saved / Week</div></div>
    </div>

    <div class="two-col mt-md">
      <div class="card">
        <h3 style="color:${C.textDark};">Content Pipeline</h3>
        <table>
          <tr><td style="color:${C.textDark};font-weight:600;">Blog publishing</td><td>3-4 hours &rarr; 30 min</td></tr>
          <tr><td style="color:${C.textDark};font-weight:600;">SEO optimization</td><td>Automatic per article</td></tr>
          <tr><td style="color:${C.textDark};font-weight:600;">Content repurposing</td><td>1 piece &rarr; 6 formats</td></tr>
          <tr><td style="color:${C.textDark};font-weight:600;">Social distribution</td><td>Auto-generated posts</td></tr>
        </table>
      </div>
      <div class="card">
        <h3 style="color:${C.textDark};">Development Pipeline</h3>
        <table>
          <tr><td style="color:${C.textDark};font-weight:600;">Feature development</td><td>Spec &rarr; code &rarr; deploy</td></tr>
          <tr><td style="color:${C.textDark};font-weight:600;">Code review</td><td>Automated quality gates</td></tr>
          <tr><td style="color:${C.textDark};font-weight:600;">Documentation</td><td>Auto-generated from code</td></tr>
          <tr><td style="color:${C.textDark};font-weight:600;">Deployment</td><td>One command to production</td></tr>
        </table>
      </div>
    </div>

    <div class="pull-quote mt-md">
      <p>"What used to take a team of specialists and weeks of coordination now happens in a single creative session."</p>
    </div>
  </div>
  ${footer(16)}
</div>

<!-- ═══ PAGE 17: ACOS VS TRADITIONAL (Image) ═══ -->
${imagePage('Comparison', 'ACOS vs. Traditional AI Workflows', IMG.comparison, 'Side-by-side: fragmented tool usage vs. unified operating system approach to creative AI', 17)}

<!-- ═══ PAGE 18: ECOSYSTEM (Image) ═══ -->
${imagePage('Ecosystem', 'Part of the FrankX Creator Ecosystem', IMG.ecosystem, 'ACOS powers the orchestration layer of a complete creator platform: Vibe OS, GenCreator OS, Arcanea, and Starlight', 18, 'light')}

<!-- ═══ PAGE 19: VIBE OS — THE CREATIVE FLOW ═══ -->
<div class="page page-accent">
  <div class="content">
    <div class="section-head">
      <div class="section-num" style="color:${C.blue};">&#9826;</div>
      <div class="section-head-text">
        <div class="section-tag" style="color:${C.blue};">Vibe OS</div>
        <h2>The Creative Flow Architecture</h2>
      </div>
    </div>

    <p style="font-size:15px;line-height:1.8;max-width:560px;">ACOS handles orchestration. But the best creative output comes from <strong>flow state</strong> &mdash; that zone where intention, environment, and AI converge. Vibe OS is the philosophy layer that makes it happen.</p>

    <div class="pull-quote mt-md" style="border-color:${C.blue};">
      <p>"You don't just create with tools. You create with state. The right intention, the right energy, the right system &mdash; and the work flows."</p>
    </div>

    <div style="display:flex;gap:8px;margin:28px 0;flex-wrap:wrap;">
      <div style="flex:1;min-width:100px;text-align:center;padding:16px 8px;background:${C.glass};border:1px solid ${C.blue}33;border-radius:10px;">
        <div style="font-size:22px;margin-bottom:6px;">&#127919;</div>
        <h3 style="font-size:11px;color:${C.blue};">Intention</h3>
        <p style="font-size:9.5px;margin:0;line-height:1.4;">Define your creative goal with clarity</p>
      </div>
      <div style="color:${C.textMuted};align-self:center;font-size:18px;">&rarr;</div>
      <div style="flex:1;min-width:100px;text-align:center;padding:16px 8px;background:${C.glass};border:1px solid ${C.purple}33;border-radius:10px;">
        <div style="font-size:22px;margin-bottom:6px;">&#129504;</div>
        <h3 style="font-size:11px;color:${C.purple};">State</h3>
        <p style="font-size:9.5px;margin:0;line-height:1.4;">Get into the right creative energy</p>
      </div>
      <div style="color:${C.textMuted};align-self:center;font-size:18px;">&rarr;</div>
      <div style="flex:1;min-width:100px;text-align:center;padding:16px 8px;background:${C.glass};border:1px solid ${C.emerald}33;border-radius:10px;">
        <div style="font-size:22px;margin-bottom:6px;">&#9889;</div>
        <h3 style="font-size:11px;color:${C.emerald};">Create with AI</h3>
        <p style="font-size:9.5px;margin:0;line-height:1.4;">ACOS + Claude Code orchestrate your work</p>
      </div>
      <div style="color:${C.textMuted};align-self:center;font-size:18px;">&rarr;</div>
      <div style="flex:1;min-width:100px;text-align:center;padding:16px 8px;background:${C.glass};border:1px solid ${C.gold}33;border-radius:10px;">
        <div style="font-size:22px;margin-bottom:6px;">&#127925;</div>
        <h3 style="font-size:11px;color:${C.gold};">Music</h3>
        <p style="font-size:9.5px;margin:0;line-height:1.4;">Generate music with Suno to anchor the vibe</p>
      </div>
    </div>

    <div style="display:flex;gap:8px;margin:0 0 28px;flex-wrap:wrap;justify-content:center;">
      <div style="flex:1;min-width:100px;text-align:center;padding:16px 8px;background:${C.glass};border:1px solid ${C.gold}33;border-radius:10px;">
        <div style="font-size:22px;margin-bottom:6px;">&#127911;</div>
        <h3 style="font-size:11px;color:${C.gold};">Listen &amp; Vibe</h3>
        <p style="font-size:9.5px;margin:0;line-height:1.4;">Immerse in the frequency, enter flow state</p>
      </div>
      <div style="color:${C.textMuted};align-self:center;font-size:18px;">&rarr;</div>
      <div style="flex:1;min-width:100px;text-align:center;padding:16px 8px;background:${C.glass};border:1px solid ${C.blue}33;border-radius:10px;">
        <div style="font-size:22px;margin-bottom:6px;">&#10024;</div>
        <h3 style="font-size:11px;color:${C.blue};">Flow</h3>
        <p style="font-size:9.5px;margin:0;line-height:1.4;">Create from peak state &mdash; like Arcanea</p>
      </div>
      <div style="color:${C.textMuted};align-self:center;font-size:18px;">&rarr;</div>
      <div style="flex:1;min-width:100px;text-align:center;padding:16px 8px;background:${C.glass};border:1px solid ${C.emerald}33;border-radius:10px;">
        <div style="font-size:22px;margin-bottom:6px;">&#128640;</div>
        <h3 style="font-size:11px;color:${C.emerald};">Evolve</h3>
        <p style="font-size:9.5px;margin:0;line-height:1.4;">Improve, iterate, level up your system</p>
      </div>
    </div>

    <div class="two-col">
      <div class="card" style="border-left:3px solid ${C.blue};">
        <h3 style="color:${C.blue};font-size:13px;">Why Music Matters</h3>
        <p style="font-size:12px;margin:0;">Music is the bridge between analytical creation and flow state. With 12,000+ AI songs generated through Suno, FrankX uses frequency and rhythm to enter the creative zone. Each session starts with intention, anchors with music, and flows into production.</p>
      </div>
      <div class="card" style="border-left:3px solid ${C.purple};">
        <h3 style="color:${C.purple};font-size:13px;">The Complete Cycle</h3>
        <p style="font-size:12px;margin:0;">Vibe OS isn't separate from ACOS &mdash; it's the <strong>how</strong> of using it. Set your intention, choose your creative state, let ACOS handle orchestration while you stay in flow. The system handles the complexity; you stay in the zone.</p>
      </div>
    </div>
  </div>
  ${footer(19)}
</div>

<!-- ═══ PAGE 20: HOOKS & AUTOMATION ═══ -->
<div class="page page-dark">
  <div class="content">
    <div class="section-head">
      <div class="section-num">10</div>
      <div class="section-head-text">
        <div class="section-tag">Automation</div>
        <h2>Lifecycle Hooks &amp; Self-Learning</h2>
      </div>
    </div>

    <p>ACOS v7.0 introduced <strong>event-driven automation</strong> through lifecycle hooks and <strong>trajectory-based learning</strong> through Agentic Jujutsu. The system improves itself with every interaction.</p>

    <div class="two-col mt-md">
      <div>
        <h3>7 Lifecycle Hook Events</h3>
        <div class="card mt-sm">
          <table>
            <tr><td><code>SessionStart</code></td><td>Initialize context, load memory</td></tr>
            <tr><td><code>PreToolCall</code></td><td>Validate before execution</td></tr>
            <tr><td><code>PostToolCall</code></td><td>Log results, update state</td></tr>
            <tr><td><code>PreEdit</code></td><td>Quality gate before file changes</td></tr>
            <tr><td><code>PostEdit</code></td><td>Verify and format after changes</td></tr>
            <tr><td><code>UserPromptSubmit</code></td><td>Auto-route, skill activation</td></tr>
            <tr><td><code>SessionEnd</code></td><td>Save state, generate reports</td></tr>
          </table>
        </div>
      </div>
      <div>
        <h3>Agentic Jujutsu Learning</h3>
        <p>Every ACOS session generates a <strong>trajectory</strong> &mdash; a record of tools used, decisions made, and outcomes achieved. The system extracts patterns from successful trajectories and applies them to future work.</p>
        <div class="card mt-sm" style="border-color:${C.purple}33;">
          <div style="font-size:11px;color:${C.textMuted};margin-bottom:8px;">LEARNING METRICS</div>
          <div style="display:flex;gap:20px;">
            <div style="text-align:center;">
              <div style="font-family:'Poppins';font-size:28px;font-weight:800;color:${C.purple};">23</div>
              <div style="font-size:10px;color:${C.textMuted};">Trajectories</div>
            </div>
            <div style="text-align:center;">
              <div style="font-family:'Poppins';font-size:28px;font-weight:800;color:${C.purple};">22</div>
              <div style="font-size:10px;color:${C.textMuted};">Patterns</div>
            </div>
            <div style="text-align:center;">
              <div style="font-family:'Poppins';font-size:28px;font-weight:800;color:${C.purple};">58%</div>
              <div style="font-size:10px;color:${C.textMuted};">Avg Success</div>
            </div>
          </div>
        </div>
        <p class="mt-sm" style="font-size:12px;">Based on MIT-licensed <a href="https://github.com/ruvnet/agentic-flow" style="color:${ACCENT};">ruvnet/agentic-flow</a></p>
      </div>
    </div>
  </div>
  ${footer(20)}
</div>

<!-- ═══ PAGE 21: GETTING STARTED ═══ -->
<div class="page page-light">
  <div class="content">
    <div class="section-head">
      <div class="section-num">11</div>
      <div class="section-head-text">
        <div class="section-tag">Getting Started</div>
        <h2>Your First 5 Minutes with ACOS</h2>
      </div>
    </div>

    <p>ACOS works on top of <strong>Claude Code CLI</strong>. If you have Claude Code installed, you already have everything you need.</p>

    <div class="flow-steps mt-md">
      <div class="flow-step" style="background:${C.white};border-color:#E2E8F0;">
        <div class="flow-step-num">1</div>
        <h3 style="color:${C.textDark};">Clone</h3>
        <p style="color:${C.textDarkSub};">Get the ACOS repository</p>
      </div>
      <div class="flow-step" style="background:${C.white};border-color:#E2E8F0;">
        <div class="flow-step-num">2</div>
        <h3 style="color:${C.textDark};">Open</h3>
        <p style="color:${C.textDarkSub};">Launch Claude Code in the project</p>
      </div>
      <div class="flow-step" style="background:${C.white};border-color:#E2E8F0;">
        <div class="flow-step-num">3</div>
        <h3 style="color:${C.textDark};">Route</h3>
        <p style="color:${C.textDarkSub};">Use /acos for any task</p>
      </div>
      <div class="flow-step" style="background:${C.white};border-color:#E2E8F0;">
        <div class="flow-step-num">4</div>
        <h3 style="color:${C.textDark};">Ship</h3>
        <p style="color:${C.textDarkSub};">Deploy production output</p>
      </div>
    </div>

    <div class="terminal mt-md">
      <div class="terminal-bar">
        <div class="terminal-dot dot-red"></div>
        <div class="terminal-dot dot-yellow"></div>
        <div class="terminal-dot dot-green"></div>
        <span class="terminal-title">Terminal &mdash; Quick Start</span>
      </div>
      <div class="terminal-body">
        <span class="t-dim"># 1. Clone the repository</span><br/>
        <span class="t-prompt">$</span> <span class="t-cmd">git clone https://github.com/frankxai/agentic-creator-os</span><br/>
        <span class="t-prompt">$</span> <span class="t-cmd">cd agentic-creator-os</span><br/><br/>
        <span class="t-dim"># 2. Open in Claude Code</span><br/>
        <span class="t-prompt">$</span> <span class="t-cmd">claude</span><br/><br/>
        <span class="t-dim"># 3. Use the smart router</span><br/>
        <span class="t-prompt">$</span> <span class="t-cmd">/acos "Build me a landing page"</span><br/>
        <span class="t-out">&rarr; Routing to: Frontend Designer</span><br/>
        <span class="t-out">&rarr; Skills: vercel-react, tailwind-css, web-design</span><br/>
        <span class="t-accent">&check; Production components generated</span><br/><br/>
        <span class="t-dim"># Or go direct to any command</span><br/>
        <span class="t-prompt">$</span> <span class="t-cmd">/create-music "ambient electronic for deep focus"</span><br/>
        <span class="t-prompt">$</span> <span class="t-cmd">/article-creator "AI agent orchestration patterns"</span><br/>
        <span class="t-prompt">$</span> <span class="t-cmd">/council "Should I pivot to B2B SaaS?"</span><br/>
      </div>
    </div>

    <div class="two-col mt-md">
      <div class="card" style="background:${C.white};border-color:#E2E8F0;">
        <h3 style="color:${ACCENT};">Prerequisites</h3>
        <p style="font-size:12px;color:${C.textDarkSub};">&bull; Claude Code CLI (latest)<br/>&bull; Node.js 18+<br/>&bull; Git</p>
      </div>
      <div class="card" style="background:${C.white};border-color:#E2E8F0;">
        <h3 style="color:${ACCENT};">Recommended Setup</h3>
        <p style="font-size:12px;color:${C.textDarkSub};">&bull; MCP servers: Memory, Playwright<br/>&bull; Global skills installed<br/>&bull; Brand guidelines configured</p>
      </div>
    </div>
  </div>
  ${footer(21)}
</div>

<!-- ═══ PAGE 22: OPEN SOURCE & CREDITS ═══ -->
<div class="page page-dark">
  <div class="content">
    <div class="section-head">
      <div class="section-num">12</div>
      <div class="section-head-text">
        <div class="section-tag">Open Source</div>
        <h2>Built on the Shoulders of Giants</h2>
      </div>
    </div>

    <p>ACOS absorbs and credits patterns from 14 open-source repositories. The Claude Code community is building the future of agentic software together.</p>

    <div class="two-col mt-md">
      <div>
        <table>
          <tr><th>Repository</th><th>Contribution</th></tr>
          <tr><td>ruvnet/claude-flow</td><td>Swarm orchestration</td></tr>
          <tr><td>wshobson/agents</td><td>108-agent patterns</td></tr>
          <tr><td>obra/superpowers</td><td>Progressive disclosure</td></tr>
          <tr><td>diet103/claude-code-infra</td><td>Auto-activation</td></tr>
          <tr><td>ChrisWiles/claude-code</td><td>Hook automation</td></tr>
          <tr><td>decider/claude-hooks</td><td>Clean code enforcement</td></tr>
          <tr><td>Pimzino/spec-workflow</td><td>Spec-driven development</td></tr>
        </table>
      </div>
      <div>
        <table>
          <tr><th>Repository</th><th>Contribution</th></tr>
          <tr><td>github/github-mcp-server</td><td>GitHub integration</td></tr>
          <tr><td>zilliztech/claude-context</td><td>Semantic code search</td></tr>
          <tr><td>anthropics/courses</td><td>Prompt engineering</td></tr>
          <tr><td>sickn33/awesome-skills</td><td>500+ skill library</td></tr>
          <tr><td>vercel-labs/agent-skills</td><td>Vercel patterns</td></tr>
          <tr><td>ibelick/ui-skills</td><td>UI components</td></tr>
          <tr><td>giuseppe/developer-kit</td><td>Dev tools</td></tr>
        </table>
      </div>
    </div>

    <div class="accent-line"></div>

    <div class="two-col">
      <div class="card" style="border-color:${C.emerald}33;">
        <h3 style="color:${C.emerald};">Community</h3>
        <p style="font-size:12.5px;">ACOS is open source on GitHub. Star the repo, fork it, build your own agent configurations. The system is designed to be extended.</p>
        <p style="font-size:12px;margin-top:8px;"><code>github.com/frankxai/agentic-creator-os</code></p>
      </div>
      <div class="card" style="border-color:${C.gold}33;">
        <h3 style="color:${C.gold};">Contribute</h3>
        <p style="font-size:12.5px;">Add new skills, create agent profiles, improve workflows. Every contribution makes the ecosystem stronger for all creators.</p>
        <p style="font-size:12px;margin-top:8px;">MIT License &bull; PRs welcome</p>
      </div>
    </div>
  </div>
  ${footer(22)}
</div>

<!-- ═══ PAGE 23: BACK COVER ═══ -->
<div class="page page-cover">
  <div class="cover-glow" style="background:radial-gradient(circle,${C.purple}18 0%,${ACCENT}0A 40%,transparent 70%);"></div>
  <div class="cover-content">
    <div class="cover-badge">frankx.ai</div>
    <h1 class="cover-title" style="font-size:48px;">Build What<br/>Matters.</h1>
    <div class="cover-divider" style="margin:28px auto;"></div>
    <p class="cover-subtitle" style="font-size:15px;">Stop managing AI tools.<br/>Start creating with an operating system that understands your intent.</p>

    <div style="margin-top:48px;">
      <div style="display:inline-flex;gap:24px;align-items:center;">
        <div style="text-align:center;">
          <div style="font-family:'Poppins';font-size:32px;font-weight:800;color:${ACCENT};">630+</div>
          <div style="font-size:10px;color:${C.textMuted};text-transform:uppercase;letter-spacing:0.1em;">Skills</div>
        </div>
        <div style="width:1px;height:40px;background:${C.border};"></div>
        <div style="text-align:center;">
          <div style="font-family:'Poppins';font-size:32px;font-weight:800;color:${ACCENT};">40+</div>
          <div style="font-size:10px;color:${C.textMuted};text-transform:uppercase;letter-spacing:0.1em;">Agents</div>
        </div>
        <div style="width:1px;height:40px;background:${C.border};"></div>
        <div style="text-align:center;">
          <div style="font-family:'Poppins';font-size:32px;font-weight:800;color:${ACCENT};">130+</div>
          <div style="font-size:10px;color:${C.textMuted};text-transform:uppercase;letter-spacing:0.1em;">Commands</div>
        </div>
      </div>
    </div>

    <p class="cover-meta" style="margin-top:48px;">
      AGENTIC CREATOR OS v7.0 &nbsp;&bull;&nbsp; FEBRUARY 2026
    </p>
    <p class="cover-meta" style="margin-top:8px;">
      github.com/frankxai/agentic-creator-os
    </p>
    <p class="cover-meta" style="margin-top:6px;color:${C.textSecondary};">
      &copy; 2026 FrankX. All rights reserved.
    </p>
  </div>
</div>

</body>
</html>`
}

// ═══════════════════════════════════════════════════════════════════
// PDF GENERATION ENGINE
// ═══════════════════════════════════════════════════════════════════
async function generate() {
  const htmlPath = join(TMP_DIR, 'acos-product-guide.html')
  const tmpPdf = join(TMP_DIR, 'ACOS-Product-Guide.pdf')
  const outPdf = join(OUTPUT_DIR, 'ACOS-Product-Guide.pdf')

  console.log('Building ACOS Product Guide — Premium Edition...')
  console.log(`  Pages: ${TOTAL_PAGES}`)
  console.log(`  Images: ${Object.keys(IMG).length}`)

  // Write HTML to temp
  const html = buildHTML()
  writeFileSync(htmlPath, html)
  console.log(`  HTML: ${htmlPath} (${(html.length / 1024).toFixed(0)} KB)`)

  // Launch Chromium
  const browser = await chromium.launch({
    executablePath: '/home/frankx/.cache/ms-playwright/chromium-1208/chrome-linux64/chrome',
  })

  const page = await browser.newPage()
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle', timeout: 30000 })

  // Wait for Google Fonts
  console.log('  Waiting for fonts...')
  await page.waitForTimeout(4000)

  // Generate PDF
  console.log('  Rendering PDF...')
  await page.pdf({
    path: tmpPdf,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  })

  await browser.close()

  // Copy to output
  copyFileSync(tmpPdf, outPdf)
  const sizeKB = Math.round(readFileSync(outPdf).length / 1024)
  console.log(`\n  PDF: ${outPdf} (${sizeKB} KB)`)
  console.log('\nDone!')
}

generate().catch(err => { console.error(err); process.exit(1) })
