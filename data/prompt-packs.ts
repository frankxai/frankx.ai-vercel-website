/**
 * FrankX Digital Product Data
 *
 * Three prompt pack / cheatsheet products for sale on Whop and frankx.ai.
 * Each export is a typed array used for PDF generation via /api/admin/generate-pdf.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SunoPrompt {
  title: string
  genre: string
  prompt: string
  tips: string
}

export interface ArchitecturePattern {
  name: string
  description: string
  whenToUse: string
  diagramDescription: string
  toolsNeeded: string[]
}

export interface PrincipleCard {
  number: number
  title: string
  summary: string
}

export interface ChapterSummary {
  chapter: number
  title: string
  summary: string
}

export interface BlueprintTemplate {
  name: string
  purpose: string
  sections: string[]
}

export interface SoulMdTemplate {
  sections: Array<{ heading: string; description: string; placeholder: string }>
}

export interface ProductMeta {
  slug: string
  name: string
  price: number
  currency: string
  description: string
}

// ---------------------------------------------------------------------------
// Pack 1: Suno AI Prompt Pack — $9
// ---------------------------------------------------------------------------

export const sunoPromptPackMeta: ProductMeta = {
  slug: 'suno-prompt-pack',
  name: 'Suno AI Prompt Pack',
  price: 9,
  currency: 'USD',
  description: '50 production-ready Suno AI prompts across 5 genres. Each prompt includes title, genre tag, full prompt text, and production tips.',
}

export const sunoPrompts: SunoPrompt[] = [
  // --- Pop (10) ---
  { title: 'Golden Hour', genre: 'Pop', prompt: 'Dreamy indie pop, warm analog synths, soft female vocals, sunset vibes, 120 BPM, major key, layered harmonies, gentle percussion', tips: 'Use "warm analog synths" to get that lo-fi texture. Add "layered harmonies" for depth.' },
  { title: 'City Lights', genre: 'Pop', prompt: 'Modern pop anthem, driving beat, male vocals, urban energy, synth bass, 128 BPM, catchy hook, arena-ready chorus', tips: 'Specify "arena-ready chorus" to push Suno toward bigger production.' },
  { title: 'Paper Hearts', genre: 'Pop', prompt: 'Acoustic pop ballad, fingerpicked guitar, intimate female vocals, heartfelt lyrics, 90 BPM, simple arrangement, emotional crescendo', tips: 'Keep BPM low for ballads. "Emotional crescendo" signals a build in the final chorus.' },
  { title: 'Neon Dreams', genre: 'Pop', prompt: 'Synthpop, retro 80s influence, vocoder accents, pulsing bass, 118 BPM, nostalgic melody, shimmering pads', tips: 'Combine "retro 80s" with "vocoder accents" for authentic synthwave-pop fusion.' },
  { title: 'Wildfire', genre: 'Pop', prompt: 'High-energy pop-rock, electric guitar riffs, powerful vocals, stomping drums, 135 BPM, anthemic, festival energy', tips: 'Adding "stomping drums" and "festival energy" drives the arrangement harder.' },
  { title: 'Daydream', genre: 'Pop', prompt: 'Chill pop, soft vocals, dreamy reverb, lo-fi textures, 100 BPM, floating melody, gentle bass, bedroom production', tips: 'Use "bedroom production" as a style cue for intimate, low-key mixes.' },
  { title: 'Heartbeat', genre: 'Pop', prompt: 'Dance pop, four-on-the-floor kick, euphoric synths, female vocals, 126 BPM, hands-in-the-air chorus, bright and polished', tips: 'Specify "four-on-the-floor kick" for consistent dance energy throughout.' },
  { title: 'Summer Haze', genre: 'Pop', prompt: 'Tropical pop, steel drums, reggaeton-influenced rhythm, male vocals, 105 BPM, sunny disposition, island groove', tips: 'Steel drums and island groove together push toward tropical house territory.' },
  { title: 'Telescope', genre: 'Pop', prompt: 'Art pop, experimental arrangement, layered vocals, unconventional structure, 110 BPM, cinematic, orchestral accents', tips: 'Use "unconventional structure" to encourage Suno to break verse-chorus norms.' },
  { title: 'Rewind', genre: 'Pop', prompt: 'Nostalgic pop, 2000s R&B influence, smooth vocals, snapping percussion, 96 BPM, warm keys, throwback vibes', tips: 'Adding a decade reference like "2000s R&B influence" gives Suno clear era targeting.' },

  // --- Electronic (10) ---
  { title: 'Binary Pulse', genre: 'Electronic', prompt: 'Dark techno, industrial textures, relentless kick, 138 BPM, modular synth, warehouse atmosphere, no vocals, tension build', tips: 'Use "no vocals" for pure instrumental electronic. "Warehouse atmosphere" adds spatial reverb.' },
  { title: 'Aurora', genre: 'Electronic', prompt: 'Progressive house, evolving pads, melodic arpeggios, 124 BPM, emotional build, euphoric drop, ethereal female vocal chops', tips: 'Female vocal chops in electronic work as texture, not lead. Specify "chops" to keep them fragmented.' },
  { title: 'Fractured Light', genre: 'Electronic', prompt: 'Glitch hop, stuttered beats, chopped samples, funky bass, 110 BPM, playful energy, crisp percussion, experimental', tips: 'Glitch hop needs "stuttered beats" and "chopped samples" to differentiate from standard EDM.' },
  { title: 'Subzero', genre: 'Electronic', prompt: 'Drum and bass, liquid style, rolling breakbeats, deep sub bass, 174 BPM, atmospheric pads, smooth transitions', tips: 'Always specify 174 BPM for DnB. "Liquid style" signals melodic rather than aggressive.' },
  { title: 'Voltage', genre: 'Electronic', prompt: 'Electro house, distorted bass, aggressive synth stabs, 128 BPM, high energy, festival banger, minimal breakdown', tips: 'Use "minimal breakdown" to keep energy high throughout instead of long ambient sections.' },
  { title: 'Deep Current', genre: 'Electronic', prompt: 'Deep house, warm chords, subtle groove, 122 BPM, muted percussion, late-night atmosphere, organic textures', tips: 'Deep house should feel unhurried. "Muted percussion" and "subtle groove" keep it laid-back.' },
  { title: 'Starfield', genre: 'Electronic', prompt: 'Ambient electronica, granular synthesis, evolving soundscape, 85 BPM, space-themed, distant echoes, generative feel', tips: 'Lower BPM and "generative feel" produce more textural, less beat-driven results.' },
  { title: 'Chrome', genre: 'Electronic', prompt: 'Synthwave, analog warmth, driving arpeggios, 118 BPM, retro-futuristic, gated reverb snare, neon aesthetic', tips: 'Gated reverb snare is the signature 80s drum sound. Combine with "retro-futuristic" for authenticity.' },
  { title: 'Catalyst', genre: 'Electronic', prompt: 'Melodic techno, hypnotic groove, layered percussion, 130 BPM, dark atmosphere, subtle vocal textures, peak-time energy', tips: 'Melodic techno bridges dark techno and progressive. "Hypnotic groove" is the key differentiator.' },
  { title: 'Terraform', genre: 'Electronic', prompt: 'IDM, complex rhythmic patterns, glitchy textures, 140 BPM, cerebral, Autechre-influenced, deconstructed beats', tips: 'Referencing specific artists like "Autechre-influenced" gives Suno strong stylistic direction.' },

  // --- Classical (10) ---
  { title: 'The Awakening', genre: 'Classical', prompt: 'Orchestral, full symphony, sweeping strings, brass fanfare, 80 BPM, cinematic grandeur, heroic theme, dynamic crescendo', tips: 'Use "full symphony" for maximum orchestral density. "Heroic theme" establishes major-key resolve.' },
  { title: 'Moonlit Sonata', genre: 'Classical', prompt: 'Solo piano, romantic era, expressive rubato, minor key, 70 BPM, intimate performance, Chopin-influenced, gentle pedal', tips: 'Rubato allows tempo flexibility. "Chopin-influenced" targets romantic piano specifically.' },
  { title: 'The Cathedral', genre: 'Classical', prompt: 'Pipe organ, sacred music, reverberant space, 60 BPM, Bach-influenced counterpoint, majestic, polyphonic texture', tips: 'Organ works benefit from "reverberant space" to simulate cathedral acoustics.' },
  { title: 'Elegy for Spring', genre: 'Classical', prompt: 'Chamber music, string quartet, melancholic melody, 76 BPM, conversational interplay, classical form, subtle dynamics', tips: 'String quartet prompts work well with "conversational interplay" between instruments.' },
  { title: 'Titan March', genre: 'Classical', prompt: 'Orchestral march, timpani, military drums, brass section, 108 BPM, powerful rhythm, Holst-inspired, commanding presence', tips: 'Specify "military drums" and "timpani" separately to get both percussion layers.' },
  { title: 'Velvet Dawn', genre: 'Classical', prompt: 'Solo cello with piano accompaniment, lyrical melody, warm tone, 66 BPM, salon performance, romantic expression', tips: 'Cello-piano duets sound best with "lyrical melody" and low BPM for expressive phrasing.' },
  { title: 'Storm and Stillness', genre: 'Classical', prompt: 'Orchestral, dramatic contrasts, fortissimo to pianissimo, 92 BPM, Beethoven-influenced, tempestuous, resolution in final bars', tips: 'Dynamic contrast is key. Specifying "fortissimo to pianissimo" creates dramatic narrative arc.' },
  { title: 'Glass Garden', genre: 'Classical', prompt: 'Minimalist, repeating piano figures, gradual evolution, 120 BPM, Philip Glass-influenced, hypnotic, meditative, arpeggiated', tips: 'Minimalist classical needs high BPM with repetitive patterns. Glass reference is well understood by AI.' },
  { title: 'The Voyage', genre: 'Classical', prompt: 'Film score, adventure theme, full orchestra, 100 BPM, Williams-inspired, soaring melody, French horns, sense of wonder', tips: 'John Williams references produce reliable adventure/fantasy scores. "French horns" are essential.' },
  { title: 'Winter Nocturne', genre: 'Classical', prompt: 'Solo piano, impressionist, Debussy-influenced, delicate touch, 58 BPM, pedal-sustained harmonies, atmospheric, crystalline', tips: 'Impressionist piano relies on pedal and harmonic color. "Crystalline" adds the right bright-yet-soft quality.' },

  // --- Ambient (10) ---
  { title: 'Drift', genre: 'Ambient', prompt: 'Deep ambient, warm drones, slow evolution, no percussion, field recordings, 60 BPM, meditative, vast space, analog warmth', tips: 'Use "no percussion" to ensure pure ambient texture. Field recordings add organic interest.' },
  { title: 'Moss and Stone', genre: 'Ambient', prompt: 'Nature ambient, forest atmosphere, gentle stream sounds, birdsong samples, soft pads, no beat, peaceful, 50 BPM', tips: 'Nature references produce layered environmental textures. BPM is mostly ignored in beatless ambient.' },
  { title: 'Signal Lost', genre: 'Ambient', prompt: 'Dark ambient, industrial undertones, metallic resonance, sparse texture, 55 BPM, unsettling, vast emptiness, processed field recordings', tips: 'Dark ambient benefits from industrial descriptors. "Vast emptiness" creates space between sonic events.' },
  { title: 'Luminous Depths', genre: 'Ambient', prompt: 'Ambient, underwater atmosphere, deep reverb, sine wave tones, 70 BPM, bioluminescent imagery, submerged, gentle current', tips: 'Underwater and submerged cues produce heavily filtered, washed-out tones perfect for deep ambient.' },
  { title: 'Cloud Archive', genre: 'Ambient', prompt: 'Ambient, tape loops, granular textures, warm saturation, 65 BPM, nostalgic, faded memories, generative, Brian Eno-influenced', tips: 'Brian Eno reference is the strongest ambient artist cue. "Tape loops" add analog character.' },
  { title: 'Threshold', genre: 'Ambient', prompt: 'Liminal ambient, between states, shifting tones, subtle dissonance, 72 BPM, transformative, neither dark nor light, transitional', tips: 'Liminal ambient is a distinct sub-genre. "Between states" produces evolving, unresolved textures.' },
  { title: 'Solar Wind', genre: 'Ambient', prompt: 'Space ambient, cosmic drones, stellar radiation sounds, vast scale, 45 BPM, interstellar, processed white noise, slow panning', tips: 'Space ambient needs scale descriptors. "Slow panning" creates movement in stereo field.' },
  { title: 'Temple Bell', genre: 'Ambient', prompt: 'Zen ambient, singing bowls, temple bells, resonant decay, no beat, 40 BPM, meditative, breath-paced, sacred geometry', tips: 'Singing bowls and temple bells produce reliable Eastern meditation ambience.' },
  { title: 'Ghost Frequency', genre: 'Ambient', prompt: 'Hauntological ambient, decayed radio signals, vinyl crackle, distant melody, 68 BPM, spectral, time-displaced, eerie beauty', tips: 'Hauntological is a specific aesthetic. Vinyl crackle and radio signals are its sonic signatures.' },
  { title: 'Photosynthesis', genre: 'Ambient', prompt: 'Organic ambient, plant growth time-lapse energy, cellular sounds, bioacoustic, 75 BPM, alive, microscopic, verdant, generative patterns', tips: 'Biological descriptors produce surprisingly textured results. "Generative patterns" keeps it evolving.' },

  // --- Hip-Hop (10) ---
  { title: 'Crown Heavy', genre: 'Hip-Hop', prompt: 'Boom bap, dusty vinyl samples, chopped soul loop, hard-hitting drums, 90 BPM, golden era, confident flow, MPC-style production', tips: 'MPC-style production signals classic hip-hop sampling workflow. "Dusty vinyl" adds the crackle layer.' },
  { title: 'Night Market', genre: 'Hip-Hop', prompt: 'Lo-fi hip-hop, mellow keys, tape hiss, relaxed groove, 85 BPM, late-night study vibes, jazzy chords, head-nod beat', tips: 'Lo-fi hip-hop is well understood by AI. "Head-nod beat" is the rhythm descriptor that works.' },
  { title: 'Concrete Jungle', genre: 'Hip-Hop', prompt: 'Trap, 808 bass, hi-hat rolls, dark atmosphere, 140 BPM, aggressive energy, half-time flow, distorted melody, hard-hitting', tips: 'Trap needs 140 BPM and "808 bass" explicitly. "Hi-hat rolls" are the signature rhythmic element.' },
  { title: 'Architect', genre: 'Hip-Hop', prompt: 'Conscious hip-hop, jazz samples, thoughtful lyrics, live drums feel, 95 BPM, introspective, layered wordplay, Kendrick-influenced', tips: 'Conscious hip-hop with jazz samples produces sophisticated beats. Artist references sharpen the style.' },
  { title: 'Frequency', genre: 'Hip-Hop', prompt: 'Experimental hip-hop, glitchy production, unconventional samples, 100 BPM, abstract, deconstructed beat, Flying Lotus-influenced', tips: 'Experimental hip-hop breaks rules. "Deconstructed beat" and "unconventional samples" give permission to go wild.' },
  { title: 'Block Party', genre: 'Hip-Hop', prompt: 'Old school hip-hop, funk samples, turntable scratches, breakbeat, 98 BPM, party energy, crowd hype, DJ-driven, classic feel', tips: 'Turntable scratches and breakbeat together signal old school party hip-hop specifically.' },
  { title: 'Midnight Oil', genre: 'Hip-Hop', prompt: 'Dark hip-hop, minor key piano, haunting strings, hard snare, 88 BPM, brooding atmosphere, Eminem-influenced intensity, raw emotion', tips: 'Piano and strings in minor key create the moody hip-hop bed. "Raw emotion" pushes vocal intensity.' },
  { title: 'Cloud Nine', genre: 'Hip-Hop', prompt: 'Cloud rap, ethereal synths, auto-tuned vocals, spacey atmosphere, 130 BPM, floating melody, reverb-heavy, dreamy trap', tips: 'Cloud rap is trap tempo with ambient textures. "Ethereal synths" and "spacey atmosphere" are essential.' },
  { title: 'Foundation', genre: 'Hip-Hop', prompt: 'East coast hip-hop, hard drums, piano loops, lyrical focus, 92 BPM, street poetry, Nas-influenced, gritty authenticity', tips: 'East coast hip-hop is defined by hard drums and piano. Nas reference gives clear lyrical direction.' },
  { title: 'Digital Pharaoh', genre: 'Hip-Hop', prompt: 'Afrofuturist hip-hop, African percussion, electronic elements, 105 BPM, ancestral future, cosmic bass, tribal rhythms, visionary', tips: 'Afrofuturist combines African percussion with electronic production. "Ancestral future" sets the thematic tone.' },
]

// ---------------------------------------------------------------------------
// Pack 2: AI Architecture Cheatsheet — $19
// ---------------------------------------------------------------------------

export const architectureCheatsheetMeta: ProductMeta = {
  slug: 'ai-architecture-cheatsheet',
  name: 'AI Architecture Cheatsheet',
  price: 19,
  currency: 'USD',
  description: '20 battle-tested AI architecture patterns with descriptions, use cases, diagram breakdowns, and tooling recommendations.',
}

export const architecturePatterns: ArchitecturePattern[] = [
  { name: 'RAG Pipeline', description: 'Retrieval-Augmented Generation combines a vector store with an LLM to answer questions grounded in your own documents. Embeddings are generated at ingest time and queried at inference time.', whenToUse: 'When the LLM needs access to private or frequently updated knowledge that was not in its training data.', diagramDescription: 'Documents flow into an embedding model, then into a vector database. At query time, user input is embedded, similar chunks are retrieved, and both the query and retrieved context are sent to the LLM for generation.', toolsNeeded: ['LangChain', 'Qdrant or Pinecone', 'OpenAI Embeddings', 'Next.js API route'] },
  { name: 'Agentic Loop', description: 'An autonomous agent that plans, executes tools, observes results, and iterates until the task is complete. Uses a ReAct-style reasoning loop with tool calling.', whenToUse: 'When tasks require multi-step reasoning, external tool use, or dynamic decision-making that cannot be solved in a single LLM call.', diagramDescription: 'User query enters a planning phase. The agent selects a tool, executes it, observes the output, then decides whether to call another tool or return the final answer. This loops until a stopping condition is met.', toolsNeeded: ['LangGraph or CrewAI', 'Tool definitions', 'LLM with function calling', 'State management'] },
  { name: 'Multi-Agent Orchestration', description: 'Multiple specialized agents collaborate on a task, each responsible for a distinct capability. A supervisor or router delegates subtasks and merges results.', whenToUse: 'When a single agent cannot handle the breadth of a task, or when different sub-problems require different expertise, tools, or models.', diagramDescription: 'A supervisor node receives the task and routes sub-problems to specialized agents (researcher, coder, reviewer). Each agent returns results to the supervisor, which synthesizes the final output.', toolsNeeded: ['LangGraph', 'Multiple LLM instances', 'Shared state store', 'Message queue'] },
  { name: 'Event-Driven Pipeline', description: 'Components communicate through events rather than direct calls. Each stage publishes events that downstream consumers process independently.', whenToUse: 'When you need loose coupling, horizontal scaling, or async processing between AI inference stages.', diagramDescription: 'Producer services emit events to a message broker. Consumer services subscribe to relevant topics, process data, and optionally emit new events. Each service scales independently.', toolsNeeded: ['Redis Streams or Kafka', 'n8n or Temporal', 'Webhook endpoints', 'Dead letter queue'] },
  { name: 'Prompt Chain', description: 'A sequence of LLM calls where the output of one prompt becomes input to the next. Each step performs a focused transformation.', whenToUse: 'When a complex task can be decomposed into sequential steps that each benefit from a clear, focused prompt.', diagramDescription: 'Input flows through Prompt A (extract), then Prompt B (analyze), then Prompt C (format). Each step receives the output of the previous step plus any additional context.', toolsNeeded: ['LangChain LCEL', 'Structured output parsing', 'Zod schemas', 'Retry logic'] },
  { name: 'Gateway Router', description: 'A single entry point that classifies incoming requests and routes them to the appropriate model, agent, or pipeline based on intent.', whenToUse: 'When you serve multiple AI capabilities behind one API and need intelligent request routing.', diagramDescription: 'All requests hit the gateway. A classifier determines intent (chat, search, generate, analyze). Each intent routes to a specialized handler with its own model configuration and tools.', toolsNeeded: ['Next.js API route or FastAPI', 'Intent classifier (LLM or rules)', 'Model registry', 'Rate limiter'] },
  { name: 'Evaluation Harness', description: 'Automated testing framework for LLM outputs. Runs prompts through models and scores responses against ground truth or rubrics.', whenToUse: 'When you need to compare models, validate prompt changes, or ensure quality before deploying prompt updates.', diagramDescription: 'Test cases (input + expected output) feed into the evaluation runner. Each case is sent to the LLM, the response is scored by an evaluator (automated or LLM-as-judge), and results are aggregated into a report.', toolsNeeded: ['Promptfoo or Braintrust', 'Test dataset', 'Scoring rubrics', 'CI/CD integration'] },
  { name: 'Streaming Response', description: 'Server-sent events or WebSocket connection that delivers LLM tokens to the client as they are generated, enabling real-time UI updates.', whenToUse: 'When user-facing chat or generation interfaces need to display output progressively rather than waiting for the full response.', diagramDescription: 'Client sends request to API. API calls LLM with streaming enabled. Each token chunk is sent via SSE to the client. Client appends tokens to the UI in real time. Connection closes on completion.', toolsNeeded: ['Vercel AI SDK', 'ReadableStream', 'SSE or WebSocket', 'React useChat hook'] },
  { name: 'Semantic Cache', description: 'Caches LLM responses by the semantic similarity of inputs rather than exact string match. Similar questions return cached answers without calling the model.', whenToUse: 'When you have high query volume with many semantically similar inputs and want to reduce latency and cost.', diagramDescription: 'User query is embedded. The embedding is compared against cached query embeddings. If similarity exceeds threshold, the cached response is returned. Otherwise, the LLM is called and the result is cached.', toolsNeeded: ['Redis or Upstash', 'Embedding model', 'Similarity threshold config', 'TTL management'] },
  { name: 'Human-in-the-Loop', description: 'An agent pauses execution at critical decision points and requests human approval before proceeding. Combines AI speed with human judgment.', whenToUse: 'When actions are irreversible, high-stakes, or require compliance review before execution.', diagramDescription: 'Agent processes task until it reaches a checkpoint. It presents its proposed action to a human reviewer via Slack, email, or dashboard. On approval, execution continues. On rejection, the agent replans.', toolsNeeded: ['LangGraph interrupt', 'Slack or email integration', 'Approval queue', 'State persistence'] },
  { name: 'Fine-Tuning Pipeline', description: 'End-to-end workflow for preparing training data, fine-tuning a base model, evaluating the result, and deploying the tuned model.', whenToUse: 'When prompt engineering alone cannot achieve the required style, format, or domain expertise, and you have sufficient training examples.', diagramDescription: 'Raw data is cleaned and formatted into training pairs. The dataset is split into train/validation sets. The base model is fine-tuned. The tuned model is evaluated against benchmarks. On pass, it deploys to production.', toolsNeeded: ['OpenAI fine-tuning API or Axolotl', 'JSONL formatter', 'Evaluation suite', 'Model registry'] },
  { name: 'Guardrails Layer', description: 'Input and output validation layer that sits between the user and the LLM. Blocks harmful inputs, validates output format, and enforces content policies.', whenToUse: 'When deploying user-facing AI that must comply with content policies, output schemas, or safety requirements.', diagramDescription: 'User input passes through input guardrails (toxicity check, PII detection, topic filter). Clean input goes to the LLM. LLM output passes through output guardrails (schema validation, hallucination check, safety filter). Only validated output reaches the user.', toolsNeeded: ['NeMo Guardrails or Guardrails AI', 'Zod schema validation', 'Content classifier', 'Logging'] },
  { name: 'Knowledge Graph + LLM', description: 'Combines structured knowledge graphs with LLM reasoning. The graph provides factual relationships while the LLM handles natural language understanding and generation.', whenToUse: 'When your domain has complex entity relationships that benefit from structured traversal rather than pure vector similarity search.', diagramDescription: 'User query is parsed by the LLM into a graph query (Cypher or SPARQL). The graph database returns structured results. The LLM generates a natural language answer from the graph data plus any additional context.', toolsNeeded: ['Neo4j or Amazon Neptune', 'LLM for query generation', 'Graph schema', 'Hybrid retrieval'] },
  { name: 'Batch Processing Pipeline', description: 'Processes large volumes of data through LLM inference in batch mode with rate limiting, retry logic, and progress tracking.', whenToUse: 'When you need to process thousands of items (classification, extraction, summarization) and real-time response is not required.', diagramDescription: 'Input dataset is chunked into batches. Each batch is sent to the LLM API with rate limiting. Results are collected, failed items are retried, and the complete output dataset is stored.', toolsNeeded: ['Queue system (BullMQ or SQS)', 'Rate limiter', 'Progress tracker', 'Output store'] },
  { name: 'Multimodal Fusion', description: 'Combines multiple input modalities (text, image, audio, video) into a unified representation for analysis or generation.', whenToUse: 'When the task requires understanding across modalities, such as analyzing a document with both text and images.', diagramDescription: 'Each input modality is processed by its specialized encoder (text embedder, vision model, audio transcriber). Representations are fused in a shared latent space. The fused representation is passed to the generation model.', toolsNeeded: ['GPT-4o or Gemini', 'Whisper for audio', 'CLIP for images', 'Fusion layer'] },
  { name: 'A/B Testing Framework', description: 'Routes a percentage of traffic to different model configurations, prompts, or pipelines and measures performance differences.', whenToUse: 'When you need data-driven decisions about which model, prompt, or architecture performs better in production.', diagramDescription: 'Traffic splitter assigns users to variant A or B. Each variant uses a different configuration. Responses and user interactions are logged. A statistics engine compares conversion, quality, and latency metrics.', toolsNeeded: ['Feature flag service', 'Analytics pipeline', 'Statistical testing', 'Langfuse or Helicone'] },
  { name: 'Retrieval-Augmented Fine-Tuning (RAFT)', description: 'Combines RAG and fine-tuning by training the model to reason over retrieved documents, making it better at extracting answers from context.', whenToUse: 'When standard RAG produces mediocre results because the model struggles to reason over your specific document format or domain.', diagramDescription: 'Training data pairs include: question, relevant retrieved documents (some with the answer, some distractors), and the correct chain-of-thought answer. The model is fine-tuned on these pairs to improve retrieval-grounded reasoning.', toolsNeeded: ['Training data generator', 'Document chunker', 'Fine-tuning API', 'RAG evaluation suite'] },
  { name: 'Federated Inference', description: 'Distributes inference across multiple model instances or providers, selecting the best model for each request based on cost, latency, or capability.', whenToUse: 'When you need resilience across providers, want to optimize cost by routing simple queries to cheaper models, or need specialized models for different tasks.', diagramDescription: 'Request classifier analyzes complexity and type. Simple requests route to a fast, cheap model. Complex requests route to a powerful model. If the primary provider is down, traffic fails over to the backup.', toolsNeeded: ['LiteLLM or OpenRouter', 'Request classifier', 'Fallback configuration', 'Cost tracker'] },
  { name: 'Memory-Augmented Agent', description: 'An agent with persistent memory that stores conversation history, learned facts, and user preferences across sessions.', whenToUse: 'When the agent needs to remember context across conversations, build user profiles, or accumulate knowledge over time.', diagramDescription: 'Short-term memory holds the current conversation. After each session, important facts are extracted and stored in long-term memory (vector store + structured DB). At session start, relevant memories are retrieved and injected into the system prompt.', toolsNeeded: ['Vector database', 'Memory extraction prompt', 'Session management', 'Relevance scoring'] },
  { name: 'Tool-Use Composition', description: 'Defines a library of tools that the LLM can compose together dynamically to solve novel problems it has not seen before.', whenToUse: 'When the set of possible user requests is open-ended and cannot be anticipated, but can be solved by combining available tools.', diagramDescription: 'The LLM receives a task and a tool catalog with descriptions. It plans a sequence of tool calls, executes each one, observes the result, and composes the outputs into a final answer. Tools can call other tools.', toolsNeeded: ['Function calling LLM', 'Tool registry with schemas', 'Execution sandbox', 'Error handling'] },
]

// ---------------------------------------------------------------------------
// Pack 3: GenCreator Starter Kit — $29
// ---------------------------------------------------------------------------

export const genCreatorStarterKitMeta: ProductMeta = {
  slug: 'gencreator-starter-kit',
  name: 'GenCreator Starter Kit',
  price: 29,
  currency: 'USD',
  description: 'Everything you need to start building as a generative creator: 12 principle cards, 8 chapter summaries, 5 blueprint templates, and a Soul.md template.',
}

export const principleCards: PrincipleCard[] = [
  { number: 1, title: 'Creation Over Consumption', summary: 'Every hour spent consuming is an hour not spent creating. Shift the ratio. Build daily, even if the output is rough. Volume precedes mastery.' },
  { number: 2, title: 'Stack Your Skills', summary: 'The most valuable creators combine skills that rarely coexist. AI + music, code + storytelling, design + data. Your unique stack is your moat.' },
  { number: 3, title: 'Ship Before Ready', summary: 'Perfection is procrastination wearing a mask. Publish the draft, release the v1, share the sketch. Feedback from the world beats feedback from your inner critic.' },
  { number: 4, title: 'Own Your Distribution', summary: 'Algorithms change. Platforms rise and fall. Build an email list, a website, a direct channel to your audience that no platform can revoke.' },
  { number: 5, title: 'Compound Content', summary: 'One idea becomes a blog post, a thread, a video, a newsletter section, and a product chapter. Create once, distribute everywhere, compound forever.' },
  { number: 6, title: 'Taste Is the Differentiator', summary: 'AI can generate infinite output. Your taste — knowing what to keep, what to cut, what to combine — is what makes your work yours. Develop it deliberately.' },
  { number: 7, title: 'Systems Over Goals', summary: 'Goals are endpoints. Systems are engines. Build a content system, a creation workflow, a publishing cadence. The system runs whether motivation shows up or not.' },
  { number: 8, title: 'Document the Journey', summary: 'Your process is content. Your failures are lessons. Your experiments are case studies. The journey itself is the product that builds trust and audience.' },
  { number: 9, title: 'Leverage AI as Amplifier', summary: 'AI is not a replacement for your creativity. It is a force multiplier. Use it to draft, iterate, explore, and produce at a pace that was previously impossible.' },
  { number: 10, title: 'Build in Public', summary: 'Transparency creates trust. Share what you are building, why, and how. The audience you attract by building in public is the most engaged audience you will ever have.' },
  { number: 11, title: 'Revenue from Day One', summary: 'Monetize early, even if the amounts are small. A $9 product validates demand. A $29 product funds the next creation. Revenue is the ultimate validation signal.' },
  { number: 12, title: 'Identity as Creator', summary: 'You are not someone who occasionally creates. You are a creator who occasionally does other things. This identity shift changes every decision you make.' },
]

export const chapterSummaries: ChapterSummary[] = [
  { chapter: 1, title: 'The Generative Creator Mindset', summary: 'Defines what it means to be a generative creator in the AI age. Covers the shift from manual production to AI-augmented creation, the importance of taste and curation, and why the barrier to entry has collapsed while the barrier to excellence remains high.' },
  { chapter: 2, title: 'Building Your Creation Stack', summary: 'How to assemble the tools, models, and workflows that form your personal creation infrastructure. Covers AI tools for text, image, audio, and video. Emphasizes choosing tools that compound rather than tools that are trendy.' },
  { chapter: 3, title: 'The Content Flywheel', summary: 'Designing a system where each piece of content feeds the next. Blog posts become newsletter sections. Newsletter sections become social threads. Social engagement reveals what to write next. The flywheel accelerates with each rotation.' },
  { chapter: 4, title: 'Product Architecture', summary: 'How to structure digital products that sell. Covers the ladder from free lead magnets to premium offerings. Template design, pricing psychology, and delivery automation. Every product should solve one clear problem.' },
  { chapter: 5, title: 'Distribution Engineering', summary: 'Building reliable channels that deliver your work to the right audience. Email list growth, SEO fundamentals, social platform strategy, and cross-posting workflows. Distribution is a skill, not an accident.' },
  { chapter: 6, title: 'AI-Augmented Workflows', summary: 'Practical workflows for using AI in every stage of creation. Ideation with brainstorming prompts, drafting with structured output, editing with critique prompts, and publishing with automation. Includes specific prompt templates for each stage.' },
  { chapter: 7, title: 'Monetization Systems', summary: 'Revenue models for generative creators. Digital products, subscriptions, coaching, licensing, and platform revenue. How to price, package, and position offerings. Building recurring revenue alongside one-time sales.' },
  { chapter: 8, title: 'Scaling Without Burnout', summary: 'Sustainable creation at high output. Batch production, automation, delegation, and rest cycles. The difference between productive volume and performative hustle. How to maintain quality while increasing quantity.' },
]

export const blueprintTemplates: BlueprintTemplate[] = [
  { name: 'Digital Product Blueprint', purpose: 'Plan and launch a digital product from idea to first sale in 14 days.', sections: ['Problem Statement', 'Target Customer Profile', 'Product Scope (what is included, what is not)', 'Content Outline', 'Pricing Strategy', 'Landing Page Copy Framework', 'Launch Checklist', 'Post-Launch Iteration Plan'] },
  { name: 'Content Flywheel Blueprint', purpose: 'Design a content system that compounds across platforms.', sections: ['Core Content Pillar (blog or newsletter)', 'Atomization Map (one piece becomes five)', 'Platform-Specific Formatting Rules', 'Publishing Calendar Template', 'Engagement Response Workflow', 'Performance Metrics Dashboard'] },
  { name: 'AI Workflow Blueprint', purpose: 'Document and optimize a repeatable AI-augmented creation process.', sections: ['Workflow Name and Purpose', 'Input Requirements', 'AI Tool Configuration (model, temperature, system prompt)', 'Step-by-Step Process', 'Quality Checklist', 'Output Format Specification', 'Iteration Protocol'] },
  { name: 'Audience Growth Blueprint', purpose: 'Build a systematic approach to growing an engaged audience from zero.', sections: ['Ideal Audience Profile', 'Lead Magnet Design', 'Email Welcome Sequence Outline', 'Social Proof Strategy', 'Collaboration and Cross-Promotion Plan', 'Growth Metrics and Milestones'] },
  { name: 'Revenue Architecture Blueprint', purpose: 'Map out a multi-stream revenue model for a creator business.', sections: ['Revenue Stream Inventory', 'Product Ladder (free to premium)', 'Pricing Matrix', 'Payment and Delivery Infrastructure', 'Financial Projections (3-month, 12-month)', 'Reinvestment Strategy'] },
]

export const soulMdTemplate: SoulMdTemplate = {
  sections: [
    { heading: 'Identity', description: 'Who you are as a creator. Your background, skills, and what makes your perspective unique.', placeholder: 'I am a [role] who combines [skill A] with [skill B] to [outcome]. My background in [domain] gives me a perspective that [differentiator].' },
    { heading: 'Mission', description: 'The change you want to create in the world through your work.', placeholder: 'I create [type of work] that helps [audience] achieve [transformation]. My work exists because [reason].' },
    { heading: 'Values', description: 'The non-negotiable principles that guide every creation decision.', placeholder: '1. [Value]: [What it means in practice]\n2. [Value]: [What it means in practice]\n3. [Value]: [What it means in practice]' },
    { heading: 'Voice', description: 'How you communicate. The tone, style, and language patterns that make your content recognizable.', placeholder: 'My voice is [adjective], [adjective], and [adjective]. I write like [reference] meets [reference]. I avoid [anti-pattern].' },
    { heading: 'Audience', description: 'Who you serve. Be specific about their challenges, aspirations, and where they spend time.', placeholder: 'My audience is [demographic] who struggle with [problem] and aspire to [goal]. They value [attribute] and can be found on [platforms].' },
    { heading: 'Creation Stack', description: 'The tools, models, and platforms that power your creative workflow.', placeholder: 'Primary tools: [list]\nAI models: [list]\nPublishing platforms: [list]\nDistribution channels: [list]' },
    { heading: 'Anti-Goals', description: 'What you deliberately choose not to pursue. Constraints that keep you focused.', placeholder: 'I do not [anti-goal]. I avoid [anti-pattern]. I will never [boundary].' },
    { heading: 'North Star Metric', description: 'The single metric that best indicates whether your creator business is on track.', placeholder: 'My north star metric is [metric] because [reason]. Current: [number]. Target: [number] by [date].' },
  ],
}

// ---------------------------------------------------------------------------
// All products metadata (for lookup)
// ---------------------------------------------------------------------------

export const allProductsMeta: ProductMeta[] = [
  sunoPromptPackMeta,
  architectureCheatsheetMeta,
  genCreatorStarterKitMeta,
]
