---
title: Text & Placeholders
description: How to write the text of parts, use placeholders, and choose word forms by gender or number.
---

## Write Whole Sentences

Townstead joins the parts of a line with a space. Each part must be a whole sentence or a whole clause that ends with punctuation:

| Good | Bad |
| --- | --- |
| "Phew." + "This rain won't quit." | "This rain" + "won't quit." |
| "Oh, and." + "Guess who got married?" | "Oh, and guess" + "who got married?" |

- Do not split one sentence across two parts. Translations cannot follow a split sentence, and parts from different lines will not fit together.
- Each part must end with `.`, `!`, `?`, `…`, a closing quote or bracket, or `。`, `！` or `？`. Townstead reports other parts when data loads.
- Townstead capitalizes the first letter of each part. A part can start with a placeholder, such as "{who} got married."
- A question goes in the last slot of a line. See [Questions](/conversations/line-fields/#questions).

A line stays on screen for `30 + 2.2 × characters` ticks, from 2 to 8 seconds. A set-piece turn can set its own `duration`.

## Placeholders

Write a placeholder by name, in braces:

```json
"i_heard_who_got_married": "I heard {who} got married to {other2}!"
```

| Placeholder | Value |
| --- | --- |
| `{self}` | The speaker's name. |
| `{other}` | The listener's name. |
| `{self_demonym}`, `{self_demonym_plural}`, `{self_demonym_adj}` | What people of the speaker's culture are called: one person, many people, and the adjective. For example, "Highlander". |
| `{other_demonym}`, `{other_demonym_plural}`, `{other_demonym_adj}` | The same for the listener's culture. |
| `{home_demonym}`, `{home_demonym_plural}`, `{home_demonym_adj}` | The same for the culture of the speaker's home village. |
| Any other name | A slot of the subject, such as `{who}`, `{biome}`, `{mob}` or `{a_mob}`. See [Source Types](/conversations/subjects/#source-types) for the slots of each source. |

Townstead finds the placeholders in the text. A part is only used when the subject has every slot that the text names. For example, a line with `{where}` is not used for a mob sighting that has no place.

The demonym placeholders work with every subject. They come from the `demonym` of the culture file, with the same fields as a [Root demonym](/roots/file-basics/#demonym). A subculture with no `demonym` uses its parent's. When the culture has no demonym, the placeholder has no value, and a part that uses it is not used. `_adj` uses the singular when the culture has no adjective.

A slot name uses lowercase letters, digits and underscores.

## Word Forms

A selector picks a word form from a fact about a slot:

```text
{slot.fact:value=text|value=text|*=text}
```

```json
"you_made_master": "Look at you, {other.gender:f=mistress of the craft|m=master of the craft|*=master of the craft}!"
```

| Fact | Slots | Values |
| --- | --- | --- |
| `gender` | `self`, `other`, `self_demonym`, `other_demonym`, and person slots such as `who` | `m`, `f`, or `n` for a villager with no male or female gender. |
| `number` | `biome` | `singular` or `plural`. |

- Townstead uses the first option whose value matches, else the `*` option.
- Always give a `*` option. When the slot has no value, or the fact is missing, Townstead uses `*`. With no `*` option, the text is empty.
- In the English text, a selector's slot counts like a placeholder: the part is only used when the subject has that slot. `self` and `other` are always there.
- In a translation, a selector can name any slot, also one that the English line does not use. When the subject has no such slot, Townstead uses the `*` form.

English rarely needs selectors. Translations need them often, for example for past tenses in Russian and French. See [Translations](/conversations/translations/#word-forms).

## Slot Values in Other Languages

Names of people are the same in every language. Some other slot values have translations:

| Slot | Translation key |
| --- | --- |
| `{biome}` | `townstead.biome_phrase.<namespace>.<path>` |
| `{mob}` | `townstead.mob_name.<namespace>.<path>` |
| `{a_mob}` | `townstead.mob_name.<namespace>.<path>.a` |
| Demonyms | The translation key in the culture's `demonym`, when it uses one |

When a language has no key, the English value shows. A translation can also ask for a form of a value, such as `{self_demonym/genitive}`. See [Translations](/conversations/translations/#slot-values).

## Style

These rules keep villagers sounding like villagers:

- Keep parts short. A line joins up to six parts.
- Match the tone of the pool. A `farewell` part says goodbye. It does not start a new subject.
- A person slot without `persp` is always someone else. Write "{who} got married." for gossip, and use `"persp": {"who": "you"}` for "I heard you got married!" See [Perspective](/conversations/line-fields/#perspective).
- Give personality lines to the personalities that would say them, with `personalities`. A general line suits everyone.
- Do not use em dashes in lines.
