---
title: Gene Files
description: Gene file anatomy, variants, loci, and companion resources
---

Gene files live in `data/<namespace>/gene/<path>.json` and use `townstead:gene/v2`.

## File Anatomy

```json
{
  "schema": "townstead:gene/v2",
  "type": "pheno:attribute",
  "display_name": "Strong",
  "description": "Increases attack damage.",
  "category": "body",
  "dominance": "dominant",
  "locus": "my_pack:strength",
  "weight": 1,
  "attribute": "minecraft:generic.attack_damage",
  "amount": 2.0,
  "operation": "add"
}
```

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `schema` | string | yes | `townstead:gene/v2`. |
| `type` | string | yes | Gene type key. |
| `display_name` | component | no | Display name for UI and catalogues. |
| `description` | component | no | Longer help text. |
| `category` | string | no | Defaults to `general`. |
| `dominance` | string | no | `dominant` by default, or `recessive`. |
| `locus` | id | no | Inheritance slot. Some gene types provide a default. |
| `weight` | integer | no | Gene expression tie-break weight. Minimum `1`. |
| `variants` | object | no | Named variants. |
| `resources` | object | no | Local companion resources for this gene. |

## Variants

`variants` turns one gene file into multiple inherited options.

```json
{
  "schema": "townstead:gene/v2",
  "type": "townstead_roots:eyes",
  "display_name": "Eyes",
  "variants": {
    "round": {
      "display_name": "Round Eyes",
      "weight": 4,
      "texture": "my_pack:textures/face/eyes/round.png"
    },
    "glowing": {
      "display_name": "Glowing Eyes",
      "weight": 1,
      "texture": "my_pack:textures/face/eyes/glowing.png",
      "glow": true
    }
  }
}
```

Each variant inherits the gene's shared fields and adds its own config. Variant `weight` controls founder rolling and tie-breaking between two carried variants of the same gene.

## Locus

A locus is the inheritance slot where related genes compete.

Genes at the same locus behave like different versions of the same inherited trait. Genes at different loci can both be expressed.

Use an explicit `locus` when two separate gene files should compete for the same inherited slot. For example, a species can define the usual eye shapes, while a lineage can define a narrower eye set that replaces it:

```json
{
  "schema": "townstead:gene/v2",
  "type": "townstead_roots:eyes",
  "display_name": "Moon Elf Eyes",
  "locus": "my_pack:eyes",
  "variants": {
    "silver": {
      "display_name": "Silver Eyes",
      "weight": 4,
      "texture": "my_pack:textures/face/eyes/silver.png"
    },
    "luminous": {
      "display_name": "Luminous Eyes",
      "weight": 1,
      "texture": "my_pack:textures/face/eyes/luminous.png",
      "glow": true
    }
  }
}
```

If this lineage gene and the species eye gene both use `my_pack:eyes`, only one eye-shape gene is expressed at that locus. If each gene has its own locus, both can be kept independently.

## Companion Resources

A gene can declare local `resources`. Each resource becomes a real `pheno:resource` gene with a derived id of `<gene_id>/<resource_name>`.

Inside the same gene, a bare `"resource": "mana"` or `"compared_to_resource": "mana"` reference is rewritten to the derived id.

```json
{
  "schema": "townstead:gene/v2",
  "type": "pheno:active_ability",
  "display_name": "Vault",
  "cooldown": 60,
  "resource_cost": {
    "resource": "mana",
    "amount": 10
  },
  "action": {
    "type": "pheno:jump",
    "strength": 1.2
  },
  "resources": {
    "mana": {
      "max": 40,
      "regen": 1,
      "regen_interval": 20
    }
  }
}
```

Companion resources ride along with the parent gene's expression, so they tick and sync only when the parent gene is expressed.
