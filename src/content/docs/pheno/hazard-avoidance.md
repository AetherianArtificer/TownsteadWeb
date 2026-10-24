---
title: Hazard Avoidance
description: How villagers keep away from places that a pheno:action_over_time gene makes harmful.
---

A `pheno:action_over_time` gene can describe a hazard: a place that hurts the holder. Villagers with the gene keep away from that place. Players do not move on their own, so they only take the effect.

## Finding the Hazard

Townstead finds the hazard from the gene's `condition`. To test a block, Townstead checks the condition as if the villager stood on that block. Conditions about the place give the answer for that block. Conditions about the villager, such as worn equipment or active effects, do not change.

Townstead uses avoidance when both of these are true:

- The `action` is harmful (`pheno:ignite`, `pheno:damage`, `pheno:freeze`, or `pheno:exhaust`), or the gene sets `avoid`.
- The `condition` includes a check about the place. These conditions count: `pheno:environment`, `pheno:biome`, `pheno:block`, `pheno:block_in_radius`, `pheno:brightness`, `pheno:fluid_height`, `pheno:submerged_in`, `pheno:ambient_temperature`, `pheno:near_marker`, `pheno:distance_from_coordinates`, `pheno:dimension`, and a `pheno:value` that reads a `pheno:provider`.

A check inside `pheno:not`, or one with `"inverted": true`, does not count.

## What the Villager Does

A villager with a hazard does these things:

1. In the hazard, the villager goes to the nearest safe block.
2. When the villager has a destination in the hazard, Townstead gives it a safe destination instead.
3. When planning a route, the villager treats hazard blocks as dangerous. The villager goes around them when another route is available, and crosses them only when no other route reaches the destination.
4. At the edge of a hazard, the villager walks around on the safe side.
5. For a sun hazard, the villager stays off blocks in open sky, but only while the sky above the villager is dangerous. At night, in rain, and in a safe place, the villager walks normally.

## The avoid Field

Set `avoid` to change this:

| Value | Result |
| --- | --- |
| `true` | Avoids the hazard even when the action is not harmful, such as a weakness effect. |
| `false` | Turns off avoidance for a harmful gene. |
| object | Avoids the hazard with the settings below. |

| Field | Default | Description |
| --- | --- | --- |
| `flee_speed` | `1.2` | Walk speed when the villager leaves the hazard. |
| `roam_speed` | `0.6` | Walk speed when the villager changes destination or walks the safe side of an edge. |
| `search_radius` | `8` | How far, in blocks, Townstead looks for a safe block. The range is 2 to 32. |
| `edge_distance` | `3` | How near, in blocks, the hazard must be before the villager walks the safe side. The range is 1 to 8. |
| `roam` | `true` | Whether the villager walks the safe side of an edge. |
| `reject_destinations` | `true` | Whether Townstead replaces a destination in the hazard. |
| `route_around` | `true` | Whether routes treat hazard blocks as dangerous. |

## Examples

This gene burns a werebear in open daylight, and the werebear stays in shade:

```json
{
  "schema": "townstead:gene/v2",
  "type": "pheno:action_over_time",
  "display_name": "Daylight Burn",
  "interval": 20,
  "condition": {
    "type": "pheno:and",
    "conditions": [
      { "type": "pheno:environment", "exposure": ["sun"] },
      { "type": "pheno:equipped_item", "slot": "head", "inverted": true }
    ]
  },
  "action": { "type": "pheno:ignite", "seconds": 8 }
}
```

A villager with a hat does not burn, so the same villager with a hat does not avoid the sun.

A supported mod can report a hazard through a provider. Read it with a [`pheno:provider` value](/pheno/selectors-values/#values). Townstead asks the provider about each block it tests. This gene keeps a villager out of an area that the provider `examplemod:holy_ground` reports. The action does nothing, so `avoid` must be set:

```json
{
  "schema": "townstead:gene/v2",
  "type": "pheno:action_over_time",
  "display_name": "Unholy",
  "interval": 20,
  "condition": {
    "type": "pheno:value",
    "value": { "type": "pheno:provider", "provider": "examplemod:holy_ground" },
    "comparison": ">=",
    "compare_to": 1
  },
  "action": { "type": "pheno:nothing" },
  "avoid": { "search_radius": 16, "edge_distance": 4 }
}
```

To keep a villager away from heat or cold, use `pheno:ambient_temperature`. It reads the temperature from the active temperature mod, or from Townstead when no temperature mod is installed.
