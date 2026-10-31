---
title: Seasons & Calendars
description: Where the time of year comes from, how the seasonal curve works, and how custom calendars line up with a season mod.
---

## Seasons Come From a Season Mod

Townstead does not make seasons. Townstead reads the time of year from a season mod. Townstead supports these season mods:

| Mod | What Townstead reads |
| --- | --- |
| TerraFirmaCraft | The calendar month and day. In a TerraFirmaCraft world, also its own temperature. |
| Ecliptic Seasons | The solar term and the day inside it. Also the day length of each term, where snow lies, and the monsoon rain of each term. |
| Serene Seasons | Its position in the season cycle, and its tropical wet and dry seasons. |

When more than one is installed, Townstead uses the first one in this order: TerraFirmaCraft, Ecliptic Seasons, Serene Seasons.

Some packs install the Serene Seasons API stub, which makes Ecliptic Seasons look like Serene Seasons to other mods. Townstead finds the stub and reads Ecliptic Seasons directly, so Townstead can still use the 24 solar terms.

With no season mod, there are no seasons. Every day of the year has the same climate: the biome's typical day. Pack data cannot add seasons.

The typical day starts from the biome's yearly mean. Townstead then adds a share of the seasonal swing, set by `no_season_swing_fraction` in the biome's profile or zone:

| Zone | Share | Result |
| --- | --- | --- |
| `temperate`, `maritime`, `mediterranean` and others | 0.65 (the default) | A mild growing-season day. Plains are about 13 to 22 °C. |
| `continental` | 0.5 | Cool uplands. |
| `subarctic`, `alpine` | 0.3 | Cold, with frosty nights. |
| `polar` | 0 | The cold yearly mean. Ice and snow do not thaw. |
| Desert (set in its profile) | 0 | Hot days and cool nights. Deserts are about 18 to 33 °C. |

The day and night curve still applies, so nights are cooler than days in every zone.

## The Time of Year

Townstead turns the season mod's date into a year phase from 0 to 1:

| Phase | Point in the year |
| --- | --- |
| 0 | Start of spring |
| 0.375 | Summer solstice |
| 0.458 | Warmest point (one month after the summer solstice) |
| 0.875 | Winter solstice |
| 0.958 | Coldest point |

The phase matches Ecliptic Seasons' solar terms exactly. For example, Summer Solstice is term 10 of 24 and starts at phase 0.375.

## The Seasonal Curve

The air temperature goes up and down once a year in a smooth curve around the yearly mean. The biome's profile sets the size of the swing. A biome without a profile uses its climate zone. See [Biome Profiles](/climate/biome-profiles/) and [Climate Zones](/climate/zones/).

| Biome | Swing | Winter mean | Summer mean |
| --- | --- | --- | --- |
| Plains | ±7.8 °C | 4.5 °C | 20.1 °C |
| Ocean | ±4.1 °C | 6.9 °C | 15.0 °C |
| Snowy taiga | ±29 °C | −38 °C | 20 °C |
| Jungle | ±0.9 °C | 26.1 °C | 27.9 °C |

The table shows the day's mean. The day and night curve adds to it.

Townstead takes only the date from the season mod. Townstead does not use the temperature numbers that a season mod has for each season. All biomes in one zone follow the same curve, whichever season mod is installed. TerraFirmaCraft worlds are different. See [TerraFirmaCraft Worlds](#terrafirmacraft-worlds).

## Wet and Dry Seasons

A `wet_dry` zone has a wet season and a dry season, not a summer and a winter. The season mod sets when each one comes:

| Mod | Wet season | Dry season |
| --- | --- | --- |
| Serene Seasons | Its tropical early, mid and late wet seasons. The wettest point is at the start of spring. | Its tropical early, mid and late dry seasons. The driest point is at mid year. |
| Ecliptic Seasons | The solar terms with monsoon rain, from Beginning of Summer to First Frost. The wettest point is Lesser Heat, where the rain chance is highest. | The other solar terms. |

In a `wet_dry` zone, Townstead adds the zone's swing and the zone's wet or dry offset. The offset is `dry_offset_c` at the driest point and `wet_offset_c` at the wettest point. Between them, the offset changes gradually. For Ecliptic Seasons, the offset follows the monsoon rain chance of each term. See [Climate Zones](/climate/zones/#zone-files).

| Zone | Dry offset | Wet offset |
| --- | --- | --- |
| `semi_arid` (savanna) | +3 °C | −1 °C |
| `tropical_humid` (jungle) | +1.5 °C | −1.5 °C |

TerraFirmaCraft does not report wet and dry seasons. In a TerraFirmaCraft world, TerraFirmaCraft's own temperature replaces the zone curve, so the offsets do not apply.

Pheno can test the wet or dry season with `"season": ["wet"]` on `pheno:season`, or `"wet_dry": "dry"` on `pheno:climate`. Both match only in a `wet_dry` zone. See [Conditions](/pheno/conditions/#world-and-position).

## TerraFirmaCraft Worlds

TerraFirmaCraft has its own climate model. In a world that uses it, Townstead reads TerraFirmaCraft's temperature for the yearly mean and for the season:

- The yearly mean is TerraFirmaCraft's average temperature at the position. TerraFirmaCraft includes altitude in this number.
- The season is TerraFirmaCraft's temperature now, minus its average. This includes the month, the latitude and the hemisphere.
- TerraFirmaCraft's temperature already changes with the hour, and with a random change from day to day. Townstead does not add its own day and night curve in these worlds.

Townstead still adds its weather, snow, ground, room and local terms. The zone's swing, day and night range, and wet and dry offsets do not apply. Older season offsets still apply.

Crops and the ground use the mean of the day, from TerraFirmaCraft's temperature at midnight and at noon. The ground below the surface follows TerraFirmaCraft's season with a delay, as described in [Underground](/climate/underground/).

A TerraFirmaCraft world that uses TerraFirmaCraft's biome-based model, for example a world with vanilla terrain, uses Townstead's own climate. Only the date comes from TerraFirmaCraft.

## Custom Calendars

A custom calendar profile only labels days with month names, weekdays and eras. It does not decide the season. See [Calendars](/calendars/).

When a season mod is active and the calendar profile is not the season mod's own, Townstead stretches the profile to fit the season mod's year:

- Townstead reads each month's `days` as a weight, not as a day count.
- Townstead gives each month a share of the season mod's year in proportion to its weight. Every month gets at least one day.
- The calendar year starts on the first day of the season mod's spring. A winter month always falls in winter.
- Leap rules do not apply while the profile is stretched, because the season mod's year has a fixed length.
- Weekdays still count world days. They do not stretch.

For example, a profile with ten months of 30 days, under a 96-day season year, gets months of 9 or 10 days.

Ages and dates of birth use the stretched year. The log shows one line for each stretched profile, with its month lengths in days.

Without a season mod, Townstead reads a custom profile's `days` as day counts.

## Older Season Offsets

Older packs set `season_offsets` in `need/temperature.json`. Townstead still adds these offsets on top of the seasonal curve, for each season. The default for each season is `0`. Use climate zones for new packs.
