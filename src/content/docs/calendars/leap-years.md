---
title: Leap Years
description: "Leap rules that add or remove days, insert months, or rename months in some years."
---

Leap rules change the months in some years. A rule has a `when` condition on the year number and one action.

```json
"leap_rules": [
  { "when": { "year_mod": 4, "equals": 0 }, "add_day_to_month": 2 }
]
```

- Townstead applies every rule that matches, in the order of the list.
- Month numbers in rules start at 1, and always mean the months in `months`, not the months after other rules.
- Rules depend only on the year number. A rule cannot follow the moon or the sky.

## Conditions

| Condition | Matches when |
| --- | --- |
| `{ "year_mod": 4, "equals": 0 }` | The year divided by 4 leaves 0. |
| `{ "year_mod": 19, "in": [0, 3, 6, 8, 11, 14, 17] }` | The year divided by 19 leaves one of these. |
| `{ "all_of": [ ... ] }` | Every condition in the list matches. |
| `{ "any_of": [ ... ] }` | At least one condition in the list matches. |

`year_mod` must be at least 1. Conditions can be inside other conditions.

## Actions

Give each rule one action:

| Action | Effect |
| --- | --- |
| `"add_day_to_month": 2` | Adds one day to month 2. |
| `"subtract_day_from_month": 2` | Removes one day from month 2. |
| `"rename_month": 4, "name": "Blood Moon"` | Gives month 4 another name in that year. |
| `"insert_month_after": 3, "month": { ... }` | Adds a month after month 3. Use `0` to add it before the first month. |
| `"insert_month_at_end": true, "month": { ... }` | Adds a month after the last month. |

An added month has `days` and `common_name`, the same as a month in `months`. It exists only in the years where its rule matches.

## Examples

### Gregorian Leap Years

A day every fourth year, except every hundredth year, but again every four hundredth year:

```json
"leap_rules": [
  { "when": { "year_mod": 4, "equals": 0 }, "add_day_to_month": 2 },
  { "when": { "year_mod": 100, "equals": 0 }, "subtract_day_from_month": 2 },
  { "when": { "year_mod": 400, "equals": 0 }, "add_day_to_month": 2 }
]
```

All three rules match the year 2000, so it gets one extra day.

### A Festival Week

A week of six days after the third month, every fifth year:

```json
"leap_rules": [
  {
    "when": { "year_mod": 5, "equals": 0 },
    "insert_month_after": 3,
    "month": { "days": 6, "common_name": "Festival Week" }
  }
]
```

### An Extra Month with a New Name

In a cycle of 19 years, seven years get an extra month after month 6, and month 7 gets a new name in those years. Use two rules with the same condition:

```json
"leap_rules": [
  {
    "when": { "year_mod": 19, "in": [0, 3, 6, 8, 11, 14, 17] },
    "insert_month_after": 6,
    "month": { "days": 30, "common_name": "Second Bloom" }
  },
  {
    "when": { "year_mod": 19, "in": [0, 3, 6, 8, 11, 14, 17] },
    "rename_month": 7,
    "name": "Late Harvest"
  }
]
```
