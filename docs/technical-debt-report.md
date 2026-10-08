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

| ID | Area | Severity | Impact | Recommended fix | Effort |
|---|---|---|---|---|---|
| TD-01 | Viewer architecture | High | Large page controllers mix rendering, domain rules, and UI mutation; increases defect surface and onboarding time. | Extract feature modules with orchestration boundaries (`features/*` + `core/runtime`). Keep adapters thin in page entrypoints. | L |
| TD-02 | Data contracts | High | JSON catalogs are extensive but mostly untyped/unschematized; shape drift can break runtime late. | Introduce schema validation for catalogs (build-time), then typed adapters for runtime consumers. | L |
| TD-03 | Feature discoverability | High | Cross-feature logic is distributed across many files under one folder tree. | Reorganize into feature-first hierarchy and co-locate feature docs/tests/scripts. | L |
| TD-04 | DRY in machine/head catalogs | Medium | Similar logic appears across machine families and variant builders. | Create shared composition primitives (constraint predicates, variant scoring, path generators). | M |
| TD-05 | Test granularity | Medium | Strong regression checks exist, but limited isolated unit tests for composition/scoring logic. | Add unit tests around variant resolution, compatibility scoring, and URL/state parsing edge cases. | M |
| TD-06 | Tooling standardization | Medium | No central package/runtime manifest baseline (`package.json`, pinned Python toolchain metadata). | Add contributor runtime contract (`tool-versions` + scripts wrappers) without changing deployment behavior. | S |
| TD-07 | Language consistency in docs | Medium | Core docs mix Japanese-first and English-first sections; new contributors may struggle. | Provide bilingual contributor/developer guides with explicit audience sections. | M |
| TD-08 | Extension safety boundary | High | Personal customizations could conflict with upstream if core catalogs are edited directly. | Build explicit extension layer (`custom/` + merge pipeline + precedence rules). | L |
| TD-09 | Router/controller coupling | Medium | Workspace router knows controller constraints while controllers manage many navigation side effects. | Introduce navigation service contract with testable policy module. | M |
| TD-10 | Operational governance | Low | Upstream sync, fork policy, and release cadence not fully codified for new maintainers. | Add release process + sync policy docs and PR templates/checklists. | S |

## Priority order

1. TD-01, TD-02, TD-08 (architecture, contracts, extension safety)
2. TD-03, TD-04, TD-05 (feature decomposition + testability)
3. TD-06, TD-07, TD-09, TD-10 (maintainer ergonomics and governance)

## Risk if not addressed

- Increasing merge conflicts with upstream
- high regression risk when adding new printer ecosystems
- slower contributor onboarding and inconsistent quality
- reduced confidence in long-term maintainability target (5+ years)
