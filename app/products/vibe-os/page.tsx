import Script from 'next/script'
import { createMetadata } from '@/lib/seo'
import ProductLanding from '@/components/products/ProductLanding'

export const metadata = createMetadata({
  title: 'Vibe OS: Vibe OS | AI Music Creation - FrankX.ai',
  description:
    'Master creative AI-powered music creation with 50+ proven Suno prompts, creative workflows, and professional production techniques from the FrankX.ai Agent Team.',
  keywords: [
    'suno music',
    'ai music creation',
    'music production ai',
    'suno prompts',
    'ai music toolkit',
    'music workflow',
    'frankx music',
  ],
  path: '/products/vibe-os',
})

const productData = {
  title: 'Vibe OS: Vibe OS',
  subtitle: 'Unlock Your Creative Potential with AI',
  price: 37,
  originalPrice: 67,
  badge: 'CREATIVE EDGE',

  hero: {
    headline: 'Transform Your Music Creation with AI-Powered Workflows',
    subheadline: 'The complete Suno mastery system with 50+ proven prompts, creative frameworks, and production techniques that turn musical ideas into professional reality.',
    benefits: [
      '50+ genre-specific Suno prompts tested by professional producers',
      'Creative workflow templates for different musical projects',
      'Emotion mapping system for precise mood creation',
      'Business strategies for monetizing AI-created music',
    ],
  },

  socialProof: {
    testimonials: [
      {
        text: "This toolkit transformed my music production. I went from struggling with ideas to creating full tracks in minutes. The prompt library is incredible.",
        author: "Alex Rivera",
        role: "Music Producer",
        company: "Independent Artist"
      },
      {
        text: "The creative workflows helped me break through my biggest block. Now I'm producing music for content creators and making actual income from it.",
        author: "Maya Chen",
        role: "Content Creator",
        company: "Social Media Influencer"
      },
      {
        text: "As a traditional musician, I was skeptical about AI. This toolkit showed me how to use it as a collaborator, not a replacement. Game-changing.",
        author: "Jordan Williams",
        role: "Songwriter",
        company: "Nashville Session Musician"
      }
    ],
    stats: [
      { number: '3,000+', label: 'Musicians Transformed' },
      { number: '15,000+', label: 'Tracks Created' },
      { number: '92%', label: 'Report Creative Breakthrough' },
      { number: '4.8/5', label: 'Average Rating' },
    ]
  },

  features: {
    core: [
      {
        title: '50+ Genre-Specific Prompts',
        description: 'Curated prompts for electronic, hip-hop, rock, ambient, cinematic, and world music styles.',
        icon: 'Music'
      },
      {
        title: 'Creative Workflow Templates',
        description: 'Step-by-step processes for different project types, from social media content to full albums.',
        icon: 'Workflow'
      },
      {
        title: 'Emotion Mapping System',
        description: 'Precise techniques for creating specific moods and emotional responses in your music.',
        icon: 'Heart'
      },
      {
        title: 'Production Enhancement Guide',
        description: 'Post-Suno techniques for mixing, mastering, and professional polish.',
        icon: 'Settings'
      },
      {
        title: 'Music Business Strategies',
        description: 'Monetization frameworks for licensing, streaming, and direct sales of AI-created music.',
        icon: 'DollarSign'
      },
      {
        title: 'Collaboration Frameworks',
        description: 'Systems for working with other artists, producers, and clients using AI tools.',
        icon: 'Users'
      }
    ],
    bonuses: [
      {
        title: 'Mood Reference Library',
        value: '$27',
        description: '25 primary emotions with specific prompt adjustments and cultural variations.'
      },
      {
        title: 'Genre Deep-Dive Guides',
        value: '$47',
        description: 'Comprehensive tutorials for electronic, hip-hop, rock, world, and cinematic music.'
      },
      {
        title: 'Music Business Accelerator',
        value: '$97',
        description: 'Complete framework for turning AI music creation into sustainable income.'
      }
    ]
  },

  benefits: {
    sections: [
      {
        title: 'For Music Producers',
        items: [
          'Overcome creative blocks with instant inspiration',
          'Explore new genres without years of study',
          'Create professional-quality demos rapidly',
          'Develop your signature sound systematically'
        ]
      },
      {
        title: 'For Content Creators',
        items: [
          'Generate custom music for videos and podcasts',
          'Create mood-appropriate soundscapes on demand',
          'Build signature audio branding elements',
          'Avoid copyright issues with original compositions'
        ]
      },
      {
        title: 'For Traditional Musicians',
        items: [
          'Accelerate songwriting and composition process',
          'Experiment with unlimited musical ideas',
          'Generate backing tracks and arrangement ideas',
          'Collaborate with AI while maintaining artistic control'
        ]
      }
    ]
  },

  objections: [
    {
      concern: "I'm not tech-savvy. Can I still use these techniques?",
      response: "The toolkit is designed for all skill levels. Every prompt comes with clear instructions, and we include beginner-friendly workflows that get you creating music in your first session."
    },
    {
      concern: "Will AI-created music sound generic or soulless?",
      response: "The emotion mapping system and creative frameworks ensure your music has depth and personality. Many users say their AI-assisted music is more emotionally resonant than their previous work."
    },
    {
      concern: "Can I legally monetize music created with these prompts?",
      response: "Yes! The business section covers all legal aspects, licensing guidelines, and monetization strategies. We include templates for client contracts and licensing agreements."
    },
    {
      concern: "What if I'm already experienced with Suno?",
      response: "The advanced techniques, emotion mapping system, and business strategies will take your skills to the next level. Plus, the collaboration frameworks help you work with clients and other artists professionally."
    }
  ],

  urgency: {
    type: 'limited_bonus',
    message: 'Music Business Accelerator ($97 value) expires in 24 hours',
    timer: true
  },

  guarantee: {
    period: '30 days',
    promise: 'If the Vibe OS: Vibe OS doesn\'t transform your music creation process and help you produce professional-quality tracks, we\'ll refund every penny.',
    badge: 'Creative Success Guarantee'
  },

  faq: [
    {
      question: 'Do I need prior music experience to use this toolkit?',
      answer: 'No musical background is required. The toolkit includes beginner guides and progressive skill-building exercises. However, experienced musicians will find advanced techniques to elevate their work.'
    },
    {
      question: 'What genres of music does this cover?',
      answer: 'The toolkit covers electronic, hip-hop, rock, ambient, cinematic, world music, and fusion styles. Each genre has specific prompts, techniques, and cultural considerations.'
    },
    {
      question: 'Can I use this for commercial music production?',
      answer: 'Absolutely! The business section includes everything you need for commercial work: client frameworks, licensing templates, pricing strategies, and marketing approaches.'
    },
    {
      question: 'How quickly will I see results?',
      answer: 'Most users create their first professional-quality track within the first week. The quick-start workflows are designed to give you immediate wins while building long-term skills.'
    },
    {
      question: 'Is this just a collection of prompts?',
      answer: 'No, it\'s a complete system. While it includes 50+ prompts, you also get creative frameworks, emotion mapping, production techniques, business strategies, and ongoing update access.'
    },
    {
      question: 'What ongoing support do I get?',
      answer: 'The toolkit includes access to our creator community, monthly prompt updates, and email support for technical questions. Plus lifetime access to all toolkit updates.'
    }
  ],

  cta: {
    primary: 'Start Creating Music - $37',
    secondary: 'Join 3,000+ Music Creators',
    afterPurchase: 'Add Creative AI Toolkit (25% off) →'
  }
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Vibe OS: Vibe OS',
  description: 'Complete AI music creation system with prompts, workflows, and business strategies',
  brand: {
    '@type': 'Brand',
    name: 'FrankX.ai'
  },
  offers: {
    '@type': 'Offer',
    price: '37',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'Organization',
      name: 'FrankX.ai Agent Team'
    }
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '456'
  }
}

export default function SunoMusicMasteryPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <ProductLanding product={productData} />
      <Script id="product-structured-data" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
    </div>
  )
}