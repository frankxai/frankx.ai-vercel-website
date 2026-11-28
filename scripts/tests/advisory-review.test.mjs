import assert from 'node:assert/strict'
import test from 'node:test'
import { paidAppointment, reviewedDecisionSchedule } from '../../lib/advisory-booking.ts'
import { planReview } from '../advisory/review-session.mjs'

const card = { appointment: 'scheduled', payment: 'paid', memo: 'none', receiptMatches: true, contextApproved: true }
test('paid booking requires a reviewed dedicated schedule', () => {
  assert.equal(paidAppointment(reviewedDecisionSchedule), null)
  const sample = { scheduleId: 'SyntheticScheduleId12345', feeMinor: 12345, taxLabel: 'example' }
  assert.equal(paidAppointment(sample).fee, '€123.45')
  assert.equal(new URL(paidAppointment(sample).href).hostname, 'calendar.google.com')
  for (const patch of [{scheduleId: 'https://example.com'}, {feeMinor: 0}, {taxLabel: '  '}]) {
    assert.equal(paidAppointment({...sample, ...patch}), null)
  }
})
test('only matched records allow preparation and research', () => {
  assert.deepEqual(planReview(card).tasks.map(t => t.id), ['prepare', 'research', 'measure'])
  for (const patch of [{payment:'pending'}, {receiptMatches:false}, {appointment:'none'}, {payment:'refunded'}, {appointment:'cancelled'}, {contextApproved:false}]) {
    assert.deepEqual(planReview({...card,...patch}).tasks.map(t => t.id), ['measure'])
  }
})
test('delivered, consented engagements can request further work', () => {
  const done = {...card, appointment:'held', memo:'delivered'}
  assert.deepEqual(planReview(done).tasks.map(t => t.id), ['measure'])
  const next = {...done, followUpAgreed:true, newScopeRequested:true, learningRequested:true}
  assert.deepEqual(planReview(next).tasks.map(t => t.id), ['followUp','progress','proposal','learn','measure'])
  assert.deepEqual(planReview(next), planReview(next))
})
test('client fields and truthy strings are rejected', () => {
  for (const patch of [{email:'example'}, {contextApproved:'false'}, {payment:'unknown'}]) assert.throws(() => planReview({...card,...patch}))
})
test('qualify and notes require separate approval', () => {
  assert.equal(planReview({...card, appointment:'none', payment:'none'}).tasks[0].id, 'qualify')
  assert.equal(planReview({...card, appointment:'held', notesApproved:true}).tasks[0].id, 'notes')
  assert.equal(planReview({...card, appointment:'held', memo:'draft'}).stage,'memo awaiting human review')
})
