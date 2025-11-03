import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Sparkles, Brain, Heart, Workflow, ArrowRight, Shield, Waves, CheckCircle2, Users, Clock, Target, Zap } from 'lucide-react'

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
      <Navigation />

      <main className="pt-28 pb-24 px-6">
        <section className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr,0.9fr] gap-12 items-start">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold">
              <Sparkles className="w-4 h-4" /> Soul Frequency Assessment
            </span>
            <h1 className="mt-6 text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Discover Your{' '}
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Conscious Creator Archetype
              </span>
              {' '}in 7 Minutes
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Map your soul frequency, identify your signature transformation, and receive a
              custom AI-powered operating plan. This is not a personality quiz. It's a strategic assessment built from
              15 years of Oracle enterprise AI delivery, 500+ Suno compositions, and dozens of conscious launches.
            </p>

            {/* Social Proof */}
            <div className="mt-8 flex items-center gap-3 text-gray-600">
              <Users className="w-5 h-5 text-purple-600" />
              <span className="text-sm">
                <span className="font-semibold text-gray-900">487</span> conscious creators have discovered their frequency
              </span>
            </div>

            <div className="mt-10 grid sm:grid-cols-3 gap-6">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="bg-white border border-purple-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <pillar.icon className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{pillar.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-3 gap-6">
              <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-100">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <div className="text-2xl font-bold text-purple-600">7</div>
                </div>
                <div className="text-xs text-gray-600">Minutes</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-100">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Target className="w-5 h-5 text-purple-600" />
                  <div className="text-2xl font-bold text-purple-600">15</div>
                </div>
                <div className="text-xs text-gray-600">Min Delivery</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-100">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Zap className="w-5 h-5 text-purple-600" />
                  <div className="text-2xl font-bold text-purple-600">100%</div>
                </div>
                <div className="text-xs text-gray-600">Free</div>
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="https://forms.gle/your-assessment-form"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Start Your Assessment Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
              <Link
                href="mailto:hello@frankx.ai?subject=Soul%20Frequency%20Assessment%20Question"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-700 border-2 border-purple-200 rounded-xl hover:bg-purple-50 hover:border-purple-300 transition-all duration-300 font-semibold"
              >
                Questions? Talk with Frank
              </Link>
            </div>

            <div className="mt-6 flex items-start gap-3 text-sm text-gray-600 bg-green-50 border border-green-100 rounded-lg p-4">
              <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-green-900 mb-1">Your Privacy is Sacred</div>
                <div>100% private. Your responses inform personalized recommendations and are never shared or sold.</div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-xl rounded-2xl p-8 border border-purple-100 sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">What You'll Receive</h2>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                100% Free
              </span>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              A personalized intelligence blueprint showing exactly which templates, automations,
              and rituals to activate based on your unique frequency.
            </p>

            <ul className="space-y-4 mb-8">
              {bonuses.map((bonus, index) => (
                <li key={bonus} className="flex items-start gap-3 text-gray-700">
                  <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-purple-600">{index + 1}</span>
                  </div>
                  <span className="leading-relaxed">{bonus}</span>
                </li>
              ))}
            </ul>

            <div className="mb-8 rounded-xl bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-600 text-white p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Bonus: Frequency Labs Access</h3>
              </div>
              <p className="text-sm opacity-95 leading-relaxed">
                Quarterly live sessions where we co-create agent workflows, Suno experiences,
                and conscious business models. Assessment completion unlocks early invites.
              </p>
            </div>

            <div className="space-y-3 text-sm text-gray-600 bg-purple-50 border border-purple-100 rounded-lg p-4">
              <p className="flex items-start gap-2">
                <Waves className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                <span>Designed for creators, leaders, and families navigating the intelligence era</span>
              </p>
              <p className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                <span>7 minute assessment • Results delivered within 15 minutes via email</span>
              </p>
              <p className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                <span>100% confidential • Your data is never shared or sold</span>
              </p>
            </div>
          </div>
        </section>
      </main>

      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto bg-white border border-purple-100 rounded-2xl p-10 shadow-lg">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">How the Assessment Works</h2>
            <p className="text-gray-600">Three simple steps to your personalized intelligence blueprint</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Map Your Frequency', description: 'Answer intentionally-crafted prompts covering vision, offers, energy, and support systems.', icon: Brain },
              { step: '02', title: 'Receive Your Blueprint', description: 'We generate an archetype report with intelligence stack recommendations and immediate actions.', icon: Target },
              { step: '03', title: 'Activate with Guidance', description: 'Join a live Frequency Lab or book a session to implement with enterprise-grade support.', icon: Zap }
            ].map((item) => (
              <div key={item.step} className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border-2 border-purple-200 hover:border-purple-300 transition-colors">
                <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-lg mb-4">
                  {item.step}
                </div>
                <item.icon className="w-8 h-8 text-purple-600 mb-3" />
                <div className="text-xl font-semibold text-gray-900 mb-3">{item.title}</div>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What Creators Are Saying</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-purple-100 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Sparkles key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic leading-relaxed">
                "This assessment helped me understand why I was burning out. The personalized intelligence stack showed me how to delegate to AI while keeping my creative essence intact."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 font-semibold">
                  SC
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Sarah Chen</div>
                  <div className="text-sm text-gray-600">Content Creator & Coach</div>
                </div>
              </div>
            </div>
            <div className="bg-white border border-purple-100 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Sparkles key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic leading-relaxed">
                "Finally, an assessment that gets it. Not just surface-level personality stuff, but actual strategic guidance for building a conscious business with AI amplification."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 font-semibold">
                  MR
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Marcus Rodriguez</div>
                  <div className="text-sm text-gray-600">Entrepreneur & Podcaster</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700 rounded-2xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Discover Your Frequency?</h2>
          <p className="text-lg opacity-95 mb-8 leading-relaxed">
            Join hundreds of conscious creators who have mapped their soul frequency and built AI-powered systems that amplify their unique gifts.
          </p>
          <a
            href="https://forms.gle/your-assessment-form"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 py-4 bg-white text-purple-700 rounded-xl hover:bg-purple-50 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Start Your Free Assessment
            <ArrowRight className="w-5 h-5 ml-2" />
          </a>
          <p className="text-sm opacity-90 mt-4">
            7 minutes • Free forever • Instant personalized results
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
