export type Resource = {
  id: string
  title: string
  description: string
  url: string
  category: string
}

export const resources: Resource[] = [
  {
    id: '1',
    title: 'Awesome ChatGPT Prompts',
    description: 'A collection of prompt examples to be used with the ChatGPT model.',
    url: 'https://github.com/f/awesome-chatgpt-prompts',
    category: 'AI & Machine Learning',
  },
  {
    id: '2',
    title: 'Vercel AI Playground',
    description: 'A playground for experimenting with the Vercel AI SDK.',
    url: 'https://sdk.vercel.ai/',
    category: 'AI & Machine Learning',
  },
  {
    id: '3',
    title: 'Tailwind CSS',
    description: 'A utility-first CSS framework for rapidly building custom designs.',
    url: 'https://tailwindcss.com/',
    category: 'Web Development',
  },
]
