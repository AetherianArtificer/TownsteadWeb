---
title: Tailor
description: Hire a tailor, build a shop, and decide what your villagers wear each day.
---

A Tailor sews clothing. They work at whatever sewing station the village has, assemble garments at a crafting table, and put the finished pieces in storage where villagers can find them. A separate Wardrobe screen decides who wears what, and villagers dress themselves from the shelves.

The career needs a textile mod. Install at least one of **Accents**, **Legendary Survival Overhaul**, or **Weavers' Paradise** and the Tailor appears. Without one there is nothing to sew, so there is no Tailor.

## Getting A Tailor

Any of these blocks is a Tailor's job block:

- the Accents sewing station,
- the Legendary Survival Overhaul sewing table,
- the Weavers' Paradise spinning jenny and clothcrafting station.

An unemployed villager who claims one takes up tailoring. A Tailor's Shop also hires on its own, one Tailor per seat, so a recognised shop fills without you placing extra job blocks. See [Cooking & Baking](/guides/cooking/#getting-a-cook) for how workplaces hire.

The Shepherd keeps the loom and the Leatherworker keeps the cauldron. Neither of them is a tailor.

## The Tailor's Shop

The shop is a recognised building in three tiers: **Tailor's Corner** for one Tailor, **Tailor's Shop** for two, and **Clothier** for three. Every tier needs a crafting table, at least one sewing station, some fabric, and storage. Higher tiers ask for more of each, plus furnishings such as banners, candles, a loom, or flower pots, and the Clothier wants a seat and a table for fittings. See [Catalog](/guides/catalog/) for the exact counts.

Fabric means wool, carpets, Weavers' Paradise cloth and spools, and Whole Cloth scrap blocks. Any block from any of the supported mods counts, so which mods you have installed changes what the shop can make, never whether it is a shop.

## What The Tailor Does

1. **Sew at a station.** Every recipe the station knows is available. On the [Order Sheet](/guides/orders/) this is the **Sew clothing** line.
2. **Assemble garments at the crafting table.** Clothing with a crafting recipe, and MCA's needle and thread, are made here. On the sheet this is **Assemble garments**.
3. **Store the results.** Finished pieces go to storage, with a preference for shelves marked as finished goods. See [Storage](/careers/storage/).

Each garment is a normal product on the Order Sheet, so you can ask for a set amount, or keep one warm garment per villager for the winter and one cool garment per villager for the summer.

When a station or storage is missing, the Tailor says so when you are nearby. See [Work Feedback](/careers/work-feedback/).

## With Each Mod

- **Accents.** The sewing station makes hoods, scarves, hats, and accessories such as satchels, quivers, and wings. The warm pieces and the sun hats carry a thermal value, so villagers reach for them when the weather turns.
- **Legendary Survival Overhaul.** The sewing table runs the mod's sewing recipes. Coats are sewn at the crafting table from the mod's own recipes and listed as plain lines. Putting a coat **onto** a piece of armour is a commission instead. The sheet offers **Sew (coat) onto armour**. Hand over the armour you are holding, and the Tailor takes it to the table, sews the coat on, and puts the finished piece in storage. Thermal and cooling coats work the same way.
- **Weavers' Paradise.** The spinning jenny spins fibre into spools and the clothcrafting station weaves cloth. The station's quality minigame is replaced by the Tailor's career rank, so a master Tailor turns out the best grade and a beginner the plainest.
- **Whole Cloth.** With Whole Cloth and Weavers' Paradise together, a villager who kills a mob from Whole Cloth's cloth-drop list has a chance of a cloth scrap, and four scraps with an empty spool make a cotton spool at the jenny. Night defence turns into cloth supply.
- **Hats Renewed.** A **Give Hat** button on the villager's interaction wheel hands the hat you are wearing to that villager. A hat they were already wearing comes back to you, so a gift is a swap, never a loss. Hats are never on the Order Sheet.

## The Wardrobe

The Wardrobe screen opens from the Blueprint's Villagers page, next to Shifts and Professions. It is a grid with one row per villager and one column per weekday, with a pinned **Village** row at the top and today's column tinted.

Each cell holds an outfit template. Six ship with the mod: **Everyday**, **Winter Warm**, **Summer Light**, **Work Clothes**, **Rest Day**, and **Festival Best**. A template names a base outfit, an outerwear rule, and an accessory rule, each marked Required, Preferred, or None.

- Left-click a cell to pick a template. **All days** fills the whole week at once. Right-click clears a cell.
- An empty villager cell follows the Village row.
- An empty Village cell dresses for the weather. Cold days call for warm outerwear, hot days for light clothing and a cool hat, and mild days for neither.
- Work hours always wear work clothes, whatever the cell says. A work day shows a small mark on the cell.

Your choices are saved with the world and beat anything a data pack sets.

:::note
The Wardrobe is a first pass. Custom templates, a seasons view, and copying one villager's week to another are not in yet.
:::

## How Villagers Dress

Villagers change clothes on their own time. Off shift, a villager who is missing a piece their outfit asks for walks to a shelf that holds one and puts it on. A piece the outfit no longer wants comes off and goes back into storage. On shift they only change for a required layer or when they are dangerously cold or hot. See [Temperature](/guides/needs/temperature/) for what worn clothing does for them.

Clothing goes into Curios slots when Curios is installed, otherwise into a free armour slot. A villager whose armour MCA manages, such as a guard or an archer, is left alone.

So the loop is: the Tailor fills the shelves, the Wardrobe says what each villager should wear, and the villagers fetch it themselves. Keep the shop stocked with fabric and the shelves within reach of the houses.

## Tailoring Yourself

Clothing you make at a crafting table, including needle and thread, counts toward a Tailor career of your own, with the same credit a villager gets. See [Careers](/guides/professions/).

Sewing at a station from one of the textile mods does not count yet. Those stations keep their output inside the block, and Townstead cannot see you take it out.
