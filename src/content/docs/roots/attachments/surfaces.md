---
title: Surfaces & Colour
description: Tint sources, blend modes, heritable colour, emissive glow, and translucency
---

How an attachment is painted, beyond its base texture. All of these live in the definition file.

```json
{
  "tint": "hair",
  "tint_blend": "overlay",
  "tint_strength": 0.8,
  "tint_mask": "wing_mask",
  "emissive": "horn_runes",
  "render": "translucent"
}
```

## Tint Sources

`tint` accepts a flat colour or a bearer-resolved source:

| Value | Colour used |
| --- | --- |
| `"#RRGGBB"` | The flat colour. |
| `"skin"` | The skin colour the bearer's face actually rendered with (MCA's melanin gradient plus any origin tint), captured from the skin layer each frame. The older `"skin_tint": true` still works as an alias. |
| `"hair"` | The bearer's rendered hair colour, greying included. Falls back to the flat tint until hair has rendered, or when the rig hides hair. |
| `"eyes"` | The bearer's expressed eye colour, matching the face overlay. |
| `"gene"` | The heritable colour rolled on the granting gene's tint channels. See below. |

Author the texture in grayscale for bearer-resolved sources, the same as skin tinting: a tail that greys with its senior's hair, horns that match the eyes.

## Blend Modes And Strength

| Field | Values | Notes |
| --- | --- | --- |
| `tint_blend` | `multiply` (default), `screen`, `overlay`, `color` | The same four modes skin palettes use. Multiply darkens, screen lightens, overlay deepens contrast, and `color` keeps the texture's shading while taking the tint's hue. |
| `tint_strength` | 0..1 | Fades the tint toward the untinted texture. Defaults to `1`. |

Non-multiply modes bake a tinted copy of the texture on the client, cached and cheap. `color` is the mode to reach for when recolouring a painted (non-grayscale) texture, such as coat colours over detailed fur.

## Tint Mask

A tint normally applies to the whole attachment. `tint_mask` names a second texture that sets how much of the tint applies to each pixel, so part of an attachment can be tinted and part of it left alone, like a wing where the membrane takes the gene's colour and the chitin stays neutral.

The mask is a grayscale PNG that goes beside the base texture, in `data/<ns>/attachment/textures/`, and it has to be the same size as that texture. Each pixel's brightness is how strongly the tint applies there:

| Mask pixel | Result |
| --- | --- |
| Black | The base texture's own colour, untinted. |
| White | The full tint. |
| Mid-grey | Eased between the two, so a region can fade into its neighbour. |
| Transparent | Read as black, so you can cut the mask out instead of painting it. |

```json
{
  "texture": "insect_wing",
  "tint": "gene",
  "tint_blend": "color",
  "tint_mask": "insect_wing_mask"
}
```

To use it, for example to make an insect wing, paint the membrane white and the chitin black in `data/<ns>/attachment/textures/insect_wing_mask.png`. That makes the membrane take the gene's rolled colour while the chitin renders untinted.

The `color` blend in that example is not something the mask needs. It is there because the wing texture is painted rather than grayscale, and a mask works with any of the four blend modes.

Without a mask, brightness is the only lever you have, because the `color` blend keeps each pixel's luminance and only replaces its hue and saturation. Near-white and near-black pixels barely change, so a white tail tip stays white while the rest of the tail takes the rolled colour. But a mid-tone region always takes the hue, so you cannot get neutral grey chitin beside a coloured membrane that way. That is what `tint_mask` is for.

Two things to know:

- A masked attachment always bakes a derived texture, even under `multiply`, which otherwise gets its tint for free from a vertex colour. The bake is cached per texture, mask, and colour, and shared across every bearer, so you pay for one bake per distinct colour rather than one per villager.
- The mask has to match the base texture's dimensions. If it does not, it is ignored rather than sampled wrong, and `/townstead attachment doctor` reports the mismatch along with both sizes.

## Heritable Colour

`"tint": "gene"` reads the colour from the bearer's genetics. The granting gene declares the palette:

```json
"tint": {
  "label": "Fur Colour",
  "palette": ["#F1762B", "#EFE6D5", "#3B322D"]
}
```

Newborns roll a palette colour, children mean-blend their parents' components, and the character editor offers the palette as swatches plus free colour bars. Pair it with `"tint_blend": "color"` to recolour a painted texture while keeping its shading. The genetics side is covered in [Genetics & Morphs](/roots/attachments/genetics/).

## Emissive

`emissive` names a second texture drawn full-bright over the same geometry, day or night. Transparent pixels do not glow, so a mostly transparent mask lights just the markings: glowing runes, foxfire tips, bioluminescent spots. The emissive layer follows every morph, pose, clip, and physics swing of the base pass, and it is untinted, so a glow stays constant across heritable coat colours.

## Translucency

`"render": "translucent"` renders the whole attachment with alpha, for wisps, membranes, and ghost tails. The default `cutout` treats alpha as on-or-off, which is right for almost everything else.
