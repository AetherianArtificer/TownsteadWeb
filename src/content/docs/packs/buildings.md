---
title: Buildings
description: Reference for Townstead building extension data packs.
---

Townstead extends MCA building types with a separate file. Keep the MCA building definition in `data/<namespace>/building_types/`, then put Townstead-specific catalog, spirit, spawn, dialogue, and site data under `extended_buildings`.

## File Location

Place extension files in:

```text
data/<namespace>/extended_buildings/<building_type>.json
```

The path after `extended_buildings/` is the MCA building type ID. For example:

```text
data/example/extended_buildings/kitchen_l1.json
```

extends the MCA building type `kitchen_l1`.

Nested paths are allowed and become part of the building type ID:

```text
data/example/extended_buildings/compat/farmersdelight/kitchen_l1.json
```

extends `compat/farmersdelight/kitchen_l1`.

## Minimal Example

```json
{
  "schema": "townstead:extended_building/v1",
  "catalog": {
    "node_item": "farmersdelight:cooking_pot"
  },
  "spirit": {
    "pastoral": 12,
    "commercial": 6
  }
}
```

This adds a catalog icon and community-spirit values to the matching MCA building type without changing MCA's own building JSON.

## Field Reference

| Field | Required | Description |
| --- | --- | --- |
| `schema` | Recommended | Identifies the file as a Townstead extended-building document. |
| `catalog` | No | Controls how the building appears in Townstead's catalog. |
| `spirit` | No | Adds community-spirit points when this building is present. |
| `spawn` | No | Restricts which roots can spawn from this building. |
| `dialogue` | No | Associates this building with general village-life dialogue topics. |
| `enclosure` | No | States whether Townstead accepts a room, an open-air site, or both. |
| `requires` | No | States where the building stands, such as over water or inside a fence ring. |
| `workers` | No | Careers that may visit this building for work while its orders are pending. See [Visiting Workers](#visiting-workers). |
| `storage_roles` | No | Semantic storage roles this building holds, such as `townstead:general`. See [Storage](/careers/storage/#building-storage-roles). |

## Catalog

```json
{
  "catalog": {
    "node_item": "minecraft:hay_block",
    "hide": false
  }
}
```

| Field | Default | Description |
| --- | ---: | --- |
| `node_item` |  | Item ID used as the building's catalog node icon. |
| `hide` | `false` | Hides the building from the catalog when true. |

## Spirit

```json
{
  "spirit": {
    "pastoral": 6,
    "commercial": 2
  }
}
```

Spirit keys must be registered Townstead spirit IDs. Values must be positive integers; zero and negative values are ignored.

## Spawn

```json
{
  "spawn": {
    "allowed_roots": ["townstead:human"],
    "denied_roots": ["example:visitor"],
    "check_village_dispositions": true
  }
}
```

| Field | Default | Description |
| --- | ---: | --- |
| `allowed_roots` | `[]` | Root IDs allowed to spawn from this building. Empty means any root is allowed unless denied. |
| `denied_roots` | `[]` | Root IDs that cannot spawn from this building. Deny rules win over allow rules. |
| `check_village_dispositions` | `true` | Applies the village-majority disposition filter when choosing a spawn. |

Townstead currently uses building spawn policies for MCA inn spawns. The format is kept general so other building-driven spawns can use the same data later.

Older packs may use `allowed_origins` and `denied_origins`; Townstead still reads them as fallback aliases.

## Dialogue Topics

```json
{
  "dialogue": {
    "topics": ["workshop", "metalworking"]
  }
}
```

`topics` contains semantic village-life topics that this exact building type satisfies. Dialogue may ask whether a village has a topic without knowing which building pack supplied it. A compatibility pack can therefore associate several alternative smithies with `metalworking`, while another pack can add new dialogue about the broader `workshop` topic.

Topics are plain, non-empty strings. They are not building IDs, and they do not inherit from similarly named building types. List every topic the building is meant to satisfy.

## Enclosure

```json
{
  "enclosure": "optional"
}
```

Use `enclosure` to state the physical form Townstead accepts for this building type.

| Value | Description |
| --- | --- |
| `required` | Townstead accepts a closed room only. This is the default. |
| `optional` | Townstead accepts a closed room or an open-air site. |
| `none` | Townstead accepts an open-air site only. |

MCA recognises a room by filling the air inside it and finding a roof above. A dock or a pen has no roof, so MCA rejects it. Set `enclosure` to `optional` or `none`, and Townstead recognises the building when a player adds it from the blueprint. A building type with an `enclosed` entry is also recognised when its ring closes. See [enclosed](#enclosed).

Townstead tries the room form first. When the player stands inside a closed room, MCA handles the report instead.

An older object form is still read:

```json
{
  "enclosure": { "minInterior": 4, "maxInterior": 1024 }
}
```

Townstead reads that form as `optional` and ignores the two interior values. Use `requires` to state the shape of the site.

## Site Requirements

MCA counts the blocks a building needs. MCA cannot state where those blocks stand. Use `requires` to add that condition.

```json
{
  "schema": "townstead:extended_building/v1",
  "enclosure": "optional",
  "requires": [
    { "surface_over": "#townstead:liquids", "count": 5 }
  ]
}
```

Write one entry per condition. Townstead accepts the building only when every entry is met.

### surface_over

Townstead looks for connected cells that a villager can stand on, with the named block below them.

| Field | Default | Description |
| --- | ---: | --- |
| `surface_over` |  | Block ID or `#tag` to find below the surface. |
| `count` | `1` | Number of cells needed. |
| `max_drop` | `6` | How far below a cell Townstead looks for the block. |

Use this entry for a dock. The deck can be any material, so slabs, stairs, planks, and masonry all work. Natural ground does not qualify, because the block below natural ground is the bed of the liquid and not the liquid. A waterlogged block counts as its fluid. Blocks in `#townstead:natural_surfaces`, such as ice and lily pads, never qualify.

### enclosed

Townstead moves over the ground the way a grazing animal moves. The entry is met only when an animal inside cannot get out.

- Townstead steps onto anything up to a slab high, and drops down any height.
- Townstead climbs 1 block onto natural ground in `#townstead:terrain`, such as dirt, grass, sand, and stone. A pen on a slope is therefore one pen.
- Fences, fence gates, walls, and doors are always closed. A fence gate is closed whether it is open or shut.
- Other solid blocks are closed, even at 1 block high. A row of hay bales or leaves is a wall.
- Townstead does not move diagonally. Fences that touch only at a corner close the ring.

| Field | Default | Description |
| --- | ---: | --- |
| `enclosed` |  | Set to `true` to require closed ground. |
| `min_interior` | `4` | Smallest interior area accepted. |
| `max_interior` | `4096` | Largest interior area accepted. |

Use this entry for a pen. A roof over the pen does not change the result.

When the last block of a ring is placed in a village, Townstead adds the building to the village. Townstead also checks the building again when a block near it changes. When the building opens, it stays in the village, and the nearest player sees where animals can get out. Villages with MCA's Auto Scan turned off are not changed. The server setting `mca_buildings.enableEnclosureRecognition` turns this off for the world.

When a player adds the building from the blueprint and the ring is open, Townstead shows where animals can get out.

### How Townstead measures the site

For a building type with `requires`, Townstead measures the building from the cells these entries return. A block is part of the building when it stands within 2 blocks horizontally of one of those cells, at any height. A lantern on a tall mast over the site counts. A fence 20 blocks away does not.

For a building type without `requires`, Townstead uses the `mergeRange` value from the MCA building type instead.

### Building checks

The `requires` list can also check a building that MCA already recognised:

```json
"requires": [
  { "decoration": "examplepack:throne", "count": 1 },
  { "size": { "min": 60, "max": 400 } },
  { "height": { "min": 12 } }
]
```

| Entry | Passes when |
| --- | --- |
| `decoration` | At least `count` (default `1`) [decorations](/packs/decorations/) of that ID have their anchor in the building. |
| `size` | MCA's floor area of the building is between `min` and `max`. |
| `height` | The height of the building is between `min` and `max`. |

When a building fails a check, Townstead does not give it this type, and tells the player what is missing, for example that a Keep needs a Throne.

## Compatibility

Older packs may still use Townstead fields directly inside MCA `building_types`, companion files under `data/<namespace>/spirit/`, or spawn policies under `data/<namespace>/building_spawn/`. Townstead still reads those formats for compatibility, but `extended_buildings` is the preferred place for new building data and wins when both define the same value.

## Visiting Workers

A career has one primary workplace, derived from its `poi` declarations in `work.json`. A building can additionally accept careers as visiting workers:

```json
{
  "schema": "townstead:extended_building/v1",
  "workers": ["townstead:cook", "townstead:baker"]
}
```

The building owns this list because it knows which trades it was built to host. The career still owns capabilities: its work tasks decide which stations and recipes the visitor may use. Listing Cook does not grant access to every machine in the room.

A worker services a compatible secondary building only while that building's order sheet has pending work, holds the assignment for one complete production cycle, and returns to their primary site when nothing is pending. Carried inventory belongs to the primary site.

## Storage Roles

```json
{
  "schema": "townstead:extended_building/v1",
  "storage_roles": ["townstead:general"]
}
```

`storage_roles` says what the building holds so that a career can prefer it for external storage. Townstead ships `townstead:general` for a village store; a pack may use any resource ID that its careers name in their `storage.preferred_roles`. See [Storage](/careers/storage/#building-storage-roles).
