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
| `resident_states` | [Entity states](/pheno/entity-states/) that a share of the residents get. See [Resident States](#resident-states). |
| `when` | A [Pheno condition](/pheno/conditions/) on a resident. The profile is only used when it is true. |

When a village is founded with the profile, Townstead:

1. sets the village's culture;
2. names the village from the culture's [settlement names](/cultures/settlement-names/);
3. creates its faction, named from the culture's [faction names](/cultures/settlement-names/#faction-names).

### Resident States

`resident_states` gives a share of the town's residents an [entity state](/pheno/entity-states/), such as a curse or a form of service. Use it for a town where many people share a condition, for example a town of werebears and their servants.

```json
"resident_states": [
  { "state": "examplepack:werebear", "share": 0.6, "amount": [4, 8] },
  { "state": "examplepack:servant", "share": 0.75 }
]
```

| Field | Description |
| --- | --- |
| `state` | Required. The ID of the entity state. |
| `share` | Required. The chance that a resident gets the state, from 0 to 1. |
| `amount` | The value of the state. A number, or `[min, max]` for a random value in that range. Townstead rounds the value to a whole number. The default is 1. |

Each adult who comes to live in the town rolls once against each entry, in the order of the list, after the town has its faction. A villager born in the town does not roll. That villager gets states only from inheritance.

A state that [excludes](/pheno/entity-states/#state-files) another state cannot take hold on a resident who already has that state. In the example, if `examplepack:servant` excludes `examplepack:werebear`, a werebear never becomes a servant. Then 60% of the residents are werebears, 30% are servants, and 10% have neither state.

A resident who cannot have the state does not get it, for example a resident with a body that the state does not allow.

## Order of Work

1. Write the culture file with a name and a `naming` block. Test it with a debug village.
2. Add a demonym, settlement names and faction names.
3. Add founding profiles, one for each form of government.
4. Add subcultures, with `spirit` and `forms`, when the culture has distinct peoples.
5. Add clothing and a livery.
6. Add a voice and lines. See [Writing a Culture Voice](/conversations/voices/#writing-a-culture-voice).
7. Add translations.

See [Testing & Commands](/cultures/testing/) for how to check each step.
