---
title: Root Profiles
description: Root files and assignable Roots identity profiles
---

A root is the top-level identity assigned to villagers and players. Commands, catalogues, inheritance, and appearance systems all work from that assigned root.

Path: `data/<namespace>/root/<path>.json`

Schema: `townstead:root/v1`

## How Root Profiles Fit

Root is the top-level identity concept. A root file references the species, ancestry, and lineage that support the assigned identity rather than sitting below them as a final biological tier.

```text
Root
├─ Species
├─ Ancestry
└─ Lineage
```

Root fields describe the assigned identity and connect it to the species, ancestry, and lineage data that define its inherited traits.

## Fields

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `schema` | string | yes | `townstead:root/v1`. |
| `display_name` | component | no | Shown as the root name. |
| `species` | id | no | Overrides ancestry/lineage species. |
| `ancestry` | id | yes | The broad ancestry this root belongs to. Should match the lineage's ancestry. |
| `lineage` | id | yes | The lineage this root belongs to. Lineage genes are layered after ancestry genes. |
| `demonym` | object | no | Overrides lineage and ancestry demonym. |
| `backstory` | component | no | Overrides lineage and ancestry backstory. |
| `spawn_bias` | object | no | Identity-specific founder weighting. See [Spawn Bias](/roots/spawn-bias/). |
| `icon` | string | no | The root's art in the picker: an item id, or a `.png` texture path (`<namespace>:textures/...`). Data-pack textures sync to clients. Without one, the root is listed by name alone. |
| `featured` | boolean | no | Lists the root under **Featured** in the root browser. Often set by a [patch](/reference/compatibility/#patches) so a modpack can feature roots from other packs. |

## Example

```json
{
  "schema": "townstead:root/v1",
  "display_name": "Moon Elf",
  "ancestry": "my_pack:elf",
  "lineage": "my_pack:moon_elf"
}
```

## In the Picker

The editor's Root tab summarises the root on show and opens **Browse roots...** for the full catalogue. Everything the picker shows beyond the name and backstory comes from the root's genes, so there is nothing extra to write:

| Shown | Read from |
| --- | --- |
| Diet | the `townstead_roots:diet` gene |
| Active | the chronotype gene (`By day`, `Dusk and dawn`, `By night` for the bundled mixes; otherwise the gene's name) |
| Lifespan | the effective life cycle, compared with a human's (`Ageless` when the cycle or an ageless gene says so) |
| Size | a `pheno:scale` gene other than 100% |
| Born | an egg stage and litter size, or a fertility gene of `0` |
| Moves, Breathes, Senses | flight, water-breathing and night- or lava-vision abilities |
| Powers | genes in the `Abilities` category: actives with their cooldown, then strengths, then `drawback` genes |

Diet, Active and Lifespan always show. The other rows show only when they make the root different from others. The trait filters of the browser use the same facts (Winged, Small, Large, Aquatic, Lays eggs, Nocturnal, Darkvision, Ageless, Cannot have children), and a filter only appears when some roots have it and some do not.

To feature roots without editing them, patch them from your own pack:

```json
{
  "schema": "townstead:patch/v1",
  "target": { "root": ["otherpack:moon_elf", "otherpack:fire_drake"] },
  "set": { "featured": true }
}
```

## Genome Resolution

When Townstead resolves a root's effective genome, it starts from the assigned root and reads the supporting data that root references.

Species, ancestry, and lineage contribute the inherited genes for that root. Put broad body defaults on species, broad population traits on ancestry, and sub-race or branch traits on lineage.
