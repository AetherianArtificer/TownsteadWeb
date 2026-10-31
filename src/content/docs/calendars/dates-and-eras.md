---
title: Dates & Eras
description: "Date formats, year labels, and eras in a calendar profile."
---

## Date Formats

A profile can set four date formats. Townstead uses its own formats for the styles that the profile does not set.

| Style | Used for |
| --- | --- |
| `long` | Full dates in stories and detailed screens. |
| `medium` | Short dates with the month name. |
| `short` | Dates with numbers only. |
| `with_weekday` | A long date with the weekday in front. Useful only when the profile has weekday names. |

Give each format as a translation key, and put the pattern in the language file:

```json
"formats": {
  "long": { "translate": "calendar_profile.examplepack.seasons_of_the_vale.format.long" },
  "short": { "translate": "calendar_profile.examplepack.seasons_of_the_vale.format.short" },
  "with_weekday": { "translate": "calendar_profile.examplepack.seasons_of_the_vale.format.with_weekday" }
}
```

```json
{
  "calendar_profile.examplepack.seasons_of_the_vale.format.long": "{day} of {month}, {year}",
  "calendar_profile.examplepack.seasons_of_the_vale.format.short": "{month_index}/{day}/{year}",
  "calendar_profile.examplepack.seasons_of_the_vale.format.with_weekday": "{weekday}, {day} of {month}, {year}"
}
```

| Placeholder | Value |
| --- | --- |
| `{day}` | The day of the month. |
| `{month}` | The name of the month. |
| `{month_index}` | The number of the month, from 1. |
| `{year}` | The year number, counted in its era. |
| `{weekday}` | The full weekday name. |
| `{era}` | The name of the era, or the `year_suffix` when the profile has no eras. |

You can also use Minecraft's positional placeholders, from `%1$s` to `%6$s`, in the same order as the table: day, month, year, weekday, era, month number. Townstead skips an unknown style name and logs a warning.

## Year Suffix

`year_suffix` is a label for every year, such as "AV" in "42 AV":

```json
"year_suffix": { "translate": "calendar_profile.examplepack.seasons_of_the_vale.year_suffix" }
```

When the profile has `eras`, Townstead shows the era name in place of the suffix.

## Eras

Eras split the years into named periods, such as ages or reigns. Each era starts at a year of the calendar's own count, and Townstead uses the last era that has started.

```json
"eras": [
  { "name": "First Age", "start_year": 0 },
  { "name": "Second Age", "start_year": 500 }
]
```

| Field | Required | Description |
| --- | --- | --- |
| `name` | Yes | The name of the era. A text. |
| `start_year` | Yes | The first year of the era, in the calendar's own year count. |
| `first_year_displayed_as` | No | The number shown for the first year of the era. The default is `1`. Use `0` for eras that start at year zero. |
| `direction` | No | `ascending` (default) counts up from the start. `descending` counts down to the start of the next era. |

With the example:

| Year | Shown as |
| ---: | --- |
| `0` | 1 First Age |
| `499` | 500 First Age |
| `500` | 1 Second Age |
| `549` | 50 Second Age |

### Counting Down

A `descending` era counts down to the next era, as BC counts down to AD:

```json
"eras": [
  { "name": "Before the Crown", "start_year": -32768, "direction": "descending" },
  { "name": "of the Crown", "start_year": 1 }
]
```

Year `0` shows as "1 Before the Crown", and year `1` shows as "1 of the Crown". A descending era needs a later era to count down to. If the last era is descending, Townstead counts it up.

## Setting the Year

A profile does not set the year that a world starts in. To change the year of a world, use `/townstead calendar set-year` or `set-date`. These commands do not change villager ages. See [Testing & Commands](/calendars/testing/).
