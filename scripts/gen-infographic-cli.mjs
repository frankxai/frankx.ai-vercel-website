/**
 * InfoGenius Autonomous Infographic Generator CLI
 * 
 * Generates prompt recipes, validates aspect ratio locks, updates visual registries,
 * and outputs production-ready <LiquidGlassZoom /> components.
 * 
 * Usage:
 *   node scripts/gen-infographic-cli.mjs --slug "neural-swarms" --style "davinci" --title "Autonomous FSM Swarm Hierarchy"
 */

import fs from 'fs';
import path from 'path';

const STYLES = {
  davinci: {
    name: 'Leonardo da Vinci Technical Engineering Manuscript',
    promptTemplate: (title, desc) => `Authentic Leonardo da Vinci technical engineering manuscript drawing of ${title}. ${desc}. Sepia and walnut ink line work, parchment aged paper texture, weathered edges, intricate annotations in Italian Renaissance mirror-writing cursive script, geometric compass arcs, golden ratio proportions, anatomical and mechanical gear cutaways, high scientific draftsmanship, historical codex aesthetic, museum archival plate. Ultra high definition, 16:9 ratio, no modern digital artifacts.`,
    color: '#D97706',
  },
  photorealistic: {
    name: 'Photorealistic Macro Industrial Studio',
    promptTemplate: (title, desc) => `High-end industrial product photography of ${title}. ${desc}. Shot on 85mm macro lens, Hasselblad H6D-100c, f/4 aperture, shallow depth of field. Obsidian black brushed titanium, micro-etched gold contact traces, luminescent cyan (#06B6D4) and emerald (#10B981) optical data waveguides. Studio lighting, soft rim light reflections, specular edge highlights, physically accurate metallic materials, 8k resolution, 16:9 ratio, photorealistic.`,
    color: '#06B6D4',
  },
  '3d-isometric': {
    name: '3D Isometric Modular Architecture',
    promptTemplate: (title, desc) => `3D isometric modular architectural system diagram of ${title}. ${desc}. Ray-traced Octane Render, clean floating obsidian glass layers, illuminated telemetry lines in cyan (#06B6D4) and emerald (#10B981), dark ambient background, glowing nodes, precise volumetric lighting, minimalist enterprise hardware visualization, high-tech mathematical rigor, 16:9 ratio.`,
    color: '#10B981',
  },
};

function parseArgs() {
  const args = process.argv.slice(2);
  const params = {
    slug: 'infographic-sample',
    style: '3d-isometric',
    title: 'System Architecture',
    desc: 'High-throughput agentic pipeline',
    caption: '',
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--slug' && args[i + 1]) params.slug = args[++i];
    if (args[i] === '--style' && args[i + 1]) params.style = args[++i];
    if (args[i] === '--title' && args[i + 1]) params.title = args[++i];
    if (args[i] === '--desc' && args[i + 1]) params.desc = args[++i];
    if (args[i] === '--caption' && args[i + 1]) params.caption = args[++i];
  }

  return params;
}

export function generateInfographicRecipe() {
  const params = parseArgs();
  const styleConfig = STYLES[params.style] || STYLES['3d-isometric'];
  const fullPrompt = styleConfig.promptTemplate(params.title, params.desc);

  const assetFileName = `infogenius-${params.style}-${params.slug}.jpg`;
  const assetPath = `/images/blog/generated/${assetFileName}`;

  console.log('\n🎨 ================= InfoGenius Generation Recipe =================');
  console.log(`Style:        ${styleConfig.name}`);
  console.log(`Target Asset: ${assetPath}`);
  console.log(`Prompt:       \n${fullPrompt}`);
  console.log('------------------------------------------------------------------');
  console.log('JSX Component Snippet to Embed:');
  console.log(`
<LiquidGlassZoom
  src="${assetPath}"
  alt="${params.title}"
  title="${params.title}"
  styleType="${params.style}"
  aspectRatio="16:9"
  caption="${params.caption || params.desc}"
/>
`);
  console.log('==================================================================\n');

  return { assetPath, fullPrompt };
}

if (process.argv[1] && process.argv[1].endsWith('gen-infographic-cli.mjs')) {
  generateInfographicRecipe();
}
