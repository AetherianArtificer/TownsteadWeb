---
title: How Roots Work
description: Overview of roots, species, ancestry, lineage, genes, heritage, and inheritance.
---

Roots are Townstead's data-driven identity and genetics system. They describe what a villager or player is, where that identity comes from, what biological and cosmetic genes they can carry, how those genes are inherited, how mixed heritage should be named, and which appearance assets the game can offer for that identity.

Root is the top-level concept players and pack authors see. A root is what gets assigned to a villager or player. It references species for body base, asset compatibility, and rig; ancestry for broad inherited population data; and lineage for the sub-race or biological branch within that ancestry. Genes, heritage, life cycles, traits, rigs, and loaded appearance assets support that root identity.

## The Short Version

If you only need the basics, read these in order:

1. Root is the identity a villager or player is assigned.
2. Species decides the body base and what can interbreed.
3. Ancestry and lineage describe inherited populations within a species.
4. Genes add inherited appearance, needs, abilities, life stages, and traits.
5. Heritage records mixed ancestry fractions.
6. Species rigs and appearance genes decide which body, face, overlay, and attachment assets can be used.

For pack work, start with one root, one species, one ancestry, one lineage, and one or two genes. Add mixed heritage, custom rigs, and complex inheritance after that first path works in game.

## Hierarchy

```text
Roots system
├─ Root: assigned identity
│  ├─ Species: body base, rig, animations, broad biological defaults
│  ├─ Ancestry: inherited population within a species
│  └─ Lineage: sub-race or biological branch within an ancestry
├─ Heritage: the carried ancestry fractions of an individual
├─ Genome: genes layered from species, ancestry, and lineage
│  ├─ Gene: one inherited or applied feature
│  ├─ Variant: one option inside a gene
│  ├─ Locus: the inheritance slot where related genes compete
│  └─ Genotype: the carried allele pairs
├─ Life cycle and traits: stage progression and trait grants
└─ Rig and appearance: render model, body metrics, face parts, overlays, attachments, and generated character tabs
```

The important split is between the assigned root and the carried heritage. A villager can be assigned a root such as `my_pack:starlit_moon_elf`, while their heritage can still record mixed ancestry fractions inherited from parents.

## Core Terms

### Identity

| Term | Meaning |
| --- | --- |
| Root | The top-level identity concept assigned to villagers and players. A root references species, ancestry, and lineage. |
| Species | The body-level identity: rig, animation defaults, body genes, breeding boundary, and cross-ancestry biological defaults. |
| Ancestry | A broad inherited population within a species. An ancestry can provide genes, demonym, backstory, founder weighting, and personality policy. |
| Lineage | A sub-race or biological branch within an ancestry. It layers extra genes and text on top of ancestry data. |
| Heritage | The realized ancestry fraction map carried by an individual. This is what lets mixed ancestry be represented without pretending everyone is only one root. |

### Genetics

| Term | Meaning |
| --- | --- |
| Gene | A data file that defines one inherited or applied capability, appearance feature, physiological trait, life cycle, resource, or behaviour. |
| Variant | A named option inside a gene. For example, an eye-colour gene could be brown, blue, or silver. |
| Locus | The inheritance slot where related genes compete. Genes at the same locus behave like alleles of the same trait. |
| Allele | One carried copy of a gene or variant. Most inherited genes carry two copies: one from each parent. |
| Genotype | The full set of carried gene copies stored on the person. A genotype can carry recessive or unexpressed genes. |
| Expressed gene | The winning allele after dominance, weight, and tie-breaking have been resolved. Runtime systems read expressed genes. |

### Presentation And Progression

| Term | Meaning |
| --- | --- |
| Trait | A Townstead/MCA trait data file that can be granted by a trait occurrence gene. |
| Rig | A render definition used by a species or life stage. Rigs describe model, texture, bones, equipment anchors, poses, face, and related rendering data. |
| Appearance asset | A texture, face strip, overlay, attachment, or related visual option that is compatible with a species rig and can be selected by genes or generated character UI tabs. |
| Life cycle | A gene-defined ordered list of life stages, such as baby, child, adult, senior, or custom stages like egg and larva. |

## Data File Map

### Identity Files

| File Type | Path | Schema |
| --- | --- | --- |
| Root | `data/<namespace>/root/<path>.json` | `townstead:root/v1` |
| Species | `data/<namespace>/species/<path>.json` | `townstead:species/v2` |
| Ancestry | `data/<namespace>/ancestry/<path>.json` | `townstead:ancestry/v1` |
| Lineage | `data/<namespace>/lineage/<path>.json` | `townstead:lineage/v1` |
| Heritage | `data/<namespace>/heritage/<path>.json` | `townstead:heritage/v1` |

### Supporting Files

| File Type | Path | Schema |
| --- | --- | --- |
| Gene | `data/<namespace>/gene/<path>.json` | `townstead:gene/v2` |
| Chronotype | `data/<namespace>/chronotype/<path>.json` | `townstead:chronotype/v1` |
| Trait | `data/<namespace>/trait/<path>.json` | `townstead:trait/v1` |
| Rig | `data/<namespace>/rig/<path>.json` | `townstead:rig/v1` |

## Runtime Flow

1. Townstead loads species, ancestry, lineage, root, heritage, chronotype, gene, rig, and trait JSON from data packs.
2. Each root resolves an effective species, effective genome, effective spawn bias, demonym, backstory, personality policy, and life cycle from its layered data.
3. New villagers choose a root from spawn weights, village restrictions, and optional same-species admixture.
4. Founders receive a root, heritage, personality, body metrics, trait rolls, life-stage timing, and genotype.
5. Children inherit one allele from each parent at every diploid locus and average their parents' heritage fractions.
6. Runtime systems read the expressed gene set to apply abilities, attributes, visuals, resources, sounds, restrictions, and other behaviours.
7. Character creation and customization screens can build body and appearance tabs from the loaded roots, species, rigs, genes, and compatible assets.

Start with [File Basics](/roots/file-basics/) and [Root Profiles](/roots/root-profiles/) for authoring structure, then [Gene Files](/roots/gene-files/) and [Inheritance](/roots/inheritance/) for the genetic model. For visuals, see [Rigs](/roots/rigs/) and [Appearance Assets](/roots/appearance-assets/).
