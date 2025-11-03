import Link from 'next/link'
import { Download, ExternalLink, FileText, Users, Zap, Sparkles, Book } from 'lucide-react'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'FrankX Template Library - Soul-Aligned AI Systems',
  description: 'Download proven templates for creator operating systems, release rituals, and community storytelling.',
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
    id: 'creator-systems',
    title: 'Creator Systems',
    description: 'Operating frameworks for planning, automation, and measurement.',
    icon: FileText,
    templates: [
      {
        title: 'Creator Lab OS Blueprint',
        description: 'Map your weekly planning, automation, and review loops.',
        downloadUrl: '/templates/conscious-ai-governance-playbook.pdf',
        type: 'PDF Guide',
        pages: 24
      },
      {
        title: 'Creator Workflow Assessment',
        description: 'Audit your current rituals and decide what to automate next.',
        downloadUrl: '/templates/agent-architecture-assessment.xlsx',
        type: 'Excel Template',
        pages: 12
      },
      {
        title: 'Creator Strategy Canvas',
        description: 'One-page canvas to align offers, funnels, and content cadences.',
        downloadUrl: '/templates/ai-strategy-canvas.pdf',
        type: 'PDF Canvas',
        pages: 1
      }
    ]
  },
  {
    id: 'music-rituals',
    title: 'Music & Focus Rituals',
    description: 'Session scripts, daily run-throughs, and activation prompts.',
    icon: Zap,
    templates: [
      {
        title: 'Daily Intelligence Ritual',
        description: 'A repeatable daily flow for ideation, production, and review.',
        downloadUrl: '/templates/daily-intelligence-ritual.md',
        type: 'Markdown Guide',
        pages: 8
      },
      {
        title: 'Soul Frequency Calibration',
        description: 'Align your Suno sessions and live sets with intention.',
        downloadUrl: '/templates/soul-frequency-worksheet.pdf',
        type: 'PDF Worksheet',
        pages: 4
      },
      {
        title: 'Creative Intelligence Activation',
        description: 'Step-by-step routine to prep your body, mind, and tools before recording.',
        downloadUrl: '/templates/creative-intelligence-activation.docx',
        type: 'Word Document',
        pages: 6
      }
    ]
  },
  {
    id: 'story-community',
    title: 'Story & Community',
    description: 'Toolkits for launches, workshops, and community momentum.',
    icon: Users,
    templates: [
      {
        title: 'Workshop Facilitation Kit',
        description: 'Run creator labs or community sessions with ready-to-go agendas.',
        downloadUrl: '/templates/ai-workshop-kit.zip',
        type: 'Resource Bundle',
        pages: 45
      },
      {
        title: 'Creator Community Rituals',
        description: 'Guided prompts and check-ins to keep your circle engaged each week.',
        downloadUrl: '/templates/community-ai-ritual.md',
        type: 'Markdown Template',
        pages: 5
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
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />

      <main className="pb-24 pt-28">
        <section className="relative overflow-hidden px-6 pb-16 pt-16">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-slate-950 to-slate-950" />

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-400/40 bg-primary-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary-200">
              <Download className="h-4 w-4" />
              100% Free Forever
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-6xl">
              Battle-Tested Templates from the FrankX Studio
            </h1>
            <p className="mt-6 text-lg text-white/75 leading-relaxed max-w-2xl mx-auto">
              The same frameworks, rituals, and systems Frank uses daily as an Oracle AI Architect and conscious creator. Download instantly, customize freely, deploy immediately.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-4 max-w-3xl mx-auto text-left">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/20 mb-3">
                  <FileText className="h-5 w-5 text-primary-200" />
                </div>
                <p className="text-sm font-semibold text-white">Production-Ready</p>
                <p className="mt-1 text-xs text-white/60">Use today, see results tomorrow</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/20 mb-3">
                  <Zap className="h-5 w-5 text-primary-200" />
                </div>
                <p className="text-sm font-semibold text-white">Field-Tested</p>
                <p className="mt-1 text-xs text-white/60">Proven in enterprise & startups</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/20 mb-3">
                  <Users className="h-5 w-5 text-primary-200" />
                </div>
                <p className="text-sm font-semibold text-white">Community Built</p>
                <p className="mt-1 text-xs text-white/60">Refined with 1000+ creators</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/20 mb-3">
                  <ExternalLink className="h-5 w-5 text-primary-200" />
                </div>
                <p className="text-sm font-semibold text-white">No Lock-In</p>
                <p className="mt-1 text-xs text-white/60">Edit, share, remix freely</p>
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
                  <div className="text-center max-w-2xl mx-auto">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-500/20 border border-primary-400/30">
                      <IconComponent className="h-8 w-8 text-primary-200" />
                    </div>
                    <h2 className="mt-6 text-3xl font-semibold text-white">{category.title}</h2>
                    <p className="mt-3 text-lg text-white/70 leading-relaxed">{category.description}</p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {category.templates.map((template, index) => (
                      <div
                        key={index}
                        className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 transition-all duration-300 hover:border-primary-400/40 hover:shadow-lg hover:shadow-primary-500/10"
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full blur-3xl transition-opacity opacity-0 group-hover:opacity-100" />

                        <div className="relative space-y-4">
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="text-lg font-semibold text-white leading-tight flex-1">
                              {template.title}
                            </h3>
                            <div className="shrink-0 rounded-lg border border-primary-400/40 bg-primary-500/20 px-2.5 py-1 text-xs font-semibold text-primary-200">
                              {template.type}
                            </div>
                          </div>

                          <p className="text-sm text-white/70 leading-relaxed min-h-[60px]">
                            {template.description}
                          </p>

                          <div className="flex items-center justify-between pt-3 border-t border-white/10">
                            <div className="flex items-center gap-2 text-xs text-white/60">
                              <FileText className="h-3.5 w-3.5" />
                              <span>{template.pages} {template.type.includes('Bundle') ? 'files' : 'pages'}</span>
                            </div>

                            <Link
                              href={template.downloadUrl}
                              className="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-primary-400 hover:shadow-md hover:shadow-primary-500/30"
                            >
                              <Download className="h-3.5 w-3.5" />
                              Download Free
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
          <div className="mx-auto max-w-5xl rounded-3xl border border-primary-400/30 bg-gradient-to-br from-primary-500/15 via-slate-900 to-slate-950 p-10">
            <div className="grid gap-10 lg:grid-cols-[1.5fr,1fr] lg:items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary-400/40 bg-primary-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary-200">
                  <Sparkles className="h-4 w-4" />
                  Custom Solutions
                </div>
                <h3 className="text-3xl font-semibold text-white">Need Something Specific?</h3>
                <p className="text-white/70 leading-relaxed">
                  These templates are just the beginning. Frank creates custom frameworks for enterprise teams, creator cohorts, and transformation programs. If you need a bespoke system that bridges your unique context, let's talk.
                </p>
                <ul className="space-y-3 text-sm text-white/70">
                  <li className="flex items-start gap-3">
                    <Zap className="h-5 w-5 shrink-0 text-primary-200" />
                    <span><strong className="text-white">Enterprise AI Transformation:</strong> Custom governance, adoption frameworks, and team rituals</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Users className="h-5 w-5 shrink-0 text-primary-200" />
                    <span><strong className="text-white">Creator Cohort Programs:</strong> Curriculum design, community playbooks, and launch systems</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FileText className="h-5 w-5 shrink-0 text-primary-200" />
                    <span><strong className="text-white">Specialized Operating Systems:</strong> Music production studios, content labs, product teams</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
                  <p className="text-sm font-semibold text-white mb-4">Start the conversation</p>
                  <Link
                    href="mailto:hello@frankx.ai?subject=Custom Template Inquiry"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-400 hover:shadow-lg hover:shadow-primary-500/30"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Request Custom Template
                  </Link>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
                  <p className="text-sm font-semibold text-white mb-4">Explore more free resources</p>
                  <Link
                    href="/resources"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
                  >
                    <Book className="h-4 w-4" />
                    Browse All Resources
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}



