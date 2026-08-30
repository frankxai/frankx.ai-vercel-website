import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
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

const findExportedFunction = (source, functionName) => {
  const module = parseModule(source, 'app/work/[slug]/page.tsx')

  return module.statements.find(
    (statement) =>
      ts.isFunctionDeclaration(statement) &&
      hasExportModifier(statement) &&
      statement.name?.text === functionName,
  )
}

const unwrapParentheses = (expression) => {
  let current = expression
  while (current && ts.isParenthesizedExpression(current)) {
    current = current.expression
  }
  return current
}

const returnedExpression = (functionLike) => {
  if (!functionLike?.body) return undefined
  if (!ts.isBlock(functionLike.body)) return unwrapParentheses(functionLike.body)

  const returnStatement = functionLike.body.statements.find(ts.isReturnStatement)
  return unwrapParentheses(returnStatement?.expression)
}

const propertyAccessMatches = (expression, objectName, propertyName) =>
  ts.isPropertyAccessExpression(expression) &&
  ts.isIdentifier(expression.expression) &&
  expression.expression.text === objectName &&
  expression.name.text === propertyName

const callbackParameterName = (callback) => {
  if (
    (!ts.isArrowFunction(callback) && !ts.isFunctionExpression(callback)) ||
    callback.parameters.length !== 1 ||
    !ts.isIdentifier(callback.parameters[0].name)
  ) {
    return undefined
  }

  return callback.parameters[0].name.text
}

const hasPublicWorkParamPipeline = (source) => {
  const generateStaticParams = findExportedFunction(source, 'generateStaticParams')
  const mapCall = returnedExpression(generateStaticParams)

  if (
    !mapCall ||
    !ts.isCallExpression(mapCall) ||
    !ts.isPropertyAccessExpression(mapCall.expression) ||
    mapCall.expression.name.text !== 'map' ||
    mapCall.arguments.length !== 1
  ) {
    return false
  }

  const mapCallback = mapCall.arguments[0]
  const mapParameter = callbackParameterName(mapCallback)
  const mapResult = returnedExpression(mapCallback)
  const slugProperty =
    mapResult && ts.isObjectLiteralExpression(mapResult)
      ? mapResult.properties.find(
          (property) =>
            ts.isPropertyAssignment(property) &&
            ((ts.isIdentifier(property.name) && property.name.text === 'slug') ||
              (ts.isStringLiteral(property.name) && property.name.text === 'slug')),
        )
      : undefined

  if (
    !mapParameter ||
    !slugProperty ||
    !ts.isPropertyAssignment(slugProperty) ||
    !propertyAccessMatches(slugProperty.initializer, mapParameter, 'slug')
  ) {
    return false
  }

  const filterCall = unwrapParentheses(mapCall.expression.expression)
  if (
    !filterCall ||
    !ts.isCallExpression(filterCall) ||
    !ts.isPropertyAccessExpression(filterCall.expression) ||
    filterCall.expression.name.text !== 'filter' ||
    filterCall.arguments.length !== 1
  ) {
    return false
  }

  const registryCall = unwrapParentheses(filterCall.expression.expression)
  if (
    !registryCall ||
    !ts.isCallExpression(registryCall) ||
    !ts.isIdentifier(registryCall.expression) ||
    registryCall.expression.text !== 'listEngagements' ||
    registryCall.arguments.length !== 0
  ) {
    return false
  }

  const filterCallback = filterCall.arguments[0]
  const filterParameter = callbackParameterName(filterCallback)
  const predicate = returnedExpression(filterCallback)

  return Boolean(
    filterParameter &&
      predicate &&
      ts.isBinaryExpression(predicate) &&
      predicate.operatorToken.kind === ts.SyntaxKind.ExclamationEqualsEqualsToken &&
      propertyAccessMatches(predicate.left, filterParameter, 'status') &&
      ts.isStringLiteral(predicate.right) &&
      predicate.right.text === 'private',
  )
}

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
    packageJson.scripts['test:build-artifact-integrity'],
    'node --experimental-strip-types --test scripts/tests/build-artifact-integrity.test.mjs',
    'the artifact contract must load the TypeScript work registry it verifies',
  )
  assert.equal(
    packageJson.scripts.postbuild,
    'npm run test:build-artifact-integrity && npm run test:vault-metadata:rendered',
    'every production build must verify the emitted prerender manifest',
  )
})

test('unknown work slugs stay outside the closed static route set', async () => {
  const page = await read('app/work/[slug]/page.tsx')

  assert.ok(
    hasClosedDynamicParams(page),
    'dynamicParams must be an exported const initialized to false',
  )
  assert.ok(
    hasPublicWorkParamPipeline(page),
    'generateStaticParams must map public listEngagements slugs after excluding private entries',
  )
})
