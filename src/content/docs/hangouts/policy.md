---
title: Hangout Policy
description: "Who visits hangouts, how far and how long, and which venues each personality prefers."
---

A hangout policy sets who visits, how far they go, how long they stay, and which venues they like. Put each policy in `data/<namespace>/hangout_policy/<name>.json`.

Townstead includes `townstead:ordinary_social`. To change it, put a file at `data/townstead/hangout_policy/ordinary_social.json` in your pack. You can also add a second policy for a different group of villagers, with its own `visitor_when`.

```json
{
  "schema": "townstead:hangout_policy/v2",
  "social_radius": 24,
  "venue_radius": 256,
  "minimum_visit_ticks": 500,
  "maximum_visit_ticks": 1800,
  "revisit_cooldown_ticks": 2400,
  "retry_cooldown_ticks": 200,
  "arrival_timeout_ticks": 600,
  "lease_ticks": 1400,
  "visitor_when": { "type": "pheno:profession", "profession": "#townstead_hangouts:on_duty", "inverted": true },
  "bond_weights": { "townstead:marriage": 100, "townstead:friendship": 25 },
  "personality_tag_weights": {
    "introverted": { "townstead_hangouts:quiet": 2.0, "townstead_hangouts:lively": 0.55 },
    "default": { "townstead_hangouts:social": 1.2 }
  }
}
```

## Fields

| Field | Default | Description |
| --- | --- | --- |
| `schema` | | Required. `townstead:hangout_policy/v2`. |
| `mods` | | Optional. Townstead loads the file only when these mods are present. |
| `visitor_when` | | Pheno condition. Only villagers who pass it visit under this policy. |
| `companion_when` | | Pheno condition. Only visitors who pass it join another visitor's activity. |
| `venue_radius` | `64` | How far from the villager, in blocks, a venue can be. |
| `social_radius` | `24` | How far apart, in blocks, two visitors can be to share an activity. |
| `minimum_visit_ticks` | `400` | The shortest visit. |
| `maximum_visit_ticks` | `1800` | The longest visit. Each visit lasts a random time between the two, and ends when the villager's Meet time ends. |
| `revisit_cooldown_ticks` | `2400` | How long a villager waits after a visit before the next one. |
| `retry_cooldown_ticks` | `200` | How long a villager waits after a visit that failed, for example when they could not reach the spot. |
| `arrival_timeout_ticks` | `200` | The shortest time a villager has to reach the spot. Townstead gives more time for a long walk. |
| `lease_ticks` | `arrival_timeout_ticks` + 600 | How long Townstead reserves the place and the spot without a check. Townstead renews it while the visit lasts. |
| `bond_weights` | | Bond kinds mapped to scores. See [Bonds](#bonds). |
| `personality_tag_weights` | | Personalities mapped to venue tag weights. See [Personality Preferences](#personality-preferences). |

When several policies pass `visitor_when` for a villager, Townstead tries them in turn until one finds a venue.

## Bonds

When Townstead fills an activity, it asks first the visitors with the highest bond score with the visitor who starts it. The score adds the `bond_weights` of every active bond between the two, in both directions. With the example, a married couple sits together before two friends.

## Personality Preferences

`personality_tag_weights` maps each MCA personality to weights for venue `tags`. A villager's weight for a venue is the average of the weights for the venue's tags that are in the list. Tags not in the list do not count. With no matching tags, the weight is `1`.

- Townstead ignores case, and accepts the personality name with or without `mca:`.
- `default` applies to personalities that are not in the list.
- Each weight must be above `0`.

Townstead puts the venues in a random order, weighted by this preference, the distance, and the temperature at the venue. Every venue keeps a chance. A strong preference only makes a venue more likely.
