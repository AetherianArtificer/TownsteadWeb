---
title: Voices & Cultures
description: Voice files give a culture its own way of speaking, and set how often its phrasing appears.
---

A voice is a set of parts and frames for one way of speaking. Every villager speaks with the common voice, `townstead:common`. A culture pack can add a voice for its culture. For example, a fisherfolk culture pack could add the voice `examplepack:fisherfolk`, with greetings such as "Fair tides!" and farewells such as "Calm water."

A villager uses the voice of their culture, then every voice that it extends, and always the common voice at the end. Parts from all these voices can fill the same slot. So a fisherfolk villager can say "Hey there!" from the common voice, or "Fair tides!" from their own.

## Which Voices a Villager Uses

For each line, Townstead makes the speaker's list of voices:

1. **Persona.** A villager who is a [Persona](/packs/personas/) uses the Persona's voice first. Its ID is the Persona's story ID, such as `townstead:persona/village_builder`. Write lines for a Persona with that ID in `voice`. A Persona voice needs no voice file.
2. **Culture.** A villager with a mixed culture has a share of each culture. For each line, Townstead picks one of these cultures at random, by share. A villager who is three parts fisherfolk and one part another culture uses the fisherfolk voice for about three lines in four. A villager with one culture always uses it.
3. **Subculture.** When no voice lists the culture, Townstead tries its parent culture, and then the parent's parent. When no culture in the chain has a voice, the villager uses the common voice.
4. **Extends.** Townstead adds every voice that the culture voice `extends`, and then the common voice.

The culture voice, not the Persona voice, sets `flavor` and `children`.

## File Location

```text
data/<namespace>/dialogue_voice/<name>.json
```

The file ID is the voice ID. Line files and frames name the voice with `voice`.

## Example

```json
{
  "schema": "townstead:dialogue_voice/v1",
  "cultures": ["examplepack:fisherfolk"],
  "extends": "townstead:common",
  "flavor": {
    "grief": 0.05,
    "ambient": 0.2,
    "social": 0.25,
    "humor": 0.25,
    "commerce": 0.4,
    "civic": 0.55,
    "intrigue": 0.55
  },
  "default_flavor": 0.2,
  "stage_flavor": { "child": 0.15 },
  "flatten": [
    { "context": ["mood:low", "need:hungry", "need:tired"], "max": 0.05 }
  ],
  "children": "simple"
}
```

## Fields

| Field | Required | Description |
| --- | --- | --- |
| `schema` | Yes | Must be `townstead:dialogue_voice/v1`. |
| `cultures` | No | Culture IDs that use this voice. A villager uses the first voice that lists their culture. A subculture that no voice lists uses its parent's voice. |
| `extends` | No | A voice to add after this one. The default is `townstead:common`. A chain of voices cannot loop. |
| `flavor` | No | A map from [register](/conversations/topics/#registers) to the share of lines with a marked part, from 0 to 1. |
| `default_flavor` | No | The share for registers that `flavor` does not list, from 0 to 1. The default is 0.2. |
| `stage_flavor` | No | A map from life stage, or life stage ID, to a share from 0 to 1. It replaces the register share for speakers at that stage. |
| `flatten` | No | Rules that lower the share. Each rule has `context`, a list of [context facts](/conversations/state-and-requirements/#context-facts), and `max`, from 0 to 1. When the speaker has any of the facts, the share is at most `max`. |
| `children` | No | Which marked parts children can use: `simple` (the default), `all` or `none`. See [Children](#children). |
| `mods` | No | A [mod gate](/conversations/#mod-gates). |

The common voice needs no file.

## Marked Parts

A **marked** part uses the culture's own words or assumptions, such as "Haddra to you." or "You brought the boats in before the storm!" Mark it with `"marked": true`. An unmarked part in a culture voice speaks plain language with the culture's attitude.

The share in `flavor` is how often a line from this speaker has a marked part. Townstead keeps each speaker close to that share over a conversation:

- Each line adds the share to a running total for the speaker.
- When the total reaches 1, the next line tries to use a marked part, and the total goes down by 1.
- A line never has two marked parts.
- Two lines in a row with marked parts only happen when no plain part fits.

So with a share of 0.25, about one line in four has the culture's phrasing. With a share of 0.05 for `grief`, the culture's words rarely appear in grave news.

## Children

A child speaker can use marked parts as follows:

| `children` | Marked parts a child can use |
| --- | --- |
| `simple` | Parts with `"simple": true`, and parts with `stages`. |
| `all` | All marked parts. |
| `none` | No marked parts. |

Use `simple` for words a child would know, such as a greeting. Write lines just for children with `"stages": "child"`.

## Writing a Culture Voice

1. Make the voice file. List your culture in `cultures`.
2. Write line files with `"voice": "<your voice>"`. Use the pools that Townstead ships, so your lines fit the existing frames. See [Built-in Vocabulary](/conversations/vocabulary/#pools).
3. Mark the lines that use your culture's words with `"marked": true`.
4. Set `flavor` for each register. Use a low share for grave talk and a higher one for talk that suits your culture.
5. Test with a village of your culture. See [Testing](/conversations/testing/).

Guidelines for a culture voice:

- Write each line so that it works without the culture's word. One marked word is enough for one part.
- Show the culture through assumptions ("You brought the boats in before the storm!"). Do not explain the words.
- Give every question an answer. A question in your voice needs parts with the same `answers`, in your voice or in the common voice.
- A line that names a building needs a `requires` entry, such as `here.building_tag:townstead:market`.

A frame with `"voice": "<your voice>"` is only used by your speakers. Use it to give your culture its own line shapes.

:::note[Cultures change over time]
A villager with no culture gets one when they next load: from their parents, else from their home village, else from the culture bias of their Root, when it has one. A villager can keep the culture they have, but it does not stay fixed. Every day, their mix of cultures moves a little toward their home village, their close friends and, for a child, their parents. An adult takes about three years to move most of the way. A child moves four times as fast. The culture with the largest share becomes the villager's culture, and their voice changes with it.

So after you install a culture pack, existing villagers take time to speak with its voice. To test a voice now, make a new village. See [Test a Culture](/conversations/testing/#4-test-a-culture).
:::

## Building Talk

An [extended building](/packs/buildings/) file can have a `talk` block. It gives the building talk tags, so lines can require that the village has such a building.

```json
{
  "talk": {
    "name": { "translate": "building.examplepack.bakery.talk_name" },
    "tags": ["townstead:bakery", "townstead:food_shop"],
    "interests": { "food": 0.6 }
  }
}
```

| Field | Description |
| --- | --- |
| `tags` | Talk tags for this building type. The requirement `here.building_tag:<tag>` is true when the village the speaker is in has a building with the tag. `home.building_tag:<tag>` checks the speaker's home village. |
| `name` | A name for the building in conversation, as a string or `{"translate": "<key>"}`. Accepted. Townstead does not use it yet. |
| `interests` | A map from interest to a weight from 0 to 1. Accepted, but not used yet. |

Townstead gives these talk tags to its buildings:

| Tag | Buildings |
| --- | --- |
| `townstead:market` | Market |
| `townstead:mill` | Mill |
| `townstead:tavern` | Inn, and the taverns, taprooms and brew halls from supported mods |
| `townstead:smithy` | Blacksmith, armorer, toolsmith and weaponsmith |
| `townstead:cafe` | The cafes and tea houses from supported mods |

A well is a decoration, not a building. Lines about a well require `here.decoration:townstead:well`.

:::caution
No building or decoration has the tags `townstead:bridge`, `townstead:orchard` or `townstead:quest_board` yet. Lines that require them only appear when a pack gives a building those tags.
:::
