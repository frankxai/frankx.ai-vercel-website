/**
 * v0-generated variant: Design System
 * Generated: 2026-02-08 via v0-1.5-lg with extended thinking
 * Chat: nmegM49Dti2
 * Demo: https://demo-kzmljrx9qevuoynjg4t1.vusercontent.net
 * Source file: app/design-system/page.tsx
 * 
 * Reference design — adapt best patterns to production codebase.
 */

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Check, Copy, Search } from 'lucide-react'

const colors = [
  { name: 'Navy', hex: '#0F172A', hsl: '222 47% 11%', description: 'Base Background', variable: '--frankx-navy' },
  { name: 'Purple', hex: '#AB47C7', hsl: '291 51% 54%', description: 'Primary Brand', variable: '--frankx-purple' },
  { name: 'Cyan', hex: '#43BFE3', hsl: '195 68% 59%', description: 'Accent', variable: '--frankx-cyan' },
  { name: 'Gold', hex: '#F59E0B', hsl: '38 92% 50%', description: 'Highlight', variable: '--frankx-gold' },
  { name: 'Emerald', hex: '#10B981', hsl: '160 84% 39%', description: 'Success', variable: '--frankx-emerald' },
]

const colorTints = [
  { label: '10%', opacity: 0.1 },
  { label: '20%', opacity: 0.2 },
  { label: '40%', opacity: 0.4 },
  { label: '60%', opacity: 0.6 },
  { label: '80%', opacity: 0.8 },
  { label: '100%', opacity: 1 },
]

const typographySizes = [
  { name: 'xs', class: 'text-xs', px: '12px', rem: '0.75rem' },
  { name: 'sm', class: 'text-sm', px: '14px', rem: '0.875rem' },
  { name: 'base', class: 'text-base', px: '16px', rem: '1rem' },
  { name: 'lg', class: 'text-lg', px: '18px', rem: '1.125rem' },
  { name: 'xl', class: 'text-xl', px: '20px', rem: '1.25rem' },
  { name: '2xl', class: 'text-2xl', px: '24px', rem: '1.5rem' },
  { name: '3xl', class: 'text-3xl', px: '30px', rem: '1.875rem' },
  { name: '4xl', class: 'text-4xl', px: '36px', rem: '2.25rem' },
  { name: '5xl', class: 'text-5xl', px: '48px', rem: '3rem' },
  { name: '6xl', class: 'text-6xl', px: '60px', rem: '3.75rem' },
]

const fontWeights = [
  { name: 'Regular', weight: '400', class: 'font-normal' },
  { name: 'Medium', weight: '500', class: 'font-medium' },
  { name: 'Semibold', weight: '600', class: 'font-semibold' },
  { name: 'Bold', weight: '700', class: 'font-bold' },
]

const glassmorphismLevels = [
  { 
    name: 'Subtle', 
    level: 1, 
    bg: 'rgba(255, 255, 255, 0.03)', 
    border: 'rgba(255, 255, 255, 0.05)',
    description: 'Barely there, ambient depth'
  },
  { 
    name: 'Medium', 
    level: 2, 
    bg: 'rgba(255, 255, 255, 0.05)', 
    border: 'rgba(255, 255, 255, 0.10)',
    description: 'Noticeable separation, still elegant'
  },
  { 
    name: 'Prominent', 
    level: 3, 
    bg: 'rgba(255, 255, 255, 0.08)', 
    border: 'rgba(255, 255, 255, 0.20)',
    description: 'Clear hierarchy, strong presence'
  },
]

const spacingScale = [
  { name: '0', value: '0px', class: 'p-0' },
  { name: '1', value: '4px', class: 'p-1' },
  { name: '2', value: '8px', class: 'p-2' },
  { name: '3', value: '12px', class: 'p-3' },
  { name: '4', value: '16px', class: 'p-4' },
  { name: '6', value: '24px', class: 'p-6' },
  { name: '8', value: '32px', class: 'p-8' },
  { name: '12', value: '48px', class: 'p-12' },
  { name: '16', value: '64px', class: 'p-16' },
  { name: '24', value: '96px', class: 'p-24' },
]

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all opacity-0 group-hover:opacity-100"
      aria-label="Copy to clipboard"
    >
      {copied ? <Check className="size-4 text-frankx-emerald" /> : <Copy className="size-4 text-white/60" />}
    </button>
  )
}

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-frankx-navy text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] bg-frankx-purple/10 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute -bottom-1/2 -left-1/2 w-[1000px] h-[1000px] bg-frankx-cyan/10 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-24 pb-32 text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-frankx-purple via-frankx-cyan to-frankx-gold bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-700">
            Design System
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            The visual language behind frankx.ai
          </p>
          
          {/* Floating Color Palette Preview */}
          <div className="flex items-center justify-center gap-3 mt-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            {colors.map((color, i) => (
              <div
                key={color.name}
                className="size-16 rounded-2xl shadow-2xl hover:scale-110 transition-transform duration-300 cursor-pointer"
                style={{ 
                  backgroundColor: color.hex,
                  animationDelay: `${i * 100}ms`,
                }}
              />
            ))}
          </div>
        </section>

        {/* Color Palette Section */}
        <section className="container mx-auto px-4 py-24">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Color Palette</h2>
            <p className="text-lg text-white/60 mb-16">Click any color to copy its hex value</p>
            
            <div className="grid gap-12">
              {colors.map((color) => (
                <div key={color.name} className="group">
                  <div className="flex items-start gap-6 mb-6">
                    <div 
                      className="w-32 h-32 rounded-2xl shadow-2xl cursor-pointer hover:scale-105 transition-all relative group/main"
                      style={{ backgroundColor: color.hex }}
                      onClick={() => navigator.clipboard.writeText(color.hex)}
                    >
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/main:opacity-100 transition-opacity">
                        <Copy className="size-6 text-white drop-shadow-lg" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{color.name}</h3>
                      <p className="text-white/60 mb-4">{color.description}</p>
                      <div className="flex gap-4 text-sm font-mono">
                        <div className="flex flex-col gap-1">
                          <span className="text-white/40">HEX</span>
                          <span className="text-white/90">{color.hex}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-white/40">HSL</span>
                          <span className="text-white/90">{color.hsl}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-white/40">CSS Variable</span>
                          <span className="text-white/90">var({color.variable})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Color Tints */}
                  <div className="flex gap-2">
                    {colorTints.map((tint) => (
                      <div 
                        key={tint.label}
                        className="flex-1 group/tint cursor-pointer"
                        onClick={() => navigator.clipboard.writeText(`${color.hex}${Math.round(tint.opacity * 255).toString(16).padStart(2, '0')}`)}
                      >
                        <div 
                          className="h-20 rounded-xl mb-2 hover:scale-105 transition-transform relative overflow-hidden"
                          style={{ backgroundColor: `${color.hex}${Math.round(tint.opacity * 255).toString(16).padStart(2, '0')}` }}
                        >
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/tint:opacity-100 transition-opacity">
                            <Copy className="size-4 text-white drop-shadow-lg" />
                          </div>
                        </div>
                        <div className="text-center text-xs text-white/40">{tint.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section className="container mx-auto px-4 py-24">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Typography</h2>
            <p className="text-lg text-white/60 mb-16">Inter font family for all text content</p>
            
            {/* Font Sizes */}
            <div className="mb-16">
              <h3 className="text-2xl font-semibold mb-8">Type Scale</h3>
              <div className="space-y-6">
                {typographySizes.map((size) => (
                  <div key={size.name} className="flex items-baseline gap-6 p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.03] transition-colors group relative">
                    <div className="w-24 shrink-0">
                      <div className="text-sm text-white/40 mb-1">{size.name}</div>
                      <div className="text-xs font-mono text-white/60">{size.px}</div>
                    </div>
                    <div className={`${size.class} flex-1`}>
                      The quick brown fox jumps over the lazy dog
                    </div>
                    <CopyButton text={size.class} />
                  </div>
                ))}
              </div>
            </div>

            {/* Font Weights */}
            <div>
              <h3 className="text-2xl font-semibold mb-8">Font Weights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fontWeights.map((weight) => (
                  <div key={weight.name} className="p-8 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.03] transition-colors group relative">
                    <div className="text-sm text-white/40 mb-3">{weight.name} • {weight.weight}</div>
                    <div className={`${weight.class} text-2xl`}>
                      The quick brown fox jumps over the lazy dog
                    </div>
                    <CopyButton text={weight.class} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Glassmorphism Section */}
        <section className="container mx-auto px-4 py-24">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Glassmorphism System</h2>
            <p className="text-lg text-white/60 mb-16">Layered transparency creates depth and hierarchy</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {glassmorphismLevels.map((level) => (
                <div key={level.level} className="group relative">
                  <div 
                    className="p-8 rounded-2xl backdrop-blur-xl border transition-all hover:scale-105 cursor-pointer h-64 flex flex-col justify-between"
                    style={{ 
                      backgroundColor: level.bg,
                      borderColor: level.border,
                    }}
                  >
                    <div>
                      <div className="text-sm text-white/40 mb-2">Level {level.level}</div>
                      <h3 className="text-2xl font-bold mb-3">{level.name}</h3>
                      <p className="text-sm text-white/60 leading-relaxed">{level.description}</p>
                    </div>
                    <div className="space-y-2 text-xs font-mono text-white/40">
                      <div>bg: {level.bg}</div>
                      <div>border: {level.border}</div>
                    </div>
                    <CopyButton text={level.bg} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Component Showcase */}
        <section className="container mx-auto px-4 py-24">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Components</h2>
            <p className="text-lg text-white/60 mb-16">Reusable UI elements built with consistency</p>
            
            {/* Buttons */}
            <div className="mb-16">
              <h3 className="text-2xl font-semibold mb-8">Buttons</h3>
              <div className="flex flex-wrap gap-4 p-8 rounded-xl bg-white/[0.02] border border-white/5">
                <Button className="bg-gradient-to-r from-frankx-purple to-frankx-cyan hover:opacity-90">
                  Primary Gradient
                </Button>
                <Button variant="outline" className="border-white/10 hover:bg-white/5 bg-transparent">
                  Secondary
                </Button>
                <Button variant="ghost">
                  Ghost
                </Button>
                <Button variant="destructive">
                  Destructive
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-frankx-purple to-frankx-cyan">
                  Small
                </Button>
                <Button size="lg" className="bg-gradient-to-r from-frankx-purple to-frankx-cyan">
                  Large
                </Button>
              </div>
            </div>

            {/* Cards */}
            <div className="mb-16">
              <h3 className="text-2xl font-semibold mb-8">Cards</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 bg-white/[0.03] border-white/10 hover:bg-white/[0.05] transition-all hover:scale-105 cursor-pointer">
                  <div className="size-12 rounded-lg bg-frankx-purple/20 flex items-center justify-center mb-4">
                    <div className="size-6 rounded-full bg-frankx-purple" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Feature Card</h4>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Elegant cards with subtle glass effect and smooth hover animations.
                  </p>
                </Card>

                <Card className="p-6 bg-white/[0.05] border-white/20 hover:bg-white/[0.08] transition-all hover:scale-105 cursor-pointer">
                  <div className="size-12 rounded-lg bg-frankx-cyan/20 flex items-center justify-center mb-4">
                    <div className="size-6 rounded-full bg-frankx-cyan" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Product Card</h4>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Higher opacity for prominent content that needs attention.
                  </p>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-frankx-purple/10 to-frankx-cyan/10 border-white/10 hover:scale-105 transition-all cursor-pointer">
                  <div className="size-12 rounded-lg bg-frankx-gold/20 flex items-center justify-center mb-4">
                    <div className="size-6 rounded-full bg-frankx-gold" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Gradient Card</h4>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Subtle gradient backgrounds for special highlights.
                  </p>
                </Card>
              </div>
            </div>

            {/* Badges */}
            <div className="mb-16">
              <h3 className="text-2xl font-semibold mb-8">Badges & Tags</h3>
              <div className="flex flex-wrap gap-3 p-8 rounded-xl bg-white/[0.02] border border-white/5">
                <Badge className="bg-frankx-purple/20 text-frankx-purple border-frankx-purple/30">
                  Purple
                </Badge>
                <Badge className="bg-frankx-cyan/20 text-frankx-cyan border-frankx-cyan/30">
                  Cyan
                </Badge>
                <Badge className="bg-frankx-gold/20 text-frankx-gold border-frankx-gold/30">
                  Gold
                </Badge>
                <Badge className="bg-frankx-emerald/20 text-frankx-emerald border-frankx-emerald/30">
                  Success
                </Badge>
                <Badge variant="outline" className="border-white/20 text-white/80">
                  Outline
                </Badge>
              </div>
            </div>

            {/* Input Fields */}
            <div>
              <h3 className="text-2xl font-semibold mb-8">Input Fields</h3>
              <div className="space-y-6 p-8 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="max-w-md">
                  <label className="block text-sm font-medium mb-2 text-white/80">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/40" />
                    <Input 
                      placeholder="Search design system..." 
                      className="pl-10 bg-white/[0.05] border-white/10 focus:border-frankx-purple focus:ring-frankx-purple/20"
                    />
                  </div>
                </div>

                <div className="max-w-md">
                  <label className="block text-sm font-medium mb-2 text-white/80">Email</label>
                  <Input 
                    type="email"
                    placeholder="your@email.com" 
                    className="bg-white/[0.05] border-white/10 focus:border-frankx-cyan focus:ring-frankx-cyan/20"
                  />
                </div>

                <div className="max-w-md">
                  <label className="block text-sm font-medium mb-2 text-white/80">Message</label>
                  <Textarea 
                    placeholder="Tell us what you think..." 
                    rows={4}
                    className="bg-white/[0.05] border-white/10 focus:border-frankx-purple focus:ring-frankx-purple/20 resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Animation Patterns */}
        <section className="container mx-auto px-4 py-24">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Animation Patterns</h2>
            <p className="text-lg text-white/60 mb-16">Smooth, purposeful motion enhances user experience</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Hover Scale */}
              <div className="p-8 rounded-xl bg-white/[0.02] border border-white/5">
                <h4 className="text-lg font-semibold mb-4">Hover Scale</h4>
                <div className="flex justify-center">
                  <div className="size-32 rounded-2xl bg-gradient-to-br from-frankx-purple to-frankx-cyan hover:scale-110 transition-transform duration-300 cursor-pointer" />
                </div>
                <code className="block mt-4 text-xs text-white/60 font-mono">
                  hover:scale-110 transition-transform
                </code>
              </div>

              {/* Hover Glow */}
              <div className="p-8 rounded-xl bg-white/[0.02] border border-white/5">
                <h4 className="text-lg font-semibold mb-4">Hover Glow</h4>
                <div className="flex justify-center">
                  <div className="size-32 rounded-2xl bg-gradient-to-br from-frankx-cyan to-frankx-gold hover:shadow-[0_0_30px_rgba(67,191,227,0.5)] transition-shadow duration-300 cursor-pointer" />
                </div>
                <code className="block mt-4 text-xs text-white/60 font-mono">
                  hover:shadow-[0_0_30px_rgba(...)]
                </code>
              </div>

              {/* Fade In */}
              <div className="p-8 rounded-xl bg-white/[0.02] border border-white/5">
                <h4 className="text-lg font-semibold mb-4">Fade In</h4>
                <div className="flex justify-center">
                  <div className="size-32 rounded-2xl bg-gradient-to-br from-frankx-emerald to-frankx-cyan animate-in fade-in duration-1000" />
                </div>
                <code className="block mt-4 text-xs text-white/60 font-mono">
                  animate-in fade-in duration-1000
                </code>
              </div>

              {/* Slide Up */}
              <div className="p-8 rounded-xl bg-white/[0.02] border border-white/5">
                <h4 className="text-lg font-semibold mb-4">Slide Up</h4>
                <div className="flex justify-center">
                  <div className="size-32 rounded-2xl bg-gradient-to-br from-frankx-gold to-frankx-purple animate-in slide-in-from-bottom-4 duration-700" />
                </div>
                <code className="block mt-4 text-xs text-white/60 font-mono">
                  animate-in slide-in-from-bottom-4
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* Spacing & Grid */}
        <section className="container mx-auto px-4 py-24 pb-32">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Spacing & Grid</h2>
            <p className="text-lg text-white/60 mb-16">Consistent spacing creates visual harmony</p>
            
            <div className="mb-16">
              <h3 className="text-2xl font-semibold mb-8">Spacing Scale</h3>
              <div className="space-y-4">
                {spacingScale.map((space) => (
                  <div key={space.name} className="flex items-center gap-6 group">
                    <div className="w-20 text-sm text-white/60 font-mono">{space.name}</div>
                    <div className="w-24 text-sm text-white/40 font-mono">{space.value}</div>
                    <div 
                      className="h-12 rounded-lg bg-frankx-purple group-hover:bg-frankx-cyan transition-colors"
                      style={{ width: space.value }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-8">Grid System</h3>
              <div className="grid grid-cols-12 gap-4 p-8 rounded-xl bg-white/[0.02] border border-white/5">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div 
                    key={i}
                    className="h-16 rounded-lg bg-frankx-purple/20 border border-frankx-purple/30 flex items-center justify-center text-xs font-mono text-white/60"
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
