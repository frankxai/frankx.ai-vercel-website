'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Play, Pause, RotateCcw, Sparkles, Film, Layers } from 'lucide-react';

// Premium Cinematic Scroll Lab Demo
// On feat/premium-luxury-scroll-animations-lab
// Assets generated via image_gen + video_gen following cinematic-web-lab skill + design-thinking research (Apple cinematic, Awwwards GSAP/Lenis, scroll video scrub best practices)
// Hypothesis: Hybrid (video scrub + image parallax layers + Motion) delivers the most ultra-premium, luxurious, high-production-value on-scroll experience with acceptable perf for FrankX brand.

export default function PremiumCinematicScrollLab() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Scroll progress for the main scrub section
  const scrubRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrubRef,
    offset: ['start end', 'end start'],
  });

  // Map scroll 0-1 to video time (assume ~8s clip)
  const videoTime = useTransform(scrollYProgress, [0, 1], [0, 8]);

  // Parallax transforms for layered images
  const layer1Y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const layer3Y = useTransform(scrollYProgress, [0, 1], [0, -120]);

  // Update video time on scroll (scrub)
  useEffect(() => {
    const unsubscribe = videoTime.on('change', (latest) => {
      if (videoRef.current) {
        const vid = videoRef.current;
        const targetTime = Math.max(0, Math.min(latest, vid.duration || 8));
        if (Math.abs(vid.currentTime - targetTime) > 0.05) {
          vid.currentTime = targetTime;
        }
        setProgress((latest / 8) * 100);
      }
    });
    return unsubscribe;
  }, [videoTime]);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const resetScrub = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setProgress(0);
    }
  };

  // Simple Lenis-like smooth (for demo; in prod install lenis)
  useEffect(() => {
    // Placeholder: in real impl, init Lenis for global buttery scroll
    // document.documentElement.style.scrollBehavior = 'smooth';
    console.log('[Premium Cinematic Lab] Demo ready. In prod: import Lenis and sync with framer useScroll for locked premium feel.');
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Nav / Back */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0b]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/design-lab" className="flex items-center gap-2 text-sm text-white/60 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back to Design Lab
          </Link>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[3px] text-white/40">
            <Sparkles className="h-3.5 w-3.5" /> Cinematic Web Lab • Active Experiment
          </div>
          <div className="text-xs text-white/40">Branch: feat/premium-luxury-scroll-animations-lab</div>
        </div>
      </div>

      {/* Hero */}
      <div className="mx-auto max-w-5xl px-6 pt-16 pb-12 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs tracking-[2px] text-white/60">
          ULTRA PREMIUM • LUXURIOUS • HIGH PRODUCTION VALUE
        </div>
        <h1 className="text-6xl font-semibold tracking-[-1.5px] md:text-7xl">
          Premium Cinematic<br />Scroll Lab
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-xl text-white/70">
          Scroll-driven filmic experiences built from AI-generated cinematic stills + short video clips.
          The highest bar of luxurious on-scroll motion for frankx.ai — deliberate, emotional, expensive-feeling.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a href="#scrub-demo" className="rounded-xl border border-white/20 px-6 py-3 text-sm hover:bg-white/5">Jump to Video Scrub Demo</a>
          <a href="#variations" className="rounded-xl border border-white/20 px-6 py-3 text-sm hover:bg-white/5">See All Variations</a>
        </div>
        <p className="mt-4 text-[10px] text-white/40">Research: Apple cinematic pages • Awwwards GSAP/Lenis winners • Scroll video scrub patterns • Motion.dev ScrollTimeline • Hybrid stills + video for perf + film feel</p>
      </div>

      {/* Main Scrub Demo - Video tied to scroll (core premium technique) */}
      <div id="scrub-demo" ref={scrubRef} className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[3px] text-emerald-400">Variation 1 • Gold Standard</div>
            <h2 className="text-4xl font-semibold tracking-tight">Cinematic Video Scrub</h2>
            <p className="mt-2 max-w-md text-white/60">Scroll to scrub the 8s filmic reveal. Feels like controlling a high-end brand film. Uses framer-motion useScroll + direct video.currentTime binding + Lenis-inspired smooth (add Lenis in prod for locked 60fps).</p>
          </div>
          <div className="flex gap-2">
            <button onClick={toggleVideo} className="flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/5">
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />} {isPlaying ? 'Pause' : 'Play'} (autonomous)
            </button>
            <button onClick={resetScrub} className="flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/5">
              <RotateCcw className="h-4 w-4" /> Reset
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl">
          <video
            ref={videoRef}
            src="/images/design-lab/premium-cinematic/cinematic-reveal.mp4"
            className="w-full"
            muted
            playsInline
            loop={false}
            onTimeUpdate={(e) => setProgress(((e.currentTarget.currentTime / (e.currentTarget.duration || 8)) * 100))}
          />
          {/* Overlay progress for luxury feel */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
            <div className="h-full bg-white/80 transition-all" style={{ width: `${progress}%` }} />
          </div>
          <div className="absolute bottom-4 right-4 rounded bg-black/60 px-3 py-1 text-xs text-white/70">Scroll or drag to control • {progress.toFixed(0)}%</div>
        </div>

        <div className="mt-4 text-[10px] text-white/40">Asset: 8s cinematic clip generated with video_gen (cinematic prompt: slow push, organic vines, Deakins lighting, film grain). Scrub technique from research (Awwwards, scrollsequence patterns, GSAP scrub examples).</div>
      </div>

      {/* Layered Parallax / Image Sequence Demo */}
      <div className="mx-auto max-w-6xl px-6 py-16 border-t border-white/10">
        <div className="mb-8">
          <div className="text-xs uppercase tracking-[3px] text-amber-400">Variation 2 • Performant Luxury</div>
          <h2 className="text-4xl font-semibold tracking-tight">Layered Parallax + Image Sequence</h2>
          <p className="mt-2 max-w-md text-white/60">Multiple generated stills with independent scroll speeds (parallax) + subtle motion on elements. Lightweight, precise, scales to long scrollytelling. Use for detailed "story" sections where video would be too heavy.</p>
        </div>

        <div className="relative h-[120vh] overflow-hidden rounded-3xl border border-white/10 bg-[#050505]">
          {/* Background layer (slowest) */}
          <motion.div style={{ y: layer1Y }} className="absolute inset-0 bg-[radial-gradient(#222_0.5px,transparent_1px)] bg-[length:3px_3px] opacity-60" />

          {/* Mid layer - main hero still */}
          <motion.div 
            style={{ y: layer2Y }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <img 
              src="/images/design-lab/premium-cinematic/cinematic-hero.jpg" 
              alt="Cinematic hero architectural model - premium glass and gold with organic vines, Deakins cinematic lighting"
              className="max-h-[70vh] w-auto rounded-xl object-contain shadow-2xl"
            />
          </motion.div>

          {/* Foreground detail layer (fastest) - scroll-layers concept for depth */}
          <motion.div style={{ y: layer3Y }} className="absolute inset-0 flex items-center justify-center opacity-80">
            <img 
              src="/images/design-lab/premium-cinematic/scroll-layers.jpg" 
              alt="Layered scroll concept - gold filigree, frosted glass panels, atmospheric particles for parallax depth"
              className="max-h-[55vh] w-auto rounded-xl object-contain mix-blend-screen"
            />
          </motion.div>

          {/* Floating label for luxury */}
          <div className="absolute bottom-8 left-8 rounded bg-black/70 px-4 py-2 text-sm text-white/80 backdrop-blur">Scroll to reveal depth • Organic integration + filmic space</div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 text-[10px] text-white/40 md:grid-cols-2">
          <div>Assets: cinematic-hero.jpg (main model), scroll-layers.jpg (filigree + panels for layers). Generated with image_gen following cinematic prompt DNA (anamorphic, motivated light, organic first).</div>
          <div>Technique: framer-motion useTransform on y for parallax rates. In prod combine with Lenis for global premium scroll lock. Add image sequence scrub (preload 8-12 frames, canvas or framer opacity) for even more control on long narratives.</div>
        </div>

        {/* Image Sequence Scrub Demo (Variation 2 - performant) */}
        <div className="mt-12">
          <div className="mb-4 text-xs uppercase tracking-[3px] text-amber-400">Variation 2 • Image Sequence Scrub (Performant)</div>
          <h3 className="text-2xl font-semibold">Scroll-Driven Image Sequence</h3>
          <p className="mt-1 max-w-lg text-sm text-white/60">Preloaded progression frames (early/mid states generated as sequence). Progress drives which frame is shown (opacity crossfade or canvas). Lightweight, precise, great for long detailed stories. Extend to 8-12 frames for silky scrub.</p>
          <div ref={scrubRef} className="relative mt-6 h-[70vh] overflow-hidden rounded-3xl border border-white/10 bg-black">
            {/* Simple JS-driven sequence for demo; in real use framer or GSAP for 60fps */}
            <img 
              src="/images/design-lab/premium-cinematic/seq-early.jpg" 
              className="absolute inset-0 h-full w-full object-contain opacity-100 transition-opacity duration-75" 
              style={{ opacity: Math.max(0.1, 1 - (progress/100 * 1.5)) }} 
              alt="Early sequence frame" 
            />
            <img 
              src="/images/design-lab/premium-cinematic/seq-mid.jpg" 
              className="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-75" 
              style={{ opacity: Math.min(0.9, (progress/100 * 1.5) - 0.5) }} 
              alt="Mid sequence frame" 
            />
            <div className="absolute bottom-4 right-4 rounded bg-black/60 px-3 py-1 text-xs text-white/70">Scroll to advance frames • {progress.toFixed(0)}% (extend with more seq frames + canvas for prod)</div>
          </div>
          <div className="mt-2 text-[10px] text-white/40">Frames: seq-early.jpg, seq-mid.jpg (generated as progression states). In full impl: preload array, use scroll progress to pick index, draw to canvas or crossfade motion.imgs for buttery 60fps sequence scrub (see research: scrollsequence, GSAP image seq examples).</div>
        </div>
      </div>

      {/* Hybrid + Code + Research Notes */}
      <div id="variations" className="mx-auto max-w-6xl border-t border-white/10 px-6 py-16">
        <h3 className="text-2xl font-semibold tracking-tight">Variations &amp; Hypothesis</h3>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 p-6">
            <div className="text-emerald-400 text-xs tracking-widest">WINNER HYBRID</div>
            <div className="mt-2 text-lg font-medium">Video Scrub + Parallax Layers</div>
            <p className="mt-3 text-sm text-white/60">Best of both: filmic emotional peak from video + precise lightweight details from images. Matches Apple cinematic + Awwwards high-end feel. Scroll feels deliberate and luxurious.</p>
            <div className="mt-4 text-[10px] text-white/40">Perf: video metadata preload + image optimization. Add GSAP ScrollTrigger for complex pinning if needed.</div>
          </div>
          <div className="rounded-2xl border border-white/10 p-6">
            <div className="text-amber-400 text-xs tracking-widest">PERF KING</div>
            <div className="mt-2 text-lg font-medium">Image Sequence Scrub (Canvas/Framer)</div>
            <p className="mt-3 text-sm text-white/60">Preload frames from generated sequence. Scrub via progress → frame index. Ideal for long detailed stories. Less "video" weight, more control.</p>
          </div>
          <div className="rounded-2xl border border-white/10 p-6">
            <div className="text-sky-400 text-xs tracking-widest">CALM LUXURY</div>
            <div className="mt-2 text-lg font-medium">Pure Parallax + Micro Motion</div>
            <p className="mt-3 text-sm text-white/60">Multiple stills at different rates + subtle organic "growth" on progress. Lightest bundle. Feels expensive and calm — perfect for deep content pages.</p>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8 text-sm">
          <div className="font-mono text-xs text-white/40">RESEARCH + BEST OF THE BEST (design-thinking 80/20)</div>
          <ul className="mt-4 space-y-2 text-white/70">
            <li>• <strong>Apple</strong>: Cinematic product reveals, scroll-scrubbed 3D/models, perfect motivated lighting, shallow DOF, deliberate pacing. Gold standard for "expensive".</li>
            <li>• <strong>Awwwards / GSAP winners</strong> (redomedia.co style, etc.): GSAP ScrollTrigger + Lenis for buttery locked scroll, layered choreography, typography that breathes.</li>
            <li>• <strong>Scroll video scrub patterns</strong> (scrollsequence, Codrops, Builder.io Veo+GSAP examples): Tie currentTime or frame to scrollYProgress. Reversible, frame-accurate.</li>
            <li>• <strong>Motion.dev / Framer Motion</strong>: useScroll + useTransform or new ScrollTimeline API. Lightweight for React/Next. Trusted by top teams.</li>
            <li>• <strong>Hybrid wins</strong>: Image seq for control/perf + short cinematic video for emotion. Pure video heavy; pure JS can feel cheap if not polished.</li>
            <li>• <strong>Perf &amp; A11y</strong>: GPU (transform/opacity), Lenis smooth, prefers-reduced-motion static elegant state, pause video, mobile touch scrub test. From web.dev, Mighty Fine Design, etc.</li>
            <li>• <strong>ACOS/Gen</strong>: Use cinematic lane (Deakins, anamorphic, film grain) + Higgsfield/fal for video, nb-image for stills. Follow visual-creation gates + this cinematic-web-lab skill.</li>
          </ul>
          <div className="mt-6 text-[10px] text-white/40">Full workflow, hypothesis, step-by-step, and swarm guidance live in the ACOS skill: .claude/skills/cinematic-web-lab/SKILL.md (on feat/cinematic-web-motion-lab branch in FrankX repo). Loads on top of gen, design-thinking, visual-creation, ui-ux-pro-max.</div>
        </div>
      </div>

      {/* Footer / Next Steps */}
      <div className="border-t border-white/10 py-12 text-center text-xs text-white/40">
        This is the living lab page for the experiment. Scroll the sections above for the real experience. Assets generated on demand; more variations via the cinematic-web-lab skill + /gen --lane cinematic.<br />
        In production: install lenis, optimize assets (webm for video, responsive images), wire to real gen outputs, add to main nav or hero as proof of premium motion capability.
        <div className="mt-4">Experiment tracked in lib/design-lab/experiments.ts • Branch: feat/premium-luxury-scroll-animations-lab</div>
      </div>
    </div>
  );
}
