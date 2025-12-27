import { ArrowRight, Brain, Calendar, CheckCircle2, Clock, Globe, Mail, MapPin, MessageSquare, Phone, Send, Sparkles, User, Users, Zap } from 'lucide-react'
import Link from 'next/link'

import { createMetadata } from '@/lib/seo'

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Us',
    description: 'Get a response within 24 hours',
    contact: 'hello@frankx.ai',
    href: 'mailto:hello@frankx.ai?subject=FrankX.AI%20Inquiry',
    preferred: true
  },
  {
    icon: Calendar,
    title: 'Schedule a Call',
    description: 'Book a strategic consultation',
    contact: 'Strategy Session',
    href: 'mailto:hello@frankx.ai?subject=Strategy%20Session%20Request',
    preferred: false
  },
  {
    icon: MessageSquare,
    title: 'Project Discussion',
    description: 'Discuss your AI transformation needs',
    contact: 'Project Consultation',
    href: 'mailto:hello@frankx.ai?subject=Project%20Consultation',
    preferred: false
  }
]

const services = [
  {
    icon: Brain,
    title: 'AI Strategy & Consulting',
    description: 'Enterprise AI transformation and strategic implementation',
    features: ['Strategic roadmapping', 'Risk assessment', 'Governance frameworks', 'Team enablement']
  },
  {
    icon: Zap,
    title: 'Product Development',
    description: 'Custom AI solutions and intelligent system architecture',
    features: ['System design', 'Technical implementation', 'Integration support', 'Optimization']
  },
  {
    icon: Users,
    title: 'Team Training',
    description: 'AI literacy and capability building for organizations',
    features: ['Leadership education', 'Technical upskilling', 'Workflow integration', 'Change management']
  },
  {
    icon: Globe,
    title: 'Speaking & Workshops',
    description: 'Thought leadership and educational presentations',
    features: ['Conference keynotes', 'Workshop facilitation', 'Team training sessions', 'Industry panels']
  }
]

const faqs = [
  {
    question: 'What types of AI projects do you work on?',
    answer: 'We specialize in conscious AI implementations including enterprise automation, creative AI systems like Vibe OS, strategic AI consulting, and comprehensive AI transformation programs for organizations of all sizes.'
  },
  {
    question: 'How long does a typical engagement last?',
    answer: 'Engagement timelines vary based on scope. Strategic consultations can be 2-4 weeks, while full AI transformation programs typically run 3-12 months. We always provide detailed timelines during our initial assessment.'
  },
  {
    question: 'Do you offer ongoing support after implementation?',
    answer: 'Yes, we provide various support options including retainer-based ongoing consulting, team training programs, and technical support packages to ensure your AI systems continue to deliver value.'
  },
  {
    question: 'Can you work with our existing technology stack?',
    answer: 'Absolutely. We specialize in integrating AI capabilities with existing systems and can work with virtually any technology stack. Our approach focuses on enhancing rather than replacing your current infrastructure.'
  }
]

export const metadata = createMetadata({
  title: 'Contact FrankX.AI - AI Strategy & Consulting',
  description: 'Get in touch for AI strategy consulting, enterprise implementations, and conscious AI solutions. Expert guidance for your AI transformation journey.',
  keywords: ['contact frankx ai', 'ai consulting contact', 'ai strategy consultation', 'enterprise ai help'],
  path: '/contact',
})

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
<main className="px-6 pt-28 pb-20">
        <div className="mx-auto max-w-7xl space-y-20">
          {/* Hero Section */}
          <header className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm px-6 py-3 text-sm font-medium text-cyan-300">
              <MessageSquare className="h-5 w-5" />
              Let's Build Something Extraordinary
            </div>
            <h1 className="text-5xl font-bold text-white md:text-6xl xl:text-7xl max-w-4xl mx-auto leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Ready to Transform
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Your AI Vision?
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              From strategic AI planning to full-scale implementations, we're here to guide your journey
              into the intelligence age. Let's discuss how conscious AI can transform your organization.
            </p>
          </header>

          {/* Contact Methods */}
          <section className="grid gap-8 lg:grid-cols-3">
            {contactMethods.map((method) => (
              <article key={method.title} className={`rounded-3xl border p-8 backdrop-blur text-center relative ${
                method.preferred
                  ? 'border-cyan-400/50 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent'
                  : 'border-white/10 bg-white/5'
              }`}>
                {method.preferred && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-full">
                      Recommended
                    </span>
                  </div>
                )}
                <div className={`w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center ${
                  method.preferred
                    ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20'
                    : 'bg-white/10'
                }`}>
                  <method.icon className={`w-8 h-8 ${
                    method.preferred ? 'text-cyan-400' : 'text-white/80'
                  }`} />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{method.title}</h3>
                <p className="text-white/70 mb-6">{method.description}</p>
                <Link
                  href={method.href}
                  className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all duration-300 ${
                    method.preferred
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                      : 'border border-white/20 bg-white/5 text-white/90 hover:bg-white/10'
                  }`}
                >
                  {method.contact}
                  <Send className="w-4 h-4" />
                </Link>
              </article>
            ))}
          </section>

          {/* Services Overview */}
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">How We Can Help</h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                From strategic planning to technical implementation, we offer comprehensive AI services
                tailored to your organization's needs and goals.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {services.map((service) => (
                <article key={service.title} className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
                  </div>
                  <p className="text-white/70 mb-6 leading-relaxed">{service.description}</p>
                  <ul className="grid grid-cols-2 gap-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span className="text-white/80 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          {/* Response Times */}
          <section className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur text-center">
            <h2 className="text-2xl font-bold text-white mb-8">Response Times & Availability</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <Clock className="w-8 h-8 text-cyan-400 mx-auto" />
                <h3 className="font-semibold text-white">General Inquiries</h3>
                <p className="text-white/70 text-sm">24-48 hours</p>
              </div>
              <div className="space-y-2">
                <Zap className="w-8 h-8 text-yellow-400 mx-auto" />
                <h3 className="font-semibold text-white">Project Consultations</h3>
                <p className="text-white/70 text-sm">1-2 business days</p>
              </div>
              <div className="space-y-2">
                <Users className="w-8 h-8 text-purple-400 mx-auto" />
                <h3 className="font-semibold text-white">Enterprise Inquiries</h3>
                <p className="text-white/70 text-sm">Same business day</p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">Frequently Asked Questions</h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Common questions about our services and engagement process.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              {faqs.map((faq, index) => (
                <article key={index} className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                  <h3 className="text-xl font-semibold text-white mb-4">{faq.question}</h3>
                  <p className="text-white/70 leading-relaxed">{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center space-y-8 py-16 px-8 rounded-4xl border border-white/10 bg-gradient-to-br from-cyan-500/5 via-slate-900 to-slate-950">
            <h2 className="text-4xl font-bold text-white">Start Your AI Transformation Today</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Join forward-thinking organizations that are already building their intelligent future with conscious AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="mailto:hello@frankx.ai?subject=AI%20Strategy%20Consultation"
                className="inline-flex items-center justify-center rounded-xl px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-lg shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transition-all duration-300 hover:-translate-y-1"
              >
                Start the Conversation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/agentic-ai-center"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 text-white/90 font-semibold text-lg transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:-translate-y-1"
              >
                Learn About Our Services
              </Link>
            </div>
          </section>
        </div>
      </main>
</div>
  )
}