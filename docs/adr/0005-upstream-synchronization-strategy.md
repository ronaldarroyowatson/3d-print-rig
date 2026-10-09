# ADR-0005: Upstream Synchronization Strategy

- **Status:** Accepted
- **Date:** 2026-10-08

## Context

This fork must remain compatible with upstream improvements while
preserving owner-specific governance and extensions.

## Decision

Synchronization policy:

- keep owner-specific behavior in extension/custom layers where possible
- avoid unnecessary core divergence
- run full repository checks (`scripts/check_repository.py`) before merge/publish
- maintain explicit docs for migration and architecture decisions
- prioritize backward compatibility for shared links/configuration IDs

## Consequences

Positive:

- sustainable upstream sync with reduced conflict risk
- transparent change intent for future maintainers

Trade-offs:

- discipline required to avoid ad-hoc core modifications
