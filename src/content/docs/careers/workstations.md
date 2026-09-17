---
title: Workstations
description: Declare a block villagers can work at, and the facts the engine cannot discover on its own.
---

A workstation file maps a block onto Townstead's work engine. The engine discovers most facts from the block itself: its inventory, its recipes, and its interaction. A definition states only what cannot be discovered safely, such as a heat requirement, a vessel slot, or a player-like interaction. Adding support for another mod's machine is a data pack, not a code change.

Declaring a workstation also tells villagers the block is a machine rather than a shelf, so you never need a matching [storage role](/careers/storage/) for it.

## File Location

```text
data/<namespace>/workstation/<name>.json
```

The file name is yours and only has to be unique within your namespace. One file works on both 1.20.1 and 1.21.1.

Every definition declares `townstead:workstation/v2`.

## Minimal Example

```json
{
  "schema": "townstead:workstation/v2",
  "mods": ["farm_and_charm"],
  "blocks": ["farm_and_charm:stove"]
}
```

That is enough for villagers to walk to the block, load it with the ingredients of any recipe the block owns, wait, and take the result to storage. The station's recipes come from a recipe-type tag, described next.

## Recipe Ownership

A V2 definition does not list recipe types. The block owns them through a recipe-type tag whose ID is the same as the block ID:

```text
data/farm_and_charm/tags/recipe_type/stove.json
```

```json
{
  "replace": false,
  "values": ["farm_and_charm:stove"]
}
```

Townstead resolves the tag for every exact block in `blocks` and offers every recipe of those types at that station. A compatibility pack adds a recipe type to a block by appending to the same tag. It does not edit the workstation file.

Because the association is public data, every recipe a station owns may be placed on the [orders screen](/guides/orders/). There is no separate list of orderable outputs.

`blocks` entries must be exact block IDs. A `#tag` is refused, because a tag cannot own a same-ID recipe-type tag.

## Core Fields

| Field | Required | Description |
| --- | --- | --- |
| `schema` | Yes | `townstead:workstation/v2`. |
| `blocks` | Yes | Exact block IDs this definition applies to. |
| `mods` | No | Standard mod-gate expression. An unmet gate removes the file. |
| `requires` | No | A Pheno block condition that must be true for the station to be operational. |
| `stands` | No | Where a villager stands, as `[x, y, z]` offsets from the block. Each coordinate is limited to 16. |
| `stands_relative_to_facing` | No | Rotates `stands` with the block's `facing` property. |
| `shift_end` | No | `finish` (default) completes committed work after the shift ends; `leave` abandons the station at shift end. |

## Requirements

`requires` is one side-effect-free Pheno block condition anchored at the station. Townstead evaluates it before it claims the station and again before it commits an item. A cooking pot that needs heat below it:

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

A station whose requirement is false is not a station right now. Villagers do not walk to it, and the orders screen reports it as blocked. A malformed condition refuses the definition; it never becomes an absent requirement. See [Pheno Conditions](/pheno/conditions/) for the vocabulary, including `pheno:block_chain`, `pheno:block_shape`, and `pheno:offset`.

## Inventory Exceptions

Capability probing finds the station's slots. `inventory.slots` names only the slots whose semantic role cannot be probed:

```json
"inventory": {
  "slots": {
    "containers": [7]
  }
}
```

| Slot role | Meaning |
| --- | --- |
| `containers` | Where the recipe's serving vessel goes, such as a bowl for stew. |
| `ingredients` | Slots that accept recipe ingredients, when the handler view does not distinguish them. |
| `catalysts` | Slots for an item the recipe needs but does not consume. |
| `outputs` | Result slots the engine may extract from. |
| `returns` | Slots that hand back a remainder, such as an empty bucket. |
| `preview` | Slots that show a result without holding one. The engine never inserts into them. |

Every index is zero-based and must exist in at least one handler view. Do not declare inventory size or slots the engine can already tell apart.

## Recipe Layout, Corrections, And Supplies

`recipe_layout` gives a role to each ordered ingredient position of the block's recipes. Use it when a recipe lists an item that is not an ordinary consumed ingredient:

```json
"recipe_layout": ["ingredient", "ingredient", "catalyst"]
```

Positions beyond the array are `ingredient`. A `return` position is removed from planning and gathering because the recipe hands it back.

`recipe_corrections` replaces the observed output of one public recipe when the owning machine demonstrably produces something else:

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

`mods` and `config` are optional gates on the correction.

`supplies` names fixed items the station needs that are not recipe ingredients, such as oil or a reusable lid. They enter the same reservation and gathering plan as ingredients. A supply named by an interaction (see below) is inferred automatically.

```json
"supplies": ["#townstead:cooking_oil"]
```

`fluid_source` names a fluid reader for a station whose work is a fluid rather than an item.

## Interaction-Driven Machines

Some machines are worked by right-click rather than by inserting items. `behavior` is an inline Pheno block-action program anchored at the station. The one action most stations need is `pheno:use_block`:

```json
"behavior": { "type": "pheno:use_block", "item": "ingredient" }
```

`item` names a session role, not an item ID:

| Role | The engine hands the interaction |
| --- | --- |
| `empty` | An empty hand. This is the default when `item` is absent. |
| `ingredient` | One reserved stack from the current recipe's inputs. |
| `tool` | The stack that matches `tool`, an item ID or `#tag` on the same action. |
| `supply` | The stack that matches `supply`, an item ID or `#tag` on the same action. |
| `container` | The recipe's serving vessel, retained in the worker's inventory until the result is collected. |

`all: true` repeats the interaction for every ingredient. `secondary_use: true` performs the sneak-use variant. `face` and `hit` choose where the click lands. `condition` on any action makes it a no-op while the block condition is false. `pheno:offset` and `pheno:repeat` wrap a nested `block_action`.

`collect` is a second program in the same language for a station whose result must be taken by an interaction rather than extracted from a slot. `ready` is a Pheno block condition that says the result exists:

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

Behaviour never declares completion. After each interaction the engine looks again for the expected result. A block does not finish because a timer elapsed.

## Attended Processes

A machine can go wrong while it runs. `attendance` lets the worker stay, watch for named incidents, and perform a bounded response:

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
| `poll_interval` | Ticks between observations. |
| `timeout` | Ticks after which the process is treated as stalled. |
| `incidents` | At least one incident. Each has an `id`, a `when` block condition, a `response` program, and an optional `max_attempts`. An optional `target` names a block-selector result to respond at instead of the station. |
| `safe_stop` | Program run when the worker must leave a running process. |
| `cleanup` | Program run after the process completes or is abandoned. |

Supplies named by incident responses, `safe_stop`, and `cleanup` are gathered before the worker begins.

## Structures And Capacity

Omit `structure` for a single-block station. For a multiblock, `structure` is a Pheno block selector anchored at the matched block. Its positions are reserved and observed as one station:

```json
"structure": { "type": "pheno:connected" }
```

`anchor` is a block selector that resolves any discovered part to the canonical processing block, so nine silo blocks are one silo.

Capacity is derived from the structure and the exposed inventory whenever possible. `capacity` overrides it only when public views do not expose real usable capacity. A lane-based machine states its positions:

```json
"capacity": { "positions": 6, "per_position": 1 }
```

`positions` is a positive number or a Pheno numeric value. `per_position` is an item count or `"stack"`. A bulk machine gives one Pheno value instead, such as `{ "type": "pheno:count", "of": "structure" }`.

`targets` describes where a station's several working positions are, for machines that expose more than one target point. `reservation` holds a `pheno:reserve` node for a station powered by an entity, such as a mill turned by a mule. See the [Pheno action reference](/pheno/actions/) for `pheno:reserve`.

## Troubleshooting

Rejected files are logged. Look for `Invalid V2 workstation def` or `Workstation ... rejected`.

A station that loads but is never used is usually one of:

- the career does not name the block in a work task;
- the block's recipe-type tag is missing or names the wrong type;
- `requires` is false, such as a cold pot;
- the block's recipes are not among the career's work tasks, so the worker never picks them.

Enable `debugVillagerAI` in the server config and stand near the worker. It reports which station it acquired, which recipe it chose, and which check refused.

## Related

- [Storage](/careers/storage/) covers which blocks villagers treat as storage.
- [Work Tasks](/careers/work-tasks/) connects stations to a Career.
