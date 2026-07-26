# FrankX — Security

<!-- STARLIGHT-REPO-CONTRACT:START -->
## Starlight repository contract

Contract: `starlight.repo_profile.v2` · Team: `frankx-product-revenue-team` · Priority: `tier-0`
### Data boundary

- Classification: `private`
- PII allowed in product-owned storage: `true`
- Auth owner: `FrankX`

Never read or print `.env` values. Keep secrets in approved secret stores, keep PII out of analytics events and receipts, scan untrusted code before execution, and stop on credential or private-memory exposure.
<!-- STARLIGHT-REPO-CONTRACT:END -->
