---
title: How Hangouts Work
description: "How villagers choose a venue, take a seat, and share activities, and the four file kinds that control it."
---

:::caution[Preview]
Hangouts are still changing. Test your pack again after you update Townstead.
:::

A hangout is a visit by a villager to a venue during their **Meet** time. The villager chooses a venue, reserves a seat, walks there, sits or stands, and joins short activities with the other visitors. For the player's view, see [Hangouts](/guides/hangouts/).

## The Four File Kinds

| File | Folder | What it sets | Page |
| --- | --- | --- | --- |
| Venue | `data/<namespace>/hangout_venue/` | Which buildings or decorations are venues, their activities, and their staff. | [Venues](/hangouts/venues/) |
| Spot | `data/<namespace>/hangout_spot/` | Which blocks are seats or places to stand. | [Spots](/hangouts/spots/) |
| Activity | `data/<namespace>/hangout_activity/` | What visitors do together, and how staff serve them. | [Activities](/hangouts/activities/) |
| Policy | `data/<namespace>/hangout_policy/` | Who visits, how far they go, how long they stay, and which venues they like. | [Hangout Policy](/hangouts/policy/) |

Every file needs its `schema`. Townstead rejects a file with an unknown field. Each file can have a `mods` gate.

Hangouts work only when at least one file of each kind loads.

## A Visit

1. When a villager's schedule is **Meet**, Townstead checks if the villager can visit. A villager who sleeps, rides something, panics, was attacked a short time ago, or is too cold or too hot does not visit.
2. Townstead tries each policy whose `visitor_when` passes. It finds the venues within `venue_radius` in the villager's village.
3. It puts the venues in a random order, weighted by the villager's personality, the distance, and the temperature at the venue.
4. For each venue in that order, it checks `open_when` and `admission_when`, and that the villager is not staff there. Then it reserves a free place in the venue and a free spot. The spot must support the posture of at least one activity of the venue.
5. The villager walks to the spot. If they do not arrive in time, the visit ends.
6. The villager sits or stands at the spot, and stays until a random time between `minimum_visit_ticks` and `maximum_visit_ticks`. A visit ends earlier when the Meet time ends.
7. While the villager is there, Townstead starts [activities](/hangouts/activities/) with the other visitors.

After a visit, the villager waits for `revisit_cooldown_ticks` before the next one. After a failed visit, the villager waits for `retry_cooldown_ticks`.

## Example

A pack that adds a reading room needs a venue, an activity, and spots for its chairs:

```json title="data/examplepack/hangout_venue/reading_room.json"
{
  "schema": "townstead:hangout_venue/v2",
  "buildings": ["examplepack:reading_room"],
  "capacity": 6,
  "activities": ["examplepack:quiet_reading"],
  "tags": ["townstead_hangouts:quiet", "townstead_hangouts:cozy"]
}
```

```json title="data/examplepack/hangout_activity/quiet_reading.json"
{
  "schema": "townstead:hangout_activity/v2",
  "kind": "socialize",
  "minimum_participants": 1,
  "maximum_participants": 4,
  "duration_ticks": 600,
  "yield_to_groups": true,
  "postures": ["townstead:sit"],
  "social_cues": { "expressions": ["townstead_expressions:idea"], "expression_interval_ticks": 200 }
}
```

```json title="data/examplepack/hangout_spot/reading_chair.json"
{
  "schema": "townstead:hangout_spot/v1",
  "blocks": ["examplepack:reading_chair"],
  "posture": "townstead:sit"
}
```

Townstead includes a policy, `townstead:ordinary_social`, so the pack does not need its own.

## Troubleshooting

Set `debugLogging` in the server config. The log then shows a `[Hangouts]` line when a visit or activity ends, with the reason, and the reason when a villager cannot start a visit, such as `venue full` or `no activity-compatible furniture`.

| Problem | Check |
| --- | --- |
| No villager visits | The venue building is complete. It has a spot that matches an activity posture. The villagers have Meet time in their schedule. |
| The venue file is rejected | Every activity in `activities` exists. Every service role in the activities is a `staff_roles` key of the venue. |
| Villagers visit but do nothing together | Enough visitors are there for `minimum_participants`. Their spots match the `postures` of the activity. |
| Nobody serves the visitors | A villager who passes the staff role works at that building, within 32 blocks. |
