---
title: Gear & Clothing
description: Armour, wearables, worn skins, work clothes, outfits, held items, hair, and equipment slots on a rig.
---

This page describes how a rig wears armour, clothing, and other gear, and how it holds items. Rig files are described on [Rigs](/roots/rigs/).

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

### Scale

The base transform of `head` and `back`, and each entry in `items`, also accept `scale` and `scale_axes`:

| Field | Default | Notes |
| --- | --- | --- |
| `scale` | `1` | Uniform size of the worn item. |
| `scale_axes` | `[1, 1, 1]` | Size along X, Y, and Z, multiplied by `scale`. For example, `[1.05, 0.3, 1.9]` fits a belt to a wide, short body. |

An `items` entry adds its offset and rotation to the base transform, and multiplies its scale with the base scale. Scale does not change the offsets. Offsets are always in model pixels.

### Item Keys

Townstead looks for an `items` entry in this order: the exact item ID, then a bare key. For a namespaced layer key, such as `examplemod:backpack`, Townstead also tries the part after the colon, `backpack`.

Curios items also use these keys. They work on a `geometry` rig, an entity layer with a `class`, and `minecraft:spider`:

| Key | Matches |
| --- | --- |
| `slot:<slot>` | A Curios item in that slot, when Townstead draws the item itself. Townstead draws items in the `back`, `head`, `necklace`, `body`, and `belt` slots. Put `head` entries under `head`, and the others under `back`. |
| `renderer:<slot>` | A Curios item in that slot that has its own renderer, when the renderer copies the body bones. A renderer that ignores the body bones needs its own compatibility. |

```json
"wearables": {
  "back": {
    "offset": [0, -8, 2],
    "items": {
      "backpack": { "offset": [0, 4.5, 2], "scale": 0.5 },
      "slot:necklace": { "offset": [0, 3, -5.5], "scale": 0.7 },
      "slot:belt": { "offset": [0, 7, -5.5], "scale": 0.7, "scale_axes": [1.05, 0.3, 1.9] },
      "examplemod:pendant": { "offset": [0, 0, -4.5], "scale": 0.65 }
    }
  }
}
```

An exact item ID comes before a `slot:` or `renderer:` key.

### Hands and Feet

Put entries for Curios items in the `hands` and `feet` slots under `back.items`, with the item ID or `renderer:hands` and `renderer:feet`:

- On a rig with no `boots`, the offset of the entry is relative to each arm or leg bone. It does not include the base offset of `back`.
- On a rig with `boots`, a `feet` item draws once on each boot seat, and a `hands` item draws once on each arm, at the seat of the first boot on that side. The entry adds to the seat.

Write each entry for the right side. The left side uses the mirror image: Townstead negates the X offset and the Y and Z rotations. For a body without humanoid arms and legs, map `right_arm` and `left_arm` in `bones` to the bones that wear the items.

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

## Worn Skins

A rig whose model uses the villager skin layout, such as the vanilla zombie, can wear MCA's clothing skins. The root's `body_clothing` lists the skins that fit the body. Patterns such as `mca:skins/clothing/zombie/*` are accepted.

When a body's layout only partly matches, `skin_parts` limits a worn skin to the parts it fits. Valid parts are `head`, `body`, `right_arm`, `left_arm`, `right_leg`, and `left_leg`; `head` includes the headwear layer. For example, a legless ghost on a skeleton model has thin limbs that villager skin UVs don't fit:

```json
"skin_parts": ["head", "body"]
```

Leave `skin_parts` out to let the skin cover every part.

On a body with fitted skins, the character editor's clothes list shows only those skins, including skins marked `exclude`.

`skin_remap` swaps part of a worn skin's path when this body draws it. MCA's outfit list only holds ordinary clothes, and its zombie villagers draw each outfit's tattered counterpart. A zombie body can fit every ordinary outfit and draw that counterpart the same way:

```json
"skin_remap": { "/normal/": "/zombie/" }
```

If the swapped texture doesn't exist, the outfit is drawn as worn.

### Work Clothes

Work clothes on a rig body work like MCA's: they are skins with a `profession`. Villagers get one for their profession, and players choose one in the character editor. To add model pieces such as a hat or a tool, add an [outfit](#outfits) whose `when` tests the worn skin with `pheno:wearing_skin`:

```json
"outfits": {
  "farmer": {
    "when": { "type": "pheno:wearing_skin", "skin": "examplepack:textures/skins/clothing/frog/farmer.png" },
    "pieces": [ { "model": "examplepack:geo/frog_farmer.geo.json", "bones": ["straw_hat"] } ]
  }
}
```

When the pieces are the whole look, the skin texture can be fully transparent.

## Outfits

An outfit adds model pieces to a body while a condition is true, such as a hat for a profession or an umbrella in the rain. Each piece is a group of bones from a second geometry file. Outfits work only on a rig with a `geometry` model.

Put `outfits` in the species, ancestry, lineage, or root file, not in the rig file:

```json
{
  "schema": "townstead:root/v1",
  "outfits": {
    "farmer": {
      "when": { "type": "pheno:profession", "profession": "minecraft:farmer" },
      "pieces": [
        { "model": "examplepack:geo/creature_farmer.geo.json", "bones": ["straw_hat", "watering_can"] }
      ],
      "transition": 5
    }
  }
}
```

| Field | Default | Notes |
| --- | --- | --- |
| `when` | always | A [Pheno condition](/pheno/conditions/). The body wears the outfit while it is true. Each client tests it, so use conditions that work on the client. |
| `pieces` | required | A list of pieces. Each piece has a `model`, which is a geometry file, and `bones`, which is a list of bone names in that file. |
| `transition` | `0` | Ticks to grow the pieces from their pivots when the outfit starts, and to shrink them when it ends. With `0`, the pieces appear and disappear at once. |

- Townstead adds each named bone with all of the bones inside it. Each bone keeps its parent from its own file. So cut the pieces from a model that has the same skeleton as the rig, such as a different version of the same creature.
- If the body already has a bone with that name, Townstead keeps the bone of the body.
- The pieces use the texture of the rig, and move with its clips.
- A body can wear more than one outfit at a time. Townstead adds every outfit whose `when` is true.
- The `model` can be in your data pack or in another installed mod. See [Models From Other Mods](/roots/rigs/other-mods/).

Townstead merges outfits by their ID in this order: species, ancestry, lineage, root. An outfit in a later file replaces an outfit with the same ID from an earlier file. To remove an outfit that a root gets from its species, give the root an outfit with the same ID and no pieces:

```json
"outfits": {
  "farmer": { "pieces": [] }
}
```

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

Disabled slots are not just hidden visually. The villager inventory refuses items for them, villagers don't dress them, and Townstead's equipment backstop takes anything placed there back out, so the body does not keep gear it cannot use.

Use `equipment.hidden` for a body that must still wear the gear: the item stays on and keeps its protection, but no armour is drawn for the slot. Curios in the matching slot types are not drawn either (`feet`, `boots`, `shoes` and `anklet` for feet; `legs`, `pants` and `leggings` for legs). A legless ghost hides its legs and feet, so a ghost guard keeps its leggings and boots on without them floating below its body:

```json
"equipment": {
  "hidden": ["legs", "feet"]
}
```
