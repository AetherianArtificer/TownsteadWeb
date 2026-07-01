---
title: Ancestry & Lineage
description: Broad inherited populations, named subgroups, and their inheritance fields.
---

Ancestry and lineage are supporting identity files that roots can reference.

Species decides the body-and-asset boundary. Ancestry describes a broad inherited population inside that species like Elf, Dwarf, or Orc. Lineage describes a sub-race or biological branch within an ancestry, such as Moon Elf, Hill Dwarf, or Blood Orc.

A root is the top-level identity assigned in game. It references ancestry and lineage data to explain inheritance, naming, spawn weighting, and broad traits.

## How They Combine

The runtime starts with the selected root. From there, Townstead follows that root's species, ancestry, and lineage references to gather body defaults, broad population data, and subgroup data.

The root remains the assigned identity. Its supporting files provide reusable context for inheritance, assets, spawn weighting, naming, and broad biological traits.


## Ancestry

An ancestry is a broad population within a species: human, elven, dwarven, goblin, merfolk, or whatever fits the pack.

Use ancestry for traits that should belong to a large population rather than one particular family, faction, or root.

Path: `data/<namespace>/ancestry/<path>.json`

Schema: `townstead:ancestry/v1`

### Ancestry Fields

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `schema` | string | yes | `townstead:ancestry/v1`. |
| `display_name` | component | no | Shown as the ancestry name. |
| `species` | id | no | Species used by roots that do not set their own species. |
| `demonym` | object | no | Member naming used by roots that do not override it. |
| `backstory` | component | no | Description used by roots that do not override it. |
| `genes` | array | no | Broad ancestry genes. |
| `spawn_bias` | object | no | Natural founder weighting. See [Spawn Bias](/roots/spawn-bias/). |
| `personalities` | object | no | Broad personality allow/deny policy. See [Personality Policy](/roots/personality-policy/). |

### Ancestry Example

```json
{
  "schema": "townstead:ancestry/v1",
  "display_name": { "translate": "ancestry.my_pack.elf" },
  "species": "my_pack:elf",
  "demonym": {
    "singular": "Elf",
    "plural": "Elves",
    "adjective": "Elven"
  },
  "backstory": { "translate": "ancestry.my_pack.elf.backstory" },
  "genes": [
    "my_pack:silver_eyes",
    "my_pack:night_vision"
  ]
}
```

## Lineage

A lineage is a named sub-race or biological specialization of an ancestry.

Use lineage when you want a branch under an ancestry that can carry its own inherited traits, appearance defaults, physiology, spawn weighting, naming, or personality policy.

Path: `data/<namespace>/lineage/<path>.json`

Schema: `townstead:lineage/v1`

### Lineage Fields

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `schema` | string | yes | `townstead:lineage/v1`. |
| `display_name` | component | no | Shown as the lineage name. |
| `ancestry` | id | no | The ancestry this lineage specializes. |
| `demonym` | object | no | Overrides ancestry demonym when present. |
| `backstory` | component | no | Overrides ancestry backstory when present. |
| `genes` | array | no | Lineage-specific genes layered after ancestry genes. |
| `spawn_bias` | object | no | Lineage-specific founder weighting. See [Spawn Bias](/roots/spawn-bias/). |
| `personalities` | object | no | Lineage personality allow/deny policy. See [Personality Policy](/roots/personality-policy/). |

### Lineage Example

```json
{
  "schema": "townstead:lineage/v1",
  "display_name": { "translate": "lineage.my_pack.moon_elf" },
  "ancestry": "my_pack:elf",
  "demonym": {
    "singular": "Moon Elf",
    "plural": "Moon Elves",
    "adjective": "Moon Elven"
  },
  "genes": [
    "my_pack:moon_elf_skin",
    { "gene": "my_pack:darkvision", "occurrence": 0.85 }
  ],
  "spawn_bias": {
    "default": 0.6,
    "biomes": {
      "minecraft:dark_forest": 2.0
    },
    "biome_tags": {
      "#minecraft:is_forest": 1.4
    }
  }
}
```

## Gene Resolution

The effective founder genome is resolved from the root's species, ancestry, and lineage.

The root is the identity being resolved. Species, ancestry, and lineage provide reusable support genes. These layers are composed in order, so the effective genome keeps genes from each layer.

When Townstead seeds founder genes and prepares inherited genes for display, same-locus genes compete so the later, more identity-specific entry is the one expressed for that locus. Genes without a shared locus remain alongside each other.

This makes ancestry a good place for broad inherited traits, and lineage a good place for more specific traits that should layer on top. For example, an ancestry might provide a general life cycle, while a lineage can provide a more specific life-cycle gene at the same locus.

## Demonym And Backstory

Ancestry and lineage can both provide naming text for roots that reference them.

Use ancestry demonyms and backstory for broad population language, such as the shared name and history of elves or dwarves. Use lineage text when a subgroup should have its own name, tone, or history, such as Moon Elves or Hill Dwarves.

If a root needs different wording, define `demonym` or `backstory` on the root itself.
