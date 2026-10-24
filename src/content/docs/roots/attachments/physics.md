---
title: Bone Physics
description: Secondary motion for chained bones, presets, tuning knobs, colliders, wind, and water
---

Physics chains give bones secondary motion. Each viewer's client runs the simulation. A tail trails behind a walking bearer, swings out on a turn, and settles when the bearer stops. Gravity pulls toward the ground in every pose, so a sleeping or swimming bearer's tail still hangs down. Poses and keyframe clips set the target shape, and physics adds motion on top of that shape. A drooped ear still swings, and a wagging tail still follows through.

## The Physics Block

```json
"physics": {
  "chains": [
    { "bones": ["tail_1", "tail_2", "tail_3"], "preset": "tail" }
  ]
}
```

`bones` is one chain, ordered from root to tip. Each bone must be a descendant of the bone before it in the geometry. A definition can have several chains, for example one for each tail or one for each ear.

Start with a preset. Add a knob only when the preset does not feel correct:

```json
{ "bones": ["tail_1", "tail_2", "tail_3"], "preset": "tail", "drag": 2.5, "limit": 25 }
```

## Presets

| Preset | Use for |
| --- | --- |
| `tail` | Most tails: cat, dog, lizard. |
| `tail_heavy` | Thick, slow tails: drakes, crocodiles, big lizards. |
| `tail_fluffy` | Bushy tails that catch the air: foxes, squirrels. |
| `ear_stiff` | Ears that stand up and twitch. |
| `ear_floppy` | Ears that hang and flop forward and back. |
| `braid` | Hanging ropes of hair, and thin tails with a tuft. |
| `hair` | Loose hair and manes. |
| `beard` | Beards and other chin growth. |
| `antenna` | Springy feelers that wobble. |
| `feather` | Single stiff feathers and fins. |

A pack can add its own presets as `data/<namespace>/physics_preset/<id>.json`. A preset file holds the same knobs a chain does. A bare preset id such as `"tail"` looks in the attachment's own namespace first, then in `townstead`. So `examplepack:tail` replaces the built-in `tail` for every attachment in `examplepack`. To use a preset from a different namespace, write the full id, for example `"examplepack:tail_whip"`.

## Knobs

| Knob | Default | Range | Notes |
| --- | --- | --- | --- |
| `frequency` | `2.0` | `0.1` to `10` | How fast the chain returns to its pose, in swings per second. Higher is quicker and stiffer. |
| `damping_ratio` | `0.7` | `0.02` to `3` | How much the chain overshoots. Below `1` it swings past the pose and back. At `1` or more it settles without a swing. |
| `gravity` | `0.15` | `0` to `2` | How far each bone droops toward the ground. `0` is none. `1` is heavy. |
| `inertia` | `0.5` | `0` to `1` | How much of the bearer's movement the chain feels. `1` is all of it. `0` is none, so the chain moves rigidly with the body. |
| `drag` | `1.0` | `0` to `20` | Air resistance. Higher streams the chain back further when the bearer moves, and lets wind push it more. |
| `limit` | `35` | `0` to `180` | The largest swing of each bone away from where its parent points, in degrees. |
| `hinge` | `none` | `none`, `pitch`, `side` | Keeps each bone's swing in one plane. `pitch` swings up and down. `side` swings left and right. |
| `collide` | every collider | collider names | The rig colliders the chain rests against. See [Colliders](#colliders). |
| `rest_pitch` | `0` | degrees | Tilts the rest pose of every bone in the chain. |
| `sway` | `0` | degrees | Gentle idle motion. `0` turns it off. |
| `sway_speed` | `1` | | Multiplies the speed of the idle motion. |
| `scale_with_size` | `true` | | Makes small bearers move quicker and large bearers move slower. |
| `segments` | off | `2` to `8` | Slices a single bone into a bending chain. See [Auto-Segmentation](#auto-segmentation). |
| `axis` | `auto` | `auto`, `x`, `y`, `z` | The axis that `segments` slices along. |

`gravity` and `limit` apply to each bone. A three-bone tail with a `limit` of `30` can bend up to 90 degrees at its tip.

### Ramps

The six number knobs (`frequency`, `damping_ratio`, `gravity`, `inertia`, `drag`, `limit`) also accept a ramp from the root bone to the tip bone:

```json
{ "bones": ["tail_1", "tail_2", "tail_3", "tail_4"], "preset": "tail", "frequency": { "root": 2.4, "tip": 1.6 } }
```

The bones between the root and the tip get values in between. A ramp with only `tip` or only `root` uses that one value along the full chain.

## Tuning

Tune one knob at a time, in this order:

1. Set `frequency` for the speed. A large, heavy part moves slowly, so use a lower value.
2. Set `damping_ratio` for the bounce. Use `0.4` to `0.6` for a springy part. Use `0.8` to `1.0` for a calm part.
3. Set `limit` to keep the chain away from the body.
4. Set `drag` for how much the chain trails while the bearer moves and how much wind moves it.
5. Set `gravity` for how much the chain hangs.

Test each change on a live bearer with `/townstead attachment adjust`. See [Live Tuning](#live-tuning).

| Move | Shows |
| --- | --- |
| Walk, then stop | `drag`, `inertia`, and how the chain settles |
| Jump and land | `inertia` and `damping_ratio` |
| Turn on the spot | `frequency` and `limit` |
| Stand in the rain | `drag` and wind |

## Colliders

A rig can list capsules on its bones. Chains rest against these capsules instead of swinging through the body. A humanoid body that lists no colliders uses the humanoid colliders: one around the body, one around each leg, and one around the head. This includes villagers, players, and rigs made from humanoid mob models such as the zombie or the skeleton. Other bodies, such as a spider or a custom geometry, have no colliders unless their rig lists them. To add colliders to your own rig, see [Rigs](/roots/rigs/body/#colliders).

A chain rests against every collider of its rig by default. To use only some colliders, name them:

```json
{ "bones": ["tail_1", "tail_2", "tail_3"], "preset": "tail", "collide": ["right_leg", "left_leg"] }
```

To turn colliders off for a chain, use an empty list: `"collide": []`.

If a pose or clip puts a bone inside a collider, physics does not push that bone out. Townstead always keeps the authored pose.

## Wind and Water

All bearers in a level feel the same wind. The wind changes direction slowly and comes in gusts. It is stronger in rain and storms, slightly stronger in autumn and winter, and slightly weaker in summer. A bearer gets less wind with less sky light, so there is no wind indoors or underground. A chain with more `drag` moves more in the wind.

A bone in water moves much more slowly, and it floats up a little instead of hanging down.

## Player Settings

Each player can set **Attachment Physics** in the Townstead client configuration:

| Setting | Effect |
| --- | --- |
| Full | Physics, colliders, wind, and water for bearers up to 48 blocks away. |
| Low | Physics, colliders, and water for bearers up to 16 blocks away. No wind. |
| Off | No physics. Attachments keep their pose. |

**Reduce Motion** in the accessibility settings sets the maximum to Low.

## Live Tuning

```text
/townstead attachment adjust <id> physics <chain|all> <knob> <value>
```

`chain` is the chain index, or `all`. `knob` is any knob name in snake case, for example `damping_ratio`. To set one end of a ramp, add `.root` or `.tip`, for example `frequency.tip`. Changes show on every bearer immediately and last until the next reload. To keep them, use `/townstead attachment dump <id>`. The dump writes the chain as its preset plus only the knobs that differ from the preset. See [Tooling & Commands](/roots/attachments/tooling/).

## Auto-Segmentation

A tail made as one solid bone can still bend. Give the chain one bone and a `segments` count:

```json
"chains": [
  { "bones": ["tail"], "segments": 4, "axis": "auto", "preset": "tail" }
]
```

When the model loads, the bone's cubes are sliced into that many chained segments along the axis. `auto` uses the longest axis. The UVs are cut to match, so the sliced tail looks the same as the original at rest.

## Older Physics Files

Physics files from before presets still load. Each old key converts to the new knobs:

| Old key | Becomes |
| --- | --- |
| `stiffness` | `frequency` |
| `damping` | Not used. The chain gets the preset's `damping_ratio`, or the default. |
| `max_angle`, `min_pitch`, `max_pitch` | `limit` |
| `gravity`, `droop_angle` | `gravity` |
| `response`, `snap` | `inertia` |
| `follow` | Not used. |

`/townstead attachment doctor` lists each old key it finds. To update a file, replace the old keys with a `preset`, then tune with the knobs.

## Interactions

- Each mirrored anchor has its own simulation, so both ears of a pair swing in the same world direction.
- A life-stage geometry swap starts the simulation again for the new model.
- A teleport, or a bearer that is off screen for a moment, resets the chain to its pose. The chain does not snap across the distance.
- Previews in screens (inventory, wardrobe, character editor) have their own simulation. A chain swings when you turn the preview.
