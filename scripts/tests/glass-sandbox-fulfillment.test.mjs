import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { mkdtemp, rm } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import path from 'node:path'
import ts from 'typescript'
import Stripe from 'stripe'
import { startGlassSandboxHarness } from '../commerce/glass-sandbox-harness.mjs'
import { sqliteSandboxLedger } from '../commerce/glass-sandbox-sqlite.mjs'
const require = createRequire(import.meta.url)
function load(file, imports = {}) {
  const text = readFileSync(new URL(`../../${file}`, import.meta.url), 'utf8')
  const { outputText } = ts.transpileModule(text, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } })
  const module = { exports: {} }
  new Function('require','module','exports',outputText)(id => {
    if (id.startsWith('node:')) return require(id)
    assert(Object.hasOwn(imports,id),`Unexpected dependency ${id}`); return imports[id]
  },module,module.exports)
  return module.exports
}
const helpers=load('lib/product-fulfillment.ts')
const core=load('lib/commerce/glass-sandbox-fulfillment.ts',{'../product-fulfillment':helpers,stripe:Stripe})
const products=JSON.parse(readFileSync(new URL('../../data/products.json',import.meta.url),'utf8'))
const bytes=Buffer.from('PK\u0005\u0006'+'\0'.repeat(18),'binary') // valid, empty ZIP fixture, not the commercial artifact
const release={productId:'aurora-ui-kit',edition:'essential',sourceSha:'a'.repeat(40),artifactId:'glass-essential-rc-fixture',artifactSha256:createHash('sha256').update(bytes).digest('hex'),artifactBytes:bytes.length,priceId:'price_sandbox_essential',amount:7900,currency:'eur',termsVersion:'fixture-draft',termsSha256:'c'.repeat(64),termsScope:'sandbox-rehearsal-only'}
const acceptedAt='2026-01-01T00:00:00.000Z'
const key='sk_test_fixture_only_not_a_credential'
const webhookSecret='whsec_fixture_only_not_a_real_signing_secret'
function eventRequest(type, object, id='evt_paid',mode=false,signatureSecret=webhookSecret){
  const payload=JSON.stringify({id,type,object:'event',livemode:mode,data:{object}})
  return new Request('https://test.invalid/webhook',{method:'POST',body:payload,headers:{'stripe-signature':Stripe.webhooks.generateTestHeaderString({payload,secret:signatureSecret})}})
}
async function fixture(){
  const dir=await mkdtemp(path.join(tmpdir(),'glass-sandbox-'));const file=path.join(dir,'ledger.sqlite');let ledger=sqliteSandboxLedger(file)
  const session={id:'cs_test_fixture',livemode:false,mode:'payment',payment_status:'paid',currency:'eur',amount_total:7900,client_reference_id:'user_alice',payment_intent:'pi_fixture',metadata:{productSlug:'aurora-ui-kit',tier:'essential',edition:'essential',sourceSha:release.sourceSha,termsVersion:release.termsVersion,termsSha256:release.termsSha256,termsScope:release.termsScope}}
  const line={quantity:1,amount_total:7900,currency:'eur',price:{id:release.priceId,currency:'eur'}}
  const charge={id:'ch_fixture',livemode:false,currency:'eur',payment_intent:'pi_fixture',amount_refunded:7900}
  const options={mode:'test',secretKey:key,webhookSecret,products,release,ledger,reads:{session:async()=>structuredClone(session),lineItems:async()=>({data:[structuredClone(line)],has_more:false}),charge:async()=>structuredClone(charge)}}
  await core.registerGlassSandboxAttempt(options,{sessionId:session.id,subjectId:'user_alice',acceptedAt})
  const pay=()=>core.glassSandboxWebhook(eventRequest('checkout.session.completed',{id:session.id}),options)
  const download=(subject='user_alice',body=bytes)=>core.glassSandboxDownload(new Request(`https://test.invalid/download?session=${session.id}`),{...options,authenticate:async()=>subject?{subjectId:subject}:null,readPrivateArtifact:async id=>{assert.equal(id,release.artifactId);return body}})
  return{dir,file,session,line,charge,options,pay,download,close:async()=>{ledger.close();await rm(dir,{recursive:true,force:true})},reopen:()=>{ledger.close();ledger=sqliteSandboxLedger(file);options.ledger=ledger;return ledger}}
}
test('signed paid event grants one durable entitlement and authenticated private bytes survive restart',async()=>{
  const f=await fixture();try{
    assert.equal((await f.download()).status,404)
    assert.equal((await f.pay()).status,200)
    assert.equal((await (await f.pay()).json()).result,'duplicate')
    f.reopen();assert.equal((await f.options.ledger.entitlement(f.session.id)).state,'active')
    const response=await f.download();assert.equal(response.status,200);assert.equal(response.headers.get('cache-control'),'private, no-store');assert.deepEqual(Buffer.from(await response.arrayBuffer()),bytes)
  }finally{await f.close()}
})
test('actual SDK checkout binds authenticated owner and server price, with stable retries and origin protection',async()=>{
  const f=await fixture();try{
    const calls=[];const request=()=>new Request('https://test.invalid/checkout',{method:'POST',headers:{origin:'https://test.invalid'},body:JSON.stringify({priceId:'price_attacker',subjectId:'user_bob'})})
    const options={...f.options,authenticate:async()=>({subjectId:'user_alice',termsSha256:release.termsSha256,acceptedAt}),siteOrigin:'https://test.invalid',purchaseAttemptId:'host_attempt_fixture_001',transport:async(url,init)=>{
      assert.equal(new URL(url).pathname,'/v1/checkout/sessions');assert.equal(init.method,'POST')
      const form=new URLSearchParams(init.body);assert.equal(form.get('line_items[0][price]'),release.priceId);assert.equal(form.get('line_items[0][quantity]'),'1');assert.equal(form.get('client_reference_id'),'user_alice');assert.equal(form.get('metadata[sourceSha]'),release.sourceSha)
      calls.push(new Headers(init.headers).get('idempotency-key'))
      return Response.json({...f.session,status:'open',url:'https://checkout.stripe.com/c/pay/cs_test_fixture'})
    }}
    assert.equal((await core.glassSandboxCheckout(request(),options)).status,201);assert.equal((await core.glassSandboxCheckout(request(),options)).status,201);assert.equal(calls[0],calls[1]);assert.equal((await f.options.ledger.attempt(f.session.id)).subjectId,'user_alice')
    assert.equal((await core.glassSandboxCheckout(new Request('https://test.invalid/checkout',{method:'POST'}),options)).status,403)
    assert.equal((await core.glassSandboxCheckout(request(),{...options,authenticate:async()=>null})).status,401);assert.equal(calls.length,2)
    assert.equal((await core.glassSandboxCheckout(request(),{...options,authenticate:async()=>({subjectId:'user_alice',termsSha256:'d'.repeat(64),acceptedAt})})).status,409)
    assert.equal((await core.glassSandboxCheckout(request(),{...options,authenticate:async()=>({subjectId:'user_alice',termsSha256:release.termsSha256,acceptedAt:'2099-01-01T00:00:00.000Z'})})).status,409);assert.equal(calls.length,2)
    assert.equal((await f.pay()).status,200);assert.equal((await f.download()).status,200)
  }finally{await f.close()}
})
test('authentication, ownership and source hash gate the actual bytes',async()=>{
  const f=await fixture();try{await f.pay();assert.equal((await f.download(null)).status,401);assert.equal((await f.download('user_bob')).status,404);assert.equal((await f.download('user_alice',Buffer.from('corrupt'))).status,502);f.options.release={...release,sourceSha:'b'.repeat(40)};assert.equal((await f.download()).status,409)}finally{await f.close()}
})
test('real Stripe signature verification refuses tampering, wrong signature and live events',async()=>{
  const f=await fixture();try{
    assert.equal((await core.glassSandboxWebhook(eventRequest('checkout.session.completed',{id:f.session.id},'evt_bad',false,'whsec_wrong'),f.options)).status,401)
    assert.equal((await core.glassSandboxWebhook(eventRequest('checkout.session.completed',{id:f.session.id},'evt_live',true),f.options)).status,422)
    assert.equal((await core.glassSandboxWebhook(new Request('https://test.invalid',{method:'POST',body:'{}'}),f.options)).status,400)
    assert.equal(await f.options.ledger.entitlement(f.session.id),null)
  }finally{await f.close()}
})
test('provider facts must match paid session, exact price, quantity, currency and immutable source',async()=>{
  const f=await fixture();try{
    for(const mutate of [s=>s.payment_status='unpaid',s=>s.amount_total=1,s=>s.currency='usd',s=>s.livemode=true,s=>s.client_reference_id='user_bob',s=>s.metadata.sourceSha='b'.repeat(40),s=>s.metadata.termsSha256='d'.repeat(64)]){
      const old=structuredClone(f.session);mutate(f.session);assert.equal((await f.pay()).status,422);Object.assign(f.session,old)
    }
    f.line.quantity=2;assert.equal((await f.pay()).status,422);f.line.quantity=1;f.line.price.id='price_wrong';assert.equal((await f.pay()).status,422)
    assert.equal(await f.options.ledger.entitlement(f.session.id),null)
  }finally{await f.close()}
})
test('refund revocation persists, duplicates are harmless and delayed payment cannot regrant',async()=>{
  const f=await fixture();try{
    await f.pay();const refund=()=>core.glassSandboxWebhook(eventRequest('charge.refunded',{id:'ch_fixture'},'evt_refund'),f.options)
    assert.equal((await refund()).status,200);assert.equal((await (await refund()).json()).result,'duplicate');f.reopen();assert.equal((await f.download()).status,410)
    assert.equal((await core.glassSandboxWebhook(eventRequest('checkout.session.async_payment_succeeded',{id:f.session.id},'evt_late'),f.options)).status,200);assert.equal((await f.download()).status,410)
  }finally{await f.close()}
})
test('refund-before-payment tombstone prevents out-of-order access',async()=>{
  const f=await fixture();try{await core.glassSandboxWebhook(eventRequest('charge.refunded',{id:'ch_fixture'},'evt_refund_first'),f.options);await f.pay();assert.equal((await f.download()).status,410)}finally{await f.close()}
})
test('binding cannot change owner and a reused event cannot target a different operation',async()=>{
  const f=await fixture();try{
    await assert.rejects(core.registerGlassSandboxAttempt(f.options,{sessionId:f.session.id,subjectId:'user_bob',acceptedAt}),/binding conflict/)
    await assert.rejects(core.registerGlassSandboxAttempt(f.options,{sessionId:f.session.id,subjectId:'user_alice',acceptedAt:'2026-01-02T00:00:00.000Z'}),/binding conflict/)
    await f.pay();assert.equal((await core.glassSandboxWebhook(eventRequest('charge.refunded',{id:'ch_fixture'},'evt_paid'),f.options)).status,503);assert.equal((await f.download()).status,200)
  }finally{await f.close()}
})
test('live configuration and unavailable providers fail closed without a grant',async()=>{
  const f=await fixture();try{f.options.secretKey='sk_live_never_use';assert.equal((await f.pay()).status,503);f.options.secretKey=key;f.options.reads.session=async()=>{throw Error('sensitive provider error')};const response=await f.pay();assert.equal(response.status,503);assert.doesNotMatch(await response.text(),/sensitive/);assert.equal(await f.options.ledger.entitlement(f.session.id),null)}finally{await f.close()}
})
test('Supabase adapter preserves the server-only transaction RPC contract and failure mode',async()=>{
  const calls=[];const ledger=core.supabaseSandboxLedger(async(name,args)=>{calls.push({name,args});return{data:args.operation==='grant'?'applied':null,error:null}})
  await ledger.register({...release,sessionId:'cs_test_fixture',subjectId:'user_alice',acceptedAt});assert.equal(await ledger.grant('evt_x',{...release,sessionId:'cs_test_fixture',subjectId:'user_alice',acceptedAt,paymentIntent:'pi_fixture',state:'active'}),'applied');assert(calls.every(c=>c.name==='glass_sandbox_command'))
  const unavailable=core.supabaseSandboxLedger(async()=>({data:null,error:{message:'sensitive'}}));await assert.rejects(unavailable.attempt('cs_test_fixture'),/SANDBOX_LEDGER_UNAVAILABLE/)
})
test('actual Stripe SDK read adapter executes only the supplied test transport',async()=>{
  const paths=[]
  const api=core.stripeSandboxReads(key,async(url,init)=>{paths.push(new URL(url).pathname);assert.equal(new Headers(init.headers).get('authorization'),`Bearer ${key}`);return Response.json({id:'cs_test_fixture',object:'checkout.session',livemode:false})})
  assert.equal((await api.session('cs_test_fixture')).livemode,false)
  await api.lineItems('cs_test_fixture');await api.charge('ch_fixture')
  assert.deepEqual(paths,['/v1/checkout/sessions/cs_test_fixture','/v1/checkout/sessions/cs_test_fixture/line_items','/v1/charges/ch_fixture'])
  assert.throws(()=>core.stripeSandboxReads('sk_live_never',fetch),/TEST_TRANSPORT_REQUIRED/)
})
test('private storage adapter rejects public buckets, unlisted keys and storage failures',async()=>{
  let publicBucket=false,downloads=0
  const storage={getBucket:async()=>({data:{public:publicBucket},error:null}),from:bucket=>{assert.equal(bucket,'sandbox-private');return{download:async key=>{assert.equal(key,'glass/essential.zip');downloads++;return{data:new Blob([bytes]),error:null}}}}}
  const read=core.supabasePrivateArtifactReader(storage,'sandbox-private',{[release.artifactId]:'glass/essential.zip'})
  assert.deepEqual(Buffer.from(await read(release.artifactId)),bytes)
  publicBucket=true;await assert.rejects(read(release.artifactId),/PRIVATE_BUCKET_REQUIRED/);assert.equal(downloads,1)
  await assert.rejects(read('../private'),/ARTIFACT_NOT_CONFIGURED/)
  const traversal=core.supabasePrivateArtifactReader(storage,'sandbox-private',{bad:'../outside.zip'});await assert.rejects(traversal('bad'),/ARTIFACT_NOT_CONFIGURED/)
})
test('body size and provider deadlines fail closed without recording an entitlement',async()=>{
  const f=await fixture();try{
    const oversized=new Request('https://test.invalid',{method:'POST',headers:{'stripe-signature':'fixture'},body:'x'.repeat(65_537)})
    assert.equal((await core.glassSandboxWebhook(oversized,f.options)).status,413)
    f.options.deadlineMs=5;f.options.reads.session=()=>new Promise(()=>{});assert.equal((await f.pay()).status,503);assert.equal(await f.options.ledger.entitlement(f.session.id),null)
  }finally{await f.close()}
})

test('loopback HTTP rehearsal wires checkout, signed callback, ownership denial and refund download revocation',async()=>{
  const dir=await mkdtemp(path.join(tmpdir(),'glass-http-'));const host=await startGlassSandboxHarness({ledgerFile:path.join(dir,'ledger.sqlite')})
  try{
    const page=await fetch(host.origin);assert.match(await page.text(),/offline fixture rehearsal/)
    const cookie=page.headers.get('set-cookie').split(';')[0]
    const post=route=>fetch(host.origin+route,{method:'POST',headers:{cookie,origin:host.origin}})
    assert.equal((await fetch(host.origin+'/download?session=cs_test_offline_fixture')).status,401)
    assert.equal((await post('/checkout')).status,201)
    assert.equal((await post('/fixture-payment')).status,200)
    assert.equal((await post('/fixture-payment')).status,200)
    const download=()=>fetch(host.origin+'/download?session=cs_test_offline_fixture',{headers:{cookie}})
    assert.deepEqual(Buffer.from(await(await download()).arrayBuffer()),bytes)
    assert.equal((await fetch(host.origin+'/download?session=cs_test_offline_fixture',{headers:{cookie:'glass_fixture=wrong'}})).status,401)
    assert.equal((await post('/fixture-refund')).status,200);assert.equal((await download()).status,410)
    assert.equal((await post('/fixture-payment')).status,200);assert.equal((await download()).status,410)
  }finally{await host.close();await rm(dir,{recursive:true,force:true})}
})
