'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Info } from 'lucide-react';
import { GlassCard, IridescentPill, type ElementType } from '@/components/liquid-glass';

const elements: ElementType[] = ['fire', 'water', 'earth', 'wind', 'arcane'];

export default function IridescenceShowcase() {
  const [selectedElement, setSelectedElement] = useState<ElementType>('arcane');

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
            <h1 className="text-xl font-bold text-white">Iridescence</h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">
            Sophisticated Iridescence
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Not childish rainbow bubbles — sophisticated prismatic light like cathedral crystals,
            oil on dark water, and the shimmer on a raven's feather.
          </p>
        </div>

        {/* Element Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {elements.map((el) => (
            <IridescentPill
              key={el}
              element={el}
              selected={selectedElement === el}
              onClick={() => setSelectedElement(el)}
              size="lg"
            >
              {el.charAt(0).toUpperCase() + el.slice(1)}
            </IridescentPill>
          ))}
        </div>

        {/* The Physics Explanation */}
        <GlassCard material="crystal" elevation="high" padding="xl" className="mb-16">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Info className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">The Physics: Thin-Film Interference</h3>
              <p className="text-white/70 leading-relaxed mb-4">
                Soap bubbles create color through <strong className="text-white">thin-film interference</strong> —
                light waves reflecting off inner and outer surfaces, creating shifting spectral colors.
              </p>
              <p className="text-white/70 leading-relaxed">
                In UI, we simulate this with multi-layer gradients that shift based on position,
                animated color movement, traveling specular highlights, and subtle transparency showing depth beneath.
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Color Palette */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white mb-6 text-center">Arcanea Color Palette</h3>
          <p className="text-white/60 text-center mb-8 max-w-2xl mx-auto">
            Desaturated and luxurious. Like aged pearl or black opal — not candy rainbow.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Fire */}
            <ColorPaletteCard
              element="fire"
              title="Ember Iridescence"
              colors={[
                { label: 'Orange', value: 'rgba(255, 150, 50, 0.15)' },
                { label: 'Red', value: 'rgba(255, 100, 100, 0.12)' },
                { label: 'Amber', value: 'rgba(255, 180, 80, 0.15)' },
                { label: 'Rust', value: 'rgba(200, 100, 80, 0.10)' },
              ]}
            />

            {/* Water */}
            <ColorPaletteCard
              element="water"
              title="Ocean Iridescence"
              colors={[
                { label: 'Cyan', value: 'rgba(100, 220, 255, 0.12)' },
                { label: 'Blue', value: 'rgba(150, 180, 255, 0.10)' },
                { label: 'Aqua', value: 'rgba(100, 255, 220, 0.12)' },
                { label: 'Deep Blue', value: 'rgba(80, 150, 255, 0.10)' },
              ]}
            />

            {/* Earth */}
            <ColorPaletteCard
              element="earth"
              title="Mineral (Labradorite)"
              colors={[
                { label: 'Gold', value: 'rgba(200, 170, 100, 0.15)' },
                { label: 'Teal', value: 'rgba(100, 180, 150, 0.10)' },
                { label: 'Ochre', value: 'rgba(180, 150, 80, 0.12)' },
                { label: 'Jade', value: 'rgba(150, 200, 180, 0.10)' },
              ]}
            />

            {/* Wind */}
            <ColorPaletteCard
              element="wind"
              title="Pearl Iridescence"
              colors={[
                { label: 'White', value: 'rgba(255, 255, 255, 0.12)' },
                { label: 'Ice Blue', value: 'rgba(200, 220, 255, 0.10)' },
                { label: 'Pink Tint', value: 'rgba(255, 220, 255, 0.10)' },
                { label: 'Cyan', value: 'rgba(220, 255, 255, 0.10)' },
              ]}
            />

            {/* Arcane */}
            <ColorPaletteCard
              element="arcane"
              title="Void (Black Opal)"
              colors={[
                { label: 'Violet', value: 'rgba(180, 100, 255, 0.15)' },
                { label: 'Blue-Violet', value: 'rgba(100, 150, 255, 0.12)' },
                { label: 'Magenta', value: 'rgba(255, 100, 200, 0.12)' },
                { label: 'Cyan', value: 'rgba(100, 255, 200, 0.10)' },
              ]}
            />
          </div>
        </div>

        {/* Reference Inspiration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <GlassCard material="frosted" elevation="medium" padding="lg">
            <div className="text-center">
              <h4 className="text-xl font-bold text-white mb-4">✅ Always Do</h4>
              <ul className="text-left space-y-3 text-white/70">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 flex-shrink-0">•</span>
                  <span>Deep navy backgrounds with neon glows</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 flex-shrink-0">•</span>
                  <span>Glass/chrome/metallic 3D materials</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 flex-shrink-0">•</span>
                  <span>Desaturated, subtle color shifts</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 flex-shrink-0">•</span>
                  <span>Constellation and sacred geometry patterns</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 flex-shrink-0">•</span>
                  <span>Premium, sophisticated, powerful aesthetic</span>
                </li>
              </ul>
            </div>
          </GlassCard>

          <GlassCard material="frosted" elevation="medium" padding="lg">
            <div className="text-center">
              <h4 className="text-xl font-bold text-white mb-4">❌ Never Do</h4>
              <ul className="text-left space-y-3 text-white/70">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 flex-shrink-0">•</span>
                  <span>Childish rainbow bubbles (candy colors)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 flex-shrink-0">•</span>
                  <span>Flat pastel backgrounds (clay/Play-Doh)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 flex-shrink-0">•</span>
                  <span>Cartoon character style</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 flex-shrink-0">•</span>
                  <span>Over-saturated neon glow</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 flex-shrink-0">•</span>
                  <span>Cute, toy-like, playful aesthetics</span>
                </li>
              </ul>
            </div>
          </GlassCard>
        </div>

        {/* Reference Images */}
        <GlassCard material="crystal" elevation="high" padding="xl">
          <h3 className="text-3xl font-bold text-white mb-4 text-center">Reference Inspiration</h3>
          <p className="text-white/60 text-center mb-8 max-w-2xl mx-auto">
            The iridescence we're creating matches these premium, sophisticated sources:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10" />
              <p className="text-sm font-medium text-white/90">Cathedral Crystal</p>
              <p className="text-xs text-white/50 mt-1">Light refraction</p>
            </div>
            <div>
              <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-slate-500/20 to-purple-500/20 border border-white/10" />
              <p className="text-sm font-medium text-white/90">Oil on Water</p>
              <p className="text-xs text-white/50 mt-1">At night</p>
            </div>
            <div>
              <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-emerald-500/20 to-purple-500/20 border border-white/10" />
              <p className="text-sm font-medium text-white/90">Aurora Borealis</p>
              <p className="text-xs text-white/50 mt-1">Compressed</p>
            </div>
            <div>
              <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-slate-700/20 to-cyan-500/20 border border-white/10" />
              <p className="text-sm font-medium text-white/90">Raven Feather</p>
              <p className="text-xs text-white/50 mt-1">Dark shimmer</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

// Color Palette Card Component
interface ColorPaletteCardProps {
  element: ElementType;
  title: string;
  colors: Array<{ label: string; value: string }>;
}

function ColorPaletteCard({ element, title, colors }: ColorPaletteCardProps) {
  return (
    <GlassCard material="frosted" elevation="low" padding="md" element={element}>
      <h4 className="text-sm font-bold text-white mb-3 text-center">{title}</h4>
      <div className="space-y-2">
        {colors.map((color, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg border border-white/10"
              style={{ background: color.value }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white/80 truncate">{color.label}</p>
              <p className="text-[10px] text-white/40 font-mono truncate">{color.value}</p>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
