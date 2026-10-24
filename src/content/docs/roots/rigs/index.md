---
title: Rigs
description: Body rigs, rig files, and the pages for each part of a rig.
---

A rig tells Townstead how a species or life stage should render. It connects a body model to textures, animation bones, face placement, held items, worn equipment, hitboxes, camera height, sleep orientation, and optional emote remapping.

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

Non-humanoid rigs usually need more placement data. This example shows a spider-like body with a face anchor, a held-item grip, equipment restrictions, a hitbox, a camera bone, and a sleep orientation.

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
  "poses": {
    "sleep": {
      "body": { "yaw": 0, "pitch": 0, "roll": 0 }
    }
  },
  "hair": false
}
```

## Main Fields

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `schema` | string | yes | `townstead:rig/v1`. |
| `model` | object | yes | Model source for the body. It can come from another installed mod. See [Models From Other Mods](/roots/rigs/other-mods/). |
| `texture` | id/path string | no | Base texture for the body. In a rig that an [entity state](/pheno/entity-states/#tiers) tier uses, the path can contain `{name:N}`. See [Texture Variants](#texture-variants). |
| `bones` | object | no | Maps Townstead animation channels to model bone names. Missing channels fall back to vanilla-style names. |
| `armor` | object | no | Armour rendering mode and armour model layers. |
| `face` | object | no | Plane used by face, eye, and mouth overlays. |
| `wearables` | object | no | Head, back, and boot placement for worn layers. |
| `hold` | object | no | Mainhand and offhand held-item grips. |
| `hair` | boolean | no | Whether MCA hair rendering is supported. Defaults to `false`. |
| `skin_parts` | string array | no | The body parts a worn villager skin covers. See [Worn Skins](/roots/rigs/gear/#worn-skins). |
| `poses` | object | no | Named additive pose transforms. |
| `animation` | object | no | Keyframe clips that play by state or condition. |
| `overlays` | array | no | Textures drawn over the body with the same model: `texture`, optional `glow`, and optional `tint`. `glow` is `true` to draw the overlay full-bright, or the name of a texture variant: the overlay glows when that variant is not `0`. With `"tint": "iris"`, the texture is an eye mask: it shows only while the character expresses an iris gene, in that gene's colour, and glows when the gene glows. |
| `hitbox` | object | no | Collision and interaction size in blocks. |
| `colliders` | array | no | Capsules that attachment physics rests against. |
| `equipment` | object | no | Equipment slots this rig refuses. |
| `camera` | object | no | Bone used to derive first-person eye height, and an optional `height_offset`. |
| `emote` | object | no | Emotecraft-style humanoid emote remapping and policy. |

## Texture Variants

An entity state can change the rig of a character, for example into a beast form. In the tier of the state, `variants` maps variant names to other states. See [Entity States](/pheno/entity-states/#tiers). The rig of that tier can then use the variants in its `texture` and `overlays`:

```json
"texture": "examplepack:textures/entity/werebear_{coat:4}.png"
```

`{coat:4}` becomes a number from `0` to `3`:

- When the state that the tier names for `coat` is active, the number is the value of that state minus 1.
- When that state is not active, Townstead picks a fixed number for each character, so each character keeps their own look.

Outside a state form, each placeholder is `0`.

## Rig Pages

| Page | Fields |
| --- | --- |
| [Model & Bones](/roots/rigs/model/) | `model`, `model.class`, `texture`, `bones`, `animation`, and the transform shape that other blocks use. |
| [Models From Other Mods](/roots/rigs/other-mods/) | How a rig uses the models, animations, and textures of another installed mod. |
| [Gear & Clothing](/roots/rigs/gear/) | `armor`, `wearables`, worn skins, work clothes, outfits, `hold`, `hair`, and `equipment`. |
| [Body & Camera](/roots/rigs/body/) | `face`, `hitbox`, `colliders`, `camera`, and `sleep`. |
| [Poses & Emotes](/roots/rigs/poses/) | `poses` and `emote`. |

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
