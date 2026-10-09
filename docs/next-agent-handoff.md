# Next Agent Handoff

This document captures the current repository state and the safest next steps for the next maintainer or AI agent working in this fork.

## Current repository state

- Repository: `ronaldarroyowatson/3d-print-rig`
- Working branch: `agents/2`
- Project status: fork modernization and governance work is in progress and the repo is in a usable, documented state for continued incremental migration.
- Policy goal: maintain an independent owner-managed fork with attribution preserved, while keeping upstream compatibility and using additive extension patterns instead of invasive core edits.

## What has been completed

### Ownership and governance
- MIT license compatibility was confirmed for a maintained fork with attribution preserved.
- The repository strategy, extension model, and governance docs were documented in the `docs/` tree.
- A project-wide source-of-truth instruction file was created at `.github/copilot-instructions.md`.

### Architecture and audit work
- Baseline preservation and project analysis docs were produced.
- Architecture review, technical debt review, refactor backlog, and ADRs were added.
- Target architecture guidance documents the preferred `src/features|shared|core` direction without forcing a disruptive rewrite.

### Extension-layer work
- The custom extension framework is implemented under `custom/` and mirrored into runtime configuration surfaces.
- Custom component metadata is captured in `custom/components/custom-components.json`.
- Validation coverage for custom extension integrity exists in `tools/validation/check_custom_extensions.py`.

### Local runtime and workflow fixes
- A previously broken custom-component route was fixed by aligning the import/loading pattern with the rest of the viewer pages.
- The default local preview/build path has been documented as:
  - `python scripts/build_site.py --output <dir>`
- The fallback path remains:
  - `scripts/bootstrap_local_preview.ps1`
- The bootstrap script is a fallback only when the default tooling cannot run.

## Known technical facts

### Runtime behavior
- The site loads successfully in local preview flows when the generated output is present.
- A real browser/runtime issue existed in the custom preset page caused by a missing import map and module resolution mismatch (`three` failed to resolve).
- That bug is fixed in the current branch.
- Family filtering and tab switching can appear misleading when the current preset set already matches the selected family; the UI may not visibly change even though the data set is valid.

### Build and validation constraints
- The standard repository build and validation scripts are Python-based.
- This local environment did not have a working Python interpreter available, so automated build/validation could not complete in this session.
- The repo still expects the standard validation path to be run in a proper Python-enabled environment before publication.

### Preview nuance
- Raw source-mode browsing can appear broken when generated build artifacts are missing.
- Generated output is expected to exist for runtime completeness; the source tree alone is not always enough for a final preview.

## Critical files to know

- `.github/copilot-instructions.md` – project-wide rules for contributors and agents
- `docs/current-state-analysis.md` – current repo state and architecture review
- `docs/copilot-compliance-report.md` – compliance scorecard and findings
- `docs/refactor-backlog.md` – prioritized next refactors
- `docs/adr/README.md` – architecture decision log
- `docs/README.md` – central documentation index
- `scripts/build_site.py` – default build path and site assembly
- `scripts/check_repository.py` – repository validation gate
- `custom/manifest.json` – extension contract
- `custom/components/custom-components.json` – owner custom dataset
- `site/viewer/custom-components.html` – custom preset page is part of the runtime extension surface
- `tools/validation/check_custom_extensions.py` – validation for extension integrity

## Operational guidance for the next agent

### Priority rules
1. Follow `.github/copilot-instructions.md` as the project-level source of truth.
2. Keep the extension layer additive and upstream-safe.
3. Prefer small, reviewable changes over large rewrites.
4. Preserve original functionality while modernizing incrementally.
5. For local build validation, use:
   - `python scripts/build_site.py --output <dir>`
   - fallback only: `scripts/bootstrap_local_preview.ps1`

### Do not do
- Do not rewrite the repo into a large `src/` migration in one commit.
- Do not modify core catalogs directly when an extension or overlay path is available.
- Do not assume browser issues are caused by the actual site logic when the generated build output is missing.
- Do not treat the bootstrap script as the normal path for routine development.

### Next recommended actions
- Re-run the standard repo validation once Python is available.
- Continue the highest-value backlog items in small, reviewable slices.
- Add more formal schema validation and focused tests for catalog/data contracts.
- Keep the custom extension system additive, documented, and deterministic.

## Validation status

### Completed
- Manual smoke tests confirmed the site can load.
- The custom-page import resolution issue has been fixed.
- Governance and architecture docs are in place.

### Pending
- Full automated repository validation is still pending on a machine with a working Python interpreter.
- Final publication-level validation should be executed with the standard Python build/check workflow before release.

## Final note

The repository is in a good place for continuation: it has a clear governance layer, documented architecture decisions, a working custom extension system, and a known-safe path for incremental modernization. The next agent should focus on small, high-leverage engineering improvements without disrupting the existing runtime or the upstream-safe extension model.
