---
title: Triggers
description: "The events that can start a reaction."
---

Triggers are the events that can start a reaction.

A reaction can have more than one trigger. Any one of them can start the reaction.

| Trigger | Starts the reaction when | `other` in Pheno |
| --- | --- | --- |
| [`gesture`](#gesture) | Someone near the villager plays an emote. | The one who made the gesture. |
| [`context_enter`](#context-enter) | A set of context tags becomes complete. | None. |
| [`context_present`](#context-present) | A set of context tags is complete, at each scan. | None. |
| [`context_exit`](#context-exit) | A complete set of context tags stops being complete. | None. |
| [`damage`](#damage) | The villager is hurt, hurts something, or sees someone hurt. | The attacker or the victim. |
| [`chronicle_learned`](#chronicle-learned) | The villager learns about a Chronicle event. | The main person in the event, if near and in sight. |
| [`task`](#task) | A villager task reaches a phase. | None. |
| [`idle_spot`](#idle-spot) | The villager idles near an idle spot. | None. |
| [`time`](#time) | The time of day is in a phase, at an interval. | None. |

Townstead scans the context of each villager once a second.

## Gesture

```json
{ "type": "gesture", "emote": "emotecraft:waving", "max_distance": 6, "min_dot": 0.6 }
```

| Field | Default | Description |
| --- | --- | --- |
| `emote` | required | The emote to watch for. Townstead ignores case and the `emotecraft:` prefix. |
| `max_distance` | `6` | The largest distance in blocks to the one who made the gesture. |
| `min_dot` | `0.6` | How much the villager must face the gesture: `1` is straight ahead, `0` is to the side. With `-1` or less, the direction does not matter. |

A gesture can come from a player who plays an emote, or from a villager that [mirrors](/reactions/reaction-files/#mirroring) a reaction.

## Context Enter

```json
{ "type": "context_enter", "tags": ["under_roof", "raining"] }
```

Starts the reaction once, when all of the listed [context tags](/reactions/context-tags/) are present and at least one of them is new. In the example, only `under_roof` must be new. The villager reacts when they come under a roof while it rains.

## Context Present

```json
{ "type": "context_present", "tags": ["near_music"] }
```

Starts the reaction at each scan while all of the listed tags are present. Use `cooldown` to set how often it repeats.

## Context Exit

```json
{ "type": "context_exit", "tags": ["raid_active"] }
```

Starts the reaction once, when all of the listed tags were present and at least one of them is now gone.

## Damage

```json
{ "type": "damage", "role": "witness", "min_amount": 2, "sources": ["mob", "player"] }
```

| Field | Default | Description |
| --- | --- | --- |
| `role` | `victim` | `victim`: the villager is hurt. `attacker`: the villager hurts something. `witness`: someone else is hurt within 12 blocks of the villager. |
| `min_amount` | `0` | The smallest damage that counts. |
| `sources` | all | Damage source IDs, such as `mob`, `player`, `arrow`, or `fall`. |

For a victim, `other` is the attacker. For an attacker or a witness, `other` is the victim. A damage trigger also adds [damage tags](/reactions/context-tags/#damage-tags) for `required_tags`.

## Chronicle Learned

```json
{ "type": "chronicle_learned", "template": "examplepack:harvest_festival", "channel": "townstead:gossip", "min_fidelity": 0.7 }
```

Starts the reaction when the villager learns about a [Chronicle](/guides/chronicles/) event.

| Field | Default | Description |
| --- | --- | --- |
| `template` | `*` | The Chronicle event template. `*` matches every template. |
| `channel` | `*` | How the villager learned: `townstead:witness`, `townstead:gossip`, `townstead:village_digest`, or `townstead:player_word`. `*` matches all of them. |
| `min_fidelity` | `0` | How accurate the account must be, from `0` to `1`. Gossip is often less accurate than what a villager saw. |

`other` is the main person in the event, as the villager believes it, when that person is within 16 blocks and in sight.

## Task

```json
{ "type": "task", "task": "townstead:example_task", "phase": "start" }
```

Starts the reaction when a villager task reaches a phase. The task sets its phases, such as `start`, `transition:<state>`, or `stop:<result>`. Townstead ignores case.

## Idle Spot

```json
{ "type": "idle_spot", "spot": "examplepack:bench" }
```

Starts the reaction when the villager idles near an idle spot of that ID.

## Time

```json
{ "type": "time", "phase": "dusk", "interval_ticks": 1200 }
```

| Field | Default | Description |
| --- | --- | --- |
| `phase` | required | `dawn`, `day`, `dusk`, or `night`. |
| `interval_ticks` | `1200` | How often Townstead checks, in ticks. The lowest value is `20`. |
