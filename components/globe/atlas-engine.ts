/* Explorable Trilingual Globe
 * - Orthographic canvas globe with bathymetry-style ocean, sage land, graticule
 * - Drag with inertia, scroll/pinch zoom, keyboard, auto-spin, fly-to
 * - Countries selectable; trilingual info card (EN/DE/HR) with pronunciation
 * - Quiz mode: "Find X" in chosen language, 10 rounds, score + streak
 *
 * Ported from the original IIFE prototype to a factory that binds to
 * externally-provided DOM refs and returns a cleanup function so React
 * can mount/unmount the engine cleanly.
 */
import {
  geoOrthographic,
  geoPath,
  geoGraticule10,
  geoContains,
  geoCentroid,
  geoDistance,
} from 'd3-geo'
import { feature as topoFeature, mesh as topoMesh } from 'topojson-client'
import { COUNTRIES, EXPLORE_PLACES, MAJOR_CITIES, I18N, LANGS, type Lang, type Place } from './atlas-data'

export interface AtlasRefs {
  canvas: HTMLCanvasElement
  loading: HTMLElement
  loadingText: HTMLElement
  coords: HTMLElement
  compassStar: SVGElement | null
  card: HTMLElement
  cardFlag: HTMLElement
  cardEmoji: HTMLElement
  cardTitle: HTMLElement
  cardAlts: HTMLElement
  cardKind: HTMLElement
  cardMeta: HTMLElement
  cardFact: HTMLElement
  cardClose: HTMLElement
  cardWordBlock: HTMLElement
  wordLbl: HTMLElement
  wordRow: HTMLElement
  cardListen: HTMLElement
  cardFly: HTMLElement
  cardNear: HTMLElement
  listenLbl: HTMLElement
  flyLbl: HTMLElement
  nearLbl: HTMLElement
  btnQuiz: HTMLElement
  btnQuizLbl: HTMLElement
  btnReset: HTMLElement
  btnResetLbl: HTMLElement
  btnSpin: HTMLElement
  btnSpinLbl: HTMLElement
  btnRandom: HTMLElement
  btnRandomLbl: HTMLElement
  spinState: HTMLElement
  placesList: HTMLElement
  placeCount: HTMLElement
  placesHead: HTMLElement
  hint: HTMLElement
  brand: HTMLElement
  plate: HTMLElement
  showAll: HTMLInputElement
  quiz: HTMLElement
  quizPrompt: HTMLElement
  quizTarget: HTMLElement
  quizRoundLbl: HTMLElement
  quizScoreLbl: HTMLElement
  quizStreakLbl: HTMLElement
  quizRound: HTMLElement
  quizScore: HTMLElement
  quizStreak: HTMLElement
  quizFeedback: HTMLElement
  quizSkip: HTMLElement
  quizEnd: HTMLElement
  quizListen: HTMLElement
  quizProgress: HTMLElement
  langBtns: ArrayLike<HTMLButtonElement>
}

export interface AtlasOptions {
  defaultLang?: Lang
  topoUrl?: string
}

type CountryFeature = GeoJSON.Feature<GeoJSON.Geometry, { name: string }> & {
  id?: string | number
  __centroid?: [number, number]
}
type QuizState = {
  active: boolean
  rounds: CountryFeature[]
  idx: number
  score: number
  streak: number
  targetFeature: CountryFeature | null
  revealed: boolean
  locked: boolean
} | null

export function initAtlas(refs: AtlasRefs, opts: AtlasOptions = {}): () => void {
  const abort = new AbortController()
  const { signal } = abort
  const timers: ReturnType<typeof setTimeout>[] = []
  const setT = (fn: () => void, ms: number) => {
    const id = setTimeout(() => { if (!signal.aborted) fn() }, ms)
    timers.push(id)
    return id
  }
  const on = <K extends keyof GlobalEventHandlersEventMap>(
    target: EventTarget,
    type: K | string,
    listener: (ev: Event) => void,
    options?: AddEventListenerOptions | boolean,
  ) => {
    const opts2: AddEventListenerOptions = typeof options === 'object' && options !== null
      ? { ...options, signal }
      : { signal, ...(options === true ? { capture: true } : {}) }
    target.addEventListener(type, listener as EventListener, opts2)
  }

  const topoUrl = opts.topoUrl || '/globe/countries-50m.json'

  const canvas = refs.canvas
  const ctx = canvas.getContext('2d')!
  const loadingEl = refs.loading
  const loadingText = refs.loadingText
  const coordsEl = refs.coords
  const compassStar = refs.compassStar

  const cardEl = refs.card
  const cardFlag = refs.cardFlag
  const cardEmoji = refs.cardEmoji
  const cardTitle = refs.cardTitle
  const cardAlts = refs.cardAlts
  const cardKind = refs.cardKind
  const cardMeta = refs.cardMeta
  const cardFact = refs.cardFact
  const cardClose = refs.cardClose
  const cardWordBlock = refs.cardWordBlock
  const wordLbl = refs.wordLbl
  const wordRow = refs.wordRow
  const cardListen = refs.cardListen
  const cardFly = refs.cardFly
  const cardNear = refs.cardNear
  const listenLbl = refs.listenLbl
  const flyLbl = refs.flyLbl
  const nearLbl = refs.nearLbl

  const btnQuiz = refs.btnQuiz
  const btnQuizLbl = refs.btnQuizLbl
  const btnReset = refs.btnReset
  const btnResetLbl = refs.btnResetLbl
  const btnSpin = refs.btnSpin
  const btnSpinLbl = refs.btnSpinLbl
  const btnRandom = refs.btnRandom
  const btnRandomLbl = refs.btnRandomLbl
  const spinState = refs.spinState
  const placesList = refs.placesList
  const placeCount = refs.placeCount
  const placesHead = refs.placesHead
  const hintEl = refs.hint
  const brandEl = refs.brand
  const plateEl = refs.plate
  const showAll = refs.showAll

  const quizEl = refs.quiz
  const quizPrompt = refs.quizPrompt
  const quizTarget = refs.quizTarget
  const quizRoundLbl = refs.quizRoundLbl
  const quizScoreLbl = refs.quizScoreLbl
  const quizStreakLbl = refs.quizStreakLbl
  const quizRound = refs.quizRound
  const quizScore = refs.quizScore
  const quizStreak = refs.quizStreak
  const quizFeedback = refs.quizFeedback
  const quizSkip = refs.quizSkip
  const quizEnd = refs.quizEnd
  const quizListen = refs.quizListen
  const quizProgress = refs.quizProgress
  const langBtns = refs.langBtns

  // ---------- Lang state ----------
  const storedLangRaw = typeof localStorage !== 'undefined' ? localStorage.getItem('atlas.lang') : null
  const storedLang = storedLangRaw && (LANGS as readonly string[]).includes(storedLangRaw) ? (storedLangRaw as Lang) : null
  let LANG: Lang = storedLang || opts.defaultLang || 'en'
  let SHOW_ALL = typeof localStorage !== 'undefined' && localStorage.getItem('atlas.all') === '1'
  showAll.checked = SHOW_ALL
  const T = (key: string): string => (I18N[key] && I18N[key][LANG]) || ''

  function applyI18N() {
    brandEl.innerHTML = LANG === 'en'
      ? 'Atlas <em>— Explore the World</em>'
      : LANG === 'de'
        ? 'Atlas <em>— Entdecke die Welt</em>'
        : 'Atlas <em>— Istraži svijet</em>'
    plateEl.textContent = T('plate')
    btnQuizLbl.textContent = T('quiz')
    btnResetLbl.textContent = T('reset')
    btnSpinLbl.textContent = T('autospin')
    btnRandomLbl.textContent = T('surprise')
    listenLbl.textContent = T('listen')
    flyLbl.textContent = T('fly_here')
    nearLbl.textContent = T('near')
    placesHead.textContent = T('places_to_explore')
    hintEl.textContent = T('hint_line')
    loadingText.textContent = T('charting')
    quizPrompt.textContent = T('find') + ':'
    quizRoundLbl.textContent = T('round')
    quizScoreLbl.textContent = T('score')
    quizStreakLbl.textContent = T('streak')
    wordLbl.textContent = T('word_of_place')
    for (let i = 0; i < langBtns.length; i++) {
      const b = langBtns[i]
      b.classList.toggle('active', b.dataset.lang === LANG)
    }
    document.documentElement.lang = LANG
    rebuildPlaces()
    if (selected) refreshCard()
  }
  for (let i = 0; i < langBtns.length; i++) {
    const b = langBtns[i]
    on(b, 'click', () => {
      const next = b.dataset.lang as Lang | undefined
      if (!next || !(LANGS as readonly string[]).includes(next)) return
      LANG = next
      try { localStorage.setItem('atlas.lang', LANG) } catch {}
      applyI18N()
    })
  }
  on(showAll, 'change', () => {
    SHOW_ALL = showAll.checked
    try { localStorage.setItem('atlas.all', SHOW_ALL ? '1' : '0') } catch {}
    if (selected) refreshCard()
  })

  // ---------- Sizing / DPR ----------
  const DPR = Math.max(1, Math.min(window.devicePixelRatio || 1, 2))
  let cssW = 0, cssH = 0, cx = 0, cy = 0, baseR = 300
  let zoom = 1
  const MIN_ZOOM = 0.65, MAX_ZOOM = 3.2
  function fit() {
    cssW = window.innerWidth; cssH = window.innerHeight
    canvas.style.width = cssW + 'px'; canvas.style.height = cssH + 'px'
    canvas.width = Math.floor(cssW * DPR); canvas.height = Math.floor(cssH * DPR)
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    cx = cssW / 2; cy = cssH / 2
    baseR = Math.min(cssW, cssH) * 0.38
    projection.translate([cx, cy]).scale(radius())
  }
  const radius = () => baseR * zoom

  // ---------- Projection ----------
  const projection = geoOrthographic().clipAngle(90).precision(0.5)
  const path = geoPath(projection, ctx)
  const graticule = geoGraticule10()

  // ---------- State ----------
  let rotation: [number, number, number] = [20, -18, 0]
  let velocity: [number, number] = [6, 0]
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let autoSpin = !reducedMotion
  const autoSpinSpeed = 6
  let lastInteractAt = 0
  let dragging = false, dragMoved = false
  let pointerPrev: { x: number; y: number; t: number } | null = null
  let velHistory: { dx: number; dy: number; dt: number }[] = []
  let flying: { fromRot: [number, number]; toRot: [number, number]; fromZoom: number; toZoom: number; startT: number; dur: number } | null = null
  let hoverCountry: CountryFeature | null = null
  type Selection =
    | { kind: 'country'; id: string | number | undefined; feature: CountryFeature }
    | { kind: 'place'; id: string; place: Place }
  let selected: Selection | null = null
  let countries: FeatureCollectionT | null = null
  let countryMesh: GeoJSON.MultiLineString | null = null
  let land: GeoJSON.Feature<GeoJSON.MultiPolygon | GeoJSON.Polygon> | null = null
  let quiz: QuizState = null

  type FeatureCollectionT = GeoJSON.FeatureCollection<GeoJSON.Geometry, { name: string }> & {
    features: CountryFeature[]
  }

  async function loadWorld() {
    const res = await fetch(topoUrl, { signal })
    if (!res.ok) throw new Error('topo ' + res.status)
    const topo = await res.json()
    const fc = topoFeature(topo, topo.objects.countries) as unknown as FeatureCollectionT
    countries = fc
    countryMesh = topoMesh(topo, topo.objects.countries, (a: unknown, b: unknown) => a !== b) as unknown as GeoJSON.MultiLineString
    if (topo.objects.land) {
      land = topoFeature(topo, topo.objects.land) as unknown as GeoJSON.Feature<GeoJSON.MultiPolygon | GeoJSON.Polygon>
    }
    for (const f of countries.features) {
      f.__centroid = geoCentroid(f as GeoJSON.Feature) as [number, number]
    }
  }

  // ---------- Palette ----------
  const C = {
    ocean1: '#b9d4d0', ocean2: '#8fb5b2', ocean3: '#5e8e8d',
    land1: '#d6d9aa', land2: '#c2c68f', land3: '#a9b073',
    landStroke: 'rgba(27,35,36,0.45)',
    countryStroke: 'rgba(27,35,36,0.55)',
    graticule: 'rgba(27,35,36,0.08)',
    rim: '#1b2324',
    highlight: '#b2452a',
    highlightFill: 'rgba(178,69,42,0.22)',
    hoverFill: 'rgba(27,35,36,0.11)',
    gold: '#e0c269',
    ink: '#1b2324',
    inkSoft: 'rgba(27,35,36,0.55)',
    quizGlow: 'rgba(224,194,105,0.22)',
  }

  // ---------- Drawing ----------
  function drawOcean(t: number) {
    const r = radius()
    ctx.save()
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.fillStyle = C.ocean2; ctx.fill()

    const g = ctx.createRadialGradient(cx - r * 0.28, cy - r * 0.3, r * 0.05, cx, cy, r * 1.05)
    g.addColorStop(0.0, 'rgba(255,253,240,0.55)')
    g.addColorStop(0.3, C.ocean1)
    g.addColorStop(0.75, C.ocean2)
    g.addColorStop(1.0, C.ocean3)
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.fillStyle = g; ctx.fill()

    ctx.beginPath(); ctx.arc(cx, cy, r - 0.5, 0, Math.PI * 2); ctx.clip()

    ctx.strokeStyle = 'rgba(27,35,36,0.055)'
    ctx.lineWidth = 0.8
    for (let i = 1; i < 6; i++) {
      const rr = r * (i / 6)
      ctx.beginPath(); ctx.arc(cx, cy, rr, 0, Math.PI * 2); ctx.stroke()
    }

    const phase = (t * 0.00006) % 1
    ctx.strokeStyle = 'rgba(255,255,255,0.06)'
    ctx.lineWidth = 0.8
    for (let i = 0; i < 5; i++) {
      const frac = ((i + phase) % 5) / 5
      const rr = r * (0.2 + frac * 0.9)
      ctx.beginPath(); ctx.arc(cx, cy, rr, 0, Math.PI * 2); ctx.stroke()
    }
    ctx.restore()
  }

  function drawGraticule() {
    ctx.beginPath(); path(graticule as unknown as GeoJSON.GeoJSON)
    ctx.strokeStyle = C.graticule; ctx.lineWidth = 0.6; ctx.stroke()
  }

  function drawLand() {
    if (!land) return
    ctx.beginPath(); path(land)
    ctx.fillStyle = C.land1; ctx.fill()
    ctx.save()
    ctx.globalCompositeOperation = 'source-atop'
    const g = ctx.createRadialGradient(cx - radius() * 0.35, cy - radius() * 0.35, radius() * 0.1, cx, cy, radius())
    g.addColorStop(0, 'rgba(255,253,240,0.35)')
    g.addColorStop(0.6, 'rgba(169,176,115,0.0)')
    g.addColorStop(1, 'rgba(27,35,36,0.15)')
    ctx.fillStyle = g
    ctx.beginPath(); path(land); ctx.fill()
    ctx.restore()
  }

  function drawCountries(_t: number) {
    if (!countries || !countryMesh) return
    const center = invertCenter()
    if (quiz && quiz.active && quiz.targetFeature) {
      if (quiz.revealed) {
        ctx.beginPath(); path(quiz.targetFeature)
        ctx.fillStyle = C.quizGlow; ctx.fill()
      }
    }
    for (const f of countries.features) {
      if (!f.__centroid) continue
      const d = geoDistance(f.__centroid, center)
      if (d > Math.PI / 2 + 0.15) continue
      if (selected && selected.kind === 'country' && selected.id === f.id) {
        ctx.beginPath(); path(f); ctx.fillStyle = C.highlightFill; ctx.fill()
      } else if (hoverCountry && hoverCountry.id === f.id) {
        ctx.beginPath(); path(f); ctx.fillStyle = C.hoverFill; ctx.fill()
      }
    }
    ctx.beginPath(); path(countryMesh)
    ctx.strokeStyle = C.countryStroke; ctx.lineWidth = 0.55; ctx.stroke()

    if (selected && selected.kind === 'country' && selected.feature) {
      ctx.beginPath(); path(selected.feature)
      ctx.strokeStyle = C.highlight; ctx.lineWidth = 1.7; ctx.stroke()
    }
    if (hoverCountry && (!selected || selected.id !== hoverCountry.id)) {
      ctx.beginPath(); path(hoverCountry)
      ctx.strokeStyle = 'rgba(27,35,36,0.85)'; ctx.lineWidth = 1.0; ctx.stroke()
    }
    if (land) {
      ctx.beginPath(); path(land)
      ctx.strokeStyle = C.landStroke; ctx.lineWidth = 0.7; ctx.stroke()
    }
  }

  function drawRim() {
    const r = radius()
    ctx.save()
    const halo = ctx.createRadialGradient(cx, cy, r * 0.98, cx, cy, r * 1.12)
    halo.addColorStop(0, 'rgba(27,35,36,0.25)')
    halo.addColorStop(1, 'rgba(27,35,36,0)')
    ctx.fillStyle = halo
    ctx.beginPath(); ctx.arc(cx, cy, r * 1.12, 0, Math.PI * 2); ctx.fill()
    ctx.restore()

    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.strokeStyle = C.rim; ctx.lineWidth = 1.2; ctx.stroke()

    ctx.save()
    ctx.strokeStyle = 'rgba(27,35,36,0.6)'; ctx.lineWidth = 0.8
    for (let i = 0; i < 72; i++) {
      const a = (i / 72) * Math.PI * 2
      const r1 = r + 6, r2 = r + (i % 6 === 0 ? 12 : 9)
      ctx.beginPath()
      ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1)
      ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2)
      ctx.stroke()
    }
    ctx.restore()
  }

  function projectPoint(lonlat: [number, number]): [number, number] | null {
    const p = projection(lonlat)
    if (!p) return null
    const d = geoDistance(lonlat, invertCenter())
    if (d > Math.PI / 2) return null
    return [p[0], p[1]]
  }

  function drawCities() {
    for (const c of MAJOR_CITIES) {
      const p = projectPoint(c.coord); if (!p) continue
      ctx.beginPath(); ctx.arc(p[0], p[1], 1.7, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(27,35,36,0.55)'; ctx.fill()
    }
  }

  function drawPlaces(t: number) {
    const pulse = 0.5 + 0.5 * Math.sin(t * 0.003)
    for (const place of EXPLORE_PLACES) {
      const p = projectPoint(place.coord); if (!p) continue
      const isSel = selected && selected.kind === 'place' && selected.id === place.id
      ctx.beginPath(); ctx.arc(p[0], p[1], 6 + pulse * 3, 0, Math.PI * 2)
      ctx.fillStyle = isSel ? 'rgba(178,69,42,0.22)' : 'rgba(178,69,42,0.12)'; ctx.fill()
      ctx.beginPath(); ctx.arc(p[0], p[1], 4, 0, Math.PI * 2)
      ctx.fillStyle = C.highlight; ctx.fill()
      ctx.beginPath(); ctx.arc(p[0], p[1], 1.6, 0, Math.PI * 2)
      ctx.fillStyle = '#faf2dd'; ctx.fill()
      if (isSel) {
        ctx.beginPath(); ctx.arc(p[0], p[1], 9, 0, Math.PI * 2)
        ctx.strokeStyle = C.highlight; ctx.lineWidth = 1.2; ctx.stroke()
      }
    }
  }

  function drawSelectedLabel() {
    if (!selected) return
    let label: string, coord: [number, number] | undefined
    if (selected.kind === 'place') {
      label = selected.place.name[LANG] || selected.place.name.en
      coord = selected.place.coord
    } else if (selected.kind === 'country' && selected.feature) {
      const info = COUNTRIES[selected.feature.properties.name]
      label = info ? (info.name[LANG] || info.name.en) : selected.feature.properties.name
      coord = selected.feature.__centroid || (geoCentroid(selected.feature as GeoJSON.Feature) as [number, number])
    } else return
    if (!coord) return

    const p = projectPoint(coord); if (!p) return
    ctx.save()
    ctx.font = '600 12px "Fraunces", Georgia, serif'
    const padX = 8
    const tw = ctx.measureText(label).width
    const lx = p[0] + 12, ly = p[1] - 16
    ctx.strokeStyle = C.ink; ctx.lineWidth = 0.8
    ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(lx, ly + 10); ctx.stroke()
    ctx.fillStyle = '#faf2dd'
    ctx.strokeStyle = C.ink; ctx.lineWidth = 1
    ctx.beginPath(); ctx.rect(lx, ly, tw + padX * 2, 22); ctx.fill(); ctx.stroke()
    ctx.fillStyle = C.ink; ctx.textBaseline = 'middle'
    ctx.fillText(label, lx + padX, ly + 11)
    ctx.restore()
  }

  const invertCenter = (): [number, number] => [-rotation[0], -rotation[1]]

  // ---------- Render loop ----------
  let lastT = performance.now()
  let rafId = 0
  function render(t: number) {
    try {
      const dt = Math.min(0.064, (t - lastT) / 1000); lastT = t
      if (!dragging && !flying) {
        const idle = (t - lastInteractAt) > 1500
        const spinning = autoSpin && idle && !(quiz && quiz.active)
        if (spinning) {
          velocity[0] += (autoSpinSpeed - velocity[0]) * Math.min(1, dt * 1.2)
          velocity[1] *= Math.pow(0.9, dt * 60)
        } else {
          velocity[0] *= Math.pow(0.92, dt * 60)
          velocity[1] *= Math.pow(0.92, dt * 60)
          if (Math.abs(velocity[0]) < 0.05) velocity[0] = 0
          if (Math.abs(velocity[1]) < 0.05) velocity[1] = 0
        }
        rotation[0] += velocity[0] * dt
        rotation[1] += velocity[1] * dt
        rotation[1] = Math.max(-85, Math.min(85, rotation[1]))
      }
      if (flying) {
        const k = Math.min(1, (t - flying.startT) / flying.dur)
        const e = easeInOut(k)
        rotation[0] = lerpAngle(flying.fromRot[0], flying.toRot[0], e)
        rotation[1] = flying.fromRot[1] + (flying.toRot[1] - flying.fromRot[1]) * e
        zoom = flying.fromZoom + (flying.toZoom - flying.fromZoom) * e
        if (k >= 1) flying = null
      }
      projection.rotate(rotation).scale(radius()).translate([cx, cy])
      ctx.clearRect(0, 0, cssW, cssH)
      drawOcean(t)
      ctx.save()
      ctx.beginPath(); ctx.arc(cx, cy, radius(), 0, Math.PI * 2); ctx.clip()
      drawGraticule()
      drawLand()
      drawCountries(t)
      drawCities()
      drawPlaces(t)
      ctx.restore()
      drawRim()
      drawSelectedLabel()
      coordsEl.textContent = fmtCoords()
      if (compassStar) (compassStar as SVGElement).style.transform = `rotate(${-rotation[2]}deg)`
    } catch (err) {
      console.error('render error', err)
    }
    if (!signal.aborted) rafId = requestAnimationFrame(render)
  }
  const easeInOut = (x: number) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2)
  function lerpAngle(a: number, b: number, t: number) { const d = (((b - a + 540) % 360) - 180); return a + d * t }
  function fmtCoords() {
    const lat = -rotation[1]
    const lon = ((-rotation[0] + 540) % 360) - 180
    const f = (v: number, pos: string, neg: string) => {
      const a = Math.abs(v), d = Math.floor(a), m = Math.floor((a - d) * 60)
      return `${String(d).padStart(2, '0')}°${String(m).padStart(2, '0')}′${v >= 0 ? pos : neg}`
    }
    return `LAT ${f(lat, 'N', 'S')} · LON ${f(lon, 'E', 'W')}`
  }

  // ---------- Picking / interaction ----------
  function screenToSphere(px: number, py: number): [number, number] | null {
    const dx = px - cx, dy = py - cy
    if (dx * dx + dy * dy > radius() * radius()) return null
    const inv = projection.invert && projection.invert([px, py])
    return inv ? [inv[0], inv[1]] : null
  }
  function pickCountry(px: number, py: number): CountryFeature | null {
    const ll = screenToSphere(px, py); if (!ll || !countries) return null
    for (const f of countries.features) { if (geoContains(f as GeoJSON.Feature, ll)) return f }
    return null
  }
  function pickPlace(px: number, py: number): Place | null {
    const HIT2 = 100; let best: Place | null = null, bestD = HIT2
    for (const place of EXPLORE_PLACES) {
      const p = projectPoint(place.coord); if (!p) continue
      const dx = p[0] - px, dy = p[1] - py; const d2 = dx * dx + dy * dy
      if (d2 < bestD) { bestD = d2; best = place }
    }
    return best
  }

  const activePointers = new Map<number, { x: number; y: number }>()
  let pinchStartDist = 0, pinchStartZoom = 1

  on(canvas, 'pointerdown', (ev) => {
    const e = ev as PointerEvent
    canvas.setPointerCapture(e.pointerId)
    dragging = true; dragMoved = false
    pointerPrev = { x: e.clientX, y: e.clientY, t: performance.now() }
    velHistory.length = 0; velocity[0] = 0; velocity[1] = 0
    canvas.classList.add('grabbing'); lastInteractAt = performance.now(); flying = null
    activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY })
  })
  on(canvas, 'pointermove', (ev) => {
    const e = ev as PointerEvent
    const rect = canvas.getBoundingClientRect()
    const px = e.clientX - rect.left, py = e.clientY - rect.top
    if (activePointers.has(e.pointerId)) activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY })
    if (activePointers.size === 2) {
      const pts = [...activePointers.values()]
      const d = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y)
      if (pinchStartDist === 0) { pinchStartDist = d; pinchStartZoom = zoom }
      else zoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, pinchStartZoom * (d / pinchStartDist)))
      return
    }
    if (dragging && pointerPrev) {
      const dx = e.clientX - pointerPrev.x, dy = e.clientY - pointerPrev.y
      if (Math.abs(dx) + Math.abs(dy) > 2) dragMoved = true
      const k = 0.25 / zoom
      rotation[0] += dx * k; rotation[1] -= dy * k
      rotation[1] = Math.max(-85, Math.min(85, rotation[1]))
      const now = performance.now()
      velHistory.push({ dx, dy, dt: Math.max(1, now - pointerPrev.t) })
      if (velHistory.length > 5) velHistory.shift()
      pointerPrev = { x: e.clientX, y: e.clientY, t: now }
      lastInteractAt = now
    } else {
      const place = pickPlace(px, py)
      if (place) { canvas.classList.add('pointer'); hoverCountry = null }
      else {
        const f = pickCountry(px, py)
        hoverCountry = f
        if (f) canvas.classList.add('pointer'); else canvas.classList.remove('pointer')
      }
    }
  })
  function endDrag() {
    if (!dragging) return
    dragging = false; canvas.classList.remove('grabbing')
    if (velHistory.length) {
      let sx = 0, sy = 0, st = 0
      for (const v of velHistory) { sx += v.dx; sy += v.dy; st += v.dt }
      if (st > 0) { const k = 0.25 / zoom; velocity[0] = (sx / st) * k * 1000; velocity[1] = -(sy / st) * k * 1000 }
    }
    lastInteractAt = performance.now()
  }
  on(canvas, 'pointerup', (ev) => {
    const e = ev as PointerEvent
    if (!dragMoved) handleClick(e)
    endDrag()
    activePointers.delete(e.pointerId); if (activePointers.size < 2) pinchStartDist = 0
  })
  on(canvas, 'pointercancel', (ev) => {
    const e = ev as PointerEvent
    endDrag(); activePointers.delete(e.pointerId); pinchStartDist = 0
  })
  on(canvas, 'pointerleave', () => { hoverCountry = null; canvas.classList.remove('pointer') })
  on(canvas, 'dblclick', (ev) => {
    const e = ev as MouseEvent
    const rect = canvas.getBoundingClientRect()
    const px = e.clientX - rect.left, py = e.clientY - rect.top
    const place = pickPlace(px, py)
    if (place) { selectPlace(place); flyTo(place.coord, 1.8); return }
    const f = pickCountry(px, py)
    if (f && f.__centroid) { selectCountry(f); flyTo(f.__centroid, Math.max(1.4, Math.min(2.4, zoom * 1.6))) }
  })
  on(canvas, 'wheel', (ev) => {
    const e = ev as WheelEvent
    e.preventDefault()
    zoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom * Math.exp(-e.deltaY * 0.0015)))
    lastInteractAt = performance.now()
  }, { passive: false })

  function handleClick(e: PointerEvent) {
    const rect = canvas.getBoundingClientRect()
    const px = e.clientX - rect.left, py = e.clientY - rect.top
    const place = pickPlace(px, py)
    if (place) { selectPlace(place); flyTo(place.coord, Math.max(1.4, zoom)); return }
    const f = pickCountry(px, py)
    if (f && f.__centroid) {
      selectCountry(f)
      if (quiz && quiz.active) quizAnswer(f)
      else flyTo(f.__centroid, zoom)
    } else {
      if (selected) { selected = null; closeCard() }
    }
  }

  on(window, 'keydown', (ev) => {
    const e = ev as KeyboardEvent
    const target = e.target as HTMLElement | null
    if (target && target.tagName === 'INPUT') return
    const STEP = 10
    if (e.key === 'ArrowLeft') { rotation[0] -= STEP; velocity[0] = 0; lastInteractAt = performance.now(); flying = null }
    else if (e.key === 'ArrowRight') { rotation[0] += STEP; velocity[0] = 0; lastInteractAt = performance.now(); flying = null }
    else if (e.key === 'ArrowUp') { rotation[1] = Math.max(-85, rotation[1] + STEP); velocity[1] = 0; lastInteractAt = performance.now(); flying = null }
    else if (e.key === 'ArrowDown') { rotation[1] = Math.min(85, rotation[1] - STEP); velocity[1] = 0; lastInteractAt = performance.now(); flying = null }
    else if (e.key === 'r' || e.key === 'R') resetView()
    else if (e.key === 'Escape') { if (quiz && quiz.active) endQuiz(); else if (selected) { selected = null; closeCard() } }
    else if (e.key === '+' || e.key === '=') zoom = Math.min(MAX_ZOOM, zoom * 1.15)
    else if (e.key === '-' || e.key === '_') zoom = Math.max(MIN_ZOOM, zoom / 1.15)
  })

  // ---------- Selection / card ----------
  function selectCountry(f: CountryFeature) {
    selected = { kind: 'country', id: f.id, feature: f }
    refreshCard()
  }
  function selectPlace(p: Place) {
    selected = { kind: 'place', id: p.id, place: p }
    refreshCard()
  }
  function refreshCard() {
    if (!selected) return
    if (selected.kind === 'country') {
      const f = selected.feature
      const info = COUNTRIES[f.properties.name]
      const primary = info ? (info.name[LANG] || info.name.en) : f.properties.name
      cardKind.textContent = T('country')
      cardTitle.textContent = primary
      cardFlag.textContent = info?.flag || ''
      cardEmoji.textContent = info?.emoji || ''
      cardAlts.innerHTML = ''
      if (info) {
        const others = LANGS.filter((l) => l !== LANG)
        for (const l of others) {
          const s = document.createElement('span')
          s.textContent = info.name[l]; cardAlts.appendChild(s)
        }
      }
      cardMeta.innerHTML = ''
      if (info) {
        const cap = document.createElement('div')
        cap.className = 'cap'
        const primaryCap = info.capital[LANG] || info.capital.en
        const altCap = SHOW_ALL
          ? ` <em>(${info.capital.en === info.capital.de ? info.capital.en : info.capital.en + ' / ' + info.capital.de}${info.capital.hr && info.capital.hr !== info.capital.en ? ' / ' + info.capital.hr : ''})</em>`
          : ''
        cap.innerHTML = `${T('capital')} · <b>${primaryCap}</b>${altCap}`
        cardMeta.appendChild(cap)
      }
      cardFact.textContent = info ? (info.fact[LANG] || info.fact.en) : '—'
      const wordList = info?.words || (info?.word ? [info.word] : [])
      if (wordList.length) {
        cardWordBlock.style.display = 'block'
        wordRow.innerHTML = ''
        for (const word of wordList) {
          const group = document.createElement('div')
          group.className = 'word-group'
          const primaryW = document.createElement('span')
          primaryW.className = 'w primary'
          primaryW.innerHTML = `${word[LANG]} <small>${LANG.toUpperCase()}</small>`
          group.appendChild(primaryW)
          for (const l of LANGS.filter((x) => x !== LANG)) {
            const w = document.createElement('span')
            w.className = 'w'
            w.innerHTML = `${word[l]} <small>${l.toUpperCase()}</small>`
            group.appendChild(w)
          }
          wordRow.appendChild(group)
        }
      } else {
        cardWordBlock.style.display = 'none'
      }
      openCard()
    } else if (selected.kind === 'place') {
      const p = selected.place
      cardKind.textContent = T('landmark')
      cardTitle.textContent = p.name[LANG] || p.name.en
      const info = COUNTRIES[p.country_key]
      cardFlag.textContent = info?.flag || ''
      cardEmoji.textContent = info?.emoji || ''
      cardAlts.innerHTML = ''
      for (const l of LANGS.filter((x) => x !== LANG)) {
        const s = document.createElement('span'); s.textContent = p.name[l]; cardAlts.appendChild(s)
      }
      cardMeta.innerHTML = ''
      if (info) {
        const c = document.createElement('div'); c.className = 'cap'
        c.innerHTML = `${T('country')} · <b>${info.name[LANG] || info.name.en}</b>`
        cardMeta.appendChild(c)
      }
      cardFact.textContent = p.blurb[LANG] || p.blurb.en
      cardWordBlock.style.display = 'none'
      openCard()
    }
  }
  const openCard = () => { cardEl.classList.add('open'); cardEl.setAttribute('aria-hidden', 'false') }
  const closeCard = () => { cardEl.classList.remove('open'); cardEl.setAttribute('aria-hidden', 'true') }
  on(cardClose, 'click', () => { selected = null; closeCard() })
  on(cardFly, 'click', () => {
    if (!selected) return
    const c = selected.kind === 'country' ? selected.feature.__centroid : selected.place.coord
    if (c) flyTo(c, Math.max(1.6, zoom))
  })
  on(cardNear, 'click', () => {
    if (!selected) return
    const c = selected.kind === 'country' ? selected.feature.__centroid : selected.place.coord
    if (!c) return
    const near = EXPLORE_PLACES.map((p) => ({ p, d: geoDistance(c, p.coord) }))
      .sort((a, b) => a.d - b.d)[0]
    if (near) { selectPlace(near.p); flyTo(near.p.coord, Math.max(1.6, zoom)) }
  })
  on(cardListen, 'click', () => { if (selected) speakSelected() })

  // ---------- Pronunciation (Web Speech API) ----------
  function pickVoice(lang: Lang): SpeechSynthesisVoice | null {
    if (!('speechSynthesis' in window)) return null
    const voices = speechSynthesis.getVoices()
    const prefs: Record<Lang, string[]> = { en: ['en-US', 'en-GB', 'en'], de: ['de-DE', 'de-AT', 'de'], hr: ['hr-HR', 'hr', 'sr', 'bs'] }
    for (const code of prefs[lang] || [lang]) {
      const v = voices.find((v) => v.lang && v.lang.toLowerCase().startsWith(code.toLowerCase()))
      if (v) return v
    }
    return voices[0] || null
  }
  function speak(text: string, lang: Lang) {
    if (!('speechSynthesis' in window) || !text) return
    try { speechSynthesis.cancel() } catch {}
    const u = new SpeechSynthesisUtterance(text)
    const v = pickVoice(lang)
    if (v) u.voice = v
    u.lang = lang === 'hr' ? 'hr-HR' : lang === 'de' ? 'de-DE' : 'en-US'
    u.rate = 0.95; u.pitch = 1
    speechSynthesis.speak(u)
  }
  function speakSelected() {
    if (!selected) return
    if (selected.kind === 'country') {
      const info = COUNTRIES[selected.feature.properties.name]
      const name = info ? (info.name[LANG] || info.name.en) : selected.feature.properties.name
      const cap = info ? (info.capital[LANG] || info.capital.en) : ''
      const word = info && info.word ? (info.word[LANG] || info.word.en) : ''
      const text = LANG === 'de'
        ? `${name}. Hauptstadt: ${cap}. Wort des Ortes: ${word}.`
        : LANG === 'hr'
          ? `${name}. Glavni grad: ${cap}. Riječ mjesta: ${word}.`
          : `${name}. Capital: ${cap}. Word of the place: ${word}.`
      speak(text, LANG)
    } else {
      const p = selected.place
      speak(p.name[LANG] || p.name.en, LANG)
    }
  }
  if ('speechSynthesis' in window) {
    speechSynthesis.onvoiceschanged = () => {}
  }

  // ---------- Fly-to / reset ----------
  function flyTo(lonlat: [number, number], toZoom?: number) {
    flying = {
      fromRot: [rotation[0], rotation[1]],
      toRot: [-lonlat[0], -lonlat[1]],
      fromZoom: zoom,
      toZoom: toZoom || zoom,
      startT: performance.now(),
      dur: 1100,
    }
    lastInteractAt = performance.now()
  }
  function resetView() { flyTo([-20, 18], 1) }

  // ---------- Places list ----------
  function rebuildPlaces() {
    placeCount.textContent = String(EXPLORE_PLACES.length)
    placesList.innerHTML = ''
    EXPLORE_PLACES.forEach((p, i) => {
      const row = document.createElement('div')
      row.className = 'item'
      const info = COUNTRIES[p.country_key]
      const cname = info ? (info.name[LANG] || info.name.en) : p.country_key
      row.innerHTML = `<span class="num">${String(i + 1).padStart(2, '0')}</span>
                       <span class="nm">${p.name[LANG] || p.name.en}</span>
                       <span class="loc">${cname}</span>`
      row.addEventListener('click', () => { selectPlace(p); flyTo(p.coord, 1.7) }, { signal })
      placesList.appendChild(row)
    })
  }

  // ---------- Controls ----------
  on(btnReset, 'click', resetView)
  on(btnSpin, 'click', () => { autoSpin = !autoSpin; spinState.textContent = autoSpin ? 'ON' : 'OFF' })
  if (!autoSpin) spinState.textContent = 'OFF'
  on(btnRandom, 'click', () => {
    if (!EXPLORE_PLACES.length) return
    const p = EXPLORE_PLACES[Math.floor(Math.random() * EXPLORE_PLACES.length)]
    selectPlace(p); flyTo(p.coord, 1.8)
  })

  // ---------- Quiz ----------
  function quizEligibleCountries(): CountryFeature[] {
    if (!countries) return []
    return countries.features.filter((f) => !!COUNTRIES[f.properties.name])
  }
  function startQuiz() {
    const pool = quizEligibleCountries()
    if (pool.length < 5) return
    const shuffled = pool.slice().sort(() => Math.random() - 0.5)
    quiz = {
      active: true,
      rounds: shuffled.slice(0, 10),
      idx: 0, score: 0, streak: 0,
      targetFeature: null, revealed: false, locked: false,
    }
    autoSpin = false; spinState.textContent = 'OFF'
    quizEl.classList.add('show')
    btnQuiz.innerHTML = `<svg class="ico" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg> <span>${T('quit_quiz')}</span>`
    nextQuizRound()
  }
  function endQuiz() {
    quiz = null
    quizEl.classList.remove('show')
    btnQuiz.innerHTML = `<svg class="ico" viewBox="0 0 16 16" fill="none"><path d="M3 8a5 5 0 1 0 10 0 5 5 0 0 0-10 0zm5-3v3l2 2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg> <span>${T('quiz')}</span>`
  }
  function nextQuizRound() {
    if (!quiz) return
    if (quiz.idx >= quiz.rounds.length) { finishQuiz(); return }
    const f = quiz.rounds[quiz.idx]
    quiz.targetFeature = f; quiz.revealed = false; quiz.locked = false
    const info = COUNTRIES[f.properties.name]
    const targetName = info ? (info.name[LANG] || info.name.en) : f.properties.name
    quizTarget.textContent = targetName
    quizRound.textContent = `${quiz.idx + 1}/${quiz.rounds.length}`
    quizScore.textContent = String(quiz.score)
    quizStreak.textContent = String(quiz.streak)
    quizFeedback.textContent = ''
    quizFeedback.className = 'feedback'
    quizProgress.style.width = ((quiz.idx) / quiz.rounds.length * 100) + '%'
    const awayLon = Math.random() * 360 - 180
    const awayLat = (Math.random() * 60 - 30)
    flyTo([awayLon, awayLat], 1.1)
  }
  on(quizListen, 'click', () => {
    if (!quiz || !quiz.targetFeature) return
    const info = COUNTRIES[quiz.targetFeature.properties.name]
    const targetName = info ? (info.name[LANG] || info.name.en) : quiz.targetFeature.properties.name
    speak(targetName, LANG)
  })
  function quizAnswer(feature: CountryFeature) {
    if (!quiz || quiz.locked || !quiz.targetFeature) return
    const correct = feature.id === quiz.targetFeature.id
    quiz.locked = true
    if (correct) {
      quiz.score += 1 + Math.min(5, quiz.streak)
      quiz.streak += 1
      quizFeedback.textContent = '✓ ' + T('correct')
      quizFeedback.className = 'feedback good'
    } else {
      quiz.streak = 0
      const info = COUNTRIES[quiz.targetFeature.properties.name]
      const correctName = info ? (info.name[LANG] || info.name.en) : quiz.targetFeature.properties.name
      quizFeedback.textContent = '✗ ' + T('wrong') + ' ' + correctName
      quizFeedback.className = 'feedback bad'
      quiz.revealed = true
      const tc = quiz.targetFeature.__centroid || (geoCentroid(quiz.targetFeature as GeoJSON.Feature) as [number, number])
      flyTo(tc, 1.4)
    }
    quizScore.textContent = String(quiz.score)
    quizStreak.textContent = String(quiz.streak)
    quizProgress.style.width = (((quiz.idx + 1)) / quiz.rounds.length * 100) + '%'
    setT(() => { if (!quiz) return; quiz.idx += 1; nextQuizRound() }, correct ? 1100 : 2200)
  }
  function finishQuiz() {
    if (!quiz) return
    const total = quiz.rounds.length
    const score = quiz.score
    quizTarget.textContent = T('done_title')
    quizFeedback.innerHTML = `${T('done_score')} <b>${score}</b> ${T('done_of')} <b>${total * 6}</b>. <button id="quiz-replay">${T('play_again')}</button>`
    quizFeedback.className = 'feedback'
    quizProgress.style.width = '100%'
    quiz.active = false
    const replay = document.getElementById('quiz-replay')
    if (replay) replay.addEventListener('click', startQuiz, { signal })
  }
  on(btnQuiz, 'click', () => {
    if (quiz && quiz.active) endQuiz()
    else if (quiz && !quiz.active) endQuiz()
    else startQuiz()
  })
  on(quizSkip, 'click', () => {
    if (!quiz || !quiz.active || quiz.locked || !quiz.targetFeature) return
    quiz.locked = true; quiz.streak = 0
    const info = COUNTRIES[quiz.targetFeature.properties.name]
    quizFeedback.textContent = '→ ' + (info ? (info.name[LANG] || info.name.en) : quiz.targetFeature.properties.name)
    quizFeedback.className = 'feedback bad'
    quiz.revealed = true
    const tc = quiz.targetFeature.__centroid || (geoCentroid(quiz.targetFeature as GeoJSON.Feature) as [number, number])
    flyTo(tc, 1.4)
    setT(() => { if (!quiz) return; quiz.idx += 1; nextQuizRound() }, 1600)
  })
  on(quizEnd, 'click', endQuiz)

  // ---------- Boot ----------
  on(window, 'resize', fit)
  fit()
  requestAnimationFrame(() => { fit() })
  let ro: ResizeObserver | null = null
  if ('ResizeObserver' in window) {
    ro = new ResizeObserver(() => fit())
    ro.observe(document.body)
  }
  applyI18N()

  setT(() => hintEl.classList.add('show'), 600)
  setT(() => hintEl.classList.remove('show'), 5500)

  rafId = requestAnimationFrame(render)

  ;(async () => {
    try {
      await loadWorld()
      try { rebuildPlaces() } catch (e) { console.error(e) }
      loadingEl.classList.add('hide')
      setT(() => loadingEl.remove(), 500)
    } catch (e) {
      if ((e as { name?: string })?.name === 'AbortError') return
      console.error(e)
      loadingText.textContent = "Couldn't load world data."
    }
  })()

  return () => {
    abort.abort()
    cancelAnimationFrame(rafId)
    for (const id of timers) clearTimeout(id)
    if (ro) { try { ro.disconnect() } catch {} }
    try { speechSynthesis.cancel() } catch {}
  }
}
