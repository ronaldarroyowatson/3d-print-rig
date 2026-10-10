# Part interaction roadmap

This document defines the implementation plan for two feature tracks:

1. Select visible CAD parts and inspect part-specific details.
2. Hide/unhide (and later isolate or reposition) selected parts.

It is scoped to the interactive viewer and follows current composition rules.

## Goals

- Make model inspection faster for owners planning real printer changes.
- Expose stable part identity and source metadata from displayed meshes.
- Add reversible visibility controls without breaking existing configuration
  flows.

## Non-goals (initial phase)

- Full CAD authoring pipeline replacement.
- Automatic per-part slicing profile generation from geometry.
- Physics-accurate articulated motion for every panel and mechanism.

## Current state

- Meshes are already loaded with per-part keys in runtime `userData`.
- Viewer controls currently drive visibility by configuration, motion and
  accessory state.
- No direct click-to-inspect behavior exists in the printer viewer.

## Data contract for part inspector

Runtime mesh metadata (minimum fields):

- `partKey`: stable key used by current catalog/manifest
- `partLabel`: display label for the selected part
- `moduleId`: source module or stock assembly bucket
- `partGroup`: grouping value from source manifest rows
- `partComponent`: optional component classifier from source metadata

Future mapping contract for print guidance:

- `partKey -> printable files[]`
- file attributes: source URL/path, print notes, material, nozzle, layer
- provenance/version marker for each mapping source
- optional rule-based fallback matching (`rules[]`) for groups of parts before
  exact key mappings are complete

## Architecture

### Track A: part selection and metadata inspection

- Add `site/viewer/part-inspector.js` as a focused UI + interaction module.
- Use a raycaster on pointer click to pick visible meshes.
- Highlight selected mesh and show metadata in a sidebar panel.
- Keep all existing camera and motion controls unchanged.

### Track B: visibility controls

- Track hidden meshes in a local hidden set.
- Add actions:
  - Hide selected
  - Unhide all hidden by inspector
- Re-apply hidden overrides after existing visibility updates so state is
  stable when configuration changes.

## Incremental milestones

1. **MVP (completed)**
   - Click-to-select visible parts in printer viewer.
   - Sidebar panel with key metadata.
   - Hide selected and unhide all controls.
2. **Catalog mapping (initial scaffolding completed)**
   - Added `PART_PRINT_PROFILES.json` and custom mirror generation.
   - Part inspector now shows mapped file/settings/notes when available.
   - Current mappings are starter records and should be expanded per part.
   - Part picking support is now wired in both V2.4 controllers
     (`v24-reference.js` and `v24-app.js`) for parity with Trident.
3. **Catalog mapping expansion**
   - Add print-file mapping JSON keyed by `partKey`.
   - Show filename(s), labels and print notes in the inspector.
4. **Isolation tools**
   - Isolate selected part/group.
   - Quick toggles for occluding assemblies (doors, panels).
5. **Panel/door presets**
   - Add curated open/closed transforms where pivot metadata is reliable.
6. **Advanced planning**
   - Optional exports: selected-part list for print planning.

## Risks and mitigations

- **Risk:** part keys differ across variants or source modules.
  - **Mitigation:** keep key-based mappings versioned and variant-aware.
- **Risk:** visibility overrides conflict with existing control flows.
  - **Mitigation:** apply overrides after runtime visibility decisions.
- **Risk:** moving parts needs explicit pivot metadata.
  - **Mitigation:** start with hide/isolate before articulated transforms.

## Validation checklist

- Selecting a visible part updates inspector metadata.
- Orbit/pan does not trigger accidental selection during drag.
- Hide selected makes only that selected part invisible.
- Unhide all restores inspector-hidden meshes.
- Existing configuration, motion and accessory controls still work.

## Related files

- `site/viewer/app.js`
- `site/viewer/part-inspector.js`
- `site/viewer/workspace.css`
- `site/viewer/index.html`
- `site/viewer/v24-reference.js`
- `site/viewer/v24-app.js`
- `site/PUBLIC_CATALOG.json`
