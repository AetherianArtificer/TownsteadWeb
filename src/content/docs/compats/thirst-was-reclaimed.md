---
title: Thirst Was Reclaimed
description: "Thirst for villagers, from the Thirst Was Reclaimed thirst bar."
---

**Author:** mlus\
**Download:** [CurseForge](https://www.curseforge.com/minecraft/mc-mods/thirst-was-reclaimed) · [Modrinth](https://modrinth.com/mod/thirst-was-reclaimed)\
**Install on:** The server and every client

Thirst Was Reclaimed continues Thirst Was Taken. Both mods use the mod ID `thirst`, so you can install only one of them. Townstead finds which one is installed.

## What It Adds

Thirst Was Reclaimed gives thirst to players. Townstead gives the same thirst to villagers. See [Thirst](/guides/needs/thirst/).

- Villagers get thirsty, and drink from their inventory, from storage, and from dropped items.
- Hot and dry places make villagers thirstier, by the rules of Thirst Was Reclaimed.
- Dirty water can make a villager sick, by the same rules as for players.
- The villager screen shows a thirst bar with the droplet icons of Thirst Was Reclaimed.
- Townstead drinks, such as the coffees and teas of supported mods, also fill the thirst bar of players.

### Purifying Water

With [Rustic Delight](/compats/rustic-delight/) and Farmer's Delight installed, Baristas purify dirty water bottles at a skillet, stove, or campfire.

## With Other Mods

When more than one thirst mod is installed, `preferredBackend` decides which one gives villagers thirst. With `auto`, Townstead uses Legendary Survival Overhaul first, then Thirst Was Reclaimed or Thirst Was Taken, then Tough As Nails. Set it to `thirst` to use Thirst Was Reclaimed. See the [configuration](/reference/configuration/#thirst).

## Settings

The thirst settings are in `[needs.thirst]` in the [server configuration](/reference/configuration/#thirst). Use them to turn off villager thirst, or one of the places where villagers look for a drink.
