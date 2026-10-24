---
title: Progression
description: Rank thresholds, Insight, and the daily XP cap in progression.json.
---

Each profession has its own Career XP and ranks. Put them in a separate file next to `profession.json`.

## Shared Progression

Put the progression of a Profession in:

```text
data/<namespace>/profession/<career>/progression.json
```

```json
{
  "schema": "townstead:profession_progression/v1",
  "daily_cap": 80,
  "ranks": [0, 25, 100]
}
```

The `schema` field is required and must be `townstead:profession_progression/v1`. The first rank is `0`. Each later number is the total Career XP that a character needs to reach that rank. Each threshold must be larger than the one before it.

## Insight

A character gets Insight from Career XP, not from their rank. Between two ranks, Townstead gives Insight at evenly spaced checkpoints, and again at the rank-up at the end. The first rank gives no Insight, so one completed task in a career gives no Insight.

With the default of three checkpoints, a character gets four Insight between two ranks. A career with five ranks gives 16 Insight in total at the top rank.

After the top rank, Career XP continues to increase. The character gets one more Insight each time they earn the XP of the last span again. For ranks `[0, 120, 320, 700, 1300]`, the last span is 600 XP, so the character gets Insight at 1900, 2500, and so on.

The career screen shows each checkpoint as a notch on the rank bar. After the top rank, the bar shows the progress to the next Insight.

## Daily Cap

`daily_cap` sets how much Career XP a character can earn at the full rate in one Minecraft day. After the cap, work still gives XP at a lower rate.

## Optional Fields

| Field | Default | Meaning |
|---|---|---|
| `checkpoints_per_rank` | `3` | The number of Insight checkpoints between two ranks, not counting the rank-up. With `0`, a character gets Insight only at rank-ups. |
| `over_cap_percent` | `25` | The percent of XP that a character still earns after `daily_cap`. With `0`, the character earns no XP after the cap. |

## Rank Objects

Use an object only for a rank that is different from those defaults:

```json
{
  "schema": "townstead:profession_progression/v1",
  "daily_cap": 80,
  "ranks": [
    0,
    {
      "at": 25,
      "name": { "text": "Apiarist" },
      "skill_points": 2
    },
    100
  ]
}
```

- `at` is the total XP for the rank.
- `name` is a Minecraft text component. Without a name, ranks 1 to 5 use Townstead's standard names. Later ranks use Master with a numeral.
- `skill_points` replaces the usual one Insight for the rank-up to this rank. It does not change the checkpoints.

All of a character's careers share one Insight total. See [Learning Rules](/careers/skill/learning/#learning-rules).

Do not put XP spans, `max_xp`, or merchant offers in this file. `progression.json` cannot change the identity, requirements, Paths, work, or other Career fields. In Townstead, "level" means a position in one Path. A position on this track is a "rank".
