# Current State Analysis

## Scope

Repository review across architecture, folder structure, naming, module boundaries, docs, build/deploy, testing, validation, and extensibility.

## 1. Architecture

## 1.1 Runtime architecture
- Primary runtime lives under `site/viewer/` with static HTML entry pages plus JS/MJS controllers.
- Architecture is modular but page-centric:
  - each major page has a controller (`toolheads.js`, `gantries.js`, `components.js`, etc.)
  - domain composition is spread across shared model helpers (`configuration-model.js`, `machine-head-model.mjs`, `changer-bank-model.mjs`)
- Navigation is managed by workspace modules (`workspace-router.mjs`, `workspace-navigation.mjs`) with controller allowlists.

## 1.2 Build architecture
- Canonical build path:
  - `scripts/build_site.py`
  - bundle pinning/verification via `site/ASSET_BUNDLE.json`
  - support catalog generation via `scripts/build_support_catalog.mjs`
  - extension application via `scripts/apply_custom_extensions.py`
- Publication check:
  - `scripts/check_repository.py` runs validation + regression orchestration.

## 1.3 Extension architecture
- Owner extension layer exists:
  - `custom/manifest.json`
  - `custom/components/custom-components.json`
  - overlays under `custom/overlays/`
- Extension validation gate:
  - `tools/validation/check_custom_extensions.py`
- Runtime mirror policy present:
  - `site/CUSTOM_COMPONENTS.json` must match custom source catalog.

## 2. Folder Structure

Top-level structure is explicit and purpose-based:
- `.github/` workflows (CI + Pages deploy)
- `site/` runtime app + bundled assets
- `scripts/` build/audit/test tooling
- `custom/` extension data
- `tools/validation/` validation entrypoints
- `localization/` translation sources/targets
- `docs/` product + maintenance + governance docs

Observation:
- Feature-first `src/features/*` target architecture is documented, but not yet implemented as primary runtime layout.

## 3. Naming Conventions

Strengths:
- strong use of kebab-case filenames in scripts/viewer helpers
- descriptive machine/component IDs in catalogs
- consistent `test_*.mjs` pattern for regressions

Gaps:
- mixed JS + MJS naming conventions from historical growth
- some large files still blend orchestration and domain logic.

## 4. Module Boundaries

Strengths:
- many dedicated model modules for machine/head/bank composition
- workspace navigation separated from individual pages

Gaps:
- boundary lines between UI mutation and composition logic remain blurry in several controllers
- some runtime modules are large enough to act like orchestration hubs.

## 5. Documentation

Strengths:
- extensive domain documentation under `docs/`
- clear maintenance and machine-review standards:
  - `docs/MAINTENANCE.md`
  - `docs/MACHINE_REVIEW.md`
- architecture and migration documents already exist.

Gaps:
- governance artifacts for contributor/AI consistency were missing before this phase (now added).
- some architecture decisions are documented in narrative docs but not consistently in ADR form.

## 6. Build and Deployment Workflow

Build:
- default build requires Python + Node and pinned model bundle verification.
- fallback helper exists for local preview constraints (`scripts/bootstrap_local_preview.ps1`).

Deployment:
- `.github/workflows/source-check.yml` validates source on PR/push.
- `.github/workflows/pages.yml` builds and deploys to Pages from `main`.

## 7. Testing and Validation

Strengths:
- broad regression coverage with many focused scripts in `scripts/test_*.mjs`
- orchestrated parallel runner `scripts/check_machine_regressions.py`
- publication guardrails in `scripts/check_repository.py`
- custom-extension validation exists and is wired.

Gaps:
- test inventory is strong but mostly script/integration style; isolated unit-style contracts are less formalized.

## 8. Data Model and Validation Systems

Strengths:
- heavy JSON-catalog usage with stable IDs and explicit compatibility mappings
- checksum/source constraints in multiple workflows
- localization data schema-like structure in `localization/source.json`

Gaps:
- schema contracts are enforced by code conventions and checks, but formal machine-readable schemas are not universal across all catalogs.

## 9. Extensibility and Maintainability

Strengths:
- extension layer now clearly separated from core source
- additive custom preset path avoids broad core edits

Gaps:
- complete feature-first migration is still pending
- some runtime files remain large and tightly coupled to page lifecycle.

## 10. Summary

Current implementation is production-capable and governance-aware, with strong validation and release discipline. Primary opportunities are architectural modularization, stronger explicit schemas, and continued migration toward feature-first boundaries without breaking existing behavior.
