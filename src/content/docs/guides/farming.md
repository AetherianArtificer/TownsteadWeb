---
title: Farming
description: Hire a farmer, plan the plots with a Field Post, and let them till, plant, water, and harvest.
---

A farmer grows the village's food. Give them a composter to work from and a Field Post to tell them where the plots are, and they will till, plant, water, weed, and harvest on their own, then put the crop in storage.

## Getting A Farmer

A composter is the farmer's job block, as in vanilla. An unemployed villager who finds one takes up farming. The composter is also the farmer's anchor: their farm is the ground around it.

A farmer with a composter but no plan does nothing except ask for one. Their status reads *Awaiting Plot Plan* and they will say so when you are nearby.

## The Field Post

Craft a **Field Post** from a plank over a log. Every wood type has its own. Place it near the composter: the post covers a square 33 blocks across, and the composter must be inside it for the farmer to use it.

Right-click the post to open the plot planner: a top-down map of the ground around the post, one cell per block, with what is there now drawn in. Farmland, water, crops, and hydration all show, and a ready crop is ticked.

The toolbar has three modes. **Paint** applies whatever you have picked from the palette. Click or drag across cells. **Erase** clears your plan from a cell. **Pan** moves the map. There is a zoom control, a search box, and an in-stock filter that hides any crop the village has no seeds for.

Confirm to save the plan, or cancel to throw the changes away. The farmer reads the plan directly, so you never assign a post to a farmer.

## Painting Crops

The **Crops** tab lists every seed the game knows, grouped by mod. Paint a seed on a cell and the farmer will keep that crop growing there, replanting after each harvest. Three entries are special:

- **Auto** lets the farmer choose. They pick from the seeds the village has in stock, leaning toward crops that suit their personality.
- **None** leaves the cell bare.
- **Protected** tells the farmer to leave the cell alone entirely. Use it for your own garden inside the plot.

If you paint a crop on soil it cannot grow on, a warning appears, and the farmer skips that cell until you fix it.

## Painting Soil

The **Soil** tab says what the ground should be:

- **Farmland** is tilled with a hoe.
- **Water** becomes a water source. The farmer clears whatever is there, fetches water in a bucket, and places it. Rice-type crops are planted into water cells.
- **Rich Soil** and **Rich Soil (Tilled)** appear when Farmer's Delight is installed.
- The three **Fertilized** soils appear when Farming for Blockheads is installed: yield, growth, and trample protection.
- **Claim** adopts whatever is already there. Paint it over an existing field and the planner records the soil and crop it finds, so you can hand over a farm you built by hand.
- **None** reverts a cell, and **Protected** tells the farmer to leave it alone.

## What The Farmer Does

Each trip the farmer picks the most useful job in reach, in this order: harvest a ready crop, water a cell that needs it, plant an empty one, till ground that needs it, then pull weeds. Harvested crops go to the nearest storage. Seeds come from village storage, and the farmer restocks the specific seeds the plan calls for so a rare crop is never starved by a common one.

They need tools:

- a **hoe** to till farmland;
- an empty **bucket** to carry water, refilled at the nearest water source within a fair walk.

Weeding clears removable plants within a block of planned cells. Both weeding and water placement can be turned off, and their reach adjusted, in the [configuration](/reference/configuration/#farming).

A farmer doing chores does not trample the crops they walk over.

## When The Farmer Stops

The farmer's status shows the reason, and they say it out loud when you are close:

| Status | Meaning |
| --- | --- |
| Awaiting Plot Plan | No Field Post covers the composter, or the plan is empty. |
| Needs Seeds | The plan calls for a seed the village does not have. |
| Needs Hoe | Nothing to till with. |
| Needs Irrigation | A Water cell is painted but there is no bucket or no water source in reach. |
| Target Unreachable | The farmer cannot walk to the cell. |
| Out Of Farm Scope | The work is outside the post's square. |
| Unsupported Crop | Something planted that the farmer does not know how to farm. |

## Farming Yourself

Your own farming counts toward a Farmer career of your own, with the same credit a villager earns for the same action: harvesting a fully grown crop, planting one, tilling ground into farmland, and pouring water onto a cell painted Water on a Field Post. Breaking an unripe crop earns nothing, and pulling weeds is not counted. You do not need a Field Post for any of it except watering. Ranks and skills are on your career record at the Archives. See [Careers](/guides/professions/).

The setting `enablePlayerFarmingCredit` in the [configuration](/reference/configuration/#farming) turns this off.
