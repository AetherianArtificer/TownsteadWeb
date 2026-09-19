---
title: Fishing
description: Hire a fisherman, give them a rod and water, and build a dock for better catches.
---

A Fisherman fishes. Give them a barrel, a rod, and open water within reach, and they cast, wait, reel, and bring the catch back. A dock makes them better at it.

## Getting A Fisherman

A barrel is the fisherman's job block, as in vanilla. An unemployed villager who claims one takes up fishing. The barrel is also where the catch goes.

## What The Fisherman Does

1. **Fetch a rod.** From their own inventory, or from any storage near the barrel. If there is a choice, they take the rod with the most enchantments, then the one with the most durability left. Rods from Starcatcher count too.
2. **Walk to water.** They look for fishable water within 16 blocks of the barrel and pick a safe spot to stand.
3. **Cast and wait.** A real fishing hook goes out, and the catch comes from the ordinary fishing loot table. With Starcatcher installed, its fish are in the pool.
4. **Reel and repeat.** After 16 items they walk back and put everything in the barrel, or in nearby storage if the barrel is full.

Every reel that lands something counts as a catch on the fisherman's career record.

The rod wears out as it would for a player. Keep a spare in the chest.

The fisherman also stops when they are hungry, tired, or cold, and comes back afterwards. See [Villager Needs](/guides/needs/).

## Docks

A dock is a recognised building around the barrel, in three tiers: **Landing**, **Pier**, and **Wharf**. Each is a platform of planks, slabs, stairs, or masonry with a barrel on it, with fences and lanterns from the second tier up. See [Catalog](/guides/catalog/) for the exact counts.

The bonuses apply only while the fisherman is standing on the deck:

| Dock | Bonus |
| --- | --- |
| Landing | None. It is a recognised workplace and a good place for the barrel. |
| Pier | Bites come 20% faster, and the rod fishes as if it had one extra level of Luck of the Sea. |
| Wharf | The Pier bonus plus one extra level of Lure, and a 15% chance of a second catch on every reel. |

The first time a fisherman uses a dock they say so.

## When The Fisherman Stops

- **No rod.** Nothing in their inventory or nearby storage.
- **No water.** No fishable water within reach of the barrel.
- **No storage.** The barrel is full and there is nothing else nearby.
- **Unreachable.** They cannot walk to the water they picked.

They say which when you are nearby. `fishermanWaterSearchRadius` and `fishermanInventoryFullThreshold` in the [configuration](/reference/configuration/#fishing) adjust the reach and the trip size.

## Fishing Yourself

Your own catches count toward your Fisherman career. Each time you reel in a fish or other loot with a fishing rod, you earn the same credit a villager gets for the same catch. See [Careers](/guides/professions/).
