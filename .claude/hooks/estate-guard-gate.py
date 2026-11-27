#!/usr/bin/env python3
"""PreToolUse hook on Bash — the deterministic hard-stop gate.

Two tiers, matched against the command string:

  DENY  — catastrophic and irreversible: force-push to main/master, recursive
          delete of / ~ or $HOME, curl|sh, permission-bypass flags, history
          rewrites pushed, secret deletion, DROP/TRUNCATE in a db shell,
          writes to the global Claude settings.
  ASK   — risky but legitimate with a human: direct push to main, reset --hard,
          clean -fd, any rm -rf, unpinned remote execution (npx -y, @latest),
          production deploys, db pushes, DELETE API calls, secret writes.

Scratch-delete exception (recursive delete only): the 'recursive delete' ASK is
skipped when EVERY rm invocation in the command deletes only scratch targets,
so an unattended agent cleaning its own sandbox is not paused for hours. A
scratch target is an absolute path under /tmp/, /var/tmp/, /private/tmp/,
$TMPDIR/ or ${TMPDIR}/ with at least one real segment after that prefix, made
only of plain path characters (no '..', no '$(' or backtick, no other $
expansion, no braces, quotes-inside-path, ~ or spaces), whose first segment is
not a bare glob (so /tmp, /tmp/ and /tmp/* still ask), with no glob before the
final segment, and whose literal path does not resolve through a symlink to
outside the scratch roots. A $TMPDIR target counts only when the hook's own
TMPDIR is set and resolves to a scratch root (the expanded path is then checked
like a literal one) AND the command does not itself assign TMPDIR anywhere
(inline prefix, export, declare, env, set, unset, ...) AND the target is typed
exactly as $TMPDIR/... or "$TMPDIR/..." (single quotes, a backslash, $'...',
$"..." or quotes inside the name pass a literal path, so they ask; the unquoted
form also asks when the hook's TMPDIR contains whitespace or glob characters,
since bash would split or glob the expansion). A command that
names the delete tool any other way than the bare unquoted word `rm` (/bin/rm,
./rm, "rm", \\rm, X=rm, a quoted bash -c script) or uses find -delete/-exec/-ok
gets no exception. A command that
also runs `ln`/`mount`, or contains a redirect with & or | (&>, &>>, >&, <&, >|),
gets no exception; an rm's arguments end only at an unquoted separator. Relative paths (`cd /tmp && rm -rf x`),
~, $HOME, anything else, or a single non-scratch target in any rm still ASK.
The root/home DENY runs first and is unchanged; every other ASK rule still fires
even when the command also contains a scratch rm. Leading VAR=value prefixes
and sudo/doas/env/command/exec/nohup/nice/time wrappers (with their options)
are looked through; xargs, find -exec, bash -c, aliases and functions are not
(a bare `rm` after xargs is vetted like any other and has no scratch target).
Agents: delete scratch with an
absolute /tmp path. This is an accident gate, not an adversarial sandbox.

Anything else passes untouched. Malformed input passes (fail-open): this is a
deny-list gate, not an allow-list, and a hook that blocks every Bash call on a
parse error is worse than no hook.

Env:
  ESTATE_GUARD_OFF=1          disable for the session
  ESTATE_GUARD_ALLOW_FORCE=1  downgrade the force-push deny to ask (own branch work)
"""
from __future__ import annotations

import json
import os
import re
import sys

# A command position: start of line, after a separator, or inside a substitution.
# Keeps `echo "never run rm -rf /"` from tripping the gate.
CMD = r"(?:^|[;&|]\s*|\(\s*|\$\(\s*|`\s*|&&\s*|\|\|\s*)(?:sudo\s+)?"

DENY = [
    (r"git\s+push\b[^|;&]*\s(?:--force|-f|--force-with-lease)\b[^|;&]*\b(?:main|master|production)\b", "force-push to a protected branch"),
    (r"git\s+push\b[^|;&]*\b(?:main|master|production)\b[^|;&]*\s(?:--force|-f|--force-with-lease)\b", "force-push to a protected branch"),
    (r"git\s+push\b[^|;&]*--mirror", "mirror push rewrites every ref on the remote"),
    (CMD + r"rm\s+-[a-zA-Z]*r[a-zA-Z]*\s+(?:-[a-zA-Z]+\s+)*(?:/|~|\$HOME|\"\$HOME\"|\$\{HOME\}|/home/[^/\s]+|/Users/[^/\s]+)(?:/\*)?(?:\s|$|\")", "recursive delete of a root or home directory"),
    (r"\b(?:curl|wget)\b[^|]*\|\s*(?:sudo\s+)?(?:ba|z|da)?sh\b", "piping a download into a shell"),
    (r"\biwr\b[^|]*\|\s*iex\b", "piping a download into a shell"),
    (r"--dangerously-skip-permissions|--dangerously-disable-sandbox|bypassPermissions", "permission bypass"),
    (r"\bgit\s+filter-(?:branch|repo)\b", "history rewrite"),
    (r"\bgh\s+secret\s+(?:delete|remove)\b", "deleting a repository secret"),
    (r"\b(?:psql|supabase\s+db|mysql|sqlite3)\b[^|;&]*\b(?:DROP\s+(?:TABLE|DATABASE|SCHEMA)|TRUNCATE)\b", "destructive SQL"),
    (r"(?:>|>>|tee)\s*\"?(?:~|\$HOME|\$\{HOME\})/\.claude/settings\.json", "writing the global Claude settings"),
    (r"\bchmod\s+(?:-R\s+)?(?:777|a\+rwx|o\+w)\b", "world-writable permissions"),
]
ASK = [
    (r"git\s+push\b(?![^|;&]*--dry-run)[^|;&]*\s(?:origin|upstream)\s+(?:main|master|production)\b", "direct push to a protected branch"),
    (r"git\s+push\b[^|;&]*\s(?:--force|-f|--force-with-lease)\b", "force-push"),
    (r"git\s+reset\s+--hard\b", "discarding working-tree changes"),
    (r"git\s+clean\s+-[a-zA-Z]*f", "deleting untracked files"),
    (r"git\s+branch\s+-D\b|git\s+push\b[^|;&]*--delete\b", "deleting a branch"),
    (CMD + r"rm\s+-[a-zA-Z]*r", "recursive delete"),
    (r"\b(?:npx|pnpm\s+dlx|bunx)\s+(?:-y\s+)?[^\s]+@latest\b|\b(?:npx|bunx)\s+-y\s+[^\s@]+(?:\s|$)|\buvx\s+[^\s@]+(?:\s|$)|\bpipx\s+run\b", "executing an unpinned remote package"),
    (r"\bvercel\b[^|;&]*(?:--prod\b|\bpromote\b|\brollback\b|\benv\s+(?:rm|add)\b)", "production deploy or environment change"),
    (r"\bsupabase\s+(?:db\s+push|db\s+reset|migration\s+up)\b", "database migration against a project"),
    (r"\bgh\s+api\b[^|;&]*-X\s*DELETE\b|\bgh\s+(?:repo|release)\s+delete\b", "DELETE call to the GitHub API"),
    (r"\bgh\s+secret\s+set\b", "writing a repository secret"),
    (r"\b(?:resend|sendgrid|mailchimp)\b[^|;&]*\b(?:send|broadcast|campaign)\b", "sending email to people"),
]


# Command wrappers and inline VAR=value prefixes are stripped (procedurally, in
# linear time; a regex for this backtracks exponentially) before the rules run a
# second time, so `TMPDIR=/ rm -rf x`, `env -u X rm -rf x`, `nice -n 5 rm -rf x`
# and `sudo -u root rm -rf /` are still seen as an rm at command position.
# Stripping only removes leading words, so it can add matches, never hide one.
WRAPPER_OPERAND_FLAGS = {
    "sudo": {"-u", "-g", "-C", "-D", "-h", "-p", "-r", "-t", "-T", "-U", "--user", "--group",
             "--close-from", "--chdir", "--host", "--prompt", "--role", "--type", "--command-timeout", "--other-user"},
    "doas": {"-u", "-C"},
    "env": {"-u", "-C", "-S", "--unset", "--chdir", "--split-string"},
    "nice": {"-n", "--adjustment"},
    "time": {"-o", "-f", "--output", "--format"},
    "command": set(),
    "exec": {"-a"},
    "nohup": set(),
}
CMD_SEPARATOR = re.compile(r"(\$\(|[;&|\n(`])")
ASSIGNMENT = re.compile(r"\w+(?:\+)?=")


def _strip_wrappers(cmd: str) -> str:
    out = []
    for piece in CMD_SEPARATOR.split(cmd):
        if not piece or CMD_SEPARATOR.fullmatch(piece):
            out.append(piece)
            continue
        words = piece.split()
        i, wrapper = 0, None
        while i < len(words):
            w = words[i]
            if w in WRAPPER_OPERAND_FLAGS:
                wrapper = w
            elif wrapper and w.startswith("-") and w != "--":
                if w in WRAPPER_OPERAND_FLAGS[wrapper]:
                    i += 1  # the flag's separate operand
            elif wrapper and w == "--":
                pass
            elif ASSIGNMENT.match(w):
                if w.count('"') % 2 or w.count("'") % 2:  # VAR="a b": skip to the closing quote
                    q = '"' if w.count('"') % 2 else "'"
                    while i + 1 < len(words) and q not in words[i + 1]:
                        i += 1
                    i += 1
            else:
                break
            i += 1
        if i == 0:
            out.append(piece)
        else:
            out.append(" ".join(words[i:]))
    return "".join(out)


RECURSIVE_DELETE = "recursive delete"
# Every standalone `rm` word counts as an invocation, wherever it sits (new
# lines, after xargs/env/\\, inside quotes). Over-matching only removes the
# exception; under-matching would let a second, non-scratch rm through.
RM_AT = re.compile(r"(?<![\w./-])rm(?=\s|$)", re.I)
# Where one rm invocation's arguments end: an UNQUOTED, unescaped separator,
# exactly where bash ends the simple command (see _rm_args). A ')' or ';'
# inside quotes or after a backslash is part of an argument, not an end.
RM_END_CHARS = set(";&|\n)`")
# Redirect operators that contain & or |. `&>` / `&>>` are redirects in bash,
# not separators, so `rm -rf /tmp/x &>/dev/null /home/u` deletes /home/u too.
# Any of these anywhere in the command removes the exception (fail closed).
AMP_PIPE_REDIRECT = re.compile(r"&>|>&|<&|>\|")
LITERAL_SCRATCH_ROOTS = ("/tmp/", "/var/tmp/", "/private/tmp/")
ENV_SCRATCH_ROOTS = ("$TMPDIR/", "${TMPDIR}/")
SAFE_REST = re.compile(r"[A-Za-z0-9._@%+=:,/*?-]+")
GLOB_ONLY = re.compile(r"[.*?]+")
LINKERS = re.compile(r"(?:^|[^\w-])(?:ln|mount|bindfs)\s", re.I)
# Any bare TMPDIR word that is not an expansion ($TMPDIR, ${TMPDIR}) is treated
# as a reassignment: inline prefix (TMPDIR=x rm), export/declare/typeset/local/
# readonly/env/set TMPDIR=x, TMPDIR+=x, unset TMPDIR, read TMPDIR, for TMPDIR in.
TMPDIR_WRITE = re.compile(r"(?<![$\w{])TMPDIR(?!\w)")
# Characters in the hook's TMPDIR that make an UNQUOTED $TMPDIR expansion split
# into several words (default IFS) or glob-expand into other paths.
UNSAFE_UNQUOTED_TMPDIR = re.compile(r"[\s*?\[]")
# Where a shell word ends (unquoted). Used to split the whole command and each
# rm argument list into words while keeping each word's raw (quoted) text.
WORD_BREAK = set(" \t\n;&|()<>`")
# Pieces of a word's unquoted value. A word whose value contains the delete
# tool's name as a piece (`/bin/rm`, `./rm`, `"rm"`, `\rm`, `X=rm`, a quoted
# `bash -c "...; rm ..."` script) is an invocation RM_AT cannot see or vet, so
# its presence removes the exception. Only the bare unquoted word `rm` is vetted.
WORD_PIECE = re.compile(r"[^A-Za-z0-9_.-]+")
# find actions that delete or run another program on what find matches.
FIND_ACTIONS = {"-delete", "-exec", "-execdir", "-ok", "-okdir"}


def _under_scratch(path: str) -> bool:
    """The literal part of the path (before any glob) must resolve inside a scratch root."""
    parts = path.split("/")
    for i, part in enumerate(parts):
        if any(c in part for c in "*?"):
            parts = parts[:i]
            break
    resolved = os.path.realpath("/".join(parts) or "/")
    for root in LITERAL_SCRATCH_ROOTS:
        real_root = os.path.realpath(root.rstrip("/"))
        if resolved.startswith(real_root + "/"):
            return True
    return False


def _env_scratch_root() -> str | None:
    """The real path of $TMPDIR from the hook's own environment, if it is a scratch root.

    Unset, empty, relative, or resolving anywhere outside the literal scratch
    roots returns None, so a $TMPDIR target is not treated as scratch.
    """
    value = os.environ.get("TMPDIR", "")
    if not value.startswith("/"):
        return None
    real = os.path.realpath(value)
    for root in LITERAL_SCRATCH_ROOTS:
        real_root = os.path.realpath(root.rstrip("/"))
        if real == real_root or real.startswith(real_root + "/"):
            return real
    return None


def is_scratch_target(target: str, tmpdir_reassigned: bool = False, raw: str | None = None) -> bool:
    """target is the word after quote removal; raw is the word as typed (default: target)."""
    if raw is None:
        raw = target
    if "$(" in target or "`" in target or ".." in target:
        return False
    literal = target.startswith(LITERAL_SCRATCH_ROOTS)
    roots = LITERAL_SCRATCH_ROOTS if literal else ENV_SCRATCH_ROOTS
    root = next((r for r in roots if target.startswith(r)), None)
    if root is None:
        return False
    rest = target[len(root):]
    if not SAFE_REST.fullmatch(rest):
        return False
    segments = [seg for seg in rest.split("/") if seg]
    if not segments or GLOB_ONLY.fullmatch(segments[0]):
        return False
    # A glob is allowed only in the final segment: /tmp/a/*/x can expand into
    # anything the glob matches, including symlinks, before the last segment.
    if any(c in seg for seg in segments[:-1] for c in "*?"):
        return False
    if literal:
        return _under_scratch(target)
    # $TMPDIR target: bash expands it only when the word is typed exactly as
    # $TMPDIR/... or "$TMPDIR/..." (wholly double-quoted). Single quotes, a
    # backslash, $'...' / $"..." or quotes splitting the name ($TMP""DIR) pass
    # a literal relative path or a different variable, so anything else asks.
    if raw != target and raw != '"' + target + '"':
        return False
    # Never trust the literal prefix. If the command itself
    # assigns TMPDIR, the value the shell expands is unknown here, so ask.
    # Otherwise expand with the hook's own TMPDIR, which must be a scratch root.
    if tmpdir_reassigned:
        return False
    # Unquoted, bash word-splits and globs the expanded value: with
    # TMPDIR='/tmp/a b', $TMPDIR/cache becomes `/tmp/a` and the relative
    # `b/cache`. Grant the exception for an unquoted expansion only when the
    # hook's TMPDIR has no whitespace or glob characters (fail closed).
    if raw == target and UNSAFE_UNQUOTED_TMPDIR.search(os.environ.get("TMPDIR", "")):
        return False
    env_root = _env_scratch_root()
    if env_root is None:
        return False
    return _under_scratch(os.path.normpath(env_root + "/" + rest))


def _rm_args(rest: str) -> str | None:
    """The raw argument text of one rm invocation, up to where bash ends it.

    Walks the text honouring single quotes, double quotes and backslash
    escapes, and stops at the first unquoted separator in RM_END_CHARS. An
    unquoted '(' (process substitution, extglob, subshell) returns None so the
    caller gives no exception. An unterminated quote returns the whole rest,
    which shlex then rejects.
    """
    quote = None
    i = 0
    while i < len(rest):
        c = rest[i]
        if quote == "'":
            if c == "'":
                quote = None
        elif c == "\\":
            i += 1  # the escaped character is literal (inside "..." too, close enough)
        elif quote == '"':
            if c == '"':
                quote = None
        elif c in "'\"":
            quote = c
        elif c in RM_END_CHARS:
            return rest[:i]
        elif c == "(":
            return None
        i += 1
    return rest


def _words(text: str) -> list[tuple[str, str]] | None:
    """Split text into shell words as (raw, value) pairs, value being after quote removal.

    Words end at unquoted whitespace or an unquoted character in WORD_BREAK.
    Backslash and quote handling follows bash closely enough for vetting; an
    unterminated quote returns None so the caller gives no exception.
    """
    words: list[tuple[str, str]] = []
    raw: list[str] = []
    val: list[str] = []
    quote = None
    i, n = 0, len(text)
    while i < n:
        c = text[i]
        if quote == "'":
            raw.append(c)
            if c == "'":
                quote = None
            else:
                val.append(c)
        elif quote == '"':
            raw.append(c)
            if c == '"':
                quote = None
            elif c == "\\" and i + 1 < n:
                i += 1
                nxt = text[i]
                raw.append(nxt)
                if nxt in '$`"\\':
                    val.append(nxt)
                elif nxt != "\n":
                    val.append("\\" + nxt)
            else:
                val.append(c)
        elif c == "\\":
            raw.append(c)
            if i + 1 < n:
                i += 1
                raw.append(text[i])
                if text[i] != "\n":
                    val.append(text[i])
        elif c in "'\"":
            raw.append(c)
            quote = c
        elif c in WORD_BREAK:
            if raw:
                words.append(("".join(raw), "".join(val)))
                raw, val = [], []
        else:
            raw.append(c)
            val.append(c)
        i += 1
    if quote:
        return None
    if raw:
        words.append(("".join(raw), "".join(val)))
    return words


def _unvetted_delete(words: list[tuple[str, str]]) -> bool:
    """True if any word may invoke a delete that the per-rm vetting cannot see.

    That is a word naming the delete tool other than the bare unquoted `rm`
    (path-qualified, quoted, escaped, assigned to a variable, inside a quoted
    script), or a find action that deletes or runs a program (-delete, -exec).
    """
    for raw, value in words:
        if value.lower() in FIND_ACTIONS:
            return True
        if raw.lower() != "rm" and any(p.lower() == "rm" for p in WORD_PIECE.split(value)):
            return True
    return False


def rm_only_scratch(cmd: str) -> bool:
    """True only if every rm invocation in cmd deletes nothing but scratch targets."""
    if "`" in cmd or "$(" in cmd or LINKERS.search(cmd) or AMP_PIPE_REDIRECT.search(cmd):
        return False
    all_words = _words(cmd)
    if all_words is None or _unvetted_delete(all_words):
        return False
    tmpdir_reassigned = bool(TMPDIR_WRITE.search(cmd))
    found = False
    for m in RM_AT.finditer(cmd):
        found = True
        raw = _rm_args(cmd[m.end():])
        if raw is None:
            return False
        tokens = _words(raw)
        if tokens is None:
            return False
        targets, options_done = [], False
        for tok_raw, tok in tokens:
            if not options_done and tok == "--":
                options_done = True
            elif not options_done and tok.startswith("-"):
                continue
            else:
                targets.append((tok_raw, tok))
        if not targets or not all(is_scratch_target(t, tmpdir_reassigned, r) for r, t in targets):
            return False
    return found


def decision(cmd: str):
    allow_force = bool(os.environ.get("ESTATE_GUARD_ALLOW_FORCE"))
    stripped = _strip_wrappers(cmd)
    views = (cmd,) if stripped == cmd else (cmd, stripped)

    def hit(pat):
        return any(re.search(pat, v, re.I) for v in views)

    for pat, why in DENY:
        if hit(pat):
            if allow_force and "force-push" in why:
                return "ask", why + " (ESTATE_GUARD_ALLOW_FORCE is set)"
            return "deny", why
    for pat, why in ASK:
        if hit(pat):
            if why == RECURSIVE_DELETE and rm_only_scratch(cmd):
                continue
            return "ask", why
    return None, None


def main() -> None:
    if os.environ.get("ESTATE_GUARD_OFF"):
        return
    try:
        payload = json.load(sys.stdin)
    except Exception:
        return
    if payload.get("tool_name") != "Bash":
        return
    cmd = (payload.get("tool_input") or {}).get("command") or ""
    if not isinstance(cmd, str) or not cmd.strip():
        return
    what, why = decision(cmd)
    if not what:
        return
    reason = (
        f"estate-guard: {why}. "
        + ("This is a hard stop; a human runs it, not an agent." if what == "deny" else "Confirm with the human before running this.")
    )
    print(json.dumps({"hookSpecificOutput": {"hookEventName": "PreToolUse", "permissionDecision": what, "permissionDecisionReason": reason}}))


if __name__ == "__main__":
    main()
