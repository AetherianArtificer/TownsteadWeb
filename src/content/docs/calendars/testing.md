---
title: Testing & Commands
description: "Commands and settings for calendars, and how to find errors in a profile."
---

## Check the Log

After you change a profile, run `/reload`. The server log shows a line such as:

```text
Loaded 5 calendar profiles (42 sidecar lang entries)
```

Townstead skips a profile with an error and logs the reason. Townstead rejects a profile when:

- `days_per_week` is 0 or less;
- `months` is empty, or a month has 0 days or less;
- `weekdays` does not have exactly `days_per_week` entries;
- a leap condition has no `year_mod`, `all_of`, or `any_of`, or `year_mod` is 0 or less;
- a leap action names a month that the profile does not have;
- an added month is missing, or has 0 days or less.

If Townstead does not know the profile ID, make sure the folder is `calendar_profile`, singular.

## Commands

| Command | Access | Effect |
| --- | --- | --- |
| `/townstead calendar get` | Player | Shows the profile, the date, the season, and the world-day count. |
| `/townstead calendar set-profile <id>` | Operator | Uses this profile in the world. Put the ID in quotes. `auto` returns to the profile from the settings. |
| `/townstead calendar set-year <year>` | Operator | Changes the year shown. The day count and villager ages do not change. |
| `/townstead calendar set-date <year> <month> <day>` | Operator | Changes the date shown, in the active profile. Villager ages do not change. |
| `/townstead calendar set-day <worldDay>` | Operator | Sets the world-day count. |
| `/townstead calendar match-today` | Operator | Sets the date to today's real date. |
| `/townstead calendar time-mode` | Player | Shows the time mode of the world. |
| `/townstead calendar time-mode <normal \| real_clock \| default>` | Operator | Sets the time mode of the world. `default` uses the `realClockCalendar` setting again. |

See the [Commands reference](/reference/commands/) for all commands.

## Settings

These settings are in `[calendar]` in the server configuration. See [Calendar and Aging](/reference/configuration/#calendar-and-aging).

| Setting | Default | Effect |
| --- | --- | --- |
| `profile` | `auto` | The profile ID, or `auto` to choose from the installed season mods. |
| `realClockCalendar` | `false` | With `true`, the calendar also moves forward by the real days that passed while the world was closed. `/townstead calendar time-mode` can change this for one world. |
| `agingScale` | `8` | The number of game days in one year of a villager's life. |

## Custom Profiles and Season Mods

A custom profile uses Townstead's own date counting. The built-in TerraFirmaCraft, Serene Seasons, and Ecliptic Seasons profiles read the date from their mod. When a season mod is installed and you use a custom profile, Townstead fits your months onto the season mod's year. See [Custom Calendars](/climate/seasons/#custom-calendars).
