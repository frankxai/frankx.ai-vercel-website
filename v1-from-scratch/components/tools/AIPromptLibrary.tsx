'use client'

import { useState } from 'react'

type Prompt = {
  id: string
  title: string
  category: string
  model: string[]
  prompt: string
  description: string
  useCase: string
}

const PROMPTS: Prompt[] = [
  {
    id: 'code-review',
    title: 'Comprehensive Code Review',
    category: 'Development',
    model: ['Claude', 'ChatGPT'],
    prompt: `Review this code for:
1. Bugs and logic errors
2. Performance issues
3. Security vulnerabilities
4. Best practices and conventions
5. Readability and maintainability

For each issue found, explain:
- What the problem is
- Why it matters
- How to fix it

Code:
[PASTE YOUR CODE HERE]`,
    description: 'Get thorough code reviews with actionable feedback',
    useCase: 'Use before committing code or during PR reviews',
  },
  {
    id: 'technical-writer',
    title: 'Technical Documentation Writer',
    category: 'Writing',
    model: ['Claude', 'ChatGPT'],
    prompt: `Act as a technical writer. Create clear, comprehensive documentation for:

[DESCRIBE WHAT NEEDS DOCUMENTATION]

Include:
- Overview and purpose
- Prerequisites
- Step-by-step instructions
- Code examples
- Common pitfalls and troubleshooting
- Best practices

Target audience: [Junior/Mid/Senior] developers
Tone: Professional but approachable`,
    description: 'Generate clear technical documentation',
    useCase: 'Creating docs for APIs, libraries, or internal tools',
  },
  {
    id: 'bug-debugger',
    title: 'Systematic Bug Debugger',
    category: 'Development',
    model: ['Claude', 'ChatGPT'],
    prompt: `I'm encountering a bug. Help me debug it systematically.

Bug description:
[DESCRIBE THE BUG]

Expected behavior:
[WHAT SHOULD HAPPEN]

Actual behavior:
[WHAT ACTUALLY HAPPENS]

Code:
[RELEVANT CODE]

Error messages:
[PASTE ERROR MESSAGES]

Please:
1. Identify the root cause
2. Explain why it's happening
3. Provide a step-by-step fix
4. Suggest how to prevent similar bugs`,
    description: 'Debug issues with systematic analysis',
    useCase: 'When stuck on a tricky bug',
  },
  {
    id: 'ui-designer',
    title: 'UI Component Designer',
    category: 'Design',
    model: ['Claude', 'ChatGPT'],
    prompt: `Design a UI component with the following requirements:

Component type: [Button/Card/Form/etc.]
Purpose: [WHAT IT DOES]
Design system: [Tailwind/MUI/etc.]
Style: [Modern/Minimal/Bold/etc.]

Provide:
1. Component structure and hierarchy
2. Complete code implementation
3. Accessibility considerations
4. Responsive behavior
5. Interactive states (hover, active, disabled)
6. Usage examples`,
    description: 'Design and implement UI components',
    useCase: 'Building new interface components',
  },
  {
    id: 'blog-outline',
    title: 'Technical Blog Outliner',
    category: 'Writing',
    model: ['Claude', 'ChatGPT'],
    prompt: `Create a detailed outline for a technical blog post about:

Topic: [YOUR TOPIC]

Target audience: [WHO'S READING]
Goal: [WHAT READERS SHOULD LEARN]
Length: [~1500/3000/5000 words]

Structure the outline with:
- Compelling headline
- Hook (first paragraph)
- Main sections with key points
- Code examples or demos needed
- Conclusion with takeaways
- Call to action

Make it practical and actionable, not theoretical.`,
    description: 'Plan technical blog posts with clear structure',
    useCase: 'Before writing technical articles',
  },
  {
    id: 'refactor-advisor',
    title: 'Code Refactoring Advisor',
    category: 'Development',
    model: ['Claude', 'ChatGPT'],
    prompt: `This code works but needs refactoring. Suggest improvements for:
1. Code organization and structure
2. Naming and clarity
3. Reducing complexity
4. Removing duplication
5. Modern patterns and best practices

Current code:
[PASTE CODE]

For each suggestion:
- Show before/after examples
- Explain the benefit
- Note any tradeoffs`,
    description: 'Get refactoring suggestions with examples',
    useCase: 'Improving working but messy code',
  },
  {
    id: 'api-designer',
    title: 'REST API Designer',
    category: 'Development',
    model: ['Claude', 'ChatGPT'],
    prompt: `Design a REST API for:

Purpose: [WHAT THE API DOES]
Main entities: [User, Post, etc.]
Key operations: [Create, read, update, etc.]

Provide:
1. Endpoint structure (paths and methods)
2. Request/response formats
3. Status codes and error handling
4. Authentication approach
5. Rate limiting considerations
6. Example curl commands

Follow REST best practices and conventions.`,
    description: 'Design clean, RESTful APIs',
    useCase: 'Planning new API endpoints',
  },
  {
    id: 'data-structure',
    title: 'Data Structure Advisor',
    category: 'Development',
    model: ['Claude', 'ChatGPT'],
    prompt: `I need to choose the right data structure for:

Use case: [DESCRIBE WHAT YOU'RE BUILDING]
Operations needed: [Insert, search, delete, etc.]
Data size: [~100/10K/1M items]
Performance priority: [Time/Space/Both]

Recommend:
1. Best data structure(s) for this use case
2. Time/space complexity analysis
3. Implementation approach
4. Tradeoffs to consider
5. When to switch to a different structure`,
    description: 'Choose optimal data structures',
    useCase: 'Architecting performant systems',
  },
]

const CATEGORIES = ['All', ...new Set(PROMPTS.map(p => p.category))]
const MODELS = ['All', ...new Set(PROMPTS.flatMap(p => p.model))]

export function AIPromptLibrary() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedModel, setSelectedModel] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const filteredPrompts = PROMPTS.filter(prompt => {
    const matchesCategory = selectedCategory === 'All' || prompt.category === selectedCategory
    const matchesModel = selectedModel === 'All' || prompt.model.includes(selectedModel)
    const matchesSearch = searchQuery === '' ||
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.category.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesModel && matchesSearch
  })

  const copyToClipboard = (promptId: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(promptId)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="space-y-4">
        {/* Search */}
        <div>
          <input
            type="text"
            placeholder="Search prompts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors"
          />
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-400">
            Category
          </label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-cyan-500 text-slate-950'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Model Filter */}
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-400">
            AI Model
          </label>
          <div className="flex flex-wrap gap-2">
            {MODELS.map((model) => (
              <button
                key={model}
                onClick={() => setSelectedModel(model)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  selectedModel === model
                    ? 'bg-cyan-500 text-slate-950'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {model}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-slate-400 text-sm">
        Showing {filteredPrompts.length} of {PROMPTS.length} prompts
      </div>

      {/* Prompts List */}
      <div className="space-y-6">
        {filteredPrompts.map((prompt) => (
          <article
            key={prompt.id}
            className="rounded-lg border border-slate-700 bg-slate-900/50 p-6 hover:border-cyan-500/50 transition-colors"
          >
            {/* Header */}
            <div className="mb-4">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-white">
                  {prompt.title}
                </h3>
                <div className="flex gap-2">
                  {prompt.model.map((model) => (
                    <span
                      key={model}
                      className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-400"
                    >
                      {model}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-slate-400 text-sm mb-2">{prompt.description}</p>
              <p className="text-slate-500 text-xs">
                <span className="font-medium">Use case:</span> {prompt.useCase}
              </p>
            </div>

            {/* Prompt */}
            <div className="relative">
              <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-sm text-slate-300 font-mono leading-relaxed">
                {prompt.prompt}
              </pre>
              <button
                onClick={() => copyToClipboard(prompt.id, prompt.prompt)}
                className="absolute top-3 right-3 px-3 py-1.5 bg-slate-800 hover:bg-cyan-600 text-slate-400 hover:text-white text-xs font-medium rounded transition-colors"
              >
                {copiedId === prompt.id ? '✓ Copied!' : '📋 Copy'}
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* No Results */}
      {filteredPrompts.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <p className="text-lg mb-2">No prompts found</p>
          <p className="text-sm">Try adjusting your filters or search query</p>
        </div>
      )}
    </div>
  )
}
