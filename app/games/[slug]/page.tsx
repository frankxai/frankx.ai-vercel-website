import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import GamePlayerClient from './GamePlayerClient'

export interface GameData {
  slug: string
  title: string
  subtitle: string
  brand: 'FrankX Mind' | 'Arcanea' | 'Starlight' | 'FrankX Kids' | 'FrankX Party' | 'Deutsche Denkspiele'
  brandColor: string
  category: string
  cognitiveProtocol: string
  targetBrainArea: string
  scientificBasis: string
  description: string
  instructions: string[]
  controls: { key: string; action: string }[]
  accentColor: string
  bgGradient: string
  fps: number
  freqHz?: number
}

export const GAME_CATALOG: Record<string, GameData> = {
  // --- 1. Tactical & Arcanea Lore Flagships ---
  'arcanea-legends': {
    slug: 'arcanea-legends',
    title: 'Arcanea: Realm of Legends',
    subtitle: 'Tactical 1v1 Guardian Card Battler',
    brand: 'Arcanea',
    brandColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    category: 'Tactical Strategy & Lore',
    cognitiveProtocol: 'Complex Decision Trees & Working Memory',
    targetBrainArea: 'Prefrontal Cortex & Strategic Foresight',
    scientificBasis: 'Dynamic tactical game theory under imperfect information states',
    description: 'Command elemental Guardian spirits and legendary champions in high-stakes tactical card duels featuring 3D gold foil gyro shaders.',
    instructions: [
      'Tap cards from your hand (bottom) to summon minions to the battlefield.',
      'Tap your ready minions on the battlefield to command attacks.',
      'Tap Lord Draxon (top) to deal direct damage when the path is clear.',
      'Manage your Astral Mana pool efficiently each turn.'
    ],
    controls: [
      { key: 'Tap / Click', action: 'Select Card / Target Minion' },
      { key: 'M', action: 'Toggle Procedural Audio' },
      { key: 'Esc / Top-Right X', action: 'Exit to Games Arcade' }
    ],
    accentColor: '#f59e0b',
    bgGradient: 'from-amber-950/40 via-slate-950 to-slate-950',
    fps: 60,
    freqHz: 528
  },
  'neuro-cosmos': {
    slug: 'neuro-cosmos',
    title: 'NeuroCosmos: Synaptic Routing',
    subtitle: 'Neural Light Physics & Resonance Puzzles',
    brand: 'Arcanea',
    brandColor: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10',
    category: 'Spatial Physics & Lore',
    cognitiveProtocol: 'Spatial Transformation & Visual Pattern Routing',
    targetBrainArea: 'Superior Parietal Lobe & Visual Cortex',
    scientificBasis: 'Spatial orientation and mental rotation exercises strengthening synaptic connectivity and visual-spatial problem solving',
    description: 'Route cosmic light beams through holographic prism nodes to awaken ancient dormant Guardian monoliths across the cosmos.',
    instructions: [
      'Tap and drag optic prisms to rotate and redirect light vectors.',
      'Harmonize light beams with corresponding elemental color receptors.',
      'Achieve 100% synaptic resonance to unlock the stargate.'
    ],
    controls: [
      { key: 'Click + Drag', action: 'Rotate Prisms & Mirrors' },
      { key: 'R', action: 'Reset Level Vector Path' }
    ],
    accentColor: '#6366f1',
    bgGradient: 'from-indigo-950/40 via-slate-950 to-slate-950',
    fps: 60,
    freqHz: 639
  },

  // --- 2. FrankX Cognitive Neuroscience Suite ---
  'neuro-matrix': {
    slug: 'neuro-matrix',
    title: 'NeuroMatrix: Dual N-Back',
    subtitle: 'Fluid Intelligence & Working Memory Trainer',
    brand: 'FrankX Mind',
    brandColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
    category: 'Cognitive Neuroscience',
    cognitiveProtocol: 'Dual N-Back Continuous Match (PNAS Protocol)',
    targetBrainArea: 'Dorsolateral Prefrontal Cortex ($Gf$ Fluid IQ)',
    scientificBasis: 'Jaeggi et al. (PNAS 2008) — Proven method to increase fluid intelligence through simultaneous audio-spatial working memory load',
    description: 'The clinically validated gold-standard working memory protocol. Track spatial grid positions and synthetic Solfeggio tones across dynamic N intervals.',
    instructions: [
      'Observe the flashing blue square position and listen to the audio pitch.',
      'Press POSITION MATCH (A) if the current grid tile matches the position N steps ago.',
      'Press AUDIO MATCH (L) if the current tone matches the tone N steps ago.',
      'Achieve 80%+ accuracy across 20 trials to level up from N=1 to N=2, N=3, and N=4.'
    ],
    controls: [
      { key: 'A / Left Button', action: 'Position Match' },
      { key: 'L / Right Button', action: 'Audio Tone Match' },
      { key: 'Spacebar', action: 'Both Match' }
    ],
    accentColor: '#06b6d4',
    bgGradient: 'from-cyan-950/40 via-slate-950 to-slate-950',
    fps: 60,
    freqHz: 432
  },
  'chrono-focus': {
    slug: 'chrono-focus',
    title: 'ChronoFocus: Stroop Warp',
    subtitle: 'Inhibitory Control & Executive Speed Action',
    brand: 'FrankX Mind',
    brandColor: 'text-violet-400 border-violet-500/30 bg-violet-500/10',
    category: 'Cognitive Neuroscience',
    cognitiveProtocol: 'High-Speed Stroop Conflict & Cognitive Flexibility',
    targetBrainArea: 'Anterior Cingulate Cortex (Inhibitory Reflex)',
    scientificBasis: 'Stroop Effect (1935) — Trains selective attention and inhibitory neural pathways by forcing semantic override under strict 800ms time pressure',
    description: 'High-speed cognitive reflex action. Override automated semantic reading patterns by matching the ink color of the stimulus under accelerating time warp.',
    instructions: [
      'Read the target stimulus word in the center.',
      'Select the button matching the INK COLOR of the word, ignoring what the text spells.',
      'React before the timer ring depletes (800ms baseline, accelerating with streaks).',
      'Build combo multipliers for maximum synaptic score.'
    ],
    controls: [
      { key: '1, 2, 3, 4', action: 'Select Color (Cyan, Amber, Emerald, Rose)' },
      { key: 'Tap Buttons', action: 'Direct Mobile Selection' }
    ],
    accentColor: '#8b5cf6',
    bgGradient: 'from-violet-950/40 via-slate-950 to-slate-950',
    fps: 120,
    freqHz: 741
  },
  'quantum-prime': {
    slug: 'quantum-prime',
    title: 'Quantum Prime: Factor Fusion',
    subtitle: 'Harmonic Mental Math & Prime Physics',
    brand: 'FrankX Mind',
    brandColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    category: 'Cognitive Neuroscience',
    cognitiveProtocol: 'Parietal Numerical Factoring & Working Memory',
    targetBrainArea: 'Intraparietal Sulcus & Numerical Intuition',
    scientificBasis: 'Cognitive arithmetic training enhancing quantitative working memory and mental factoring agility through harmonic physics',
    description: 'Harmonic prime factorization and cascading multiplication physics puzzle. Break composite energy orbs into fundamental prime constituents.',
    instructions: [
      'Observe the composite energy target orb at the top.',
      'Tap prime number nodes (2, 3, 5, 7, 11) whose product equals the target.',
      'Execute chain combos before the energy containment field destabilizes.'
    ],
    controls: [
      { key: 'Click / Tap', action: 'Select Prime Factor' },
      { key: 'Backspace', action: 'Clear Current Factor Chain' }
    ],
    accentColor: '#10b981',
    bgGradient: 'from-emerald-950/40 via-slate-950 to-slate-950',
    fps: 60,
    freqHz: 528
  },
  'resonance-flow': {
    slug: 'resonance-flow',
    title: 'Resonance: Bio-Flow HRV',
    subtitle: '4-7-8 Guided Breathing & Parasympathetic Pacing',
    brand: 'FrankX Mind',
    brandColor: 'text-teal-400 border-teal-500/30 bg-teal-500/10',
    category: 'Cognitive Neuroscience & Longevity',
    cognitiveProtocol: 'Vagal Tone & Heart Rate Variability Coherence',
    targetBrainArea: 'Vagus Nerve & Parasympathetic Alpha Coherence',
    scientificBasis: 'Autonomic nervous system resonance: 4-7-8 rhythmic breathing stimulates the vagus nerve, reducing cortisol and synchronizing brainwave alpha states',
    description: 'Bio-rhythmic breathing pacer set to Solfeggio 432 Hz / 528 Hz binaural audio with a blooming geometric mandala.',
    instructions: [
      'Inhale deeply through your nose as the mandala expands (4s).',
      'Hold your breath with full lungs as the mandala glows (7s).',
      'Exhale slowly and completely through your mouth as the mandala contracts (8s).',
      'Complete 4 cycles to induce deep autonomic parasympathetic coherence.'
    ],
    controls: [
      { key: 'Tap / Click', action: 'Start / Pause Resonance Cycle' },
      { key: 'M', action: 'Toggle Solfeggio Harmony' }
    ],
    accentColor: '#14b8a6',
    bgGradient: 'from-teal-950/40 via-slate-950 to-slate-950',
    fps: 60,
    freqHz: 432
  },
  'synapse-surge': {
    slug: 'synapse-surge',
    title: 'Synapse Surge: Memory Span',
    subtitle: 'Spatial-Temporal Sequence Span & Solfeggio Harmonic Grid',
    brand: 'FrankX Mind',
    brandColor: 'text-sky-400 border-sky-500/30 bg-sky-500/10',
    category: 'Cognitive Neuroscience',
    cognitiveProtocol: 'Working Memory Span & Sequential Synaptic Encoding',
    targetBrainArea: 'Dorsolateral Prefrontal Cortex (Span Capacity)',
    scientificBasis: 'Forward and backward memory span training under accelerating interval pressure expands short-term synaptic buffer capacity',
    description: 'Sequential synaptic memory span training across a 16-node harmonic matrix. Observe procedural excitation pathways and reproduce sequences with micro-tone feedback.',
    instructions: [
      'Observe the sequence of glowing synaptic nodes and auditory harmonic frequencies.',
      'Replicate the exact sequence in the same order.',
      'Advance from 3-span memory buffers up to 9-span master working capacity.'
    ],
    controls: [
      { key: 'Click / Tap Nodes', action: 'Select Node' },
      { key: 'M', action: 'Toggle Audio' }
    ],
    accentColor: '#38bdf8',
    bgGradient: 'from-sky-950/40 via-slate-950 to-slate-950',
    fps: 60,
    freqHz: 528
  },
  'matrix-logic': {
    slug: 'matrix-logic',
    title: 'Matrix Logic: Deductive Reasoning',
    subtitle: 'Cosmic Latin Square Energy Grid & Deductive P-FIT Logic',
    brand: 'FrankX Mind',
    brandColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    category: 'Cognitive Neuroscience',
    cognitiveProtocol: 'P-FIT Deductive Reasoning & Quantitative Analysis',
    targetBrainArea: 'Parieto-Frontal Integration Network (Fluid Reasoning)',
    scientificBasis: 'Matrix deduction exercises enhance parietal-frontal structural integration and non-verbal relational problem solving',
    description: 'Deductive mathematical grid puzzles where players balance cosmic matrix energy lines so that all rows and columns equate to harmonic target sums.',
    instructions: [
      'Analyze the row and column energy balance equations.',
      'Determine the missing value in the matrix cell.',
      'Tap the correct numeric charge from the bottom selector to restore stability.'
    ],
    controls: [
      { key: 'Click / Tap Number', action: 'Input Solution' }
    ],
    accentColor: '#10b981',
    bgGradient: 'from-emerald-950/40 via-slate-950 to-slate-950',
    fps: 60,
    freqHz: 639
  },
  'echo-shift': {
    slug: 'echo-shift',
    title: 'Echo Shift: Task Switcher',
    subtitle: 'Auditory-Visual Stroop Conflict & Cognitive Flexibility',
    brand: 'FrankX Mind',
    brandColor: 'text-teal-400 border-teal-500/30 bg-teal-500/10',
    category: 'Cognitive Neuroscience',
    cognitiveProtocol: 'Executive Cognitive Flexibility & Inhibitory Resolution',
    targetBrainArea: 'Anterior Cingulate Cortex & Left Inferior Frontal Junction',
    scientificBasis: 'Rapid task-set reconfiguration paradigms enhance neural switching efficiency and reduce attentional refractory latency',
    description: 'Dynamic cognitive task switching protocol that rapidly toggles between Word Meaning match and Ink Color match under tight response windows.',
    instructions: [
      'Monitor the active rule badge (Word Meaning vs Ink Color).',
      'Select the corresponding button before the energy depletion ring expires.',
      'Maintain peak accuracy through unexpected rule shifts.'
    ],
    controls: [
      { key: 'Click / Tap Button', action: 'Select Matching Attribute' }
    ],
    accentColor: '#14b8a6',
    bgGradient: 'from-teal-950/40 via-slate-950 to-slate-950',
    fps: 60,
    freqHz: 741
  },

  // --- 3. 🇩🇪 Deutsche Denkspiele & Gehirnjogging Suite ---
  'wort-schatz': {
    slug: 'wort-schatz',
    title: 'WortSchatz: Wort-Alchemie',
    subtitle: 'Deutsches Silben-Rätsel & Morphologische Assoziation',
    brand: 'Deutsche Denkspiele',
    brandColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    category: 'Sprachliche Intelligenz & Wortschatz',
    cognitiveProtocol: 'Semantischer Abruf & Morphologische Wortbildung',
    targetBrainArea: 'Linker Temporallappen & Broca-Areal (Sprachzentrum)',
    scientificBasis: 'Morphologische Assoziationsübungen mit Komposita stärken den aktiven Wortschatz und die semantische Verarbeitungsgeschwindigkeit',
    description: 'Kombiniere schwebende Runen-Silben zu tiefgründigen deutschen Komposita wie Gedankenblitz, Zeitgeist, Wunderkind und Fingerspitzengefühl.',
    instructions: [
      'Lies den Bedeutungshinweis im oberen Bereich.',
      'Wähle die passenden Silben aus der Bank aus, um das gesuchte Wort zu bilden.',
      'Klicke auf eine ausgewählte Silbe, um sie wieder zu entfernen.',
      'Prüfe dein Wort mit (✓) und sammle Alchemie-Punkte.'
    ],
    controls: [
      { key: 'Klick / Tap', action: 'Silbe wählen / entfernen' },
      { key: 'Enter', action: 'Wort prüfen' },
      { key: 'Backspace', action: 'Auswahl leeren' }
    ],
    accentColor: '#f59e0b',
    bgGradient: 'from-amber-950/40 via-slate-950 to-slate-950',
    fps: 60,
    freqHz: 528
  },
  'kopfrechen-blitz': {
    slug: 'kopfrechen-blitz',
    title: 'Kopfrechen-Blitz: Zahlen-Duell',
    subtitle: 'Schnellrechnen, Multiplikation & Zahlen-Gymnastik',
    brand: 'Deutsche Denkspiele',
    brandColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
    category: 'Mathematische Kognition',
    cognitiveProtocol: 'Quantitatives Arbeitsgedächtnis & Faktenabruf',
    targetBrainArea: 'Intraparietaler Sulcus & Frontales Netzwerk',
    scientificBasis: 'Rechentraining unter Zeitlimit festigt arithmetische Faktennetze und trainiert das numerische Arbeitsgedächtnis',
    description: 'Reaktionsschnelles Mathe-Training mit adaptiven Aufgabenstufen: Addition, Subtraktion, Multiplikation, Division und Quadratzahlen mit Serie-Multiplikatoren.',
    instructions: [
      'Löse die angezeigte Rechenaufgabe bevor der Zeitbalken abläuft.',
      'Tippe das Ergebnis über das Ziffernfeld ein und bestätige mit (✓).',
      'Baue Serien auf, um massive Punkte-Boni freizuschalten.'
    ],
    controls: [
      { key: '0-9 (Tastatur / Screen)', action: 'Ziffer eingeben' },
      { key: 'Enter / ✓', action: 'Ergebnis bestätigen' },
      { key: 'Backspace / ⌫', action: 'Ziffer löschen' }
    ],
    accentColor: '#06b6d4',
    bgGradient: 'from-cyan-950/40 via-slate-950 to-slate-950',
    fps: 60,
    freqHz: 432
  },
  'gedaechtnis-palast': {
    slug: 'gedaechtnis-palast',
    title: 'Gedächtnis-Palast: Loci-Methode',
    subtitle: 'Räumliche Merkfähigkeit & Antike Gedächtniskunst',
    brand: 'Deutsche Denkspiele',
    brandColor: 'text-violet-400 border-violet-500/30 bg-violet-500/10',
    category: 'Räumliches Langzeitgedächtnis',
    cognitiveProtocol: 'Topologische Loci-Assoziation & Hippocampale Indexierung',
    targetBrainArea: 'Hippocampus & Entorhinaler Kortex',
    scientificBasis: 'Die antike Loci-Methode (Gedächtnispalast) nutzt räumliche Hirnstrukturen für exponentiell höhere Erinnerungsraten',
    description: 'Platziere und erinnere mystische Artefakte in 9 isometrischen Palast-Räumen (Bibliothek, Sternwarte, Alchemielabor) nach der antiken Loci-Methode.',
    instructions: [
      'Phase 1: Präge dir ein, in welchen Räumen die Artefakte platziert werden.',
      'Klicke auf Bereit zum Abfragen.',
      'Phase 2: Klicke auf den richtigen Raum für das jeweils gesuchte Artefakt.'
    ],
    controls: [
      { key: 'Klick / Tap', action: 'Raum auswählen' },
      { key: 'Button Start', action: 'Abfragephase beginnen' }
    ],
    accentColor: '#8b5cf6',
    bgGradient: 'from-violet-950/40 via-slate-950 to-slate-950',
    fps: 60,
    freqHz: 528
  },

  // --- 4. Party & Early Childhood Suite ---
  'scharade-party': {
    slug: 'scharade-party',
    title: 'Scharade Party: Gesten & Pantomime',
    subtitle: 'Interaktives Party- & Gesellschaftsspiel (DE / EN)',
    brand: 'FrankX Party',
    brandColor: 'text-fuchsia-400 border-fuchsia-500/30 bg-fuchsia-500/10',
    category: 'Party & Social Fun',
    cognitiveProtocol: 'Nonverbale Kommunikation & Schnelle Ideenassoziation',
    targetBrainArea: 'Spiegelneuronen & Soziale Kognition',
    scientificBasis: 'Pantomimisches Darstellen und Erkennen stimuliert das Spiegelneuronensystem und trainiert spontane nonverbale Ausdrucksfähigkeit',
    description: 'Das ultimative Pantomime- und Gesten-Partyspiel für Spieleabende mit Freunden und Familie. 4 Kategorien, Team-Punktezähler (Team Blau vs Team Rot), Countdown-Timer und Buzzer-Sounds.',
    instructions: [
      'Wähle eine Kategorie (Filme, Tiere, Berufe, Sprichwörter) oder spiele mit allen Begriffen.',
      'Starte den 60-Sekunden-Timer und stelle den Begriff pantomimisch ohne Worte dar.',
      'Klicke auf Erraten (✓) für einen Punkt oder Weitergeben (⏭) wenn es zu schwer ist.'
    ],
    controls: [
      { key: 'Klick / Tap', action: 'Erraten / Passen / Timer starten' },
      { key: 'Button Sprache', action: 'Deutsch / English umschalten' }
    ],
    accentColor: '#d946ef',
    bgGradient: 'from-fuchsia-950/40 via-slate-950 to-slate-950',
    fps: 60,
    freqHz: 528
  },
  'wunder-safari': {
    slug: 'wunder-safari',
    title: 'WunderSafari: Farben, Formen & Tiere',
    subtitle: 'Frühkindliche Sinnesförderung für Kinder von 3–6 Jahren',
    brand: 'FrankX Kids',
    brandColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    category: 'Frühkindliche Entwicklung (3-6 Jahre)',
    cognitiveProtocol: 'Mustererkennung, Farbunterscheidung & Motorik',
    targetBrainArea: 'Sensorischer Kortex & Visuelle Diskrimination',
    scientificBasis: 'Frühkindliche Zuordnungsspiele mit positiver harmonischer Rückmeldung fördern die visuelle Wahrnehmung und Feinmotorik stressfrei',
    description: 'Speziell für Kinder von 3 bis 6 Jahren entwickelt. Große, bunte Tastflächen, sanfte Tierklänge (Löwe, Elefant, Frosch, Katze, Eule), Sternen-Belohnungen und 100% werbefrei und sicher.',
    instructions: [
      'Schau dir an, welches Tier oder welche Form oben gesucht wird.',
      'Tippe auf das passende Bild unten.',
      'Sammle goldene Sterne und freue dich über bunten Konfetti-Zauber!'
    ],
    controls: [
      { key: 'Große Touch-Tasten', action: 'Bild antippen' }
    ],
    accentColor: '#f59e0b',
    bgGradient: 'from-amber-950/40 via-slate-950 to-slate-950',
    fps: 60,
    freqHz: 432
  },

  // --- 5. Starlight High-Velocity Arcade Flagships ---
  'neon-drift': {
    slug: 'neon-drift',
    title: 'Neon Drift: 2088',
    subtitle: '120 FPS Synthwave Pseudo-3D Highway Racer',
    brand: 'Starlight',
    brandColor: 'text-fuchsia-400 border-fuchsia-500/30 bg-fuchsia-500/10',
    category: 'High-Velocity Arcade',
    cognitiveProtocol: 'Dynamic Visual Tracking & Micro-Motor Precision',
    targetBrainArea: 'Motor Cortex & Cerebellum (Temporal Precision)',
    scientificBasis: 'High-velocity visual tracking at 120 FPS enhances motor response timing and visual processing bandwidth',
    description: 'High-velocity pseudo-3D synthwave highway racer running at a buttery 120 FPS with procedural synth audio and dynamic CRT bloom.',
    instructions: [
      'Steer left and right to navigate highway curves and dodge traffic.',
      'Hold UP or ACCELERATE to reach speeds over 280 km/h.',
      'Pass checkpoints before the countdown timer hits zero.'
    ],
    controls: [
      { key: 'Left / Right (A / D)', action: 'Steer Vehicle' },
      { key: 'Up (W)', action: 'Accelerate / Turbo' },
      { key: 'Down (S)', action: 'Brake / Drift' }
    ],
    accentColor: '#d946ef',
    bgGradient: 'from-fuchsia-950/40 via-slate-950 to-slate-950',
    fps: 120,
    freqHz: 852
  },
  'chrono-shift': {
    slug: 'chrono-shift',
    title: 'ChronoShift: Bullet Matrix',
    subtitle: 'Cyber Roguelike Time-Dilation Shooter',
    brand: 'Starlight',
    brandColor: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
    category: 'Roguelike Action',
    cognitiveProtocol: 'Temporal Attention & Multitasking Focus',
    targetBrainArea: 'Basal Ganglia & Cerebellar Timing Circuits',
    scientificBasis: 'Time-dilation mechanics require rapid continuous switching between macro planning and micro trajectory evasion',
    description: 'Superhot-inspired cyber roguelike where time moves only when you move. Weave through dense bullet matrices and eliminate rogue AI drones.',
    instructions: [
      'Move to advance game time. Stand still to plan your trajectory.',
      'Aim and fire energy pulses to eliminate incoming hunter drones.',
      'Collect energy cores to upgrade beam spread, fire rate, and shield capacity.'
    ],
    controls: [
      { key: 'W / A / S / D', action: 'Move Operative (Advances Time)' },
      { key: 'Mouse / Touch', action: 'Aim & Fire Plasma Blaster' },
      { key: 'Space', action: 'Time-Freeze Dash' }
    ],
    accentColor: '#f43f5e',
    bgGradient: 'from-rose-950/40 via-slate-950 to-slate-950',
    fps: 60,
    freqHz: 963
  },
  'quantum-core': {
    slug: 'quantum-core',
    title: 'Quantum Core: Grid Defense',
    subtitle: 'Real-Time Energy Grid & Wave Defense',
    brand: 'Starlight',
    brandColor: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
    category: 'Real-Time Strategy',
    cognitiveProtocol: 'Resource Allocation & Threat Prioritization',
    targetBrainArea: 'Frontoparietal Attention Network',
    scientificBasis: 'Strategic multi-node defense optimizes dynamic resource management and split-second spatial triage under variable load',
    description: 'Defend the central Quantum Singularity core by routing plasma conduit arrays and deploying targeted photon defense turrets against void swarms.',
    instructions: [
      'Deploy photon turrets along energy grid nodes.',
      'Balance power distribution between shield generators and beam weapons.',
      'Defeat boss titans to acquire quantum research upgrades.'
    ],
    controls: [
      { key: 'Click / Tap Nodes', action: 'Construct / Upgrade Turrets' },
      { key: '1, 2, 3', action: 'Trigger Special EMP & Orbital Powers' }
    ],
    accentColor: '#3b82f6',
    bgGradient: 'from-blue-950/40 via-slate-950 to-slate-950',
    fps: 60,
    freqHz: 528
  },
  'aetheria': {
    slug: 'aetheria',
    title: 'Aetheria: Skyward Odyssey',
    subtitle: 'Atmospheric Vector Glider Exploration RPG',
    brand: 'Starlight',
    brandColor: 'text-sky-400 border-sky-500/30 bg-sky-500/10',
    category: 'Atmospheric Exploration',
    cognitiveProtocol: 'Spatial Navigation & Relaxed Theta State Induction',
    targetBrainArea: 'Hippocampus & Default Mode Network',
    scientificBasis: 'Open-world gliding physics combined with harmonic ambient soundscapes promotes restorative theta brainwave states and flow state immersion',
    description: 'Soar through floating cloud islands, ride thermal wind currents, and uncover ancient relics of the first Starbound civilization.',
    instructions: [
      'Tilt and glide through thermal updrafts to maintain elevation.',
      'Collect celestial wind motes to restore glider thruster power.',
      'Discover forgotten sky sanctuaries and celestial ruins.'
    ],
    controls: [
      { key: 'Up / Down (W / S)', action: 'Pitch Glider Up / Down' },
      { key: 'Left / Right (A / D)', action: 'Bank & Roll Glider' },
      { key: 'Space', action: 'Thermal Boost' }
    ],
    accentColor: '#0ea5e9',
    bgGradient: 'from-sky-950/40 via-slate-950 to-slate-950',
    fps: 60,
    freqHz: 432
  }
}

export function generateStaticParams() {
  return Object.keys(GAME_CATALOG).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const game = GAME_CATALOG[slug]

  if (!game) {
    return {
      title: 'Game Not Found | FrankX Games',
      description: 'The requested game could not be found in the arcade.',
    }
  }

  const title = `${game.title} — Play Free Online | FrankX Games`
  const description = `${game.description} Built with 120 FPS WebGL canvas and procedural WebAudio sound. No installs required.`

  return {
    title,
    description,
    keywords: [
      game.title,
      game.brand,
      game.category,
      'web games',
      'html5 games',
      'cognitive training',
      'dual n-back',
      'brain training',
      'deutsche denkspiele',
      'gehirnjogging',
      'kids games 3-6',
      'scharade partyspiel',
      'indie games',
      'frank riemer games',
      'play in browser'
    ],
    openGraph: {
      title,
      description,
      url: `https://www.frankx.ai/games/${game.slug}`,
      siteName: 'FrankX Games Studio',
      type: 'website',
      images: [
        {
          url: `/images/games/games-lab-hero.png`,
          width: 1200,
          height: 630,
          alt: game.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@frankxai',
    },
  }
}

export default async function GamePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const game = GAME_CATALOG[slug]

  if (!game) {
    notFound()
  }

  return <GamePlayerClient game={game} allGames={Object.values(GAME_CATALOG)} />
}
