---
title: Encounters
description: Encounter files, the shape of a whole conversation from greeting to goodbye.
---

An encounter is the shape of a whole meeting between two villagers. It sets how they greet, how many topics they can talk about, how talkative they are, when they pause, and how they say goodbye.

Townstead has two contexts:

| Context | When |
| --- | --- |
| `idle` | Two idle villagers meet in the street. |
| `hangout` | Two villagers are at the same [hangout](/guides/hangouts/). The talk lasts until one of them leaves. |

Townstead uses one encounter for each context: the first file for that context, sorted by ID. To change an encounter, replace `townstead:idle` or `townstead:hangout` with a file at the same path.

## File Location

```text
data/<namespace>/conversation_encounter/<name>.json
```

## Example

The idle encounter that Townstead ships, shortened:

```json
{
  "schema": "townstead:conversation_encounter/v1",
  "context": "idle",
  "opening": [
    { "sequence": ["townstead:greet", "townstead:greet_back"], "weight": 0.6 },
    { "sequence": ["townstead:greet"], "weight": 0.15 },
    { "sequence": [], "weight": 0.25 }
  ],
  "opening_again": [
    { "sequence": ["townstead:light_greet"], "weight": 0.4 },
    { "sequence": [], "weight": 0.6 }
  ],
  "topics": { "min": 1, "max": 4 },
  "chattiness": {
    "base": 0.2,
    "per_familiarity": 0.02,
    "max_familiarity": 10,
    "personality": { "upbeat": 0.15, "extroverted": 0.15, "shy": -0.15, "grumpy": -0.1 }
  },
  "expansions": { "max": 2 },
  "bridge_pool": "townstead:bridge",
  "closing": [
    {
      "sequence": ["townstead:pre_close", "townstead:farewell_reply", "townstead:farewell_last"],
      "weight": 1, "min_lines": 6, "min_interest": 0.3
    },
    { "sequence": ["townstead:close"], "weight": 0.6, "max_interest": 0.5 },
    { "sequence": [], "weight": 0.4, "max_interest": 0.2 }
  ]
}
```

## Fields

| Field | Required | Description |
| --- | --- | --- |
| `schema` | Yes | Must be `townstead:conversation_encounter/v1`. |
| `context` | Yes | `idle` or `hangout`. |
| `opening` | Yes | [Sequences](#sequences) of opening moves. Townstead picks one by weight. |
| `opening_again` | No | Sequences for two villagers who already greeted each other today. With no `opening_again`, Townstead uses `opening`. |
| `topics` | No | `min`, `max` and `until`. See [Topics](#topics). |
| `chattiness` | No | How talkative the pair is. See [Chattiness](#chattiness). |
| `expansions` | No | `{"max": <n>}`: the most [expansions](/conversations/topics/#expansions) after each topic. The default is 2. |
| `bridge_pool` | No | A pool that joins one topic to the next, such as "Anyway." Townstead puts one part from it near the start of the first line of every topic after the first. It goes after an answer or a reply, if the line has one. |
| `pause` | No | Quiet moments at a hangout. See [Pauses](#pauses). |
| `closing` | Yes | Sequences of closing moves. See [Closing](#closing). |
| `mods` | No | A [mod gate](/conversations/#mod-gates). |

## Sequences

A sequence is a list of moves that the two villagers take in turn. The first villager speaks the first move, the other speaks the second, and so on. An empty sequence is allowed: a conversation can start without a greeting, or end with no goodbye.

| Field | Description |
| --- | --- |
| `sequence` | Move IDs. |
| `weight` | How likely the sequence is, compared with the others. More than 0 and at most 100. The default is 1. |
| `min_lines` | For a closing: the conversation must have at least this many lines. The default is 0. |
| `max_lines` | For a closing: the conversation must have at most this many lines. Leave it out for no maximum. |
| `min_interest`, `max_interest` | For a closing: the interest of the less interested villager must be in this range, from 0 to 1. The defaults are 0 and 1. |

## Topics

| Field | Description |
| --- | --- |
| `min` | The fewest topics before an idle chat can end on low interest. The default is 1. |
| `max` | The most topics. The default is 3, or 64 with `until`. |
| `until` | `"departure"`: at a hangout, keep talking until a villager leaves. |

Townstead also has hard limits: 28 lines for an idle chat and 90 lines at a hangout. It also stops looking for a new topic after 4 failed tries in a row.

## Chattiness

Chattiness is how interested the villagers are at the start. It is between 0.05 and 0.9:

```text
base + per_familiarity × min(meetings, max_familiarity) + personality
```

| Field | Description |
| --- | --- |
| `base` | The start value, from 0 to 1. The default is 0.3. |
| `per_familiarity` | Added for each earlier meeting of the pair, from 0 to 1. The default is 0.02. |
| `max_familiarity` | The most meetings that count. The default is 10. |
| `personality` | A map from MCA personality to a change, from -1 to 1. For the pair, Townstead uses the average of the two villagers. |

Each villager's starting interest is their own chattiness, changed by affection toward the other villager (up to ±0.2) and by a low mood (-0.1). A fever also lowers it. Townstead then adds 0.25 and some randomness. See [Interest](/conversations/selection/#interest).

## Pauses

At a hangout, villagers can go quiet for a moment between topics.

| Field | Description |
| --- | --- |
| `chance` | The chance of a pause before a new topic, from 0 to 1. When interest is below 0.3, Townstead adds 0.4. |
| `remark_chance` | From 0 to 1. Accepted, but not used yet. Townstead plans to use it for a remark during the pause. |
| `remark_move` | A move ID, such as `townstead:remark`. Accepted, but not used yet. |

A pause lasts 5 to 15 seconds. It raises both villagers' interest by 0.12. There is never a pause while a question is open, or two pauses in a row.

## Closing

When a conversation ends, Townstead picks a closing sequence:

1. It takes the sequences whose `min_lines`, `max_lines`, `min_interest` and `max_interest` all fit.
2. When none fit, it takes the sequences whose line counts fit.
3. When none fit, it takes all sequences.

After a single line, such as a lone "Hi!", Townstead does not use an empty closing. The other villager at least says goodbye.

At a hangout, the villager who is leaving speaks first when it is their turn. Otherwise they speak first 15% of the time.

## When a Conversation Ends

- **Idle.** After the first topic, before each new topic, Townstead ends the chat with a chance of `1 - interest`, where `interest` is the less interested villager's. With interest below 0.12, a greeting can be the whole conversation.
- **Hangout.** The talk goes on until a villager's visit ends. Low interest brings pauses instead of goodbyes.
- **Both.** The talk also ends at `topics.max`, at the line limit, or when no topic is left.

A villager who falls asleep, panics, is attacked, walks out of range, or starts talking to a player leaves the conversation.
