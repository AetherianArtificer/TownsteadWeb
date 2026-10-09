---
title: State & Requirements
description: "The conditions a line can check: requirements about the world, conversation state, and context facts."
---

A line can check three kinds of condition:

| Condition | Field | Checks |
| --- | --- | --- |
| [Requirements](#requirements) | `requires` | The world: buildings, biome, venue, time, installed mods. |
| [State conditions](#state-conditions) | `state` | What this conversation has said so far. |
| [Context facts](#context-facts) | Gate `context` | Facts about the speaker and the pair: time, weather, needs, culture, mood. |

Topics and subjects accept `requires` and gates too.

## Requirements

`requires` is a list of entries. A line is only used when every entry is true. Put `!` in front of an entry to require the opposite.

```json
"requires": ["venue.amenity:seating", "!time:night"]
```

| Entry | True when |
| --- | --- |
| `here.building:<type>` | The village the speaker is in has a building of this MCA building type. |
| `here.building_tag:<tag>` | The village the speaker is in has a building with this talk tag. See [Building Talk](/conversations/voices/#building-talk). |
| `home.building_tag:<tag>` | The speaker's home village has a building with this talk tag. |
| `here.decoration:<id>` | The village the speaker is in has a decoration of this type, such as `townstead:well`. Townstead looks in the village area and 16 blocks past it. |
| `subject.building:<type>`, `subject.building_tag:<tag>`, `subject.decoration:<id>` | For now, the same as the `here.` forms. |
| `here.biome_tag:<tag>` | The speaker stands in a biome with this tag, such as `c:is_desert` or `minecraft:is_forest`. |
| `venue.amenity:<name>` | The speaker is at a hangout venue with this amenity: `seating`, `food`, `drink`, `water`, `shade`, `shelter`, `market`, `conversation`, and others that venue files name. |
| `venue.tag:<tag>` | The speaker is at a hangout venue with this tag. Write the full tag, such as `townstead_hangouts:outdoors`, or only its path, such as `outdoors`. |
| `time:day`, `time:night` | Night is from dusk to dawn, ticks 12500 to 23500. |
| `mod:<id>` | This mod is installed. |

Any other entry is false. For example, `realm.member` is false until realms exist, so the ruler rumours that require it do not appear yet.

### Venue and Time Lines

[Hangouts](/guides/hangouts/) start in the afternoon, and many venues are outdoors, where villagers stand. Give requirements to any line that assumes a place or a time:

| The line talks about | Add |
| --- | --- |
| Sitting, a seat, a chair | `venue.amenity:seating` |
| A drink, a cup, ordering | `venue.amenity:drink` |
| Food at the venue | `venue.amenity:food` |
| Being "in here", or cosy | `!venue.tag:townstead_hangouts:outdoors` |
| Fresh air, the sky | `venue.tag:townstead_hangouts:outdoors` |
| A loud crowd, singing | `!venue.tag:townstead_hangouts:quiet` |
| "Tonight", "this evening", bed | `time:night` |
| "Back to work", "this afternoon" | `time:day` |

## State Conditions

The conversation state is a set of keys and values. Townstead writes some keys as the conversation goes. Parts can write others with `sets`.

`state` is a map from key to a value, or to a list of values:

```json
"state": { "stance": "-" }
"state": { "form": ["claim", "quality"] }
"state": { "after": "!grief" }
"state": { "is_initiator": false }
```

- With one value or a list, the key must have one of the values.
- When every value starts with `!`, the key must have none of them. A missing key is fine.
- Booleans and numbers are compared as text: `true` matches `"true"`.

### Keys That Townstead Writes

| Key | Value |
| --- | --- |
| `stance` | The stance of the last part that had one: `+`, `-` or `0`. |
| `form` | The form of the last statement: `claim`, `quality`, `story`, `musing`, and others. |
| `thread` | The thread of the last part that had one. |
| `mood` | `warm`, `tense` or `flat`. Missing when the mood is ordinary. See [Mood](/conversations/selection/#mood). |
| `after` | The register of the topic the conversation just left, such as `grief`. Missing in the first topic. |
| `assoc` | `true` when this topic's subject is associated with the last one. See [`associated`](/conversations/topics/#topic-fields). |
| `venue` | At a hangout: `tavern`, `cafe` or `outdoors`. See [below](#venue-kinds). |
| `pending` | The open question, if any. |
| `answered` | The question that the current line answered. |
| `lines` | How many lines the conversation has had. `min_lines` uses it. |
| `expects`, `expects.by`, `expects.required` | The owed pair, who opened it, and whether it is required. |
| `revealed.<slot>` | `true` when a part already said this slot in the current topic. |
| `held.<speaker>.<thread>` | The stance a speaker took on a thread. |

Two keys come from outside the state:

| Key | Value |
| --- | --- |
| `variant` | The subject's variant. |
| `is_initiator` | `true` when the speaker started the current topic. |

When the conversation moves to a new subject, Townstead clears the state. It keeps `pending`, `lines`, `venue`, `mood` and an owed required reply, and then sets `after`.

### Venue Kinds

Townstead sets `venue` from the hangout venue:

| `venue` | When |
| --- | --- |
| `cafe` | The venue ID contains `cafe` or `tea`, or the venue has the tag `tea`. |
| `tavern` | The venue ID contains `tavern`, `bar` or `inn`, or the venue has the tag `drink`. |
| `outdoors` | Any other venue. |

For finer control, use the `venue.amenity` and `venue.tag` requirements.

### Writing State

`sets` writes keys when the part is spoken:

```json
"sets": { "tone": "funny" }
```

A later part in the same topic can check the key with `state`. Townstead's lines use these keys:

| Key | Values | Use |
| --- | --- | --- |
| `reaction` | `praise`, `groan` | A reaction to a joke. Praise raises the teller's interest by 0.12 and the praiser's by 0.05. A groan lowers them by 0.08 and 0.03. |
| `tone` | `funny` | Set by a funny anecdote, so a laugh can react to it. |
| `wish` | `true` | Set by a goodbye that wishes something, such as "Take care!", so the last goodbye can be "You too!" |

You can add your own keys. Do not write the keys that Townstead writes.

## Context Facts

Context facts describe the speaker and the pair when a line is built. Gates check them with `context`, and voices check them with `flatten`.

| Fact | When |
| --- | --- |
| `time:day`, `time:night` | Day or night in the world. |
| `weather:rain`, `weather:clear` | Rain or no rain. |
| `need:hungry`, `need:thirsty`, `need:tired` | The speaker has this need. |
| `mood:low`, `mood:content` | The speaker's MCA mood is below 0, or not. |
| `stage:<stage>`, `other_stage:<stage>` | The life stage of the speaker, or of the listener. |
| `profession:<id>` | The speaker's profession, both as the MCA profession ID and as the Townstead career ID. |
| `profession:shared` | Both villagers have the same profession. |
| `culture:<id>`, `other_culture:<id>` | The culture of the speaker, or of the listener. A subculture counts as its top parent culture. |
| `culture:shared` | Both villagers have the same top parent culture. |
| `hangout:present` | The speaker is at a hangout. |
| `venue:<id>` | The hangout venue's ID. |
| `venue_tag:<tag>` | A tag of the hangout venue. |
| `memory:<key>` | The speaker has a memory with this key about the listener, or the pair's last conversation left it. |
| `relationship:strained` | The speaker's affection toward the listener is -4 or lower. |
| `counterpart:present`, `counterpart:entity` | Always true in a conversation between villagers. |

### Relationship Tags

Gates check these with `relationship` and `relationship_weights`.

| Tag | When |
| --- | --- |
| `stranger` | The pair has not met before, and has no other tie. |
| `familiar` | The pair has met before. |
| `friend` | Affection 12 or more and at least 4 meetings, or a friendship bond. |
| `strained` | Affection -8 or lower. |
| `partner` | A marriage or partner bond. |
| `family` | A family, parent or sibling bond. |
| A bond kind | The kind of each active bond, with and without its namespace. |
| A descriptor | The ID and the tags of each matching relationship descriptor. |
