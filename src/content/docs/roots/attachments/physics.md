---
title: Bone Physics
description: Secondary motion for chained bones, spring parameters, drive channels, and auto-segmentation
---

Physics chains give bones secondary motion, simulated on each viewer's client: walking makes a tail trail and bounce, stopping flicks it, turning whips it sideways, gravity droops it. The simulation composes on top of poses and keyframe clips, so a drooped ear still swings and a wagging tail still jiggles.

## The Physics Block

```json
"physics": {
  "chains": [
    {
      "bones": ["tail_1", "tail_2", "tail_3"],
      "stiffness": 0.35,
      "damping": 0.82,
      "gravity": 0.0,
      "max_angle": 40,
      "sway": 4
    }
  ]
}
```

`bones` is one chain ordered root to tip, each bone parented to the previous in the geometry. A definition can carry several chains (three tails, two ears).

## Parameters

| Field | Default | Notes |
| --- | --- | --- |
| `stiffness` | `0.4` | 0..1 pull back toward the authored pose. Higher is tighter and calmer. |
| `damping` | `0.8` | 0..1 how much swing survives each tick. Higher is floppier and wobblier. |
| `gravity` | `0.3` | 0..1 droop toward world-down. Use `0` for chains authored pointing up. |
| `max_angle` | `60` | Per-joint clamp in degrees. Keeps tails out of bodies. |
| `sway` | `0` | Ambient idle motion amplitude in degrees. `0` disables it. |
| `follow` | `0.55` | How much each joint chases its parent: the whip lag. |
| `droop_angle` | `40` | The rest angle at full gravity, in degrees. |
| `sway_speed` | `1` | Multiplies the ambient sway frequency. |
| `snap` | `1` | Multiplies the acceleration impulse: the whip on starts, stops, jumps, and landings. `0` leaves only steady drag. |
| `response` | all `1` | `{ "vertical", "forward", "lateral", "turn" }` multipliers on how strongly each movement component drives the chain. |
| `segments` | off | Slice a single bone into a bending chain. See below. |
| `axis` | `auto` | The slicing axis: `auto`, `x`, `y`, or `z`. |

## Drives And Feel

Two kinds of force drive a chain. **Drag** is sustained: while the bearer moves, the chain streams against the airflow. **Snap** is impulsive: a change of speed whips the chain once. The defaults are calibrated so `1.0` on every channel is physically correct for a chain in its authored orientation; tune feel with `stiffness`, `damping`, and `snap` before touching `response`.

The `response` channels exist for two purposes. Multipliers between `0` and `1` mute a component (a stiff crest that ignores turning). Negative values flip a component, which is the sanctioned fix when a definition's base `rotation` turns the model more than about 90 degrees away from its authored orientation and the simulation reads the world backwards.

A quick per-channel test recipe on a live bearer:

| Move | Tests |
| --- | --- |
| Sprint in a straight line | `forward` drag |
| Jump and land | `vertical` and `snap` |
| Circle-strafe | `lateral` |
| Spin in place | `turn` |

Every parameter is live-tunable without a reload: `/townstead attachment adjust <id> physics <chain|all> <param> <value>`, where `param` includes `response_vertical`, `response_forward`, `response_lateral`, and `response_turn`. See [Tooling & Commands](/roots/attachments/tooling/).

## Auto-Segmentation

A tail authored as one solid bone can still bend. Give the chain a single bone and a `segments` count:

```json
"chains": [
  { "bones": ["tail"], "segments": 4, "axis": "auto", "stiffness": 0.4, "damping": 0.8 }
]
```

At bake time the bone's cubes are sliced into that many chained virtual segments along the axis (`auto` picks the longest), and the simulation runs over the generated chain. `segments` accepts `2` to `8`. UVs are sub-rectangled exactly, so the sliced tail renders pixel-identically at rest.

## Interactions

- Mirrored anchors run their own simulation state and flip automatically, so a symmetric pair swings world-consistently.
- Life-stage geometry swaps re-resolve the simulation, so an adult's extra tails each get their own chain state.
- Teleports are guarded: a bearer moving more than a few blocks in one tick resets the springs instead of whipping them.
