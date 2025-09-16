'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  ArrowRight, 
  Sparkles, 
  Users, 
  Rocket, 
  Brain, 
  Code, 
  Heart, 
  Headphones, 
  Zap,
  CheckCircle,
  Lightbulb 
} from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const audienceCards = [
  {
    icon: Users,
    title: "Family & Friends",
    description: "Understand AI's impact on our future and how to thrive alongside technology while staying human",
    color: "from-blue-50 to-indigo-50",
    iconColor: "text-blue-600"
  },
  {
    icon: Rocket,
    title: "Founders & Entrepreneurs", 
    description: "Build AI-powered businesses that create genuine value while maintaining authentic human connection",
    color: "from-purple-50 to-pink-50",
    iconColor: "text-purple-600"
  },
  {
    icon: Brain,
    title: "Students & Young Professionals",
    description: "Future-proof your career by mastering AI collaboration while developing uniquely human skills",
    color: "from-green-50 to-emerald-50", 
    iconColor: "text-green-600"
  },
  {
    icon: Code,
    title: "Tech Professionals",
    description: "Evolve from technical expertise to conscious technology leadership that serves humanity",
    color: "from-orange-50 to-red-50",
    iconColor: "text-orange-600"
  }
]

const pillars = [
  {
    icon: Brain,
    title: "Technical Mastery",
    description: "Understand AI deeply — not just surface level. Know how it works, its limitations, and its true potential.",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: Heart,
    title: "Soul Alignment", 
    description: "Every technology decision should amplify your authentic self and serve your highest purpose.",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: Sparkles,
    title: "Creative Expression",
    description: "Use AI as a creative partner to manifest ideas you couldn't bring to life alone.",
    color: "from-green-500 to-green-600"
  }
]

const musicFeatures = [
  {
    icon: Headphones,
    title: "Learn Music Creation",
    description: "No musical background needed — AI helps you express through sound"
  },
  {
    icon: Heart,
    title: "Healing Frequencies", 
    description: "Create music that transforms consciousness and elevates vibration"
  },
  {
    icon: Zap,
    title: "Commercial Success",
    description: "Turn your creations into income streams on Spotify and beyond"
  }
]

const resources = [
  {
    icon: Sparkles,
    title: "Soul Frequency Assessment",
    description: "7-minute blueprint for your intelligence operating system",
    href: "/soul-frequency-assessment",
    tag: "New",
    color: "text-purple-600"
  },
  {
    icon: Heart,
    title: "Soul Frequency Quiz",
    description: "Discover your unique creator archetype",
    href: "/soul-frequency-quiz",
    tag: "Assessment",
    color: "text-fuchsia-600"
  },
  {
    icon: Users,
    title: "AI Basics for Families",
    description: "Simple guide to understanding AI impact",
    href: "/family-guide",
    tag: "Guide",
    color: "text-blue-600"
  },
  {
    icon: Rocket,
    title: "Founder's AI Playbook",
    description: "Build conscious AI-powered businesses",
    href: "/founder-playbook", 
    tag: "Strategy",
    color: "text-green-600"
  },
  {
    icon: Brain,
    title: "Weekly Insights",
    description: "Deep dives into AI and consciousness",
    href: "/insights",
    tag: "Newsletter",
    color: "text-orange-600"
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        </div>
        
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center px-4 py-2 bg-purple-50 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-purple-600 mr-2" />
              <span className="text-sm font-medium text-purple-700">Enterprise AI Architect × Conscious Creator</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Hi, I'm Frank — I Bridge{' '}
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Technology & Soul
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              After 15+ years architecting enterprise AI systems, I discovered something profound: 
              Technology should amplify human creativity, not replace it. I help creators, founders, 
              and professionals use AI as a tool for authentic expression and meaningful impact.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/soul-frequency-quiz" 
                className="inline-flex items-center px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Discover Your Creator Archetype
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link 
                href="/blog" 
                className="inline-flex items-center px-8 py-4 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
              >
                Start Your Journey
                <Lightbulb className="ml-2 w-5 h-5" />
              </Link>
            </div>
            
            {/* Social Proof */}
            <div className="flex items-center justify-center gap-8 mt-12">
              {[
                { value: "15+", label: "Years in AI" },
                { value: "500+", label: "Songs Created" },
                { value: "1000+", label: "Lives Impacted" },
                { value: "∞", label: "Possibilities" }
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Audience Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">This Journey Is For You If...</h2>
            <p className="text-xl text-gray-600">Whether you're family, a founder, student, or professional — there's something here for you</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {audienceCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`p-6 bg-gradient-to-br ${card.color} rounded-xl`}
              >
                <card.icon className={`w-10 h-10 ${card.iconColor} mb-4`} />
                <h3 className="font-bold mb-2">{card.title}</h3>
                <p className="text-sm text-gray-600">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">My Journey: From Corporate AI to Conscious Creation</h2>
            
            <div className="space-y-4 text-gray-600">
              <p>
                For over 15 years, I've been architecting AI systems for some of the world's largest enterprises. 
                I've seen AI at its most powerful — and its most soulless.
              </p>
              
              <p>
                The turning point came when I realized: <strong className="text-gray-900">We're building incredibly intelligent systems, 
                but we're forgetting to include the human soul in the equation.</strong>
              </p>
              
              <p>
                So I started experimenting. I created 500+ songs using AI. I built systems that amplify creativity 
                rather than replace it. I discovered that technology and consciousness aren't opposites — they can 
                dance together beautifully.
              </p>
              
              <p>
                Now, I share what I've learned with creators, founders, families, and professionals who want to 
                thrive in the AI age without losing their humanity. This isn't about choosing between technology 
                and soul — it's about integrating both.
              </p>
              
              <div className="bg-purple-50 border-l-4 border-purple-500 p-4 my-6">
                <p className="italic text-purple-900">
                  "Technology is best when it brings people together, amplifies our creativity, 
                  and helps us express our deepest truths."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">The Three Pillars of Conscious AI</h2>
            <p className="text-xl text-gray-600">My framework for thriving with technology</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${pillar.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <pillar.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">{pillar.title}</h3>
                <p className="text-gray-600">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Music Lab Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-4">The Music Lab: Where AI Meets Soul</h2>
            <p className="text-xl mb-8 opacity-90">
              500+ songs created, each one a bridge between technology and consciousness
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
              {musicFeatures.map((feature, index) => (
                <div key={feature.title} className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                  <feature.icon className="w-10 h-10 mx-auto mb-4" />
                  <h3 className="font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm opacity-80">{feature.description}</p>
                </div>
              ))}
            </div>
            
            <Link 
              href="/music-lab" 
              className="inline-flex items-center px-8 py-4 bg-white text-purple-900 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Explore the Music Lab
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Resources for Your Journey</h2>
            <p className="text-xl text-gray-600">Free tools and insights to begin your transformation</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link 
                  href={resource.href} 
                  className="block bg-gray-50 rounded-xl p-6 hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className={`text-xs font-semibold ${resource.color} mb-2`}>{resource.tag}</div>
                  <resource.icon className={`w-8 h-8 ${resource.color} mb-3`} />
                  <h3 className="font-bold mb-2">{resource.title}</h3>
                  <p className="text-sm text-gray-600">{resource.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Join a Community of Conscious Creators</h2>
            <p className="text-xl text-gray-600 mb-12">
              Together, we're pioneering a new relationship between humanity and AI
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                { value: "1000+", label: "Conscious creators worldwide" },
                { value: "50+", label: "Countries represented" },
                { value: "∞", label: "Possibilities being created" }
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-4xl font-bold text-purple-600 mb-2">{stat.value}</div>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
            
            <Link 
              href="/community" 
              className="inline-flex items-center px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Join the Movement
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Your Journey to Conscious AI Starts Here</h2>
          <p className="text-xl mb-8 opacity-90">
            Whether you're here to future-proof your career, build a business, or simply understand 
            what's coming — you belong here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/soul-frequency-quiz" 
              className="inline-flex items-center px-8 py-4 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Take the Free Assessment
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link 
              href="/blog" 
              className="inline-flex items-center px-8 py-4 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors font-semibold"
            >
              Read My Insights
              <Sparkles className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
