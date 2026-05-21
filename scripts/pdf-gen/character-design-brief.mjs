#!/usr/bin/env node
/**
 * FrankX.AI Character Design Brief — Premium Edition
 * Comprehensive mascot/character system reference with all 25 concepts
 *
 * Usage: node scripts/pdf-gen/character-design-brief.mjs
 */

import { chromium } from 'playwright'
import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

const ROOT = '/mnt/c/Users/Frank/FrankX'
const OUTPUT_DIR = join(ROOT, 'public/products')
mkdirSync(OUTPUT_DIR, { recursive: true })

const MASCOT = (name) => `file://${ROOT}/public/images/mascot/${name}`

const C = {
  oled: '#030712', navy: '#0F172A', navyMid: '#0C1525',
  card: '#1E293B', elevated: '#334155',
  border: 'rgba(255,255,255,0.06)',
  glass: 'rgba(255,255,255,0.03)',
  white: '#FFFFFF', offWhite: '#F8FAFC',
  textPrimary: '#E2E8F0', textSecondary: '#94A3B8',
  textMuted: '#64748B', textDark: '#1E293B', textDarkSub: '#475569',
  purple: '#AB47C7', purpleLight: '#C084FC',
  cyan: '#43BFE3', cyanLight: '#67E8F9',
  gold: '#F59E0B', goldLight: '#FCD34D',
  emerald: '#10B981',
  rose: '#F43F5E',
}

const TOTAL_PAGES = 18

function footer(page) {
  return `<div style="position:absolute;bottom:24px;left:56px;right:56px;display:flex;justify-content:space-between;align-items:center;font-family:'JetBrains Mono',monospace;font-size:9px;color:${C.textMuted};">
    <span>FRANKX.AI — CHARACTER DESIGN BRIEF</span>
    <span>${page} / ${TOTAL_PAGES}</span>
  </div>`
}

function buildHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap');

* { margin:0; padding:0; box-sizing:border-box; }

body {
  font-family: 'Inter', -apple-system, sans-serif;
  background: ${C.navy};
  color: ${C.textPrimary};
  -webkit-font-smoothing: antialiased;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

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
  padding: 56px 64px 48px;
}

.page-accent {
  background: linear-gradient(135deg, ${C.cyan}0F 0%, ${C.navy} 40%, ${C.oled} 100%);
  color: ${C.textPrimary};
  padding: 56px 64px 48px;
}

.tag {
  display: inline-block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px; font-weight: 500;
  letter-spacing: 0.2em; text-transform: uppercase;
  color: ${C.cyan};
  border: 1px solid ${C.cyan}4D;
  padding: 4px 14px;
  border-radius: 100px;
  margin-bottom: 12px;
}

h1 {
  font-family: 'Poppins', sans-serif;
  font-weight: 900;
  letter-spacing: -0.03em;
  line-height: 1.1;
}

h2 {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 26px;
  letter-spacing: -0.02em;
  color: ${C.white};
  margin-bottom: 16px;
}

h3 {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: ${C.white};
  margin-bottom: 6px;
}

p { font-size: 13px; line-height: 1.7; color: ${C.textSecondary}; }

.card {
  background: ${C.card};
  border: 1px solid ${C.border};
  border-radius: 12px;
  padding: 20px;
}

.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }
.grid-4 { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 12px; }

.concept-card {
  background: ${C.card};
  border: 1px solid ${C.border};
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
}
.concept-card img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  display: block;
}
.concept-card .meta {
  padding: 10px 12px;
}
.concept-card .meta h4 {
  font-size: 11px;
  font-weight: 600;
  color: ${C.white};
  margin-bottom: 2px;
}
.concept-card .meta p {
  font-size: 9px;
  color: ${C.textMuted};
  line-height: 1.4;
}

.swatch {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-right: 16px;
  margin-bottom: 8px;
}
.swatch-dot {
  width: 24px; height: 24px;
  border-radius: 6px;
  border: 1px solid rgba(255,255,255,0.1);
}

.badge {
  display: inline-block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  padding: 3px 10px;
  border-radius: 4px;
  font-weight: 500;
}

.badge-rec { background: ${C.emerald}22; color: ${C.emerald}; border: 1px solid ${C.emerald}33; }
.badge-strong { background: ${C.cyan}22; color: ${C.cyan}; border: 1px solid ${C.cyan}33; }
.badge-alt { background: ${C.gold}22; color: ${C.gold}; border: 1px solid ${C.gold}33; }

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 11px;
}
th {
  text-align: left;
  font-weight: 600;
  font-size: 10px;
  color: ${C.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 8px 10px;
  border-bottom: 1px solid ${C.border};
}
td {
  padding: 8px 10px;
  color: ${C.textSecondary};
  border-bottom: 1px solid ${C.border};
}

.do-dont {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.do-box, .dont-box {
  border-radius: 10px;
  padding: 18px;
  font-size: 12px;
}
.do-box { background: ${C.emerald}0D; border: 1px solid ${C.emerald}33; }
.do-box h4 { color: ${C.emerald}; font-size: 13px; margin-bottom: 10px; }
.dont-box { background: ${C.rose}0D; border: 1px solid ${C.rose}33; }
.dont-box h4 { color: ${C.rose}; font-size: 13px; margin-bottom: 10px; }
.do-box li, .dont-box li {
  margin-bottom: 5px;
  color: ${C.textSecondary};
  font-size: 11px;
  line-height: 1.5;
}

.hero-img {
  width: 100%;
  max-height: 50vh;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.4);
}

.divider {
  width: 48px; height: 3px;
  border-radius: 2px;
  background: linear-gradient(90deg, ${C.cyan}, ${C.purple});
  margin: 16px 0;
}
</style>
</head>
<body>

<!-- ═══ PAGE 1: COVER ═══ -->
<div class="page" style="background:${C.oled};display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:60px;position:relative;">
  <div style="position:absolute;width:700px;height:700px;border-radius:50%;background:radial-gradient(circle,${C.cyan}18 0%,${C.purple}0A 40%,transparent 70%);top:50%;left:50%;transform:translate(-50%,-50%);z-index:0;"></div>
  <div style="position:relative;z-index:1;">
    <div class="tag">INTERNAL DESIGN DOCUMENT</div>
    <h1 style="font-size:52px;color:${C.white};margin-bottom:8px;">FrankX.AI</h1>
    <h1 style="font-size:36px;color:${C.cyan};margin-bottom:16px;">Character Design Brief</h1>
    <div class="divider" style="margin:16px auto;"></div>
    <p style="max-width:440px;margin:0 auto 24px;font-size:14px;">25 concept explorations across 7 design directions.<br/>From organic wolf to premium droid to crystal familiar.</p>
    <div style="display:flex;gap:16px;justify-content:center;margin-bottom:32px;">
      <img src="${MASCOT('mascot-v05-techno-beast-standing.png')}" style="width:140px;height:140px;object-fit:cover;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,0.5);"/>
      <img src="${MASCOT('mascot-v24-cyborg-fusion-head.png')}" style="width:140px;height:140px;object-fit:cover;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,0.5);border:2px solid ${C.cyan}44;"/>
      <img src="${MASCOT('mascot-v23-premium-droid.png')}" style="width:140px;height:140px;object-fit:cover;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,0.5);"/>
    </div>
    <p style="font-family:'JetBrains Mono',monospace;font-size:10px;color:${C.textMuted};letter-spacing:0.08em;">FEBRUARY 2026 &nbsp;·&nbsp; VERSION 1.0 &nbsp;·&nbsp; FRANKX.AI</p>
  </div>
  ${footer(1)}
</div>

<!-- ═══ PAGE 2: STRATEGIC FRAMEWORK ═══ -->
<div class="page page-dark">
  <div class="tag">STRATEGY</div>
  <h2>Character System Framework</h2>
  <p style="max-width:580px;margin-bottom:24px;">FrankX.AI is not a single mascot — it's a <strong style="color:${C.white};">character system</strong> with one core identity expressed through multiple rendering modes. Like Spider-Man's different suits, the character adapts to context while maintaining recognizable DNA.</p>
  
  <div class="grid-2" style="margin-bottom:20px;">
    <div class="card">
      <h3 style="color:${C.cyan};">Core Identity: FrankX.AI</h3>
      <p style="font-size:12px;">The brand <em>is</em> the character. No separate mascot name needed. "FrankX.AI" represents the entire AI intelligence system — wolf DNA provides the visual anchor across all forms.</p>
      <div style="margin-top:12px;">
        <span class="badge badge-rec">RECOMMENDED</span>
      </div>
    </div>
    <div class="card">
      <h3 style="color:${C.purple};">Design DNA (Immutable)</h3>
      <ul style="font-size:11px;color:${C.textSecondary};line-height:1.8;padding-left:16px;">
        <li>Wolf/fox/kitsune hybrid silhouette</li>
        <li>3 tails in brand colors (purple, cyan, gold)</li>
        <li>Dark navy/obsidian base body</li>
        <li>Glowing circuit accents (hex patterns)</li>
        <li>Amber + cyan heterochromia eyes</li>
        <li>Premium glass/chrome material language</li>
      </ul>
    </div>
  </div>

  <h3 style="margin-top:8px;">5 Rendering Modes</h3>
  <div style="margin-top:8px;">
    <table>
      <tr><th>Mode</th><th>Description</th><th>Use Case</th><th>Key Concepts</th></tr>
      <tr>
        <td style="color:${C.emerald};font-weight:600;">Organic</td>
        <td>Full fur, living creature, subtle tech</td>
        <td>Arcanea, storytelling, community</td>
        <td>V1, V5, V6, V7</td>
      </tr>
      <tr>
        <td style="color:${C.cyan};font-weight:600;">Techno</td>
        <td>Chrome skull, circuit veins, mech parts</td>
        <td>GitHub, docs, developer tools</td>
        <td>V11, V15, V22</td>
      </tr>
      <tr>
        <td style="color:${C.purple};font-weight:600;">Holo</td>
        <td>Holographic projection, scan lines</td>
        <td>Website hero, presentations, premium</td>
        <td>V8, V9, V10, V14</td>
      </tr>
      <tr>
        <td style="color:${C.gold};font-weight:600;">Avatar</td>
        <td>Stylized 3D head, profile-ready</td>
        <td>Social media, chat avatars, app icon</td>
        <td>V2, V13, V21, V24</td>
      </tr>
      <tr>
        <td style="color:${C.white};font-weight:600;">Icon</td>
        <td>Geometric mark, badge, emblem</td>
        <td>Favicon, badges, watermarks</td>
        <td>V3, V17, V18</td>
      </tr>
    </table>
  </div>
  ${footer(2)}
</div>

<!-- ═══ PAGE 3: COLOR SYSTEM ═══ -->
<div class="page page-accent">
  <div class="tag">SPECIFICATIONS</div>
  <h2>Brand Color System</h2>
  <p style="margin-bottom:20px;">All character renderings MUST use these exact brand colors. The 3-tail color system (purple, cyan, gold) is the most recognizable signature element.</p>
  
  <div class="grid-2" style="margin-bottom:20px;">
    <div class="card">
      <h3>Primary Palette</h3>
      <div style="margin-top:12px;">
        <div class="swatch"><div class="swatch-dot" style="background:${C.navy};"></div><span style="font-family:'JetBrains Mono',monospace;font-size:10px;color:${C.textMuted};">#0F172A Navy (Base)</span></div><br/>
        <div class="swatch"><div class="swatch-dot" style="background:${C.purple};"></div><span style="font-family:'JetBrains Mono',monospace;font-size:10px;color:${C.textMuted};">#AB47C7 Purple (Tail 1)</span></div><br/>
        <div class="swatch"><div class="swatch-dot" style="background:${C.cyan};"></div><span style="font-family:'JetBrains Mono',monospace;font-size:10px;color:${C.textMuted};">#43BFE3 Cyan (Tail 2)</span></div><br/>
        <div class="swatch"><div class="swatch-dot" style="background:${C.gold};"></div><span style="font-family:'JetBrains Mono',monospace;font-size:10px;color:${C.textMuted};">#F59E0B Gold (Tail 3)</span></div><br/>
        <div class="swatch"><div class="swatch-dot" style="background:${C.emerald};"></div><span style="font-family:'JetBrains Mono',monospace;font-size:10px;color:${C.textMuted};">#10B981 Emerald (Accent)</span></div>
      </div>
    </div>
    <div class="card">
      <h3>Material Language</h3>
      <div style="margin-top:12px;">
        <div class="swatch"><div class="swatch-dot" style="background:linear-gradient(135deg,#1a1a2e,#0d0d1a);"></div><span style="font-family:'JetBrains Mono',monospace;font-size:10px;color:${C.textMuted};">Obsidian (body base)</span></div><br/>
        <div class="swatch"><div class="swatch-dot" style="background:linear-gradient(135deg,#c0c0c0,#808080);"></div><span style="font-family:'JetBrains Mono',monospace;font-size:10px;color:${C.textMuted};">Chrome (mech parts)</span></div><br/>
        <div class="swatch"><div class="swatch-dot" style="background:linear-gradient(135deg,rgba(67,191,227,0.3),rgba(171,71,199,0.3));border:1px solid rgba(67,191,227,0.3);"></div><span style="font-family:'JetBrains Mono',monospace;font-size:10px;color:${C.textMuted};">Glass (holographic)</span></div><br/>
        <div class="swatch"><div class="swatch-dot" style="background:linear-gradient(135deg,#2d1b4e,#1a0a2e);border:1px solid ${C.purple}44;"></div><span style="font-family:'JetBrains Mono',monospace;font-size:10px;color:${C.textMuted};">Dark fur (organic mode)</span></div>
      </div>
      <div style="margin-top:14px;">
        <h3>Eye System</h3>
        <p style="font-size:11px;margin-top:6px;">Left eye: <strong style="color:${C.gold};">Amber (#F59E0B)</strong> — warmth, humanity<br/>Right eye: <strong style="color:${C.cyan};">Cyan (#43BFE3)</strong> — technology, AI<br/>This heterochromia bridges organic and digital across ALL rendering modes.</p>
      </div>
    </div>
  </div>

  <div class="card">
    <h3>Size Requirements</h3>
    <table>
      <tr><th>Context</th><th>Dimensions</th><th>Format</th><th>Notes</th></tr>
      <tr><td>Favicon</td><td>32x32, 16x16</td><td>ICO/SVG</td><td>Icon mode only, high contrast</td></tr>
      <tr><td>App Icon</td><td>512x512</td><td>PNG</td><td>Avatar mode, centered head</td></tr>
      <tr><td>Social Avatar</td><td>400x400</td><td>PNG</td><td>Avatar mode, tight crop</td></tr>
      <tr><td>GitHub Profile</td><td>460x460</td><td>PNG</td><td>Techno or Avatar mode</td></tr>
      <tr><td>README Hero</td><td>1376x768</td><td>PNG</td><td>Full scene, 16:9</td></tr>
      <tr><td>Website Hero</td><td>1920x1080</td><td>PNG/WebP</td><td>Holo mode with particles</td></tr>
      <tr><td>OG Image</td><td>1200x630</td><td>PNG</td><td>Character + brand text</td></tr>
    </table>
  </div>
  ${footer(3)}
</div>

<!-- ═══ PAGE 4: DIRECTION A — PRIMAL BEAST ═══ -->
<div class="page page-dark">
  <div class="tag">DIRECTION A</div>
  <h2>Primal Beast <span style="font-size:14px;color:${C.textMuted};font-weight:400;">— Pure Organic Power</span></h2>
  <p style="margin-bottom:16px;">Maximum organic presence. Living creature with only subtle technology hints. Best for: Arcanea mythology, storytelling, emotional connection.</p>
  
  <div class="grid-4">
    <div class="concept-card">
      <img src="${MASCOT('axi-v1-full.png')}" />
      <div class="meta"><h4>V1 — Original Full Body</h4><p>First concept. Standing wolf, 3 glowing tails, hex fur pattern.</p></div>
    </div>
    <div class="concept-card">
      <img src="${MASCOT('mascot-v07-kitsune-elegant.png')}" />
      <div class="meta"><h4>V7 — Kitsune Elegant</h4><p>Regal seated pose, mystical atmosphere, 3 tails fanned.</p></div>
    </div>
    <div class="concept-card">
      <img src="${MASCOT('mascot-v06-prowling-action.png')}" />
      <div class="meta"><h4>V6 — Prowling Action</h4><p>Dynamic movement through data streams. Energy and purpose.</p></div>
    </div>
    <div class="concept-card">
      <img src="${MASCOT('mascot-v16-organic-digital-split.png')}" />
      <div class="meta"><h4>V16 — Organic-Digital Split</h4><p>Left organic / right wireframe. Bridge concept.</p></div>
    </div>
  </div>

  <div class="card" style="margin-top:16px;">
    <h3>Design Metrics — Direction A</h3>
    <table>
      <tr><th>Attribute</th><th>Score</th><th>Notes</th></tr>
      <tr><td>Emotional Connection</td><td style="color:${C.emerald};">9/10</td><td>Highest warmth and approachability</td></tr>
      <tr><td>Tech Credibility</td><td style="color:${C.gold};">5/10</td><td>Subtle tech only — may not signal "AI" immediately</td></tr>
      <tr><td>Versatility</td><td style="color:${C.cyan};">6/10</td><td>Strong for organic contexts, weak for developer tools</td></tr>
      <tr><td>Uniqueness</td><td style="color:${C.emerald};">8/10</td><td>3-tail kitsune hybrid is distinctive</td></tr>
      <tr><td>Scalability</td><td style="color:${C.gold};">5/10</td><td>Organic detail hard to simplify for small sizes</td></tr>
    </table>
  </div>
  ${footer(4)}
</div>

<!-- ═══ PAGE 5: DIRECTION B — TECHNO-BEAST (SWEET SPOT) ═══ -->
<div class="page page-dark" style="background:linear-gradient(135deg,${C.cyan}08 0%,${C.navy} 30%,${C.oled} 100%);">
  <div class="tag" style="color:${C.emerald};border-color:${C.emerald}4D;">DIRECTION B — RECOMMENDED</div>
  <h2>Techno-Beast <span style="font-size:14px;color:${C.emerald};font-weight:400;">— The Sweet Spot</span></h2>
  <p style="margin-bottom:16px;">Organic wolf body with visible hex/circuit patterns and subtle chrome accents. Bridges creativity and technology. <strong style="color:${C.emerald};">Recommended primary direction.</strong></p>
  
  <div class="grid-3">
    <div class="concept-card" style="border-color:${C.emerald}33;">
      <img src="${MASCOT('mascot-v05-techno-beast-standing.png')}" />
      <div class="meta"><h4>V5 — Techno-Beast Standing <span class="badge badge-rec">TOP PICK</span></h4><p>Standing pose, hex fur, HUD eye, 3 brand-color tails. The definitive concept.</p></div>
    </div>
    <div class="concept-card">
      <img src="${MASCOT('mascot-v06-prowling-action.png')}" />
      <div class="meta"><h4>V6 — Prowling Through Data</h4><p>Dynamic action pose with data particle streams.</p></div>
    </div>
    <div class="concept-card">
      <img src="${MASCOT('mascot-v25-crystal-familiar.png')}" />
      <div class="meta"><h4>V25 — Crystal Familiar</h4><p>Geometric crystal variant with antennae. "Mona" option.</p></div>
    </div>
  </div>

  <div class="card" style="margin-top:16px;border-color:${C.emerald}33;">
    <h3>Design Metrics — Direction B</h3>
    <table>
      <tr><th>Attribute</th><th>Score</th><th>Notes</th></tr>
      <tr><td>Emotional Connection</td><td style="color:${C.emerald};">8/10</td><td>Warm organic base with exciting tech overlay</td></tr>
      <tr><td>Tech Credibility</td><td style="color:${C.emerald};">8/10</td><td>Hex patterns + HUD clearly signal AI/tech</td></tr>
      <tr><td>Versatility</td><td style="color:${C.emerald};">9/10</td><td>Works across organic and tech contexts</td></tr>
      <tr><td>Uniqueness</td><td style="color:${C.emerald};">9/10</td><td>No competitor has this specific hybrid</td></tr>
      <tr><td>Scalability</td><td style="color:${C.cyan};">7/10</td><td>Hex pattern readable at medium sizes</td></tr>
    </table>
    <p style="margin-top:10px;font-size:11px;"><strong style="color:${C.emerald};">Why this wins:</strong> V5 is the only concept that equally serves FrankX.AI (tech platform), Arcanea (mythology), and ACOS (developer tool). The hex-fur pattern is instantly recognizable at any size, and the 3-tail brand colors create a natural color-coding system.</p>
  </div>
  ${footer(5)}
</div>

<!-- ═══ PAGE 6: DIRECTION C — MECH-SPIRIT ═══ -->
<div class="page page-dark">
  <div class="tag">DIRECTION C</div>
  <h2>Mech-Spirit <span style="font-size:14px;color:${C.textMuted};font-weight:400;">— Half Organic, Half Chrome</span></h2>
  <p style="margin-bottom:16px;">Organic wolf head with full chrome mechanical body. Power and protection. Best for: system architecture, enterprise, security contexts.</p>
  
  <div class="grid-3">
    <div class="concept-card">
      <img src="${MASCOT('mascot-v11-chrome-guardian.png')}" />
      <div class="meta"><h4>V11 — Chrome Guardian</h4><p>Organic face, chrome armor, purple core, segmented tail.</p></div>
    </div>
    <div class="concept-card">
      <img src="${MASCOT('mascot-v15-kitsune-mask.png')}" />
      <div class="meta"><h4>V15 — Kitsune Mask</h4><p>Chrome mask with circuit seams, cyan eyes, brand-color wisps.</p></div>
    </div>
    <div class="concept-card">
      <img src="${MASCOT('mascot-v24-cyborg-fusion-head.png')}" />
      <div class="meta"><h4>V24 — Cyborg Fusion <span class="badge badge-strong">STANDOUT</span></h4><p>Seamless fur-to-chrome. Dual eyes (amber/cyan). "FrankX.AI" text.</p></div>
    </div>
  </div>

  <div class="card" style="margin-top:16px;">
    <h3>Design Metrics — Direction C</h3>
    <table>
      <tr><th>Attribute</th><th>Score</th><th>Notes</th></tr>
      <tr><td>Emotional Connection</td><td style="color:${C.cyan};">6/10</td><td>Chrome reduces warmth, but face retains personality</td></tr>
      <tr><td>Tech Credibility</td><td style="color:${C.emerald};">9/10</td><td>Maximum tech signal — chrome is unmistakable</td></tr>
      <tr><td>Versatility</td><td style="color:${C.emerald};">8/10</td><td>Strong across tech, enterprise, and creative</td></tr>
      <tr><td>Uniqueness</td><td style="color:${C.emerald};">8/10</td><td>Cyborg wolf is rare in tech branding</td></tr>
      <tr><td>Scalability</td><td style="color:${C.cyan};">7/10</td><td>V24 split-face is iconic even at small sizes</td></tr>
    </table>
    <p style="margin-top:10px;font-size:11px;"><strong style="color:${C.cyan};">V24 standout:</strong> The half-organic, half-chrome split with heterochromia eyes (amber=human, cyan=AI) perfectly embodies "AI-human collaboration" — the core FrankX.AI philosophy. Could be the definitive avatar image.</p>
  </div>
  ${footer(6)}
</div>

<!-- ═══ PAGE 7: DIRECTION D — HOLOGRAPHIC ═══ -->
<div class="page page-dark">
  <div class="tag">DIRECTION D</div>
  <h2>Holographic Entity <span style="font-size:14px;color:${C.textMuted};font-weight:400;">— Digital Projection</span></h2>
  <p style="margin-bottom:16px;">The character as pure digital intelligence — holographic projections, wireframe structures, constellation data. Best for: presentations, website heroes, premium contexts.</p>
  
  <div class="grid-4">
    <div class="concept-card">
      <img src="${MASCOT('mascot-v08-holographic-entity.png')}" />
      <div class="meta"><h4>V8 — Digital Wolf</h4><p>Holographic on chrome platform.</p></div>
    </div>
    <div class="concept-card">
      <img src="${MASCOT('mascot-v09-wireframe-beast.png')}" />
      <div class="meta"><h4>V9 — Wireframe</h4><p>Glowing mesh, purple + cyan.</p></div>
    </div>
    <div class="concept-card">
      <img src="${MASCOT('mascot-v10-data-constellation.png')}" />
      <div class="meta"><h4>V10 — Constellation</h4><p>Connected stars forming wolf in space.</p></div>
    </div>
    <div class="concept-card">
      <img src="${MASCOT('mascot-v14-holographic-bust.png')}" />
      <div class="meta"><h4>V14 — Holo Bust</h4><p>Floating head, scan lines, data halo.</p></div>
    </div>
  </div>

  <div class="card" style="margin-top:16px;">
    <h3>Design Metrics — Direction D</h3>
    <table>
      <tr><th>Attribute</th><th>Score</th><th>Notes</th></tr>
      <tr><td>Emotional Connection</td><td style="color:${C.gold};">4/10</td><td>Abstract reduces emotional bond</td></tr>
      <tr><td>Tech Credibility</td><td style="color:${C.emerald};">10/10</td><td>Maximum digital/tech signal</td></tr>
      <tr><td>Versatility</td><td style="color:${C.gold};">5/10</td><td>Great for tech contexts, weak for community/warmth</td></tr>
      <tr><td>Uniqueness</td><td style="color:${C.cyan};">7/10</td><td>Holographic animals are becoming common</td></tr>
      <tr><td>Scalability</td><td style="color:${C.gold};">4/10</td><td>Fine details lost at small sizes</td></tr>
    </table>
  </div>
  ${footer(7)}
</div>

<!-- ═══ PAGE 8: DIRECTION E — ROBOTIC ═══ -->
<div class="page page-dark">
  <div class="tag">DIRECTION E</div>
  <h2>Robotic Companion <span style="font-size:14px;color:${C.textMuted};font-weight:400;">— The Copilot Alternative</span></h2>
  <p style="margin-bottom:16px;">Full robot/droid design inspired by Boston Dynamics + Apple industrial design. The "GitHub Copilot but ours" direction. Best for: developer tools, AI assistant branding, tech products.</p>
  
  <div class="grid-3">
    <div class="concept-card">
      <img src="${MASCOT('mascot-v12-robot-companion.png')}" />
      <div class="meta"><h4>V12 — Robot Companion</h4><p>Apple-sleek robot, light bar eyes, seated pose.</p></div>
    </div>
    <div class="concept-card" style="border-color:${C.cyan}33;">
      <img src="${MASCOT('mascot-v23-premium-droid.png')}" />
      <div class="meta"><h4>V23 — Premium Droid <span class="badge badge-strong">STANDOUT</span></h4><p>Matte dark body, articulated joints, wolf silhouette DNA. "AURORA X1"</p></div>
    </div>
    <div class="concept-card">
      <img src="${MASCOT('mascot-v22-tech-avatar-head.png')}" />
      <div class="meta"><h4>V22 — Tech Avatar Head</h4><p>Full chrome wolf skull, circuit veins, energy wisps.</p></div>
    </div>
  </div>

  <div class="card" style="margin-top:16px;">
    <h3>Design Metrics — Direction E</h3>
    <table>
      <tr><th>Attribute</th><th>Score</th><th>Notes</th></tr>
      <tr><td>Emotional Connection</td><td style="color:${C.gold};">5/10</td><td>Less warm than organic, but V23 has "pet" quality</td></tr>
      <tr><td>Tech Credibility</td><td style="color:${C.emerald};">10/10</td><td>Maximum tech signal — unmistakably AI/robot</td></tr>
      <tr><td>Versatility</td><td style="color:${C.cyan};">6/10</td><td>Strong for tech, limited for creative/community</td></tr>
      <tr><td>Uniqueness</td><td style="color:${C.cyan};">7/10</td><td>V23 wolf-DNA robot is distinctive, V12 more generic</td></tr>
      <tr><td>Scalability</td><td style="color:${C.emerald};">8/10</td><td>Clean shapes work well at all sizes</td></tr>
    </table>
    <p style="margin-top:10px;font-size:11px;"><strong style="color:${C.cyan};">V23 standout:</strong> The premium droid retains wolf DNA in its silhouette while being unambiguously robotic. Ideal for a separate "AI assistant" product line while the organic/techno wolf serves the main brand.</p>
  </div>
  ${footer(8)}
</div>

<!-- ═══ PAGE 9: DIRECTION F — ABSTRACT MARKS ═══ -->
<div class="page page-dark">
  <div class="tag">DIRECTION F</div>
  <h2>Abstract Marks & Icons <span style="font-size:14px;color:${C.textMuted};font-weight:400;">— Logo-Level Simplification</span></h2>
  <p style="margin-bottom:16px;">The character reduced to its most essential geometric form. For: favicons, badges, watermarks, and places where a full character won't fit.</p>
  
  <div class="grid-3">
    <div class="concept-card">
      <img src="${MASCOT('axi-v3-icon.png')}" />
      <div class="meta"><h4>V3 — Original Icon</h4><p>Geometric wolf head, glowing accents.</p></div>
    </div>
    <div class="concept-card">
      <img src="${MASCOT('mascot-v17-negative-space-mark.png')}" />
      <div class="meta"><h4>V17 — Negative Space Mark</h4><p>"A" negative space, circuit lines, wolf silhouette.</p></div>
    </div>
    <div class="concept-card">
      <img src="${MASCOT('mascot-v18-hex-emblem.png')}" />
      <div class="meta"><h4>V18 — Hex Emblem</h4><p>Gold hexagonal badge, "ACOS" text, org avatar style.</p></div>
    </div>
  </div>

  <div style="margin-top:16px;">
    <h3>Hero Scenes (16:9 Format)</h3>
    <div class="grid-2" style="margin-top:10px;">
      <div class="concept-card">
        <img src="${MASCOT('mascot-v19-hero-command-center.png')}" style="aspect-ratio:16/9;"/>
        <div class="meta"><h4>V19 — Command Center</h4><p>Mascot with /acos hologram + glass panels. README hero.</p></div>
      </div>
      <div class="concept-card">
        <img src="${MASCOT('mascot-v20-evolution-stages.png')}" style="aspect-ratio:16/9;"/>
        <div class="meta"><h4>V20 — Evolution Stages</h4><p>Skills → Agents → System progression. Architecture hero.</p></div>
      </div>
    </div>
  </div>
  ${footer(9)}
</div>

<!-- ═══ PAGE 10: FINAL ROUND V21-V25 ═══ -->
<div class="page page-dark" style="background:linear-gradient(135deg,${C.purple}08 0%,${C.navy} 30%,${C.oled} 100%);">
  <div class="tag" style="color:${C.purple};border-color:${C.purple}4D;">FINAL ROUND</div>
  <h2>Strategic Deep-Dive Concepts <span style="font-size:14px;color:${C.textSecondary};font-weight:400;">— V21 through V25</span></h2>
  <p style="margin-bottom:16px;">Generated after marketing/design strategic analysis. Each concept addresses a specific gap identified in Rounds 1-3.</p>
  
  <div class="grid-3" style="margin-bottom:16px;">
    <div class="concept-card">
      <img src="${MASCOT('mascot-v21-stylized-avatar.png')}" />
      <div class="meta"><h4>V21 — Stylized Avatar</h4><p>Pixar-quality profile. Friendly + premium. Social media avatar.</p></div>
    </div>
    <div class="concept-card" style="border-color:${C.cyan}33;">
      <img src="${MASCOT('mascot-v24-cyborg-fusion-head.png')}" />
      <div class="meta"><h4>V24 — Cyborg Fusion <span class="badge badge-strong">STANDOUT</span></h4><p>Fur-to-chrome transition. Dual eyes. "FrankX.AI" embedded.</p></div>
    </div>
    <div class="concept-card" style="border-color:${C.emerald}33;">
      <img src="${MASCOT('mascot-v25-crystal-familiar.png')}" />
      <div class="meta"><h4>V25 — Crystal Familiar <span class="badge badge-rec">UNIQUE</span></h4><p>Geometric crystal fox. 3 brand-color tails. "Mona" option.</p></div>
    </div>
  </div>
  <div class="grid-2">
    <div class="concept-card">
      <img src="${MASCOT('mascot-v22-tech-avatar-head.png')}" />
      <div class="meta"><h4>V22 — Tech Avatar Head</h4><p>Chrome wolf skull with circuit veins and energy wisps. Developer mode.</p></div>
    </div>
    <div class="concept-card">
      <img src="${MASCOT('mascot-v23-premium-droid.png')}" />
      <div class="meta"><h4>V23 — Premium Droid</h4><p>Full robot body with wolf DNA. Apple keynote quality. AI product line.</p></div>
    </div>
  </div>
  ${footer(10)}
</div>

<!-- ═══ PAGE 11: COMPLETE CATALOG 1-12 ═══ -->
<div class="page page-dark">
  <div class="tag">CATALOG</div>
  <h2>Complete Concept Gallery <span style="font-size:14px;color:${C.textMuted};font-weight:400;">— All 25 Concepts (1/2)</span></h2>
  
  <div class="grid-4" style="margin-bottom:8px;">
    <div class="concept-card"><img src="${MASCOT('axi-v1-full.png')}" /><div class="meta"><h4>V1</h4><p>Original full body</p></div></div>
    <div class="concept-card"><img src="${MASCOT('axi-v2-avatar.png')}" /><div class="meta"><h4>V2</h4><p>Original avatar</p></div></div>
    <div class="concept-card"><img src="${MASCOT('axi-v3-icon.png')}" /><div class="meta"><h4>V3</h4><p>Original icon</p></div></div>
    <div class="concept-card"><img src="${MASCOT('axi-v4-hero.png')}" /><div class="meta"><h4>V4</h4><p>Original hero</p></div></div>
  </div>
  <div class="grid-4" style="margin-bottom:8px;">
    <div class="concept-card"><img src="${MASCOT('mascot-v05-techno-beast-standing.png')}" /><div class="meta"><h4>V5</h4><p>Techno-beast</p></div></div>
    <div class="concept-card"><img src="${MASCOT('mascot-v06-prowling-action.png')}" /><div class="meta"><h4>V6</h4><p>Prowling action</p></div></div>
    <div class="concept-card"><img src="${MASCOT('mascot-v07-kitsune-elegant.png')}" /><div class="meta"><h4>V7</h4><p>Kitsune elegant</p></div></div>
    <div class="concept-card"><img src="${MASCOT('mascot-v08-holographic-entity.png')}" /><div class="meta"><h4>V8</h4><p>Holographic entity</p></div></div>
  </div>
  <div class="grid-4">
    <div class="concept-card"><img src="${MASCOT('mascot-v09-wireframe-beast.png')}" /><div class="meta"><h4>V9</h4><p>Wireframe beast</p></div></div>
    <div class="concept-card"><img src="${MASCOT('mascot-v10-data-constellation.png')}" /><div class="meta"><h4>V10</h4><p>Data constellation</p></div></div>
    <div class="concept-card"><img src="${MASCOT('mascot-v11-chrome-guardian.png')}" /><div class="meta"><h4>V11</h4><p>Chrome guardian</p></div></div>
    <div class="concept-card"><img src="${MASCOT('mascot-v12-robot-companion.png')}" /><div class="meta"><h4>V12</h4><p>Robot companion</p></div></div>
  </div>
  ${footer(11)}
</div>

<!-- ═══ PAGE 12: COMPLETE CATALOG 13-25 ═══ -->
<div class="page page-dark">
  <div class="tag">CATALOG</div>
  <h2>Complete Concept Gallery <span style="font-size:14px;color:${C.textMuted};font-weight:400;">— All 25 Concepts (2/2)</span></h2>
  
  <div class="grid-4" style="margin-bottom:8px;">
    <div class="concept-card"><img src="${MASCOT('mascot-v13-floating-head-3d.png')}" /><div class="meta"><h4>V13</h4><p>Floating head 3D</p></div></div>
    <div class="concept-card"><img src="${MASCOT('mascot-v14-holographic-bust.png')}" /><div class="meta"><h4>V14</h4><p>Holographic bust</p></div></div>
    <div class="concept-card"><img src="${MASCOT('mascot-v15-kitsune-mask.png')}" /><div class="meta"><h4>V15</h4><p>Kitsune mask</p></div></div>
    <div class="concept-card"><img src="${MASCOT('mascot-v16-organic-digital-split.png')}" /><div class="meta"><h4>V16</h4><p>Organic/digital split</p></div></div>
  </div>
  <div class="grid-4" style="margin-bottom:8px;">
    <div class="concept-card"><img src="${MASCOT('mascot-v17-negative-space-mark.png')}" /><div class="meta"><h4>V17</h4><p>Negative space mark</p></div></div>
    <div class="concept-card"><img src="${MASCOT('mascot-v18-hex-emblem.png')}" /><div class="meta"><h4>V18</h4><p>Hex emblem</p></div></div>
    <div class="concept-card"><img src="${MASCOT('mascot-v19-hero-command-center.png')}" style="aspect-ratio:1;object-position:center;" /><div class="meta"><h4>V19</h4><p>Command center (16:9)</p></div></div>
    <div class="concept-card"><img src="${MASCOT('mascot-v20-evolution-stages.png')}" style="aspect-ratio:1;object-position:center;" /><div class="meta"><h4>V20</h4><p>Evolution stages (16:9)</p></div></div>
  </div>
  <div class="grid-4">
    <div class="concept-card" style="border-color:${C.purple}33;"><img src="${MASCOT('mascot-v21-stylized-avatar.png')}" /><div class="meta"><h4>V21</h4><p>Stylized avatar</p></div></div>
    <div class="concept-card" style="border-color:${C.cyan}33;"><img src="${MASCOT('mascot-v22-tech-avatar-head.png')}" /><div class="meta"><h4>V22</h4><p>Tech avatar head</p></div></div>
    <div class="concept-card" style="border-color:${C.gold}33;"><img src="${MASCOT('mascot-v23-premium-droid.png')}" /><div class="meta"><h4>V23</h4><p>Premium droid</p></div></div>
    <div class="concept-card" style="border-color:${C.emerald}33;"><img src="${MASCOT('mascot-v24-cyborg-fusion-head.png')}" /><div class="meta"><h4>V24</h4><p>Cyborg fusion</p></div></div>
  </div>
  <div class="grid-4" style="margin-top:8px;">
    <div class="concept-card" style="border-color:${C.purple}33;"><img src="${MASCOT('mascot-v25-crystal-familiar.png')}" /><div class="meta"><h4>V25</h4><p>Crystal familiar</p></div></div>
  </div>
  ${footer(12)}
</div>

<!-- ═══ PAGE 13: COMPETITIVE ANALYSIS ═══ -->
<div class="page page-accent">
  <div class="tag">COMPETITIVE ANALYSIS</div>
  <h2>How We Compare</h2>
  <p style="margin-bottom:20px;">Analyzing tier-1 tech mascots to ensure FrankX.AI's character occupies a unique position in the market.</p>
  
  <table>
    <tr><th>Brand</th><th>Mascot</th><th>Style</th><th>FrankX.AI Advantage</th></tr>
    <tr>
      <td style="color:${C.white};font-weight:600;">GitHub</td>
      <td>Mona (Octocat)</td>
      <td>Cute 2D illustration</td>
      <td>Our 3D wolf is more powerful, less cute — signals capability</td>
    </tr>
    <tr>
      <td style="color:${C.white};font-weight:600;">Firefox</td>
      <td>Fox wrapping globe</td>
      <td>Stylized 2D/3D</td>
      <td>Wolf > fox in premium positioning. Multi-tail is unique.</td>
    </tr>
    <tr>
      <td style="color:${C.white};font-weight:600;">Docker</td>
      <td>Moby (whale)</td>
      <td>Simple flat icon</td>
      <td>Our 3D depth and rendering modes give more visual range</td>
    </tr>
    <tr>
      <td style="color:${C.white};font-weight:600;">Linux</td>
      <td>Tux (penguin)</td>
      <td>Cartoon</td>
      <td>Premium glass/chrome materials vs. cartoon. Different tier.</td>
    </tr>
    <tr>
      <td style="color:${C.white};font-weight:600;">Copilot</td>
      <td>Abstract goggles</td>
      <td>Geometric icon</td>
      <td>Full character with personality vs. faceless icon</td>
    </tr>
    <tr>
      <td style="color:${C.white};font-weight:600;">Vercel</td>
      <td>Triangle logo</td>
      <td>Minimal geometric</td>
      <td>Character creates emotional connection logos can't</td>
    </tr>
  </table>

  <div class="grid-2" style="margin-top:20px;">
    <div class="card">
      <h3 style="color:${C.emerald};">Our Unique Position</h3>
      <ul style="font-size:11px;color:${C.textSecondary};line-height:1.8;padding-left:16px;">
        <li><strong style="color:${C.white};">Only multi-form character system</strong> — No competitor has organic + chrome + holo modes</li>
        <li><strong style="color:${C.white};">Wolf/kitsune hybrid</strong> — Unique creature type (not cat, not dog, not octopus)</li>
        <li><strong style="color:${C.white};">3-tail color coding</strong> — Built-in brand color system in the character</li>
        <li><strong style="color:${C.white};">Premium material language</strong> — Glass/chrome/obsidian vs. flat illustration</li>
      </ul>
    </div>
    <div class="card">
      <h3 style="color:${C.cyan};">Market Gap We Fill</h3>
      <p style="font-size:11px;line-height:1.7;">The AI/developer tool space is dominated by either <strong style="color:${C.white};">cute cartoon mascots</strong> (GitHub, Docker) or <strong style="color:${C.white};">abstract geometric logos</strong> (Copilot, Vercel). There's no premium 3D character that bridges both worlds. FrankX.AI's character system fills this gap: <em>powerful enough for enterprise, warm enough for community.</em></p>
    </div>
  </div>
  ${footer(13)}
</div>

<!-- ═══ PAGE 14: USAGE GUIDELINES ═══ -->
<div class="page page-dark">
  <div class="tag">USAGE GUIDELINES</div>
  <h2>Where Each Mode Goes</h2>
  
  <table style="margin-bottom:20px;">
    <tr><th>Context</th><th>Rendering Mode</th><th>Specific Concept</th><th>Why</th></tr>
    <tr>
      <td style="color:${C.white};">Website hero (frankx.ai)</td>
      <td>Holo / Techno-Beast</td>
      <td>V5 or custom hero</td>
      <td>Maximum visual impact, signals AI sophistication</td>
    </tr>
    <tr>
      <td style="color:${C.white};">GitHub profile / README</td>
      <td>Techno or Mech</td>
      <td>V22 or V24</td>
      <td>Developer credibility, tech-forward</td>
    </tr>
    <tr>
      <td style="color:${C.white};">Social media avatar</td>
      <td>Avatar</td>
      <td>V24 or V21</td>
      <td>Recognizable at small sizes, personality</td>
    </tr>
    <tr>
      <td style="color:${C.white};">Favicon / app icon</td>
      <td>Icon</td>
      <td>V3 or V17</td>
      <td>Readable at 16-32px</td>
    </tr>
    <tr>
      <td style="color:${C.white};">Arcanea / storytelling</td>
      <td>Organic</td>
      <td>V5, V7</td>
      <td>Mythological, warm, narrative-driven</td>
    </tr>
    <tr>
      <td style="color:${C.white};">ACOS documentation</td>
      <td>Techno-Beast</td>
      <td>V5 + hero scenes</td>
      <td>Bridges creator and developer audiences</td>
    </tr>
    <tr>
      <td style="color:${C.white};">Presentations / keynotes</td>
      <td>Holo / Mech</td>
      <td>V14, V24</td>
      <td>Professional, premium, impressive</td>
    </tr>
    <tr>
      <td style="color:${C.white};">Product pages / courses</td>
      <td>Crystal / Avatar</td>
      <td>V25, V21</td>
      <td>Approachable, inviting, memorable</td>
    </tr>
    <tr>
      <td style="color:${C.white};">Email / newsletter</td>
      <td>Avatar</td>
      <td>V21</td>
      <td>Warm, personal, consistent sender identity</td>
    </tr>
    <tr>
      <td style="color:${C.white};">AI assistant product</td>
      <td>Robotic</td>
      <td>V23</td>
      <td>Signals AI capability, product-grade</td>
    </tr>
  </table>

  <div class="do-dont">
    <div class="do-box">
      <h4>DO</h4>
      <ul style="padding-left:16px;">
        <li>Always use dark navy/obsidian backgrounds</li>
        <li>Maintain 3-tail color system (purple, cyan, gold)</li>
        <li>Keep heterochromia eyes when visible (amber L, cyan R)</li>
        <li>Use glass/chrome material language</li>
        <li>Ensure glowing accents have proper bloom/glow effect</li>
        <li>Include "FrankX.AI" text when space allows</li>
        <li>Match rendering mode to context (see table above)</li>
        <li>Maintain minimum clear space of 1x character width</li>
      </ul>
    </div>
    <div class="dont-box">
      <h4>DON'T</h4>
      <ul style="padding-left:16px;">
        <li>Never place on light/white backgrounds</li>
        <li>Never use pastel or candy colors</li>
        <li>Never make the character cute, childish, or cartoon-y</li>
        <li>Never use clay/claymorphic rendering</li>
        <li>Never stretch or distort proportions</li>
        <li>Never remove the glowing accents (they're core identity)</li>
        <li>Never mix rendering modes in a single image</li>
        <li>Never add hats, accessories, or "fun" modifications</li>
      </ul>
    </div>
  </div>
  ${footer(14)}
</div>

<!-- ═══ PAGE 15: SCORING MATRIX ═══ -->
<div class="page page-dark">
  <div class="tag">EVALUATION</div>
  <h2>Concept Scoring Matrix</h2>
  <p style="margin-bottom:16px;">Each concept rated across 6 dimensions. Score = sum of all dimensions (max 60).</p>
  
  <table style="font-size:10px;">
    <tr><th>Concept</th><th>Emotion</th><th>Tech</th><th>Versatile</th><th>Unique</th><th>Scale</th><th>Premium</th><th style="color:${C.cyan};">Total</th></tr>
    <tr><td style="color:${C.white};">V5 Techno-Beast</td><td>8</td><td>8</td><td>9</td><td>9</td><td>7</td><td>9</td><td style="color:${C.emerald};font-weight:700;">50</td></tr>
    <tr><td style="color:${C.white};">V24 Cyborg Fusion</td><td>7</td><td>9</td><td>8</td><td>9</td><td>8</td><td>9</td><td style="color:${C.emerald};font-weight:700;">50</td></tr>
    <tr><td style="color:${C.white};">V25 Crystal Familiar</td><td>8</td><td>7</td><td>8</td><td>10</td><td>7</td><td>8</td><td style="color:${C.cyan};font-weight:700;">48</td></tr>
    <tr><td style="color:${C.white};">V23 Premium Droid</td><td>5</td><td>10</td><td>6</td><td>7</td><td>8</td><td>10</td><td style="color:${C.cyan};font-weight:700;">46</td></tr>
    <tr><td style="color:${C.white};">V15 Kitsune Mask</td><td>6</td><td>8</td><td>7</td><td>8</td><td>7</td><td>9</td><td style="color:${C.textSecondary};">45</td></tr>
    <tr><td style="color:${C.white};">V11 Chrome Guardian</td><td>6</td><td>9</td><td>7</td><td>7</td><td>6</td><td>9</td><td style="color:${C.textSecondary};">44</td></tr>
    <tr><td style="color:${C.white};">V22 Tech Avatar</td><td>4</td><td>10</td><td>6</td><td>8</td><td>8</td><td>8</td><td style="color:${C.textSecondary};">44</td></tr>
    <tr><td style="color:${C.white};">V21 Stylized Avatar</td><td>9</td><td>5</td><td>7</td><td>6</td><td>8</td><td>7</td><td style="color:${C.textSecondary};">42</td></tr>
    <tr><td style="color:${C.white};">V16 Organic Split</td><td>7</td><td>7</td><td>6</td><td>8</td><td>5</td><td>8</td><td style="color:${C.textSecondary};">41</td></tr>
    <tr><td style="color:${C.white};">V7 Kitsune Elegant</td><td>9</td><td>4</td><td>5</td><td>8</td><td>5</td><td>8</td><td style="color:${C.textSecondary};">39</td></tr>
  </table>

  <div class="card" style="margin-top:20px;border-color:${C.emerald}33;">
    <h3 style="color:${C.emerald};">Recommendation: Dual Primary System</h3>
    <div class="grid-2" style="margin-top:12px;">
      <div>
        <p style="font-size:12px;"><strong style="color:${C.white};">Primary Character: V5 (Techno-Beast)</strong></p>
        <p style="font-size:11px;">The definitive FrankX.AI character. Organic wolf body with hex-circuit patterns and brand-color tails. Works everywhere. This is the "Firefox fox" equivalent — the main brand mark.</p>
      </div>
      <div>
        <p style="font-size:12px;"><strong style="color:${C.white};">Primary Avatar: V24 (Cyborg Fusion)</strong></p>
        <p style="font-size:11px;">The definitive profile image. Half-organic, half-chrome with heterochromia eyes. This is the "Mona" equivalent — the social/profile identity. Embodies AI-human collaboration.</p>
      </div>
    </div>
    <p style="margin-top:12px;font-size:11px;"><strong style="color:${C.cyan};">Supporting cast:</strong> V23 (droid) for AI product branding, V25 (crystal) for unique "creature" contexts, V22 (tech skull) for developer docs, V17/V18 for icons/badges.</p>
  </div>
  ${footer(15)}
</div>

<!-- ═══ PAGE 16: IMPLEMENTATION ROADMAP ═══ -->
<div class="page page-dark">
  <div class="tag">NEXT STEPS</div>
  <h2>Implementation Roadmap</h2>
  
  <div class="grid-2" style="margin-bottom:20px;">
    <div class="card">
      <h3 style="color:${C.cyan};">Phase 1: Selection & Refinement</h3>
      <ol style="font-size:11px;color:${C.textSecondary};line-height:1.8;padding-left:16px;">
        <li>Review this brief and select primary direction(s)</li>
        <li>Choose 2-3 concepts for refinement</li>
        <li>Generate 3-5 refined variants of chosen concepts</li>
        <li>Define exact pose/angle for each rendering mode</li>
        <li>Create turnaround sheet (front, side, 3/4 views)</li>
      </ol>
    </div>
    <div class="card">
      <h3 style="color:${C.purple};">Phase 2: Production Assets</h3>
      <ol style="font-size:11px;color:${C.textSecondary};line-height:1.8;padding-left:16px;">
        <li>Generate all size variants (favicon → hero)</li>
        <li>Create transparent PNG versions</li>
        <li>Build animated variants (CSS/Lottie)</li>
        <li>Generate OG images with character</li>
        <li>Create sticker/emoji pack for community</li>
      </ol>
    </div>
  </div>

  <div class="grid-2">
    <div class="card">
      <h3 style="color:${C.gold};">Phase 3: Integration</h3>
      <ol style="font-size:11px;color:${C.textSecondary};line-height:1.8;padding-left:16px;">
        <li>Replace crown in ACOS infographics</li>
        <li>Update GitHub profile images</li>
        <li>Add to frankx.ai website header/hero</li>
        <li>Create loading animation for CLI</li>
        <li>Generate product thumbnails with character</li>
      </ol>
    </div>
    <div class="card">
      <h3 style="color:${C.emerald};">Phase 4: Ecosystem</h3>
      <ol style="font-size:11px;color:${C.textSecondary};line-height:1.8;padding-left:16px;">
        <li>Create Arcanea-specific organic variants</li>
        <li>Build character into product pages</li>
        <li>Design merch-ready versions</li>
        <li>Create 3D model for web (Three.js)</li>
        <li>Generate video intro animations</li>
      </ol>
    </div>
  </div>

  <div class="card" style="margin-top:20px;">
    <h3>Technical Specifications for Reproduction</h3>
    <table>
      <tr><th>Parameter</th><th>Value</th></tr>
      <tr><td>Generator</td><td>Gemini 3 Pro Image via Nano Banana MCP</td></tr>
      <tr><td>Model Tier</td><td>Pro (highest quality)</td></tr>
      <tr><td>Thinking Level</td><td>High (extended reasoning)</td></tr>
      <tr><td>Base Resolution</td><td>1024x1024 (square) or 1376x768 (hero)</td></tr>
      <tr><td>Style Anchor</td><td>Dark navy bg, 3D rendering, glass/chrome/neon accents</td></tr>
      <tr><td>Negative Prompt</td><td>No clay, no pastel, no cartoon, no cute, no toy aesthetic</td></tr>
    </table>
  </div>
  ${footer(16)}
</div>

<!-- ═══ PAGE 17: PROMPT TEMPLATES ═══ -->
<div class="page page-dark">
  <div class="tag">REPRODUCTION</div>
  <h2>Prompt Templates for Consistency</h2>
  <p style="margin-bottom:16px;">Use these exact prompt structures when generating new character variants to maintain visual consistency.</p>
  
  <div class="card" style="margin-bottom:14px;">
    <h3 style="color:${C.emerald};">Organic Mode Template</h3>
    <p style="font-family:'JetBrains Mono',monospace;font-size:10px;line-height:1.7;color:${C.textSecondary};background:${C.oled};padding:12px;border-radius:6px;margin-top:8px;">
      Premium 3D render of a majestic dark wolf-fox-kitsune hybrid creature standing on dark navy background (#0F172A). Sleek obsidian fur with subtle hexagonal circuit patterns glowing cyan (#43BFE3) beneath the surface. Three magnificent tails: one purple (#AB47C7), one cyan (#43BFE3), one gold (#F59E0B). Intelligent eyes with left amber, right cyan heterochromia. Small chrome ear accents. Photorealistic 3D, cinematic lighting, subtle particle effects. Studio quality, NOT cute, NOT cartoon. Premium, powerful, sophisticated.
    </p>
  </div>

  <div class="card" style="margin-bottom:14px;">
    <h3 style="color:${C.cyan};">Techno/Mech Mode Template</h3>
    <p style="font-family:'JetBrains Mono',monospace;font-size:10px;line-height:1.7;color:${C.textSecondary};background:${C.oled};padding:12px;border-radius:6px;margin-top:8px;">
      Premium 3D render of a cybernetic wolf head floating on dark navy background (#0F172A). Chrome and obsidian mechanical wolf skull with glowing cyan (#43BFE3) circuit veins, purple (#AB47C7) energy seams, gold (#F59E0B) accent highlights on ears. Polished chrome panels, visible circuitry, energy wisps flowing from behind in brand colors. Photorealistic 3D rendering, dramatic rim lighting, dark tech aesthetic. NOT cute, NOT cartoon. Premium, powerful, technological.
    </p>
  </div>

  <div class="card" style="margin-bottom:14px;">
    <h3 style="color:${C.gold};">Robot/Droid Mode Template</h3>
    <p style="font-family:'JetBrains Mono',monospace;font-size:10px;line-height:1.7;color:${C.textSecondary};background:${C.oled};padding:12px;border-radius:6px;margin-top:8px;">
      Premium 3D render of a sleek AI robot dog/wolf sitting on dark obsidian pedestal. Matte dark charcoal body with polished chrome joints and accents. Wolf DNA silhouette — pointed ears, elegant snout. Glowing cyan (#43BFE3) light bar eyes, purple (#AB47C7) accent lines along spine, gold (#F59E0B) joint highlights. Apple product keynote quality. Dark navy background (#0F172A). Photorealistic 3D, studio lighting. NOT cute, NOT toy-like. Premium, sophisticated, powerful.
    </p>
  </div>

  <div class="card">
    <h3 style="color:${C.purple};">Cyborg Fusion Template</h3>
    <p style="font-family:'JetBrains Mono',monospace;font-size:10px;line-height:1.7;color:${C.textSecondary};background:${C.oled};padding:12px;border-radius:6px;margin-top:8px;">
      Premium 3D render of a wolf head, seamless half-organic half-chrome transition. Left side: dark fur with amber eye and subtle golden hex patterns. Right side: polished chrome mechanical with cyan eye and circuit line details. Energy wisps in purple (#AB47C7), cyan (#43BFE3), and gold (#F59E0B) flowing from behind. Dark navy background (#0F172A). "FrankX.AI" text subtly integrated. Photorealistic 3D, cinematic lighting. NOT cute, NOT cartoon. Premium, powerful, technological meets organic.
    </p>
  </div>
  ${footer(17)}
</div>

<!-- ═══ PAGE 18: BACK COVER ═══ -->
<div class="page" style="background:${C.oled};display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:80px;position:relative;">
  <div style="position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,${C.purple}10 0%,transparent 70%);top:50%;left:50%;transform:translate(-50%,-50%);z-index:0;"></div>
  <div style="position:relative;z-index:1;">
    <h1 style="font-size:42px;color:${C.white};margin-bottom:6px;">FrankX.AI</h1>
    <p style="font-size:16px;color:${C.cyan};margin-bottom:24px;font-weight:500;">Build what matters.</p>
    <div class="divider" style="margin:0 auto 32px;"></div>
    <p style="font-size:12px;color:${C.textMuted};line-height:1.8;max-width:400px;">
      25 character concepts &nbsp;·&nbsp; 7 design directions<br/>
      5 rendering modes &nbsp;·&nbsp; 1 character system<br/><br/>
      <span style="color:${C.textSecondary};">frankx.ai &nbsp;·&nbsp; github.com/frankxai</span>
    </p>
    <p style="margin-top:40px;font-family:'JetBrains Mono',monospace;font-size:9px;color:${C.textMuted};letter-spacing:0.1em;">
      INTERNAL DESIGN DOCUMENT &nbsp;·&nbsp; FEBRUARY 2026 &nbsp;·&nbsp; V1.0
    </p>
  </div>
  ${footer(18)}
</div>

</body>
</html>`
}

async function main() {
  console.log('Launching Playwright...')
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  
  const html = buildHTML()
  const tmpHtml = '/tmp/character-brief.html'
  writeFileSync(tmpHtml, html)
  console.log(`HTML written to ${tmpHtml}`)
  
  await page.goto(`file://${tmpHtml}`, { waitUntil: 'networkidle', timeout: 60000 })
  console.log('Page loaded, waiting for images...')
  
  await page.waitForTimeout(5000) // let images load
  
  const pdfPath = join(OUTPUT_DIR, 'FrankX-AI-Character-Design-Brief.pdf')
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    landscape: true,
    printBackground: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
    preferCSSPageSize: false,
  })
  
  console.log(`PDF generated: ${pdfPath}`)
  await browser.close()
  console.log('Done!')
}

main().catch(console.error)
