"""Upgrade the existing private review artifact; never copy its binaries into Git."""
from pathlib import Path
import json, re, sys, base64, hashlib

root=Path(__file__).resolve().parents[2]
target=Path(sys.argv[1])
doc=target.read_text()
if 'id="placement-context"' in doc:
    raise SystemExit('This picker already contains placement controls; recover its current source before editing.')
catalog=json.loads((root/'data/media/companion-collection.v2.json').read_text())
rows=json.loads(re.search(r'<script id="assets" type="application/json">(.*?)</script>',doc,re.S).group(1))
for a in rows:
    known=next(x for x in catalog['assets'] if x['asset_id']==a['asset_id'])
    assert a['version_id']==known['version_id']
    assert hashlib.sha256(base64.b64decode(a['src'].split(',',1)[1])).hexdigest()==known['web']['sha256']

controls='''<section id="placement-context" class="placement-context" aria-labelledby="placement-heading"><h2 id="placement-heading">Give the selection a purpose.</h2><p>Choose the destination, then export a placement brief with exact asset versions and image checksums.</p><div class="placement-fields"><label>Brand<select id="placement-brand"></select></label><label>Surface<select id="placement-surface"></select></label><label>Page or story<input id="placement-target" maxlength="240" placeholder="e.g. Library introduction"></label></div><button type="button" id="placement-import" class="button">Import brief</button><input type="file" id="placement-input" accept=".json,application/json" hidden><p id="placement-status" role="status"></p><p id="placement-storage-status" role="status"></p><p class="meta">A brief proposes a placement. Publication and character identity remain separate decisions.</p></section>'''
assert '<div class="tools">' in doc
doc=doc.replace('<div class="tools">',controls+'<div class="tools">',1)
css='''.placement-context{border-block:1px solid var(--line);padding:25px 0;margin:30px 0}.placement-context p{color:var(--muted);max-width:900px}.placement-fields{display:grid;grid-template-columns:1fr 1fr 2fr;gap:16px;margin:20px 0}.placement-fields label{display:flex;flex-direction:column;gap:7px;font-size:14px;color:var(--muted)}.placement-fields :is(input,select){width:100%;background:var(--panel);color:var(--text);border:1px solid var(--line);min-height:46px;border-radius:8px;padding:10px 13px;font:inherit}.placement-context button{cursor:pointer}.placement-fields select:focus-visible{outline:3px solid var(--accent);outline-offset:4px}.tools button:disabled{opacity:.5;cursor:default}dialog:modal{overscroll-behavior:contain}dialog::backdrop{overflow:hidden;overscroll-behavior:contain}@media(max-width:620px){.placement-fields{grid-template-columns:1fr}.placement-context button{width:100%}}'''
doc=doc.replace('</style>',css+'</style>',1)
old="function persist(){try{localStorage.setItem('fx-companions-shortlist-v2',JSON.stringify([...selected]));}catch(e){}}"
new="function persist(){try{localStorage.setItem('fx-companions-shortlist-v2',JSON.stringify([...selected]));}catch(e){const warning=document.querySelector('#placement-storage-status');if(warning)warning.textContent='Browser storage is unavailable. Export your brief to keep a copy.';}}"
assert old in doc;doc=doc.replace(old,new,1)
old="function shortlist(a,button){if(selected.has(a.asset_id))selected.delete(a.asset_id);else selected.add(a.asset_id);persist();render();}"
new="function shortlist(a,button){const keepFocus=document.activeElement===button;if(selected.has(a.asset_id))selected.delete(a.asset_id);else selected.add(a.asset_id);persist();render();if(keepFocus){const next=Array.from(document.querySelectorAll('.save')).find(b=>b.getAttribute('aria-label')==='Shortlist '+a.title);(next||document.querySelector('#shortlist-view')).focus();}}"
assert old in doc;doc=doc.replace(old,new,1)
old="document.querySelector('#shortlist-view').setAttribute('aria-pressed',String(shortlisted));"
assert old in doc;doc=doc.replace(old,old+"document.querySelector('#export').disabled=selected.size===0;",1)
module=re.sub(r'^export ', '', (root/'lib/media/companion-selection.mjs').read_text(), flags=re.M)
runtime='''
const catalog=JSON.parse(document.querySelector('#placement-catalog').textContent);
const brand=document.querySelector('#placement-brand'),surface=document.querySelector('#placement-surface'),target=document.querySelector('#placement-target'),status=document.querySelector('#placement-status'),storage=document.querySelector('#placement-storage-status');
for(const [select,values] of [[brand,BRANDS],[surface,SURFACES]])for(const value of values){const option=document.createElement('option');option.value=value;option.textContent=value;select.append(option);}
let savedContext={brand:'FrankX',surface:'Editorial',target:''};
try{const raw=JSON.parse(localStorage.getItem('fx-companion-placement-context-v1')||'null');if(raw)savedContext=context(raw);}catch(e){}
brand.value=savedContext.brand;surface.value=savedContext.surface;target.value=savedContext.target;
function saveContext(){try{localStorage.setItem('fx-companion-placement-context-v1',JSON.stringify({brand:brand.value,surface:surface.value,target:target.value}));}catch(e){storage.textContent='Browser storage is unavailable. Export your brief to keep a copy.';}}
for(const field of [brand,surface,target])field.addEventListener('change',saveContext);
document.querySelector('#export').textContent='Export placement brief';document.querySelector('#export').disabled=selected.size===0;
document.querySelector('#export').onclick=()=>{if(!selected.size){status.textContent='Select at least one asset.';return;}const input={collection_id:COLLECTION_ID,brand:brand.value,surface:surface.value,target:target.value,assets:catalog.assets.filter(a=>selected.has(a.asset_id)).map(a=>({asset_id:a.asset_id,version_id:a.version_id,web_sha256:a.web.sha256}))};downloadJSON(exportPlacementBrief(input,catalog),'FrankX-companion-placement-brief.json');status.textContent='Placement brief exported. The artwork remains in review.';};
const fileInput=document.querySelector('#placement-input');document.querySelector('#placement-import').onclick=()=>fileInput.click();
fileInput.addEventListener('change',async e=>{const file=e.target.files?.[0];e.target.value='';if(!file)return;try{if(file.size>128*1024)throw new Error('Choose a small exported placement brief.');const restored=importSelection(JSON.parse(await file.text()),catalog);selected=new Set(restored.assets.map(a=>a.asset_id));brand.value=restored.brand;surface.value=restored.surface;target.value=restored.target;persist();saveContext();render();status.textContent='Placement brief restored. No publication approval was imported.';}catch(cause){status.textContent=cause instanceof Error?cause.message:'The brief could not be restored.';}});
'''
extra='<script id="placement-catalog" type="application/json">'+json.dumps(catalog).replace('<','\\u003c')+'</script><script>(()=>{\n'+module+'\n'+runtime+'\n})();</script>'
doc=doc.replace('</body>',extra+'</body>',1)
target.write_text(doc)
print(json.dumps({'file':str(target),'assets':len(rows),'bytes':len(doc.encode()),'embedded_image_checksums':'unchanged','placement_context':True,'shortlist_roundtrip':True,'browser_runtime':'not verified by this builder'}))
