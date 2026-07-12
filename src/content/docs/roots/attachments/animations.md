---
title: Keyframe Animations
description: Blockbench animation clips, state and condition triggers, and the random idle pool
---

Attachments can play real Blockbench keyframe clips: a tail wag, an ear flick, a wing stretch. Clips are authored in Blockbench's animation editor, exported as `.animation.json`, and triggered the same way poses are: while a named state or condition holds, or drawn from a weighted idle pool.

Path: `data/<namespace>/attachment/animations/<file>.animation.json`

Animation files ship over the same blob sync as geometry. A Blockbench project under `attachment/bbmodel/` also serves its embedded clips: when no `.animation.json` matches a reference, the bbmodel's own animations answer to the same `"<file>#<clip>"` form (only rotation channels convert; position and scale channels and Molang are skipped with a warning).

## The Animations Block

```json
"animations": {
  "sleeping": { "animation": "fox_tail#curl", "transition": 8 },
  "when": [
    {
      "if": { "type": "pheno:mood", "is": ["happy", "overjoyed"] },
      "animation": "fox_tail#wag",
      "transition": 6
    }
  ],
  "random_idle": [
    { "animation": "fox_tail#flick", "weight": 1, "cooldown": 240 }
  ]
}
```

Every key except `when` and `random_idle` is a named state (the same list poses use, see [Poses & Equipment](/roots/attachments/poses/)). `when` entries carry a [Pheno condition](/pheno/conditions/) as `if`.

| Entry field | Type | Notes |
| --- | --- | --- |
| `animation` | ref | `"<file>"` or `"<file>#<clip>"`. A bare file reference plays its only clip; the `#` form names one of several. Blockbench's full `animation.model.name` ids match by suffix. |
| `transition` | number | Fade in and out, in ticks. Defaults to `3`. |
| `weight` | number | Idle-pool pick weight. Defaults to `1`. |
| `cooldown` | number | Idle-pool quiet time after playing, in ticks. Defaults to `200`. |

## Clip Behaviour

- `"loop": true` repeats while the trigger holds. `"hold_on_last_frame"` stops on the final frame. Other clips play once each time their trigger activates.
- A `random_idle` clip can start only when no other clip is playing or fading. Townstead chooses by `weight`, waits for its `cooldown`, and always plays it once even when the clip is marked to loop.
- Rotation, position, and scale tracks all work. Rotations use geometry degrees, positions use model pixels, and scale multiplies the bone's current scale, including morphs.
- Blockbench keyframe times are in seconds. Townstead converts them to ticks and moves linearly between keyframes.
- Molang expressions do not run. Townstead warns and reads those values as `0`, so bake them into ordinary keyframes before exporting.

## Composition

Each frame the bone deltas stack in a fixed order: morphs, then poses, then keyframe clips, then physics. A keyframed wag therefore rides a drooped pose, and physics still jiggles on top of the wag. On a mirrored point the clip mirrors automatically.

`/townstead attachment doctor` validates every trigger: unknown states, unparseable conditions, missing clips, clip bones absent from the geometry (including stage-swapped geometry), and Molang warnings.
