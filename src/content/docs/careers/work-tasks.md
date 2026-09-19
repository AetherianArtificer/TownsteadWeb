---
title: Work Tasks
description: Assign Townstead work engines, stations, targets, and recipes to careers.
---

A work task connects a profession to a reusable work engine. The engine owns pathfinding, reservations, recovery, safety, and tick behaviour. The Career's `work.json` selects the engine and narrows what it can use.

Data cannot create an arbitrary AI state machine. It can declare a Job for one of Townstead's general executors. The Job's `task` ID becomes a valid work-task type automatically, so a pack can name new kinds of work freely. A block-interaction Job can describe a substantial block procedure once that executor has brought the worker, target, and required item together. Pheno actions own that procedure's state changes, loot, effects, and item wear.

Work is described across these pages:

- [Work Jobs](/careers/work/jobs/)
- [Targets And Scope](/careers/work/targets/)
- [Work History](/careers/work/history/)

## Minimal Example

```json
{
  "schema": "townstead:profession_work/v1",
  "tasks": [
    {
      "type": "townstead_work:cook",
      "workstations": [
        "minecraft:smoker",
        "#example:ovens"
      ],
      "recipes": [
        "edible",
        "#example:beekeeper_food"
      ],
      "weight": 10,
      "scope": "worksite"
    }
  ]
}
```

This document belongs at `data/<namespace>/profession/<career>/work.json`.

## Field Reference

| Field | Default | Description |
| --- | ---: | --- |
| `type` |  | Required registered work-task ID. A bare ID resolves in `townstead_work`. |
| `workstations` | `[]` | Allowed block IDs or block tags. Empty uses the engine's default stations. |
| `entities` | `[]` | Allowed entity IDs or entity tags. Empty uses the engine's default targets. |
| `recipes` | `[]` | Allowed recipe IDs, output item IDs, output tags, or classification tokens. |
| `deny_recipes` | `[]` | Recipes or outputs to refuse. Deny rules win. |
| `recipe_inputs` | `[]` | Required input item IDs, tags, or classification tokens. |
| `deny_recipe_inputs` | `[]` | Input items that make a recipe ineligible. Deny rules win. |
| `weight` | `1` | Relative preference among available work tasks. |
| `scope` | `worksite` | Where the task searches for a workstation. |
| `requirements` | Always | Pheno condition that must pass for this task to be available. |
| `order` | | Presentation for a task players may place on a worksite order sheet: `{ "name": "Slaughter", "icon": "minecraft:iron_sword" }`. Both fields are required when present. See the [Orders](/guides/orders/) guide for the player-facing screen. |
| `access` | `profession` | Path work only. `path` limits the task to workers currently on the owning Path. See [Path Work](/careers/skill/paths/#path-work). |

All target arrays only narrow the engine's own safe set. They cannot make an engine operate a target that its code rejects. For example, an entity list cannot bypass the slaughter engine's never-kill rules.

## Built-In Task Types

Every type below names one of Townstead's work engines. The engine owns the villager's behaviour; the task entry says where it may work and what it may make. The types fall into three families.

### Recipe stations

These engines read recipes from the installed mods and work them at a station. The entry names the stations with `workstations` and, optionally, narrows the recipes. The station block needs a [workstation definition](/careers/workstations/) so the engine knows how to load it.

| Type | What the villager does | Used by |
| --- | --- | --- |
| `townstead_work:cook` | Gathers ingredients, loads a pot, skillet, stove, campfire, furnace, or similar station, waits, and shelves or plates the dish. | Cook, Baker |
| `townstead_work:chop` | Works an item on a cutting board with a tool. Credited as cooking. | Cook |
| `townstead_work:brew` | Makes drinks at brewing stations, kegs, kettles, and bars. | Beverage Artisan |
| `townstead_work:smoke` | Smokes food at a smoker. Pair it with `recipe_inputs` so a shared smoker does not become every smeltable output. | Butcher |
| `townstead_work:smelt` | Runs furnace-style recipes, fuel included. | Armorer, Toolsmith, Weaponsmith, Mason |
| `townstead_work:craft` | Works recipes at a surface that holds nothing: crafting table, stonecutter, smithing, cartography, lectern. Always narrow `recipes`; the family is every recipe in the game. | Armorer, Baker, Cartographer, Fletcher, Librarian, Mason, Toolsmith, Weaponsmith |
| `townstead_work:brew_potion` | Mixes potions at a brewing stand. | Cleric |
| `townstead_work:grind` | Runs a grinder or mortar. | Butcher |
| `townstead_work:taxidermy` | Runs a taxidermy table. | Butcher |

### Zone work

These engines work an area rather than a station. The entry usually needs nothing beyond `type` and `weight`; the workplace comes from the career's job block, and the area is read from the world.

| Type | What the villager does | Used by |
| --- | --- | --- |
| `townstead_work:harvest` | Tills, plants, waters, and harvests the fields marked by a Field Post. Records harvested, planted, tilled, groomed, irrigated, and farmed activity. See [Farming](/guides/farming/). | Farmer |
| `townstead_work:fish` | Fetches a rod, walks to open water, casts, reels, and brings the catch back to the barrel. See [Fishing](/guides/fishing/). | Fisherman |

### Tending

| Type | What the villager does | Used by |
| --- | --- | --- |
| `townstead_work:shear` | Shears sheep inside a livestock pen and carries the wool to storage. Records tended activity. See [Shepherding](/guides/shepherding/). | Shepherd |
| `townstead_work:store` | Carries wool to a wool shed when the shepherd cannot shear. | Shepherd |

### Job-defined types

Any other type is defined by a [Work Job](/careers/work/jobs/) in a data pack, and a Profession may use it once that Job exists. Townstead's own Jobs define `townstead_work:slaughter`, `townstead_work:butcher`, `townstead_work:dismantle`, `townstead_work:cure`, `townstead_work:clean`, `townstead_work:hammer`, and `townstead_work:maintain_climate` this way. Several Jobs may share one task ID when they are alternative procedures for the same kind of work.

Declaring a task type does not teach Townstead how an unknown machine stores inputs or finishes recipes; that is the workstation definition's job.

## Troubleshooting

Run `/pheno validate` after reload. An unknown task type or malformed target entry is reported against the profession resource and its JSON path.

If a task loads but villagers do not perform it, check these items in order:

1. The villager's registered profession resolves to this career definition.
2. The career has a valid workplace and an available seat.
3. The task's `requirements` condition passes.
4. The search `scope` includes the station.
5. The station block passes `workstations`.
6. The recipe passes output and input filters.
7. A workstation definition or integration supports the machine.
8. The station is not claimed by another worker.

Enable `debugVillagerAI` in the server config for the work trace.
