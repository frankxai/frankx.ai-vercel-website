'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

// ── Mesh Gradient Shader ──

const VERT = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const FRAG = `
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  // 4 brand color control points
  vec3 c0 = vec3(0.671, 0.278, 0.780); // #AB47C7
  vec3 c1 = vec3(0.263, 0.749, 0.890); // #43BFE3
  vec3 c2 = vec3(0.063, 0.725, 0.506); // #10b981
  vec3 c3 = vec3(0.039, 0.039, 0.043); // #0a0a0b

  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float smoothNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = noise(i);
    float b = noise(i + vec2(1.0, 0.0));
    float c = noise(i + vec2(0.0, 1.0));
    float d = noise(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * smoothNoise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.08;

    float n1 = fbm(uv * 2.0 + vec2(t * 0.3, t * 0.2));
    float n2 = fbm(uv * 2.5 + vec2(-t * 0.2, t * 0.4));
    float n3 = fbm(uv * 1.8 + vec2(t * 0.1, -t * 0.3));

    vec3 color = mix(c0, c1, smoothstep(0.3, 0.7, n1));
    color = mix(color, c2, smoothstep(0.4, 0.8, n2));
    color = mix(color, c3, smoothstep(0.2, 0.6, n3));

    // Vignette
    float vig = 1.0 - length((uv - 0.5) * 1.4);
    vig = smoothstep(0.0, 0.8, vig);
    color *= vig * 0.8 + 0.2;

    gl_FragColor = vec4(color, 1.0);
  }
`

function MeshGradientCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const rendererRef = useRef<any>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let THREE: any
    let scene: any, camera: any, renderer: any, material: any

    async function init() {
      THREE = await import('three')

      const dpr = Math.min(window.devicePixelRatio, 1.5)
      const w = canvas!.clientWidth
      const h = canvas!.clientHeight

      renderer = new THREE.WebGLRenderer({ canvas: canvas!, alpha: true })
      renderer.setSize(w, h)
      renderer.setPixelRatio(dpr * 0.5) // half-res for perf
      rendererRef.current = renderer

      scene = new THREE.Scene()
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

      material = new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        uniforms: {
          uTime: { value: 0 },
          uResolution: { value: new THREE.Vector2(w, h) },
        },
      })

      const geo = new THREE.PlaneGeometry(2, 2)
      scene.add(new THREE.Mesh(geo, material))

      function animate() {
        material.uniforms.uTime.value += 0.016
        renderer.render(scene, camera)
        animRef.current = requestAnimationFrame(animate)
      }
      animRef.current = requestAnimationFrame(animate)
    }

    init()

    const handleResize = () => {
      if (!rendererRef.current || !canvas) return
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      rendererRef.current.setSize(w, h)
      if (material) {
        material.uniforms.uResolution.value.set(w, h)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', handleResize)
      rendererRef.current?.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%' }}
    />
  )
}

// ── Static Gradient Fallback (mobile / reduced-motion) ──

function StaticGradient() {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(171,71,199,0.15) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(67,191,227,0.12) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
      <div
        className="absolute bottom-1/4 left-1/3 w-[350px] h-[350px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.10) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
    </div>
  )
}

// ── Word-by-Word Reveal ──

function WordReveal({ text, gradientWord, delay = 0 }: { text: string; gradientWord: string; delay?: number }) {
  const words = text.split(' ')

  return (
    <motion.h1
      className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] text-white"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.06, delayChildren: delay },
        },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={{
            hidden: { opacity: 0, y: 20, rotateX: -90 },
            visible: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              transition: { type: 'spring', stiffness: 220, damping: 26 },
            },
          }}
          style={{ display: 'inline-block', marginRight: '0.25em', transformOrigin: 'bottom' }}
          className={
            word.toLowerCase() === gradientWord.toLowerCase()
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400'
              : undefined
          }
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  )
}

// ── Main Hero ──

const staggerEase = [0.22, 1, 0.36, 1] as const

export function CosmicForgeHero() {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.8], [0, 40])

  // Mobile detection for canvas disable
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <section
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#0a0a0b' }}
    >
      {/* Mesh gradient layer */}
      <div className="absolute inset-0">
        {!shouldReduceMotion && !isMobile ? (
          <MeshGradientCanvas className="absolute inset-0" />
        ) : (
          <StaticGradient />
        )}

        {/* Blur + blend overlay */}
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: 'blur(120px) saturate(150%)',
            WebkitBackdropFilter: 'blur(120px) saturate(150%)',
            opacity: 0.4,
            mixBlendMode: 'screen',
          }}
        />
      </div>

      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6"
        style={shouldReduceMotion ? undefined : { opacity, y }}
      >
        {/* Eyebrow */}
        <motion.p
          className="text-xs font-mono tracking-[0.3em] uppercase text-white/30 mb-8"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, ease: staggerEase }}
        >
          AI Architect & Creator
        </motion.p>

        {/* Headline with gradient word */}
        {shouldReduceMotion ? (
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] text-white mb-6">
            Building{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400">
              intelligence
            </span>{' '}
            that compounds.
          </h1>
        ) : (
          <div className="mb-6">
            <WordReveal
              text="Building intelligence that compounds."
              gradientWord="intelligence"
              delay={0.3}
            />
          </div>
        )}

        {/* Subtitle */}
        <motion.p
          className="text-lg text-white/40 max-w-xl mx-auto mb-10"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.8, ease: staggerEase }}
        >
          Enterprise AI systems. 12,000+ songs. 75+ open-source skills. Everything documented.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: 1.0, ease: staggerEase }}
        >
          <button className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white px-8 h-14 text-base font-medium shadow-lg shadow-emerald-500/20 transition-all hover:shadow-xl hover:shadow-emerald-500/30 active:scale-[0.98]">
            Explore the Work
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 text-white px-8 h-14 text-base font-medium transition-all">
            Read the Blog
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5"
          animate={shouldReduceMotion ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-1 h-1.5 bg-white/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
