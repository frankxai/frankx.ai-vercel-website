import { readFileSync, readdirSync, mkdirSync, writeFileSync, copyFileSync } from 'node:fs'
import { join, resolve, relative } from 'node:path'
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { marked } from 'marked'

const source = resolve('products/agent-team')
const dest = resolve(process.argv[2] || '/tmp/frankx-agent-team-build')
mkdirSync(dest, { recursive: true })
const escape = s => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
const files = []
function copy(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, e.name)
    if (e.isDirectory()) copy(path)
    else {
      const name = relative(source, path).replaceAll('\\', '/')
      mkdirSync(join(dest, name, '..'), { recursive: true })
      copyFileSync(path, join(dest, name))
      files.push(name)
    }
  }
}
copy(source)
const docs = [
  ['start', 'Start here', 'README.md'], ['team', 'Team instructions', 'TEAM.md'],
  ['workflow', 'Run the workflow', 'workflows/content-and-offer.md'],
  ...['director','researcher','strategist','creator','reviewer'].map(n => [n,n[0].toUpperCase()+n.slice(1),`roles/${n}.md`]),
  ['designer','Example: brand designer','examples/01-designer.md'],
  ['workshop','Example: workshop','examples/02-workshop.md'],
  ['template-maker','Example: template maker','examples/03-template-maker.md'],
  ['claims','Claim ledger','templates/claim-ledger.md'], ['weekly','Weekly plan','templates/weekly-plan.md'],
  ['approval','Human approval','templates/publication-checklist.md'], ['recovery','Save and resume','templates/handoff.md'],
  ['compatibility','Compatibility','COMPATIBILITY.md'], ['license','License','LICENSE.md'],
]
const sections = docs.map(([id,label,file]) => {
  const text = readFileSync(join(source,file),'utf8')
  return `<section id="${id}"><div class="section-label">${escape(label)}</div><div class="prose">${marked.parse(text).replace(/<(\/?)(h)([1-6])(?=[ >])/g, (_, slash, h, level) => `<${slash}h${Math.min(Number(level) + 1, 6)}`)}</div><details class="copy"><summary>Copy the source text</summary><textarea aria-label="${escape(label)} source" readonly>${escape(text)}</textarea><button type="button" class="copy-button">Copy text</button><span class="copy-status" role="status"></span></details></section>`
}).join('')
const fields = ['Business / project','Audience','Existing offer: scope, price, exclusions and destination','This week’s goal','Audience problem','Channel and length','Voice examples you own','Evidence: title, source, date and permission','Allowed claims','Claims to avoid','Time available this week','Approval owner','Private information to exclude','Success check']
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark"><title>FrankX Agent Team · working guide</title><style>
:root{color-scheme:dark;--bg:#0a0a0b;--panel:#141719;--text:#eef1ee;--muted:#b0bcb7;--line:#303a35;--accent:#6ee7b7}*{box-sizing:border-box}html{scroll-behavior:auto}body{margin:0;background:var(--bg);color:var(--text);font:17px/1.7 system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}a{color:var(--accent);text-underline-offset:4px}a:hover{color:white}a:focus-visible,button:focus-visible,summary:focus-visible,textarea:focus-visible{outline:3px solid var(--accent);outline-offset:4px}header{border-bottom:1px solid var(--line);padding:24px 6vw;display:flex;justify-content:space-between;gap:24px;align-items:center}.brand{font-weight:750;letter-spacing:-1px;font-size:24px}.version{color:var(--muted);font-size:13px}.hero{max-width:1120px;margin:auto;padding:76px 28px 60px}.eyebrow,.section-label{color:var(--accent);font:12px/1.5 ui-monospace,monospace;letter-spacing:.13em;text-transform:uppercase}h1,h2,h3{line-height:1.16;letter-spacing:-.035em}h1{font-size:clamp(38px,6vw,76px);max-width:900px;margin:20px 0 28px}h2{font-size:30px;margin-top:36px}h3{font-size:22px;margin-top:30px}.hero p{max-width:700px;font-size:21px;color:var(--muted)}.button,button{display:inline-block;cursor:pointer;background:var(--accent);color:#082219;border:0;border-radius:999px;padding:12px 22px;text-decoration:none;font:650 16px system-ui}.note{padding:20px 24px;border-left:3px solid var(--accent);background:var(--panel);margin:30px 0;color:var(--muted)}.layout{max-width:1220px;margin:auto;display:grid;grid-template-columns:230px minmax(0,1fr);gap:52px;padding:0 28px 80px}nav{align-self:start;position:sticky;top:20px;max-height:94vh;overflow:auto}nav a{display:block;padding:7px 0;font-size:14px;text-decoration:none}nav summary{font-weight:700;margin-bottom:12px;cursor:pointer}.content{min-width:0}section{padding:44px 0;border-top:1px solid var(--line);scroll-margin-top:24px}section h1{font-size:36px;margin:22px 0}section:first-child{padding-top:24px}p,li{overflow-wrap:anywhere}li{margin:8px 0}table{width:100%;border-collapse:collapse;font-size:14px;display:block;overflow-x:auto}th,td{padding:12px;text-align:left;border-bottom:1px solid var(--line);vertical-align:top}th{color:var(--accent)}pre{white-space:pre-wrap;overflow-wrap:anywhere}code{font-size:.88em;color:var(--accent)}textarea{width:100%;min-height:110px;padding:12px;border:1px solid #53665b;border-radius:8px;background:#101412;color:var(--text);font:15px/1.6 system-ui;resize:vertical}.copy{border:1px solid var(--line);padding:16px;border-radius:12px;margin:24px 0}.copy summary{cursor:pointer}.copy textarea{margin:16px 0;min-height:220px;font-family:ui-monospace,monospace}.copy-status{display:block;color:var(--accent);font-size:14px}label{display:block;font-weight:600;margin:22px 0 6px}.form-note{color:var(--muted);font-size:14px}.form-actions{display:flex;flex-wrap:wrap;gap:12px;margin:20px 0}.secondary{background:transparent;color:var(--accent);border:1px solid var(--line)}footer{border-top:1px solid var(--line);padding:30px;text-align:center;font-size:14px;color:var(--muted)}.skip{position:absolute;left:-9999px}.skip:focus{left:20px;top:10px;background:var(--panel);padding:10px;z-index:2}@media(max-width:760px){header{padding:18px 22px;align-items:start}.version{max-width:140px;text-align:right}.hero{padding:44px 22px 32px}.hero p{font-size:18px}.layout{display:block;padding:0 22px 50px}nav{position:static;max-height:none;border-top:1px solid var(--line);padding:20px 0}nav a{padding:9px 0}section h1{font-size:30px}section{padding:34px 0}table{font-size:13px}.button{width:100%;text-align:center}}@media print{body{background:white;color:black;font-size:11pt}header,nav,.copy,.form-actions,.hero .button{display:none}.layout{display:block;padding:0}.hero{padding:0}.hero h1{font-size:30pt}section{break-inside:auto}a,code,.section-label{color:#175b40}.note{background:#eee;color:black}textarea{color:black;background:white}.version{color:black}}
</style></head><body><a class="skip" href="#context">Skip to your brief</a><header><span class="brand">FrankX</span><span class="version">Agent Team<br>0.1.0-beta.1 · evaluation copy</span></header><div class="hero"><div class="eyebrow">A working guide for founders and creators</div><h1>Give your next post<br>a brief worth following.</h1><p>Define the work. Inspect the evidence. Draft the offer. Use five roles to carry one piece of work from your context to a decision you can stand behind.</p><a class="button" href="#context">Build your first brief</a><div class="note">You direct every stage in your own AI account. Nothing runs in the background. This candidate has not passed human usability testing; the setup video and paid delivery are pending.</div></div><div class="layout"><nav aria-label="Guide contents"><details open><summary>In this guide</summary><a href="#context">Your business context</a>${docs.map(([id,label])=>`<a href="#${id}">${label}</a>`).join('')}</details></nav><main class="content"><section id="context"><div class="section-label">Your first input</div><h2>Make the context portable.</h2><p>Use an existing offer and one real audience problem. Unknowns are useful: leave them visible for the Director.</p><p class="form-note">This form runs entirely on your device. It does not store or send your text. Export before closing the page. Paste only information you are permitted to share with your AI provider.</p><form id="context-form">${fields.map((f,i)=>`<label for="field-${i}">${escape(f)}</label><textarea id="field-${i}" name="${escape(f)}" rows="2"></textarea>`).join('')}<div class="form-actions"><button type="button" id="export-context">Save context as Markdown</button><button type="button" class="secondary" id="show-context">Show text to copy</button></div><p id="context-status" role="status"></p><textarea id="context-output" aria-label="Business context export" readonly hidden></textarea></form></section>${sections}</main></div><footer>Keep the source files. Keep your judgment. · FrankX Agent Team · Evaluation candidate</footer><script>
function contextText(){const form=document.getElementById('context-form');return '# Business context · v1\\n\\n'+Array.from(form.querySelectorAll('textarea[name]')).map(el=>el.name+': '+(el.value.trim()||'Unknown')).join('\\n\\n')+'\\n';}
function saveText(text,name){const blob=new Blob([text],{type:'text/markdown;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
document.getElementById('export-context').addEventListener('click',()=>{saveText(contextText(),'business-context.md');document.getElementById('context-status').textContent='Download requested. Check your downloads, then open the Markdown file to verify it.';});
document.getElementById('show-context').addEventListener('click',()=>{const el=document.getElementById('context-output');el.hidden=false;el.value=contextText();el.focus();el.select();document.getElementById('context-status').textContent='Context is selected. Copy it into your own text file or chat.';});
document.querySelectorAll('.copy-button').forEach(button=>button.addEventListener('click',async()=>{const box=button.closest('.copy');const field=box.querySelector('textarea');const status=box.querySelector('.copy-status');try{await navigator.clipboard.writeText(field.value);status.textContent='Copied. Paste into your own chat when ready.';}catch{field.focus();field.select();status.textContent='Text selected. Use your device’s Copy command.';}}));
</script></body></html>`
writeFileSync(join(dest,'START-HERE.html'), html)
files.push('START-HERE.html')
const sums = files.sort().map(name => `${createHash('sha256').update(readFileSync(join(dest,name))).digest('hex')}  ${name}`).join('\n')+'\n'
writeFileSync(join(dest,'SHA256SUMS.txt'),sums)
execFileSync('python3',['-c',`import zipfile,pathlib,sys
root=pathlib.Path(sys.argv[1]); output=root.parent/(root.name+'.zip')
with zipfile.ZipFile(output,'w',zipfile.ZIP_DEFLATED) as z:
 for p in sorted(root.rglob('*')):
  if p.is_file():
   info=zipfile.ZipInfo(root.name+'/'+p.relative_to(root).as_posix(),(2026,10,30,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;info.external_attr=0o100644<<16;z.writestr(info,p.read_bytes())
print(output)`,dest],{stdio:'inherit'})
console.log(`Built ${files.length+1} files; source ${source}`)
