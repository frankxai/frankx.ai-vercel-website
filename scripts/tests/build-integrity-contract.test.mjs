import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { posix } from 'node:path'
import test from 'node:test'
import ts from 'typescript'
import { ciAlwaysReportingErrors } from './helpers/workflow-yaml-contract.mjs'

const read = (path) => readFile(new URL(`../../${path}`, import.meta.url), 'utf8')


const parseModule = (source, fileName) =>
  ts.createSourceFile(
    fileName,
    source,
    ts.ScriptTarget.Latest,
    true,
    fileName.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  )

const hasExportModifier = (node) =>
  node.modifiers?.some(
    (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
  ) ?? false

const hasClosedDynamicParams = (source) => {
  const module = parseModule(source, 'app/work/[slug]/page.tsx')

  return module.statements.some(
    (statement) =>
      ts.isVariableStatement(statement) &&
      hasExportModifier(statement) &&
      (statement.declarationList.flags & ts.NodeFlags.Const) !== 0 &&
      statement.declarationList.declarations.some(
        (declaration) =>
          ts.isIdentifier(declaration.name) &&
          declaration.name.text === 'dynamicParams' &&
          declaration.initializer?.kind === ts.SyntaxKind.FalseKeyword,
      ),
  )
}

const hasExportedFunction = (source, functionName) => {
  const module = parseModule(source, 'app/work/[slug]/page.tsx')

  return module.statements.some(
    (statement) =>
      ts.isFunctionDeclaration(statement) &&
      hasExportModifier(statement) &&
      statement.name?.text === functionName,
  )
}

const callsIdentifier = (source, identifier) => {
  const module = parseModule(source, 'app/work/[slug]/page.tsx')
  let found = false

  const visit = (node) => {
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === identifier
    ) {
      found = true
    }
    ts.forEachChild(node, visit)
  }

  visit(module)
  return found
}

const collectRuntimeModuleSpecifiers = (source, fileName) => {
  const module = parseModule(source, fileName)
  const specifiers = new Set()

  const visit = (node) => {
    if (ts.isImportDeclaration(node)) {
      if (
        !node.importClause?.isTypeOnly &&
        ts.isStringLiteral(node.moduleSpecifier)
      ) {
        specifiers.add(node.moduleSpecifier.text)
      }
      return
    }

    if (ts.isExportDeclaration(node)) {
      if (!node.isTypeOnly && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
        specifiers.add(node.moduleSpecifier.text)
      }
      return
    }

    if (
      ts.isCallExpression(node) &&
      node.arguments.length === 1 &&
      ts.isStringLiteral(node.arguments[0]) &&
      (node.expression.kind === ts.SyntaxKind.ImportKeyword ||
        (ts.isIdentifier(node.expression) &&
          node.expression.text === 'require'))
    ) {
      specifiers.add(node.arguments[0].text)
    }

    ts.forEachChild(node, visit)
  }

  visit(module)
  return [...specifiers]
}

const resolveLocalModule = async (fromPath, specifier) => {
  if (!specifier.startsWith('.') && !specifier.startsWith('@/')) return null

  const unresolved = specifier.startsWith('@/')
    ? specifier.slice(2)
    : posix.join(posix.dirname(fromPath), specifier)
  const suffixes = [
    '',
    '.ts',
    '.tsx',
    '.js',
    '.jsx',
    '/index.ts',
    '/index.tsx',
    '/index.js',
    '/index.jsx',
  ]

  for (const suffix of suffixes) {
    const candidate = posix.normalize(unresolved + suffix)
    try {
      return { path: candidate, source: await read(candidate) }
    } catch (error) {
      if (error?.code !== 'ENOENT') throw error
    }
  }

  throw new Error(
    'Unable to resolve local import ' + specifier + ' from ' + fromPath,
  )
}

const requestTimeImportViolations = async (entryPath) => {
  const visited = new Set()
  const violations = []

  const visit = async (modulePath) => {
    if (visited.has(modulePath)) return
    visited.add(modulePath)

    const source = await read(modulePath)
    for (const specifier of collectRuntimeModuleSpecifiers(source, modulePath)) {
      if (specifier === 'next/headers' || specifier === 'next/server') {
        violations.push(modulePath + ' -> ' + specifier)
        continue
      }

      const localModule = await resolveLocalModule(modulePath, specifier)
      if (localModule) await visit(localModule.path)
    }
  }

  await visit(entryPath)
  return violations
}

test('live model pricing cannot cross the request-time boundary during prerender', async () => {
  const source = await read('lib/llm-hub/openrouter.ts')
  const connectionBoundary = source.indexOf('await connection()')
  const networkRequest = source.indexOf('await fetch(')

  assert.match(source, /import \{ connection \} from 'next\/server'/)
  assert.ok(connectionBoundary >= 0, 'live pricing must wait for an incoming request')
  assert.ok(
    connectionBoundary < networkRequest,
    'the request-time boundary must execute before the external fetch',
  )
  assert.match(source, /next: \{ revalidate: 3600 \}/)
  assert.doesNotMatch(
    source,
    /NEXT_PHASE|PHASE_PRODUCTION_BUILD/,
    'the boundary must use the framework contract, not a build-environment guess',
  )
})

test('every LLM Hub server surface shares the guarded pricing function', async () => {
  const pages = await Promise.all([
    read('app/llm-hub/page.tsx'),
    read('app/llm-hub/[slug]/page.tsx'),
    read('app/llm-hub/compare/[slug]/page.tsx'),
    read('app/llm-hub.json/route.ts'),
  ])

  for (const page of pages) {
    assert.match(page, /fetchLivePricing/)
    assert.doesNotMatch(page, /fetch\(['"`]https:\/\/openrouter\.ai/)
  }

  assert.match(pages[3], /export const dynamic = 'force-dynamic'/)
})

test('pnpm lifecycle scripts stay denied by default with two version-pinned approvals', async () => {
  const workspace = await read('pnpm-workspace.yaml')
  const approvals = [
    ...workspace.matchAll(/^\s{2}('[^']+'):\s+true$/gm),
  ].map((match) => match[1])

  assert.deepEqual(approvals, [
    "'sharp@0.34.5'",
    "'unrs-resolver@1.11.1'",
  ])
  assert.doesNotMatch(workspace, /set this to true or false/)
  assert.doesNotMatch(workspace, /dangerouslyAllowAllBuilds/)

  for (const denied of [
    'agentdb@3.0.0-alpha.20',
    'argon2@0.44.0',
    'better-sqlite3@11.10.0',
    'hnswlib-node@3.0.0',
    'protobufjs@6.11.6 || 7.6.5',
    'puppeteer@24.43.0',
    'sharp@0.32.6',
  ]) {
    assert.ok(
      workspace.includes(`  '${denied}': false`),
      `${denied} must stay explicitly denied`,
    )
  }
})

test('CI always reports and runs the dependency boundary and AgentDB runtime contracts', async () => {
  const workflow = await read('.github/workflows/ci.yml')
  const packageJson = JSON.parse(await read('package.json'))

  assert.deepEqual(ciAlwaysReportingErrors(workflow), [])
  assert.match(
    workflow,
    /- name: Build integrity contract\s+run: pnpm run test:build-integrity/,
  )
  assert.match(
    workflow,
    /- name: AgentDB runtime smoke\s+run: pnpm run test:agentdb-runtime/,
  )
  assert.equal(
    packageJson.scripts['test:agentdb-runtime'],
    'node --test scripts/tests/agentdb-runtime.test.mjs',
  )
  assert.equal(
    packageJson.scripts.postbuild,
    'npm run test:build-artifact-integrity && npm run test:vault-metadata:rendered',
    'every production build must verify the emitted prerender manifest',
  )
})

test('unknown work slugs stay inside a static segment 404', async () => {
  const [page, notFound, importViolations] = await Promise.all([
    read('app/work/[slug]/page.tsx'),
    read('app/work/[slug]/not-found.tsx'),
    requestTimeImportViolations('app/work/[slug]/not-found.tsx'),
  ])

  assert.ok(
    hasClosedDynamicParams(page),
    'dynamicParams must be an exported const initialized to false',
  )
  assert.ok(
    hasExportedFunction(page, 'generateStaticParams'),
    'the route must export generateStaticParams',
  )
  assert.ok(callsIdentifier(page, 'notFound'), 'the route must call notFound()')
  assert.deepEqual(
    importViolations,
    [],
    'the complete segment 404 import graph must stay outside request-time APIs',
  )
  assert.match(notFound, /href="\/work"/)
})
