# Technical Debt Report (Phase 3)

## Method

Audit criteria:

- Pragmatic Programmer principles
- DRY
- feature-based architecture
- separation of concerns
- maintainability/extensibility
- testability

Scale:

- Severity: Critical / High / Medium / Low
- Effort: S (1-2 days), M (3-7 days), L (1-3 weeks), XL (3+ weeks)

## Findings

- **TD-01** — Viewer architecture (**High**)
  - Impact: large page controllers mix rendering, domain rules, and UI
    mutation; this increases defect surface and onboarding time.
  - Recommended fix: extract feature modules with orchestration
    boundaries (`features/*` + `core/runtime`). Keep adapters thin in page
    entrypoints.
  - Effort: L
- **TD-02** — Data contracts (**High**)
  - Impact: JSON catalogs are extensive but mostly untyped/unschematized;
    shape drift can break runtime late.
  - Recommended fix: introduce schema validation for catalogs (build-time),
    then typed adapters for runtime consumers.
  - Effort: L
- **TD-03** — Feature discoverability (**High**)
  - Impact: cross-feature logic is distributed across many files under one
    folder tree.
  - Recommended fix: reorganize into a feature-first hierarchy and
    co-locate feature docs/tests/scripts.
  - Effort: L
- **TD-04** — DRY in machine/head catalogs (**Medium**)
  - Impact: similar logic appears across machine families and variant
    builders.
  - Recommended fix: create shared composition primitives (constraint
    predicates, variant scoring, path generators).
  - Effort: M
- **TD-05** — Test granularity (**Medium**)
  - Impact: strong regression checks exist, but limited isolated unit tests
    for composition/scoring logic.
  - Recommended fix: add unit tests around variant resolution,
    compatibility scoring, and URL/state parsing edge cases.
  - Effort: M
- **TD-06** — Tooling standardization (**Medium**)
  - Impact: no central package/runtime manifest baseline (`package.json`,
    pinned Python toolchain metadata).
  - Recommended fix: add contributor runtime contract (`tool-versions` +
    script wrappers) without changing deployment behavior.
  - Effort: S
- **TD-07** — Language consistency in docs (**Medium**)
  - Impact: core docs mix Japanese-first and English-first sections; new
    contributors may struggle.
  - Recommended fix: provide bilingual contributor/developer guides with
    explicit audience sections.
  - Effort: M
- **TD-08** — Extension safety boundary (**High**)
  - Impact: personal customizations could conflict with upstream if core
    catalogs are edited directly.
  - Recommended fix: build explicit extension layer (`custom/` + merge
    pipeline + precedence rules).
  - Effort: L
- **TD-09** — Router/controller coupling (**Medium**)
  - Impact: workspace router knows controller constraints while controllers
    manage many navigation side effects.
  - Recommended fix: introduce navigation service contract with a testable
    policy module.
  - Effort: M
- **TD-10** — Operational governance (**Low**)
  - Impact: upstream sync, fork policy, and release cadence are not fully
    codified for new maintainers.
  - Recommended fix: add release process + sync policy docs and PR
    templates/checklists.
  - Effort: S

## Priority order

1. TD-01, TD-02, TD-08 (architecture, contracts, extension safety)
2. TD-03, TD-04, TD-05 (feature decomposition + testability)
3. TD-06, TD-07, TD-09, TD-10 (maintainer ergonomics and governance)

## Risk if not addressed

- Increasing merge conflicts with upstream
- high regression risk when adding new printer ecosystems
- slower contributor onboarding and inconsistent quality
- reduced confidence in long-term maintainability target (5+ years)
