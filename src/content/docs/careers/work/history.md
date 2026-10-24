---
title: Work History
description: How completed work is credited to players and villagers and recorded in the Chronicle.
---

A character gets credit for work only when the work is complete. This page describes how players and villagers get credit, and how Townstead records it in the Chronicle.

## Player Work

Villager engines report their own completed work. For players, Townstead watches for the same results:

- **Cooking stations:** when the finished food appears, Townstead credits the player who started the work. A station that works alone remembers the player who loaded it, and credits that player only when the food is made.
- **Smelting:** Townstead credits the player who takes the result.
- **Fishing:** Townstead credits the player for each catch, with the same XP and activity key as the fisherman engine.
- **Farming:** Townstead credits the player for each of these, with the same XP and activity keys as the harvest engine:
  - harvesting a fully grown crop;
  - planting a crop;
  - tilling farmland;
  - pouring water on a cell that a Field Post plan marks as Water;
  - removing a weed from a planned cell or from the ring around one.
- **Crafting:** Townstead credits the player for each item made at a crafting table or in the inventory grid. The credit goes to the first career with a craft task that accepts the crafting table and that output.
- **Furnaces and brewing stands:** when a player takes an item that is not food from a furnace, smoker, or blast furnace, or a potion from a brewing stand, Townstead credits the first career with a smelt, smoke, or brew_potion task that accepts that station and that output.
- **Shearing:** Townstead credits the player for each animal that they shear, with the same XP and activity key as the shepherd engine.
- **Entity-delivery Jobs:** Townstead credits a player who kills a target that the Job names while they hold the tool of the Job. Townstead checks the rules of the Job on the hit. The XP of the Job goes to the first career with a work task of the same type as the Job.
- **Block-interaction Jobs:** Townstead compares each right-click of a player on a block with every block-interaction Job. When the target block, its condition, the held item, and the preconditions of the interaction all match, the click is completed work. The player gets the XP of the Job in the first career with a work task that names that block. One Job belongs to one career. A second definition with the same task and block does not give XP again.

Some stations from other mods keep their output in their own block, such as grinders, taxidermy tables, and kegs. Townstead cannot credit players for these stations yet. All other work goes through the same progression as villager work. Daily caps, Chronicle activity, self-discovery, and rank-up messages are the same for players and villagers.

## Completed-Work History

Townstead records completed work automatically. A data-defined Job uses its resource ID as its Chronicle activity key. A task engine in code usually uses its task ID, such as `townstead_work:cook`. An engine that does several different operations can report the exact operation that it completed. A Profession chooses the engine, but cannot rename its work.

Townstead adds to the count only after the work is complete. Choosing a recipe, walking to a station, and gathering ingredients do not count. A Pheno requirement can read the count with `pheno:chronicle_count`.

Do not add `history_counter` to a task or `history_counters` to a Profession. Both fields are invalid, because the work already has its own ID.

## Generated Work History

Chronicle can make up a likely past for a villager who existed before Chronicle started to record events. An optional file, `data/<namespace>/chronicle_work_history/<name>.json`, tells Chronicle how many operations a profession usually completes in one working year.

```json
{
  "schema": "townstead:chronicle_work_history/v1",
  "profession": "townstead_beekeeping:beekeeper",
  "per_year": {
    "townstead_beekeeping:beehive_harvest": 120
  }
}
```

- `schema` must be `townstead:chronicle_work_history/v1`.
- `profession` is the full profession ID.
- Each key in `per_year` is a Job or task ID, the same as in completed-work history. Its value is a positive whole number: the estimated number of completed operations in one working year.

Townstead uses these values only to make up past history. They do not change the speed of live work, Career XP, output amounts, or villager AI. Chronicle multiplies the values by the past working years of the villager and records the totals. It does not make hundreds of separate events.

The totals are counts, not stories. To also make named moments, journal entries, or headlines, add usual Chronicle event templates. Without templates, Career requirements and evidence displays can still use the counts.

The `townstead_beekeeping:beehive_harvest` key matches a Job at `data/townstead_beekeeping/work_job/beehive_harvest.json`. If you rename that Job, change the `per_year` key too. Do not make a second counter with a different name, such as `honey_harvested`. The Job ID already counts hive harvests.
