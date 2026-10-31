---
title: Venues
description: "Make buildings and decorations into places where villagers hang out."
---

A venue is a building type or a [decoration](/packs/decorations/) where villagers visit. Put each venue in `data/<namespace>/hangout_venue/<name>.json`.

```json
{
  "schema": "townstead:hangout_venue/v2",
  "buildings": ["inn"],
  "capacity": 8,
  "activities": ["examplepack:shared_meal", "examplepack:round", "examplepack:conversation"],
  "tags": ["townstead_hangouts:lively", "townstead_hangouts:social", "townstead_hangouts:drink"],
  "amenities": ["seating", "food", "drink", "conversation"],
  "staff_roles": {
    "bartender": { "type": "pheno:profession", "profession": "townstead:beverage_artisan", "path": "bartender" },
    "server": { "type": "pheno:profession", "profession": "townstead:cook" }
  },
  "admission_when": { "type": "pheno:life_stage", "stage": "adult" }
}
```

## Fields

| Field | Default | Description |
| --- | --- | --- |
| `schema` | | Required. `townstead:hangout_venue/v2`. |
| `mods` | | Optional. Townstead loads the file only when these mods are present. |
| `buildings` | | MCA building types that are this venue, such as `inn`. The building must be complete. |
| `decorations` | | Decoration IDs that are this venue, such as a fountain. A venue needs `buildings`, `decorations`, or both. |
| `capacity` | `8` | The largest number of visitors at one venue at a time. |
| `activities` | | The [activity](/hangouts/activities/) IDs, in order. Townstead tries them in this order when it starts an activity. |
| `tags` | | Venue tags. The [policy](/hangouts/policy/#personality-preferences) uses them to match personalities, and conversations can read them. |
| `amenities` | | Words that describe the venue, such as `seating`, `food`, `drink`, `water`, or `conversation`. See [Amenity Words](#amenity-words). |
| `staff_roles` | | Role names mapped to [Pheno conditions](/pheno/conditions/). See [Staff](#staff). |
| `open_when` | | Pheno condition on the villager. When it fails, the villager does not choose this venue. |
| `admission_when` | | Pheno condition on the villager. When it fails, the villager does not choose this venue. |

## Spots in a Venue

For a building venue, Townstead looks for [spots](/hangouts/spots/) in all the blocks of the building. For a decoration venue, Townstead looks only at the anchor block of the decoration, so a well with many water blocks does not get many seats. Use the `canonical_offset` of a spot to put places around the anchor.

A venue with no free spot cannot take visitors.

## Staff

`staff_roles` names the jobs at the venue. A villager is staff for a role when they pass its condition and their workplace is this building.

- Staff do not visit the venue where they work.
- An activity names the staff role that serves each course. See [Service](/hangouts/activities/#service).

Townstead rejects a venue when one of its activities uses a service role that is not in `staff_roles`.

## Amenity Words

The `amenities` list does not need files. Townstead reads these words:

| Word | Effect |
| --- | --- |
| `drink` | A seated visitor can take a drink from a container in the building, about once a minute. Townstead uses the age and drunkenness rules of its tavern round. This needs container sourcing to be on. |
| Any word | A conversation line can test it with `venue.amenity`. See [Conversations](/conversations/). |
