import Link from 'next/link'
import { Shield, TrendingUp, Users, AlertTriangle, CheckCircle, BarChart3, Settings, Eye, Lock, Lightbulb } from 'lucide-react'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'AI Governance Dashboard - Enterprise AI Risk Management & Compliance',
  description: 'Comprehensive AI governance framework for enterprises. Monitor AI usage, assess risks, ensure compliance, and maintain human-AI alignment at scale.',
  keywords: [
    'ai governance',
    'ai risk management',
    'ai compliance',
    'enterprise ai governance',
    'ai ethics dashboard',
    'ai audit framework'
  ],
  path: '/governance'
})

const governanceMetrics = [
  {
    metric: 'AI Risk Score',
    value: '2.3',
    scale: '/10',
    status: 'low',
    trend: 'down',
    description: 'Overall enterprise AI risk assessment',
    details: 'Calculated from 47 risk factors across all AI implementations'
  },
  {
    metric: 'Compliance Rate',
    value: '94%',
    scale: '',
    status: 'good',
    trend: 'up',
    description: 'Adherence to AI governance policies',
    details: '231 of 245 active AI systems fully compliant'
  },
  {
    metric: 'Human-AI Alignment',
    value: '87%',
    scale: '',
    status: 'good',
    trend: 'stable',
    description: 'AI systems serving human flourishing',
    details: 'Based on consciousness enhancement metrics'
  },
  {
    metric: 'Active AI Systems',
    value: '245',
    scale: '',
    status: 'neutral',
    trend: 'up',
    description: 'AI tools and agents in production',
    details: 'Across 12 departments and 34 business units'
  }
]

const riskCategories = [
  {
    category: 'Bias & Fairness',
    riskLevel: 'Medium',
    severity: '6/10',
    systems: 23,
    description: 'AI systems with potential bias in decision-making',
    status: 'monitoring',
    color: 'border-yellow-500/30 bg-yellow-500/10',
    actions: [
      'Bias testing across 12 demographic dimensions',
      'Fairness audits for hiring and promotion algorithms',
      'Regular training data diversity assessments'
    ]
  },
  {
    category: 'Privacy & Data Protection',
    riskLevel: 'Low',
    severity: '3/10',
    systems: 156,
    description: 'Data handling and privacy protection protocols',
    status: 'compliant',
    color: 'border-green-500/30 bg-green-500/10',
    actions: [
      'End-to-end encryption for all AI data flows',
      'GDPR compliance verification monthly',
      'Data minimization protocols active'
    ]
  },
  {
    category: 'Human Autonomy',
    riskLevel: 'Low',
    severity: '2/10',
    systems: 89,
    description: 'Maintaining human agency and decision-making authority',
    status: 'optimal',
    color: 'border-blue-500/30 bg-blue-500/10',
    actions: [
      'Human-in-the-loop verification for critical decisions',
      'Consciousness amplification vs replacement tracking',
      'Employee empowerment metrics monitoring'
    ]
  },
  {
    category: 'Technical Safety',
    riskLevel: 'Medium',
    severity: '5/10',
    systems: 67,
    description: 'AI system reliability, security, and robustness',
    status: 'reviewing',
    color: 'border-orange-500/30 bg-orange-500/10',
    actions: [
      'Adversarial testing for 34 critical systems',
      'Failsafe mechanisms verification',
      'Security penetration testing quarterly'
    ]
  }
]

const complianceFrameworks = [
  {
    framework: 'EU AI Act',
    status: 'Compliant',
    coverage: '92%',
    nextAudit: '2025-12-15',
    requirements: 47,
    completed: 43
  },
  {
    framework: 'NIST AI RMF',
    status: 'Implementing',
    coverage: '78%',
    nextAudit: '2025-11-30',
    requirements: 34,
    completed: 27
  },
  {
    framework: 'IEEE Ethical Design',
    status: 'Compliant',
    coverage: '95%',
    nextAudit: '2026-01-20',
    requirements: 28,
    completed: 27
  },
  {
    framework: 'Internal Consciousness Standard',
    status: 'Compliant',
    coverage: '89%',
    nextAudit: '2025-10-31',
    requirements: 52,
    completed: 46
  }
]

const governanceActions = [
  {
    title: 'Quarterly AI Ethics Review',
    priority: 'High',
    dueDate: '2025-10-15',
    assignee: 'AI Governance Committee',
    description: 'Comprehensive review of all AI systems for ethical alignment',
    status: 'in-progress'
  },
  {
    title: 'Bias Testing Framework Update',
    priority: 'Medium',
    dueDate: '2025-11-01',
    assignee: 'Technical Ethics Team',
    description: 'Enhance bias detection across demographic and consciousness dimensions',
    status: 'planned'
  },
  {
    title: 'Human-AI Collaboration Training',
    priority: 'High',
    dueDate: '2025-10-30',
    assignee: 'Learning & Development',
    description: 'Train 500+ employees on consciousness-aligned AI interaction',
    status: 'in-progress'
  },
  {
    title: 'AI Risk Assessment Automation',
    priority: 'Medium',
    dueDate: '2025-12-01',
    assignee: 'Platform Engineering',
    description: 'Implement real-time risk monitoring for all AI systems',
    status: 'planned'
  }
]

const consciousnessMetrics = [
  {
    dimension: 'Human Empowerment',
    score: 8.7,
    trend: 'up',
    description: 'AI systems enhancing rather than replacing human capabilities'
  },
  {
    dimension: 'Creative Enhancement',
    score: 9.2,
    trend: 'up',
    description: 'AI facilitating creative expression and innovation'
  },
  {
    dimension: 'Wisdom Integration',
    score: 7.8,
    trend: 'stable',
    description: 'AI decisions incorporating human wisdom and values'
  },
  {
    dimension: 'Collective Growth',
    score: 8.1,
    trend: 'up',
    description: 'AI supporting community and collaborative development'
  }
]

export default function GovernancePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />

      <main className="pb-24 pt-28">
        <section className="relative overflow-hidden px-6 pb-16 pt-16">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-slate-950 to-slate-950" />

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/20 mb-6">
              <Shield className="h-10 w-10 text-blue-200" />
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
              AI Governance Dashboard
            </h1>
            <p className="mt-6 text-lg text-white/75 leading-relaxed">
              Comprehensive framework for managing AI risk, ensuring compliance, and maintaining
              human-AI alignment across your entire organization.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
              <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2">
                🛡️ Risk Monitoring
              </div>
              <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2">
                📊 Compliance Tracking
              </div>
              <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2">
                🧠 Consciousness Aligned
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pt-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold text-white">Enterprise AI Metrics</h2>
              <p className="mt-4 text-white/70">
                Real-time monitoring of AI governance across your organization
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {governanceMetrics.map((metric, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider">
                      {metric.metric}
                    </h3>
                    <div className={`flex items-center gap-1 ${
                      metric.trend === 'up' ? 'text-green-400' :
                      metric.trend === 'down' ? 'text-red-400' : 'text-white/60'
                    }`}>
                      <TrendingUp className={`h-4 w-4 ${metric.trend === 'down' ? 'rotate-180' : ''}`} />
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">
                      {metric.value}<span className="text-lg text-white/60">{metric.scale}</span>
                    </div>
                    <p className="text-sm text-white/70 mt-2">{metric.description}</p>
                  </div>

                  <div className="text-xs text-white/50 bg-white/5 rounded-lg p-3">
                    {metric.details}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pt-20">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold text-white">Risk Assessment Categories</h2>
              <p className="mt-4 text-white/70">
                Comprehensive risk monitoring across critical AI governance dimensions
              </p>
            </div>

            <div className="space-y-6">
              {riskCategories.map((category, index) => (
                <div
                  key={index}
                  className={`rounded-3xl border ${category.color} p-8`}
                >
                  <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-1">
                      <div className="flex items-center gap-3 mb-4">
                        <AlertTriangle className={`h-6 w-6 ${
                          category.riskLevel === 'High' ? 'text-red-400' :
                          category.riskLevel === 'Medium' ? 'text-yellow-400' :
                          'text-green-400'
                        }`} />
                        <h3 className="text-xl font-semibold text-white">{category.category}</h3>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-white/60">Risk Level</span>
                          <span className={`text-sm font-medium ${
                            category.riskLevel === 'High' ? 'text-red-400' :
                            category.riskLevel === 'Medium' ? 'text-yellow-400' :
                            'text-green-400'
                          }`}>{category.riskLevel}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-white/60">Severity</span>
                          <span className="text-sm text-white">{category.severity}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-white/60">Affected Systems</span>
                          <span className="text-sm text-white">{category.systems}</span>
                        </div>
                      </div>

                      <p className="text-sm text-white/70 mt-4">{category.description}</p>
                    </div>

                    <div className="lg:col-span-2">
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-white/60 mb-4">
                        Active Mitigation Actions
                      </h4>
                      <div className="space-y-3">
                        {category.actions.map((action, actionIndex) => (
                          <div key={actionIndex} className="flex items-start gap-3">
                            <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-white/80">{action}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pt-20">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold text-white">Compliance Frameworks</h2>
              <p className="mt-4 text-white/70">
                Adherence to industry standards and regulatory requirements
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {complianceFrameworks.map((framework, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">{framework.framework}</h3>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      framework.status === 'Compliant' ? 'bg-green-500/20 text-green-200' :
                      framework.status === 'Implementing' ? 'bg-yellow-500/20 text-yellow-200' :
                      'bg-red-500/20 text-red-200'
                    }`}>
                      {framework.status}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-white/60">Coverage</div>
                      <div className="text-2xl font-bold text-white">{framework.coverage}</div>
                    </div>
                    <div>
                      <div className="text-sm text-white/60">Progress</div>
                      <div className="text-2xl font-bold text-white">
                        {framework.completed}/{framework.requirements}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-xs text-white/50 mb-1">Next Audit</div>
                    <div className="text-sm text-white">{framework.nextAudit}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pt-20">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold text-white">Consciousness Alignment Metrics</h2>
              <p className="mt-4 text-white/70">
                Measuring how well AI systems serve human consciousness evolution
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {consciousnessMetrics.map((metric, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-purple-500/20 bg-purple-500/5 p-6 text-center space-y-4"
                >
                  <h3 className="text-sm font-medium text-purple-200 uppercase tracking-wider">
                    {metric.dimension}
                  </h3>

                  <div className="text-4xl font-bold text-white">
                    {metric.score}<span className="text-lg text-white/60">/10</span>
                  </div>

                  <div className={`flex items-center justify-center gap-1 ${
                    metric.trend === 'up' ? 'text-green-400' :
                    metric.trend === 'down' ? 'text-red-400' : 'text-white/60'
                  }`}>
                    <TrendingUp className={`h-4 w-4 ${metric.trend === 'down' ? 'rotate-180' : ''}`} />
                    <span className="text-xs uppercase tracking-wider">{metric.trend}</span>
                  </div>

                  <p className="text-xs text-white/70">{metric.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pt-20">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold text-white">Governance Action Items</h2>
              <p className="mt-4 text-white/70">
                Priority actions to maintain and improve AI governance
              </p>
            </div>

            <div className="space-y-4">
              {governanceActions.map((action, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{action.title}</h3>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${
                          action.priority === 'High' ? 'bg-red-500/20 text-red-200' :
                          action.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-200' :
                          'bg-green-500/20 text-green-200'
                        }`}>
                          {action.priority}
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${
                          action.status === 'in-progress' ? 'bg-blue-500/20 text-blue-200' :
                          action.status === 'planned' ? 'bg-gray-500/20 text-gray-200' :
                          'bg-green-500/20 text-green-200'
                        }`}>
                          {action.status}
                        </div>
                      </div>

                      <p className="text-sm text-white/70 mb-3">{action.description}</p>

                      <div className="flex items-center gap-4 text-xs text-white/50">
                        <span>Due: {action.dueDate}</span>
                        <span>•</span>
                        <span>Assigned: {action.assignee}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pt-20">
          <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
            <h3 className="text-2xl font-semibold text-white">Governance Command Center</h3>
            <p className="mt-4 text-white/70">
              Access advanced governance tools, configure compliance settings, and manage
              AI system permissions across your organization.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/resources/templates"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-400"
              >
                <BarChart3 className="h-4 w-4" />
                Governance Templates
              </Link>
              <Link
                href="mailto:hello@frankx.ai?subject=AI Governance Consultation"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Get Expert Guidance
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}