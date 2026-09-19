---
title: Work History
description: How completed work is credited to players and villagers and recorded in the Chronicle.
---

Work is credited only when it completes. This page covers how players and villagers earn that credit and how the Chronicle records it.

## Player Work

Villager engines report their own completions. Players are credited by hooks that observe the same outcomes:

- Cooking stations report the player who initiated the work when finished output appears. Unattended stations remember the player who loaded them and credit that player only when the output is actually produced.
- Smelting credits the player who takes the result.
- Fishing credits the player for every reel that lands something, with the same XP and activity key as the fisherman engine.
- Farming credits the player for harvesting a fully grown crop, placing a crop, tilling farmland, pouring water onto a cell that a Field Post plan marks as Water, and clearing a weed from a planned cell or the ring around one, with the same XP and activity keys as the harvest engine.
- Crafting credits the player for every item made at a crafting table or in the inventory grid, through the first career whose craft task admits the crafting table and that output.
- A non-food item taken from a furnace, smoker, or blast furnace, and a potion taken from a brewing stand, credit the first career whose smelt, smoke, or brew_potion task admits that station and that output.
- Shearing credits the player for every animal shorn, with the same XP and activity key as the shepherd engine.
- Entity-delivery Jobs credit the player who kills a target the Job names while holding the Job's tool, with the Job's own policy checked on the hit. The kill pays the Job's XP to the first career whose work task type matches the Job.
- A player's right-click on a block is compared with every block-interaction Job. When the target block, its condition, the held item, and the interaction's preconditions all agree that the click is a real completion, the player earns the Job's XP in the first career whose work task names that block. One physical Job belongs to one career; a second definition claiming the same task and block does not award XP twice.

Stations from other mods that keep their output in their own block, such as grinders, taxidermy tables, and kegs, have no player bridge yet. Everything else funnels through the same progression path, so daily caps, Chronicle activity, self-discovery, and rank-up feedback behave identically for players and villagers.

## Completed-Work History

Completed-work history is automatic. A data-defined Job uses its resource ID as its Chronicle activity key. A code-driven task engine normally uses its task ID, such as `townstead_work:cook`; an engine that performs several distinct operations may report the precise operation it completed. A Profession selects that engine but cannot rename its work.

Townstead increments the activity only after successful completion. Recipe selection, pathfinding, or staged ingredients do not count as finished work. A Pheno requirement may query the resulting key with `pheno:chronicle_count`.

Do not add `history_counter` to a task or `history_counters` to a Profession. Both fields are invalid because they duplicate identity already owned by the executable work.

## Generated Work History

Chronicle can generate a plausible past for a villager who existed before it began recording events. An optional `data/<namespace>/chronicle_work_history/<name>.json` file tells Chronicle how many successful operations a profession would ordinarily complete in one working year.

```json
{
  "schema": "townstead:chronicle_work_history/v1",
  "profession": "townstead_beekeeping:beekeeper",
  "per_year": {
    "townstead_beekeeping:beehive_harvest": 120
  }
}
```

`schema` must be `townstead:chronicle_work_history/v1`. `profession` is the complete profession ID. Each key in `per_year` is the same automatic Job or task ID used by completed-work history, and its positive integer value is the estimated number of successful completions in one working year.

The values are estimates for generated history. They do not control live work speed, Career XP, output quantities, or villager AI. Chronicle multiplies them by the villager's past working years and records the resulting totals without fabricating hundreds of individual events.

Generated totals are evidence, not prose. Add ordinary Chronicle event templates when the work should also produce named moments, journal entries, or headlines. Without those templates, the counters still support Career requirements and evidence displays.

The `townstead_beekeeping:beehive_harvest` key corresponds to a Job at `data/townstead_beekeeping/work_job/beehive_harvest.json`. If that Job is renamed, the `per_year` key must change with it. Do not create a second descriptive counter such as `honey_harvested`; the Job ID already identifies successful hive harvests.
