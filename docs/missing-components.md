# Missing Components and Gap Analysis (Phase 8)

## Method

This inventory was produced from current repository evidence in catalogs, viewer modules, and docs.

Status definitions:

- **Supported**: clear catalog/runtime evidence of selectable/registered use.
- **Partial**: references exist, but no clear end-to-end selectable registration across all expected contexts.
- **Missing**: no meaningful implementation evidence found.

> Note: This report is a baseline for migration planning. Some items may be present as historical references, source notices, or partially wired modules without full compatibility coverage.

## Requested component matrix

| Component | Status | Evidence summary | Next action |
|---|---|---|---|
| Cartographer | Supported | Probe logic and catalog references present (`probe-checks`, public catalog/docs references). | Keep; add extension-based variants for your printers. |
| Beacon | Supported | Multiple head additions and catalog references (e.g., `beacon_revd` variants). | Keep; validate against your exact probe revisions. |
| Voron Tap | Missing | No direct `voron tap` implementation evidence; only TapChanger context. | Add as new probe/toolchanger-compatible feature set. |
| Klicky | Partial | Present in docs/localization/product links; unclear full registration footprint. | Promote to explicit compatibility entities and tests. |
| Euclid | Missing | No relevant Euclid probe evidence; only `euclidean` text in vendor math files. | Add as new probe family with mounts and constraints. |
| Galileo 2 | Supported | Galileo2 references in assets/catalog/docs. | Keep and map to your exact extrusion configs. |
| Galileo 2 SA | Missing | No explicit `SA` variant evidence. | Add as distinct extruder variant with constraints. |
| Dragon Ace | Supported | Present in head additions and Trinity docs/QA references. | Keep and verify mount matrix coverage. |
| Dragon UHF | Supported | Registry and component/citation evidence present. | Keep; verify all target machine families. |
| EBB36 | Supported | Catalog/license and docs evidence; board references exist. | Keep; improve board capability metadata. |
| EBB42 | Partial | Some references (including E3NG defaults), but uneven coverage. | Normalize as explicit board family in compatibility catalog. |
| SB2209 | Partial | References appear mainly in board/license docs. | Add explicit board entities and mount/electrical constraints. |
| SB2240 | Partial | Similar to SB2209; sparse direct registration evidence. | Add board entities + selectable integration. |
| U2C | Missing | No explicit `u2c` implementation evidence. | Add as CAN infrastructure component. |
| CanBoot systems | Partial | Appears in board docs, not clearly modeled as selectable system. | Add firmware/transport capability metadata. |
| Nevermore | Partial | Present in catalog/docs mentions, not clearly full compatibility layer. | Add as accessory family with machine constraints. |
| StealthChanger | Supported | Strong evidence in toolchanger modules/configuration/docs. | Keep; extend with your personal dock/toolbank variants. |
| ERCF | Partial | Sparse references (license/doc traces). | Add as feeder system feature with dependencies. |
| AFC | Partial | Multiple references, but status not uniformly explicit by machine. | Standardize AFC as first-class accessory/feeder feature. |
| BoxTurtle | Missing | No implementation evidence found. | Add as new accessory/automation module. |
| USB Umbilical systems | Partial | Umbilical route logic exists in selected machine modules. | Promote to explicit selectable wiring system options. |
| BTT boards | Partial | Mentions exist; full board modeling unclear. | Add board catalog with board-specific constraints. |
| Mellow boards | Partial | Mentions/product refs exist; explicit compatibility uncertain. | Add board catalog and tested machine pairings. |

## Prioritized implementation order

1. **Missing critical controls**: Voron Tap, Euclid, Galileo 2 SA, U2C, BoxTurtle
2. **Board/canbus normalization**: EBB42, SB2209, SB2240, BTT, Mellow, CanBoot
3. **Accessory/feeder hardening**: Nevermore, ERCF, AFC, USB umbilicals
4. **Coverage upgrades**: Klicky and other partial probe integrations

## Data model requirements for new additions

Every new component should define:

- stable id + localized label
- type/family (`probe`, `board`, `feeder`, `accessory`, `firmware_transport`)
- compatibility predicates (machine/toolhead/hotend/extruder/gantry)
- required companion parts
- documentation links and source/license metadata
- validation fixtures and expected support-index outputs
