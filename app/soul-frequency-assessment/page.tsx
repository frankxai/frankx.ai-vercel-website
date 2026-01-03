import Link from 'next/link'
import { Sparkles, Brain, Heart, Workflow, ArrowRight, Shield, Waves, CheckCircle2 } from 'lucide-react'

export const metadata = {
  title: 'Soul Frequency Assessment | FrankX',
  description: 'Discover your conscious creator archetype and receive a custom intelligence stack to amplify your work with AI.',
}

const pillars = [
  {
    icon: Brain,
    title: 'Creative Strategy',
    description: 'Clarify the outcomes you are here to create and the intelligence leverage each offer requires.'
  },
  {
    icon: Heart,
    title: 'Soul-Aligned Delivery',
    description: 'Design operating rhythms that protect your energy while unlocking exponential impact.'
  },
  {
    icon: Workflow,
    title: 'Intelligence Systems',
    description: 'Pair human genius with orchestrated agents, automations, and templates tuned to your frequency.'
  }
]

const bonuses = [
  'Detailed archetype report with your creative strengths and potential blind spots',
  'Recommended AI + automation stack mapped to your business model',
  '30-day execution sprint checklist to activate your intelligence operating system',
  'Invites to upcoming live Frequency Labs and community co-creation sessions'
]

export default function SoulFrequencyAssessmentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50">
<main className="pt-28 pb-24 px-6">
        <section className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr,0.9fr] gap-12 items-start">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold">
              <Sparkles className="w-4 h-4" /> Soul Frequency Assessment
            </span>
            <h1 className="mt-6 text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Discover the Creator You Came Here to Be & Build the System That Supports It
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              In 7 minutes you will map your soul frequency, identify your signature transformation, and receive a
              custom AI-powered operating plan. This is not a personality quiz. It is a strategic assessment built from
              15 years of Oracle enterprise AI delivery, 500+ Suno compositions, and dozens of conscious launches.
            </p>

            <div className="mt-10 grid sm:grid-cols-3 gap-6">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="bg-white border border-purple-100 rounded-xl p-5 shadow-sm">
                  <pillar.icon className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{pillar.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact?subject=Soul%20Frequency%20Assessment"
                className="inline-flex items-center justify-center px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
              >
                Start the Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="mailto:hello@frankx.ai?subject=Soul%20Frequency%20Assessment%20Question"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-700 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors font-semibold"
              >
                Talk with Frank
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-3 text-sm text-gray-500">
              <Shield className="w-4 h-4" />
              100% private. Your responses inform recommendations and are never shared.
            </div>
          </div>

          <div className="bg-white shadow-xl rounded-2xl p-8 border border-purple-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What You Receive</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              The assessment outputs a personalized intelligence blueprint so you know exactly which templates, automations,
              and rituals to activate next.
            </p>

            <ul className="space-y-4">
              {bonuses.map((bonus) => (
                <li key={bonus} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-1" />
                  <span>{bonus}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
              <h3 className="text-lg font-semibold mb-2">Frequency Labs Access</h3>
              <p className="text-sm opacity-90 leading-relaxed">
                Every quarter we host live build sessions where we co-create agent workflows, Suno experiences,
                and conscious business models. Completing the assessment unlocks early invites and backstage assets.
              </p>
            </div>

            <div className="mt-8 text-sm text-gray-500">
              <p className="flex items-center gap-2">
                <Waves className="w-4 h-4 text-purple-500" /> Designed for creators, leaders, and families navigating the intelligence era.
              </p>
              <p className="flex items-center gap-2 mt-2">
                <Sparkles className="w-4 h-4 text-purple-500" /> Average completion time: 7 minutes. Delivery email within 15 minutes.
              </p>
            </div>
          </div>
        </section>
      </main>

      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto bg-white border border-purple-100 rounded-2xl p-10 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How the Assessment Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Map Your Frequency', description: 'Answer intentionally-crafted prompts covering vision, offers, energy, and support systems.' },
              { step: '02', title: 'Receive Your Blueprint', description: 'We generate an archetype report with intelligence stack recommendations and immediate actions.' },
              { step: '03', title: 'Activate with Guidance', description: 'Join a live Frequency Lab or book a session to implement with an Enterprise-grade partner.' }
            ].map((item) => (
              <div key={item.step} className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                <div className="text-sm font-semibold text-purple-600">Step {item.step}</div>
                <div className="text-xl font-semibold text-gray-900 mt-2">{item.title}</div>
                <p className="text-sm text-gray-600 mt-3 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
</div>
  )
}
