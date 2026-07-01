---
title: Rigs
description: Body rigs, model sources, bones, anchors, equipment, poses, and emote mapping
---

A rig tells Townstead how a species or life stage should render. It connects a body model to textures, animation bones, face placement, held items, worn equipment, hitboxes, camera height, and optional emote remapping.

Species choose the default rig for a root. Life stages can override that rig for temporary forms such as eggs, cocoons, larvae, or other bodies that do not share the adult shape.

## Minimal Rig Path

For a first custom body, start small:

1. Add `rig.base` to the species.
2. Create one `data/<namespace>/rig/<path>.json` file.
3. Define `model`, `texture`, and the core `bones`.
4. Test the body in game before adding armour, held items, wearables, poses, or emotes.

Custom rigs are easiest to debug when the base body renders correctly before anything else is layered on top.

## Species Rig Block

The species file selects the rig used by roots in that species.

```json
{
  "schema": "townstead:species/v2",
  "display_name": "Skeletownie",
  "rig": {
    "base": "townstead_skeleton:skeletownie",
    "scale": 0.96
  },
  "breasts": false
}
```

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `base` | id | no | Rig id or model-layer style id. Defaults to the MCA villager-style body when omitted. |
| `scale` | number | no | Global render scale for the species. Defaults to `1.0`. |

Use `scale` for species-wide body size. Use life-stage `scale` when only one stage should render larger or smaller.

## Rig Files

Path: `data/<namespace>/rig/<path>.json`

Schema: `townstead:rig/v1`

The file id comes from its path. For example:

```text
data/townstead_spider/rig/webster.json
```

loads as:

```text
townstead_spider:webster
```

## Humanoid-Like Example

This kind of rig reuses a model layer that already behaves like a humanoid. It can map the expected animation channels directly and use normal armour layers.

```json
{
  "schema": "townstead:rig/v1",
  "model": {
    "type": "entity_layer",
    "layer": "minecraft:skeleton#main"
  },
  "texture": "townstead_skeleton:textures/entity/skeletownie.png",
  "bones": {
    "head": "head",
    "headwear": "hat",
    "body": "body",
    "right_arm": "right_arm",
    "left_arm": "left_arm",
    "right_leg": "right_leg",
    "left_leg": "left_leg"
  },
  "armor": {
    "type": "layers",
    "inner": "minecraft:skeleton#inner_armor",
    "outer": "minecraft:skeleton#outer_armor"
  },
  "face": {
    "bone": "head",
    "center": [0, -4, -4],
    "size": [8, 8],
    "forward": -1
  }
}
```

## Non-Humanoid Example

Non-humanoid rigs usually need more placement data. This example shows a spider-like body with a face anchor, held-item grips, wearable anchors, boots, equipment restrictions, hitbox, camera bone, crouch pose, and emote mapping.

```json
{
  "schema": "townstead:rig/v1",
  "model": {
    "type": "entity_layer",
    "layer": "minecraft:spider#main"
  },
  "texture": "townstead_spider:textures/entity/spider.png",
  "bones": {
    "head": "head",
    "body": "body1"
  },
  "face": {
    "bone": "head",
    "center": [0, 0, -8],
    "size": [8, 8],
    "forward": -1
  },
  "hold": {
    "mainhand": {
      "bone": "right_front_leg",
      "offset": [0, -1, -2],
      "rotation": [-60, 100, -60],
      "first_person": {
        "offset": [0, -10, 10],
        "rotation": [20, -40, -20]
      }
    }
  },
  "equipment": {
    "disabled": ["chest", "legs"]
  },
  "hitbox": {
    "width": 0.9,
    "height": 0.9
  },
  "camera": {
    "bone": "head"
  },
  "hair": false
}
```

## Main Fields

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `schema` | string | yes | `townstead:rig/v1`. |
| `model` | object | yes | Model source for the body. |
| `texture` | id/path string | no | Base texture for the body. |
| `bones` | object | no | Maps Townstead animation channels to model bone names. Missing channels fall back to vanilla-style names. |
| `armor` | object | no | Armour rendering mode and armour model layers. |
| `face` | object | no | Plane used by face, eye, and mouth overlays. |
| `wearables` | object | no | Head, back, and boot placement for worn layers. |
| `hold` | object | no | Mainhand and offhand held-item grips. |
| `hair` | boolean | no | Whether MCA hair rendering is supported. Defaults to `false`. |
| `poses` | object | no | Named additive pose transforms. |
| `hitbox` | object | no | Collision and interaction size in blocks. |
| `equipment` | object | no | Equipment slots this rig refuses. |
| `camera` | object | no | Bone used to derive first-person eye height. |
| `emote` | object | no | Emotecraft-style humanoid emote remapping and policy. |

## Model

`model.type` controls where the body model comes from.

| `model.type` | Required Fields | Notes |
| --- | --- | --- |
| `entity_layer` | `layer` | Uses a Minecraft entity model layer. A `#layer` suffix selects the layer name; default layer is `main`. |
| `geometry` | `file` | Uses a geometry file path, such as `my_pack:geo/egg.geo.json`. |

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

## Transforms

Several rig blocks use the same transform shape:

| Field | Type | Notes |
| --- | --- | --- |
| `offset` | number array | `[x, y, z]` in model pixels. Defaults to `[0, 0, 0]`. |
| `rotation` | number array | `[x, y, z]` in degrees. Defaults to `[0, 0, 0]`. |
| `scale` | number | Used by boots and similar placements when supported. Defaults to `1`. |

Most placement work is tuned by eye. Add one anchor at a time, reload, inspect, then adjust.

## Armour

`armor` controls whether normal armour renders on this body.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `type` | string | no | `none`, `layers`, or `custom`. Defaults to `none`. |
| `inner` | model layer id | for `layers` | Inner armour layer, usually used for leggings. |
| `outer` | model layer id | for `layers` | Outer armour layer, usually used for helmet, chestplate, and boots. |

```json
"armor": {
  "type": "layers",
  "inner": "minecraft:skeleton#inner_armor",
  "outer": "minecraft:skeleton#outer_armor"
}
```

Use `none` for bodies that should not render standard armour. Use `equipment.disabled` as well when the body should refuse the equipment slot entirely.

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

## Wearables

`wearables` moves worn layers onto the rig's actual body. This matters most for non-humanoid rigs because vanilla head and back layers otherwise assume a standing humanoid.

| Field | Type | Notes |
| --- | --- | --- |
| `head` | object | Base transform for head-worn layers and per-item head deltas. |
| `back` | object | Base transform for back-worn layers and per-item back deltas. |
| `boots` | array | One boot placement per leg or foot bone. |

Head and back anchors use a base transform plus optional `items` entries:

```json
"wearables": {
  "head": {
    "offset": [0, 2, -4],
    "rotation": [0, 0, 0],
    "items": {
      "townstead:scarf": {
        "offset": [0, 6, 10],
        "rotation": [0, 0, 0]
      }
    }
  },
  "back": {
    "offset": [0, 0, 0],
    "rotation": [90, 0, 0],
    "items": {
      "backpack": { "offset": [0, -4, 0] },
      "cape": {},
      "elytra": {}
    }
  }
}
```

`items` keys can be item ids, such as `townstead:scarf`, or layer keys used by Townstead for broad worn layers, such as `backpack`, `cape`, and `elytra`.

Boot placements are separate because a non-humanoid body may have more than two feet:

```json
"boots": [
  {
    "bone": "right_hind_leg",
    "boot": "right",
    "scale": 1.0,
    "offset": [-1, -4, -1],
    "rotation": [0, 0, 95]
  },
  {
    "bone": "left_hind_leg",
    "boot": "left",
    "scale": 1.0,
    "offset": [1, -4, -1],
    "rotation": [0, 0, -95]
  }
]
```

| Boot Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `bone` | string | yes | Leg or foot bone to attach to. |
| `boot` | string | no | `left` or `right`. Defaults to `right`. |
| `scale` | number | no | Boot render scale. Defaults to `1`. |
| `offset` | number array | no | Boot placement in local model pixels. |
| `rotation` | number array | no | Boot rotation in degrees. |

## Held Items

`hold` defines where mainhand and offhand items sit.

```json
"hold": {
  "mainhand": {
    "bone": "right_front_leg",
    "offset": [0, -1, -2],
    "rotation": [-60, 100, -60],
    "first_person": {
      "offset": [0, -10, 10],
      "rotation": [20, -40, -20]
    }
  },
  "offhand": {
    "bone": "left_front_leg",
    "offset": [-2, -2, -3],
    "rotation": [-60, 100, -60],
    "first_person": {
      "offset": [0, -10, 10],
      "rotation": [20, -40, -20]
    }
  }
}
```

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `bone` | string | no | Bone that grips the item. Empty means no useful grip. |
| `offset` | number array | no | Third-person item offset. |
| `rotation` | number array | no | Third-person item rotation. |
| `first_person` | object | no | Separate offset and rotation used by first-person rendering. |

If `hold` is omitted, the rig does not define custom hand grips.

## Hair

`hair` controls whether MCA hair rendering is supported.

```json
"hair": false
```

Custom bodies often set this to `false` because their head shape or texture layout does not match MCA hair. Set it to `true` only when the rig is compatible with MCA hair placement.

## Equipment

`equipment.disabled` lists vanilla equipment slots this body refuses.

```json
"equipment": {
  "disabled": ["head", "chest", "legs", "feet"]
}
```

Supported slot names are vanilla equipment slot names such as:

| Slot |
| --- |
| `head` |
| `chest` |
| `legs` |
| `feet` |
| `mainhand` |
| `offhand` |

Disabled slots are not just hidden visually. Townstead's equipment backstop can reject items placed into those slots so the body does not keep gear it cannot use.

## Hitbox

`hitbox` sets the rig's collision and interaction size in blocks.

```json
"hitbox": {
  "width": 1.0,
  "height": 1.0
}
```

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `width` | number | no | Square footprint width in blocks. Defaults to `0.6` if the block exists but the field is omitted. |
| `height` | number | no | Height in blocks. Defaults to `2.0` if the block exists but the field is omitted. |

Omit `hitbox` to keep the normal MCA-style size. Use it for bodies that would feel wrong with a tall humanoid collision column, such as an egg or low spider body.

## Camera

`camera.bone` tells Townstead which bone should drive first-person eye height.

```json
"camera": {
  "bone": "head"
}
```

This is especially useful for short, low, or non-humanoid bodies. If omitted, Townstead keeps the usual height-proportional camera behaviour.

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

Currently documented examples use `crouch`. More pose states can be documented as they become stable.

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

## Stage Rig Overrides

A life stage can set `rig` to render with a different body from the species default.

```json
{
  "id": "egg",
  "label": "Egg",
  "presents_as": "baby",
  "days": 3,
  "rig": "townstead_spider:egg",
  "mobile": false,
  "needs": false,
  "talkable": false
}
```

The stage rig only changes how that stage renders and behaves. The root still belongs to the same species, ancestry, and lineage.

An egg-style rig can be very small:

```json
{
  "schema": "townstead:rig/v1",
  "model": {
    "type": "geometry",
    "file": "townstead_spider:geo/egg.geo.json"
  },
  "texture": "townstead_spider:textures/entity/egg.png",
  "bones": {
    "head": "egg",
    "body": "egg"
  },
  "hitbox": {
    "width": 1.0,
    "height": 1.0
  },
  "equipment": {
    "disabled": ["head", "chest", "legs", "feet"]
  },
  "hair": false
}
```