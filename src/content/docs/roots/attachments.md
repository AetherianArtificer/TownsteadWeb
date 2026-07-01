---
title: Attachments
description: Under-development reference for Roots render attachments and compatible attachment assets.
---

Attachments are planned as their own Roots appearance system. They cover visual parts that attach to a species rig, such as horns, ears, tails, wings, back pieces, jewellery, equipment-like cosmetics, or other body-bound details.

:::caution[Under construction]
The attachment system is still being designed and implemented. The current docs describe the intended authoring model so pack authors can plan around it, but the final fields, loading rules, and relationship to genes and character editor choices may change.
:::

## How To Think About Attachments

An attachment is not just a texture. It needs to know where it attaches, which rig or species it fits, and how it should move with the body.

| Piece | Purpose |
| --- | --- |
| Attachment asset | The visual resource, such as a model, sprite, texture, or other render part. |
| Anchor | The rig bone or named attachment point the asset follows. |
| Transform | Offset, rotation, scale, and other placement data relative to the anchor. |
| Compatibility | The species, rig, life stage, or body layout the attachment is authored for. |
| Gene or selection rule | The inherited, selected, or runtime rule that decides whether the attachment appears. |

## Relationship To Species And Rigs

Attachments are species-compatible assets. A tail authored for one body layout may not line up on another body, even if both species use similar names for bones or anchors.

Species and rig data should define the compatible attachment points. Attachment assets should then target those points instead of assuming one global body layout.

## Relationship To Genes

Appearance genes can choose or grant attachments. The current `townstead_roots:attachment` gene type represents the basic idea: a gene can add a named render attachment.

As the attachment system grows, expect the docs to separate:

| Layer | Responsibility |
| --- | --- |
| Rig/species | Defines usable anchors and body compatibility. |
| Attachment asset | Defines what is rendered and how it fits an anchor. |
| Gene | Chooses, inherits, hides, or modifies attachments. |
| Character UI | Offers compatible attachment choices for the current root/species. |

## Generated Character Tabs

Attachment choices should be generated from compatible data, not from one universal list. If the current root uses a species without a matching anchor or rig layout, that attachment should not appear as an available choice.

More documentation will come as the attachment loading and rendering system is filled out.
