---
title: Cooking & Baking
description: Build a kitchen or bakery, hire a cook or baker, place orders, and put food on the table.
---

A Cook turns what the farm grows into meals, keeps the village pantry stocked, and sets finished dishes out where hungry villagers can find them. Cooking needs a cooking mod: Townstead's Cook career appears when Farmer's Delight, Farm & Charm, Kaleidoscope Cookery, or Rustic Delight is installed, and it also understands stations from Let's Do: Bakery, Candlelight, Caupona, Pizza Delight, Brewin' and Chewin', Kaleidoscope Tavern, Herbal Brews, Beach Party, and Butchery.

## Building A Kitchen

A kitchen is a recognised building, like any other room in the village: enclose it, give it a door, and check the MCA Blueprint to see what it was read as. Kitchens come in tiers. Each tier seats more cooks and needs more equipment, and the exact blocks depend on which cooking mods you have installed.

Every kitchen needs a heat source, a cooking station, and storage. Higher tiers add prep stations, more heat, better storage, and decorative blocks. Open the [Catalog](/guides/catalog/) to see the full requirements for each tier with the mods you have, and pin the one you are building to get a checklist.

Other mods add other kitchens. Pizza Delight adds a pizzeria and Candlelight adds a restaurant. Each of these is a Cook workplace with its own tiers. Bakeries belong to the Baker, a separate profession with its own workplaces and progression. See [Baking](#baking).

## Getting A Cook

Cooks are hired by the room. When a kitchen has a free seat, an idle villager in the village takes the job on their own. When the room loses a seat, because it was downgraded or a wall came down, a cook loses the job. The seat count is exact: the number the Blueprint shows is the number of cooks that will stand in the room.

You can also take up Cook yourself. See [Careers](/guides/professions/).

## What A Cook Does

During their Work shift a cook works through the recipes their kitchen can make:

1. Fetch ingredients from the kitchen's storage.
2. Carry them to a station, cook, and wait for the result.
3. Put the dish on an empty [serving plate](#serving-food) if there is one, otherwise on a shelf.

Cooks use the stations inside their own kitchen. They also use furnaces, smokers, and blast furnaces anywhere in the village for anything edible, so a smoker in the yard is fair game. What they make depends on the recipes the installed mods provide and on what is in storage.

A cook who has nothing to do rests at ease in the kitchen. A cook who is blocked says why when you are nearby: no kitchen, no ingredients, nowhere to put the result, or a station they cannot reach. Turn on `debugVillagerAI` in the server config for a detailed trace.

## Orders

Left alone, a cook makes whatever they can. To direct them, craft an **Order Sheet** and pin it up inside the kitchen or bakery. Its list tells the workers there what to make, how much, and in what order. The sheet, its modes, and its assignment options are covered in [Orders](/guides/orders/).

## Serving Food

A **Serving Plate** is a small block that holds one dish. Craft two from three clay balls, in a V shape.

- Right-click the plate with food to set the dish on it.
- Right-click with an empty hand to eat one serving yourself.
- Sneak and right-click to take the dish back.

Most foods are one serving. A whole pizza from Pizza Delight is four slices, and a placed pizza on a table counts as served food too. Only food goes on a plate: tools and raw ingredients are refused, so a plate cannot be blocked by something nobody can eat.

Cooks treat plates as the first place a finished dish belongs. A fresh dish goes to an empty plate before it goes to a shelf, and when a plate empties, the cook fetches a matching dish from finished-goods storage rather than cooking another. Some buildings carry a menu: a bakery's plates hold baked goods, a pizzeria's hold pizza, and a tavern's hold drinks. A plain kitchen has no menu, so anything the cook makes can be plated.

Hungry villagers eat from plates and prefer a plated meal nearby over bread in a chest. See [Hunger](/guides/needs/hunger/#where-they-look). Put plates in the room where people gather and the cook keeps them full.

## Baking

A Baker is a second trade with the same shape as the Cook: a room hires them, orders direct them, and their bread goes to plates and shelves. What sets them apart is what they make and where.

A **Bakery** is a recognised building with a crafting table and an oven. That is enough for one Baker. With Let's Do: Bakery installed, which builds on Farm & Charm, larger bakeries with more seats appear, built from that mod's own blocks. Check the [Catalog](/guides/catalog/) for the requirements with the mods you have.

Bakers make baked goods: bread, cake, cookies, pumpkin pie, the pies from Farmer's Delight, and everything Farm & Charm and Let's Do: Bakery count as bread, pastry, or cake. They craft at the crafting table, bake at furnaces and smokers, grind at a Kaleidoscope Cookery millstone, and use the Let's Do: Bakery station and pot when they have them. A bakery's serving plates hold only baked goods, so a baker never sets out stew.

Baker is its own career with its own record, and your own baking counts toward it in the same way as cooking does for Cook.

## Storage And Shelves

Any storage block in the kitchen is the cook's pantry: ingredients come out of it and finished dishes go back into it. If you want to keep some containers off limits, mark them as protected storage in the [configuration](/reference/configuration/#storage).

A data pack can label shelves by role, so ingredients live on one side and finished dishes on the other, by adding blocks to the `townstead:storage_roles/inputs` and `townstead:storage_roles/finished_goods` block tags. Without labels the cook uses whatever is nearest. See [Storage](/careers/storage/) for the roles.

Bowls and buckets left over from eating find their way back to the container the food came from. See [Hunger](/guides/needs/hunger/#bowls-bottles-and-buckets).

## Cooking Yourself

Your own cooking counts. Anything you finish at a cooking station or furnace advances your Cook career, and a station you load and walk away from still credits you when the food is done. Ranks and skills are laid out on your career record at the Archives. See [Careers](/guides/professions/).

## Turning It Off

`enableTownsteadCook` in the server config hands cooking back to Chef's Delight when that mod is installed. See [Chef's Delight](/compats/chefs-delight/).
