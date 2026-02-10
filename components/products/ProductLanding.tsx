'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Star, Users, Clock, Shield, ArrowRight, Play } from 'lucide-react'

interface ProductData {
  title: string
  subtitle: string
  price: number
  originalPrice?: number
  badge?: string
  hero: {
    headline: string
    subheadline: string
    benefits: string[]
  }
  socialProof: {
    testimonials: Array<{
      text: string
      author: string
      role: string
      company: string
    }>
    stats: Array<{
      number: string
      label: string
    }>
  }
  features: {
    core: Array<{
      title: string
      description: string
      icon: string
    }>
    bonuses: Array<{
      title: string
      value: string
      description: string
    }>
  }
  benefits: {
    sections: Array<{
      title: string
      items: string[]
    }>
  }
  objections: Array<{
    concern: string
    response: string
  }>
  urgency?: {
    type: string
    message: string
    timer?: boolean
  }
  guarantee: {
    period: string
    promise: string
    badge: string
  }
  faq: Array<{
    question: string
    answer: string
  }>
  cta: {
    primary: string
    secondary: string
    afterPurchase: string
  }
}

interface Props {
  product: ProductData
}

export default function ProductLanding({ product }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-slate-950 to-blue-950/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            {product.badge && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm font-medium mb-8"
              >
                <Shield className="w-4 h-4 mr-2" />
                {product.badge}
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-100 via-cyan-200 to-slate-300 bg-clip-text text-transparent"
            >
              {product.hero.headline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl sm:text-2xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              {product.hero.subheadline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4 mb-12"
            >
              {product.hero.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center justify-center text-lg text-slate-200">
                  <Check className="w-6 h-6 text-green-400 mr-3 flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </motion.div>

            {/* Pricing Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="inline-block"
            >
              <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 max-w-md mx-auto">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    {product.originalPrice && (
                      <span className="text-2xl text-slate-400 line-through mr-4">
                        ${product.originalPrice}
                      </span>
                    )}
                    <span className="text-5xl font-bold text-cyan-300">
                      ${product.price}
                    </span>
                  </div>

                  {product.urgency && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-6">
                      <div className="flex items-center justify-center text-red-300 text-sm font-medium">
                        <Clock className="w-4 h-4 mr-2" />
                        {product.urgency.message}
                      </div>
                    </div>
                  )}

                  <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mb-4">
                    {product.cta.primary}
                  </button>

                  <p className="text-slate-400 text-sm">{product.cta.secondary}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {product.socialProof.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold text-cyan-300 mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-8">
            {product.socialProof.testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-xl p-6"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-200 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-slate-100">{testimonial.author}</div>
                  <div className="text-sm text-slate-400">{testimonial.role}</div>
                  <div className="text-sm text-slate-500">{testimonial.company}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-100 to-cyan-200 bg-clip-text text-transparent">
              What You Get Inside
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Every element designed by our Agent Team's collective intelligence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {product.features.core.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-xl p-6 hover:border-cyan-500/30 transition-colors"
              >
                <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-6 h-6 text-cyan-400">
                    {/* Icon would be rendered here based on feature.icon */}
                    <div className="w-full h-full bg-cyan-400 rounded" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-100">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Bonuses */}
          <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-2xl p-8 border border-cyan-500/20">
            <h3 className="text-3xl font-bold text-center mb-8 text-cyan-200">
              Exclusive Bonuses (Limited Time)
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {product.features.bonuses.map((bonus, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-green-400 mb-2">{bonus.value} Value</div>
                  <h4 className="text-lg font-semibold mb-2 text-slate-100">{bonus.title}</h4>
                  <p className="text-slate-300 text-sm">{bonus.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits by Audience */}
      <section className="py-20 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-100 to-cyan-200 bg-clip-text text-transparent">
              Designed for Your Success
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {product.benefits.sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/30 rounded-xl p-8"
              >
                <h3 className="text-2xl font-bold mb-6 text-cyan-300">{section.title}</h3>
                <ul className="space-y-4">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Objections */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-100 to-cyan-200 bg-clip-text text-transparent">
              Common Questions Answered
            </h2>
          </div>

          <div className="space-y-6">
            {product.objections.map((objection, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-xl p-6"
              >
                <h4 className="text-lg font-semibold mb-3 text-red-300">"{objection.concern}"</h4>
                <p className="text-slate-200">{objection.response}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-16 bg-gradient-to-r from-green-900/20 to-emerald-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-green-500/30 rounded-2xl p-8">
            <Shield className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4 text-green-300">{product.guarantee.badge}</h3>
            <p className="text-lg text-slate-200 mb-6">{product.guarantee.promise}</p>
            <div className="text-3xl font-bold text-green-400">{product.guarantee.period} Guarantee</div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-100 to-cyan-200 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {product.faq.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full text-left p-6 font-semibold text-slate-100 hover:bg-slate-700/20 transition-colors"
                >
                  {item.question}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 text-slate-200">
                    {item.answer}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-cyan-900/30 to-blue-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-100 to-cyan-200 bg-clip-text text-transparent">
            Transform Your AI Workflow Today
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of creators who've already transformed their reality with conscious AI
          </p>

          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 max-w-md mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                {product.originalPrice && (
                  <span className="text-2xl text-slate-400 line-through mr-4">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="text-5xl font-bold text-cyan-300">
                  ${product.price}
                </span>
              </div>

              <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mb-4">
                {product.cta.primary}
              </button>

              <p className="text-slate-400 text-sm mb-4">{product.cta.secondary}</p>

              <div className="flex items-center justify-center text-sm text-slate-500">
                <ArrowRight className="w-4 h-4 mr-2" />
                {product.cta.afterPurchase}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}