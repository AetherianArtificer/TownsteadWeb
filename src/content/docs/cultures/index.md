---
title: How Cultures Work
description: What a culture is in Townstead, how villagers and villages get one, and which data files control cultures.
---

A culture is the way of life of a community. It sets how its people are named, what its towns and factions are called, how its people dress, and how they speak in [conversations](/conversations/voices/).

This section is for pack authors. For the player's view, see [Cultures](/guides/cultures/).

A culture belongs to a community, not to a species. An elf, a human and a dwarf who grow up in the same town share that town's culture. A [Root](/roots/) only affects the culture of a villager who has no parents and no home village. See [Founder Bias](/cultures/founder-bias/).

## What a Culture Controls

| Part | What it does | Page |
| --- | --- | --- |
| Name | The name that players see for the culture. | [Culture Files](/cultures/culture-files/) |
| Demonym | What its people are called, such as "Highlander". | [Culture Files](/cultures/culture-files/#demonym) |
| Naming tradition | How its people get given names and family names. | [Personal Names](/cultures/naming/) |
| Settlement and faction names | Names for its towns and its governments. | [Settlement & Faction Names](/cultures/settlement-names/) |
| Clothing | Which skins and clothes its people prefer, and its default livery. | [Clothing](/cultures/clothing/) |
| Subcultures | Peoples inside the culture, tied to Community Spirit and forms of government. | [Subcultures](/cultures/subcultures/) |
| Voice | How its people speak in conversations. A voice is a separate file. | [Voices & Cultures](/conversations/voices/) |

## Where a Villager's Culture Comes From

A villager with no culture gets one when they next load. Townstead tries these sources in order:

1. **Parents.** The culture of a parent who has one.
2. **Home village.** The culture of the villager's home village.
3. **Founder roll.** A villager with neither gets a culture from the `cultural_spawn_bias` of their Root. A Root with no bias gives no culture. See [Founder Bias](/cultures/founder-bias/).

When no source gives a culture, the villager has no culture. This is normal. In a world with no culture packs, no villager has a culture, and villagers are named by their region as before. The game shows such a villager as "Village Common".

A culture is not fixed. Each villager has a mix of cultures that moves a little every day toward the people around them. See [Mixed Cultures & Drift](/cultures/mixed-cultures/).

## Where a Village's Culture Comes From

A village gets a culture in one of these ways:

- **The first founder.** When a villager gets a culture from a founder roll, and their home village has no culture yet, the village takes that culture.
- **A founding profile.** A [founding profile](/cultures/culture-packs/#founding-profiles) names a culture. When a village is founded with that profile, the village takes the culture. A profile can apply on its own, from `/townstead founding apply`, or from a debug village.
- **A command.** `/townstead naming set-village "<culture>"` sets the culture of the village you are in.

A village's culture only applies to villagers who get a culture after the change. Residents keep the culture they have, and then drift toward the village over time.

## Players See the Top Culture

A [subculture](/cultures/subcultures/) is a people inside a culture, such as the merchant houses of a culture. Players only see the top culture. Townstead uses subcultures for clothing, voices and government forms.

## World Settings

The Switchboard controls cultures for each world:

| Setting | Effect |
| --- | --- |
| **Systems > Cultures** | Turns cultures on or off. When it is off, villagers do not get a culture. |
| **Peoples** dial | Must be at **Roots and Cultures** to use the **Cultures** tab. |
| **Cultures** tab | For each top culture: whether founders can be raised in it, and a rate. The rate multiplies the culture's weight in founder rolls. |

The **Cultures** tab only affects founder rolls. A villager can still get a turned-off culture from their parents or their village. Subcultures follow the setting of their top culture.

## Data Files

All files are JSON in a data pack. Files work on 1.20.1 and 1.21.1.

| Folder | Page | What it holds |
| --- | --- | --- |
| `data/<ns>/culture/` | [Culture Files](/cultures/culture-files/) | Cultures and subcultures. |
| `data/<ns>/naming_tradition/` | [Personal Names](/cultures/naming/#naming-tradition-files) | Naming traditions that cultures can share. |
| `data/<ns>/given_name/` | [Personal Names](/cultures/naming/#given-name-lists) | Given-name lists. |
| `data/<ns>/family_name/` | [Personal Names](/cultures/naming/#family-name-lists) | Family-name lists. |
| `data/<ns>/settlement_name/` | [Settlement & Faction Names](/cultures/settlement-names/) | Names for towns. |
| `data/<ns>/faction_name/` | [Settlement & Faction Names](/cultures/settlement-names/#faction-names) | Base names for factions. |
| `data/<ns>/lang/<locale>.json` | [Culture Files](/cultures/culture-files/#translations) | Translations of names and demonyms. |

A culture pack usually also has founding profiles, factions, offices, livery styles and a dialogue voice. See [Building a Culture Pack](/cultures/culture-packs/).

## Where to Start

- To make a culture, start with [Culture Files](/cultures/culture-files/). One file with a name and a naming block is a complete culture.
- To make founders of a Root belong to your culture, add a [founder bias](/cultures/founder-bias/).
- To see your culture in game, see [Testing & Commands](/cultures/testing/).
