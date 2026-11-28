/** Offline rehearsal adapter only. Never use an ephemeral serverless filesystem for entitlement truth. */
import { DatabaseSync } from 'node:sqlite'

export function sqliteSandboxLedger(file) {
  if (typeof file !== 'string' || !file || file === ':memory:') throw Error('Durable rehearsal file required')
  const db = new DatabaseSync(file)
  db.exec(`PRAGMA journal_mode = WAL; PRAGMA synchronous = FULL; PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS attempts (session_id TEXT PRIMARY KEY, payload TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS entitlements (session_id TEXT PRIMARY KEY, payment_intent TEXT UNIQUE NOT NULL, payload TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS events (event_id TEXT PRIMARY KEY, operation TEXT NOT NULL, identity TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS revoked_payments (payment_intent TEXT PRIMARY KEY);`)
  const get = (table, id) => { const row = db.prepare(`SELECT payload FROM ${table} WHERE session_id = ?`).get(id); return row ? JSON.parse(row.payload) : null }
  function transaction(callback) { db.exec('BEGIN IMMEDIATE'); try { const value = callback(); db.exec('COMMIT'); return value } catch (error) { db.exec('ROLLBACK'); throw error } }
  function replay(eventId, operation, identity) {
    const found = db.prepare('SELECT operation,identity FROM events WHERE event_id=?').get(eventId)
    if (found && (found.operation !== operation || found.identity !== identity)) throw Error('Event identity conflict')
    return Boolean(found)
  }
  return {
    close: () => db.close(),
    register: async attempt => transaction(() => {
      const old = get('attempts', attempt.sessionId)
      if (old && JSON.stringify(old) !== JSON.stringify(attempt)) throw Error('Purchase binding conflict')
      db.prepare('INSERT OR IGNORE INTO attempts VALUES (?,?)').run(attempt.sessionId, JSON.stringify(attempt))
    }),
    attempt: async id => get('attempts', id),
    entitlement: async id => get('entitlements', id),
    grant: async (eventId, entitlement) => transaction(() => {
      if (replay(eventId, 'grant', entitlement.sessionId)) return 'duplicate'
      const attempt = get('attempts', entitlement.sessionId)
      if (!attempt || Object.keys(attempt).some(key => attempt[key] !== entitlement[key])) throw Error('Unbound grant')
      const previous = get('entitlements', entitlement.sessionId)
      if (previous && previous.paymentIntent !== entitlement.paymentIntent) throw Error('Payment identity conflict')
      const revoked = previous?.state === 'revoked' || Boolean(db.prepare('SELECT 1 FROM revoked_payments WHERE payment_intent=?').get(entitlement.paymentIntent))
      const value = { ...entitlement, state: revoked ? 'revoked' : 'active' }
      db.prepare('INSERT INTO entitlements VALUES (?,?,?) ON CONFLICT(session_id) DO UPDATE SET payload=excluded.payload').run(value.sessionId, value.paymentIntent, JSON.stringify(value))
      db.prepare('INSERT INTO events VALUES (?,?,?)').run(eventId, 'grant', entitlement.sessionId)
      return 'applied'
    }),
    revoke: async (eventId, paymentIntent) => transaction(() => {
      if (replay(eventId, 'revoke', paymentIntent)) return 'duplicate'
      db.prepare('INSERT OR IGNORE INTO revoked_payments VALUES (?)').run(paymentIntent)
      const found = db.prepare('SELECT session_id,payload FROM entitlements WHERE payment_intent=?').get(paymentIntent)
      if (found) db.prepare('UPDATE entitlements SET payload=? WHERE session_id=?').run(JSON.stringify({ ...JSON.parse(found.payload), state: 'revoked' }), found.session_id)
      db.prepare('INSERT INTO events VALUES (?,?,?)').run(eventId, 'revoke', paymentIntent)
      return 'applied'
    }),
  }
}
