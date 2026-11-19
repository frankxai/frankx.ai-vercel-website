'use client'

import { useEffect, useRef } from 'react'

// Light crosses the glass once on entry. A still image provides the entire scene.
export default function CampusLight({ className }: { className: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    let active = true
    let visible = false
    let loading = false
    let stop: (() => void) | undefined

    async function illuminate() {
      if (!canvas || !active || !visible || loading || reduced.matches || document.hidden) return
      loading = true
      try {
        const { WebGLRenderer, Scene, OrthographicCamera, PlaneGeometry, ShaderMaterial, Mesh } = await import('three')
        if (!active || !visible || reduced.matches || document.hidden) return
        const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' })
        const rect = canvas.getBoundingClientRect()
        renderer.setSize(Math.max(1, Math.round(rect.width / 2)), Math.max(1, Math.round(rect.height / 2)), false)
        const geometry = new PlaneGeometry(2, 2)
        const material = new ShaderMaterial({
          transparent: true, depthWrite: false,
          uniforms: { progress: { value: 0 } },
          vertexShader: 'varying vec2 point; void main(){ point=uv; gl_Position=vec4(position.xy,0.,1.); }',
          fragmentShader: `varying vec2 point; uniform float progress;
            void main() {
              float bend = point.x + .16 * sin(point.y * 3.3 + point.x);
              float glass = exp(-38. * abs(bend - mix(-.25, 1.4, progress)));
              float fade = sin(progress * 3.14159);
              vec3 color = mix(vec3(.28,.83,.78), vec3(.99,.73,.42), point.x);
              gl_FragColor = vec4(color, glass * fade * .26);
            }`,
        })
        const scene = new Scene()
        scene.add(new Mesh(geometry, material))
        const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1)
        const start = performance.now()
        let frame = 0
        stop = () => {
          cancelAnimationFrame(frame)
          geometry.dispose()
          material.dispose()
          renderer.dispose()
          renderer.forceContextLoss()
          stop = undefined
        }
        function render(now: number) {
          if (!visible || reduced.matches || document.hidden) { stop?.(); return }
          const progress = Math.min(1, (now - start) / 1800)
          material.uniforms.progress.value = progress
          renderer.render(scene, camera)
          if (progress < 1) frame = requestAnimationFrame(render)
          else stop?.()
        }
        frame = requestAnimationFrame(render)
      } catch {
        // The photograph and CSS lighting also cover unavailable WebGL contexts.
      }
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) void illuminate()
      else stop?.()
    })
    const preferencesChanged = () => { if (reduced.matches || document.hidden) stop?.(); else void illuminate() }
    observer.observe(canvas)
    reduced.addEventListener('change', preferencesChanged)
    document.addEventListener('visibilitychange', preferencesChanged)
    return () => {
      active = false
      observer.disconnect()
      reduced.removeEventListener('change', preferencesChanged)
      document.removeEventListener('visibilitychange', preferencesChanged)
      stop?.()
    }
  }, [])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
