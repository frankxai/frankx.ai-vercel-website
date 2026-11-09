export function decodeTitle(title) {
  return String(title || 'Untitled field note')
    .replace(/\s+/g, ' ')
    .replace(/\s+\|\s+FrankX.*$/i, '')
    .trim()
}

export function editorialTitle(post) {
  return decodeTitle(post?.title)
}

export function wrapAll(text, maxChars) {
  const words = String(text || '').split(/\s+/).filter(Boolean)
  const lines = []
  let current = ''
  for (const word of words) {
    const next = current ? `${current} ${word}` : word
    if (current && next.length > maxChars) {
      lines.push(current)
      current = word
    } else {
      current = next
    }
  }
  if (current) lines.push(current)
  return lines
}

const HERO_START = 278
const HERO_LIMIT = 560

function fits(title, lines, size, lineHeight) {
  if (lines.join(' ') !== title) return false
  const last = HERO_START + Math.max(0, lines.length - 1) * lineHeight
  return last <= HERO_LIMIT && size >= 40
}

function fitText(title) {
  // 22 characters at 66px stays left of the operating-map rail.
  const atBase = wrapAll(title, 22)
  if (atBase.length <= 4 && fits(title, atBase, atBase.length > 3 ? 58 : 66, atBase.length > 3 ? 64 : 72)) {
    const long = atBase.length > 3
    return { lines: atBase, size: long ? 58 : 66, lineHeight: long ? 64 : 72, overflow: false }
  }

  for (let size = 64; size >= 40; size -= 2) {
    const maxChars = Math.max(22, Math.round(22 * (66 / size)))
    const lineHeight = Math.max(44, Math.round(size * (72 / 66)))
    const maxLines = Math.max(1, Math.floor((HERO_LIMIT - HERO_START) / lineHeight))
    const lines = wrapAll(title, maxChars)
    if (lines.length <= maxLines && fits(title, lines, size, lineHeight)) {
      return { lines, size, lineHeight, overflow: false }
    }
  }

  const floorChars = Math.max(22, Math.round(22 * (66 / 40)))
  return { lines: wrapAll(title, floorChars), size: 40, lineHeight: 44, overflow: true }
}

export function fitHeroTitle(post) {
  const title = editorialTitle(post)
  const fitted = fitText(title)
  if (!fitted.overflow) return { ...fitted, title }

  for (const key of ['shortTitle', 'seoTitle']) {
    if (!post?.[key]) continue
    const alt = decodeTitle(post[key])
    const altFit = fitText(alt)
    if (!altFit.overflow) return { ...altFit, title: alt }
  }

  return { ...fitted, title }
}

export function escapeXml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function titleTextSvg(lines, { x = 96, y = 278, size = 66, lineHeight = 72, weight = 850, fill = '#ffffff', family = 'Poppins, Inter, Arial, sans-serif' } = {}) {
  const tspans = lines.map((line, index) => (
    `<tspan x="${x}" dy="${index === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`
  )).join('')
  return `<text x="${x}" y="${y}" fill="${fill}" opacity="1" font-size="${size}" font-weight="${weight}" font-family="${family}" letter-spacing="0">${tspans}</text>`
}
