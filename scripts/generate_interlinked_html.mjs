import fs from 'fs';
import path from 'path';

// Try to load marked if available; fall back to minimal converter
let marked = null;
try {
  ({ marked } = await import('marked'));
} catch {
  // no-op; we'll use a trivial fallback
}

const ROOT = process.cwd();
const OUTPUT_DIRS = [
  path.join(ROOT, 'reading-site'),
  path.join(ROOT, 'public', 'reading'),
];
const EXCLUDE_DIRS = new Set(['.git', 'node_modules', '.next', 'reading-site', path.join('public','reading')]);
const TEXT_EXTS = new Set(['.md', '.markdown', '.txt', '.html']);

function ensureDirSync(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function walk(dir, list = []) {
  const ents = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of ents) {
    if (ent.name.startsWith('.DS_Store')) continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (EXCLUDE_DIRS.has(ent.name)) continue;
      list = walk(full, list);
    } else if (ent.isFile()) {
      const ext = path.extname(ent.name).toLowerCase();
      if (TEXT_EXTS.has(ext)) list.push(full);
    }
  }
  return list;
}

function htmlEscape(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function titleFromContent(filepath, content, ext) {
  if (ext === '.md' || ext === '.markdown') {
    const m = content.match(/^#\s+(.+)$/m);
    if (m) return m[1].trim();
  }
  if (ext === '.html') {
    const m = content.match(/<title>(.*?)<\/title>/i);
    if (m) return m[1].trim();
  }
  // fallback to filename without extension
  return path.basename(filepath, ext).replace(/[_-]+/g, ' ');
}

let overrides = null;
try {
  const raw = fs.readFileSync(path.join(ROOT, 'scripts', 'llm_attribution_overrides.json'), 'utf8');
  overrides = JSON.parse(raw);
} catch {}

function getAttribution(filepath, mtime, birthtime) {
  // Default to Unknown; attribute our newly created modernized files
  let llm = 'Unknown';
  if (filepath.includes(path.join('GoldenAge-Modernized', path.sep)) || filepath.includes('GoldenAge-Modernized/')) {
    llm = 'OpenAI Assistant (Codex CLI)';
  }
  const stamp = birthtime && !Number.isNaN(new Date(birthtime).getTime()) ? birthtime : mtime;
  const date = new Date(stamp).toISOString().slice(0, 10);
  let res = { llm, date };
  if (overrides && typeof overrides === 'object') {
    for (const [prefix, info] of Object.entries(overrides)) {
      if (filepath.replace(/\\/g,'/').startsWith(prefix)) {
        if (typeof info === 'string') {
          res.llm = info;
        } else if (info && typeof info === 'object') {
          if (info.llm) res.llm = info.llm;
          if (info.date) res.date = info.date;
        }
      }
    }
  }
  return res;
}

function baseTemplate({ title, body, breadcrumbs, allLinks, attribution, relPath }) {
  const navList = allLinks
    .map((l) => `<li><a href="${l.href}">${htmlEscape(l.text)}</a></li>`) 
    .join('\n');
  const crumb = breadcrumbs.map((b, i) => {
    if (i === breadcrumbs.length - 1) return `<span>${htmlEscape(b.text)}</span>`;
    return `<a href="${b.href}">${htmlEscape(b.text)}</a>`;
  }).join(' / ');
  const rel = relPath.replace(/\\/g,'/');
  const parts = rel.split('/');
  const ups = Math.max(parts.length - 1, 0);
  const indexHref = (ups > 0 ? '../'.repeat(ups) : '') + 'index.html';

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="generator" content="codex-cli" />
  <meta name="llm" content="${attribution.llm}" />
  <meta name="date" content="${attribution.date}" />
  <title>${htmlEscape(title)}</title>
  <style>
    :root { --bg:#0b0d10; --fg:#e8eef5; --muted:#9bb0c6; --card:#12161b; --accent:#64b5f6; }
    body { margin:0; font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; background:var(--bg); color:var(--fg); }
    header { background:var(--card); border-bottom:1px solid #1f2630; padding:16px 20px; position:sticky; top:0; z-index:5; }
    header .title { font-size: 20px; font-weight:600; }
    header .meta { color:var(--muted); font-size:13px; margin-top:4px; }
    main { display:flex; gap:24px; padding:20px; }
    nav { width: 320px; max-height: calc(100vh - 120px); overflow:auto; position:sticky; top:84px; background:var(--card); border:1px solid #1f2630; border-radius:8px; padding:12px 16px; }
    nav h2 { font-size:14px; margin:6px 0 8px 0; color: var(--muted); font-weight:600; }
    nav ul { list-style:none; padding-left:0; margin:0; }
    nav li { margin:6px 0; }
    nav a { color: var(--fg); text-decoration: none; }
    nav a:hover { color: var(--accent); }
    .content { flex:1; max-width: 1000px; background: var(--card); border:1px solid #1f2630; border-radius:8px; padding:24px; }
    .breadcrumbs { font-size:12px; color: var(--muted); margin-bottom:8px; }
    .breadcrumbs a { color: var(--muted); text-decoration: none; }
    .breadcrumbs a:hover { color: var(--accent); }
    .attribution { font-size: 12px; color: var(--muted); margin-bottom: 16px; padding:8px 10px; background:#0f1318; border:1px solid #1f2630; border-radius:6px; }
    .content h1, .content h2, .content h3 { scroll-margin-top: 90px; }
    pre { background:#0f1318; padding:12px; border-radius:6px; overflow:auto; border:1px solid #1f2630; }
    code { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace; }
    table { border-collapse: collapse; width:100%; }
    th, td { border:1px solid #1f2630; padding:8px; }
    a { color: var(--accent); }
    footer { color: var(--muted); font-size: 12px; margin-top: 40px; }
  </style>
  <link rel="canonical" href="${relPath.replace(/\\/g,'/')}" />
  <script>
    // basic keyboard navigation: press 'i' to go to index
    addEventListener('keydown', (e) => { if (e.key === 'i') location.href = '../index.html'; });
  </script>
  </head>
<body>
  <header>
    <div class="title">${htmlEscape(title)}</div>
    <div class="meta">LLM: ${htmlEscape(attribution.llm)} • Date: ${htmlEscape(attribution.date)} • <a href="${indexHref}">All Pages</a></div>
  </header>
  <main>
    <nav>
      <h2>All Pages</h2>
      <ul>${navList}</ul>
    </nav>
    <div class="content">
      <div class="breadcrumbs">${crumb}</div>
      <div class="attribution">Attribution — LLM: <strong>${htmlEscape(attribution.llm)}</strong> | Date: <strong>${htmlEscape(attribution.date)}</strong></div>
      ${body}
      <footer>Generated by a local script. Attribution defaults to "Unknown" unless the file was created in <code>GoldenAge-Modernized/</code>.</footer>
    </div>
  </main>
</body>
</html>`;
}

function mdToHtml(md) {
  if (marked) {
    return marked.parse(md);
  }
  // Minimal fallback
  const escaped = htmlEscape(md);
  return `<pre>${escaped}</pre>`;
}

function wrapExistingHtml(html, attribution, title, breadcrumbs, allLinks, relPath) {
  // Try to inject after <body>
  const rel = relPath.replace(/\\/g,'/');
  const parts = rel.split('/');
  const ups = Math.max(parts.length - 1, 0);
  const indexHref = (ups > 0 ? '../'.repeat(ups) : '') + 'index.html';
  const infoBar = `<div class="attribution" style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; font-size:12px; color:#9bb0c6; margin:12px 0; padding:8px 10px; background:#0f1318; border:1px solid #1f2630; border-radius:6px;">LLM: <strong>${attribution.llm}</strong> | Date: <strong>${attribution.date}</strong> • <a href="${indexHref}" style="color:#64b5f6; text-decoration:none;">All Pages</a></div>`;
  if (/<body[^>]*>/i.test(html)) {
    return html.replace(/<body([^>]*)>/i, (m, attrs) => `<body$1>${infoBar}`);
  }
  // Otherwise embed into our base template
  return baseTemplate({
    title,
    body: html,
    breadcrumbs,
    allLinks,
    attribution,
    relPath,
  });
}

function breadcrumbsFor(rel) {
  const parts = rel.split(path.sep);
  const crumbs = [];
  let acc = '';
  for (let i = 0; i < parts.length - 1; i++) {
    acc = path.join(acc, parts[i]);
    crumbs.push({ text: parts[i], href: `${'../'.repeat(parts.length - i - 2)}index.html#${encodeURIComponent(acc.replace(/\\/g,'/'))}` });
  }
  crumbs.push({ text: path.basename(rel), href: path.basename(rel) });
  return crumbs;
}

function relativeOutputPath(file) {
  return path.relative(ROOT, file).replace(/\\/g, '/');
}

function outPathFor(file) {
  const rel = relativeOutputPath(file);
  const ext = path.extname(file).toLowerCase();
  const base = rel.slice(0, -ext.length) + '.html';
  return OUTPUT_DIRS.map(dir => path.join(dir, base));
}

// Collect files
const files = walk(ROOT).sort((a, b) => a.localeCompare(b));

// Build link list relative to each output root
const allLinksRoot = files.map((f) => {
  const rel = relativeOutputPath(f);
  const ext = path.extname(f).toLowerCase();
  const raw = fs.readFileSync(f, 'utf8');
  const title = titleFromContent(f, raw, ext);
  const outs = outPathFor(f);
  const outRels = outs.map((out, i) => path.relative(OUTPUT_DIRS[i], out).replace(/\\/g, '/'));
  return { outRels, text: title, src: rel };
});

// Write each page
for (const file of files) {
  const rel = relativeOutputPath(file);
  const ext = path.extname(file).toLowerCase();
  const content = fs.readFileSync(file, 'utf8');
  const stat = fs.statSync(file);
  const attribution = getAttribution(rel, stat.mtime, stat.birthtime);
  const title = titleFromContent(file, content, ext);
  const outs = outPathFor(file);
  for (let i = 0; i < outs.length; i++) {
    const out = outs[i];
    ensureDirSync(path.dirname(out));

    const crumbs = breadcrumbsFor(rel);
    const currentOutRel = path.relative(OUTPUT_DIRS[i], out).replace(/\\/g, '/');
    const linksForThis = allLinksRoot.map((l) => ({
      href: path.relative(path.join(OUTPUT_DIRS[i], path.dirname(currentOutRel)), path.join(OUTPUT_DIRS[i], l.outRels[i])).replace(/\\/g, '/'),
      text: l.text,
    }));

    let htmlBody;
    if (ext === '.md' || ext === '.markdown') {
      htmlBody = mdToHtml(content);
      const full = baseTemplate({ title, body: htmlBody, breadcrumbs: crumbs, allLinks: linksForThis, attribution, relPath: rel });
      fs.writeFileSync(out, full, 'utf8');
    } else if (ext === '.txt') {
      htmlBody = `<pre>${htmlEscape(content)}</pre>`;
      const full = baseTemplate({ title, body: htmlBody, breadcrumbs: crumbs, allLinks: linksForThis, attribution, relPath: rel });
      fs.writeFileSync(out, full, 'utf8');
    } else if (ext === '.html') {
      const wrapped = wrapExistingHtml(content, attribution, title, crumbs, linksForThis, rel);
      fs.writeFileSync(out, wrapped, 'utf8');
    }
  }
}

// Build index page
const byDir = new Map();
for (const link of allLinksRoot) {
  const dir = path.dirname(link.src);
  if (!byDir.has(dir)) byDir.set(dir, []);
  byDir.get(dir).push(link);
}

for (let i = 0; i < OUTPUT_DIRS.length; i++) {
  let indexBody = '<h1>Reading Index</h1><p>All text files converted or wrapped as HTML. Press \\u0069 on any page to return here.</p>';
  for (const [dir, links] of Array.from(byDir.entries()).sort((a,b)=>a[0].localeCompare(b[0]))) {
    indexBody += `<h2 id=\"${encodeURIComponent(dir.replace(/\\\\/g,'/'))}\">${htmlEscape(dir || './')}</h2><ul>`;
    for (const l of links) {
      indexBody += `<li><a href=\"${l.outRels[i]}\">${htmlEscape(l.text)}</a></li>`;
    }
    indexBody += '</ul>';
  }

  ensureDirSync(OUTPUT_DIRS[i]);
  const indexHtml = baseTemplate({
    title: 'Reading Index',
    body: indexBody,
    breadcrumbs: [{ text: 'Index', href: 'index.html' }],
    allLinks: allLinksRoot.map((l) => ({ href: l.outRels[i], text: l.text })),
    attribution: { llm: 'OpenAI Assistant (Codex CLI)', date: new Date().toISOString().slice(0,10) },
    relPath: 'index.html',
  });
  fs.writeFileSync(path.join(OUTPUT_DIRS[i], 'index.html'), indexHtml, 'utf8');
}

console.log(`Generated HTML site at: ${OUTPUT_DIRS.join(', ')}`);
