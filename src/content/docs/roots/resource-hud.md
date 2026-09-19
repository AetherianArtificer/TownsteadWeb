---
title: Resource HUD
description: Author resource meters, shapes, pips, frames, placement, and visibility
---

Townstead can present a `pheno:resource` as a composable HUD meter. The resource owns the gameplay state; its `display` block only controls presentation.

That separation is important. `min`, `max`, `start`, regeneration, costs, and actions remain authoritative even if the player hides the HUD or changes its position. The resource's top-level `color` colours the fill. Frame colours, art, effects, and reactions are independent layers.

## Complete Example

```json
{
  "schema": "townstead:gene/v2",
  "type": "pheno:resource",
  "display_name": "Moonwell Mana",
  "min": 0,
  "max": 100,
  "start": 100,
  "regen": 1,
  "regen_interval": 20,
  "persist_on_death": false,
  "color": "#3FA0FF",
  "display": {
    "shape": "squircle",
    "fill_mode": "segmented",
    "segments": 12,
    "frame": "townstead:celestial_filigree",
    "color_theme": "townstead:spirit/magical",
    "anchor": "top_left",
    "visibility": "when_expressed",
    "priority": 20,
    "effects": [
      { "type": "townstead:gradient", "preset": "glossy" },
      { "type": "townstead:wisps", "strength": 0.55, "density": 5 },
      { "type": "townstead:sparkle", "strength": 0.35 }
    ],
    "reactions": [
      { "type": "townstead:spend_flash" },
      { "type": "townstead:low_warning", "threshold": 0.2 },
      { "type": "townstead:full_charge", "mode": "sparkle_burst" }
    ]
  }
}
```

See [Effects & Reactions](/roots/resource-hud-effects/) for every built-in visual layer and its fields.

## Resource Fields

| Field | Default | Effect |
| --- | ---: | --- |
| `min` | `0` | Lowest stored value. |
| `max` | `100` | Highest stored value. Always at least one above `min`. |
| `start` | `max` | Initial and resting value, clamped into the resource range. |
| `regen` | `1` | Amount added each regeneration step. May be negative. |
| `regen_interval` | `20` | Ticks between regeneration steps. |
| `persist_on_death` | `false` | Keeps the current value through death instead of returning to its start. |
| `color` | `#3FA0FF` | Fill colour. This does not colour the frame. |
| `on_reach` | none | Actions fired when the value crosses authored thresholds. |
| `display` | defaults | Client presentation described below. |

A resource can be a standalone gene or live in another gene's `resources` block. Companion resources receive a derived id of `<gene_id>/<resource_name>` and are expressed, ticked, and synced with their parent. See [Companion Resources](/roots/gene-files/#companion-resources).

Career skills and other power sources can own the same resource state. Another mod can expose an existing mana, energy, or charge value through the read-only `ResourceHudProviders` API; the other mod keeps ownership of that value while Townstead presents it.

## Display Fields

| Field | Default | Values |
| --- | --- | --- |
| `shape` | `horizontal` | `horizontal`, `vertical`, `squircle` |
| `fill_mode` | `continuous` | `continuous`, `segmented`, `pips` |
| `pip_style` | `dots` | `dots`, `notches`, `beads`, `shards` |
| `segments` | `10` | `2` to `64`; used by segmented and pip fills |
| `frame` | `townstead:plain` | Resource-frame id |
| `color_theme` | `townstead:arcane` | Two-colour frame theme id |
| `effects` | `[]` | Ordered persistent effect stack |
| `reactions` | `[]` | Independent event and value-reaction stack |
| `anchor` | `top_left` | `top_left`, `top_center`, `top_right`, `bottom_left`, `bottom_center`, `bottom_right` |
| `visibility` | `when_expressed` | `when_expressed`, `when_referenced`, `never` |
| `priority` | `0` | Ordering value when several meters share an anchor |

The squircle is the compact rounded-square meter used for Zelda-like displays. It is not a circular ring.

### Fill Modes

- `continuous` draws one uninterrupted fill.
- `segmented` divides that fill into larger readable cells.
- `pips` draws small separate marks rather than stretched miniature bars.

Pip art is shape-aware: dots are tiny points, notches lie across the direction of travel, beads have a rounded highlight and shadow, and shards use a slanted faceted mark. Empty pips remain muted but readable. Very high segment counts are capped by the space available so marks do not overlap the frame.

## Frames And Colour Themes

`frame` chooses structure and artwork. `color_theme` supplies the frame's darker primary colour and lighter secondary colour. Neither changes the resource fill.

Built-in frames are `plain`, `beveled`, `corner_brackets`, `forged_iron`, `brass_apparatus`, `gauge`, `runed_stone`, `crystal_growth`, `organic`, `bone_reliquary`, `haunted_fracture`, `ropebound`, `thornwood`, `spider_silk`, `celestial_filigree`, and `spirit_trough` in the `townstead` namespace.

These built-in definitions currently provide procedural fallback colours and thickness. Their names are semantic selection points, not bundled illustrated silhouettes. A datapack or accompanying resource pack must supply [Frame Art](/roots/resource-hud-frame-art/) for a genuinely different pixel-art frame.

The built-in colour themes include `arcane`, `biological`, `mechanical`, `otherworldly`, and `spiritual`, plus Community Spirit presets under `townstead:spirit/`. They are colour presets, not separate effect packages. Authors can combine any frame, theme, fill, and effect stack.

```json
{
  "schema": "townstead:resource_color_theme/v1",
  "primary_color": "#3A4352",
  "secondary_color": "#C8F3FF"
}
```

Colour-theme files live at `data/<namespace>/resource_color_theme/<path>.json`. Custom pixel art uses the separate [Frame Art](/roots/resource-hud-frame-art/) format.

## Placement And Stacking

The datapack anchor is a recommendation. Players can choose **Pack Decided** to honour each meter's anchor, or select one global anchor to place every Townstead meter together.

Meters at the same anchor stack down or to the right according to the player's client setting. Higher `priority` values appear first. Townstead offsets bottom HUD groups away from vanilla survival UI, but authors should still use `bottom_center` deliberately because it shares the busiest part of the screen.

Pack visibility and player visibility solve different problems:

- `when_expressed` makes an expressed resource eligible for the HUD.
- `when_referenced` limits it to resources currently used by another expressed power.
- `never` keeps the resource functional but removes it from the HUD.
- The player then chooses whether eligible meters appear contextually, while away from rest, always, or never.

The ability wheel keeps relevant meters visible while it is open. Other screens own their complete render stack, so the gameplay HUD does not draw through menus.

See [Client Resource HUD Settings](/reference/configuration/#resource-hud) for position, scale, stacking, disappearance rules, exit styles, timing, and value labels.

## Accessibility

Resource animation respects Townstead's **Reduce Motion** setting and Minecraft's **Screen Effect Scale**. Reduce Motion replaces sliding and flickering exits with a plain fade. Minecraft high-contrast mode replaces custom frame art with a strong procedural frame so the meter remains legible.
