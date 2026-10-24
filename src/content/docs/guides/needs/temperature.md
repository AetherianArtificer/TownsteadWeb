---
title: Temperature
description: How villagers feel the climate, dress for it, and warm up or cool down.
---

Villagers feel the weather. A villager in a snowy village without a fire gets cold, slows down, and goes looking for a hearth. One working a smoker in the desert overheats and takes shade. Temperature runs only when a temperature mod is installed: Legendary Survival Overhaul, Cold Sweat or Tough As Nails. Without one, Townstead has no temperature at all, as if it were switched off: no body temperature for villagers or players, no room heat, no Room Thermometer or Thermostat, and crops grow as in vanilla.

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

A body judges one number, **feels like**, against a **comfortable range**. Feels like starts from the air and adds everything below. Players feel it by the same rules as villagers.

- **Air temperature.** Biome, season, time of day, rain, snow, altitude and depth. See [Climate](/guides/climate/). The Nether is hot and the End is cold.
- **Rooms.** An enclosed space has its own temperature, worked out from what it is built of and what is inside. See [Rooms](#rooms).
- **Heat sources.** A body that can see a fire feels its radiant heat at once: strong one block away, about a quarter of that at three blocks, nothing behind a wall. Ice, snow and coolers chill the same way, less strongly. Ice and snow chill only air above freezing, so a snowfield does not make a winter night colder.
- **Clothing.** Each worn item keeps heat in. Townstead's clothing data counts first, then the temperature mod's value for the item, then the warm-clothing and cool-clothing tags. Clothing stops a share of the cold, so the same coat helps more the colder it gets. It helps more again while the body works, because the body's own heat stays in. Warm clothing in mild or hot air feels warm. See [Dressing for the Cold](#dressing-for-the-cold).
- **Exertion.** Walking, working and running make heat: about 2.4, 3.3 and 4 times as much as rest. The heat builds up over about two minutes and fades over about three, so a short sprint barely counts and a long hike warms a body well. In heat, exertion makes it feel hotter. Sleeping halves the cold pull.
- **Wetness.** Rain soaks a villager in about half a minute. Swimming soaks them at once. Wet clothing loses most of its warmth, and wet skin chills as it dries. Drying is fast in dry air and slow in humid air.
- **Humidity.** Humid heat feels hotter, because sweat cannot cool the body. Dry heat feels milder. When the air is both very hot and very humid, clothing and shade do not help. Only a cooler, drier place helps.
- **Water.** Water takes heat far faster than air. A 15 °C lake feels like about −7 °C. Water changes with the season after a delay, and changes very little between day and night.
- **The body's root.** A root can rest at a different body temperature, be more or less sensitive to cold and heat, sit comfortable at a warmer or colder range, carry fur or blubber that may shed in summer, be cold-blooded, stay dry in water, or ignore climate entirely. See [Roots](/guides/roots/).

### Dressing for the Cold

After a few minutes of the same activity:

| At −20 °C | Standing still | Walking |
| --- | --- | --- |
| Everyday clothes | Freezing | Cold |
| A fur coat | Cold | Chilly |
| A full fur set (hat, coat, trousers, boots) | Chilly | Comfortable |

Wet clothing loses most of its warmth. In deep cold, keep moving, keep dry, and stop near a fire. The same fur set is too warm on a mild day.

### The Comfortable Range

The temperature mod's own comfortable range applies to villagers too, so villagers and players suffer at the same point. Cold Sweat uses its habitable range, Tough As Nails its neutral level, and Legendary Survival Overhaul the span between its cold and hot thresholds.

### Acclimation

Bodies adapt to where they live. Over a few in-game days, a body in a cold place is comfortable a few degrees colder, and a body in a hot place a few degrees warmer. A villager starts adapted to the climate where it first appears. With Cold Sweat, its acclimation settings apply. Cold-blooded roots do not acclimate unless the root says so.

## Rooms

Any enclosed space with air in it is a room to the climate model, whether or not it is a recognised building. Each room holds heat:

- **Walls** decide how fast heat leaks out. Stone, brick, and earth hold it well. Wool, hay, and moss are insulation. Glass, fences, leaves, and iron bars leak.
- **Openings** and open doors let the outside in. Villagers close the doors they opened behind them.
- **Heat sources** inside add warmth: campfires most of all, then hearths, stoves, furnaces, and smokers. A soul campfire is a weaker fire. A lit stove heats the room whether or not anything is cooking.
- **Near a source**, a body also feels its radiant heat: strong one block away, about a quarter of that at three blocks, and nothing behind a wall. Radiant heat warms bodies, not the air.
- **People** warm a room a little, up to a few degrees when it is crowded.
- **Cellars** can be cool by nature: a building type can declare that its rooms run colder or warmer.

Hot air rises. A fire on the floor makes the ceiling warmer than the floor, and a cooler makes the floor the coldest part of the room. A body feels the air between its feet and its head.

Small rooms respond quickly. Large halls take a long time to warm and a long time to cool. A space too large to count as one room, or open on some sides, still holds some heat: the part nearest you acts as a room that is open at its edge.

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

Craft a **Room Thermometer** and hang it on a wall to see what villagers feel there. The liquid level shows the band: Freezing, Cold, Mild, Warm, or Hot. Right-click it for the exact reading of the air. Next to a fire or a cold block it also shows the reading **by the source**: the air plus the radiant heat at that spot.

Recipe: a glass pane on top; copper ingot, redstone, copper ingot in the middle row; any planks below.

Combine a thermometer with a comparator to make a **Room Thermostat**. Hang it in the room, right-click it to set a target temperature and choose heating or cooling, and it gives a redstone signal whenever the room needs it. Wire that signal to a heater or cooler, such as the ones Legendary Survival Overhaul adds, and the room holds its temperature on its own. The thermostat reads the room itself and stops the signal once the target is reached.

## Climate Sources And Units

`preferredBackend` in `[needs.temperature]` picks which temperature mod Townstead works with. On `auto`, Townstead uses the first installed mod of Legendary Survival Overhaul, Cold Sweat and Tough As Nails. Set it to `builtin` to use only Townstead's own model and ignore the mod's readings. A temperature mod must still be installed, because without one Townstead has no temperature.

`climateAuthority` decides whose climate counts. On `townstead` (the default), Townstead's climate sets the outdoor temperature for the temperature mod too. On `backend`, the mod's own climate counts. See [Temperature Mods](/climate/temperature-mods/).

When one of those mods is installed, players feel Townstead's room temperatures through it too, so a warm tavern is warm for you as well.

Everything is Celsius underneath. The client setting `temperatureUnit` in `[needs_display]` switches the readouts to Fahrenheit.

Pack authors can retune the whole model, from biome anchors to wall conductance, in `data/townstead/need/temperature.json`. See [Climate Settings](/climate/settings/).
