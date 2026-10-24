---
title: Frames
description: Frame files, which list the pools that build the line for a move.
---

A frame says how to build the line for a [move](/conversations/moves-and-pairs/). It lists **slots** in order. Townstead fills each slot with one part and joins the parts into the line.

```json
{ "move": "open_subject", "subjects": "weather", "slots": ["weather_open", "weather_remark"] }
```

For this frame, Townstead takes one part from `weather_open` ("Phew.") and one from `weather_remark` ("This rain won't quit."), and joins them: "Phew. This rain won't quit."

## File Location

```text
data/<namespace>/dialogue_frame/<name>.json
```

A file holds a list of frames:

```json
{
  "schema": "townstead:dialogue_frame/v1",
  "frames": [
    { "move": "greet", "slots": ["greeting", "greet_follow"] },
    { "move": "open_subject", "subjects": "need", "slots": ["need_lead", "need_claim"] },
    { "move": "agree", "subjects": "weather", "slots": ["agree_assess", "weather_aside match"] }
  ]
}
```

A frame file adds frames. It does not replace frames from other files, unless it has the same path as another file.

## Frame Fields

| Field | Required | Description |
| --- | --- | --- |
| `move` | Yes | The move ID. A bare ID such as `greet` means `townstead:greet`. |
| `slots` | Yes | 1 to 6 [slots](#slots), in order. |
| `subjects` | No | Subject IDs or `#` tags. The frame is only used for these subjects. With no `subjects`, it is used for any subject, and for no subject. |
| `voice` | No | A voice ID. The frame is only used by speakers with this voice. |
| `weight` | No | How likely the frame is, compared with the other frames for the move. More than 0 and at most 100. The default is 1. |
| `key` | No | A translation key for the order of the parts. By default, Townstead uses `townstead.frame.<number of parts>`. See [Translations](/conversations/translations/#frames). |

## Slots

A slot is a string or an object.

| Slot | Meaning |
| --- | --- |
| `"weather_remark"` | One part from the pool `townstead:weather_remark`. |
| `"weather_aside match"` | One part from the pool, with the same stance as the last line. |
| `"weather_aside oppose"` | One part from the pool, with the opposite stance to the last line. |
| `"@answer"` | The answer to the open question. |
| `"@response"` | The reply to the open pair. |
| `{"pool": "weather_aside", "stance": "match"}` | The object form of a pool slot. `stance` is `match`, `oppose` or `none`. |
| `{"answer": true}` | The object form of `@answer`. |
| `{"response": true}` | The object form of `@response`. |

### Stance

Parts can have a stance: `+` (for), `-` (against) or `0` (neutral).

- A `match` slot takes a part with the same stance as the conversation's current stance, or a part with no stance.
- An `oppose` slot takes a part with the opposite stance. It needs a current stance of `+` or `-`, and a part that has a stance.

This is how agreements and disagreements fit what was said. After "This rain won't quit." (`-`), an agreement takes a `-` aside ("My boots will never dry."), and a disagreement takes a `+` aside ("The fields needed it, at least.").

### Answer and Response Slots

An answer slot and a response slot take parts from every pool and every voice the speaker has. An answer slot takes parts whose `answers` matches the open question. A response slot takes parts that `respond` to the open pair.

You rarely need to write these slots. Townstead adds them when they are needed:

- When a question is open and the frame has no answer slot, Townstead puts one at the start.
- When no question is open, Townstead removes any answer slot.
- When no pair is owed, Townstead removes any response slot.
- When a pair is owed, see [How a Reply Is Built](/conversations/moves-and-pairs/#how-a-reply-is-built).

Write `@answer` in a frame to put the answer in a different place, such as after a greeting: `["greeting_return", "@answer", "greet_q_back"]`.

## Choosing a Frame

For each line, Townstead takes the frames for the move that fit the speaker's voices and the subject. When a question is open, it prefers frames with an answer slot. When no question is open, it prefers frames without one. It then picks one frame by weight.

## Building the Line

For each slot, in order:

1. Townstead collects the parts that are eligible now. See [How Lines Are Chosen](/conversations/selection/).
2. It picks one part by weight. A part that was used recently in the village is skipped until the pool runs out of fresh parts.
3. It updates the conversation state with what the part said: its stance, thread, question, and the slots it revealed. The next slot sees the new state.

Other rules:

- A part that asks a question can only be in the last slot. Townstead reports a frame that has a question pool in any other slot.
- A line has at most one greeting part.
- A pool with an `empty` weight can give an empty part, so the slot adds no text. The last slot is never empty when all the earlier slots were empty.
- When any slot has no eligible part, the frame cannot build a line.

## Checks

Townstead reports these problems when data loads:

- a frame names a move that no move file defines;
- a frame uses a pool that has no parts;
- a frame has a pool that asks questions in a slot that is not the last.
