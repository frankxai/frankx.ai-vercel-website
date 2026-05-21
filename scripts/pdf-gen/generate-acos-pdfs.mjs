#!/usr/bin/env node
/**
 * FrankX Product PDF Generator — Visual-First Premium Edition v3
 * Inspired by GitHub Brand Guidelines PDF design:
 *   - Full-bleed color pages alternating dark/light
 *   - Inline SVG illustrations & architecture diagrams
 *   - Large stat callouts & display typography
 *   - Visual feature grids with icon cards
 *   - Terminal mockups with window chrome
 *   - Bold decorative section numbers
 *
 * Usage: node scripts/pdf-gen/generate-acos-pdfs.mjs [quickstart|reference|agent-guide|vibe-os|gencreator-os|all]
 */

import { chromium } from 'playwright'
import { mkdirSync, copyFileSync } from 'fs'
import { join } from 'path'

const OUTPUT_DIR = join(import.meta.dirname, '../../public/products')
const TMP_DIR = '/tmp/frankx-pdfs'
mkdirSync(OUTPUT_DIR, { recursive: true })
mkdirSync(TMP_DIR, { recursive: true })

// ─── Brand Design Tokens ───
const C = {
  oled: '#030712',
  navy: '#0F172A',
  navyMid: '#0C1525',
  card: '#1E293B',
  elevated: '#334155',
  border: 'rgba(255,255,255,0.06)',
  borderHover: 'rgba(255,255,255,0.12)',
  glass: 'rgba(255,255,255,0.03)',
  white: '#FFFFFF',
  offWhite: '#F8FAFC',
  warmGray: '#F1F5F9',
  textPrimary: '#E2E8F0',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  textDark: '#1E293B',
  textDarkSub: '#475569',
  purple: '#AB47C7',
  purpleLight: '#C084FC',
  blue: '#43BFE3',
  blueLight: '#67E8F9',
  gold: '#F59E0B',
  goldLight: '#FCD34D',
  emerald: '#10B981',
  emeraldLight: '#34D399',
  rose: '#F43F5E',
}

const PRODUCTS = {
  acos: { accent: C.blue, accentLight: C.blueLight, accentDark: '#1E7A9C', name: 'Agentic Creator OS', short: 'ACOS' },
  vibe: { accent: C.emerald, accentLight: C.emeraldLight, accentDark: '#047857', name: 'Vibe OS', short: 'Vibe OS' },
  gencreator: { accent: C.gold, accentLight: C.goldLight, accentDark: '#B45309', name: 'Generative Creator OS', short: 'GenCreator OS' },
}

// ─── SVG Illustration Library ───
const SVG = {
  // Constellation pattern - nodes connected by lines
  constellation(accent, accentLight, width = 400, height = 300) {
    const nodes = [
      [80, 60], [200, 40], [320, 80], [140, 150], [260, 130],
      [60, 240], [180, 220], [300, 200], [360, 260], [100, 180],
    ]
    const edges = [
      [0,1], [1,2], [0,3], [1,4], [2,4], [3,6], [4,7], [5,6],
      [6,7], [7,8], [5,9], [9,3], [3,4],
    ]
    let lines = edges.map(([a,b]) =>
      `<line x1="${nodes[a][0]}" y1="${nodes[a][1]}" x2="${nodes[b][0]}" y2="${nodes[b][1]}" stroke="${accent}" stroke-width="1" opacity="0.3"/>`
    ).join('')
    let circles = nodes.map(([x,y], i) =>
      `<circle cx="${x}" cy="${y}" r="${i < 3 ? 6 : 4}" fill="${i < 3 ? accent : accentLight}" opacity="${i < 3 ? 0.8 : 0.4}"/>
       ${i < 3 ? `<circle cx="${x}" cy="${y}" r="12" fill="none" stroke="${accent}" stroke-width="1" opacity="0.2"/>` : ''}`
    ).join('')
    return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">${lines}${circles}</svg>`
  },

  // Abstract grid pattern for backgrounds
  gridPattern(accent, size = 600) {
    let cells = ''
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const opacity = Math.abs(Math.sin(row * 3.7 + col * 2.3)) * 0.08
        cells += `<rect x="${col * 75}" y="${row * 75}" width="74" height="74" rx="4" fill="${accent}" opacity="${opacity}"/>`
      }
    }
    return `<svg width="${size}" height="${size}" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">${cells}</svg>`
  },

  // Architecture flow diagram
  archDiagram(accent, accentLight) {
    return `<svg width="680" height="200" viewBox="0 0 680 200" xmlns="http://www.w3.org/2000/svg">
      <!-- Boxes -->
      <rect x="0" y="60" width="130" height="80" rx="10" fill="${C.oled}" stroke="${accent}" stroke-width="1.5"/>
      <text x="65" y="95" text-anchor="middle" fill="${C.white}" font-family="Inter" font-size="13" font-weight="600">User Input</text>
      <text x="65" y="115" text-anchor="middle" fill="${C.textMuted}" font-family="Inter" font-size="10">/acos command</text>

      <rect x="185" y="60" width="130" height="80" rx="10" fill="${C.oled}" stroke="${accent}" stroke-width="1.5"/>
      <text x="250" y="95" text-anchor="middle" fill="${C.white}" font-family="Inter" font-size="13" font-weight="600">Smart Router</text>
      <text x="250" y="115" text-anchor="middle" fill="${C.textMuted}" font-family="Inter" font-size="10">Intent Analysis</text>

      <rect x="370" y="60" width="130" height="80" rx="10" fill="${C.oled}" stroke="${accent}" stroke-width="1.5"/>
      <text x="435" y="95" text-anchor="middle" fill="${C.white}" font-family="Inter" font-size="13" font-weight="600">Agent Pool</text>
      <text x="435" y="115" text-anchor="middle" fill="${C.textMuted}" font-family="Inter" font-size="10">40+ Specialists</text>

      <rect x="555" y="60" width="125" height="80" rx="10" fill="${accent}22" stroke="${accent}" stroke-width="1.5"/>
      <text x="617" y="95" text-anchor="middle" fill="${C.white}" font-family="Inter" font-size="13" font-weight="600">Output</text>
      <text x="617" y="115" text-anchor="middle" fill="${accentLight}" font-family="Inter" font-size="10">Production-Ready</text>

      <!-- Arrows -->
      <line x1="130" y1="100" x2="185" y2="100" stroke="${accent}" stroke-width="1.5" marker-end="url(#arrowhead)"/>
      <line x1="315" y1="100" x2="370" y2="100" stroke="${accent}" stroke-width="1.5" marker-end="url(#arrowhead)"/>
      <line x1="500" y1="100" x2="555" y2="100" stroke="${accent}" stroke-width="1.5" marker-end="url(#arrowhead)"/>

      <!-- Arrow markers -->
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="${accent}"/>
        </marker>
      </defs>

      <!-- Label under -->
      <text x="340" y="175" text-anchor="middle" fill="${C.textMuted}" font-family="Inter" font-size="11" font-style="italic">Every command routes through intelligent classification to the optimal agent</text>
    </svg>`
  },

  // Feature icon (hexagon with inner icon)
  featureIcon(accent, type = 'bolt') {
    const icons = {
      bolt: `<path d="M14 5l-4 8h3l-1 7 5-9h-4l1-6z" fill="${C.white}" opacity="0.9"/>`,
      brain: `<circle cx="15" cy="13" r="6" fill="none" stroke="${C.white}" stroke-width="1.5" opacity="0.9"/><path d="M12 10c1-2 5-2 6 0M12 16c1 2 5 2 6 0" fill="none" stroke="${C.white}" stroke-width="1" opacity="0.7"/>`,
      layers: `<rect x="9" y="8" width="12" height="3" rx="1" fill="${C.white}" opacity="0.6"/><rect x="10" y="13" width="10" height="3" rx="1" fill="${C.white}" opacity="0.75"/><rect x="11" y="18" width="8" height="3" rx="1" fill="${C.white}" opacity="0.9"/>`,
      grid: `<rect x="8" y="8" width="5" height="5" rx="1" fill="${C.white}" opacity="0.7"/><rect x="15" y="8" width="5" height="5" rx="1" fill="${C.white}" opacity="0.9"/><rect x="8" y="15" width="5" height="5" rx="1" fill="${C.white}" opacity="0.9"/><rect x="15" y="15" width="5" height="5" rx="1" fill="${C.white}" opacity="0.5"/>`,
      rocket: `<path d="M15 7c3 2 5 6 5 10h-4l-1 4-1-4h-4c0-4 2-8 5-10z" fill="${C.white}" opacity="0.9"/>`,
      music: `<circle cx="12" cy="19" r="3" fill="${C.white}" opacity="0.8"/><circle cx="20" cy="17" r="3" fill="${C.white}" opacity="0.8"/><line x1="15" y1="19" x2="15" y2="7" stroke="${C.white}" stroke-width="1.5" opacity="0.7"/><line x1="23" y1="17" x2="23" y2="5" stroke="${C.white}" stroke-width="1.5" opacity="0.7"/><line x1="15" y1="7" x2="23" y2="5" stroke="${C.white}" stroke-width="1.5" opacity="0.7"/>`,
      code: `<polyline points="10,10 6,15 10,20" fill="none" stroke="${C.white}" stroke-width="1.5" opacity="0.9"/><polyline points="20,10 24,15 20,20" fill="none" stroke="${C.white}" stroke-width="1.5" opacity="0.9"/>`,
      star: `<polygon points="15,5 17.5,12 25,12 19,17 21,24 15,20 9,24 11,17 5,12 12.5,12" fill="${C.white}" opacity="0.85"/>`,
    }
    return `<svg width="48" height="48" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
      <rect width="30" height="30" rx="8" fill="${accent}" opacity="0.15"/>
      <rect width="30" height="30" rx="8" fill="none" stroke="${accent}" stroke-width="0.5" opacity="0.4"/>
      ${icons[type] || icons.bolt}
    </svg>`
  },

  // Circular progress ring for stats
  statRing(accent, percent = 75) {
    const r = 36
    const circ = 2 * Math.PI * r
    const offset = circ * (1 - percent / 100)
    return `<svg width="90" height="90" viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
      <circle cx="45" cy="45" r="${r}" fill="none" stroke="${C.border}" stroke-width="3"/>
      <circle cx="45" cy="45" r="${r}" fill="none" stroke="${accent}" stroke-width="3" stroke-dasharray="${circ}" stroke-dashoffset="${offset}" stroke-linecap="round" transform="rotate(-90 45 45)"/>
    </svg>`
  },

  // Decorative wave divider
  wave(accent) {
    return `<svg width="100%" height="60" viewBox="0 0 800 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,30 C200,60 400,0 600,30 C700,45 800,15 800,30 L800,60 L0,60 Z" fill="${accent}" opacity="0.05"/>
      <path d="M0,35 C200,50 400,10 600,35 C700,45 800,25 800,35" fill="none" stroke="${accent}" stroke-width="1" opacity="0.2"/>
    </svg>`
  },
}

// ─── Premium Visual Styles v3 ───
function premiumStyles(accent = C.blue, accentLight = C.blueLight) {
  return `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap');

    :root {
      --accent: ${accent};
      --accent-light: ${accentLight};
      --accent-glow: ${accent}22;
      --accent-border: ${accent}4D;
      --accent-bg: ${accent}0D;
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'Inter', -apple-system, sans-serif;
      background: ${C.navy};
      color: ${C.textPrimary};
      -webkit-font-smoothing: antialiased;
    }

    /* ── Page Types ── */
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
      padding: 72px 80px 60px;
    }
    .page-light {
      background: ${C.offWhite};
      color: ${C.textDark};
      padding: 72px 80px 60px;
    }
    .page-accent {
      background: linear-gradient(135deg, ${accent}12 0%, ${C.navy} 40%, ${C.oled} 100%);
      color: ${C.textPrimary};
      padding: 72px 80px 60px;
    }
    .page-cover {
      background: ${C.oled};
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 80px;
      position: relative;
    }

    /* ── Cover Page Glow ── */
    .cover-glow {
      position: absolute;
      width: 600px;
      height: 600px;
      border-radius: 50%;
      background: radial-gradient(circle, ${accent}20 0%, transparent 70%);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 0;
    }
    .cover-content { position: relative; z-index: 1; }
    .cover-badge {
      display: inline-block;
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: ${accent};
      border: 1px solid ${accent}4D;
      padding: 6px 16px;
      border-radius: 100px;
      margin-bottom: 32px;
    }
    .cover-title {
      font-family: 'Poppins', sans-serif;
      font-size: 56px;
      font-weight: 900;
      line-height: 1.05;
      letter-spacing: -0.03em;
      color: ${C.white};
      margin-bottom: 16px;
    }
    .cover-subtitle {
      font-size: 18px;
      font-weight: 300;
      color: ${C.textSecondary};
      margin-bottom: 48px;
      line-height: 1.6;
      max-width: 500px;
    }
    .cover-meta {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      color: ${C.textMuted};
      letter-spacing: 0.05em;
    }
    .cover-divider {
      width: 60px;
      height: 3px;
      background: linear-gradient(90deg, ${accent}, ${accentLight});
      border-radius: 2px;
      margin: 24px auto;
    }
    .cover-illustration {
      margin: 40px 0;
    }

    /* ── Typography ── */
    h1 {
      font-family: 'Poppins', sans-serif;
      font-size: 48px;
      font-weight: 800;
      line-height: 1.08;
      letter-spacing: -0.03em;
      color: ${C.white};
    }
    .page-light h1 { color: ${C.textDark}; }

    h2 {
      font-family: 'Poppins', sans-serif;
      font-size: 28px;
      font-weight: 700;
      line-height: 1.2;
      letter-spacing: -0.02em;
      color: ${C.white};
      margin-bottom: 12px;
    }
    .page-light h2 { color: ${C.textDark}; }

    h3 {
      font-family: 'Inter', sans-serif;
      font-size: 16px;
      font-weight: 600;
      color: ${C.white};
      margin-bottom: 6px;
    }
    .page-light h3 { color: ${C.textDark}; }

    p {
      font-size: 14.5px;
      line-height: 1.75;
      color: ${C.textSecondary};
      margin-bottom: 12px;
    }
    .page-light p { color: ${C.textDarkSub}; }

    strong { color: ${C.white}; font-weight: 600; }
    .page-light strong { color: ${C.textDark}; }

    code {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.88em;
      background: rgba(255,255,255,0.06);
      padding: 2px 6px;
      border-radius: 4px;
      color: var(--accent-light);
    }
    .page-light code {
      background: ${C.navy}0D;
      color: ${accent};
    }

    /* ── Section Header ── */
    .section-head {
      display: flex;
      align-items: flex-start;
      gap: 20px;
      margin-bottom: 40px;
    }
    .section-num {
      font-family: 'Poppins', sans-serif;
      font-size: 64px;
      font-weight: 900;
      line-height: 1;
      color: ${accent};
      opacity: 0.15;
      flex-shrink: 0;
      letter-spacing: -0.04em;
    }
    .page-light .section-num { color: ${accent}; opacity: 0.12; }

    .section-head-text { padding-top: 12px; }
    .section-tag {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--accent);
      margin-bottom: 8px;
    }

    /* ── Stats Row ── */
    .stats-row {
      display: flex;
      gap: 32px;
      margin: 32px 0;
    }
    .stat-card {
      flex: 1;
      text-align: center;
      padding: 28px 16px;
      background: ${C.glass};
      border: 1px solid ${C.border};
      border-radius: 12px;
    }
    .page-light .stat-card {
      background: ${C.white};
      border-color: #E2E8F0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.06);
    }
    .stat-value {
      font-family: 'Poppins', sans-serif;
      font-size: 42px;
      font-weight: 800;
      color: var(--accent);
      line-height: 1;
      margin-bottom: 8px;
      letter-spacing: -0.03em;
    }
    .stat-label {
      font-size: 12px;
      font-weight: 500;
      color: ${C.textMuted};
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    /* ── Feature Grid (2x2) ── */
    .feature-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin: 24px 0;
    }
    .feature-card {
      padding: 24px;
      background: ${C.glass};
      border: 1px solid ${C.border};
      border-radius: 12px;
    }
    .page-light .feature-card {
      background: ${C.white};
      border-color: #E2E8F0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.06);
    }
    .feature-card .icon { margin-bottom: 12px; }
    .feature-card h3 { font-size: 15px; margin-bottom: 6px; }
    .feature-card p { font-size: 13px; margin: 0; line-height: 1.6; }

    /* ── Terminal Mockup ── */
    .terminal {
      background: ${C.oled};
      border: 1px solid ${C.border};
      border-radius: 10px;
      margin: 20px 0;
      overflow: hidden;
    }
    .page-light .terminal {
      border-color: #CBD5E1;
    }
    .terminal-bar {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 10px 16px;
      background: rgba(255,255,255,0.03);
      border-bottom: 1px solid ${C.border};
    }
    .terminal-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
    .dot-red { background: #EF4444; }
    .dot-yellow { background: #F59E0B; }
    .dot-green { background: #10B981; }
    .terminal-title {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      color: ${C.textMuted};
      margin-left: 8px;
    }
    .terminal-body {
      padding: 20px 24px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      line-height: 1.9;
    }
    .t-prompt { color: ${C.emerald}; }
    .t-cmd { color: ${C.textSecondary}; }
    .t-out { color: var(--accent-light); }
    .t-dim { color: ${C.textMuted}; }
    .t-accent { color: var(--accent); }

    /* ── Pull Quote ── */
    .pull-quote {
      border-left: 3px solid var(--accent);
      padding: 20px 28px;
      margin: 28px 0;
      background: var(--accent-bg);
      border-radius: 0 8px 8px 0;
    }
    .pull-quote p {
      font-size: 17px;
      font-weight: 400;
      line-height: 1.7;
      font-style: italic;
      color: ${C.textPrimary};
      margin: 0;
    }
    .page-light .pull-quote p { color: ${C.textDark}; }
    .pull-quote .attribution {
      font-size: 12px;
      font-style: normal;
      color: var(--accent);
      margin-top: 12px;
      font-weight: 600;
    }

    /* ── Cards: Glassmorphic ── */
    .card {
      background: ${C.glass};
      border: 1px solid ${C.border};
      border-radius: 12px;
      padding: 24px 28px;
      margin-bottom: 16px;
    }
    .page-light .card {
      background: ${C.white};
      border-color: #E2E8F0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.06);
    }
    .card-accent {
      border-color: var(--accent-border);
      background: linear-gradient(135deg, ${C.glass}, var(--accent-glow));
    }
    .page-light .card-accent {
      background: linear-gradient(135deg, ${C.white}, ${accent}08);
      border-color: ${accent}33;
    }

    /* ── Command Row ── */
    .cmd-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin: 16px 0;
    }
    .cmd-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 14px;
      background: ${C.glass};
      border: 1px solid ${C.border};
      border-radius: 8px;
    }
    .page-light .cmd-item {
      background: ${C.white};
      border-color: #E2E8F0;
    }
    .cmd-name {
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      font-weight: 500;
      color: var(--accent);
      white-space: nowrap;
    }
    .cmd-desc {
      font-size: 12px;
      color: ${C.textMuted};
    }

    /* ── Tables ── */
    table { width: 100%; border-collapse: collapse; margin: 16px 0; }
    th {
      text-align: left;
      padding: 10px 16px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--accent);
      border-bottom: 2px solid var(--accent-border);
    }
    td {
      padding: 10px 16px;
      font-size: 13px;
      color: ${C.textSecondary};
      border-bottom: 1px solid ${C.border};
    }
    .page-light td { color: ${C.textDarkSub}; border-bottom-color: #E2E8F0; }
    .page-light th { border-bottom-color: ${accent}33; }
    td:first-child { color: ${C.white}; font-weight: 500; }
    .page-light td:first-child { color: ${C.textDark}; }
    td code {
      font-size: 12px;
    }

    /* ── Flow Steps ── */
    .flow-steps {
      display: flex;
      gap: 12px;
      margin: 24px 0;
    }
    .flow-step {
      flex: 1;
      text-align: center;
      padding: 20px 12px;
      background: ${C.glass};
      border: 1px solid ${C.border};
      border-radius: 10px;
      position: relative;
    }
    .page-light .flow-step {
      background: ${C.white};
      border-color: #E2E8F0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.06);
    }
    .flow-step-num {
      font-family: 'Poppins', sans-serif;
      font-size: 24px;
      font-weight: 800;
      color: var(--accent);
      opacity: 0.5;
      margin-bottom: 8px;
    }
    .flow-step h3 { font-size: 13px; text-align: center; margin-bottom: 4px; }
    .flow-step p { font-size: 11px; text-align: center; margin: 0; }

    /* ── Footer ── */
    .page-footer {
      position: absolute;
      bottom: 32px;
      left: 80px;
      right: 80px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .page-footer-brand {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: ${C.textMuted};
    }
    .page-footer-num {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px;
      color: ${C.textMuted};
    }

    /* ── Utility ── */
    .mt-sm { margin-top: 12px; }
    .mt-md { margin-top: 24px; }
    .mt-lg { margin-top: 40px; }
    .mb-sm { margin-bottom: 12px; }
    .mb-md { margin-bottom: 24px; }
    .accent { color: var(--accent); }
    .muted { color: ${C.textMuted}; font-size: 12px; }
    .highlight-text { color: var(--accent); font-weight: 600; }
    .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
    .flex-between { display: flex; justify-content: space-between; align-items: center; }

    /* ── Illustration Positioning ── */
    .bg-illustration {
      position: absolute;
      right: 40px;
      top: 40px;
      opacity: 0.4;
      z-index: 0;
    }
    .content { position: relative; z-index: 1; }
  `
}

function footer(product, page, total) {
  return `<div class="page-footer">
    <span class="page-footer-brand">FRANKX — ${product}</span>
    <span class="page-footer-num">${page} / ${total}</span>
  </div>`
}

// ═══════════════════════════════════════════════════════════════════
// ACOS QUICKSTART GUIDE (10 pages)
// ═══════════════════════════════════════════════════════════════════
function acosQuickstartHTML() {
  const P = PRODUCTS.acos
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${premiumStyles(P.accent, P.accentLight)}</style></head><body>

  <!-- PAGE 1: Cover -->
  <div class="page page-cover">
    <div class="cover-glow"></div>
    <div class="cover-content">
      <div class="cover-badge">Quick Start Guide</div>
      <div class="cover-illustration">${SVG.constellation(P.accent, P.accentLight, 360, 200)}</div>
      <h1 class="cover-title">Agentic<br/>Creator OS</h1>
      <div class="cover-divider"></div>
      <p class="cover-subtitle">Your complete AI operating system. 630+ skills, 40+ agents, one unified command interface.</p>
      <p class="cover-meta">FRANKX &nbsp;|&nbsp; v7.0 &nbsp;|&nbsp; 2026</p>
    </div>
  </div>

  <!-- PAGE 2: What is ACOS — Stats -->
  <div class="page page-dark">
    <div class="bg-illustration">${SVG.gridPattern(P.accent)}</div>
    <div class="content">
      <div class="section-head">
        <div class="section-num">01</div>
        <div class="section-head-text">
          <div class="section-tag">Overview</div>
          <h2>What is Agentic Creator OS?</h2>
        </div>
      </div>
      <p>ACOS is a production-grade AI operating system built on Claude Code. It combines <strong>specialized agents</strong>, a <strong>massive skill library</strong>, and <strong>intelligent routing</strong> to turn any creative or technical task into a streamlined workflow.</p>
      <p>Instead of managing prompts manually, you issue one command — <code>/acos</code> — and the system analyzes your intent, selects the right agent, activates relevant skills, and delivers production-ready output.</p>

      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-value">630+</div>
          <div class="stat-label">Skills</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">40+</div>
          <div class="stat-label">Agents</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">130+</div>
          <div class="stat-label">Commands</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">8</div>
          <div class="stat-label">Workflows</div>
        </div>
      </div>

      <div class="pull-quote">
        <p>"One command to route, analyze, create, deploy. ACOS turns intent into production output."</p>
      </div>
    </div>
    ${footer(P.short, 2, 10)}
  </div>

  <!-- PAGE 3: Architecture Diagram -->
  <div class="page page-light">
    <div class="content">
      <div class="section-head">
        <div class="section-num">02</div>
        <div class="section-head-text">
          <div class="section-tag">Architecture</div>
          <h2>How ACOS Works</h2>
        </div>
      </div>
      <p>Every interaction flows through a four-stage pipeline: your natural-language input is classified, routed to the optimal agent, enhanced with relevant skills, and executed with production quality.</p>

      <div class="mt-md">${SVG.archDiagram(P.accent, P.accentLight)}</div>

      <div class="feature-grid mt-md">
        <div class="feature-card">
          <div class="icon">${SVG.featureIcon(P.accent, 'brain')}</div>
          <h3>Smart Router</h3>
          <p>Analyzes intent, context, and task type to select the optimal agent and skill profile automatically.</p>
        </div>
        <div class="feature-card">
          <div class="icon">${SVG.featureIcon(P.accent, 'layers')}</div>
          <h3>Skill Profiles</h3>
          <p>22 auto-activation rules + 6 skill profiles ensure the right tools activate for every task.</p>
        </div>
        <div class="feature-card">
          <div class="icon">${SVG.featureIcon(P.accent, 'grid')}</div>
          <h3>Agent Pool</h3>
          <p>40+ specialized agents from Technical Architect to Music Producer, each with domain expertise.</p>
        </div>
        <div class="feature-card">
          <div class="icon">${SVG.featureIcon(P.accent, 'rocket')}</div>
          <h3>Production Output</h3>
          <p>Every output meets quality standards — deployed code, optimized content, tested results.</p>
        </div>
      </div>
    </div>
    ${footer(P.short, 3, 10)}
  </div>

  <!-- PAGE 4: Quick Start -->
  <div class="page page-dark">
    <div class="content">
      <div class="section-head">
        <div class="section-num">03</div>
        <div class="section-head-text">
          <div class="section-tag">Getting Started</div>
          <h2>Your First 5 Minutes</h2>
        </div>
      </div>
      <p>ACOS works on top of <strong>Claude Code CLI</strong>. If you have Claude Code installed, you already have everything you need.</p>

      <div class="flow-steps">
        <div class="flow-step">
          <div class="flow-step-num">1</div>
          <h3>Install</h3>
          <p>Clone the repo and install dependencies</p>
        </div>
        <div class="flow-step">
          <div class="flow-step-num">2</div>
          <h3>Configure</h3>
          <p>Set CLAUDE.md and skill profiles</p>
        </div>
        <div class="flow-step">
          <div class="flow-step-num">3</div>
          <h3>Route</h3>
          <p>Use /acos to auto-route any task</p>
        </div>
        <div class="flow-step">
          <div class="flow-step-num">4</div>
          <h3>Create</h3>
          <p>Build, deploy, ship</p>
        </div>
      </div>

      <div class="terminal">
        <div class="terminal-bar">
          <div class="terminal-dot dot-red"></div>
          <div class="terminal-dot dot-yellow"></div>
          <div class="terminal-dot dot-green"></div>
          <span class="terminal-title">Terminal — ACOS Setup</span>
        </div>
        <div class="terminal-body">
          <span class="t-dim"># Clone and enter the project</span><br/>
          <span class="t-prompt">$</span> <span class="t-cmd">git clone https://github.com/frankxai/agentic-creator-os</span><br/>
          <span class="t-prompt">$</span> <span class="t-cmd">cd agentic-creator-os</span><br/><br/>
          <span class="t-dim"># Open in Claude Code</span><br/>
          <span class="t-prompt">$</span> <span class="t-cmd">claude</span><br/><br/>
          <span class="t-dim"># Use the unified router</span><br/>
          <span class="t-prompt">$</span> <span class="t-cmd">/acos "Build me a landing page for my SaaS product"</span><br/>
          <span class="t-out">→ Routing to: Frontend Designer</span><br/>
          <span class="t-out">→ Skills activated: vercel-react, tailwind-css, web-design</span><br/>
          <span class="t-out">→ Building production components...</span><br/>
        </div>
      </div>
    </div>
    ${footer(P.short, 4, 10)}
  </div>

  <!-- PAGE 5: Core Commands -->
  <div class="page page-accent">
    <div class="content">
      <div class="section-head">
        <div class="section-num">04</div>
        <div class="section-head-text">
          <div class="section-tag">Commands</div>
          <h2>Essential Commands</h2>
        </div>
      </div>
      <p>ACOS provides a unified command surface. The primary <code>/acos</code> command auto-routes everything, but specialized commands exist for direct access.</p>

      <h3 class="mt-md mb-sm" style="color: var(--accent);">Primary Commands</h3>
      <div class="cmd-grid">
        <div class="cmd-item"><span class="cmd-name">/acos</span><span class="cmd-desc">Universal smart router</span></div>
        <div class="cmd-item"><span class="cmd-name">/frankx-ai-build</span><span class="cmd-desc">Full build session</span></div>
        <div class="cmd-item"><span class="cmd-name">/frankx-ai-deploy</span><span class="cmd-desc">Deploy to production</span></div>
        <div class="cmd-item"><span class="cmd-name">/frankx-ai-blog</span><span class="cmd-desc">Create blog content</span></div>
        <div class="cmd-item"><span class="cmd-name">/frankx-ai-seo</span><span class="cmd-desc">SEO optimization</span></div>
        <div class="cmd-item"><span class="cmd-name">/frankx-ai-components</span><span class="cmd-desc">UI component dev</span></div>
      </div>

      <h3 class="mt-md mb-sm" style="color: var(--accent);">Creative & Agentic</h3>
      <div class="cmd-grid">
        <div class="cmd-item"><span class="cmd-name">/ultraworld</span><span class="cmd-desc">Creative swarm world-building</span></div>
        <div class="cmd-item"><span class="cmd-name">/acos-swarm</span><span class="cmd-desc">Multi-agent swarm ops</span></div>
        <div class="cmd-item"><span class="cmd-name">/acos-flow</span><span class="cmd-desc">Workflow orchestration</span></div>
        <div class="cmd-item"><span class="cmd-name">/acos-agents</span><span class="cmd-desc">Agent management</span></div>
        <div class="cmd-item"><span class="cmd-name">/acos-memory</span><span class="cmd-desc">Memory & learning</span></div>
        <div class="cmd-item"><span class="cmd-name">/agentic-jujutsu</span><span class="cmd-desc">Trajectory learning</span></div>
      </div>

      <h3 class="mt-md mb-sm" style="color: var(--accent);">Content Pipeline</h3>
      <div class="cmd-grid">
        <div class="cmd-item"><span class="cmd-name">/frankx-ai-content-pipeline</span><span class="cmd-desc">End-to-end content</span></div>
        <div class="cmd-item"><span class="cmd-name">/frankx-ai-products</span><span class="cmd-desc">Product creation</span></div>
        <div class="cmd-item"><span class="cmd-name">/frankx-ai-prompts</span><span class="cmd-desc">Prompt library</span></div>
        <div class="cmd-item"><span class="cmd-name">/frankx-ai-analytics</span><span class="cmd-desc">Site analytics</span></div>
      </div>
    </div>
    ${footer(P.short, 5, 10)}
  </div>

  <!-- PAGE 6: Smart Routing -->
  <div class="page page-light">
    <div class="content">
      <div class="section-head">
        <div class="section-num">05</div>
        <div class="section-head-text">
          <div class="section-tag">Intelligence</div>
          <h2>Smart Routing System</h2>
        </div>
      </div>
      <p>The <code>/acos</code> router uses intent classification to match your natural language request to the optimal agent profile, skill combination, and workflow.</p>

      <table class="mt-md">
        <thead>
          <tr><th>Your Request</th><th>Routed Agent</th><th>Skills Activated</th></tr>
        </thead>
        <tbody>
          <tr><td>"Build a landing page"</td><td>Frontend Designer</td><td>vercel-react, tailwind, web-design</td></tr>
          <tr><td>"Write a blog post about AI agents"</td><td>Content Engine</td><td>seo-content-writer, schema-markup</td></tr>
          <tr><td>"Create a Suno prompt for lo-fi"</td><td>Music Producer</td><td>suno-ai-mastery, prompt-architect</td></tr>
          <tr><td>"Design a multi-agent system"</td><td>Technical Architect</td><td>ai-agents-architect, architecture-patterns</td></tr>
          <tr><td>"Optimize my site for search"</td><td>SEO Intelligence</td><td>seo-fundamentals, keyword-strategist</td></tr>
          <tr><td>"Deploy to production"</td><td>DevOps Engineer</td><td>vercel-deployment, github-actions</td></tr>
        </tbody>
      </table>

      <div class="pull-quote mt-md">
        <p>"You don't need to know which agent to use. Describe what you want — ACOS figures out the rest."</p>
      </div>
    </div>
    ${footer(P.short, 6, 10)}
  </div>

  <!-- PAGE 7: Agent Profiles -->
  <div class="page page-dark">
    <div class="content">
      <div class="section-head">
        <div class="section-num">06</div>
        <div class="section-head-text">
          <div class="section-tag">Agents</div>
          <h2>Specialized Agent Profiles</h2>
        </div>
      </div>
      <p>Each agent is a specialized AI profile with domain expertise, curated skill sets, and production-quality output standards.</p>

      <div class="feature-grid">
        <div class="feature-card">
          <div class="icon">${SVG.featureIcon(P.accent, 'code')}</div>
          <h3>Technical Architect</h3>
          <p>Enterprise AI systems, Oracle Cloud, agentic orchestration, API design, system architecture.</p>
        </div>
        <div class="feature-card">
          <div class="icon">${SVG.featureIcon(P.accent, 'music')}</div>
          <h3>Music Producer</h3>
          <p>Suno AI prompts, genre production, commercial licensing, audio engineering.</p>
        </div>
        <div class="feature-card">
          <div class="icon">${SVG.featureIcon(P.accent, 'star')}</div>
          <h3>Content Engine</h3>
          <p>Blog articles, technical writing, course development, product launches, SEO.</p>
        </div>
        <div class="feature-card">
          <div class="icon">${SVG.featureIcon(P.accent, 'bolt')}</div>
          <h3>SEO Intelligence</h3>
          <p>AI citation optimization, keyword clusters, schema markup, performance analysis.</p>
        </div>
        <div class="feature-card">
          <div class="icon">${SVG.featureIcon(P.accent, 'layers')}</div>
          <h3>Frontend Designer</h3>
          <p>Glassmorphic UI, accessibility, Tailwind patterns, React components, performance.</p>
        </div>
        <div class="feature-card">
          <div class="icon">${SVG.featureIcon(P.accent, 'rocket')}</div>
          <h3>DevOps Engineer</h3>
          <p>Vercel deployments, CI/CD pipelines, monitoring, GitHub Actions, infrastructure.</p>
        </div>
      </div>

      <p class="muted mt-sm">Plus 34+ additional specialized agents for research, design, security, testing, and more.</p>
    </div>
    ${footer(P.short, 7, 10)}
  </div>

  <!-- PAGE 8: Skill System -->
  <div class="page page-light">
    <div class="content">
      <div class="section-head">
        <div class="section-num">07</div>
        <div class="section-head-text">
          <div class="section-tag">Skills</div>
          <h2>The 630+ Skill Library</h2>
        </div>
      </div>
      <p>Skills are modular expertise packages that auto-activate based on context. ACOS uses <strong>22 auto-activation rules</strong> and <strong>6 curated skill profiles</strong> to ensure the right capabilities are always available.</p>

      <div class="two-col mt-md">
        <div>
          <h3 style="color: var(--accent);">Skill Categories</h3>
          <table>
            <tbody>
              <tr><td><strong>Frontend & UI</strong></td><td>85+ skills</td></tr>
              <tr><td><strong>Backend & API</strong></td><td>70+ skills</td></tr>
              <tr><td><strong>AI & Agents</strong></td><td>45+ skills</td></tr>
              <tr><td><strong>SEO & Content</strong></td><td>40+ skills</td></tr>
              <tr><td><strong>DevOps & CI/CD</strong></td><td>55+ skills</td></tr>
              <tr><td><strong>Security</strong></td><td>35+ skills</td></tr>
              <tr><td><strong>Testing</strong></td><td>30+ skills</td></tr>
              <tr><td><strong>Database</strong></td><td>25+ skills</td></tr>
              <tr><td><strong>Creative</strong></td><td>50+ skills</td></tr>
              <tr><td><strong>Specialized</strong></td><td>195+ skills</td></tr>
            </tbody>
          </table>
        </div>
        <div>
          <h3 style="color: var(--accent);">Skill Profiles</h3>
          <div class="card mb-sm">
            <h3>Full Stack Creator</h3>
            <p class="muted">Vercel + React + Tailwind + Next.js patterns</p>
          </div>
          <div class="card mb-sm">
            <h3>AI Architect</h3>
            <p class="muted">Agent design + RAG + LLM patterns</p>
          </div>
          <div class="card mb-sm">
            <h3>Content Producer</h3>
            <p class="muted">SEO + writing + schema markup</p>
          </div>
          <div class="card mb-sm">
            <h3>Music Engineer</h3>
            <p class="muted">Suno + audio + prompt crafting</p>
          </div>
          <div class="card mb-sm">
            <h3>DevOps</h3>
            <p class="muted">CI/CD + Docker + K8s + monitoring</p>
          </div>
          <div class="card">
            <h3>Security</h3>
            <p class="muted">Audit + pentest + compliance</p>
          </div>
        </div>
      </div>
    </div>
    ${footer(P.short, 8, 10)}
  </div>

  <!-- PAGE 9: Workflows -->
  <div class="page page-dark">
    <div class="content">
      <div class="section-head">
        <div class="section-num">08</div>
        <div class="section-head-text">
          <div class="section-tag">Workflows</div>
          <h2>Production Workflows</h2>
        </div>
      </div>
      <p>ACOS includes 8 battle-tested workflows that chain multiple agents and skills for end-to-end execution.</p>

      <div class="feature-grid">
        <div class="feature-card card-accent">
          <h3>Content Pipeline</h3>
          <p>Research → Write → SEO → Publish. End-to-end content with keyword clusters and schema markup.</p>
        </div>
        <div class="feature-card card-accent">
          <h3>Build & Deploy</h3>
          <p>Code → Test → Review → Deploy. Full CI/CD with Vercel integration and quality gates.</p>
        </div>
        <div class="feature-card card-accent">
          <h3>Product Launch</h3>
          <p>Design → Build → Content → Deploy. Complete product creation from concept to live.</p>
        </div>
        <div class="feature-card card-accent">
          <h3>Research Deep-Dive</h3>
          <p>Discover → Validate → Synthesize → Publish. Multi-source research with citation tracking.</p>
        </div>
      </div>

      <div class="terminal mt-md">
        <div class="terminal-bar">
          <div class="terminal-dot dot-red"></div>
          <div class="terminal-dot dot-yellow"></div>
          <div class="terminal-dot dot-green"></div>
          <span class="terminal-title">Terminal — Content Pipeline</span>
        </div>
        <div class="terminal-body">
          <span class="t-prompt">$</span> <span class="t-cmd">/frankx-ai-content-pipeline "AI coding assistants 2026"</span><br/><br/>
          <span class="t-out">→ Phase 1: Research</span><br/>
          <span class="t-dim">  Analyzing 12 sources... validated 8 claims</span><br/>
          <span class="t-out">→ Phase 2: Content</span><br/>
          <span class="t-dim">  Drafting 2,400 words... SEO score: 94/100</span><br/>
          <span class="t-out">→ Phase 3: Optimization</span><br/>
          <span class="t-dim">  Schema markup added... 5 internal links</span><br/>
          <span class="t-out">→ Phase 4: Deploy</span><br/>
          <span class="t-dim">  Published to frankx.ai/blog/ai-coding-assistants-2026</span><br/>
          <span class="t-accent">✓ Complete in 4m 32s</span>
        </div>
      </div>
    </div>
    ${footer(P.short, 9, 10)}
  </div>

  <!-- PAGE 10: Next Steps -->
  <div class="page page-cover">
    <div class="cover-glow"></div>
    <div class="cover-content">
      <div class="cover-badge">Get Started</div>
      <h1 class="cover-title" style="font-size: 44px;">Start Building<br/>with ACOS</h1>
      <div class="cover-divider"></div>
      <p class="cover-subtitle">Clone the repo, open Claude Code, and type <code style="background: rgba(67,191,227,0.15); color: #67E8F9;">/acos</code> to begin.</p>

      <div class="stats-row" style="max-width: 500px; margin-top: 40px;">
        <div class="stat-card" style="background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.06);">
          <div class="stat-value" style="font-size: 28px;">GitHub</div>
          <div class="stat-label">Open Source</div>
        </div>
        <div class="stat-card" style="background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.06);">
          <div class="stat-value" style="font-size: 28px;">frankx.ai</div>
          <div class="stat-label">Documentation</div>
        </div>
      </div>

      <p class="cover-meta" style="margin-top: 48px;">FRANKX &nbsp;|&nbsp; Agentic Creator OS v7.0 &nbsp;|&nbsp; Build what matters.</p>
    </div>
  </div>

  </body></html>`
}

// ═══════════════════════════════════════════════════════════════════
// ACOS COMPLETE REFERENCE (10 pages)
// ═══════════════════════════════════════════════════════════════════
function acosReferenceHTML() {
  const P = PRODUCTS.acos
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${premiumStyles(P.accent, P.accentLight)}</style></head><body>

  <!-- PAGE 1: Cover -->
  <div class="page page-cover">
    <div class="cover-glow"></div>
    <div class="cover-content">
      <div class="cover-badge">Complete Reference</div>
      <div class="cover-illustration">${SVG.constellation(P.accent, P.accentLight, 360, 200)}</div>
      <h1 class="cover-title">ACOS<br/>Reference</h1>
      <div class="cover-divider"></div>
      <p class="cover-subtitle">The definitive guide to every command, agent, skill, and workflow in the Agentic Creator OS.</p>
      <p class="cover-meta">FRANKX &nbsp;|&nbsp; v7.0 &nbsp;|&nbsp; 2026</p>
    </div>
  </div>

  <!-- PAGE 2: System Overview -->
  <div class="page page-dark">
    <div class="bg-illustration">${SVG.gridPattern(P.accent)}</div>
    <div class="content">
      <div class="section-head">
        <div class="section-num">01</div>
        <div class="section-head-text">
          <div class="section-tag">System</div>
          <h2>System Architecture</h2>
        </div>
      </div>
      <p>ACOS v7.0 is built on a layered architecture: <strong>CLAUDE.md</strong> defines the system, <strong>skill-rules.json</strong> manages auto-activation, <strong>commands/</strong> contain slash command definitions, and <strong>hooks/</strong> automate lifecycle events.</p>

      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-value">46</div>
          <div class="stat-label">Core Commands</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">37</div>
          <div class="stat-label">ACOS Commands</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">22</div>
          <div class="stat-label">Auto Rules</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">20+</div>
          <div class="stat-label">Hooks</div>
        </div>
      </div>

      <div class="mt-md">${SVG.archDiagram(P.accent, P.accentLight)}</div>
    </div>
    ${footer(P.short, 2, 10)}
  </div>

  <!-- PAGE 3: Command Reference Part 1 -->
  <div class="page page-light">
    <div class="content">
      <div class="section-head">
        <div class="section-num">02</div>
        <div class="section-head-text">
          <div class="section-tag">Commands</div>
          <h2>Command Reference: Core</h2>
        </div>
      </div>

      <table>
        <thead><tr><th>Command</th><th>Category</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>/acos</code></td><td>Router</td><td>Universal auto-router — classifies intent and routes to optimal agent</td></tr>
          <tr><td><code>/frankx-ai-build</code></td><td>Dev</td><td>Full build session with quality gates and testing</td></tr>
          <tr><td><code>/frankx-ai-deploy</code></td><td>DevOps</td><td>Two-repo production deployment to frankx.ai</td></tr>
          <tr><td><code>/frankx-ai-blog</code></td><td>Content</td><td>Create SEO-optimized blog post with schema markup</td></tr>
          <tr><td><code>/frankx-ai-seo</code></td><td>SEO</td><td>Site-wide SEO analysis and optimization</td></tr>
          <tr><td><code>/frankx-ai-components</code></td><td>UI</td><td>React component development with Tailwind</td></tr>
          <tr><td><code>/frankx-ai-content-pipeline</code></td><td>Content</td><td>End-to-end content: research → write → SEO → publish</td></tr>
          <tr><td><code>/frankx-ai-products</code></td><td>Product</td><td>Digital product creation and launch workflow</td></tr>
          <tr><td><code>/frankx-ai-prompts</code></td><td>AI</td><td>Prompt library management and generation</td></tr>
          <tr><td><code>/frankx-ai-analytics</code></td><td>Data</td><td>Site analytics and performance monitoring</td></tr>
          <tr><td><code>/frankx-ai-daily</code></td><td>Ops</td><td>Daily operations and task management</td></tr>
        </tbody>
      </table>
    </div>
    ${footer(P.short, 3, 10)}
  </div>

  <!-- PAGE 4: Command Reference Part 2 -->
  <div class="page page-dark">
    <div class="content">
      <div class="section-head">
        <div class="section-num">03</div>
        <div class="section-head-text">
          <div class="section-tag">Commands</div>
          <h2>Command Reference: Agentic</h2>
        </div>
      </div>

      <table>
        <thead><tr><th>Command</th><th>Category</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>/ultraworld</code></td><td>Creative</td><td>Arcanean swarm world-building — 7 creative agents</td></tr>
          <tr><td><code>/acos-swarm</code></td><td>Multi-Agent</td><td>Swarm coordination for parallel agent execution</td></tr>
          <tr><td><code>/acos-flow</code></td><td>Workflow</td><td>Workflow orchestration and pipeline management</td></tr>
          <tr><td><code>/acos-agents</code></td><td>Agents</td><td>Agent lifecycle: spawn, monitor, coordinate</td></tr>
          <tr><td><code>/acos-memory</code></td><td>Memory</td><td>Persistent memory and cross-session learning</td></tr>
          <tr><td><code>/acos-checkpoint</code></td><td>State</td><td>Session state checkpointing and recovery</td></tr>
          <tr><td><code>/agentic-jujutsu</code></td><td>Learning</td><td>Trajectory extraction and pattern learning</td></tr>
        </tbody>
      </table>

      <h3 class="mt-md mb-sm" style="color: var(--accent);">Advanced Orchestration</h3>
      <table>
        <thead><tr><th>Command</th><th>Category</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>/claude-flow-swarm</code></td><td>Internal</td><td>Low-level swarm spawning and control</td></tr>
          <tr><td><code>/claude-flow-memory</code></td><td>Internal</td><td>Neural memory persistence layer</td></tr>
          <tr><td><code>/claude-flow-sparc</code></td><td>Internal</td><td>SPARC methodology execution</td></tr>
          <tr><td><code>/claude-flow-agents</code></td><td>Internal</td><td>Agent type registry and capabilities</td></tr>
        </tbody>
      </table>

      <div class="pull-quote mt-md">
        <p>"83 internal claude-flow commands were absorbed into ACOS v7.0 — never surfaced to users, always working behind the scenes."</p>
      </div>
    </div>
    ${footer(P.short, 4, 10)}
  </div>

  <!-- PAGE 5: Agent Profiles Reference -->
  <div class="page page-light">
    <div class="content">
      <div class="section-head">
        <div class="section-num">04</div>
        <div class="section-head-text">
          <div class="section-tag">Agents</div>
          <h2>Agent Reference</h2>
        </div>
      </div>

      <div class="feature-grid">
        <div class="feature-card">
          <div class="icon">${SVG.featureIcon(P.accent, 'code')}</div>
          <h3>Technical Architect</h3>
          <p><strong>Skills:</strong> architecture-patterns, ai-agents-architect, api-design, oracle-adk</p>
          <p><strong>Triggers:</strong> architecture, system design, backend, API</p>
        </div>
        <div class="feature-card">
          <div class="icon">${SVG.featureIcon(P.accent, 'music')}</div>
          <h3>Music Producer</h3>
          <p><strong>Skills:</strong> suno-ai-mastery, suno-prompt-architect</p>
          <p><strong>Triggers:</strong> suno, music, song, audio</p>
        </div>
        <div class="feature-card">
          <div class="icon">${SVG.featureIcon(P.accent, 'star')}</div>
          <h3>Content Engine</h3>
          <p><strong>Skills:</strong> frankx-brand, seo-content-writer, schema-markup</p>
          <p><strong>Triggers:</strong> article, blog, content, post</p>
        </div>
        <div class="feature-card">
          <div class="icon">${SVG.featureIcon(P.accent, 'bolt')}</div>
          <h3>SEO Intelligence</h3>
          <p><strong>Skills:</strong> seo-fundamentals, keyword-strategist, schema-markup</p>
          <p><strong>Triggers:</strong> seo, keywords, rankings</p>
        </div>
        <div class="feature-card">
          <div class="icon">${SVG.featureIcon(P.accent, 'layers')}</div>
          <h3>Frontend Designer</h3>
          <p><strong>Skills:</strong> vercel-react, web-design, shadcn-ui, tailwind, accessibility</p>
          <p><strong>Triggers:</strong> component, design, ui, ux</p>
        </div>
        <div class="feature-card">
          <div class="icon">${SVG.featureIcon(P.accent, 'rocket')}</div>
          <h3>DevOps Engineer</h3>
          <p><strong>Skills:</strong> vercel-deployment, docker, github-actions</p>
          <p><strong>Triggers:</strong> deploy, build, ci, pipeline</p>
        </div>
      </div>
    </div>
    ${footer(P.short, 5, 10)}
  </div>

  <!-- PAGE 6: Skill System -->
  <div class="page page-dark">
    <div class="content">
      <div class="section-head">
        <div class="section-num">05</div>
        <div class="section-head-text">
          <div class="section-tag">Skills</div>
          <h2>Auto-Activation Rules</h2>
        </div>
      </div>
      <p>The <code>skill-rules.json</code> system uses 22 rules to automatically activate skills based on file patterns, keywords, and task context. 5 core skills are always active.</p>

      <h3 class="mt-md mb-sm" style="color: var(--accent);">Always Active (Core 5)</h3>
      <div class="cmd-grid">
        <div class="cmd-item"><span class="cmd-name">frankx-brand</span><span class="cmd-desc">Brand voice & guidelines</span></div>
        <div class="cmd-item"><span class="cmd-name">clean-code</span><span class="cmd-desc">Code quality standards</span></div>
        <div class="cmd-item"><span class="cmd-name">next-best-practices</span><span class="cmd-desc">Next.js patterns</span></div>
        <div class="cmd-item"><span class="cmd-name">typescript-docs</span><span class="cmd-desc">TypeScript standards</span></div>
        <div class="cmd-item"><span class="cmd-name">vercel-react</span><span class="cmd-desc">React optimization</span></div>
      </div>

      <h3 class="mt-md mb-sm" style="color: var(--accent);">Sample Activation Rules</h3>
      <table>
        <thead><tr><th>Trigger</th><th>Pattern</th><th>Skills Activated</th></tr></thead>
        <tbody>
          <tr><td>File: <code>*.tsx</code></td><td>Component files</td><td>vercel-react, tailwind-css, shadcn-ui</td></tr>
          <tr><td>File: <code>*.mdx</code></td><td>Blog content</td><td>seo-content-writer, schema-markup</td></tr>
          <tr><td>Keyword: "deploy"</td><td>Deployment tasks</td><td>vercel-deployment, github-actions</td></tr>
          <tr><td>Keyword: "suno"</td><td>Music creation</td><td>suno-ai-mastery, suno-prompt-architect</td></tr>
          <tr><td>Keyword: "agent"</td><td>Agent design</td><td>ai-agents-architect, autonomous-agents</td></tr>
          <tr><td>Context: Arcanea</td><td>Creative gates</td><td>Gate-specific skills (10 gates mapped)</td></tr>
        </tbody>
      </table>
    </div>
    ${footer(P.short, 6, 10)}
  </div>

  <!-- PAGE 7: Hooks & Automation -->
  <div class="page page-accent">
    <div class="content">
      <div class="section-head">
        <div class="section-num">06</div>
        <div class="section-head-text">
          <div class="section-tag">Automation</div>
          <h2>Hooks & Lifecycle Events</h2>
        </div>
      </div>
      <p>ACOS hooks into 7 lifecycle events with 20+ automation hooks, executing shell scripts and Node.js hooks automatically during session and task lifecycles.</p>

      <div class="feature-grid">
        <div class="feature-card">
          <h3>SessionStart</h3>
          <p>Loads context, initializes learning trajectories, activates skill profiles, sets output style.</p>
        </div>
        <div class="feature-card">
          <h3>UserPromptSubmit</h3>
          <p>Classifies intent, suggests skills, activates brand guidelines, logs context.</p>
        </div>
        <div class="feature-card">
          <h3>PreToolUse</h3>
          <p>Validates tool permissions, applies security policies, manages file access.</p>
        </div>
        <div class="feature-card">
          <h3>PostToolUse</h3>
          <p>Logs tool usage, updates trajectory data, triggers quality checks.</p>
        </div>
      </div>

      <div class="terminal mt-md">
        <div class="terminal-bar">
          <div class="terminal-dot dot-red"></div>
          <div class="terminal-dot dot-yellow"></div>
          <div class="terminal-dot dot-green"></div>
          <span class="terminal-title">Hook Execution Log</span>
        </div>
        <div class="terminal-body">
          <span class="t-out">[SessionStart]</span> <span class="t-dim">Loading context...</span><br/>
          <span class="t-dim">  → resume hook: ✓ ACOS Session Context loaded</span><br/>
          <span class="t-dim">  → learning hook: ✓ 23 trajectories, 22 patterns</span><br/>
          <span class="t-dim">  → output-style hook: ✓ explanatory mode</span><br/><br/>
          <span class="t-out">[UserPromptSubmit]</span> <span class="t-dim">Classifying intent...</span><br/>
          <span class="t-dim">  → skill-suggest hook: ✓ 3 skills recommended</span><br/>
          <span class="t-dim">  → brand hook: ✓ frankx-brand activated</span><br/>
          <span class="t-accent">✓ All hooks executed in 0.8s</span>
        </div>
      </div>
    </div>
    ${footer(P.short, 7, 10)}
  </div>

  <!-- PAGE 8: Memory & Learning -->
  <div class="page page-light">
    <div class="content">
      <div class="section-head">
        <div class="section-num">07</div>
        <div class="section-head-text">
          <div class="section-tag">Intelligence</div>
          <h2>Memory & Learning</h2>
        </div>
      </div>
      <p>ACOS maintains persistent memory across sessions and uses <strong>Agentic Jujutsu</strong> to extract successful patterns from past interactions, continuously improving performance.</p>

      <div class="two-col">
        <div>
          <h3 style="color: var(--accent);">Memory Layers</h3>
          <div class="card mb-sm">
            <h3>MEMORY.md</h3>
            <p>Auto-loaded system prompt. Architecture decisions, patterns, workarounds. Kept under 200 lines.</p>
          </div>
          <div class="card mb-sm">
            <h3>Topic Files</h3>
            <p>Detailed notes organized by topic: debugging.md, patterns.md, blog-design-patterns.md.</p>
          </div>
          <div class="card">
            <h3>MCP Memory</h3>
            <p>Knowledge graph via MCP server — entities, relations, observations across sessions.</p>
          </div>
        </div>
        <div>
          <h3 style="color: var(--accent);">Agentic Jujutsu</h3>
          <div class="card mb-sm">
            <h3>Trajectory Tracking</h3>
            <p>Every session records tool sequences, outcomes, and success rates.</p>
          </div>
          <div class="card mb-sm">
            <h3>Pattern Extraction</h3>
            <p>Successful tool sequences are extracted and stored for reuse.</p>
          </div>
          <div class="card">
            <h3>Self-Improvement</h3>
            <p>Patterns inform future routing decisions, improving over time.</p>
          </div>
        </div>
      </div>
    </div>
    ${footer(P.short, 8, 10)}
  </div>

  <!-- PAGE 9: Configuration -->
  <div class="page page-dark">
    <div class="content">
      <div class="section-head">
        <div class="section-num">08</div>
        <div class="section-head-text">
          <div class="section-tag">Config</div>
          <h2>Configuration Reference</h2>
        </div>
      </div>

      <h3 class="mb-sm" style="color: var(--accent);">File Structure</h3>
      <div class="terminal">
        <div class="terminal-bar">
          <div class="terminal-dot dot-red"></div>
          <div class="terminal-dot dot-yellow"></div>
          <div class="terminal-dot dot-green"></div>
          <span class="terminal-title">ACOS Directory Structure</span>
        </div>
        <div class="terminal-body">
          <span class="t-accent">.claude/</span><br/>
          <span class="t-dim">├──</span> <span class="t-out">commands/</span>     <span class="t-dim"># 46+ slash command definitions</span><br/>
          <span class="t-dim">├──</span> <span class="t-out">agents/</span>       <span class="t-dim"># Agent profile definitions</span><br/>
          <span class="t-dim">├──</span> <span class="t-out">skills/</span>       <span class="t-dim"># Local skill rules & profiles</span><br/>
          <span class="t-dim">├──</span> <span class="t-out">hooks/</span>        <span class="t-dim"># 4 shell + 4 JS hooks</span><br/>
          <span class="t-dim">├──</span> <span class="t-out">context/</span>      <span class="t-dim"># Decision framework, identity</span><br/>
          <span class="t-dim">├──</span> <span class="t-out">planning/</span>     <span class="t-dim"># Task plans and strategies</span><br/>
          <span class="t-dim">└──</span> <span class="t-out">settings.json</span> <span class="t-dim"># Permissions and config</span><br/><br/>
          <span class="t-accent">CLAUDE.md</span>         <span class="t-dim"># System definition — the brain</span><br/>
          <span class="t-accent">skill-rules.json</span>  <span class="t-dim"># 22 auto-activation rules</span>
        </div>
      </div>

      <h3 class="mt-md mb-sm" style="color: var(--accent);">Key Configuration Files</h3>
      <table>
        <thead><tr><th>File</th><th>Purpose</th><th>Format</th></tr></thead>
        <tbody>
          <tr><td><code>CLAUDE.md</code></td><td>Master system prompt — brand, agents, routing</td><td>Markdown</td></tr>
          <tr><td><code>skill-rules.json</code></td><td>Auto-activation rules and skill profiles</td><td>JSON</td></tr>
          <tr><td><code>settings.local.json</code></td><td>Tool permissions and allowed commands</td><td>JSON</td></tr>
          <tr><td><code>.frankx/brand.md</code></td><td>Brand voice and design guidelines</td><td>Markdown</td></tr>
          <tr><td><code>MEMORY.md</code></td><td>Persistent auto-memory (< 200 lines)</td><td>Markdown</td></tr>
        </tbody>
      </table>
    </div>
    ${footer(P.short, 9, 10)}
  </div>

  <!-- PAGE 10: Back Cover -->
  <div class="page page-cover">
    <div class="cover-glow"></div>
    <div class="cover-content">
      <div class="cover-badge">Reference v7.0</div>
      <h1 class="cover-title" style="font-size: 40px;">Agentic<br/>Creator OS</h1>
      <div class="cover-divider"></div>
      <p class="cover-subtitle">630+ skills. 40+ agents. 130+ commands.<br/>One operating system for everything you create.</p>
      <p class="cover-meta" style="margin-top: 40px;">frankx.ai &nbsp;|&nbsp; github.com/frankxai/agentic-creator-os</p>
      <p class="cover-meta" style="margin-top: 8px;">Build what matters.</p>
    </div>
  </div>

  </body></html>`
}

// ═══════════════════════════════════════════════════════════════════
// ACOS CUSTOM AGENT GUIDE (5 pages)
// ═══════════════════════════════════════════════════════════════════
function acosAgentGuideHTML() {
  const P = PRODUCTS.acos
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${premiumStyles(P.accent, P.accentLight)}</style></head><body>

  <!-- PAGE 1: Cover -->
  <div class="page page-cover">
    <div class="cover-glow"></div>
    <div class="cover-content">
      <div class="cover-badge">Agent Guide</div>
      <div class="cover-illustration">${SVG.constellation(P.accent, P.accentLight, 300, 180)}</div>
      <h1 class="cover-title" style="font-size: 48px;">Custom<br/>Agent Guide</h1>
      <div class="cover-divider"></div>
      <p class="cover-subtitle">Build specialized AI agents with the ACOS framework. Design, configure, test, and deploy.</p>
      <p class="cover-meta">FRANKX &nbsp;|&nbsp; Agentic Creator OS &nbsp;|&nbsp; 2026</p>
    </div>
  </div>

  <!-- PAGE 2: Agent Architecture -->
  <div class="page page-light">
    <div class="content">
      <div class="section-head">
        <div class="section-num">01</div>
        <div class="section-head-text">
          <div class="section-tag">Architecture</div>
          <h2>Agent Anatomy</h2>
        </div>
      </div>
      <p>Every ACOS agent has four components: a <strong>profile definition</strong> (role, expertise), a <strong>skill set</strong> (capabilities), <strong>trigger patterns</strong> (when to activate), and <strong>output standards</strong> (quality expectations).</p>

      <div class="flow-steps mt-md">
        <div class="flow-step">
          <div class="flow-step-num">1</div>
          <h3>Profile</h3>
          <p>Name, role, expertise area</p>
        </div>
        <div class="flow-step">
          <div class="flow-step-num">2</div>
          <h3>Skills</h3>
          <p>Curated skill packages</p>
        </div>
        <div class="flow-step">
          <div class="flow-step-num">3</div>
          <h3>Triggers</h3>
          <p>Keywords, file types, context</p>
        </div>
        <div class="flow-step">
          <div class="flow-step-num">4</div>
          <h3>Standards</h3>
          <p>Output quality criteria</p>
        </div>
      </div>

      <div class="terminal mt-md">
        <div class="terminal-bar">
          <div class="terminal-dot dot-red"></div>
          <div class="terminal-dot dot-yellow"></div>
          <div class="terminal-dot dot-green"></div>
          <span class="terminal-title">Agent Definition — YAML Format</span>
        </div>
        <div class="terminal-body">
          <span class="t-accent">name</span><span class="t-dim">:</span> <span class="t-out">Data Analyst</span><br/>
          <span class="t-accent">role</span><span class="t-dim">:</span> <span class="t-out">Data Analysis & Visualization</span><br/>
          <span class="t-accent">skills</span><span class="t-dim">:</span><br/>
          <span class="t-dim">  -</span> <span class="t-out">data-scientist</span><br/>
          <span class="t-dim">  -</span> <span class="t-out">d3-viz</span><br/>
          <span class="t-dim">  -</span> <span class="t-out">sql-optimization</span><br/>
          <span class="t-accent">focus</span><span class="t-dim">:</span><br/>
          <span class="t-dim">  -</span> <span class="t-out">Data pipeline design</span><br/>
          <span class="t-dim">  -</span> <span class="t-out">SQL optimization</span><br/>
          <span class="t-dim">  -</span> <span class="t-out">Dashboard creation</span><br/>
          <span class="t-accent">triggers</span><span class="t-dim">:</span> <span class="t-out">data, analytics, SQL, dashboard</span>
        </div>
      </div>
    </div>
    ${footer(P.short, 2, 5)}
  </div>

  <!-- PAGE 3: Building an Agent -->
  <div class="page page-dark">
    <div class="content">
      <div class="section-head">
        <div class="section-num">02</div>
        <div class="section-head-text">
          <div class="section-tag">Tutorial</div>
          <h2>Build Your First Agent</h2>
        </div>
      </div>

      <p><strong>Step 1: Define the profile</strong> in your CLAUDE.md under the Agent Profiles section.</p>
      <div class="card mb-sm">
        <p>Choose a specific <strong>domain</strong> — not "general purpose" but something focused like "E-commerce Optimization" or "Data Pipeline Engineering".</p>
      </div>

      <p><strong>Step 2: Select skills</strong> from the 630+ skill library.</p>
      <div class="terminal">
        <div class="terminal-bar">
          <div class="terminal-dot dot-red"></div>
          <div class="terminal-dot dot-yellow"></div>
          <div class="terminal-dot dot-green"></div>
          <span class="terminal-title">Finding Skills</span>
        </div>
        <div class="terminal-body">
          <span class="t-dim"># List all available skills</span><br/>
          <span class="t-prompt">$</span> <span class="t-cmd">npx skills list -g</span><br/><br/>
          <span class="t-dim"># Add a new skill globally</span><br/>
          <span class="t-prompt">$</span> <span class="t-cmd">npx skills add owner/repo -y -g</span><br/><br/>
          <span class="t-dim"># Skills are stored at ~/.agents/skills/</span>
        </div>
      </div>

      <p class="mt-md"><strong>Step 3: Add auto-activation rules</strong> in <code>skill-rules.json</code>.</p>
      <div class="terminal">
        <div class="terminal-bar">
          <div class="terminal-dot dot-red"></div>
          <div class="terminal-dot dot-yellow"></div>
          <div class="terminal-dot dot-green"></div>
          <span class="terminal-title">skill-rules.json</span>
        </div>
        <div class="terminal-body">
          <span class="t-dim">{</span><br/>
          <span class="t-accent">  "name"</span><span class="t-dim">:</span> <span class="t-out">"data-work"</span><span class="t-dim">,</span><br/>
          <span class="t-accent">  "match"</span><span class="t-dim">:</span> <span class="t-out">["*.sql", "*.csv", "data/*"]</span><span class="t-dim">,</span><br/>
          <span class="t-accent">  "skills"</span><span class="t-dim">:</span> <span class="t-out">["data-scientist", "sql-pro"]</span><br/>
          <span class="t-dim">}</span>
        </div>
      </div>

      <p class="mt-md"><strong>Step 4: Configure trigger keywords</strong> so the <code>/acos</code> router activates your agent automatically.</p>
    </div>
    ${footer(P.short, 3, 5)}
  </div>

  <!-- PAGE 4: Best Practices -->
  <div class="page page-light">
    <div class="content">
      <div class="section-head">
        <div class="section-num">03</div>
        <div class="section-head-text">
          <div class="section-tag">Best Practices</div>
          <h2>Agent Design Principles</h2>
        </div>
      </div>

      <div class="feature-grid">
        <div class="feature-card">
          <div class="icon">${SVG.featureIcon(P.accent, 'bolt')}</div>
          <h3>Single Responsibility</h3>
          <p>Each agent should excel at one domain. A "Frontend Designer" that also does backend work is a "General Assistant" — avoid that.</p>
        </div>
        <div class="feature-card">
          <div class="icon">${SVG.featureIcon(P.accent, 'layers')}</div>
          <h3>Curated Skills</h3>
          <p>5-8 core skills per agent. Too many dilutes expertise. Pick the best, not the most.</p>
        </div>
        <div class="feature-card">
          <div class="icon">${SVG.featureIcon(P.accent, 'brain')}</div>
          <h3>Clear Triggers</h3>
          <p>Use specific, non-overlapping keywords. "deploy" for DevOps, "design" for Frontend — no ambiguity.</p>
        </div>
        <div class="feature-card">
          <div class="icon">${SVG.featureIcon(P.accent, 'star')}</div>
          <h3>Output Standards</h3>
          <p>Define what "done" looks like. "Tested code" vs "deployed and verified" are different quality bars.</p>
        </div>
      </div>

      <div class="pull-quote mt-md">
        <p>"The best agent isn't the one with the most skills — it's the one that produces the most reliable output for its domain."</p>
      </div>

      <h3 class="mt-md" style="color: var(--accent);">Common Patterns</h3>
      <table>
        <thead><tr><th>Pattern</th><th>When to Use</th></tr></thead>
        <tbody>
          <tr><td><strong>Specialist</strong></td><td>Deep expertise in one area (e.g., SQL Optimizer)</td></tr>
          <tr><td><strong>Pipeline</strong></td><td>Multi-step workflows (e.g., Content → SEO → Publish)</td></tr>
          <tr><td><strong>Reviewer</strong></td><td>Quality gates and code review</td></tr>
          <tr><td><strong>Orchestrator</strong></td><td>Coordinates multiple agents for complex tasks</td></tr>
        </tbody>
      </table>
    </div>
    ${footer(P.short, 4, 5)}
  </div>

  <!-- PAGE 5: Back Cover -->
  <div class="page page-cover">
    <div class="cover-glow"></div>
    <div class="cover-content">
      <div class="cover-badge">Agent Guide</div>
      <h1 class="cover-title" style="font-size: 40px;">Build<br/>Your Agents</h1>
      <div class="cover-divider"></div>
      <p class="cover-subtitle">40+ agent templates. 630+ skills to combine. Infinite possibilities.</p>
      <p class="cover-meta" style="margin-top: 40px;">frankx.ai &nbsp;|&nbsp; Agentic Creator OS v7.0</p>
      <p class="cover-meta" style="margin-top: 8px;">Build what matters.</p>
    </div>
  </div>

  </body></html>`
}

// ═══════════════════════════════════════════════════════════════════
// VIBE OS GUIDE (5 pages)
// ═══════════════════════════════════════════════════════════════════
function vibeOsHTML() {
  const P = PRODUCTS.vibe
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${premiumStyles(P.accent, P.accentLight)}</style></head><body>

  <!-- PAGE 1: Cover -->
  <div class="page page-cover">
    <div class="cover-glow"></div>
    <div class="cover-content">
      <div class="cover-badge">Product Guide</div>
      <div class="cover-illustration">${SVG.constellation(P.accent, P.accentLight, 360, 200)}</div>
      <h1 class="cover-title">Vibe OS</h1>
      <div class="cover-divider"></div>
      <p class="cover-subtitle">Your creative state management system. Track energy, optimize flow, and ship your best work consistently.</p>
      <p class="cover-meta">FRANKX &nbsp;|&nbsp; 2026</p>
    </div>
  </div>

  <!-- PAGE 2: What is Vibe OS -->
  <div class="page page-dark">
    <div class="bg-illustration">${SVG.gridPattern(P.accent)}</div>
    <div class="content">
      <div class="section-head">
        <div class="section-num">01</div>
        <div class="section-head-text">
          <div class="section-tag">Overview</div>
          <h2>What is Vibe OS?</h2>
        </div>
      </div>
      <p>Vibe OS is a <strong>creative state management system</strong> designed for builders, creators, and makers who want to consistently produce high-quality work without burning out.</p>
      <p>Instead of productivity hacks, Vibe OS focuses on <strong>energy awareness</strong>, <strong>flow optimization</strong>, and <strong>sustainable creative rhythm</strong>. It's the operating system that runs underneath everything you create.</p>

      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-value" style="font-size: 32px;">Energy</div>
          <div class="stat-label">Tracking</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="font-size: 32px;">Flow</div>
          <div class="stat-label">Optimization</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="font-size: 32px;">Rhythm</div>
          <div class="stat-label">Sustainability</div>
        </div>
      </div>

      <div class="pull-quote">
        <p>"You can't optimize output without understanding input. Vibe OS makes the invisible visible."</p>
      </div>

      <div class="feature-grid mt-md">
        <div class="feature-card">
          <div class="icon">${SVG.featureIcon(P.accent, 'bolt')}</div>
          <h3>Energy Mapping</h3>
          <p>Identify your peak hours, energy patterns, and optimal creative windows throughout the day.</p>
        </div>
        <div class="feature-card">
          <div class="icon">${SVG.featureIcon(P.accent, 'brain')}</div>
          <h3>Flow States</h3>
          <p>Structured approach to entering and maintaining deep focus states for creative work.</p>
        </div>
        <div class="feature-card">
          <div class="icon">${SVG.featureIcon(P.accent, 'layers')}</div>
          <h3>Session Design</h3>
          <p>Design work sessions around energy levels — not arbitrary time blocks or deadlines.</p>
        </div>
        <div class="feature-card">
          <div class="icon">${SVG.featureIcon(P.accent, 'star')}</div>
          <h3>Output Tracking</h3>
          <p>Measure creative output quality and volume to find your sustainable maximum.</p>
        </div>
      </div>
    </div>
    ${footer(P.short, 2, 5)}
  </div>

  <!-- PAGE 3: The Framework -->
  <div class="page page-light">
    <div class="content">
      <div class="section-head">
        <div class="section-num">02</div>
        <div class="section-head-text">
          <div class="section-tag">Framework</div>
          <h2>The Vibe OS Framework</h2>
        </div>
      </div>
      <p>Vibe OS operates on a three-layer model: <strong>Sense</strong> (awareness), <strong>Align</strong> (intention), and <strong>Execute</strong> (action). Each layer builds on the previous to create a complete creative workflow.</p>

      <div class="flow-steps">
        <div class="flow-step">
          <div class="flow-step-num">1</div>
          <h3>Sense</h3>
          <p>Check energy, mood, environment. What's available right now?</p>
        </div>
        <div class="flow-step">
          <div class="flow-step-num">2</div>
          <h3>Align</h3>
          <p>Match task to energy. High-energy → creative. Low → admin.</p>
        </div>
        <div class="flow-step">
          <div class="flow-step-num">3</div>
          <h3>Execute</h3>
          <p>Work within your optimal window. Ship, then recover.</p>
        </div>
      </div>

      <h3 class="mt-lg" style="color: var(--accent);">Energy-Task Mapping</h3>
      <table>
        <thead><tr><th>Energy Level</th><th>Best For</th><th>Examples</th></tr></thead>
        <tbody>
          <tr><td><strong>Peak (90-100%)</strong></td><td>Creative breakthroughs</td><td>Writing, design, architecture decisions</td></tr>
          <tr><td><strong>High (70-90%)</strong></td><td>Productive execution</td><td>Coding, content creation, problem-solving</td></tr>
          <tr><td><strong>Medium (40-70%)</strong></td><td>Structured work</td><td>Reviews, emails, planning, research</td></tr>
          <tr><td><strong>Low (0-40%)</strong></td><td>Recovery & input</td><td>Learning, reading, light admin, walking</td></tr>
        </tbody>
      </table>

      <div class="pull-quote mt-md">
        <p>"Matching the right task to the right energy level is the single biggest productivity unlock most creators miss."</p>
      </div>
    </div>
    ${footer(P.short, 3, 5)}
  </div>

  <!-- PAGE 4: Integration with ACOS -->
  <div class="page page-dark">
    <div class="content">
      <div class="section-head">
        <div class="section-num">03</div>
        <div class="section-head-text">
          <div class="section-tag">Integration</div>
          <h2>Vibe OS + ACOS</h2>
        </div>
      </div>
      <p>Vibe OS integrates directly with the Agentic Creator OS. When you check in with your creative state, ACOS adapts — selecting simpler tasks when energy is low, creative challenges when you're in flow.</p>

      <div class="feature-grid">
        <div class="feature-card card-accent">
          <h3>Daily Check-In</h3>
          <p>Use <code>/frankx-ai-daily</code> to log your energy state. ACOS uses this to prioritize tasks intelligently.</p>
        </div>
        <div class="feature-card card-accent">
          <h3>Adaptive Routing</h3>
          <p>Low energy? ACOS suggests content reviews and planning. Peak state? Creative builds and architecture.</p>
        </div>
        <div class="feature-card card-accent">
          <h3>Session Design</h3>
          <p>ACOS structures work sessions around your Vibe OS patterns — maximizing output without burnout.</p>
        </div>
        <div class="feature-card card-accent">
          <h3>Progress Tracking</h3>
          <p>Weekly recap shows correlation between energy management and creative output quality.</p>
        </div>
      </div>

      <div class="terminal mt-md">
        <div class="terminal-bar">
          <div class="terminal-dot dot-red"></div>
          <div class="terminal-dot dot-yellow"></div>
          <div class="terminal-dot dot-green"></div>
          <span class="terminal-title">Vibe OS Daily Check-In</span>
        </div>
        <div class="terminal-body">
          <span class="t-prompt">$</span> <span class="t-cmd">/frankx-ai-daily</span><br/><br/>
          <span class="t-out">Energy check: ████████░░ 80%</span><br/>
          <span class="t-dim">→ High energy detected. Creative window optimal.</span><br/><br/>
          <span class="t-out">Recommended tasks:</span><br/>
          <span class="t-dim">  1. Finish landing page redesign (creative)</span><br/>
          <span class="t-dim">  2. Write blog post draft (deep work)</span><br/>
          <span class="t-dim">  3. Architecture review (analytical)</span><br/>
          <span class="t-accent">→ Save admin tasks for afternoon energy dip</span>
        </div>
      </div>
    </div>
    ${footer(P.short, 4, 5)}
  </div>

  <!-- PAGE 5: Back Cover -->
  <div class="page page-cover">
    <div class="cover-glow"></div>
    <div class="cover-content">
      <div class="cover-badge">Vibe OS</div>
      <h1 class="cover-title" style="font-size: 44px;">Create at<br/>Your Best</h1>
      <div class="cover-divider"></div>
      <p class="cover-subtitle">Sustainable creative rhythm. Energy-aware workflows. Your operating system for doing great work.</p>
      <p class="cover-meta" style="margin-top: 40px;">frankx.ai &nbsp;|&nbsp; Part of the FrankX Ecosystem</p>
      <p class="cover-meta" style="margin-top: 8px;">Build what matters.</p>
    </div>
  </div>

  </body></html>`
}

// ═══════════════════════════════════════════════════════════════════
// GENERATIVE CREATOR OS GUIDE (5 pages)
// ═══════════════════════════════════════════════════════════════════
function genCreatorOsHTML() {
  const P = PRODUCTS.gencreator
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${premiumStyles(P.accent, P.accentLight)}</style></head><body>

  <!-- PAGE 1: Cover -->
  <div class="page page-cover">
    <div class="cover-glow"></div>
    <div class="cover-content">
      <div class="cover-badge">Product Guide</div>
      <div class="cover-illustration">${SVG.constellation(P.accent, P.accentLight, 360, 200)}</div>
      <h1 class="cover-title" style="font-size: 44px;">Generative<br/>Creator OS</h1>
      <div class="cover-divider"></div>
      <p class="cover-subtitle">Multi-modal AI creation platform. Text, image, audio, video — one unified system for generative creators.</p>
      <p class="cover-meta">FRANKX &nbsp;|&nbsp; 2026</p>
    </div>
  </div>

  <!-- PAGE 2: What is GenCreator OS -->
  <div class="page page-dark">
    <div class="bg-illustration">${SVG.gridPattern(P.accent)}</div>
    <div class="content">
      <div class="section-head">
        <div class="section-num">01</div>
        <div class="section-head-text">
          <div class="section-tag">Overview</div>
          <h2>Multi-Modal Creation</h2>
        </div>
      </div>
      <p>GenCreator OS is a <strong>multi-modal AI creation platform</strong> that unifies text, image, audio, and video generation into one coherent system. Instead of juggling separate tools, you work within a single creative environment.</p>

      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-value" style="font-size: 32px;">Text</div>
          <div class="stat-label">Articles, Copy, Scripts</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="font-size: 32px;">Image</div>
          <div class="stat-label">Art, Design, Photos</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="font-size: 32px;">Audio</div>
          <div class="stat-label">Music, Voice, FX</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="font-size: 32px;">Video</div>
          <div class="stat-label">Clips, Edits, Motion</div>
        </div>
      </div>

      <div class="pull-quote">
        <p>"The future of creation is multi-modal. GenCreator OS makes the transition seamless."</p>
      </div>

      <div class="feature-grid mt-md">
        <div class="feature-card">
          <div class="icon">${SVG.featureIcon(P.accent, 'star')}</div>
          <h3>Unified Pipeline</h3>
          <p>Create a blog post, generate hero images, compose a soundtrack, and produce a promo video — all from one brief.</p>
        </div>
        <div class="feature-card">
          <div class="icon">${SVG.featureIcon(P.accent, 'brain')}</div>
          <h3>Model Routing</h3>
          <p>GenCreator routes to the best AI model for each modality — Claude for text, Gemini for images, Suno for audio.</p>
        </div>
        <div class="feature-card">
          <div class="icon">${SVG.featureIcon(P.accent, 'grid')}</div>
          <h3>Asset Management</h3>
          <p>All generated assets are organized, versioned, and linked. Never lose track of what you created.</p>
        </div>
        <div class="feature-card">
          <div class="icon">${SVG.featureIcon(P.accent, 'rocket')}</div>
          <h3>Commercial Ready</h3>
          <p>Every output is production-quality and commercially licensable. Create products, not experiments.</p>
        </div>
      </div>
    </div>
    ${footer(P.short, 2, 5)}
  </div>

  <!-- PAGE 3: Creation Modes -->
  <div class="page page-light">
    <div class="content">
      <div class="section-head">
        <div class="section-num">02</div>
        <div class="section-head-text">
          <div class="section-tag">Modes</div>
          <h2>Creation Modes</h2>
        </div>
      </div>
      <p>GenCreator OS supports four primary creation modes, each optimized for different creative workflows and output types.</p>

      <div class="feature-grid">
        <div class="feature-card card-accent">
          <h3>Content Studio</h3>
          <p>Long-form writing, blog posts, documentation, technical articles. AI-assisted with human editorial control.</p>
          <p class="muted mt-sm">Models: Claude, GPT-4o for specialized tasks</p>
        </div>
        <div class="feature-card card-accent">
          <h3>Image Lab</h3>
          <p>Hero images, illustrations, product mockups, social graphics. Generated with brand consistency.</p>
          <p class="muted mt-sm">Models: Gemini Image, FLUX, Midjourney via MCP</p>
        </div>
        <div class="feature-card card-accent">
          <h3>Audio Engine</h3>
          <p>AI music production, sound effects, voice synthesis. From concept to master in one session.</p>
          <p class="muted mt-sm">Models: Suno, ElevenLabs, custom audio pipelines</p>
        </div>
        <div class="feature-card card-accent">
          <h3>Motion Lab</h3>
          <p>Short-form video, animated graphics, promotional clips. Storyboard to final cut.</p>
          <p class="muted mt-sm">Models: Kling, RunwayML, Remotion for code-generated</p>
        </div>
      </div>

      <h3 class="mt-lg" style="color: var(--accent);">MCP Server Integration</h3>
      <table>
        <thead><tr><th>Server</th><th>Modality</th><th>Capability</th></tr></thead>
        <tbody>
          <tr><td><strong>Nano Banana</strong></td><td>Image</td><td>Gemini-powered image generation + editing</td></tr>
          <tr><td><strong>Playwright</strong></td><td>Web</td><td>Browser automation, screenshots, testing</td></tr>
          <tr><td><strong>v0 MCP</strong></td><td>UI</td><td>Premium component generation</td></tr>
          <tr><td><strong>Memory</strong></td><td>Knowledge</td><td>Cross-session creative context</td></tr>
        </tbody>
      </table>
    </div>
    ${footer(P.short, 3, 5)}
  </div>

  <!-- PAGE 4: Workflows & Integration -->
  <div class="page page-dark">
    <div class="content">
      <div class="section-head">
        <div class="section-num">03</div>
        <div class="section-head-text">
          <div class="section-tag">Workflows</div>
          <h2>Multi-Modal Workflows</h2>
        </div>
      </div>
      <p>The real power of GenCreator OS is <strong>chained multi-modal workflows</strong> — where the output of one modality feeds into the next.</p>

      <div class="flow-steps">
        <div class="flow-step">
          <div class="flow-step-num">1</div>
          <h3>Brief</h3>
          <p>Describe your project in natural language</p>
        </div>
        <div class="flow-step">
          <div class="flow-step-num">2</div>
          <h3>Generate</h3>
          <p>AI creates text, images, audio in parallel</p>
        </div>
        <div class="flow-step">
          <div class="flow-step-num">3</div>
          <h3>Refine</h3>
          <p>Edit, iterate, and perfect each asset</p>
        </div>
        <div class="flow-step">
          <div class="flow-step-num">4</div>
          <h3>Publish</h3>
          <p>Deploy everything as a cohesive product</p>
        </div>
      </div>

      <div class="terminal mt-md">
        <div class="terminal-bar">
          <div class="terminal-dot dot-red"></div>
          <div class="terminal-dot dot-yellow"></div>
          <div class="terminal-dot dot-green"></div>
          <span class="terminal-title">Multi-Modal Workflow Example</span>
        </div>
        <div class="terminal-body">
          <span class="t-prompt">$</span> <span class="t-cmd">/acos "Create a product launch for my new AI course"</span><br/><br/>
          <span class="t-out">→ Content Studio:</span> <span class="t-dim">Landing page copy (2,100 words)</span><br/>
          <span class="t-out">→ Image Lab:</span> <span class="t-dim">Hero image + 6 feature graphics</span><br/>
          <span class="t-out">→ Audio Engine:</span> <span class="t-dim">Promo jingle (30s, electronic)</span><br/>
          <span class="t-out">→ Frontend Designer:</span> <span class="t-dim">Next.js page components</span><br/>
          <span class="t-out">→ DevOps:</span> <span class="t-dim">Deployed to frankx.ai/courses/...</span><br/><br/>
          <span class="t-accent">✓ Complete product launch in one session</span>
        </div>
      </div>

      <div class="pull-quote mt-md">
        <p>"What used to take a team of specialists and weeks of coordination now happens in a single creative session."</p>
      </div>
    </div>
    ${footer(P.short, 4, 5)}
  </div>

  <!-- PAGE 5: Back Cover -->
  <div class="page page-cover">
    <div class="cover-glow"></div>
    <div class="cover-content">
      <div class="cover-badge">GenCreator OS</div>
      <h1 class="cover-title" style="font-size: 40px;">Create<br/>Everything</h1>
      <div class="cover-divider"></div>
      <p class="cover-subtitle">Text. Image. Audio. Video. One system. Unlimited creative potential.</p>
      <p class="cover-meta" style="margin-top: 40px;">frankx.ai &nbsp;|&nbsp; Part of the FrankX Ecosystem</p>
      <p class="cover-meta" style="margin-top: 8px;">Build what matters.</p>
    </div>
  </div>

  </body></html>`
}

// ═══════════════════════════════════════════════════════════════════
// PDF GENERATION ENGINE
// ═══════════════════════════════════════════════════════════════════
const PDFS = {
  quickstart: { fn: acosQuickstartHTML, file: 'ACOS-Quickstart-Guide.pdf' },
  reference: { fn: acosReferenceHTML, file: 'ACOS-Complete-Reference.pdf' },
  'agent-guide': { fn: acosAgentGuideHTML, file: 'ACOS-Custom-Agent-Guide.pdf' },
  'vibe-os': { fn: vibeOsHTML, file: 'Vibe-OS-Guide.pdf' },
  'gencreator-os': { fn: genCreatorOsHTML, file: 'GenCreator-OS-Guide.pdf' },
}

async function generatePDF(key) {
  const { fn, file } = PDFS[key]
  const tmpPath = join(TMP_DIR, file)
  const outPath = join(OUTPUT_DIR, file)
  console.log(`Generating ${file}...`)

  const browser = await chromium.launch({
    executablePath: '/home/frankx/.cache/ms-playwright/chromium-1208/chrome-linux64/chrome',
  })
  const page = await browser.newPage()
  await page.setContent(fn(), { waitUntil: 'networkidle' })

  // Wait for Google Fonts to load
  await page.waitForTimeout(3000)

  // Write to /tmp first to avoid WSL cross-filesystem lock issues
  await page.pdf({
    path: tmpPath,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  })

  await browser.close()

  // Copy from tmp to final destination
  copyFileSync(tmpPath, outPath)
  console.log(`  -> ${outPath}`)
}

// ─── CLI ───
const arg = process.argv[2] || 'all'
const keys = arg === 'all' ? Object.keys(PDFS) : [arg]

for (const key of keys) {
  if (!PDFS[key]) { console.error(`Unknown: ${key}`); process.exit(1) }
  await generatePDF(key)
}
console.log(`\nDone! PDFs saved to public/products/`)
