---
title: Building a Culture Pack
description: The files that a complete culture pack contains, and the order to make them in.
---

A culture file alone is a complete culture. A full culture pack also gives the culture towns, governments, a livery and a voice.

## Files in a Culture Pack

| Folder | What it adds | Reference |
| --- | --- | --- |
| `culture/` | The culture and its subcultures. | [Culture Files](/cultures/culture-files/), [Subcultures](/cultures/subcultures/) |
| `given_name/`, `family_name/` | Personal names. | [Personal Names](/cultures/naming/) |
| `settlement_name/`, `faction_name/` | Names for towns and factions. | [Settlement & Faction Names](/cultures/settlement-names/) |
| `founding_profile/` | How the culture's towns are founded, one profile for each form of government. | [Founding Profiles](#founding-profiles) |
| `faction/` | Faction kinds: forms of government, with their offices and name patterns. | Not documented yet. |
| `bond/` | The offices that a faction kind fills. | Not documented yet. |
| `livery_style/` | Livery that the culture's people wear over their gear. | Not documented yet. |
| `dialogue_voice/`, `dialogue_line/` | How the culture speaks in conversations. | [Voices & Cultures](/conversations/voices/) |
| `lang/` | Translations of names, demonyms and lines. | [Translations](/conversations/translations/) |

All folders are under `data/<namespace>/`. Use one namespace for the whole pack.

A Root pack can then make its founders favour the culture with a [founder bias](/cultures/founder-bias/). Keep the bias in the Root pack, or in a small compatibility pack, so the culture pack works without that Root.

## Founding Profiles

A founding profile says how a town of the culture starts: its culture, where it is likely, which Roots settle it, and its government.

```text
data/<namespace>/founding_profile/<name>.json
```

```json
{
  "schema": "townstead:founding_profile/v1",
  "name": { "translate": "founding_profile.examplepack.harbour_guild" },
  "culture": "examplepack:fisherfolk",
  "weight": 1,
  "spawn_bias": {
    "default": 0.2,
    "biome_tags": { "#minecraft:is_beach": 3 }
  },
  "population": { "outsider_baseline": 0.25 }
}
```

| Field | Description |
| --- | --- |
| `name` | The name that players see. |
| `culture` | The culture of towns founded with this profile. With subcultures, see [Founding a Village](/cultures/subcultures/#founding-a-village). |
| `weight` | How likely the profile is when a village is founded on its own. The default is 1. |
| `spawn_bias` | Place weights, in the same format as a [Root spawn bias](/roots/spawn-bias/). |
| `population` | Which Roots settle the town. See [Which Roots Settle a Village](/cultures/founder-bias/#which-roots-settle-a-village). |
| `faction` | The faction kind and the offices it fills. |
| `when` | A [Pheno condition](/pheno/conditions/) on a resident. The profile is only used when it is true. |

When a village is founded with the profile, Townstead:

1. sets the village's culture;
2. names the village from the culture's [settlement names](/cultures/settlement-names/);
3. creates its faction, named from the culture's [faction names](/cultures/settlement-names/#faction-names).

## Order of Work

1. Write the culture file with a name and a `naming` block. Test it with a debug village.
2. Add a demonym, settlement names and faction names.
3. Add founding profiles, one for each form of government.
4. Add subcultures, with `spirit` and `forms`, when the culture has distinct peoples.
5. Add clothing and a livery.
6. Add a voice and lines. See [Writing a Culture Voice](/conversations/voices/#writing-a-culture-voice).
7. Add translations.

See [Testing & Commands](/cultures/testing/) for how to check each step.
