---
title: Relationships & Demeanor
description: How a story reads and changes how a villager feels about the player, and how the villager's manner changes with it.
---

Townstead records how each villager feels about each person they know: trust, affection, resentment and more. A story can read these feelings, change them, and change the villager's manner to match. For how relationships work in play, see [Relationships](/guides/relationships/).

## Qualities

| Quality | Meaning |
| --- | --- |
| `affection` | How much they like the other. |
| `attraction` | How attracted they are to the other. |
| `comfort` | How comfortable they feel around the other. |
| `familiarity` | How well they know the other. |
| `fear` | How much they fear the other. |
| `resentment` | How much they resent the other. |
| `respect` | How much they respect the other. |
| `trust` | How much they trust the other. |

Each quality goes from -100 to 100. A quality without a namespace means `townstead:`, so `trust` is `townstead:trust`.

## Reading and Changing

| In Ink | Effect |
| --- | --- |
| `rel("trust")` | The teller's trust in the player, from -100 to 100. |
| `trust(5)` | Raises the teller's trust in the player by 5. A negative amount lowers it. |
| `contribute("affection", 3, "shared_meal")` | Changes any quality. The last value is a short reason, kept with the change. |
| `memory("id")` | The teller keeps a memory about the player, such as `memory("saved_the_harvest")`. |

```text
= done
~ trust(5)
~ contribute("respect", 3, "mended_nets")
You did it. I won't forget that.
```

Gifts can change qualities too. See [Gifts](/stories/persona-files/#gifts).

:::tip[Pace the changes]
Small, steady changes feel real. A story that gives +20 trust for one chat makes the relationship feel cheap. Many stories raise trust a little on the first talk of each day, with a cap, and more for finished quests.
:::

## Demeanor

`demeanor()` gives one word for how the teller treats the player now. Use it to change the tone of lines:

```text
{demeanor():
- "stern": What do you want?
- "jovial": There you are! Come here!
- else: Hello again.
}
```

### Default Bands

Townstead tries the bands in order and uses the first band that matches.

| Band | Matches when |
| --- | --- |
| `stern` | Resentment is 40 or more, **or** fear is 30 or more. |
| `guarded` | Resentment is 20 or more, **or** trust is below 0. |
| `jovial` | Affection is 30 or more, **and** resentment is below 10. |
| `warm` | Trust is 20 or more. |
| `neutral` | Always. |

### Your Own Bands

A story or a Persona can replace the bands with `demeanor` in its JSON file:

```json
"demeanor": [
  { "name": "cold", "any": { "resentment": { "min": 30 } } },
  { "name": "fond", "all": { "affection": { "min": 40 }, "trust": { "min": 20 } } },
  { "name": "polite" }
]
```

| Field | Description |
| --- | --- |
| `name` | Required. The word that `demeanor()` gives. |
| `any` | Rules, of which at least one must hold. |
| `all` | Rules that must all hold. |

Each rule bounds one quality with `min`, `max`, or both. A band with no rules always matches, so put one last. When no band matches, `demeanor()` gives `neutral`.
