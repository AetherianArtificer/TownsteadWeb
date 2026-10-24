---
title: Work Tasks
description: Assign Townstead work engines, stations, targets, and recipes to careers.
---

A work task connects a profession to a work engine. The engine does the pathfinding, reservations, recovery, safety checks, and tick behaviour. The `work.json` of the Career chooses the engine and limits what the engine can use.

Data cannot add a new AI. It can declare a Job for one of Townstead's general executors. The `task` ID of the Job automatically becomes a valid work-task type, so a pack can add new kinds of work with any name. A block-interaction Job can describe a long block procedure. The executor brings the worker, the target, and the required item together. Then Pheno actions do the procedure: block changes, loot, effects, and item wear.

These pages describe work:

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

Put this file at `data/<namespace>/profession/<career>/work.json`.

## Field Reference

| Field | Default | Description |
| --- | ---: | --- |
| `type` |  | Required. A registered work-task ID. A short ID refers to the `townstead_work` namespace. |
| `workstations` | `[]` | Allowed block IDs or block tags. When empty, the engine uses its default stations. |
| `entities` | `[]` | Allowed entity IDs or entity tags. When empty, the engine uses its default targets. |
| `recipes` | `[]` | Allowed recipe IDs, output item IDs, output tags, or classification tokens. |
| `deny_recipes` | `[]` | Recipes or outputs to refuse. Townstead checks deny rules first. |
| `recipe_inputs` | `[]` | Required input item IDs, tags, or classification tokens. |
| `deny_recipe_inputs` | `[]` | Input items that stop a recipe. Townstead checks deny rules first. |
| `weight` | `1` | How much the worker prefers this task to other available tasks. |
| `scope` | `worksite` | Where the task looks for a workstation. |
| `requirements` | Always | Pheno condition. The task is available only when it passes. |
| `order` | | The name and icon of the task on a worksite order sheet, for players: `{ "name": "Slaughter", "icon": "minecraft:iron_sword" }`. When present, both fields are required. For the screen, see the [Orders](/guides/orders/) guide. |
| `access` | `profession` | Path work only. `path` gives the task only to workers who are on the Path now. See [Path Work](/careers/skill/paths/#path-work). |

Target lists can only limit what the engine already accepts. They cannot make an engine use a target that its code rejects. For example, an entity list cannot get past the rules of the slaughter engine about animals that it must never kill.

## Built-In Task Types

Each type below names one of Townstead's work engines. The engine controls what the villager does. The task entry says where the villager can work and what the villager can make. There are three groups of types.

### Recipe stations

These engines read recipes from the installed mods and make them at a station. The entry names the stations with `workstations`, and can limit the recipes. The station block needs a [workstation definition](/careers/workstations/), so that the engine knows how to load it.

| Type | What the villager does | Used by |
| --- | --- | --- |
| `townstead_work:cook` | Gets ingredients, loads a pot, skillet, stove, campfire, furnace, or a similar station, waits, and puts the dish on a shelf or a plate. | Cook, Baker |
| `townstead_work:chop` | Uses a tool to cut an item on a cutting board. Counts as cooking. | Cook |
| `townstead_work:brew` | Makes drinks at brewing stations, kegs, kettles, and bars. | Beverage Artisan |
| `townstead_work:smoke` | Smokes food in a smoker. Use it with `recipe_inputs`, so that the villager does not make every output of a shared smoker. | Butcher |
| `townstead_work:smelt` | Makes furnace recipes, and adds fuel. | Armorer, Toolsmith, Weaponsmith, Mason |
| `townstead_work:craft` | Makes recipes at a station that holds no items: crafting table, stonecutter, smithing table, cartography table, lectern. Always limit `recipes`, because without a limit it accepts every recipe in the game. | Armorer, Baker, Cartographer, Fletcher, Librarian, Mason, Toolsmith, Weaponsmith |
| `townstead_work:brew_potion` | Makes potions at a brewing stand. | Cleric |
| `townstead_work:grind` | Uses a grinder or mortar. | Butcher |
| `townstead_work:taxidermy` | Uses a taxidermy table. | Butcher |

### Zone work

These engines work in an area, not at a station. The entry usually needs only `type` and `weight`. The workplace comes from the job block of the career, and the engine reads the area from the world.

| Type | What the villager does | Used by |
| --- | --- | --- |
| `townstead_work:harvest` | Tills, plants, waters, and harvests the fields that a Field Post marks. Records harvested, planted, tilled, groomed, irrigated, and farmed activity. See [Farming](/guides/farming/). | Farmer |
| `townstead_work:fish` | Gets a rod, walks to open water, casts, reels in, and brings the catch back to the barrel. See [Fishing](/guides/fishing/). | Fisherman |

### Tending

| Type | What the villager does | Used by |
| --- | --- | --- |
| `townstead_work:shear` | Shears sheep in a livestock pen and carries the wool to storage. Records tended activity. See [Shepherding](/guides/shepherding/). | Shepherd |
| `townstead_work:store` | Carries wool to a wool shed when the shepherd cannot shear. | Shepherd |

### Job-defined types

A [Work Job](/careers/work/jobs/) in a data pack defines each other type. A Profession can use the type when that Job exists. Townstead's own Jobs define `townstead_work:slaughter`, `townstead_work:butcher`, `townstead_work:dismantle`, `townstead_work:cure`, `townstead_work:clean`, `townstead_work:hammer`, and `townstead_work:maintain_climate` in this way. Several Jobs can use the same task ID when they are different ways to do the same work.

A task type does not tell Townstead how an unknown machine stores inputs or finishes recipes. The workstation definition does that.

## Troubleshooting

Run `/pheno validate` after a reload. It reports an unknown task type or a malformed target entry with the profession resource and the JSON path.

If a task loads but villagers do not do it, check these items in order:

1. The registered profession of the villager matches this career definition.
2. The career has a valid workplace and a free seat.
3. The `requirements` condition of the task passes.
4. The search `scope` includes the station.
5. The station block matches `workstations`.
6. The recipe matches the output and input filters.
7. A workstation definition or integration supports the machine.
8. No other worker has claimed the station.

To see the work trace, set `debugVillagerAI` in the server config.
