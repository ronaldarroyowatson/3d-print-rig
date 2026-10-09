# ADR-0003: Extension Layer Policy

- **Status:** Accepted
- **Date:** 2026-10-08

## Context

Owner-specific additions must survive upstream updates without requiring risky direct edits to core catalogs and runtime behavior.

## Decision

Use an additive extension layer:
- source of truth under `custom/`
- deterministic merge/application via build scripts
- validation gate in `tools/validation/check_custom_extensions.py`
- runtime mirror (`site/CUSTOM_COMPONENTS.json`) must match extension source definitions

## Consequences

Positive:
- reduced merge conflict pressure
- controlled extensibility with reproducible behavior

Trade-offs:
- extra build/validation steps for extension updates
