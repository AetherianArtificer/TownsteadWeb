---
title: Temperature Mods
description: How the climate model works with Legendary Survival Overhaul, Cold Sweat and Tough As Nails.
---

Townstead works with three temperature mods: Legendary Survival Overhaul, Cold Sweat and Tough As Nails. Each of them has its own climate. Without care, every mod gives a different temperature for the same place. The climate authority setting decides which climate counts.

## Climate Authority

Set `climateAuthority` in `[needs.temperature]`. You can also change it on the Switchboard screen.

| Value | What happens |
| --- | --- |
| `townstead` (default) | Townstead's climate model sets the outdoor temperature for every mod. All mods give the same temperature for the same place. |
| `backend` | The temperature mod's own climate counts. Townstead adds only what that mod does not have. |

In both modes, the temperature mod still controls the player's body temperature, clothing, food and drink. Townstead reads the mod's data for blocks and clothing, so a block or garment that the mod has data for also warms or cools villagers.

Who applies heat and cooling blocks to players depends on the mode. In Townstead mode with room heat on, Townstead does, for every body. Otherwise the temperature mod does. See [Heat and Cooling Blocks](#heat-and-cooling-blocks).

## Townstead Mode

Townstead replaces the parts of each mod's climate that come from biome, season, time of day, weather, altitude and depth. With room heat on, it also replaces the mod's heat and cooling blocks:

| Mod | What Townstead replaces | What the mod still controls |
| --- | --- | --- |
| Legendary Survival Overhaul | The biome, time, season, weather, altitude and block modifiers. | All player effects. |
| Cold Sweat | The world temperature, nearby blocks, and the warmth that hearths, boilers and iceboxes give. | Nearby entities, potion and food effects, and the body. |
| Tough As Nails | The temperature level, including the steps for nearby blocks. | Thermoregulators and player effects. |

Villagers, rooms, crops and thermometers use Townstead's climate directly in this mode.

Use this mode for the most consistent world. Your temperature mod's climate settings for biomes and seasons have no effect in this mode.

## Backend Mode

The temperature mod's climate counts. Townstead adds these things when the mod does not have them:

- **Seasons.** Townstead checks whether the mod already has a season modifier from any source, such as its own compat or a compat mod. If it has none, Townstead adds the seasonal curve of the climate zone.
- **Snow.** The snow rules near the surface. See [Climate Settings](/climate/settings/#weather-and-snow).
- **Underground heat.** Deep-rock heat and buried lava. Cold Sweat already makes deep rock warmer, so Townstead adds only lava heat to Cold Sweat.

Use `/townstead climate here` to see whether your mod has its own seasons. See [Testing & Commands](/climate/testing/).

## Heat and Cooling Blocks

In Townstead mode with room heat on, Townstead applies every heat and cooling block to every body: villagers and players, indoors and outdoors. A block's numbers come from the first of these that has them:

1. Townstead's `thermal_appliances` data. See [Climate Settings](/climate/settings/#heat-sources).
2. The temperature mod's data for the block, such as a Cold Sweat block temperature.
3. The `#townstead:thermal/heat_sources` and `#townstead:thermal/cooling_sources` tags.

The same block feels the same to a villager and a player. Standing next to a fire raises the player's temperature at once.

A Cold Sweat hearth, boiler or icebox is a heat source like any other. It heats the room it stands in and warms bodies near it. It does not spread warmth through a whole building on its own. In smart mode, a hearth with fuel burns whether or not a player is cold, and uses its fuel at Cold Sweat's rate.

In backend mode, or with room heat off, the temperature mod applies its own blocks to players, as it does without Townstead.

## What Players Feel

In the same mode, Townstead also works out what each player feels, by the same rules as villagers: clothing, wetness, activity, humidity, water and the player's root. The temperature mod receives that value as the player's environment, so putting on a coat or stepping up to a fire moves its gauge at once.

| Mod | Townstead replaces | The mod keeps |
| --- | --- | --- |
| Cold Sweat | Its armour insulation, the temperature effect of its soaking, and its acclimation for roots that set their own. | Its soaking and drying, drips, potions, food and the body. |
| Tough As Nails | Its armour step and its wet step. | Thermoregulators, held items, food and drink. |
| Legendary Survival Overhaul | Its wetness, item attribute, sprint and resistance influences. | Its wetness tracking, food and drink, and the body. |

The temperature mod's comfortable range applies to villagers too. A root that sits comfortable warmer or colder, or feels cold or heat more or less, reaches the mod by a shift of the value Townstead sends.

## Ecliptic Seasons Compat Mods

Ecliptic Seasons does not change the vanilla biome temperature. Cold Sweat and Tough As Nails read the vanilla value, so they see no Ecliptic seasons on their own. Two other mods fill this gap:

| Mod | Effect |
| --- | --- |
| Ecliptic Seasons: MultiMod Patch | Adds a Cold Sweat season modifier that uses Ecliptic's solar terms. |
| Serene Seasons API Stub (Ecliptic Seasons Bridge) | Makes Ecliptic Seasons look like Serene Seasons. Every mod with Serene Seasons support then gets seasons. |

Townstead detects both. In Townstead mode they make no difference to the temperature. In backend mode, Townstead does not add its own seasons on top of theirs.

With the API stub installed, Legendary Survival Overhaul runs both its Serene Seasons and its Ecliptic Seasons modifiers, which counts every season twice. Townstead turns off the Serene Seasons copy when Legendary Survival Overhaul's Ecliptic Seasons support is on.
