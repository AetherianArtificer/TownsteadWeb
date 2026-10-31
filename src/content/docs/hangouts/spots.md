---
title: Spots
description: "Make blocks into seats, loungers, and places to stand at a hangout."
---

A spot is a block where a visitor sits, stands, or lies down. Put each spot in `data/<namespace>/hangout_spot/<name>.json`.

This spot makes every block in a seat tag a seat. The spot is the air block above the seat, and Townstead also reserves the seat block itself. The villager sits a little lower than the spot, on the seat:

```json
{
  "schema": "townstead:hangout_spot/v1",
  "blocks": ["#examplepack:seats"],
  "posture": "townstead:sit",
  "canonical_offset": [0, 1, 0],
  "linked_offsets": [[0, -1, 0]],
  "embodiment_offset": [0, -0.4, 0]
}
```

For a decoration venue, a spot can put a place to stand next to the anchor. This spot is 3 blocks east of the water at the centre of a well, one block up:

```json
{
  "schema": "townstead:hangout_spot/v1",
  "blocks": ["minecraft:water"],
  "posture": "townstead:stand",
  "canonical_offset": [3, 1, 0]
}
```

## Fields

| Field | Default | Description |
| --- | --- | --- |
| `schema` | | Required. `townstead:hangout_spot/v1`. |
| `mods` | | Optional. Townstead loads the file only when these mods are present. |
| `blocks` | | Required. Block IDs or `#tags`. |
| `posture` | | Required. The posture ID, such as `townstead:sit`, `townstead:stand`, or `townstead:relax`. Activities list the postures they accept. |
| `adapter` | `townstead:vanilla` | How the villager takes the spot. See [Adapters](#adapters). |
| `capacity` | `1` | How many visitors can use the spot at the same time. |
| `available_when` | | Optional block condition. The spot counts only when the block passes it. |
| `canonical_offset` | `[0, 0, 0]` | The offset from the matched block to the spot, in whole blocks. Townstead counts each spot once, so the blocks of a two-block chair can share one spot. |
| `linked_offsets` | | Offsets of other blocks that Townstead reserves with the spot, such as the second half of a bench. |
| `linked_offsets_relative_to_facing` | `false` | With `true`, `linked_offsets` are `[right, up, forward]` from the `facing` of the block. |
| `embodiment_offset` | `[0, 0.05, 0]` | Where the villager is placed, from the centre of the spot, in blocks. |
| `embodiment_offset_relative_to_facing` | `false` | With `true`, `embodiment_offset` is `[right, up, forward]` from the `facing` of the block. |
| `rest` | | `{ "fatigue_recovery": 2 }` gives the visitor that much extra energy recovery at each normal fatigue interval while they use the spot. |

When a block matches a spot file that names it exactly, Townstead uses only the files that name it. Files that match it by tag apply only when no file names the block. So a spot for one mod's chair is not replaced by a general `#chairs` spot.

The visitor walks to a free block next to the spot, and then takes the spot. A spot with no free block next to it cannot take visitors.

## Adapters

| Adapter | Effect |
| --- | --- |
| `townstead:vanilla` | The default. When the posture ID contains `sit`, `seat`, or `stool`, the villager sits. Otherwise, the villager stands at the spot. |
| `townstead:recline` | The villager lies back, as on a lounger. It is not sleep. |

Some supported mods add an adapter for their own chairs.
