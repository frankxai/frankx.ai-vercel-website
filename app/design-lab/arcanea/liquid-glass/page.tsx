'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Code, Zap, Droplets, Mountain, Wind, Wand2 } from 'lucide-react';
import {
  LiquidButton,
  GlassCard,
  IridescentPill,
  LoadingBubble,
  FloatingElement,
  GlassInput,
  type ElementType,
} from '@/components/liquid-glass';

const elements: Array<{ name: ElementType; icon: React.ReactNode; label: string }> = [
  { name: 'fire', icon: <Zap className="w-4 h-4" />, label: 'Fire' },
  { name: 'water', icon: <Droplets className="w-4 h-4" />, label: 'Water' },
  { name: 'earth', icon: <Mountain className="w-4 h-4" />, label: 'Earth' },
  { name: 'wind', icon: <Wind className="w-4 h-4" />, label: 'Wind' },
  { name: 'arcane', icon: <Wand2 className="w-4 h-4" />, label: 'Arcane' },
];

export default function LiquidGlassShowcase() {
  const [selectedElement, setSelectedElement] = useState<ElementType>('arcane');
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showCode, setShowCode] = useState<string | null>(null);

  const handleLoadingDemo = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b border-white/5 backdrop-blur-xl bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/design-lab/arcanea"
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Arcanea</span>
          </Link>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h1 className="text-xl font-bold text-white">Liquid Glass System</h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Premium UI Materials
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Apple iOS 18 liquid glass meets Arcanea's sophisticated iridescence.
            Interact with live components below.
          </p>
        </div>

        {/* Element Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {elements.map((el) => (
            <IridescentPill
              key={el.name}
              element={el.name}
              selected={selectedElement === el.name}
              onClick={() => setSelectedElement(el.name)}
              icon={el.icon}
              size="lg"
            >
              {el.label}
            </IridescentPill>
          ))}
        </div>

        {/* Component Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* LiquidButton Demo */}
          <ComponentDemo
            title="LiquidButton"
            description="Liquid metal primary CTA with 3D gradient, press physics, and ripple effect."
            showCode={showCode === 'button'}
            onToggleCode={() => setShowCode(showCode === 'button' ? null : 'button')}
            code={`<LiquidButton
  element="${selectedElement}"
  size="lg"
  onClick={handleClick}
>
  Launch Mission
</LiquidButton>`}
          >
            <div className="flex flex-col items-center gap-4 py-8">
              <LiquidButton element={selectedElement} size="sm">
                Small Button
              </LiquidButton>
              <LiquidButton element={selectedElement} size="md">
                Medium Button
              </LiquidButton>
              <LiquidButton element={selectedElement} size="lg">
                Large Button
              </LiquidButton>
              <LiquidButton element={selectedElement} size="md" isLoading={isLoading} onClick={handleLoadingDemo}>
                {isLoading ? 'Loading...' : 'Click for Loading'}
              </LiquidButton>
            </div>
          </ComponentDemo>

          {/* GlassCard Demo */}
          <ComponentDemo
            title="GlassCard"
            description="Multi-layer glass panel with depth perception through blur, shadows, and gradients."
            showCode={showCode === 'card'}
            onToggleCode={() => setShowCode(showCode === 'card' ? null : 'card')}
            code={`<GlassCard
  material="crystal"
  elevation="high"
  element="${selectedElement}"
  hoverable
>
  <h3>Premium Content</h3>
  <p>Glass depth.</p>
</GlassCard>`}
          >
            <div className="grid grid-cols-2 gap-4 py-8">
              <GlassCard material="frosted" elevation="low" element={selectedElement} padding="md" hoverable>
                <div className="text-center">
                  <p className="text-sm font-medium text-white/90">Frosted</p>
                  <p className="text-xs text-white/50 mt-1">Low elevation</p>
                </div>
              </GlassCard>
              <GlassCard material="crystal" elevation="medium" element={selectedElement} padding="md" hoverable>
                <div className="text-center">
                  <p className="text-sm font-medium text-white/90">Crystal</p>
                  <p className="text-xs text-white/50 mt-1">Medium elevation</p>
                </div>
              </GlassCard>
              <GlassCard material="liquid" elevation="high" element={selectedElement} padding="md" hoverable>
                <div className="text-center">
                  <p className="text-sm font-medium text-white/90">Liquid</p>
                  <p className="text-xs text-white/50 mt-1">High elevation</p>
                </div>
              </GlassCard>
              <GlassCard material="obsidian" elevation="floating" element={selectedElement} padding="md" hoverable>
                <div className="text-center">
                  <p className="text-sm font-medium text-white/90">Obsidian</p>
                  <p className="text-xs text-white/50 mt-1">Floating</p>
                </div>
              </GlassCard>
            </div>
          </ComponentDemo>

          {/* IridescentPill Demo */}
          <ComponentDemo
            title="IridescentPill"
            description="Selection pill with dormant → glowing state transition and bubble shimmer."
            showCode={showCode === 'pill'}
            onToggleCode={() => setShowCode(showCode === 'pill' ? null : 'pill')}
            code={`<IridescentPill
  element="${selectedElement}"
  selected={selected}
  onClick={() => setSelected(!selected)}
>
  ${selectedElement.charAt(0).toUpperCase() + selectedElement.slice(1)}
</IridescentPill>`}
          >
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="flex gap-2">
                <IridescentPill element={selectedElement} selected={false} size="sm">
                  Small
                </IridescentPill>
                <IridescentPill element={selectedElement} selected={true} size="sm">
                  Small Selected
                </IridescentPill>
              </div>
              <div className="flex gap-2">
                <IridescentPill element={selectedElement} selected={false} size="md">
                  Medium
                </IridescentPill>
                <IridescentPill element={selectedElement} selected={true} size="md">
                  Medium Selected
                </IridescentPill>
              </div>
              <div className="flex gap-2">
                <IridescentPill element={selectedElement} selected={false} size="lg" icon={<Sparkles className="w-4 h-4" />}>
                  With Icon
                </IridescentPill>
              </div>
            </div>
          </ComponentDemo>

          {/* LoadingBubble Demo */}
          <ComponentDemo
            title="LoadingBubble"
            description="Breathing bubble loader with rotating shimmer. Feels alive, not mechanical."
            showCode={showCode === 'loading'}
            onToggleCode={() => setShowCode(showCode === 'loading' ? null : 'loading')}
            code={`<LoadingBubble
  element="${selectedElement}"
  size="lg"
  label="Loading magic..."
/>`}
          >
            <div className="grid grid-cols-2 gap-8 py-8">
              <div className="flex flex-col items-center">
                <LoadingBubble element={selectedElement} size="sm" />
                <p className="text-xs text-white/50 mt-2">Small</p>
              </div>
              <div className="flex flex-col items-center">
                <LoadingBubble element={selectedElement} size="md" />
                <p className="text-xs text-white/50 mt-2">Medium</p>
              </div>
              <div className="flex flex-col items-center">
                <LoadingBubble element={selectedElement} size="lg" label="Loading..." />
              </div>
              <div className="flex flex-col items-center">
                <LoadingBubble element={selectedElement} size="xl" label="Processing" />
              </div>
            </div>
          </ComponentDemo>

          {/* FloatingElement Demo */}
          <ComponentDemo
            title="FloatingElement"
            description="3D perspective container for dimensional depth. Elements exist in physical space."
            showCode={showCode === 'float'}
            onToggleCode={() => setShowCode(showCode === 'float' ? null : 'float')}
            code={`<FloatingElement
  rotateX={2}
  rotateY={-2}
  animate
  duration={6}
>
  <img src="/hero.png" alt="Product" />
</FloatingElement>`}
          >
            <div className="flex justify-center py-8">
              <FloatingElement rotateX={5} rotateY={-5} animate duration={6} floatDistance={12}>
                <GlassCard material="crystal" elevation="high" element={selectedElement} padding="lg">
                  <div className="text-center">
                    <Sparkles className="w-8 h-8 text-white/80 mx-auto mb-2" />
                    <p className="text-sm font-medium text-white/90">Floating Card</p>
                    <p className="text-xs text-white/50 mt-1">With 3D perspective</p>
                  </div>
                </GlassCard>
              </FloatingElement>
            </div>
          </ComponentDemo>

          {/* GlassInput Demo */}
          <ComponentDemo
            title="GlassInput"
            description="Input field with iridescent focus ring and color-shifting shimmer."
            showCode={showCode === 'input'}
            onToggleCode={() => setShowCode(showCode === 'input' ? null : 'input')}
            code={`<GlassInput
  label="Email"
  element="${selectedElement}"
  placeholder="you@example.com"
  type="email"
/>`}
          >
            <div className="space-y-4 py-8">
              <GlassInput
                label="Username"
                element={selectedElement}
                placeholder="Enter your username"
                size="md"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <GlassInput
                label="Email Address"
                element={selectedElement}
                placeholder="you@example.com"
                type="email"
                size="md"
                icon={<Sparkles className="w-4 h-4" />}
                helperText="We'll never share your email"
              />
              <GlassInput
                label="Password"
                element={selectedElement}
                placeholder="Enter password"
                type="password"
                size="md"
                error={true}
                errorMessage="Password must be at least 8 characters"
              />
            </div>
          </ComponentDemo>
        </div>

        {/* Documentation Links */}
        <GlassCard material="crystal" elevation="medium" padding="xl" className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Complete Documentation</h3>
          <p className="text-white/60 mb-6 max-w-2xl mx-auto">
            Explore the full design system specifications, implementation guides, and customization options.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/docs/design/LIQUID_GLASS_SYSTEM.md" target="_blank">
              <LiquidButton element="default" size="md">
                <Code className="w-4 h-4" />
                Design System Spec
              </LiquidButton>
            </Link>
            <Link href="/docs/design/ARCANEA_VISUAL_LANGUAGE.md" target="_blank">
              <LiquidButton element="arcane" size="md">
                <Sparkles className="w-4 h-4" />
                Arcanea Visual Language
              </LiquidButton>
            </Link>
            <Link href="/components/liquid-glass/README.md" target="_blank">
              <LiquidButton element={selectedElement} size="md">
                <Code className="w-4 h-4" />
                Component README
              </LiquidButton>
            </Link>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

// Component Demo Wrapper
interface ComponentDemoProps {
  title: string;
  description: string;
  children: React.ReactNode;
  code: string;
  showCode: boolean;
  onToggleCode: () => void;
}

function ComponentDemo({ title, description, children, code, showCode, onToggleCode }: ComponentDemoProps) {
  return (
    <GlassCard material="frosted" elevation="medium" padding="none" className="overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
            <p className="text-sm text-white/50">{description}</p>
          </div>
          <button
            onClick={onToggleCode}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-white text-sm"
          >
            <Code className="w-4 h-4" />
            {showCode ? 'Hide' : 'Show'} Code
          </button>
        </div>
      </div>

      {/* Demo Area */}
      <div className="p-6 bg-gradient-to-b from-transparent to-black/20">
        {children}
      </div>

      {/* Code Block */}
      {showCode && (
        <div className="p-6 bg-slate-950/80 border-t border-white/5">
          <pre className="text-xs text-white/70 font-mono overflow-x-auto">
            <code>{code}</code>
          </pre>
        </div>
      )}
    </GlassCard>
  );
}
