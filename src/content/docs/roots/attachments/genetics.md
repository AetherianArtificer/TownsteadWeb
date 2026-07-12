---
title: Genetics & Morphs
description: The attachment gene type, size channels, heritable colour, style variants, morphs, and visibility thresholds
---

Attachments are granted by genes, and the gene is where the heritable depth lives: which style a bearer carries, how large each part rolled, and what colour their coat is. The attachment definition then maps those rolled values onto the model with `morph` and `visibility` blocks.

Shared gene wrapper fields (`schema`, `display_name`, `dominance`, `locus`, `variants`, `weight`) are covered in [Gene Files](/roots/gene-files/); inheritance mechanics in [Inheritance](/roots/inheritance/).

## The Attachment Gene

Type: `townstead_roots:attachment`

| Field | Type | Notes |
| --- | --- | --- |
| `attachment` | id | The definition this gene grants. |
| `attachments` | list | A whole set granted by one gene (see composite grants below). |
| `size` | object | Heritable quantitative channels (see below). |
| `tint` | object | A heritable colour (see below). |

Every field can also live inside a variant of a multi-variant gene, which is how style swaps work.

## Size Channels

A `size` block makes the attachment quantitatively heritable. Each channel rolls a value per allele, the two carried copies express their mean, and children blend their parents' rolls down the generations.

```json
"size": {
  "channels": {
    "length": {
      "label": { "translate": "gene.my_pack.fox_tail.length" },
      "min": 0.85,
      "max": 1.2,
      "heritage": { "ancestry": "my_pack:fox_folk", "floor": 0.4 }
    },
    "droop": { "label": "Droop", "min": 0.0, "max": 1.0 }
  }
}
```

| Field | Type | Notes |
| --- | --- | --- |
| `min`, `max` | number | The roll range. |
| `label` | text | The editor slider label. A literal string or `{ "translate": ... }`. |
| `heritage` | object | `ancestry` plus `floor`: the expressed value is scaled by the bearer's share of that ancestry, mapped onto `[floor, 1]`. A half-blood grows visibly smaller elven ears than a full elf. |

The single-channel shorthand `"size": { "min": ..., "max": ..., "label": ... }` declares one anonymous channel. Old saves self-heal: alleles rolled before a channel existed roll the missing channels on load, and a legacy anonymous roll is renamed to the gene's first declared channel.

## Morphs

The `morph` block in the attachment definition reads the channel values. A channel entry can scale bones, rotate them, or both:

```json
"morph": {
  "channels": {
    "length": { "bones": ["tail_1"], "axes": [0.7, 1.0, 0.7] },
    "droop":  { "bones": ["tail_1"], "rotate": [-30, 0, 0] }
  }
}
```

- `axes` scales the named bones about their own pivots, weighted per axis (`1` follows the value fully, `0` is unaffected). With no `bones`, the whole attachment scales at its anchor.
- `rotate` turns the named bones by `rotate x value` degrees, in the geometry's own convention. A drooping ear reads organic where a shrinking one reads cheap; prefer rotation morphs for set, carriage, and curl.

Bones scale their children with them, so morphing a chain's root bone morphs the chain.

## Visibility Thresholds

`visibility` rules gate bones on channel values, for shape changes scale cannot sell:

```json
"visibility": [
  { "bones": ["human_tip"], "channel": "length", "below": 0.4 },
  { "bones": ["elven_tip"], "channel": "length", "above": 0.4 }
]
```

Either bound may be omitted. A bearer with no rolled value for the channel keeps the bones visible. The classic use is a quarter-elf whose ears go visibly human rather than miniature-elven.

## Style Variants

A multi-variant gene whose options each carry their own `attachment` is a heritable style swap:

```json
"variants": {
  "sleek": { "display_name": "Sleek", "weight": 3, "attachment": "my_pack:fox_tail", "size": { ... } },
  "bushy": { "display_name": "Bushy", "weight": 1, "attachment": "my_pack:fox_tail_bushy", "size": { ... } }
}
```

Styles inherit Mendelian-style by variant weight. When both carried copies agree on the style, the channel values blend quantitatively; when they disagree, the winning style's rolls ride along unblended. Keep channel names shared across the options so rolls survive a style change in the editor.

A variant can also grant *nothing*: `"none": true` makes it an explicit empty option that still rolls, inherits, and cycles in the editor like any other. The dwarven beard gene uses this for its clean-shaven option; pair it with a `when` gate on the definitions (see [Attachment Files](/roots/attachments/definition/)) when some bearers should never display the attachment at all.

## Heritable Colour

A `tint` block makes the attachment's colour an inherited trait:

```json
"tint": {
  "label": { "translate": "gene.my_pack.fox_tail.fur" },
  "palette": ["#F1762B", "#EFE6D5", "#3B322D"]
}
```

This declares the reserved `tint_r`, `tint_g`, and `tint_b` channels on the gene. Newborns roll a palette colour (with a little jitter, so littermates are not clones), and children mean-blend their parents' components per channel: coats genuinely mix down a family line. The definition opts in with `"tint": "gene"`; see [Surfaces & Colour](/roots/attachments/surfaces/) for the render side.

One constraint: a tint block requires named size channels. The legacy anonymous size shorthand cannot share an allele with named channels, and `/townstead attachment doctor` flags the combination.

## Composite Grants

One gene can wear a whole set:

```json
"attachments": ["my_pack:horns", "my_pack:tail", "my_pack:spines"]
```

Every definition in the set renders, and they all share the gene's channel rolls. Each definition's `morph` reads whichever channels it names, so one shared `bulk` channel can scale horns and spines together while `tail_length` touches only the tail. Keep parts as separate genes instead when they should inherit independently: ears and tail as separate genes, for example, so a child can take one without the other.

## The Character Editor

Attachment genes are fully editable in the villager editor and the Destiny screen. Each gene renders as a section: a header with its name and a randomize dice, a style cycler for variant genes, one labelled slider per channel, and palette swatches plus free colour bars for a heritable tint. The dice re-rolls the whole gene: style by weight, channels in range, colour from the palette.
