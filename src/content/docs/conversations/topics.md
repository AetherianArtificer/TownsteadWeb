---
title: Topics
description: Topic files, the graphs of turns that make up one subject of a conversation.
---

A topic is one subject of talk inside a conversation. It is a small graph of **turns**. Each turn names a speaker and a [move](/conversations/moves-and-pairs/). The first turn opens the topic, and each turn lists the turns that can reply to it.

A topic has no greeting and no goodbye. The [encounter](/conversations/encounters/) adds those around the topics.

## File Location

```text
data/<namespace>/conversation/<name>.json
```

The file ID is the topic ID. For example, `data/townstead/conversation/weather.json` is the topic `townstead:weather`.

## Two Kinds of Topic

- **Generative topics** name moves, and Townstead builds each line from parts. Every topic in `data/townstead/conversation/` is generative.
- **Set pieces** have fixed text. Each turn lists translation keys in `lines`, and the villager says one of them. The topics in `data/townstead_social/conversation/` are set pieces. They can give [outcomes](#outcomes): memories, opinion and mood.

Both kinds live in the same folder and use the same format.

## Minimal Example

A generative topic about the weather:

```json
{
  "schema": "townstead:conversation/v1",
  "subjects": ["townstead:weather"],
  "register": "ambient",
  "start": "t0_open",
  "turns": {
    "t0_open": {
      "speaker": "initiator",
      "move": "townstead:open_subject",
      "replies": ["t1_agree", "t1_disagree"]
    },
    "t1_agree": { "speaker": "responder", "move": "townstead:agree", "weight": 3 },
    "t1_disagree": { "speaker": "responder", "move": "townstead:disagree" }
  },
  "associated": ["townstead:biome"],
  "expansions": {
    "moves": ["townstead:elaborate", "townstead:opinion_ask", "townstead:anecdote"],
    "max": 2
  }
}
```

A set piece:

```json
{
  "schema": "townstead:conversation/v1",
  "context": ["weather:rain"],
  "start": "open",
  "turns": {
    "open": {
      "speaker": "initiator",
      "move": "townstead:say",
      "lines": ["dialogue.examplepack.rain.open.1", "dialogue.examplepack.rain.open.2"],
      "duration": "4s",
      "replies": ["reply"]
    },
    "reply": {
      "speaker": "responder",
      "move": "townstead:say",
      "lines": ["dialogue.examplepack.rain.reply.1"],
      "outcome": {
        "memory": "townstead_social:pleasant_exchange",
        "initiator_opinion": 1,
        "responder_opinion": 1
      }
    }
  }
}
```

## Topic Fields

| Field | Required | Description |
| --- | --- | --- |
| `schema` | Yes | Must be `townstead:conversation/v1`. |
| `turns` | Yes | A map from turn ID to [turn](#turn-fields). 1 to 32 turns. |
| `start` | No | The ID of the first turn. The default is the first turn in `turns`. |
| `subjects` | No | The [subjects](/conversations/subjects/) the topic can be about: subject IDs, or `#` subject tags. With no `subjects`, the topic has no subject. |
| `register` | No | The kind of talk, such as `ambient`, `social`, `humor`, `grief`, `civic`, `commerce` or `intrigue`. The default is `ambient`. A voice uses the register to set how often its own phrasing appears. See [registers](#registers). |
| `weight` | No | How likely the topic is, compared with others. More than 0 and at most 100. The default is 1. |
| `associated` | No | Subject IDs. When the previous topic had one of these subjects, the state key `assoc` is `true`, so lines like "Speaking of which." can join the topics. |
| `expansions` | No | Extra moves after the last turn. See [Expansions](#expansions). |
| `requires` | No | [Requirements](/conversations/state-and-requirements/#requirements) that must all be true for the topic to start. |
| Gate fields | No | `context`, `relationship`, `personality_weights`, `relationship_weights`, `when` and `evaluation`. See [Gates](#gates). |
| `interests` | No | Accepted, but not used yet. |
| `content_tags` | No | Accepted on topics, but not used yet. Use `content_tags` on lines instead. |

A topic file does not accept a `mods` field.

:::caution[Write full IDs in topic files]
In a topic file, write every ID with its namespace: `townstead:agree`, `townstead:weather`. A bare ID such as `agree` means `minecraft:agree`, which does not exist. The other conversation files are different: there, a bare ID means `townstead:`.
:::

## Turn Fields

| Field | Required | Description |
| --- | --- | --- |
| `speaker` | Yes | `initiator` for the villager who started the topic, or `responder` for the other villager. |
| `move` | Yes | The [move](/conversations/moves-and-pairs/) for this turn, such as `townstead:agree`. |
| `replies` | No | Turn IDs that can come next. A turn with no replies ends the topic. |
| `weight` | No | How likely this reply is, compared with the other replies. More than 0 and at most 100. The default is 1. |
| `lines` | No | For a set piece: up to 16 translation keys. The villager says one of them instead of a built line. |
| `duration` | No | How long the line shows, as ticks (`80`) or seconds (`"4s"`). 20 to 200 ticks. By default, Townstead sets the time from the length of the text. |
| `register` | No | A register for this turn only. It replaces the topic's register. |
| `gesture` | No | What the speaker does: `{"performance": "<clip>", "expression": "<cue>"}`. It replaces the move's gesture. |
| `listener` | No | What the other villager does while listening. Same format as `gesture`. |
| `outcome` | No | What the topic changes when it ends on this turn. Only a turn with no replies can have one. See [Outcomes](#outcomes). |
| `content_tags` | No | Accepted, but not used yet. |
| Gate fields | No | See [Gates](#gates). A reply with a gate weight of 0 cannot be chosen. |

### Rules for the Graph

- Every turn must be reachable from `start`.
- The graph has no cycles. A path from `start` has at most 8 turns.
- Before a turn with an `outcome`, both villagers must speak at least once on the path.

### Choosing a Reply

When a turn has more than one reply, Townstead weighs them. The weight of a reply is its `weight` times its gate weight for the villager who speaks it. Townstead tries the replies in a weighted random order. If it cannot build a line for a reply, it tries the next one.

For example, the news topic `townstead:event` has the replies `ask_detail`, `doubt`, `react`, `respond` and `console`. The `respond` pools are for news about the listener ("I heard you made master!" "It took forever, but I did it!"). The `react` pools are for news about someone else. For each piece of news, Townstead can build only the replies whose lines fit, so it uses those.

## Expansions

After the last turn, a topic can go on for a few more lines. Expansions are moves such as `townstead:elaborate` (more about the same subject), `townstead:opinion_ask` (ask what the other villager thinks) and `townstead:anecdote` (a short story).

| Field | Description |
| --- | --- |
| `moves` | Move IDs that can follow the topic. |
| `max` | The most expansions for this topic, from 0 to 6. The default is 2 when `expansions` is present, and 0 without it. |

The encounter also has a maximum. Townstead uses the smaller of the two. Before each expansion, Townstead checks the interest of the less interested villager. The lower the interest, the more likely the topic stops. A move can have a `follow_up` move that always comes next, and a move can be `initiator_only`. See [Moves](/conversations/moves-and-pairs/#move-fields).

## Gates

Topics, turns, [subjects](/conversations/subjects/) and [lines](/conversations/line-fields/) share the same gate fields. A gate gives a weight. A weight of 0 blocks the choice.

| Field | Description |
| --- | --- |
| `context` | Context facts that must all be true. See [Context Facts](/conversations/state-and-requirements/#context-facts). |
| `relationship` | Relationship tags that must all be true, such as `friend`, `familiar`, `stranger`, `strained`, `partner` or `family`. |
| `personality_weights` | A map from MCA personality to weight. Townstead uses the weight of the villager's personality, or `default` when it is not listed. The default of `default` is 1. |
| `relationship_weights` | A map from relationship tag to a multiplier. Townstead multiplies every tag that matches. When no tag matches, it uses `default`. |
| `when` | A [Pheno condition](/pheno/conditions/). The gate is 0 when the condition is false. |
| `evaluation` | A [Pheno value](/pheno/selectors-values/). Townstead multiplies the weight by it, up to 100. A value of 0 or less blocks the choice. |

Weights in `personality_weights` and `relationship_weights` must be more than 0 and at most 100. Personality keys can use the bare MCA name (`grumpy`) or the `mca:` form.

## Outcomes

An outcome is what a topic changes when it ends. It is for set pieces. None of the generative topics that Townstead ships have one.

```json
"outcome": {
  "memory": "townstead_social:pleasant_exchange",
  "initiator_opinion": 2,
  "responder_opinion": 2,
  "initiator_mood": 1,
  "responder_mood": 1,
  "initiator_relationship": [{ "quality": "townstead:comfort", "amount": 1 }],
  "responder_relationship": [{ "quality": "townstead:comfort", "amount": 1 }]
}
```

| Field | Required | Description |
| --- | --- | --- |
| `memory` | Yes | The memory ID that both villagers keep. |
| `initiator_memory`, `responder_memory` | No | A different memory for one villager. The default is `memory`. |
| `initiator_opinion`, `responder_opinion` | No | A change to affection toward the other villager, from -4 to 4. |
| `initiator_mood`, `responder_mood` | No | A change to MCA mood, from -4 to 4. |
| `initiator_relationship`, `responder_relationship` | No | A list of changes to [relationship qualities](/guides/relationships/). Each has `quality` (an ID such as `townstead:trust`), `amount` (not 0, from -100 to 100) and `half_life_days` (0 or more; leave it out to use the quality's own half-life). A quality can appear only once in a list. |
| `spread` | No | Accepted, but not used yet. |

Townstead limits how often outcomes apply. One pair of villagers gets at most 2 outcomes a day, and one villager gets at most 4 a day. After that, conversations still happen, but they change nothing.

Townstead ships these relationship qualities: `townstead:affection`, `townstead:attraction`, `townstead:comfort`, `townstead:familiarity`, `townstead:fear`, `townstead:resentment`, `townstead:respect` and `townstead:trust`.

## Registers

A register is a free-form name for the kind of talk. Townstead uses it in two places:

- A [voice](/conversations/voices/) sets how often its phrasing appears in each register.
- A [line](/conversations/line-fields/) can require a register with `registers`, or keep out of one with `"registers": "!grief"`.

The line takes its register from, in order: the turn's `register`, the subject's `register`, then the topic's `register`.

| Register | Used by |
| --- | --- |
| `ambient` | Weather, biome, needs. |
| `social` | News, mob sightings, company, venues. |
| `humor` | Jokes. |
| `grief` | Zombie infection talk. |
| `civic` | Village projects. |
| `commerce` | Quest boards. |
| `intrigue` | Rumours about rulers. |

Culture voices also use `grief`, `family`, `romance`, `work`, `advancement` and other names. You can add new registers. They only need to match between your topics, subjects, lines and voices.

## How Townstead Picks a Topic

When a villager starts a new topic, Townstead looks at every topic that has not come up yet in this conversation. A topic can start when:

1. its `requires` are all true,
2. its gate and the gate of its first turn are more than 0, and
3. it has no `subjects`, or at least one subject has a live instance for this speaker and listener.

Townstead then picks one at random by weight. The weight is:

- the topic `weight` times its gate weight,
- times a personal taste from 0.65 to 1.65, fixed for each villager and topic,
- divided by `1 + 3 × repeats`, where `repeats` counts how often this pair already had the topic,
- times `max(0.1, 1 + 3 × urgency)` of the subject. See [Goals](/conversations/selection/#goals).

Humor topics are much less likely after a `grief` topic in the same conversation (× 0.1), and when the speaker has a fever (× 0.2).
