---
title: Rest Spots
description: Reference for beds and other blocks that villagers and players sleep in.
---

A rest spot is a block that an entity sleeps in, such as a bed, a coffin, or a bedroll. A rest spot can be a home. Villagers claim a home, and MCA counts each home when it counts the beds of a house and the population limit of a village.

A rest spot can also set rules: who can use it, when a player can sleep in it, and if it sets the player's spawn point.

Put each rest spot in `data/<namespace>/rest_spot/<name>.json`. Townstead includes rest spots for vanilla beds and for some supported mods.

## Example

This rest spot makes a bedroll a home. Villagers take a free bed before a bedroll. A player who sleeps in a bedroll does not set a spawn point.

```json
{
  "schema": "townstead:rest_spot/v1",
  "mods": "examplepack",
  "blocks": [
    { "id": "#examplepack:bedrolls", "state": { "part": "head" } }
  ],
  "prefer": -1,
  "sets_spawn": false
}
```

This rest spot is a crypt bed. Only entities in the `examplepack:ghoul` state can use it, and they sleep in nothing else. They sleep in it during the day. When the lid is closed, the sleeper is not shown.

```json
{
  "schema": "townstead:rest_spot/v1",
  "blocks": [
    { "id": "examplepack:crypt_bed", "state": { "part": "head" } }
  ],
  "who": { "type": "pheno:state", "state": "examplepack:ghoul" },
  "only": true,
  "prefer": 10,
  "time": "day",
  "sleep": {
    "hidden_when": { "closed": "true" }
  },
  "on_wake": { "type": "pheno:apply_effect", "effect": "minecraft:strength", "duration": 1200 }
}
```

## Fields

| Field | Default | Description |
| --- | --- | --- |
| `schema` | | Required. Must be `townstead:rest_spot/v1`. |
| `mods` | | Optional. Townstead loads the file only when these mods are present. |
| `blocks` | | Required. A list of block IDs or `#tags`. An entry can be an object with `id` and `state`. `state` gives block-state values that the block must have, such as `"part": "head"`. |
| `home` | `true` | When `true`, the block is a home. Villagers claim it, and MCA counts it as a bed. When `false`, entities can sleep in it, but it is not a home. |
| `who` | | Optional. A [condition](/pheno/conditions/) on the entity. Only entities that pass can use the rest spot. The condition applies to villagers and to players. |
| `only` | `false` | When `true`, entities that pass `who` sleep only in this rest spot, or in other `only` rest spots that admit them. They cannot use other beds. |
| `prefer` | `0` | The rank of the home. A villager does not claim a home when a free home with a higher rank is within 48 blocks. A vanilla bed has rank `0`. Use a negative number for a home that villagers take last. |
| `time` | `night` | When a player can sleep in it: `night`, `day`, or `any`. With `night`, the usual rules apply. |
| `sets_spawn` | `true` | When `false`, sleeping in it does not set the player's spawn point. |
| `skips_night` | `true` | When `false`, a player who sleeps in it does not count toward skipping the night. Use it for a nap. |
| `sleep.hidden_when` | | Optional. Block-state values. When the block has all these values, the sleeper is not shown, as in a closed coffin. |
| `on_sleep` | | Optional. An [action](/pheno/actions/) that runs on the entity when it starts to sleep here. |
| `on_wake` | | Optional. An [action](/pheno/actions/) that runs on the entity when it wakes up here. |

When more than one rest spot names the same block, Townstead uses the one with the highest `prefer` that admits the entity.

## Related Pheno Types

| Type | Kind | Description |
| --- | --- | --- |
| [`pheno:rest`](/pheno/gene-nodes/#ability-and-rule-genes) | Gene | Changes how the bearer sleeps: recovery, preferred rest spots, and when it cannot sleep. |
| [`pheno:resting`](/pheno/conditions/#movement-and-pose) | Condition | True when the entity sleeps, optionally in a named rest spot. |
| [`pheno:wake`](/pheno/actions/#entity-effects) | Action | Wakes the entity. |
| [`pheno:set_spawn`](/pheno/actions/#entity-effects) | Action | Sets a player's spawn point. |
| [`when_sleep`, `when_wake`, `when_rested`](/pheno/triggers/) | Triggers | Fire when the bearer starts to sleep, wakes up, or is fully rested. |
