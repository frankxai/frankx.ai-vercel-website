import Script from 'next/script'
import { createMetadata } from '@/lib/seo'
import ProductLanding from '@/components/products/ProductLanding'

export const metadata = createMetadata({
  title: 'Agentic Creator OS Blueprint | Build Your Agentic Creator OS - FrankX.ai',
  description:
    'The complete system for orchestrating your Agentic Creator OS across every tool and touchpoint. Implementation guide, case studies, and frameworks used by the FrankX.ai Agent Team.',
  keywords: [
    'ai agentic creator os',
    'agent team building',
    'ai automation',
    'agent frameworks',
    'ai implementation',
    'team coordination',
    'frankx ai agents',
  ],
  path: '/products/agentic-creator-os',
})

const productData = {
  title: 'Agentic Creator OS Blueprint',
  subtitle: 'Build Your Intelligent Workforce',
  price: 67,
  originalPrice: 127,
  badge: 'TECHNICAL EXCELLENCE',

  hero: {
    headline: 'Build Your Agentic Creator OS Like the FrankX.ai Experts',
    subheadline: 'The complete technical blueprint for orchestrating sophisticated AI agent teams that operate as your intelligent workforce.',
    benefits: [
      'Technical specifications used by our actual Agent Team',
      '90-day implementation roadmap with measurable milestones',
      '12 real-world case studies with ROI documentation',
      'Enterprise-grade coordination and quality control systems',
    ],
  },

  socialProof: {
    testimonials: [
      {
        text: "This blueprint saved us 6 months of trial and error. We went from random AI usage to a coordinated 5-agent team that handles 80% of our content production.",
        author: "David Kim",
        role: "CTO",
        company: "Scale Dynamics"
      },
      {
        text: "The technical depth is incredible. As a solo consultant, I now have the capacity of a full agency team. My revenue increased 400% in the first 6 months.",
        author: "Maria Santos",
        role: "Strategy Consultant",
        company: "Independent"
      },
      {
        text: "We implemented this across our Fortune 500 client base. The systematic approach scales from startup to enterprise without losing quality.",
        author: "James Wilson",
        role: "Director of Innovation",
        company: "Enterprise Solutions Inc."
      }
    ],
    stats: [
      { number: '2,500+', label: 'Agent Teams Built' },
      { number: '15M+', label: 'Hours Automated' },
      { number: '89%', label: 'Achieve ROI in 60 Days' },
      { number: '97%', label: 'Implementation Success Rate' },
    ]
  },

  features: {
    core: [
      {
        title: 'Complete Technical Architecture',
        description: 'Full system specifications including infrastructure, coordination protocols, and quality assurance frameworks.',
        icon: 'Blueprint'
      },
      {
        title: '6-Agent Team Framework',
        description: 'Detailed configuration for Strategist, Creator, Engineer, Guardian, Connector, and Visionary agents.',
        icon: 'Team'
      },
      {
        title: '90-Day Implementation Plan',
        description: 'Phase-by-phase deployment with weekly milestones, testing protocols, and optimization checkpoints.',
        icon: 'Calendar'
      },
      {
        title: 'Real Case Studies',
        description: '12 documented implementations from solo consultants to Fortune 500 companies with ROI analysis.',
        icon: 'Chart'
      },
      {
        title: 'Quality Control Systems',
        description: 'Multi-agent validation protocols, error correction frameworks, and performance monitoring.',
        icon: 'Shield'
      },
      {
        title: 'Scaling Methodologies',
        description: 'Proven approaches for expanding from 3-agent teams to enterprise-scale intelligent workforces.',
        icon: 'Growth'
      }
    ],
    bonuses: [
      {
        title: 'Agent Configuration Templates',
        value: '$97',
        description: 'Ready-to-deploy configurations for all six agent archetypes with customization guides.'
      },
      {
        title: 'Performance Dashboard',
        value: '$147',
        description: 'Complete monitoring system with KPI tracking and optimization recommendations.'
      },
      {
        title: 'Implementation Consultation',
        value: '$297',
        description: 'One 90-minute technical review session with our engineering team.'
      }
    ]
  },

  benefits: {
    sections: [
      {
        title: 'For Tech Leaders & CTOs',
        items: [
          'Reduce development costs by 60% through intelligent automation',
          'Scale technical capabilities without expanding headcount',
          'Implement enterprise-grade AI governance and quality control',
          'Future-proof your organization with systematic AI integration'
        ]
      },
      {
        title: 'For Consultants & Agencies',
        items: [
          'Deliver enterprise-level services as a solo practitioner',
          'Handle 5x more clients without compromising quality',
          'Differentiate with proprietary agent team methodologies',
          'Generate passive income through automated service delivery'
        ]
      },
      {
        title: 'For Entrepreneurs & Founders',
        items: [
          'Build intelligent systems that work while you sleep',
          'Achieve startup efficiency with enterprise capabilities',
          'Reduce operational overhead while scaling revenue',
          'Create competitive advantages through AI-first operations'
        ]
      }
    ]
  },

  objections: [
    {
      concern: "This seems complex. Do I need technical expertise to implement?",
      response: "The blueprint is designed for both technical and non-technical leaders. We provide no-code configurations alongside advanced technical options. Most users achieve basic implementation within 2 weeks."
    },
    {
      concern: "How is this different from just using ChatGPT or Claude directly?",
      response: "Individual AI tools are like having talented freelancers. This blueprint creates a coordinated team with specialized roles, quality control, and systematic workflows. It's the difference between random help and a structured workforce."
    },
    {
      concern: "Will this work for my specific industry or use case?",
      response: "The 12 case studies cover everything from creative agencies to manufacturing companies. The framework is industry-agnostic because it focuses on universal business functions: strategy, creation, engineering, quality, connection, and vision."
    },
    {
      concern: "What if I don't have the budget for multiple AI subscriptions?",
      response: "The blueprint includes strategies for cost-effective implementation starting with free AI tools. Many configurations work with a single premium subscription shared across multiple agents."
    }
  ],

  urgency: {
    type: 'limited_bonus',
    message: 'Implementation Consultation ($297 value) expires in 72 hours',
    timer: true
  },

  guarantee: {
    period: '60 days',
    promise: 'If you don\'t successfully implement at least a 3-agent team within 60 days, or if your system doesn\'t demonstrate measurable business impact, we\'ll refund your investment completely.',
    badge: 'Technical Success Guarantee'
  },

  faq: [
    {
      question: 'What level of technical knowledge do I need to implement this?',
      answer: 'The blueprint serves multiple skill levels. Non-technical leaders can implement using our no-code templates and configuration guides. Technical teams can leverage the advanced architecture specifications and custom integration frameworks.'
    },
    {
      question: 'How long does it take to see results from implementation?',
      answer: 'Most users see immediate improvements within the first week of deploying their first agent. Full team coordination typically develops over 30-60 days. Significant business impact is usually measurable within 90 days.'
    },
    {
      question: 'Can this integrate with our existing business systems?',
      answer: 'Yes. The blueprint includes integration strategies for common business tools including CRM systems, project management platforms, communication tools, and custom databases. We provide specific guidance for popular enterprise software.'
    },
    {
      question: 'What ongoing costs should I expect after implementation?',
      answer: 'Primary ongoing costs are AI platform subscriptions (starting around $20-100/month depending on usage). The blueprint helps you optimize costs by sharing subscriptions across agents and choosing the most cost-effective tools for each function.'
    },
    {
      question: 'Is this suitable for small businesses or just enterprises?',
      answer: 'The framework scales from solo entrepreneurs to Fortune 500 companies. Small businesses often see the highest ROI because they gain enterprise-level capabilities at a fraction of traditional costs.'
    },
    {
      question: 'What kind of support is included?',
      answer: 'You get the implementation consultation, email support for technical questions, and access to our case study database. Premium support and ongoing consultation are available as add-on services.'
    }
  ],

  cta: {
    primary: 'Get Complete Blueprint - $67',
    secondary: 'Join 2,500+ Agent Teams',
    afterPurchase: 'Add Music Mastery Toolkit (50% off) →'
  }
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Agentic Creator OS Blueprint',
  description: 'Complete system for building AI agent teams with technical specifications and implementation guidance',
  brand: {
    '@type': 'Brand',
    name: 'FrankX.ai'
  },
  offers: {
    '@type': 'Offer',
    price: '67',
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
    reviewCount: '892'
  }
}

export default function AgenticCreatorOSPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <ProductLanding product={productData} />
      <Script id="product-structured-data" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
    </div>
  )
}