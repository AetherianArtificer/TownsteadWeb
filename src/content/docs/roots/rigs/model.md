---
title: Model & Bones
description: The model source of a rig, its model class, its bones and keyframe clips, and the transform shape.
---

This page describes where a rig gets its model, and how its bones map to animation channels. Rig files are described on [Rigs](/roots/rigs/).

## Model

`model.type` controls where the body model comes from.

| `model.type` | Required Fields | Notes |
| --- | --- | --- |
| `entity_layer` | `layer` | Uses a Minecraft entity model layer. A `#layer` suffix selects the layer name; default layer is `main`. The optional `class` names the model class. See [Model Class](#model-class). |
| `geometry` | `file` | Uses a Bedrock geometry file (`.geo.json`) or a Blockbench project (`.bbmodel`), such as `my_pack:geo/egg.geo.json`. The file can be in your data pack or in the assets of another installed mod. See [Models From Other Mods](/roots/rigs/other-mods/). |

Entity-layer example:

```json
"model": {
  "type": "entity_layer",
  "layer": "minecraft:skeleton#main"
}
```

Geometry example:

```json
"model": {
  "type": "geometry",
  "file": "townstead_spider:geo/egg.geo.json"
}
```

## Model Class

An entity layer is only the shape of a model. The model class makes it move. Without `class`, Townstead draws an entity layer as a humanoid body, as for `minecraft:skeleton#main`. Townstead also knows the class of `minecraft:spider`.

For any other body, set `class` to the full Java class name of the model:

```json
"model": {
  "type": "entity_layer",
  "layer": "othermod:creature#main",
  "class": "com.example.othermod.client.model.CreatureModel"
}
```

- The class must be an entity model with a public constructor that takes one `ModelPart`. This is the usual form of a vanilla-style model.
- The mod that owns the class must be installed on the client.
- The model then moves with its own walk and head animation.
- Some model classes work only with their own entity. When the class fails with a villager or a player, Townstead draws the model at rest and logs a warning. Clips and poses still apply.

A `geometry` model does not use `class`.

## Bones

`bones` maps Townstead's animation channels to the actual bone names in the model. The channel names stay stable even when the model uses different internal bone names.

| Channel | Default Bone | Used For |
| --- | --- | --- |
| `head` | `head` | Head rotation, face placement, camera, head-driven emotes. |
| `headwear` | `hat` | Hat or headwear-style layers. |
| `body` | `body` | Body movement and body-worn layers. |
| `right_arm` | `right_arm` | Right arm animation and right-side humanoid actions. |
| `left_arm` | `left_arm` | Left arm animation and left-side humanoid actions. |
| `right_leg` | `right_leg` | Right leg animation. |
| `left_leg` | `left_leg` | Left leg animation. |

Non-humanoid rigs can map only the channels they need:

```json
"bones": {
  "head": "head",
  "body": "body1"
}
```

If a channel is missing, Townstead falls back to its vanilla-style bone name. That is useful for humanoids, but non-humanoid rigs should map important channels explicitly.

In a geometry model, a bone can be inside other bones. A field that names a bone, such as `hold`, `face`, or a boot, follows the full chain of parent bones.

## Animation

`animation` plays keyframe clips on the bones of the rig. It works on a `geometry` model, an entity layer with a `class`, and `minecraft:spider`. It does not work on an entity layer that Townstead draws as a humanoid. A geometry model has no animation of its own, so use clips to make it move. The clips add to the pose of the model, after its own animation.

```json
"animation": {
  "file": "examplepack:animations/creature.animation.json",
  "transition": 4,
  "clips": [
    { "state": "sleeping", "clip": "sleep" },
    { "state": "moving", "clip": "walk", "speed": 1.2 },
    { "when": { "type": "pheno:profession", "profession": "minecraft:farmer" }, "clip": "idle_farmer" },
    { "clip": "idle" }
  ]
}
```

| Field | Default | Notes |
| --- | --- | --- |
| `file` | required | A Bedrock animation file (`.animation.json`), from your data pack or from another installed mod. |
| `transition` | `4` | Ticks to blend from one clip to the next. |
| `clips` | required | The rules, in order. Each tick, Townstead plays the clip of the first rule that matches. |

| Rule Field | Default | Notes |
| --- | --- | --- |
| `clip` | required | The clip name. Townstead also matches a Blockbench name that ends in `.<clip>`, so `walk` matches `animation.creature.walk`. To use a clip from a different file, write `<file>#<clip>`. |
| `state` | any state | The rule matches only in this state. See the table below. |
| `when` | always | A [Pheno condition](/pheno/conditions/). Each client tests it, so use conditions that work on the client. |
| `transition` | the `transition` of the block | Ticks to blend into this clip. |
| `speed` | `1` | Multiplies the playback speed. |

A rule with no `state` and no `when` always matches. Put it last, as the default clip. When no rule matches, no clip plays.

| `state` | True when the entity |
| --- | --- |
| `moving` | walks. |
| `sprinting` | sprints. |
| `sneaking` | crouches. |
| `swimming` | swims. |
| `sleeping` | sleeps. |
| `sitting` | rides something. |
| `gliding` | glides with elytra. |
| `parachuting` | descends with a parachute `slow_fall` ability. |
| `flying` | is a player in creative-style flight. |
| `hurt` | was just hurt. |
| `attacking` | swings or is aggressive. |
| `panicking` | is a villager that panics. |
| `working` | is a villager doing an MCA chore. |
| `wearing_helmet`, `wearing_chestplate`, `wearing_leggings`, `wearing_boots` | wears an item in that slot. |

A clip that loops plays again from the start. A clip that does not loop stops on its last frame.

## Transforms

Several rig blocks use the same transform shape:

| Field | Type | Notes |
| --- | --- | --- |
| `offset` | number array | `[x, y, z]` in model pixels. Defaults to `[0, 0, 0]`. |
| `rotation` | number array | `[x, y, z]` in degrees. Defaults to `[0, 0, 0]`. |
| `scale` | number | Used by boots and similar placements when supported. Defaults to `1`. |

Most placement work is tuned by eye. Add one anchor at a time, reload, inspect, then adjust.
