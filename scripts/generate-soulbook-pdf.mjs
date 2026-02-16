#!/usr/bin/env node
/**
 * Generate the Soulbook 7 Pillars Framework PDF
 * Usage: node scripts/generate-soulbook-pdf.mjs
 * Output: public/products/soulbook-7-pillars-framework.pdf
 */

import puppeteer from 'puppeteer'
import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUTPUT_DIR = join(__dirname, '..', 'public', 'products')
const OUTPUT_FILE = join(OUTPUT_DIR, 'soulbook-7-pillars-framework.pdf')

// ─── Pillar Data ──────────────────────────────────────────────
const pillars = [
  {
    number: 1,
    title: 'Energy',
    subtitle: 'The Foundation',
    color: '#10B981',
    colorLight: 'rgba(16,185,129,0.15)',
    practices: [
      'Morning protocol: light, movement, cold, hydration within 90 minutes',
      'Energy audit: track inputs, drains, and levels for one week',
      'Sleep as investment: 7-8h non-negotiable, consistent schedule',
      'Nutrition timing: eat for performance, not just pleasure',
    ],
    question: 'What gave you energy this week? What drained it?',
  },
  {
    number: 2,
    title: 'Mind',
    subtitle: 'The Operating System',
    color: '#06B6D4',
    colorLight: 'rgba(6,182,212,0.15)',
    practices: [
      'Cognitive load management: single-task deep work blocks',
      'Input diet: curate information sources ruthlessly',
      'Mental models: learn frameworks, not just facts',
      'Stress inoculation: controlled discomfort builds resilience',
    ],
    question: 'What thought pattern is holding you back right now?',
  },
  {
    number: 3,
    title: 'Soul',
    subtitle: 'The Compass',
    color: '#8B5CF6',
    colorLight: 'rgba(139,92,246,0.15)',
    practices: [
      'Values clarity: name your top 5 non-negotiable values',
      'Solitude practice: 20 minutes daily without input',
      'Alignment check: does your calendar match your values?',
      'Purpose iteration: purpose evolves — revisit quarterly',
    ],
    question: 'If you could only do one thing for the rest of your life, what would it be?',
  },
  {
    number: 4,
    title: 'Craft',
    subtitle: 'The Work',
    color: '#F59E0B',
    colorLight: 'rgba(245,158,11,0.15)',
    practices: [
      'Deliberate practice: focused effort at the edge of ability',
      '10,000 hours with feedback, not just repetition',
      'Ship consistently: finished work beats perfect plans',
      'Master one thing before diversifying',
    ],
    question: 'What skill would 10x your impact if you mastered it?',
  },
  {
    number: 5,
    title: 'Capital',
    subtitle: 'The Leverage',
    color: '#EAB308',
    colorLight: 'rgba(234,179,8,0.15)',
    practices: [
      'Income diversification: build multiple revenue streams',
      'Savings rate > income level for wealth building',
      'Invest in assets that compound: skills, relationships, equity',
      'Financial literacy: understand tax, debt, and compound interest',
    ],
    question: 'How many income streams do you have? What could you add?',
  },
  {
    number: 6,
    title: 'Circle',
    subtitle: 'The Network',
    color: '#F43F5E',
    colorLight: 'rgba(244,63,94,0.15)',
    practices: [
      'Audit your top 5: you become the average of your closest people',
      'Give first: create value before asking for anything',
      'Prune deliberately: distance from chronic negativity',
      'Build across domains: diverse networks > deep silos',
    ],
    question: 'Who in your life elevates you? Who drains you?',
  },
  {
    number: 7,
    title: 'Legacy',
    subtitle: 'The Long Game',
    color: '#A855F7',
    colorLight: 'rgba(168,85,247,0.15)',
    practices: [
      'Think in decades, act in days',
      'Build things that outlast you: systems, content, institutions',
      'Teach what you know: legacy compounds through others',
      'Design for your future self, not your current comfort',
    ],
    question: 'What would you want people to say about you in 30 years?',
  },
]

// ─── HTML Template ────────────────────────────────────────────
function generateHTML() {
  const pillarCards = pillars
    .map(
      (p) => `
    <div class="pillar-card" style="border-color: ${p.color}25;">
      <div class="pillar-header">
        <div class="pillar-number" style="background: ${p.colorLight}; color: ${p.color}; border: 1px solid ${p.color}30;">
          ${String(p.number).padStart(2, '0')}
        </div>
        <div>
          <div class="pillar-title">${p.title}</div>
          <div class="pillar-subtitle">${p.subtitle}</div>
        </div>
      </div>
      <ul class="pillar-practices">
        ${p.practices.map((pr) => `<li>${pr}</li>`).join('')}
      </ul>
      <div class="pillar-question" style="border-color: ${p.color}20; background: ${p.colorLight};">
        <div class="question-label" style="color: ${p.color};">Reflect</div>
        <div class="question-text">${p.question}</div>
      </div>
    </div>
  `
    )
    .join('')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: #050508;
      color: #E2E8F0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    /* ─── Page 1: Cover ─── */
    .cover {
      width: 100%;
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      position: relative;
      overflow: hidden;
      background:
        radial-gradient(ellipse 70% 50% at 50% 30%, rgba(245,158,11,0.08) 0%, transparent 70%),
        radial-gradient(circle at 20% 80%, rgba(168,85,247,0.06) 0%, transparent 40%),
        radial-gradient(circle at 80% 80%, rgba(6,182,212,0.05) 0%, transparent 40%),
        linear-gradient(180deg, #080A12 0%, #050508 100%);
      page-break-after: always;
    }

    .cover-badge {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      padding: 8px 20px;
      border-radius: 100px;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.06);
      font-size: 12px;
      color: rgba(255,255,255,0.4);
      letter-spacing: 0.05em;
      margin-bottom: 32px;
    }

    .cover-badge .dot {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: rgba(255,255,255,0.15);
    }

    .cover-label {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: rgba(245,158,11,0.6);
      margin-bottom: 20px;
    }

    .cover-title {
      font-size: 56px;
      font-weight: 800;
      line-height: 1.1;
      letter-spacing: -0.03em;
      margin-bottom: 12px;
    }

    .cover-title .white { color: #FFFFFF; }

    .cover-title .gold {
      background: linear-gradient(135deg, #FFE5A0 0%, #D4AF37 40%, #F59E0B 70%, #FFE5A0 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .cover-sub {
      font-size: 16px;
      color: rgba(255,255,255,0.35);
      max-width: 440px;
      line-height: 1.7;
      margin: 0 auto 48px;
    }

    .cover-pillars {
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
      max-width: 500px;
      margin: 0 auto 48px;
    }

    .cover-pill {
      padding: 6px 14px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 500;
      border: 1px solid;
    }

    .cover-url {
      font-size: 13px;
      color: rgba(255,255,255,0.2);
      letter-spacing: 0.03em;
    }

    .cover-url strong {
      color: rgba(245,158,11,0.5);
      font-weight: 600;
    }

    /* ─── Divider line decoration ─── */
    .gold-line {
      width: 60px;
      height: 2px;
      background: linear-gradient(90deg, transparent, rgba(245,158,11,0.5), transparent);
      margin: 24px auto;
      border-radius: 1px;
    }

    /* ─── Page 2-3: Pillars ─── */
    .pillars-page {
      padding: 48px 56px;
      min-height: 100vh;
      background:
        radial-gradient(ellipse 50% 30% at 50% 0%, rgba(245,158,11,0.04) 0%, transparent 100%),
        #050508;
    }

    .page-header {
      text-align: center;
      margin-bottom: 36px;
    }

    .page-header h2 {
      font-size: 28px;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: #FFFFFF;
      margin-bottom: 6px;
    }

    .page-header p {
      font-size: 13px;
      color: rgba(255,255,255,0.3);
    }

    .pillars-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .pillar-card {
      background:
        linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%),
        rgba(15,16,24,0.8);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 16px;
      padding: 20px;
      position: relative;
      overflow: hidden;
    }

    /* Subtle top-edge highlight — simulates glass refraction */
    .pillar-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.12) 70%, transparent 100%);
    }

    .pillar-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 14px;
    }

    .pillar-number {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 700;
      flex-shrink: 0;
    }

    .pillar-title {
      font-size: 17px;
      font-weight: 700;
      color: #FFFFFF;
      letter-spacing: -0.01em;
    }

    .pillar-subtitle {
      font-size: 11px;
      color: rgba(255,255,255,0.25);
      margin-top: 1px;
    }

    .pillar-practices {
      list-style: none;
      padding: 0;
      margin-bottom: 14px;
    }

    .pillar-practices li {
      font-size: 11.5px;
      line-height: 1.6;
      color: rgba(255,255,255,0.5);
      padding: 3px 0 3px 16px;
      position: relative;
    }

    .pillar-practices li::before {
      content: '›';
      position: absolute;
      left: 0;
      color: rgba(255,255,255,0.2);
      font-weight: 600;
    }

    .pillar-question {
      border-radius: 10px;
      padding: 12px 14px;
      border: 1px solid;
    }

    .question-label {
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      margin-bottom: 4px;
    }

    .question-text {
      font-size: 12px;
      color: rgba(255,255,255,0.55);
      line-height: 1.5;
      font-style: italic;
    }

    /* ─── Page 3: How to Use + Footer ─── */
    .how-section {
      page-break-before: always;
      padding: 48px 56px;
      min-height: 100vh;
      background:
        radial-gradient(ellipse 50% 40% at 50% 50%, rgba(245,158,11,0.04) 0%, transparent 100%),
        #050508;
    }

    .how-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 20px;
      margin-bottom: 48px;
    }

    .how-card {
      background:
        linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%),
        rgba(15,16,24,0.8);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 16px;
      padding: 28px 24px;
      text-align: center;
      position: relative;
    }

    .how-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    }

    .how-step {
      font-size: 32px;
      font-weight: 800;
      background: linear-gradient(180deg, rgba(245,158,11,0.4) 0%, rgba(245,158,11,0.15) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 12px;
    }

    .how-title {
      font-size: 18px;
      font-weight: 700;
      color: #FFFFFF;
      margin-bottom: 8px;
    }

    .how-desc {
      font-size: 13px;
      color: rgba(255,255,255,0.35);
      line-height: 1.6;
    }

    /* Daily practice section */
    .daily-practice {
      background:
        linear-gradient(135deg, rgba(245,158,11,0.06) 0%, rgba(168,85,247,0.04) 100%),
        rgba(15,16,24,0.8);
      border: 1px solid rgba(245,158,11,0.12);
      border-radius: 20px;
      padding: 36px 40px;
      margin-bottom: 48px;
      position: relative;
    }

    .daily-practice::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(245,158,11,0.25), transparent);
    }

    .daily-practice h3 {
      font-size: 20px;
      font-weight: 700;
      color: #FFFFFF;
      margin-bottom: 16px;
    }

    .daily-list {
      list-style: none;
      padding: 0;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }

    .daily-list li {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 13px;
      color: rgba(255,255,255,0.5);
      line-height: 1.5;
    }

    .daily-list .check {
      width: 18px;
      height: 18px;
      border-radius: 5px;
      border: 1.5px solid rgba(245,158,11,0.3);
      background: rgba(245,158,11,0.05);
      flex-shrink: 0;
      margin-top: 1px;
    }

    /* Footer */
    .pdf-footer {
      text-align: center;
      padding-top: 36px;
      border-top: 1px solid rgba(255,255,255,0.04);
    }

    .pdf-footer .brand {
      font-size: 13px;
      font-weight: 600;
      color: rgba(255,255,255,0.4);
      margin-bottom: 6px;
    }

    .pdf-footer .url {
      font-size: 12px;
      color: rgba(245,158,11,0.4);
      margin-bottom: 4px;
    }

    .pdf-footer .tagline {
      font-size: 11px;
      color: rgba(255,255,255,0.15);
      margin-top: 8px;
    }

    /* ─── Print / PDF specifics ─── */
    @page {
      size: A4;
      margin: 0;
    }
  </style>
</head>
<body>

  <!-- ═══ PAGE 1: COVER ═══ -->
  <div class="cover">
    <div class="cover-badge">
      <span>Free Framework</span>
      <span class="dot"></span>
      <span>11 Books</span>
      <span class="dot"></span>
      <span>82 Chapters</span>
    </div>

    <div class="cover-label">Soulbook</div>

    <div class="cover-title">
      <div class="white">7 Pillars of</div>
      <div class="gold">a Complete Life</div>
    </div>

    <div class="gold-line"></div>

    <div class="cover-sub">
      A practical framework for building every dimension of your life.
      Energy. Mind. Soul. Craft. Capital. Circle. Legacy.
    </div>

    <div class="cover-pillars">
      ${pillars
        .map(
          (p) =>
            `<span class="cover-pill" style="color: ${p.color}; border-color: ${p.color}30; background: ${p.colorLight};">${p.title}</span>`
        )
        .join('')}
    </div>

    <div class="cover-url">
      Read the full chapters free at <strong>frankx.ai/soulbook</strong>
    </div>
  </div>

  <!-- ═══ PAGE 2: PILLARS 1-4 ═══ -->
  <div class="pillars-page" style="page-break-after: always;">
    <div class="page-header">
      <h2>The 7 Pillars</h2>
      <p>Each pillar is a full chapter — practical, no filler, immediately useful</p>
    </div>
    <div class="pillars-grid">
      ${pillarCards.split('</div>').slice(0, 4).join('</div>') + '</div>'}
    </div>
  </div>

  <!-- ═══ PAGE 3: PILLARS 5-7 + HOW TO USE ═══ -->
  <div class="how-section">
    <div class="pillars-grid" style="margin-bottom: 36px;">
      ${pillars
        .slice(4)
        .map(
          (p) => `
        <div class="pillar-card" style="border-color: ${p.color}25;">
          <div class="pillar-header">
            <div class="pillar-number" style="background: ${p.colorLight}; color: ${p.color}; border: 1px solid ${p.color}30;">
              ${String(p.number).padStart(2, '0')}
            </div>
            <div>
              <div class="pillar-title">${p.title}</div>
              <div class="pillar-subtitle">${p.subtitle}</div>
            </div>
          </div>
          <ul class="pillar-practices">
            ${p.practices.map((pr) => `<li>${pr}</li>`).join('')}
          </ul>
          <div class="pillar-question" style="border-color: ${p.color}20; background: ${p.colorLight};">
            <div class="question-label" style="color: ${p.color};">Reflect</div>
            <div class="question-text">${p.question}</div>
          </div>
        </div>
      `
        )
        .join('')}
    </div>

    <div class="page-header" style="margin-top: 8px;">
      <h2>How to Use This Framework</h2>
      <p>Three steps to start building a complete life</p>
    </div>

    <div class="how-grid">
      <div class="how-card">
        <div class="how-step">01</div>
        <div class="how-title">Assess</div>
        <div class="how-desc">Rate each pillar 1-10. Which scores lowest? That's where you start.</div>
      </div>
      <div class="how-card">
        <div class="how-step">02</div>
        <div class="how-title">Read</div>
        <div class="how-desc">Read the full chapter for your weakest pillar. Each is practical and immediately useful.</div>
      </div>
      <div class="how-card">
        <div class="how-step">03</div>
        <div class="how-title">Practice</div>
        <div class="how-desc">Pick one key practice per pillar. Apply daily for 30 days. Small actions compound.</div>
      </div>
    </div>

    <div class="daily-practice">
      <h3>Your Daily Practice Checklist</h3>
      <ul class="daily-list">
        <li><span class="check"></span>Morning protocol: light, movement, hydration</li>
        <li><span class="check"></span>2 hours of single-task deep work</li>
        <li><span class="check"></span>20 minutes of solitude — no input</li>
        <li><span class="check"></span>1 hour of deliberate skill practice</li>
        <li><span class="check"></span>Review finances: track one metric</li>
        <li><span class="check"></span>Create value for one person today</li>
        <li><span class="check"></span>Journal: one sentence about legacy</li>
        <li><span class="check"></span>Energy check: rate 1-10, note why</li>
      </ul>
    </div>

    <div class="pdf-footer">
      <div class="brand">FrankX</div>
      <div class="url">frankx.ai/soulbook</div>
      <div class="gold-line"></div>
      <div class="tagline">11 books. 82 chapters. All free to read. Build what matters.</div>
    </div>
  </div>

</body>
</html>`
}

// ─── Generate PDF ─────────────────────────────────────────────
async function main() {
  console.log('Generating Soulbook 7 Pillars Framework PDF...')

  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--single-process',
    ],
  })

  try {
    const page = await browser.newPage()
    const html = generateHTML()
    await page.setContent(html, { waitUntil: 'networkidle0', timeout: 30000 })

    await page.pdf({
      path: OUTPUT_FILE,
      format: 'A4',
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      preferCSSPageSize: true,
    })

    console.log(`PDF generated: ${OUTPUT_FILE}`)
    const { size } = await import('fs').then((fs) => fs.statSync(OUTPUT_FILE))
    console.log(`Size: ${(size / 1024).toFixed(0)} KB`)
  } finally {
    await browser.close()
  }
}

main().catch((err) => {
  console.error('PDF generation failed:', err.message)
  process.exit(1)
})
