/**
 * Homepage Content Configuration
 * SPEC-002: Mobile-First Premium Homepage
 * Brand DNA: Systems Architect × Composer × Gamer × Builder × GenCreator
 */

export const homepageContent = {
  hero: {
    eyebrow: "AI Systems & Creator Tools",
    headline: "Build AI-Powered Creator Systems That Actually Ship",
    subheadline: "Practical AI tools, music production systems, and digital products for creators who ship.",
    primaryCTA: {
      text: "Get Free Creator Toolkit",
      href: "/products/creative-ai-toolkit",
      tracking: "hero-primary-cta"
    },
    secondaryCTA: {
      text: "Explore Products",
      href: "/products",
      tracking: "hero-secondary-cta"
    },
    trustIndicators: [
      {
        icon: "music",
        text: "AI Songs Created",
        value: "12,000+"
      },
      {
        icon: "building",
        text: "Oracle AI Architect"
      },
      {
        icon: "users",
        text: "Creators Helped",
        value: "1,000+"
      },
      {
        icon: "server",
        text: "Enterprise Systems"
      }
    ]
  },

  whatIBuild: {
    sectionTitle: "What I Build",
    sectionSubtitle: "Three focus areas where AI meets creative execution",
    items: [
      {
        title: "Music Systems",
        subtitle: "AI-Powered Music Creation",
        description: "500+ Suno sessions documented. Genre-specific prompts, emotion mapping, and production workflows that ship finished tracks weekly.",
        icon: "music",
        href: "/music-lab",
        stats: [
          { label: "Tracks Created", value: "500+" },
          { label: "Genre Templates", value: "50+" }
        ],
        color: "cyan"
      },
      {
        title: "AI Systems",
        subtitle: "Enterprise Architecture",
        description: "Oracle-grade AI systems design. Agentic workflows, multi-agent orchestration, and production patterns for real-world deployments.",
        icon: "server",
        href: "/ai-architecture",
        stats: [
          { label: "Enterprise Clients", value: "Oracle" },
          { label: "Agent Patterns", value: "15+" }
        ],
        color: "emerald"
      },
      {
        title: "Digital Products",
        subtitle: "Creator Tools & Systems",
        description: "Battle-tested toolkits, prompt libraries, and operating systems. Everything I use to ship content, music, and code consistently.",
        icon: "package",
        href: "/products",
        stats: [
          { label: "Products Launched", value: "6" },
          { label: "Downloads", value: "1,000+" }
        ],
        color: "violet"
      }
    ]
  },

  featuredProducts: {
    sectionTitle: "Featured Products",
    sectionSubtitle: "Start with these. Everything I wish I had when I started.",
    products: [
      {
        id: "vibe-os",
        badge: "FREE",
        name: "Vibe OS: Music Creation System",
        tagline: "From emotion to finished track in 90 minutes",
        description: "50+ genre prompts, emotion mapping, and production workflows tested across 500+ Suno sessions.",
        href: "/products/vibe-os",
        color: "cyan",
        stats: [
          { label: "Genre Prompts", value: "50+" },
          { label: "Emotion Maps", value: "25" },
          { label: "Production Guides", value: "10+" }
        ]
      },
      {
        id: "creative-ai-toolkit",
        badge: "MOST POPULAR",
        name: "Creative AI Toolkit",
        tagline: "Replace AI panic with proven workflows",
        description: "100+ battle-tested prompts and 12 automations that cut content creation time in half.",
        href: "/products/creative-ai-toolkit",
        color: "emerald",
        stats: [
          { label: "Prompts", value: "100+" },
          { label: "Automations", value: "12" },
          { label: "Time Saved", value: "50%" }
        ]
      }
    ]
  },

  latestContent: {
    sectionTitle: "Latest Articles",
    sectionSubtitle: "AI systems, music creation, and building in public",
    viewAllText: "View All Articles",
    viewAllHref: "/blog"
  },

  cta: {
    headline: "Start where you are.",
    subheadline: "Whether you're learning AI, creating music, or building systems—there's something here for you. All of it is open.",
    primaryCTA: {
      text: "Pick Your Path",
      href: "/start",
      tracking: "footer-cta-primary"
    },
    secondaryCTA: {
      text: "Browse Resources",
      href: "/resources",
      tracking: "footer-cta-secondary"
    }
  },

  social: {
    links: [
      {
        platform: "LinkedIn",
        href: "https://linkedin.com/in/frank-x-riemer/",
        icon: "linkedin"
      },
      {
        platform: "GitHub",
        href: "https://github.com/frankxai",
        icon: "github"
      },
      {
        platform: "Suno",
        href: "https://suno.com/@frankx",
        icon: "music"
      },
      {
        platform: "Twitter",
        href: "https://x.com/frankxeth",
        icon: "twitter"
      }
    ]
  }
}

export type HomepageContent = typeof homepageContent
