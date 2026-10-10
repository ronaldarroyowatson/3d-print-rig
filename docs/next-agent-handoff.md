# Next Agent Handoff

This document captures the current repository state and the safest next
steps for the next maintainer or AI agent working in this fork.

## Current repository state

- Repository: `ronaldarroyowatson/3d-print-rig`
- Working branch: `agents/2`
- Project status: fork modernization, governance, and interactive part
  inspector work have all landed. The site runs locally and on GitHub Pages.
  Click-to-select part inspection is active on both the Trident and V2.4
  viewer routes. Print-file mapping is scaffolded with starter records and
  rule-based fallbacks; exact catalog mappings are incomplete but placeholder
  entries clearly identify what remains.
- Policy goal: maintain an independent owner-managed fork with attribution
  preserved, while keeping upstream compatibility and using additive
  extension patterns instead of invasive core edits.

## What has been completed

### Interactive part inspector (latest)

- `site/viewer/part-inspector.js` — click-to-select part inspection for
  all viewer routes. Supports raycast selection, mesh highlight, sidebar
  metadata display, hide selected, and unhide-all controls.
- `site/viewer/workspace.css` — inspector panel and metadata UI styles.
- `site/viewer/app.js` — Trident viewer integration: mesh metadata
  registration and inspector initialization.
- `site/viewer/v24-reference.js` and `site/viewer/v24-app.js` — V2.4
  route integration for inspector parity with the Trident route.
- `site/viewer/v24-reference.html`, `site/viewer/v24.html`,
  `site/viewer/bootstrap.js`, `site/viewer/v24-bootstrap.js` — updated
  versioning and metadata for the inspector workflow.
- `custom/components/part-print-profiles.json` — starter print-profile
  mapping for selectable parts, with rule-based fallback entries. Exact
  per-part mappings are still partial and should be expanded from the
  Voron source archives.
- `custom/manifest.json` — updated to include the print-profiles generated
  file entry.
- `docs/PART_INTERACTION_ROADMAP.md` — implementation roadmap, milestone
  status, and manual QA checklist for the inspector workflow.
- `tools/validation/check_custom_extensions.py` — hardened to validate
  generated-file entries alongside custom extension integrity.
- `scripts/bootstrap_local_preview.ps1` — updated to mirror generated
  files into local preview output.
- `site/PUBLIC_CATALOG.json` — updated site metadata for viewer feature
  support.

### Part mapping next steps

The official Voron source repositories were identified as the upstream
source of truth for exact CAD/STL/manual part mapping. The following
downloads have been collected locally at `D:\Downloads\`:
- `Voron-2-Voron2.4/` — V2.4 assembly source
- `Voron-Stealthburner-main/` — Stealthburner toolhead source
- `Assembly_Manual_2.4r2.pdf`, `Assembly_Manual_SB.pdf`,
  `Assembly_Manual_SB_High_Contrast_7-7-23.pdf`

Mapping for Trident, Voron 0, Switchwire, Legacy and their hardware
variants has not been ingested yet. Those archives are the next data
task (see "Next recommended actions" below).

### Ownership and governance

- MIT license compatibility was confirmed for a maintained fork with
  attribution preserved.
- The repository strategy, extension model, and governance docs were
  documented in the `docs/` tree.
- A project-wide source-of-truth instruction file was created at
  `.github/copilot-instructions.md`.

### Architecture and audit work

- Baseline preservation and project analysis docs were produced.
- Architecture review, technical debt review, refactor backlog, and ADRs
  were added.
- Target architecture guidance documents the preferred
  `src/features|shared|core` direction without forcing a disruptive
  rewrite.

### Extension-layer work

- The custom extension framework is implemented under `custom/` and
  mirrored into runtime configuration surfaces.
- Custom component metadata is captured in
  `custom/components/custom-components.json`.
- Validation coverage for custom extension integrity exists in
  `tools/validation/check_custom_extensions.py`.

### Local runtime and workflow fixes

- A previously broken custom-component route was fixed by aligning the
  import/loading pattern with the rest of the viewer pages.
- The default local preview/build path has been documented as:
  - `python scripts/build_site.py --output <dir>`
- The fallback path remains:
  - `scripts/bootstrap_local_preview.ps1`
- The bootstrap script is a fallback only when the default tooling cannot
  run.

## Known technical facts

### Runtime behavior

- The site loads successfully in local preview flows when the generated
  output is present.
- A real browser/runtime issue existed in the custom preset page caused by
  a missing import map and module resolution mismatch (`three` failed to
  resolve).
- That bug is fixed in the current branch.
- Family filtering and tab switching can appear misleading when the current
  preset set already matches the selected family; the UI may not visibly
  change even though the data set is valid.

### Build and validation constraints

- The standard repository build and validation scripts are Python-based.
- This local environment did not have a working Python interpreter
  available, so automated build/validation could not complete in this
  session.
- The repo still expects the standard validation path to be run in a proper
  Python-enabled environment before publication.

### Preview nuance

- Raw source-mode browsing can appear broken when generated build artifacts
  are missing.
- Generated output is expected to exist for runtime completeness; the
  source tree alone is not always enough for a final preview.

## Critical files to know

- `.github/copilot-instructions.md` – project-wide rules for contributors
  and agents
- `docs/next-agent-handoff.md` – this file; keep it current
- `docs/PART_INTERACTION_ROADMAP.md` – interactive inspector plan and
  milestone status
- `docs/current-state-analysis.md` – current repo state and architecture
  review
- `docs/copilot-compliance-report.md` – compliance scorecard and findings
- `docs/refactor-backlog.md` – prioritized next refactors
- `docs/adr/README.md` – architecture decision log
- `docs/README.md` – central documentation index
- `scripts/build_site.py` – default build path and site assembly
- `scripts/check_repository.py` – repository validation gate
- `custom/manifest.json` – extension contract
- `custom/components/custom-components.json` – owner custom dataset
- `custom/components/part-print-profiles.json` – part-to-print-file
  mapping (starter data; needs expansion)
- `site/viewer/part-inspector.js` – interactive part selection and
  metadata display
- `site/viewer/app.js` – Trident viewer with inspector integration
- `site/viewer/v24-reference.js` – V2.4 reference viewer with inspector
  integration
- `site/viewer/custom-components.html` – custom preset page
- `tools/validation/check_custom_extensions.py` – validation for extension
  integrity

## Operational guidance for the next agent

### Priority rules

1. Follow `.github/copilot-instructions.md` as the project-level source of
   truth.
2. Keep the extension layer additive and upstream-safe.
3. Prefer small, reviewable changes over large rewrites.
4. Preserve original functionality while modernizing incrementally.
5. For local build validation, use:
   - `python scripts/build_site.py --output <dir>`
   - fallback only: `scripts/bootstrap_local_preview.ps1`

### Do not do

- Do not rewrite the repo into a large `src/` migration in one commit.
- Do not modify core catalogs directly when an extension or overlay path is
  available.
- Do not assume browser issues are caused by the actual site logic when the
  generated build output is missing.
- Do not treat the bootstrap script as the normal path for routine
  development.

### Next recommended actions

1. **Expand part print-profile mappings** using official Voron source
   archives already downloaded to `D:\Downloads\`:
   - Compare part keys in `PART_PRINT_PROFILES.json` against STL file
     names in `Voron-2-Voron2.4/` and `Voron-Stealthburner-main/`.
   - Replace generic fallback rules with exact `partKey → file` entries
     in `custom/components/part-print-profiles.json`.
   - Use relative paths from archive root so entries are portable.
2. **Download and normalize remaining Voron family source archives** for
   Trident, Voron 0, Switchwire, Legacy and related hardware variants.
   Store them consistently alongside the V2.4 archives.
3. **Re-run standard repo validation** (`python scripts/check_repository.py`)
   once Python is available in PATH and record any mismatches.
4. Continue highest-value backlog items in small, reviewable slices.
5. Add more formal schema validation and focused tests for catalog/data
   contracts.
6. Keep the custom extension system additive, documented, and deterministic.

## Validation status

### Completed

- Manual smoke tests confirmed the site loads and the interactive part
  inspector works in local preview.
- Click-to-select is active and functional on both the Trident and V2.4
  viewer routes.
- Sidebar metadata panel, hide-selected, and unhide-all controls are
  operational.
- The custom-page import resolution issue has been fixed.
- Governance and architecture docs are in place.
- The print-profile mapping schema and starter data are committed.

### Pending

- Full automated repository validation is still pending on a machine with
  a working Python interpreter.
- Exact part-key → print-file mapping is incomplete for most parts; starter
  records and fallback rules are in place as placeholders.
- Voron family source archives for Trident, 0, Switchwire, Legacy are not
  yet downloaded and normalized.
- Final publication-level validation should be executed with the standard
  Python build/check workflow before release.

## Final note

The repository is in a good place for continuation. It has a clear
governance layer, documented architecture decisions, a working custom
extension system, an active part inspector on both viewer routes, and a
print-profile mapping scaffold ready to accept exact per-part data from
the official Voron source archives. The next agent should focus on
expanding the mapping catalog from those source archives and running the
full automated validation pass — without disrupting the existing runtime
or the upstream-safe extension model.
