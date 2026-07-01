---
title: Traits
description: Trait files, trait effects, and trait occurrence genes
---

Trait files register Townstead traits into MCA's trait system. Trait occurrence genes can grant or bias them at spawn.

:::caution[Under construction]
The trait system is still being shaped. The current file format is heavily centred on the existing immortal-style trait effect, and more documentation will come as Townstead clarifies the boundary between traits, genes, and possible Pheno-backed behaviour.
:::

## Trait Files

Path: `data/<namespace>/trait/<path>.json`

Schema: `townstead:trait/v1`

```json
{
  "schema": "townstead:trait/v1",
  "chance": 0,
  "inherit": 1,
  "usable_on_player": true,
  "hidden": false,
  "effects": [
    { "life.immortal": true }
  ]
}
```

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `schema` | string | yes | `townstead:trait/v1`. |
| `chance` | number | no | MCA trait chance. Defaults to `0`. |
| `inherit` | number | no | MCA inheritance weight. Defaults to `1`. |
| `usable_on_player` | boolean | no | Defaults to `true`. |
| `hidden` | boolean | no | Defaults to `false`. |
| `effects` | array | no | Effect entries. |

## Supported Effects

The currently documented effect surface is intentionally small.

| Effect | Value | Behaviour |
| --- | --- | --- |
| `life.immortal` | boolean | Marks the trait as immortal when true. |

## Trait Occurrence Gene

Gene type: `townstead_roots:trait_occurrence`

Trait occurrence genes roll at spawn. They are not stored as normal diploid alleles.

```json
{
  "schema": "townstead:gene/v2",
  "type": "townstead_roots:trait_occurrence",
  "trait": "my_pack:immortal",
  "delta": 0.25
}
```

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `trait` | id | yes | Trait id to grant or bias. |
| `delta` | number | no | Spawn chance adjustment. Defaults to `0`. |
| `force` | boolean | no | If true, the trait chance is treated as `1`. |

For mixed founders, trait occurrence chances are fraction-weighted across the selected roots.
