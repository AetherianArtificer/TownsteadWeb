---
title: Body & Camera
description: The face plane, hitbox, physics colliders, camera height, and sleep orientation of a rig.
---

This page describes the face, the size, the colliders, the camera, and the sleep orientation of a rig. Rig files are described on [Rigs](/roots/rigs/).

## Face

`face` places a flat overlay plane on a bone. Appearance genes and generated character UI can use this plane for eyes, mouths, and face assets.

| Field | Type | Default | Notes |
| --- | --- | --- | --- |
| `bone` | string | `head` | Bone the face plane follows. |
| `center` | number array | `[0, -4, -4]` | Centre of the face plane in the bone's local model pixels. |
| `size` | number array | `[8, 8]` | Width and height of the face plane. |
| `forward` | number | `-1` | Direction the face points along the bone's local Z axis. Use `-1` for the usual front-facing `-Z` side, `1` for `+Z`. |

Humanoid-style head:

```json
"face": {
  "bone": "head",
  "center": [0, -4, -4],
  "size": [8, 8],
  "forward": -1
}
```

Spider-style head:

```json
"face": {
  "bone": "head",
  "center": [0, 0, -8],
  "size": [8, 8],
  "forward": -1
}
```

## Hitbox

`hitbox` sets the rig's collision and interaction size in blocks, before any scaling.

```json
"hitbox": {
  "width": 0.5,
  "height": 0.75,
  "crouch_height": 0.625,
  "swim_height": 0.4,
  "eye_height": 0.625,
  "scale_with_entity": true
}
```

| Field | Type | Default | Notes |
| --- | --- | --- | --- |
| `width` | number | `0.6` | Square footprint width in blocks. |
| `height` | number | `2.0` | Standing height in blocks. |
| `crouch_height` | number | `height` × 1.5 / 1.8 | Height while crouching. It cannot be more than `height`. |
| `swim_height` | number | `0.6` | Height while swimming, crawling, gliding, or in a spin attack. It cannot be more than `height`. |
| `eye_height` | number | 85% of `height` | Eye height while standing, in blocks. In the other postures, the eyes keep the same share of the height. |
| `scale_with_entity` | boolean | `true` | With `true`, the box grows and shrinks with the size of the character: MCA's width and height, age, Townstead's life stage, the species rig `scale`, and Minecraft's scale attribute. With `false`, the box keeps the size in this file. |

Townstead keeps the final box between 0.2 and 0.6 blocks wide, and between 0.2 and 1.9 blocks high, so that the body can walk through a door. A larger model still draws at its full size. Only the box is limited.

A sleeping or riding body keeps Minecraft's own box.

Omit `hitbox` to keep the normal MCA-style size. A player with a rig that has no `hitbox` keeps the vanilla player size. Use `hitbox` for bodies that would feel wrong with a tall humanoid collision column, such as an egg or low spider body.

## Colliders

`colliders` lists capsules on the rig's bones. [Attachment physics](/roots/attachments/physics/#colliders) chains rest against these capsules, so a tail stops at the legs instead of going through them.

```json
"colliders": [
  { "name": "body", "bone": "body", "from": [0, 1, 0], "to": [0, 11, 0], "radius": 3 },
  { "name": "head", "bone": "head", "from": [0, -4, 0], "radius": 4.5 }
]
```

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `bone` | string | yes | A channel name (`body`, `head`, `right_leg`, ...) or a bone name in the model. The capsule moves with this bone. |
| `from` | [x, y, z] | no | One end of the capsule's centre line, in model pixels in the bone's own space. Defaults to `[0, 0, 0]`. |
| `to` | [x, y, z] | no | The other end. Defaults to `from`, which makes a sphere. |
| `radius` | number | yes | The capsule's thickness from its centre line, in model pixels. |
| `name` | string | no | The name chains use in `collide`. Defaults to the bone. |

A rig that does not list `colliders` uses the humanoid colliders (`body`, `right_leg`, `left_leg`, and `head`) when its model is humanoid, such as `minecraft:zombie`. A non-humanoid rig, such as one with custom geometry, a `model.class`, or `minecraft:spider`, has no colliders unless it lists them. To turn the humanoid colliders off, write `"colliders": []`. To keep only some of them, list those, for example a body and head for a body without legs.

## Camera

`camera.bone` tells Townstead which bone sets the first-person eye height.

```json
"camera": {
  "bone": "body",
  "height_offset": 8
}
```

| Field | Default | Notes |
| --- | --- | --- |
| `bone` | | The bone that sets the eye height. Townstead uses the rest position of the bone. Animation does not move the camera. |
| `height_offset` | `0` | Model pixels to add above the bone. A negative value lowers the camera. Use it when the pivot of the bone is low, such as a body bone near the feet. |

This is especially useful for short, low, or non-humanoid bodies. If omitted, Townstead keeps the usual height-proportional camera behaviour.

## Sleep Orientation

For a non-humanoid rig, Townstead replaces Minecraft's humanoid lay-down rotation with an upright rest that faces along the bed. To turn or lean the whole body on the bed, give the `sleep` pose a `body` transform:

```json
"poses": {
  "sleep": {
    "body": { "yaw": 0, "pitch": 0, "roll": 90, "offset": [0, 2, 0] },
    "bones": [
      { "bone": "right_front_leg", "rotation": [0, 0, 40] }
    ]
  }
}
```

| `body` Field | Default | Notes |
| --- | --- | --- |
| `yaw` | `0` | Degrees added to the direction along the bed. |
| `pitch` | `0` | Degrees. Leans the whole rig forward or backward around the X axis. |
| `roll` | `0` | Degrees. Leans the whole rig to the side around the Z axis. |
| `offset` | `[0, 0, 0]` | Moves the whole body, in model pixels. |

Use `body` when the whole body must face or lean differently on the bed. Use `bones` for changes to single bones, such as a lower body, folded legs, or tucked appendages. See [Poses](/roots/rigs/poses/#poses).
