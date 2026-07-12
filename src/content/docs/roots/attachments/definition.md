---
title: Attachment Files
description: The attachment definition file, geometry format, placement, life stages, and equipment hiding
---

The definition file is the heart of an attachment: it names the assets, picks the anchor, places the model, and holds every optional behaviour block.

Path: `data/<namespace>/attachment/<id>.json`

Schema: `townstead:attachment/v1`

## Load Failures And Fallbacks

| Problem | Runtime result |
| --- | --- |
| Missing definition referenced by a gene | Nothing renders for that grant; the doctor reports it. |
| Missing base geometry or texture, including an omitted reference | The whole definition is rejected and absent from the synced manifest. |
| Invalid `when` | The definition loads, but the condition cannot match, so the attachment stays hidden. Validation and the doctor report it. |
| Missing morph, visibility, pose, physics, or animation bone | That operation has no effect on the missing bone; valid bones continue. Checks use the union of base and stage geometry. |
| Unknown target point or tag | The definition loads but creates no rendered instance. |
| Invalid life-stage name | The entry is never selected; base geometry, offset, and scale remain. |
| Missing stage geometry | That stage keeps the base model while retaining its stage offset and scale. |
| Out-of-range physics value | The authored value still runs; the doctor warns rather than clamping it. |
| Invalid `segments` count, bone list, or axis | The doctor reports it. Segmentation requires `2..8` and exactly one source bone; a failed derived bake falls back to unsliced geometry. |
| Missing animation file | That animation entry is skipped during load. |
| Missing animation clip | The entry remains but produces no sample; other poses, clips, and physics continue. |

Treat validation errors as authoring failures even where rendering can continue; fallbacks keep other content visible but are not a stable substitute for valid data.

## Fields

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `geometry` | ref | yes | A `.geo.json` under `attachment/geo/`, or a Blockbench project under `attachment/bbmodel/` (the `.geo.json` wins when both exist). Write `"fox_tail"` or `"other_ns:fox_tail"`; the folder and extension are implied. A bbmodel reference may bake one of its embedded animations as a static pose: `"wings#spread"`. Bbmodels convert at load with Blockbench's own Bedrock transform, keep the project's coordinate origin (use the definition `offset` to place it), and ship over the same blob sync. Their embedded animations also serve `animations` references (`"wings#flap"`). |
| `texture` | ref | yes | A `.png` under `attachment/textures/`. Same reference form. |
| `target` | object | no | `{ "tag": "..." }` anchors to every matching point; `{ "point": "..." }` anchors to one named point. See [Attachment Points](/roots/attachments/points/). |
| `bone` | string | no | Direct model-bone anchor when there is no `target`. Defaults to `body`. |
| `offset` | [x, y, z] | no | Placement offset in model pixels, applied after the anchor. |
| `rotation` | [x, y, z] | no | Base orientation in degrees, applied ZYX. |
| `scale` | number | no | Uniform render scale. Defaults to `1.0`. |
| `tint`, `tint_blend`, `tint_strength` | mixed | no | Colouring. See [Surfaces & Colour](/roots/attachments/surfaces/). |
| `emissive` | ref | no | A second texture drawn full-bright over the same geometry. |
| `render` | string | no | `cutout` (default) or `translucent`. |
| `hides_under` | list | no | Armour slots that hide the whole attachment while worn. See below. |
| `when` | object | no | A [Pheno condition](/pheno/conditions/) gating the whole attachment: it renders only while the condition holds for the bearer. See below. |
| `morph` | object | no | Maps heritable channel values onto bone scale and rotation. See [Genetics & Morphs](/roots/attachments/genetics/). |
| `visibility` | list | no | Threshold-gated bones. See [Genetics & Morphs](/roots/attachments/genetics/). |
| `stages` | object | no | Per-life-stage overrides. See below. |
| `poses` | object | no | State-driven rotations. See [Poses & Equipment](/roots/attachments/poses/). |
| `physics` | object | no | Secondary-motion chains. See [Bone Physics](/roots/attachments/physics/). |
| `animations` | object | no | Keyframe clip triggers. See [Keyframe Animations](/roots/attachments/animations/). |

Targeting precedence is `target.tag`, then `target.point`, then `bone`. A tag can resolve to several points at once, so one definition can fill both ears.

## Geometry Format

Geometry is standard Bedrock `.geo.json`, which Blockbench can export:

- Named bones with pivots, parents, and per-bone rotation.
- Box UV or per-face UV cubes, including `mirror` and per-cube rotation. A per-face UV entry that omits a face skips that face entirely, matching Blockbench's transparent-face export.
- `texture_width` and `texture_height` should match the PNG. When they disagree, UVs are scaled and `/townstead attachment doctor` warns.

### Blockbench Authoring Checklist

- Save a normal cube-and-group `.bbmodel`; no manual Bedrock export is required. Current Blockbench 4.x and 5.x metadata are recognized for animation rotation conventions.
- Author in model pixels: 16 units are one Minecraft block. The project origin is preserved; use definition `offset` for final placement.
- Put cubes in named groups. Groups become bones and nested groups form the hierarchy. Give every bone a unique stable name because all behavioral features resolve it by name.
- Supported cube data includes origin and size, inflation, cube rotation and pivot, box UVs, mirrored UVs, and per-face UV rectangles. Meshes, locators, texture meshes, and other non-cube elements are not converted as attachment geometry.
- Group origins become bone pivots; group and cube rotations are converted to Townstead's geometry convention. Keep the intended project origin rather than recentering to correct placement.
- Embedded `.bbmodel` animations support rotation channels. A named clip can also provide its first rotation keyframe as a static baked pose.
- Embedded position and scale channels, plus Molang or other non-numeric expressions, are skipped with warnings. Export `.animation.json` when position or scale is required; Molang remains unsupported there.
- If matching `.geo.json` and `.bbmodel` files both exist, `.geo.json` wins.
- Use `/townstead attachment dump-geo <id>` to inspect the exact converted geometry sent to clients when hierarchy, pivot, cube, coordinate, or UV conversion looks wrong.

Bone names matter: morphs, poses, physics chains, animations, and visibility rules all address bones by name, and the doctor validates every reference against the geometry (including stage-swapped geometry).

## Placement Workflow

Author the model around its natural mount point, then place it with `offset`, `rotation`, and `scale`. Rather than guessing values and reloading, use the live commands:

```text
/townstead attachment adjust my_pack:fox_tail rotation -30 0 0
/townstead attachment adjust my_pack:fox_tail offset 0 0 1
/townstead attachment dump my_pack:fox_tail
```

`adjust` updates every rendered instance immediately and lasts until the next reload; `dump` prints file-ready JSON with the live values folded in. See [Tooling & Commands](/roots/attachments/tooling/).

## Life Stages

`stages` overrides render placement per canonical life stage, keyed `baby`, `toddler`, `child`, `teen`, `adult`, and `senior`. Players read as adults.

```json
"stages": {
  "baby":   { "scale": 0.5, "offset": [0, 1, 0] },
  "child":  { "scale": 0.75 },
  "adult":  { "geometry": "my_pack:fox_tail_three" },
  "senior": { "geometry": "my_pack:fox_tail_three" }
}
```

| Field | Type | Notes |
| --- | --- | --- |
| `scale` | number | Multiplies with the definition scale and any genetic size roll. |
| `offset` | [x, y, z] | Extra offset in model pixels, added to the definition offset. |
| `geometry` | ref | A whole different model for this stage. Stage geometry ships over the same blob sync. |

A growth arc such as fawn nubs, antlers, and an elder rack is just three `geometry` swaps, or a fox line that grows one tail as a child and three from adulthood.

## Hiding Under Equipment

By default an attachment punches through worn armour. `hides_under` suppresses the whole attachment (emissive layer included) while the bearer wears anything in a listed slot:

```json
"hides_under": ["helmet"]
```

Valid slots are `helmet`, `chestplate`, `leggings`, and `boots`. For a softer reaction, fold the attachment with a `wearing_*` pose instead of hiding it; see [Poses & Equipment](/roots/attachments/poses/).

## Conditional Attachments

`when` gates the whole attachment on a [Pheno condition](/pheno/conditions/), evaluated client-side per bearer exactly like pose conditions. The classic use is a beard dwarven women carry in their blood but never wear:

```json
"when": { "type": "pheno:not", "condition": { "type": "pheno:gender", "is": "feminine" } }
```

Phrase gates so unknown bearers land on the right default: `pheno:gender` reads MCA gender from villagers and players alike but never matches entities without one, so `not feminine` keeps the beard on unknown bearers while hiding it on feminine villagers and players. The mirror gate (`"is": "feminine"` with no `not`) grants an attachment to women only, like braids. No `when`, or one that fails to parse (the doctor flags it), renders unconditionally.

## Full Example

A tail definition using most of the optional blocks:

```json
{
  "schema": "townstead:attachment/v1",
  "geometry": "my_pack:fox_tail",
  "texture": "my_pack:fox_tail",
  "target": { "tag": "tail_root" },
  "offset": [0, 0, 1],
  "rotation": [-120, 0, 0],
  "scale": 0.85,
  "tint": "gene",
  "tint_blend": "color",
  "emissive": "fox_tail_glow",
  "stages": {
    "child": { "scale": 0.75 },
    "adult": { "geometry": "my_pack:fox_tail_three" }
  },
  "poses": {
    "sleeping": { "bones": { "tail_1": { "rotation": [0, 40, 0] } }, "transition": 20 }
  },
  "physics": {
    "chains": [ { "bones": ["tail_1", "tail_2", "tail_3"], "stiffness": 0.35, "damping": 0.82 } ]
  }
}
```
