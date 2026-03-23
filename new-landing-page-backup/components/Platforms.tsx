"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const platforms = [
  {
    name: "Arcanea Studio",
    tagline: "Build Your Creative AI Empire",
    description: "Developer-first platform turning your creative tools into scalable products. Whether you're building AI agents, custom workflows, or entirely new creative applications—Arcanea Studio provides the API infrastructure, orchestration layer, and deployment pipeline to go from prototype to production.",
    features: [
      "Comprehensive API suite for AI agent orchestration",
      "Pre-built templates for common creative workflows",
      "Enterprise-grade security with indie-friendly pricing"
    ],
    image: "/images/generated-2025-10-24T23-15-09-873Z-p16v3j.png",
    color: "from-arcanea-deep to-arcanea-transcendent"
  },
  {
    name: "Starlight Intelligence Studio",
    tagline: "Where Data Becomes Wisdom",
    description: "AI analytics platform that sees patterns humans miss and machines alone can't understand. Combining advanced intelligence frameworks with consciousness-aware analysis to transform raw data into strategic insights. This is business intelligence that honors both logic and intuition.",
    features: [
      "Multi-model AI analysis with consciousness-informed interpretation",
      "Real-time intelligence dashboards for decision acceleration",
      "Predictive frameworks that adapt to your unique reality"
    ],
    image: "/images/generated-2025-10-24T23-16-43-071Z-v8yw5l.png",
    color: "from-frankx-purple via-frankx-gold to-frankx-purple"
  }
];

export default function Platforms() {
  return (
    <section id="platforms" className="py-24 px-6 bg-gradient-to-b from-white to-arcanea-void/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
            The Infrastructure of Imagination
          </h2>
          <p className="text-xl text-arcanea-twilight accent-text">
            Enterprise-grade platforms powering creative revolution
          </p>
        </motion.div>

        <div className="space-y-16">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-3xl p-12 shadow-2xl hover:shadow-3xl transition-shadow duration-300"
            >
              <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}>
                {/* Image */}
                <div className="flex-1">
                  <div className="relative w-full aspect-video max-w-xl mx-auto">
                    <Image
                      src={platform.image}
                      alt={platform.name}
                      fill
                      className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-6">
                  <div>
                    <h3 className="text-4xl md:text-5xl font-bold mb-2">{platform.name}</h3>
                    <p className={`text-xl font-semibold bg-gradient-to-r ${platform.color} bg-clip-text text-transparent`}>
                      {platform.tagline}
                    </p>
                  </div>

                  <p className="text-lg text-arcanea-twilight leading-relaxed">
                    {platform.description}
                  </p>

                  <div className="space-y-3">
                    <p className="text-sm uppercase tracking-wider text-arcanea-shadow font-semibold">Key Features:</p>
                    {platform.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <svg className="w-6 h-6 text-frankx-gold flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-arcanea-shadow">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <button className={`px-8 py-3 bg-gradient-to-r ${platform.color} text-white rounded-full font-semibold hover:scale-105 transition-transform shadow-lg`}>
                      Explore Platform
                    </button>
                    <button className="px-8 py-3 border-2 border-frankx-purple text-frankx-purple rounded-full font-semibold hover:bg-frankx-purple hover:text-white transition-colors">
                      View Docs
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
