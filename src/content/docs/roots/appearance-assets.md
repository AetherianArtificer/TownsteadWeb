---
title: Appearance Assets
description: Texture compatibility, face assets, overlays, generated character tabs, and appearance genes
---

Appearance assets are the visual resources a root can use: body textures, face parts, overlays, attachments, colour options, and other rig-compatible details.

Townstead does not treat these as one global pool. Assets are matched to the current species and rig so eyes, mouths, overlays, attachments, wearable anchors, and equipment placement line up with the body that is actually being rendered.

Loaded species, rigs, genes, and compatible assets can also feed generated character-creation or customization tabs. Those tabs should only offer choices that fit the current species and rig.

## Compatibility Checklist

| Asset | Why It Matters |
| --- | --- |
| Base texture | Must match the UV layout of the rig model. |
| Face textures | Eye and mouth sprite strips need the rig's face anchor and expected frame layout. |
| Skin tints and overlays | Need to fit the species texture layout and material assumptions. |
| Attachments | Need bones or anchors that exist on the rig. See [Attachments](/roots/attachments/). |
| Wearables and held items | Need hand, head, back, boot, and first-person transforms that suit the body shape. |
| Armour and equipment | Need layer choices or custom handling that match the body. |

Species and rig data form the compatibility envelope for visual assets. For the breeding and inheritance side of that boundary, see [Species](/roots/species/) and [Inheritance](/roots/inheritance/).

## Face Assets

Face genes use the rig's `face` block.

| Gene Type | Purpose |
| --- | --- |
| `townstead_roots:eyes` | Selects a custom eye texture and optional glow. |
| `townstead_roots:eye_color` | Tints custom eyes. |
| `townstead_roots:mouth` | Selects a custom mouth texture. |

Eye and mouth textures should be authored for the face size, centre, and frame layout expected by the rig.

Face assets are loaded as pack assets, then selected through genes or generated UI choices. Eye and mouth options should be grouped by the species or rig they are compatible with; a sprite strip that fits one face layout may not line up on another.

## Generated Character Tabs

Custom body and character tabs are generated from loaded Roots data instead of being hard-coded per species. In practice, this means a pack can add a species, rig, face assets, overlays, or compatible attachments, and Townstead can expose compatible choices without every option being manually wired into the screen.

The generated tabs depend on the same compatibility rules as rendering:

| Tab Source | What It Can Offer |
| --- | --- |
| Species and rig data | Body base, scale, supported bones, face layout, equipment anchors, and stage rig choices. |
| Appearance genes | Inherited or selectable skin tone, eyes, eye colour, mouth, overlays, hidden features, scaled parts, body proportions, and attachment choices. |
| Loaded assets | Texture choices, face sprite strips, overlays, compatible attachment assets, and other visual resources that match the current rig. |

Do not assume one global list of eyes, mouths, bodies, or attachments. Treat these as species-compatible assets that the UI can discover and present when the current root/species can actually use them. The attachment system is large enough to have its own [Attachments](/roots/attachments/) page and is still under development.

## Body Appearance Genes

| Gene Type | Purpose |
| --- | --- |
| `townstead_roots:skin_tone` | Applies a skin tint with blend mode and strength. |
| `townstead_roots:attachment` | Adds a named attachment. Attachment authoring is still under development; see [Attachments](/roots/attachments/). |
| `pheno:body_metric` | Rolls normalized MCA body metrics. |
| `pheno:proportions` | Rolls multiple body metrics and free-form render scales. |
| `pheno:scaled_part` | Scales a named part. |
| `pheno:hide_feature` | Hides a named feature. |
| `pheno:overlay` | Adds a render overlay. |
| `pheno:particle` | Emits particles. |

Use species and rig files for the base body. Use genes when the feature should vary, be inherited, or be editable as a carried variant.
