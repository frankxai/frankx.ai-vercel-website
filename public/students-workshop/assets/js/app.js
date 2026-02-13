/* Students in the Age of Intelligence — Workshop App
   Privacy-first (localStorage only). Export/Import supported. */

(function(){
  const SCOPE = 'workshop.v1.'; // keep v1 so data persists across versions
  const qs = (s, r=document) => r.querySelector(s);
  const qsa = (s, r=document) => Array.from(r.querySelectorAll(s));

  // Save status feedback
  const saveStatus = qs('#saveStatus');
  let saveTimeout = null;
  function flashSaved(txt='Saved'){
    clearTimeout(saveTimeout);
    if(saveStatus) saveStatus.textContent = txt + ' · Local';
    saveTimeout = setTimeout(()=>{ if(saveStatus) saveStatus.textContent = 'Local autosave enabled.'; }, 1500);
  }

  // Theme
  function initTheme(){
    const body = document.body;
    const btn = qs('#themeToggle');
    const saved = localStorage.getItem('workshop.theme');
    if(saved === 'light'){ body.classList.add('light'); btn?.setAttribute('aria-pressed','true'); }
    btn?.addEventListener('click', () => {
      const isLight = body.classList.toggle('light');
      localStorage.setItem('workshop.theme', isLight ? 'light' : 'dark');
      btn.setAttribute('aria-pressed', isLight ? 'true' : 'false');
    });
  }

  // Autosize textareas
  function autoSize(el){
    if(!el) return;
    el.style.height = 'auto';
    el.style.height = (el.scrollHeight + 2) + 'px';
  }

  // Storage helpers
  function getFields(){ return qsa('[data-store]'); }
  function keyFor(el){ return SCOPE + el.getAttribute('data-store'); }
  function setValue(storeKey, val){
    const el = qs(`[data-store="${storeKey}"]`);
    if(!el) return;
    if(typeof el.value !== 'undefined'){ el.value = val; autoSize(el); }
    localStorage.setItem(SCOPE + storeKey, val ?? '');
  }
  function getValue(storeKey){
    return localStorage.getItem(SCOPE + storeKey) || '';
  }
  function loadAll(){
    getFields().forEach(f => {
      const key = keyFor(f);
      const val = localStorage.getItem(key);
      if(val !== null){
        f.value = val;
      }
      if(f.tagName === 'TEXTAREA') autoSize(f);
    });
  }
  function saveAll(){
    getFields().forEach(f => {
      const key = keyFor(f);
      const val = f.value ?? '';
      localStorage.setItem(key, val);
    });
    flashSaved('Saved');
  }
  function clearAll(){
    Object.keys(localStorage).forEach(k => { if(k.startsWith(SCOPE)) localStorage.removeItem(k); });
    loadAll();
    flashSaved('Cleared');
  }

  // Prompt copy
  async function copyToClipboard(text, btn){
    try{
      await navigator.clipboard.writeText(text);
      if(btn){ const old = btn.textContent; btn.textContent = 'Copied'; setTimeout(()=> btn.textContent = old, 1100); }
    }catch(e){
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
  }

  function copyAllPromptsInSection(button){
    const section = button.closest('section');
    if(!section) return;
    const texts = qsa('.prompt-text', section).map(ta => ta.value.trim()).filter(Boolean);
    if(texts.length === 0) return;
    copyToClipboard(texts.join('\n\n---\n\n'), button);
  }

  // Exporters
  function buildMarkdown(){
    const L = [];
    const push = (s='') => L.push(s);

    push('# Students in the Age of Intelligence — Personal Plan');
    push('');
    // Front matter for easier sharing/reference
    push('---');
    push(`name: ${getValue('profile.name')}`);
    push(`program: ${getValue('profile.program')}`);
    push(`exported: ${new Date().toISOString()}`);
    push('---');
    push('');

    // Ikigai
    push('---'); push('## Ikigai'); push('');
    push('### What I love'); push(getValue('ikigai.love')); push('');
    push("### What I'm good at"); push(getValue('ikigai.good')); push('');
    push('### What pays'); push(getValue('ikigai.pays')); push('');
    push('### What the world needs'); push(getValue('ikigai.needs')); push('');
    push('### Ikigai statement'); push(getValue('ikigai.statement')); push('');

    // Analysis
    push('---'); push('## Personality & Interest Analysis (redacted source)');
    push(getValue('analysis.source')); push('');

    // Roles
    push('---'); push('## Role & Company Navigator');
    push('### Target role tracks'); push(getValue('roles.tracks')); push('');
    push('### Target companies'); push(getValue('roles.companies')); push('');

    // Plan
    push('---'); push('## 30/60/90 Plan');
    push('### 30 Days');
    push('- Learn'); push(getValue('plan.30.learn'));
    push('- Build'); push(getValue('plan.30.build'));
    push('- Publish'); push(getValue('plan.30.publish'));
    push('- Network'); push(getValue('plan.30.network')); push('');
    push('### 60 Days');
    push('- Learn'); push(getValue('plan.60.learn'));
    push('- Build'); push(getValue('plan.60.build'));
    push('- Publish'); push(getValue('plan.60.publish'));
    push('- Network'); push(getValue('plan.60.network')); push('');
    push('### 90 Days');
    push('- Learn'); push(getValue('plan.90.learn'));
    push('- Build'); push(getValue('plan.90.build'));
    push('- Publish'); push(getValue('plan.90.publish'));
    push('- Network'); push(getValue('plan.90.network')); push('');

    // Portfolio
    push('---'); push('## Portfolio');
    push('### Selected project ideas'); push(getValue('portfolio.ideas')); push('');
    push('### Project spec'); push(getValue('portfolio.spec')); push('');

    // Social
    push('---'); push('## Social Positioning');
    push('### Headline'); push(getValue('social.headline')); push('');
    push('### Bio'); push(getValue('social.bio')); push('');
    push('### Topic pillars'); push(getValue('social.pillars')); push('');
    push('### Content calendar'); push(getValue('social.calendar')); push('');
    push('### Elevator pitch'); push(getValue('social.pitch')); push('');
    push('### Cold outreach'); push(getValue('social.outreach')); push('');

    // Agent
    push('---'); push('## Custom GPT / Agent');
    push(getValue('agent.spec')); push('');

    push('---');
    push('_Generated with the Students in the Age of Intelligence workshop. Your data remains local by default._');

    return L.join('\n');
  }

  function exportFile(filename, content, type){
    const blob = new Blob([content], {type});
    const a = document.createElement('a');
    const ts = new Date().toISOString().slice(0,19).replace(/[:T]/g,'-');
    a.href = URL.createObjectURL(blob);
    a.download = `${filename}-${ts}${type.includes('markdown') ? '.md' : type.includes('json') ? '.json' : ''}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function exportMarkdown(){
    const md = buildMarkdown();
    exportFile('age-of-intelligence-plan', md, 'text/markdown;charset=utf-8');
  }

  function exportJSON(){
    const data = {};
    getFields().forEach(f => {
      const store = f.getAttribute('data-store');
      data[store] = f.value ?? '';
    });
    data._meta = { version: 1, exportedAt: new Date().toISOString() };
    exportFile('age-of-intelligence-plan', JSON.stringify(data, null, 2), 'application/json;charset=utf-8');
  }

  function importJSON(file){
    const reader = new FileReader();
    reader.onload = () => {
      try{
        const data = JSON.parse(reader.result);
        Object.keys(data).forEach(k => {
          if(k.startsWith('_')) return;
          if(qs(`[data-store="${k}"]`)){
            setValue(k, data[k]);
          }
        });
        flashSaved('Imported');
      }catch(e){
        alert('Invalid JSON file.');
      }
    };
    reader.readAsText(file);
  }

  // Prefill examples
  function prefillIkigai(){
    setValue('ikigai.love', 'Explaining complex ideas clearly; building tools that help students learn; rapid prototyping with AI.');
    setValue('ikigai.good', 'Technical writing, prompt design, TypeScript/Python basics, running small user tests, turning feedback into iterations.');
    setValue('ikigai.pays', 'AI education tools, knowledge assistants, internal enablement, workflow automation for teams.');
    setValue('ikigai.needs', 'Students and early-career builders who need guidance and leverage; teams that need faster docs and prototypes.');
    setValue('ikigai.statement', 'I help students and early-career builders learn faster and show outcomes by creating simple AI tools, clear prompts, and evaluated demos that map to real roles.');
  }

  function prefillRoles(){
    setValue('roles.tracks',
`- AI Product (education/enablement)
- AI/LLM Engineer (RAG + evaluation)
- Non-AI role using AI: Marketing Ops (automation + analytics)`);

    setValue('roles.companies',
`Hyperscalers: Microsoft (Azure AI), Google (Vertex AI)
AI Labs: OpenAI, Anthropic
Tooling: Hugging Face, LangChain, LlamaIndex, W&B
Startups: Replit, Perplexity, ElevenLabs
Domain leaders: Duolingo (EdTech), Khan Academy, Coursera (Learning)
Why fit: education focus, strong content+AI intersection, clear user outcomes.`);
  }

  function prefillPlan(){
    setValue('plan.30.learn',
`- DeepLearning.AI short courses (Prompt Engineering, RAG)
- LangChain / LlamaIndex docs tour
- Google Technical Writing (Part 1)`);
    setValue('plan.30.build',
`- Mini RAG on course notes with a 5-question eval
- Write a 1-pager (BLUF) on problem + scope + eval`);
    setValue('plan.30.publish', '- Post: What I learned building a tiny RAG (with eval results)');
    setValue('plan.30.network', '- 3 messages to EdTech/AI builders with a specific question');

    setValue('plan.60.learn',
`- fast.ai intro lectures
- Evals course (DL.ai)
- Case study writing examples`);
    setValue('plan.60.build',
`- Core project: Domain Chat with evals & guardrails
- Instrument basic quality/speed/cost metrics`);
    setValue('plan.60.publish', '- Case study v1 with metrics and a short demo video');
    setValue('plan.60.network', '- 1 coffee chat/week with feedback requests');

    setValue('plan.90.learn', '- Observability and guardrails patterns\n- System Design Primer (selected)');
    setValue('plan.90.build',
`- Advanced: add retrieval improvements or a tool call
- Add a simple monitor + error handling`);
    setValue('plan.90.publish', '- 5-min demo talk or livestream');
    setValue('plan.90.network', '- Targeted applications with wedge ideas per company');
  }

  function prefillPortfolio(){
    setValue('portfolio.ideas',
`- AI Study Buddy (RAG on course notes) — beginner
- Domain Chat with Evals & Guardrails — intermediate
- Multi-tool Agent with Planner + Monitor — advanced`);
    setValue('portfolio.spec',
`Study Buddy (Course Notes)
One-liner: Answer study questions from my own notes with citations.
User story: As a student, I want quick, trustworthy answers from my notes.
Core features: upload notes, ask questions, citations, simple eval set.
Dataset/API: local notes, OpenAI/Anthropic model.
Evaluation approach: 10-question set, accuracy & helpfulness rubric.
Extensibility idea: spaced repetition deck from answers.`);
  }

  function prefillAll(){
    prefillIkigai(); prefillRoles(); prefillPlan(); prefillPortfolio();
  }

  function applyIndustryPreset(val){
    if(!val) return;
    const presets = {
      health: `Hyperscalers: Microsoft, Google, AWS
AI Labs: OpenAI, Anthropic
Tooling: Hugging Face, Databricks
Startups: Tempus, Hippocratic AI
Domain leaders: Mayo Clinic Platform, Roche
Wedge: build a HIPAA-aware RAG demo with guardrails and evals.`,
      fintech: `Hyperscalers: Microsoft, AWS
AI Labs: Anthropic, Cohere
Tooling: Snowflake, Databricks
Startups: Stripe, Brex, Unit
Domain leaders: Visa, Mastercard
Wedge: demo transaction support chatbot with risk flags & audit logs.`,
      media: `Hyperscalers: Google, AWS
AI Labs: OpenAI
Tooling: ElevenLabs, Runway
Startups: Perplexity, Canva
Domain leaders: NYT, Netflix
Wedge: research assistant with source tracking and style guardrails.`,
      education: `Hyperscalers: Google, Microsoft
AI Labs: OpenAI
Tooling: LangChain, LlamaIndex
Startups: Duolingo, Khan Academy, Coursera
Domain leaders: Pearson
Wedge: formative feedback assistant with evaluation rubric.`,
      automotive: `Hyperscalers: AWS, Microsoft
AI Labs: OpenAI
Tooling: NVIDIA, Databricks
Startups: Wayve, Oxbotica
Domain leaders: Tesla, Toyota
Wedge: procedures assistant with safety guardrails and logs.`
    };
    setValue('roles.companies', presets[val] || '');
  }

  // Headline char count
  function initHeadlineCounter(){
    const headline = qs('input[data-store="social.headline"]');
    const counter = qs('#headlineCount');
    if(!headline || !counter) return;
    const update = () => { counter.textContent = `${headline.value.length}/220`; };
    headline.addEventListener('input', update);
    update();
  }

  // Tone preset: hinting only (does not auto-rewrite)
  function initTonePreset(){
    const toneSel = qs('#tone');
    const bio = qs('textarea[data-store="social.bio"]');
    if(!toneSel || !bio) return;
    toneSel.addEventListener('change', () => {
      const tone = toneSel.value;
      if(!tone) return;
      const hint = `\n\n[Note: Aim for a ${tone} tone: word choice and sentence rhythm should reflect it.]`;
      if(!bio.value.includes('[Note: Aim for')) bio.value += hint;
      localStorage.setItem(SCOPE + 'social.bio', bio.value);
      autoSize(bio);
      flashSaved('Saved');
    });
  }
  
  // Print header updater
  function updatePrintHeader() {
    const n = getValue('profile.name');
    const p = getValue('profile.program');
    const nameEl = qs('#phName');
    const progEl = qs('#phProg');
    const dateEl = qs('#phDate');
    if (nameEl) nameEl.textContent = n || '';
    if (progEl) progEl.textContent = p || '';
    if (dateEl) dateEl.textContent = new Date().toLocaleDateString();
  }
  
  // Bindings
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    loadAll();
    updatePrintHeader();
    window.addEventListener('beforeprint', updatePrintHeader);

    // Input persistence
    qsa('textarea').forEach(t => {
      t.addEventListener('input', () => {
        autoSize(t);
        const k = t.getAttribute('data-store');
        if(k){ localStorage.setItem(SCOPE + k, t.value); flashSaved('Saved'); }
      });
    });
    qsa('input[data-store], select[data-store]').forEach(inp => {
      inp.addEventListener('input', () => {
        const k = inp.getAttribute('data-store');
        if(k){
          localStorage.setItem(SCOPE + k, inp.value);
          if (k === 'profile.name' || k === 'profile.program') updatePrintHeader();
          flashSaved('Saved');
        }
      });
    });

    // Save buttons
    const bind = id => { const b = qs('#' + id); if(b) b.addEventListener('click', saveAll); };
    bind('saveBtn'); bind('saveBtn2'); bind('quickSave');

    // Copy single prompt
    qsa('[data-copy]').forEach(btn => {
      btn.addEventListener('click', () => {
        const ta = btn.closest('.prompt')?.querySelector('.prompt-text');
        if(ta) copyToClipboard(ta.value, btn);
      });
    });

    // Copy all prompts per section
    const copyAllIds = [
      'copyAllPromptsIkigai','copyAllPromptsAnalysis','copyAllPromptsRoles',
      'copyAllPromptsPlan','copyAllPromptsPortfolio','copyAllPromptsSocial',
      'copyAllPromptsAgent','copyAllPromptsExport'
    ];
    copyAllIds.forEach(id => {
      const b = qs('#' + id);
      if(b) b.addEventListener('click', () => copyAllPromptsInSection(b));
    });

    // Exporters
    qs('#exportMdBtn')?.addEventListener('click', exportMarkdown);
    qs('#exportJsonBtn')?.addEventListener('click', exportJSON);
    qs('#importJsonInput')?.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if(file) importJSON(file);
      e.target.value = '';
    });

    // Print / Clear
    qs('#printBtn')?.addEventListener('click', () => window.print());
    qs('#clearBtn')?.addEventListener('click', () => {
      if(confirm('Clear all locally stored data for this workshop? This cannot be undone.')) clearAll();
    });

    // Prefill
    qs('#prefillIkigai')?.addEventListener('click', prefillIkigai);
    qs('#prefillRoles')?.addEventListener('click', prefillRoles);
    qs('#prefillPlan')?.addEventListener('click', prefillPlan);
    qs('#prefillPortfolio')?.addEventListener('click', prefillPortfolio);
    qs('#prefillAll')?.addEventListener('click', prefillAll);

    // Industry preset
    qs('#rolePreset')?.addEventListener('change', (e) => applyIndustryPreset(e.target.value));

    // Headline count & tone preset
    initHeadlineCounter();
    initTonePreset();
  });
})();
