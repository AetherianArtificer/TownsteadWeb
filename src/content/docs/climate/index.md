---
title: How Climate Works
description: How Townstead works out the air temperature at any place and time, and which data files control it.
---

Townstead works out the air temperature at every place from one climate model. Villagers, crops, rooms and thermometers use it, and players feel it through the temperature mod. See [Temperature Mods](/climate/temperature-mods/).

The climate model runs only when a temperature mod is installed: Legendary Survival Overhaul, Cold Sweat or Tough As Nails. Without one, Townstead has no temperature. Crops grow as in vanilla, and the Pheno climate values read the vanilla biome temperature.

This section is for pack authors. For the player's view, see [Climate](/guides/climate/).

## The Parts of the Climate

| Part | What sets it | Page |
| --- | --- | --- |
| Yearly mean | The biome's profile, from real climate data. Plains average about 12 °C over the year. | [Biome Profiles](/climate/biome-profiles/) |
| Seasons | The biome's profile, or its climate zone, sets the size of the swing. A season mod sets the time of year. | [Seasons & Calendars](/climate/seasons/) |
| Day and night | The climate zone sets the range. Rain and cloud make it smaller. | [Climate Zones](/climate/zones/) |
| Weather | Rain cools the air by evaporation, more in dry air. Falling snow and lying snow have their own rules. | [Climate Settings](/climate/settings/#weather-and-snow) |
| Altitude | Air gets colder above sea level. | [Climate Settings](/climate/settings/#yearly-means) |
| Dimension | A dimension can use biome climates or one fixed temperature. | [Dimensions](/climate/dimensions/) |
| Underground | Under natural terrain, the air moves toward the ground temperature. Deep rock and buried lava are warm. | [Underground](/climate/underground/) |
| Rooms | An enclosed space has its own air temperature. | [Temperature](/guides/needs/temperature/#rooms) |
| Local heat | Fires, stoves and ice near a position warm or cool it. Pheno fields can add a local climate. | [Pheno](#pheno) |

## How Townstead Calculates the Air

For a position outside any room, Townstead does these steps in order:

1. Take the yearly mean of the biome, then subtract the altitude cooling.
2. Add the seasonal swing for today's date. With no season mod, this is zero.
3. Add the day and night curve for the time of day.
4. Add the rain cooling. Then apply the snow rules.
5. Blend toward the ground temperature when natural terrain covers the position.
6. Add nearby heat and cooling sources, and any Pheno local climate.

In a TerraFirmaCraft world, TerraFirmaCraft's own temperature replaces steps 1 to 3. See [TerraFirmaCraft Worlds](/climate/seasons/#terrafirmacraft-worlds).

Inside a room, Townstead uses the room's own air temperature. The room exchanges heat with the outdoor air from step 4 and with the ground below it.

## Example: Temperate Plains

The plains biome is in the `temperate` zone. With a season mod installed, plains air goes from about 0 °C on a clear winter night to about 25 °C on a summer afternoon. With no season mod, every day is a mild growing-season day: about 13 °C before sunrise and about 22 °C in the afternoon.

Use `/townstead climate year minecraft:plains` to see the full year. See [Testing & Commands](/climate/testing/).

## Data Files

| File | What it controls | Page |
| --- | --- | --- |
| `data/<namespace>/climate/biome/<path>.json` | One biome's climate, from real data. | [Biome Profiles](/climate/biome-profiles/) |
| `data/<namespace>/climate/zone/<id>.json` | One climate zone, for biomes without a profile. | [Climate Zones](/climate/zones/) |
| `data/<namespace>/climate/derivation.json` | How biomes with no zone tag get a zone. | [Climate Zones](/climate/zones/#biomes-without-a-zone-tag) |
| `data/<namespace>/climate/dimension/<id>.json` | The climate of one dimension. | [Dimensions](/climate/dimensions/) |
| `data/<namespace>/tags/worldgen/biome/climate/<zone>.json` | Which biomes are in a zone. | [Climate Zones](/climate/zones/#putting-biomes-in-a-zone) |
| `data/<namespace>/tags/block/crops/climate/<class>.json` | Which crops are in a crop climate class. | [Crops](/climate/crops/) |
| `data/townstead/need/temperature.json` | Means, weather, snow, ground and crop numbers. | [Climate Settings](/climate/settings/) |

## Pheno

Pheno can read the climate and change it locally:

- The `pheno:climate` condition tests the zone, the time of year, snow and the air temperature. See [Conditions](/pheno/conditions/#world-and-position).
- The `pheno:air_temperature` and `pheno:climate` values read numbers from the climate. See [Selectors & Values](/pheno/selectors-values/).
- `climate_offset_c` on `pheno:cloud` makes a field that warms or cools the air inside it, for every temperature mod. See [Actions](/pheno/actions/).
