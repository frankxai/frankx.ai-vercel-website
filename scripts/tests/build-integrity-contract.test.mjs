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

const hasOpenDynamicParams = (source) => {
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
          declaration.initializer?.kind === ts.SyntaxKind.TrueKeyword,
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

const createBoundModule = (source, fileName) => {
  const sourceFile = parseModule(source, fileName)
  const options = {
    jsx: ts.JsxEmit.Preserve,
    module: ts.ModuleKind.ESNext,
    noLib: true,
    noResolve: true,
    target: ts.ScriptTarget.Latest,
  }
  const host = {
    fileExists: (requested) => requested === fileName,
    readFile: (requested) => (requested === fileName ? source : undefined),
    getSourceFile: (requested) =>
      requested === fileName ? sourceFile : undefined,
    getDefaultLibFileName: () => 'lib.d.ts',
    writeFile: () => {},
    getCurrentDirectory: () => '/',
    getDirectories: () => [],
    getCanonicalFileName: (requested) => requested,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => '\n',
  }
  const program = ts.createProgram([fileName], options, host)

  return {
    checker: program.getTypeChecker(),
    module: program.getSourceFile(fileName),
  }
}

const importedBinding = (
  module,
  checker,
  moduleSpecifier,
  importedName,
) => {
  for (const statement of module.statements) {
    if (
      !ts.isImportDeclaration(statement) ||
      !ts.isStringLiteral(statement.moduleSpecifier) ||
      statement.moduleSpecifier.text !== moduleSpecifier
    ) {
      continue
    }

    const bindings = statement.importClause?.namedBindings
    if (!bindings || !ts.isNamedImports(bindings)) continue

    for (const element of bindings.elements) {
      const sourceName = element.propertyName?.text ?? element.name.text
      if (sourceName !== importedName) continue

      const symbol = checker.getSymbolAtLocation(element.name)
      if (symbol) return { declaration: element, symbol }
    }
  }

  return null
}

const subtreeCallsSymbol = (node, expectedSymbol, checker) => {
  let found = false

  const visit = (child) => {
    if (
      ts.isCallExpression(child) &&
      ts.isIdentifier(child.expression) &&
      checker.getSymbolAtLocation(child.expression) === expectedSymbol
    ) {
      found = true
      return
    }
    ts.forEachChild(child, visit)
  }

  visit(node)
  return found
}

const unavailableEngagementFacts = (
  condition,
  engagementSymbol,
  checker,
) => {
  let rejectsMissing = false
  let rejectsPrivate = false
  const isEngagement = (node) =>
    ts.isIdentifier(node) &&
    checker.getSymbolAtLocation(node) === engagementSymbol
  const isStatusAccess = (node) =>
    ts.isPropertyAccessExpression(node) &&
    isEngagement(node.expression) &&
    node.name.text === 'status'
  const isPrivate = (node) =>
    ts.isStringLiteral(node) && node.text === 'private'

  const visit = (node) => {
    if (
      ts.isPrefixUnaryExpression(node) &&
      node.operator === ts.SyntaxKind.ExclamationToken &&
      isEngagement(node.operand)
    ) {
      rejectsMissing = true
    }

    if (
      ts.isBinaryExpression(node) &&
      [
        ts.SyntaxKind.EqualsEqualsToken,
        ts.SyntaxKind.EqualsEqualsEqualsToken,
      ].includes(node.operatorToken.kind) &&
      ((isStatusAccess(node.left) && isPrivate(node.right)) ||
        (isPrivate(node.left) && isStatusAccess(node.right)))
    ) {
      rejectsPrivate = true
    }

    ts.forEachChild(node, visit)
  }

  visit(condition)
  return { rejectsMissing, rejectsPrivate }
}

const hasUnknownEngagementGuard = (source) => {
  const fileName = '/app/work/[slug]/page.tsx'
  const { checker, module } = createBoundModule(source, fileName)
  if (!module) return false

  const notFoundImport = importedBinding(
    module,
    checker,
    'next/navigation',
    'notFound',
  )
  const getEngagementImport = importedBinding(
    module,
    checker,
    '@/content/work',
    'getEngagement',
  )
  if (!notFoundImport || !getEngagementImport) return false

  const pageFunction = module.statements.find(
    (statement) =>
      ts.isFunctionDeclaration(statement) &&
      hasExportModifier(statement) &&
      statement.modifiers?.some(
        (modifier) => modifier.kind === ts.SyntaxKind.DefaultKeyword,
      ) &&
      statement.body,
  )
  if (!pageFunction?.body) return false

  let engagementSymbol = null
  let declarationIndex = -1

  pageFunction.body.statements.forEach((statement, index) => {
    if (!ts.isVariableStatement(statement) || engagementSymbol) return

    for (const declaration of statement.declarationList.declarations) {
      const declaredSymbol = ts.isIdentifier(declaration.name)
        ? checker.getSymbolAtLocation(declaration.name)
        : null
      const rawInitializer = declaration.initializer
      const initializer =
        rawInitializer && ts.isAwaitExpression(rawInitializer)
          ? rawInitializer.expression
          : rawInitializer
      if (
        declaredSymbol &&
        initializer &&
        ts.isCallExpression(initializer) &&
        ts.isIdentifier(initializer.expression) &&
        checker.getSymbolAtLocation(initializer.expression) ===
          getEngagementImport.symbol
      ) {
        engagementSymbol = declaredSymbol
        declarationIndex = index
        break
      }
    }
  })

  if (!engagementSymbol) return false

  return pageFunction.body.statements
    .slice(declarationIndex + 1)
    .some((statement) => {
      if (!ts.isIfStatement(statement)) return false
      const facts = unavailableEngagementFacts(
        statement.expression,
        engagementSymbol,
        checker,
      )
      return (
        facts.rejectsMissing &&
        facts.rejectsPrivate &&
        subtreeCallsSymbol(
          statement.thenStatement,
          notFoundImport.symbol,
          checker,
        )
      )
    })
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

test('unknown work slugs reach the static segment 404', async () => {
  const [page, notFound, importViolations] = await Promise.all([
    read('app/work/[slug]/page.tsx'),
    read('app/work/[slug]/not-found.tsx'),
    requestTimeImportViolations('app/work/[slug]/not-found.tsx'),
  ])

  assert.ok(
    hasOpenDynamicParams(page),
    'dynamicParams must be an exported const initialized to true',
  )
  assert.ok(
    hasExportedFunction(page, 'generateStaticParams'),
    'the route must export generateStaticParams',
  )
  assert.ok(
    hasUnknownEngagementGuard(page),
    'the default page must reject missing/private engagements through the imported notFound binding',
  )
  assert.deepEqual(
    importViolations,
    [],
    'the complete segment 404 import graph must stay outside request-time APIs',
  )
  assert.match(notFound, /href="\/work"/)
})
