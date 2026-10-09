---
title: Progression
description: Rank thresholds, Insight, and the daily XP cap in progression.json.
---

Career XP and rank belong to the profession and live in their own document beside `profession.json`.

## Shared Progression

Career XP and rank belong to the Profession. Put that shared progression in:

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

The `schema` field is required and must be `townstead:profession_progression/v1`. The first rank is `0`; every later number is the total Career XP required to reach that rank. Thresholds must increase strictly.

## Insight

Insight comes from Career XP, not from the rank that the character holds. Each span between two ranks pays Insight at evenly spaced checkpoints, and again at the rank-up at the end of the span. The first rank pays no Insight, so one completed task in a career gives no Insight.

With the default of three checkpoints, each span pays four Insight. A career with five ranks pays 16 Insight at the top rank.

After the top rank, Career XP continues to increase. One more Insight comes each time the character earns the XP of the final span again. For ranks `[0, 120, 320, 700, 1300]`, the final span is 600 XP, so Insight comes at 1900, 2500, and so on.

The career screen shows each checkpoint as a notch on the rank bar. After the top rank, the bar shows the progress to the next Insight.

## Daily Cap

`daily_cap` sets how much Career XP a character earns at the full rate each Minecraft day. After the cap, work continues to earn XP at a reduced rate.

## Optional Fields

| Field | Default | Meaning |
|---|---|---|
| `checkpoints_per_rank` | `3` | Insight checkpoints inside each rank span, in addition to the rank-up. `0` pays Insight only at rank-ups. |
| `over_cap_percent` | `25` | Percent of XP that a character still earns after `daily_cap`. `0` makes the cap a hard stop. |

## Rank Objects

Use an object only when a rank differs from those defaults:

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

`at` is the cumulative XP threshold. `name` is a Minecraft text component, and `skill_points` replaces the usual one point of Insight for the rank-up to that rank. Checkpoints are not changed. Insight is shared across every career the character has standing in; see [Learning Rules](/careers/skill/learning/#learning-rules). When a name is absent, ranks 1 to 5 use Townstead's standard names. Later ranks continue from Master with a numeral. Do not put XP spans, `max_xp`, or merchant offers in this document.

`progression.json` cannot change identity, requirements, Paths, work, or other Career fields. The word “level” is reserved for a position inside one Path; a position on this track is a rank.
