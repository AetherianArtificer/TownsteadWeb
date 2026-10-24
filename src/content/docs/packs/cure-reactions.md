---
title: Cure Reactions
description: How a villager feels about being cured of an entity state, and what they tell the player who cured them.
---

A cure reaction sets how a villager feels when a cure removes an [entity state](/pheno/entity-states/), such as a curse. The villager is grateful or resentful. Townstead adds the result to the villager's chronicle, and the villager tells the player who cured them.

Put each cure reaction in `data/<namespace>/cure_reaction/<name>.json`. Make one cure reaction for each state.

## What Happens

1. A cure starts. The action that starts the cure records the player with [`pheno:remember`](/pheno/actions/), under the key `townstead:cured_by`.
2. The state ends. Townstead reads the value that the state had just before the cure. This value is the villager's former rank.
3. Townstead rolls the reaction. The chance that the villager is resentful comes from `resentful_chance` and `personality`.
4. Townstead adds the chronicle event for the reaction to the villager's chronicle.
5. If the player who cured the villager is within 6 blocks and in sight, the villager says a line and the hearts change. If not, the villager says the line the next time that player comes near.

If no player is recorded, the villager gets only the chronicle event.

Every end of the state counts as a cure: an action that clears it, a value that drops to its minimum, or a `duration` that runs out. If the state can end in other ways that are not a cure, do not give it a cure reaction. A state that stops because the villager's body or Root no longer allows it, or because another state excludes it, does not count.

## Example

This cure reaction is for the werebear curse. A villager who was cured early is usually grateful. A villager who was a werebear for a long time is usually resentful.

```json
{
  "state": "examplepack:werebear",
  "resentful_chance": [
    { "min_rank": 0, "chance": 0.15 },
    { "min_rank": 5, "chance": 0.6 }
  ],
  "personality": { "mca:crabby": 0.2, "mca:friendly": -0.2 },
  "hearts": { "grateful": 25, "resentful": -15 },
  "lines": {
    "grateful": ["cure_reaction.examplepack.werebear.grateful.1"],
    "resentful": ["cure_reaction.examplepack.werebear.resentful.1"]
  },
  "chronicle": {
    "grateful": "examplepack:werebear_cured",
    "resentful": "examplepack:werebear_cured_unwilling"
  }
}
```

The action that starts the cure records the player. For example, in a [gift reaction](/packs/gift-reactions/):

```json
"action": {
  "type": "pheno:and",
  "actions": [
    { "type": "pheno:remember", "key": "townstead:cured_by" },
    { "type": "pheno:set_state", "state": "examplepack:werebear_cure", "amount": 1, "duration": 2400 }
  ]
}
```

## Fields

| Field | Default | Description |
| --- | --- | --- |
| `state` | | Required. The entity state that the cure removes. |
| `mods` | | Optional. Townstead loads the file only when these mods are present. |
| `resentful_chance` | | Required. A list of `min_rank` and `chance` pairs. Townstead uses the pair with the highest `min_rank` that is not more than the former rank. `chance` is from 0 to 1. |
| `personality` | | Optional. Adds to the chance for each MCA personality ID, such as `mca:crabby`. A negative number makes the villager more likely to be grateful. |
| `hearts` | `0` | The hearts change with the player who cured the villager, for `grateful` and for `resentful`. |
| `lines` | | Required. Lists of translation keys for `grateful` and for `resentful`. The villager says one line from the list, at random. |
| `chronicle` | | Required. The chronicle event keys for `grateful` and for `resentful`. Each key is the `survival` trigger key of a file in `data/<namespace>/chronicle_event/`. |

The chance after `personality` is limited to the range from 0 to 1.
