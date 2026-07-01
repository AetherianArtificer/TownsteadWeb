---
title: Inheritance
description: How Roots genes, loci, alleles, heritage, founders, and children work
---

Roots uses a layered genome and a diploid inheritance model. The important distinction is that a root can say what a founder should be seeded with, while an individual stores what they actually carry.

## Quick Model

The short version:

1. A root builds a starting gene list from species, ancestry, and lineage data.
2. Founders roll carried gene copies from that list.
3. Children inherit one copy from each parent.
4. Heritage fractions are averaged from the parents.
5. The game reads the expressed genes after dominance and tie-breaking.

You can understand most pack behaviour from those five steps. The rest of this page explains the edge cases.

## Effective Genome

### Resolution

When Townstead resolves a root, it reads the supporting species, ancestry, and lineage data referenced by that root. Species, ancestry, and lineage provide the inherited gene layers.

Townstead reads the root's ancestry, the root's lineage, and the lineage's ancestry before composing the effective genome.

When the same gene id appears more than once, the more identity-specific entry replaces the shared entry.

### Locus Collapse

After the layered genome is built, Townstead also collapses genes by locus for founder seeding and display. If two genes share a locus, the later and more specific gene wins. Genes without a locus are kept independently.

## Loci

A locus is the inheritance slot for related genes. Some gene types provide a default locus. A gene file can also set its own `locus`.

```json
{
  "schema": "townstead:gene/v2",
  "type": "pheno:attribute",
  "locus": "my_pack:strength",
  "attribute": "minecraft:generic.attack_damage",
  "amount": 2.0
}
```

Genes at the same locus compete like variants of the same inherited trait. Genes at different loci can both be expressed.

## Diploid Genes

### Two Copies

Most genes are diploid. A diploid locus stores two alleles, one from each parent.

### Allele Forms

An allele can be:

| Form | Meaning |
| --- | --- |
| `gene_id` | A single-variant gene allele. |
| `gene_id#variant` | A named variant of a gene. |
| `~` | Empty/wild allele. |

Founders receive two independently rolled alleles at each diploid locus. Children draw one allele from each parent at each locus.

### Exceptions

The following gene types are not stored as normal diploid allele pairs:

| Gene Type | Reason |
| --- | --- |
| `pheno:body_metric` | Applied as founder body ranges and inherited through MCA body data. |
| `pheno:proportions` | Applied as founder body/render ranges and free-form proportions. |
| `townstead_roots:trait_occurrence` | Rolled at spawn to grant traits. |
| `townstead_roots:life_cycle` | Resolved as a cycle definition rather than a pair of alleles. |

## Variants

When a gene has a `variants` object, each variant can have its own config and weight.

```json
{
  "schema": "townstead:gene/v2",
  "type": "townstead_roots:eye_color",
  "display_name": "Eye Colour",
  "variants": {
    "blue": {
      "display_name": "Blue",
      "weight": 3,
      "tint": "#66aaff"
    },
    "gold": {
      "display_name": "Gold",
      "weight": 1,
      "tint": "#f6c04a"
    }
  }
}
```

Founder rolling chooses among variants by weight. If the gene has no `variants` object, the whole file behaves as one implicit variant.

## Expression Rules

### Winning Allele

At each diploid locus, Townstead chooses one expressed allele from the two carried alleles.

| Situation | Result |
| --- | --- |
| One allele is empty | The real allele wins. |
| Both alleles are empty | Nothing is expressed at that locus. |
| One allele's gene is dominant and the other is recessive | The dominant allele wins. |
| Same gene, different variants | The variant with the higher `weight` wins. |
| Different genes at same locus with equal dominance | The gene with the higher `weight` wins. |

`dominance` defaults to dominant. Set `"dominance": "recessive"` when a gene should only win against empty or weaker recessive competition.

### Weights

`weight` defaults to `1`. Use it when one gene or variant should be more likely to win than another. If everything is still tied, Townstead uses a stable internal ordering so the result is consistent.

## Founders

A founder is a naturally spawned villager that is not already the result of a parented birth.

### Founder Setup

For founders, Townstead:

1. Selects a root from spawn bias, village restrictions, and fallback rules.
2. Optionally creates a same-species mixed founder if the species allows admixture.
3. Stores root and heritage.
4. Applies personality policy.
5. Applies body metrics and proportions.
6. Rolls trait occurrence genes.
7. Seeds genotype from the effective inherited genes.
8. Rolls life-stage timing.

If no weighted root can be selected, Townstead falls back to the default root.

## Mixed Founders

Species can set `admixture_chance`. When it succeeds, Townstead builds a same-species mix from compatible roots.

Mixed founders receive:

| System | Mixed Behaviour |
| --- | --- |
| Root id | The dominant fraction's root. |
| Heritage | Weighted combination of each selected root's seed heritage. |
| Genotype | Rolled from selected roots according to their mix fractions. |
| Body metrics | Fraction-weighted blended ranges. |
| Trait occurrence | Fraction-weighted chance. |
| Life cycle | Blended only when the candidate cycles have the same stage shape; otherwise the dominant root's cycle wins. |
| Personality | Assigned from the dominant root. |

## Children

Children inherit from parents.

### Species Boundary

Parents need to share a species to produce children through the Roots breeding model. Ancestries and lineages can mix inside that shared species, but species do not interbreed. This is both a biological boundary and an asset boundary: species own the rig/body base, textures, face layout, overlays, attachments, equipment anchors, and other authored presentation data. Townstead does not generate hybrid rigs or hybrid asset sets from incompatible parents.

### Gene Copies

At each diploid locus:

1. Townstead gathers every locus carried by either parent.
2. The child draws one allele from the first parent and one allele from the second parent.
3. Missing loci contribute an empty allele.
4. Expressed genes are recomputed from the child's genotype.

Child heritage is the average of the parents' heritage maps. The child's displayed root follows the dominant ancestry in the child heritage when a parent root matches that dominant ancestry; otherwise the mother's root is preferred as the tie/default.

### Players

Players also carry a persisted root id and genotype, so player genetics can participate in inheritance.

## Heritage

Seed heritage is derived from the root:

| Root Shape | Seed Heritage |
| --- | --- |
| Root with ancestry and lineage | `100%` that ancestry. |
| Legacy or malformed root without ancestry/lineage | Empty heritage map. |

Heritage profiles from `data/<namespace>/heritage/` can name fraction ranges. If no profile matches, near-pure heritage keeps the dominant root or ancestry name, while mixed heritage gets a generated label based on its two largest ancestry fractions.

## Body and Life Data

### Body

Body metrics and proportions are applied when a founder is created. For children, MCA's body inheritance and blend data carries the family resemblance forward.

### Life Cycles

Life cycles are not inherited as allele pairs. Townstead resolves the effective cycle gene from the root's layered genome, using the most specific and strongest applicable life-cycle gene.
