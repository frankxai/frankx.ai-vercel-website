/** Loopback OFFLINE FIXTURE rehearsal. No provider credentials, cloud I/O or deployable route. */
import { createServer } from 'node:http'
import { randomBytes, createHash, createHmac, timingSafeEqual } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import Stripe from 'stripe'
import ts from 'typescript'
import { sqliteSandboxLedger } from './glass-sandbox-sqlite.mjs'
const require = createRequire(import.meta.url)
function load(file, imports={}) {
  const source=readFileSync(new URL(`../../${file}`,import.meta.url),'utf8')
  const {outputText}=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}})
  const module={exports:{}}
  new Function('require','module','exports',outputText)(id=>{if(id.startsWith('node:'))return require(id);if(!Object.hasOwn(imports,id))throw Error('Unexpected rehearsal dependency');return imports[id]},module,module.exports)
  return module.exports
}
const core=load('lib/commerce/glass-sandbox-fulfillment.ts',{'../product-fulfillment':load('lib/product-fulfillment.ts'),stripe:Stripe})
const fixtureSecret='whsec_offline_fixture_only_not_a_credential'
export async function startGlassSandboxHarness({ledgerFile,port=0}={}) {
  if(process.env.NODE_ENV==='production' || !ledgerFile)throw Error('Offline fixture ledger file required; production refused')
  const ledger=sqliteSandboxLedger(ledgerFile), bytes=Buffer.from('PK\u0005\u0006'+'\0'.repeat(18),'binary')
  const release={productId:'aurora-ui-kit',edition:'essential',sourceSha:'a'.repeat(40),artifactId:'offline-empty-zip-fixture',artifactSha256:createHash('sha256').update(bytes).digest('hex'),artifactBytes:bytes.length,priceId:'price_offline_fixture',amount:7900,currency:'eur',termsVersion:'offline-fixture-draft',termsSha256:'c'.repeat(64),termsScope:'sandbox-rehearsal-only'}
  const acceptedAt=(await ledger.attempt('cs_test_offline_fixture'))?.acceptedAt??new Date().toISOString(),cookieKey=randomBytes(32),cookie=createHmac('sha256',cookieKey).update('offline_fixture_alice').digest('hex')
  let origin,session
  const authenticate=async request=>{
    const value=request.headers.get('cookie')?.split(';').map(v=>v.trim()).find(v=>v.startsWith('glass_fixture='))?.slice(14)
    if(!value || value.length!==cookie.length || !timingSafeEqual(Buffer.from(value),Buffer.from(cookie)))return null
    return{subjectId:'offline_fixture_alice',acceptedAt,termsSha256:release.termsSha256}
  }
  const options={mode:'test',secretKey:'sk_test_offline_fixture_only_not_a_credential',webhookSecret:fixtureSecret,products:JSON.parse(readFileSync(new URL('../../data/products.json',import.meta.url),'utf8')),release,ledger,
    reads:{session:async()=>structuredClone(session),lineItems:async()=>({data:[{quantity:1,amount_total:7900,currency:'eur',price:{id:release.priceId,currency:'eur'}}],has_more:false}),charge:async()=>({id:'ch_offline_fixture',livemode:false,payment_intent:'pi_offline_fixture',amount_refunded:7900,currency:'eur'})}}
  const transport=async(url,init)=>{
    if(new URL(url).pathname!=='/v1/checkout/sessions' || init.method!=='POST')throw Error('External I/O refused')
    const form=new URLSearchParams(init.body)
    if(form.get('line_items[0][price]')!==release.priceId)throw Error('Canonical Price required')
    session??={id:'cs_test_offline_fixture',object:'checkout.session',livemode:false,mode:'payment',status:'open',payment_status:'unpaid',amount_total:7900,currency:'eur',client_reference_id:form.get('client_reference_id'),payment_intent:'pi_offline_fixture',metadata:Object.fromEntries([...form].filter(([k])=>/^metadata\[/.test(k)).map(([k,v])=>[k.slice(9,-1),v])),url:'https://checkout.stripe.com/c/pay/cs_test_offline_fixture'}
    return Response.json(session)
  }
  const server=createServer(async(req,res)=>{
    try{
      const url=new URL(req.url,origin)
      if(req.method==='GET' && url.pathname==='/'){
        res.setHeader('set-cookie',`glass_fixture=${cookie}; HttpOnly; SameSite=Strict; Path=/`)
        res.setHeader('content-type','text/html; charset=utf-8');res.setHeader('cache-control','no-store')
        res.end(`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Glass Core offline fixture rehearsal</title><body><main><h1>Glass Core: offline fixture rehearsal</h1><p>No payment, provider connection or commercial artifact. This host grants a local fixture identity only.</p><button data-action="checkout">1. Prepare fixture checkout</button> <button data-action="fixture-payment">2. Simulate signed paid callback</button> <a href="/download?session=cs_test_offline_fixture">3. Download empty ZIP fixture</a> <button data-action="fixture-refund">4. Simulate refund</button><pre id="result" aria-live="polite"></pre></main><script>document.querySelectorAll('button').forEach(b=>b.onclick=async()=>{const r=await fetch('/'+b.dataset.action,{method:'POST'});document.getElementById('result').textContent=r.status+' '+await r.text()})</script></body></html>`);return
      }
      const headers=new Headers();for(const [key,value]of Object.entries(req.headers))if(typeof value==='string')headers.set(key,value)
      const request=new Request(url,{method:req.method,headers,...(req.method!=='GET'&&req.method!=='HEAD'?{body:req,duplex:'half'}:{})})
      let response
      if(url.pathname==='/checkout')response=await core.glassSandboxCheckout(request,{...options,authenticate,transport,siteOrigin:origin,purchaseAttemptId:'host_offline_attempt_001'})
      else if(url.pathname==='/webhook')response=await core.glassSandboxWebhook(request,options)
      else if(url.pathname==='/download')response=await core.glassSandboxDownload(request,{...options,authenticate,readPrivateArtifact:async id=>{if(id!==release.artifactId)throw Error('Unlisted object');return bytes}})
      else if(['/fixture-payment','/fixture-refund'].includes(url.pathname)){
        if(req.method!=='POST'||headers.get('origin')!==origin||!await authenticate(request))response=Response.json({error:'fixture_auth_origin_required'},{status:403})
        else if(!session)response=Response.json({error:'prepare_fixture_first'},{status:409})
        else{
          const refund=url.pathname==='/fixture-refund';if(!refund)session.payment_status='paid'
          const payload=JSON.stringify({id:refund?'evt_offline_refund':'evt_offline_paid',type:refund?'charge.refunded':'checkout.session.completed',object:'event',livemode:false,data:{object:{id:refund?'ch_offline_fixture':session.id}}})
          response=await fetch(`${origin}/webhook`,{method:'POST',body:payload,headers:{'stripe-signature':Stripe.webhooks.generateTestHeaderString({payload,secret:fixtureSecret})}})
        }
      }else response=Response.json({error:'not_found'},{status:404})
      res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()))
    }catch{res.writeHead(503,{'content-type':'application/json'});res.end('{"error":"offline_fixture_unavailable"}')}
  })
  await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(port,'127.0.0.1',resolve)})
  origin=`http://127.0.0.1:${server.address().port}`
  return{origin,close:async()=>{await new Promise((resolve,reject)=>server.close(error=>error?reject(error):resolve()));ledger.close()}}
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const ledgerFile=process.argv[2];const harness=await startGlassSandboxHarness({ledgerFile,port:Number(process.env.GLASS_FIXTURE_PORT||0)})
  console.log(`OFFLINE FIXTURES ONLY — ${harness.origin} — no provider/payment/cloud connection`)
  for(const signal of ['SIGINT','SIGTERM'])process.once(signal,async()=>{await harness.close();process.exit(0)})
}
