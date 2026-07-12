---
title: Attachment Points
description: Named, tagged anchors on a rig, mirrored pairs, rig scoping, and the shipped humanoid set
---

An attachment point is a named anchor on a rig: a bone plus a placement, carrying tags that attachments target. Points decouple attachments from body layouts. An "ears" attachment targets the `ear` tag, and each rig decides where its ears actually are.

Path: `data/<namespace>/attachment_point/<id>.json`

Schema: `townstead:attachment_point/v1`

## Fields

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `bone` | string | no | The model bone the point rides. Defaults to `body`. |
| `offset` | [x, y, z] | no | Placement in model pixels, relative to the bone. |
| `rotation` | [x, y, z] | no | Base orientation applied to anything anchored here (ZYX degrees). |
| `mirror` | bool | no | Render anchored geometry mirrored across X. One authored ear fits both sides. |
| `rig` | string | no | Scope the point to one rig id. Empty means universal. |
| `tags` | list | no | The tags attachments target (`ear`, `tail_root`, and so on). |

## Resolution Rules

When a definition targets a `tag`, it renders one instance at every point carrying that tag. This is how a single ear definition fills both ears: the left and right ear points both carry the `ear` tag, and the right one is a `mirror` point.

Rig scoping refines placement per body. A point with `"rig": "my_pack:spider"` only resolves on that rig, and when any rig-scoped point carries a tag, the rig's own placement replaces the universal set for that tag entirely. A spider puts its `ear` points where spider anatomy wants them, not where the humanoid head is.

For example, a universal `ear` point may serve every rig. A spider pack can replace the complete set for only its rig:

```json
{
  "schema": "townstead:attachment_point/v1",
  "rig": "my_pack:spider",
  "bone": "cephalothorax",
  "offset": [3, 1, -4],
  "rotation": [0, 25, 0],
  "tags": ["ear"]
}
```

On `my_pack:spider`, `{ "tag": "ear" }` now uses only spider-scoped `ear` points; it does not also render on the universal ears. Other rigs keep the universal set. Add a second spider point if the spider should receive a pair.

Targeting `point` instead of `tag` anchors to exactly one named point. Targeting a `bone` directly skips points altogether; that is the right choice for placements a pack author has hand-tuned for one specific model.

## Mirrored Points

A `mirror` point renders the attachment as a mirrored re-bake of the same geometry, with winding and normals corrected. Poses and physics mirror automatically, so a symmetric pair folds and swings symmetrically. Author one side; the mirror is free.

## Shipped Universal Points

Townstead pre-ships a universal humanoid set under the `townstead` namespace, so packs targeting standard anatomy need no point files of their own:

| Point | Bone | Tag | Mirror |
| --- | --- | --- | --- |
| `townstead:left_ear` | `head` | `ear` | no |
| `townstead:right_ear` | `head` | `ear` | yes |
| `townstead:horn` | `head` | `horn` | no |
| `townstead:brow` | `head` | `brow` | no |
| `townstead:snout` | `head` | `snout` | no |
| `townstead:crown` | `head` | `crown` | no |
| `townstead:tail_root` | `body` | `tail_root` | no |
| `townstead:back` | `body` | `back` | no |
| `townstead:wing_root_left` | `body` | `wing_root` | no |
| `townstead:wing_root_right` | `body` | `wing_root` | yes |

Head points ride the head bone, so ears, horns, and snouts follow head turns; body points follow the torso. A pack can add its own points, and a rig-specific pack can re-place any of these tags for its body via `rig` scoping.
