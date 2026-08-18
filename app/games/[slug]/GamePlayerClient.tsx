'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Gamepad2,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  RotateCcw,
  Info,
  Brain,
  Sparkles,
  ArrowLeft,
  Smartphone,
  Monitor,
  Tablet,
  Share2,
  Check,
  ChevronRight,
  Zap,
  Activity,
  Layers
} from 'lucide-react'

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

interface Props {
  game: GameData
  allGames: GameData[]
}

type DeviceMode = 'desktop' | 'iphone' | 'pixel' | 'tablet'

export default function GamePlayerClient({ game, allGames }: Props) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isAudioMuted, setIsAudioMuted] = useState(false)
  const [activeTab, setActiveTab] = useState<'play' | 'science' | 'controls'>('play')
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop')
  const [copied, setCopied] = useState(false)
  const [iframeKey, setIframeKey] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const toggleFullscreen = () => {
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {})
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {})
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleRestart = () => {
    setIframeKey((prev) => prev + 1)
  }

  // Device frame styles
  const getDeviceStyle = () => {
    switch (deviceMode) {
      case 'iphone':
        return 'w-[393px] h-[852px] rounded-[52px] border-[10px] border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]'
      case 'pixel':
        return 'w-[412px] h-[892px] rounded-[44px] border-[8px] border-zinc-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]'
      case 'tablet':
        return 'w-[744px] h-[980px] rounded-[36px] border-[12px] border-slate-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]'
      case 'desktop':
      default:
        return 'w-full h-[760px] max-w-5xl rounded-3xl border border-white/10 shadow-2xl'
    }
  }

  return (
    <div className={`min-h-screen bg-[#07090e] text-slate-100 flex flex-col justify-between selection:bg-cyan-500/30`}>
      
      {/* Background Ambient Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] opacity-20 blur-[130px] rounded-full"
          style={{ background: game.accentColor }}
        />
        <div
          className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] opacity-15 blur-[140px] rounded-full"
          style={{ background: game.accentColor }}
        />
      </div>

      {/* Top Header Bar */}
      <header className="relative z-20 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/games"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:border-white/20 text-xs font-medium text-white/80 transition-[background-color,border-color,transform] active:scale-95 duration-150"
            >
              <ArrowLeft className="w-4 h-4 text-cyan-400" />
              <span>All Games</span>
            </Link>

            <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />

            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${game.brandColor}`}>
                  {game.brand}
                </span>
                <span className="text-[11px] text-white/40 hidden md:inline">
                  {game.category}
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                {game.title}
                {game.freqHz && (
                  <span className="text-[10px] font-mono font-normal px-1.5 py-0.5 rounded bg-white/[0.06] text-amber-300 border border-amber-500/20">
                    {game.freqHz} Hz Solfeggio
                  </span>
                )}
              </h1>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="p-2 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-white/70 hover:text-white transition-[background-color,border-color,transform] active:scale-95 duration-150"
              title="Share Game URL"
              aria-label="Share Game URL"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={handleRestart}
              className="p-2 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-white/70 hover:text-white transition-[background-color,border-color,transform] active:scale-95 duration-150"
              title="Restart Game"
              aria-label="Restart Game"
            >
              <RotateCcw className="w-4 h-4 text-cyan-400" />
            </button>
            <button
              type="button"
              onClick={toggleFullscreen}
              className="p-2 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-white/70 hover:text-white transition-[background-color,border-color,transform] active:scale-95 duration-150"
              title="Toggle Fullscreen"
              aria-label="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4 text-amber-400" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Game Stage */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        
        {/* Device Mode Switcher (Desktop view only) */}
        <div className="mb-4 flex items-center justify-center gap-2 bg-slate-900/60 p-1 rounded-2xl border border-white/10 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setDeviceMode('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors duration-150 ${
              deviceMode === 'desktop'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-white/50 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Full Canvas</span>
          </button>
          <button
            type="button"
            onClick={() => setDeviceMode('iphone')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors duration-150 ${
              deviceMode === 'iphone'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-white/50 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>iPhone 16 Pro</span>
          </button>
          <button
            type="button"
            onClick={() => setDeviceMode('pixel')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors duration-150 ${
              deviceMode === 'pixel'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-white/50 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Pixel 9 Pro</span>
          </button>
          <button
            type="button"
            onClick={() => setDeviceMode('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors duration-150 ${
              deviceMode === 'tablet'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-white/50 hover:text-white'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>iPad Mini</span>
          </button>
        </div>

        {/* Embedded Game Viewport */}
        <div
          ref={containerRef}
          className={`relative overflow-hidden bg-slate-950 flex flex-col items-center justify-center transition-[width,height,max-width,max-height,border-radius] duration-300 ${getDeviceStyle()} ${
            isFullscreen ? '!w-screen !h-screen !max-w-none !rounded-none !border-0' : ''
          }`}
        >
          <iframe
            key={iframeKey}
            src={`/games/${game.slug}/index.html`}
            title={game.title}
            className="w-full h-full border-0 block"
            allow="autoplay; fullscreen; accelerometer; gyroscope"
          />
        </div>

        {/* Cognitive Neuroscience & Controls Panel */}
        <div className="w-full max-w-5xl mt-8 grid md:grid-cols-3 gap-4">
          
          {/* Scientific Foundation Card */}
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors duration-200 backdrop-blur-md">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-semibold text-white">Cognitive Target</h3>
            </div>
            <p className="text-xs text-white/70 font-medium mb-1.5">{game.targetBrainArea}</p>
            <p className="text-[11px] text-white/40 leading-relaxed">{game.scientificBasis}</p>
          </div>

          {/* Gameplay Instructions Card */}
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors duration-200 backdrop-blur-md">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-semibold text-white">How to Play</h3>
            </div>
            <ul className="space-y-1.5">
              {game.instructions.map((inst, i) => (
                <li key={i} className="flex items-start gap-2 text-[11px] text-white/60">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{inst}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Controls Card */}
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors duration-200 backdrop-blur-md">
            <div className="flex items-center gap-2 mb-3">
              <Gamepad2 className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-semibold text-white">Controls</h3>
            </div>
            <div className="space-y-1.5">
              {game.controls.map((ctrl, i) => (
                <div key={i} className="flex items-center justify-between text-[11px]">
                  <span className="font-mono text-white/80 px-2 py-0.5 rounded bg-white/[0.04] border border-white/10">
                    {ctrl.key}
                  </span>
                  <span className="text-white/50">{ctrl.action}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cross-Game Studio Discovery Carousel */}
        <section className="w-full max-w-5xl mt-12 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-fuchsia-400" />
              <h2 className="text-base font-bold text-white">More Games in the Foundry</h2>
            </div>
            <Link
              href="/games"
              className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
            >
              <span>Explore All 10</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {allGames
              .filter((g) => g.slug !== game.slug)
              .slice(0, 4)
              .map((otherGame) => (
                <Link
                  key={otherGame.slug}
                  href={`/games/${otherGame.slug}`}
                  className="group p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/25 hover:bg-white/[0.05] transition-[background-color,border-color] duration-200 flex flex-col justify-between"
                >
                  <div>
                    <span className={`text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded border ${otherGame.brandColor} mb-2 inline-block`}>
                      {otherGame.brand}
                    </span>
                    <h4 className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {otherGame.title}
                    </h4>
                    <p className="text-[10px] text-white/40 line-clamp-2 mt-1">
                      {otherGame.subtitle}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/[0.04] text-[10px] text-white/50">
                    <span>{otherGame.fps} FPS</span>
                    <span className="text-cyan-400 group-hover:translate-x-0.5 transition-transform">Play →</span>
                  </div>
                </Link>
              ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-slate-950/60 px-6 py-4 text-center text-xs text-white/30">
        <p>
          FrankX Games Foundry & Starlight Studios • 100% Client-Side WebAudio & WebGL Acceleration • Zero Latency
        </p>
      </footer>

    </div>
  )
}
