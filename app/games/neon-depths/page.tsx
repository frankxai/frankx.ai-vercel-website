'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { ArrowLeft, RotateCcw, Play, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Clock } from 'lucide-react'

// ══════════════════════════════════════════════════════
// TYPES & CONSTANTS
// ══════════════════════════════════════════════════════

const MAP_W = 40
const MAP_H = 28
const MIN_ROOM = 5
const MAX_DEPTH = 4
const MAX_FLOORS = 5
const SIGHT_RADIUS = 6

type TileType = 0 | 1 | 2 // 0=wall, 1=floor, 2=stairs
type Vis = 0 | 1 | 2       // 0=unexplored, 1=visited, 2=visible

type EnemyKind = 'patrol' | 'hunter' | 'turret'
type ItemKind = 'health' | 'weapon'

interface Entity { x: number; y: number; hp: number; maxHp: number; dmg: number; kind: EnemyKind; alive: boolean }
interface Item { x: number; y: number; kind: ItemKind; value: number; taken: boolean }
interface Room { x: number; y: number; w: number; h: number }

interface GS {
  tiles: TileType[][]
  vis: Vis[][]
  rooms: Room[]
  player: { x: number; y: number; hp: number; maxHp: number; dmg: number; xp: number; level: number }
  enemies: Entity[]
  items: Item[]
  floor: number
  score: number
  turns: number
  messages: string[]
  status: 'menu' | 'playing' | 'victory' | 'defeat'
}

// ══════════════════════════════════════════════════════
// DUNGEON GENERATION (BSP)
// ══════════════════════════════════════════════════════

function createTiles(): TileType[][] {
  return Array.from({ length: MAP_H }, () => new Array(MAP_W).fill(0))
}

function createVis(): Vis[][] {
  return Array.from({ length: MAP_H }, () => new Array(MAP_W).fill(0))
}

function splitBSP(x: number, y: number, w: number, h: number, depth: number, rooms: Room[]) {
  if (depth >= MAX_DEPTH || w < MIN_ROOM * 2 + 1 || h < MIN_ROOM * 2 + 1) {
    // Leaf — create room
    const rw = MIN_ROOM + Math.floor(Math.random() * Math.min(w - MIN_ROOM, 6))
    const rh = MIN_ROOM + Math.floor(Math.random() * Math.min(h - MIN_ROOM, 5))
    const rx = x + 1 + Math.floor(Math.random() * (w - rw - 1))
    const ry = y + 1 + Math.floor(Math.random() * (h - rh - 1))
    rooms.push({ x: rx, y: ry, w: rw, h: rh })
    return
  }

  const horizontal = w < h ? true : h < w ? false : Math.random() < 0.5
  if (horizontal) {
    const split = MIN_ROOM + 2 + Math.floor(Math.random() * (h - MIN_ROOM * 2 - 2))
    splitBSP(x, y, w, split, depth + 1, rooms)
    splitBSP(x, y + split, w, h - split, depth + 1, rooms)
  } else {
    const split = MIN_ROOM + 2 + Math.floor(Math.random() * (w - MIN_ROOM * 2 - 2))
    splitBSP(x, y, split, h, depth + 1, rooms)
    splitBSP(x + split, y, w - split, h, depth + 1, rooms)
  }
}

function carveRoom(tiles: TileType[][], r: Room) {
  for (let ry = r.y; ry < r.y + r.h && ry < MAP_H; ry++)
    for (let rx = r.x; rx < r.x + r.w && rx < MAP_W; rx++)
      tiles[ry][rx] = 1
}

function carveCorridor(tiles: TileType[][], r1: Room, r2: Room) {
  const x1 = Math.floor(r1.x + r1.w / 2)
  const y1 = Math.floor(r1.y + r1.h / 2)
  const x2 = Math.floor(r2.x + r2.w / 2)
  const y2 = Math.floor(r2.y + r2.h / 2)

  // L-shaped corridor
  let cx = x1
  while (cx !== x2) {
    if (cx >= 0 && cx < MAP_W && y1 >= 0 && y1 < MAP_H) tiles[y1][cx] = 1
    cx += cx < x2 ? 1 : -1
  }
  let cy = y1
  while (cy !== y2) {
    if (x2 >= 0 && x2 < MAP_W && cy >= 0 && cy < MAP_H) tiles[cy][x2] = 1
    cy += cy < y2 ? 1 : -1
  }
}

function generateDungeon(floor: number): { tiles: TileType[][]; rooms: Room[]; start: { x: number; y: number }; stairsPos: { x: number; y: number } } {
  const tiles = createTiles()
  const rooms: Room[] = []

  splitBSP(0, 0, MAP_W, MAP_H, 0, rooms)

  // Carve rooms
  for (const r of rooms) carveRoom(tiles, r)

  // Connect rooms: sort by position, connect consecutive pairs
  rooms.sort((a, b) => (a.x + a.y) - (b.x + b.y))
  for (let i = 0; i < rooms.length - 1; i++) {
    carveCorridor(tiles, rooms[i], rooms[i + 1])
  }

  // Player starts in first room center
  const startRoom = rooms[0]
  const start = { x: Math.floor(startRoom.x + startRoom.w / 2), y: Math.floor(startRoom.y + startRoom.h / 2) }

  // Stairs in farthest room
  let farthest = rooms[rooms.length - 1]
  let maxDist = 0
  for (const r of rooms) {
    const d = Math.abs(r.x - start.x) + Math.abs(r.y - start.y)
    if (d > maxDist) { maxDist = d; farthest = r }
  }
  const stairsPos = { x: Math.floor(farthest.x + farthest.w / 2), y: Math.floor(farthest.y + farthest.h / 2) }
  tiles[stairsPos.y][stairsPos.x] = 2

  return { tiles, rooms, start, stairsPos }
}

// ══════════════════════════════════════════════════════
// ITEMS & ENEMIES PLACEMENT
// ══════════════════════════════════════════════════════

function placeItems(rooms: Room[], floor: number, playerPos: { x: number; y: number }): Item[] {
  const items: Item[] = []
  const count = 2 + Math.floor(floor / 2)
  const available = rooms.filter(r => {
    const cx = Math.floor(r.x + r.w / 2)
    const cy = Math.floor(r.y + r.h / 2)
    return Math.abs(cx - playerPos.x) + Math.abs(cy - playerPos.y) > 3
  })
  for (let i = 0; i < count && available.length > 0; i++) {
    const r = available[i % available.length]
    const x = r.x + 1 + Math.floor(Math.random() * (r.w - 2))
    const y = r.y + 1 + Math.floor(Math.random() * (r.h - 2))
    const isWeapon = Math.random() < 0.3
    items.push({
      x, y,
      kind: isWeapon ? 'weapon' : 'health',
      value: isWeapon ? 3 + floor * 2 : 25 + floor * 5,
      taken: false,
    })
  }
  return items
}

function placeEnemies(rooms: Room[], tiles: TileType[][], floor: number, playerPos: { x: number; y: number }): Entity[] {
  const enemies: Entity[] = []
  const count = 3 + floor * 2
  const available = rooms.filter(r => {
    const cx = Math.floor(r.x + r.w / 2)
    const cy = Math.floor(r.y + r.h / 2)
    return Math.abs(cx - playerPos.x) + Math.abs(cy - playerPos.y) > 4
  })

  for (let i = 0; i < count && available.length > 0; i++) {
    const r = available[i % available.length]
    let x: number, y: number
    // Find walkable spot in room
    do {
      x = r.x + 1 + Math.floor(Math.random() * (r.w - 2))
      y = r.y + 1 + Math.floor(Math.random() * (r.h - 2))
    } while (tiles[y]?.[x] !== 1)

    const roll = Math.random()
    const kind: EnemyKind = roll < 0.4 ? 'patrol' : roll < 0.8 ? 'hunter' : 'turret'
    const baseHp = kind === 'turret' ? 15 : 20
    const baseDmg = kind === 'turret' ? 8 + floor * 2 : 5 + floor * 2

    enemies.push({
      x, y,
      hp: baseHp + floor * 8,
      maxHp: baseHp + floor * 8,
      dmg: baseDmg,
      kind,
      alive: true,
    })
  }
  return enemies
}

// ══════════════════════════════════════════════════════
// PATHFINDING & LINE OF SIGHT
// ══════════════════════════════════════════════════════

function bfsNextStep(sx: number, sy: number, gx: number, gy: number, tiles: TileType[][], enemies: Entity[]): { x: number; y: number } | null {
  if (sx === gx && sy === gy) return null
  const visited = new Set<string>()
  const queue: { x: number; y: number; firstX: number; firstY: number }[] = []
  const dirs = [[0, -1], [0, 1], [-1, 0], [1, 0]]

  visited.add(`${sx},${sy}`)
  for (const [dx, dy] of dirs) {
    const nx = sx + dx, ny = sy + dy
    if (nx < 0 || nx >= MAP_W || ny < 0 || ny >= MAP_H) continue
    if (tiles[ny][nx] === 0) continue
    // Don't path through other enemies
    if (enemies.some(e => e.alive && e.x === nx && e.y === ny)) {
      if (nx === gx && ny === gy) return { x: nx, y: ny }
      continue
    }
    if (nx === gx && ny === gy) return { x: nx, y: ny }
    visited.add(`${nx},${ny}`)
    queue.push({ x: nx, y: ny, firstX: nx, firstY: ny })
  }

  let depth = 0
  let idx = 0
  while (idx < queue.length && depth < 20) {
    const batchEnd = queue.length
    while (idx < batchEnd) {
      const { x, y, firstX, firstY } = queue[idx++]
      for (const [dx, dy] of dirs) {
        const nx = x + dx, ny = y + dy
        const key = `${nx},${ny}`
        if (nx < 0 || nx >= MAP_W || ny < 0 || ny >= MAP_H) continue
        if (tiles[ny][nx] === 0 || visited.has(key)) continue
        if (nx === gx && ny === gy) return { x: firstX, y: firstY }
        visited.add(key)
        queue.push({ x: nx, y: ny, firstX, firstY })
      }
    }
    depth++
  }
  return null
}

function hasLOS(x1: number, y1: number, x2: number, y2: number, tiles: TileType[][], maxDist: number): boolean {
  const dx = Math.abs(x2 - x1), dy = Math.abs(y2 - y1)
  if (dx + dy > maxDist) return false
  const sx = x1 < x2 ? 1 : -1, sy = y1 < y2 ? 1 : -1
  let err = dx - dy, cx = x1, cy = y1
  while (cx !== x2 || cy !== y2) {
    const e2 = err * 2
    if (e2 > -dy) { err -= dy; cx += sx }
    if (e2 < dx) { err += dx; cy += sy }
    if (cx === x2 && cy === y2) return true
    if (tiles[cy]?.[cx] === 0) return false
  }
  return true
}

// ══════════════════════════════════════════════════════
// VISIBILITY (FOG OF WAR)
// ══════════════════════════════════════════════════════

function updateVisibility(px: number, py: number, tiles: TileType[][], vis: Vis[][]) {
  // Dim all currently visible
  for (let y = 0; y < MAP_H; y++)
    for (let x = 0; x < MAP_W; x++)
      if (vis[y][x] === 2) vis[y][x] = 1

  // Reveal tiles in sight radius using raycasting
  for (let y = Math.max(0, py - SIGHT_RADIUS); y <= Math.min(MAP_H - 1, py + SIGHT_RADIUS); y++) {
    for (let x = Math.max(0, px - SIGHT_RADIUS); x <= Math.min(MAP_W - 1, px + SIGHT_RADIUS); x++) {
      if (hasLOS(px, py, x, y, tiles, SIGHT_RADIUS + 1)) {
        vis[y][x] = 2
        // Also reveal walls adjacent to visible floor
        if (tiles[y][x] === 0) {
          const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]]
          for (const [dx, dy] of dirs) {
            const nx = x + dx, ny = y + dy
            if (nx >= 0 && nx < MAP_W && ny >= 0 && ny < MAP_H && tiles[ny][nx] !== 0 && vis[ny][nx] !== 2) {
              vis[y][x] = 2
            }
          }
        }
      }
    }
  }
}

// ══════════════════════════════════════════════════════
// ENEMY AI
// ══════════════════════════════════════════════════════

function moveEnemy(e: Entity, gs: GS): { x: number; y: number } {
  const p = gs.player
  const dist = Math.abs(e.x - p.x) + Math.abs(e.y - p.y)

  if (e.kind === 'turret') {
    // Turrets don't move — they attack in the combat phase
    return { x: e.x, y: e.y }
  }

  if (e.kind === 'hunter') {
    // Always pathfind toward player
    const next = bfsNextStep(e.x, e.y, p.x, p.y, gs.tiles, gs.enemies)
    return next || { x: e.x, y: e.y }
  }

  // Patrol: chase if within sight, otherwise wander
  if (e.kind === 'patrol') {
    if (dist <= 6 && hasLOS(e.x, e.y, p.x, p.y, gs.tiles, 6)) {
      // Simple chase — move toward player
      const dx = Math.sign(p.x - e.x)
      const dy = Math.sign(p.y - e.y)
      // Try horizontal first, then vertical
      if (dx !== 0 && gs.tiles[e.y]?.[e.x + dx] !== 0 && !gs.enemies.some(o => o !== e && o.alive && o.x === e.x + dx && o.y === e.y)) {
        return { x: e.x + dx, y: e.y }
      }
      if (dy !== 0 && gs.tiles[e.y + dy]?.[e.x] !== 0 && !gs.enemies.some(o => o !== e && o.alive && o.x === e.x && o.y === e.y + dy)) {
        return { x: e.x, y: e.y + dy }
      }
    }
    // Random wander
    const dirs = [[0, -1], [0, 1], [-1, 0], [1, 0]]
    const shuffled = dirs.sort(() => Math.random() - 0.5)
    for (const [dx, dy] of shuffled) {
      const nx = e.x + dx, ny = e.y + dy
      if (nx >= 0 && nx < MAP_W && ny >= 0 && ny < MAP_H && gs.tiles[ny][nx] !== 0 && !gs.enemies.some(o => o !== e && o.alive && o.x === nx && o.y === ny)) {
        return { x: nx, y: ny }
      }
    }
  }

  return { x: e.x, y: e.y }
}

// ══════════════════════════════════════════════════════
// GAME INITIALIZATION
// ══════════════════════════════════════════════════════

function initFloor(floor: number, prevPlayer?: GS['player']): GS {
  const { tiles, rooms, start, stairsPos: _stairs } = generateDungeon(floor)
  const vis = createVis()
  const player = prevPlayer
    ? { ...prevPlayer, x: start.x, y: start.y }
    : { x: start.x, y: start.y, hp: 100, maxHp: 100, dmg: 10, xp: 0, level: 1 }
  const items = placeItems(rooms, floor, start)
  const enemies = placeEnemies(rooms, tiles, floor, start)

  updateVisibility(player.x, player.y, tiles, vis)

  return {
    tiles, vis, rooms, player, enemies, items,
    floor,
    score: prevPlayer ? 0 : 0, // Score carried via component state
    turns: 0,
    messages: floor === 1 ? ['You enter the Neon Depths...'] : [`Floor ${floor}. The air crackles.`],
    status: 'playing',
  }
}

// ══════════════════════════════════════════════════════
// RENDERING
// ══════════════════════════════════════════════════════

const ENEMY_COLORS: Record<EnemyKind, { fill: string; glow: string }> = {
  patrol: { fill: '#F59E0B', glow: '#F59E0B' },
  hunter: { fill: '#EF4444', glow: '#EF4444' },
  turret: { fill: '#8B5CF6', glow: '#8B5CF6' },
}

const ITEM_COLORS: Record<ItemKind, string> = {
  health: '#10B981',
  weapon: '#F59E0B',
}

function drawGame(ctx: CanvasRenderingContext2D, gs: GS, cellSize: number, canvasW: number, canvasH: number, animTick: number) {
  const { tiles, vis, player, enemies, items } = gs

  // Camera offset — center on player
  const offsetX = Math.max(0, Math.min(player.x * cellSize - canvasW / 2 + cellSize / 2, MAP_W * cellSize - canvasW))
  const offsetY = Math.max(0, Math.min(player.y * cellSize - canvasH / 2 + cellSize / 2, MAP_H * cellSize - canvasH))

  // Clear
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, canvasW, canvasH)

  // Visible tile range
  const startX = Math.max(0, Math.floor(offsetX / cellSize) - 1)
  const endX = Math.min(MAP_W, Math.ceil((offsetX + canvasW) / cellSize) + 1)
  const startY = Math.max(0, Math.floor(offsetY / cellSize) - 1)
  const endY = Math.min(MAP_H, Math.ceil((offsetY + canvasH) / cellSize) + 1)

  // Draw tiles
  for (let y = startY; y < endY; y++) {
    for (let x = startX; x < endX; x++) {
      const v = vis[y][x]
      if (v === 0) continue // unexplored = black (already cleared)

      const sx = x * cellSize - offsetX
      const sy = y * cellSize - offsetY
      const alpha = v === 2 ? 1.0 : 0.3
      const tile = tiles[y][x]

      if (tile === 0) {
        // Wall
        ctx.fillStyle = `rgba(15, 23, 42, ${alpha})`
        ctx.fillRect(sx, sy, cellSize, cellSize)
        if (v === 2) {
          ctx.strokeStyle = 'rgba(67, 191, 227, 0.12)'
          ctx.lineWidth = 0.5
          ctx.strokeRect(sx + 0.5, sy + 0.5, cellSize - 1, cellSize - 1)
        }
      } else {
        // Floor or stairs
        ctx.fillStyle = tile === 2
          ? `rgba(16, 185, 129, ${alpha * 0.15})`
          : `rgba(8, 8, 24, ${alpha})`
        ctx.fillRect(sx, sy, cellSize, cellSize)
        // Subtle grid
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.04})`
        ctx.lineWidth = 0.5
        ctx.strokeRect(sx, sy, cellSize, cellSize)
        // Stairs indicator
        if (tile === 2 && v === 2) {
          ctx.fillStyle = `rgba(16, 185, 129, ${0.3 + 0.2 * Math.sin(animTick * 0.05)})`
          ctx.fillRect(sx + 2, sy + 2, cellSize - 4, cellSize - 4)
          ctx.strokeStyle = '#10B981'
          ctx.lineWidth = 1
          ctx.strokeRect(sx + 2, sy + 2, cellSize - 4, cellSize - 4)
        }
      }
    }
  }

  // Draw items (only visible)
  for (const item of items) {
    if (item.taken || vis[item.y]?.[item.x] !== 2) continue
    const sx = item.x * cellSize - offsetX + cellSize / 2
    const sy = item.y * cellSize - offsetY + cellSize / 2
    const color = ITEM_COLORS[item.kind]
    const pulse = 0.6 + 0.4 * Math.sin(animTick * 0.08)

    ctx.shadowColor = color
    ctx.shadowBlur = 8 * pulse
    ctx.fillStyle = color
    ctx.beginPath()

    if (item.kind === 'health') {
      // Cross shape
      const s = cellSize * 0.15
      ctx.fillRect(sx - s, sy - s * 2.5, s * 2, s * 5)
      ctx.fillRect(sx - s * 2.5, sy - s, s * 5, s * 2)
    } else {
      // Diamond
      const s = cellSize * 0.3
      ctx.moveTo(sx, sy - s)
      ctx.lineTo(sx + s, sy)
      ctx.lineTo(sx, sy + s)
      ctx.lineTo(sx - s, sy)
      ctx.closePath()
      ctx.fill()
    }
    ctx.shadowBlur = 0
  }

  // Draw enemies (only visible + alive)
  for (const e of enemies) {
    if (!e.alive || vis[e.y]?.[e.x] !== 2) continue
    const sx = e.x * cellSize - offsetX + cellSize / 2
    const sy = e.y * cellSize - offsetY + cellSize / 2
    const colors = ENEMY_COLORS[e.kind]
    const radius = cellSize * 0.35

    ctx.shadowColor = colors.glow
    ctx.shadowBlur = 10
    ctx.fillStyle = colors.fill
    ctx.beginPath()

    if (e.kind === 'turret') {
      // Square with notches
      ctx.fillRect(sx - radius, sy - radius, radius * 2, radius * 2)
    } else if (e.kind === 'hunter') {
      // Triangle pointing toward player
      const angle = Math.atan2(player.y - e.y, player.x - e.x)
      ctx.moveTo(sx + Math.cos(angle) * radius, sy + Math.sin(angle) * radius)
      ctx.lineTo(sx + Math.cos(angle + 2.4) * radius, sy + Math.sin(angle + 2.4) * radius)
      ctx.lineTo(sx + Math.cos(angle - 2.4) * radius, sy + Math.sin(angle - 2.4) * radius)
      ctx.closePath()
      ctx.fill()
    } else {
      // Circle (patrol)
      ctx.arc(sx, sy, radius, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.shadowBlur = 0

    // HP bar
    const hpRatio = e.hp / e.maxHp
    const barW = cellSize * 0.8
    const barX = sx - barW / 2
    const barY = sy - cellSize * 0.5 - 3
    ctx.fillStyle = 'rgba(255,255,255,0.15)'
    ctx.fillRect(barX, barY, barW, 2)
    ctx.fillStyle = hpRatio > 0.5 ? colors.fill : '#EF4444'
    ctx.fillRect(barX, barY, barW * hpRatio, 2)
  }

  // Draw player
  {
    const sx = player.x * cellSize - offsetX + cellSize / 2
    const sy = player.y * cellSize - offsetY + cellSize / 2
    const radius = cellSize * 0.38

    // Outer glow
    ctx.shadowColor = '#43BFE3'
    ctx.shadowBlur = 16
    ctx.fillStyle = '#43BFE3'
    ctx.beginPath()
    ctx.arc(sx, sy, radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.shadowBlur = 0

    // Inner bright core
    ctx.fillStyle = '#E0F7FA'
    ctx.beginPath()
    ctx.arc(sx, sy, radius * 0.45, 0, Math.PI * 2)
    ctx.fill()
  }
}

// ══════════════════════════════════════════════════════
// COMPONENT
// ══════════════════════════════════════════════════════

export default function NeonDepthsPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gsRef = useRef<GS>(initFloor(1))
  const [, forceRender] = useState(0)
  const [canvasSize, setCanvasSize] = useState({ w: 480, h: 360 })
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const animRef = useRef(0)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)

  const cellSize = Math.max(14, Math.min(Math.floor(canvasSize.w / 24), 20))

  // Load best score
  useEffect(() => {
    const saved = localStorage.getItem('neonDepths-best')
    if (saved) setBestScore(parseInt(saved, 10))
  }, [])

  // Responsive canvas
  useEffect(() => {
    const updateSize = () => {
      const maxW = Math.min(window.innerWidth - 24, 640)
      const maxH = Math.min(window.innerHeight - 280, 500)
      setCanvasSize({ w: maxW, h: maxH })
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  // Draw
  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    animRef.current++
    drawGame(ctx, gsRef.current, cellSize, canvasSize.w, canvasSize.h, animRef.current)
  }, [cellSize, canvasSize])

  // Animation loop for pulsing effects
  useEffect(() => {
    if (gsRef.current.status !== 'playing') {
      draw()
      return
    }
    let raf: number
    const loop = () => {
      draw()
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [draw, gsRef.current.status])

  // Redraw on size change
  useEffect(() => { draw() }, [draw])

  const addMessage = (msg: string) => {
    const gs = gsRef.current
    gs.messages = [...gs.messages.slice(-3), msg]
  }

  const handleTurn = useCallback((dx: number, dy: number) => {
    const gs = gsRef.current
    if (gs.status !== 'playing') return

    const p = gs.player
    const nx = p.x + dx
    const ny = p.y + dy

    // Bounds check
    if (nx < 0 || nx >= MAP_W || ny < 0 || ny >= MAP_H) return
    if (gs.tiles[ny][nx] === 0) return // wall

    // Check for enemy at target
    const target = gs.enemies.find(e => e.alive && e.x === nx && e.y === ny)
    if (target) {
      // Attack!
      target.hp -= p.dmg
      if (target.hp <= 0) {
        target.alive = false
        const xpGain = target.kind === 'hunter' ? 25 : target.kind === 'turret' ? 20 : 15
        p.xp += xpGain
        setScore(s => {
          const newS = s + xpGain
          return newS
        })
        addMessage(`Defeated ${target.kind}! +${xpGain} XP`)

        // Level up check
        const xpNeeded = p.level * 80
        if (p.xp >= xpNeeded) {
          p.level++
          p.xp -= xpNeeded
          p.maxHp += 15
          p.hp = Math.min(p.hp + 30, p.maxHp)
          p.dmg += 2
          addMessage(`Level ${p.level}! HP & damage up`)
        }
      } else {
        addMessage(`Hit ${target.kind} for ${p.dmg} dmg`)
      }
    } else {
      // Move player
      p.x = nx
      p.y = ny

      // Check items
      const item = gs.items.find(i => !i.taken && i.x === nx && i.y === ny)
      if (item) {
        item.taken = true
        if (item.kind === 'health') {
          p.hp = Math.min(p.hp + item.value, p.maxHp)
          addMessage(`Health potion! +${item.value} HP`)
        } else {
          p.dmg += item.value
          addMessage(`Neon Blade! +${item.value} damage`)
        }
        setScore(s => s + 10)
      }

      // Check stairs
      if (gs.tiles[ny][nx] === 2) {
        if (gs.floor >= MAX_FLOORS) {
          gs.status = 'victory'
          addMessage('You escaped the Neon Depths!')
          setScore(s => {
            const final = s + gs.floor * 50
            if (final > bestScore) {
              setBestScore(final)
              localStorage.setItem('neonDepths-best', String(final))
            }
            return final
          })
          forceRender(n => n + 1)
          draw()
          return
        }
        const nextFloor = gs.floor + 1
        addMessage(`Descending to floor ${nextFloor}...`)
        setScore(s => s + gs.floor * 20)
        const newGS = initFloor(nextFloor, p)
        newGS.messages = gs.messages
        gsRef.current = newGS
        forceRender(n => n + 1)
        draw()
        return
      }
    }

    gs.turns++

    // Enemy turns
    for (const e of gs.enemies.filter(e => e.alive)) {
      const next = moveEnemy(e, gs)

      // Turret: attacks at range if LOS
      if (e.kind === 'turret') {
        if (hasLOS(e.x, e.y, p.x, p.y, gs.tiles, 5)) {
          p.hp -= e.dmg
          addMessage(`Turret zaps you! -${e.dmg} HP`)
        }
        continue
      }

      // If moving to player position = attack
      if (next.x === p.x && next.y === p.y) {
        p.hp -= e.dmg
        addMessage(`${e.kind} hits you! -${e.dmg} HP`)
      } else {
        e.x = next.x
        e.y = next.y
      }
    }

    // Check death
    if (p.hp <= 0) {
      p.hp = 0
      gs.status = 'defeat'
      addMessage('You have been defeated...')
      setScore(s => {
        if (s > bestScore) {
          setBestScore(s)
          localStorage.setItem('neonDepths-best', String(s))
        }
        return s
      })
    }

    // Update fog
    updateVisibility(p.x, p.y, gs.tiles, gs.vis)
    forceRender(n => n + 1)
    draw()
  }, [draw, bestScore])

  const startGame = useCallback(() => {
    setScore(0)
    gsRef.current = initFloor(1)
    forceRender(n => n + 1)
    draw()
  }, [draw])

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const gs = gsRef.current

      if (gs.status === 'menu' || gs.status === 'defeat' || gs.status === 'victory') {
        if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); startGame(); return }
      }

      const keyMap: Record<string, [number, number]> = {
        ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0],
        w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0],
      }
      const dir = keyMap[e.key]
      if (dir) { e.preventDefault(); handleTurn(dir[0], dir[1]) }
      if (e.key === '.' || e.key === ' ') { e.preventDefault(); handleTurn(0, 0) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleTurn, startGame])

  // Touch swipe on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const onStart = (e: TouchEvent) => {
      const t = e.touches[0]
      touchStartRef.current = { x: t.clientX, y: t.clientY }
    }
    const onEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return
      const t = e.changedTouches[0]
      const dx = t.clientX - touchStartRef.current.x
      const dy = t.clientY - touchStartRef.current.y
      touchStartRef.current = null
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 20) return
      if (Math.abs(dx) > Math.abs(dy)) handleTurn(dx > 0 ? 1 : -1, 0)
      else handleTurn(0, dy > 0 ? 1 : -1)
    }
    canvas.addEventListener('touchstart', onStart, { passive: true })
    canvas.addEventListener('touchend', onEnd, { passive: true })
    return () => { canvas.removeEventListener('touchstart', onStart); canvas.removeEventListener('touchend', onEnd) }
  }, [handleTurn])

  const gs = gsRef.current
  const p = gs.player

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white flex flex-col">
      {/* Header */}
      <div className="p-3 flex items-center gap-3 border-b border-white/5">
        <Link href="/games" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-lg font-bold tracking-tight">Neon Depths</h1>
          <p className="text-[11px] text-white/40">Roguelike dungeon crawler</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/40">
          <span className="bg-white/5 px-2 py-1 rounded">F{gs.floor}</span>
          <span className="bg-white/5 px-2 py-1 rounded">Lv{p.level}</span>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="px-3 py-2 flex items-center gap-2 text-xs border-b border-white/[0.03]">
        {/* HP */}
        <div className="flex items-center gap-1.5 flex-1">
          <span className="text-white/40 w-6">HP</span>
          <div className="flex-1 h-2.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-200"
              style={{
                width: `${(p.hp / p.maxHp) * 100}%`,
                background: p.hp / p.maxHp > 0.5 ? '#43BFE3' : p.hp / p.maxHp > 0.25 ? '#F59E0B' : '#EF4444',
              }}
            />
          </div>
          <span className="text-white/50 w-14 text-right">{p.hp}/{p.maxHp}</span>
        </div>
        {/* Score + Best */}
        <div className="bg-white/5 px-2 py-1 rounded text-amber-400">{score}</div>
        <div className="bg-white/5 px-2 py-1 rounded text-emerald-400/60">{bestScore}</div>
      </div>

      {/* Canvas */}
      <div className="flex-1 flex flex-col items-center px-3 pt-2">
        <div className="relative" style={{ width: canvasSize.w, height: canvasSize.h }}>
          <canvas
            ref={canvasRef}
            width={canvasSize.w}
            height={canvasSize.h}
            className="rounded-lg border border-white/5 touch-none"
          />

          {/* Menu overlay */}
          {gs.status === 'menu' && (
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center gap-4 z-10">
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-violet-400 to-amber-400 bg-clip-text text-transparent">
                Neon Depths
              </div>
              <p className="text-white/40 text-xs sm:text-sm text-center max-w-[260px]">
                Turn-based roguelike. Explore procedural dungeons, fight smart enemies, descend 5 floors.
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-[10px] text-white/30">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> Patrol</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> Hunter</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-violet-500" /> Turret</span>
              </div>
              <button
                onClick={startGame}
                className="flex items-center gap-2 px-6 py-2.5 bg-cyan-500/20 text-cyan-300 rounded-xl hover:bg-cyan-500/30 transition-colors font-medium text-sm"
              >
                <Play className="w-4 h-4" /> Enter the Depths
              </button>
            </div>
          )}

          {/* Victory */}
          {gs.status === 'victory' && (
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center gap-3 z-10">
              <div className="text-xl font-bold text-emerald-400">Escaped!</div>
              <div className="text-white/50 text-xs space-y-1 text-center">
                <p>Score: {score} | Turns: {gs.turns}</p>
                <p>Level {p.level} | Damage {p.dmg}</p>
              </div>
              <button onClick={startGame} className="flex items-center gap-2 px-5 py-2 bg-emerald-500/20 text-emerald-300 rounded-lg hover:bg-emerald-500/30 transition-colors text-sm">
                <RotateCcw className="w-4 h-4" /> Play Again
              </button>
            </div>
          )}

          {/* Defeat */}
          {gs.status === 'defeat' && (
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center gap-3 z-10">
              <div className="text-xl font-bold text-rose-400">Defeated</div>
              <div className="text-white/50 text-xs space-y-1 text-center">
                <p>Floor {gs.floor} | Score: {score}</p>
                <p>Turns: {gs.turns} | Level {p.level}</p>
              </div>
              <button onClick={startGame} className="flex items-center gap-2 px-5 py-2 bg-cyan-500/20 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-colors text-sm">
                <RotateCcw className="w-4 h-4" /> Try Again
              </button>
            </div>
          )}
        </div>

        {/* Message Log */}
        <div className="mt-2 w-full max-w-[640px] h-[52px] overflow-hidden bg-white/[0.02] rounded-lg px-3 py-1.5 border border-white/5">
          {gs.messages.slice(-3).map((msg, i) => (
            <p key={`${gs.turns}-${i}`} className={`text-[11px] truncate ${i === gs.messages.slice(-3).length - 1 ? 'text-white/60' : 'text-white/25'}`}>
              {msg}
            </p>
          ))}
        </div>

        {/* D-Pad (mobile) */}
        <div className="mt-3 sm:hidden">
          <div className="grid grid-cols-3 gap-1 w-[168px] mx-auto">
            <div />
            <button onPointerDown={() => handleTurn(0, -1)} className="w-14 h-14 rounded-lg bg-white/5 active:bg-white/15 flex items-center justify-center">
              <ChevronUp className="w-6 h-6 text-white/50" />
            </button>
            <div />
            <button onPointerDown={() => handleTurn(-1, 0)} className="w-14 h-14 rounded-lg bg-white/5 active:bg-white/15 flex items-center justify-center">
              <ChevronLeft className="w-6 h-6 text-white/50" />
            </button>
            <button onPointerDown={() => handleTurn(0, 0)} className="w-14 h-14 rounded-lg bg-white/[0.03] active:bg-white/10 flex items-center justify-center" title="Wait">
              <Clock className="w-4 h-4 text-white/20" />
            </button>
            <button onPointerDown={() => handleTurn(1, 0)} className="w-14 h-14 rounded-lg bg-white/5 active:bg-white/15 flex items-center justify-center">
              <ChevronRight className="w-6 h-6 text-white/50" />
            </button>
            <div />
            <button onPointerDown={() => handleTurn(0, 1)} className="w-14 h-14 rounded-lg bg-white/5 active:bg-white/15 flex items-center justify-center">
              <ChevronDown className="w-6 h-6 text-white/50" />
            </button>
            <div />
          </div>
        </div>

        {/* Legend */}
        <div className="mt-3 mb-6 w-full max-w-[640px] bg-white/[0.02] rounded-lg p-3 border border-white/5">
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-white/35">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyan-400" /> You</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> Patrol (wanders, chases)</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> Hunter (pathfinds to you)</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-violet-500" /> Turret (ranged attack)</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-emerald-500" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} /> Stairs</span>
            <span>WASD / Arrows / Swipe to move | Space to wait</span>
          </div>
        </div>
      </div>
    </div>
  )
}
