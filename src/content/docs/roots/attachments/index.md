---
title: Attachments
description: Data-pack cosmetic body parts, from a single horn to animated, heritable, colour-shifting tails
---

Attachments are cosmetic body parts a root can wear: tails, ears, horns, tusks, wings, crests, and anything else that anchors to the body and follows its animation. They are pure data-pack content. The geometry, textures, and animations live in the pack, ship to every client over Townstead's blob sync, and render with no resource pack installed on either side.

An attachment is granted by a gene, so it participates in the full Roots genetics model: it inherits down family lines, it can carry heritable size and colour rolls, and it is editable in the character editor.

## The Pieces

| Piece | File | Purpose |
| --- | --- | --- |
| Attachment definition | `data/<ns>/attachment/<id>.json` | What is rendered and how: geometry, texture, anchor, placement, and every optional behaviour block. |
| Geometry | `data/<ns>/attachment/geo/<name>.geo.json` | A Bedrock-format model (Blockbench export). |
| Blockbench project | `data/<ns>/attachment/bbmodel/<name>.bbmodel` | Alternative to exported geometry: the raw Blockbench save, dropped in with no export step. It converts at load, and its embedded animations can serve clips and baked poses. |
| Textures | `data/<ns>/attachment/textures/<name>.png` | The base texture, plus optional emissive masks. |
| Animations | `data/<ns>/attachment/animations/<name>.animation.json` | Optional Blockbench keyframe clips. |
| Attachment point | `data/<ns>/attachment_point/<id>.json` | A named, tagged anchor on a rig. Townstead ships a universal humanoid set. |
| Gene | `data/<ns>/gene/<name>.json` | Grants the attachment to its bearer and carries the heritable rolls. |

Definition ids come from the file path: `data/my_pack/attachment/fox_tail.json` loads as `my_pack:fox_tail`. Only top-level files in `attachment/` are definitions; the `geo/`, `bbmodel/`, `textures/`, and `animations/` subfolders hold the assets they reference.

## Minimal Attachment

A first attachment needs three files. The gene:

```json
{
  "schema": "townstead:gene/v2",
  "type": "townstead_roots:attachment",
  "display_name": "Fox Tail",
  "category": "Appearance",
  "dominance": "dominant",
  "attachment": "my_pack:fox_tail"
}
```

The definition:

```json
{
  "schema": "townstead:attachment/v1",
  "geometry": "my_pack:fox_tail",
  "texture": "my_pack:fox_tail",
  "target": { "tag": "tail_root" },
  "rotation": [-30, 0, 0],
  "scale": 0.9
}
```

And a `fox_tail.geo.json` plus `fox_tail.png` under `attachment/geo/` and `attachment/textures/`. Wire the gene into an ancestry or root, or put it on a test villager with `/townstead gene grant`, and the tail renders on the next `/reload`.

## What Attachments Can Do

Everything below is optional and layers onto the minimal form:

| Capability | Where |
| --- | --- |
| Anchor to tagged points, one point, or a bone, with mirrored pairs | [Attachment Points](/roots/attachments/points/) |
| Heritable size channels, morphs, style variants, visibility thresholds | [Genetics & Morphs](/roots/attachments/genetics/) |
| Life-stage scaling and whole model swaps as the bearer grows | [Attachment Files](/roots/attachments/definition/) |
| React to sleep, combat, mood, needs, and worn armour | [Poses & Equipment](/roots/attachments/poses/) |
| Secondary motion: tails that trail, bounce, and whip | [Bone Physics](/roots/attachments/physics/) |
| Blockbench keyframe clips with state and idle triggers | [Keyframe Animations](/roots/attachments/animations/) |
| Bearer-resolved and heritable colour, emissive glow, translucency | [Surfaces & Colour](/roots/attachments/surfaces/) |
| Health checks and live in-game tuning | [Tooling & Commands](/roots/attachments/tooling/) |

## Syncing And Caching

The server hashes every referenced blob (SHA-1) and syncs a manifest of definitions and hashes. Clients request only the blobs they lack and cache them on disk, so a returning player downloads nothing. Textures are capped at 8 MiB per file, geometry and animation files at 4 MiB.

Because blobs are content-addressed, pack-only changes take effect with a plain `/reload`: clients notice the new hashes and refresh automatically.

## Processing Order

When several features affect the same attachment, Townstead composes them in this order:

1. Resolve the attachment point and select the life-stage geometry, offset, and scale.
2. Apply the point placement, base definition placement, and whole-model scale.
3. Apply whole-model and per-bone morph scaling, morph rotations, and visibility gates.
4. Apply eased state or condition poses.
5. Apply keyframe animation rotation, position, and scale channels.
6. Apply physics rotation on top of the posed and animated bones.
7. Mirror placement and bone transforms when the resolved point is mirrored.
8. Draw the base surface, then redraw the same transformed geometry for an emissive layer when present.

Morph rotation, poses, animation rotation, and physics are additive in that order. Animation scale multiplies an existing morph scale. Later pose entries win when more than one entry writes the same bone.

## Performance Guidelines

Attachments are evaluated and rendered once per resolved point, per visible bearer. These are practical authoring targets, not hard engine limits:

| Area | Recommended starting point | Cost to watch |
| --- | --- | --- |
| Bones and cubes | Keep ordinary attachments below roughly 24 bones and 64 cubes. | Every visible copy walks and draws its geometry; animated and simulated bones also receive per-frame transforms. |
| Physics | Prefer 1–3 chains and 3–6 joints per chain. | Physics is simulated client-side for every rendered bearer and resolved point. |
| Segmentation | Start with 3–4 segments; use the maximum of 8 only when the silhouette benefits at normal viewing distance. | Segmentation creates extra bones and a separate derived geometry bake for each unique blob and slicing specification. |
| Animations | Prefer short, reusable clips and a small idle pool. Avoid keyframing bones that never visibly move. | Active clips sample their tracks every frame; long tracks also increase synced blob and cache size. |
| Textures | Usually use 32×32 or 64×64; use 128×128 when visible detail justifies it. Keep emissive masks at the base texture's dimensions. | Larger PNGs cost transfer, disk cache, decoded memory, and tint-derived texture memory. The 8 MiB loader ceiling is a safety limit, not a target. |
| Tag targets | Remember that a tag produces one complete instance at every matching point. | An `ear` tag with two points doubles geometry, animation, physics, and draw work; rig-specific tags with more points multiply it further. |

Content-addressing prevents identical asset bytes from being transferred or materialized repeatedly. It does not remove per-instance render, animation, or physics cost after an attachment is placed on several points or bearers.
