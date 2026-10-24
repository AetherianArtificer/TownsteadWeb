---
title: Heritage
description: Mixed ancestry labels and carried ancestry fractions.
---

Heritage answers: what ancestry fractions does this individual carry?

Heritage profiles name ancestry fraction patterns. They do not create ancestry by themselves; they label a carried heritage map.

Path: `data/<namespace>/heritage/<path>.json`

Schema: `townstead:heritage/v1`

## Fields

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `schema` | string | yes | `townstead:heritage/v1`. |
| `display_name` | component | no | Shown when the match wins. |
| `demonym` | object | no | Demonym for this mixed heritage. |
| `backstory` | component | no | Optional descriptive text. |
| `priority` | number | no | Higher priority wins when more than one profile matches. Defaults to `0`. |
| `match` | object | one of `match` or `lineages` | Ancestry fraction requirements. |
| `lineages` | object | one of `match` or `lineages` | Lineage share requirements, in the same form as `match`. |
| `open_lineages` | boolean | no | `true` lets lineages the profile doesn't list make up the rest. Defaults to `false`. |
| `genes` | id array | no | Genes the heritage grants in its own right, expressed on top of what was inherited. They are not carried, so a child only expresses them by matching the profile too. A granted gene replaces the inherited gene at its locus, so a profile can change how a mix looks. For example, a Half-Cat profile can grant a human face and cat ears in the colour of the hair. A granted gene with variants picks one per individual, stable for that villager. |
| `hair` | boolean or object | no | Turns MCA hair on or off and limits its colours for characters that match this profile. See [Hair Policy](/roots/hair-policy/). |

## Example

```json
{
  "schema": "townstead:heritage/v1",
  "display_name": "Half-Moon-Elf",
  "priority": 10,
  "match": {
    "my_pack:human": { "min": 0.45, "max": 0.55 },
    "my_pack:elf": { "min": 0.45, "max": 0.55 }
  }
}
```

Each `match` entry can be a bare number for an exact fraction, or an object with `min` and `max`.

## Matching

A heritage profile matches when every listed ancestry is inside its range. The person can carry a small amount of ancestry not listed in the profile, but the unlisted total must be `0.05` or less.

For example, the `Half-Moon-Elf` profile above matches:

| Heritage Fractions | Result |
| --- | --- |
| `50% human`, `50% elf` | Matches. |
| `65% human`, `35% elf` | Does not match because it is outside the half-ancestry range. |
| `50% human`, `45% elf`, `5% dwarf` | Matches because the unlisted ancestry is within the `0.05` allowance. |
| `50% human`, `40% elf`, `10% dwarf` | Does not match because too much ancestry is outside the profile. |

If more than one profile matches, the profile with the highest `priority` wins. Use priority when a broad profile and a more specific profile can both apply.

```json
{
  "schema": "townstead:heritage/v1",
  "display_name": "Moon-Blooded",
  "priority": 20,
  "match": {
    "my_pack:elf": { "min": 0.45, "max": 0.75 },
    "my_pack:human": { "min": 0.2, "max": 0.55 }
  }
}
```

This profile could overlap with `Half-Moon-Elf`, so its higher priority lets it win for the narrower identity.

If no heritage profile matches, near-pure heritage keeps its dominant ancestry/root name, and mixed heritage falls back to a generated two-largest label. An ancestry carried mostly (70% or more) through one lineage is named by that lineage, For example, the child of a Moon Elf and a Feline parent shows "Moon Elf-Feline", not "Elf-Bestial".

## Lineage Bands

`lineages` matches lineage shares the way `match` matches ancestry shares. Use it to name a cross inside one ancestry:

```json
{
  "schema": "townstead:heritage/v1",
  "display_name": "Steam Drake",
  "priority": 20,
  "lineages": {
    "my_pack:fire_drake": { "min": 0.3, "max": 0.7 },
    "my_pack:ice_drake": { "min": 0.3, "max": 0.7 }
  },
  "genes": ["my_pack:steam_drake/scalding_breath"]
}
```

By default, unlisted lineages count against the profile in the same way as unlisted ancestries. That breaks a profile that names one side's lineage but should accept any partner, because a human parent may be plain (no lineage) or come from a human lineage. Set `open_lineages` and let `match` bound who the partner can be:

```json
{
  "schema": "townstead:heritage/v1",
  "display_name": "Half-Cat",
  "priority": 15,
  "match": {
    "townstead_roots:human": { "min": 0.3, "max": 0.7 },
    "my_pack:bestial": { "min": 0.3, "max": 0.7 }
  },
  "lineages": { "my_pack:feline": { "min": 0.3, "max": 0.7 } },
  "open_lineages": true
}
```

A common set of tiers for mixes with humans:

| Share | Name | Bands |
| --- | --- | --- |
| About half | Half-Cat | human `0.3`-`0.7`, the other `0.3`-`0.7` |
| About a quarter | Catblooded | human `0.7`-`0.9`, the other `0.1`-`0.3` |
| About three quarters | The lineage's own name | human `0.1`-`0.3`, the other `0.7`-`0.9` |

For example:

| Layer | Example |
| --- | --- |
| Species | Humanoid |
| Ancestry | Elf |
| Lineage | Moon Elf |
| Heritage | Human father plus Moon Elf mother can match `Half-Moon-Elf`. |

## Seed Heritage

| Root Shape | Seed Heritage |
| --- | --- |
| Root with ancestry and lineage | `100%` that ancestry, and `100%` that lineage. |
| Root with only an ancestry | `100%` that ancestry, with no lineage shares. |
| Legacy or malformed root without ancestry/lineage | Empty heritage map. |

Children average their parents' heritage maps, by ancestry and by lineage.
