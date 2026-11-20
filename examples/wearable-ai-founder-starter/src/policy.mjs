import { timingSafeEqual } from 'node:crypto';

export class PolicyError extends Error {
  constructor(status, code) { super(code); this.status = status; this.code = code; }
}
export function requireThat(condition, status, code) {
  if (!condition) throw new PolicyError(status, code);
}
export function sameSecret(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const left = Buffer.from(a), right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

// Server registry is deliberately conservative. These are OUR MOCK PROFILES,
// not SDK API names, device attestations or claims of vendor compatibility.
export const profiles = Object.freeze({
  'mock-audio-camera': Object.freeze({ camera: true, audioOutput: true, display: false }),
  'mock-display-camera': Object.freeze({ camera: true, audioOutput: true, display: true }),
  'mock-audio-only': Object.freeze({ camera: false, audioOutput: true, display: false })
});

export function negotiate(deviceId, requested) {
  requireThat(typeof deviceId === 'string' && Object.hasOwn(profiles, deviceId), 422, 'unknown_device_profile');
  const registered = profiles[deviceId];
  requireThat(requested && typeof requested === 'object' && !Array.isArray(requested), 400, 'capabilities_required');
  for (const [key, value] of Object.entries(requested)) {
    requireThat(Object.hasOwn(registered, key) && typeof value === 'boolean', 400, 'invalid_capability');
    requireThat(!value || registered[key], 422, 'unsupported_capability');
  }
  return Object.fromEntries(Object.entries(registered).map(([key, allowed]) => [key, allowed && Object.hasOwn(requested, key) && requested[key] === true]));
}

export const MAX_IMAGE_BYTES = 768 * 1024;
export function validateImage(dataUrl) {
  requireThat(typeof dataUrl === 'string', 400, 'image_required');
  const match = /^data:image\/(png|jpeg);base64,([A-Za-z0-9+/]+={0,2})$/.exec(dataUrl);
  requireThat(match && match[2].length % 4 === 0, 400, 'invalid_image_encoding');
  const bytes = Buffer.from(match[2], 'base64');
  requireThat(bytes.length > 0 && bytes.length <= MAX_IMAGE_BYTES, 413, 'image_too_large');
  requireThat(bytes.toString('base64') === match[2], 400, 'noncanonical_base64');
  const signature = match[1] === 'png'
    ? bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
    : bytes.length >= 4 && bytes[0] === 255 && bytes[1] === 216 && bytes.at(-2) === 255 && bytes.at(-1) === 217;
  requireThat(signature, 400, 'invalid_image_signature');
  // Header and size validation are not a full image decoder, malware scan,
  // EXIF removal, face redaction or decompression-bomb protection.
  return { dataUrl, bytes: bytes.length };
}

export function validateCapture(body, now, mode) {
  requireThat(body && typeof body === 'object' && !Array.isArray(body), 400, 'object_required');
  const capabilities = negotiate(body.deviceId, body.capabilities);
  requireThat(capabilities.camera, 422, 'camera_unavailable');
  requireThat(typeof body.instruction === 'string' && body.instruction.trim().length > 0 && body.instruction.length <= 2000, 400, 'invalid_instruction');
  const consent = body.consent;
  requireThat(consent?.capture === true && consent?.purpose === 'repair-note', 403, 'capture_consent_required');
  const grantedAt = Date.parse(consent.grantedAt);
  requireThat(Number.isFinite(grantedAt) && now - grantedAt >= 0 && now - grantedAt <= 300000, 403, 'fresh_consent_required');
  requireThat(mode !== 'openai' || consent.cloudInference === true, 403, 'cloud_consent_required');
  return { capabilities, image: validateImage(body.image), instruction: body.instruction.trim() };
}
