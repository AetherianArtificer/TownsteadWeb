---
title: Biome Profiles
description: Real-climate profiles that set a biome's mean, seasons and daily range, and how they replace zones.
---

A biome profile gives one biome its climate from real climate data. Townstead ships a profile for every vanilla biome. Each profile uses the climate of a real place. For example, the badlands profile uses the climate of a high desert, with frosty winters and hot summers.

A biome with a profile uses its profile. A biome without one, for example from a biome mod, uses its [climate zone](/climate/zones/).

## Profile Files

Put the file at `data/<namespace>/climate/biome/<path>.json`. The file path sets the biome: `data/examplepack/climate/biome/windy_moor.json` is for the biome `examplepack:windy_moor`.

```json
{
  "schema": "townstead:climate_biome/v1",
  "mean_c": 6.6,
  "coldest_month_c": 0.6,
  "warmest_month_c": 13.5,
  "daily_range_c": 8.0,
  "typical_y": 100
}
```

| Field | Default | Description |
| --- | --- | --- |
| `schema` | | `townstead:climate_biome/v1`. |
| `mean_c` | | The yearly mean in °C. Required. |
| `coldest_month_c` | `mean_c` | The mean of the coldest month. |
| `warmest_month_c` | `mean_c` | The mean of the warmest month. |
| `daily_range_c` | `0` | The average difference between the warmest and coldest hour of a day. |
| `typical_y` | sea level | The biome's usual surface height. The air is colder above this height and warmer below it, down to sea level. |
| `season_kind` | `"four_seasons"` | `four_seasons`, `wet_dry` or `none`. Use `none` for caves, the Nether and the End. |
| `no_season_swing_fraction` | the zone's value | With no season mod, the share of the swing added above the mean. See [Seasons & Calendars](/climate/seasons/#seasons-come-from-a-season-mod). |
| `humidity` | the zone's value | From 0 to 1. |
| `underground_offset_c` | `0` | Added to the ground temperature where this biome lies under cover. Use it for cave biomes. See [Underground](/climate/underground/#cave-biomes). |

## Biomes From Other Mods

A biome mod or a datapack can give a profile to any biome. The other mod does not need changes. Put the file under the biome's namespace, for example `data/examplemod/climate/biome/misty_fen.json` for `examplemod:misty_fen`.

To change a shipped profile, put a file at the same path in a datapack. Townstead uses the file from the datapack that loads last. For example, `data/minecraft/climate/biome/plains.json` replaces the plains profile.

## What Townstead Calculates From a Profile

- **Seasonal swing:** half the difference between `warmest_month_c` and `coldest_month_c`. The warmest point comes one month after the summer solstice, as for zones.
- **Day and night:** half of `daily_range_c` above and below the day's mean. Rain and cloud make the range smaller.
- **Altitude:** 1 °C colder for each 15 blocks above `typical_y`, and 1 °C warmer for each 15 blocks below it, down to sea level. So a mountain biome is not colder only because of its usual height, and its low valleys are warmer than its peaks. Below sea level, the air does not get warmer.
- **Zone values:** the biome keeps its zone for `pheno:climate` zone tests, its wet and dry offsets, and its no-season share when the profile does not set them.

## How to Pick the Numbers

Find a real place with the climate you want for the biome. Use its climate normals:

- `mean_c`: the yearly mean temperature.
- `coldest_month_c` and `warmest_month_c`: the mean temperatures of the coldest and warmest months.
- `daily_range_c`: the average daily maximum minus the average daily minimum.

Then set `typical_y` to the height where the biome's surface usually is in game.

## Biomes With No Seasons

A profile with `"season_kind": "none"` has one temperature all year. Only `mean_c` matters. The Nether and End have no year and no sun, so their biomes have no seasons:

| Biome | Mean |
| --- | --- |
| Nether wastes | 45 °C |
| Crimson forest | 40 °C |
| Warped forest | 36 °C |
| Soul sand valley | 30 °C |
| Basalt deltas | 55 °C |
| End biomes | −5 °C |

A Nether or End biome from another mod, with no profile, uses its dimension's `default_c`. See [Dimensions](/climate/dimensions/).

Use `/townstead climate biome <biome>` to see a biome's profile. See [Testing & Commands](/climate/testing/).
