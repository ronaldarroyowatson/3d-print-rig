# Migration Roadmap (Phase 5)

## Migration goals

- keep software working at every step
- avoid big-bang rewrites
- preserve upstream synchronization capability
- isolate owner customizations from core

## Branching strategy

- `main`: stable, deployable
- `migration/<milestone>`: short-lived incremental milestones
- `sync/upstream-<date>`: dedicated upstream merge branches
- always merge via PR with source-check + build checks

## Milestones

### M0 — Baseline and governance (completed/in-progress)

- [x] licensing/ownership report
- [x] baseline tag `v1-original-source`
- [x] baseline + architecture + debt + target docs
- [ ] add contributor/release governance docs and templates

### M1 — Data contract hardening

Scope:

- define schemas for core catalogs
- add schema validation to build/check pipeline
- normalize catalog loaders behind a single contract

Acceptance:

- build fails on invalid catalog shape
- zero runtime behavior change

### M2 — Compatibility engine extraction

Scope:

- move variant resolution/scoring from UI-adjacent modules to feature domain module
- add unit tests for solver behavior and edge cases

Acceptance:

- same selected variant outcomes for baseline fixtures
- measurable reduction in controller complexity

### M3 — Feature-first file movement (non-breaking)

Scope:

- introduce `src/features`, `src/core`, `src/adapters` with compatibility shims
- keep existing page URLs and user behavior unchanged

Acceptance:

- no route/URL breakage
- source-check + pages build pass

### M4 — Extension layer foundation

Scope:

- add `custom/` overlay format and merge loader
- define precedence rules and conflict diagnostics

Acceptance:

- custom components can be added without editing core catalogs
- extension merge errors are explicit and actionable

### M5 — Initial custom component pack

Scope:

- implement first owner custom components (Cartographer, Beacon, Galileo 2, EBB42, Nevermore)
- wire data + compatibility + navigation + rendering hooks through extension layer

Acceptance:

- each component appears in UI where compatible
- invalid combos are blocked by compatibility rules

### M6 — Validation tooling expansion

Scope:

- add `tools/validation/` checks:
  - duplicate IDs
  - missing assets/images
  - disconnected references
  - compatibility loops
  - invalid URLs
  - translation mismatches

Acceptance:

- deterministic machine-readable reports
- integrated into PR checks

### M7 — Documentation and contributor enablement

Scope:

- contributor, developer, content author, release docs
- architecture diagrams + onboarding walkthroughs

Acceptance:

- new contributor can add one component end-to-end using docs only

### M8 — CI/CD hardening and release process

Scope:

- formal PR validation matrix
- release tagging conventions
- upstream sync checklist + automation helpers

Acceptance:

- reproducible releases with explicit checklist evidence

## Upstream synchronization policy

1. sync upstream on a regular cadence (e.g., monthly or critical fix events)
2. keep extension layer additive to reduce merge conflicts
3. run full source-check and build after each sync
4. document conflict resolutions in sync PR description

## Risk controls

- gated migrations (one milestone per PR)
- golden baseline comparisons against `v1-original-source`
- preserve IDs and URL compatibility for shared links/embeds
- explicit rollback path: revert single milestone PR
