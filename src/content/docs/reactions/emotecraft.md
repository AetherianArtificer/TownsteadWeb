---
title: Emotecraft Animations
description: "Play Emotecraft emotes from a reaction choice."
---

A choice can also play an Emotecraft emote. Players need Emotecraft and the emote to see it.

```json
"animation": {
  "type": "emotecraft",
  "ids": ["club_penguin_dance", "kazotsky_kick"],
  "shots": 2,
  "speed": 1.0,
  "allow_movement": false
}
```

| Field | Default | Description |
| --- | --- | --- |
| `type` | required | `emotecraft`. |
| `id` | | One emote name, without the `emotecraft:` prefix. |
| `ids` | | A list of emote names. Townstead picks one at random. |
| `shots` | `1` | How many times the emote repeats, for the [lock](/reactions/reaction-files/#locking) length. |
| `speed` | `1` | The playback speed. |
| `loop_override` | `-1` | Overrides the loop setting of the emote. |
| `allow_movement` | `false` | With `true`, the villager can walk while the emote plays. |
| `parts_skip` | | Body parts that the emote does not move. With `allow_movement` and no `parts_skip`, the default is `["legs", "torso"]`, so the villager walks normally and only the arms and head play the emote. |
