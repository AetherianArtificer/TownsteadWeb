---
title: Decorations
description: Define furniture sets, such as a hearth or a well, that Townstead recognises when a player builds them.
---

A decoration is a small set of blocks around one anchor block, such as a hearth, a well, a fountain, or a throne. A decoration is not a room or a building. A house or a yard can hold several decorations.

When a player places the last block of a set, Townstead recognises the decoration, shows particles, plays a sound, and names it on the action bar. When a player breaks a block, Townstead checks the set again, and removes the decoration if it is no longer complete.

A decoration can:

- add [Community Spirit](/guides/community-spirit/) to its village;
- warm or cool the air around it;
- be required by a building type, such as a throne in a great hall;
- show in the catalog.

Put each decoration in `data/<namespace>/decoration/<name>.json`.

## Example

This decoration is a hearth: a heat source with four masonry blocks within 3 blocks of it.

```json
{
  "schema": "townstead:decoration/v1",
  "anchor": ["#townstead:thermal/heat_sources"],
  "radius": 3,
  "requires": {
    "#townstead:masonry_materials": 4
  },
  "spirits": { "pastoral": 1 },
  "thermal": { "kind": "warming", "offset": 10, "radius": 6 },
  "icon": "minecraft:campfire"
}
```

## Fields

| Field | Default | Description |
| --- | --- | --- |
| `schema` | | `townstead:decoration/v1`. |
| `mods` | | Optional. Townstead loads the file only when these mods are present. |
| `anchor` | | Required, unless you use `variants`. A block ID or `#tag`, or a list of them. The set is built around this block. |
| `requires` | | The other blocks of the set: block IDs or `#tags`, each mapped to the number needed. |
| `radius` | `3` | How far from the anchor Townstead looks for the other blocks, from 1 to 6. Townstead counts the blocks in a cube around the anchor. |
| `variants` | | A list of material forms. See [Variants](#variants). |
| `supersedes` | | Decoration IDs of smaller sets that this set includes. See [Larger Sets](#larger-sets). |
| `spirits` | | Community Spirit points that the decoration adds to its village, by spirit. |
| `thermal` | | Warmth or coolness around the decoration. See [Warmth and Coolness](#warmth-and-coolness). |
| `icon` | | An item ID for the catalog. |

The name of the decoration is the translation key `decoration.<namespace>.<path>`, with dots in place of slashes in the path.

## Variants

A decoration can have several material forms that count as the same decoration, such as a sandstone well and a cobblestone well. Give each form its own `anchor` and `requires` in `variants`:

```json
{
  "schema": "townstead:decoration/v1",
  "radius": 6,
  "variants": [
    { "anchor": "minecraft:water", "requires": { "minecraft:smooth_sandstone": 80 } },
    { "anchor": "minecraft:water", "requires": { "minecraft:cobblestone": 60, "minecraft:oak_fence": 8 } }
  ],
  "spirits": { "nautical": 1 },
  "icon": "minecraft:water_bucket"
}
```

Townstead tries the variants in order and uses the first one that is complete. A decoration adds its spirit points once, whatever variant the player built.

## Larger Sets

A larger set can include a smaller one, for example a council fire that includes a hearth. List the smaller set in `supersedes`:

```json
"supersedes": ["examplepack:hearth"]
```

When both sets match the same anchor, Townstead uses the larger set. If a player breaks part of the larger set, the smaller set takes the anchor again, if it is still complete.

An anchor belongs to only one decoration. The anchor of one decoration never counts as a block of another. If two decorations can use the same anchor and neither lists the other in `supersedes`, Townstead logs a warning.

## Warmth and Coolness

```json
"thermal": { "kind": "warming", "offset": 10, "radius": 6 }
```

| Field | Default | Description |
| --- | --- | --- |
| `kind` | | `warming` (or `heating`) or `cooling`. |
| `offset` | `10` for warming, `8` for cooling | The change of air temperature at the anchor, in °C. |
| `radius` | `6` | How far the change reaches, in blocks, from 1 to 32. |

The change applies to the open air, outside rooms. It is largest at the anchor and gets smaller with distance. Villagers who are too cold or too hot also walk to these decorations. This needs a temperature mod. See [Climate](/climate/).

## Spirit

`spirits` maps spirit IDs to whole numbers of points. The spirit IDs are `nautical`, `pastoral`, `martial`, `scholar`, `industrious`, `commercial`, `tourism`, `magical`, `spiritual`, `haunted`, `mining`, `natural`, and `clandestine`. Townstead rejects a decoration with an unknown spirit.

## Buildings That Need a Decoration

A building type can require decorations inside it, in the `requires` list of its [extended-building file](/packs/buildings/#building-checks):

```json
"requires": [
  { "decoration": "examplepack:throne", "count": 1 }
]
```

## Pheno

The condition `pheno:near_decoration` is true when a recognised decoration is near the entity:

```json
{ "type": "pheno:near_decoration", "decoration": "examplepack:hearth", "radius": 4 }
```

Without `decoration`, any decoration counts. `radius` defaults to `4`, from 1 to 32.
