---
title: Butchering
description: Slaughter, carcass work, smoking, and the rest of a butcher's trade.
---

A Butcher turns livestock into meat. With MCA alone, a butcher smokes raw meat at a smoker. With the Butchery mod installed, the trade grows into slaughter, carcass work, grinding, curing, tanning, and cleaning up afterwards, across several buildings.

## Without Butchery

A villager who takes a smoker as their job block becomes a Butcher. They fetch raw meat and fish from storage, smoke it, and put the result back. That is the whole trade until Butchery is installed.

## With Butchery

Butchery adds the buildings and the tools. The Catalog lists what each one needs; in outline:

- **Butcher Shop**, **Butchery**, and **Full Butchery** are the three tiers of the main workplace. Each seats more butchers.
- A **Slaughterhouse** holds hooks and basins for the messy end of the work.
- A **Slaughter Pen** is a fenced yard with a blood grate where animals are kept for slaughter.
- A **Smokehouse** and a **Tannery** are separate rooms. Tanning belongs to the Leatherworker, who works from a cauldron.

See [Catalog](/guides/catalog/) for the full requirements and [Cooking & Baking](/guides/cooking/) for how workplaces hire.

## What A Butcher Does

The butcher's work, roughly in the order they prefer it:

1. **Carcass work.** A carcass hanging on a hook is cut down in stages with a cleaver and a skinning knife until nothing is left.
2. **Dismantling** a placed iron golem, for its parts.
3. **Grinding** at a meat grinder or a pestle and mortar. With Farmer's Delight installed, the grinder produces Farmer's Delight minced meat instead of Butchery's.
4. **Taxidermy** at a taxidermy table.
5. **Smoking** raw meat at a smoker.
6. **Curing** sausages on a hook.
7. **Cleaning** blood puddles off the floor.
8. **Breaking heads** at a hammer. Rare, display-worthy heads are kept rather than broken unless `processTrophyOutputs` is turned on.
9. **Slaughter**, last of all. See below.

Dismantling, cleaning, breaking heads, and slaughter also appear as job lines on the [Order Sheet](/guides/orders/), so you can turn them off or reorder them for one shop.

## Slaughter

A butcher slaughters a cow, pig, sheep, chicken, or rabbit that is adult, unnamed, and untamed, and only inside a Butcher Shop, Slaughterhouse, or Slaughter Pen. They need a cleaver, wait a while between kills, and hang the carcass on a free hook in the shop or slaughterhouse.

Naming an animal protects it. So does keeping it outside those buildings.

Slaughter can be turned off with `allowLethalWork`, and the wait between kills is `lethalWorkCooldownTicks`. Both are in the [configuration](/reference/configuration/#profession-work). With slaughter off, the butcher still does everything else and will tell you slaughter is disabled if you ask why the pen is full.

## Tools

The butcher needs the right tool for each job, fetched from the shop's storage:

- a **cleaver** for slaughter and most carcass stages;
- a **skinning knife** for skinning;
- a **hacksaw** and a **hammer** for the later stages and for heads;
- a **hook**, a **skin rack**, a **blood grate**, and a **grinder** in the building itself.

When a tool or a station is missing, the butcher says which one when you are nearby.

## Keeping The Shop Running

Livestock in the pen, tools in the chest, and space on the hooks. The butcher's status shows the block when something is missing: no livestock, no cleaver, a stuck carcass, no smoker, nowhere to put the output, or an unreachable target. When the shop is promoted to a higher tier, the butcher says so.

The Chronicle records a village's first slaughter, its first butchery, and the hundredth.

## Butchering Yourself

Cutting up a carcass, curing, cleaning, breaking heads, and slaughter credit your own Butcher career through the same Jobs the villager uses. A slaughter counts when you kill one of the listed animals with a cleaver, under the same rules as the villager. Grinding and taxidermy at Butchery's own stations do not count yet. See [Careers](/guides/professions/).
