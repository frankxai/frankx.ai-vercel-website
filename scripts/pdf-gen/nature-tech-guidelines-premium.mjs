#!/usr/bin/env node
/**
 * Nature × Technology Design Guidelines — Premium PDF
 * Playwright/Chromium HTML-to-PDF with embedded variant images
 * 
 * Usage: node scripts/pdf-gen/nature-tech-guidelines-premium.mjs
 */

import { chromium } from 'playwright'
import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

const ROOT = '/mnt/c/Users/Frank/FrankX'
const OUTPUT_DIR = join(ROOT, 'public/products')
mkdirSync(OUTPUT_DIR, { recursive: true })

// ─── Image paths (file:// for local Chromium) ───
const IMG = {
  homepage: `file://${ROOT}/public/images/design-lab/variant-homepage-nature.png`,
  products: `file://${ROOT}/public/images/design-lab/variant-products-nature.png`,
  blog: `file://${ROOT}/public/images/design-lab/variant-blog-nature.png`,
  labs: `file://${ROOT}/public/images/design-lab/variant-labs-nature.png`,
  innerCircle: `file://${ROOT}/public/images/design-lab/variant-inner-circle-nature.png`,
  acos: `file://${ROOT}/public/images/design-lab/variant-acos-nature.png`,
  concept1: `file://${ROOT}/public/images/design-lab/nature-01-digital-garden.png`,
  concept2: `file://${ROOT}/public/images/design-lab/nature-04-data-streams.png`,
  concept3: `file://${ROOT}/public/images/design-lab/nature-05-forest-architecture.png`,
  concept4: `file://${ROOT}/public/images/design-lab/nature-10-constellation-garden.png`,
}

// ─── Design Tokens ───
const C = {
  navy: '#0F172A', oled: '#030712', soil: '#0a0a0b',
  card: '#1a1a1f', elevated: '#252530',
  border: 'rgba(255,255,255,0.06)',
  glass: 'rgba(255,255,255,0.03)',
  white: '#FFFFFF', offWhite: '#F8FAFC',
  textPrimary: '#E2E8F0', textSecondary: '#94A3B8',
  textMuted: '#64748B',
  purple: '#AB47C7', cyan: '#43BFE3',
  emerald: '#10B981', gold: '#F59E0B',
  rose: '#F43F5E',
}

const TOTAL_PAGES = 10

function footer(page) {
  return `<div style="position:absolute;bottom:24px;left:48px;right:48px;display:flex;justify-content:space-between;font-size:10px;color:${C.textMuted};letter-spacing:0.1em;">
    <span>FRANKX.AI — NATURE × TECHNOLOGY</span>
    <span>${page} / ${TOTAL_PAGES}</span>
  </div>`
}

function sectionTag(text, color = C.emerald) {
  return `<div style="display:inline-flex;align-items:center;gap:8px;padding:6px 16px;border-radius:20px;background:${color}15;border:1px solid ${color}30;margin-bottom:16px;">
    <span style="width:6px;height:6px;border-radius:50%;background:${color};"></span>
    <span style="font-size:11px;font-weight:600;color:${color};letter-spacing:0.15em;text-transform:uppercase;">${text}</span>
  </div>`
}

function accentLine(color = C.emerald) {
  return `<div style="height:2px;width:60px;background:linear-gradient(90deg,${color},transparent);margin:20px 0;border-radius:1px;"></div>`
}

// ─── Build all pages as one HTML document ───
const pages = []

// PAGE 1: Cover
pages.push(`<div class="page" style="background:linear-gradient(135deg,${C.navy} 0%,${C.oled} 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;position:relative;">
  <div style="position:absolute;top:0;left:0;right:0;bottom:0;background:radial-gradient(ellipse at 30% 40%, ${C.emerald}10, transparent 60%),radial-gradient(ellipse at 70% 60%, ${C.purple}08, transparent 50%);"></div>
  <div style="position:relative;z-index:1;">
    <div style="font-size:12px;font-weight:700;letter-spacing:0.3em;color:${C.emerald};margin-bottom:32px;text-transform:uppercase;">FrankX.AI Design System</div>
    <h1 style="font-size:52px;font-weight:800;color:${C.white};margin:0 0 12px;line-height:1.1;">Nature × Technology</h1>
    <h2 style="font-size:28px;font-weight:400;color:${C.textSecondary};margin:0 0 48px;">Design Guidelines</h2>
    
    <div style="display:flex;gap:24px;justify-content:center;margin-bottom:48px;">
      ${[
        { n: '10', l: 'Concept Images' },
        { n: '6', l: 'Hub Variants' },
        { n: '5', l: 'Principles' },
        { n: '3', l: 'Phases' },
      ].map(s => `<div style="background:${C.glass};border:1px solid ${C.border};border-radius:12px;padding:16px 24px;backdrop-filter:blur(8px);">
        <div style="font-size:28px;font-weight:800;color:${C.white};">${s.n}</div>
        <div style="font-size:11px;color:${C.textMuted};text-transform:uppercase;letter-spacing:0.1em;">${s.l}</div>
      </div>`).join('')}
    </div>
    
    <div style="font-size:13px;color:${C.textMuted};">February 2026 · v1.0</div>
  </div>
  ${footer(1)}
</div>`)

// PAGE 2: Philosophy
pages.push(`<div class="page" style="background:${C.navy};padding:56px;position:relative;">
  ${sectionTag('Philosophy')}
  <h2 style="font-size:36px;font-weight:800;color:${C.white};margin:8px 0 20px;">Organic Intelligence</h2>
  ${accentLine()}
  
  <blockquote style="font-size:22px;color:${C.textPrimary};line-height:1.6;border-left:3px solid ${C.emerald};padding-left:24px;margin:24px 0 32px;font-style:italic;">
    "The best technology doesn't feel manufactured. It feels grown."
  </blockquote>
  
  <p style="font-size:15px;color:${C.textSecondary};line-height:1.8;margin-bottom:32px;max-width:580px;">
    Nature × Technology isn't decoration — it's a design philosophy where digital interfaces behave like living ecosystems. Information flows like water, hierarchies grow like trees, and intelligence networks mimic mycelium.
  </p>
  
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
    ${[
      { title: 'Organic Architecture', desc: 'Layouts that breathe — asymmetric grids, flowing whitespace, natural proportions', color: C.emerald },
      { title: 'Bioluminescent Hierarchy', desc: 'Attention guided by light intensity, not size alone. Critical elements glow.', color: C.cyan },
      { title: 'Glassmorphic Ecology', desc: 'Layered transparency creates depth and atmosphere — forest canopy light filtering.', color: C.purple },
      { title: 'Neural Connectivity', desc: 'Visual connections between elements — mycelium lines, particle streams, flowing data.', color: C.gold },
    ].map(p => `<div style="background:${p.color}08;border:1px solid ${p.color}20;border-radius:12px;padding:20px;">
      <div style="font-size:14px;font-weight:700;color:${p.color};margin-bottom:8px;">${p.title}</div>
      <div style="font-size:12px;color:${C.textSecondary};line-height:1.6;">${p.desc}</div>
    </div>`).join('')}
  </div>
  ${footer(2)}
</div>`)

// PAGE 3: Color System
pages.push(`<div class="page" style="background:linear-gradient(180deg,${C.navy} 0%,${C.oled} 100%);padding:56px;position:relative;">
  ${sectionTag('Color System', C.cyan)}
  <h2 style="font-size:32px;font-weight:800;color:${C.white};margin:8px 0 20px;">Nature-Tech Palette</h2>
  ${accentLine(C.cyan)}
  
  <h3 style="font-size:16px;font-weight:700;color:${C.white};margin:24px 0 12px;">Foundation Colors</h3>
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-bottom:28px;">
    ${[
      { name: 'Root', hex: '#1a0f2e', desc: 'Deep violet soil' },
      { name: 'Bark', hex: '#2a1f3e', desc: 'Purple-brown bark' },
      { name: 'Moss', hex: '#0d3320', desc: 'Forest floor' },
      { name: 'Canopy', hex: '#0a2e1f', desc: 'Deep emerald shade' },
      { name: 'Stream', hex: '#0c2d4a', desc: 'Running water' },
    ].map(c => `<div style="text-align:center;">
      <div style="width:100%;height:48px;background:${c.hex};border-radius:8px;border:1px solid rgba(255,255,255,0.08);margin-bottom:8px;"></div>
      <div style="font-size:11px;font-weight:600;color:${C.white};">${c.name}</div>
      <div style="font-size:10px;color:${C.textMuted};">${c.hex}</div>
    </div>`).join('')}
  </div>
  
  <h3 style="font-size:16px;font-weight:700;color:${C.white};margin:24px 0 12px;">Bioluminescent Accents</h3>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:28px;">
    ${[
      { name: 'Synapse', hex: '#AB47C7', desc: 'Intelligence • ACOS' },
      { name: 'Data', hex: '#43BFE3', desc: 'Technology • Vibe OS' },
      { name: 'Growth', hex: '#10B981', desc: 'Success • CTAs' },
      { name: 'Creation', hex: '#F59E0B', desc: 'Music • GenCreator' },
    ].map(c => `<div style="text-align:center;">
      <div style="width:100%;height:56px;background:${c.hex};border-radius:10px;box-shadow:0 4px 20px ${c.hex}40;margin-bottom:8px;"></div>
      <div style="font-size:12px;font-weight:600;color:${c.hex};">${c.name}</div>
      <div style="font-size:10px;color:${C.textMuted};">${c.hex}</div>
      <div style="font-size:9px;color:${C.textMuted};margin-top:2px;">${c.desc}</div>
    </div>`).join('')}
  </div>
  
  <h3 style="font-size:16px;font-weight:700;color:${C.white};margin:24px 0 12px;">CSS Custom Properties</h3>
  <div style="background:#0d1117;border-radius:10px;padding:20px;font-family:'JetBrains Mono',monospace;font-size:12px;line-height:1.8;color:${C.textSecondary};border-top:3px solid;border-image:linear-gradient(90deg,${C.emerald},${C.cyan}) 1;">
    <span style="color:${C.emerald};">--nature-root:</span> #1a0f2e;<br/>
    <span style="color:${C.emerald};">--nature-bark:</span> #2a1f3e;<br/>
    <span style="color:${C.cyan};">--glow-synapse:</span> #AB47C7;<br/>
    <span style="color:${C.cyan};">--glow-data:</span> #43BFE3;<br/>
    <span style="color:${C.cyan};">--glow-growth:</span> #10B981;<br/>
    <span style="color:${C.cyan};">--glow-creation:</span> #F59E0B;
  </div>
  ${footer(3)}
</div>`)

// PAGE 4: Concept Gallery (4 images)
pages.push(`<div class="page" style="background:${C.oled};padding:48px;position:relative;">
  ${sectionTag('Concept Gallery', C.purple)}
  <h2 style="font-size:32px;font-weight:800;color:${C.white};margin:8px 0 24px;">10 AI-Generated Concepts</h2>
  
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
    ${[
      { img: IMG.concept1, label: 'Digital Garden — Holographic forest clearing' },
      { img: IMG.concept2, label: 'Data Streams — Bioluminescent river of information' },
      { img: IMG.concept3, label: 'Forest Architecture — Code-vine covered server towers' },
      { img: IMG.concept4, label: 'Constellation Garden — Star-map knowledge network' },
    ].map(c => `<div style="border-radius:12px;overflow:hidden;border:1px solid ${C.border};">
      <img src="${c.img}" style="width:100%;height:180px;object-fit:cover;display:block;" loading="eager"/>
      <div style="padding:10px 14px;background:${C.glass};">
        <div style="font-size:11px;color:${C.textSecondary};line-height:1.4;">${c.label}</div>
      </div>
    </div>`).join('')}
  </div>
  
  <p style="font-size:12px;color:${C.textMuted};text-align:center;margin-top:20px;">
    Generated with Gemini 3 Pro Image via Nano Banana MCP · 1376×768 · 16:9 · Pro Tier
  </p>
  ${footer(4)}
</div>`)

// PAGES 5-7: Hub Variants (2 per page)
const variants = [
  { img: IMG.homepage, title: 'Homepage', subtitle: 'Neural tree hero with bioluminescent canopy', color: C.emerald,
    notes: ['Central neural tree replaces gradient hero', 'Stats as glowing seed pods', 'Content cards with organic stone aesthetic', 'Firefly particle effects'] },
  { img: IMG.products, title: 'Products Hub', subtitle: 'Crystal gem cards with mycelium connections', color: C.cyan,
    notes: ['Product cards as translucent crystal gems', 'Mycelium network lines show relationships', 'Geothermal emerald glow from below', 'Hover: crystal facets rotate'] },
  { img: IMG.blog, title: 'Blog Hub', subtitle: 'Midnight forest library with vine timeline', color: C.purple,
    notes: ['Blog cards float like illuminated leaves', 'Growing vine timeline on sidebar', 'Category badges with bioluminescent colors', 'Subtle parallax forest depth layers'] },
  { img: IMG.labs, title: 'Labs', subtitle: 'Greenhouse laboratory with terrarium cards', color: C.gold,
    notes: ['Glass terrariums contain each experiment', 'Holographic metrics tree', 'Crystal formation tab navigation', 'Bioluminescent borders pulse with data'] },
  { img: IMG.innerCircle, title: 'Inner Circle', subtitle: 'Sacred grove archway with crystal tiers', color: C.gold,
    notes: ['Neural trees form glowing archway', 'Membership tiers as crystals', 'Glassmorphic portal card centered', 'Gold accent for premium exclusivity'] },
  { img: IMG.acos, title: 'ACOS Hub', subtitle: 'Forest canopy aerial view with agent networks', color: C.emerald,
    notes: ['Aerial forest view — each tree is an agent', 'Mycelium pathways show communication', 'Terminal overlay with /acos command', 'Constellation stats in aurora sky'] },
]

for (let i = 0; i < variants.length; i += 2) {
  const pageNum = 5 + Math.floor(i / 2)
  const pair = variants.slice(i, i + 2)
  
  pages.push(`<div class="page" style="background:linear-gradient(180deg,${C.navy} 0%,${C.oled} 100%);padding:48px;position:relative;">
    ${i === 0 ? `${sectionTag('Hub Variants', C.cyan)}<h2 style="font-size:28px;font-weight:800;color:${C.white};margin:8px 0 20px;">Page Redesign Concepts</h2>` : ''}
    
    <div style="display:flex;flex-direction:column;gap:${i === 0 ? '16' : '24'}px;${i === 0 ? '' : 'margin-top:20px;'}">
      ${pair.map(v => `<div style="display:grid;grid-template-columns:1.4fr 1fr;gap:16px;align-items:start;">
        <div style="border-radius:12px;overflow:hidden;border:1px solid ${C.border};">
          <img src="${v.img}" style="width:100%;height:${i === 0 ? '200' : '220'}px;object-fit:cover;display:block;" loading="eager"/>
        </div>
        <div>
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
            <div style="width:8px;height:8px;border-radius:50%;background:${v.color};box-shadow:0 0 8px ${v.color};"></div>
            <h3 style="font-size:18px;font-weight:700;color:${C.white};margin:0;">${v.title}</h3>
          </div>
          <p style="font-size:12px;color:${v.color};margin:0 0 12px;font-style:italic;">${v.subtitle}</p>
          <ul style="margin:0;padding:0;list-style:none;">
            ${v.notes.map(n => `<li style="font-size:11px;color:${C.textSecondary};line-height:1.6;padding-left:14px;position:relative;">
              <span style="position:absolute;left:0;top:6px;width:4px;height:4px;border-radius:50%;background:${v.color}60;"></span>
              ${n}
            </li>`).join('')}
          </ul>
        </div>
      </div>`).join('')}
    </div>
    ${footer(pageNum)}
  </div>`)
}

// PAGE 8: Component Patterns
pages.push(`<div class="page" style="background:${C.navy};padding:56px;position:relative;">
  ${sectionTag('Components', C.gold)}
  <h2 style="font-size:32px;font-weight:800;color:${C.white};margin:8px 0 24px;">Nature-Tech Patterns</h2>
  
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
    ${[
      { title: 'Forest Card', desc: 'Glassmorphic card with bioluminescent border glow on hover. bg-white/[0.03], border with accent color at 6% opacity. Bottom radial glow on hover.', color: C.emerald },
      { title: 'Crystal Gem Card', desc: 'Product cards with CSS 3D transform for faceted appearance. Each refracts its brand accent color. Connected by animated SVG mycelium lines.', color: C.cyan },
      { title: 'Seed Pod Stats', desc: 'Rounded stat containers with bioluminescent glow underneath. Icon color matches domain. Bottom accent line on hover.', color: C.purple },
      { title: 'Vine Timeline', desc: 'SVG path with growing animation on scroll. Categories as colored leaf markers along the vine. Used for blog chronological sidebar.', color: C.gold },
      { title: 'ForestCanopy Background', desc: 'Replaces AuroraBackground. Three radial gradients (emerald, purple, cyan) with 40s ambient animation. Grain overlay for organic feel.', color: C.emerald },
      { title: 'Firefly Particles', desc: '8 deterministic particles with varied glow colors. Fade in/out with vertical drift. Respects prefers-reduced-motion.', color: C.gold },
    ].map(c => `<div style="background:${c.color}06;border:1px solid ${c.color}15;border-radius:12px;padding:18px;">
      <div style="font-size:13px;font-weight:700;color:${c.color};margin-bottom:6px;">${c.title}</div>
      <div style="font-size:11px;color:${C.textSecondary};line-height:1.6;">${c.desc}</div>
    </div>`).join('')}
  </div>
  ${footer(8)}
</div>`)

// PAGE 9: Diagram Strategy
pages.push(`<div class="page" style="background:linear-gradient(180deg,${C.oled} 0%,${C.navy} 100%);padding:56px;position:relative;">
  ${sectionTag('Diagram Strategy', C.rose)}
  <h2 style="font-size:32px;font-weight:800;color:${C.white};margin:8px 0 16px;">Replacing ASCII Art</h2>
  <p style="font-size:13px;color:${C.textSecondary};line-height:1.7;margin-bottom:24px;">
    22 blog posts contain 1,516 lines of box-drawing characters. Three-tier replacement strategy:
  </p>
  
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-bottom:28px;">
    ${[
      { tier: 'Tier 1: AI Images', desc: 'Hero and concept diagrams. Nano Banana MCP, ~$0.04/image. Already generating 10+ per batch.', color: C.emerald, cost: '$0.04/img' },
      { tier: 'Tier 2: Custom SVG', desc: 'Technical architecture diagrams. React components with brand styling. One-time dev cost.', color: C.cyan, cost: 'Dev time' },
      { tier: 'Tier 3: Mermaid', desc: 'Internal-only flowcharts. Fast to create, acceptable for docs and planning. Not public-facing.', color: C.purple, cost: 'Free' },
    ].map(t => `<div style="background:${t.color}08;border:1px solid ${t.color}20;border-radius:12px;padding:18px;">
      <div style="font-size:13px;font-weight:700;color:${t.color};margin-bottom:4px;">${t.tier}</div>
      <div style="font-size:10px;color:${t.color};margin-bottom:8px;font-weight:600;">${t.cost}</div>
      <div style="font-size:11px;color:${C.textSecondary};line-height:1.6;">${t.desc}</div>
    </div>`).join('')}
  </div>
  
  <h3 style="font-size:16px;font-weight:700;color:${C.white};margin-bottom:12px;">Cost Comparison</h3>
  <table style="width:100%;border-collapse:collapse;font-size:11px;">
    <thead>
      <tr style="border-bottom:1px solid ${C.border};">
        <th style="text-align:left;padding:8px 12px;color:${C.textMuted};font-weight:600;">Approach</th>
        <th style="text-align:center;padding:8px 12px;color:${C.textMuted};font-weight:600;">1 Page</th>
        <th style="text-align:center;padding:8px 12px;color:${C.textMuted};font-weight:600;">100 Pages</th>
        <th style="text-align:center;padding:8px 12px;color:${C.textMuted};font-weight:600;">Quality</th>
      </tr>
    </thead>
    <tbody>
      ${[
        { name: 'ASCII art', p1: '$0', p100: '$0', q: '2/10', qc: C.rose },
        { name: 'Mermaid', p1: '$0', p100: '$0', q: '4/10', qc: C.gold },
        { name: 'AI Images', p1: '$0.04', p100: '$4', q: '8/10', qc: C.emerald },
        { name: 'Custom SVG React', p1: '$50+', p100: '$200+', q: '9/10', qc: C.emerald },
        { name: 'D2 / Terrastruct', p1: '$0', p100: '$12/mo', q: '6/10', qc: C.cyan },
      ].map((r, i) => `<tr style="border-bottom:1px solid ${C.border};${i % 2 ? `background:rgba(255,255,255,0.02);` : ''}">
        <td style="padding:8px 12px;color:${C.textPrimary};font-weight:500;">${r.name}</td>
        <td style="text-align:center;padding:8px 12px;color:${C.textSecondary};">${r.p1}</td>
        <td style="text-align:center;padding:8px 12px;color:${C.textSecondary};">${r.p100}</td>
        <td style="text-align:center;padding:8px 12px;color:${r.qc};font-weight:600;">${r.q}</td>
      </tr>`).join('')}
    </tbody>
  </table>
  ${footer(9)}
</div>`)

// PAGE 10: Implementation Roadmap
pages.push(`<div class="page" style="background:${C.navy};padding:56px;position:relative;">
  ${sectionTag('Roadmap')}
  <h2 style="font-size:32px;font-weight:800;color:${C.white};margin:8px 0 24px;">Implementation Phases</h2>
  
  ${[
    { phase: 'Phase 1: Foundation', color: C.emerald, items: [
      'Create shared ForestCanopy background component',
      'Define nature-tech CSS custom properties in globals.css',
      'Build ForestCard component (glass + bioluminescent border)',
      'Firefly particle system with reduced-motion support',
    ]},
    { phase: 'Phase 2: Hub Pages', color: C.cyan, items: [
      'Homepage nature variant as A/B test candidate',
      'Products and ACOS hubs with crystal/mycelium treatment',
      'Blog hub with vine timeline and leaf-card layout',
    ]},
    { phase: 'Phase 3: Polish & Ship', color: C.purple, items: [
      'Labs and Inner Circle get nature treatment',
      'Cross-page particle and aurora consistency pass',
      'Performance audit — nature elements add <50KB to bundles',
    ]},
  ].map(p => `<div style="background:${p.color}06;border:1px solid ${p.color}15;border-radius:14px;padding:20px;margin-bottom:16px;">
    <div style="font-size:14px;font-weight:700;color:${p.color};margin-bottom:12px;">${p.phase}</div>
    ${p.items.map(item => `<div style="display:flex;gap:10px;align-items:flex-start;margin-bottom:6px;">
      <div style="width:5px;height:5px;border-radius:50%;background:${p.color};margin-top:5px;flex-shrink:0;"></div>
      <span style="font-size:12px;color:${C.textSecondary};line-height:1.5;">${item}</span>
    </div>`).join('')}
  </div>`).join('')}
  
  <div style="background:${C.glass};border:1px solid ${C.border};border-radius:14px;padding:20px;margin-top:16px;">
    <h3 style="font-size:14px;font-weight:700;color:${C.white};margin:0 0 12px;">Performance Budget</h3>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">
      ${[
        { label: 'JS Bundle', target: '<50KB', status: 'Target' },
        { label: 'LCP', target: '<2.5s', status: 'Target' },
        { label: 'CLS', target: '<0.1', status: 'Target' },
      ].map(m => `<div style="text-align:center;padding:12px;background:rgba(255,255,255,0.02);border-radius:8px;">
        <div style="font-size:20px;font-weight:800;color:${C.emerald};">${m.target}</div>
        <div style="font-size:10px;color:${C.textMuted};margin-top:4px;">${m.label}</div>
      </div>`).join('')}
    </div>
  </div>
  
  <p style="text-align:center;font-size:12px;color:${C.textMuted};margin-top:24px;">
    frankx.ai/design-lab/nature · Build what matters.
  </p>
  ${footer(10)}
</div>`)

// ─── Assemble HTML ───
const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
    
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', system-ui, sans-serif; }
    
    .page {
      width: 793px;
      height: 1122px;
      position: relative;
      overflow: hidden;
      page-break-after: always;
    }
    .page:last-child { page-break-after: auto; }
    
    h1, h2, h3 { font-family: 'Inter', system-ui, sans-serif; }
    img { max-width: 100%; }
  </style>
</head>
<body>
  ${pages.join('\n')}
</body>
</html>`

// ─── Generate PDF ───
async function generatePDF() {
  console.log('Launching Chromium...')
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  
  // Write HTML to temp file for reliable image loading
  const tmpHtml = '/tmp/nature-tech-guidelines.html'
  writeFileSync(tmpHtml, html)
  
  await page.goto(`file://${tmpHtml}`, { waitUntil: 'networkidle' })
  
  // Wait for images to load
  await page.waitForTimeout(3000)
  
  const outputPath = join(OUTPUT_DIR, 'Nature-Tech-Design-Guidelines.pdf')
  
  await page.pdf({
    path: outputPath,
    width: '793px',
    height: '1122px',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  })
  
  await browser.close()
  
  // Get file size
  const { statSync } = await import('fs')
  const stats = statSync(outputPath)
  const sizeMB = (stats.size / 1024 / 1024).toFixed(1)
  console.log(`PDF generated: ${outputPath}`)
  console.log(`Size: ${sizeMB} MB (${stats.size.toLocaleString()} bytes)`)
}

generatePDF().catch(console.error)
