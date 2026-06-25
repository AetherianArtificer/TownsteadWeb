---
title: Pheno
description: Versioning and authoring reference for Townstead's shared condition and action language.
---

# Pheno

Pheno is Townstead's shared language for conditions, actions, selectors, values, and capabilities. Root genes and Reactions use it for `when` and `do`, and other systems can use the same vocabulary without creating their own rule language.

Much more documentation is coming for Pheno, including fuller condition, action, selector, and value references.

## Document Versions

Pheno is an embedded authoring language, not a data-pack document type. The root `schema` belongs to the system that owns the file. That document version determines which version of Pheno its nested conditions and actions use.

For example, a gene uses the gene schema:

```json
{
  "schema": "townstead:gene/v2",
  "type": "pheno:active_ability",
  "cooldown": "10s",
  "do": {
    "type": "pheno:heal",
    "amount": 4
  },
  "when": {
    "type": "pheno:health",
    "max": 10
  }
}
```

A reaction uses the reaction schema:

```json
{
  "schema": "townstead:reaction/v2",
  "when": {
    "type": "pheno:environment",
    "weather": "clear"
  },
  "do": {
    "type": "pheno:spawn_particles",
    "particle": "minecraft:happy_villager"
  }
}
```

Both schemas select the current Pheno authoring language for their embedded fields. Nested conditions and actions do not declare their own schema.

## Authoring

Pheno uses these common authoring fields:

| Field | Purpose |
| --- | --- |
| `when` | Condition controlling whether a behaviour applies. |
| `do` | Action or actions to run. |
| `on` | Event or target selection, depending on context. |
| `with` | Changes action context before running another action. |
| `gene` | Groups genetic metadata separately from behaviour fields. |

Readable units are accepted where the field schema supports them:

```json
{
  "cooldown": "3s",
  "chance": "50%"
}
```

Townstead converts current Pheno syntax into the runtime form before parsing. Legacy resources are left untouched so existing packs are not silently reinterpreted.
