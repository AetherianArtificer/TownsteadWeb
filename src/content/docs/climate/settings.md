---
title: Climate Settings
description: The climate numbers in need/temperature.json.
---

Townstead reads its climate numbers from `data/townstead/need/temperature.json`. To change them, put a file at the same path in your pack. Townstead uses the shipped value for any field that your file does not set.

This page lists the climate fields. The same file also holds room heat and body temperature settings. See [Temperature](/guides/needs/temperature/).

## Yearly Means

| Field | Default | Description |
| --- | --- | --- |
| `biome_anchors` | see below | Pairs of vanilla biome temperature and yearly mean in °C. Townstead draws straight lines between the pairs and extends the end lines past them. |
| `biome_mean_c` | oceans, river, stony shore, mushroom fields, windswept biomes, stony peaks, cherry grove | Yearly means for single biomes by id, or for tags written as `#namespace:path`. Townstead checks ids first, then tags in file order. |
| `altitude_blocks_per_degree` | `15` | Above sea level, the air is 1 °C colder for each 15 blocks. For a biome with a profile, the height is counted from its `typical_y`, in both directions. |
| `nether_celsius` | `45` | The temperature of an ultrawarm dimension without a dimension file. |
| `end_celsius` | `5` | The temperature of an unnatural dimension without a dimension file. |

The shipped anchors:

| Vanilla temperature | Yearly mean | Example biome |
| --- | --- | --- |
| −0.5 | −12 °C | snowy taiga |
| 0.15 | −3 °C | |
| 0.8 | 13 °C | plains |
| 0.95 | 24 °C | jungle |
| 2.0 | 26 °C | desert, savanna |

Many vanilla biomes share one temperature. For example, every ocean has 0.5. Use `biome_mean_c` to set them apart:

```json
{
  "biome_mean_c": {
    "minecraft:warm_ocean": 25.0,
    "#examplepack:volcanic": 30.0
  }
}
```

The zone's `mean_offset_c` adds to the mean from either source. See [Climate Zones](/climate/zones/).

## Worlds Without Seasons

| Field | Default | Description |
| --- | --- | --- |
| `no_season_swing_fraction` | `0.65` | With no season mod, every day adds this share of the zone's swing above the yearly mean. A zone file can set its own value. |

## Weather and Snow

| Field | Default | Description |
| --- | --- | --- |
| `rain_wet_bulb_fraction_day` | `0.4` | At midday, falling rain cools the air this share of the way to its wet-bulb temperature. See [Rain and Humidity](#rain-and-humidity). |
| `rain_wet_bulb_fraction_night` | `0.2` | The same share at night. |
| `rain_offset` | `0` | An extra flat amount added under open sky while it rains or snows. |
| `cloud_diurnal_factor` | `0.4` | While it rains, the day and night range is this fraction of its usual size. |
| `snowfall_c` | `-3` | While snow falls on a position, the air is this temperature or colder. |
| `snow_day_max_c` | `1` | With snow on the ground, daytime air is this temperature or colder. The snow uses the heat of the sun to melt. |
| `snow_night_cooling_c` | `-5` | With snow on the ground, clear nights are this much colder. |

### Rain and Humidity

Each place has a relative humidity from 0 to 1. It comes from the biome profile's `humidity`, else the zone's, as a typical daytime value. It is higher at dawn and lower in the afternoon. While it rains, it is 1.

Falling rain cools the air by evaporation. The air can only cool as far as its wet-bulb temperature, the temperature a wet surface reaches in that air. Warm dry air has a low wet bulb, so rain in a desert cools the air a lot. Humid or cold air has a wet bulb near the air temperature, so rain cools it very little. Rain cools about half as much at night as at midday. Clouds also make the day and night range smaller, so a rainy night is milder than a clear one.

| Rain | Cooling |
| --- | --- |
| Plains, 20 °C, noon | About 2 °C |
| Desert, 35 °C, noon | About 6 °C |
| Jungle, 30 °C, noon | Less than 1 °C |

Snow on the ground means a snow layer, snow block or powder snow at or under the position. With Ecliptic Seasons, it also means Ecliptic's own snow cover, which has no blocks.

## Underground

| Field | Default | Description |
| --- | --- | --- |
| `surface_layer_blocks` | `3` | Cover at which the air reaches the ground temperature. |
| `ground_damping_depth_blocks` | `3` | Depth at which the seasonal swing is about one third of the surface swing. |
| `geothermal_start_y` | `48` | Rock below this height gets warmer with depth. |
| `geothermal_c_per_block` | `0.15` | Heat for each block below `geothermal_start_y`. |
| `geothermal_deepslate_y` | `0` | Below this height, the steeper rate applies. |
| `geothermal_deepslate_c_per_block` | `0.2` | Heat for each block below `geothermal_deepslate_y`. |
| `lava_rock_radius` | `12` | Lava within this distance warms the rock. Maximum `24`. |
| `lava_rock_c` | `1.5` | Heat from one lava block at a distance of one block. Each block adds this value divided by its distance. |
| `lava_rock_max_c` | `25` | The most heat that lava can add. |

See [Underground](/climate/underground/).

## Comfort and Acclimation

| Field | Default | Description |
| --- | --- | --- |
| `comfort_range_c` | `[15, 27]` | The feels-like range where a body is comfortable, when the temperature mod gives none. |
| `acclimation.cold_shift_c` | `[-4, -2]` | How far full cold adaptation moves the low and high ends of the range. |
| `acclimation.hot_shift_c` | `[2, 4]` | How far full heat adaptation moves them. |
| `acclimation.full_minutes` | `60` | Real minutes for a full change. |

A root can change these per body with `comfort_offset_c` and `acclimation` on `pheno:thermal_tolerance`.

## Heat Sources

A heat or cooling source does two things:

- **Room heat:** while it is active, it puts its power into the room it stands in. The room warms over minutes.
- **Radiant heat:** a body that can see the source feels warmer (or colder) at once. Radiant heat is strong at one block, about a quarter of that at three blocks, and stops behind solid blocks. It warms bodies, not the air.

Each source is an entry in `thermal_appliances`, by block id:

```json
"thermal_appliances": {
  "examplepack:clay_oven": {
    "power_w": 2500,
    "surface_c": 200,
    "size": 1,
    "draft": true
  }
}
```

| Field | Default | Description |
| --- | --- | --- |
| `power_w` | | Heat put into the room while the source is active, in watts. Negative for cooling. `room_power_w` is the older name. |
| `surface_c` | | Temperature of the hot or cold face. With `size`, sets the radiant heat. |
| `cold_surface_c` | | For a `reversible` source, the face temperature on its cooling side. |
| `size` | `1` | Radiating area, in block faces. |
| `radiant_degrees` | | Sets the radiant heat directly, in place of `surface_c`. |
| `draft` | `true` | The source burns room air, so it also pulls outside air through the room. |
| `reversible` | `false` | The source heats or cools as its temperature mod reports. |
| `native_reference_degrees` | `0` | The temperature mod's value at full output, to scale partial output. |

A block with no entry uses its temperature mod's block value, then the `#townstead:thermal/heat_sources` and `#townstead:thermal/cooling_sources` tags.

| Field | Default | Description |
| --- | --- | --- |
| `thermal_radiant_per_surface_degree` | `0.0667` | Radiant heat at the face for each degree the face is above the air, per block face. |
| `source_radius` | `10` | How far to look for sources, in blocks. |
| `heat_source_offset` | `12` | Radiant heat of a tagged heat source. |
| `cooling_source_offset` | `-8` | Radiant chill of a tagged cooling source in 30 °C air. The chill gets smaller as the air gets colder, and is 0 at 0 °C and below. |
| `thermal_radiant_max_c` | `40` | Radiant heat from several sources together stops rising here. |

## Crops

| Field | Default | Description |
| --- | --- | --- |
| `crop_climate` | five classes | A range for each crop climate class, with `min_c` and `max_c`. An open end has no limit. |
| `crop_default_class` | `"temperate"` | The class of a crop that has none. |

```json
{
  "crop_climate": {
    "warm_season": { "min_c": 10.0 },
    "alpine_herb": { "min_c": -2.0, "max_c": 18.0 }
  }
}
```

A new class needs its tag, here `#townstead:crops/climate/alpine_herb`. See [Crops](/climate/crops/).

## Older Fields

`season_offsets` and `night_offset` come from before the climate zones. Townstead still adds them on top of the model. Both default to `0`.
