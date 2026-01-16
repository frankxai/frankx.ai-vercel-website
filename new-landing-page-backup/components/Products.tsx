"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const products = [
  {
    name: "Vibe OS",
    tagline: "Your Personal Reality Operating System",
    description: "Transform how you live, create, and manifest. Vibe OS is the consciousness-first framework that turns your daily experience into intentional creation—where your internal state shapes your external reality through systematic soul alignment.",
    benefits: [
      "Design your ideal day from energy states, not just tasks",
      "Transform chaos into flow through reality-bending frameworks",
      "Manifest outcomes by aligning frequency with intentional action"
    ],
    image: "/images/generated-2025-10-24T23-14-35-433Z-buoth2.png",
    color: "from-frankx-blue to-frankx-purple"
  },
  {
    name: "Gen Creator OS",
    tagline: "From Idea to Impact, Systematically",
    description: "The complete workflow system for generative creators who refuse to choose between artistic vision and strategic execution. Transform raw inspiration into polished content across every medium—with frameworks that honor both your creative chaos and your need for results.",
    benefits: [
      "Ship daily without sacrificing quality or sanity",
      "Scale your creative output while maintaining authentic voice",
      "Build systems that amplify creativity instead of constraining it"
    ],
    image: "/images/generated-2025-10-24T23-14-41-859Z-iej8b4.png",
    color: "from-frankx-purple to-frankx-gold"
  },
  {
    name: "Agentic Creator OS",
    tagline: "Your AI Team Awaits Activation",
    description: "Stop working IN your creative business—build autonomous AI agents that work FOR you. Advanced orchestration frameworks that transform you from solo creator into conductor of an intelligent creative enterprise, where AI handles execution while you focus on vision.",
    benefits: [
      "Orchestrate specialized AI agents across your entire workflow",
      "Automate repetitive creative tasks without losing your voice",
      "Scale to enterprise-level output with startup-level resources"
    ],
    image: "/images/generated-2025-10-24T23-14-47-490Z-x19un4.png",
    color: "from-frankx-blue via-frankx-purple to-frankx-blue"
  }
];

export default function Products() {
  return (
    <section id="products" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
            Your Creative Operating System Awaits
          </h2>
          <p className="text-xl text-arcanea-twilight accent-text">
            Choose the framework that matches your evolution
          </p>
        </motion.div>

        <div className="space-y-24">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
            >
              {/* Image */}
              <div className="flex-1">
                <div className="relative w-full aspect-square max-w-md mx-auto">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-6">
                <div>
                  <h3 className="text-4xl md:text-5xl font-bold mb-2">{product.name}</h3>
                  <p className={`text-xl font-semibold bg-gradient-to-r ${product.color} bg-clip-text text-transparent`}>
                    {product.tagline}
                  </p>
                </div>

                <p className="text-lg text-arcanea-twilight leading-relaxed">
                  {product.description}
                </p>

                <ul className="space-y-3">
                  {product.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-frankx-purple flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-arcanea-shadow">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <button className={`px-8 py-3 bg-gradient-to-r ${product.color} text-white rounded-full font-semibold hover:scale-105 transition-transform shadow-lg`}>
                  Explore {product.name}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
