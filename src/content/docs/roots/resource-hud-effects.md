---
title: Resource HUD Effects & Reactions
description: Persistent resource-bar effects and value-driven HUD reactions
---

Resource presentation has two independent ordered stacks:

- `effects` run continuously while the meter is visible.
- `reactions` play when its value or owning ability changes.

That lets a flowing or runed meter keep its identity while a low-resource warning, spend flash, or readiness sweep plays over it.

## Persistent Effects

Effects render in array order. An empty array is the plain fill; `townstead:none` is accepted but contributes no layer.

| Effect | Behaviour | Additional fields |
| --- | --- | --- |
| `townstead:gradient` | Shades the fill without changing its authored base hue. | `preset`, `strength`, `shape`, `highlight_color`, `shadow_color` |
| `townstead:shimmer` | Sends a timed reflective highlight across the fill. | `strength`, `speed`, `interval`, `color` |
| `townstead:pulse` | Breathes the fill's brightness in and out. | `strength`, `speed`, `color` |
| `townstead:flow` | Moves a directional current through the fill. | `strength`, `speed`, `color` |
| `townstead:liquid` | Simulates a connected pixel-art liquid surface that tilts, settles, and splashes on value changes. | `strength`, `speed`, `color`, `surface_points`, `tension`, `damping`, `splash`, `movement_influence` |
| `townstead:viscous` | Gives the fill slow sticky lobes and trailing strands. | `strength`, `speed`, `color`, `lobes`, `viscosity`, `stringiness` |
| `townstead:bubbles` | Raises wobbling bubbles through the fill. | `strength`, `speed`, `color`, `density`, `size`, `wobble` |
| `townstead:embers` | Emits hot pixels that cool, drift, and may escape beyond the frame. | `strength`, `speed`, `density`, `drift`, `flicker`, `escape`, `hot_color`, `cool_color` |
| `townstead:flames` | Builds pixel flame tongues from the selected edge. | `strength`, `speed`, `density`, `height`, `flicker`, `placement`, `hot_color`, `cool_color` |
| `townstead:steam` | Releases pale, soft water-vapour puffs rather than dark smoke. | `strength`, `speed`, `density`, `size`, `drift`, `color` |
| `townstead:electric` | Sends coherent travelling arcs through the fill, with anchored forks and a brief afterglow. | `strength`, `speed`, `density`, `branching`, `reach`, `color` |
| `townstead:wisps` | Drifts spectral motes with short luminous trails. | `strength`, `speed`, `density`, `trail`, `wander`, `color` |
| `townstead:sparkle` | Produces crisp, intermittent pixel stars. | `strength`, `speed`, `density`, `size`, `twinkle`, `color` |
| `townstead:crystalline` | Layers a dark geode base, translucent facets, and travelling prismatic glints. | `strength`, `speed`, `density`, `depth`, `glint`, `color` |
| `townstead:runes` | Scrolls or blinks glyphs inside the fill while some glyphs escape around it. | `strength`, `speed`, `color`, `mode`, `spacing`, `escape`, glyph-sheet fields |
| `townstead:corruption` | Crawling pixel noise consumes and releases small fill patches without changing the value. | `strength`, `speed`, `density`, `size`, `color` |
| `townstead:void` | Randomly deletes and displaces pixels for an unstable glitch, without adding stars. | `strength`, `speed`, `density`, `instability` |
| `townstead:prismatic` | Sends a controlled hue band through the fill. This is the one effect intended to alter the authored hue. | `strength`, `speed`, `band_width` |
| `townstead:spores` | Drifts soft biological motes outward in every direction. | `strength`, `speed`, `density`, `size`, `drift`, `color` |
| `townstead:falling_motes` | Drops dust, snow, ash, petals, or textured marks through and beyond the bar. | `strength`, `speed`, `density`, `size`, `drift`, `color`, mark-sheet fields |

Most numerical effect controls are normalized around `0` to `1`; counts and pixel sizes are small integers. Townstead clamps unsafe values. Start from the defaults by declaring only `type`, then tune the few properties that change the effect's character.

### Gradient Presets

`gradient` has five presets:

| Preset | Result |
| --- | --- |
| `subtle` | Light crosswise shading. |
| `standard` | General-purpose crosswise shading. |
| `deep` | Stronger light-to-shadow range. |
| `glossy` | A centred glass-like highlight. |
| `leading_edge` | Concentrates light near the current fill boundary. |

For manual control, `shape` accepts `crosswise`, `along`, `centered`, `leading_edge`, or `radial`. Explicit `strength`, `highlight_color`, and `shadow_color` values override the preset's corresponding choices.

### Liquid Surface

`liquid` uses 8 to 16 connected surface points in typical use. Spring tension spreads motion between points, damping makes the surface settle, mana gain or loss applies a splash impulse, and player movement can influence tilt.

```json
{
  "type": "townstead:liquid",
  "strength": 0.45,
  "speed": 1.0,
  "surface_points": 12,
  "tension": 0.18,
  "damping": 0.92,
  "splash": 0.65,
  "movement_influence": 0.2
}
```

The renderer turns that surface into deliberate pixel-art steps. Thicker frames give the movement more room to read.

### Custom Glyph And Mark Sheets

`runes` can use a resource-pack glyph sheet:

```json
{
  "type": "townstead:runes",
  "mode": "scroll",
  "texture": "my_pack:textures/gui/resource_effect/moon_runes.png",
  "glyph_width": 5,
  "glyph_height": 7,
  "columns": 8,
  "rows": 2,
  "spacing": 3,
  "escape": 0.45
}
```

`mode` is `scroll` or `blink`. If `texture` is absent, Townstead uses its built-in tiny glyphs.

`falling_motes` uses the same atlas pattern with `texture`, `mark_width`, `mark_height`, `columns`, and `rows`. This lets a resource pack replace generic motes with petals, ash flakes, snow clumps, leaves, or another authored mark.

## Stacking Effects

```json
"effects": [
  { "type": "townstead:gradient", "preset": "deep" },
  { "type": "townstead:flow", "strength": 0.25, "speed": 0.8 },
  { "type": "townstead:runes", "strength": 0.5, "mode": "blink" },
  { "type": "townstead:shimmer", "strength": 0.2, "interval": 4.5 }
]
```

The order is meaningful. Begin with broad fill treatments such as gradient or flow, then add glyphs and particles, and finish with narrow highlights such as shimmer. There is no hard requirement to use that order, but it is the easiest stack to reason about.

## Value-Driven Reactions

| Reaction | Trigger and behaviour |
| --- | --- |
| `townstead:gain_flash` | A highlight begins at the old value and travels toward the new value. |
| `townstead:spend_flash` | The removed portion lingers briefly, then dissolves or flashes. |
| `townstead:change_ripple` | Sends a brightness ripple across the meter whenever its value changes. |
| `townstead:full_charge` | Plays a flash, pulse, sparkle burst, or edge sweep when the value reaches maximum. |
| `townstead:low_warning` | Pulses or flickers below `threshold`. It does not force the meter red unless `color` says so. |
| `townstead:empty_warning` | Plays once on reaching minimum, with an optional subdued continuing state. |
| `townstead:regeneration_tick` | Produces a small travelling glint or particle for each regeneration step. |
| `townstead:ability_ready` | Plays a stronger response when the owning ability becomes usable, not merely when the meter is full. |

All reactions accept `strength`, `duration`, `speed`, and optional `color`. `low_warning` also uses `threshold`, expressed from `0` to `1`, and supports `pulse` or `flicker`. `full_charge` and `ability_ready` support `flash`, `pulse`, `sparkle_burst`, or `edge_sweep`. Spend, regeneration, and empty reactions currently use their fixed dissolve, glint, and flash treatments. `continuing` controls the subdued state used after an empty warning.

```json
"reactions": [
  {
    "type": "townstead:gain_flash",
    "strength": 0.7,
    "duration": 0.55
  },
  {
    "type": "townstead:low_warning",
    "threshold": 0.18,
    "mode": "flicker",
    "color": "#FFD27A"
  },
  {
    "type": "townstead:ability_ready",
    "mode": "edge_sweep",
    "strength": 0.95
  }
]
```

Reactions report gameplay changes without altering the displayed value. A spend linger, corruption patch, or void deletion is always visual only.
