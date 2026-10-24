#!/usr/bin/env node
/**
 * scripts/infogenius.mjs
 *
 * Unified InfoGenius v5.1 Local CLI — Google AI Studio App + Arcanea MCP + FrankX Preset Library.
 *
 * Pipeline:
 *   1. RESEARCH: Gemini + Google Search grounding (`researchTopicForPrompt`)
 *      → extracts verified FACTS, VISUAL_ELEMENTS, LABELS, CONTEXT, VIDEO_PROMPT, and web citations.
 *   2. IMAGE:    Nano Banana Pro (`gemini-3-pro-image-preview`) / Nano Banana 2 (`gemini-3.1-flash-image-preview`)
 *      → renders 2K/4K infographic in v5.1 styles (`glassmorphic`, `premium`, `technical`, `3d`, etc.) or v2 presets.
 *   3. ANIMATE:  Optional `--animate` flag → Veo 3.1 (`veo-3.1-fast-generate-preview`) 7s 720p motion MP4.
 *   4. NARRATE:  Optional `--narrate` flag → Gemini TTS (`gemini-2.5-flash-preview-tts`, voice `Kore`) WAV audio.
 *   5. SIDECAR:  Writes `<output>.vis.provenance.json` (Zero-Orphan Prompt Rule) + prints `<LiquidGlassZoom />` MDX snippet.
 *
 * Usage:
 *   node scripts/infogenius.mjs "Sovereign AI Agent Architecture" --style glassmorphic
 *   node scripts/infogenius.mjs --topic "Multi-Agent Swarm Routing" --style premium --audience expert --size 4K
 *   node scripts/infogenius.mjs "Model Context Protocol" --style frankx/da-vinci-technical --animate --narrate
 *   node scripts/infogenius.mjs --list-styles
 *   node scripts/infogenius.mjs "Autonomous AI Swarms" --style glassmorphic --dry-run
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname, relative, basename } from 'node:path';
import {
  MODELS,
  STYLES_V5,
  AUDIENCES_V5,
  loadApiKey,
  loadOpenRouterKey,
  resolveProviderCredentials,
  researchTopicForPrompt,
  composeInfographicPrompt,
  generateImage,
  generateInfographicVideo,
  generateNarration,
} from './lib/nb-image.mjs';
import { loadPresets, getPreset } from './image-ops/preset-loader.mjs';

function parseArgs(argv) {
  const args = {
    topic: '',
    fromFile: '',
    style: 'glassmorphic',
    audience: 'college',
    aspect: '16:9',
    size: '2K',
    model: 'nbpro',
    provider: 'auto',
    label: '',
    language: 'English',
    voice: 'Kore',
    out: '',
    facts: [],
    animate: false,
    narrate: false,
    skipResearch: false,
    researchOnly: false,
    dryRun: false,
    listStyles: false,
    syncInfisical: false,
    help: false,
  };

  const positional = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const next = () => argv[++i];
    if (a === '--topic' || a === '-t') args.topic = next() || '';
    else if (a === '--from-file' || a === '--file' || a === '-f') args.fromFile = next() || '';
    else if (a === '--style' || a === '-s') args.style = next() || 'glassmorphic';
    else if (a === '--audience' || a === '-a') args.audience = next() || 'college';
    else if (a === '--aspect') args.aspect = next() || '16:9';
    else if (a === '--size') args.size = next() || '2K';
    else if (a === '--model' || a === '-m') args.model = next() || 'nbpro';
    else if (a === '--provider' || a === '-p') args.provider = next() || 'auto';
    else if (a === '--label' || a === '-l') args.label = next() || '';
    else if (a === '--language' || a === '--lang') args.language = next() || 'English';
    else if (a === '--voice') args.voice = next() || 'Kore';
    else if (a === '--out' || a === '-o') args.out = next() || '';
    else if (a === '--fact') args.facts.push(next() || '');
    else if (a === '--animate' || a === '--video') args.animate = true;
    else if (a === '--narrate' || a === '--audio' || a === '--tts') args.narrate = true;
    else if (a === '--skip-research' || a === '--no-research') args.skipResearch = true;
    else if (a === '--research-only') args.researchOnly = true;
    else if (a === '--dry-run') args.dryRun = true;
    else if (a === '--list-styles' || a === '--styles') args.listStyles = true;
    else if (a === '--sync-infisical') args.syncInfisical = true;
    else if (a === '--help' || a === '-h') args.help = true;
    else if (!a.startsWith('-')) positional.push(a);
  }

  if (!args.topic && positional.length > 0) {
    args.topic = positional.join(' ');
  }

  return args;
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

function printHelp() {
  console.log(`
InfoGenius v5.1 Local CLI — Knowledge-First Visual Intelligence
===============================================================

Usage:
  node scripts/infogenius.mjs "<topic>" [options]

Options:
  --topic, -t <text>       Topic, concept, or question to research & visualize
  --from-file, -f <path>   Decompose a Markdown/MDX article into a 5-slide visual pack
  --style, -s <key>        v5.1 style (glassmorphic, premium, standard, minimalist,
                           photorealistic, 3d, technical, futuristic, vintage, cartoon)
                           OR v2 preset key (e.g. frankx/da-vinci-technical)
                           [default: glassmorphic]
  --audience, -a <level>   elementary | highschool | college | expert [default: college]
  --aspect <ratio>         16:9 | 1:1 | 9:16 [default: 16:9]
  --size <res>             1K | 2K | 4K [default: 2K]
  --model, -m <model>      nbpro (Nano Banana Pro) | nb2 (Nano Banana 2) [default: nbpro]
  --provider, -p <prov>    auto | google | openrouter [default: auto]
  --label, -l <title>      Optional prominent header title on the infographic
  --fact "<fact>"          Provide explicit fact (repeatable; merges with or replaces research)
  --animate                Also generate a 7s 720p motion video via Veo 3.1 (.mp4)
  --narrate                Also generate spoken fact narration via Gemini TTS Kore (.wav)
  --voice <name>           TTS voice name [default: Kore]
  --out, -o <path>         Custom output file path
  --research-only          Run Google Search grounded research and print JSON without image gen
  --skip-research          Compose prompt directly without Google Search grounding
  --dry-run                Preview resolved style, composed prompt, and output paths (0 API cost)
  --list-styles            List all v5.1 styles and v2 brand presets
  --sync-infisical         Pull GEMINI_API_KEY & OPENROUTER_API_KEY from Infisical into ~/.starlight/.env
  --help, -h               Show this help message
`);
}

async function printStyles() {
  console.log('\n=== InfoGenius v5.1 Core Styles ===');
  for (const [key, val] of Object.entries(STYLES_V5)) {
    console.log(`  ${key.padEnd(16)} → ${val.name}`);
  }

  try {
    const data = await loadPresets();
    console.log(`\n=== Preset Library v${data.version} (${data.presets.length} presets) ===`);
    for (const p of data.presets) {
      console.log(`  ${p.key.padEnd(32)} → ${p.name} [${p.defaultAspect}]`);
    }
  } catch {
    // ignore if preset file missing
  }

  console.log('\n=== Audience Density Levels ===');
  for (const [key, val] of Object.entries(AUDIENCES_V5)) {
    console.log(`  ${key.padEnd(16)} → ${val.label} (${val.density} density)`);
  }
  console.log('');
}

async function resolveStyleConfig(styleKey) {
  let preset = null;
  try {
    preset = await getPreset(styleKey);
  } catch {
    preset = null;
  }

  const v5Style = STYLES_V5[styleKey];
  if (v5Style && preset) {
    return {
      key: styleKey,
      presetKey: preset.key,
      name: v5Style.name,
      instruction: `${v5Style.instruction}\nBRAND PALETTE: ${(preset.palette || []).join(', ')}\nCOMPOSITION: ${preset.composition || ''}`,
      defaultAspect: preset.defaultAspect || '16:9',
    };
  }
  if (v5Style) {
    return {
      key: styleKey,
      presetKey: `v5/${styleKey}`,
      name: v5Style.name,
      instruction: v5Style.instruction,
      defaultAspect: '16:9',
    };
  }
  if (preset) {
    return {
      key: styleKey,
      presetKey: preset.key,
      name: preset.name,
      instruction: `${preset.promptFragment}\nBRAND PALETTE: ${(preset.palette || []).join(', ')}\nCOMPOSITION: ${preset.composition || ''}`,
      defaultAspect: preset.defaultAspect || '16:9',
    };
  }

  const fallback = STYLES_V5.glassmorphic;
  return {
    key: 'glassmorphic',
    presetKey: 'community/glassmorphic',
    name: fallback.name,
    instruction: fallback.instruction,
    defaultAspect: '16:9',
  };
}

function decomposeMarkdownToSlides(markdown, fallbackTitle, styleCfg, audience, aspectRatio) {
  const lines = markdown
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  const h1Match = lines.find((l) => /^#\s+/.test(l)) || lines.find((l) => /^title:\s*/i.test(l));
  const articleTitle =
    fallbackTitle ||
    (h1Match ? h1Match.replace(/^(#\s+|title:\s*)/i, '').replace(/^["']|["']$/g, '').trim() : 'Technical Architecture Brief');

  const headings = lines
    .filter((l) => /^#{2,3}\s+/.test(l))
    .map((l) => l.replace(/^#{2,3}\s+/, '').trim());

  const bullets = lines
    .filter((l) => /^[-*•]\s+/.test(l) || /^\d+\.\s+/.test(l))
    .map((l) => l.replace(/^([-*•]|\d+\.)\s+/, '').replace(/\*\*/g, '').trim())
    .filter((l) => l.length > 12);

  const paragraphs = lines
    .filter((l) => !l.startsWith('#') && !l.startsWith('-') && !l.startsWith('*') && !l.startsWith('>') && !l.startsWith('---') && l.length > 40)
    .map((l) => l.replace(/\*\*/g, '').slice(0, 180));

  const pool = [...bullets, ...paragraphs];
  const slideRoles = [
    { index: 1, role: '01 — Hero Executive Overview', focus: headings[0] || `${articleTitle}: Core Thesis` },
    { index: 2, role: '02 — System Architecture & Topology', focus: headings[1] || `${articleTitle}: Component Stack` },
    { index: 3, role: '03 — Execution Pipeline & Data Flow', focus: headings[2] || `${articleTitle}: Step-by-Step Workflow` },
    { index: 4, role: '04 — Benchmarks, Metrics & Trade-offs', focus: headings[3] || `${articleTitle}: Performance Matrix` },
    { index: 5, role: '05 — Implementation Blueprint & Checklist', focus: headings[4] || `${articleTitle}: Deployment Playbook` },
  ];

  const slides = slideRoles.map((sr, idx) => {
    const start = idx * 3;
    const slideFacts = pool.slice(start, start + 3);
    while (slideFacts.length < 3) {
      slideFacts.push(`${sr.focus} — verified principle #${slideFacts.length + 1}`);
    }
    const research = {
      facts: slideFacts,
      visualElements: [
        `Slide ${sr.index}/5 structural diagram for ${sr.focus}`,
        `Key metric & architecture callout cards`,
        `Directional progression badge (${sr.index} of 5)`,
      ],
      labels: [sr.focus.slice(0, 42), `Slide 0${sr.index}`, articleTitle.slice(0, 32)],
      context: `Part ${sr.index} of 5-slide visual pack for ${articleTitle}`,
      sources: [],
      searchResults: [],
      videoPrompt: `Cinematic 7-second animation of ${sr.focus}. ${styleCfg.instruction}`,
    };
    const imagePrompt = composeInfographicPrompt({
      topic: `${articleTitle} — ${sr.focus}`,
      research,
      styleName: styleCfg.name,
      styleInstruction: styleCfg.instruction,
      audience,
      aspectRatio,
      label: sr.focus.slice(0, 48),
    });
    return {
      index: sr.index,
      role: sr.role,
      title: sr.focus,
      facts: slideFacts,
      labels: research.labels,
      imagePrompt,
    };
  });

  return { articleTitle, slides };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    printHelp();
    return;
  }

  if (args.listStyles) {
    await printStyles();
    return;
  }

  if (args.syncInfisical) {
    const gCred = loadApiKey({ allowInfisical: true });
    const oCred = loadOpenRouterKey({ allowInfisical: true });
    const envTarget = resolve('C:/Users/frank/.starlight/.env');
    const lines = ['# Starlight Estate Shared Environment (Synced via --sync-infisical)'];
    if (gCred.key) lines.push(`GEMINI_API_KEY=${gCred.key}`);
    else lines.push('GEMINI_API_KEY=<paste-fresh-aistudio-key-here>');
    if (oCred.key) lines.push(`OPENROUTER_API_KEY=${oCred.key}`);
    else lines.push('OPENROUTER_API_KEY=<paste-openrouter-key-here>');
    writeFileSync(envTarget, lines.join('\n') + '\n');
    console.log(
      JSON.stringify(
        {
          synced: envTarget,
          geminiFound: Boolean(gCred.key),
          geminiSource: gCred.source,
          openrouterFound: Boolean(oCred.key),
          openrouterSource: oCred.source,
        },
        null,
        2
      )
    );
    return;
  }

  if (args.fromFile) {
    const filePath = resolve(process.cwd(), args.fromFile);
    if (!existsSync(filePath)) {
      console.error(`✗ File not found: ${filePath}`);
      process.exit(1);
    }
    const markdown = readFileSync(filePath, 'utf8');
    const styleCfg = await resolveStyleConfig(args.style);
    const aspectRatio = args.aspect || styleCfg.defaultAspect || '16:9';
    const fallbackTitle = args.topic || basename(filePath).replace(/\.[a-z0-9]+$/i, '');
    const pack = decomposeMarkdownToSlides(markdown, fallbackTitle, styleCfg, args.audience, aspectRatio);
    const baseSlug = slugify(pack.articleTitle);
    const styleSlug = slugify(args.style);

    if (args.dryRun) {
      console.log(
        JSON.stringify(
          {
            dryRun: true,
            mode: 'from-file-5-slide-pack',
            sourceFile: filePath,
            articleTitle: pack.articleTitle,
            style: styleCfg.presetKey,
            aspectRatio,
            slides: pack.slides.map((s) => ({
              index: s.index,
              role: s.role,
              title: s.title,
              facts: s.facts,
              outputPath: resolve(
                process.cwd(),
                `public/images/blog/generated/infogenius-${styleSlug}-${baseSlug}-slide-0${s.index}.png`
              ),
              imagePrompt: s.imagePrompt,
            })),
          },
          null,
          2
        )
      );
      return;
    }

    const generatedSlides = [];
    for (const slide of pack.slides) {
      const slideOut = resolve(
        process.cwd(),
        `public/images/blog/generated/infogenius-${styleSlug}-${baseSlug}-slide-0${slide.index}.png`
      );
      const img = await generateImage({
        prompt: slide.imagePrompt,
        outputPath: slideOut,
        model: args.model,
        aspectRatio,
        imageSize: args.size,
        provider: args.provider,
        enforceDesignThinking: true,
      });
      generatedSlides.push({ index: slide.index, role: slide.role, title: slide.title, path: img.path });
    }
    console.log(JSON.stringify({ success: true, articleTitle: pack.articleTitle, slides: generatedSlides }, null, 2));
    return;
  }

  if (!args.topic) {
    printHelp();
    process.exit(1);
  }

  const styleCfg = await resolveStyleConfig(args.style);
  const aspectRatio = args.aspect || styleCfg.defaultAspect || '16:9';
  const styleSlug = slugify(args.style);
  const topicSlug = slugify(args.topic);
  const defaultRelOut = `public/images/blog/generated/infogenius-${styleSlug}-${topicSlug}.png`;
  const outputPath = resolve(process.cwd(), args.out || defaultRelOut);
  const cred = resolveProviderCredentials({ preferredProvider: args.provider });
  const apiKey = cred.key;
  const keySource = cred.source;

  console.error(`╔══════════════════════════════════════════════════════════════════╗`);
  console.error(`║ InfoGenius v5.2 — Knowledge-First Visual Intelligence           ║`);
  console.error(`╚══════════════════════════════════════════════════════════════════╝`);
  console.error(`  Topic    : ${args.topic}`);
  console.error(`  Style    : ${styleCfg.name} (${styleCfg.presetKey})`);
  console.error(`  Audience : ${args.audience} (${AUDIENCES_V5[args.audience]?.density || 'high'} density)`);
  console.error(`  Format   : ${aspectRatio} @ ${args.size} (model: ${MODELS[args.model] || args.model})`);
  console.error(`  Provider : ${cred.provider || args.provider} | animate=${args.animate} | narrate=${args.narrate}`);
  console.error(`  API Key  : ${apiKey ? `found (${keySource})` : 'NOT SET (Infisical / C:/Users/frank/.starlight/.env)'}`);
  console.error(`  Output   : ${outputPath}`);

  if (args.dryRun) {
    const sampleResearch = {
      facts: args.facts.length > 0
        ? args.facts
        : [
            `Primary architecture and verified 2026 metrics for ${args.topic}`,
            `Core mechanism and data flow connecting subsystems in ${args.topic}`,
            `Key performance benchmarks and operational trade-offs for ${args.topic}`,
          ],
      visualElements: [
        `Central structural diagram illustrating ${args.topic}`,
        `Comparison callout cards with quantitative telemetry`,
        `Directional flow arrows linking input, processing, and output stages`,
      ],
      labels: [args.label || args.topic, 'Core Architecture', 'Telemetry & Flow', 'Verification Gate'],
      context: `Dry-run synthesis preview for ${args.topic}`,
      sources: [],
      searchResults: [],
      videoPrompt: `Cinematic 7-second data visualization animation of ${args.topic}. ${styleCfg.instruction}`,
    };

    const prompt = composeInfographicPrompt({
      topic: args.topic,
      research: sampleResearch,
      styleName: args.style,
      styleInstruction: styleCfg.instruction,
      audience: args.audience,
      aspectRatio,
      label: args.label,
    });

    console.log(
      JSON.stringify(
        {
          dryRun: true,
          topic: args.topic,
          style: styleCfg,
          audience: args.audience,
          aspectRatio,
          imageSize: args.size,
          model: MODELS[args.model] || args.model,
          outputPath,
          apiKeyConfigured: Boolean(apiKey),
          apiKeySource: keySource,
          promptPreview: prompt,
          videoPromptPreview: sampleResearch.videoPrompt,
        },
        null,
        2
      )
    );
    return;
  }

  if (!apiKey) {
    console.error(`\n✗ ERROR: No GEMINI_API_KEY or OPENROUTER_API_KEY found.`);
    console.error(`  Add your key to Infisical (project 6e39a7d9-be07-4f58-babb-0cf650321feb) or C:/Users/frank/.starlight/.env:`);
    console.error(`  GEMINI_API_KEY=<YOUR_GEMINI_API_KEY>`);
    console.error(`  OPENROUTER_API_KEY=<YOUR_OPENROUTER_API_KEY>`);
    process.exit(1);
  }

  // STEP 1: Research Topic with Google Search Grounding
  let research;
  if (args.skipResearch) {
    const manualFacts = args.facts.length > 0 ? args.facts : [`Key architecture and principles of ${args.topic}`];
    research = {
      facts: manualFacts,
      visualElements: [`Primary diagram of ${args.topic}`, `Labeled component breakdown`],
      labels: [args.label || args.topic],
      context: args.topic,
      sources: [],
      searchResults: [],
      videoPrompt: `Cinematic 7-second data visualization animation of ${args.topic}. ${styleCfg.instruction}`,
    };
    research.imagePrompt = composeInfographicPrompt({
      topic: args.topic,
      research,
      styleName: args.style,
      styleInstruction: styleCfg.instruction,
      audience: args.audience,
      aspectRatio,
      label: args.label,
    });
  } else {
    research = await researchTopicForPrompt({
      topic: args.topic,
      audience: args.audience,
      style: args.style,
      styleInstruction: styleCfg.instruction,
      language: args.language,
      aspectRatio,
      label: args.label,
      provider: args.provider,
    });
    if (args.facts.length > 0) {
      research.facts = [...args.facts, ...research.facts];
      research.imagePrompt = composeInfographicPrompt({
        topic: args.topic,
        research,
        styleName: args.style,
        styleInstruction: styleCfg.instruction,
        audience: args.audience,
        aspectRatio,
        label: args.label,
      });
    }
  }

  if (args.researchOnly) {
    console.log(JSON.stringify(research, null, 2));
    return;
  }

  // STEP 2: Generate Infographic Image
  const imageResult = await generateImage({
    prompt: research.imagePrompt,
    outputPath,
    model: args.model,
    aspectRatio,
    imageSize: args.size,
    provider: args.provider,
    enforceDesignThinking: true,
  });

  // STEP 3: Optional Veo 3.1 Video Animation
  let videoResult = null;
  if (args.animate) {
    const videoOut = imageResult.path.replace(/\.[a-z0-9]+$/i, '.mp4');
    videoResult = await generateInfographicVideo({
      prompt: research.videoPrompt,
      aspectRatio,
      outputPath: videoOut,
    });
  }

  // STEP 4: Optional Gemini TTS Narration
  let audioResult = null;
  if (args.narrate) {
    const audioOut = imageResult.path.replace(/\.[a-z0-9]+$/i, '.wav');
    audioResult = await generateNarration({
      facts: research.facts,
      voiceName: args.voice,
      outputPath: audioOut,
    });
  }

  // STEP 5: Write Zero-Orphan Provenance Sidecar (.vis.provenance.json)
  const provenancePath = `${imageResult.path}.vis.provenance.json`;
  const provenance = {
    schemaVersion: '5.1.0',
    generator: 'infogenius-cli-v5.1',
    createdAt: new Date().toISOString(),
    topic: args.topic,
    style: styleCfg.presetKey,
    styleName: styleCfg.name,
    audience: args.audience,
    aspectRatio,
    imageSize: args.size,
    image: {
      path: imageResult.path,
      model: imageResult.model,
      mimeType: imageResult.mimeType,
      bytes: imageResult.bytes,
    },
    video: videoResult,
    audio: audioResult,
    research: {
      model: research.model || MODELS.research,
      facts: research.facts,
      visualElements: research.visualElements,
      labels: research.labels,
      context: research.context,
      sources: research.sources,
      searchResults: research.searchResults,
    },
    prompts: {
      imagePrompt: research.imagePrompt,
      videoPrompt: research.videoPrompt,
    },
  };
  const provDir = dirname(provenancePath);
  if (!existsSync(provDir)) mkdirSync(provDir, { recursive: true });
  writeFileSync(provenancePath, JSON.stringify(provenance, null, 2));
  console.error(`✓ [PROVENANCE] saved sidecar: ${provenancePath}`);

  // Compute web-friendly public src if under public/
  const relFromCwd = relative(process.cwd(), imageResult.path).replace(/\\/g, '/');
  const publicSrc = relFromCwd.startsWith('public/') ? `/${relFromCwd.slice('public/'.length)}` : relFromCwd;

  console.error(`\n=== MDX Component Snippet ===`);
  console.error(`<LiquidGlassZoom`);
  console.error(`  src="${publicSrc}"`);
  console.error(`  alt="${args.topic} — ${styleCfg.name} Infographic"`);
  console.error(`  caption="${args.topic}${research.sources?.length ? ` (Grounded across ${research.sources.length} sources)` : ''}"`);
  console.error(`/>`);

  console.log(
    JSON.stringify(
      {
        success: true,
        image: imageResult.path,
        publicSrc,
        video: videoResult?.path || null,
        audio: audioResult?.path || null,
        provenance: provenancePath,
        factsCount: research.facts.length,
        sourcesCount: research.sources.length,
      },
      null,
      2
    )
  );
}

main().catch((err) => {
  console.error(`\n✗ InfoGenius Error: ${err.message}`);
  process.exit(1);
});
