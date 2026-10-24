---
title: Dimensions
description: Climate files for dimensions, and the climate a dimension gets without a file.
---

Each dimension has a climate. It can use biome climates, as the overworld does, or one fixed temperature, as the Nether does.

## Dimension Files

Put the file at `data/<namespace>/climate/dimension/<path>.json`. The file path sets the dimension: `data/examplepack/climate/dimension/skylands.json` is for the dimension `examplepack:skylands`.

```json
{
  "schema": "townstead:climate_dimension/v1",
  "temperature": "biomes",
  "season_clock": "overworld",
  "day_cycle": true,
  "weather": true,
  "underground": false,
  "layers": [
    { "above_y": 200, "offset_c": -8.0 },
    { "below_y": 40, "offset_c": 5.0 }
  ]
}
```

| Field | Default | Description |
| --- | --- | --- |
| `schema` | | `townstead:climate_dimension/v1`. |
| `temperature` | `"biomes"` | `"biomes"` uses biome means and climate zones. A number sets one fixed temperature in °C for the whole dimension. |
| `season_clock` | `"overworld"` | `"overworld"` uses the season mod's date. Use `"none"` for no seasons. |
| `day_cycle` | `true` for biomes, `false` for a fixed temperature | Adds the day and night curve. |
| `weather` | `true` for biomes, `false` for a fixed temperature | Applies rain cooling and the snow rules. |
| `underground` | `true` for biomes, `false` for a fixed temperature | Applies the ground model under natural terrain. See [Underground](/climate/underground/). |
| `layers` | | Offsets by height. Each layer has `offset_c` and optional `above_y` and `below_y`. Townstead adds every layer that contains the position. |
| `default_c` | | With biome climates, the mean of a biome that has no [biome profile](/climate/biome-profiles/). |

Townstead ships files for `minecraft:overworld`, `minecraft:the_nether` and `minecraft:the_end`. The Nether and End use biome climates with no seasons, day cycle, weather or ground model. Each of their biomes has its own temperature from its biome profile. A modded biome without a profile uses `default_c`: 45 °C in the Nether and −5 °C in the End.

## Dimensions Without a File

Townstead takes a default from the dimension type:

| Dimension type | Climate |
| --- | --- |
| Ultrawarm, like the Nether | Fixed `nether_celsius` (45 °C). No seasons, day cycle, weather or ground model. |
| Not natural, like the End | Fixed `end_celsius` (5 °C). No seasons, day cycle, weather or ground model. |
| Natural with a ceiling | Biome climates. No seasons, day cycle, weather or ground model. |
| Natural with sky light | Biome climates, with day and night, weather and the ground model. Seasons only in the overworld. |

A modded dimension with sky light gets no seasons by default, because the season mod may not run seasons there. To give it seasons, add a file with `"season_clock": "overworld"`.

`nether_celsius` and `end_celsius` are in `need/temperature.json`. See [Climate Settings](/climate/settings/).
