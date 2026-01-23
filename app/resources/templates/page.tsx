import Link from 'next/link'
import { Download, ExternalLink, FileText, Users, Zap } from 'lucide-react'

import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'FrankX Template Library - Soul-Aligned AI Systems',
  description: 'Download proven templates for conscious AI implementation, agent governance, and transformation rituals. Enterprise-grade systems made accessible.',
  keywords: [
    'ai templates',
    'agent governance templates',
    'conscious ai framework',
    'oracle ai architecture',
    'transformation rituals'
  ],
  path: '/resources/templates'
})

const templateCategories = [
  {
    id: 'ai-governance',
    title: 'AI Governance & Strategy',
    description: 'Enterprise-grade frameworks for conscious AI implementation',
    icon: FileText,
    templates: [
      {
        title: 'Conscious AI Governance Playbook',
        description: 'Complete framework for implementing soul-aligned AI systems in enterprise environments',
        downloadUrl: '/templates/conscious-ai-governance-playbook.pdf',
        type: 'PDF Guide',
        pages: 24
      },
      {
        title: 'Agent Architecture Assessment',
        description: 'Evaluate and design human-centered AI agent systems',
        downloadUrl: '/templates/agent-architecture-assessment.xlsx',
        type: 'Excel Template',
        pages: 12
      },
      {
        title: 'AI Strategy Canvas',
        description: 'Visual planning tool for aligning AI initiatives with consciousness evolution',
        downloadUrl: '/templates/ai-strategy-canvas.pdf',
        type: 'PDF Canvas',
        pages: 1
      }
    ]
  },
  {
    id: 'transformation-rituals',
    title: 'Transformation Rituals',
    description: 'Daily practices for AI-human consciousness evolution',
    icon: Zap,
    templates: [
      {
        title: 'Daily Intelligence Operations Ritual',
        description: 'Complete workflow for maintaining conscious AI systems',
        downloadUrl: '/templates/daily-intelligence-ritual.md',
        type: 'Markdown Guide',
        pages: 8
      },
      {
        title: 'Soul Frequency Calibration Worksheet',
        description: 'Align your AI interactions with authentic self-expression',
        downloadUrl: '/templates/soul-frequency-worksheet.pdf',
        type: 'PDF Worksheet',
        pages: 4
      },
      {
        title: 'Creative Intelligence Activation',
        description: 'Step-by-step process for amplifying creativity with AI',
        downloadUrl: '/templates/creative-intelligence-activation.docx',
        type: 'Word Document',
        pages: 6
      }
    ]
  },
  {
    id: 'team-collaboration',
    title: 'Team & Community',
    description: 'Frameworks for collective intelligence experiences',
    icon: Users,
    templates: [
      {
        title: 'AI Workshop Facilitation Kit',
        description: 'Everything needed to run transformative AI education sessions',
        downloadUrl: '/templates/ai-workshop-kit.zip',
        type: 'Resource Bundle',
        pages: 45
      },
      {
        title: 'Family AI Safety Checklist',
        description: 'Practical guide for introducing AI safely in family contexts',
        downloadUrl: '/templates/family-ai-safety.pdf',
        type: 'PDF Checklist',
        pages: 6
      },
      {
        title: 'Community AI Ritual Template',
        description: 'Framework for group consciousness evolution practices',
        downloadUrl: '/templates/community-ai-ritual.md',
        type: 'Markdown Template',
        pages: 5
      }
    ]
  }
]

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-void text-slate-100">
<main className="pb-24 pt-28">
        <section className="relative overflow-hidden px-6 pb-16 pt-16">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-slate-950 to-slate-950" />

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
              FrankX Template Library
            </h1>
            <p className="mt-6 text-lg text-white/75 leading-relaxed">
              Enterprise-grade systems made accessible. Download proven frameworks for conscious AI implementation,
              transformation rituals, and soul-aligned technology adoption.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
              <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2">
                📋 Enterprise Ready
              </div>
              <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2">
                🌟 Consciousness Aligned
              </div>
              <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2">
                🚀 Immediately Actionable
              </div>
            </div>
          </div>
        </section>

        <section className="px-6">
          <div className="mx-auto max-w-7xl space-y-16">
            {templateCategories.map((category) => {
              const IconComponent = category.icon

              return (
                <div key={category.id} className="space-y-8">
                  <div className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-500/20">
                      <IconComponent className="h-8 w-8 text-primary-200" />
                    </div>
                    <h2 className="mt-4 text-2xl font-semibold text-white">{category.title}</h2>
                    <p className="mt-2 text-white/70">{category.description}</p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {category.templates.map((template, index) => (
                      <div
                        key={index}
                        className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                      >
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <h3 className="text-lg font-semibold text-white leading-tight">
                              {template.title}
                            </h3>
                            <div className="rounded-lg bg-primary-500/20 px-2 py-1 text-xs font-semibold text-primary-200">
                              {template.type}
                            </div>
                          </div>

                          <p className="text-sm text-white/70 leading-relaxed">
                            {template.description}
                          </p>

                          <div className="flex items-center justify-between pt-2">
                            <span className="text-xs text-white/60">
                              {template.pages} {template.type.includes('Bundle') ? 'files' : 'pages'}
                            </span>

                            <Link
                              href={template.downloadUrl}
                              className="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-primary-400"
                            >
                              <Download className="h-3 w-3" />
                              Download
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="px-6 pt-20">
          <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-gradient-to-br from-primary-500/10 via-slate-900 to-slate-950 p-8 text-center">
            <h3 className="text-2xl font-semibold text-white">Custom Template Development</h3>
            <p className="mt-4 text-white/70">
              Need a specific template for your organization? Our team creates bespoke frameworks
              for enterprise AI transformation, family education, and community activation.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="mailto:hello@frankx.ai?subject=Custom Template Request"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                <ExternalLink className="h-4 w-4" />
                Request Custom Template
              </Link>
              <Link
                href="/resources"
                className="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-400"
              >
                Explore All Resources
              </Link>
            </div>
          </div>
        </section>
      </main>
</div>
  )
}