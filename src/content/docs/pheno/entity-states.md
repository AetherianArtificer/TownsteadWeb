---
title: Entity States
description: Named, tiered values on villagers and players, such as a curse, a mood, or a transformation.
---

An entity state is a named number on a villager or a player. Use a state for something an entity is or has for a time, such as a curse, a transformation, an illness, or a mood. A state has a range and optional tiers. Other data can read the state, and can run actions when the state changes.

A state has three kinds of file:

| File | Folder | Purpose |
| --- | --- | --- |
| State | `data/<namespace>/entity_state/` | Defines the state: its range, tiers, and how long it lasts. |
| Backing | `data/<namespace>/state_backing/` | Tells Townstead where the value comes from for a kind of entity. |
| Effect | `data/<namespace>/state_effect/` | Runs actions or grants genes while the state is active or when it changes. |

A persistent state with an owned backing also needs a resource of the same ID. See [Saving The Value](#saving-the-value).

## Example

This example adds a werebear curse to villagers. The curse has two tiers. A cursed villager growls at random, and gains strength at the second tier.

`data/examplepack/entity_state/werebear.json`:

```json
{
  "schema": "pheno:entity_state/v1",
  "min": 0,
  "max": 10,
  "tiers": [
    { "id": "cursed", "min": 1 },
    { "id": "feral", "min": 5 }
  ],
  "persistence": "persistent",
  "death": "keep"
}
```

`data/examplepack/state_backing/werebear_villager.json`:

```json
{
  "schema": "pheno:state_backing/v1",
  "state": "examplepack:werebear",
  "applies_to": {
    "type": "pheno:or",
    "conditions": [
      { "type": "pheno:entity_type", "entity_type": "mca:male_villager" },
      { "type": "pheno:entity_type", "entity_type": "mca:female_villager" }
    ]
  },
  "source": { "type": "pheno:owned" },
  "writable": true
}
```

`data/examplepack/baseline_power/werebear.json`:

```json
{
  "type": "pheno:resource",
  "min": 0,
  "max": 10,
  "start": 0,
  "persist_on_death": true,
  "display": { "visibility": "never" }
}
```

`data/examplepack/state_effect/werebear_growl.json`:

```json
{
  "schema": "pheno:state_effect/v1",
  "state": "examplepack:werebear",
  "min_tier": "cursed",
  "while_active": {
    "interval": 400,
    "chance": 0.3,
    "do": { "type": "pheno:play_sound", "sound": "minecraft:entity.polar_bear.warning" }
  }
}
```

`data/examplepack/state_effect/werebear_strength.json`:

```json
{
  "schema": "pheno:state_effect/v1",
  "state": "examplepack:werebear",
  "tier": "feral",
  "genes": { "grant": ["examplepack:bear_strength"] }
}
```

## State Files

| Field | Default | Description |
| --- | --- | --- |
| `schema` | | `pheno:entity_state/v1`. |
| `id` | the file's ID | The state ID. |
| `mods` | | Optional. Townstead loads the file only when these mods are present. |
| `min`, `max` | `0`, `1` | The range of the value. `min` must be less than `max`. |
| `initial` | `min` | The value before anything sets the state. |
| `tiers` | | Named steps, from low to high. Each tier has an `id` and a `min`. See [Tiers](#tiers). |
| `merge` | `max` | How Townstead combines values from more than one backing: `first`, `max`, `sum`, or `latest`. |
| `persistence` | `persistent` | `persistent` saves the value with the entity. `session` keeps it only until the server stops. |
| `death` | `clear` | `keep` or `clear`. What happens to the value when a player dies. |
| `body` | `any` | `villager` lets only entities with the MCA villager body take the state. A Root can allow its own body. |
| `excludes` | | State IDs. While one of these states is active, Townstead cannot give this state to the entity. |
| `aspect` | | Shows the state in the editor and in the Aspects screen. |

A state is active when a backing gives it a value. When an action sets the state to `min` or lower, Townstead clears it.

### Tiers

A tier is a named step of the state. The entity is in the highest tier whose `min` is less than or equal to the value.

| Tier Field | Description |
| --- | --- |
| `id` | Required. The tier name. |
| `min` | Required. The lowest value of the tier. |
| `rig` | Optional. A rig that the entity takes while in this tier, such as a beast form. |
| `talk` | `false` stops conversation while in this tier. The default is `true`. |
| `sleep` | `false` stops sleep while in this tier. The default is `true`. |
| `ride` | `false` stops the entity from riding a mount or a vehicle while in this tier. If the entity rides when it enters the tier, it gets off. The default is `true`. |
| `variants` | Optional. Maps rig variant names to other states, such as a coat or eye colour. |

## Backing Files

A backing tells Townstead where the value comes from. Make one backing for each kind of entity.

| Field | Default | Description |
| --- | --- | --- |
| `schema` | | `pheno:state_backing/v1`. |
| `state` | | Required. The state ID. |
| `applies_to` | | Optional [Pheno condition](/pheno/conditions/). The kinds of entity that this backing is for. |
| `source` | | Required. See the table below. |
| `writable` | `false` | `true` lets actions and commands set the value. Only an owned source can be writable. |
| `read_priority` | `0` | When more than one backing applies, Townstead reads the highest first. |
| `write_priority` | `read_priority` | When more than one writable backing applies, Townstead writes to the highest. |

| Source Type | Fields | Value |
| --- | --- | --- |
| `pheno:owned` | `resource` | Townstead stores the value. `resource` is the resource that holds it, and its default is the state ID. |
| `pheno:status_effect` | `effect`, `amplifier`, `presence_value` | The value comes from a status effect. `amplifier` maps effect amplifiers to amounts or tiers. Without a match, the value is `presence_value`, which defaults to `1`. |
| `pheno:provider` | `provider`, `levels` | The value comes from another mod, through a provider that Townstead registers. `levels` maps whole-number readings to amounts or tiers. |

### Saving The Value

A persistent state with an owned backing stores its value in a resource. The resource has the same ID as the backing's `resource`, which is the state ID by default. Declare it in `data/<namespace>/baseline_power/<name>.json` as a `pheno:resource`, with the same range as the state.

If the resource is missing, Townstead cannot read or set the state. Nothing in the game changes, and Townstead does not show an error.

## Effect Files

An effect runs actions or grants genes for a state. An effect needs at least one hook or `genes`.

| Field | Description |
| --- | --- |
| `schema` | `pheno:state_effect/v1`. |
| `state` | Required. The state ID. |
| `tier` | Optional. The effect applies only in this tier. |
| `min_tier` | Optional. The effect applies in this tier and every higher tier. Do not use it with `tier`. |
| `condition` | Optional [Pheno condition](/pheno/conditions/). The entity must also pass it. |
| `priority` | Townstead applies higher numbers first. The default is `0`. |
| `on_enter` | [Action](/pheno/actions/) that runs when the state becomes active. |
| `on_tier_change` | Action that runs when the tier changes while the state stays active. |
| `on_exit` | Action that runs when the state stops being active. |
| `while_active` | `interval` in ticks, `chance` from 0 to 1, and a `do` action. The action runs at each interval while the state is active. |
| `genes` | `grant` and `suppress` lists of gene IDs. Granted genes replace what the entity expresses at the same locus while the effect applies. |

## Timed States

An action can set a state with a `duration` in ticks:

```json
{ "type": "pheno:set_state", "state": "examplepack:curing", "amount": 1, "duration": 3600 }
```

When the time ends, the state stops being active and its `on_exit` action runs. A persistent state keeps counting after a restart. Use this for a change that ends later, such as a cure, or an illness that ends by itself. See [Gift Reactions](/packs/gift-reactions/#timed-changes) for an example.

## Reading And Changing States

| Use | Node |
| --- | --- |
| Test a state | `pheno:state` condition, with `state` and `min`, `max`, `tier`, `min_tier`, or `max_tier` |
| Test if an entity can have a state | `pheno:state` condition, with `state` and `"eligible": true`. True when the entity's body and Root can carry the state, whatever its value is now. |
| Read the value | `pheno:state_amount`, `pheno:state_tier`, and `pheno:state_remaining` values |
| Set the value | `pheno:set_state` action, with `amount` and an optional `duration` |
| Add to the value | `pheno:add_state` action |
| Clear the value | `pheno:clear_state` action |
