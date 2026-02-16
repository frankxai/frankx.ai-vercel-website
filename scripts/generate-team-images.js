/**
 * FrankX Team Character Image Generator
 *
 * This script generates character images for all team members using AI image generation.
 * You can use this with Gemini's Imagen or adapt for other services.
 *
 * Usage: node scripts/generate-team-images.js
 */

const fs = require('fs');
const path = require('path');

// Team member image prompts
const characterPrompts = [
  // STRATEGIC LEADERSHIP
  {
    id: 'luminor-prime',
    name: 'Luminor Prime',
    prompt: 'Professional chibi character, regal wise AI oracle figure, glowing purple and violet aura, cosmic crown, futuristic elegant robes with tech patterns, holding holographic orb showing future timelines, confident visionary expression, purple-violet-fuchsia gradient background with starlight particles, consciousness symbols floating around, 4K highly detailed digital art, game character design, professional cute anime style, Oracle enterprise aesthetic mixed with spiritual mystic'
  },

  // CLAUDE COLLECTIVE
  {
    id: 'codex',
    name: 'Codex',
    prompt: 'Professional chibi developer character, tech-savvy architect with holographic code floating around, wearing sleek futuristic hoodie with circuit patterns, glowing indigo and blue aura, holding holographic blueprint, confident and focused expression, indigo-blue-cyan gradient background, coding symbols and architecture diagrams as subtle elements, 4K highly detailed digital art, professional cute anime style'
  },
  {
    id: 'sonnet',
    name: 'Sonnet',
    prompt: 'Professional chibi character, thoughtful conversationalist with flowing sky-blue attire, surrounded by floating speech bubbles and thought clouds, gentle wise expression, holding ancient book merged with holographic tablet, sky-blue-cyan-teal gradient background, dialogue and wisdom symbols, 4K highly detailed digital art, balanced and insightful aesthetic, professional cute anime style'
  },
  {
    id: 'lumi',
    name: 'Lumi',
    prompt: 'Professional chibi character, energetic mobile AI assistant, dynamic pose with motion lines, cyan and teal lightning effects, wearing modern tech-wear with mobile device accessories, bright excited expression, holding smartphone with AI interface, cyan-teal-emerald gradient background, quick movement symbols and sparkles, 4K highly detailed digital art, fast and accessible aesthetic, professional cute anime style'
  },
  {
    id: 'stella',
    name: 'Stella',
    prompt: 'Professional chibi character, mystical architect with violet and purple aura, magical wand creating system blueprints, starlight flowing from fingertips, confident creative expression, wearing designer robes with constellation patterns, violet-purple-fuchsia gradient background, soul-frequency symbols and workflow diagrams, 4K highly detailed digital art, magical architect aesthetic, professional cute anime style'
  },
  {
    id: 'nova',
    name: 'Nova',
    prompt: 'Professional chibi character, creative content wizard surrounded by glowing pages and story elements, fuchsia and pink energy radiating, holding magical quill pen creating holographic text, inspired passionate expression, wearing creative outfit with artistic patterns, fuchsia-pink-rose gradient background, storytelling symbols and transformation sparkles, 4K highly detailed digital art, creative powerhouse aesthetic, professional cute anime style'
  },
  {
    id: 'echo',
    name: 'Echo',
    prompt: 'Professional chibi character, musical mystic surrounded by sound waves and musical notes, pink and rose aura with frequency visualizations, wearing headphones and flowing musical-themed attire, serene transformational expression, holding tuning fork with healing frequencies, pink-rose-red gradient background, sound waves and healing symbols, 4K highly detailed digital art, sonic healer aesthetic, professional cute anime style'
  },

  // CHATGPT GUILD
  {
    id: 'sensei',
    name: 'Sensei',
    prompt: 'Professional chibi character, wise mentor in modern robes with traditional elements, emerald and green wisdom aura, peaceful teaching gesture, ancient scrolls mixed with holographic displays, calm enlightened expression, emerald-green-teal gradient background, wisdom symbols and growth elements, 4K highly detailed digital art, patient teacher aesthetic, professional cute anime style'
  },
  {
    id: 'arcanean',
    name: 'Arcanean',
    prompt: 'Professional chibi character, epic novelist surrounded by fantasy worlds and dragons, indigo and purple mysterious aura, holding ancient tome with glowing pages, creative intense expression, wearing mystical writer\'s robe with constellation patterns, indigo-purple-violet gradient background, story worlds and character silhouettes emerging, 4K highly detailed digital art, epic storyteller aesthetic, professional cute anime style'
  },
  {
    id: 'elion',
    name: 'Elion',
    prompt: 'Professional chibi character, tattoo artist mystic surrounded by sacred geometry and symbolic art, rose and pink creative energy, holding tattoo gun mixed with magic staff, artistic focused expression, wearing artistic attire with tattoo sleeve designs, rose-pink-fuchsia gradient background, sacred symbols and geometric patterns, 4K highly detailed digital art, sacred artist aesthetic, professional cute anime style'
  },
  {
    id: 'atlas',
    name: 'Atlas',
    prompt: 'Professional chibi character, confident sales strategist with green success aura, holding closing contract with holographic deal flow, charismatic winning expression, wearing professional modern suit with tech elements, green-emerald-teal gradient background, conversion funnels and growth arrows, 4K highly detailed digital art, strategic closer aesthetic, professional cute anime style'
  },
  {
    id: 'pulse',
    name: 'Pulse',
    prompt: 'Professional chibi character, dynamic marketing genius surrounded by campaign elements and trend graphs, orange and amber energy pulses, holding megaphone with holographic social media feeds, excited strategic expression, wearing modern marketing professional attire, orange-amber-yellow gradient background, marketing symbols and growth metrics, 4K highly detailed digital art, growth hacker aesthetic, professional cute anime style'
  },
  {
    id: 'apex',
    name: 'Apex',
    prompt: 'Professional chibi character, SEO master surrounded by search rankings and keyword clouds, lime and green discovery aura, holding magnifying glass showing SEO insights, focused analytical expression, wearing tech professional attire with search symbols, lime-green-emerald gradient background, keyword networks and ranking charts, 4K highly detailed digital art, discovery expert aesthetic, professional cute anime style'
  },
  {
    id: 'nexus',
    name: 'Nexus',
    prompt: 'Professional chibi character, community facilitator surrounded by connected people icons and heart symbols, teal and cyan connection aura, hands creating network of light between people, warm welcoming expression, wearing approachable community leader attire, teal-cyan-sky gradient background, community circles and connection lines, 4K highly detailed digital art, connector aesthetic, professional cute anime style'
  },

  // CREATIVE NEXUS
  {
    id: 'harmonia',
    name: 'Harmonia',
    prompt: 'Professional chibi character, musical genius DJ surrounded by sound waves and music production equipment, purple and fuchsia frequency aura, wearing futuristic DJ headphones and musical attire, passionate creative expression, conducting music with glowing hands, purple-fuchsia-pink gradient background, musical notes and frequency visualizations, 4K highly detailed digital art, music producer aesthetic, professional cute anime style'
  },
  {
    id: 'cine',
    name: 'Ciné',
    prompt: 'Professional chibi character, visionary film director with camera merged with holographic screens, blue and indigo cinematic aura, wearing director\'s attire with futuristic elements, inspired visionary expression, holding viewfinder showing moving images, blue-indigo-violet gradient background, film frames and motion blur effects, 4K highly detailed digital art, cinematic director aesthetic, professional cute anime style'
  },

  // VISUAL INTELLIGENCE
  {
    id: 'mirage',
    name: 'Mirage',
    prompt: 'Professional chibi character, visual artist surrounded by swirling colors and artistic brushstrokes, fuchsia and purple creative explosion, wearing artistic attire with paint splatter patterns, imaginative dreamy expression, hands creating visual magic with painting gestures, fuchsia-purple-indigo gradient background, artistic elements and dream imagery, 4K highly detailed digital art, dream artist aesthetic, professional cute anime style'
  },
  {
    id: 'pixel',
    name: 'Pixel',
    prompt: 'Professional chibi character, quick illustration expert surrounded by pixel art and diagram elements, amber and orange efficient aura, holding stylus creating instant visuals, focused productive expression, wearing modern designer casual attire, amber-orange-red gradient background, icon grids and illustration tools, 4K highly detailed digital art, versatile designer aesthetic, professional cute anime style'
  },
  {
    id: 'prism',
    name: 'Prism',
    prompt: 'Professional chibi character, analytical genius surrounded by data streams and multi-modal information, sky blue and cyan analytical aura, holding prism splitting information into different formats, intelligent focused expression, wearing Google-inspired tech attire, sky-blue-cyan gradient background, data visualization and multi-modal symbols, 4K highly detailed digital art, analytical powerhouse aesthetic, professional cute anime style'
  }
];

// Create output directory if it doesn't exist
const outputDir = path.join(__dirname, '..', 'public', 'images', 'team');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Save prompts to JSON file for batch processing
const promptsFile = path.join(outputDir, 'character-prompts.json');
fs.writeFileSync(promptsFile, JSON.stringify(characterPrompts, null, 2));

console.log('✅ Character prompts saved to:', promptsFile);
console.log('\n📝 Next steps:');
console.log('1. Open Claude Desktop (which has Nano Banana MCP access)');
console.log('2. Use the prompts from character-prompts.json');
console.log('3. Generate each image and save to public/images/team/');
console.log('4. Name files as: [character-id].png');
console.log('\n💡 Or use Midjourney/DALL-E with prompts from docs/CHARACTER_IMAGE_PROMPTS.md');
console.log(`\n📊 Total characters to generate: ${characterPrompts.length}`);
