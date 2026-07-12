# Family route privacy release gate

Date: 2026-07-12

Status: remediation implemented on feature branch; production merge required

## Finding

Live HTTP verification found that legacy routes below `/familie/*` return family-specific content without authentication. The production repository is public, and some legacy route sources contain information about living family members. The new Family Intelligence surface must not launch while that boundary remains implicit.

## Branch remediation

- `proxy.ts` redirects unauthenticated family-route requests as defense in depth.
- Every private family route group now calls `auth()` again from a dynamic server layout.
- Private route metadata is generic, `noindex`, and `nocache`.
- Private history routes no longer emit public article metadata or JSON-LD.
- `npm run family:privacy:check` verifies both the server layouts and proxy boundary and runs in prebuild and merge gates.
- The public routes `/family`, `/family-intelligence-system`, and `/familien-intelligenz-system` contain no living-relative or child records.

## Remaining release gates

1. Merge the verified branch before treating any `/familie/*` path as private.
2. Migrate real family records out of the public repository into a family-scoped private data store.
3. Remove hard-coded private records from the public tree after a verified private backup exists.
4. Review whether Git history requires a coordinated privacy purge. History rewriting and force-pushing are destructive and require explicit approval, a repository freeze, backup tags, and rollback instructions.
5. Replace the single-admin pilot with per-person authentication, invitation, family membership, revocation, recovery, and server-side authorization before inviting relatives.

No production merge, history rewrite, external message, credential change, or DNS action is performed by this work item.
