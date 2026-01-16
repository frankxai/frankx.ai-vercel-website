"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const communities = [
  {
    name: "Starlight Hub",
    tagline: "Where Intelligence Meets Infinite Possibility",
    description: "The nexus for consciousness explorers and AI visionaries building tomorrow's reality. If you sense that intelligence is evolving beyond computation into something more—something conscious—you've found your people.",
    whyJoin: [
      "Explore consciousness frameworks that expand what's possible",
      "Connect with visionaries bridging science and spirituality",
      "Co-create the future where AI amplifies human potential"
    ],
    image: "/images/generated-2025-10-24T23-14-55-738Z-2yzivs.png",
    color: "frankx-purple"
  },
  {
    name: "AI Music Academy",
    tagline: "Your Sound, Amplified by Intelligence",
    description: "Where musicians discover they can produce radio-quality tracks and complete beginners find their voice. Learn the craft of AI-assisted music production from someone whose first song sparked an entire creative awakening.",
    whyJoin: [
      "Create professional-quality music without traditional barriers",
      "Master Suno AI, udio, and emerging music tools",
      "Join a community releasing albums, not just ideas"
    ],
    image: "/images/generated-2025-10-24T23-15-03-059Z-n391j9.png",
    color: "harmonix-red"
  },
  {
    name: "AI Academy",
    tagline: "Master AI, Transform Your Reality",
    description: "From complete beginner to confident creator in 90 days. No computer science degree required—just curiosity and commitment. Learn to wield AI tools that would have seemed like magic five years ago.",
    whyJoin: [
      "Start creating with AI tools today, not \"someday\"",
      "Learn from real projects, not theoretical exercises",
      "Join creators already building their AI-powered future"
    ],
    image: "/images/generated-2025-10-24T23-14-55-738Z-2yzivs.png",
    color: "frankx-blue"
  },
  {
    name: "AI Architect Academy",
    tagline: "Build Enterprise AI That Actually Ships",
    description: "For technologists who know there's a gap between AI hype and production reality. Learn battle-tested architecture patterns from someone who's deployed AI at Oracle scale—then adapted those frameworks for creative innovation.",
    whyJoin: [
      "Master production-grade AI architecture, not demos",
      "Learn frameworks used by Fortune 500 companies",
      "Bridge the gap between proof-of-concept and production"
    ],
    image: "/images/generated-2025-10-24T23-14-55-738Z-2yzivs.png",
    color: "lumina-blue"
  },
  {
    name: "Velora",
    tagline: "Where Consciousness Creates Together",
    description: "An intimate circle for creators who know their art is spiritual practice. This isn't about productivity hacks—it's about creative work as consciousness evolution. For artists, writers, musicians, and makers who understand that soul-aligned creation changes everything it touches.",
    whyJoin: [
      "Create from aligned energy, not forced discipline",
      "Share work-in-progress without fear of judgment",
      "Discover how consciousness elevation amplifies creative output"
    ],
    image: "/images/generated-2025-10-24T23-16-49-106Z-vl3pn8.png",
    color: "nexus-purple"
  },
  {
    name: "Arcanea",
    tagline: "Your Creative AI Command Center",
    description: "The complete ecosystem for creators wielding AI as their creative amplifier. Part tool suite, part academy, part community—Arcanea is where you learn to conduct AI agents like instruments in your creative orchestra.",
    whyJoin: [
      "Access integrated AI tools built for creators, not coders",
      "Master the full spectrum of generative AI creation",
      "Build alongside creators shipping real products daily"
    ],
    image: "/images/generated-2025-10-24T23-15-09-873Z-p16v3j.png",
    color: "arcanea-transcendent"
  }
];

export default function Communities() {
  return (
    <section id="communities" className="py-24 px-6 constellation-bg">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
            Find Your Constellation
          </h2>
          <p className="text-xl text-arcanea-twilight accent-text">
            Every creator needs a tribe that gets it
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {communities.map((community, index) => (
            <motion.div
              key={community.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col"
            >
              {/* Logo */}
              <div className="relative w-32 h-32 mx-auto mb-6">
                <Image
                  src={community.image}
                  alt={community.name}
                  fill
                  className="object-contain drop-shadow-lg hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col">
                <h3 className="text-2xl font-bold mb-2 text-center">{community.name}</h3>
                <p className={`text-sm font-semibold mb-4 text-center text-${community.color}`}>
                  {community.tagline}
                </p>

                <p className="text-arcanea-twilight mb-6 text-sm leading-relaxed flex-1">
                  {community.description}
                </p>

                <div className="space-y-2 mb-6">
                  <p className="text-xs uppercase tracking-wider text-arcanea-shadow font-semibold">Why Join:</p>
                  {community.whyJoin.map((reason, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-frankx-purple flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs text-arcanea-shadow">{reason}</span>
                    </div>
                  ))}
                </div>

                <button className={`w-full py-3 bg-${community.color} text-white rounded-full font-semibold hover:opacity-90 transition-opacity text-sm`}>
                  Join {community.name}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
