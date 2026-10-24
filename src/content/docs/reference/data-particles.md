---
title: Data Particles
description: Ship custom particles in a data pack, with no resource pack and no code.
sidebar:
  order: 4
---

A data particle is a JSON file in `data/<namespace>/particle/<id>.json`. Its sprite is a PNG in `data/<namespace>/textures/`. Townstead sends both files to every client when a player joins and after a reload, in the same way as attachment and rig textures. Players need only the data pack.

You can use a data particle wherever Pheno accepts a particle ID: `pheno:spawn_particles`, the `pheno:particle` ambient gene, `pheno:beam`, `pheno:cloud`, and the block action `pheno:spawn_particles`. When a registered particle has the same ID as a data particle, Townstead uses the registered particle.

```json
{
  "schema": "pheno:particle/v1",
  "texture": "examplepack:textures/particle/frost_mote.png",
  "frames": 4,
  "frame_time": 3,
  "lifetime": [20, 40],
  "size": [0.08, 0.14],
  "colors": ["#BFE8FF", "#FFFFFF"],
  "alpha": 0.9,
  "glow": true,
  "gravity": -0.005,
  "drag": 0.92,
  "fade_in": 3,
  "fade_out": 10,
  "shrink": false,
  "spin": 4,
  "flicker": 0,
  "collide": false
}
```

| Field | Default | Notes |
| --- | --- | --- |
| `schema` | | `pheno:particle/v1`. If the schema is wrong, Townstead skips the file. |
| `mods` | | Optional. Townstead loads the file only when these mods are present. |
| `texture` | required | A data-pack texture ID (`ns:textures/...png`). A resource-pack texture ID also works. |
| `frames` | `1` | The number of animation frames, one above the other in the texture. |
| `frame_time` | `0` | Ticks for each frame. With `0`, the frames are spread over the life of the particle. |
| `lifetime` | `20` | Ticks. A number, or `[min, max]`. |
| `size` | `0.1` | Half the width, in blocks. A number, or `[min, max]`. |
| `colors` | white | One `#RRGGBB` tint, or a list. Townstead picks one colour from the list for each particle. You can also write `color`. |
| `alpha` | `1` | The highest opacity. |
| `glow` | `false` | Full brightness, whatever the light in the world. Use it for magic. Do not use it for physical things, such as leaves and dust. |
| `gravity` | `0` | The downward pull each tick. A negative value makes the particle rise. |
| `drag` | `0.96` | The part of the velocity that the particle keeps each tick. |
| `fade_in` / `fade_out` | `0` | Ticks to fade in at the start and to fade out at the end. |
| `shrink` | `false` | The size goes down to nothing over the life of the particle. |
| `spin` | `0` | Degrees each tick, in a random direction. |
| `flicker` | `0` | A random loss of opacity each tick, from `0` to `1`. Use it for embers and foxfire. |
| `collide` | `false` | The particle stops at blocks. |
| `fade_out_fraction` | `0` | The particle fades out over this part of its life, in place of a fixed `fade_out`. |
| `sway` / `sway_rate` | `0` / `0.3` | A push to the side each tick that changes direction over time. Use it for wisps and falling leaves. |
| `pulse` / `pulse_rate` | `0` / `1` | The size grows and shrinks by this fraction. Use it for twinkles. |
| `tumble` | `0` | The particle turns back and forth by this many radians, and does not spin. |
| `flare` | `1` | Size multiplier for the last fifth of the life, for a flame that gets bigger just before it goes out. |

## Shaped Bursts

`pheno:spawn_particles` can put its particles in a shape. Each particle moves along the shape at `speed`:

```json
{
  "type": "pheno:spawn_particles",
  "particle": "examplepack:frost_mote",
  "shape": "ring_in",
  "count": 24,
  "radius": 2,
  "speed": 0.12,
  "anchor": "feet",
  "delay": 4
}
```

| Shape | Layout |
| --- | --- |
| `ring` | A flat circle of `radius`. The particles move outward. |
| `ring_in` | The same circle. The particles move inward. |
| `orbit` | The same circle. The particles move around it. |
| `spokes` | Lines from the centre out to `radius`. |
| `dome` | A half-sphere of `radius`. The particles move outward. |
| `helix` | A spiral of two turns, with `radius`, that rises `height`. |
| `burst_up` | A fountain from a disc of `radius`. The particles move up. |
| `cone` | Along the look direction for `length`, wider to `radius`. The particles move forward. |
| `line` | Along the look direction for `length`. The particles move forward. |

`anchor` puts the shape at the `feet`, the `center` (default), or the `eyes` of the actor. `delay` starts the burst that many ticks later. With some bursts in a `pheno:and`, you can make one effect in steps, for example a warning, an impact, and an end.

## Screen Cues

`pheno:screen_effect` plays a cue for the focus when the focus is a player.

```json
{ "type": "pheno:screen_effect", "effect": "shake", "intensity": 0.6, "duration": 12, "radius": 8 }
```

| Field | Default | Notes |
| --- | --- | --- |
| `effect` | required | `flash`, `vignette`, `tint`, `shake`, or `fov`. |
| `color` | `#FFFFFF` | For `flash`, `vignette`, and `tint`. |
| `intensity` | `0.5` | From `0` to `1`. For `fov`, how much wider the view gets, from `-0.3` to `0.3`. A negative value makes the view narrower. |
| `duration` | `20` | Ticks, up to `200`. Flashes and shakes fade out. The other cues get stronger and then weaker. |
| `radius` | `0` | Also plays the cue for every other player within this distance. |

The Screen Effects setting of each player changes the strength of every cue. Townstead's reduced-motion setting turns off shakes and FOV changes.

## Icons

An `icon` on a gene, skill, or wheel action can be an item ID, or a texture path that ends in `.png`. Data-pack textures also work here, so the ability catalogue and the ability wheel can show the art of a pack:

```json
{ "type": "pheno:active_ability", "icon": "examplepack:textures/icon/frost_breath.png" }
```
