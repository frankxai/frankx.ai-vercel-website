import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { getAgentTeamCheckoutUrl } from '../../lib/agent-team-commerce.ts'
const current = JSON.parse(readFileSync('data/agent-team-release.json','utf8'))
const fixture = () => ({ ...current, status:'purchasable', packageSha256:'a'.repeat(64), checkoutUrl:'https://example.lemonsqueezy.com/checkout/buy/12345678-1234-1234-1234-123456789abc', evidence:Object.fromEntries(Object.keys(current.evidence).map(k=>[k,'test-fixture-only'])) })
test('candidate cannot open checkout even with an injected URL or configured environment',()=>{
 process.env.LEMON_SQUEEZY_API_KEY='test-not-a-secret'
 process.env.LEMON_SQUEEZY_VARIANT_AGENT_TEAM='12345'
 assert.equal(getAgentTeamCheckoutUrl(current),null)
 assert.equal(getAgentTeamCheckoutUrl({...fixture(),status:'evaluation'}),null)
})
test('every absent acceptance receipt closes checkout',()=>{
 for(const key of Object.keys(current.evidence)) {
  const r=fixture();r.evidence[key]=null
  assert.equal(getAgentTeamCheckoutUrl(r),null,key)
 }
 const r=fixture();r.evidence={};assert.equal(getAgentTeamCheckoutUrl(r),null)
})
test('unsafe URLs, variant IDs and corrupted package identity cannot open checkout',()=>{
 for(const url of ['javascript:alert(1)','https://evil.test/checkout/buy/12345678-1234-1234-1234-123456789abc','https://example.lemonsqueezy.com.evil.test/checkout/buy/12345678-1234-1234-1234-123456789abc','https://example.lemonsqueezy.com/checkout/buy/12345','http://example.lemonsqueezy.com/checkout/buy/12345678-1234-1234-1234-123456789abc','https://user:password@example.lemonsqueezy.com/checkout/buy/12345678-1234-1234-1234-123456789abc',fixture().checkoutUrl+'?test=1',fixture().checkoutUrl+'#fragment']) assert.equal(getAgentTeamCheckoutUrl({...fixture(),checkoutUrl:url}),null,url)
 assert.equal(getAgentTeamCheckoutUrl({...fixture(),packageSha256:'unknown'}),null)
 assert.equal(getAgentTeamCheckoutUrl({...fixture(),merchant:'stripe'}),null)
})
test('complete synthetic fixture can resolve its hosted URL; this is not payment proof',()=>{
 const r=fixture();assert.equal(getAgentTeamCheckoutUrl(r),r.checkoutUrl)
})
test('product identity has one registry entry and no competing Stripe or Polar SKU',()=>{
 const products=JSON.parse(readFileSync('data/products.json','utf8'))
 const matched=products.filter(p=>p.slug==='agent-team')
 assert.equal(matched.length,1);assert.equal(matched[0].id,'frankx-agent-team')
 for(const route of ['app/api/checkout/route.ts','app/api/checkout/polar/route.ts']) assert.ok(!readFileSync(route,'utf8').includes("'frankx-agent-team'"))
})
