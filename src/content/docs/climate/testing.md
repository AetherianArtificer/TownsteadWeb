---
title: Testing & Commands
description: How to check climate data for errors and see the climate in game.
---

## 1. Check the Log

After you add or change files, run `/reload` and read the game log (`logs/latest.log`). Look for this line:

```txt
[Climate] Loaded 11 climate zones, 63 biome profiles, 3 dimension climates and 40 derivation rules
```

The numbers change with the packs you install. A file with an error logs a line such as `[Climate] Skipping examplepack:zone/highland: Unknown season_kind 'four-seasons'`, and Townstead does not load that file.

When a custom calendar profile is stretched onto a season year, the log shows a line such as `[Calendar] Stretched profile examplepack:river_calendar onto the 96-day season year`.

## 2. Check a Biome's Zone

```txt
/townstead climate biome
/townstead climate biome examplepack:windy_moor
```

Without a biome, the command uses the biome where you stand. It shows the zone, the step that chose it, and the zone's swing, day and night range, and humidity. If the step is `fallback`, no tag or rule matched the biome.

## 3. Check the Year

```txt
/townstead climate year
/townstead climate year minecraft:desert
```

The command shows 24 rows, one for each part of the year, with the noon and midnight temperature on a clear day at your height. A marker shows today's row. With no season mod, it shows one line, because every day is the same.

## 4. Check a Position

```txt
/townstead climate here
```

The command shows:

- The air temperature where you stand, the active temperature mod, and the climate authority mode.
- Each part of the open air: mean, season, day and night, weather, snow and local climate. Then the relative humidity and the wet-bulb temperature.
- The heat and cooling sources in sight, with the radiant heat that each one gives where you stand.
- What you feel: your environment, your feels-like temperature, your comfortable range, your exertion, and the value that Townstead sends to the temperature mod.
- The biome's zone.
- The season clock: the season mod, the year phase and the length of the year. When the season mod reports wet and dry seasons, also the wet or dry season and its wetness from 0 to 1.
- The dimension's climate settings.
- Whether the temperature mod has its own seasons and its own deep-rock heat.
- The cover, ground temperature, deep-rock heat, lava heat and cave biome offset.
- The temperature that crops at this position use today.

`/townstead thermal diagnose` shows the room at your position, and the same ground line.

## 5. Check in Play

- Wait for a season change, or use your season mod's command to change the date. Run `/townstead climate here` again.
- Dig down a few blocks in summer and in winter. The air underground changes less than the air outside.
- Put a Room Thermometer in a mine near lava.
