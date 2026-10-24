---
title: Poses & Emotes
description: Named poses and the mapping of humanoid emotes onto a rig.
---

This page describes named poses, and how humanoid emotes map onto a rig. Rig files are described on [Rigs](/roots/rigs/).

## Poses

`poses` applies additive bone transforms for named states.

```json
"poses": {
  "crouch": [
    {
      "bone": "body1",
      "offset": [0, 1.5, 0]
    },
    {
      "bone": "right_front_leg",
      "offset": [0, 1.5, 0],
      "rotation": [0, 0, 25]
    },
    {
      "bone": "left_front_leg",
      "offset": [0, 1.5, 0],
      "rotation": [0, 0, -25]
    }
  ]
}
```

| Pose Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `bone` | string | yes | Bone to modify. |
| `offset` | number array | no | Additive offset in model pixels. |
| `rotation` | number array | no | Additive rotation in degrees. |

Townstead reads these pose names:

| Pose | When Townstead applies it |
| --- | --- |
| `crouch` | The body crouches. |
| `sleep` | The body sleeps. |
| `crawl` | The body swims or crawls. |
| `neutral` | Always. It corrects the rest pose. See [Neutral Pose](#neutral-pose). |

Townstead blends into `crouch`, `sleep`, and `crawl` over a few ticks, and blends out again when the state ends.

### Whole-Body Transforms

A pose can be a list of bones, as above, or an object with `bones` and a whole-body `body` transform:

```json
"poses": {
  "crawl": {
    "body": { "pitch": 80, "offset": [0, -4, 0] },
    "bones": [
      { "bone": "head", "rotation": [-70, 0, 0] }
    ]
  }
}
```

| `body` Field | Default | Notes |
| --- | --- | --- |
| `yaw`, `pitch`, `roll` | `0` | Degrees. For `sleep`, they turn the body on the bed. See [Sleep Orientation](/roots/rigs/body/#sleep-orientation). For `crawl`, Townstead adds them to the upright stance. The `crouch` pose does not use them. |
| `offset` | `[0, 0, 0]` | Moves the whole body, in model pixels. It works for `crouch`, `sleep`, and `crawl`. |

The `neutral` pose uses only `bones`.

### Neutral Pose

The `neutral` pose corrects the rest pose of the model. Townstead applies it every frame, after the model resets its bones and before clips play. Like [clips](/roots/rigs/model/#animation), it works on a `geometry` model, an entity layer with a `class`, and `minecraft:spider`. Use it when a model from another mod rests in an odd position, for example arms that point forward:

```json
"poses": {
  "neutral": [
    { "bone": "right_arm", "rotation": [-20, 0, 0] },
    { "bone": "left_arm", "rotation": [-20, 0, 0] }
  ]
}
```

## Emote Mapping

`emote` describes how humanoid-authored Emotecraft-style motion maps onto this rig. Humanoid rigs usually do not need an `emote` block. Non-humanoid rigs can use it to decide which humanoid channels they can express and which emotes should be refused.

```json
"emote": {
  "body_motion": {
    "scale": 0.5,
    "floor": -0.25
  },
  "channels": {
    "head": {
      "bone": "head"
    },
    "right_arm": {
      "bone": "right_front_leg",
      "mode": "additive",
      "axis": ["x", "y", "z"],
      "gain": [0.0, 0.3, 0.55],
      "clamp": {
        "z": [-100, 100]
      },
      "also": [
        {
          "bone": "right_middle_front_leg",
          "gain": [0.0, 0.15, 0.3]
        }
      ]
    },
    "left_arm": {
      "mirror": true
    }
  },
  "policy": {
    "min_coverage": 0.5,
    "deny": ["kazotsky"]
  }
}
```

### Body Motion

`body_motion` controls whole-body lift, drop, and rotation from the source emote.

| Form | Meaning |
| --- | --- |
| `false` | Suppress whole-body motion. |
| `true` | Use full humanoid body motion. |
| object | Use `scale` and optional `floor`. |

Object fields:

| Field | Type | Notes |
| --- | --- | --- |
| `scale` | number | Multiplies whole-body motion. `0` suppresses it, `1` keeps it full. |
| `floor` | number | Lowest allowed downward movement in blocks. Useful for low bodies that should not sink under the floor. |

### Emote Channels

Each `channels` entry maps a humanoid emote channel to one rig bone.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `bone` | string | no | Target rig bone. Defaults to the channel name. |
| `mode` | string | no | `absolute` or `additive`. Defaults to `absolute`. |
| `axis` | string array | no | Axis remap such as `["z", "x", "-y"]`. Defaults to `["x", "y", "z"]`. |
| `euler` | number array | no | Extra rotation in degrees after remapping. |
| `gain` | number array | no | Per-axis multiplier. Defaults to `[1, 1, 1]`. |
| `translation` | boolean | no | Whether translation is used for this channel. Defaults to `false`. |
| `clamp` | object | no | Per-axis degree limits. |
| `also` | array | no | Additional bones driven by the same channel with their own gain. |
| `bend` | boolean | no | Applies segment bend for limb-like bones. Defaults to `false`. |
| `bend_gain` | number | no | Bend multiplier. Defaults to `1`. |
| `mirror` | boolean | no | Copies the opposite side channel and swaps left/right bone names. |

Use `additive` when a humanoid limb is being interpreted by a different kind of bone, such as a spider leg. Use `absolute` when the target bone behaves like the source channel.

`axis` entries can be `x`, `y`, `z`, or a negative form such as `-x`.

Clamp example:

```json
"clamp": {
  "z": [-90, 90]
}
```

Fan-out example:

```json
"also": [
  {
    "bone": "right_middle_front_leg",
    "gain": [0.0, 0.15, 0.3]
  }
]
```

### Emote Policy

`policy` controls which emotes the rig is willing to play.

| Field | Type | Notes |
| --- | --- | --- |
| `min_coverage` | number | Minimum share of emote motion that must land on expressible channels. Defaults to `0`. |
| `fallback` | string | Emote id or name to use when a refused emote needs a substitute. |
| `allow` | string array | Emote ids or names that are allowed. |
| `deny` | string array | Emote ids or names that are refused. |

`allow` and `deny` match an emote path or display name case-insensitively.
