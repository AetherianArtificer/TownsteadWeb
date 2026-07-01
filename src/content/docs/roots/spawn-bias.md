---
title: Spawn Bias
description: How roots, ancestries, and lineages weight natural founder selection by place.
---

Spawn bias answers: how likely is this root to appear here?

`spawn_bias` can be authored on ancestry, lineage, and root files. Ancestry and lineage provide reusable place weights, and the root can provide identity-specific weights for the same places.

## Field

```json
{
  "spawn_bias": {
    "default": 0.2,
    "biomes": {
      "minecraft:dark_forest": 3.0
    },
    "biome_tags": {
      "#minecraft:is_forest": 1.5
    },
    "dimensions": {
      "minecraft:the_nether": 0.0
    }
  }
}
```

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `default` | number | no | General weight when no more specific entry applies. |
| `biomes` | object | no | Biome id to weight. |
| `biome_tags` | object | no | Biome tag id to weight. The leading `#` is optional. |
| `dimensions` | object | no | Dimension id to weight. |

No individual field inside `spawn_bias` is required. Use only the weights that matter for that ancestry, lineage, or root override.

## Resolution

At a spawn point, Townstead resolves the effective weight in this order:

| Match | Behaviour |
| --- | --- |
| Exact biome | Wins over every other match. |
| Biome tag | Uses the highest matching tag weight. |
| Dimension | Used when no biome or tag matches. |
| `default` | Used when no specific entry matches. |
| Missing weight | Treated as `1.0`. |

Spawn bias from supporting files is resolved for the selected root. If the same place is weighted in more than one supporting file, the more identity-specific value is used.

## Example

```json
{
  "spawn_bias": {
    "default": 0.05,
    "biomes": {
      "minecraft:deep_dark": 2.4,
      "minecraft:dripstone_caves": 1.6,
      "minecraft:lush_caves": 1.6
    },
    "biome_tags": {
      "c:is_underground": 1.2
    }
  }
}
```

This is the sort of weighting a Moon Elf lineage might use. The lineage still belongs to the Elf ancestry; mixed ancestry labels belong in [Heritage](/roots/heritage/).
