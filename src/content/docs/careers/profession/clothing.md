---
title: Profession Clothing
description: Choose the outfits a career wears and how they cover hair.
---

The `clothing` field of a profession sets what MCA villagers in that career wear. This page describes the field in `profession.json`. The [Core Fields](/careers/profession-files/#core-fields) table lists it with the other fields.

## Profession Clothing

`clothing` changes only how villagers look. It does not change the behaviour, trades, work, or Career history of the Profession. Give one clothing identity as a string, or list identities in order of preference:

```json
"clothing": [
  "yourstudio_beekeeping:beekeeper",
  "minecraft:farmer"
]
```

When a villager changes Profession, Townstead looks up each identity in order in MCA's clothing catalogue. Townstead uses the first identity that has clothing for the villager's gender. Mods, Career packs, and resource packs all add to the same catalogue, so the Profession does not say which mod supplies an identity.

With a string, MCA draws the hair as usual. Use an object only when an outfit has headwear that must cover the hair:

```json
"clothing": [
  {
    "id": "yourstudio_beekeeping:beekeeper",
    "hair": "covered"
  },
  "minecraft:farmer"
]
```

The `hair` setting applies only when Townstead uses clothing from that entry:

| `hair` | Effect |
| --- | --- |
| `normal` | Default. MCA draws all of the hair. |
| `covered` | Hides the hair on the head, but keeps the hair that hangs over the shoulders or body. Use it for full hats, hoods, and veils. The clothing texture must draw all of the headwear, including the top. |
| `hidden` | Hides all of the hair. Use it only for headwear that encloses the whole head. |

When there is no `clothing` field, MCA's own clothing for the Profession still works. If there is no such clothing, Townstead keeps the villager's current clothes. It does not give the villager a random civilian outfit. Townstead also keeps the current clothes when the list is empty, when no entry in the list matches, or when the clothing is locked by hand.

A Career pack can add its own MCA clothing entries. Give each catalogue file a different path. The last part of the path sets the default gender:

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

Put the other variants in `male.json` and `neutral.json` files next to it. Neutral entries match every gender. More than one entry can have the same identity. MCA then uses `chance` as the weight to choose between them. The normal texture is enough. You can also add matching `burnt` textures in MCA's matching clothing directory.
