'use client'

import { motion } from 'framer-motion'

/**
 * AI Labs Marquee Component
 *
 * Displays a continuously scrolling marquee of AI company logos.
 * Uses actual brand logos (SVG) for professional appearance.
 */

interface AILab {
  name: string
  logo: React.ReactNode
  url: string
}

// SVG logos for major AI labs - using official brand colors
const aiLabs: AILab[] = [
  {
    name: 'OpenAI',
    url: 'https://openai.com',
    logo: (
      <svg viewBox="0 0 24 24" className="h-8 w-auto" fill="currentColor">
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.896zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
      </svg>
    ),
  },
  {
    name: 'Anthropic',
    url: 'https://anthropic.com',
    logo: (
      <svg viewBox="0 0 100 100" className="h-8 w-auto" fill="currentColor">
        <path d="M57.4 22H42.6L10 78h15.8l6.4-11.2h35.6L74.2 78H90L57.4 22zm-7.1 33.6l10.3-18.2 10.3 18.2H50.3z" />
      </svg>
    ),
  },
  {
    name: 'Google',
    url: 'https://ai.google',
    logo: (
      <svg viewBox="0 0 24 24" className="h-8 w-auto">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
    ),
  },
  {
    name: 'Meta AI',
    url: 'https://ai.meta.com',
    logo: (
      <svg viewBox="0 0 24 24" className="h-8 w-auto" fill="currentColor">
        <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" />
      </svg>
    ),
  },
  {
    name: 'Microsoft',
    url: 'https://microsoft.com/ai',
    logo: (
      <svg viewBox="0 0 24 24" className="h-8 w-auto">
        <path fill="#F25022" d="M1 1h10v10H1z" />
        <path fill="#00A4EF" d="M1 13h10v10H1z" />
        <path fill="#7FBA00" d="M13 1h10v10H13z" />
        <path fill="#FFB900" d="M13 13h10v10H13z" />
      </svg>
    ),
  },
  {
    name: 'Suno',
    url: 'https://suno.ai',
    logo: (
      <svg viewBox="0 0 100 100" className="h-8 w-auto" fill="currentColor">
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6" />
        <circle cx="50" cy="50" r="20" />
        <path d="M50 5 L50 25 M50 75 L50 95 M5 50 L25 50 M75 50 L95 50" stroke="currentColor" strokeWidth="4" />
      </svg>
    ),
  },
  {
    name: 'Midjourney',
    url: 'https://midjourney.com',
    logo: (
      <svg viewBox="0 0 100 100" className="h-8 w-auto" fill="currentColor">
        <path d="M50 10 L85 30 L85 70 L50 90 L15 70 L15 30 Z" fill="none" stroke="currentColor" strokeWidth="5" />
        <circle cx="50" cy="50" r="15" />
      </svg>
    ),
  },
  {
    name: 'Stability AI',
    url: 'https://stability.ai',
    logo: (
      <svg viewBox="0 0 24 24" className="h-8 w-auto" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Perplexity',
    url: 'https://perplexity.ai',
    logo: (
      <svg viewBox="0 0 24 24" className="h-8 w-auto" fill="currentColor">
        <path d="M12 2v20M2 12h20M7 7l10 10M17 7L7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Hugging Face',
    url: 'https://huggingface.co',
    logo: (
      <svg viewBox="0 0 100 100" className="h-8 w-auto" fill="currentColor">
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="5" />
        <circle cx="35" cy="40" r="8" />
        <circle cx="65" cy="40" r="8" />
        <path d="M30 65 Q50 80 70 65" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Runway',
    url: 'https://runwayml.com',
    logo: (
      <svg viewBox="0 0 24 24" className="h-8 w-auto" fill="currentColor">
        <rect x="3" y="3" width="18" height="18" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'ElevenLabs',
    url: 'https://elevenlabs.io',
    logo: (
      <svg viewBox="0 0 24 24" className="h-8 w-auto" fill="currentColor">
        <rect x="5" y="4" width="3" height="16" rx="1" />
        <rect x="10.5" y="8" width="3" height="8" rx="1" />
        <rect x="16" y="6" width="3" height="12" rx="1" />
      </svg>
    ),
  },
]

interface AILabsMarqueeProps {
  className?: string
  speed?: number
  pauseOnHover?: boolean
  title?: string
}

export function AILabsMarquee({
  className = '',
  speed = 30,
  pauseOnHover = true,
  title = 'Powered by Leading AI',
}: AILabsMarqueeProps) {
  // Duplicate labs for seamless loop
  const duplicatedLabs = [...aiLabs, ...aiLabs]

  return (
    <div className={`w-full overflow-hidden py-8 ${className}`}>
      {title && (
        <p className="mb-6 text-center text-sm font-medium uppercase tracking-widest text-white/50">
          {title}
        </p>
      )}
      <div
        className={`relative flex ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
      >
        <motion.div
          className="flex items-center gap-12"
          animate={{
            x: [0, -50 * aiLabs.length],
          }}
          transition={{
            x: {
              duration: speed,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
        >
          {duplicatedLabs.map((lab, index) => (
            <a
              key={`${lab.name}-${index}`}
              href={lab.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-shrink-0 items-center gap-3 text-white/40 transition-all duration-300 hover:text-white"
              title={lab.name}
            >
              <span className="transition-transform duration-300 group-hover:scale-110">
                {lab.logo}
              </span>
              <span className="text-sm font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:opacity-100">
                {lab.name}
              </span>
            </a>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default AILabsMarquee
