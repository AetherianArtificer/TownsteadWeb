---
title: Founder Bias
description: How a Root makes its founders more likely to be raised in some cultures.
---

A founder is a villager with no parent who has a culture and no home village with a culture. A founder's culture comes from a roll, and the roll uses the `cultural_spawn_bias` of the founder's [Root](/roots/).

This is the only place where a Root affects culture. A villager with parents or a home village takes their culture from them. See [Where a Villager's Culture Comes From](/cultures/#where-a-villagers-culture-comes-from).

## Field

`cultural_spawn_bias` can be on an ancestry, a lineage or a root file:

```json
"cultural_spawn_bias": [
  { "culture": "examplepack:fisherfolk", "rate": 6 },
  { "culture": "examplepack:hillfolk", "rate": 1 },
  { "culture": "any", "rate": 2 }
]
```

| Field | Description |
| --- | --- |
| `culture` | A culture ID, or `any` for any culture that is turned on. |
| `rate` | The weight of the entry. The default is 1. An entry with 0 or less is never picked. |

## How the Roll Works

1. Townstead combines the bias of the ancestry, then the lineage, then the root. A more specific file replaces the rate of a culture that a less specific file names.
2. It leaves out cultures that are not loaded, and cultures that the Switchboard turns off.
3. It multiplies each rate by the culture's rate in the Switchboard.
4. It picks one entry by weight. For `any`, it then picks one top culture by its Switchboard rate.

The founder gets no culture when:

- the Root has no `cultural_spawn_bias`;
- no entry names a culture that is loaded and turned on.

So installing a culture pack does not give cultures to the founders of other Roots. A pack opts its Roots in with a bias.

## The First Founder Sets the Village

When a founder gets a culture and their home village has no culture yet, the village takes the founder's culture. Later villagers in that village take the village's culture. See [Where a Village's Culture Comes From](/cultures/#where-a-villages-culture-comes-from).

## Which Roots Settle a Village

In a village with a [founding profile](/cultures/culture-packs/#founding-profiles), Townstead also uses `cultural_spawn_bias` to pick which Roots spawn there. This is the population strategy `townstead:cultural_affinity`, which is the default:

```text
Root weight = (outsider_baseline + the Root's rate for the profile's culture + the Root's rate for "any") × multiplier
```

The profile sets these values in its `population` block:

```json
"population": {
  "strategy": "townstead:cultural_affinity",
  "outsider_baseline": 0.25,
  "adjustments": [{ "root": "examplepack:merfolk", "multiplier": 2 }]
}
```

| Field | Description |
| --- | --- |
| `outsider_baseline` | The weight that every Root gets, also with no bias for the culture. 0 or more. The default is 0.1. |
| `adjustments` | A `multiplier` for one `root`, 0 or more. The default multiplier is 1. |
