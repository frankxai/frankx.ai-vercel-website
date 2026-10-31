// Built-app privacy journey. Author: Codex; 2026-10-31; revision 1. Synthetic data only.
import assert from 'node:assert/strict'
import { randomBytes } from 'node:crypto'
import { once } from 'node:events'
import { createRequire } from 'node:module'
import net from 'node:net'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'
const root=fileURLToPath(new URL('../..',import.meta.url))
const require=createRequire(path.join(root,'package.json'))
const {encode}=await import(pathToFileURL(require.resolve('next-auth/jwt')))
const {startNextServer,stopManagedProcess}=await import(pathToFileURL(path.join(root,'scripts/tests/helpers/managed-next-process.mjs')))
const socket=net.createServer();socket.listen(0,'127.0.0.1');await once(socket,'listening');const port=socket.address().port;await new Promise(r=>socket.close(r))
const secret=randomBytes(32).toString('hex')
process.env.AUTH_SECRET=secret;process.env.NEXTAUTH_SECRET=secret;process.env.AUTH_TRUST_HOST='true'
process.env.ADMIN_EMAIL='privacy-fixture@example.invalid';process.env.NEXTAUTH_URL=`http://127.0.0.1:${port}`;process.env.AUTH_URL=process.env.NEXTAUTH_URL
process.env.WEALTH_OPS_JSON=JSON.stringify({netWorth:{current:1,history:[]},fireTarget:{annualExpenses:1,multiple:1,target:1,currentProgress:1,progressPercent:1},propertyTargets:[{id:'fixture',type:'fixture',targetArea:'privacy-e2e-fixture',budgetRange:{min:1,max:2},targetTimeline:'fixture',status:'fixture',notes:'synthetic'}],propertyWatchlist:[],taxStrategy:{},income:{},expenses:{monthly:{}}})
const child=startNextServer({cwd:root,port}); child.stdout.resume();child.stderr.resume()
try{
 let ready=false
 for(let i=0;i<100;i++){try{await fetch(`http://127.0.0.1:${port}/admin/wealth`,{redirect:'manual',signal:AbortSignal.timeout(1000)});ready=true;break}catch{};await new Promise(r=>setTimeout(r,100))}
 assert.ok(ready,'owned production server ready')
 for(const [label,email] of [['anonymous',null],['other-user','other@example.invalid'],['configured-admin',process.env.ADMIN_EMAIL]]){
  const cookie=email?'authjs.session-token='+await encode({token:{email,sub:'fixture'},secret,salt:'authjs.session-token'}):''
  const response=await fetch(`http://127.0.0.1:${port}/admin/wealth`,{redirect:'manual',headers:cookie?{cookie}:{},signal:AbortSignal.timeout(10000)})
  const html=await response.text()
  if(label==='configured-admin'){assert.equal(response.status,200);assert.ok(html.includes('privacy-e2e-fixture'),'synthetic payload rendered for configured admin')}
  else{assert.ok([302,303,307,308,401,403,404].includes(response.status),`${label} denied: ${response.status}`);assert.ok(!html.includes('privacy-e2e-fixture'))}
  console.log(label+': PASS HTTP '+response.status)
 }
}finally{await stopManagedProcess(child);console.log('Owned test server stopped')}
