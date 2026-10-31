---
title: Profile Files
description: "The fields of a calendar profile: months, weeks, weekday names, and translations."
---

Put each calendar profile in `data/<namespace>/calendar_profile/<path>.json`. The folder name is singular. The path is the profile ID, so do not add an `id` field.

## Fields

| Field | Required | Description |
| --- | --- | --- |
| `schema` | No | `townstead:calendar/v1`. Older profiles without it still load. If it is present and wrong, Townstead skips the file. |
| `display_name` | Yes | The name of the calendar. A [text](#names-and-translations). |
| `months` | Yes | The months, in order. At least one. See [Months](#months). |
| `days_per_week` | No | The length of the week, at least 1. The default is `7`. |
| `weekdays` | No | The weekday names. See [Weekdays](#weekdays). |
| `year_suffix` | No | A label after the year number. See [Dates & Eras](/calendars/dates-and-eras/#year-suffix). |
| `eras` | No | Named periods of years. See [Eras](/calendars/dates-and-eras/#eras). |
| `formats` | No | The date formats of this calendar. See [Date Formats](/calendars/dates-and-eras/#date-formats). |
| `leap_rules` | No | Changes for some years. See [Leap Years](/calendars/leap-years/). |

## Months

```json
"months": [
  { "days": 30, "common_name": "Thaw" },
  { "days": 31, "common_name": "Bloom" }
]
```

| Field | Required | Description |
| --- | --- | --- |
| `days` | Yes | The number of days, at least 1. |
| `common_name` | Yes | The name of the month. A text. |

The months can have different lengths. The year is the sum of the months.

## Weekdays

```json
"days_per_week": 5,
"weekdays": [
  { "long": "Firstday", "short": "Fir" },
  { "long": "Seconday", "short": "Sec" },
  { "long": "Midday", "short": "Mid" },
  { "long": "Fourthday", "short": "Fou" },
  { "long": "Restday", "short": "Res" }
]
```

| Field | Required | Description |
| --- | --- | --- |
| `long` | Yes | The full name. A text. |
| `short` | No | A short name, for the calendar screen. The default is `long`. |

`weekdays` must have exactly `days_per_week` entries. Without `weekdays`, the calendar screen shows numbers for the days of the week, and dates have no weekday name.

The week does not restart each month. Weekdays continue through the year, so a month can start on any weekday.

## Names and Translations

Each text can be a plain string, `{ "text": "..." }`, or `{ "translate": "<key>" }`. Use translation keys so that players see the names in their language.

Put translations in `data/<namespace>/lang/<locale>.json` in the data pack. Townstead sends each player the names in their language, so players do not need a resource pack. When a language has no file, Townstead uses `en_us`. A client resource pack can also change the same keys.

A useful key pattern is:

```text
calendar_profile.<namespace>.<path>.name
calendar_profile.<namespace>.<path>.month.<month>
calendar_profile.<namespace>.<path>.weekday.<weekday>
```

For a profile path with folders, such as `examplepack:royal/court`, use dots in place of the slashes: `calendar_profile.examplepack.royal.court.name`.
