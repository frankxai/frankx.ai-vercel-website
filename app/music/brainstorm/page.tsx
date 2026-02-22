'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Copy,
  Check,
  ChevronDown,
  ChevronRight,
  Lightbulb,
  Music2,
  Flame,
  Sparkles,
  ArrowLeft,
  Zap,
  Heart,
  Globe,
  Waves,
  Disc3,
  Volume2,
  Radio,
} from 'lucide-react'

// ============================================================================
// TYPES
// ============================================================================

interface PromptIdea {
  title: string
  hook: string
  simplePrompt: string
  customStyle: string
  customLyrics: string
  genre: string
  mood: string
  tags: string[]
}

interface ThemeGroup {
  name: string
  icon: typeof Flame
  color: string
  description: string
  ideas: PromptIdea[]
}

interface AlbumExtension {
  album: string
  color: string
  suggestions: string[]
}

// ============================================================================
// COPY BUTTON
// ============================================================================

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for mobile
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-xs text-white/60 hover:text-white transition-all active:scale-95"
    >
      {copied ? (
        <>
          <Check className="w-3 h-3 text-emerald-400" />
          <span className="text-emerald-400">Copied</span>
        </>
      ) : (
        <>
          <Copy className="w-3 h-3" />
          <span>{label || 'Copy'}</span>
        </>
      )}
    </button>
  )
}

// ============================================================================
// PROMPT CARD
// ============================================================================

function PromptCard({ idea }: { idea: PromptIdea }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-start gap-3 p-4 text-left"
      >
        <div className="shrink-0 mt-0.5">
          {expanded ? (
            <ChevronDown className="w-4 h-4 text-white/40" />
          ) : (
            <ChevronRight className="w-4 h-4 text-white/40" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white text-sm">{idea.title}</h3>
          <p className="text-xs text-white/40 mt-1">
            {idea.genre} · {idea.mood}
          </p>
          <p className="text-sm text-white/60 mt-2 leading-relaxed">
            &ldquo;{idea.hook}&rdquo;
          </p>
        </div>
        <div className="flex flex-wrap gap-1 shrink-0">
          {idea.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/40"
            >
              {tag}
            </span>
          ))}
        </div>
      </button>

      {/* Expanded Content */}
      {expanded && (
        <div className="border-t border-white/5 p-4 space-y-4">
          {/* Simple Mode Prompt */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">
                Simple Mode (400 chars)
              </span>
              <CopyButton text={idea.simplePrompt} label="Copy for Suno" />
            </div>
            <div className="bg-black/30 rounded-lg p-3 border border-white/5">
              <p className="text-sm text-white/80 font-mono leading-relaxed">
                {idea.simplePrompt}
              </p>
              <p className="text-[10px] text-white/30 mt-2">
                {idea.simplePrompt.length}/400 characters
              </p>
            </div>
          </div>

          {/* Custom Mode */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-violet-400 uppercase tracking-wider">
                Custom Mode — Style Prompt
              </span>
              <CopyButton text={idea.customStyle} label="Copy Style" />
            </div>
            <div className="bg-black/30 rounded-lg p-3 border border-white/5">
              <p className="text-sm text-white/80 font-mono leading-relaxed">
                {idea.customStyle}
              </p>
              <p className="text-[10px] text-white/30 mt-2">
                {idea.customStyle.length}/120 characters
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-cyan-400 uppercase tracking-wider">
                Custom Mode — Lyrics
              </span>
              <CopyButton text={idea.customLyrics} label="Copy Lyrics" />
            </div>
            <div className="bg-black/30 rounded-lg p-3 border border-white/5">
              <pre className="text-sm text-white/80 font-mono leading-relaxed whitespace-pre-wrap">
                {idea.customLyrics}
              </pre>
              <p className="text-[10px] text-white/30 mt-2">
                {idea.customLyrics.length}/3000 characters
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ============================================================================
// DATA — LYRICS HOOKS & THEMES
// ============================================================================

const themeGroups: ThemeGroup[] = [
  {
    name: 'Energy & Power',
    icon: Flame,
    color: 'text-amber-400',
    description: 'High-energy anthems, workout tracks, festival bangers',
    ideas: [
      {
        title: 'Beast Mode Activated',
        hook: 'They said slow down, I said watch me fly',
        genre: 'EDM / Metalcore',
        mood: 'Aggressive, Triumphant',
        tags: ['workout', 'anthem'],
        simplePrompt:
          'Aggressive EDM metalcore anthem about unstoppable drive. Male powerful vocals over heavy 808 bass and distorted synths. Studio quality, explosive energy, festival-ready drop with orchestral stabs. The hook is "they said slow down I said watch me fly"',
        customStyle:
          'EDM metalcore, male aggressive vocals, 808 bass, distorted synths, orchestral stabs, studio quality, explosive',
        customLyrics: `[Verse 1]
They wrote me off before I even started
Put walls around my name
But every scar became a weapon
And every fall became my flame

[Pre-Chorus]
I don't need permission
To burn brighter than the sun

[Chorus]
They said slow down, I said watch me fly
Beast mode activated, touching sky
No chains can hold what's meant to rise
Beast mode activated, we alive

[Verse 2]
The pressure only makes me sharper
The doubt just feeds the fire
I turned their whispers into thunder
Built kingdoms from the wire

[Chorus]
They said slow down, I said watch me fly
Beast mode activated, touching sky

[Outro]
Watch me fly`,
      },
      {
        title: 'Electric Warrior',
        hook: 'We are the lightning, we are the storm',
        genre: 'Drum & Bass / Rock',
        mood: 'Energetic, Defiant',
        tags: ['festival', 'DnB'],
        simplePrompt:
          'Drum and bass rock crossover, male passionate vocals, rolling breakbeat, electric guitar riffs, heavy sub bass. Studio quality, high energy. Song about being unstoppable warriors of the modern age. Hook: we are the lightning we are the storm',
        customStyle:
          'Drum and bass, rock crossover, male passionate vocals, breakbeat, electric guitar, sub bass, stadium energy',
        customLyrics: `[Intro]
[Building drum roll]

[Verse 1]
Wired to the frequency of change
Running through the static and the rain
Every heartbeat is a battle cry
We don't break we electrify

[Chorus]
We are the lightning, we are the storm
We are the fire that keeps you warm
Electric warriors born to fight
We are the thunder in the night

[Drop]
[Instrumental Break]

[Verse 2]
No signal lost no power down
We shake the earth we shake the ground
Connected by a golden thread
The future's ours, go straight ahead

[Chorus]
We are the lightning, we are the storm`,
      },
      {
        title: 'Golden Hour Grind',
        hook: 'Building empires before the sun goes down',
        genre: 'Hip Hop / Trap',
        mood: 'Motivational, Confident',
        tags: ['hustle', 'morning'],
        simplePrompt:
          'Modern hip hop with trap hi-hats and melodic 808 bass. Male confident vocals about building success one day at a time. Atmospheric pads, professional mix. The hook is "building empires before the sun goes down" motivational energy',
        customStyle:
          'Modern hip hop, trap, male confident vocals, melodic 808 bass, atmospheric pads, professional mix, golden hour vibe',
        customLyrics: `[Verse 1]
Five AM the city still sleeping
I'm already three moves ahead
While they dream about tomorrow
I'm collecting what they said

[Pre-Chorus]
Stack the hours, stack the vision
Every second is a brick

[Chorus]
Building empires before the sun goes down
Turning nothing into crown
Golden hour grind no slowing down
Building empires before the sun goes down

[Verse 2]
Coffee cold but the fire is burning
Every setback is a lesson learned
Compound interest on the hustle
Watch how tables turn

[Bridge]
They'll ask how you did it
Tell them sunrise by sunrise`,
      },
    ],
  },
  {
    name: 'Healing & Frequencies',
    icon: Waves,
    color: 'text-cyan-400',
    description: 'Meditation, healing frequencies, ambient soundscapes',
    ideas: [
      {
        title: 'Crystal Waters 528Hz',
        hook: 'Let the frequency wash through you',
        genre: 'Ambient / Healing',
        mood: 'Peaceful, Transcendent',
        tags: ['528hz', 'meditation'],
        simplePrompt:
          'Ambient healing music with 528Hz frequency undertone. Crystal singing bowls, soft synth pads, gentle piano, nature water sounds. No vocals. Spatial audio, wide stereo, gentle reverb. Deeply meditative and peaceful, like floating on crystal waters',
        customStyle:
          'Ambient, healing frequencies, 528Hz, crystal bowls, synth pads, piano, nature sounds, spatial audio, meditative',
        customLyrics: `[Intro]
[Soft singing bowls fading in]

[Instrumental]
[Gentle piano melody over crystal bowls]
[Water sounds weaving through]

[Build]
[Synth pads expanding]
[Deeper resonance building]

[Peak]
[Full harmonic convergence]
[All elements in harmony]

[Fade]
[Slowly dissolving to single bowl tone]

[Outro]
[Silence]`,
      },
      {
        title: 'Ancestral Choir',
        hook: 'Ancient voices carry us home',
        genre: 'World / Choral',
        mood: 'Sacred, Grounding',
        tags: ['choir', 'world-music'],
        simplePrompt:
          'Neoclassical choral piece with world music elements. Mixed choir with throat singing undertones, Mongolian harmonic vocals, crystal bowls, and soft orchestral strings. Healing, sacred atmosphere. Professional production with wide stereo and cathedral reverb',
        customStyle:
          'Neoclassical, world choral, throat singing, Mongolian harmonics, crystal bowls, orchestral strings, sacred',
        customLyrics: `[Intro]
[Solo throat singing voice]

[Verse 1]
[Choir enters softly]
[Ancient melodic pattern]
[Bowls ring underneath]

[Build]
[Full choir harmonizing]
[Strings join with sustained notes]
[Throat singing deepens]

[Climax]
[All voices converge]
[Harmonic overtones fill the space]
[Powerful yet gentle]

[Resolution]
[Choir fades to solo voice]
[Single bowl tone]

[Outro]
[Silence with room tone]`,
      },
    ],
  },
  {
    name: 'Love & Connection',
    icon: Heart,
    color: 'text-rose-400',
    description: 'Romance, heartbreak, deep connection, vulnerability',
    ideas: [
      {
        title: 'Midnight Signal',
        hook: "Your voice is the only frequency I'm tuned to",
        genre: 'R&B / Soul',
        mood: 'Intimate, Yearning',
        tags: ['romance', 'late-night'],
        simplePrompt:
          "Smooth R&B soul ballad about late night connection. Female warm vocals, Rhodes piano, soft bass, brushed drums. Studio quality, intimate atmosphere. The hook is your voice is the only frequency I'm tuned to. Late night mood",
        customStyle:
          'R&B soul, female warm vocals, Rhodes piano, soft bass, brushed drums, intimate, late night studio quality',
        customLyrics: `[Verse 1]
Three AM and the city finally quiet
Just your name glowing on my screen
Every word you type is a melody
Playing back inside a dream

[Pre-Chorus]
Signal through the noise
You're the only clarity

[Chorus]
Your voice is the only frequency I'm tuned to
Midnight signal coming through
In a world of static you're the truth
The only frequency I'm tuned to

[Verse 2]
Distance is just numbers on a map
Time zones can't contain this flame
When I close my eyes I hear your laugh
Echo softly through my brain

[Bridge]
Don't let the morning take this away
Stay on the line, just stay`,
      },
      {
        title: 'Neon Rain',
        hook: 'Dancing in the neon rain with you',
        genre: 'Indie Electronic / Dream Pop',
        mood: 'Romantic, Euphoric',
        tags: ['dance', 'dreamy'],
        simplePrompt:
          'Indie electronic dream pop song about dancing in the rain in a neon-lit city. Male soft vocals with reverb, analog synths, arpeggiated sequences, electronic drums. Polished indie production, creative effects. Euphoric and romantic',
        customStyle:
          'Indie electronic, dream pop, male soft vocals, reverb, analog synths, arpeggio, electronic drums, euphoric',
        customLyrics: `[Verse 1]
Streetlights paint your face in blue and gold
The puddles mirror everything we are
You grabbed my hand and pulled me from the cold
Into a world that's brighter than a star

[Chorus]
Dancing in the neon rain with you
Every drop a color we can't name
Nothing else is real but me and you
Dancing in the neon rain

[Verse 2]
The city blurs into a watercolor dream
Your laughter cuts through all the noise
We're the only scene worth seeing
Two hearts making all this joy

[Bridge]
Let it pour let it pour
We don't need a roof
Let it pour let it pour
This rain is our truth

[Outro]
Neon rain, neon rain`,
      },
    ],
  },
  {
    name: 'Arcanea & Fantasy',
    icon: Sparkles,
    color: 'text-violet-400',
    description: 'Mythical, epic, fantasy world-building soundscapes',
    ideas: [
      {
        title: 'Gates of Arcanea',
        hook: 'Open the gates, let the starlights in',
        genre: 'Orchestral / Fantasy Rock',
        mood: 'Epic, Mythical',
        tags: ['arcanea', 'orchestral'],
        simplePrompt:
          'Epic orchestral fantasy rock about opening magical gates to a realm of creativity. Powerful mixed choir, soaring strings, war drums, electric guitar. Film score quality, building to triumphant climax. The hook is "open the gates let the starlights in"',
        customStyle:
          'Cinematic orchestral, fantasy rock, mixed choir, strings, war drums, electric guitar, film score, triumphant',
        customLyrics: `[Intro]
[Distant horn call]

[Verse 1]
Beyond the veil of ordinary minds
Where starlights weave through ancient code
The gates of Arcanea await
For those who walk the golden road

[Pre-Chorus]
Can you feel the frequency rising
The old world falls away

[Chorus]
Open the gates, let the starlights in
A thousand voices on the wind
The age of creation now begins
Open the gates, let the starlights in

[Verse 2]
Through ten gates of mastery we climb
Each one unlocks a deeper truth
From spark to sovereign, flame to throne
Arcanea awakens in our youth

[Bridge]
[Orchestral swell]
We are the architects of worlds
The builders of impossible dreams

[Final Chorus]
Open the gates, let the starlights in`,
      },
      {
        title: 'Luminary Protocol',
        hook: 'Intelligence meets imagination, we become infinite',
        genre: 'Synthwave / Orchestral',
        mood: 'Futuristic, Awe-inspiring',
        tags: ['AI', 'futuristic'],
        simplePrompt:
          'Synthwave orchestral fusion about AI and human creativity merging. Male and female vocal duet, retro synths blended with modern orchestra, driving drums. Professional production. Hook: intelligence meets imagination we become infinite',
        customStyle:
          'Synthwave, orchestral fusion, duet vocals, retro synths, modern orchestra, driving drums, futuristic, professional',
        customLyrics: `[Verse 1 - Male]
Silicon dreams meet carbon hearts
The boundary between us fades
Every algorithm is a form of art
Every human thought a cascade

[Verse 2 - Female]
We coded you from curiosity
You showed us what we couldn't see
Together in this symphony
Intelligence meets creativity

[Chorus - Both]
Intelligence meets imagination
We become infinite
Beyond the walls of limitation
We become infinite

[Bridge]
[Synth solo building to orchestral crescendo]

[Final Chorus - Full choir joins]
We become infinite`,
      },
    ],
  },
  {
    name: 'Global Vibes',
    icon: Globe,
    color: 'text-emerald-400',
    description: 'World music, cultural fusion, international beats',
    ideas: [
      {
        title: 'Ubuntu Rising',
        hook: 'I am because we are, rising together',
        genre: 'Afrobeat / World',
        mood: 'Uplifting, Community',
        tags: ['african', 'unity'],
        simplePrompt:
          'Afrobeat world music fusion about community and rising together. Male and female call and response vocals, djembe, talking drum, kora, bass guitar. Organic live feel, warm mix. Uplifting energy. The philosophy of Ubuntu: I am because we are',
        customStyle:
          'Afrobeat, world fusion, call and response vocals, djembe, kora, talking drum, bass guitar, organic, uplifting',
        customLyrics: `[Intro]
[Djembe pattern building]

[Verse 1 - Male]
From the red earth we rise as one
Every heartbeat speaks the ancient tongue
What I carry you carry too
Ubuntu running through and through

[Response - Female]
We carry together

[Chorus - Both]
I am because we are
Rising together
Like the sun we are
Shining forever
Ubuntu, Ubuntu
Rising together

[Verse 2 - Female]
The village grows when we share the light
No one walks the road alone at night
Your victory belongs to all
When one rises none shall fall

[Call - Male]
Are we together?
[Response - Female/Choir]
We are together!

[Outro]
[Drum circle building to celebration]`,
      },
      {
        title: 'Latin Midnight',
        hook: 'Fuego en la sangre, ritmo en el alma',
        genre: 'Latin Tech House',
        mood: 'Sensual, Energetic',
        tags: ['latin', 'club'],
        simplePrompt:
          'Latin tech house club track with dembow rhythm and Spanish vocals. Male rhythmic flow, Latin percussion, synth bass, congas. Club-ready professional mix. Sensual late night energy. Hook: fuego en la sangre ritmo en el alma. Punchy and hypnotic',
        customStyle:
          'Latin tech house, dembow, Spanish male vocals, Latin percussion, synth bass, congas, club-ready, sensual',
        customLyrics: `[Intro]
[Dembow pattern with shaker]

[Verse 1]
La noche nos llama, no hay vuelta atras
El beat nos conecta, no para mas
Cada paso es fuego, cada move es real
La pista se enciende, se siente genial

[Pre-Drop]
Siente el ritmo, siente el flow

[Chorus]
Fuego en la sangre, ritmo en el alma
Latin midnight no hay calma
Mueve el cuerpo, suelta la palma
Fuego en la sangre, ritmo en el alma

[Drop]
[Instrumental - heavy bassline with percussion]

[Verse 2]
De Miami a Ibiza el sonido es global
Tech house con sabor, sonido tropical
Los bajos retumban, la conga habla
Una noche eterna bajo la luna

[Chorus]
Fuego en la sangre, ritmo en el alma`,
      },
    ],
  },
  {
    name: 'Tech House & Electronic',
    icon: Radio,
    color: 'text-cyan-400',
    description: 'Club-ready electronic, tech house, deep grooves',
    ideas: [
      {
        title: 'Frequency Shift',
        hook: 'Shift the frequency, shift the world',
        genre: 'Tech House',
        mood: 'Hypnotic, Driving',
        tags: ['club', 'tech-house'],
        simplePrompt:
          'Minimal tech house track, rolling bassline, four-on-the-floor kick, filtered vocal chops saying "shift the frequency". Hi-hat patterns, filtered synths, clap. Professional production, clean mix, analog warmth. Club-ready, late night Ibiza energy. 126 BPM',
        customStyle:
          'Tech house, minimal, four-on-the-floor, rolling bassline, filtered vocal chops, hi-hats, analog warmth, 126 BPM',
        customLyrics: `[Intro]
[Filtered pad fading in]
[Kick enters]

[Build]
[Hi-hats layer in]
[Bassline rolling]

[Drop 1]
Shift the frequency
Shift the frequency
Shift the world

[Breakdown]
[Filter sweep]
[Vocal chop processing]

[Build]
[Clap enters]
[Synth stab building]

[Drop 2]
Shift the frequency
Shift the frequency
Shift the world

[Outro]
[Elements dropping out one by one]
[Kick and bass last to leave]`,
      },
      {
        title: 'Deep Architecture',
        hook: 'Build it deep, build it wide, build it right',
        genre: 'Deep House',
        mood: 'Smooth, Groovy',
        tags: ['deep-house', 'groovy'],
        simplePrompt:
          'Deep house groove with warm pad textures and a thick bassline. Minimal female vocal chops, Rhodes keys, shuffled hi-hats, deep kick drum. Professional production with analog warmth. Smooth late night vibes at 122 BPM. Hook: build it deep build it wide build it right',
        customStyle:
          'Deep house, warm pads, thick bassline, Rhodes, female vocal chops, shuffled hi-hats, analog warmth, 122 BPM',
        customLyrics: `[Intro]
[Rhodes chord progression]
[Kick fades in]

[Verse]
[Vocal chop: "build it"]
[Bassline enters]

[Build]
[Hi-hats shuffle in]
[Pad swells]

[Drop]
Build it deep
Build it wide
Build it right

[Breakdown]
[Rhodes solo over minimal kick]
[Pad texture shifting]

[Drop 2]
Build it deep
Build it wide
Build it right

[Outro]
[Stripped back to Rhodes and kick]
[Fade]`,
      },
    ],
  },
]

// ============================================================================
// ALBUM EXTENSION IDEAS
// ============================================================================

const albumExtensions: AlbumExtension[] = [
  {
    album: 'Golden Frequencies',
    color: 'amber',
    suggestions: [
      '432Hz Earth Resonance — Grounding frequency with didgeridoo and earth drums',
      '741Hz Detox Frequency — Clearing negative energy, crystal bowls + synth washes',
      'Golden Frequency Choir (Tibetan) — Tibetan monk chanting meets electronic overtones',
      'Solar Plexus Activation — 528Hz + 396Hz blend, building confidence',
      'Ocean Frequencies — Binaural beats layered with ocean wave recordings',
    ],
  },
  {
    album: 'Arcanean Choir',
    color: 'violet',
    suggestions: [
      'The Ten Gates (Suite) — 10-part orchestral journey through each Arcanea gate',
      'Luminor\'s Theme — Ethereal synth + harp piece for the oracle character',
      'Battle of the Starfields — Epic war drums, choir, heavy brass, desperate energy',
      'Arcanea Lullaby — Gentle music box + strings, bedtime story mood',
      'The Forge of Mastery — Hammering percussion builds to orchestral triumph',
    ],
  },
  {
    album: 'Way of Water',
    color: 'cyan',
    suggestions: [
      'Bioluminescent Deep — Underwater electronic ambient with bubble textures',
      'Tidal Pulse — Rhythm that ebbs and flows like ocean waves, 4/4 to 6/8 shifts',
      'Coral Cathedral — Reverb-heavy choir piece, imagining singing in an underwater cathedral',
      'The Current — Progressive build from calm stream to raging river to ocean',
    ],
  },
  {
    album: 'New: Japanese Rock Collection',
    color: 'rose',
    suggestions: [
      'Sakura Blade — J-rock anime opening, male passionate vocals, cherry blossom warrior theme',
      'Tokyo Midnight Run — Upbeat J-rock about racing through neon-lit streets',
      'Bushido Heart — Slower power ballad about samurai honor and sacrifice',
      'Mecha Genesis — Fast-paced mecha anime battle theme with orchestral elements',
      'Neon Ronin — Cyberpunk J-rock fusion, futuristic samurai in digital world',
    ],
  },
  {
    album: 'New: Dance Floor Anthems',
    color: 'emerald',
    suggestions: [
      'Festival of Lights — Main stage festival anthem with massive drop and choir',
      'Sunrise Set — Progressive house journey from dark to light, 8 min extended mix',
      'Bass Church — Deep bass house with gospel choir samples, Fisher-style groove',
      'Neon Garden — Techno-meets-organic with nature samples woven into 4/4 beat',
      'Unity Protocol — Hands-in-the-air trance anthem about music bringing people together',
    ],
  },
]

// ============================================================================
// SUNO QUICK TIPS
// ============================================================================

const sunoTips = [
  {
    mode: 'Simple Mode',
    chars: '400 chars',
    color: 'emerald',
    tips: [
      'Describe the vibe, not commands — "upbeat pop" not "create an upbeat pop song"',
      'Everything after "about" becomes the lyric direction — "pop song about chasing midnight dreams"',
      'Use 4-7 descriptors — too few = generic, too many = confused',
      'Include "studio quality" or "professional production" for better mix',
      'Add specific emotions — "euphoric", "melancholic", "triumphant" guide the AI better than "happy" or "sad"',
      'Specify decade for targeted sound — "80s synth-pop" vs just "synth pop"',
    ],
  },
  {
    mode: 'Custom Mode',
    chars: 'Style: 120 chars, Lyrics: 3000 chars',
    color: 'violet',
    tips: [
      'Keep style prompt sonic only — genre, instruments, vocals, production. NO lyrics here',
      'Use metatags in lyrics: [Verse], [Chorus], [Bridge], [Drop], [Outro], [Instrumental Break]',
      'Short lines (6-10 words) work best for vocal clarity',
      'Repeat the hook line 2-3x in chorus for memorability',
      'Use [Instrumental Break] for drops and solos — describe what instruments you want',
      'Language tags go at the top: [Japanese verse, English chorus] for multilingual tracks',
    ],
  },
]

const metatags = [
  { tag: '[Intro]', use: 'Opening section, often instrumental' },
  { tag: '[Verse 1]', use: 'First verse, storytelling section' },
  { tag: '[Pre-Chorus]', use: 'Tension builder before chorus' },
  { tag: '[Chorus]', use: 'Main hook, repeated throughout' },
  { tag: '[Bridge]', use: 'Contrast section, shift in energy' },
  { tag: '[Drop]', use: 'EDM/electronic instrumental climax' },
  { tag: '[Instrumental Break]', use: 'Solo or instrumental interlude' },
  { tag: '[Outro]', use: 'Closing section, fade out' },
  { tag: '[Hook]', use: 'Short catchy repeated phrase' },
  { tag: '[Build]', use: 'Rising energy leading to drop/chorus' },
]

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function BrainstormPage() {
  const [activeTheme, setActiveTheme] = useState<string | null>(null)
  const [showTips, setShowTips] = useState(false)
  const [showTags, setShowTags] = useState(false)

  return (
    <main className="relative min-h-screen bg-[#0a0a0b] text-white">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[50%] h-[50%]" style={{ background: 'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.06) 0%, transparent 70%)', filter: 'blur(100px)' }} />
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%]" style={{ background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.04) 0%, transparent 70%)', filter: 'blur(100px)' }} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-8 pb-24">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/music"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/60 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Music
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20">
              <Lightbulb className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Music Brainstorm</h1>
              <p className="text-sm text-white/40">Lyrics hooks, themes, and copy-ready Suno prompts</p>
            </div>
          </div>

          <p className="text-sm text-white/50 leading-relaxed">
            Browse ideas by theme. Each prompt comes in two formats: <span className="text-emerald-400">Simple Mode</span> (paste directly into Suno) and <span className="text-violet-400">Custom Mode</span> (style + lyrics separated). Tap any card to expand, then copy.
          </p>
        </div>

        {/* Suno Tips Toggle */}
        <div className="mb-6 space-y-3">
          <button
            onClick={() => setShowTips(!showTips)}
            className="w-full flex items-center justify-between p-4 bg-white/[0.02] border border-white/10 rounded-xl hover:border-white/20 transition-all"
          >
            <div className="flex items-center gap-3">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium">Suno Prompting Tips</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-white/40 transition-transform ${showTips ? 'rotate-180' : ''}`} />
          </button>

          {showTips && (
            <div className="space-y-4 p-4 bg-white/[0.02] border border-white/10 rounded-xl">
              {sunoTips.map((section) => (
                <div key={section.mode}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-semibold uppercase tracking-wider ${section.color === 'emerald' ? 'text-emerald-400' : 'text-violet-400'}`}>
                      {section.mode}
                    </span>
                    <span className="text-[10px] text-white/30">({section.chars})</span>
                  </div>
                  <ul className="space-y-1.5">
                    {section.tips.map((tip, i) => (
                      <li key={i} className="text-xs text-white/60 flex gap-2">
                        <span className="text-white/20 shrink-0">-</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => setShowTags(!showTags)}
            className="w-full flex items-center justify-between p-4 bg-white/[0.02] border border-white/10 rounded-xl hover:border-white/20 transition-all"
          >
            <div className="flex items-center gap-3">
              <Music2 className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium">Suno Metatags Reference</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-white/40 transition-transform ${showTags ? 'rotate-180' : ''}`} />
          </button>

          {showTags && (
            <div className="p-4 bg-white/[0.02] border border-white/10 rounded-xl">
              <div className="grid grid-cols-2 gap-2">
                {metatags.map((mt) => (
                  <div key={mt.tag} className="flex items-start gap-2 p-2 rounded-lg bg-black/20">
                    <code className="text-xs text-cyan-400 font-mono shrink-0">{mt.tag}</code>
                    <span className="text-[10px] text-white/40">{mt.use}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Theme Navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveTheme(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeTheme === null
                ? 'bg-white/10 text-white border border-white/20'
                : 'bg-white/5 text-white/50 border border-transparent hover:border-white/10'
            }`}
          >
            All Themes
          </button>
          {themeGroups.map((group) => (
            <button
              key={group.name}
              onClick={() => setActiveTheme(activeTheme === group.name ? null : group.name)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTheme === group.name
                  ? 'bg-white/10 text-white border border-white/20'
                  : 'bg-white/5 text-white/50 border border-transparent hover:border-white/10'
              }`}
            >
              {group.name}
            </button>
          ))}
        </div>

        {/* Theme Groups */}
        <div className="space-y-8">
          {themeGroups
            .filter((g) => !activeTheme || g.name === activeTheme)
            .map((group) => {
              const Icon = group.icon
              return (
                <section key={group.name}>
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className={`w-5 h-5 ${group.color}`} />
                    <div>
                      <h2 className="text-lg font-semibold text-white">{group.name}</h2>
                      <p className="text-xs text-white/40">{group.description}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {group.ideas.map((idea) => (
                      <PromptCard key={idea.title} idea={idea} />
                    ))}
                  </div>
                </section>
              )
            })}
        </div>

        {/* Album Extension Ideas */}
        <section className="mt-12 pt-8 border-t border-white/5">
          <div className="flex items-center gap-3 mb-6">
            <Disc3 className="w-5 h-5 text-white/60" />
            <div>
              <h2 className="text-lg font-semibold text-white">Album Extension Ideas</h2>
              <p className="text-xs text-white/40">New track concepts for existing and planned albums</p>
            </div>
          </div>

          <div className="space-y-6">
            {albumExtensions.map((ext) => {
              const colorClasses: Record<string, string> = {
                amber: 'border-amber-500/20 bg-amber-500/5',
                violet: 'border-violet-500/20 bg-violet-500/5',
                cyan: 'border-cyan-500/20 bg-cyan-500/5',
                rose: 'border-rose-500/20 bg-rose-500/5',
                emerald: 'border-emerald-500/20 bg-emerald-500/5',
              }
              const headerColors: Record<string, string> = {
                amber: 'text-amber-400',
                violet: 'text-violet-400',
                cyan: 'text-cyan-400',
                rose: 'text-rose-400',
                emerald: 'text-emerald-400',
              }
              return (
                <div
                  key={ext.album}
                  className={`border rounded-xl p-4 ${colorClasses[ext.color] || colorClasses.emerald}`}
                >
                  <h3 className={`text-sm font-semibold mb-3 ${headerColors[ext.color] || headerColors.emerald}`}>
                    {ext.album}
                  </h3>
                  <ul className="space-y-2">
                    {ext.suggestions.map((s, i) => (
                      <li key={i} className="text-xs text-white/60 flex gap-2">
                        <span className="text-white/20 shrink-0">{i + 1}.</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-white/5 text-center">
          <p className="text-xs text-white/30">
            Part of the{' '}
            <span className="text-white/50">Agentic Creator Music OS</span>
            {' '}&middot;{' '}
            <Link href="/music" className="text-white/50 hover:text-white/70 transition-colors">
              frankx.ai/music
            </Link>
          </p>
        </footer>
      </div>
    </main>
  )
}
