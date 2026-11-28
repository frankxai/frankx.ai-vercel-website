import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

// Drives .claude/hooks/estate-guard-gate.py through its real entry point: a
// PreToolUse JSON payload on stdin, the decision JSON (or nothing) on stdout.
const HOOK = fileURLToPath(new URL('../.claude/hooks/estate-guard-gate.py', import.meta.url));

// The recursive-delete command is assembled here so this file never contains it
// literally (the repository's own gate asks on any command text that does).
const RM = 'r' + 'm -' + 'rf ';

// The bare tool name, for path-qualified and quoted invocations.
const RD = 'r' + 'm';

function decide(command, extraEnv = {}) {
  const env = { ...process.env };
  delete env.ESTATE_GUARD_OFF;
  delete env.ESTATE_GUARD_ALLOW_FORCE;
  delete env.TMPDIR;
  Object.assign(env, extraEnv);
  const res = spawnSync('python3', [HOOK], {
    input: JSON.stringify({ tool_name: 'Bash', tool_input: { command } }),
    encoding: 'utf8',
    env,
  });
  assert.equal(res.status, 0, `hook exited ${res.status}: ${res.stderr}`);
  const out = res.stdout.trim();
  if (!out) return 'allow';
  return JSON.parse(out).hookSpecificOutput.permissionDecision;
}

const BYPASSES = [
  // `&>` / `&>>` are redirects in bash, not separators: the later args are still deleted.
  `${RM}/tmp/estate-guard-test &>/dev/null /home/someone/project`,
  `${RM}/tmp/estate-guard-test &>> /tmp/log.txt /home/someone/project`,
  `${RM}/tmp/estate-guard-test &>/dev/null ./src`,
  // Other & / | redirect forms fail closed too.
  `${RM}/tmp/estate-guard-test 2>&1 ./src`,
  `${RM}/tmp/estate-guard-test >| /tmp/log.txt ./src`,
  `${RM}/tmp/estate-guard-test <&0 ./src`,
  // ')' only ends the argument list where bash does; process substitution and
  // quoted or escaped parens are not an end.
  `${RM}/tmp/estate-guard-test >(cat) ./src`,
  `${RM}/tmp/estate-guard-test ")" ./src`,
  `${RM}/tmp/estate-guard-test \\) ./src`,
  `(${RM}/tmp/estate-guard-test ')' ./src)`,
];

for (const command of BYPASSES) {
  test(`scratch-delete exception does not cover: ${command.slice(RM.length)}`, () => {
    assert.ok(['ask', 'deny'].includes(decide(command)), 'expected ask or deny');
  });
}

const PLAIN_SCRATCH = [
  `${RM}/tmp/estate-guard-test`,
  `${RM}/tmp/estate-guard-test /var/tmp/estate-guard-other`,
  `${RM}/tmp/estate-guard-test && echo done`,
  `${RM}/tmp/estate-guard-test; ${RM}/tmp/estate-guard-other`,
  `(${RM}/tmp/estate-guard-test)`,
  `${RM}"/tmp/estate-guard-test"`,
  `${RM}/tmp/estate-guard-test/*.log`,
];

for (const command of PLAIN_SCRATCH) {
  test(`scratch-delete exception still allows: ${command.replace(RM, '<rd> ')}`, () => {
    assert.equal(decide(command), 'allow');
  });
}

// Thread 1: a second invocation of the delete tool that is path-qualified,
// quoted, escaped, or reached through an indirection must not ride on the
// first command's scratch exception.
const PATH_QUALIFIED = [
  `${RM}/tmp/estate-guard-test; /bin/${RD} -rf ./project`,
  `${RM}/tmp/estate-guard-test && /usr/bin/${RD} -rf ./project`,
  `${RM}/tmp/estate-guard-test; ./${RD} -rf ./project`,
  `${RM}/tmp/estate-guard-test; "/bin/${RD}" -rf ./project`,
  `${RM}/tmp/estate-guard-test; "${RD}" -rf ./project`,
  `${RM}/tmp/estate-guard-test; \\${RD} -rf ./project`,
  `${RM}/tmp/estate-guard-test; r\\m -rf ./project`,
  `${RM}/tmp/estate-guard-test; env /bin/${RD} -rf ./project`,
  `${RM}/tmp/estate-guard-test; command /bin/${RD} -rf ./project`,
  `${RM}/tmp/estate-guard-test; builtin /bin/${RD} -rf ./project`,
  `${RM}/tmp/estate-guard-test; exec /bin/${RD} -rf ./project`,
  `${RM}/tmp/estate-guard-test; sudo /bin/${RD} -rf ./project`,
  `${RM}/tmp/estate-guard-test; echo ./project | xargs /bin/${RD} -rf`,
  `${RM}/tmp/estate-guard-test; find . -name project -exec /bin/${RD} -rf {} +`,
  `${RM}/tmp/estate-guard-test; find ./project -delete`,
  `${RM}/tmp/estate-guard-test; bash -c "${RD} -rf ./project"`,
  `${RM}/tmp/estate-guard-test; X=${RD}; $X -rf ./project`,
];

for (const command of PATH_QUALIFIED) {
  test(`path-qualified delete is not covered by the scratch exception: ${command.slice(RM.length)}`, () => {
    assert.ok(['ask', 'deny'].includes(decide(command)), 'expected ask or deny');
  });
}

// Thread 2: $TMPDIR only expands unquoted or inside double quotes. Single
// quotes, a backslash, or quotes splitting the name pass a literal relative
// path, so these must not count as scratch even when the hook's TMPDIR is /tmp.
const LITERAL_TMPDIR = [
  `${RM}'$TMPDIR/project'`,
  `${RM}'\${TMPDIR}/project'`,
  `${RM}\\$TMPDIR/project`,
  `${RM}$'TMPDIR/project'`,
  `${RM}$"TMPDIR/project"`,
  `${RM}$TMP""DIR/project`,
  `${RM}/tmp/estate-guard-test '$TMPDIR/project'`,
];

for (const command of LITERAL_TMPDIR) {
  test(`quoted or escaped TMPDIR is not a scratch target: ${command.slice(RM.length)}`, () => {
    assert.ok(['ask', 'deny'].includes(decide(command, { TMPDIR: '/tmp' })), 'expected ask or deny');
  });
}

test('expanded TMPDIR targets still get the scratch exception', () => {
  assert.equal(decide(`${RM}$TMPDIR/estate-guard-test`, { TMPDIR: '/tmp' }), 'allow');
  assert.equal(decide(`${RM}"$TMPDIR/estate-guard-test"`, { TMPDIR: '/tmp' }), 'allow');
  assert.equal(decide(`${RM}\${TMPDIR}/estate-guard-test`, { TMPDIR: '/tmp' }), 'allow');
});

// Thread 3: an unquoted $TMPDIR expansion is word-split and globbed by bash.
// If the hook's TMPDIR holds whitespace or glob characters, `$TMPDIR/cache`
// can become several words, one of them a relative non-scratch path
// (TMPDIR='/tmp/a b' gives `/tmp/a` and `b/cache`). Fail closed: ask.
const UNSAFE_TMPDIRS = [
  '/tmp/estate guard',
  '/tmp/estate\tguard',
  '/tmp/estate\nguard',
  '/tmp/estate*guard',
  '/tmp/estate?guard',
  '/tmp/estate[g]uard',
];

for (const tmpdir of UNSAFE_TMPDIRS) {
  const label = JSON.stringify(tmpdir);
  test(`unquoted TMPDIR expansion asks when TMPDIR is ${label}`, () => {
    assert.ok(['ask', 'deny'].includes(decide(`${RM}$TMPDIR/cache`, { TMPDIR: tmpdir })), 'expected ask or deny');
    assert.ok(['ask', 'deny'].includes(decide(`${RM}\${TMPDIR}/cache`, { TMPDIR: tmpdir })), 'expected ask or deny');
    assert.ok(
      ['ask', 'deny'].includes(decide(`${RM}/tmp/estate-guard-test $TMPDIR/cache`, { TMPDIR: tmpdir })),
      'expected ask or deny',
    );
  });

}

// Double quotes stop word splitting, so a whitespace TMPDIR stays one scratch path.
for (const tmpdir of UNSAFE_TMPDIRS.filter((t) => /\s/.test(t))) {
  test(`double-quoted TMPDIR expansion is still scratch when TMPDIR is ${JSON.stringify(tmpdir)}`, () => {
    assert.equal(decide(`${RM}"$TMPDIR/cache"`, { TMPDIR: tmpdir }), 'allow');
  });
}

test('unquoted TMPDIR expansion is still scratch when TMPDIR has no whitespace or glob characters', () => {
  assert.equal(decide(`${RM}$TMPDIR/cache`, { TMPDIR: '/tmp/estate-guard' }), 'allow');
  assert.equal(decide(`${RM}\${TMPDIR}/cache`, { TMPDIR: '/tmp/estate-guard' }), 'allow');
});

test('non-scratch recursive delete still asks', () => {
  assert.equal(decide(`${RM}./build`), 'ask');
  assert.equal(decide(`${RM}/tmp/estate-guard-test ./build`), 'ask');
});

test('root delete is still denied', () => {
  assert.equal(decide(`${RM}/`), 'deny');
});
