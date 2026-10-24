---
title: Climate Zones
description: Zone files, the zones Townstead ships, and how every biome gets a zone.
---

A biome with a [biome profile](/climate/biome-profiles/) uses its profile. Every vanilla biome has one. Zones are for the other biomes, such as those from biome mods. A climate zone sets the shape of a place's climate: how far the year swings, how late the warmest day comes, how far day and night differ, and how humid the air is. Townstead takes the yearly mean from the biome and the swing around it from the zone.

## Zone Files

Put one file for each zone in `data/<namespace>/climate/zone/<id>.json`. The file path sets the zone id: `data/examplepack/climate/zone/highland.json` is the zone `examplepack:highland`.

```json
{
  "schema": "townstead:climate_zone/v1",
  "season_kind": "four_seasons",
  "seasonal_swing_c": 12.0,
  "peak_lag": 0.083,
  "diurnal_range_c": 8.0,
  "humidity": 0.5,
  "mean_offset_c": -2.0
}
```

| Field | Default | Description |
| --- | --- | --- |
| `schema` | | `townstead:climate_zone/v1`. |
| `season_kind` | `"four_seasons"` | `four_seasons`, `wet_dry` or `none`. A `none` zone has no seasonal swing. |
| `seasonal_swing_c` | `0` | Half the yearly range in °C. A swing of 10 makes summer 10 °C above the mean and winter 10 °C below it. |
| `peak_lag` | `0.083` | How long after the summer solstice the warmest day comes, as a fraction of the year. `0.083` is about one month. |
| `diurnal_range_c` | `0` | Half the day and night range in °C on a clear day. The coolest point is just before sunrise. The warmest point is mid-afternoon. |
| `humidity` | `0.5` | From 0 to 1. Pheno can read it with `pheno:climate`. |
| `mean_offset_c` | `0` | Added to the yearly mean of every biome in the zone. |
| `no_season_swing_fraction` | the `need/temperature.json` value (`0.65`) | With no season mod, the share of the swing added above the yearly mean. Use `0` for zones that must stay cold. See [Seasons & Calendars](/climate/seasons/#seasons-come-from-a-season-mod). |
| `wet_dry` | | `dry_offset_c` and `wet_offset_c`, for `wet_dry` zones. Townstead adds `dry_offset_c` at the driest point of the year and `wet_offset_c` at the wettest point, on top of the swing. See [Wet and Dry Seasons](/climate/seasons/#wet-and-dry-seasons). When the season mod does not report wet and dry seasons, a `wet_dry` zone has no seasonal change, like a `none` zone. |

## Zones Townstead Ships

| Zone | Kind | Swing | Day/night | Humidity | Vanilla biomes |
| --- | --- | --- | --- | --- | --- |
| `townstead:polar` | four_seasons | ±15 | ±4 | 0.5 | snowy plains, ice spikes, snowy beach, frozen river and oceans |
| `townstead:subarctic` | four_seasons | ±17 | ±6 | 0.5 | taiga, snowy taiga, old growth taigas |
| `townstead:continental` | four_seasons | ±15 | ±7 | 0.5 | windswept hills, windswept forest |
| `townstead:temperate` | four_seasons | ±10 | ±6 | 0.6 | plains, forests, dark forest, meadow |
| `townstead:maritime` | four_seasons | ±5 | ±4 | 0.8 | oceans, beach, river, stony shore, swamp, mushroom fields |
| `townstead:mediterranean` | four_seasons | ±9 | ±8 | 0.4 | cherry grove, sunflower plains |
| `townstead:arid` | none | | ±14 | 0.1 | desert, badlands |
| `townstead:semi_arid` | wet_dry | ±5 | ±11 | 0.3 | savannas |
| `townstead:tropical_humid` | wet_dry | ±2 | ±5 | 0.9 | jungles, mangrove swamp, warm ocean |
| `townstead:alpine` | four_seasons | ±12 | ±8 | 0.4 | grove, snowy slopes, peaks |
| `townstead:subterranean` | none | | | 0.9 | dripstone caves, lush caves, deep dark |

The `mediterranean` zone also has `mean_offset_c: 4`, so its biomes are warmer than their vanilla temperature suggests.

To change a shipped zone, put a file with the same id in your pack: `data/townstead/climate/zone/temperate.json`.

## Putting Biomes in a Zone

Add the biome to the zone's biome tag. The tag id is the zone id with `climate/` before its path:

| Zone | Tag file |
| --- | --- |
| `townstead:temperate` | `data/townstead/tags/worldgen/biome/climate/temperate.json` |
| `examplepack:highland` | `data/examplepack/tags/worldgen/biome/climate/highland.json` |

```json
{
  "replace": false,
  "values": ["examplepack:windy_moor", "examplepack:heather_hills"]
}
```

Every vanilla biome is in a shipped zone tag. When a biome is in more than one zone tag, Townstead uses the zone that comes first by id.

## Biomes Without a Zone Tag

Many biome mods add biomes that no zone tag lists. Townstead gives them a zone in these steps. Townstead stops at the first match:

1. **Season mod tags.** Ecliptic Seasons' climate tags (such as `eclipticseasons:rain/monsoonal`) and Serene Seasons' `tropical_biomes` tag.
2. **Conventional tags.** `c:` tags on NeoForge and `forge:` tags on Forge, such as `c:is_desert` or `forge:is_snowy`, and vanilla tags such as `minecraft:is_jungle`.
3. **Name keywords.** A word in the biome id, such as `mediterranean`, `tundra` or `rainforest`. A biome mod's `examplemod:mediterranean_coast` joins the Mediterranean zone with no tag.
4. **Climate.** The biome's vanilla temperature and downfall. For example, a temperature below 0.15 gives `polar`.
5. **Fallback.** `townstead:temperate`.

Townstead maps Ecliptic Seasons' rain tags to these zones. The first match is used:

| Ecliptic tag | Zone |
| --- | --- |
| `rain/monsoonal` | `semi_arid` |
| `rain/arid`, `rain/rainless`, `rain/droughty` | `arid` |
| `rain/rainy` | `tropical_humid` |
| `rain/soft` | `maritime` |
| `rain/seasonal/cold` with `c:is_icy` | `polar` |
| `rain/seasonal/cold` | `subarctic` |
| `rain/seasonal/hot` | `semi_arid` |
| `rain/seasonal` | `temperate` |

Nether and End biomes get no zone. Their dimension sets their climate. See [Dimensions](/climate/dimensions/).

Use `/townstead climate biome <biome>` to see a biome's zone and the step that chose it.

### The Derivation File

Townstead's steps are in `data/townstead/climate/derivation.json`. A pack can add its own `data/<namespace>/climate/derivation.json`. Townstead checks a pack's rules before its own.

```json
{
  "schema": "townstead:climate_derivation/v1",
  "rules": [
    { "step": "keyword", "keyword": "moor", "zone": "examplepack:highland" },
    { "step": "conventional", "any_tags": ["c:is_hill"], "zone": "examplepack:highland" },
    { "step": "climate", "max_temperature": 0.3, "min_downfall": 0.6, "zone": "townstead:subarctic" }
  ]
}
```

| Field | Description |
| --- | --- |
| `rules` | The rules, in order. Inside one step, Townstead uses the first rule that matches. |
| `step` | `provider`, `conventional`, `keyword` or `climate`. Townstead checks all `provider` rules first, then `conventional`, then `keyword`, then `climate`. |
| `any_tags` | The biome has at least one of these tags. |
| `all_tags` | The biome has all of these tags. |
| `keyword` | The biome id's path contains this word. |
| `min_temperature`, `max_temperature` | Bounds on the vanilla biome temperature. The minimum is included and the maximum is not. |
| `min_downfall`, `max_downfall` | Bounds on the vanilla biome downfall. |
| `zone` | The zone to give. `"none"` gives no zone. |
| `fallback` | The zone for a biome that no rule matches. |
| `replace` | `true` removes Townstead's rules and the rules of packs loaded before yours. |

A rule that names a zone that does not exist is skipped.
