---
title: Hair Policy
description: Use the hair field to turn MCA hair off or to limit its colours for a species, ancestry, lineage, or heritage profile.
---

Use the `hair` field to set two things for the characters that have a root:

- If MCA hair is shown.
- Which colours the hair can have.

You can put the `hair` field in a species, an ancestry, a lineage, or a heritage profile. Townstead reads the most specific layer first. A lineage can limit the colours of its ancestry, or turn hair off for one branch, without a copy of the other settings.

The `hair` field applies to MCA-humanoid characters only. A custom rig has its own `hair` flag. See [Rigs](/roots/rigs/). Hair is shown only if the rig and the policy both permit it.

## Field

The short form only turns hair on or off:

```json
{
  "hair": false
}
```

Use the object form for new packs. It can turn hair on or off, and it can limit the colours:

```json
{
  "hair": {
    "enabled": true,
    "colors": [],
    "gradients": [],
    "color_ranges": []
  }
}
```

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `enabled` | boolean | no | Set `true` to show MCA hair. Omit the field to use the value from the next broader layer. If you set a colour limit and omit `enabled`, Townstead sets `enabled` to `true` for this layer. |
| `colors` | array | no | A list of exact colours. |
| `gradients` | array | no | A list of gradients with weights. `color_gradients` is an accepted alias. |
| `color_ranges` | array | no | A list of areas on the MCA genetic colour map. |

No field in the object is required. An empty object uses all values from the broader layers.

## Resolution

Townstead reads the hair policies in this order:

1. The heritage profile, if the profile `match` applies to the character's ancestry mix
2. The lineage
3. The ancestry
4. The species

Townstead resolves each property on its own:

- Townstead takes `enabled` from the first layer that sets it.
- Townstead takes `colors` from the first layer that sets it.
- Townstead takes `gradients` from the first layer that sets it.
- Townstead takes `color_ranges` from the first layer that sets it.

Example: a lineage sets `enabled: false` and no colours. The lineage keeps the colour limits of its ancestry, but the hair is not shown.

If no layer sets a value, hair is shown and MCA selects the colour.

## Colour Palette

The `colors` list and the `gradients` list together are the colour palette. The colour palette uses the MCA hair-dye value. Because of this, Townstead can show all RGB colours, not only the colours on the MCA genetic colour map. The server checks each dye value against the palette. A custom HSV dye cannot get a colour that is not in the palette.

### Exact Colours

```json
{
  "hair": {
    "colors": [
      "#4A78FF",
      { "color": "#FF73C6", "weight": 3, "name": "Rose" }
    ]
  }
}
```

Each entry is a hex string or an object.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `color` | string | yes | A colour in `#RRGGBB` form. |
| `weight` | integer | no | The selection weight. The default is `1`. |
| `name` | component | no | The display name of this colour. See [Names](#names). |

### Gradients

```json
{
  "hair": {
    "gradients": [
      {
        "stops": ["#4A78FF", "#8F55E8", "#FF73C6"],
        "weight": 3,
        "space": "hsv",
        "name": "Twilight"
      },
      {
        "from": "#DDFBFF",
        "to": "#FFFFFF",
        "weight": 1,
        "space": "rgb"
      }
    ]
  }
}
```

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `stops` | array | one of | Two or more colours in `#RRGGBB` form, in order. |
| `from`, `to` | string | one of | A short form for a gradient with two stops. |
| `weight` | integer | no | The selection weight for the full gradient. The default is `1`. |
| `space` | string | no | `hsv` is the default. It uses the shortest path around the hue circle. `rgb` mixes each channel directly. |
| `name` | component | no | The display name of this gradient. See [Names](#names). |

The weight sets how often Townstead selects this gradient. All positions on the gradient have the same probability.

### Names

You can give a colour or a gradient a name. The villager editor shows the name as a tooltip when you hold the pointer on that swatch or shade bar. The name has no effect on selection, inheritance, or rendering.

The `name` field is a text component. Write it in one of these forms:

```json
"name": "Moonsilver"
```

```json
"name": { "translate": "hair.my_pack.moonsilver" }
```

For the `translate` form, put the key in the lang sidecar of your pack, at `data/<namespace>/lang/en_us.json`. The server reads the English text from the sidecar and sends it to each client. A client resource pack can replace the text for other languages with the same key. If the key is not in the sidecar or in a resource pack, the editor shows the key.

### Selection From The Palette

Townstead selects a palette entry by weight in these cases:

- A new founder spawns.
- A child is born and no parent has a palette colour.
- You click Random Hair in the villager editor.

If the entry is a gradient, Townstead then selects a random position on it.

A child with a parent that has a palette colour gets its colour from the parents:

- If the palette has gradients, Townstead mixes the two parent colours. Townstead then moves the result to the nearest permitted point.
- If the palette has exact colours only, the child gets the colour of one parent.

If a character already has a colour that is not in the palette, Townstead moves it to the nearest permitted colour. This also applies to a colour you enter in the villager editor.

## Genetic Ranges

Use `color_ranges` to keep the hair on the MCA genetics. Each entry is a rectangle on the MCA genetic colour map.

```json
{
  "hair": {
    "color_ranges": [
      { "darkness": [0.35, 0.72], "redness": [0.62, 1.0], "weight": 4 },
      { "darkness": [0.55, 0.88], "redness": [0.35, 0.65] }
    ]
  }
}
```

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `darkness` | range | no | The MCA eumelanin axis, from `0` to `1`. The default is the full axis. `eumelanin` is an accepted alias. |
| `redness` | range | no | The MCA pheomelanin axis, from `0` to `1`. The default is the full axis. `pheomelanin` is an accepted alias. |
| `weight` | integer | no | The selection weight. The default is `1`. |

You can write a range in three forms:

- An array with two numbers: `[0.35, 0.72]`
- An object with `min` and `max`
- One number, for an exact value

For a new character, Townstead selects a rectangle by weight. Townstead then selects a random point in that rectangle.

For a child, Townstead keeps the mixed colour of the parents if the colour is in a rectangle. If the colour is not in a rectangle, Townstead moves it to the nearest edge.

Townstead removes a custom hair dye from a character with genetic ranges. A dye cannot give a colour that is outside the ranges.

If a layer has a colour palette and genetic ranges, Townstead shows the palette colour. The genes still roll and the children still inherit them, but Townstead does not show them.

## In The Villager Editor

The Hair tab shows only the colours that the policy permits.

- If the character has a colour palette, the tab shows one shade bar for each gradient and one swatch for each exact colour. The genetic colour square is not shown. Drag a bar or click a swatch to set the colour. Hold the pointer on a bar or a swatch to see its `name`.
- If the character has genetic ranges, the tab shows the genetic colour square. The cells outside the permitted rectangles are dimmed. Each rectangle has an outline. If you click outside a rectangle, Townstead moves the selection to the nearest edge.
- Random Hair selects a new style and then a new colour from the policy.
- If the character has no hair, the editor does not show the Hair tab.

## Examples

A dark elf lineage. The elf ancestry sets no hair colours. The lineage sets silver-white gradients.

```json
{
  "schema": "townstead:lineage/v1",
  "display_name": "Dark Elf",
  "ancestry": "my_pack:elf",
  "hair": {
    "gradients": [
      { "stops": ["#FFFFFF", "#E8EDF5", "#BEC8D8"], "weight": 5, "space": "rgb", "name": "Moonsilver" },
      { "from": "#F8F4FF", "to": "#CBBEFF", "weight": 1, "name": "Lilac" }
    ]
  }
}
```

A lineage with no hair. The orc ancestry has hair. Only the short form is necessary.

```json
{
  "schema": "townstead:lineage/v1",
  "display_name": "Blood Orc",
  "ancestry": "my_pack:orc",
  "hair": false
}
```
