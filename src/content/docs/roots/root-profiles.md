---
title: Root Profiles
description: Root files and assignable Roots identity profiles
---

A root is the top-level identity assigned to villagers and players. Commands, catalogues, inheritance, and appearance systems all work from that assigned root.

Path: `data/<namespace>/root/<path>.json`

Schema: `townstead:root/v1`

## How Root Profiles Fit

Root is the top-level identity concept. A root file references the species, ancestry, and lineage that support the assigned identity rather than sitting below them as a final biological tier.

```text
Root
├─ Species
├─ Ancestry
└─ Lineage
```

Root fields describe the assigned identity and connect it to the species, ancestry, and lineage data that define its inherited traits.

## Fields

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `schema` | string | yes | `townstead:root/v1`. |
| `display_name` | component | no | Shown as the root name. |
| `species` | id | no | Overrides ancestry/lineage species. |
| `ancestry` | id | yes | The broad ancestry this root belongs to. Should match the lineage's ancestry. |
| `lineage` | id | yes | The lineage this root belongs to. Lineage genes are layered after ancestry genes. |
| `demonym` | object | no | Overrides lineage and ancestry demonym. |
| `backstory` | component | no | Overrides lineage and ancestry backstory. |
| `spawn_bias` | object | no | Identity-specific founder weighting. See [Spawn Bias](/roots/spawn-bias/). |

## Example

```json
{
  "schema": "townstead:root/v1",
  "display_name": "Moon Elf",
  "ancestry": "my_pack:elf",
  "lineage": "my_pack:moon_elf"
}
```

## Genome Resolution

When Townstead resolves a root's effective genome, it starts from the assigned root and reads the supporting data that root references.

Species, ancestry, and lineage contribute the inherited genes for that root. Put broad body defaults on species, broad population traits on ancestry, and sub-race or branch traits on lineage.
