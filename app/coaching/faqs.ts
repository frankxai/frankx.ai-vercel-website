// Shared FAQ data — used by both the server page (for JSON-LD) and the client shell (for UI).
// Lives at app/coaching/ so it does not carry a 'use client' boundary.

export const coachingFaqs: { question: string; answer: string }[] = [
  {
    question: 'Who is this coaching for?',
    answer:
      'Technical creators, developers, and founders who want to build production-ready AI systems, grow their creator business, or transform their technical expertise into results. You should have basic programming knowledge and be ready to implement.',
  },
  {
    question: 'What makes this coaching different?',
    answer:
      'I combine deep technical expertise in AI systems (38 agents, 75+ skills in ACOS) with practical creator experience (12,000+ AI songs, 70+ articles). You get hands-on architecture guidance plus strategies that actually work in production.',
  },
  {
    question: 'What tech stack do you work with?',
    answer:
      'I specialize in modern AI stacks: Claude Code, Next.js, TypeScript, Vercel, MCP servers, and agentic frameworks. I help you choose the right tools for your specific goals and constraints.',
  },
  {
    question: 'How do I get started?',
    answer:
      'Submit an application using the form below. Frank reviews every application personally and responds within a few business days. If it looks like a good fit, you will receive a scheduling link to book your first session.',
  },
]
