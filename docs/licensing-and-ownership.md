# Licensing and Ownership Report

## Original repository

- Upstream project: `Psych0h3ad/3d-print-rig`
- Upstream URL: https://github.com/Psych0h3ad/3d-print-rig
- Published site: https://psych0h3ad.github.io/3d-print-rig/
- Fork target: `ronaldarroyowatson/3d-print-rig`

## License

- Primary license: **MIT License** (repository `LICENSE` file)
- Copyright notice: `Copyright (c) 2026 Psych0h3ad`
- License scope note in upstream: applies to the original viewer and repository helper code.

## Attribution requirements

Under MIT, your maintained fork is allowed to:

- use
- copy
- modify
- merge
- publish
- distribute
- sublicense
- sell

**Required condition:** include the copyright notice and permission notice in all copies or substantial portions of the software.

Practically for this project:

1. Keep upstream `LICENSE` intact in your repository.
2. Preserve attribution in documentation (README and this file).
3. Keep third-party notices intact (`docs/THIRD_PARTY_NOTICES.md` and any vendor licenses).
4. For new code written in your fork, optionally add your own copyright statements where appropriate, without removing upstream notices.

## Important licensing implications for this specific project

The upstream repository explicitly distinguishes software licensing from external CAD and content assets.

- MIT license covers repository software/components in scope described by upstream.
- Third-party CAD, meshes, printer designs, logos, and other externally authored assets can carry separate licenses.
- These third-party assets must continue to be tracked and attributed under their own license terms.

Implication: legal compliance depends on preserving and maintaining third-party notices as a first-class maintenance task.

## Recommended ownership strategy

### Recommendation: **Direct GitHub fork**

A direct fork is the best strategy for your goals because it:

- preserves upstream history automatically;
- keeps upstream synchronization straightforward (`upstream` remotes and periodic merges/rebases);
- keeps transparent attribution;
- supports long-term independent governance in your account;
- allows your repository to become the authoritative operational/documentation system for your printers.

### Alternative considered: new repository import

A fresh repository import is legal under MIT, but is less suitable because it increases future sync friction and weakens visible lineage.

## Long-term maintenance recommendations

1. **Branch governance**
   - Protect `main`.
   - Use PR-based changes only.
   - Require CI checks before merge.

2. **Attribution governance**
   - Keep upstream `LICENSE` unchanged.
   - Preserve/update `docs/THIRD_PARTY_NOTICES.md` with every content-source change.
   - Add a dedicated “Upstream Attribution and Licensing” section in README.

3. **Upstream sync policy**
   - Add upstream remote reference in maintainer docs.
   - Perform scheduled sync windows (e.g., monthly).
   - Label sync PRs separately from custom feature work.

4. **Custom extension boundary**
   - Isolate owner-specific additions under a dedicated extension layer (planned in later phases).
   - Prefer additive registrations over edits to upstream core files to minimize merge conflicts.

5. **Compliance checks**
   - Add automated checks for third-party notice drift and missing license references in later validation tooling.

## Legality conclusion

Creating and independently maintaining this fork in your GitHub account is legally permissible under MIT, provided required notices are preserved and third-party asset licenses continue to be honored.
