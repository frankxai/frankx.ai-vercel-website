import Image from 'next/image'
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

      {/* Cinematic section image — leaf dewdrop macro */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <Image
          src="/images/hoffnung/hoffnung-leaf-dewdrop.png"
          alt="A golden leaf on emerald moss with a dewdrop reflecting the dawn sky"
          fill
          className="object-cover object-center"
          quality={85}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070B14] via-transparent to-[#070B14]" />
      </div>

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
