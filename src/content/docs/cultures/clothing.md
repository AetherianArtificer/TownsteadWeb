---
title: Clothing
description: How a culture weights the clothes its people choose, and sets its default livery.
---

A culture's `clothing` block changes how likely its people are to wear each outfit. Every entry is a rate, not a rule: a culture makes some clothes more or less likely, and never forbids others.

## Example

```json
"clothing": {
  "skins": [
    { "pattern": "examplepack:skins/clothing/fisherfolk/", "rate": 6 }
  ],
  "types": [
    { "select": { "material": "wool", "layer": "outerwear" }, "rate": 4, "spirit": ["nautical"] },
    { "select": { "occasion": "formal" }, "rate": 0.5 }
  ],
  "sets": ["examplepack:oilskins"],
  "livery": "examplepack:fisherfolk/oilskin"
}
```

## Fields

| Field | Description |
| --- | --- |
| `skins` | Rates for clothing skins, by texture ID. See [Skins](#skins). |
| `types` | Rates for every clothing entry that a query describes. See [Types](#types). |
| `sets` | Clothing set IDs that the culture's people wear. Wardrobe rules that ask for the culture's sets use these. |
| `livery` | A livery style ID: the default livery of the culture's settlements. See [Livery](#livery). |
| `palette` | A list of dye colours, such as `"#5A3E2B"`. Accepted, but not used yet. |

## Skins

| Field | Description |
| --- | --- |
| `pattern` | A skin texture ID. A pattern that ends with `/` or `*` matches every ID that starts with it. Any other pattern matches one ID. |
| `rate` | The multiplier for matching skins. More than 1 makes them more likely, less than 1 makes them less likely. The default is 1. |
| `spirit` | Optional. A list of [Community Spirit](/guides/community-spirit/) axes. See [Spirit](#spirit). |

## Types

| Field | Description |
| --- | --- |
| `select` | A query. A clothing entry matches when it fits every field of the query. See [Queries](#queries). |
| `rate` | The multiplier for matching entries. The default is 1. |
| `spirit` | Optional. A list of Community Spirit axes. See [Spirit](#spirit). |

### Queries

Every query field is optional. A list matches when the entry has any of its values. An empty query matches every entry.

| Field | Values |
| --- | --- |
| `layer` | `base`, `outerwear`, `armour` or `accessory`. |
| `slot` | `head`, `body`, `legs`, `feet`, `back`, `belt`, `neck` or `hands`. An entry that covers all slots matches any slot. |
| `material` | One material or a list, such as `wool` or `["linen", "cotton"]`. |
| `spirit` | One Community Spirit axis or a list. Matches entries tagged with the axis. |
| `occasion` | One occasion or a list. |
| `thermal` | `warm`, `cool` or `any`. The default is `any`. |
| `source` | One source or a list: the pack or mod that supplies the entry. |

## How Rates Combine

- When several entries in `skins` or `types` match, their rates multiply.
- A culture with no entry that matches leaves the weight as it is.

### Spirit

An entry with `spirit` grows with the village. For each axis in the list, Townstead multiplies the rate by `1 + the village's share of that axis`. The share is from 0 to 1.

For example, `"rate": 4, "spirit": ["nautical"]` gives a rate of 4 in a village with no nautical buildings, and 6 in a village where half of the spirit is nautical.

## Mixed Cultures

A villager with a [mix of cultures](/cultures/mixed-cultures/) uses the clothing of every culture in the mix:

| Part | How it mixes |
| --- | --- |
| `skins`, `types` | Each rate counts as `rate ^ share`. A culture with the whole mix keeps its rates. A culture with a small share barely changes them. |
| `sets` | Only from cultures with a share of 25% or more. |
| `livery` | From the culture with the largest share. |

## Livery

`livery` names a livery style that people wear over their gear. A settlement uses the first livery that applies:

1. Townstead first uses a livery that the settlement proclaimed.
2. Then a livery that the settlement's faction, or a faction above it, proclaimed.
3. Then the `livery` of the culture that most residents of the settlement have. This is the culture default.

A subculture with no `livery` uses its parent's.
