---
title: How Calendars Work
description: "Calendar profiles: how Townstead names the days of a world, which profile it uses, and how to make your own."
---

A calendar profile sets how Townstead shows a date: the months and their lengths, the week, the weekday names, the eras, and the date formats. For the player's view, see [Calendars & Stamps](/guides/calendars-and-stamps/).

A profile only names the days. It does not change the day and night cycle, how fast time passes, or the season. The season comes from a season mod. See [Seasons & Calendars](/climate/seasons/#custom-calendars).

## Built-In Profiles

| Profile | Used for |
| --- | --- |
| `townstead_calendar:default` | A Gregorian calendar, when no season mod is installed. |
| `townstead_calendar:tfc` | Dates from TerraFirmaCraft. |
| `townstead_calendar:serene` | Dates from Serene Seasons. |
| `townstead_calendar:ecliptic` | Dates from Ecliptic Seasons. |

The `profile` setting in `[calendar]` chooses the profile. With `auto` (the default), Townstead uses the first match: TerraFirmaCraft, Serene Seasons, Ecliptic Seasons, then the default. To use your own profile, set its ID, or run `/townstead calendar set-profile`. See [Testing & Commands](/calendars/testing/).

When a season mod is installed and you choose your own profile, Townstead fits your months onto the year of the season mod. See [Custom Calendars](/climate/seasons/#custom-calendars).

## Dates and Ages

Townstead counts world days. The profile turns that count into a date. When you change the profile, the same day count shows as a different date.

Villager ages use a separate scale. The `agingScale` setting sets how many game days make one year of a villager's life. A calendar with longer years does not make villagers age slower. See [Calendar and Aging](/reference/configuration/#calendar-and-aging).

## Your First Calendar

This pack makes a calendar with four months of 30 days and a week of five days.

1. Make the profile at `data/examplepack/calendar_profile/seasons_of_the_vale.json`. The path is the profile ID, `examplepack:seasons_of_the_vale`.

    ```json
    {
      "schema": "townstead:calendar/v1",
      "display_name": { "translate": "calendar_profile.examplepack.seasons_of_the_vale.name" },
      "days_per_week": 5,
      "weekdays": [
        { "long": { "translate": "calendar_profile.examplepack.seasons_of_the_vale.weekday.1" } },
        { "long": { "translate": "calendar_profile.examplepack.seasons_of_the_vale.weekday.2" } },
        { "long": { "translate": "calendar_profile.examplepack.seasons_of_the_vale.weekday.3" } },
        { "long": { "translate": "calendar_profile.examplepack.seasons_of_the_vale.weekday.4" } },
        { "long": { "translate": "calendar_profile.examplepack.seasons_of_the_vale.weekday.5" } }
      ],
      "months": [
        { "days": 30, "common_name": { "translate": "calendar_profile.examplepack.seasons_of_the_vale.month.1" } },
        { "days": 30, "common_name": { "translate": "calendar_profile.examplepack.seasons_of_the_vale.month.2" } },
        { "days": 30, "common_name": { "translate": "calendar_profile.examplepack.seasons_of_the_vale.month.3" } },
        { "days": 30, "common_name": { "translate": "calendar_profile.examplepack.seasons_of_the_vale.month.4" } }
      ]
    }
    ```

2. Put the names in `data/examplepack/lang/en_us.json`:

    ```json
    {
      "calendar_profile.examplepack.seasons_of_the_vale.name": "Seasons of the Vale",
      "calendar_profile.examplepack.seasons_of_the_vale.weekday.1": "Firstday",
      "calendar_profile.examplepack.seasons_of_the_vale.weekday.2": "Seconday",
      "calendar_profile.examplepack.seasons_of_the_vale.weekday.3": "Midday",
      "calendar_profile.examplepack.seasons_of_the_vale.weekday.4": "Fourthday",
      "calendar_profile.examplepack.seasons_of_the_vale.weekday.5": "Restday",
      "calendar_profile.examplepack.seasons_of_the_vale.month.1": "Thaw",
      "calendar_profile.examplepack.seasons_of_the_vale.month.2": "Bloom",
      "calendar_profile.examplepack.seasons_of_the_vale.month.3": "Harvest",
      "calendar_profile.examplepack.seasons_of_the_vale.month.4": "Frost"
    }
    ```

3. Put the pack in the `datapacks` folder of the world, and run:

    ```text
    /reload
    /townstead calendar set-profile "examplepack:seasons_of_the_vale"
    /townstead calendar get
    ```

For the `pack.mcmeta`, use `"pack_format": 15` for Minecraft 1.20.1 and `48` for 1.21.1. To support both, add `"supported_formats": [15, 48]`. The calendar files are the same on both versions.

## Pages

| Page | What it covers |
| --- | --- |
| [Profile Files](/calendars/profiles/) | The fields of a profile, months, weeks, and names. |
| [Dates & Eras](/calendars/dates-and-eras/) | Date formats, year labels, and eras. |
| [Leap Years](/calendars/leap-years/) | Rules that add days, insert months, or rename months in some years. |
| [Stamps](/calendars/stamps/) | Stamp art for the calendar, from a resource pack. |
| [Testing & Commands](/calendars/testing/) | Commands, settings, and errors. |
