---
title: Species
description: Body base, breeding boundaries, rig defaults, animation sources, character editor layout, and species-level inheritance
---

Species describes the body-level base for one or more roots.

Path: `data/<namespace>/species/<path>.json`

Schema: `townstead:species/v2`

Species is the highest body-and-asset boundary in Roots. It answers questions like:

- What kind of body does this root use?
- Which rig and animation sources can drive that body?
- Which appearance assets and character editor tabs make sense for it?
- Which roots can mix ancestry or lineage with each other?

Roots inside the same species can share compatible inheritance, faces, textures, and editor controls. Roots in different species do not interbreed, because Townstead cannot safely invent a new rig, texture layout, face map, overlay set, or attachment layout from two incompatible body models.

## What Species Controls

Species is responsible for:

| Area | Meaning |
| --- | --- |
| Body base | Default rig id, render scale, and broad body genes. |
| Breeding boundary | Roots can mix ancestry and lineage within a species, but different species do not interbreed. |
| Asset compatibility | Rigs, texture sets, face layouts, overlays, attachments, and equipment anchors are authored for a species. |
| Animation source choices | Species can opt body states into humanoid animation behaviour, opt them out, and list animation providers. |
| Character editor layout | Species can keep MCA's native character tabs or replace them with generated Townstead tabs. |
| Personality pool | Species can provide broad personality policy. |
| Admixture | `admixture_chance` controls how often newly generated founders can start with mixed same-species heritage. |

Use [Rigs](/roots/rigs/) for the full rig file format and [Appearance Assets](/roots/appearance-assets/) for textures, face assets, overlays, and generated appearance controls.

## Fields

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `schema` | string | yes | `townstead:species/v2`. |
| `display_name` | component | no | Falls back to the file id when omitted. |
| `rig` | object | no | `base` rig or model id and optional `scale`. |
| `animations` | object | no | Animation source settings and provider ids. |
| `breasts` | boolean | no | Defaults to true for `mca:villager`, false for other rigs. |
| `admixture_chance` | number | no | Chance from `0` to `1` that newly generated founders can start with mixed heritage from compatible roots in this species. |
| `genes` | array | no | Species-level genes shared by descendants. |
| `personalities` | object | no | Broad personality policy for roots in this species. See [Personality Policy](/roots/personality-policy/). |
| `character_editor` | object | no | Custom character editor layout. Omit it to keep MCA's native Character tab unchanged. |

## Example

```json
{
  "schema": "townstead:species/v2",
  "display_name": { "translate": "species.my_pack.elf" },
  "rig": {
    "base": "mca:villager",
    "scale": 1.02
  },
  "animations": {
    "crouch": "humanoid",
    "sleep": "humanoid",
    "fly": "none",
    "providers": ["minecraft:skeleton", "humanoid"]
  },
  "breasts": true,
  "admixture_chance": 0.15,
  "genes": [
    "my_pack:pointed_ears",
    "my_pack:long_life"
  ],
  "character_editor": {
    "native": ["body", "clothes"],
    "tabs": [
      {
        "id": "face",
        "label": { "translate": "character_editor.my_pack.face" },
        "fields": [
          "my_pack:eye_shape",
          "my_pack:mouth_shape"
        ]
      },
      {
        "id": "mca_eyes",
        "label": { "translate": "gui.villager_editor.subpage.eyes" },
        "fields": ["mca_eyes"]
      }
    ]
  }
}
```

## Rig Block

The species `rig` block chooses the default body rig and render scale:

```json
{
  "rig": {
    "base": "my_pack:skeletownie",
    "scale": 0.96
  }
}
```

| Field | Type | Default | Notes |
| --- | --- | --- | --- |
| `base` | id | `mca:villager` | `mca:villager`, a vanilla or modded model layer id, or a custom rig loaded from `data/<namespace>/rig/`. |
| `scale` | number | `1.0` | Global render scale for this species. |

The deeper rig file owns model sources, textures, bones, armour, face anchors, wearable anchors, held item transforms, pose transforms, hitboxes, camera settings, and emote integration. See [Rigs](/roots/rigs/).

## Animations

The species `animations` block does not define a full animation rig. It tells Townstead which animation source to use for broad body states, and which provider ids can drive idle/walk style animation bridges.

```json
{
  "animations": {
    "crouch": "humanoid",
    "sleep": "humanoid",
    "fly": "none",
    "providers": ["minecraft:skeleton", "humanoid"]
  }
}
```

Animation state keys currently include:

| State | Meaning |
| --- | --- |
| `crouch` | Crouching pose source. |
| `sleep` | Sleeping pose source. |
| `fly` | Flying pose source. |

Values are:

| Value | Meaning |
| --- | --- |
| `humanoid` | Use humanoid animation behaviour. |
| `none` | Do not use that animation source. |

Unlisted states default to `humanoid`.

`providers` is an ordered fallback list for animation bridge integrations. A provider id names an entity identity whose external animation setup can be tried. The special value `humanoid` means Townstead's own humanoid setup is the fallback floor. If `providers` is omitted or empty, the rig uses its base behaviour.

## Character Editor

`character_editor` controls the Character tab shown in the MCA editor for this species.

If `character_editor` is omitted, Townstead leaves MCA's native Character tab unchanged. This is usually right for ordinary villager-style species.

If `character_editor` is present, Townstead replaces the native subpage strip with a species-aware layout:

| Field | Type | Notes |
| --- | --- | --- |
| `native` | array | MCA-native groups to keep when tabs are auto-generated. Supported values are `body`, `clothes`, `hair`, and `mca_eyes`. |
| `tabs` | array | Explicit tab list. If omitted or empty, Townstead generates tabs from editable species genes and kept native groups. |

Each explicit tab has:

| Field | Type | Notes |
| --- | --- | --- |
| `id` | string | Tab id. Townstead renders gene tabs as `townstead_char:<id>`. |
| `label` | component | Optional tab label. Falls back to `id`. |
| `fields` | array | Ordered native group ids or gene ids. |

Native groups can be listed inside explicit `fields`; a tab with one native group delegates to MCA's own subpage. A tab with gene fields becomes a Townstead-rendered gene tab.

Only editable variant genes with options appear in generated tabs. Tinted skin-tone style genes render as a tone selector and colour swatch; other variant genes render as cyclers. Non-visual genes, passive abilities, and hidden mechanics do not appear in the character editor.

## Body Options

`breasts` controls whether this species keeps MCA's breast body part and breast editor slider.

If omitted, the default follows the rig:

| Rig | Default |
| --- | --- |
| `mca:villager` | `true` |
| Any other rig | `false` |

Set `breasts` explicitly when a custom humanoid rig supports that part, or when a villager-derived species should hide it.

## Species Genes

`genes` uses the same gene-list format as ancestries and lineages. A bare id means the species always contributes that gene:

```json
{
  "genes": ["my_pack:tall_frame"]
}
```

Use `occurrence` when a founder should only sometimes receive the gene:

```json
{
  "genes": [
    { "gene": "my_pack:golden_eyes", "occurrence": 0.65 }
  ]
}
```

Species genes are broad traits for the body group. Root, ancestry, and lineage genes can still add narrower identity, family, or heritage traits on top.

## Admixture

`admixture_chance` is the same-species mixed-founder knob. A value of `0` means newly generated founders start from one root. A value of `1` means every eligible founder can be generated from compatible roots in the same species.

For example, if humans and elves are roots in the same species, this is the field that controls how often new founders might begin with mixed human/elf heritage. If they are different species, `admixture_chance` does not make cross-species children.
