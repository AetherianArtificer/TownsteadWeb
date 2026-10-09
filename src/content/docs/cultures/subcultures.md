---
title: Subcultures
description: Peoples inside a culture, and how Community Spirit and forms of government draw villagers to them.
---

A subculture is a people inside a culture, such as the merchant houses or the knightly courts of a culture. Players only see the top culture. Townstead uses subcultures for:

- clothing, through the subculture's own `clothing`;
- conversations, through a voice that lists the subculture. See [Voices & Cultures](/conversations/voices/#which-voices-a-villager-uses);
- which forms of government a town founds, and which subculture its people drift toward.

## Making a Subculture

A subculture is a [culture file](/cultures/culture-files/) with `parent`:

```json
{
  "schema": "townstead:culture/v1",
  "parent": "examplepack:fisherfolk",
  "name": "Whalers",
  "spirit": { "nautical": 1.0, "martial": 0.4 },
  "forms": [
    { "profile": "examplepack:harbour_guild", "weight": 3 }
  ]
}
```

A subculture can have a subculture of its own. The top culture is the one with no `parent`.

## What a Subculture Takes from Its Parent

A field that a subculture leaves out comes from its parent:

| Field | From the parent |
| --- | --- |
| `name` | Always. Players see the top culture's name, so a subculture's own `name` does not show. |
| `naming`, `naming_tradition` | When the subculture has neither. |
| `settlement_names`, `faction_names` | When the subculture leaves the field out. |
| `demonym` | When the subculture has none. |
| `clothing` | Each part (`skins`, `types`, `sets`, `palette`, `livery`) that the subculture leaves out. |
| `spirit`, `forms` | Never. These belong to the subculture only. |

## Spirit

`spirit` maps [Community Spirit](/guides/community-spirit/) axes to weights, from 0 up. A village that is strong in those axes draws its people toward the subculture.

The axes are `nautical`, `pastoral`, `martial`, `scholar`, `industrious`, `commercial`, `tourism`, `magical`, `spiritual`, `haunted`, `mining`, `natural` and `clandestine`.

Townstead measures how well a village fits a subculture:

```text
fit = sum of (axis weight × how far the village's share of the axis is above an ordinary village's)
```

An ordinary village fits no subculture, so it draws nobody. A village with many docks and fishing buildings fits a subculture with `"nautical": 1.0`.

## Forms

`forms` lists the [founding profiles](/cultures/culture-packs/#founding-profiles) that the subculture's towns use. Each form of government has its own founding profile.

| Field | Required | Description |
| --- | --- | --- |
| `profile` | Yes | A founding profile ID. |
| `weight` | No | How often this subculture's towns use the profile, compared with other subcultures. 0 or more. The default is 1. A weight of 0 is ignored. |

The same profile can appear under more than one subculture.

## Founding a Village

When a village is founded on its own, Townstead picks a founding profile. A profile that a fitting subculture uses is more likely:

```text
profile weight × (1 + 2 × best fit of a subculture that uses the profile)
```

Townstead then picks the village's subculture from the subcultures that use that profile:

```text
weight of a subculture = form weight × (0.25 + fit)
```

When no subculture uses the profile, the village takes the top culture. When a profile is applied with a command, or when a player founds a village, the village takes the culture that the profile or the player names.

## Drift Between Subcultures

Every day, a village pulls its people toward the subcultures that suit it:

- a subculture whose `spirit` the village fits;
- a subculture whose `forms` include the village's founding profile.

So a fisherfolk town that builds many docks draws its people toward the whalers over the years. A culture with no fitting subculture keeps its people as they are. See [Mixed Cultures & Drift](/cultures/mixed-cultures/#home).

## Switchboard

The Switchboard lists only top cultures. A subculture follows the setting and the rate of its top culture.
