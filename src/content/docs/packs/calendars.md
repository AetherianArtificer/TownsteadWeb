---
title: Calendars
description: Complete reference and walkthrough for custom Townstead calendar data packs.
---

Townstead calendar profiles define how a year is divided and displayed. A profile can provide:

- Months with independent lengths and names
- Weeks of any positive length
- Optional long and short weekday names
- A year suffix or multiple named eras
- Custom long, medium, short, and weekday date formats
- Leap years that add or subtract days, rename months, or insert extra months

Calendar profiles define how Townstead divides and displays the passage of time. They control the length and names of months and weeks, date formatting, eras, and leap-year rules. They do not change Minecraft's day-night cycle or determine how quickly time passes.

## Calendars and Villager Aging

Calendar dates and villager ages both respond to the passage of time, but they use separate scales. A calendar profile determines how days are arranged into months and years. Townstead's aging settings determine how many game days represent one narrative year of a villager's life.

A narrative year is one year of a villager's age, independent of the calendar's displayed year length. Changing a calendar profile therefore changes how dates are displayed, but does not automatically change how quickly villagers age. The [`agingScale` setting in the Calendar and Aging configuration](/reference/configuration/#calendar-and-aging) controls the aging rate.

## Quick Start

This example creates an `Example Calendar` with four 30-day months and a five-day week.

### Folder Structure

```text
example_calendar/
├── pack.mcmeta
└── data/
    └── example/
        ├── calendar_profile/
        │   └── calendar.json
        └── lang/
            └── en_us.json
```

The profile ID is derived from its location:

```text
data/example/calendar_profile/calendar.json
                         ↓
                  example:calendar
```

Your `pack.mcmeta` uses the standard Minecraft data-pack structure. Set its `pack_format` to the value required by the Minecraft version running the server; this value is version-specific and is not defined by Townstead.

### Calendar Profile

Create `data/example/calendar_profile/calendar.json`:

```json
{
  "display_name": {
    "translate": "calendar_profile.example.calendar.name"
  },
  "days_per_week": 5,
  "weekdays": [
    {
      "long": { "translate": "calendar_profile.example.calendar.weekday.day_one" },
      "short": { "translate": "calendar_profile.example.calendar.weekday.day_one.short" }
    },
    {
      "long": { "translate": "calendar_profile.example.calendar.weekday.day_two" },
      "short": { "translate": "calendar_profile.example.calendar.weekday.day_two.short" }
    },
    {
      "long": { "translate": "calendar_profile.example.calendar.weekday.day_three" },
      "short": { "translate": "calendar_profile.example.calendar.weekday.day_three.short" }
    },
    {
      "long": { "translate": "calendar_profile.example.calendar.weekday.day_four" },
      "short": { "translate": "calendar_profile.example.calendar.weekday.day_four.short" }
    },
    {
      "long": { "translate": "calendar_profile.example.calendar.weekday.day_five" },
      "short": { "translate": "calendar_profile.example.calendar.weekday.day_five.short" }
    }
  ],
  "months": [
    {
      "days": 30,
      "common_name": { "translate": "calendar_profile.example.calendar.month.one" }
    },
    {
      "days": 30,
      "common_name": { "translate": "calendar_profile.example.calendar.month.two" }
    },
    {
      "days": 30,
      "common_name": { "translate": "calendar_profile.example.calendar.month.three" }
    },
    {
      "days": 30,
      "common_name": { "translate": "calendar_profile.example.calendar.month.four" }
    }
  ]
}
```

### English Names

Create `data/example/lang/en_us.json`:

```json
{
  "calendar_profile.example.calendar.name": "Example Calendar",

  "calendar_profile.example.calendar.weekday.day_one": "Day One",
  "calendar_profile.example.calendar.weekday.day_one.short": "One",
  "calendar_profile.example.calendar.weekday.day_two": "Day Two",
  "calendar_profile.example.calendar.weekday.day_two.short": "Two",
  "calendar_profile.example.calendar.weekday.day_three": "Day Three",
  "calendar_profile.example.calendar.weekday.day_three.short": "Three",
  "calendar_profile.example.calendar.weekday.day_four": "Day Four",
  "calendar_profile.example.calendar.weekday.day_four.short": "Four",
  "calendar_profile.example.calendar.weekday.day_five": "Day Five",
  "calendar_profile.example.calendar.weekday.day_five.short": "Five",

  "calendar_profile.example.calendar.month.one": "Month One",
  "calendar_profile.example.calendar.month.two": "Month Two",
  "calendar_profile.example.calendar.month.three": "Month Three",
  "calendar_profile.example.calendar.month.four": "Month Four"
}
```

Townstead reads locale files from `data/<namespace>/lang/<locale>.json`. When calendar data is synchronised, each player receives fallback text for their selected Minecraft language. If that locale is unavailable, Townstead falls back to `en_us`. Players therefore see translated calendar names without installing a separate resource pack.

A client resource pack can still override the same translation keys.

### Load and Select It

Place the pack in the world's `datapacks` directory, then run:

```text
/reload
/townstead calendar set-profile "example:calendar"
/townstead calendar get
```

`set-profile` requires operator permission level 2. To return to automatic profile selection:

```text
/townstead calendar set-profile auto
```

You can also set the profile ID in Townstead's server configuration.

## Profile Components

Text fields accept any of these Minecraft component forms:

```json
"A literal name"
```

```json
{ "text": "A literal name" }
```

```json
{ "translate": "calendar_profile.example.calendar.name" }
```

Translated components are recommended. A useful key convention is:

```text
calendar_profile.<namespace>.<path>.name
calendar_profile.<namespace>.<path>.month.<month>
calendar_profile.<namespace>.<path>.weekday.<weekday>
```

For `example:royal/court`, replace path slashes with dots:

```text
calendar_profile.example.royal.court.name
```

## Minimal Calendar

Only `display_name` and `months` are structurally required. `days_per_week` defaults to `7`.

```json
{
  "display_name": "Simple Calendar",
  "months": [
    { "days": 20, "common_name": "Month One" },
    { "days": 20, "common_name": "Month Two" },
    { "days": 20, "common_name": "Month Three" }
  ]
}
```

Without `weekdays`, Townstead uses numeric headings in the calendar UI and omits weekday names from formatted dates.

## Custom Weekdays

Set `days_per_week` to any positive number. When `weekdays` is present, it must contain exactly that many entries.

```json
{
  "display_name": "Custom Week Calendar",
  "days_per_week": 8,
  "weekdays": [
    { "long": "Day One", "short": "One" },
    { "long": "Day Two", "short": "Two" },
    { "long": "Day Three", "short": "Three" },
    { "long": "Day Four", "short": "Four" },
    { "long": "Day Five", "short": "Five" },
    { "long": "Day Six", "short": "Six" },
    { "long": "Day Seven", "short": "Seven" },
    { "long": "Day Eight", "short": "Eight" }
  ],
  "months": [
    { "days": 32, "common_name": "Month One" },
    { "days": 32, "common_name": "Month Two" },
    { "days": 32, "common_name": "Month Three" }
  ]
}
```

`short` is optional. When omitted, the long name is used in both places.

## Date Formats

The optional `formats` object can override any of four display styles:

| Style | Typical Use |
| --- | --- |
| `long` | Narrative dates and detailed displays |
| `medium` | Compact named dates |
| `short` | Numeric or highly condensed dates |
| `with_weekday` | A long date prefixed with the weekday |

Format values should normally be translated components:

```json
{
  "formats": {
    "long": { "translate": "calendar_profile.example.calendar.format.long" },
    "medium": { "translate": "calendar_profile.example.calendar.format.medium" },
    "short": { "translate": "calendar_profile.example.calendar.format.short" },
    "with_weekday": {
      "translate": "calendar_profile.example.calendar.format.with_weekday"
    }
  }
}
```

Add their patterns to `data/example/lang/en_us.json`:

```json
{
  "calendar_profile.example.calendar.format.long": "{day} of {month}, {year}",
  "calendar_profile.example.calendar.format.medium": "{month} {day}, {year}",
  "calendar_profile.example.calendar.format.short": "{month_index}/{day}/{year}",
  "calendar_profile.example.calendar.format.with_weekday": "{weekday}, {day} of {month}, {year}"
}
```

Townstead converts named placeholders to Minecraft's positional format arguments.

| Placeholder | Value |
| --- | --- |
| `{day}` | Day of the month |
| `{month}` | Month name |
| `{year}` | Displayed year, including era-relative conversion |
| `{weekday}` | Long weekday name |
| `{era}` | Resolved era name, or `year_suffix` when no eras are defined |
| `{month_index}` | Numeric, one-based month index |

Minecraft positional placeholders such as `%1$s` are also accepted. Named placeholders are generally easier to read and maintain.

Styles omitted from `formats` use Townstead's global date formats. The `with_weekday` style is most useful when the profile defines weekday names.

## Year Suffixes

Use `year_suffix` when every year shares one label:

```json
{
  "year_suffix": {
    "translate": "calendar_profile.example.calendar.year_suffix"
  }
}
```

For example, year `42` could display as `42 AH`. If the profile defines `eras`, the resolved era name takes precedence over `year_suffix`.

## Eras

Eras divide the absolute calendar timeline into named periods. Townstead sorts eras by `start_year` and selects the latest era whose start is not after the current year.

### Ascending Eras

Ascending eras count upward from their start:

```json
{
  "eras": [
    {
      "name": "First Age",
      "start_year": 0,
      "first_year_displayed_as": 1,
      "direction": "ascending"
    },
    {
      "name": "Second Age",
      "start_year": 500,
      "first_year_displayed_as": 1,
      "direction": "ascending"
    }
  ]
}
```

With this example:

| Absolute Year | Displayed Era Date |
| ---: | --- |
| `0` | `1 First Age` |
| `499` | `500 First Age` |
| `500` | `1 Second Age` |
| `549` | `50 Second Age` |

`first_year_displayed_as` defaults to `1`. Set it to `0` for calendars whose eras begin at year zero.

### Descending and Ascending Eras

A descending era counts down towards the next era's start. This supports BC/AD-style calendars:

```json
{
  "eras": [
    {
      "name": "BC",
      "start_year": -32768,
      "first_year_displayed_as": 1,
      "direction": "descending"
    },
    {
      "name": "AD",
      "start_year": 1,
      "first_year_displayed_as": 1,
      "direction": "ascending"
    }
  ]
}
```

With this example, absolute year `0` displays as `1 BC`, and absolute year `1` displays as `1 AD`.

A descending era needs a later era to define the point it counts towards. A descending final era falls back to ascending behaviour.

## Leap Rules

Leap rules use modular arithmetic on the absolute year. Every matching rule applies, in the order written.

Each rule contains:

- A `when` predicate
- One action

Month indices in leap actions are **one-based** and refer to the original base month list.

### Every Fourth Year

Add one day to the second month every four years:

```json
{
  "leap_rules": [
    {
      "when": { "year_mod": 4, "equals": 0 },
      "add_day_to_month": 2
    }
  ]
}
```

### Gregorian Leap Years

Gregorian rules add a day every fourth year, remove it every hundredth year, and add it back every four hundredth year:

```json
{
  "leap_rules": [
    {
      "when": { "year_mod": 4, "equals": 0 },
      "add_day_to_month": 2
    },
    {
      "when": { "year_mod": 100, "equals": 0 },
      "subtract_day_from_month": 2
    },
    {
      "when": { "year_mod": 400, "equals": 0 },
      "add_day_to_month": 2
    }
  ]
}
```

All three rules match year `2000`, producing the expected net change of one added day.

### Match Several Remainders

Use `in` when several years in a cycle are leap years:

```json
{
  "when": {
    "year_mod": 19,
    "in": [0, 3, 6, 8, 11, 14, 17]
  },
  "insert_month_after": 6,
  "month": {
    "days": 30,
    "common_name": "Intercalary Moon"
  }
}
```

### Combine Conditions

`all_of` requires every nested predicate to match:

```json
{
  "when": {
    "all_of": [
      { "year_mod": 4, "equals": 0 },
      { "year_mod": 100, "in": [4, 8, 12, 16, 20] }
    ]
  },
  "add_day_to_month": 1
}
```

`any_of` requires at least one nested predicate to match:

```json
{
  "when": {
    "any_of": [
      { "year_mod": 10, "equals": 0 },
      { "year_mod": 10, "equals": 5 }
    ]
  },
  "add_day_to_month": 1
}
```

Predicates can be nested.

## Inserted Months

An inserted month exists only in years where its rule matches.

### Insert After a Month

```json
{
  "leap_rules": [
    {
      "when": { "year_mod": 5, "equals": 0 },
      "insert_month_after": 3,
      "month": {
        "days": 6,
        "common_name": "Festival Week"
      }
    }
  ]
}
```

`insert_month_after` refers to a base month index:

- `0` inserts before the first month
- `1` inserts after the first base month
- The number of base months inserts after the final base month

### Append at the End

```json
{
  "leap_rules": [
    {
      "when": { "year_mod": 8, "equals": 0 },
      "insert_month_at_end": true,
      "month": {
        "days": 5,
        "common_name": "Yearsend"
      }
    }
  ]
}
```

## Rename a Month in Special Years

`rename_month` changes a base month's display name without changing its length:

```json
{
  "leap_rules": [
    {
      "when": { "year_mod": 13, "equals": 0 },
      "rename_month": 4,
      "name": "Blood Sun"
    }
  ]
}
```

This can be combined with an inserted-month rule using the same predicate. Because every matching rule applies, one rule can insert an extra month while another renames an existing month for that year.

## Complete Example

This profile demonstrates translated names, six-day weeks, eras, custom formats, and an extra week every fifth year:

```json
{
  "display_name": {
    "translate": "calendar_profile.example.complete.name"
  },
  "days_per_week": 6,
  "weekdays": [
    { "long": "Day One", "short": "One" },
    { "long": "Day Two", "short": "Two" },
    { "long": "Day Three", "short": "Three" },
    { "long": "Day Four", "short": "Four" },
    { "long": "Day Five", "short": "Five" },
    { "long": "Day Six", "short": "Six" }
  ],
  "months": [
    { "days": 24, "common_name": "First Quarter" },
    { "days": 24, "common_name": "Second Quarter" },
    { "days": 24, "common_name": "Third Quarter" },
    { "days": 24, "common_name": "Fourth Quarter" }
  ],
  "eras": [
    {
      "name": "First Era",
      "start_year": 0,
      "first_year_displayed_as": 1,
      "direction": "ascending"
    },
    {
      "name": "Second Era",
      "start_year": 300,
      "first_year_displayed_as": 1,
      "direction": "ascending"
    }
  ],
  "formats": {
    "long": {
      "translate": "calendar_profile.example.complete.format.long"
    },
    "short": {
      "translate": "calendar_profile.example.complete.format.short"
    },
    "with_weekday": {
      "translate": "calendar_profile.example.complete.format.with_weekday"
    }
  },
  "leap_rules": [
    {
      "when": { "year_mod": 5, "equals": 0 },
      "insert_month_after": 2,
      "month": {
        "days": 6,
        "common_name": "Extra Week"
      }
    }
  ]
}
```

Its language sidecar might contain:

```json
{
  "calendar_profile.example.complete.name": "Complete Example Calendar",
  "calendar_profile.example.complete.format.long": "{day} {month}, Year {year} of the {era}",
  "calendar_profile.example.complete.format.short": "{month_index}/{day}/{year}",
  "calendar_profile.example.complete.format.with_weekday": "{weekday}, {day} {month}, Year {year} of the {era}"
}
```

## Field Reference

### Profile Fields

| Field | Required | Values | Description |
| --- | --- | --- | --- |
| `display_name` | Yes | Component | Name shown for the calendar profile. |
| `days_per_week` | No | Integer greater than `0` | Length of the week. Defaults to `7`. |
| `months` | Yes | Non-empty array | Base months in calendar order. |
| `weekdays` | No | Array | Named weekdays. Its length must equal `days_per_week`. |
| `year_suffix` | No | Component | Label displayed beside the year when no era applies. |
| `eras` | No | Array | Named periods that convert absolute years into era-relative display years. |
| `formats` | No | Object | Per-profile date-format overrides. |
| `leap_rules` | No | Array | Ordered rules that modify the month layout for matching years. |

### Month Fields

| Field | Required | Values | Description |
| --- | --- | --- | --- |
| `days` | Yes | Integer greater than `0` | Number of days in the base or inserted month. |
| `common_name` | Yes | Component | Display name of the month. |

### Weekday Fields

| Field | Required | Values | Description |
| --- | --- | --- | --- |
| `long` | Yes | Component | Full weekday name. |
| `short` | No | Component | Abbreviated name. Defaults to `long`. |

### Era Fields

| Field | Required | Values | Description |
| --- | --- | --- | --- |
| `name` | Yes | Component | Era name or abbreviation. |
| `start_year` | Yes | Integer | First absolute year belonging to the era. |
| `first_year_displayed_as` | No | Integer | Displayed number of the era's first year. Defaults to `1`. |
| `direction` | No | `ascending`, `descending` | Direction of year counting. Defaults to `ascending`. |

### Format Fields

| Field | Required | Values | Description |
| --- | --- | --- | --- |
| `long` | No | Component pattern | Detailed narrative format. |
| `medium` | No | Component pattern | Compact named format. |
| `short` | No | Component pattern | Condensed or numeric format. |
| `with_weekday` | No | Component pattern | Date format that includes a weekday. |

### Leap Predicates

| Field | Values | Description |
| --- | --- | --- |
| `year_mod` with `equals` | Positive modulus and integer remainder | Matches one remainder in a repeating cycle. |
| `year_mod` with `in` | Positive modulus and non-empty integer array | Matches any listed remainder. |
| `all_of` | Non-empty predicate array | Matches when every nested predicate matches. |
| `any_of` | Non-empty predicate array | Matches when at least one nested predicate matches. |

### Leap Actions

Each rule must contain exactly one action.

| Action | Values | Description |
| --- | --- | --- |
| `add_day_to_month` | Base month index, starting at `1` | Adds one day to a base month. |
| `subtract_day_from_month` | Base month index, starting at `1` | Removes one day from a base month. |
| `rename_month` with `name` | Base month index and Component | Changes a base month's name for matching years. |
| `insert_month_after` with `month` | Base month index from `0` through the base month count | Inserts a month after the selected position. |
| `insert_month_at_end` with `month` | `true` | Appends an inserted month. |

## Validation and Reload Behaviour

Townstead reloads calendar profiles with server data packs. A malformed profile is skipped and a warning is written to the server log.

A profile is rejected when, among other errors:

- `days_per_week` is zero or negative
- `months` is empty
- A month has zero or fewer days
- `weekdays` does not contain exactly `days_per_week` entries
- A leap predicate has no recognised condition
- `year_mod` is zero or negative
- A leap action refers to a base month outside the profile
- An inserted month is missing or has zero or fewer days

After editing a pack, run:

```text
/reload
```

Then confirm that the profile loaded:

```text
/townstead calendar set-profile "example:complete"
/townstead calendar get
```

If the profile is unknown, check the server log and verify the directory is exactly `calendar_profile`, singular.

## Behaviour to Keep in Mind

- Profile IDs come from file paths; no `id` field belongs in the JSON.
- Month and weekday indices are one-based when shown to players.
- Leap-action month indices refer to the base month list, not an already modified leap-year list.
- All matching leap rules apply in their written order.
- A calendar profile does not set the initial displayed year. Use calendar commands to align or rebase a world's date.
- Changing the profile changes how the shared world-day counter is interpreted.
- Setting a displayed year or date through Townstead's calendar commands preserves villager ages.
- Static data packs cannot model observation-based or astronomical leap decisions. They support deterministic rules based on the year number.
- Custom profiles use Townstead's standard calendar driver. Seasonal-mod-specific drivers are reserved for Townstead's built-in bridge profile IDs.

## Useful Commands

```text
/townstead calendar get
/townstead calendar set-profile <namespace:path>
/townstead calendar set-profile auto
/townstead calendar set-year <year>
/townstead calendar set-date <year> <month> <day>
/townstead calendar match-today
```

See the [Commands reference](/reference/commands/) for permissions and complete command behaviour.
