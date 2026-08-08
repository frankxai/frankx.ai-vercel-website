import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Generative AI Model Hub 2026 — Image, Video, Audio, Voice & More',
  description:
    'Every frontier generative AI model in one decision layer: image (Imagen 4, Flux 2, Midjourney), video (Veo 3.1, Kling, Runway, Sora), music (Suno, Udio, ElevenLabs), voice, embeddings, and world models. Picks, verdicts, and sources — for humans and agents.',
  keywords: [
    'best generative ai models 2026',
    'ai model comparison',
    'best ai image generator 2026',
    'best ai video generator 2026',
    'best ai music generator 2026',
    'best ai voice model 2026',
    'multimodal ai models',
    'generative ai hub',
  ],
  alternates: { canonical: 'https://frankx.ai/models' },
  openGraph: {
    title: 'Generative AI Model Hub 2026 — every modality, one decision layer',
    description:
      'Image, video, music, voice, embeddings, and world models — categorized, with verdicts and sources. Built for humans and agents.',
    url: 'https://frankx.ai/models',
    type: 'website',
  },
}

export default function ModelsLayout({ children }: { children: React.ReactNode }) {
  return children
}
