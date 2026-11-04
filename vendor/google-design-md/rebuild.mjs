// Local security rebuild by Codex, 2026-11-04, revision 1.
// Upstream: Google LLC, Apache-2.0. No source install/lifecycle scripts run.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, realpathSync, renameSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { basename, dirname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '../..');
const commit = '9bf8eae67128b6cc55ad9bf86665767deb4c11cd';
const archiveSha256 = '926a828729ba10dec46351ce4ae72b614eb443e3a710f58a7235fa091a105e1a';
const output = resolve(process.argv[2] ?? here);
assert.equal(execFileSync('bun', ['--version'], { encoding: 'utf8' }).trim(), '1.3.12');
assert.equal(execFileSync('pnpm', ['--version'], { encoding: 'utf8' }).trim(), '10.28.0');
const work = mkdtempSync(join(tmpdir(), 'frankx-google-design-md-'));
const run = (command, args, cwd) => execFileSync(command, args, { cwd, stdio: 'inherit' });
const json = path => JSON.parse(readFileSync(path, 'utf8'));

// Resolve only packages from the existing frozen root installation, including
// the original CLI's dependencies. No unpinned secondary install is needed.
function packageDir(requireFrom, name) {
  let directory = dirname(requireFrom.resolve(name));
  for (;;) {
    const manifest = join(directory, 'package.json');
    if (existsSync(manifest) && json(manifest).name === name) return directory;
    const parent = dirname(directory);
    assert.notEqual(parent, directory, `Cannot resolve ${name}`);
    directory = parent;
  }
}

try {
  const response = await fetch(`https://api.github.com/repos/google-labs-code/design.md/tarball/${commit}`);
  assert.ok(response.ok, `Pinned source download failed: HTTP ${response.status}`);
  const archive = Buffer.from(await response.arrayBuffer());
  assert.equal(createHash('sha256').update(archive).digest('hex'), archiveSha256, 'Upstream archive changed');
  writeFileSync(join(work, 'source.tar.gz'), archive);
  const source = join(work, 'source');
  mkdirSync(source);
  run('tar', ['-xzf', join(work, 'source.tar.gz'), '--strip-components=1', '-C', source], work);
  run('git', ['apply', '--unidiff-zero', '--check', join(here, 'zod4.patch')], source);
  run('git', ['apply', '--unidiff-zero', join(here, 'zod4.patch')], source);
  const cli = join(source, 'packages/cli');
  const manifest = json(join(cli, 'package.json'));
  manifest.version = '0.4.0-starlight.1';
  manifest.dependencies.zod = '4.6.7';
  manifest.packageManager = 'pnpm@10.28.0';
  manifest.files = ['dist', 'LICENSE', 'NOTICE'];
  delete manifest.scripts;
  delete manifest.publishConfig;
  delete manifest.devDependencies;
  writeFileSync(join(cli, 'package.json'), JSON.stringify(manifest, null, 2) + '\n');

  const original = realpathSync(join(root, 'node_modules/@google/design.md'));
  const cliRequire = createRequire(join(original, 'package.json'));
  const rootRequire = createRequire(join(root, 'package.json'));
  const dependencies = { ...manifest.dependencies, tailwindcss: '3', '@types/node': '*' };
  for (const name of Object.keys(dependencies)) {
    const resolver = ['zod', 'tailwindcss', '@types/node'].includes(name) ? rootRequire : cliRequire;
    const target = name === '@types/node'
      ? dirname(rootRequire.resolve('@types/node/package.json')) : packageDir(resolver, name);
    if (name === 'zod') assert.equal(json(join(target, 'package.json')).version, '4.6.7');
    const link = join(cli, 'node_modules', name);
    mkdirSync(dirname(link), { recursive: true });
    symlinkSync(target, link, 'junction');
  }
  const remarkRequire = createRequire(join(packageDir(cliRequire, 'remark-parse'), 'package.json'));
  symlinkSync(dirname(remarkRequire.resolve('@types/mdast/package.json')), join(cli, 'node_modules/@types/mdast'), 'junction');
  // Keep all upstream tests, including malformed input, references and exporters.
  run('bun', ['test', 'src'], cli);
  run('bun', ['build', 'src/index.ts', 'src/linter/index.ts', '--outdir', 'dist', '--target', 'node', '--packages', 'external'], cli);
  run(process.execPath, [rootRequire.resolve('typescript/bin/tsc'), '--project', 'tsconfig.build.json', '--emitDeclarationOnly', '--skipLibCheck', '--types', 'node'], cli);
  for (const directory of ['dist', 'dist/linter']) {
    copyFileSync(join(cli, 'src/linter/spec-config.yaml'), join(cli, directory, 'spec-config.yaml'));
    copyFileSync(join(source, 'docs/spec.md'), join(cli, directory, 'spec.md'));
    const bundle = readFileSync(join(cli, directory, 'index.js'), 'utf8');
    assert.match(bundle, /from ["']zod["']/);
    assert.doesNotMatch(bundle, /node_modules\/zod|class ZodError|function ZodError/);
  }
  copyFileSync(join(source, 'LICENSE'), join(cli, 'LICENSE'));
  writeFileSync(join(cli, 'NOTICE'), `Google LLC, Apache-2.0. Local Zod 4 security rebuild by Codex, 2026-11-04.\nUpstream ${commit}. See the repository's vendor/google-design-md/zod4.patch.\nAll third-party runtime dependencies are external and declared in package.json.\n`);
  mkdirSync(output, { recursive: true });
  run('pnpm', ['pack', '--pack-destination', output], cli);
  const packed = join(output, '@google-design.md-0.4.0-starlight.1.tgz');
  const produced = existsSync(packed) ? packed : join(output, 'google-design.md-0.4.0-starlight.1.tgz');
  assert.ok(existsSync(produced), `Expected package was not created: ${readdirSync(output)}`);
  const destination = join(output, 'google-design-md-0.4.0-starlight.1.tgz');
  renameSync(produced, destination);
  console.log(`${basename(destination)} SHA256 ${createHash('sha256').update(readFileSync(destination)).digest('hex')}`);
} finally {
  // Only this invocation's mkdtemp directory is eligible for removal.
  assert.ok(resolve(work).startsWith(resolve(tmpdir()) + sep));
  assert.ok(basename(work).startsWith('frankx-google-design-md-'));
  rmSync(work, { recursive: true, force: true });
}
