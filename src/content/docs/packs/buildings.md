---
title: Buildings
description: Reference for Townstead building extension data packs.
---

Townstead extends MCA building types with a separate file. Keep the MCA building definition in `data/<namespace>/building_types/`, then put Townstead-specific catalog, spirit, spawn, dialogue, and enclosure data under `extended_buildings`.

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
| `enclosure` | No | Marks this building type as an open-air enclosure. |
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
