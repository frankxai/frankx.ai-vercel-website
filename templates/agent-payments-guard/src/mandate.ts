/**
 * Mandate verification — the "was this authorized?" gate.
 *
 * ⚠️ UNAUDITED reference implementation. NOT FOR LIVE FUNDS.
 *
 * FAIL CLOSED: the first failing gate rejects. A mandate is `verified` only if
 * it is well-formed, unconsumed (single-use), signed (real Ed25519 against the
 * issuer's public key), unexpired, and amount+currency-matched to the charge.
 *
 * This is an AP2-style mandate, not a full AP2 deployment — there is no issuer
 * key distribution, revocation, or certificate chain. A real release wires the
 * keyring to issuer-published keys behind the same `verifySignature` interface.
 */

import {
  createPrivateKey,
  createPublicKey,
  sign,
  verify,
  type KeyObject,
} from "node:crypto";

// ---------------------------------------------------------------------------
// Types. The defining invariant: this surface AUTHORIZES money, it never MOVES
// money. There is no transfer/pay/settle type anywhere in this template.
// ---------------------------------------------------------------------------

/** ISO-4217-ish currency code. The set is not validated; mismatch alone is a reject. */
export type Currency = string;

/**
 * An AP2-style mandate: cryptographically signed proof a human authorized THIS
 * purchase for THIS amount. The signature is a real Ed25519 signature over the
 * canonical payload, verified against the issuer's public key.
 */
export interface Mandate {
  /** Unique, single-use identifier. Replay of a consumed id is always a reject. */
  mandateId: string;
  /** Who/what the mandate authorizes (e.g. a stream or agent id). */
  subject: string;
  /** The authorized amount, as a decimal number in `currency`. */
  amount: number;
  currency: Currency;
  /** Unix epoch milliseconds. Missing or past = expired = reject. */
  expiresAt: number;
  /** Issuer key id the signature must verify against. */
  issuerKeyId: string;
  /** Ed25519 signature (base64) over the canonical mandate payload. */
  signature: string;
}

/** A proposed charge the agent wants to make against a mandate. */
export interface Charge {
  mandateId: string;
  amount: number;
  currency: Currency;
  /** The spend stream this charge belongs to (selects the cap set in caps.json). */
  stream: string;
}

export interface VerifyResult {
  verdict: "verified" | "reject";
  reason: string;
}

// ---------------------------------------------------------------------------
// Dev/test keypair. Generated from a fixed 32-byte seed so the public key is
// stable across processes — tests mint genuine Ed25519 mandates against `k_dev`
// without external key material.
//
// THIS IS A PUBLICLY-KNOWN DEV KEY. It MUST NOT be used to authorize live
// funds. Production issuer public keys are loaded from the environment; the dev
// key exists only so the template is self-contained and testable.
// ---------------------------------------------------------------------------

const DEV_KEY_ID = "k_dev";

// RFC 8032 Ed25519 private key from a fixed seed, wrapped as PKCS#8 DER. The
// 16-byte prefix is the standard PKCS#8 header for an Ed25519 OneAsymmetricKey.
const DEV_SEED = Buffer.alloc(32, 7); // fixed, obviously-non-secret seed
const PKCS8_ED25519_PREFIX = Buffer.from("302e020100300506032b657004220420", "hex");

function devKeyPair(): { privateKey: KeyObject; publicKey: KeyObject } {
  const der = Buffer.concat([PKCS8_ED25519_PREFIX, DEV_SEED]);
  const privateKey = createPrivateKey({ key: der, format: "der", type: "pkcs8" });
  return { privateKey, publicKey: createPublicKey(privateKey) };
}

const DEV = devKeyPair();

/** Parse a public key supplied as PEM or base64-encoded SPKI DER. */
function loadPublicKey(raw: string): KeyObject {
  const trimmed = raw.trim();
  if (trimmed.includes("BEGIN PUBLIC KEY")) {
    return createPublicKey({ key: trimmed, format: "pem" });
  }
  return createPublicKey({ key: Buffer.from(trimmed, "base64"), format: "der", type: "spki" });
}

/**
 * The keyring: issuerKeyId → public key. Verification fails closed on an
 * unknown issuerKeyId. Additional issuer keys load from the environment:
 *   GUARD_ISSUER_PUBKEY_<issuerKeyId> = <PEM or base64 SPKI DER>
 * A malformed key is skipped — an unparseable key must never silently become a
 * trusted issuer.
 */
function buildKeyring(): Map<string, KeyObject> {
  const ring = new Map<string, KeyObject>();
  ring.set(DEV_KEY_ID, DEV.publicKey);
  for (const [name, value] of Object.entries(process.env)) {
    if (!name.startsWith("GUARD_ISSUER_PUBKEY_") || !value) continue;
    const issuerKeyId = name.slice("GUARD_ISSUER_PUBKEY_".length);
    if (!issuerKeyId) continue;
    try {
      ring.set(issuerKeyId, loadPublicKey(value));
    } catch {
      // Skip — fail closed on use.
    }
  }
  return ring;
}

const keyring = buildKeyring();

/** The canonical payload that gets signed. Order is fixed and signature-excluded. */
export function canonicalPayload(m: Omit<Mandate, "signature">): string {
  return [
    m.mandateId,
    m.subject,
    m.amount.toFixed(2),
    m.currency,
    String(m.expiresAt),
    m.issuerKeyId,
  ].join("|");
}

/**
 * Produce a genuine Ed25519 signature over the canonical payload, signed by the
 * DEV/TEST private key. Used by tests to mint real `k_dev` mandates. Throws for
 * any other issuer — there is no production private key in this template, by
 * design (the guard verifies; it never issues).
 */
export function signMandate(m: Omit<Mandate, "signature">): string {
  if (m.issuerKeyId !== DEV_KEY_ID) {
    throw new Error(
      `signMandate is a test helper for '${DEV_KEY_ID}' only; no private key for '${m.issuerKeyId}'`,
    );
  }
  return sign(null, Buffer.from(canonicalPayload(m), "utf8"), DEV.privateKey).toString("base64");
}

/**
 * Verify a mandate signature with real Ed25519 public-key verification.
 * Fail-closed: unknown issuer, missing/malformed signature, any thrown error,
 * or a cryptographic mismatch all return false. Never throws.
 */
export function verifySignature(m: Mandate): boolean {
  try {
    if (!m.signature || typeof m.signature !== "string") return false;
    const pub = keyring.get(m.issuerKeyId);
    if (!pub) return false; // unknown issuerKeyId → fail closed
    const data = Buffer.from(
      canonicalPayload({
        mandateId: m.mandateId,
        subject: m.subject,
        amount: m.amount,
        currency: m.currency,
        expiresAt: m.expiresAt,
        issuerKeyId: m.issuerKeyId,
      }),
      "utf8",
    );
    const sig = Buffer.from(m.signature, "base64");
    if (sig.length !== 64) return false; // Ed25519 signatures are exactly 64 bytes
    return verify(null, data, pub, sig);
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// The verify pipeline.
// ---------------------------------------------------------------------------

const REQUIRED_FIELDS: (keyof Mandate)[] = [
  "mandateId",
  "subject",
  "amount",
  "currency",
  "expiresAt",
  "issuerKeyId",
  "signature",
];

function reject(reason: string): VerifyResult {
  return { verdict: "reject", reason };
}

export interface VerifyOptions {
  /** Injectable clock (ms) for deterministic tests; defaults to Date.now(). */
  now?: number;
  /** Single-use replay guard: true if this mandate id was already consumed. */
  isConsumed?: (mandateId: string) => boolean;
}

/** Verify a mandate against a proposed charge. FAIL CLOSED at every gate. */
export function verifyMandate(
  mandate: Mandate,
  charge: Charge,
  opts: VerifyOptions = {},
): VerifyResult {
  const now = opts.now ?? Date.now();

  // Gate 0: well-formed. Missing/blank fields are a reject, never a pass.
  for (const f of REQUIRED_FIELDS) {
    const v = mandate[f];
    if (v === undefined || v === null || v === "") {
      return reject(`malformed mandate: missing field '${String(f)}'`);
    }
  }
  if (typeof mandate.amount !== "number" || !Number.isFinite(mandate.amount) || mandate.amount <= 0) {
    return reject(`malformed mandate: invalid amount '${String(mandate.amount)}'`);
  }
  if (typeof mandate.expiresAt !== "number" || !Number.isFinite(mandate.expiresAt)) {
    return reject(`malformed mandate: invalid expiresAt '${String(mandate.expiresAt)}'`);
  }

  // Gate 1: the mandate must be the one this charge references.
  if (mandate.mandateId !== charge.mandateId) {
    return reject(
      `mandate/charge id mismatch: mandate=${mandate.mandateId} charge=${charge.mandateId}`,
    );
  }

  // Gate 2: single-use. A consumed mandate is never re-verifiable (replay).
  if (opts.isConsumed?.(mandate.mandateId)) {
    return reject(`replay: mandate ${mandate.mandateId} already consumed`);
  }

  // Gate 3: signed. Real Ed25519 public-key verification.
  if (!verifySignature(mandate)) {
    return reject(`signature invalid for issuer key '${mandate.issuerKeyId}'`);
  }

  // Gate 4: unexpired. A past (or exactly-now) expiry is a reject.
  if (mandate.expiresAt <= now) {
    return reject(`mandate expired: expiresAt=${mandate.expiresAt} <= now=${now}`);
  }

  // Gate 5: amount + currency match exactly.
  if (charge.currency !== mandate.currency) {
    return reject(`currency mismatch: mandate=${mandate.currency} charge=${charge.currency}`);
  }
  if (charge.amount !== mandate.amount) {
    return reject(
      `amount mismatch: mandate=${mandate.amount.toFixed(2)} ${mandate.currency} ` +
        `charge=${charge.amount.toFixed(2)} ${charge.currency}`,
    );
  }

  return {
    verdict: "verified",
    reason:
      `mandate ${mandate.mandateId} signed, unexpired (expires ${mandate.expiresAt}), ` +
      `amount matches ${mandate.amount.toFixed(2)} ${mandate.currency}`,
  };
}
