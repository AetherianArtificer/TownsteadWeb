---
title: Workstations
description: Declare a block villagers can work at, and the facts the engine cannot discover on its own.
---

A workstation file connects a block to Townstead's work engine. The engine finds most facts from the block itself: its inventory, its recipes, and its interaction. The file gives only the facts that the engine cannot safely find, such as a heat requirement, a vessel slot, or an interaction like a player's. You can support the machine of another mod with a data pack. You do not need to change code.

A workstation declaration also tells villagers that the block is a machine, not a shelf. So you do not need a [storage role](/careers/storage/) for it.

## File Location

```text
data/<namespace>/workstation/<name>.json
```

You choose the file name. It must be unique in your namespace. One file works on both 1.20.1 and 1.21.1.

Each definition declares `townstead:workstation/v2`.

## Minimal Example

```json
{
  "schema": "townstead:workstation/v2",
  "mods": ["farm_and_charm"],
  "blocks": ["farm_and_charm:stove"]
}
```

With this file, villagers walk to the block, load it with the ingredients of any recipe of the block, wait, and take the result to storage. A recipe-type tag sets the recipes of the station. The next section describes it.

## Recipe Ownership

A V2 definition does not list recipe types. A recipe-type tag with the same ID as the block lists them:

```text
data/farm_and_charm/tags/recipe_type/stove.json
```

```json
{
  "replace": false,
  "values": ["farm_and_charm:stove"]
}
```

For each block in `blocks`, Townstead reads this tag, and offers every recipe of those types at that station. To add a recipe type to a block, a compatibility pack adds it to the same tag. It does not change the workstation file.

Because this tag is public data, players can put every recipe of a station on the [orders screen](/guides/orders/). There is no separate list of outputs for orders.

Each entry in `blocks` must be an exact block ID. Townstead rejects a `#tag`, because a block tag cannot have a recipe-type tag with the same ID.

## Core Fields

| Field | Required | Description |
| --- | --- | --- |
| `schema` | Yes | `townstead:workstation/v2`. |
| `blocks` | Yes | The exact block IDs for this definition. |
| `mods` | No | Standard mod-gate expression. When the gate is not met, Townstead ignores the file. |
| `requires` | No | A Pheno block condition. The station works only when it is true. |
| `stands` | No | Where a villager stands, as `[x, y, z]` offsets from the block. Each value can be at most 16. |
| `stands_relative_to_facing` | No | Turns `stands` with the `facing` property of the block. |
| `shift_end` | No | `finish` (default): the villager finishes started work after the shift ends. `leave`: the villager leaves the station when the shift ends. |

## Requirements

`requires` is one Pheno block condition at the station. It must not change the world. Townstead checks it before it claims the station, and again before it puts in an item. For example, a cooking pot that needs heat under it:

```json
"requires": {
  "type": "pheno:block_chain",
  "direction": "down",
  "through": { "type": "pheno:in_tag", "tag": "farmersdelight:heat_conductors" },
  "max": 1,
  "end": {
    "type": "pheno:and",
    "conditions": [
      { "type": "pheno:in_tag", "tag": "farmersdelight:heat_sources" },
      { "type": "pheno:block_state", "property": "lit", "value": "true", "if_missing": "pass" }
    ]
  }
}
```

When the requirement is false, the block is not a station at that time. Villagers do not walk to it, and the orders screen shows it as blocked. If the condition is malformed, Townstead rejects the definition. The station does not lose its requirement. For the condition types, including `pheno:block_chain`, `pheno:block_shape`, and `pheno:offset`, see [Pheno Conditions](/pheno/conditions/).

## Inventory Exceptions

Townstead tests the station to find its slots. In `inventory.slots`, name only the slots whose purpose Townstead cannot find by testing:

```json
"inventory": {
  "slots": {
    "containers": [7]
  }
}
```

| Slot role | Meaning |
| --- | --- |
| `containers` | The slot for the serving vessel of the recipe, such as a bowl for stew. |
| `ingredients` | Slots for recipe ingredients, when the inventory does not show which slots they are. |
| `catalysts` | Slots for an item that the recipe needs but does not use up. |
| `outputs` | Result slots that the engine can take from. |
| `returns` | Slots that give back a remainder, such as an empty bucket. |
| `preview` | Slots that show a result but do not hold it. The engine never puts items in them. |

Each index starts at zero, and must exist in at least one view of the inventory. Do not declare the size of the inventory, or slots that the engine can already tell apart.

## Recipe Layout, Corrections, And Supplies

`recipe_layout` gives a role to each ingredient position in the recipes of the block. Use it when a recipe lists an item that the station does not use up as an ingredient:

```json
"recipe_layout": ["ingredient", "ingredient", "catalyst"]
```

Positions after the end of the array are `ingredient`. Townstead does not plan or gather a `return` position, because the recipe gives it back.

`recipe_corrections` replaces the output of one public recipe when the machine really makes something different:

```json
"recipe_corrections": [
  {
    "recipe": "butchery:grinding/beef",
    "output": "farmersdelight:minced_beef",
    "mods": "farmersdelight",
    "config": { "scope": "server", "file": "butchery-server.toml", "path": ["compat", "farmersDelightMince"], "default": true }
  }
]
```

`mods` and `config` are optional gates for the correction.

`supplies` names fixed items that the station needs and that are not recipe ingredients, such as oil or a lid that the villager uses again. Townstead reserves and gathers them with the ingredients. Townstead also adds the supplies that an interaction names (see below) automatically.

```json
"supplies": ["#townstead:cooking_oil"]
```

`fluid_source` names a fluid reader, for a station that works with a fluid, not an item.

## Interaction-Driven Machines

Villagers use some machines with a right-click, not by putting items in. `behavior` is a Pheno block-action program at the station. Most stations need only one action, `pheno:use_block`:

```json
"behavior": { "type": "pheno:use_block", "item": "ingredient" }
```

`item` names a role, not an item ID:

| Role | What the villager uses |
| --- | --- |
| `empty` | An empty hand. This is the default when there is no `item`. |
| `ingredient` | One reserved stack from the inputs of the current recipe. |
| `tool` | The stack that matches `tool`, an item ID or `#tag` on the same action. |
| `supply` | The stack that matches `supply`, an item ID or `#tag` on the same action. |
| `container` | The serving vessel of the recipe. The worker keeps it in their inventory until they collect the result. |

- `all: true` does the interaction once for each ingredient.
- `secondary_use: true` does the sneak-use form.
- `face` and `hit` set where the click goes.
- `condition` on any action makes it do nothing while the block condition is false.
- `pheno:offset` and `pheno:repeat` contain a nested `block_action`.

Some stations give the result only through an interaction, not from a slot. For them, `collect` is a second program in the same format. `ready` is a Pheno block condition that is true when the result is there:

```json
"ready": { "type": "pheno:block_state", "property": "liquid", "value": "beer" },
"collect": {
  "type": "pheno:use_block",
  "item": "tool",
  "tool": "brewery:beer_mug",
  "face": "up",
  "hit": [0.5, 1.0, 0.5]
}
```

A behaviour program never says that the work is complete. After each interaction, the engine looks again for the expected result. A block is not finished only because time has passed.

## Attended Processes

A machine can have problems while it runs. With `attendance`, the worker stays, watches for named incidents, and does a limited response:

```json
"attendance": {
  "poll_interval": 10,
  "timeout": 7200,
  "incidents": [
    {
      "id": "refill_drain",
      "when": { "type": "pheno:block_state", "property": "liquid", "value": "drained" },
      "response": {
        "type": "pheno:use_block",
        "item": "supply",
        "supply": "minecraft:water_bucket",
        "face": "up",
        "hit": [0.5, 1.0, 0.5]
      },
      "max_attempts": 4
    }
  ],
  "safe_stop": { "type": "pheno:use_block", "item": "empty" },
  "cleanup": { "type": "pheno:use_block", "item": "empty" }
}
```

| Field | Description |
| --- | --- |
| `poll_interval` | Ticks between checks. |
| `timeout` | Ticks after which Townstead treats the process as stuck. |
| `incidents` | At least one incident. Each has an `id`, a `when` block condition, a `response` program, and an optional `max_attempts`. An optional `target` names a block-selector result where the worker responds, in place of the station. |
| `safe_stop` | The program that runs when the worker must leave a running process. |
| `cleanup` | The program that runs after the process completes, or after the worker abandons it. |

The worker gathers the supplies that the incident responses, `safe_stop`, and `cleanup` name before they start.

## Structures And Capacity

For a station of one block, do not set `structure`. For a multiblock, `structure` is a Pheno block selector that starts at the matched block. Townstead reserves and watches all of its positions as one station:

```json
"structure": { "type": "pheno:connected" }
```

`anchor` is a block selector that finds the main block from any part of the structure. So nine silo blocks count as one silo.

When possible, Townstead gets the capacity from the structure and the inventory. Set `capacity` only when the inventory does not show the real usable capacity. A machine with lanes gives its positions:

```json
"capacity": { "positions": 6, "per_position": 1 }
```

`positions` is a positive number or a Pheno numeric value. `per_position` is an item count or `"stack"`. A bulk machine gives one Pheno value instead, such as `{ "type": "pheno:count", "of": "structure" }`.

`targets` gives the working positions of a machine that has more than one. `reservation` holds a `pheno:reserve` node for a station that an entity powers, such as a mill that a mule turns. For `pheno:reserve`, see the [Pheno action reference](/pheno/actions/).

## Troubleshooting

Townstead logs rejected files. Look for `Invalid V2 workstation def` or `Workstation ... rejected`.

When a station loads but villagers never use it, the usual causes are:

- no work task of the career names the block;
- the recipe-type tag of the block is missing, or names the wrong type;
- `requires` is false, for example a cold pot;
- the recipes of the block are not in the work tasks of the career, so the worker never chooses them.

Set `debugVillagerAI` in the server config, and stand near the worker. The trace shows which station the worker took, which recipe it chose, and which check failed.

## Related

- [Storage](/careers/storage/): which blocks villagers treat as storage.
- [Work Tasks](/careers/work-tasks/): how to connect stations to a Career.
