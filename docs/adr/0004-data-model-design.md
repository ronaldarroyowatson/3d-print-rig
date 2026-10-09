# ADR-0004: Data Model Design Policy

- **Status:** Accepted
- **Date:** 2026-10-08

## Context

The project relies on many catalogs and configuration datasets.
Inconsistent IDs or schema drift can break runtime behavior and support-index
generation.

## Decision

Adopt data-model rules:

- stable IDs and explicit version/schema markers where practical
- checksum/source validation for pinned assets and sensitive catalogs
- strict reference integrity checks in publication workflow
- avoid magic strings and duplicate constants in new logic

## Consequences

Positive:

- stronger data integrity and safer catalog evolution

Trade-offs:

- additional validator maintenance effort
