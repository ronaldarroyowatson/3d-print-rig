# Custom Extension System (Phase 7)

## Goal

Enable owner-specific additions without modifying core catalogs, so:

- upstream merges remain practical
- custom printer ecosystem grows independently
- merge conflicts stay localized and deterministic

## Proposed extension layout

```text
custom/
  manifest.json
  printers/
  toolheads/
  hotends/
  probes/
  electronics/
  canbus/
  accessories/
  mods/
  overlays/
```

## Extension model

### 1) Manifest-driven discovery

`custom/manifest.json` registers extension bundles and versions:

- extension id
- schema version
- enabled flag
- data roots
- optional dependency/order constraints

### 2) Overlay merge semantics

Deterministic precedence:

1. core source catalogs
2. upstream update patches
3. custom overlays

Merge operations:

- `add`: append a new entity
- `patch`: update allowed fields on existing entity by id
- `disable`: mark non-removable entities unavailable in local fork UI

### 3) Strict contracts

Every custom file validated against schema before build:

- required id uniqueness across core + custom
- reference integrity (machine/toolhead/hotend/probe IDs)
- URL/license metadata checks for third-party assets

## Runtime integration points

Core loaders should consume merged catalogs only; page modules stay unchanged.

Injection points:

- catalog assembly step in build scripts
- support index generation (`build_support_catalog.mjs`)
- runtime catalog fetch artifacts under `site/`

Implemented initial runtime surfaces:

- [custom-components.html](../site/viewer/custom-components.html) renders owner extension presets.
- [configurations.js](../site/viewer/configurations.js) now shows compatible owner presets for the active head selection using shared matcher logic in [custom-component-model.mjs](../site/viewer/custom-component-model.mjs).
- [site/CUSTOM_COMPONENTS.json](../site/CUSTOM_COMPONENTS.json) is the committed runtime mirror for source-mode local preview and assembled-site parity; it must match [custom/components/custom-components.json](../custom/components/custom-components.json).

## Validation rules (extension-specific)

Add checks in `tools/validation/`:

- duplicate IDs across core and custom
- unresolved references and dangling modules
- forbidden override fields (immutable identity/source metadata)
- optional warnings for shadowing upstream entities

## Upstream resilience strategy

- never edit core IDs for custom behavior
- prefer additive entities + compatibility predicates
- keep custom deltas in isolated files by feature
- maintain an extension compatibility report after each upstream sync

## Example overlay record

```json
{
  "op": "add",
  "entity": "probe",
  "id": "cartographer_v5_custom",
  "data": {
    "label": "Cartographer V5",
    "mounts": ["xol", "stealthburner"],
    "source": "owner-custom"
  }
}
```

## Migration rollout plan

1. Introduce schema + merge engine with no active custom records.
2. Move first owner additions into `custom/` only.
3. Gate CI with extension validation.
4. Decommission direct core-catalog edits for owner-only content.
