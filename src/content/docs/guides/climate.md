---
title: Climate
description: Seasons, biomes, day and night, snow, mines and crops in Townstead's climate.
---

Townstead gives every place a climate. The air temperature changes with the biome, the season, the time of day, the weather and the depth. You and the villagers feel it, and crops grow by it.

Climate needs a temperature mod: Legendary Survival Overhaul, Cold Sweat or Tough As Nails. Without one, Townstead has no temperature, and crops grow as in vanilla.

For pack authors, see [How Climate Works](/climate/).

## Biomes

Each biome has the climate of a real place. Plains average about 12 °C, like northern France. Deserts average about 26 °C, with hot days and cool nights. Badlands are a high desert with frosty winters. Jungles stay warm and humid all year. Snowy biomes stay cold, and mountain peaks stay below freezing.

## Seasons

Seasons need a season mod: Serene Seasons, Ecliptic Seasons or TerraFirmaCraft. Without one, every day is a typical day for the biome: mild in plains, cold in snowy biomes, and hot by day in deserts.

With a season mod, plains go from about 0 °C on a winter night to about 25 °C on a summer afternoon. The warmest weeks come about a month after midsummer, and the coldest about a month after midwinter. Coastal biomes change less. Taiga and snowy biomes change more. Tropical biomes hardly change.

## Day and Night

The coldest time is just before sunrise. The warmest is mid-afternoon. Deserts have the biggest difference, and oceans the smallest. The difference is smaller in cloud and rain.

## Rain and Snow

Rain cools the air. Falling snow means the air is below freezing. With snow on the ground, days stay near freezing. Clear nights over snow are very cold.

## Underground

A few blocks underground, the air stops following the weather. A cellar is cool in summer and mild in winter.

Deep mines are warm. At deepslate depth, rock is about 20 °C warmer than at the surface. Rock near lava is hotter still, even through walls, so a tunnel that gets warmer than expected has lava nearby. Villagers working deep need breaks, water and a way to cool down.

## Crops

Each crop needs a temperature range. Melons and pumpkins need warmth. Carrots and potatoes like cool weather but not heat. Wheat grows unless it is cold. A crop outside its range stops growing until the weather changes. It does not die.

A glass room with a heat source works as a greenhouse.

Farmers plant only what will grow in the next few days. When none of their seeds suit the season, their status shows **Out of Season**.

## Temperature Mods

With Legendary Survival Overhaul, Cold Sweat or Tough As Nails installed, Townstead's climate sets the outdoor temperature for that mod by default. Players and villagers then feel the same climate. To use the mod's own climate instead, set `climateAuthority` to `backend`. See [Temperature Mods](/climate/temperature-mods/).

## Checking the Climate

- `/townstead climate here` shows how the temperature where you stand is made up.
- `/townstead climate year` shows the whole year for the biome where you stand.
- A Room Thermometer shows the air temperature on a wall. See [Temperature](/guides/needs/temperature/#room-thermometer-and-thermostat).
