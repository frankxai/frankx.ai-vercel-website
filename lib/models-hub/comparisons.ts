/**
 * Curated head-to-head multimodal comparisons. Each becomes a programmatic
 * SEO page at /models/compare/[slug]. Comparison queries ("X vs Y") are
 * high-intent and underserved by quality.
 *
 * Slug convention: `${a}-vs-${b}` using generative-registry model ids.
 */

export interface GenComparison {
  slug: string
  /** Generative-registry model ids, [a, b]. */
  models: [string, string]
  title: string
  description: string
  verdict: string
  analysis: string[]
  pickFirst: string[]
  pickSecond: string[]
  keywords: string[]
}

export const GEN_COMPARISONS: GenComparison[] = [
  // IMAGE
  {
    slug: 'flux-2-vs-imagen-4',
    models: ['flux-2', 'imagen-4'],
    title: 'FLUX 2 vs Imagen 4',
    description: 'FLUX 2 vs Imagen 4: photorealism, text rendering, licensing — which AI image model to pick in 2026.',
    verdict: 'FLUX 2 for open-weight photorealism and self-hosting; Imagen 4 for product photography and accurate in-image text.',
    analysis: [
      'These two define the closed-vs-open frontier in 2026. FLUX 2 (Black Forest Labs) is the strongest open-weight photoreal model and the safest fine-tuning base. Imagen 4 (Google DeepMind) is the closed photoreal leader with the clearest edge on text rendering and product photography.',
      'For workflows that need control over weights, LoRAs, and inference economics, FLUX 2 wins. For ad and product creative where in-image text and Adobe-grade photoreal are decisive, Imagen 4 wins. Many production pipelines run both.',
      'Pricing: FLUX 2 free to self-host (Pro tier per-image via the BFL API); Imagen 4 ~$0.04/image via Gemini / Vertex.',
    ],
    pickFirst: ['You self-host or fine-tune', 'Open license matters', 'You want photoreal at scale with cost control'],
    pickSecond: ['Product/ad photography', 'Accurate text inside images', 'You are in the Google / Vertex stack'],
    keywords: ['flux 2 vs imagen 4', 'best photoreal ai 2026', 'open weight image model', 'imagen 4 pricing'],
  },
  {
    slug: 'midjourney-v7-vs-flux-2',
    models: ['midjourney-v7', 'flux-2'],
    title: 'Midjourney v7 vs FLUX 2',
    description: 'Midjourney v7 vs FLUX 2: artistic aesthetic vs open-weight photorealism — which to pick in 2026.',
    verdict: 'Midjourney v7 for stylized, editorial, and artistic work; FLUX 2 for photoreal, controllable, and self-hostable pipelines.',
    analysis: [
      'Different problems. Midjourney v7 still owns the distinctive aesthetic creators recognize — mood, concept, editorial. FLUX 2 owns photorealism and the open-weight tooling stack.',
      'If you need a literal photograph of a product, FLUX 2 (or Imagen 4). If you need a striking visual that looks "designed," Midjourney v7.',
      'Pricing: Midjourney from ~$10/mo subscription; FLUX 2 open weights free, FLUX Pro per-image via API.',
    ],
    pickFirst: ['Stylized, editorial, artistic output', 'Strong aesthetic without prompt-engineering', 'Mood/concept work'],
    pickSecond: ['Photorealism', 'Self-hosting / open license', 'Fine-tuning + LoRAs'],
    keywords: ['midjourney v7 vs flux 2', 'best aesthetic ai 2026', 'art vs photoreal ai'],
  },
  {
    slug: 'gpt-image-2-vs-nano-banana',
    models: ['gpt-image-2', 'nano-banana'],
    title: 'GPT Image 2 vs Nano Banana',
    description: 'GPT Image 2 vs Nano Banana (Gemini Image): instruction-following vs precise editing for 2026 creative workflows.',
    verdict: 'GPT Image 2 for complex prompts and ChatGPT-native flows; Nano Banana for object-level editing and brand iteration inside the Gemini stack.',
    analysis: [
      'Both are state of the art for prompt-driven editing, but the strengths diverge. GPT Image 2 leads on multi-constraint instructions — "do A, B, and C, keep D" — and is native to ChatGPT.',
      'Nano Banana leads on precise object-level edits (swap, resize, recolor) with brand consistency, and is the default inside the FrankX nb-image pipeline.',
      'Use GPT Image 2 to generate; use Nano Banana to iterate.',
    ],
    pickFirst: ['Complex multi-constraint prompts', 'ChatGPT-native workflows', 'In-context variants'],
    pickSecond: ['Object-level edits + brand consistency', 'Gemini / Vertex stack', 'Educational and grounded visuals'],
    keywords: ['gpt image 2 vs nano banana', 'gemini image vs openai', 'best ai image editor 2026'],
  },

  // VIDEO
  {
    slug: 'veo-3-1-vs-kling-3',
    models: ['veo-3-1', 'kling-3'],
    title: 'Veo 3.1 vs Kling 3.0',
    description: 'Veo 3.1 vs Kling 3.0: cinematic polish + native audio vs maximum visual fidelity. Which AI video model in 2026.',
    verdict: 'Veo 3.1 for cinematic polish and native 48kHz synced audio; Kling 3.0 for raw 4K/60fps visual fidelity and longer clips.',
    analysis: [
      'The two top-tier video models attack different jobs. Veo 3.1 (Google DeepMind) is the only model generating synchronized dialogue at 48kHz — that alone makes it the default for ads and short film.',
      'Kling 3.0 (Kuaishou) produces the highest raw visual fidelity with 4K/60fps, 15-second clips, and multilingual lip-sync.',
      'Production rule: storyboard with Veo when the audio matters, finish with Kling when the cinematic shot matters.',
    ],
    pickFirst: ['Cinematic ads / short film', 'You need native synced dialogue', 'Inside the Google / Flow stack'],
    pickSecond: ['Highest raw fidelity (4K/60fps)', 'Lip-sync + longer clips', 'Visual-first social content'],
    keywords: ['veo 3.1 vs kling 3', 'best ai video 2026', 'veo vs kling cinematic'],
  },
  {
    slug: 'runway-gen-4-5-vs-veo-3-1',
    models: ['runway-gen-4-5', 'veo-3-1'],
    title: 'Runway Gen-4.5 vs Veo 3.1',
    description: 'Runway Gen-4.5 vs Veo 3.1: all-rounder control vs cinematic polish + audio for 2026 video workflows.',
    verdict: 'Runway Gen-4.5 for image-to-video with character + camera control; Veo 3.1 for cinematic quality with native audio.',
    analysis: [
      'Runway Gen-4.5 is the strongest all-rounder — reference images, camera control, consistent characters, and a mature creative UI. The pick for music videos and brand campaigns where control matters more than synced dialogue.',
      'Veo 3.1 brings cinematic quality and is the only model with native 48kHz synced dialogue. The pick when audio is part of the shot.',
      'Many studios run both: storyboard with Runway, hero shots with Veo.',
    ],
    pickFirst: ['Character + camera consistency', 'Image-to-video with control', 'Music videos and brand campaigns'],
    pickSecond: ['Cinematic quality', 'Native synced dialogue', 'Ad and short-film output'],
    keywords: ['runway vs veo 3.1', 'runway gen-4.5 vs veo', 'best ai video control 2026'],
  },

  // AUDIO (music)
  {
    slug: 'suno-v5-vs-udio-v1-5',
    models: ['suno-v5', 'udio-v1-5'],
    title: 'Suno v5 vs Udio v1.5',
    description: 'Suno v5 vs Udio v1.5: quality and ecosystem vs licensing story for 2026 AI music.',
    verdict: 'Suno for the strongest quality and ecosystem; Udio for the cleanest licensing story and stem control.',
    analysis: [
      'Suno v5 is the quality and ecosystem leader (ELO ~1293), the model that most reliably turns an idea into a finished song. The FrankX music pipeline is built on it (12K+ tracks).',
      'Udio v1.5 wins on musicality plus the cleanest commercial story — the UMG settlement and the licensed-data path matter for client work.',
      'Pattern: Suno for personal projects and quality-led work, Udio when the licensing chain has to be defensible.',
    ],
    pickFirst: ['Highest finished-song quality', 'Genre breadth', 'Personal / non-commercial projects'],
    pickSecond: ['Commercial / client-facing work', 'Stem downloads + key control', 'Cleaner licensing chain (UMG-settled)'],
    keywords: ['suno vs udio 2026', 'best ai music 2026', 'suno v5 vs udio'],
  },
  {
    slug: 'suno-v5-vs-elevenlabs-music',
    models: ['suno-v5', 'elevenlabs-music'],
    title: 'Suno v5 vs ElevenLabs Music',
    description: 'Suno v5 vs ElevenLabs Music: peak quality vs licensed-trained model for commercial AI music in 2026.',
    verdict: 'Suno for raw quality and creator workflow; ElevenLabs Music for licensed-trained, commercial-safe songs.',
    analysis: [
      'Suno is still the quality bar, but it carries training-data litigation risk that disqualifies it from some client work.',
      'ElevenLabs Music was trained exclusively on licensed catalogs (Merlin, Kobalt) and brings the vocal realism ElevenLabs is known for — the safer pick for monetized, client-facing music.',
      'Use Suno for ideation and personal work; switch to ElevenLabs Music for anything published under a brand.',
    ],
    pickFirst: ['Highest raw quality', 'Personal projects', 'Fast ideation'],
    pickSecond: ['Commercial / monetized work', 'Vocal realism', 'Brand-safe licensing'],
    keywords: ['suno vs elevenlabs music', 'best commercial ai music', 'licensed ai music 2026'],
  },

  // VOICE
  {
    slug: 'elevenlabs-v3-vs-cartesia-sonic-3',
    models: ['elevenlabs-v3', 'cartesia-sonic-3'],
    title: 'ElevenLabs v3 vs Cartesia Sonic-3',
    description: 'ElevenLabs v3 vs Cartesia Sonic-3: best cloning vs lowest latency for 2026 voice products.',
    verdict: 'ElevenLabs v3 for cloning quality and long-form narration; Cartesia Sonic-3 for realtime voice agents.',
    analysis: [
      'These are not really competitors — they win different jobs. ElevenLabs v3 leads on voice cloning, creator tooling, and 32-language reach: the right pick for narration, dubbing, and brand-voice work.',
      'Cartesia Sonic-3 leads on latency (40ms TTFB on Sonic Turbo), which makes it the default for realtime voice agents and customer support.',
      'A production stack often runs both: ElevenLabs for narration assets, Cartesia for the realtime agent.',
    ],
    pickFirst: ['Voice cloning quality', 'Long-form narration', 'Multilingual dubbing'],
    pickSecond: ['Realtime voice agents', 'Sub-50ms time-to-first-byte', 'High-volume support bots'],
    keywords: ['elevenlabs vs cartesia', 'best tts 2026', 'lowest latency voice ai'],
  },

  // EMBEDDINGS
  {
    slug: 'voyage-4-large-vs-openai-text-embedding-3-large',
    models: ['voyage-4-large', 'openai-text-embedding-3-large'],
    title: 'Voyage 4 Large vs OpenAI text-embedding-3-large',
    description: 'Voyage 4 Large vs OpenAI text-embedding-3-large: top retrieval accuracy vs safest default for 2026 RAG.',
    verdict: 'Voyage 4 Large for highest retrieval accuracy per dollar; OpenAI text-embedding-3-large for the safest default.',
    analysis: [
      'Voyage 4 Large introduced MoE architecture to production embeddings and tops RTEB retrieval by a meaningful margin. The right pick when retrieval quality is the bottleneck.',
      'OpenAI text-embedding-3-large is the safe default — near-top MTEB across retrieval, classification, and clustering, and the path of least resistance inside an OpenAI stack.',
      'Switch to Voyage when your retrieval quality is measurably hurting downstream answers.',
    ],
    pickFirst: ['Highest retrieval accuracy per dollar', 'Domain-tuned RAG', 'You measure retrieval quality'],
    pickSecond: ['Safe default', 'OpenAI-native stack', 'You optimize for simplicity'],
    keywords: ['voyage vs openai embeddings', 'best embedding model 2026', 'rag accuracy embedding'],
  },
]

export function getGenComparison(slug: string): GenComparison | undefined {
  return GEN_COMPARISONS.find((c) => c.slug === slug)
}

export function genComparisonsForModel(modelId: string): GenComparison[] {
  return GEN_COMPARISONS.filter((c) => c.models.includes(modelId))
}
