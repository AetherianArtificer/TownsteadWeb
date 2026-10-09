---
title: Subjects
description: Subject files, the things villagers can talk about, and the sources that read them from the game.
---

A subject is a thing to talk about. A subject file names a **source**. When a topic is about to start, Townstead asks the source for live **instances** for the speaker and the listener. For example, the weather source gives one instance with the variant `rain` while it rains.

Each instance has:

| Part | Description | Used by lines through |
| --- | --- | --- |
| Variant | A word for the kind of instance, such as `rain`, `hungry` or `marriage`. | `variants` |
| Valence | `positive`, `negative` or `neutral`. | `valence` |
| Slots | Named values for the text, such as `{who}` or `{biome}`. A person slot also holds the ID of that person. | Placeholders, `persp` |
| Provenance | How the speaker knows: `witnessed`, `heard`, and `shared` when the listener already knows. | `provenance` |
| Urgency | How much the speaker wants to raise it, from -1 to 1. | Topic choice. See [Goals](/conversations/selection/#goals). |

## File Location

```text
data/<namespace>/conversation_subject/<name>.json
```

The file ID is the subject ID. Topics, frames and lines name subjects by ID. A line can write `"subjects": "weather"` for `townstead:weather`.

## Example

```json
{
  "schema": "townstead:conversation_subject/v1",
  "source": { "type": "townstead:mob_sighting" },
  "register": "social",
  "slots": {
    "mob": { "type": "text", "from": "mob.name" },
    "a_mob": { "type": "text", "from": "mob.name_with_article" },
    "who": { "type": "person", "from": "mob.witness", "required": false }
  },
  "valence": "negative"
}
```

## Subject Fields

| Field | Required | Description |
| --- | --- | --- |
| `schema` | Yes | Must be `townstead:conversation_subject/v1`. |
| `source` | Yes | An object with `type`, the [source type](#source-types), and any settings of that source. |
| `register` | No | The register of lines about this subject. It replaces the topic's register. The default is `ambient`. |
| `requires` | No | [Requirements](/conversations/state-and-requirements/#requirements) that must all be true for the speaker. |
| Gate fields | No | `context`, `relationship`, `personality_weights`, `relationship_weights`, `when`, `evaluation`. A gate of 0 hides the subject. See [Gates](/conversations/topics/#gates). |
| `symmetric` | No | Two or more slot names for roles that can swap, such as the two people in an argument. When the speaker or listener is in one of these roles, Townstead moves them into the first one. Lines then only need to handle the first role. |
| `slots` | No | A description of each slot: `type`, `from`, and `required`. Types are `person`, `place`, `organization`, `profession`, `item`, `title`, `topic_phrase`, `time_ago`, `amount` and `text`. The name `self` is reserved. Townstead checks the types, but the source sets which slots an instance has. |
| `valence` | No | `positive`, `negative`, `neutral` or `from_source`. Accepted. The source sets the valence of each instance. |
| `weight`, `interests`, `content_tags` | No | Accepted, but not used yet. |
| `mods` | No | A [mod gate](/conversations/#mod-gates). |

## Source Types

A data pack can use these sources. A new source needs code: a mod can register one with `SubjectSources.register`.

### `townstead:weather`

The weather at the speaker's position. One instance, `neutral`, with no slots.

| Variant | When |
| --- | --- |
| `thunder` | A thunderstorm. |
| `snow` | Rain where it is cold enough to snow. |
| `rain` | Rain. |
| `clear` | No rain. |

### `townstead:biome`

The biome at the speaker's position. One instance, `neutral`, with the slot `{biome}`.

- The English text is "the" and the biome name, such as "the plains" or "the dark forest".
- The slot has the fact `number`: `plural` for biomes such as plains, badlands and peaks, and `singular` for all others. Use it in [selectors](/conversations/text/#word-forms).
- Translations come from `townstead.biome_phrase.<namespace>.<path>`. See [Translations](/conversations/translations/#slot-values).
- To write a line for one kind of biome, use the requirement `here.biome_tag:<tag>`, such as `here.biome_tag:c:is_desert`.

### `townstead:chronicle_account`

Stories from the [Chronicle](/guides/chronicles/) that the speaker believes. This is how news and gossip get into conversations. The source settings map Chronicle event templates to subject variants.

```json
"source": {
  "type": "townstead:chronicle_account",
  "max_age_days": 14,
  "min_fidelity": 0.2,
  "events": {
    "townstead:wedding": {
      "variant": "marriage",
      "valence": "positive",
      "roles": { "who": "partner", "other2": "spouse" }
    },
    "townstead:zombie_bite": {
      "variant": "bitten",
      "valence": "negative",
      "roles": { "who": "bitten" },
      "while_infected": true
    }
  }
},
"symmetric": ["who", "other2"]
```

| Setting | Description |
| --- | --- |
| `events` | A map from Chronicle event template ID to a mapping. Stories from other templates are ignored. |
| `events.<id>.variant` | The variant of the instance. |
| `events.<id>.valence` | `positive`, `negative` or `neutral`. The default is `neutral`. |
| `events.<id>.roles` | A map from slot name to a role of the Chronicle event. Each slot is a person slot. |
| `events.<id>.while_infected` | When `true`, the story goes stale once the person in it is no longer infected. Townstead checks villagers that are loaded. |
| `max_age_days` | Stories older than this many days are ignored. The default is 14. |
| `min_fidelity` | Stories that the speaker believes less than this, from 0 to 1, are ignored. The default is 0. |

How instances work:

- The speaker uses the names they believe. A distorted story can have the wrong name.
- A story about both the speaker and the listener is skipped.
- Provenance is `witnessed` when the speaker took part in the event, else `heard`. It also has `shared` when the listener knows the story or took part in it.
- Urgency is -0.3 for a `shared` story. For a story the speaker learned in the last day, it is `0.6 × fidelity + 0.2`. For older stories it is 0.
- When a line with the `spreads` move tells the story, the listener learns it.

Townstead ships two subjects with this source: `townstead:event` (arguments, masteries and weddings) and `townstead:infection_news` (bites, cures and villagers who turned).

### `townstead:general`

One instance, `neutral`, with no variant and no slots. Use it for a topic that is always available, such as jokes.

### `townstead:venue`

One instance, `neutral`, while the speaker is at a [hangout](/guides/hangouts/). Use the state key `venue` and the `venue.*` [requirements](/conversations/state-and-requirements/#requirements) to write lines for kinds of venue.

### `townstead:need`

The speaker's most pressing need. One instance, `negative`, with no slots.

| Variant | Need bands | Urgency |
| --- | --- | --- |
| `hungry` | hungry, famished | 0.4, 0.8 |
| `thirsty` | thirsty, parched | 0.4, 0.8 |
| `tired` | tired, drowsy | 0.4, 0.8 |
| `cold` | cold, freezing | 0.8, 1.0 |
| `hot` | hot, sweltering | 0.8, 1.0 |

Only enabled needs count. A villager only mentions cold or heat when it is strong: chilly and warm are left out.

### `townstead:mob_sighting`

Hostile mobs that villagers in the speaker's village saw today or in the two days before. There is one instance for each sighting, `negative`.

| Slot | Value |
| --- | --- |
| `{mob}` | The mob's name, in lowercase, such as "zombie". |
| `{a_mob}` | The name with an article, such as "a zombie" or "an enderman". |
| `{who}` | The witness, as a person slot. |

- When a villager looks for someone to talk to, Townstead records the nearest hostile mob that the villager can see within 24 blocks.
- A villager that takes the place of a wild mob counts as that mob. The sighting uses the mob's name.
- Townstead keeps at most one sighting of each mob type for each village each day, and at most 8 sightings for each village.
- A speaker does not tell the witness about their own sighting.
- Provenance is `witnessed` for the witness, else `heard`.
- Urgency is 0.9 for a sighting today and 0.5 for an older one.
- The subject file also names a `{where}` slot. Townstead does not fill it yet, so lines that use `{where}` do not appear.

### `townstead:company`

A friend that the speaker wants to spend time with. One instance, `positive`, when the speaker's affection toward the listener is 10 or more.

| Variant | Affection |
| --- | --- |
| `friend` | 10 to 24 |
| `close` | 25 or more |

Urgency is `affection / 50`, at most 0.8.

### `townstead:infection`

A zombie infection that the speaker can talk about now. Each instance is `negative`, with the person slot `{who}` and the provenance `witnessed`.

| Instance | Variant | Urgency |
| --- | --- | --- |
| The speaker was bitten, and has no fever yet. | `bitten` | 0.6 |
| The speaker has a fever. | `fever` | 0.8 |
| The listener has a fever. | `fever` | 0.9 |

- MCA infection progress goes from 0 to 1. The fever starts at 0.2. After 0.6, MCA turns the villager's speech into babble, so the source gives nothing.
- A crabby, grumpy, greedy, shy, introverted or confident villager keeps a fresh bite to themselves. They only talk about it once the fever shows.
- Use `"persp": {"who": "me"}` for lines about the speaker's own infection, and `"persp": {"who": "you"}` for lines about the listener's.

### `townstead:aspect_neighbor`

A villager who has an entity state, such as a transformation that a supported mod adds. One instance, with the person slot `{who}` and the provenance `witnessed`.

```json
"source": {
  "type": "townstead:aspect_neighbor",
  "state": "examplepack:werebear",
  "group": "werebear"
},
"valence": "from_source",
"slots": {
  "who": { "type": "person", "from": "neighbor.who" }
}
```

| Setting | Description |
| --- | --- |
| `state` | The entity state ID. Required. When no entity state has this ID, the source gives nothing. |
| `group` | A disposition group. When one of the speaker's factions welcomes this group, the speaker talks about the neighbour warmly. |

| Variant | When | Valence | Urgency |
| --- | --- | --- | --- |
| `listener` | The listener has the state. | `neutral` | 0.5 |
| `welcomed` | Another resident of the speaker's home village has the state, and a faction of the speaker welcomes `group`. | `positive` | 0.4 |
| `wary` | Another resident of the speaker's home village has the state, and no faction of the speaker welcomes `group`. | `negative` | 0.4 |

- A speaker who has the state does not use this source.
- For `welcomed` and `wary`, `{who}` is the nearest resident who has the state. Townstead checks residents that are loaded.
- Use `"persp": {"who": "you"}` for `listener` lines.

To talk about a state that the speaker has, use the `townstead:general` source with a `when` gate on the subject. See [Gates](/conversations/topics/#gates).

### Sources with No Data Yet

These sources exist, but give no instances yet. Townstead ships subjects and lines for them, so the talk starts when the game systems exist.

| Source | Planned subject |
| --- | --- |
| `townstead:quest_board` | Jobs on the quest board. Slots `{quest}` and `{quest_title}`. |
| `townstead:project` | Village building projects. Slot `{project}`. |
| `townstead:realm_rumour` | Rumours about rulers. Slots `{ruler}` and `{heir}`. |

## Subject Tags

A subject tag groups subjects, so a topic, frame or line can name them all at once with `#`.

```text
data/<namespace>/tags/conversation_subject/<name>.json
```

```json
{ "values": ["townstead:event", "townstead:infection_news"] }
```

Use it as `"subjects": ["#examplepack:news"]`. Tags with the same ID from several packs add their values together.
