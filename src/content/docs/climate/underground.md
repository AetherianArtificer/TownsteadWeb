---
title: Underground
description: How cover, ground temperature, deep-rock heat and buried lava change the air below the surface.
---

Under natural terrain, the air changes less with the surface weather and comes nearer to the temperature of the ground. Shallow cellars stay mild all year. Deep mines get warm, and rock near lava gets hot.

## Cover

Townstead measures cover as the number of blocks of natural terrain above head height. It counts from the highest natural block in the column, so a house roof or a floor above you does not count.

Natural terrain is any block in `#townstead:thermal/terrain`. The tag includes stone types, dirt, sand, gravel, clay, terracotta, ores, sandstone, calcite, snow and ice blocks, and bedrock. It also includes the conventional stone and ore tags, so stone from other mods counts.

Under open sky, cover is zero.

| Cover | Air |
| --- | --- |
| 0 blocks | Surface air. |
| 1 to 2 blocks | A blend of surface air and ground temperature. |
| 3 blocks or more | Ground temperature. |

`surface_layer_blocks` (default `3`) sets where the blend ends.

## Ground Temperature

The ground temperature changes slowly with the surface climate:

- Day and night make no difference to the ground.
- The seasonal swing gets smaller with depth. At 3 blocks it is about one third of the surface swing. At 9 blocks it is about one twentieth.
- The seasonal swing also arrives later with depth. At 5 to 8 blocks, the ground is warmest around the start of winter.
- Far down, the ground stays at the yearly mean of the surface biome.

`ground_damping_depth_blocks` (default `3`) sets how fast the swing gets smaller.

A room uses the same ground temperature for the ground below its floor. A cellar is cool in summer and mild in winter.

## Cave Biomes

Underground, the ground temperature comes from the biome at the surface above you. A cave biome then adds its own offset:

| Cave biome | Offset | Why |
| --- | --- | --- |
| Lush caves | +2 °C, very humid | The plants and the moisture make the air mild. |
| Dripstone caves | −1 °C, damp | Dripping water cools the air as it evaporates. |
| Deep dark | −25 °C | Sculk makes the air cold. This is more than the heat of the deep rock, so the deep dark is cold, about 5 to 10 °C. |

The offset is `underground_offset_c` in the biome's profile. See [Biome Profiles](/climate/biome-profiles/). In backend mode, Cold Sweat uses its own cave biome temperatures, so Townstead does not add these offsets to it.

## Deep-Rock Heat

Rock gets warmer with depth. Townstead fits the heat of a real deep mine into the height of the world:

| Height | Extra heat |
| --- | --- |
| Above Y=48 | None |
| Y=48 to Y=0 | 0.15 °C for each block, up to 7.2 °C |
| Below Y=0 (deepslate) | 0.2 °C for each block, up to about 20 °C at Y=−64 |

In temperate plains, the bottom of the world is about 33 °C. Deep mines need cooling, ventilation, water to drink and breaks.

Change the numbers with `geothermal_start_y`, `geothermal_c_per_block`, `geothermal_deepslate_y` and `geothermal_deepslate_c_per_block`.

## Lava Heat

Buried lava warms the rock around it, even through walls. Each lava block within 12 blocks adds heat that gets smaller with distance. A large lava lake close by can add up to 25 °C.

If a tunnel is warmer than its depth explains, lava is near. To find it, use a Room Thermometer or `/townstead climate here`.

Change the numbers with `lava_rock_radius`, `lava_rock_c` and `lava_rock_max_c`.

Lava in the open is also a heat source for the air within 7 blocks.

## With a Temperature Mod

In [Townstead mode](/climate/temperature-mods/#climate-authority), all of the above applies to every temperature mod. In backend mode, the mod's own underground model counts, and Townstead adds deep-rock heat and lava heat. Cold Sweat already makes deep rock warmer, so Townstead adds only lava heat to it.

The ground model only applies in dimensions with `"underground": true`. See [Dimensions](/climate/dimensions/).
