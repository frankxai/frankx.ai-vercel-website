import test from 'node:test'
import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { createHash, randomBytes } from 'node:crypto'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createServer } from 'node:net'
import { fileURLToPath } from 'node:url'

const exec = promisify(execFile)
const proposal = fileURLToPath(new URL('../../docs/products/glass-sandbox-ledger-proposal.sql', import.meta.url))
const attempt = {
  sessionId: 'cs_test_glass_one', subjectId: 'fixture_alice', productId: 'aurora-ui-kit',
  edition: 'essential', sourceSha: 'a'.repeat(40), artifactId: 'fixture-archive',
  artifactSha256: 'b'.repeat(64), artifactBytes: 22, priceId: 'price_fixture', amount: 7900,
  currency: 'eur', termsVersion: 'fixture', termsSha256: 'c'.repeat(64),
  termsScope: 'sandbox-rehearsal-only', acceptedAt: '2025-01-01T00:00:00.000Z',
}

async function freePort() {
  const server = createServer()
  await new Promise((resolve, reject) => {
    server.once('error', reject)
    server.listen(0, '127.0.0.1', resolve)
  })
  const port = server.address().port
  await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()))
  return port
}

// Each invocation owns a new password-authenticated cluster. No remote DSN, account or storage.
test('Glass Essential PostgreSQL lifecycle', async t => {
  const dir = await mkdtemp(join(tmpdir(), 'glass-pg-'))
  const data = join(dir, 'data')
  const password = randomBytes(32).toString('hex')
  const pwfile = join(dir, 'password')
  const port = String(await freePort())
  const dbArgs = ['-X', '-qAt', '-v', 'ON_ERROR_STOP=1', '-h', '127.0.0.1', '-p', port, '-U', 'fixture_owner', '-d', 'postgres']
  const run = (command, args) => exec(command, args, {
    env: { PATH: process.env.PATH, PGPASSWORD: password, LC_ALL: 'C' },
    timeout: 30000,
  })
  const query = async sql => (await run('psql', [...dbArgs, '-c', sql])).stdout.trim()
  // Inputs in this test are synthetic, and quoted as SQL string literals.
  const literal = value => "'" + value.replaceAll("'", "''") + "'"
  const command = (operation, payload) => query(
    'SET ROLE service_role; SELECT public.glass_sandbox_command(' +
    literal(operation) + ', ' + literal(JSON.stringify(payload)) + '::jsonb)'
  )
  const grant = (order, eventId, paymentIntent) => command('grant', {eventId, entitlement: {...order, paymentIntent, state: 'active'}})
  const access = (sessionId, subjectId) => command('entitlement', {sessionId, subjectId})
  let started = false
  try {
    await writeFile(pwfile, password + '\n', {mode: 0o600})
    await run('initdb', ['--no-locale', '--auth=scram-sha-256', '-U', 'fixture_owner', '--pwfile', pwfile, '-D', data])
    await run('pg_ctl', ['-D', data, '-o', "-h 127.0.0.1 -p " + port + " -c unix_socket_directories=''", '-l', join(dir, 'postgres.log'), '-w', 'start'])
    started = true
    await query('CREATE ROLE anon; CREATE ROLE authenticated; CREATE ROLE service_role')
    await run('psql', [...dbArgs, '-f', proposal])
    await run('psql', [...dbArgs, '-f', proposal])

    await t.test('buyer and anonymous roles cannot read the ledger or call the privileged RPC', async () => {
      for (const role of ['anon', 'authenticated']) {
        await assert.rejects(query('SET ROLE ' + role + "; SELECT public.glass_sandbox_command('attempt','{}')"), /permission denied/)
        await assert.rejects(query('SET ROLE ' + role + '; SELECT * FROM commerce_sandbox.access_events'), /permission denied/)
      }
      assert.equal(await query("SELECT count(*) FROM pg_class WHERE relnamespace='commerce_sandbox'::regnamespace AND relkind='r' AND NOT relrowsecurity"), '0')
    })

    await t.test('concurrent callback retries yield one grant and one internal event', async () => {
      await command('register', attempt)
      const results = await Promise.all(Array.from({length: 8}, () => grant(attempt, 'evt_grant', 'pi_one')))
      assert.equal(results.filter(value => value === '"applied"').length, 1)
      assert.equal(results.filter(value => value === '"duplicate"').length, 7)
      assert.equal(JSON.parse(await access(attempt.sessionId, attempt.subjectId)).state, 'active')
      assert.equal(await access(attempt.sessionId, 'fixture_bob'), '')
      assert.equal(await command('entitlement', {sessionId: attempt.sessionId}), '')
      assert.equal(await grant(attempt, 'evt_second_notice', 'pi_one'), '"applied"')
      assert.equal(await query("SELECT count(*) FROM commerce_sandbox.access_events WHERE kind='entitlement.granted' AND schema_version=1"), '1')
    })

    await t.test('conflicting identities roll back without consuming the receipt', async () => {
      await assert.rejects(grant(attempt, 'evt_grant', 'pi_other'), /event binding conflict/)
      await assert.rejects(grant({...attempt, subjectId:'fixture_bob'}, 'evt_unbound', 'pi_one'), /unbound grant/)
      assert.equal(await query("SELECT count(*) FROM commerce_sandbox.events WHERE event_id='evt_unbound'"), '0')
      assert.equal(await grant(attempt, 'evt_unbound', 'pi_one'), '"applied"')
    })

    await t.test('refund and replay emit one revocation and cannot restore access', async () => {
      await Promise.all(Array.from({length: 4}, (_, index) => command('revoke', {eventId: 'evt_refund_' + index, paymentIntent:'pi_one'})))
      assert.equal(await grant(attempt, 'evt_grant', 'pi_one'), '"duplicate"')
      assert.equal(await grant(attempt, 'evt_late_paid', 'pi_one'), '"applied"')
      assert.equal(JSON.parse(await access(attempt.sessionId, attempt.subjectId)).state, 'revoked')
      assert.equal(await query("SELECT count(*) FROM commerce_sandbox.access_events WHERE kind='entitlement.revoked'"), '1')
    })

    await t.test('refund before grant never produces an active entitlement', async () => {
      const later = {...attempt, sessionId: 'cs_test_second', subjectId: 'fixture_bob'}
      await command('revoke', {eventId:'evt_early', paymentIntent:'pi_two'})
      await command('register', later)
      await grant(later, 'evt_paid_later', 'pi_two')
      assert.equal(JSON.parse(await access(later.sessionId, later.subjectId)).state, 'revoked')
      assert.equal(await query("SELECT kind FROM commerce_sandbox.access_events WHERE session_id='cs_test_second'"), 'entitlement.revoked')
    })

    await t.test('assistance and creator projections require distinct current authorities', async () => {
      await run('psql', [...dbArgs, '-f', fileURLToPath(new URL('../../docs/products/glass-sandbox-assistance.sql', import.meta.url))])
      const {verifyAssistance} = await import('../commerce/glass-sandbox-assistance-check.mjs')
      await verifyAssistance({query,command,grant,attempt})
    })

    await t.test('signed checkout delivers the pinned SDI archive and refund revokes it', {
      skip: process.env.GLASS_ESSENTIAL_ARCHIVE ? false : 'Set GLASS_ESSENTIAL_ARCHIVE to the independently built release ZIP',
    }, async () => {
      const {rehearsalCore: core} = await import('../commerce/glass-sandbox-harness.mjs')
      const {default: Stripe} = await import('stripe')
      const bytes = await readFile(process.env.GLASS_ESSENTIAL_ARCHIVE)
      const sha256 = data => createHash('sha256').update(data).digest('hex')
      const artifactSha256 = 'ed825d6a1b20336e1a38fc8f34466b96ded5266320dd9fd6935d0ab37160820c'
      assert.equal(bytes.length, 80099)
      assert.equal(sha256(bytes), artifactSha256)
      const release = {
        productId:'aurora-ui-kit', edition:'essential', amount:7900, currency:'eur',
        sourceSha:'bf3d078d6f66afb37eb0e3f2d81fb4cb5569b00c',
        artifactId:'starlight-glass-core-essential-0.2.0-rc.2', artifactBytes:80099, artifactSha256,
        priceId:'price_essential_test', termsVersion:'fixture-only',
        termsSha256:sha256('Isolated test only. No purchase or commercial license.'),
        termsScope:'sandbox-rehearsal-only',
      }
      const subjectId = 'fixture_archive_buyer'
      const sessionId = 'cs_test_real_archive'
      const intent = 'pi_archive'
      const origin = 'https://test.invalid'
      const key = 'sk_test_offline_fixture_not_a_credential'
      const webhookSecret = 'whsec_offline_fixture_only_not_a_credential'
      const ledger = core.supabaseSandboxLedger(async (name, {operation, payload}) => {
        assert.equal(name, 'glass_sandbox_command')
        const value = await command(operation, payload)
        return {data:value ? JSON.parse(value) : null, error:null}
      })
      let session
      const options = {
        mode:'test', secretKey:key, webhookSecret, release, ledger,
        products:JSON.parse(await readFile(new URL('../../data/products.json', import.meta.url), 'utf8')),
        reads:{
          session:async () => ({...session, payment_status:'paid', payment_intent:intent, amount_total:7900, currency:'eur'}),
          lineItems:async () => ({has_more:false, data:[{quantity:1, amount_total:7900, currency:'eur', price:{id:release.priceId,currency:'eur'}}]}),
          charge:async () => ({id:'ch_archive', livemode:false, currency:'eur', amount_refunded:7900, payment_intent:intent}),
        },
      }
      const checkout = await core.glassSandboxCheckout(new Request(origin, {method:'POST', headers:{origin}}), {
        ...options, siteOrigin:origin, purchaseAttemptId:'fixture_archive_order_01',
        authenticate:async () => ({subjectId, termsSha256:release.termsSha256, acceptedAt:attempt.acceptedAt}),
        transport:async (url, init) => {
          assert.equal(new URL(url).pathname, '/v1/checkout/sessions')
          const form = new URLSearchParams(init.body)
          assert.equal(form.get('line_items[0][price]'), release.priceId)
          assert.equal(form.get('client_reference_id'), subjectId)
          const metadata = Object.fromEntries([...form].filter(([key]) => key.startsWith('metadata[')).map(([key, value]) => [key.slice(9,-1),value]))
          session = {id:sessionId, mode:'payment', status:'open', livemode:false, client_reference_id:subjectId, metadata,
            url:'https://checkout.stripe.com/c/pay/cs_test_real_archive'}
          return Response.json(session)
        },
      })
      assert.equal(checkout.status, 201)
      const notify = async (id, type, objectId) => {
        const payload = JSON.stringify({id,type,object:'event',livemode:false,data:{object:{id:objectId}}})
        const signature = Stripe.webhooks.generateTestHeaderString({payload,secret:webhookSecret})
        const response = await core.glassSandboxWebhook(new Request(origin, {method:'POST',body:payload,headers:{'stripe-signature':signature}}), options)
        assert.equal(response.status, 200)
        return (await response.json()).result
      }
      let storageReads = 0
      const download = buyer => core.glassSandboxDownload(new Request(origin + '/download?session=' + sessionId), {
        ...options, authenticate:async () => ({subjectId:buyer}),
        readPrivateArtifact:async id => {
          storageReads++
          assert.equal(id, release.artifactId)
          return bytes
        },
      })
      assert.equal((await download(subjectId)).status, 404)
      assert.equal(await notify('evt_archive_paid','checkout.session.completed',sessionId), 'applied')
      assert.equal(await notify('evt_archive_paid','checkout.session.completed',sessionId), 'duplicate')
      assert.equal((await download('fixture_other_buyer')).status, 404)
      assert.equal(storageReads, 0)
      const response = await download(subjectId)
      assert.equal(response.status, 200)
      assert.equal(sha256(Buffer.from(await response.arrayBuffer())), artifactSha256)
      const ticketPath = origin + '/delivery?session=' + sessionId
      const ticketOptions = {
        ...options, siteOrigin:origin,
        ticketKeys:{currentId:'fixture', keys:new Map([['fixture',randomBytes(32)]])},
        authenticate:async () => ({subjectId}),
        readPrivateArtifact:async id => { assert.equal(id,release.artifactId); storageReads++; return bytes },
      }
      const issued = await core.issueGlassDownloadTicket(new Request(ticketPath,{method:'POST',headers:{origin}}),ticketOptions)
      assert.equal(issued.status,200)
      const {ticket} = await issued.json()
      const redeem = () => core.redeemGlassDownloadTicket(new Request(ticketPath,{headers:{'x-starlight-download-ticket':ticket}}),ticketOptions)
      const signed = await redeem()
      assert.equal(signed.status,200)
      assert.equal(sha256(Buffer.from(await signed.arrayBuffer())),artifactSha256)
      assert.equal(await notify('evt_archive_refund','charge.refunded','ch_archive'), 'applied')
      assert.equal((await download(subjectId)).status, 410)
      assert.equal((await redeem()).status, 410)
      assert.equal(storageReads, 2)
      assert.equal(await query("SELECT count(*) FROM commerce_sandbox.access_events WHERE session_id='cs_test_real_archive'"), '2')
    })
  } finally {
    if (started) await run('pg_ctl', ['-D', data, '-m', 'fast', '-w', 'stop'])
    await rm(dir, {recursive: true, force: true})
  }
})
