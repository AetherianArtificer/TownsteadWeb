---
title: Temperature
description: How villagers feel the climate, dress for it, and warm up or cool down.
---

Villagers feel the weather. A villager in a snowy village without a fire gets cold, slows down, and goes looking for a hearth. One working a smoker in the desert overheats and takes shade. Temperature is on by default and works without any other mod, but it takes the climate from Legendary Survival Overhaul, Cold Sweat, or Tough As Nails when one of them is installed.

## Two Layers

The temperature icon shows how a villager **feels**. Its tooltip separates three things:

- **Feels:** the current comfort tier, from Freezing through Comfortable to Sweltering.
- **Core:** their body temperature. For humans the comfortable range is about 36.5 to 37.5 °C.
- **Ambient:** the air temperature where they are standing.

Feels moves quickly and drives behaviour: a villager can feel chilly with a normal core temperature and will go warm up before it becomes a problem. Core moves slowly. Core stress is what brings the penalties.

| Core tier | Effect |
| --- | --- |
| Comfortable | Small mood boost |
| Chilly, Warm | Slight mood drain |
| Cold, Hot | Mood drain, speed -10% |
| Freezing, Sweltering | Large mood drain, speed -25%. The moment recorded in the Chronicle. |

Temperature never harms a villager. Babies are never slowed by it.

## What Affects It

- **Air temperature.** Biome, altitude, rain, night, and the calendar season if one exists. The Nether is hot and the End is cold. A lit heat source warms the air for about seven blocks around it, and water, ice, and snow cool it.
- **Rooms.** An enclosed space has its own temperature, worked out from what it is built of and what is inside. See [Rooms](#rooms).
- **Activity.** Fighting and working generate heat. Standing idle loses a little. Sleeping halves the cold pull.
- **Wetness.** Rain soaks a villager in about half a minute. Swimming soaks them at once. Wet clothing loses most of its protection. Drying takes a minute and a half in mild air, faster in the heat and slower in the cold.
- **Clothing.** Each worn item adds protection: the temperature mod's own value for it when there is one, otherwise a fixed amount for anything in the warm-clothing or cool-clothing tags. The total is capped, so a full set turns a Freezing day into a Cold one and no further. Warm clothing stops helping once the air is already comfortable.
- **The villager's root.** A root can rest at a different body temperature, have a wider or narrower comfort band, be more or less sensitive to cold and heat, carry fur or scales that may shed in summer, be cold-blooded and bask instead of shiver, or ignore climate entirely. See [Roots](/guides/roots/).

## Rooms

Any enclosed space with air in it is a room to the climate model, whether or not it is a recognised building. Each room holds heat:

- **Walls** decide how fast heat leaks out. Stone, brick, and earth hold it well. Wool, hay, and moss are insulation. Glass, fences, leaves, and iron bars leak.
- **Openings** and open doors let the outside in. Villagers close the doors they opened behind them.
- **Heat sources** inside add warmth: campfires most of all, then stoves, furnaces, and smokers. A soul campfire cools. A stove being cooked on gives off part of its heat to the room.
- **People** warm a room a little, up to a few degrees when it is crowded.
- **Cellars** can be cool by nature: a building type can declare that its rooms run colder or warmer.

Small rooms respond quickly. Large halls take a long time to warm and a long time to cool.

## Coping

A villager who feels cold or hot for a minute and a half, or who is suddenly very cold or hot, takes a **temperature break**, even in the middle of work. The tooltip says *Taking a temperature break* while it lasts. They look for relief in this order:

1. Out of the water, if they are in it.
2. Their own home, if it is clearly better than where they are.
3. A **hearth** or **cool spot** the village recognises.
4. Any sheltered heat source or cooling block nearby: campfires, furnaces, lit stoves, and lava on one side; water, ice, and snow on the other.
5. Sun to bask in, for cold-blooded roots. Shade, for anyone too hot.

They stay until they feel comfortable, then go back to what they were doing.

## Hearths And Cool Spots

A hearth is a lit heat source with a few blocks of masonry around it: a fireplace, in other words. A cool spot is the same idea built around water, ice, or snow. When you build one, a chime, a sparkle, and a message on your action bar confirm it. From then on villagers in that village know it is there, and it warms or cools the area for six blocks around.

A hearth also counts as an amenity, so a tavern with a fireplace is a warmer and more attractive place to spend the evening.

## Room Thermometer And Thermostat

Craft a **Room Thermometer** and hang it on a wall to see what villagers feel there. The liquid level shows the band: Freezing, Cold, Mild, Warm, or Hot. Right-click it for the exact reading.

Recipe: a glass pane on top; copper ingot, redstone, copper ingot in the middle row; any planks below.

Combine a thermometer with a comparator to make a **Room Thermostat**. Hang it in the room, right-click it to set a target temperature and choose heating or cooling, and it gives a redstone signal whenever the room needs it. Wire that signal to a heater or cooler, such as the ones Legendary Survival Overhaul adds, and the room holds its temperature on its own. The thermostat reads the room itself and stops the signal once the target is reached.

## Climate Sources And Units

`preferredBackend` in `[needs.temperature]` picks where the air temperature comes from. On `auto`, Townstead prefers Legendary Survival Overhaul, then Cold Sweat, then Tough As Nails, then its own model. Set it to `builtin` to ignore temperature mods entirely.

When one of those mods is installed, players feel Townstead's room temperatures through it too, so a warm tavern is warm for you as well.

Everything is Celsius underneath. The client setting `temperatureUnit` in `[needs_display]` switches the readouts to Fahrenheit.

Pack authors can retune the whole model, from biome anchors to wall conductance, in `data/townstead/need/temperature.json`.
