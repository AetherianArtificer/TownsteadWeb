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
| `match` | object | yes | Ancestry fraction requirements. |

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

If no heritage profile matches, near-pure heritage keeps its dominant ancestry/root name, and mixed heritage falls back to a generated two-largest label.

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
| Root with ancestry and lineage | `100%` that ancestry. |
| Legacy or malformed root without ancestry/lineage | Empty heritage map. |

Children average their parents' heritage maps.
