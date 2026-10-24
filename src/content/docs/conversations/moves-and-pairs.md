---
title: Moves & Pairs
description: Moves are what a speaker does in a turn. Pairs are kinds of lines that expect a kind of reply.
---

## Moves

A move is what a speaker does in one turn: greet, agree, ask for detail, tell a joke, say goodbye. A move has no text. [Frames](/conversations/frames/) say which pools build the line for a move, and [lines](/conversations/lines/) hold the text.

### File Location

```text
data/<namespace>/conversation_move/<name>.json
```

A file can hold one move, or many moves in a `moves` map. In a map, an ID without a namespace takes the file's namespace.

```json
{
  "schema": "townstead:conversation_move/v1",
  "moves": {
    "gossip": { "role": "topic" },
    "sigh": { "role": "pause" },
    "brag": { "role": "expansion", "initiator_only": true, "follow_up": "react_anecdote" }
  }
}
```

A file with one move uses the file ID as the move ID:

```json
{
  "schema": "townstead:conversation_move/v1",
  "role": "topic",
  "spreads": true
}
```

### Move Fields

| Field | Required | Description |
| --- | --- | --- |
| `schema` | Yes | Must be `townstead:conversation_move/v1`. |
| `role` | No | Where the move can appear. See [Roles](#roles). The default is `topic`. |
| `final` | No | `true` for the last line of a conversation. A final line cannot ask a question or open a required pair. The default is `true` for `closing` moves and `false` for all others. |
| `spreads` | No | `true` when the line tells a [Chronicle](/guides/chronicles/) story. The listener then learns the story, as with other gossip. The default is `false`. |
| `follow_up` | No | A move that always comes next, spoken by the other villager. For example, `anecdote` has the follow-up `react_anecdote`. |
| `initiator_only` | No | `true` when only the villager who started the topic can use this expansion. The default is `false`. |
| `gesture` | No | What the speaker does: `{"performance": "<clip>", "expression": "<cue>"}`. The default performance is `townstead:conversation_talk`. |
| `listener` | No | What the other villager does. The default performance is `townstead:conversation_listen`. |
| `subject` | No | `required`, `optional` or `none`. Accepted, but not used yet. |
| `mods` | No | A [mod gate](/conversations/#mod-gates). |

A turn's `gesture` and `listener` replace the move's.

### Roles

| Role | Where it appears |
| --- | --- |
| `opening` | In an encounter's `opening` or `opening_again` sequences. Greetings. |
| `topic` | In a topic's turns. |
| `expansion` | After a topic's last turn, from the topic's `expansions`. |
| `closing` | In an encounter's `closing` sequences. Goodbyes. |
| `pause` | For remarks during a pause at a hangout. Townstead does not use pause remarks yet. |

### Special Moves

Townstead uses three moves by name. Keep them if you replace the move files.

| Move | Use |
| --- | --- |
| `townstead:say` | A set-piece turn with fixed `lines`. |
| `townstead:answer` | The other villager answers an open question before the subject changes. |
| `townstead:acknowledge` | The other villager replies to a required pair before the subject changes, such as a laugh after a joke. |

Townstead adds an `answer` or `acknowledge` line when a question or a required pair is still open, and the next planned line would change the subject or give the same speaker two lines in a row.

## Pairs

A pair is a kind of line that expects a kind of reply. A complaint expects sympathy. A joke expects a laugh or a groan. An invitation expects a yes or a no.

A part that **opens** a pair sets what the other villager owes. The other villager's next line must start with a part that **responds** to that pair. A part opens a pair with `opens`, and responds with `responds`. See [Line Fields](/conversations/line-fields/#questions-and-pairs).

### File Location

```text
data/<namespace>/conversation_pair/<name>.json
```

A file can hold one pair, or many pairs in a `pairs` map.

```json
{
  "schema": "townstead:conversation_pair/v1",
  "pairs": {
    "complaint": { "uptake": "optional", "chance": 0.85 },
    "invitation": { "uptake": "required" },
    "opinion": { "uptake": "optional", "chance": 0 }
  }
}
```

### Pair Fields

| Field | Required | Description |
| --- | --- | --- |
| `schema` | Yes | Must be `townstead:conversation_pair/v1`. |
| `uptake` | No | `required` or `optional`. The default is `required`. |
| `chance` | No | For an optional pair, the chance from 0 to 1 that the other villager replies to it. The default is 0.5. A required pair always gets a reply. |
| `mods` | No | A [mod gate](/conversations/#mod-gates). |

### How a Reply Is Built

When a villager owes a reply to a pair, Townstead builds their next line in one of three ways:

1. When the frame's first slot is a pool with parts that respond to this pair, Townstead uses only those parts in that slot.
2. When the frame's first slot is a reply pool for a different pair, Townstead replaces it with a reply to the owed pair.
3. Otherwise, Townstead puts a reply part in front of the line.

For an optional pair, Townstead only adds the reply by `chance`. A goodbye never starts with an optional reply.

When a required reply cannot be built, Townstead cannot build the line, and that step of the conversation is skipped. When an optional reply cannot be built, Townstead leaves it out and builds the rest of the line.

A final line cannot open a required pair, because nobody can answer it.

### Checks

Townstead reports these problems when data loads:

- a part names a pair in `opens` or `responds` that no pair file defines;
- nothing in the common voice responds to a pair.

Every pair needs replies in the common voice, because every villager uses it.
