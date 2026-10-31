---
title: Performances & Expressions
description: "Play gestures with pheno:performance, map performances to animations, and show expression cues."
---

## Performances

`pheno:performance` plays a gesture or a body animation by its meaning, such as `townstead:reaction_wave`. Townstead chooses how to show it. By default, Townstead uses its own animations, so players do not need an animation mod.

```json
{
  "type": "pheno:performance",
  "performance": "townstead:reaction_clap",
  "channel": "reaction",
  "duration_ticks": 48,
  "priority": 40,
  "fallback": "vanilla_gesture"
}
```

| Field | Default | Description |
| --- | --- | --- |
| `performance` | required | The performance ID. |
| `channel` | `social` | The channel. Each villager plays one performance at a time on each channel. |
| `duration_ticks` | `40` | How long the performance lasts. |
| `priority` | `0` | A new performance replaces the current one on the same channel, unless the current one has a higher priority. |
| `fallback` | `vanilla_gesture` | What to do when Townstead cannot show the performance: `vanilla_gesture` swings the arm, `stand` stops the villager, and `none` does nothing. |

Townstead shows a performance in this order:

1. A [performance mapping](#performance-mappings) with the same ID, for the villager's personality.
2. A reaction with the same ID. Townstead plays that reaction.
3. One of Townstead's own clips, for an ID in the `townstead_performance` namespace.
4. `townstead:swing` swings the arm, and `townstead:stand` stops the villager.
5. The `fallback`.

### Performance Mappings

A performance mapping connects a performance ID to the animations that show it. Put it in `data/<namespace>/performance_mapping/<path>.json`. The path is the performance ID, so `data/examplepack/performance_mapping/curtsy.json` maps `examplepack:curtsy`.

```json
{
  "schema": "townstead:performance_mapping/v1",
  "targets": [
    { "provider": "townstead_performance:native", "performance": "townstead_performance:bow", "priority": 10, "personalities": ["confident", "friendly"] },
    { "provider": "townstead:vanilla", "performance": "townstead:swing" }
  ]
}
```

| Field | Description |
| --- | --- |
| `schema` | Required. `townstead:performance_mapping/v1`. |
| `mods` | Optional. Townstead loads the file only when these mods are present. |
| `targets` | Required. The ways to show the performance. Townstead tries the targets from the highest `priority` to the lowest, and uses the first one that plays. |
| `targets[].provider` | `townstead_performance:native` for Townstead's own clips, `townstead:reaction` for a reaction, or `townstead:vanilla` for `townstead:swing` and `townstead:stand`. |
| `targets[].performance` | The clip, reaction, or vanilla ID for that provider. |
| `targets[].priority` | Optional. The default is `0`. |
| `targets[].personalities` | Optional. The target applies only to villagers with one of these MCA personalities. |

Townstead includes these performances: `reaction_cheer`, `reaction_cheer_excited`, `reaction_clap`, `reaction_cry`, `reaction_laugh`, `reaction_laugh_demure`, `reaction_nod`, `reaction_point`, `reaction_ponder`, `reaction_shake_head`, `reaction_shiver`, `reaction_shrug`, `reaction_startled`, `reaction_sweat`, `reaction_wave`, `reaction_whisper`, and `reaction_yawn`, all in the `townstead` namespace. The other performances that Townstead includes are for hangouts and conversations.

## Expressions

`pheno:expression` shows a short cue over the villager's head, such as a heart or a "?".

```json
{ "type": "pheno:expression", "cue": "townstead_expressions:question" }
```

Townstead includes these cues in the `townstead_expressions` namespace: `affection`, `annoyed`, `approval`, `celebration`, `delight`, `embarrassed`, `greeting`, `hunger`, `idea`, `music`, `question`, `relief`, `sleepy`, `surprise`, `thirst`, and `worry`.

Each cue has its own cooldown. If the cue is on cooldown, the action fails, but the reaction still counts as played.
