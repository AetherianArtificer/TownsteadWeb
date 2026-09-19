---
title: Profession Clothing
description: Choose the outfits a career wears and how they cover hair.
---

A profession's `clothing` field is presentation data for MCA villagers. This page describes the field on `profession.json`; the [Core Fields](/careers/profession-files/#core-fields) table lists it alongside the rest.

## Profession Clothing

`clothing` is presentation data. It does not alias Profession behaviour, trades, work, or Career
history. Give one clothing identity as a string, or list identities in preference order:

```json
"clothing": [
  "yourstudio_beekeeping:beekeeper",
  "minecraft:farmer"
]
```

On a Profession change, Townstead asks MCA's merged clothing catalogue for each identity in order.
The first identity with clothing compatible with the villager's gender supplies the outfit. Mods,
Career packs, and ordinary resource packs all contribute to the same catalogue, so the Profession
does not declare which mod provides an identity.

A string preserves MCA's normal hair rendering. Use an object only when one particular outfit
includes headwear that needs to cover the hairstyle:

```json
"clothing": [
  {
    "id": "yourstudio_beekeeping:beekeeper",
    "hair": "covered"
  },
  "minecraft:farmer"
]
```

The `hair` policy belongs to that fallback entry and applies only when clothing supplied by that
identity is actually selected:

| `hair` | Effect |
| --- | --- |
| `normal` | Default. MCA renders the complete hairstyle. |
| `covered` | Hides hair attached to the head while retaining hair that hangs over the shoulders or body. Use this for complete hats, hoods, and veils. The clothing texture must provide the full headwear, including any crown or top surface. |
| `hidden` | Hides the complete hairstyle. Use this only for fully enclosed headwear. |

When `clothing` is absent, MCA's clothing authored directly for the Profession continues to work.
If no such clothing exists, Townstead retains the villager's current clothes instead of replacing
them with a random civilian outfit. An empty list, an exhausted fallback list, or a manual clothing
lock also retains the current clothes.

A Career pack can provide its own MCA clothing entries. Keep each catalogue filename distinct; the
last path segment supplies its default gender:

```text
data/yourstudio_beekeeping/skins/clothing/beekeeper/female.json
assets/yourstudio_beekeeping/skins/clothing/normal/female/beekeeper/0.png
```

For example, `female.json` can contain:

```json
[
  {
    "id": "yourstudio_beekeeping:skins/clothing/normal/female/beekeeper/0.png",
    "profession": "yourstudio_beekeeping:beekeeper",
    "chance": 1
  }
]
```

Use adjacent `male.json` and `neutral.json` catalogues for other variants. Neutral entries match
every gender. Multiple compatible entries may share an identity; MCA uses `chance` as their
selection weight. The normal texture is sufficient. Matching `burnt` textures are optional and use
MCA's corresponding clothing directory.
