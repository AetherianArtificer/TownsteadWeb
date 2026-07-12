---
title: Diagnostics
description: How Pheno validates data and how to inspect loaded Pheno behaviour.
---

Pheno diagnostics are designed to make bad data visible instead of silently dropping behaviour.

The validator reports:

| Diagnostic | Meaning |
| --- | --- |
| Unknown type | A `type` does not resolve in the expected domain. |
| Missing required field | A field with generated metadata is required but absent. |
| Malformed scalar | A field expects a number, boolean, id, tag/id, duration, or percentage and received the wrong shape. |
| Resource meter shape | A `resources` block is not an object of named resource meters. |

Diagnostics include the resource id, JSON path, severity, message, and sometimes a suggested fix.

## Generated Reference

`/pheno dump` writes generated Pheno artifacts to the server's `pheno/` directory:

| File | Purpose |
| --- | --- |
| `types-manifest.json` | Machine-readable domains, registered type keys, and documented schemas. |
| `reference.md` | Generated Markdown reference from registered schemas and type keys. |
| `gene.schema.json` | Pragmatic JSON Schema for gene files. |

The generated reference is useful for audits, but it is not the whole manual. Some registered types currently lack field schemas, and runtime behaviour needs hand-written explanation.

## Live State

Two operator commands inspect resolved behaviour on live entities instead of loaded data:

| Command | Purpose |
| --- | --- |
| `/townstead debug powers` | Your own power-resolution chain: applied root, expressed genotype genes, the player-model expression gate, and every active power with its toggle state. |
| `/townstead debug glide` | Flight report for nearby villagers: flight gene and lift ability, threat state, and why the current situation does or does not produce a launch. |

See the [command reference](/reference/commands/) for the full catalogue.
