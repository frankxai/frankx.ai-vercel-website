'use client'

import { useState, useRef, useEffect } from 'react'
import { ScrollReveal } from '@/components/valentines/ScrollReveal'

const goldenTracks = [
  {
    title: 'Golden Frequencies',
    subtitle: 'Neoclassical · Ambient',
    sunoId: '5281ac63-ed5a-4933-b8ae-10d2312f3c1a',
    duration: '3:07',
  },
  {
    title: 'Golden Frequencies v4',
    subtitle: 'Neoclassical · Ambient',
    sunoId: '3841ae2a-1147-4adb-8b4e-c0491d554fee',
    duration: '2:39',
  },
  {
    title: 'Golden Frequency v3',
    subtitle: 'Neoclassical · Choral',
    sunoId: '721ba24a-ce51-4bba-82f2-83179a8d1ae4',
    duration: '3:24',
  },
  {
    title: 'Golden Frequency Choir',
    subtitle: 'Neoclassical · World · Choral',
    sunoId: '69fa45d3-8d45-4f6d-9424-9361cc95fe0a',
    duration: '3:26',
  },
  {
    title: 'Golden Frequency Choir (Extended)',
    subtitle: 'Neoclassical · World · Choral',
    sunoId: 'b1c58d80-f4d6-45aa-8ffc-c531be288a5a',
    duration: '4:46',
  },
  {
    title: 'Golden Frequency Choir (Native American)',
    subtitle: 'Neoclassical · World · Choral',
    sunoId: '3a3f32dc-f5fc-4092-bd57-9dc6b2c574f9',
    duration: '3:31',
  },
  {
    title: 'Golden Frequency Choir (Mongolian Harmonies)',
    subtitle: 'Neoclassical · Electronic · Choral',
    sunoId: '1a6f3b3f-a207-4b8f-b2c4-03356c7b7e2b',
    duration: '3:33',
  },
  {
    title: 'Golden Frequency Choir (Mongolian Lead)',
    subtitle: 'Neoclassical · Electronic · Choral',
    sunoId: '8c35ffd4-193a-4955-832c-7a5be69b8604',
    duration: '3:38',
  },
]

function SunoCdnUrl(sunoId: string) {
  return `https://cdn1.suno.ai/${sunoId}.mp3`
}

export function GoldenFrequenciesPlayer() {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState('0:00')
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const togglePlay = (index: number) => {
    // If clicking the same track, toggle pause/play
    if (playingIndex === index && audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
        setPlayingIndex(null)
        setProgress(0)
        setCurrentTime('0:00')
      }
      return
    }

    // Stop any current playback
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }

    const track = goldenTracks[index]
    const audio = new Audio(SunoCdnUrl(track.sunoId))
    audioRef.current = audio

    audio.addEventListener('timeupdate', () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100)
        const mins = Math.floor(audio.currentTime / 60)
        const secs = Math.floor(audio.currentTime % 60)
        setCurrentTime(`${mins}:${secs.toString().padStart(2, '0')}`)
      }
    })

    audio.addEventListener('ended', () => {
      setPlayingIndex(null)
      setProgress(0)
      setCurrentTime('0:00')
    })

    audio.play()
    setPlayingIndex(index)
    setProgress(0)
  }

  return (
    <section className="py-24 md:py-32 px-6">
      <ScrollReveal>
        <h2 className="font-garamond text-3xl md:text-4xl text-center text-white/90 mb-4">
          Goldene Frequenzen
        </h2>
        <p className="font-lora text-center text-sky-200/50 mb-4 text-sm">
          Golden Frequencies — Original Music
        </p>
        <p className="font-lora text-center text-white/40 max-w-2xl mx-auto mb-16 text-sm leading-relaxed">
          Neoclassical und Chormusik, geschaffen für Meditation, Heilung und innere Ruhe.
          Drücke Play, um zuzuhören.
        </p>
      </ScrollReveal>

      <div className="max-w-2xl mx-auto space-y-3">
        {goldenTracks.map((track, i) => {
          const isPlaying = playingIndex === i
          return (
            <ScrollReveal key={track.sunoId} delay={i * 0.05}>
              <button
                onClick={() => togglePlay(i)}
                className={`w-full text-left glass-card-dawn p-4 md:p-5 flex items-center gap-4 group transition-all duration-300 ${
                  isPlaying ? 'border-amber-400/20 shadow-[0_0_30px_rgba(245,158,11,0.06)]' : ''
                }`}
              >
                {/* Play/Pause icon */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isPlaying
                    ? 'bg-amber-400/20 text-amber-300'
                    : 'bg-white/[0.05] text-white/40 group-hover:text-white/70 group-hover:bg-white/[0.08]'
                }`}>
                  {isPlaying ? (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <rect x="6" y="5" width="4" height="14" rx="1" />
                      <rect x="14" y="5" width="4" height="14" rx="1" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-0.5">
                      <path d="M8 5.14v14l11-7-11-7z" />
                    </svg>
                  )}
                </div>

                {/* Track info */}
                <div className="flex-1 min-w-0">
                  <p className={`font-garamond text-base truncate transition-colors ${
                    isPlaying ? 'text-amber-200/90' : 'text-white/80'
                  }`}>
                    {track.title}
                  </p>
                  <p className="text-xs text-white/30 truncate">{track.subtitle}</p>
                  {/* Progress bar when playing */}
                  {isPlaying && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-400/60 to-amber-300/40 rounded-full transition-[width] duration-200"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-white/30 tabular-nums">{currentTime}</span>
                    </div>
                  )}
                </div>

                {/* Duration */}
                <span className="text-xs text-white/25 flex-shrink-0 tabular-nums">
                  {track.duration}
                </span>
              </button>
            </ScrollReveal>
          )
        })}
      </div>

      <div className="mt-8 text-center">
        <a
          href="https://suno.com/playlist/77e7f75f-24b4-4c8f-b02c-10eff76a7052"
          target="_blank"
          rel="noopener noreferrer"
          className="font-lora text-xs text-white/25 hover:text-white/40 transition-colors"
        >
          Alle Tracks auf Suno anhören &rarr;
        </a>
      </div>
    </section>
  )
}
