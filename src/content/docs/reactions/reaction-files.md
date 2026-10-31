---
title: Reaction Files
description: "The fields of a reaction file, its choices, and how packs merge reactions."
---

This page describes the fields of a reaction file.

## Reaction Fields

| Field | Default | Description |
| --- | --- | --- |
| `schema` | | `townstead:reaction/v3`. See [Older Formats](#older-formats). |
| `display_name` | | A name for debug tools. Can be a translation key. |
| `tags` | `[]` | Words that describe the reaction, such as `social`. Other villagers see them as [nearby-reaction tags](/reactions/context-tags/#nearby-reactions). |
| `triggers` | `[]` | The events that can start the reaction. See [Triggers](/reactions/triggers/). |
| `when` | | A [Pheno condition](/pheno/conditions/). The reaction plays only when it passes. |
| `chance` | `1` | The chance that a matching trigger continues, such as `0.75` or `"75%"`. |
| `cooldown` | `100` ticks | How long the reaction waits before it can play again for the same villager. A number of ticks, or a string such as `"10s"`, `"500ms"`, or `"40t"`. |
| `choices` | `[]` | The possible outcomes. See [Choices](#choices). |
| `do` | | A Pheno action or a list of actions. It runs after the chosen outcome. |
| `lock` | `0` | How long other reactions wait, when Townstead cannot get the length from the animation. See [Locking](#locking). |
| `mirror_radius` | `0` | Distance in blocks within which other villagers can copy the gesture. See [Mirroring](#mirroring). |
| `mirror_chance` | `0` | The chance, from `0` to `1`, that each villager in range copies it. |
| `hearts` | `0` | The change in MCA hearts with the player who caused the reaction. See [Hearts](#hearts). |
| `replace` | `false` | With `true`, this file replaces the same reaction from packs with a lower priority. See [Pack Merging](#pack-merging). |

A reaction with only a top-level `do` and no `choices` is valid. Townstead runs the `do` as the only outcome.

## Choices

A choice is one possible outcome. Townstead picks one choice each time the reaction plays.

```json
{
  "weight": 2,
  "chance": "80%",
  "cooldown": "30s",
  "personality_weights": { "friendly": 2.0, "introverted": 0.4, "default": 1.0 },
  "when": { "type": "pheno:health", "min": 10 },
  "do": [
    { "type": "pheno:performance", "performance": "townstead:reaction_cheer", "channel": "reaction", "duration_ticks": 50 },
    { "type": "pheno:expression", "cue": "townstead_expressions:celebration" }
  ],
  "sound": { "mca_voice": "yes", "volume": 0.7 }
}
```

| Field | Default | Description |
| --- | --- | --- |
| `do` | | A Pheno action or a list of actions. The villager is the actor. |
| `animation` | | An Emotecraft animation. See [Emotecraft Animations](/reactions/emotecraft/). |
| `sound` | | A sound. See [Sounds](#sounds). |
| `particles` | | A particle burst. See [Particles](#particles). |
| `speech_pool` | | A translation key. The villager says that line in chat to players nearby. |
| `weight` | `1` | How likely Townstead is to pick this choice, compared with the others. |
| `chance` | `1` | A separate roll. If it fails, Townstead does not consider this choice. |
| `cooldown` | `0` | How long this choice waits before Townstead can pick it again for the same villager. |
| `personality_weights` | | Multipliers for the weight, by personality. See [Personality Weights](#personality-weights). |
| `when` | | A Pheno condition for this choice only. |
| `required_tags` | `[]` | [Context tags](/reactions/context-tags/) that must all be present. |
| `allow_movement` | `false` | With `true`, the villager can walk while the choice plays, and Townstead does not [lock](#locking) the villager. |

A choice needs at least one of `do`, `animation`, `sound`, `particles`, or `speech_pool`. When a choice has an `animation` and also another output, the other outputs still run if the animation cannot play. When the `animation` is the only output, the choice fails if the animation cannot play.

In Pheno, the villager is the actor, and `other` is the one in the [Triggers](/reactions/triggers/) table.

## Personality Weights

The weight of a choice is multiplied by the value for the villager's MCA personality:

```json
"personality_weights": { "friendly": 2.0, "mca:crabby": 0.2, "default": 1.0 }
```

Townstead ignores case, and accepts the name with or without `mca:`. When the personality is not in the list, Townstead uses `default`. Without `default`, the value is `1`. With `0`, villagers with that personality never pick the choice.

## Sounds

```json
"sound": { "mca_voice": "greet", "id": "minecraft:entity.villager.yes", "volume": 0.8, "pitch_range": [0.95, 1.05] }
```

| Field | Default | Description |
| --- | --- | --- |
| `mca_voice` | | An MCA voice line, such as `greet` or `yes`. Townstead plays `mca:villager.<gender>.<line>`, at the voice pitch of the villager. |
| `id` | | A sound event ID. Townstead uses it for entities without an MCA voice. |
| `volume` | `1` | The volume. |
| `pitch` | `1` | A fixed pitch. |
| `pitch_range` | | A random pitch between two values. |

A sound needs `mca_voice` or `id`. For other sounds, you can also use `pheno:play_sound` in `do`.

## Particles

```json
"particles": { "id": "minecraft:note", "count": 6, "spread": [0.5, 1.0, 0.5], "y_offset": 2.0 }
```

| Field | Default | Description |
| --- | --- | --- |
| `id` | required | A simple particle type. |
| `count` | `1` | The number of particles. |
| `spread` | `[0.2, 0.2, 0.2]` | The spread along X, Y, and Z, in blocks. |
| `y_offset` | `1` | The height above the villager's feet. |

For more particle options, such as shapes and [data particles](/reference/data-particles/), use `pheno:spawn_particles` in `do`.

## Locking

Unless a choice has `allow_movement`, Townstead can lock the villager after the reaction plays. While the villager is locked, other reactions cannot start. For an Emotecraft emote, the lock lasts for the length of the emote multiplied by `shots`. Otherwise, the lock lasts for the `lock` of the reaction. With neither, there is no lock.

While the lock lasts, nearby villagers see the reaction as [nearby-reaction tags](/reactions/context-tags/#nearby-reactions).

## Mirroring

```json
{ "mirror_radius": 8, "mirror_chance": 0.5 }
```

After an Emotecraft emote plays, each villager within `mirror_radius` has a `mirror_chance` of seeing it as a [gesture](/reactions/triggers/#gesture). A reaction with a matching `gesture` trigger can then respond. A reaction that starts from a mirrored gesture does not mirror again.

## Hearts

```json
{ "hearts": 1 }
```

When a player causes the reaction, Townstead changes the MCA hearts between the villager and that player. A player causes a reaction with a gesture, or by hurting the villager or someone near them in a `damage` trigger. Each player, villager, and reaction can change hearts at most once each Minecraft day.

## Pack Merging

Townstead combines every file for the same reaction ID from all data packs. Without `replace: true`:

- Townstead combines `tags`, `triggers`, and `choices`, and removes duplicates.
- For other fields, the pack with the higher priority sets the value.
- A `hearts` of `0` in a higher pack keeps the lower value.

So one pack can add triggers to a reaction, and another pack can add choices. The combined reaction must have at least one choice that works.

With `"replace": true`, Townstead uses only this file and ignores the same reaction from packs with a lower priority.

## Older Formats

Townstead still reads older reaction files:

- `townstead:reaction/v2` works like v3, but every choice needs an `animation`.
- A file with no `schema` uses the first format. It uses `bindings` with a `ref` such as `"emotecraft:waving"`, and `cooldown_ticks` and `lock_ticks` as numbers. It does not accept `when` or `do`.
- The `conditions` object, with `required_tags`, still works in all formats. Its `time` and `weather` fields do nothing. Use `when` with [`pheno:environment`](/pheno/conditions/) instead.

Use `townstead:reaction/v3` for new files.

## Complete Example

```json
{
  "schema": "townstead:reaction/v3",
  "display_name": "reaction.examplepack.applaud",
  "tags": ["social", "approval"],
  "cooldown": "20s",
  "mirror_radius": 8,
  "mirror_chance": 0.45,
  "hearts": 1,
  "triggers": [
    { "type": "gesture", "emote": "emotecraft:clap", "max_distance": 8 }
  ],
  "when": { "type": "pheno:environment", "weather": "clear" },
  "choices": [
    {
      "personality_weights": { "friendly": 2.0, "upbeat": 1.8, "crabby": 0.2, "default": 1.0 },
      "do": [
        { "type": "pheno:performance", "performance": "townstead:reaction_clap", "channel": "reaction", "duration_ticks": 48, "priority": 40 },
        { "type": "pheno:expression", "cue": "townstead_expressions:approval" }
      ],
      "sound": { "mca_voice": "yes", "volume": 0.7, "pitch_range": [0.95, 1.1] }
    },
    {
      "weight": 0.5,
      "personality_weights": { "introverted": 3.0, "default": 1.0 },
      "do": { "type": "pheno:performance", "performance": "townstead:reaction_nod", "channel": "reaction", "duration_ticks": 30 }
    }
  ]
}
```
