---
title: Roots
description: Reference for how to build root data packs
---

Roots use a separate schema for each document in the hierarchy:

Much more documentation is coming for roots, including full examples for species, ancestry, lineage, root, heritage, trait, and gene authoring.

| Document | Schema |
| --- | --- |
| Species | `townstead:species/v1` |
| Ancestry | `townstead:ancestry/v1` |
| Lineage | `townstead:lineage/v1` |
| Root | `townstead:root/v1` |
| Heritage | `townstead:heritage/v1` |
| Chronotype | `townstead:chronotype/v1` |
| Trait | `townstead:trait/v1` |

Root files live under:

```text
data/<namespace>/root/<path>.json
```

and begin with:

```json
{
  "schema": "townstead:root/v1"
}
```

Older packs may still use `data/<namespace>/origin/` and `townstead:origin/v1`; Townstead reads those as compatibility fallbacks.

Gene files use their own document schema:

```json
{
  "schema": "townstead:gene/v2"
}
```

Gene files use Pheno for conditions, actions, selectors, values, and capabilities inside the gene. See the [Pheno reference](/packs/pheno/) for that embedded authoring syntax.
