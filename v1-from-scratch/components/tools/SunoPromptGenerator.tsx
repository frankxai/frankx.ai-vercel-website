'use client'

import { useState } from 'react'

type Genre = {
  name: string
  subgenres: string[]
}

type Mood = {
  name: string
  descriptors: string[]
}

const GENRES: Genre[] = [
  { name: 'Electronic', subgenres: ['Synthwave', 'House', 'Techno', 'Ambient', 'Drum & Bass', 'Dubstep'] },
  { name: 'Rock', subgenres: ['Indie Rock', 'Alternative', 'Post-Rock', 'Shoegaze', 'Garage Rock'] },
  { name: 'Pop', subgenres: ['Indie Pop', 'Dream Pop', 'Synth-pop', 'Electropop', 'Art Pop'] },
  { name: 'Hip Hop', subgenres: ['Boom Bap', 'Trap', 'Lo-fi Hip Hop', 'Jazz Rap', 'Experimental'] },
  { name: 'Jazz', subgenres: ['Smooth Jazz', 'Fusion', 'Modal Jazz', 'Free Jazz', 'Bossa Nova'] },
  { name: 'Classical', subgenres: ['Baroque', 'Romantic', 'Contemporary', 'Minimalist', 'Cinematic'] },
  { name: 'Folk', subgenres: ['Indie Folk', 'Chamber Folk', 'Folk Rock', 'Americana', 'Singer-Songwriter'] },
]

const MOODS: Mood[] = [
  { name: 'Energetic', descriptors: ['upbeat', 'driving', 'powerful', 'intense', 'explosive'] },
  { name: 'Melancholic', descriptors: ['sad', 'nostalgic', 'wistful', 'bittersweet', 'emotional'] },
  { name: 'Dreamy', descriptors: ['ethereal', 'floating', 'atmospheric', 'hypnotic', 'surreal'] },
  { name: 'Dark', descriptors: ['moody', 'brooding', 'mysterious', 'ominous', 'haunting'] },
  { name: 'Uplifting', descriptors: ['hopeful', 'inspiring', 'triumphant', 'euphoric', 'joyful'] },
  { name: 'Chill', descriptors: ['relaxed', 'mellow', 'smooth', 'laid-back', 'contemplative'] },
]

const INSTRUMENTS = [
  'acoustic guitar', 'electric guitar', 'piano', 'synthesizer', 'drums',
  'bass', 'violin', 'saxophone', 'trumpet', 'strings', 'pads',
  '808s', 'analog synth', 'rhodes', 'mellotron', 'vocoder'
]

const VOCAL_STYLES = [
  'male vocals', 'female vocals', 'androgynous vocals', 'choir',
  'falsetto', 'raspy', 'smooth', 'emotional', 'robotic', 'whispered',
  'powerful', 'delicate', 'harmonies', 'rap', 'spoken word'
]

const PRODUCTION_STYLES = [
  'lo-fi production', 'crisp production', 'reverb-heavy', 'compressed',
  'ambient layers', 'analog warmth', 'digital clarity', 'tape saturation',
  'heavy bass', 'sparse arrangement', 'dense layering', 'minimalist'
]

export function SunoPromptGenerator() {
  const [selectedGenre, setSelectedGenre] = useState<string>('')
  const [selectedSubgenre, setSelectedSubgenre] = useState<string>('')
  const [selectedMood, setSelectedMood] = useState<string>('')
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([])
  const [selectedVocalStyle, setSelectedVocalStyle] = useState<string>('')
  const [selectedProduction, setSelectedProduction] = useState<string>('')
  const [customElements, setCustomElements] = useState<string>('')

  const currentGenre = GENRES.find(g => g.name === selectedGenre)
  const currentMood = MOODS.find(m => m.name === selectedMood)

  const toggleInstrument = (instrument: string) => {
    setSelectedInstruments(prev =>
      prev.includes(instrument)
        ? prev.filter(i => i !== instrument)
        : [...prev, instrument]
    )
  }

  const generatePrompt = (): string => {
    const parts: string[] = []

    // Genre and subgenre
    if (selectedSubgenre) {
      parts.push(selectedSubgenre)
    } else if (selectedGenre) {
      parts.push(selectedGenre)
    }

    // Mood
    if (currentMood && currentMood.descriptors.length > 0) {
      parts.push(currentMood.descriptors[0])
    }

    // Instruments
    if (selectedInstruments.length > 0) {
      const instList = selectedInstruments.slice(0, 3).join(', ')
      parts.push(`featuring ${instList}`)
    }

    // Vocals
    if (selectedVocalStyle) {
      parts.push(`with ${selectedVocalStyle}`)
    }

    // Production
    if (selectedProduction) {
      parts.push(selectedProduction)
    }

    // Custom elements
    if (customElements.trim()) {
      parts.push(customElements.trim())
    }

    return parts.join(', ') || 'Select options to generate a prompt...'
  }

  const generatedPrompt = generatePrompt()

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt)
  }

  const randomize = () => {
    const randomGenre = GENRES[Math.floor(Math.random() * GENRES.length)]
    const randomSubgenre = randomGenre.subgenres[Math.floor(Math.random() * randomGenre.subgenres.length)]
    const randomMood = MOODS[Math.floor(Math.random() * MOODS.length)]
    const randomInstruments = INSTRUMENTS.sort(() => 0.5 - Math.random()).slice(0, 3)
    const randomVocal = VOCAL_STYLES[Math.floor(Math.random() * VOCAL_STYLES.length)]
    const randomProduction = PRODUCTION_STYLES[Math.floor(Math.random() * PRODUCTION_STYLES.length)]

    setSelectedGenre(randomGenre.name)
    setSelectedSubgenre(randomSubgenre)
    setSelectedMood(randomMood.name)
    setSelectedInstruments(randomInstruments)
    setSelectedVocalStyle(randomVocal)
    setSelectedProduction(randomProduction)
  }

  const reset = () => {
    setSelectedGenre('')
    setSelectedSubgenre('')
    setSelectedMood('')
    setSelectedInstruments([])
    setSelectedVocalStyle('')
    setSelectedProduction('')
    setCustomElements('')
  }

  return (
    <div className="space-y-8">
      {/* Generated Prompt Display */}
      <div className="rounded-lg border-2 border-cyan-500/30 bg-slate-900 p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wide">
            Generated Prompt
          </h3>
          <div className="flex gap-2">
            <button
              onClick={randomize}
              className="px-3 py-1 text-xs font-medium rounded bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-cyan-400 transition-colors"
            >
              🎲 Randomize
            </button>
            <button
              onClick={reset}
              className="px-3 py-1 text-xs font-medium rounded bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-red-400 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
        <p className="text-lg text-white font-mono leading-relaxed mb-4 min-h-[60px]">
          {generatedPrompt}
        </p>
        <button
          onClick={copyToClipboard}
          className="w-full py-2 px-4 rounded bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-medium transition-colors"
        >
          📋 Copy to Clipboard
        </button>
      </div>

      {/* Genre Selection */}
      <div>
        <label className="block text-sm font-bold mb-3 text-slate-300">
          Genre
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {GENRES.map((genre) => (
            <button
              key={genre.name}
              onClick={() => {
                setSelectedGenre(genre.name)
                setSelectedSubgenre('')
              }}
              className={`py-2 px-3 rounded text-sm font-medium transition-all ${
                selectedGenre === genre.name
                  ? 'bg-cyan-500 text-slate-950'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-cyan-400'
              }`}
            >
              {genre.name}
            </button>
          ))}
        </div>

        {/* Subgenre Selection */}
        {currentGenre && (
          <div className="mt-3">
            <label className="block text-xs font-medium mb-2 text-slate-400">
              Subgenre (optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {currentGenre.subgenres.map((subgenre) => (
                <button
                  key={subgenre}
                  onClick={() => setSelectedSubgenre(subgenre)}
                  className={`py-1 px-3 rounded text-xs font-medium transition-all ${
                    selectedSubgenre === subgenre
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {subgenre}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mood Selection */}
      <div>
        <label className="block text-sm font-bold mb-3 text-slate-300">
          Mood
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {MOODS.map((mood) => (
            <button
              key={mood.name}
              onClick={() => setSelectedMood(mood.name)}
              className={`py-2 px-3 rounded text-sm font-medium transition-all ${
                selectedMood === mood.name
                  ? 'bg-cyan-500 text-slate-950'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-cyan-400'
              }`}
            >
              {mood.name}
            </button>
          ))}
        </div>
      </div>

      {/* Instruments */}
      <div>
        <label className="block text-sm font-bold mb-3 text-slate-300">
          Instruments (select 2-3)
        </label>
        <div className="flex flex-wrap gap-2">
          {INSTRUMENTS.map((instrument) => (
            <button
              key={instrument}
              onClick={() => toggleInstrument(instrument)}
              className={`py-1 px-3 rounded text-xs font-medium transition-all ${
                selectedInstruments.includes(instrument)
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {instrument}
            </button>
          ))}
        </div>
      </div>

      {/* Vocal Style */}
      <div>
        <label className="block text-sm font-bold mb-3 text-slate-300">
          Vocal Style
        </label>
        <div className="flex flex-wrap gap-2">
          {VOCAL_STYLES.map((style) => (
            <button
              key={style}
              onClick={() => setSelectedVocalStyle(style)}
              className={`py-1 px-3 rounded text-xs font-medium transition-all ${
                selectedVocalStyle === style
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      {/* Production Style */}
      <div>
        <label className="block text-sm font-bold mb-3 text-slate-300">
          Production Style
        </label>
        <div className="flex flex-wrap gap-2">
          {PRODUCTION_STYLES.map((style) => (
            <button
              key={style}
              onClick={() => setSelectedProduction(style)}
              className={`py-1 px-3 rounded text-xs font-medium transition-all ${
                selectedProduction === style
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Elements */}
      <div>
        <label className="block text-sm font-bold mb-3 text-slate-300">
          Custom Elements (optional)
        </label>
        <textarea
          value={customElements}
          onChange={(e) => setCustomElements(e.target.value)}
          placeholder="Add any additional details or specific references..."
          className="w-full px-4 py-3 rounded bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors"
          rows={3}
        />
      </div>
    </div>
  )
}
