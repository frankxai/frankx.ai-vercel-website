const {JSDOM}=require(process.env.AGENT_TEAM_JSDOM_PATH || 'jsdom')
const fs=require('fs'),assert=require('assert/strict')
const html=fs.readFileSync(process.argv[2],'utf8')
const dom=new JSDOM(html,{runScripts:'dangerously',url:'file:///START-HERE.html'})
const d=dom.window.document
let copied='',saved
Object.defineProperty(dom.window.navigator,'clipboard',{value:{writeText:async text=>{copied=text}}})
dom.window.URL.createObjectURL=blob=>{saved=blob;return 'blob:fixture'}
dom.window.URL.revokeObjectURL=()=>{}
dom.window.HTMLAnchorElement.prototype.click=function(){assert.equal(this.download,'business-context.md')}
assert.equal(d.querySelectorAll('textarea[name]').length,14)
d.getElementById('field-0').value='Mara <script>not code</script>'
d.getElementById('field-1').value='Solo consultants'
d.getElementById('show-context').click()
const output=d.getElementById('context-output')
assert.ok(!output.hidden)
assert.ok(output.value.includes('Mara <script>not code</script>'))
assert.ok(output.value.includes('Audience: Solo consultants'))
assert.ok(output.value.includes('Approval owner: Unknown'))
assert.equal(d.querySelectorAll('script').length,1)
d.getElementById('export-context').click()
assert.equal(saved.type,'text/markdown;charset=utf-8')
const reader=new dom.window.FileReader()
reader.onload=async()=>{
 assert.equal(reader.result,output.value)
 const team=d.getElementById('team')
 team.querySelector('button').click()
 await Promise.resolve()
 assert.ok(copied.startsWith('# FrankX Agent Team'))
 assert.ok(copied.includes('APPROVE BRIEF v1'))
 for(const a of d.querySelectorAll('a[href^="#"]')) assert.ok(d.querySelector(a.getAttribute('href')),a.href)
 assert.equal(d.querySelectorAll('script[src],link[rel="stylesheet"],img[src]').length,0)
 assert.ok(!/\b(fetch|XMLHttpRequest|localStorage)\s*\(/.test(html))
 console.log('PASS: 14 labelled fields; blank values stay Unknown; user markup remains inert; Markdown export bytes match; role copy matches source; section links resolve; no external resources. DOM simulation only, not rendered-browser or AI-host evidence.')
 dom.window.close()
}
reader.readAsText(saved)
