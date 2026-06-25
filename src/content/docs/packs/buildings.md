---
title: Buildings
description: Reference for Townstead building extension data packs.
---

Townstead extends MCA building types with a separate file. Keep the MCA building definition in `data/<namespace>/building_types/`, then put Townstead-specific catalog, spirit, spawn, and enclosure data under `extended_buildings`.

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
| `enclosure` | No | Marks this building type as an open-air enclosure. |

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

## Enclosures

```json
{
  "enclosure": {
    "minInterior": 4,
    "maxInterior": 1024
  }
}
```

Enclosures are open-air building types such as pens and docks. Townstead derives perimeter and interior requirements from the matching MCA building type's `blocks` map:

- Fences, fence gates, and walls become perimeter requirements.
- Other blocks become interior signatures for classification.

| Field | Default | Description |
| --- | ---: | --- |
| `minInterior` | `4` | Smallest interior area accepted for this enclosure. |
| `maxInterior` | `1024` | Largest interior area accepted for this enclosure. |

The matching MCA building type still needs to define its block requirements in `building_types`.

## Compatibility

Older packs may still use Townstead fields directly inside MCA `building_types`, companion files under `data/<namespace>/spirit/`, or spawn policies under `data/<namespace>/building_spawn/`. Townstead still reads those formats for compatibility, but `extended_buildings` is the preferred place for new building data and wins when both define the same value.
