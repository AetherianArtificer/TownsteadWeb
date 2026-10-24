---
title: Orders
description: Use the Order Sheet to tell a workplace what to make, how much, and who should do it.
---

Left alone, a worker makes whatever their workplace can make, in whatever order suits them. With an **Order Sheet** you can overrule that. Pin one up in a workplace and everyone who works there follows its list: cooks, bakers, butchers, and any other trade whose work can be asked for.

## The Sheet

Craft an Order Sheet from three paper in a row. It is a block. Place it on a wall or a surface inside the workplace you want to direct.

The list the sheet opens depends on where you put it. Inside a recognised building, it opens that building's list and shows **Bound to this room**. Next to a standalone workstation, such as a smoker in a yard, it opens that post's list and shows **Bound to a post**. Somewhere with no workplace at all, it tells you so and opens nothing.

Inside the village Archives the same block is the career desk instead. See [Careers](/guides/professions/).

Right-click the sheet to open the orders screen.

## Produce

The **Produce** tab lists everything that can be made at this workplace, drawn from the stations in the room and the recipes the installed mods provide. Search it, or tick **Show only what can be made from what is stored here** to hide anything the stores cannot support right now. Pick an item to start a line, or use **Add held item** to add whatever you are holding.

Each line has a mode:

| Mode | Meaning |
| --- | --- |
| **Make** | Make that many, then the line is finished. |
| **Keep in stock** | Work whenever the stores hold fewer than that. |
| **Per villager** | That many for every villager, counted the same way. |
| **Standing** | No target. Make this when there is nothing more pressing. |

**Here** and **The village** choose where stock is counted for the target: only this workplace's stores, or stores across the whole village.

Lines are worked from the top. **Work this sooner** and **Work this later** reorder them. A line can be held and resumed, copied below itself, or struck out.

**Details** opens everything else about a line: the recipe it will use, the station it runs on, what it needs, what is missing, and **Counts as**, the list of items that are tallied toward the target.

## When The List Is Done

The **When done** setting at the bottom decides what happens once every line is satisfied:

- **Work freely**: the worker goes back to their own choices.
- **Stand down**: the worker does only this list, and rests once it is finished.

With no lines at all, villagers work as they see fit.

## Jobs

The **Jobs** tab covers work that is not a recipe: slaughtering, dismantling, cleaning, and similar tasks that a trade performs on the world rather than at a station. A job line is worked whenever there is any of it to do, and lines above it are taken first. Hold a job and nobody at that workplace will take it on until it is resumed.

## Assignment

A line's assignment decides who does it. **Automatic** lets the workplace choose. **Worker** names one villager. **Anyone suitable** admits any villager whose trade can do the work.

Some stations need an operator as well as a worker, such as a mill that an animal turns. Those lines show **Operated by**: the station's own preference, the assigned worker doing it themselves, or a particular eligible animal from the village. A station that needs no operator says so.

## Reading The Result

A line that cannot progress says why in its details: an ingredient the stores lack, a station that is missing or blocked, or nothing here that makes the item at all. Fix the cause in the room and the line resumes on its own.

For what the villager says when work is blocked, and for a server-side trace, see the relevant trade's guide, such as [Cooking & Baking](/guides/cooking/).

## Related

- [Cooking & Baking](/guides/cooking/) for kitchens, bakeries, and serving plates.
- [Hunger](/guides/needs/hunger/) for how served food is eaten.
- [Work Tasks](/careers/work-tasks/) for how a pack declares which jobs appear on the sheet.
