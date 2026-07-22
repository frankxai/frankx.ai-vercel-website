// Optional live leg: a small needle-in-haystack test against a real model,
// to check whether the offline eviction mechanism's real-world counterpart
// — actual recall accuracy — degrades the way the literature says it does.
// BYOK: the key comes from the environment and is never persisted or logged.
//
// This is NOT the primary number, and it is not deterministic (a real model
// call). It exists to sanity-check that context rot is a real, observable
// phenomenon on one small haystack, at a few depths — not to reproduce any
// published benchmark's exact figures. For sourced, large-scale measured
// numbers, see the README's citations to Databricks / RULER / NoLiMa / Chroma.
//
// Deliberately cheap: 2 haystack lengths x 3 depths = 6 chat completions.

const ENDPOINT = 'https://api.openai.com/v1/chat/completions'

const NEEDLE_DEPTHS = [0.1, 0.5, 0.9]
const HAYSTACK_LENGTHS = [
  { id: 'short', total_chars: 4000 }, // ~1K tokens
  { id: 'long', total_chars: 20000 }, // ~5K tokens
]

// Fixed filler sentences, unrelated to the needle, cycled to reach the
// target haystack length. Deterministic prompt content — only the model's
// answer is non-deterministic.
const FILLER_SENTENCES = [
  'The quarterly logistics report noted steady growth in the northern distribution routes.',
  'A new irrigation schedule was proposed for the community garden on the east side of town.',
  'The museum extended its evening hours for the visiting textile exhibit.',
  'Local cyclists organized a weekend route through the reclaimed rail corridor.',
  'The library committee approved funding for a second reading room.',
  'Engineers reviewed the bridge inspection checklist ahead of the spring maintenance window.',
  'The choir rehearsed a new arrangement for the autumn concert series.',
  'City planners debated the placement of the new bus rapid transit stops.',
]

const NEEDLE_CODE = 'Q7-BRAMBLE-419'
const NEEDLE_SENTENCE = `The hidden verification code for this exercise is: ${NEEDLE_CODE}.`
const QUESTION = 'What is the hidden verification code mentioned in the document above? Answer with only the code.'

function buildHaystack(totalChars, depth) {
  let filler = ''
  let i = 0
  while (filler.length < totalChars) {
    filler += FILLER_SENTENCES[i % FILLER_SENTENCES.length] + ' '
    i++
  }
  filler = filler.slice(0, totalChars)
  const insertAt = Math.floor(depth * filler.length)
  return filler.slice(0, insertAt) + ' ' + NEEDLE_SENTENCE + ' ' + filler.slice(insertAt)
}

async function chatCompletion(apiKey, model, prompt) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: 'Answer strictly from the document provided. Be concise.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0,
    }),
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Chat API error ${res.status}: ${body.slice(0, 300)}`)
  }
  const json = await res.json()
  return { answer: json.choices[0].message.content ?? '', usage: json.usage }
}

// Runs the needle-in-haystack grid (HAYSTACK_LENGTHS x NEEDLE_DEPTHS) against
// a real model. Returns per-cell hit/miss plus token usage. Hit = the exact
// needle code appears in the model's answer.
export async function runLive(apiKey, { model = 'gpt-4o-mini' } = {}) {
  const cells = []
  let totalTokens = 0

  for (const length of HAYSTACK_LENGTHS) {
    for (const depth of NEEDLE_DEPTHS) {
      const haystack = buildHaystack(length.total_chars, depth)
      const prompt = `${haystack}\n\n${QUESTION}`
      const { answer, usage } = await chatCompletion(apiKey, model, prompt)
      totalTokens += usage?.total_tokens || 0
      const hit = answer.toUpperCase().includes(NEEDLE_CODE)
      cells.push({ haystack_length: length.id, total_chars: length.total_chars, depth, hit, answer: answer.trim().slice(0, 80) })
    }
  }

  const hits = cells.filter((c) => c.hit).length
  return { cells, hits, n: cells.length, hit_rate: Number((hits / cells.length).toFixed(4)), totalTokens }
}
