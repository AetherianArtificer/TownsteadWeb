---
title: How Lines Are Chosen
description: How Townstead picks parts, keeps conversations on one thread, and ends conversations.
---

This page explains how Townstead makes its choices, so you can predict what your lines do.

## Which Parts Are Eligible

For each slot, Townstead only uses parts that pass every check below.

| Check | The part is left out when |
| --- | --- |
| Voice | The part's voice is not one of the speaker's voices. |
| Speaker | `stages` or `personalities` do not match the speaker. |
| Children | The speaker is a child, the part is marked, and the voice's `children` rule does not allow it. |
| Subject | `subjects`, `variants`, `valence` or `provenance` do not match the subject. |
| Register | `registers` does not allow the line's register. |
| Length | The conversation has fewer lines than `min_lines`. |
| Final line | The line is the last one, and the part asks a question or opens a required pair. |
| State | A `state` condition is false. |
| Stance | The slot is `match` or `oppose`, and the part's stance does not fit. |
| Question | The part asks `about` a slot that was already said, or that the subject does not have. |
| Held stance | The part takes the other stance on a thread that the speaker already took a stance on. |
| Requirements | A `requires` entry is false. |
| Perspective | A `persp` slot is the wrong person, or was not yet said (without `introduces`). |
| Placeholders | The text names a slot that the subject does not have, names a demonym that the culture does not have, or names a person without `persp` who is the speaker or the listener. |
| Gate | The gate weight is 0. |
| Position | The part asks a question, and the slot is not the last. |
| Greeting | The part is a greeting, and the line already has one. |

When no part is eligible for a slot, Townstead cannot build the line.

## Weights

Townstead picks one eligible part at random, by score:

```text
score = weight × gate weight × (1 + 0.5 × specificity) × thread factor
```

### Specificity

A part written for a narrow moment is more likely than a general part, when both fit. Specificity counts the conditions that narrow the part:

- one each for `variants`, `stages`, `personalities`, `registers`, `valence`, `provenance`, `min_lines`, and a gate;
- one for each `state` key, each `requires` entry, and each `persp` slot.

So a part with a variant and one requirement scores 2 × as much as a general part with the same weight. General parts still appear, and they are the fallback when nothing narrower fits.

### Threads

A thread is a label for what a part is about, such as `weather.crops` or `weather.boots`. The part before the dot is the thread's root. After a part with a thread, the next parts prefer the same thread:

| The next part's thread | Factor |
| --- | --- |
| The same thread | × 5 |
| The same root, such as `weather.mud` after `weather.boots` | × 2.5 |
| A different root | × 0.5 |
| No thread | × 1 |

With this rule, a conversation stays on one point for a few lines, instead of jumping between points. Townstead's lines use the roots `weather`, `need`, `biome`, `venue`, `company` and `danger`.

A villager also keeps a stance on a thread. After "Rain is good for the crops." (`+`, `weather.crops`), the same villager does not say "The crops are ruined." (`-`, `weather.crops`) about the same subject.

### Recency

Townstead remembers which parts were used recently in each village, because a player hears everyone in the village. A used part is skipped until every eligible part of its pool was used. Then the pool starts again.

### Culture Phrasing

A speaker with a culture voice gets marked parts at the share that the voice sets. See [Marked Parts](/conversations/voices/#marked-parts).

## Goals

Villagers raise what matters to them. A subject instance has an urgency, and Townstead multiplies the topic's weight by `max(0.1, 1 + 3 × urgency)`:

| Goal | Source | Urgency |
| --- | --- | --- |
| Share fresh news | `chronicle_account` | `0.6 × fidelity + 0.2` for a story learned in the last day. -0.3 when the listener already knows it. |
| Complain about a need | `need` | 0.4 for a mild need, 0.8 for a strong one, 1.0 for freezing or sweltering. |
| Warn about danger | `mob_sighting` | 0.9 for a sighting today, 0.5 for an older one. |
| Seek company | `company` | `affection / 50`, at most 0.8. |
| Talk about an infection | `infection` | 0.6 for a fresh bite, 0.8 for a fever, 0.9 when the listener has a fever. |

A villager with fresh news is 2 to 3.4 times as likely to tell it, depending on how well they believe it. A villager does not repeat news the listener already knows, unless nothing else is available.

## Interest

Each villager has an interest in going on, from 0 to 1. Townstead uses interest to decide how long a conversation lasts.

At the start, a villager's interest is:

- their [chattiness](/conversations/encounters/#chattiness) with this partner,
- plus affection toward the partner divided by 60, from -0.2 to 0.2,
- minus 0.1 when their mood is low,
- plus the fever effect below,
- plus 0.25 and some randomness: more for idle chats, less at hangouts.

After each line:

| Event | Change |
| --- | --- |
| Every line | -0.035 for both in an idle chat, -0.012 at a hangout. |
| Two lines in a row with the same stance | +0.04 for both. |
| Two lines in a row with opposite stances | -0.05 for both. |
| A joke is praised | +0.12 for the teller, +0.05 for the listener. |
| A joke gets a groan | -0.08 for the teller, -0.03 for the listener. |
| A question is answered | +0.03 for the one who asked. |
| A pause at a hangout | +0.12 for both. |

The less interested villager sets the pace:

- In an idle chat, before each new topic after the first, the chance that the chat ends is `1 - interest`.
- The chance of an expansion is `interest`.
- With interest below 0.12 after the greeting, an idle chat can end with no topic at all.
- At a hangout, low interest brings pauses.

### Fever

A zombie infection with a fever changes interest:

| Villager | Change |
| --- | --- |
| The villager with the fever | -0.15 |
| A close friend of the sick villager (affection 30 or more) | +0.1 |
| An anxious, shy, introverted, sensitive, crabby or grumpy villager | -0.25 |
| Anyone else | -0.05 |

After a topic in the `grief` register, a humor topic is 10 × less likely for the rest of the conversation. A speaker with a fever is 5 × less likely to start a humor topic.

## Mood

The state key `mood` describes how the conversation feels. Lines can require it with `"state": {"mood": "tense"}`.

| Mood | When |
| --- | --- |
| `tense` | The villagers clashed twice (opposite stances from different speakers), or they started tense and have had fewer than 4 lines. |
| `warm` | The less interested villager is at 0.6 or more, or they started warm and they are both still at 0.35 or more. |
| `flat` | The more interested villager is below 0.3. |
| (missing) | Anything else. |

A conversation starts `tense` between strained villagers, and `warm` between friends. When one villager has a fever, it starts `tense` unless they are friends.

## Unheard Conversations

A player sees a line in chat within 20 blocks of the speaker: in white within 10 blocks, and in grey beyond. Each player sees the line in their own language.

When no player is within 48 blocks of the speaker, Townstead builds no text and plays no gestures. The conversation still goes on at about 3 seconds per line, and its effects still apply: gossip, relationship changes, memories and outcomes.
