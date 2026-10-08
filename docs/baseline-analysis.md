# Baseline Analysis (Phase 1)

## Baseline preservation status

- Baseline commit: `58c7d0d70194dd9414811698d32f043c7a794a45`
- Baseline tag: `v1-original-source`
- Tag rationale: preserved snapshot of upstream source state before owner-specific modernization.

## Project structure (baseline)

Top-level structure:

- `.github/workflows/`
  - `pages.yml` (build + deploy to GitHub Pages)
  - `source-check.yml` (repository gate checks)
- `docs/` (maintenance guides, reviews, QA evidence, licensing notices)
- `localization/` (translation source, dictionaries, legacy fragment baselines)
- `scripts/` (Python + Node build and verification tooling)
- `site/`
  - `viewer/` (3D viewer and UI modules)
  - `support/` (generated compatibility browser)
  - `fun/` (wallpaper and showcase pages)
  - `embed/` (embeddable viewer assets)
  - static metadata catalogs (`ASSET_BUNDLE.json`, source/manifests)

## Framework and runtime baseline

The baseline is a static-site architecture with no frontend framework dependency:

- Frontend: vanilla ES modules, DOM APIs, Three.js (vendored module files)
- Backend/runtime: none at runtime (pure static hosting)
- Build/runtime tooling:
  - Python 3 scripts for site assembly, bundle verification, publication checks
  - Node.js scripts for localization compilation and catalog/regression checks

## Dependency model

- No `package.json` or Python dependency lockfile in baseline root.
- JavaScript runtime dependencies are committed as source/vendor modules under `site/viewer/vendor*`.
- Build dependencies are primarily:
  - Python standard library tooling in scripts
  - Node runtime execution for `.mjs` validation/build scripts

## Build system baseline

Primary build flow:

1. `python scripts/check_repository.py`
   - publication-scope checks
   - secret/private path signature checks
   - source inventory checks
   - JS syntax validation
   - machine regression runner + locale/catalog checks
2. `python scripts/build_site.py --output <dir>`
   - resolves pinned model bundle (`site/ASSET_BUNDLE.json`)
   - validates proofs and source witnesses
   - assembles static output including support catalog artifacts

## Deployment baseline

Current deployment path:

- GitHub Actions workflow `.github/workflows/pages.yml`
  - checkout
  - source check
  - site build into `_site`
  - upload pages artifact
  - deploy to GitHub Pages

PR and push protection:

- `.github/workflows/source-check.yml` runs `scripts/check_repository.py` on push + PR.

## Baseline strengths

1. **Strong reproducibility controls**
   - pinned bundle hash/size and witness validation in build path.
2. **High rigor for source provenance**
   - third-party notices, source inventory hash checks, proof preservation checks.
3. **Static hosting simplicity**
   - low operational footprint, easy portability.
4. **Deep domain coverage**
   - extensive machine/head/mod catalogs and evidence docs.
5. **Automated regression coverage**
   - machine regression runner and translation/catalog guards.

## Baseline weaknesses

1. **Feature boundaries are mixed**
   - `site/viewer/` is broad with many cross-cutting concerns in the same layer.
2. **Domain logic spread across many files**
   - navigation, compatibility, rendering, and machine catalogs are distributed without a feature-first root.
3. **Limited typed contracts**
   - JSON schema validation and static typing are largely convention-driven.
4. **Onboarding complexity**
   - high context load for contributors unfamiliar with Voron ecosystem.
5. **No package manifest standardization**
   - runtime assumptions (Python/Node versions) are documented but not centrally enforced by lock tooling.

## Preservation guidance

- Treat `v1-original-source` as immutable baseline for all migration diffing.
- Keep all architecture changes additive and traceable against this tag.
- Maintain a branch discipline where baseline-preserving checks are mandatory before merge.
