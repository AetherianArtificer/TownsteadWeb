---
title: Thirst Was Reclaimed
description: Thirst integration for villager needs.
---

[Thirst Was Reclaimed](https://github.com/mlus-asuka/Thirst-Was-Reclaimed) is a maintained continuation of Thirst Was Taken. Townstead supports it as a villager thirst backend on both 1.20.1 (Forge) and 1.21.1 (NeoForge).

It provides the same integration as [Thirst Was Taken](/compats/thirst-was-taken/): the two mods share the `thirst` mod id and cannot be installed together, and Townstead detects which one is present automatically.

## What villagers do

When Thirst Was Reclaimed is installed, villagers gain a thirst need alongside hunger:

- Thirst depletes over time, faster in hot or dry biomes and in the Nether, following the mod's own depletion settings.
- Villagers drink thirst-restoring items from their inventory, and can source drinks from ground items, containers, and crops (see the [configuration reference](/reference/configuration/#thirst)).
- Water purity matters. Drinking dirty water can sicken or poison a villager with the same chances players face.
- Cook villagers can purify impure water bottles on campfires, stoves, and skillets using the mod's own purification recipes.
- Adults bring drinks to thirsty young villagers when `enableHydratingYoung` is on.
- The villager inspector shows a thirst bar using the mod's own droplet icons.

## Choosing a backend

If Legendary Survival Overhaul is installed at the same time, the `preferredBackend` setting in `[needs.thirst]` decides which mod drives villager thirst. The default `auto` prefers Legendary Survival Overhaul. Set it to `thirst` to prefer Thirst Was Reclaimed instead. See the [configuration reference](/reference/configuration/#thirst).
