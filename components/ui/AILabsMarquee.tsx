'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

/**
 * AI Labs Marquee Component
 *
 * Displays a continuously scrolling marquee of AI company logos.
 * Uses actual brand logo images for professional appearance.
 */

interface AILab {
  name: string
  logo: string // Path to logo image
  url: string
}

// AI Labs with logo image paths
const aiLabs: AILab[] = [
  {
    name: 'OpenAI',
    logo: '/images/logos/openai.svg',
    url: 'https://openai.com',
  },
  {
    name: 'Anthropic',
    logo: '/images/logos/anthropic.svg',
    url: 'https://anthropic.com',
  },
  {
    name: 'xAI',
    logo: '/images/logos/xai.svg',
    url: 'https://x.ai',
  },
  {
    name: 'Google AI',
    logo: '/images/logos/google.svg',
    url: 'https://ai.google',
  },
  {
    name: 'Meta AI',
    logo: '/images/logos/meta.svg',
    url: 'https://ai.meta.com',
  },
  {
    name: 'Llama',
    logo: '/images/logos/llama.svg',
    url: 'https://llama.meta.com',
  },
  {
    name: 'Suno',
    logo: '/images/logos/suno.svg',
    url: 'https://suno.ai',
  },
  {
    name: 'Midjourney',
    logo: '/images/logos/midjourney.svg',
    url: 'https://midjourney.com',
  },
  {
    name: 'Perplexity',
    logo: '/images/logos/perplexity.svg',
    url: 'https://perplexity.ai',
  },
  {
    name: 'Hugging Face',
    logo: '/images/logos/huggingface.svg',
    url: 'https://huggingface.co',
  },
  {
    name: 'ElevenLabs',
    logo: '/images/logos/elevenlabs.svg',
    url: 'https://elevenlabs.io',
  },
  {
    name: 'Stability AI',
    logo: '/images/logos/stability.svg',
    url: 'https://stability.ai',
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
  speed = 35,
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
        className={`relative ${pauseOnHover ? 'group' : ''}`}
        style={{
          maskImage: 'linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)',
        }}
      >
        <motion.div
          className={`flex items-center gap-16 ${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''}`}
          animate={{
            x: [0, -80 * aiLabs.length],
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
              className="flex flex-shrink-0 items-center gap-3 text-white/60 transition-all duration-300 hover:text-white"
              title={lab.name}
            >
              <Image
                src={lab.logo}
                alt={`${lab.name} logo`}
                width={28}
                height={28}
                className="h-7 w-auto object-contain brightness-0 invert opacity-60 transition-opacity hover:opacity-100"
              />
              <span className="text-sm font-medium whitespace-nowrap">
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
