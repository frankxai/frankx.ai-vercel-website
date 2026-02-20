# Truth Claims Playbook

## Goal
Keep FrankX messaging strong and credible without overstating scope.

## Claim Categories

### 1) Direct Delivery
Use when Frank personally delivered or directly managed the work.
Examples:
- "Directly designed and shipped"
- "Delivered with client team"

### 2) Ecosystem Context
Use when exposure came through Oracle ecosystem programs, partner workstreams, or indirect enterprise contexts.
Examples:
- "Experience in Oracle ecosystem contexts"
- "Exposure to large-enterprise environments"

### 3) Publicly Verifiable Evidence
Prefer claims with artifacts users can inspect.
Examples:
- Public docs
- Public repos
- Public demos
- Published roadmap status

## Do / Don’t

### Do
- Label scope clearly: direct vs ecosystem.
- Use conservative language when numbers are not independently verifiable.
- Prefer "thousands", "dozens", "active", "planned" when exact numbers are uncertain.
- Mark planned products as planned.

### Don’t
- Use fabricated enrollments, testimonials, or completion stats.
- Use unqualified "trusted by" language without attributable proof.
- Use aggressive multipliers (for example, "10x faster") without hard evidence.

## Required Check Before Publish
1. Run `npm run claims:audit`.
2. Manually review each finding.
3. Confirm all course pages are either live-and-real or explicitly planned.
4. Confirm enterprise wording states scope accurately.

## Optional Strict Gate
Use `npm run claims:audit:strict` in CI when you want potential claim patterns to fail the build.
