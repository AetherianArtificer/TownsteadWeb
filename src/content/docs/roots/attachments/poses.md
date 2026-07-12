---
title: Poses & Equipment
description: State-driven rotations, pheno condition gates, transitions, and armour awareness
---

Poses let an attachment react to what its bearer is doing: ears that fold in sleep, pin back in a fight, droop with exhaustion, or flatten under a helmet. Each pose entry is active while its state or condition holds, and its rotations ease in and out over a transition time rather than snapping.

Poses are evaluated on each viewer's client every frame, using synced per-entity state, so a whole village's ears fold at bedtime without any extra network traffic.

## The Poses Block

```json
"poses": {
  "sleeping": {
    "bones": { "left_ear": { "rotation": [0, 0, -35] }, "right_ear": { "rotation": [0, 0, 35] } },
    "transition": 10
  },
  "wearing_helmet": {
    "bones": { "left_ear": { "rotation": [0, 0, -70] }, "right_ear": { "rotation": [0, 0, 70] } },
    "transition": 4
  },
  "when": [
    {
      "if": { "type": "pheno:mood", "is": ["sad", "depressed"] },
      "bones": { "left_ear": { "rotation": [0, 0, -28] }, "right_ear": { "rotation": [0, 0, 28] } },
      "transition": 40
    }
  ]
}
```

Every key except `when` is a named state. `when` entries carry any [Pheno condition](/pheno/conditions/) as `if`.

| Entry field | Type | Notes |
| --- | --- | --- |
| `bones` | object | Per-bone rotations in degrees, in the `.geo.json`'s own convention. Copy angles straight from posing the bone in Blockbench. |
| `rotation` | [x, y, z] | Turns the whole attachment at its anchor instead (definition convention, like the top-level `rotation`). |
| `transition` | number | Ease time constant in ticks, in and out. Defaults to `4`. |

Active entries apply in authored order; when several touch the same bone, the last one wins. On a mirrored point the pose mirrors automatically. Poses compose with morphs, life stages, physics, and keyframe clips.

## Named States

| State | Active while |
| --- | --- |
| `sleeping` | The bearer sleeps. |
| `sitting` | The bearer rides or sits. |
| `sprinting` | Sprinting. |
| `sneaking` | Crouching. |
| `swimming` | Swimming. |
| `gliding` | Fall-flying (elytra or the `elytra_flight` ability). |
| `moving` | Walking or running. |
| `hurt` | In hurt flash. |
| `attacking` | Swinging or aggressive. |
| `panicking` | An MCA villager's panic state. |
| `working` | An MCA villager runs a job chore. |
| `wearing_helmet` | Anything occupies the head slot. |
| `wearing_chestplate` | Anything occupies the chest slot. |
| `wearing_leggings` | Anything occupies the legs slot. |
| `wearing_boots` | Anything occupies the feet slot. |

`/townstead attachment doctor` flags unknown state names, unparseable conditions, and pose bones missing from the geometry.

## Condition Gates

`when` conditions evaluate on the client against synced state. Mood (`pheno:mood`), gender (`pheno:gender`), hunger, thirst, and energy are entity-tracked and work everywhere; time, weather, and biome conditions read the level. A condition that needs server-only data simply never activates. Note that `pheno:mood` matches villagers only; `pheno:gender` matches villagers and players with MCA data, and never matches other entities.

## Equipment Awareness

Three ways an attachment can react to armour, from gentlest to bluntest:

1. **Nothing declared.** The attachment punches through the armour model. Right for tails and most body attachments.
2. **A `wearing_*` pose.** The attachment folds beneath the item and eases back when it is removed. Right for ears under a helm.
3. **`hides_under` in the definition.** The whole attachment vanishes while the slot is occupied. Right for horns that cannot share space with a helmet. See [Attachment Files](/roots/attachments/definition/).
