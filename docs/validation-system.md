# Validation System (Phase 10)

## Overview

The fork now includes a dedicated custom-extension validation layer under [tools/validation/](D:/ronal/Documents/3d-print-rig.worktrees/2/tools/validation).

Current implementation:

- [check_custom_extensions.py](D:/ronal/Documents/3d-print-rig.worktrees/2/tools/validation/check_custom_extensions.py)
  - validates [custom/manifest.json](D:/ronal/Documents/3d-print-rig.worktrees/2/custom/manifest.json)
  - validates [custom/components/custom-components.json](D:/ronal/Documents/3d-print-rig.worktrees/2/custom/components/custom-components.json)
  - validates [site/CUSTOM_COMPONENTS.json](D:/ronal/Documents/3d-print-rig.worktrees/2/site/CUSTOM_COMPONENTS.json) mirrors owner source definitions
  - checks schema, duplicate IDs, path safety, and allowed navigation targets

Integrated gates:

- [scripts/check_repository.py](D:/ronal/Documents/3d-print-rig.worktrees/2/scripts/check_repository.py) now runs custom-extension validation before other repository checks.

Build integration:

- [scripts/build_site.py](D:/ronal/Documents/3d-print-rig.worktrees/2/scripts/build_site.py) now applies extension overlays using [scripts/apply_custom_extensions.py](D:/ronal/Documents/3d-print-rig.worktrees/2/scripts/apply_custom_extensions.py), producing owner extension artifacts in assembled output.

## Current custom extension artifacts

- [custom/manifest.json](D:/ronal/Documents/3d-print-rig.worktrees/2/custom/manifest.json)
- [custom/overlays/head-additions.sources.json](D:/ronal/Documents/3d-print-rig.worktrees/2/custom/overlays/head-additions.sources.json)
- [custom/components/custom-components.json](D:/ronal/Documents/3d-print-rig.worktrees/2/custom/components/custom-components.json)

Generated into build output:

- [site/CUSTOM_COMPONENTS.json](D:/ronal/Documents/3d-print-rig.worktrees/2/site/CUSTOM_COMPONENTS.json) (runtime mirror of owner custom component definitions)
- merged additions in `HEAD_ADDITIONS.json` for custom source attribution metadata

## Planned validation expansion

The following checks remain planned and should be implemented in `tools/validation/`:

1. duplicate IDs across core + custom merged catalogs
2. missing images/assets for custom records
3. disconnected graph nodes and invalid references
4. compatibility-loop detection
5. URL and release-pin integrity checks for custom external assets
6. translation key mismatch checks for custom UI additions

## Run locally

```sh
python tools/validation/check_custom_extensions.py
python scripts/check_repository.py
```
