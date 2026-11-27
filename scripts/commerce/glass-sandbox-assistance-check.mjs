import assert from 'node:assert/strict'

// Synthetic IDs and reviewed-authority placeholders exist only in this disposable cluster.
export async function verifyAssistance({query, command, grant, attempt}) {
  const tenant = 'frankx-glass-sandbox'
  const creator = 'fixture_authorized_creator'
  const owner = 'buyer_one'
  const source = attempt.sourceSha
  const target = 'e'.repeat(40)
  const literal = value => value === null ? 'NULL' : "'" + String(value).replaceAll("'", "''") + "'"
  const sql = (parts, ...values) => parts.reduce((result, part, index) =>
    result + (index ? literal(values[index - 1]) : '') + part, '')
  const asJson = async statement => JSON.parse(await query('SET ROLE service_role; SELECT ' + statement))
  const assistance = (subject, purpose, scope = tenant) =>
    asJson(sql`public.glass_assistance_v1(${scope},${subject},${purpose})`)
  const aggregate = (subject = creator, scope = tenant) =>
    asJson(sql`public.glass_creator_opportunities_v1(${scope},${subject})`)
  const permit = (id, purpose, revision, enabled) => query(sql`
    INSERT INTO commerce_sandbox.purpose_receipts
    VALUES (${id},${purpose},${revision},${enabled},repeat('b',64))`)
  const fact = (id, kind, revision = source) => query(sql`
    INSERT INTO commerce_sandbox.assistance_facts
    VALUES (${id},${revision},${kind},${kind === 'verified_upgrade' ? target : null},repeat('f',64),now()+interval '1 hour')`)
  const purchase = async (id, key, revision = source) => {
    const bound = {...attempt, subjectId:id, sessionId:'cs_test_assist_' + key, sourceSha:revision}
    await command('register', bound)
    return grant(bound, 'evt_assist_' + key, 'pi_assist_' + key)
  }
  const refund = key => command('revoke', {eventId:'evt_reverse_' + key, paymentIntent:'pi_assist_' + key})

  for (const role of ['anon', 'authenticated']) {
    await assert.rejects(query("SET ROLE " + role + "; SELECT public.glass_assistance_v1('x','y','compatibility')"), /permission denied/)
    await assert.rejects(query("SET ROLE " + role + "; SELECT public.glass_creator_opportunities_v1('x','y')"), /permission denied/)
  }
  await assert.rejects(query("SET ROLE service_role; SELECT * FROM commerce_sandbox.purpose_receipts"), /permission denied/)
  assert.deepEqual(await assistance(owner, 'compatibility'), {status:'unavailable'})
  await purchase(owner,'order1')
  assert.deepEqual(await assistance(owner, 'compatibility'), {status:'opt_in_required'})
  await permit(owner,'compatibility',1,true)
  assert.deepEqual(await assistance(owner,'upgrades'), {status:'opt_in_required'})
  assert.deepEqual(await assistance(owner,'compatibility'), {status:'insufficient_evidence'})
  await fact(owner,'verified_incompatibility')
  assert.equal((await assistance(owner,'compatibility')).kind,'verified_incompatibility')
  assert.deepEqual(await assistance(owner,'compatibility','other-tenant'),{status:'unavailable'})
  assert.deepEqual(await assistance('buyer_two','compatibility'),{status:'unavailable'})
  await query("UPDATE commerce_sandbox.assistance_facts SET expires_at=now() WHERE kind='verified_incompatibility'")
  assert.deepEqual(await assistance(owner,'compatibility'),{status:'insufficient_evidence'})
  await permit(owner,'compatibility',3,false)
  await permit(owner,'compatibility',2,true)
  assert.deepEqual(await assistance(owner,'compatibility'),{status:'opt_in_required'})
  await permit(owner,'upgrades',1,true)
  await fact(owner,'verified_upgrade')
  assert.equal((await assistance(owner,'upgrades')).targetSha,target)
  await purchase(owner,'updated',target)
  assert.deepEqual(await assistance(owner,'upgrades'),{status:'insufficient_evidence'})
  await refund('updated')

  assert.deepEqual(await aggregate(),{status:'unavailable'})
  await query(sql`INSERT INTO commerce_sandbox.creator_readers VALUES (${creator},repeat('c',64),now()+interval '1 hour')`)
  assert.deepEqual(await aggregate(),{status:'insufficient_evidence'})
  await query("INSERT INTO commerce_sandbox.cohort_policy VALUES ('requested_compatibility',3,repeat('d',64),now()+interval '1 hour')")
  await fact(owner,'requested_compatibility')
  await permit(owner,'creator_research',1,true)
  await purchase(owner,'repeat')
  await purchase('buyer_two','second')
  await purchase('buyer_three','third')
  await permit('buyer_two','creator_research',1,true)
  await permit('buyer_three','creator_research',1,true)
  await fact('buyer_two','requested_compatibility')
  assert.deepEqual(await aggregate(),{status:'insufficient_evidence'})
  // Three buyers own this release. The third has not yet requested assistance.
  await fact('buyer_three','requested_compatibility')
  assert.deepEqual(await aggregate(),{
    status:'available', kind:'requested_compatibility', product:'aurora-ui-kit', edition:'essential', atLeastPeople:3,
  })
  await purchase('buyer_four','fourth')
  await permit('buyer_four','creator_research',1,true)
  await fact('buyer_four','requested_compatibility')
  assert.equal((await aggregate()).atLeastPeople,3)
  await refund('fourth')
  assert.deepEqual(await aggregate(creator,'other-tenant'),{status:'unavailable'})
  assert.deepEqual(await aggregate(owner),{status:'unavailable'})
  await permit('buyer_three','creator_research',2,false)
  assert.deepEqual(await aggregate(),{status:'insufficient_evidence'})
  await permit('buyer_three','creator_research',3,true)
  await refund('third')
  assert.deepEqual(await aggregate(),{status:'insufficient_evidence'})
  await refund('repeat')
  await refund('order1')
  assert.deepEqual(await assistance(owner,'upgrades'),{status:'unavailable'})
  await query("UPDATE commerce_sandbox.creator_readers SET expires_at=now()")
  assert.deepEqual(await aggregate(),{status:'unavailable'})
}
