import { HeroSection } from '@/components/hoffnung/HeroSection'
import { QuoteCarousel } from '@/components/hoffnung/QuoteCarousel'
import { WorldTreeSection } from '@/components/hoffnung/WorldTreeSection'
import { FrequencyPlayer } from '@/components/hoffnung/FrequencyPlayer'
import { MeditationGrid } from '@/components/hoffnung/MeditationGrid'
import { PersonalLetter } from '@/components/hoffnung/PersonalLetter'
import Link from 'next/link'
import './hoffnung.css'

export default function HoffnungPage() {
  return (
    <main className="bg-[#070B14] min-h-screen text-white selection:bg-sky-400/20">
      <HeroSection />

      <div className="section-divider-dawn" />

      <QuoteCarousel />

      <div className="section-divider-dawn" />

      <WorldTreeSection />

      <div className="section-divider-dawn" />

      <FrequencyPlayer />

      <div className="section-divider-dawn" />

      <MeditationGrid />

      <div className="section-divider-dawn" />

      <PersonalLetter />

      {/* Footer — link to book */}
      <footer className="py-16 text-center border-t border-white/5">
        <p className="font-lora text-sm text-white/30 mb-4">
          Entdecke das vollständige Buch
        </p>
        <Link
          href="/books/hoffnung"
          className="font-garamond text-lg text-sky-300/60 hover:text-sky-300/90 transition-colors duration-300"
        >
          Hoffnung — The Poetry of Hope
        </Link>
        <p className="font-lora text-xs text-white/20 mt-8">
          8 Kapitel. Poesie. Meditation. Heilung.
        </p>
      </footer>
    </main>
  )
}
