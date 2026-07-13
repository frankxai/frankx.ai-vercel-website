# Family route privacy release gate

Date: 2026-07-13

Status: current-source remediation implemented on feature branch; production merge required

## Finding

Live HTTP verification found that legacy routes below `/familie/*` return family-specific content without authentication. The production repository is public, and some legacy route sources contain information about living family members. The new Family Intelligence surface must not launch while that boundary remains implicit.

## Branch remediation

- `proxy.ts` redirects unauthenticated family-route requests as defense in depth.
- Every private family route group now calls `auth()` again from a dynamic server layout.
- Private route metadata is generic, `noindex`, and `nocache`.
- Private history routes no longer emit public article metadata or JSON-LD.
- Legacy family route sources now contain only product shells, methods, and empty states. No living-family record is bundled with these routes.
- A legacy personalized child portal and its public route were retired. Generic learning assets were preserved under neutral paths and personalized catalog records were removed.
- The hidden family graph and both generated reading-mirror copies were removed from current source. The repository now carries only a policy README at that location.
- Public design-lab tree variants use an explicitly classified synthetic fixture.
- `npm run family:privacy:check` verifies server layouts, proxy boundaries, synthetic fixture classification, generated mirrors, living-person record markers, and personalized-child portal markers. It runs in prebuild and merge gates.
- The public routes `/family`, `/family-intelligence-system`, and `/familien-intelligenz-system` contain no living-relative or child records.

## Remaining release gates

1. Merge the verified branch before treating any `/familie/*` path as private.
2. Connect the shells to a family-scoped private data store only after family membership, revocation, recovery, and server-side authorization are implemented.
3. Review whether Git history requires a coordinated privacy purge. History rewriting and force-pushing are destructive and require explicit approval, a repository freeze, backup tags, and rollback instructions.
4. Keep the `/papa` memorial outside this change. It is a separately governed public memorial and requires its own privacy/consent decision before any modification.
5. Review pre-existing public tribute pages about living adults and document consent or retire them before the FamilyOS production launch.
6. Complete an authenticated preview review before inviting relatives.

No production merge, history rewrite, external message, credential change, or DNS action is performed by this work item.
