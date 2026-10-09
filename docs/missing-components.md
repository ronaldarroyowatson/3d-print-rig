# Missing Components and Gap Analysis (Phase 8)

## Method

This inventory was produced from current repository evidence in catalogs,
viewer modules, and docs.

Status definitions:

- **Supported**: clear catalog/runtime evidence of selectable/registered
  use.
- **Partial**: references exist, but no clear end-to-end selectable
  registration across all expected contexts.
- **Missing**: no meaningful implementation evidence found.

> Note: This report is a baseline for migration planning. Some items may be
> present as historical references, source notices, or partially wired
> modules without full compatibility coverage.

## Requested component matrix

- **Cartographer** — Supported: probe logic and catalog references present
  (`probe-checks`, public catalog/docs references). Next action: keep; add
  extension-based variants for your printers.
- **Beacon** — Supported: multiple head additions and catalog references
  (for example `beacon_revd` variants). Next action: keep; validate against
  your exact probe revisions.
- **Voron Tap** — Missing: no direct `voron tap` implementation evidence;
  only TapChanger context. Next action: add as a new
  probe/toolchanger-compatible feature set.
- **Klicky** — Partial: present in docs/localization/product links; unclear
  full registration footprint. Next action: promote to explicit
  compatibility entities and tests.
- **Euclid** — Missing: no relevant Euclid probe evidence; only
  `euclidean` text in vendor math files. Next action: add as a new probe
  family with mounts and constraints.
- **Galileo 2** — Supported: Galileo2 references in assets/catalog/docs.
  Next action: keep and map to your exact extrusion configs.
- **Galileo 2 SA** — Missing: no explicit `SA` variant evidence. Next
  action: add as a distinct extruder variant with constraints.
- **Dragon Ace** — Supported: present in head additions and Trinity
  docs/QA references. Next action: keep and verify mount matrix coverage.
- **Dragon UHF** — Supported: registry and component/citation evidence
  present. Next action: keep; verify all target machine families.
- **EBB36** — Supported: catalog/license and docs evidence; board
  references exist. Next action: keep; improve board capability metadata.
- **EBB42** — Partial: some references (including E3NG defaults), but
  uneven coverage. Next action: normalize as explicit board family in the
  compatibility catalog.
- **SB2209** — Partial: references appear mainly in board/license docs.
  Next action: add explicit board entities and mount/electrical
  constraints.
- **SB2240** — Partial: similar to SB2209; sparse direct registration
  evidence. Next action: add board entities + selectable integration.
- **U2C** — Missing: no explicit `u2c` implementation evidence. Next
  action: add as CAN infrastructure component.
- **CanBoot systems** — Partial: appears in board docs, not clearly modeled
  as a selectable system. Next action: add firmware/transport capability
  metadata.
- **Nevermore** — Partial: present in catalog/docs mentions, not clearly
  full compatibility layer. Next action: add as accessory family with
  machine constraints.
- **StealthChanger** — Supported: strong evidence in toolchanger
  modules/configuration/docs. Next action: keep; extend with your personal
  dock/toolbank variants.
- **ERCF** — Partial: sparse references (license/doc traces). Next action:
  add as feeder system feature with dependencies.
- **AFC** — Partial: multiple references, but status not uniformly explicit
  by machine. Next action: standardize AFC as a first-class accessory/
  feeder feature.
- **BoxTurtle** — Missing: no implementation evidence found. Next action:
  add as new accessory/automation module.
- **USB Umbilical systems** — Partial: umbilical route logic exists in
  selected machine modules. Next action: promote to explicit selectable
  wiring system options.
- **BTT boards** — Partial: mentions exist; full board modeling unclear.
  Next action: add board catalog with board-specific constraints.
- **Mellow boards** — Partial: mentions/product refs exist; explicit
  compatibility uncertain. Next action: add board catalog and tested
  machine pairings.

## Prioritized implementation order

1. **Missing critical controls**: Voron Tap, Euclid, Galileo 2 SA, U2C,
   BoxTurtle
2. **Board/canbus normalization**: EBB42, SB2209, SB2240, BTT, Mellow,
   CanBoot
3. **Accessory/feeder hardening**: Nevermore, ERCF, AFC, USB umbilicals
4. **Coverage upgrades**: Klicky and other partial probe integrations

## Data model requirements for new additions

Every new component should define:

- stable id + localized label
- type/family (`probe`, `board`, `feeder`, `accessory`,
  `firmware_transport`)
- compatibility predicates (machine/toolhead/hotend/extruder/gantry)
- required companion parts
- documentation links and source/license metadata
- validation fixtures and expected support-index outputs
