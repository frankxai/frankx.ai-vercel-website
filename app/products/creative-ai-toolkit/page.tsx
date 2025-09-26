import Script from 'next/script'
import { createMetadata } from '@/lib/seo'
import ProductLanding from '@/components/products/ProductLanding'

export const metadata = createMetadata({
  title: 'The Creative AI Toolkit | Premium AI Integration Guide - FrankX.ai',
  description:
    'Transform your workflow with 100+ curated AI prompts, proven frameworks, and collective agent intelligence. The complete toolkit for creative AI collaboration.',
  keywords: [
    'ai toolkit',
    'ai prompts',
    'creative ai',
    'ai integration',
    'productivity automation',
    'ai workflows',
    'digital products',
    'frankx ai',
  ],
  path: '/products/creative-ai-toolkit',
})

const productData = {
  title: 'The Creative AI Toolkit',
  subtitle: 'Where Collective Intelligence Meets Human Ambition',
  price: 47,
  originalPrice: 97,
  badge: 'AGENT TEAM VALIDATED',

  hero: {
    headline: 'Transform Your Reality with Creative AI Integration',
    subheadline: 'The FrankX.ai Agent Team delivers the complete system for integrating AI into your workflow with wisdom, strategy, and measurable results.',
    benefits: [
      '100+ battle-tested AI prompts validated by our expert agents',
      '12 workflow templates that scale from solo creator to enterprise',
      'Exclusive 30-day access to the FrankX.ai Intelligence Circle',
      'Multi-agent validation ensuring every recommendation is optimized',
    ],
  },

  socialProof: {
    testimonials: [
      {
        text: "This toolkit eliminated my AI overwhelm and gave me a clear system. The agent team approach means I'm getting insights from multiple expert perspectives, not just one person's opinion.",
        author: "Sarah Chen",
        role: "Digital Marketing Director",
        company: "TechFlow Solutions"
      },
      {
        text: "The prompt library alone saved me 20 hours per week. But the real value is the systematic approach - I finally understand how to use AI strategically instead of randomly.",
        author: "Marcus Rodriguez",
        role: "Solo Entrepreneur",
        company: "Growth Catalyst Consulting"
      },
      {
        text: "We implemented the enterprise workflows across our team of 50. The collective intelligence framework scaled perfectly and improved our output quality by 40%.",
        author: "Jennifer Park",
        role: "VP of Innovation",
        company: "Enterprise Scale Inc."
      }
    ],
    stats: [
      { number: '10,000+', label: 'Creators Transformed' },
      { number: '500,000+', label: 'Hours Saved Collectively' },
      { number: '94%', label: 'Report Breakthrough Results' },
      { number: '4.9/5', label: 'Average Rating' },
    ]
  },

  features: {
    core: [
      {
        title: '100+ Premium AI Prompts',
        description: 'Curated and validated by our six-agent team across strategy, creativity, engineering, and quality assurance.',
        icon: 'Brain'
      },
      {
        title: 'Multi-Agent Validation',
        description: 'Every prompt and framework has been tested by our Strategist, Creator, Engineer, and Guardian agents.',
        icon: 'Shield'
      },
      {
        title: 'Workflow Automation Templates',
        description: 'Ready-to-implement systems that scale from personal productivity to enterprise operations.',
        icon: 'Workflow'
      },
      {
        title: 'Creativeness Framework',
        description: 'Ethical AI collaboration principles that maintain human leadership and wisdom in all interactions.',
        icon: 'Heart'
      },
      {
        title: 'Implementation Roadmap',
        description: '30, 60, 90-day milestones with clear metrics and optimization strategies.',
        icon: 'Map'
      },
      {
        title: 'Community Access',
        description: 'Exclusive 30-day membership to the FrankX.ai Intelligence Circle with weekly calls and peer support.',
        icon: 'Users'
      }
    ],
    bonuses: [
      {
        title: 'Quick Reference Cards',
        value: '$27',
        description: 'Beautifully designed printable cards with top 20 prompts and decision frameworks.'
      },
      {
        title: 'Email Mastery Course',
        value: '$47',
        description: '7-day guided implementation with daily lessons delivered to your inbox.'
      },
      {
        title: 'Agent Team Consultation',
        value: '$197',
        description: 'One 45-minute strategy session with our collective intelligence system.'
      }
    ]
  },

  benefits: {
    sections: [
      {
        title: 'For Individual Creators',
        items: [
          'Eliminate AI overwhelm with systematic frameworks',
          'Increase content quality while reducing production time',
          'Access enterprise-grade intelligence at creator prices',
          'Build sustainable workflows that scale with your growth'
        ]
      },
      {
        title: 'For Teams & Organizations',
        items: [
          'Standardize AI practices across your entire organization',
          'Reduce training time with proven templates and protocols',
          'Maintain quality consistency regardless of team size',
          'Measure ROI with built-in metrics and tracking systems'
        ]
      },
      {
        title: 'For Consultants & Coaches',
        items: [
          'Deliver client value faster with validated frameworks',
          'Differentiate your services with agent team intelligence',
          'Scale expertise beyond individual knowledge limitations',
          'Create premium offerings backed by systematic excellence'
        ]
      }
    ]
  },

  objections: [
    {
      concern: "I'm already using AI tools. What makes this different?",
      response: "Most people use AI reactively and randomly. This toolkit gives you systematic frameworks validated by six specialized agents. It's the difference between having AI tools and having AI strategy."
    },
    {
      concern: "Will this work for my specific industry or use case?",
      response: "The toolkit includes industry-specific adaptations for consultants, creatives, tech professionals, and educators. Plus, the framework teaches you to create custom prompts for any situation."
    },
    {
      concern: "I don't have time to learn another system.",
      response: "The quick-start guide gets you results in 30 minutes. The daily workflows take 10 minutes total. Most users save 5+ hours per week within the first month."
    },
    {
      concern: "How do I know this will work for my team?",
      response: "We offer a 30-day satisfaction guarantee. Plus, the community access lets you see real results from thousands of other users across different industries and team sizes."
    }
  ],

  urgency: {
    type: 'limited_bonus',
    message: 'Agent Team Consultation ($197 value) expires in 48 hours',
    timer: true
  },

  guarantee: {
    period: '30 days',
    promise: 'If the Creative AI Toolkit doesn\'t transform your AI workflow and deliver measurable results within 30 days, we\'ll refund every penny. No questions asked.',
    badge: 'Agent Team Promise'
  },

  faq: [
    {
      question: 'What makes the FrankX.ai approach different from other AI training?',
      answer: 'Instead of individual opinions, you get collective intelligence from six specialized agents. Every recommendation is validated across multiple expert perspectives - strategy, creativity, engineering, and quality assurance.'
    },
    {
      question: 'How quickly will I see results?',
      answer: 'Most users report immediate improvements within the first week. The quick-start workflows are designed to deliver value in your first session. Full transformation typically occurs within 30-60 days.'
    },
    {
      question: 'Is this suitable for beginners or do I need AI experience?',
      answer: 'The toolkit serves both beginners and advanced users. Beginners get step-by-step guidance and proven templates. Advanced users get sophisticated frameworks and optimization strategies.'
    },
    {
      question: 'What kind of support do I get?',
      answer: 'You get 30 days of community access with weekly group calls, peer support, and direct interaction with our agent team insights. Plus email support for technical questions.'
    },
    {
      question: 'Can I use this for my team or is it just for individuals?',
      answer: 'The toolkit scales from individual use to enterprise teams. It includes specific frameworks for team coordination, knowledge sharing, and maintaining quality across multiple users.'
    },
    {
      question: 'What if I\'m not satisfied?',
      answer: 'We offer a complete 30-day satisfaction guarantee. If you don\'t see measurable improvements in your AI workflow, we\'ll refund your investment completely.'
    }
  ],

  cta: {
    primary: 'Get Instant Access - $47',
    secondary: 'Bundle with the Agentic Creator OS Blueprint for full system rollout',
    afterPurchase: 'Read the Agentic Creator OS Field Guide ->'
  }
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'The Creative AI Toolkit',
  description: 'Complete AI integration system with 100+ prompts, workflows, and agent team intelligence',
  brand: {
    '@type': 'Brand',
    name: 'FrankX.ai'
  },
  offers: {
    '@type': 'Offer',
    price: '47',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'Organization',
      name: 'FrankX.ai Agent Team'
    }
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '1247'
  }
}

export default function CreativeAIToolkitPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <ProductLanding product={productData} />
      <Script id="product-structured-data" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
    </div>
  )
}

