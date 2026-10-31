---
title: Amenities
description: Make blocks in village buildings into services that villagers use for water, warmth, coolness, food, and rest.
---

An amenity is a block that villagers use to meet a need, such as a sink, a well, a heater, or a cooler. A villager walks to the block, uses it, and gets its effect.

Put each amenity in `data/<namespace>/amenity/<name>.json`.

Villagers use only amenities in complete buildings of their village, while they are inside the village border.

## Example

This amenity makes a kitchen sink a water source. A villager fills the sink if it is empty, drinks, and leaves it empty.

```json
{
  "schema": "townstead:amenity/v1",
  "mods": ["examplemod"],
  "blocks": ["examplemod:kitchen_sink"],
  "anchor": { "type": "pheno:block_state", "property": "half", "value": "lower" },
  "requires": { "type": "pheno:block_state", "property": "filled", "value": "true" },
  "prepare": { "type": "pheno:use_block", "item": "empty" },
  "behavior": { "type": "pheno:modify_block_state", "property": "filled", "value": "false" },
  "effect": { "type": "pheno:hydrate", "immediate": 6, "lasting": 8 }
}
```

## Fields

| Field | Description |
| --- | --- |
| `schema` | `townstead:amenity/v1`. |
| `mods` | Optional. Townstead loads the file only when these mods are present. |
| `blocks` | Required. Block IDs or `#tags`. |
| `kind` | Optional. A thermal amenity: `hearth` or `cool_spot`. See [Hearths and Cool Spots](#hearths-and-cool-spots). An amenity needs a `kind` or an `effect`. |
| `anchor` | Optional [block condition](/pheno/conditions/). Only the part of the block that passes it counts, for example the lower half of a tall block. |
| `requires` | Optional block condition. The amenity is ready when it passes. |
| `prepare` | Optional [block action](/pheno/actions/#block-actions). When `requires` fails, the villager runs it to make the amenity ready, such as filling a sink. |
| `behavior` | Optional block action. It runs on the block each time a villager uses the amenity, such as emptying the sink. |
| `effect` | Optional Pheno action on the villager, such as `pheno:hydrate` or `pheno:energize`. |

## How Villagers Use an Amenity

When a villager uses an amenity, Townstead does these steps:

1. It checks that the block still matches `blocks` and `anchor`.
2. If `requires` fails, it runs `prepare`, and checks `requires` again. Without a `prepare`, the villager cannot use the amenity.
3. It runs `behavior` on the block.
4. It runs `effect` on the villager.

If a step fails, the villager does not get the effect.

## What Villagers Look For

A villager chooses an amenity by its `effect`, in the same way as a [consumable](/packs/consumables/#need-effects):

| Effect | Villagers use the amenity when |
| --- | --- |
| `pheno:hydrate` | They are thirsty, or during a hangout where they drink. |
| `pheno:warm`, `pheno:cool` | They are too cold or too hot. |

Villagers read only effects with plain numbers that are not inside a condition.

## Hearths and Cool Spots

An amenity with a `kind` and no `effect` is a place to warm up or cool down. A villager who is too cold walks to a `hearth`. A villager who is too hot walks to a `cool_spot`. The warmth or coolness comes from the [climate](/climate/) at that place, not from the amenity.

```json
{
  "schema": "townstead:amenity/v1",
  "mods": ["examplemod"],
  "kind": "hearth",
  "blocks": ["examplemod:heater"],
  "requires": { "type": "pheno:block_state", "property": "lit", "value": "true" }
}
```

Townstead includes a `hearth` for every block in `#townstead:thermal/heat_sources`, and a `cool_spot` for every block in `#townstead:thermal/cooling_sources`. Villagers look for these places only when a temperature mod is installed.
