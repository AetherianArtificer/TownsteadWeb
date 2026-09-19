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

The `schema` field is required and must be `townstead:profession_progression/v1`. The first rank is `0`; every later number is the total Career XP required to reach that rank. Thresholds must increase strictly. Each rank grants one point of Insight by default.

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

`at` is the cumulative XP threshold. `name` is a Minecraft text component, and `skill_points` replaces the usual one point of Insight for that rank. Insight is shared across every career the character has standing in; see [Learning Rules](/careers/skill/learning/#learning-rules). When a name is absent, ranks 1 to 5 use Townstead's standard names. Later ranks continue from Master with a numeral. The final threshold is also the Career XP ceiling. Do not put XP spans, `max_xp`, or merchant offers in this document.

`progression.json` cannot change identity, requirements, Paths, work, or other Career fields. The word “level” is reserved for a position inside one Path; a position on this track is a rank.
