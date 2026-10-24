---
title: How Conversations Work
description: How Townstead builds the conversations that villagers have with each other, and which data files control them.
---

Villagers talk to each other in the street and at [hangouts](/guides/hangouts/). Townstead builds each conversation line by line, from small pieces of text in data packs. The same two villagers rarely have the same conversation twice.

This section is for pack authors. It describes every data file that conversations use. For the player's view, see [Conversations & Dialogue](/guides/conversations/).

:::note
Villager-to-villager conversations only. The dialogue screen that opens when you talk to a villager uses dialogue palettes, which are a different system.
:::

## The Parts of a Conversation

A conversation has three layers.

1. **The encounter.** An encounter is the shape of a whole meeting: how it opens, how many topics it can have, when it pauses, and how it ends. Townstead has one encounter for chats in the street (`idle`) and one for [hangouts](/guides/hangouts/) (`hangout`).
2. **Topics.** A topic is one subject of talk, such as the weather, a piece of news, or a joke. A topic is a small graph of turns. Each turn names a **move**: what the speaker does, such as "open the subject", "agree", "ask for detail", or "console".
3. **Lines.** For each move, Townstead builds one line of text. A **frame** lists the **pools** that the line takes its parts from, in order. Each pool holds many short **parts**. A line is one to six parts joined together.

For example, a weather topic can go like this:

| Speaker | Move | Frame slots | Line |
| --- | --- | --- | --- |
| Aldo | `greet` | `greeting`, `greet_follow` | "Hey there! Busy day?" |
| Brina | `greet_back` | `greeting_return`, `@answer`, `greet_q_back` | "Hi, Aldo. Busy, but I like it. You?" |
| Aldo | `open_subject` | `weather_open`, `weather_remark` | "Phew. This rain won't quit." |
| Brina | `agree` | `agree_assess`, `weather_aside match` | "Tell me about it. The fields needed it, at least." |
| Aldo | `pre_close` | `pre_close` | "Well, I should get going." |
| Brina | `farewell_reply` | `farewell_reply` | "See you around!" |

Each part carries data about what it means: whether it asks a question, what it answers, its stance, and who it is about. Townstead uses this data to keep the conversation coherent. A question gets an answer, a joke gets a laugh or a groan, and a villager who agreed does not suddenly disagree about the same thing.

## Subjects

A **subject** is a thing to talk about, taken from the game when the topic starts. It can be the current weather, the biome, a Chronicle story the speaker believes, a need, a mob that someone saw, a friend to invite, or a zombie bite. A subject has a **variant** (such as `rain` or `snow`) and named **slots** (such as `{who}` or `{biome}`) that parts can put in their text.

Topics name the subjects they use. A topic with no available subject cannot start. For example, the mob topic only starts when someone in the village saw a hostile mob in the last two days.

## Voices

A **voice** is a set of parts for one culture. Every villager uses the common voice. A culture pack can add a voice with its own phrasing, such as "Fair tides!" and "Calm water." for a fisherfolk culture. A villager of that culture uses parts from both voices. The voice file sets how often the culture's own phrasing appears.

## Data Files

All files are JSON in a data pack. Files work on 1.20.1 and 1.21.1.

| Folder | Page | What it holds |
| --- | --- | --- |
| `data/<ns>/conversation/` | [Topics](/conversations/topics/) | Topics: graphs of turns. Set-piece topics with fixed text also live here. |
| `data/<ns>/conversation_move/` | [Moves & Pairs](/conversations/moves-and-pairs/) | Moves: what a speaker does in a turn. |
| `data/<ns>/conversation_pair/` | [Moves & Pairs](/conversations/moves-and-pairs/) | Pairs: a kind of line that expects a kind of reply. |
| `data/<ns>/conversation_subject/` | [Subjects](/conversations/subjects/) | Subjects and where their data comes from. |
| `data/<ns>/tags/conversation_subject/` | [Subjects](/conversations/subjects/#subject-tags) | Tags that group subjects. |
| `data/<ns>/conversation_encounter/` | [Encounters](/conversations/encounters/) | The shape of a whole meeting. |
| `data/<ns>/dialogue_frame/` | [Frames](/conversations/frames/) | Which pools build the line for a move. |
| `data/<ns>/dialogue_pool/` | [Pools & Line Files](/conversations/lines/) | Fields that every line of a pool shares. |
| `data/<ns>/dialogue_line/` | [Pools & Line Files](/conversations/lines/) | The parts, with their English text. |
| `data/<ns>/dialogue_voice/` | [Voices & Cultures](/conversations/voices/) | A culture's voice and how often its phrasing appears. |
| `data/<ns>/extended_buildings/` | [Voices & Cultures](/conversations/voices/#building-talk) | The `talk` block names buildings for conversation. |
| `data/<ns>/lang/<locale>.json` | [Translations](/conversations/translations/) | Translations of the parts. |

## Loading and Overrides

Townstead reads these files when data packs load, and again after `/reload`.

- A file with the same namespace and path as a file in a lower pack replaces that file. This is normal data pack behaviour.
- Files with different names add to each other. For example, two packs can both add lines to the `weather_remark` pool.
- A file with a `"mods"` field loads only when those mods are installed. See [Mod Gates](#mod-gates). Topic files do not accept `mods`.

Townstead checks the files as it loads them. A file with an error does not load, and the rest still load. The game log shows each problem and then a summary:

```txt
Conversation rejected: townstead:weather $.turns.t0: move: is required
Loaded 13 conversation topics (0 rejected)
Conversation data: dialogue_line townstead:common/joke rejected: lines.bad-id: ids use lowercase letters, digits and underscores
Loaded 37 moves, 13 subjects, 2 encounters, 73 frames, 2656 parts in 77 pools, 1 voices (0 diagnostics)
```

Topic files report as `Conversation rejected:`. All other conversation files report as `Conversation data:`. The numbers change with the packs you install. The counts of rejected topics and of diagnostics must be 0.

See [Testing](/conversations/testing/) for all the checks and for the tools that show conversations without waiting for them in game.

## Mod Gates

Every conversation file except a topic file accepts a `mods` field. The file loads only when the expression is true.

```json
"mods": "farmersdelight"
"mods": ["farmersdelight", "rusticdelight"]
"mods": {"any": ["chefsdelight", "vca"]}
"mods": {"not": "someconflict"}
"mods": {"all": ["farmersdelight", {"any": ["a", "b"]}], "not": "c"}
```

| Form | True when |
| --- | --- |
| A string | That mod is installed. |
| A list | Every entry is true. |
| `{"all": ...}` | Every entry is true. |
| `{"any": [...]}` | At least one entry is true. |
| `{"not": ...}` | The entry is false. |

An object can use `all`, `any` and `not` together. All of them must be true. A malformed expression stops the file from loading.

## Where to Start

- To add lines to the existing conversations, write a [line file](/conversations/lines/). This is the most common change.
- To give a culture its own way of speaking, add a [voice](/conversations/voices/).
- To add a new thing to talk about, you need a [subject](/conversations/subjects/) and a [topic](/conversations/topics/). A new subject source needs code, so a data pack can only use the [sources that Townstead has](/conversations/subjects/#source-types).
- The [Built-in Vocabulary](/conversations/vocabulary/) page lists every move, pair, pool and frame that Townstead ships.
