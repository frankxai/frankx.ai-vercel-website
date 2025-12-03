'use client'

import { useEffect, useState } from 'react'
// import { Link as ScrollLink } from 'react-scroll' 
// Let's use standard anchor links with a custom active state observer for simplicity and zero-dep.

export default function SidebarNav() {
    const [activeSection, setActiveSection] = useState('')

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id)
                    }
                })
            },
            { rootMargin: '-20% 0px -60% 0px' }
        )

        const sections = document.querySelectorAll('section[id]')
        sections.forEach((section) => observer.observe(section))

        return () => observer.disconnect()
    }, [])

    const navItems = [
        { id: 'welcome', label: 'Welcome' },
        { id: 'ikigai', label: 'Ikigai' },
        { id: 'analysis', label: 'Analysis' },
        { id: 'roles', label: 'Roles & Companies' },
        { id: 'plan', label: '30/60/90 Plan' },
        { id: 'portfolio', label: 'Portfolio' },
        { id: 'social', label: 'Social' },
        { id: 'agent', label: 'Custom Agent' },
        { id: 'resources', label: 'Resources' },
        { id: 'export', label: 'Export' },
    ]

    const scrollTo = (id: string) => {
        const el = document.getElementById(id)
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
            setActiveSection(id)
        }
    }

    return (
        <nav className="hidden lg:block sticky top-24 h-fit w-64 shrink-0 space-y-1">
            <div className="mb-4 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                Workshop Progress
            </div>
            {navItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`group flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${activeSection === item.id
                        ? 'bg-primary-500/10 text-primary-400'
                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                        }`}
                >
                    <span
                        className={`mr-3 h-1.5 w-1.5 rounded-full transition-colors ${activeSection === item.id ? 'bg-primary-400' : 'bg-slate-700 group-hover:bg-slate-500'
                            }`}
                    />
                    {item.label}
                </button>
            ))}
        </nav>
    )
}
