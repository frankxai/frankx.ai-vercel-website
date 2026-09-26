import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

// New contract: no prior test on main. Title carries [contract-change] so the
// guard can land the test with the surface it names.

const read = (rel) => readFileSync(new URL(`../../${rel}`, import.meta.url), 'utf8');

test('library index and collection pages stay static: no searchParams on the server', () => {
  const index = read('app/library/page.tsx');
  const collection = read('app/library/collections/[collection]/page.tsx');
  const explorer = read('components/library/LibraryExplorer.tsx');
  assert.doesNotMatch(index, /searchParams/);
  assert.doesNotMatch(collection, /searchParams/);
  assert.match(index, /export const metadata/);
  assert.match(index, /<h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">The Library<\/h1>/);
  assert.match(collection, /generateStaticParams/);
  assert.match(explorer, /syncFromUrl\(\)/);
  assert.doesNotMatch(explorer, /initial\?:/);
});
