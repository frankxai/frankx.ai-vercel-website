/** Pure research/scenario functions. No credentials, network, sales forecasts or private machine state. */
export interface Scenario {
  visits: number; conversion: number; price: number; vat: number; fee: number;
  fixedFee: number; refund: number; delivery: number; cac: number; fixed: number;
  basis: 'gross' | 'net';
}
export const defaultScenario: Scenario = { visits: 1000, conversion: 2, price: 49, vat: 21, fee: 5, fixedFee: 0.5, refund: 5, delivery: 1, cac: 0.2, fixed: 50, basis: 'gross' };
export const numericFields = ['visits', 'conversion', 'price', 'vat', 'fee', 'fixedFee', 'refund', 'delivery', 'cac', 'fixed'] as const;
const percentages: readonly string[] = ['conversion', 'vat', 'fee', 'refund'];
export function validScenario(value: unknown): value is Scenario {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  return (v.basis === 'gross' || v.basis === 'net') && numericFields.every(key =>
    typeof v[key] === 'number' && Number.isFinite(v[key]) && v[key] >= 0 &&
    (percentages.includes(key) ? v[key] <= 100 : v[key] <= 1e9));
}
export function calculateScenario(v: Scenario) {
  if (!validScenario(v)) throw new Error('Invalid scenario');
  const orders = v.visits * v.conversion / 100;
  const revenue = orders * v.price * (1 - v.refund / 100);
  const fees = orders * ((v.basis === 'gross' ? v.price * (1 + v.vat / 100) : v.price) * v.fee / 100 + v.fixedFee);
  const delivery = orders * v.delivery;
  const acquisition = v.visits * v.cac;
  return { orders, revenue, fees, delivery, acquisition, fixed: v.fixed, contribution: revenue - fees - delivery - acquisition - v.fixed };
}
export interface AtlasSelection { product: string; compare: string[]; category: string; query: string; scenario: Scenario }
export function parseSelection(params: URLSearchParams, productIds: readonly string[], categories: readonly string[]): AtlasSelection {
  const v: Scenario = { ...defaultScenario };
  for (const key of numericFields) {
    const raw = params.get(key);
    if (raw !== null && raw.trim() !== '') v[key] = Number(raw);
  }
  v.basis = params.get('basis') === 'net' ? 'net' : 'gross';
  const product = params.get('product') || '';
  const category = params.get('category') || 'all';
  return {
    product: productIds.includes(product) ? product : productIds[0] || '',
    compare: [...new Set((params.get('compare') || '').split(',').filter(id => productIds.includes(id)))].slice(0, 3),
    category: categories.includes(category) ? category : 'all',
    query: (params.get('q') || '').slice(0, 120),
    scenario: validScenario(v) ? v : { ...defaultScenario },
  };
}
export function serializeSelection(s: AtlasSelection): string {
  if (!validScenario(s.scenario)) throw new Error('Invalid scenario');
  const p = new URLSearchParams();
  p.set('product', s.product);
  if (s.compare.length) p.set('compare', [...new Set(s.compare)].slice(0, 3).join(','));
  if (s.category !== 'all') p.set('category', s.category);
  // Search text stays local; shared URLs contain only public IDs and numeric assumptions.
  for (const key of numericFields) p.set(key, String(s.scenario[key]));
  p.set('basis', s.scenario.basis);
  return p.toString();
}
export function restoreSelection(raw: string, productIds: readonly string[], categories: readonly string[]): AtlasSelection | null {
  if (raw.length > 200000) return null;
  try {
    const v: unknown = JSON.parse(raw);
    if (!v || typeof v !== 'object') return null;
    const data = v as Record<string, unknown>;
    if (data.version !== 1 || !validScenario(data.scenario)) return null;
    const p = new URLSearchParams();
    if (typeof data.product === 'string') p.set('product', data.product);
    if (Array.isArray(data.compare)) p.set('compare', data.compare.filter(x => typeof x === 'string').join(','));
    if (typeof data.category === 'string') p.set('category', data.category);
    if (typeof data.query === 'string') p.set('q', data.query);
    for (const key of numericFields) p.set(key, String(data.scenario[key]));
    p.set('basis', data.scenario.basis);
    return parseSelection(p, productIds, categories);
  } catch { return null; }
}
export function sourceFreshness(checkedAt: string, refreshDays: number, now: Date): 'current' | 'stale' | 'unknown' {
  const checked = Date.parse(checkedAt + 'T00:00:00Z');
  if (!Number.isFinite(checked) || !Number.isFinite(refreshDays) || refreshDays <= 0 || checked > now.getTime()) return 'unknown';
  return now.getTime() - checked > refreshDays * 86400000 ? 'stale' : 'current';
}
