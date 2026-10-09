---
title: Line Fields
description: Every field that a line, a group or a pool can set, and what each one does.
---

A line, a group, a line file and a pool file can all set these fields. See [How Fields Combine](/conversations/lines/#how-fields-combine) for which value a part uses.

## All Fields

| Field | Type | Description |
| --- | --- | --- |
| `text` | String | The English text. Only on a line. See [Text & Placeholders](/conversations/text/). |
| `weight` | Number | How likely the part is, compared with the others in its slot. More than 0 and at most 100. The default is 1. |
| `act` | String | What the part does. See [Acts](#acts). |
| `asks` | String | The part asks a question of this kind. See [Questions and Pairs](#questions-and-pairs). |
| `answers` | String | The part answers a question of this kind. |
| `about` | String | For a question: the slot it asks about. |
| `opens` | Pair ID | The part opens a [pair](/conversations/moves-and-pairs/#pairs). |
| `responds` | Pair IDs | The part replies to these pairs. |
| `stance` | `+`, `-`, `0` | For, against or neutral. See [Stance and Form](#stance-and-form). |
| `form` | String | The kind of statement, such as `quality`, `claim`, `musing` or `story`. |
| `thread` | String | A label for what the part is about, such as `weather.crops`. See [Threads](/conversations/selection/#threads). |
| `sets` | Object | State keys that the part writes. See [State](/conversations/state-and-requirements/#writing-state). |
| `state` | Object | State conditions that must be true. See [State](/conversations/state-and-requirements/#state-conditions). |
| `persp` | Object | Who a person slot must be, from the speaker's view. See [Perspective](#perspective). |
| `introduces` | Boolean | The part can name a person slot for the first time. The default is `false`. |
| `subjects` | IDs | Subject IDs or `#` tags. The part is only used for these subjects. |
| `variants`, `variant` | Strings | The part is only used for these subject variants. |
| `registers` | Strings | The part is only used in these registers. Write `!` before a register to keep the part out of it. |
| `valence` | Strings | The part is only used for subjects with this valence: `positive`, `negative` or `neutral`. |
| `provenance` | Strings | The part is only used when the subject has at least one of these: `witnessed`, `heard`, `shared`. |
| `stages` | Strings | The part is only used by speakers at these life stages. |
| `personalities` | Strings | The part is only used by speakers with one of these MCA personalities. |
| `marked` | Boolean | The part uses the culture's own phrasing. See [Voices](/conversations/voices/#marked-parts). The default is `false`. |
| `simple` | Boolean | A marked part that children can use. The default is `false`. |
| `min_lines` | Number | The conversation must have at least this many lines before the part. The default is 0. |
| `requires` | Strings | [Requirements](/conversations/state-and-requirements/#requirements) that must all be true. |
| `content_tags` | Strings | Tags for content filtering. Accepted. Townstead does not filter content yet. |
| Gate fields | | `context`, `relationship`, `personality_weights`, `relationship_weights`, `when`, `evaluation`. See [Gates](/conversations/topics/#gates). The gate weight multiplies `weight`. |

Lists also take one value: `"stages": "child"` is the same as `"stages": ["child"]`. A bare ID in `subjects`, `opens` and `responds` means `townstead:`.

## Acts

| Act | Use |
| --- | --- |
| `greet` | A greeting. A line has at most one greeting part. |
| `ask` | A question. This is the default when the part has `asks`. |
| `answer` | An answer. This is the default when the part has `answers`. |
| `inform` | A statement of fact or news. This is the default for other parts. |
| `assess` | A judgement or opinion. |
| `react` | A reaction to what the other villager said. |
| `farewell` | A goodbye. |
| `filler` | A lead-in or bridge with little meaning, such as "Anyway." |
| `rhetorical` | A question that needs no answer. |

`inform` and `assess` are statements. After a statement, the state key `form` is the part's `form`, or `claim` when it has none. Agreements can then check what they agree with. For example, "Exactly." fits a claim, and "It really is." fits a quality.

## Questions and Pairs

### Questions

A part with `asks` asks a question. The value is a free-form name for the kind of question, such as `townstead:how` or `townstead:sit`. Write the same string in `answers` on the parts that answer it.

- A question can only be in the last slot of a line.
- A question cannot be on the final line of a conversation.
- The other villager's next line starts with an answer. Townstead takes it from every part whose `answers` matches, in any pool of the speaker's voices.
- The subject cannot change while a question is open.
- A part with `asks` never opens a pair. The question takes the place of the pair.
- When nothing answers a question, Townstead reports it when data loads.

With `about`, a question asks about one slot:

- The question is not asked when that slot was already said in this topic.
- The question is not asked when the subject has no such slot. For example, "Where was this?" needs a `{where}` slot.

The questions that Townstead's lines use: `townstead:how`, `townstead:opinion`, `townstead:sit`, `townstead:last`, `townstead:hurt`, `townstead:when`, `townstead:where`, `townstead:who`, `townstead:watch`, `townstead:busy`, `townstead:more`, `townstead:minute`, `townstead:source`, `townstead:confirm`, `townstead:help`, `townstead:back`, `townstead:okay`, `townstead:side`, `townstead:taker`, `townstead:source_ruler`, `townstead:sword` and `townstead:would_do`.

### Pairs

A part with `opens` sets what the other villager owes. The other villager's next line starts with a part that has this pair in `responds`. A required pair always gets a reply. An optional pair gets one by chance. See [Pairs](/conversations/moves-and-pairs/#pairs).

When a line has more than one part with `opens`, the last one counts.

A pool file often sets `opens` or `responds` for all its parts:

```json
{ "schema": "townstead:dialogue_pool/v1", "act": "react", "responds": "joke" }
```

## Stance and Form

Parts with a stance change the conversation:

- The state key `stance` is the stance of the last part that had one. `match` and `oppose` slots use it. See [Stance](/conversations/frames/#stance).
- Two lines in a row with the same stance raise both villagers' interest by 0.04. Opposite stances lower it by 0.05. Two clashes make the mood `tense`.
- On a thread, a villager keeps their stance for the rest of the subject. A villager who said `+` about `weather.crops` does not say `-` about it later.

`form` names the kind of statement. Townstead's lines use `story`, `general`, `quality` and `musing`, and `claim` is the default. You can add your own forms, and check them with `"state": {"form": "yourform"}`.

## Perspective

`persp` says who a person slot must be, from the speaker's view:

| Value | The person in the slot is |
| --- | --- |
| `me` | The speaker. |
| `you` | The listener. |
| `they` | Someone else. |

```json
{ "persp": { "who": "me" }, "lines": { "i_made_master": "I made master!" } }
{ "persp": { "who": "you" }, "lines": { "you_made_master": "You made master? Congratulations!" } }
{ "persp": { "who": "they" }, "lines": { "who_made_master": "{who} made master." } }
```

- A part with `persp` for a slot also counts as saying that slot.
- A part with `persp` can only be used after the slot was said, unless it has `introduces: true`. A question with `persp` is the other way round: it can only ask before the slot was said.
- A part that puts a person slot in its text without `persp` needs that person to be someone else (`they`). So "{who} got married." is never said to the person who got married.
- `{self}` and `{other}` are always the speaker and the listener. They need no `persp`.

Put `introduces: true` on the pool or lines that first name the person, such as the claim in news: "I heard {who} got married."

## Speakers

| Field | Match |
| --- | --- |
| `stages` | The speaker's life stage: the stage it presents as, such as `child`, `teen`, `adult` or `senior`, or the ID of a custom [life stage](/roots/life-cycles/). Babies and toddlers count as `child`. |
| `personalities` | The speaker's MCA personality, without `mca:`, such as `friendly`, `gloomy` or `odd`. |

Older and newer MCA versions use different names for six personalities. To support both, list both names:

| Older name | Newer name |
| --- | --- |
| `crabby` | `grumpy` |
| `upbeat` | `peppy` |
| `playful` | `witty` |
| `introverted` | `shy` |
| `extroverted` | `confident` |
| `relaxed` | `lazy` |

For example: `"personalities": ["crabby", "grumpy"]`.
