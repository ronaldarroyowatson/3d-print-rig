# Copilot Instructions — 3D Print Rig Fork

This file is the authoritative development standard for this repository.
All AI-assisted code, manual contributions, refactors, and review decisions
must follow these rules.

## 1) Engineering Principles (Mandatory)

### Pragmatic Programmer

- Fix broken windows immediately.
- Leave touched code clearer and safer than before.
- Keep knowledge explicit in code + docs.
- Automate repetitive verification tasks.
- Prefer maintainability and traceability over clever shortcuts.

### DRY

- Reuse existing composition logic, validators, and loaders before adding
  new code.
- Keep identifiers, schema fields, and compatibility semantics single-source.
- Avoid duplicate constants, duplicated catalog transforms, and duplicated
  URL/state rules.

### KISS

- Prefer simple, explicit modules with one clear responsibility.
- Avoid abstraction layers that do not reduce real maintenance cost.

### YAGNI

- Implement only behavior required for current supported machines/features.
- Do not pre-build speculative plugin or framework systems.

## 2) Architecture and Boundaries

## 2.1 Current repository structure (authoritative today)

- `site/`: runtime static web app (viewer, support, embed, fun, licenses)
- `scripts/`: build, audit, regression, data-prep, and publication checks
- `custom/`: owner extension definitions and overlays
- `tools/validation/`: extension validation and integrity checks
- `localization/`: translation source and language catalogs
- `docs/`: architecture, maintenance, review scope, governance docs

## 2.2 Target architecture (incremental migration direction)

When introducing new systems, prefer:

```text
src/
  features/
  shared/
  core/
  assets/
  config/
  tools/
```

Do not rewrite the repository in one step. Migrate incrementally while
preserving behavior.

## 2.3 Feature boundaries

- Keep machine-family logic, toolhead logic, and extension logic isolated.
- Avoid hidden cross-feature coupling through ad-hoc globals.
- Shared generic utilities belong in shared/core modules, not feature pages.

## 3) Data Model and Catalog Rules

- Every new catalog must define:
  - purpose/scope
  - schema/version field
  - stable IDs
  - source/provenance metadata when relevant
- Never introduce opaque magic strings when an existing enum/ID family exists.
- Validate all configuration/cross-reference data in automated checks.
- Maintain backward compatibility for saved links/config IDs, or ship
  explicit migrations.
- Extension data in `custom/` must remain additive and must not silently
  mutate core intent.

## 4) Code Organization Rules

- Prefer small focused files and explicit exports.
- New modules must declare their responsibility in code or nearby docs.
- Avoid god files; split large orchestration into composable functions
  where practical.
- No circular dependencies in new code.
- No silent fallbacks that hide invalid states.

## 5) Documentation Rules

For any significant feature/system change, update documentation in the same PR:

- purpose
- responsibilities
- dependencies
- extension points
- verification scope/limitations

Required references:

- `docs/MAINTENANCE.md` for operational workflow
- `docs/MACHINE_REVIEW.md` for machine/head evidence requirements
- `docs/README.md` for discoverability

## 6) Testing and Validation Rules

Before publication-level changes:

- Run `python scripts/check_repository.py`.
- Run affected regression/audit scripts for changed surfaces.
- Keep automated checks for:
  - duplicate IDs
  - invalid references
  - broken links/assets
  - incompatible mappings
  - localization drift

For local preview/build workflow:

1. **Default path**: `python scripts/build_site.py --output <dir>`
2. **Fallback path** (only when default cannot run, e.g., Python unavailable):
   `scripts/bootstrap_local_preview.ps1`

Never treat fallback preview output as a release-equivalent verification path.

## 7) GitHub Workflow and Change Hygiene

- Use feature branches + pull requests.
- Commit messages should follow:
  - `feat:`
  - `fix:`
  - `refactor:`
  - `docs:`
  - `test:`
  - `chore:`
- Keep commits scoped and reviewable; avoid mixed unrelated changes.
- Ensure CI source checks and Pages build are green before merge.

## 8) Extension System Policy

- Custom additions should be implemented through extension points
  (`custom/`, overlays, generated mirrors), not direct core rewrites where
  avoidable.
- Preserve source attribution and license boundaries.
- Validate `site/CUSTOM_COMPONENTS.json` mirror integrity against
  `custom/components/custom-components.json`.
- Keep extension logic deterministic and conflict-minimizing for upstream sync.

## 9) Copilot / Agent Generation Rules

When generating code:

- Search for existing implementations first.
- Reuse existing helpers/contracts where practical.
- Preserve backward compatibility and link stability.
- Generate/update docs with implementation changes.
- Prefer incremental refactors over big-bang rewrites.
- Do not bypass verification scripts with manual assumptions.

## 10) Review Checklist (Required in PR review)

- [ ] Architecture boundary respected (or deviation documented).
- [ ] Data schema/ID/reference integrity preserved.
- [ ] Extension-layer behavior remains additive and deterministic.
- [ ] Required docs updated.
- [ ] Required checks/tests run and results captured.
- [ ] No unrelated changes bundled.
