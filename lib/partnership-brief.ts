/** Client-safe assembly into the existing intake message; no second lead store. */
export const PARTNERSHIP_KINDS = {
  commissioned: 'Commission a reference build',
  editorial: 'Suggest a product for a guide',
} as const

export const PARTNERSHIP_BUDGETS = [
  'Under €1,000',
  '€1,000–€2,999',
  '€3,000–€5,999',
  '€6,000+',
  'To discuss',
  'Editorial suggestion / in-kind',
] as const

function field(data: FormData, name: string, max: number, required = true) {
  const value = String(data.get(name) ?? '').trim()
  if ((required && !value) || value.length > max) {
    throw new Error('Please complete the brief within the displayed field limits.')
  }
  return value
}

export function buildPartnershipBrief(data: FormData): string {
  const kind = field(data, 'briefKind', 30)
  if (!Object.hasOwn(PARTNERSHIP_KINDS, kind)) {
    throw new Error('Choose a commission or an editorial suggestion.')
  }
  const product = field(data, 'productUrl', 300)
  let url: URL
  try {
    url = new URL(product)
  } catch {
    throw new Error('Add a valid HTTPS product or documentation URL.')
  }
  if (url.protocol !== 'https:' || url.username || url.password) {
    throw new Error('Use an HTTPS product URL without credentials.')
  }
  const audience = field(data, 'audience', 200)
  const preferredDate = field(data, 'preferredDate', 10, false)
  if (preferredDate && (
    !/^\d{4}-\d{2}-\d{2}$/.test(preferredDate) ||
    !Number.isFinite(Date.parse(preferredDate)) ||
    new Date(preferredDate).toISOString().slice(0, 10) !== preferredDate
  )) {
    throw new Error('Choose a valid preferred date, or leave it blank.')
  }
  const budget = field(data, 'budget', 60)
  if (!(PARTNERSHIP_BUDGETS as readonly string[]).includes(budget)) {
    throw new Error('Choose a budget range.')
  }
  const task = field(data, 'message', 2000)

  const message = [
    `Architecture partnership: ${PARTNERSHIP_KINDS[kind as keyof typeof PARTNERSHIP_KINDS]}`,
    `Product or docs: ${url.href}`,
    `Intended user: ${audience}`,
    `Preferred date: ${preferredDate || 'Flexible'}`,
    `Budget: ${budget}`,
    '',
    'Task and useful result:',
    task,
  ].join('\n')
  if (message.length > 4000) {
    throw new Error('The full brief is too long. Shorten the product URL or task description.')
  }
  return message
}
