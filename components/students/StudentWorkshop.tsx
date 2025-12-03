'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import LocalStorageTextarea from './LocalStorageTextarea'
import PromptBox from './PromptBox'
import ExportActions from './ExportActions'
import SidebarNav from './SidebarNav'
import { ArrowRight, BookOpen, Users, Lightbulb, Target, Share2 } from 'lucide-react'

export default function StudentWorkshop() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-primary-500/30">
            {/* How to use strip */}
            <div className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-600 text-xs text-white">1</span>
                        <span>Fill</span>
                        <ArrowRight className="h-4 w-4 text-slate-600" />
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-xs text-slate-400">2</span>
                        <span>Export</span>
                        <ArrowRight className="h-4 w-4 text-slate-600" />
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-xs text-slate-400">3</span>
                        <span>Share</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="hidden text-xs text-slate-500 sm:inline-block">Your data stays in your browser</span>
                        <ExportActions />
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-12 lg:flex-row">
                    {/* Sidebar */}
                    <SidebarNav />

                    {/* Main Content */}
                    <main className="flex-1 space-y-24">
                        {/* Welcome / Hero */}
                        <section id="welcome" className="space-y-8">
                            <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl lg:p-12">
                                <div className="inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-300">
                                    The 3Cs · Collaboration · Communication · Creation
                                </div>
                                <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                                    Find Your Edge in the <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-emerald-400">
                                        Age of Intelligence
                                    </span>
                                </h1>
                                <p className="mt-6 max-w-2xl text-lg text-slate-400 leading-relaxed">
                                    Discover your ikigai, translate it into role tracks, and build an AI-accelerated portfolio.
                                    This workshop helps you create a 30/60/90 day plan and the social signal to stand out.
                                </p>

                                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                    {[
                                        { label: 'Outcome', desc: 'Ikigai & Role Targets', icon: Target },
                                        { label: 'Plan', desc: '30/60/90 Roadmap', icon: BookOpen },
                                        { label: 'Portfolio', desc: '2-3 High-Signal Projects', icon: Lightbulb },
                                        { label: 'Signal', desc: 'Bio & Content Calendar', icon: Users },
                                    ].map((item) => (
                                        <div key={item.label} className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                                            <item.icon className="mb-3 h-5 w-5 text-primary-400" />
                                            <div className="font-bold text-slate-200">{item.label}</div>
                                            <div className="text-sm text-slate-500">{item.desc}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Ikigai */}
                        <section id="ikigai" className="scroll-mt-24 space-y-8">
                            <div className="flex items-center justify-between">
                                <h2 className="text-3xl font-bold text-white">Ikigai Finder</h2>
                                <span className="text-sm text-slate-500">Step 1 of 6</span>
                            </div>

                            <div className="grid gap-8 lg:grid-cols-2">
                                <div className="space-y-6">
                                    <LocalStorageTextarea
                                        storageKey="ikigai.love"
                                        label="What I love"
                                        placeholder="What activities energize you? Problems you enjoy?"
                                    />
                                    <LocalStorageTextarea
                                        storageKey="ikigai.good"
                                        label="What I'm good at"
                                        placeholder="Skills/habits others recognize in you"
                                    />
                                    <LocalStorageTextarea
                                        storageKey="ikigai.pays"
                                        label="What pays"
                                        placeholder="Markets, roles, and problems businesses pay to solve"
                                    />
                                    <LocalStorageTextarea
                                        storageKey="ikigai.needs"
                                        label="What the world needs"
                                        placeholder="Who benefits? What positive impact?"
                                    />
                                    <div className="rounded-xl border border-primary-500/30 bg-primary-500/5 p-6">
                                        <LocalStorageTextarea
                                            storageKey="ikigai.statement"
                                            label="Ikigai Statement (2-3 lines)"
                                            placeholder="E.g., I help [who] achieve [outcome] by [how], using [skills] in [domain]."
                                            className="font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                                        <h3 className="font-semibold text-white">AI Prompts for Ikigai</h3>
                                        <p className="mt-2 text-sm text-slate-400">Use with ChatGPT, Claude, or Gemini.</p>

                                        <PromptBox
                                            label="Discovery Prompt"
                                            promptText="Act as a career coach. Ask me questions to map my ikigai (what I love, what I'm good at, what pays, what the world needs). Then summarize my top 3 intersections and suggest 5 role directions tailored to my profile."
                                        />

                                        <PromptBox
                                            label="Synthesis Prompt"
                                            promptText={`I will provide answers to:
1) What I love, 2) What I'm good at, 3) What pays, 4) What the world needs.
Output:
a) A 2-3 line ikigai statement.
b) 3 role options with skill stacks.
c) 10 skills to build, priority ordered.
d) 5 starter projects with scope and evaluation ideas.`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Analysis */}
                        <section id="analysis" className="scroll-mt-24 space-y-8">
                            <h2 className="text-3xl font-bold text-white">Personality & Interest Analysis</h2>
                            <div className="grid gap-8 lg:grid-cols-2">
                                <div className="space-y-6">
                                    <LocalStorageTextarea
                                        storageKey="analysis.source"
                                        label="Source Text (Redacted)"
                                        placeholder="Paste cleaned text from your notes or chat exports here..."
                                    />
                                    <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-200">
                                        <strong>Privacy First:</strong> Do not paste confidential materials. Prefer summaries. You control what you share with AI tools.
                                    </div>
                                </div>
                                <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                                    <h3 className="font-semibold text-white">Analysis Prompts</h3>
                                    <PromptBox
                                        label="Psychologist Persona"
                                        promptText={`You are an industrial-organizational psychologist. Analyze the following text for values, motivators, personality traits (Big Five-style), preferred work modes, and recurring interests. Return:
1) Top 5 strengths with evidence quotes
2) 3 watchouts (risks or blind spots)
3) 5 recurring themes mapped to skill areas`}
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Roles */}
                        <section id="roles" className="scroll-mt-24 space-y-8">
                            <h2 className="text-3xl font-bold text-white">Role & Company Navigator</h2>
                            <div className="grid gap-8 lg:grid-cols-2">
                                <div className="space-y-6">
                                    <LocalStorageTextarea
                                        storageKey="roles.tracks"
                                        label="Target Role Tracks"
                                        placeholder="e.g., AI Architect, AI Product, AI/LLM Engineer, Data/ML Engineer..."
                                    />
                                    <LocalStorageTextarea
                                        storageKey="roles.companies"
                                        label="Target Companies (15 ideas)"
                                        placeholder="Group across: hyperscalers, model labs, tooling, startups, domain leaders..."
                                    />
                                </div>
                                <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                                    <h3 className="font-semibold text-white">Navigator Prompt</h3>
                                    <PromptBox
                                        promptText={`Given my ikigai and themes, propose 3 role tracks with:
- skill stacks,
- day-in-the-life,
- ramp plan.
Include both AI roles (AI Architect, AI Product) and non-AI roles using AI (Marketing Ops, RevOps). Then list 15 target companies across hyperscalers, model labs, tooling, startups, and domain leaders (with why they fit me).`}
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Plan */}
                        <section id="plan" className="scroll-mt-24 space-y-8">
                            <h2 className="text-3xl font-bold text-white">30/60/90-Day Plan</h2>
                            <div className="grid gap-6 lg:grid-cols-3">
                                {['30', '60', '90'].map((day) => (
                                    <div key={day} className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/30 p-6">
                                        <h3 className="text-xl font-bold text-primary-400">{day} Days</h3>
                                        <LocalStorageTextarea storageKey={`plan.${day}.learn`} label="Learn (3 resources)" className="text-sm" />
                                        <LocalStorageTextarea storageKey={`plan.${day}.build`} label="Build (1 project)" className="text-sm" />
                                        <LocalStorageTextarea storageKey={`plan.${day}.publish`} label="Publish (1 post)" className="text-sm" />
                                        <LocalStorageTextarea storageKey={`plan.${day}.network`} label="Network (outreach)" className="text-sm" />
                                    </div>
                                ))}
                            </div>
                            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                                <PromptBox
                                    label="Planning Prompt"
                                    promptText={`Create a 30/60/90 plan aligned to my role track. For each phase include:
- Learning (specific courses/resources)
- Building (2 concrete build tasks)
- Publishing (public deliverables)
- Networking (specific outreach)
Constrain for realistic weekly time and add checkpoints with success criteria.`}
                                />
                            </div>
                        </section>

                        {/* Portfolio */}
                        <section id="portfolio" className="scroll-mt-24 space-y-8">
                            <h2 className="text-3xl font-bold text-white">Portfolio Generator</h2>
                            <div className="grid gap-8 lg:grid-cols-2">
                                <div className="space-y-6">
                                    <LocalStorageTextarea
                                        storageKey="portfolio.ideas"
                                        label="My Selected Project Ideas"
                                        placeholder="List your chosen projects (Beginner / Intermediate / Advanced)"
                                    />
                                    <LocalStorageTextarea
                                        storageKey="portfolio.spec"
                                        label="Project Spec"
                                        placeholder={`[Project Name]
One-liner:
User story:
Core features:
Dataset/API:
Evaluation approach:
Extensibility idea:`}
                                    />
                                    <div className="flex gap-4">
                                        <a href="https://replit.com/" target="_blank" className="text-sm font-medium text-primary-400 hover:text-primary-300">Open Replit &rarr;</a>
                                        <a href="https://github.com/new" target="_blank" className="text-sm font-medium text-primary-400 hover:text-primary-300">Create GitHub Repo &rarr;</a>
                                    </div>
                                </div>
                                <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                                    <PromptBox
                                        label="Portfolio Prompt"
                                        promptText={`Propose 5 portfolio project ideas at beginner/intermediate/advanced levels relevant to my target track. For each include:
- one-liner
- user story
- core features
- dataset/API
- evaluation approach
- extensibility idea
End with a 5-sentence case study template I can fill.`}
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Social */}
                        <section id="social" className="scroll-mt-24 space-y-8">
                            <h2 className="text-3xl font-bold text-white">Social Positioning</h2>
                            <div className="grid gap-8 lg:grid-cols-2">
                                <div className="space-y-6">
                                    <LocalStorageTextarea storageKey="social.headline" label="LinkedIn Headline" placeholder="[Role/Goal] | [Domain/Tech] | [Outcome]" />
                                    <LocalStorageTextarea storageKey="social.bio" label="Short Bio" placeholder="2-3 sentences" />
                                    <LocalStorageTextarea storageKey="social.pillars" label="Topic Pillars (5)" />
                                    <LocalStorageTextarea storageKey="social.calendar" label="4-Week Content Calendar" />
                                    <LocalStorageTextarea storageKey="social.pitch" label="Elevator Pitch (30s)" />
                                    <LocalStorageTextarea storageKey="social.outreach" label="Cold Outreach Message" />
                                </div>
                                <div className="space-y-6">
                                    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                                        <PromptBox
                                            label="Positioning Prompt"
                                            promptText="Write a LinkedIn headline (max 220 chars), a 2-3 sentence bio, 5 topic pillars, and a 4-week content calendar (2 posts/week) tailored to my target role and companies. Keep tone credible and beginner-friendly."
                                        />
                                    </div>
                                    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                                        <PromptBox
                                            label="Outreach Prompt"
                                            promptText="Draft a 30-second elevator pitch and one cold outreach message to a hiring manager/founder. Make it specific to my projects and the company's current priorities. Include a compelling ask."
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Agent */}
                        <section id="agent" className="scroll-mt-24 space-y-8">
                            <h2 className="text-3xl font-bold text-white">Custom GPT / Agent</h2>
                            <div className="grid gap-8 lg:grid-cols-2">
                                <LocalStorageTextarea
                                    storageKey="agent.spec"
                                    label="Agent Spec"
                                    placeholder={`[Problem]
[User persona]
[Capabilities]
[System prompt]
[Tools/APIs]
[Docs/Retrieval]
[Guardrails]
[Test cases]
[Demo script]
[Metrics]`}
                                />
                                <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                                    <PromptBox
                                        label="Agent Design Prompt"
                                        promptText="Design a Custom GPT/Agent: define problem, user persona, capabilities, system prompt, tools/APIs, guardrails, test cases, and a demo script. Suggest how to publish/demo it and what metrics to track (quality, speed, cost, adoption)."
                                    />
                                    <div className="mt-4 flex flex-wrap gap-4 text-sm">
                                        <a href="https://chat.openai.com/gpts" target="_blank" className="text-primary-400 hover:underline">Create Custom GPT</a>
                                        <a href="https://replit.com/@replit/agents" target="_blank" className="text-primary-400 hover:underline">Replit Agents</a>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Resources */}
                        <section id="resources" className="scroll-mt-24 space-y-8 pb-24">
                            <h2 className="text-3xl font-bold text-white">Resource Library</h2>
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                <ResourceCard title="Foundations">
                                    <ResourceLink href="https://www.deeplearning.ai/short-courses/">DeepLearning.AI short courses</ResourceLink>
                                    <ResourceLink href="https://course.fast.ai/">fast.ai Practical Deep Learning</ResourceLink>
                                    <ResourceLink href="https://web.stanford.edu/class/cs224n/">Stanford CS224N</ResourceLink>
                                    <ResourceLink href="https://fullstackdeeplearning.com/">Full Stack Deep Learning</ResourceLink>
                                </ResourceCard>
                                <ResourceCard title="LLM Engineering">
                                    <ResourceLink href="https://platform.openai.com/docs">OpenAI Docs</ResourceLink>
                                    <ResourceLink href="https://docs.anthropic.com/">Anthropic Docs</ResourceLink>
                                    <ResourceLink href="https://python.langchain.com/">LangChain</ResourceLink>
                                    <ResourceLink href="https://huggingface.co/learn">Hugging Face Course</ResourceLink>
                                </ResourceCard>
                                <ResourceCard title="MLOps / Systems">
                                    <ResourceLink href="https://docs.wandb.ai/">Weights & Biases</ResourceLink>
                                    <ResourceLink href="https://dataintensive.net/">Designing Data-Intensive Apps</ResourceLink>
                                    <ResourceLink href="https://github.com/donnemartin/system-design-primer">System Design Primer</ResourceLink>
                                </ResourceCard>
                            </div>
                        </section>

                    </main>
                </div>
            </div>
        </div>
    )
}

function ResourceCard({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-6">
            <h3 className="mb-4 font-bold text-white">{title}</h3>
            <ul className="space-y-2 text-sm text-slate-400">
                {children}
            </ul>
        </div>
    )
}

function ResourceLink({ href, children }: { href: string, children: React.ReactNode }) {
    return (
        <li>
            <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 hover:underline">
                {children}
            </a>
        </li>
    )
}
