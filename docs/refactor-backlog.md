# Refactor Backlog

Prioritized against maintainability, extensibility, and standards compliance.

## High Impact / Low Effort

### 1) Enforce commit/PR conventions in CI
- **Description:** Add lightweight commit/PR title validation for `feat|fix|refactor|docs|test|chore`.
- **Rationale:** Makes governance standards persistent instead of optional.
- **Affected files:** `.github/workflows/source-check.yml`, PR template files.
- **Dependencies:** None.
- **Expected benefit:** Consistent history quality and faster review parsing.

### 2) Add architecture boundary notes to key controller entrypoints
- **Description:** Add concise module-boundary comments/docs to major entry controllers.
- **Rationale:** Reduces onboarding ambiguity before larger refactors.
- **Affected files:** `site/viewer/toolheads.js`, `site/viewer/gantries.js`, `site/viewer/components.js`.
- **Dependencies:** None.
- **Expected benefit:** Clearer responsibilities and safer incremental extraction.

### 3) Expand extension validation checks
- **Description:** Add duplicate-ID and unresolved-reference checks across merged core+custom catalogs.
- **Rationale:** Prevents extension regressions at commit time.
- **Affected files:** `tools/validation/check_custom_extensions.py`.
- **Dependencies:** Existing custom mirror flow.
- **Expected benefit:** Higher extension reliability with minimal runtime risk.

## High Impact / Medium Effort

### 4) Introduce shared catalog schema validation layer
- **Description:** Define schema artifacts and centralized validators for major JSON catalogs.
- **Rationale:** Stronger contract enforcement and earlier drift detection.
- **Affected files:** `tools/validation/`, selected `scripts/*.py`, key catalog JSON families.
- **Dependencies:** Schema scope decisions + catalog inventory.
- **Expected benefit:** Better data-model integrity and safer refactors.

### 5) Extract configuration/compatibility composition primitives
- **Description:** Consolidate repeated compatibility and variant resolution transforms into reusable helpers.
- **Rationale:** DRY compliance and reduced logic divergence.
- **Affected files:** `site/viewer/configuration-model.js`, `site/viewer/machine-head-model.mjs`, `site/viewer/changer-bank-model.mjs`, `scripts/build_support_catalog.mjs`.
- **Dependencies:** Baseline contract tests for resolver behavior.
- **Expected benefit:** Lower bug surface and simpler future component additions.

### 6) Add focused tests for pure resolver/state modules
- **Description:** Add targeted tests around variant resolution, URL state parsing, and selection fallback logic.
- **Rationale:** Faster confidence during incremental migration.
- **Affected files:** New `scripts/test_*` modules for isolated domain units.
- **Dependencies:** Small extraction of pure helpers where needed.
- **Expected benefit:** Better defect localization and safer code movement.

## High Impact / High Effort

### 7) Incremental feature-first runtime migration
- **Description:** Move from page-centric controller layout toward feature modules and shared/core services.
- **Rationale:** Aligns repository to long-term architecture standard.
- **Affected files:** Broad set under `site/viewer/`, new `src/features|shared|core` tree, build references.
- **Dependencies:** ADRs, migration sequencing, compatibility harness.
- **Expected benefit:** Major long-term maintainability gains and clearer ownership boundaries.

### 8) Split large controllers into orchestration + feature adapters
- **Description:** Decompose large runtime files into explicit feature adapters and thin page bootstrap layers.
- **Rationale:** Reduces coupling and improves reviewability.
- **Affected files:** `site/viewer/toolheads.js`, `site/viewer/machine-heads.js`, `site/viewer/gantries.js`, navigation modules.
- **Dependencies:** Item #6 tests and item #5 shared primitives.
- **Expected benefit:** Smaller diffs, easier bug isolation, lower regression risk.

### 9) Unified data contract registry for runtime + scripts
- **Description:** Single source registry documenting ownership, schema version, and consumers for each major catalog.
- **Rationale:** Treats data-model knowledge as an explicit asset.
- **Affected files:** `docs/`, `tools/validation/`, build scripts and catalog metadata.
- **Dependencies:** Schema adoption (#4).
- **Expected benefit:** Faster onboarding and fewer contract mismatch defects.
