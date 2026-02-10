/**
 * Homepage Content Configuration
 * SPEC-002: Mobile-First Premium Homepage
 * Brand DNA: Systems Architect × Composer × Gamer × Builder × GenCreator
 */

export const homepageContent = {
  hero: {
    eyebrow: "AI Systems & Creator Tools",
    headline: "Turn Overwhelm Into Systems That Ship Weekly",
    subheadline: "Creation Chronicles delivers one new system, one action, and one asset every week—so your work compounds.",
    primaryCTA: {
      text: "Join Creation Chronicles",
      href: "/creation-chronicles",
      tracking: "hero-primary-cta"
    },
    secondaryCTA: {
      text: "Explore Systems",
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
    sectionSubtitle: "Systems that turn ideas into finished work with steady momentum",
    items: [
      {
        title: "Music Systems",
        subtitle: "AI-Powered Music Creation",
        description: "Genre maps, emotion stacks, and repeatable workflows that turn sessions into finished tracks on schedule.",
        icon: "music",
        href: "/music-lab",
        stats: [
          { label: "Suno Sessions", value: "500+" },
          { label: "Emotion Maps", value: "25+" }
        ],
        color: "cyan"
      },
      {
        title: "AI Systems",
        subtitle: "Enterprise Architecture",
        description: "Oracle-grade architecture, agentic workflows, and production patterns for real-world AI deployments.",
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
        description: "Battle-tested toolkits and operating systems built from real shipping cadence—not theory.",
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
    sectionSubtitle: "Start here. These are the fastest paths to momentum.",
    products: [
      {
        id: "vibe-os",
        badge: "FREE",
        name: "Vibe OS: Music Creation System",
        tagline: "From emotion to finished track in 90 minutes",
        description: "Genre prompts, emotion maps, and production workflows tested across 500+ Suno sessions.",
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
        tagline: "Replace AI panic with shipping systems",
        description: "100+ prompts and 12 automations that cut content creation time in half.",
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
    sectionSubtitle: "Systems, music, and shipping in public",
    viewAllText: "View All Articles",
    viewAllHref: "/blog"
  },

  journey: {
    sectionTitle: "From Signal to Shipping",
    sectionSubtitle: "A smooth path from first signal to full momentum—no overwhelm, just progress.",
    steps: [
      {
        label: "Discover",
        title: "Creation Chronicles",
        description: "Weekly systems + action steps delivered with clarity. Start here to build momentum fast.",
        cta: "Join the dispatch",
        href: "/creation-chronicles"
      },
      {
        label: "Deepen",
        title: "Creator Systems",
        description: "Grab the toolkits and workflows that help you publish consistently without burning out.",
        cta: "Explore systems",
        href: "/products"
      },
      {
        label: "Belong",
        title: "Inner Circle Vault",
        description: "Member-only vault, weekly drops, and live labs designed to compound your output.",
        cta: "Preview the vault",
        href: "/vault"
      },
      {
        label: "Build",
        title: "Labs + Drops",
        description: "Live builds and monthly systems sprints with the FrankX agent collective.",
        cta: "See the labs",
        href: "/labs"
      }
    ]
  },

  cta: {
    headline: "Start with one system this week.",
    subheadline: "Join Creation Chronicles for one new system, one action, and one asset every week. Momentum beats motivation.",
    primaryCTA: {
      text: "Join Creation Chronicles",
      href: "/creation-chronicles",
      tracking: "footer-cta-primary"
    },
    secondaryCTA: {
      text: "Browse Systems",
      href: "/products",
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
