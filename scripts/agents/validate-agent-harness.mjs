#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { readRegistry } from './repo-registry.mjs';

const root = process.cwd();
const userHome = os.homedir();
const schemaPath = path.join(root, 'schemas', 'agent-harness.schema.json');
const allowedRisk = new Set(['production', 'private', 'library', 'template', 'sensitive']);
const allowedDeployPolicy = new Set(['manual', 'none', 'vercel-main']);
const allowedOptional = new Set([
  'status',
  'owner',
  'canonicalAlias',
  'intent',
  'defaultBranch',
  'dataSensitivity',
  'reviewLane',
  'lastVerified',
  'pushPolicy',
  'publishSurfaces',
  'globalHooks',
]);
const allowedStatus = new Set(['active', 'dormant', 'archive', 'archive-candidate', 'template', 'fork']);
const allowedDataSensitivity = new Set(['public', 'private', 'secrets', 'financial', 'wallet', 'legal', 'copyright']);
const allowedReviewLane = new Set(['agent-substrate', 'production-brand', 'library-template', 'estate-classify', 'dormant']);

function readJson(file) {
  try {
    return JSON.parse(readFileSync(file, 'utf8'));
  } catch (error) {
    return { __parseError: error.message };
  }
}

function validateManifest(file) {
  const errors = [];
  if (!existsSync(file)) return [`${file}: missing manifest`];
  const data = readJson(file);
  if (data.__parseError) return [`${file}: invalid JSON: ${data.__parseError}`];
  if (!data || typeof data !== 'object' || Array.isArray(data)) errors.push('root must be an object');

  const required = ['risk', 'health', 'agentFiles', 'deployPolicy', 'globalHooksAllowed'];
  for (const key of required) {
    if (!(key in data)) errors.push(`missing required field: ${key}`);
  }
  const extra = Object.keys(data).filter((key) => !required.includes(key) && !allowedOptional.has(key));
  for (const key of extra) errors.push(`unknown field: ${key}`);

  if (!allowedRisk.has(data.risk)) errors.push(`risk must be one of ${[...allowedRisk].join(', ')}`);
  if (typeof data.health !== 'string' || data.health.trim() === '') errors.push('health must be a non-empty string');
  if (!Array.isArray(data.agentFiles)) {
    errors.push('agentFiles must be an array');
  } else {
    const seen = new Set();
    for (const fileName of data.agentFiles) {
      if (typeof fileName !== 'string' || fileName.trim() === '') errors.push('agentFiles entries must be non-empty strings');
      if (seen.has(fileName)) errors.push(`duplicate agentFiles entry: ${fileName}`);
      seen.add(fileName);
    }
  }
  if (!allowedDeployPolicy.has(data.deployPolicy)) errors.push(`deployPolicy must be one of ${[...allowedDeployPolicy].join(', ')}`);
  if (data.globalHooksAllowed !== false) errors.push('globalHooksAllowed must be false');
  if ('status' in data && !allowedStatus.has(data.status)) errors.push(`status must be one of ${[...allowedStatus].join(', ')}`);
  if ('owner' in data && (typeof data.owner !== 'string' || data.owner.trim() === '')) errors.push('owner must be a non-empty string');
  if ('canonicalAlias' in data && typeof data.canonicalAlias !== 'string') errors.push('canonicalAlias must be a string');
  if ('intent' in data && (typeof data.intent !== 'string' || data.intent.trim() === '')) errors.push('intent must be a non-empty string');
  if ('defaultBranch' in data && (typeof data.defaultBranch !== 'string' || data.defaultBranch.trim() === '')) errors.push('defaultBranch must be a non-empty string');
  if ('dataSensitivity' in data && !allowedDataSensitivity.has(data.dataSensitivity)) {
    errors.push(`dataSensitivity must be one of ${[...allowedDataSensitivity].join(', ')}`);
  }
  if ('reviewLane' in data && !allowedReviewLane.has(data.reviewLane)) {
    errors.push(`reviewLane must be one of ${[...allowedReviewLane].join(', ')}`);
  }
  if ('lastVerified' in data && !/^\d{4}-\d{2}-\d{2}$/.test(data.lastVerified)) errors.push('lastVerified must be YYYY-MM-DD');
  if ('publishSurfaces' in data && !Array.isArray(data.publishSurfaces)) errors.push('publishSurfaces must be an array');
  if ('pushPolicy' in data && (!data.pushPolicy || typeof data.pushPolicy !== 'object' || Array.isArray(data.pushPolicy))) {
    errors.push('pushPolicy must be an object');
  }
  if ('globalHooks' in data && data.globalHooks !== false) {
    if (!data.globalHooks || typeof data.globalHooks !== 'object' || Array.isArray(data.globalHooks)) {
      errors.push('globalHooks must be false or an object');
    } else {
      if (!Array.isArray(data.globalHooks.events)) errors.push('globalHooks.events must be an array');
      if (!Number.isInteger(data.globalHooks.maxTimeoutMs) || data.globalHooks.maxTimeoutMs < 1 || data.globalHooks.maxTimeoutMs > 2000) {
        errors.push('globalHooks.maxTimeoutMs must be an integer from 1 to 2000');
      }
      if (!['telemetry-only', 'context-load'].includes(data.globalHooks.scope)) errors.push('globalHooks.scope is invalid');
    }
  }

  return errors.map((error) => `${file}: ${error}`);
}

function registryManifestPaths() {
  return readRegistry().repos
    .filter((repo) => /active|dormant|archive-candidate|template|fork/i.test(repo.status))
    .map((repo) => path.join(userHome, repo.name, '.agent-harness.json'));
}

if (!existsSync(schemaPath)) {
  console.error(`Missing schema: ${schemaPath}`);
  process.exit(1);
}

const mode = process.argv[2] || 'local';
const files = mode === '--all'
  ? registryManifestPaths()
  : [path.join(root, '.agent-harness.json')];

const failures = files.flatMap(validateManifest);
if (failures.length > 0) {
  console.error('Agent harness manifest validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Agent harness manifest validation passed (${files.length} manifest${files.length === 1 ? '' : 's'}).`);
