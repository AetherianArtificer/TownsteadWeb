---
title: Thirst
description: How villagers get thirsty and drink, when a thirst mod is installed.
---

Thirst only exists when a supported thirst mod is installed. Townstead extends that mod's player thirst to villagers. Without one, the thirst icon and its settings do not appear.

Supported thirst mods:

- Thirst Was Taken, and its continuation [Thirst Was Reclaimed](/compats/thirst-was-reclaimed/)
- Legendary Survival Overhaul
- Tough As Nails

If more than one is installed, `preferredBackend` in `[needs.thirst]` decides which one drives villagers. On `auto`, Townstead prefers Legendary Survival Overhaul, then Thirst Was Reclaimed or Thirst Was Taken, then Tough As Nails.

## States

Thirst runs from 0 to 20. New villagers start full.

| State | Thirst | Effect |
| --- | ---: | --- |
| Quenched | 16 to 20 | Small mood boost |
| Hydrated | 9 to 15 | None |
| Thirsty | 5 to 8 | Mood drains, villager goes looking for a drink |
| Parched | 1 to 4 | Mood drains faster. At 3 and below, movement speed -20%. |
| Dehydrated | 0 | Large mood drain, still slowed |

Dehydration never harms a villager. Babies are never slowed by thirst.

## How Thirst Drains

A drink leaves a reserve behind it, the same way a meal does for hunger. Drain uses up the reserve first, and the meter only falls once it is gone.

Two things drain it:

- **Time.** Roughly once every two hours of the Minecraft day a villager loses a point. This pauses while they are on their Rest shift.
- **Activity.** Working, walking, patrolling, and fighting each add to it, and every so often that costs a point. Fighting is the most expensive, then chores, then patrols.

The thirst mod's own climate rules apply on top. Hot or dry places drain faster, and a villager who is sweltering drinks more. See [Temperature](/guides/needs/temperature/).

## What They Drink

Anything the thirst mod recognises as a drink: water bottles, canteens, juices, and the drinks added by supported food mods. Townstead also ships its own hydration values for the coffees, teas, wines, cocktails, and soups from the drink mods it integrates, so a cafe or tavern keeps its regulars hydrated.

Water purity matters. A villager who drinks dirty water can fall sick under the same rules the mod applies to players. A Beverage Artisan can purify water at a skillet or campfire when the thirst mod provides a purification recipe, and Tough As Nails' water purifier is one of their stations.

## When They Drink

A villager goes looking for a drink once thirst drops to 12, and treats it as an emergency at 4. When they stop to drink they keep going until they reach 18. If they are also hungry they eat in the same sitting.

Villagers drink during Rest hours, unlike eating, but never while asleep.

## Where They Look

The same order as food:

1. **Their own inventory.**
2. **Dropped items and containers** within 48 blocks. Villagers take the most hydrating option, and the nearest one when there is a tie.
3. **Hydrating amenities** anywhere in the village, such as a Let's Do: Bakery kitchen sink or a Tough As Nails rain collector.
4. **Ripe crops** that quench thirst, as a last resort. This is off by default.

Each source has its own toggle in the [configuration](/reference/configuration/#thirst). Protected storage applies here too. See [Storage](/reference/configuration/#storage).

Empty bottles and buckets are handled the same way as after a meal. See [Hunger](/guides/needs/hunger/#bowls-bottles-and-buckets).

## Keeping Them Hydrated

Stock water containers near where villagers live. The right container depends on your thirst mod. A cafe or tavern with drinks in stock also works, and a Beverage Artisan keeps it stocked.

Children cannot fetch their own drinks. When a child's thirst drops below 12, nearby adults bring one. See [Villager Needs](/guides/needs/#caring-for-young).
