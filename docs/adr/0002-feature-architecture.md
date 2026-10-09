# ADR-0002: Feature Architecture Direction

- **Status:** Accepted
- **Date:** 2026-10-08

## Context

Runtime code has grown around page-centric controllers under `site/viewer/`.
This works, but increases coupling and review complexity as feature count
rises.

## Decision

Adopt an incremental migration path toward feature-first architecture:

- preferred target:
  - `src/features`
  - `src/shared`
  - `src/core`
  - `src/assets`
  - `src/config`
  - `src/tools`
- no big-bang rewrite
- preserve behavior, IDs, links, and compatibility expectations during migration

## Consequences

Positive:

- clearer ownership boundaries
- easier onboarding and refactor safety

Trade-offs:

- temporary mixed architecture during migration period
