---
title: Crops
description: Crop climate classes, how temperature stops crop growth, and how farmers plan around the seasons.
---

Each crop has a climate class. A crop grows only when the air suits its class. Outside its range, the crop stops growing. It does not die.

Crop climate needs a temperature mod. Without one, crops grow as in vanilla and as the season mod allows.

## Crop Climate Classes

| Class | Grows when the air is | Shipped crops |
| --- | --- | --- |
| `hardy` | Above −5 °C | Sweet berries |
| `cool_season` | 0 to 26 °C | Carrots, potatoes, beetroots, cabbages, onions |
| `temperate` | Above 2 °C | Wheat, and every crop without a class |
| `warm_season` | Above 8 °C | Melons, pumpkins, sugar cane, tomatoes, rice |
| `tropical` | Above 18 °C | Cocoa |

Cabbages, onions, tomatoes and rice are from Farmer's Delight. The tags list them as optional.

## Giving a Crop a Class

Add the crop block to the class tag, `data/townstead/tags/block/crops/climate/<class>.json`:

```json
{
  "replace": false,
  "values": [{ "id": "examplemod:chili_pepper_crop", "required": false }]
}
```

A crop in no class tag gets a class from Serene Seasons' crop tags when they list it:

| Serene Seasons tags | Class |
| --- | --- |
| Winter, or year-round | `hardy` |
| Summer only | `warm_season` |
| Spring or autumn, not summer | `cool_season` |

Otherwise the crop uses `crop_default_class` (`temperate`).

To add a class or change a range, use `crop_climate` in `need/temperature.json`. See [Climate Settings](/climate/settings/#crops).

## Which Temperature Counts

Townstead compares the class range with the day's mean air at the crop, not the reading at this moment. A single cold night does not stop a field. The day's mean includes the season, the biome and altitude, but not the day and night curve or the weather.

Inside a room, Townstead uses the room's air temperature instead. A glass room with a heat source works as a greenhouse.

## Season Mods

A season mod decides when its crops grow, and Townstead does not change that. When a season mod says a crop is out of season, the crop does not grow, even if the air suits it. Townstead never makes an out-of-season crop grow.

The temperature check applies on top of the season mod. It also applies with no season mod. In that case, warm-season crops do not grow in cold biomes and on high mountains.

Bone meal still works on a crop that has stopped growing.

## Farmers

Before a farmer plants a seed, Townstead checks two things:

- The season mod allows the crop now. For Serene Seasons, Townstead uses its fertility rules, including its greenhouse glass.
- The crop's class suits the air now and in 3 days.

As autumn cools, farmers stop planting warm-season crops before the frost. When every seed a farmer has is out of season, the farmer's status shows **Out of Season**.
