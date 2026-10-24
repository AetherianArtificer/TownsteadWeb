---
title: Resource HUD Frame Art
description: Supply pixel-art frame layers and two-colour tint masks from resource packs
---

Resource frames are selected by datapacks and drawn from ordinary client resource-pack textures. Built-in and third-party frames use the same loader; a custom namespace does not require Java registration.

The frame definition belongs at:

```text
data/<namespace>/resource_frame/<frame>.json
```

Its PNG layers can live anywhere under `assets/<namespace>/`, conventionally:

```text
assets/<namespace>/textures/gui/resource_frame/
```

## Canvas Sizes

Frame layers use exact GUI-pixel canvases:

| Shape | Size |
| --- | ---: |
| Horizontal | 82 × 10 |
| Vertical | 14 × 64 |
| Squircle | 40 × 40 |

Minecraft GUI scaling enlarges those pixels without smoothing. Draw at the native size and judge the silhouette there; downscaling larger illustrations usually produces muddy or uneven pixel art.

## Schema v3

```json
{
  "schema": "townstead:resource_frame/v3",
  "background_color": "#15131B",
  "thickness": 2,
  "art": {
    "horizontal": {
      "base_texture": "my_pack:textures/gui/resource_frame/reliquary_horizontal.png",
      "primary_texture": "my_pack:textures/gui/resource_frame/reliquary_horizontal_primary.png",
      "secondary_texture": "my_pack:textures/gui/resource_frame/reliquary_horizontal_secondary.png"
    },
    "vertical": {
      "base_texture": "my_pack:textures/gui/resource_frame/reliquary_vertical.png",
      "primary_texture": "my_pack:textures/gui/resource_frame/reliquary_vertical_primary.png",
      "secondary_texture": "my_pack:textures/gui/resource_frame/reliquary_vertical_secondary.png"
    },
    "squircle": {
      "base_texture": "my_pack:textures/gui/resource_frame/reliquary_squircle.png",
      "primary_texture": "my_pack:textures/gui/resource_frame/reliquary_squircle_primary.png",
      "secondary_texture": "my_pack:textures/gui/resource_frame/reliquary_squircle_secondary.png"
    }
  }
}
```

Every shape and every layer is optional, but a declared shape must contain at least one layer.

| Layer | Treatment |
| --- | --- |
| `base_texture` | Drawn with its authored RGBA colours unchanged. Use it for outlines, dark cavities, fixed material detail, and colours that must not be themed. |
| `primary_texture` | Alpha mask tinted with the selected theme's darker primary frame colour. |
| `secondary_texture` | Alpha mask tinted with the selected theme's lighter secondary frame colour. |

Use white pixels with authored alpha in tint-mask PNGs. The mask's RGB is multiplied by the selected theme, so white preserves the chosen colour most directly. Transparent pixels expose the HUD and game behind the frame.

The top-facing and highlighted portions usually belong in the lighter secondary mask. Bottom-facing, recessed, or structural portions usually belong in the darker primary mask. The masks are semantic layers, not a forced gradient: the artwork decides where each colour appears.

## Selecting The Frame

The resource chooses the datapack definition and its colour theme independently:

```json
{
  "display": {
    "frame": "my_pack:reliquary",
    "color_theme": "my_pack:moonlit_iron"
  }
}
```

```json
{
  "schema": "townstead:resource_color_theme/v1",
  "primary_color": "#303848",
  "secondary_color": "#D7F4FF"
}
```

Place that colour theme at `data/my_pack/resource_color_theme/moonlit_iron.json`.

## Fallbacks And Current Limits

- Version 3 frame-art layers are static PNGs. Animated frame textures are future work.
- If the chosen shape has no usable texture layer in the player's resource packs, Townstead draws the frame's procedural fallback instead of a missing-texture checkerboard.
- Minecraft high-contrast mode uses a strong procedural frame rather than custom art.
- Frame textures do not colour the fill. Set the resource's top-level `color` for that.
- A datapack may select custom art that a client does not have. The meter remains functional and falls back safely, but packs intended for distribution should ship the datapack and resource pack together.

Keep functional boundaries clear in all three masks. Effects and particles may leave the fill, and pips need a little interior breathing room. A visually elaborate frame should still make the current value readable at ordinary GUI scale.

